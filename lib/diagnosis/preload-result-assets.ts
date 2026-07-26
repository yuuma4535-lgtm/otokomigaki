import {
  EMBLEM_FRAME_SRC,
  getTypePngSrc,
} from "@/lib/diagnosis/type-visuals";
import type { ResultTypeId } from "@/types/diagnosis";

/** 1枚の画像を取得・デコード完了まで待つ（失敗時も遷移を止めない） */
function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      const done = () => resolve();
      if (typeof img.decode === "function") {
        img.decode().then(done).catch(done);
      } else {
        done();
      }
    };
    img.onerror = () => resolve();
    img.src = src;
  });
}

/** 結果ページのエンブレム本体＋枠を事前読み込み */
export function preloadResultAssets(typeId: ResultTypeId): Promise<void> {
  return Promise.all([
    preloadImage(getTypePngSrc(typeId)),
    preloadImage(EMBLEM_FRAME_SRC),
  ]).then(() => undefined);
}

export function waitAtLeast(ms: number, startedAt: number): Promise<void> {
  const elapsed = Date.now() - startedAt;
  const remain = ms - elapsed;
  if (remain <= 0) return Promise.resolve();
  return new Promise((resolve) => {
    window.setTimeout(resolve, remain);
  });
}

/** 次のフレームまで待ち、ローディング UI を確実に描画させる */
export function waitForNextPaint(): Promise<void> {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        resolve();
      });
    });
  });
}

/** ローディング演出の最短表示時間 */
export const RESULT_PREPARE_MIN_MS = 1500;

/** 診断側で準備開始した時刻（結果側の二重待ち防止） */
export const PREPARE_STARTED_KEY = "otokomigaki.prepareStartedAt";
