"use client";

import { useInViewOnce } from "@/lib/hooks/use-in-view-once";
import type { ReactNode } from "react";

type ResultRevealProps = {
  children: ReactNode;
  className?: string;
  /** スタッガー用の遅延（ms） */
  delayMs?: number;
};

/** 結果ページ向け：控えめなフェード＋スライド（初回のみ） */
export function ResultReveal({
  children,
  className = "",
  delayMs = 0,
}: ResultRevealProps) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 1.1s cubic-bezier(0, 0, 0.2, 1) ${delayMs}ms, transform 1.1s cubic-bezier(0, 0, 0.2, 1) ${delayMs}ms`,
        willChange: inView ? "auto" : "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}
