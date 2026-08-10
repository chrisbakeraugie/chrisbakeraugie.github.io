'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import {
  SCROLL_STAGE_ATTR,
  SCROLL_STAGE_MEDIA_QUERY,
  SCROLL_STAGE_ROOT_ID,
  type ScrollStageItem,
  type ScrollStageLogoState,
} from '@/lib/scroll_stage';

/** Keep in sync with `.scroll-stage-logo` animation durations in globals.css. */
const LOGO_ANIM_MS = 550;

export interface ScrollStageProps {
  stages: readonly ScrollStageItem[];
}

interface LogoRuntimeState {
  id: string;
  state: ScrollStageLogoState;
}

type TransitionPhase = 'idle' | 'entering' | 'exiting';

function subscribeNever() {
  return () => {};
}

function idleLogoStates(
  stages: readonly ScrollStageItem[],
): LogoRuntimeState[] {
  return stages.map((stage) => ({ id: stage.id, state: 'idle' }));
}

/**
 * Observes `[data-scroll-stage]` sections and drives desktop-only sidebar
 * chrome fade + complete logo enter/exit animations in `#header`.
 *
 * Logo transitions are strictly sequential: exit finishes before the next
 * enter starts. Fast scrolling only updates the desired target; intermediate
 * logos that were never settled are skipped.
 */
