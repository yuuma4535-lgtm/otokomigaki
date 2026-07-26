import { createEmblemBadgeCanvas } from "@/lib/diagnosis/inline-image";
import {
  DEFAULT_TYPE_SYMBOL,
  getTypePngSrc,
  getTypeSvgSrc,
  getTypeVisual,
} from "@/lib/diagnosis/type-visuals";
import type { DiagnosisResult } from "@/types/diagnosis";

/** 結果カード画像の固定サイズ（縦長） */
export const RESULT_CARD_WIDTH = 1080;
export const RESULT_CARD_HEIGHT = 1350;

const DISPLAY_FONT =
  '"Shippori Mincho", "Hiragino Mincho ProN", "Yu Mincho", serif';
const BODY_FONT =
  '"Noto Sans JP", "Hiragino Sans", "Hiragino Kaku Gothic ProN", sans-serif';

/**
 * 画像生成専用レイアウト・テンプレート定義。
 * 画面 DOM とは独立し、この仕様どおりに Canvas へ描画する。
 */
const TEMPLATE = {
  width: RESULT_CARD_WIDTH,
  height: RESULT_CARD_HEIGHT,
  paddingX: 72,
  paddingTop: 64,
  paddingBottom: 56,
  brandSize: 22,
  emblemSize: 420,
  youLabelSize: 22,
  typeNameSize: 52,
  typeNameSizeCompact: 44,
  catchphraseSize: 24,
  sectionLabelSize: 18,
  firstStepSize: 28,
  footerSize: 18,
  maxTextWidth: 860,
} as const;

export type ResultCardImage = {
  blob: Blob;
  objectUrl: string;
  width: number;
  height: number;
};

async function ensureFonts(): Promise<void> {
  if (typeof document === "undefined") return;
  try {
    await Promise.all([
      document.fonts.load(`500 52px ${DISPLAY_FONT}`),
      document.fonts.load(`400 28px ${DISPLAY_FONT}`),
      document.fonts.load(`400 22px ${BODY_FONT}`),
    ]);
    await document.fonts.ready;
  } catch {
    /* system fonts */
  }
}

function wrapLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const chars = [...text];
  const lines: string[] = [];
  let line = "";
  for (const ch of chars) {
    const test = line + ch;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = ch;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines.length > 0 ? lines : [""];
}

function fillCenteredText(
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
): number {
  const lines = wrapLines(ctx, text, maxWidth);
  let cursorY = y;
  for (const line of lines) {
    ctx.fillText(line, centerX, cursorY);
    cursorY += lineHeight;
  }
  return cursorY;
}

function drawLuxuryBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  accentGlow: string,
): void {
  const grad = ctx.createLinearGradient(0, 0, width * 0.2, height);
  grad.addColorStop(0, "#121214");
  grad.addColorStop(0.45, "#09090b");
  grad.addColorStop(1, "#1a1014");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  const glow = ctx.createRadialGradient(
    width * 0.5,
    height * 0.22,
    0,
    width * 0.5,
    height * 0.22,
    width * 0.42,
  );
  glow.addColorStop(0, accentGlow);
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  // 外枠
  ctx.strokeStyle = "rgba(184,148,61,0.45)";
  ctx.lineWidth = 2;
  ctx.strokeRect(28, 28, width - 56, height - 56);
  ctx.strokeStyle = "rgba(235,230,220,0.1)";
  ctx.lineWidth = 1;
  ctx.strokeRect(38, 38, width - 76, height - 76);
}

/**
 * 診断結果から「結果カード」PNG を Canvas 専用テンプレートで生成する。
 * 画面 DOM / html-to-image は使わない。
 */
