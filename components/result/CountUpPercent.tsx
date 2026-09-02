"use client";

import { useEffect, useState } from "react";

type CountUpPercentProps = {
  value: number;
  active: boolean;
  className?: string;
  durationMs?: number;
  delayMs?: number;
};

/** 0% から指定値までカウントアップ（初回のみ） */
export function CountUpPercent({
  value,
  active,
  className = "",
  durationMs = 2000,
  delayMs = 0,
}: CountUpPercentProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;

    let raf = 0;
    let start: number | null = null;
    const timeout = window.setTimeout(() => {
      const tick = (ts: number) => {
        if (start === null) start = ts;
        const elapsed = ts - start;
        const progress = Math.min(elapsed / durationMs, 1);
        const eased = 1 - (1 - progress) ** 3;
        setDisplay(Math.round(value * eased));
        if (progress < 1) {
          raf = window.requestAnimationFrame(tick);
        }
      };
      raf = window.requestAnimationFrame(tick);
    }, delayMs);

    return () => {
      window.clearTimeout(timeout);
      window.cancelAnimationFrame(raf);
    };
  }, [active, value, durationMs, delayMs]);

  return <span className={className}>{display}%</span>;
}