export function ScrollStage({ stages }: ScrollStageProps) {
  const isClient = useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );
  const [enabled, setEnabled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [logoStates, setLogoStates] = useState<LogoRuntimeState[]>(() =>
    idleLogoStates(stages),
  );

  const intersectingIdsRef = useRef(new Set<string>());
  const desiredIdRef = useRef<string | null>(null);
  const displayedIdRef = useRef<string | null>(null);
  const phaseRef = useRef<TransitionPhase>('idle');
  const animTimerRef = useRef<number | null>(null);
  const gapTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia(SCROLL_STAGE_MEDIA_QUERY);

    function syncEnabled() {
      setEnabled(media.matches);
      if (!media.matches) {
        if (animTimerRef.current != null) {
          window.clearTimeout(animTimerRef.current);
          animTimerRef.current = null;
        }
        if (gapTimerRef.current != null) {
          window.clearTimeout(gapTimerRef.current);
          gapTimerRef.current = null;
        }
        desiredIdRef.current = null;
        displayedIdRef.current = null;
        phaseRef.current = 'idle';
        intersectingIdsRef.current.clear();
        setActiveId(null);
        setLogoStates(idleLogoStates(stages));
        document
          .getElementById('header')
          ?.removeAttribute('data-scroll-stage-active');
      }
    }

    syncEnabled();
    media.addEventListener('change', syncEnabled);
    return () => {
      media.removeEventListener('change', syncEnabled);
    };
  }, [stages]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const header = document.getElementById('header');
    const intersectingIds = intersectingIdsRef.current;
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(`[${SCROLL_STAGE_ATTR}]`),
    );
    if (targets.length === 0) {
      return;
    }

    const targetById = new Map<string, HTMLElement>();
    for (const el of targets) {
      const id = el.getAttribute(SCROLL_STAGE_ATTR);
      if (id) {
        targetById.set(id, el);
      }
    }

    function setHeaderActive(active: boolean) {
      if (active) {
        header?.setAttribute('data-scroll-stage-active', '');
      } else {
        header?.removeAttribute('data-scroll-stage-active');
      }
    }

    function setLogoState(id: string, state: ScrollStageLogoState) {
      setLogoStates((prev) =>
        prev.map((logo) => (logo.id === id ? { id: logo.id, state } : logo)),
      );
    }

    function clearAnimTimer() {
      if (animTimerRef.current != null) {
        window.clearTimeout(animTimerRef.current);
        animTimerRef.current = null;
      }
    }

    function clearGapTimer() {
      if (gapTimerRef.current != null) {
        window.clearTimeout(gapTimerRef.current);
        gapTimerRef.current = null;
      }
    }

    /**
     * Advances the logo state machine toward `desiredIdRef`. Never starts an
     * enter while an exit/enter is in flight; never runs two logos at once.
     */
    function advance() {
      if (phaseRef.current !== 'idle') {
        return;
      }

      const desiredId = desiredIdRef.current;
      const displayedId = displayedIdRef.current;

      if (displayedId === desiredId) {
        setActiveId(desiredId);
        setHeaderActive(desiredId != null || displayedId != null);
        return;
      }

      // Something is showing (or mid-settled) that we no longer want: exit first.
      if (displayedId != null) {
        phaseRef.current = 'exiting';
        setLogoState(displayedId, 'exit');
        clearAnimTimer();
        animTimerRef.current = window.setTimeout(() => {
          setLogoState(displayedId, 'idle');
          displayedIdRef.current = null;
          phaseRef.current = 'idle';
          animTimerRef.current = null;
          // One frame so CSS can reset before a possible re-enter of the same id.
          clearGapTimer();
          gapTimerRef.current = window.setTimeout(() => {
            gapTimerRef.current = null;
            advance();
          }, 32);
        }, LOGO_ANIM_MS);
        return;
      }

      // Nothing showing; enter the latest desired logo (if any).
      if (desiredId != null) {
        phaseRef.current = 'entering';
        displayedIdRef.current = desiredId;
        setActiveId(desiredId);
        setHeaderActive(true);
        setLogoState(desiredId, 'enter');
        clearAnimTimer();
        animTimerRef.current = window.setTimeout(() => {
          phaseRef.current = 'idle';
          animTimerRef.current = null;
          advance();
        }, LOGO_ANIM_MS);
        return;
      }

      setActiveId(null);
      setHeaderActive(false);
    }

    function requestStage(nextId: string | null) {
      if (nextId === desiredIdRef.current) {
        return;
      }
      desiredIdRef.current = nextId;
      // Chrome follows the scroll target immediately; logos catch up in queue.
      setHeaderActive(nextId != null || displayedIdRef.current != null);
      if (nextId != null) {
        setActiveId(nextId);
      }
      advance();
    }

    function closestToViewportCenter(ids: Iterable<string>): string | null {
      const viewportCenter = window.innerHeight / 2;
      let bestId: string | null = null;
      let bestDistance = Number.POSITIVE_INFINITY;

      for (const id of ids) {
        const el = targetById.get(id);
        if (!el) {
          continue;
        }
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - viewportCenter);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestId = id;
        }
      }

      return bestId;
    }

    function syncFromIntersections() {
      requestStage(closestToViewportCenter(intersectingIds));
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          const id = el.getAttribute(SCROLL_STAGE_ATTR);
          if (!id) {
            continue;
          }
          if (entry.isIntersecting) {
            intersectingIds.add(id);
          } else {
            intersectingIds.delete(id);
          }
        }
        syncFromIntersections();
      },
      {
        root: null,
        // Center band: a section "owns" the stage while it crosses mid-viewport.
        rootMargin: '-40% 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const target of targets) {
      observer.observe(target);
    }

    return () => {
      observer.disconnect();
      intersectingIds.clear();
      clearAnimTimer();
      clearGapTimer();
      desiredIdRef.current = null;
      displayedIdRef.current = null;
      phaseRef.current = 'idle';
      header?.removeAttribute('data-scroll-stage-active');
    };
  }, [enabled, stages]);

  if (!isClient || !enabled) {
    return null;
  }

  const root = document.getElementById(SCROLL_STAGE_ROOT_ID);
  if (!root) {
    return null;
  }

  const stageById = new Map(stages.map((stage) => [stage.id, stage]));

  return createPortal(
    <div className="scroll-stage-logos" aria-hidden="true">
      {logoStates.map((logo) => {
        const stage = stageById.get(logo.id);
        if (!stage) {
          return null;
        }
        return (
          <div
            key={logo.id}
            className="scroll-stage-logo"
            data-state={logo.state}
            data-active={logo.id === activeId ? '' : undefined}
          >
            {stage.logoSrc ? (
              // Decorative; company name remains in main content headings.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={stage.logoSrc}
                alt=""
                className="scroll-stage-logo-img"
              />
            ) : (
              <span className="scroll-stage-logo-text">{stage.logoAlt}</span>
            )}
          </div>
        );
      })}
    </div>,
    root,
  );
}
