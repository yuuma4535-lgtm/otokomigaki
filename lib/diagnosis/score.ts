import questionsData from "@/data/questions.json";
import {
  LIKERT_SCALE,
  MAX_CHOICE_SCORE,
  MAX_TOTAL_SCORE,
  TOTAL_QUESTIONS,
} from "@/lib/diagnosis/constants";
import { GRADE_META, averageToGrade } from "@/lib/diagnosis/grade";
import {
  AXIS_DISPLAY,
  AXIS_ORDER,
  resolveCategoryFeedback,
} from "@/lib/diagnosis/personality-types";
import {
  balanceStyleLabel,
  calculateStandardDeviation,
  formatAxisCodeOrder,
  formatRankOrderLabel,
  getRelativeType,
  resolveBalanceStyle,
  resolveRelativeTypeId,
} from "@/lib/diagnosis/relative-types";
import { buildLevelAwareFirstStep } from "@/lib/diagnosis/first-step";
import type {
  Answers,
  CategoryId,
  CategoryScore,
  DiagnosisInsight,
  DiagnosisRank,
  DiagnosisResult,
  FirstStepAdvice,
  Question,
  QuestionsData,
} from "@/types/diagnosis";

const data = questionsData as QuestionsData;

/** Rank S: 全カテゴリ 98% 以上 */
const RANK_S_MIN_SCORE = 98;
/** Rank C: 全カテゴリ 20% 以下 */
const RANK_C_MAX_SCORE = 20;

const RANK_S = {
  typeName: "至高の支配者",
  typeDescription:
    "四軸すべてが98%以上。男磨きの極致です。独りで完結せず、次世代を引き上げるメンターとしての責任がすでに始まっています。",
  firstStep: {
    axisName: "メンターシップ",
    categoryId: "mind" as CategoryId,
    why: "あなたの水準は、もはや個人の目標達成では測れない。",
    action:
      "さらなる高みへ：次世代を育てるリーダーとしての哲学を確立せよ。メンターとして、誰かの原石を磨く一手を今日決めよ。",
  },
};

const RANK_C = {
  typeName: "原石のプロトタイプ",
  typeDescription:
    "四軸すべてがまだ20%以下の原石段階。どこから磨いても景色が変わります。完璧は不要です。一歩が、すべてを変えます。",
  firstStep: {
    axisName: "始動",
    categoryId: "lifestyle" as CategoryId,
    why: "スコアの低さは欠点ではなく、伸びしろの証明だ。",
    action:
      "ここからが全ての始まりだ。今夜、起床時刻を一つ決め、アラームをセットせよ。原石は、最初の一手で輝き始める。",
  },
};

const WEAKNESS_HINTS: Record<CategoryId, string[]> = {
  physique: [
    "睡眠・水分・運動頻度の基礎を先に固めると、全体の効率が上がります。",
    "体組成やトレ記録など、数値で現状を見える化しましょう。",
  ],
  appearance: [
    "スキンケアと清潔感のある服装を毎日の基準にしましょう。",
    "髪型・ヒゲ・爪など細部の手入れが第一印象を大きく左右します。",
  ],
  lifestyle: [
    "起床・就寝の固定とデスク環境の整頓から整えましょう。",
    "時間とデジタルのコントロールが、他カテゴリの土台になります。",
  ],
  mind: [
    "理想像の言語化と継続学習で、軸のある行動が取りやすくなります。",
    "感情のコントロールと誠実な言葉が、対人関係の質を高めます。",
  ],
};

function getAnswerScore(value: number | undefined): number {
  if (value == null || Number.isNaN(value)) return 0;
  if (value < 1 || value > MAX_CHOICE_SCORE) return 0;
  return value;
}

export function calculateRawTotal(answers: Answers): number {
  return data.questions.reduce(
    (sum, q) => sum + getAnswerScore(answers[q.id]),
    0,
  );
}

