"use client";

import { CountUpPercent } from "@/components/result/CountUpPercent";
import { useInViewOnce } from "@/lib/hooks/use-in-view-once";
import type { CategoryScore } from "@/types/diagnosis";
import { resolveCategoryReflectionPrompt } from "@/lib/diagnosis/personality-types";

type CategoryAdviceGridProps = {
  scores: CategoryScore[];
  weakestId: CategoryScore["categoryId"];
};

function AxisIcon({ code }: { code: CategoryScore["axisCode"] }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    className: "h-4 w-4",
    "aria-hidden": true as const,
  };

  switch (code) {
    case "P":
      return (
        <svg {...common}>
          <path d="M6.5 8.5 4 11l2.5 2.5M17.5 8.5 20 11l-2.5 2.5M8 11h8" />
        </svg>
      );
    case "S":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M7 19c1.2-2.5 3-3.8 5-3.8S15.8 16.5 17 19" />
        </svg>
      );
    case "D":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="7.5" />
          <path d="M12 8v4.2l2.8 1.8" />
        </svg>
      );
    case "M":
    default:
      return (
        <svg {...common}>
          <path d="M12 4a4.5 4.5 0 0 1 4 6.6V14a1.8 1.8 0 0 1-1.8 1.8H9.8A1.8 1.8 0 0 1 8 14v-3.4A4.5 4.5 0 0 1 12 4Z" />
        </svg>
      );
  }
}

export function CategoryAdviceGrid({
  scores,
  weakestId,
}: CategoryAdviceGridProps) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div ref={ref} className="mt-[3.75rem]">
      <p
        className="text-center text-[0.7rem] tracking-[0.28em] text-muted-dim"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(20px)",
          transition:
            "opacity 1.1s cubic-bezier(0, 0, 0.2, 1), transform 1.1s cubic-bezier(0, 0, 0.2, 1)",
        }}
      >
        カテゴリ別アドバイス
      </p>
      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {scores.map((cat, index) => {
          const isWeakest = cat.categoryId === weakestId;
          const staggerMs = 200 + index * 250;
          return (
            <li
              key={cat.categoryId}
              className={`flex flex-col rounded-md border bg-charcoal/50 px-4 py-5 ${
                isWeakest
                  ? "border-[#c9a066]/45 bg-[#c9a066]/6 shadow-[0_0_20px_-10px_rgba(201,160,102,0.3)]"
                  : "border-line"
              }`}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 1.1s cubic-bezier(0, 0, 0.2, 1) ${staggerMs}ms, transform 1.1s cubic-bezier(0, 0, 0.2, 1) ${staggerMs}ms`,
              }}
            >
              <div
                className={`flex items-center gap-2 ${
                  isWeakest ? "text-[#c9a066]" : "text-muted-dim"
                }`}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-sm border ${
                    isWeakest ? "border-[#c9a066]/40" : "border-line"
                  }`}
                >
                  <AxisIcon code={cat.axisCode} />
                </span>
                <h3 className="font-display text-sm tracking-[0.14em] text-ivory-soft">
                  {cat.axisName}
                </h3>
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-2">
                <CountUpPercent
                  value={cat.score}
                  active={inView}
                  className={`font-display tabular-nums tracking-wide ${
                    isWeakest
                      ? "text-base font-medium text-[#c9a066]"
                      : "text-sm text-gold-soft/55"
                  }`}
                  delayMs={staggerMs}
                />
                <p className="text-[0.65rem] text-muted-dim">
                  Lv{cat.grade} · {cat.gradeLabel}
                </p>
              </div>
              <div className="ui-hairline mt-3 opacity-70" />
              <p className="mt-3 flex-1 text-sm leading-[1.75] text-muted">
                {cat.feedback}
              </p>
              <p className="mt-2 text-sm leading-[1.75] text-muted-dim">
                {resolveCategoryReflectionPrompt(cat.categoryId)}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
