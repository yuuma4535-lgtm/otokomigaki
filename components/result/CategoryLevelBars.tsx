"use client";

import { CountUpPercent } from "@/components/result/CountUpPercent";
import { GRADE_META } from "@/lib/diagnosis/grade";
import { useInViewOnce } from "@/lib/hooks/use-in-view-once";
import type { CategoryScore } from "@/types/diagnosis";

type CategoryLevelBarsProps = {
  scores: CategoryScore[];
  weakestId: CategoryScore["categoryId"];
};

function getScorePresentation(score: number, isWeakest: boolean) {
  if (isWeakest) {
    return {
      labelClass:
        "font-display text-base font-medium tabular-nums tracking-wide text-[#c9a066]",
      barClass: "h-full bg-gradient-to-r from-[#8a6a2f]/75 to-[#c9a066]",
    };
  }

  if (score >= 98) {
    return {
      labelClass:
        "font-display text-[0.9375rem] tabular-nums tracking-wide text-gold-soft/62",
      barClass: "h-full bg-gradient-to-r from-bordeaux/65 to-gold/50",
    };
  }
  if (score >= 90) {
    return {
      labelClass:
        "font-display text-sm tabular-nums tracking-wide text-gold-soft/52",
      barClass: "h-full bg-gradient-to-r from-bordeaux/55 to-gold/42",
    };
  }
  if (score >= 75) {
    return {
      labelClass:
        "font-display text-xs tabular-nums tracking-wide text-gold/45",
      barClass: "h-full bg-gradient-to-r from-bordeaux/45 to-gold/35",
    };
  }

  return {
    labelClass: "font-display text-xs tabular-nums tracking-wide text-muted",
    barClass: "h-full bg-gradient-to-r from-bordeaux/35 to-gold/28",
  };
}

export function CategoryLevelBars({
  scores,
  weakestId,
}: CategoryLevelBarsProps) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const ordered = [...scores].sort((a, b) => b.score - a.score);

  return (
    <div ref={ref} className="mt-12 border-t border-line pt-12">
      <p className="text-center text-[0.7rem] tracking-[0.28em] text-muted-dim">
        カテゴリ別スコア（0〜100%）と Lv
      </p>
      <ul className="mt-6 space-y-5">
        {ordered.map((cat, index) => {
          const isWeakest = cat.categoryId === weakestId;
          const { labelClass, barClass } = getScorePresentation(
            cat.score,
            isWeakest,
          );
          const staggerMs = index * 250;

          return (
            <li key={cat.categoryId}>
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="font-display text-sm tracking-wide text-ivory-soft">
                    <span className="mr-2 text-muted-dim">{index + 1}.</span>
                    {cat.axisName}
                  </p>
                  <p className="mt-0.5 text-[0.65rem] text-muted-dim">
                    {GRADE_META[cat.grade].shortLabel} · {cat.gradeLabel}
                  </p>
                </div>
                <CountUpPercent
                  value={cat.score}
                  active={inView}
                  className={labelClass}
                  delayMs={staggerMs}
                />
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-sm bg-white/8">
                <div
                  className={barClass}
                  style={{
                    width: inView ? `${cat.score}%` : "0%",
                    transition: `width 1.3s cubic-bezier(0, 0, 0.2, 1) ${staggerMs}ms`,
                  }}
                />
              </div>
              <div className="mt-2 flex gap-1.5">
                {([1, 2, 3, 4] as const).map((lv) => (
                  <div
                    key={lv}
                    className={`h-1.5 flex-1 rounded-sm ${
                      cat.grade >= lv
                        ? cat.grade === 4
                          ? isWeakest
                            ? "bg-[#c9a066]/70"
                            : "bg-gold/45"
                          : "bg-gold/35"
                        : "bg-white/8"
                    }`}
                  />
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
