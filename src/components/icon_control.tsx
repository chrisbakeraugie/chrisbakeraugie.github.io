import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

/** Shared presentation props for icon controls (links, buttons, etc.). */
export interface IconControlProps {
  icon: IconDefinition;
  /** Hover/focus tooltip text. */
  tooltip: string;
  /** Static description in HTML for crawlers and screen readers. */
  description?: string;
  /** Accessible name; defaults to description or tooltip. */
  ariaLabel?: string;
}

export function resolveIconDescription(
  description: string | undefined,
  tooltip: string,
): string {
  return description ?? tooltip;
}

export function resolveIconAriaLabel(
  ariaLabel: string | undefined,
  description: string,
  tooltip: string,
): string {
  return ariaLabel ?? description ?? tooltip;
}

/** Attributes shared by icon links and icon buttons. */
export function iconControlAttributes(
  tooltip: string,
  ariaLabel: string,
): {
  className: string;
  'data-tooltip': string;
  'aria-label': string;
} {
  return {
    className: 'icon',
    'data-tooltip': tooltip,
    'aria-label': ariaLabel,
  };
}

/** Icon glyph plus visually hidden description text. */
export function IconControlLabel({
  icon,
  description,
}: {
  icon: IconDefinition;
  description: string;
}) {
  return (
    <>
      <FontAwesomeIcon icon={icon} aria-hidden="true" />
      <span className="icon-description">{description}</span>
    </>
  );
}

/** Live region for announcing async control feedback (e.g. after copy). */
export function IconControlLiveRegion({ message }: { message: string }) {
  return (
    <span className="icon-live" aria-live="polite" aria-atomic="true">
      {message}
    </span>
  );
}
