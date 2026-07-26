import questionsData from "@/data/questions.json";
import { AXIS_ORDER } from "@/lib/diagnosis/personality-types";
import type { Answers, CategoryId, QuestionsData } from "@/types/diagnosis";

const data = questionsData as QuestionsData;

/**
 * 正規化スコア（0〜100）に近づくよう、カテゴリ内の Likert 回答を配分する。
 * score = ((raw - count) / (4 * count)) * 100
 */
export function fillAnswersFromNormalizedScores(
  byCategoryScore: Record<CategoryId, number>,
): Answers {
  const answers: Answers = {};
  for (const categoryId of AXIS_ORDER) {
    const questions = data.questions.filter((q) => q.categoryId === categoryId);
    const count = questions.length;
    const target = Math.min(100, Math.max(0, byCategoryScore[categoryId]));
    let remaining = Math.round(count + (target / 100) * 4 * count);

    for (let i = 0; i < count; i++) {
      const left = count - i;
      const minV = Math.max(1, remaining - (left - 1) * 5);
      const maxV = Math.min(5, remaining - (left - 1) * 1);
      const value = Math.min(5, Math.max(1, Math.round((minV + maxV) / 2)));
      answers[questions[i]!.id] = value;
      remaining -= value;
    }
  }
  return answers;
}

function uniformScores(value: number): Record<CategoryId, number> {
  return {
    physique: value,
    appearance: value,
    lifestyle: value,
    mind: value,
  };
}

/** [至高をシミュレート] 全項目 99% */
export function createSupremeAnswers(): Answers {
  return fillAnswersFromNormalizedScores(uniformScores(99));
}

/** [原石をシミュレート] 全項目 10% */
export function createPrototypeAnswers(): Answers {
  return fillAnswersFromNormalizedScores(uniformScores(10));
}

/** 20〜97 の整数 */
function randomScore20to97(): number {
  return Math.floor(Math.random() * 78) + 20;
}

/**
 * [ランダムにシミュレート]
 * 全項目 20〜97%（Rank B 帯）。4軸すべて異なる値にして14タイプ検証を容易にする。
 */
export function generateRandomCategoryScores(): Record<CategoryId, number> {
  for (let attempt = 0; attempt < 50; attempt++) {
    const scores = {
      physique: randomScore20to97(),
      appearance: randomScore20to97(),
      lifestyle: randomScore20to97(),
      mind: randomScore20to97(),
    };
    if (new Set(Object.values(scores)).size === 4) return scores;
  }
  return { physique: 90, appearance: 70, lifestyle: 45, mind: 25 };
}

export function createMixedAnswers(): Answers {
  return fillAnswersFromNormalizedScores(generateRandomCategoryScores());
}

/** @deprecated 互換エイリアス */
export const createRandomAnswers = createMixedAnswers;

export function describeDebugPreset(
  kind: "supreme" | "prototype" | "mixed",
) {
  const labels = {
    supreme: "至高をシミュレート（全99%）",
    prototype: "原石をシミュレート（全10%）",
    mixed: "ランダムにシミュレート（20〜97%）",
  } as const;
  return labels[kind];
}

export { AXIS_ORDER };