/** 0〜100 正規化スコア付きのカテゴリ集計 */
export function calculateCategoryScores(answers: Answers): CategoryScore[] {
  return AXIS_ORDER.map((categoryId) => {
    const category = data.categories.find((c) => c.id === categoryId)!;
    const categoryQuestions = data.questions.filter(
      (q) => q.categoryId === categoryId,
    );
    const rawScore = categoryQuestions.reduce(
      (sum, q) => sum + getAnswerScore(answers[q.id]),
      0,
    );
    const count = categoryQuestions.length;
    const maxScore = count * MAX_CHOICE_SCORE;
    const minScore = count * 1;
    const average = count === 0 ? 0 : rawScore / count;
    const roundedAverage = Math.round(average * 100) / 100;
    const score =
      maxScore === minScore
        ? 0
        : Math.round(((rawScore - minScore) / (maxScore - minScore)) * 100);
    const grade = averageToGrade(roundedAverage);
    const gradeMeta = GRADE_META[grade];
    const axis = AXIS_DISPLAY[categoryId];

    const weaknesses =
      score <= 40
        ? WEAKNESS_HINTS[categoryId]
        : score <= 70
          ? WEAKNESS_HINTS[categoryId].slice(0, 1)
          : [];

    return {
      categoryId,
      axisCode: axis.code,
      axisName: axis.name,
      label: category.label,
      shortLabel: category.shortLabel,
      average: roundedAverage,
      grade,
      gradeLabel: gradeMeta.label,
      level: score >= 60 ? "H" : "L",
      radarValue: grade,
      score,
      maxScore,
      rawScore,
      weaknesses,
      feedback: resolveCategoryFeedback(categoryId, grade),
    };
  });
}

/** スコア高い順（同点は AXIS_ORDER で安定化） */
export function sortCategoriesByScore(
  categoryScores: CategoryScore[],
): CategoryScore[] {
  return [...categoryScores].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return (
      AXIS_ORDER.indexOf(a.categoryId) - AXIS_ORDER.indexOf(b.categoryId)
    );
  });
}

export function resolveDiagnosisRank(
  categoryScores: CategoryScore[],
): DiagnosisRank {
  if (categoryScores.every((c) => c.score >= RANK_S_MIN_SCORE)) return "S";
  if (categoryScores.every((c) => c.score <= RANK_C_MAX_SCORE)) return "C";
  return "B";
}

function buildInsight(ordered: CategoryScore[]): DiagnosisInsight {
  const peaks = ordered.filter((c) => c.grade === 4);
  const floors = ordered.filter((c) => c.grade === 1);
  return {
    peaks,
    floors,
    strongest: [ordered[0]!],
    weakest: [ordered[ordered.length - 1]!],
  };
}

function buildAnalysisComment(
  strength: CategoryScore,
  growth: CategoryScore,
): string {
  if (strength.categoryId === growth.categoryId) {
    return `強み（1位）も改善点（最下位）も【${strength.axisName}】（${strength.score}%）。四軸の差はごくわずかです。`;
  }
  return `強み（1位）は【${strength.axisName}】（${strength.score}%）、改善点（最下位）は【${growth.axisName}】（${growth.score}%）です。`;
}

/**
 * 診断の本判定関数。
 * カテゴリ別 0〜100% スコアを受け取り、Rank S → C → B（14タイプ＋状態）の順で結果を返す。
 */
