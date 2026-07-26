"use client";

import type { DiagnosisResult } from "@/types/diagnosis";

type RelativeInsightProps = {
  result: DiagnosisResult;
};

/** グラフ下：強み（1位）と改善点（最下位） */
export function RelativeInsight({ result }: RelativeInsightProps) {
  const { strengthAxis, growthAxis } = result;

  return (
    <div className="mx-auto mt-8 w-full max-w-lg">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-md border border-gold/35 bg-gold/5 px-4 py-5 text-left">
          <p className="text-[0.65rem] tracking-[0.22em] text-gold">
            強み（1位）
          </p>
          <p className="mt-3 font-display text-lg text-ivory">
            {strengthAxis.axisName}
          </p>
          <p className="mt-1 text-sm tabular-nums text-gold-soft">
            {strengthAxis.score}%
          </p>
        </div>
        <div className="rounded-md border border-bordeaux/50 bg-bordeaux-deep/25 px-4 py-5 text-left">
          <p className="text-[0.65rem] tracking-[0.22em] text-gold-soft">
            改善点（最下位）
          </p>
          <p className="mt-3 font-display text-lg text-ivory">
            {growthAxis.axisName}
          </p>
          <p className="mt-1 text-sm tabular-nums text-muted">
            {growthAxis.score}%
          </p>
        </div>
      </div>
    </div>
  );
}
