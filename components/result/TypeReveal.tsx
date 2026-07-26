"use client";

import { CategoryRadarChart } from "@/components/result/CategoryRadarChart";
import { RelativeInsight } from "@/components/result/RelativeInsight";
import type { DiagnosisResult } from "@/types/diagnosis";

type TypeRevealProps = {
  result: DiagnosisResult;
};

export function TypeReveal({ result }: TypeRevealProps) {
  return (
    <section className="mt-12 flex flex-col gap-12">
      <div className="flex flex-col items-center px-4 text-center animate-[typeRise_1.1s_cubic-bezier(0.22,1,0.36,1)_0.15s_both]">
        <p className="text-[0.7rem] tracking-[0.38em] text-gold">診断結果</p>
        <p className="mt-8 text-[0.95rem] text-ivory-soft">あなたは</p>
        <h1 className="mt-3 overflow-x-auto font-display text-[clamp(1.75rem,7vw,2.75rem)] font-medium tracking-[0.08em] text-ivory whitespace-nowrap">
          『{result.typeName}』
        </h1>
        <p className="mt-3 text-[0.95rem] text-ivory-soft">です。</p>
        <div className="ui-hairline mt-10 w-20" />
        <p className="mt-8 max-w-md text-sm leading-[1.9] text-muted">
          {result.typeDescription}
        </p>
      </div>

      <div className="relative overflow-hidden rounded-md border border-line bg-charcoal-raised/60 px-4 py-8 shadow-[var(--shadow-panel)] sm:px-8 sm:py-10">
        <p className="text-center text-[0.7rem] tracking-[0.32em] text-muted-dim">
          4軸バランス（0〜100%）
        </p>
        <div className="mt-4">
          <CategoryRadarChart scores={result.categoryScores} />
        </div>
        <RelativeInsight result={result} />
      </div>
    </section>
  );
}