export function calculateResult(
  categoryScores: CategoryScore[],
  totals?: { totalScore: number; maxTotalScore: number },
): DiagnosisResult {
  const ordered = sortCategoriesByScore(categoryScores);
  const totalScore = totals?.totalScore ?? ordered.reduce((s, c) => s + c.rawScore, 0);
  const maxTotalScore = totals?.maxTotalScore ?? MAX_TOTAL_SCORE;
  const totalPercent = Math.round((totalScore / maxTotalScore) * 100);
  const rank = resolveDiagnosisRank(categoryScores);
  const insight = buildInsight(ordered);

  const strength = ordered[0]!;
  const growth = ordered[ordered.length - 1]!;
  const rankOrderIds = ordered.map((c) => c.categoryId);
  const rankOrderLabel = formatRankOrderLabel(ordered);
  const axisCodeOrder = formatAxisCodeOrder(ordered);
  const analysisComment = buildAnalysisComment(strength, growth);
  const scoreStdDev =
    Math.round(calculateStandardDeviation(categoryScores.map((c) => c.score)) * 10) /
    10;

  let typeName: string;
  let displayTypeName: string;
  let typeDescription: string;
  let typeId: DiagnosisResult["typeId"];
  let firstStep: FirstStepAdvice;
  let balanceStyle: DiagnosisResult["balanceStyle"] = null;
  let balanceLabel: string | null = null;
  let experts: DiagnosisResult["experts"] = ["mentor"];

  if (rank === "S") {
    typeId = "supreme";
    typeName = RANK_S.typeName;
    displayTypeName = RANK_S.typeName;
    typeDescription = RANK_S.typeDescription;
    experts = ["mentor", "leadership"];
    // 至高：専用メッセージを維持（レベル別ロジックは適用しない）
    firstStep = {
      ...RANK_S.firstStep,
      typeName,
      typeId: "supreme",
      isLegend: true,
    };
  } else if (rank === "C") {
    typeId = "prototype";
    typeName = RANK_C.typeName;
    displayTypeName = RANK_C.typeName;
    typeDescription = RANK_C.typeDescription;
    experts = ["mentor", "habit", "trainer"];
    firstStep = buildLevelAwareFirstStep({
      typeName,
      typeId: "prototype",
      categoryScores,
      isPrototype: true,
    });
  } else {
    const relativeId = resolveRelativeTypeId(rankOrderIds);
    const relative = getRelativeType(relativeId);
    const style = resolveBalanceStyle(categoryScores.map((c) => c.score));
    typeId = relativeId;
    typeName = relative.typeName;
    balanceStyle = style;
    balanceLabel = balanceStyleLabel(style);
    displayTypeName = relative.typeName;
    typeDescription = relative.typeDescription;
    experts = relative.experts;
    firstStep = buildLevelAwareFirstStep({
      typeName: relative.typeName,
      typeId: relativeId,
      categoryScores,
    });
  }

  const axisSummary = ordered
    .map((c) => `${c.axisName} ${c.score}%`)
    .join(" > ");

  return {
    totalScore,
    maxTotalScore,
    totalPercent,
    categoryScores,
    orderedScores: ordered,
    typeId,
    typeName,
    displayTypeName,
    typeDescription,
    typeCode: `${axisCodeOrder} · ${rankOrderLabel}`,
    axisSummary,
    analysisComment,
    strengthAxis: strength,
    growthAxis: growth,
    balanceStyle,
    balanceStyleLabel: balanceLabel,
    scoreStdDev,
    experts,
    firstStep,
    insight,
    isLegend: rank === "S",
    rank,
  };
}

/** 回答データから結果を構築（内部で calculateResult を呼ぶ） */
export function buildDiagnosisResult(answers: Answers): DiagnosisResult {
  const categoryScores = calculateCategoryScores(answers);
  return calculateResult(categoryScores, {
    totalScore: calculateRawTotal(answers),
    maxTotalScore: MAX_TOTAL_SCORE,
  });
}

export { getOrderedQuestions, questionsDataset } from "@/lib/diagnosis/questions-data";

export function assertQuestionCount(): void {
  if (
    process.env.NODE_ENV !== "production" &&
    data.questions.length !== TOTAL_QUESTIONS
  ) {
    console.warn(
      `[diagnosis] 想定問数 ${TOTAL_QUESTIONS} に対し実際は ${data.questions.length} 問です。`,
    );
  }
}

export { LIKERT_SCALE };
