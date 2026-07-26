import { AXIS_ORDER } from "@/lib/diagnosis/personality-types";
import { getOgTheme, type OgTheme } from "@/lib/diagnosis/share-og-theme";
import type { CategoryScore, DiagnosisResult } from "@/types/diagnosis";

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

const DISPLAY_FONT =
  '"Shippori Mincho", "Hiragino Mincho ProN", "Yu Mincho", serif';
const BODY_FONT =
  '"Noto Sans JP", "Hiragino Sans", "Yu Gothic", sans-serif';

export type ShareOgImageResult = {
  blob: Blob;
  objectUrl: string;
  dataUrl: string;
};

async function ensureFonts(): Promise<void> {
  if (typeof document === "undefined") return;
  try {
    await Promise.all([
      document.fonts.load(`700 52px ${DISPLAY_FONT}`),
      document.fonts.load(`500 24px ${BODY_FONT}`),
      document.fonts.load(`400 18px ${BODY_FONT}`),
    ]);
    await document.fonts.ready;
  } catch {
    /* fallback to system fonts */
  }
}

function drawBackground(ctx: CanvasRenderingContext2D, theme: OgTheme): void {
  const width = OG_WIDTH;
  const height = OG_HEIGHT;

  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, theme.bgStart);
  grad.addColorStop(1, theme.bgEnd);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  if (theme.pattern === "luxury") {
    const glow = ctx.createRadialGradient(
      width * 0.5,
      height * 0.35,
      0,
      width * 0.5,
      height * 0.35,
      width * 0.55,
    );
    glow.addColorStop(0, "rgba(232, 201, 106, 0.18)");
    glow.addColorStop(1, "transparent");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(232, 201, 106, 0.12)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(0, height * (0.15 + i * 0.14));
      ctx.lineTo(width, height * (0.1 + i * 0.14));
      ctx.stroke();
    }
  }

  if (theme.pattern === "rugged") {
    ctx.fillStyle = "rgba(255,255,255,0.03)";
    for (let i = 0; i < 800; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const s = Math.random() * 2.5;
      ctx.fillRect(x, y, s, s);
    }
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.lineWidth = 2;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(width * (0.1 + i * 0.18), 0);
      ctx.lineTo(width * (0.05 + i * 0.2), height);
      ctx.stroke();
    }
  }

  if (
    theme.pattern === "ember" ||
    theme.pattern === "crimson" ||
    theme.pattern === "velvet"
  ) {
    ctx.globalAlpha = 0.12;
    ctx.fillStyle = theme.accent;
    ctx.beginPath();
    ctx.arc(width * 0.72, height * 0.32, width * 0.35, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  if (theme.pattern === "steel" || theme.pattern === "slate") {
    ctx.strokeStyle = theme.gridStroke;
    ctx.lineWidth = 1;
    const step = 48;
    for (let x = 0; x < width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }

  ctx.strokeStyle = theme.accent;
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.35;
  ctx.strokeRect(28, 28, width - 56, height - 56);
  ctx.globalAlpha = 1;
}

function scoreMap(scores: CategoryScore[]): Map<string, number> {
  return new Map(scores.map((s) => [s.categoryId, s.score]));
}

function drawRadar(
  ctx: CanvasRenderingContext2D,
  scores: CategoryScore[],
  cx: number,
  cy: number,
  radius: number,
  theme: OgTheme,
): void {
  const values = AXIS_ORDER.map((id) => ({
    id,
    label: scores.find((s) => s.categoryId === id)?.axisName ?? id,
    score: scoreMap(scores).get(id) ?? 0,
  }));

  const rings = [0.25, 0.5, 0.75, 1];
  ctx.strokeStyle = theme.gridStroke;
  ctx.lineWidth = 1;
  for (const ring of rings) {
    ctx.beginPath();
    for (let i = 0; i < values.length; i++) {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / values.length;
      const x = cx + radius * ring * Math.cos(angle);
      const y = cy + radius * ring * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }

  for (let i = 0; i < values.length; i++) {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / values.length;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle));
    ctx.stroke();
  }

  const points: { x: number; y: number }[] = [];
  values.forEach((v, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / values.length;
    const r = radius * (v.score / 100);
    points.push({
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    });
  });

  ctx.beginPath();
  points.forEach((p, i) => {
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.closePath();
  ctx.fillStyle = theme.radarFill;
  ctx.fill();
  ctx.strokeStyle = theme.radarStroke;
  ctx.lineWidth = 3;
  ctx.stroke();

  points.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = theme.accent;
    ctx.fill();
  });

  ctx.font = `500 20px ${BODY_FONT}`;
  ctx.fillStyle = theme.textMuted;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  values.forEach((v, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / values.length;
    const lx = cx + (radius + 36) * Math.cos(angle);
    const ly = cy + (radius + 36) * Math.sin(angle);
    ctx.fillText(v.label, lx, ly);
    ctx.font = `700 16px ${BODY_FONT}`;
    ctx.fillStyle = theme.accentSoft;
    ctx.fillText(`${v.score}%`, lx, ly + 22);
    ctx.font = `500 20px ${BODY_FONT}`;
    ctx.fillStyle = theme.textMuted;
  });
}

function drawHeader(
  ctx: CanvasRenderingContext2D,
  typeName: string,
  theme: OgTheme,
): void {
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  ctx.font = `500 22px ${BODY_FONT}`;
  ctx.fillStyle = theme.textMuted;
  ctx.fillText("男磨き診断", 72, 64);

  ctx.font = `700 52px ${DISPLAY_FONT}`;
  ctx.fillStyle = theme.textPrimary;
  const maxWidth = 520;
  wrapText(ctx, `『${typeName}』`, 72, 108, maxWidth, 62);

  ctx.font = `400 20px ${BODY_FONT}`;
  ctx.fillStyle = theme.textMuted;
  ctx.fillText("あなたの4軸バランス", 72, 220);
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
): void {
  if (ctx.measureText(text).width <= maxWidth) {
    ctx.fillText(text, x, y);
    return;
  }
  const chars = [...text];
  let line = "";
  let offsetY = y;
  for (const ch of chars) {
    const test = line + ch;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, offsetY);
      line = ch;
      offsetY += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, offsetY);
}

