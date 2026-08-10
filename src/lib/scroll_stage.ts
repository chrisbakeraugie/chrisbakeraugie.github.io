/** Attribute on a section that opts it into the scroll-stage effect. */
export const SCROLL_STAGE_ATTR = 'data-scroll-stage';

/** Portal mount id inside `#header`. */
export const SCROLL_STAGE_ROOT_ID = 'scroll-stage-root';

/** Desktop two-column layout + motion preference gate. */
export const SCROLL_STAGE_MEDIA_QUERY =
  '(min-width: 1281px) and (prefers-reduced-motion: no-preference)';

export interface ScrollStageItem {
  id: string;
  /** Path under `public/`, e.g. `/logos/monday.svg`. */
  logoSrc?: string;
  /** Accessible name for the company; decorative layer still uses empty alt. */
  logoAlt: string;
}

export type ScrollStageLogoState = 'idle' | 'enter' | 'exit';
