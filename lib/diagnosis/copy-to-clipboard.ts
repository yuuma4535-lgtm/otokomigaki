/**
 * テキストをクリップボードへコピーする。
 * 1. navigator.clipboard（HTTPS / localhost）
 * 2. document.execCommand('copy') フォールバック（HTTP 開発環境など）
 */
export async function copyTextToClipboard(text: string): Promise<boolean> {
  if (typeof document === "undefined") return false;

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      /* execCommand へフォールバック */
    }
  }

  return copyWithExecCommand(text);
}

function copyWithExecCommand(text: string): boolean {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "0";
  textarea.style.left = "0";
  textarea.style.width = "2em";
  textarea.style.height = "2em";
  textarea.style.padding = "0";
  textarea.style.border = "none";
  textarea.style.outline = "none";
  textarea.style.boxShadow = "none";
  textarea.style.background = "transparent";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";
  textarea.setAttribute("aria-hidden", "true");

  const selection = document.getSelection();
  const savedRange =
    selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

  document.body.appendChild(textarea);

  try {
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, text.length);
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    document.body.removeChild(textarea);
    if (savedRange && selection) {
      selection.removeAllRanges();
      selection.addRange(savedRange);
    }
  }
}

/** ユーザーが共有シートをキャンセルしたか */
export function isShareAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === "AbortError";
}