function drawFooter(ctx: CanvasRenderingContext2D, theme: OgTheme): void {
  ctx.textAlign = "right";
  ctx.textBaseline = "bottom";
  ctx.font = `400 18px ${BODY_FONT}`;
  ctx.fillStyle = theme.textMuted;
  ctx.fillText("otokomigaki — 男磨き診断", OG_WIDTH - 72, OG_HEIGHT - 52);
}

/** 診断結果から OGP 用 PNG を Canvas で生成 */
export async function generateShareOgImage(
  result: DiagnosisResult,
): Promise<ShareOgImageResult> {
  await ensureFonts();

  const canvas = document.createElement("canvas");
  canvas.width = OG_WIDTH;
  canvas.height = OG_HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas が利用できません");

  const theme = getOgTheme(result.typeId);
  drawBackground(ctx, theme);
  drawHeader(ctx, result.typeName, theme);
  drawRadar(ctx, result.categoryScores, 860, 340, 200, theme);
  drawFooter(ctx, theme);

  const dataUrl = canvas.toDataURL("image/png");
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => {
      if (b) resolve(b);
      else reject(new Error("画像の生成に失敗しました"));
    }, "image/png");
  });

  const objectUrl = URL.createObjectURL(blob);
  return { blob, objectUrl, dataUrl };
}

/** sessionStorage に直近のシェア画像を保持（同一タブ内で URL を参照可能に） */
const STORAGE_KEY = "otokomigaki.shareImageDataUrl";

export function persistShareImageDataUrl(dataUrl: string): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, dataUrl);
  } catch {
    /* quota exceeded — ignore */
  }
}

export function getPersistedShareImageDataUrl(): string | null {
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}
