/** Whether the async Clipboard API is available (requires HTTPS or localhost). */
export function canUseAsyncClipboard(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.isSecureContext &&
    typeof navigator !== 'undefined' &&
    navigator.clipboard?.writeText !== undefined
  );
}

/** Synchronous copy for use directly inside a click handler. */
export function copyTextSync(text: string): boolean {
  if (typeof document === 'undefined') return false;

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  textarea.style.fontSize = '12pt';

  const selection = document.getSelection();
  const originalRange =
    selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

  document.body.appendChild(textarea);

  // iOS requires contentEditable + an explicit selection range.
  if (/ipad|iphone|ipod/i.test(navigator.userAgent)) {
    textarea.contentEditable = 'true';
    textarea.readOnly = false;
    const range = document.createRange();
    range.selectNodeContents(textarea);
    selection?.removeAllRanges();
    selection?.addRange(range);
    textarea.setSelectionRange(0, text.length);
  } else {
    textarea.select();
    textarea.setSelectionRange(0, text.length);
  }

  let copied = false;
  try {
    copied = document.execCommand('copy');
  } finally {
    document.body.removeChild(textarea);
    if (originalRange && selection) {
      selection.removeAllRanges();
      selection.addRange(originalRange);
    }
  }

  return copied;
}
