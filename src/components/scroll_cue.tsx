'use client';

import { useSyncExternalStore } from 'react';

/**
 * Desktop-only "scroll for more" cue anchored to the bottom of the hero.
 * Reads `window.scrollY` via `useSyncExternalStore` so the initial mount
 * already reflects the current scroll position (no post-hydration flash if
 * the browser restored a scroll offset). Once past the top, the cue fades
 * out via CSS and stays hidden; desktop-only visibility is a CSS concern
 * (see `.home-intro-scroll-cue` in globals.css).
 */
function subscribeToScroll(onChange: () => void): () => void {
  window.addEventListener('scroll', onChange, { passive: true });
  return () => {
    window.removeEventListener('scroll', onChange);
  };
}

function getScrolled(): boolean {
  return window.scrollY > 0;
}

function getServerScrolled(): boolean {
  return false;
}

export function ScrollCue() {
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    getScrolled,
    getServerScrolled,
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
