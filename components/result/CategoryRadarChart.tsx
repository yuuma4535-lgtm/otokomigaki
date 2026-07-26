"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
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
      <p className="mt-1 font-medium tabular-nums text-gold">
        {item.score}
        <span className="text-muted-dim">%</span>
      </p>
      <p className="mt-1 text-muted-dim">{item.gradeLabel}</p>
    </div>
  );
}

export function CategoryRadarChart({ scores }: CategoryRadarChartProps) {
  const data: RadarDatum[] = scores.map((s) => ({
    category: s.axisName,
    score: s.score,
    gradeLabel: s.gradeLabel,
    fullMark: 100,
  }));

  return (
    <div className="mx-auto h-[280px] w-full max-w-md sm:h-[340px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="52%" outerRadius="62%" data={data}>
          <PolarGrid
            stroke="rgba(184,148,61,0.22)"
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
            tick={{ fill: "#d4b56a", fontSize: 10, fontWeight: 500 }}
          />
          <Radar
            name="スコア"
            dataKey="score"
            stroke="#b8943d"
            fill="#6e2f3d"
            fillOpacity={0.35}
            strokeWidth={2}
            isAnimationActive
            animationDuration={1000}
          />
          <Tooltip content={<ChartTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
      <p className="mt-1 text-center text-[0.65rem] tracking-wide text-muted-dim">
        各軸は0〜100点（カテゴリ平均の正規化スコア）
      </p>
    </div>
  );
}