export async function generateResultCardImage(
  result: DiagnosisResult,
): Promise<ResultCardImage> {
  await ensureFonts();

  const visual = getTypeVisual(result.typeId);
  const width = TEMPLATE.width;
  const height = TEMPLATE.height;
  const cx = width / 2;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas が利用できません");

  drawLuxuryBackground(ctx, width, height, visual.accentGlow);

  let y: number = TEMPLATE.paddingTop;

  // ブランド
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.font = `500 ${TEMPLATE.brandSize}px ${DISPLAY_FONT}`;
  ctx.fillStyle = visual.accent;
  ctx.fillText("男磨き診断", cx, y);
  y += 56;

  // エンブレム（円形バッジを Canvas 合成して貼り付け）
  const emblem = await createEmblemBadgeCanvas({
    sources: [
      getTypePngSrc(result.typeId),
      getTypeSvgSrc(result.typeId),
      DEFAULT_TYPE_SYMBOL,
    ],
    accent: visual.accent,
    size: 840,
  });
  const emblemSize = TEMPLATE.emblemSize;
  const emblemX = (width - emblemSize) / 2;
  ctx.drawImage(emblem, emblemX, y, emblemSize, emblemSize);
  y += emblemSize + 44;

  // あなたは
  ctx.font = `400 ${TEMPLATE.youLabelSize}px ${BODY_FONT}`;
  ctx.fillStyle = "#c9c3b8";
  ctx.fillText("あなたは", cx, y);
  y += 36;

  // タイプ名
  const typeLabel = `『${result.typeName}』`;
  const typeSize =
    result.typeName.length > 12
      ? TEMPLATE.typeNameSizeCompact
      : TEMPLATE.typeNameSize;
  ctx.font = `500 ${typeSize}px ${DISPLAY_FONT}`;
  ctx.fillStyle = visual.accentSoft;
  y = fillCenteredText(
    ctx,
    typeLabel,
    cx,
    y,
    TEMPLATE.maxTextWidth,
    typeSize * 1.35,
  );
  y += 18;

  // キャッチ
  ctx.font = `400 ${TEMPLATE.catchphraseSize}px ${DISPLAY_FONT}`;
  ctx.fillStyle = visual.accent;
  y = fillCenteredText(
    ctx,
    visual.catchphrase,
    cx,
    y,
    TEMPLATE.maxTextWidth - 40,
    TEMPLATE.catchphraseSize * 1.7,
  );
  y += 28;

  // 区切り線
  const lineGrad = ctx.createLinearGradient(cx - 60, 0, cx + 60, 0);
  lineGrad.addColorStop(0, "transparent");
  lineGrad.addColorStop(0.5, visual.accent);
  lineGrad.addColorStop(1, "transparent");
  ctx.strokeStyle = lineGrad;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx - 60, y);
  ctx.lineTo(cx + 60, y);
  ctx.stroke();
  y += 36;

  // 最初の1歩ラベル
  ctx.font = `400 ${TEMPLATE.sectionLabelSize}px ${BODY_FONT}`;
  ctx.fillStyle = "rgba(184,148,61,0.95)";
  ctx.fillText("あなたに必要な最初の1歩", cx, y);
  y += 28;

  // 最初の1歩本文
  ctx.font = `400 ${TEMPLATE.firstStepSize}px ${DISPLAY_FONT}`;
  ctx.fillStyle = "#ebe6dc";
  y = fillCenteredText(
    ctx,
    result.firstStep.action,
    cx,
    y,
    TEMPLATE.maxTextWidth - 20,
    TEMPLATE.firstStepSize * 1.85,
  );

  // フッター
  ctx.font = `400 ${TEMPLATE.footerSize}px ${BODY_FONT}`;
  ctx.fillStyle = "#5c584f";
  ctx.textBaseline = "bottom";
  ctx.fillText("Otokomigaki", cx, height - TEMPLATE.paddingBottom);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => {
      if (b && b.size > 256) resolve(b);
      else reject(new Error("結果カード画像の生成に失敗しました"));
    }, "image/png");
  });

  return {
    blob,
    objectUrl: URL.createObjectURL(blob),
    width,
    height,
  };
}
