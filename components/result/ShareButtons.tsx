"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  copyTextToClipboard,
  isShareAbortError,
} from "@/lib/diagnosis/copy-to-clipboard";
import { buildShareResultUrl } from "@/lib/diagnosis/share-og";
import {
  buildResultCopyText,
  buildShareText,
} from "@/lib/diagnosis/share-text";
import type { DiagnosisResult } from "@/types/diagnosis";

type ShareButtonsProps = {
  result: DiagnosisResult;
};

function ShareToast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed bottom-6 left-1/2 z-[60] w-[min(92vw,24rem)] -translate-x-1/2 px-3 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      <p className="rounded-sm border border-line bg-charcoal/95 px-4 py-2.5 text-center text-xs tracking-wide text-ivory-soft shadow-[var(--shadow-panel)] backdrop-blur-sm">
        {message}
      </p>
    </div>
  );
}

const btnClass =
  "pointer-events-auto relative z-10 min-h-12 w-full touch-manipulation rounded-sm border border-line bg-charcoal-raised/80 px-3 py-3.5 text-sm tracking-[0.1em] text-ivory-soft shadow-[var(--shadow-button)] transition-[border-color,background-color,color] hover:border-gold/40 hover:bg-charcoal-raised hover:text-gold-soft active:scale-[0.98] sm:min-h-[3rem] sm:px-4 sm:tracking-[0.12em]";

export function ShareButtons({ result }: ShareButtonsProps) {
  const [siteOrigin, setSiteOrigin] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setSiteOrigin(window.location.origin);
  }, []);

  const showToast = useCallback((message: string) => {
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    setToast(message);
    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, 2500);
  }, []);

  const copyWithFeedback = useCallback(
    async (text: string, successMessage: string) => {
      const copied = await copyTextToClipboard(text);
      if (copied) {
        showToast(successMessage);
      } else {
        showToast("コピーに失敗しました");
      }
    },
    [showToast],
  );

  const handleShare = useCallback(async () => {
    const origin = siteOrigin || window.location.origin;
    const shareUrl = buildShareResultUrl(origin, result.typeId);
    const text = buildShareText(result, origin);
    const shareData: ShareData = {
      title: `『${result.typeName}』| 男磨き診断`,
      text,
      url: shareUrl,
    };

    if (typeof navigator.share !== "function") {
      showToast("この環境ではシェアに対応していません");
      return;
    }

    try {
      if (typeof navigator.canShare === "function" && !navigator.canShare(shareData)) {
        showToast("シェアできませんでした");
        return;
      }

      await navigator.share(shareData);
    } catch (error) {
      if (isShareAbortError(error)) return;
      showToast("シェアできませんでした");
    }
  }, [result, showToast, siteOrigin]);

  const handleCopy = useCallback(async () => {
    const origin = siteOrigin || window.location.origin;
    const text = buildResultCopyText(result, origin);
    await copyWithFeedback(text, "結果をコピーしました！");
  }, [copyWithFeedback, result, siteOrigin]);

  return (
    <>
      <div className="pointer-events-auto relative z-10 w-full min-w-0 border-t border-line px-0 pt-10 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <p className="text-center text-[0.7rem] tracking-[0.28em] text-muted-dim">
          結果を共有
        </p>
        <div className="mx-auto mt-5 grid w-full max-w-md grid-cols-2 gap-2 sm:gap-3">
          <button type="button" onClick={handleShare} className={btnClass}>
            シェアする
          </button>
          <button type="button" onClick={handleCopy} className={btnClass}>
            結果をコピー
          </button>
        </div>
      </div>

      <ShareToast message={toast ?? ""} visible={toast !== null} />
    </>
  );
}
