"use client";

import { GRADE_META } from "@/lib/diagnosis/grade";
import type { CategoryScore } from "@/types/diagnosis";

type CategoryLevelBarsProps = {
  scores: CategoryScore[];
};

export function CategoryLevelBars({ scores }: CategoryLevelBarsProps) {
  const ordered = [...scores].sort((a, b) => b.score - a.score);

  return (
    <div className="mt-8 border-t border-line pt-8">
      <p className="text-center text-[0.7rem] tracking-[0.28em] text-muted-dim">
        カテゴリ別スコア（0〜100%）と Lv
      </p>
      <ul className="mt-6 space-y-5">
        {ordered.map((cat, index) => (
          <li key={cat.categoryId}>
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="font-display text-sm tracking-wide text-ivory">
                  <span className="mr-2 text-muted-dim">{index + 1}.</span>
                  {cat.axisName}
                </p>
                <p className="mt-0.5 text-[0.65rem] text-muted-dim">
                  {GRADE_META[cat.grade].shortLabel} · {cat.gradeLabel}
                </p>
              </div>
              <p className="font-display text-sm tabular-nums tracking-wide text-gold">
                {cat.score}%
              </p>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-sm bg-white/8">
              <div
                className="h-full bg-gradient-to-r from-bordeaux to-gold transition-[width] duration-700"
                style={{ width: `${cat.score}%` }}
              />
            </div>
            <div className="mt-2 flex gap-1.5">
              {([1, 2, 3, 4] as const).map((lv) => (
                <div
                  key={lv}
                  className={`h-1.5 flex-1 rounded-sm ${
                    cat.grade >= lv
                      ? cat.grade === 4
                        ? "bg-gold"
                        : "bg-gold/55"
                      : "bg-white/8"
                  }`}
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
