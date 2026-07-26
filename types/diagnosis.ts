export type CategoryId =
  | "physique"
  | "appearance"
  | "lifestyle"
  | "mind";

export type CategoryMeta = {
  id: CategoryId;
  label: string;
  shortLabel: string;
  description: string;
};

export type LikertChoice = {
  value: 1 | 2 | 3 | 4 | 5;
  label: string;
};

export type Question = {
  id: string;
  categoryId: CategoryId;
  text: string;
};

export type QuestionsData = {
  categories: CategoryMeta[];
  questions: Question[];
};

export type Answers = Record<string, number>;

export type GradeLevel = 1 | 2 | 3 | 4;

export type GradeMeta = {
  level: GradeLevel;
  label: string;
  shortLabel: string;
};

/** @deprecated 相対スコア判定では主に使わない */
export type AxisLevel = "H" | "L";

export type DiagnosisRank = "S" | "B" | "C";

export type BalanceStyle = "specialist" | "balanced";

export type RelativeTypeId =
  | "steel_embodiment"
  | "pioneering_frontier"
  | "refined_warrior"
  | "solitary_aesthetic"
  | "flawless_routiner"
  | "silent_strategist"
  | "evolution_seeker"
  | "intellectual_builder"
  | "unyielding_hardworker"
  | "charismatic_innovator"
  | "ironclad_logical"
  | "refined_philosopher"
  | "passionate_artist"
  | "disciplined_tank";

export type ResultTypeId = RelativeTypeId | "supreme" | "prototype";

/** @deprecated H/L 16タイプ時代の互換 */
export type PersonalityTypeCode = string;

/** @deprecated */
export type PersonalityTypeDef = {
  code: PersonalityTypeCode;
  typeName: string;
  typeDescription: string;
  experts: ExpertKind[];
};

export type ExpertKind =
  | "trainer"
  | "nutrition"
  | "stylist"
  | "beauty"
  | "habit"
  | "mental"
  | "leadership"
  | "mentor";

export type AxisProfile = {
  categoryId: CategoryId;
  axisCode: "P" | "S" | "D" | "M";
  axisName: string;
  label: string;
  shortLabel: string;
  average: number;
  grade: GradeLevel;
  gradeLabel: string;
  level: AxisLevel;
  radarValue: GradeLevel;
  /** 0〜100 正規化スコア */
  score: number;
  maxScore: number;
  rawScore: number;
  weaknesses: string[];
  feedback: string;
};

export type CategoryScore = AxisProfile;

export type FirstStepAdvice = {
  axisName: string;
  categoryId: CategoryId;
  typeName: string;
  typeId: ResultTypeId;
  why: string;
  action: string;
  /** 優先補強軸のレベル（至高は省略可） */
  grade?: GradeLevel;
  gradeLabel?: string;
  isLegend?: boolean;
  isPrototype?: boolean;
};

export type DiagnosisInsight = {
  peaks: CategoryScore[];
  floors: CategoryScore[];
  strongest: CategoryScore[];
  weakest: CategoryScore[];
};

export type DiagnosisResult = {
  totalScore: number;
  maxTotalScore: number;
  totalPercent: number;
  categoryScores: CategoryScore[];
  /** 高い順 */
  orderedScores: CategoryScore[];
  typeId: ResultTypeId;
  /** タイプ名（例: 鋼の体現者） */
  typeName: string;
  /** 表示用タイプ名（型の付記なし。typeName と同じ） */
  displayTypeName: string;
  typeDescription: string;
  /** 順位ラベル（例: フィジカル > マインド > …） */
  typeCode: string;
  axisSummary: string;
  /** 強み・伸びしろの具体コメント */
  analysisComment: string;
  strengthAxis: CategoryScore;
  growthAxis: CategoryScore;
  /** Rank B の状態。Rank S/C は null */
  balanceStyle: BalanceStyle | null;
  balanceStyleLabel: string | null;
  /** カテゴリスコアの標準偏差 */
  scoreStdDev: number;
  experts: ExpertKind[];
  firstStep: FirstStepAdvice;
  insight: DiagnosisInsight;
  isLegend: boolean;
  rank: DiagnosisRank;
};
