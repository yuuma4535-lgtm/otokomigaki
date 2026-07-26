"use client";

import { PageAtmosphere } from "@/components/ui/PageAtmosphere";

/** 診断完了〜結果表示のあいだの解析中演出（画面全体） */
export function ResultPreparingScreen() {
  return (
    <div className="fixed inset-0 z-[100]">
      <PageAtmosphere mood="result">
        <div
          className="flex min-h-dvh flex-col items-center justify-center px-8 text-center"
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          <p className="font-display text-[0.7rem] tracking-[0.42em] text-gold uppercase">
            Otokomigaki
          </p>
          <div className="ui-hairline mx-auto mt-8 max-w-[6rem]" />
        <p className="mt-10 font-display text-[clamp(1.05rem,3.5vw,1.35rem)] font-medium tracking-wide text-ivory">
          分析中…
        </p>
          <p className="mt-4 text-sm tracking-[0.14em] text-muted-dim">
            あなたのタイプを読み解いています
          </p>
          <div
            className="mt-12 h-px w-16 animate-pulse bg-gradient-to-r from-transparent via-gold/70 to-transparent"
            aria-hidden
          />
        </div>
      </PageAtmosphere>
    </div>
  );
}
