"use client";

import { EXPERT_META } from "@/lib/diagnosis/personality-types";
import { COCONALA_URL } from "@/lib/diagnosis/constants";
import type { ExpertKind } from "@/types/diagnosis";

function ExpertGlyph({ kind }: { kind: ExpertKind }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    className: "h-6 w-6",
    "aria-hidden": true as const,
  };

  switch (kind) {
    case "trainer":
      return (
        <svg {...common}>
          <path d="M6.5 8.5 4 11l2.5 2.5M17.5 8.5 20 11l-2.5 2.5M8 11h8M9 6.5v-2M15 6.5v-2M9 15.5v2M15 15.5v2" />
        </svg>
      );
    case "nutrition":
      return (
        <svg {...common}>
          <path d="M12 3c-2.5 3-5 5.8-5 9a5 5 0 0 0 10 0c0-3.2-2.5-6-5-9Z" />
          <path d="M12 14v4" />
        </svg>
      );
    case "stylist":
      return (
        <svg {...common}>
          <path d="M8 4h8l-1.5 5H9.5L8 4Z" />
          <path d="M9.5 9 7 20h10l-2.5-11" />
        </svg>
      );
    case "beauty":
      return (
        <svg {...common}>
          <circle cx="12" cy="9" r="4" />
          <path d="M6 20c1.5-3 3.5-4.5 6-4.5S16.5 17 18 20" />
        </svg>
      );
    case "habit":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4.5l3 2" />
        </svg>
      );
    case "mental":
      return (
        <svg {...common}>
          <path d="M12 4a5 5 0 0 1 4.5 7.1V15a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-3.9A5 5 0 0 1 12 4Z" />
          <path d="M10 17v2M14 17v2" />
        </svg>
      );
    case "leadership":
      return (
        <svg {...common}>
          <path d="m12 3 2.2 4.5 5 .7-3.6 3.5.9 5L12 14.8 7.5 16.7l.9-5L4.8 8.2l5-.7L12 3Z" />
        </svg>
      );
    case "mentor":
    default:
      return (
        <svg {...common}>
          <path d="M4 19V6.5A1.5 1.5 0 0 1 5.5 5H12v14H5.5A1.5 1.5 0 0 1 4 17.5" />
          <path d="M12 5h6.5A1.5 1.5 0 0 1 20 6.5V19" />
        </svg>
      );
  }
}

type ExpertRecommendProps = {
  experts: ExpertKind[];
};

export function ExpertRecommend({ experts }: ExpertRecommendProps) {
  return (
    <section className="mt-16">
      <p className="text-[0.7rem] tracking-[0.28em] text-muted-dim">
        ココナラで相談すべき専門家
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        タイプ特性から、次に効きやすい専門家を厳選しています。
      </p>
      <ul className="mt-8 space-y-4">
        {experts.map((kind) => {
          const meta = EXPERT_META[kind];
          return (
            <li key={kind}>
              <a
                href={COCONALA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-md border border-line bg-charcoal-raised/50 px-4 py-4 shadow-[var(--shadow-panel)] transition-[border-color,background-color] duration-300 hover:border-gold/40 hover:bg-charcoal-raised"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-gold/30 text-gold-soft transition-colors group-hover:border-gold group-hover:text-gold">
                  <ExpertGlyph kind={kind} />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-base tracking-wide text-ivory">
                    {meta.label}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">
                    {meta.blurb}
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
