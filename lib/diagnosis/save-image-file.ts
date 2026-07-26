import { isShareAbortError } from "@/lib/diagnosis/copy-to-clipboard";

export type ShareImageOutcome =
  | { ok: true }
  | { ok: false; reason: "unsupported" | "abort" | "failed" };

/**
 * 画像ファイルをネイティブ共有シートへ渡す。
 * iOS では共有メニューから「写真に追加」が可能。
 */
export async function shareImageFile(
  blob: Blob,
  filename: string,
): Promise<ShareImageOutcome> {
  if (!(blob instanceof Blob) || blob.size < 32) {
    return { ok: false, reason: "failed" };
  }

  if (typeof navigator.share !== "function") {
    return { ok: false, reason: "unsupported" };
  }

  const file = new File([blob], filename, {
    type: blob.type || "image/png",
    lastModified: Date.now(),
  });
  const shareData: ShareData = {
    files: [file],
    title: "男磨き診断 結果カード",
  };

  try {
    if (
      typeof navigator.canShare === "function" &&
      !navigator.canShare(shareData)
    ) {
      return { ok: false, reason: "unsupported" };
    }
    await navigator.share(shareData);
    return { ok: true };
  } catch (error) {
    if (isShareAbortError(error)) {
      return { ok: false, reason: "abort" };
    }
    return { ok: false, reason: "failed" };
  }
}

export function canShareImageFiles(): boolean {
  if (typeof navigator === "undefined") return false;
  if (typeof navigator.share !== "function") return false;
  try {
    const probe = new File([new Uint8Array([1])], "probe.png", {
      type: "image/png",
    });
    if (typeof navigator.canShare !== "function") return true;
    return navigator.canShare({ files: [probe] });
  } catch {
    return false;
  }
}
