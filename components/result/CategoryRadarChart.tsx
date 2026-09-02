"use client";

import { useEffect, useMemo, useState } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useInViewOnce } from "@/lib/hooks/use-in-view-once";
import type { CategoryScore } from "@/types/diagnosis";

type CategoryRadarChartProps = {
  scores: CategoryScore[];
};

type RadarDatum = {
  category: string;
  score: number;
  gradeLabel: string;
  fullMark: number;
};

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: RadarDatum }>;
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0]?.payload;
  if (!item) return null;

  return (
    <div className="rounded-sm border border-line bg-charcoal/95 px-3.5 py-2.5 text-xs tracking-wide shadow-[var(--shadow-panel)] backdrop-blur-sm">
      <p className="text-muted">{item.category}</p>
      <p className="mt-1 font-medium tabular-nums text-gold-soft/70">
        {item.score}
        <span className="text-muted-dim">%</span>
      </p>
      <p className="mt-1 text-muted-dim">{item.gradeLabel}</p>
    </div>
  );
}

export function CategoryRadarChart({ scores }: CategoryRadarChartProps) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const [showScoreHelp, setShowScoreHelp] = useState(false);

  const targetData = useMemo<RadarDatum[]>(
    () =>
      scores.map((s) => ({
        category: s.axisName,
        score: s.score,
        gradeLabel: s.gradeLabel,
        fullMark: 100,
      })),
    [scores],
  );

  const zeroData = useMemo(
    () => targetData.map((d) => ({ ...d, score: 0 })),
    [targetData],
  );

  const [chartData, setChartData] = useState(zeroData);

  useEffect(() => {
    if (inView) {
      setChartData(targetData);
    }
  }, [inView, targetData]);

  return (
    <div
      ref={ref}
      className="mx-auto h-[280px] w-full max-w-md sm:h-[340px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="52%" outerRadius="62%" data={chartData}>
          <PolarGrid
            stroke="rgba(184,148,61,0.12)"
            gridType="polygon"
            radialLines
          />
          <PolarAngleAxis
            dataKey="category"
            tick={{
              fill: "#c9c3b8",
              fontSize: 12,
              letterSpacing: "0.06em",
            }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            tickFormatter={(v: number) => (v === 0 ? "" : `${v}%`)}
            axisLine={false}
            tick={{ fill: "#8a857c", fontSize: 10, fontWeight: 500 }}
          />
          <Radar
            name="スコア"
            dataKey="score"
            stroke="#9a7d42"
            fill="#6e2f3d"
            fillOpacity={0.28}
            strokeWidth={1.75}
            isAnimationActive={inView}
            animationDuration={2000}
            animationEasing="ease-out"
          />
          <Tooltip content={<ChartTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
      <div className="mt-1 flex flex-col items-center gap-1.5">
        <button
          type="button"
          onClick={() => setShowScoreHelp((open) => !open)}
          aria-expanded={showScoreHelp}
          aria-label="スコア算出方法を表示"
          className="flex h-5 w-5 items-center justify-center rounded-full border border-line text-[0.65rem] tracking-wide text-muted-dim transition-colors hover:border-gold/35 hover:text-gold-soft"
        >
          ?
        </button>
        {showScoreHelp ? (
          <p className="max-w-xs text-center text-[0.65rem] leading-relaxed tracking-wide text-muted-dim">
            各軸は0〜100点（カテゴリ平均の正規化スコア）
          </p>
        ) : null}
      </div>
    </div>
  );
}
