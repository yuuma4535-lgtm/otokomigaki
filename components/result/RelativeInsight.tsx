"use client";

import { CountUpPercent } from "@/components/result/CountUpPercent";
import { useInViewOnce } from "@/lib/hooks/use-in-view-once";
import type { DiagnosisResult } from "@/types/diagnosis";

type RelativeInsightProps = {
  result: DiagnosisResult;
};

/** グラフ下：強み（1位）と改善点（最下位） */
export function RelativeInsight({ result }: RelativeInsightProps) {
  const { strengthAxis, growthAxis } = result;
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div ref={ref} className="mx-auto mt-12 w-full max-w-lg sm:mt-14">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-md border border-line bg-charcoal/40 px-4 py-5 text-left">
          <p className="text-[0.65rem] tracking-[0.22em] text-muted-dim">
            強み（1位）
          </p>
          <p className="mt-3 font-display text-lg text-ivory">
            {strengthAxis.axisName}
          </p>
          <CountUpPercent
            value={strengthAxis.score}
            active={inView}
            className="mt-1 block text-sm tabular-nums text-gold-soft/65"
          />
        </div>
        <div className="rounded-md border border-[#c9a066]/45 bg-[#c9a066]/8 px-4 py-5 text-left shadow-[0_0_24px_-12px_rgba(201,160,102,0.35)]">
          <p className="text-[0.65rem] tracking-[0.22em] text-[#c9a066]">
            改善点（最下位）
          </p>
          <p className="mt-3 font-display text-lg text-ivory">
            {growthAxis.axisName}
          </p>
          <CountUpPercent
            value={growthAxis.score}
            active={inView}
            className="mt-1 block font-display text-base font-medium tabular-nums text-[#d4b07a]"
            delayMs={250}
          />
        </div>
      </div>
    </div>
  );
}
