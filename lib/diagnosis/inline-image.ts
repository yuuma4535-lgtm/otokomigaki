/**
 * 画像リソースの読み込み・エンブレム円形バッジ合成（Canvas）。
 * DOM キャプチャに依存せず、確実にピクセルとして描画する。
 */

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("FileReader failed"));
    };
    reader.onerror = () =>
      reject(reader.error ?? new Error("FileReader error"));
    reader.readAsDataURL(blob);
  });
}

async function fetchImageBlob(url: string): Promise<Blob> {
  const absolute =
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("data:")
      ? url
      : new URL(url, window.location.origin).href;

  if (absolute.startsWith("data:")) {
    const res = await fetch(absolute);
    return res.blob();
  }

  const res = await fetch(absolute, {
    mode: "same-origin",
    credentials: "same-origin",
    cache: "force-cache",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch image: ${res.status} ${url}`);
  }
  return res.blob();
}

export function loadHtmlImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Image load failed: ${url}`));
    img.src = url;
  });
}

export async function urlToDataUrl(url: string): Promise<string> {
  if (url.startsWith("data:")) return url;
  const blob = await fetchImageBlob(url);
  return blobToDataUrl(blob);
}

export type EmblemBadgeOptions = {
  sources: string[];
  accent: string;
  size?: number;
};

/** 候補 URL から最初に成功した画像を読み込む */
async function loadFirstImage(sources: string[]): Promise<HTMLImageElement> {
  let lastError: unknown;
  for (const src of sources) {
    try {
      const dataUrl = await urlToDataUrl(src);
      const img = await loadHtmlImage(dataUrl);
      await img.decode?.().catch(() => undefined);
      return img;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError instanceof Error
    ? lastError
    : new Error("Emblem image could not be loaded");
}

/**
 * 円形クリップ＋ゴールド枠＋エンブレムを Canvas に描画して返す。
 */
export async function createEmblemBadgeCanvas(
  options: EmblemBadgeOptions,
): Promise<HTMLCanvasElement> {
  const size = options.size ?? 720;
  const img = await loadFirstImage(options.sources);

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D unavailable");

  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2;

  ctx.clearRect(0, 0, size, size);

  ctx.fillStyle = "#09090b";
  ctx.beginPath();
  ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
  ctx.fill();

  const ringPad = Math.max(10, Math.round(size * 0.02));
  const innerR = outerR - ringPad;
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
  ctx.clip();

  const coverScale = 1.08;
  const target = innerR * 2 * coverScale;
  const iw = Math.max(img.naturalWidth, 1);
  const ih = Math.max(img.naturalHeight, 1);
  const ratio = Math.max(target / iw, target / ih);
  const dw = iw * ratio;
  const dh = ih * ratio;
  ctx.drawImage(img, cx - dw / 2, cy - dh / 2, dw, dh);
  ctx.restore();

  ctx.beginPath();
  ctx.arc(cx, cy, outerR - ringPad / 2, 0, Math.PI * 2);
  ctx.strokeStyle = options.accent;
  ctx.lineWidth = Math.max(4, Math.round(size * 0.014));
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, Math.max(innerR - 2, 1), 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(235,230,220,0.2)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  return canvas;
}

export async function buildEmblemBadgeDataUrl(
  options: EmblemBadgeOptions,
): Promise<string> {
  const canvas = await createEmblemBadgeCanvas(options);
  return canvas.toDataURL("image/png");
}
