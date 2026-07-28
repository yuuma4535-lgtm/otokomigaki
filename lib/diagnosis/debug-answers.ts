import questionsData from "@/data/questions.json";
import { AXIS_ORDER } from "@/lib/diagnosis/personality-types";
import {
  RELATIVE_TYPES,
  type RelativeTypeId,
} from "@/lib/diagnosis/relative-types";
import type {
  Answers,
  CategoryId,
  QuestionsData,
  ResultTypeId,
} from "@/types/diagnosis";

const data = questionsData as QuestionsData;

const CODE_TO_CATEGORY: Record<"P" | "S" | "D" | "M", CategoryId> = {
  P: "physique",
  S: "appearance",
  D: "lifestyle",
  M: "mind",
};

/** 14タイプ → 軸順列コード（高い順）。relative-types の PATTERN_TO_TYPE の逆 */
const TYPE_TO_PATTERN: Record<RelativeTypeId, string> = {
  steel_embodiment: "PSDM",
  pioneering_frontier: "PMDS",
  refined_warrior: "SPDM",
  solitary_aesthetic: "SDPM",
  flawless_routiner: "DPMS",
  silent_strategist: "DSMP",
  evolution_seeker: "MPDS",
  intellectual_builder: "MDSP",
  unyielding_hardworker: "PDSM",
  charismatic_innovator: "SMPD",
  ironclad_logical: "DMPS",
  refined_philosopher: "MSDP",
  passionate_artist: "PMSD",
  disciplined_tank: "DPSM",
};

/** Rank B 帯（21〜97）の固定スコア。高い順でタイプ判定を安定させる */
const RANK_B_ORDERED_SCORES = [90, 70, 50, 30] as const;

/** デバッグ用：全結果タイプへのジャンプ一覧 */
export const DEBUG_RESULT_JUMP_TARGETS: ReadonlyArray<{
  id: ResultTypeId;
  label: string;
}> = [
  { id: "supreme", label: "至高の支配者" },
  { id: "prototype", label: "原石のプロトタイプ" },
  ...Object.values(RELATIVE_TYPES).map((t) => ({
    id: t.id as ResultTypeId,
    label: t.typeName,
  })),
];

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

/**
 * 指定タイプになるよう回答を生成する（デバッグジャンプ用）。
 * supreme / prototype は全軸固定、それ以外は軸順列で Rank B を再現。
 */
export function createAnswersForType(typeId: ResultTypeId): Answers {
  if (typeId === "supreme") return createSupremeAnswers();
  if (typeId === "prototype") return createPrototypeAnswers();

  const pattern = TYPE_TO_PATTERN[typeId];
  const byCategory = {
    physique: 50,
    appearance: 50,
    lifestyle: 50,
    mind: 50,
  } satisfies Record<CategoryId, number>;

  for (let i = 0; i < pattern.length; i++) {
    const code = pattern[i] as "P" | "S" | "D" | "M";
    byCategory[CODE_TO_CATEGORY[code]] = RANK_B_ORDERED_SCORES[i]!;
  }

  return fillAnswersFromNormalizedScores(byCategory);
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
