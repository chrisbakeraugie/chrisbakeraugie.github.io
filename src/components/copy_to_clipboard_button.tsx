'use client';

import { useState } from 'react';
import {
  IconControlLabel,
  IconControlLiveRegion,
  iconControlAttributes,
  resolveIconAriaLabel,
  resolveIconDescription,
  type IconControlProps,
} from '@/components/icon_control';
import { canUseAsyncClipboard, copyTextSync } from '@/lib/clipboard';

export interface CopyToClipboardButtonProps extends Omit<
  IconControlProps,
  'tooltip'
> {
  value: string;
  label: string;
  tooltip?: string;
  copiedLabel?: string;
  copiedAnnouncement?: string;
  errorFallbackHref?: string;
}

function markCopied(setCopied: (copied: boolean) => void): void {
  setCopied(true);
  window.setTimeout(() => setCopied(false), 2000);
}

export function CopyToClipboardButton({
  value,
  icon,
  label,
  tooltip,
  description,
  ariaLabel,
  copiedLabel,
  copiedAnnouncement,
  errorFallbackHref,
}: CopyToClipboardButtonProps) {
  const [copied, setCopied] = useState(false);

  const resolvedTooltip = tooltip ?? label;
  const resolvedDescription = resolveIconDescription(
    description ?? label,
    resolvedTooltip,
  );
  const resolvedAriaLabel = resolveIconAriaLabel(
    ariaLabel ?? label,
    resolvedDescription,
    resolvedTooltip,
  );
  const resolvedCopiedLabel = copiedLabel ?? `Copied ${value}`;
  const activeTooltip = copied ? resolvedCopiedLabel : resolvedTooltip;
  const liveMessage = copied
    ? (copiedAnnouncement ?? `Copied ${value} to clipboard`)
    : '';

  function handleClick() {
    if (copyTextSync(value)) {
      markCopied(setCopied);
      return;
    }

    if (canUseAsyncClipboard()) {
      void navigator.clipboard
        .writeText(value)
        .then(() => {
          markCopied(setCopied);
        })
        .catch(() => {
          if (errorFallbackHref) {
            window.location.href = errorFallbackHref;
          }
        });
      return;
    }

    if (errorFallbackHref) {
      window.location.href = errorFallbackHref;
    }
  }

  return (
    <button
      type="button"
      {...iconControlAttributes(activeTooltip, resolvedAriaLabel)}
      onClick={handleClick}
    >
      <IconControlLabel icon={icon} description={resolvedDescription} />
      <IconControlLiveRegion message={liveMessage} />
    </button>
  );
}
