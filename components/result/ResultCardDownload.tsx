"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { generateResultCardImage } from "@/lib/diagnosis/generate-result-card-image";
import {
  canShareImageFiles,
  shareImageFile,
} from "@/lib/diagnosis/save-image-file";
import type { DiagnosisResult } from "@/types/diagnosis";

type ResultCardDownloadProps = {
  result: DiagnosisResult;
};

type PreviewState = {
  blob: Blob;
  url: string;
  filename: string;
};

/**
 * 結果カード画像の生成・プレビュー・共有。
 * 画面 DOM はキャプチャせず、専用 Canvas テンプレートで描画する。
 */
export function ResultCardDownload({ result }: ResultCardDownloadProps) {
  const previewUrlRef = useRef<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<PreviewState | null>(null);
  const [shareAvailable, setShareAvailable] = useState(false);

  useEffect(() => {
    setShareAvailable(canShareImageFiles());
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }
    };
  }, []);

  const closePreview = useCallback(() => {
    setPreview((current) => {
      if (current?.url) URL.revokeObjectURL(current.url);
      return null;
    });
    previewUrlRef.current = null;
    setError(null);
  }, []);

  const handleGenerate = useCallback(async () => {
    if (busy) return;
    setBusy(true);
    setError(null);

    try {
      const card = await generateResultCardImage(result);

      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
      previewUrlRef.current = card.objectUrl;

      setPreview({
        blob: card.blob,
        url: card.objectUrl,
        filename: `otokomigaki-${result.typeId}.png`,
      });
    } catch (err) {
      console.error("[ResultCardDownload]", err);
      setError("画像の生成に失敗しました。もう一度お試しください。");
    } finally {
      setBusy(false);
    }
  }, [busy, result]);

  const handleShareFromPreview = useCallback(async () => {
    if (!preview) return;
    setError(null);
    const shareResult = await shareImageFile(preview.blob, preview.filename);
    if (shareResult.ok === false && shareResult.reason === "failed") {
      setError(
        "共有に失敗しました。画像を長押しして「写真に追加」してください。",
      );
    }
  }, [preview]);

  return (
    <>
      <div className="w-full min-w-0 border-t border-line px-0 pt-8">
        <div className="mx-auto w-full max-w-md">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={busy}
            className="relative z-10 min-h-12 w-full touch-manipulation rounded-sm border border-gold/35 bg-gold/10 px-3 py-3.5 text-sm tracking-[0.1em] text-gold-soft shadow-[var(--shadow-button)] transition-[border-color,background-color,opacity] hover:border-gold/55 hover:bg-gold/15 active:scale-[0.98] disabled:cursor-wait disabled:opacity-60 sm:min-h-[3rem] sm:tracking-[0.12em]"
          >
            {busy ? "画像を生成中…" : "結果を画像として保存する"}
          </button>
          {error && !preview ? (
            <p className="mt-3 text-center text-xs leading-relaxed tracking-wide text-bordeaux">
              {error}
            </p>
          ) : null}
        </div>
      </div>

      {preview ? (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-void/80 p-4 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="結果カードのプレビュー"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="閉じる"
            onClick={closePreview}
          />

          <div className="relative z-[1] flex max-h-[min(92dvh,52rem)] w-full max-w-md flex-col overflow-hidden rounded-md border border-line bg-charcoal shadow-[var(--shadow-panel)]">
            <div className="border-b border-line px-4 py-3 text-center">
              <p className="font-display text-[0.7rem] tracking-[0.28em] text-gold">
                結果カード
              </p>
              <p className="mt-2 text-[0.7rem] leading-relaxed tracking-wide text-muted">
                画像を長押しして「写真に追加」できます
                {shareAvailable ? "。共有からも保存できます。" : "。"}
              </p>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto bg-void px-3 py-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview.url}
                alt={`診断結果カード：${result.typeName}`}
                className="mx-auto h-auto w-full max-w-sm touch-manipulation rounded-sm border border-line/60"
                draggable={false}
              />
            </div>

            {error ? (
              <p className="border-t border-line px-4 py-2 text-center text-[0.65rem] leading-relaxed text-bordeaux">
                {error}
              </p>
            ) : null}

            <div className="flex flex-col gap-2 border-t border-line p-3">
              {shareAvailable ? (
                <button
                  type="button"
                  onClick={handleShareFromPreview}
                  className="min-h-12 w-full touch-manipulation rounded-sm border border-gold/40 bg-gold/15 px-3 text-sm tracking-[0.12em] text-gold-soft transition-colors hover:bg-gold/25"
                >
                  共有シートを開く
                </button>
              ) : null}
              <button
                type="button"
                onClick={closePreview}
                className="min-h-11 w-full touch-manipulation rounded-sm border border-line bg-charcoal-raised px-3 text-sm tracking-[0.12em] text-ivory-soft transition-colors hover:border-white/20"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
