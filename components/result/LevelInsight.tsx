"use client";

import type { DiagnosisInsight } from "@/types/diagnosis";

type LevelInsightProps = {
  insight: DiagnosisInsight;
};

export function LevelInsight({ insight }: LevelInsightProps) {
  const { peaks, floors } = insight;

  return (
    <div className="mx-auto mt-10 grid w-full max-w-lg gap-4 sm:grid-cols-2">
      <div className="rounded-md border border-gold/35 bg-gold/5 px-4 py-5 text-left">
        <p className="text-[0.65rem] tracking-[0.22em] text-gold">
          突出している領域 · Lv4
        </p>
        {peaks.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {peaks.map((p) => (
              <li key={p.categoryId} className="font-display text-sm text-ivory">
                {p.axisName}
                <span className="ml-2 text-xs tracking-wide text-gold-soft">
                  平均 {p.average.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm leading-relaxed text-muted">
            まだ卓越（Lv4）の軸はありません。洗練（Lv3）を超えれば次の段階です。
          </p>
        )}
      </div>

      <div className="rounded-md border border-bordeaux/50 bg-bordeaux-deep/25 px-4 py-5 text-left">
        <p className="text-[0.65rem] tracking-[0.22em] text-gold-soft">
          最も低い領域 · Lv1
        </p>
        {floors.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {floors.map((f) => (
              <li key={f.categoryId} className="font-display text-sm text-ivory">
                {f.axisName}
                <span className="ml-2 text-xs tracking-wide text-muted">
                  平均 {f.average.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm leading-relaxed text-muted">
            初心者レベル（Lv1）の軸はありません。土台は揃い始めています。
          </p>
        )}
      </div>
    </div>
  );
}
