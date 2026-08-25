'use client';

import { useSyncExternalStore } from 'react';

/**
 * Scroll cue component for the home page, used to show scroll arrow.
 * Uses useSyncExternalStore to ensure the scroll position is correctly checked, no flash or hydration failures.
 */

let hasScrolled = false;
let listenerAttached = false;
const listeners = new Set<() => void>();

function attachOnce(): void {
  if (listenerAttached || typeof window === 'undefined') return;
  listenerAttached = true;

  if (window.scrollY > 0) {
    hasScrolled = true;
    return;
  }

  function onScroll(): void {
    if (window.scrollY <= 0) return;
    hasScrolled = true;
    window.removeEventListener('scroll', onScroll);
    listeners.forEach((listener) => {
      listener();
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
}

function subscribe(onChange: () => void): () => void {
  attachOnce();
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function getSnapshot(): boolean {
  return hasScrolled;
}

function getServerSnapshot(): boolean {
  return false;
}

export function ScrollCue() {
  const scrolled = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return (
    <span
      className="home-intro-scroll-cue"
      aria-hidden="true"
      {...(scrolled ? { 'data-hidden': '' } : {})}
    >
      <svg
        className="home-intro-scroll-cue-caret"
        viewBox="0 0 16 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1L8 8L15 1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
