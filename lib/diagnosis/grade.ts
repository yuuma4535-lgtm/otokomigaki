import type { AxisLevel, GradeLevel, GradeMeta } from "@/types/diagnosis";
import type { CategoryScore, PersonalityTypeCode } from "@/types/diagnosis";

export const GRADE_META: Record<GradeLevel, GradeMeta> = {
  1: { level: 1, label: "初心者レベル", shortLabel: "Lv1" },
  2: { level: 2, label: "成長途上レベル", shortLabel: "Lv2" },
  3: { level: 3, label: "洗練レベル", shortLabel: "Lv3" },
  4: { level: 4, label: "卓越レベル", shortLabel: "Lv4" },
};

/**
 * 詳細表示用 Lv1〜4
 * Lv1: ≤2.0 / Lv2: ≤3.0 / Lv3: ≤4.0 / Lv4: >4.0
 */
export function averageToGrade(average: number): GradeLevel {
  if (average <= 2.0) return 1;
  if (average <= 3.0) return 2;
  if (average <= 4.0) return 3;
  return 4;
}

/**
 * Rank B の High/Low（分散最適化）
 * 平均 3.0 以上 → High / 2.9 以下 → Low
 */
export const AXIS_HIGH_AVERAGE = 3.0;

export function averageToAxisLevel(average: number): AxisLevel {
  return average >= AXIS_HIGH_AVERAGE ? "H" : "L";
}

/** Rank S：全カテゴリ平均 4.9〜5.0 */
export const RANK_S_MIN_AVERAGE = 4.9;

/** Rank C：全カテゴリ平均 1.0〜2.0 以下 */
export const RANK_C_MAX_AVERAGE = 2.0;

export function buildToneAdjustedDescription(
  typeCode: PersonalityTypeCode,
  baseDescription: string,
  categoryScores: CategoryScore[],
): string {
  const peaks = categoryScores.filter((c) => c.grade === 4);
  const floors = categoryScores.filter((c) => c.grade === 1);
  const parts: string[] = [baseDescription];

  if (peaks.length > 0) {
    const names = peaks.map((p) => p.axisName).join("・");
    parts.push(
      `とりわけ【${names}】は卓越レベル（Lv4）。その領域はすでに、周囲が倣いたくなる水準に達しています。`,
    );
  }

  if (floors.length > 0) {
    const names = floors.map((f) => f.axisName).join("・");
    parts.push(
      `一方、【${names}】は初心者レベル（Lv1）。ここは最速で景色が変わる伸びしろです。小さな一手から始めれば十分です。`,
    );
  }

  if (peaks.length === 0 && floors.length === 0) {
    const ordered = [...categoryScores].sort((a, b) => b.score - a.score);
    const top = ordered[0];
    const bottom = ordered[ordered.length - 1];
    if (top && bottom && top.categoryId !== bottom.categoryId) {
      parts.push(
        `あなたの強みは【${top.axisName}】（${top.score}点）、次に伸ばすべきは【${bottom.axisName}】（${bottom.score}点）です。`,
      );
    } else if (typeCode === "supreme" || categoryScores.every((c) => c.score >= 98)) {
      parts.push(
        `四軸すべてが高水準帯。卓越への微差と、影響の広げ方がさらなる支配力を生みます。`,
      );
    }
  }

  return parts.join("\n\n");
}
