import type { CategoryId, ExpertKind } from "@/types/diagnosis";

/** Rank B の14タイプID（強み順列） */
export type RelativeTypeId =
  | "steel_embodiment" // P>S>D>M 鋼の体現者
  | "pioneering_frontier" // P>M>D>S 開拓する先駆者
  | "refined_warrior" // S>P>D>M 洗練された戦士
  | "solitary_aesthetic" // S>D>P>M 孤高の美学主義者
  | "flawless_routiner" // D>P>M>S 無欠のルーティナー
  | "silent_strategist" // D>S>M>P 静寂の戦略家
  | "evolution_seeker" // M>P>D>S 進化の探求者
  | "intellectual_builder" // M>D>S>P 知的な構築者
  | "unyielding_hardworker" // P>D>S>M 不屈のハードワーカー
  | "charismatic_innovator" // S>M>P>D カリスマ・イノベーター
  | "ironclad_logical" // D>M>P>S 鉄壁のロジカルマン
  | "refined_philosopher" // M>S>D>P 洗練された哲学士
  | "passionate_artist" // P>M>S>D 情熱のアーティスト
  | "disciplined_tank"; // D>P>S>M 規律の重戦車

export type BalanceStyle = "specialist" | "balanced";

export type RelativeTypeDef = {
  id: RelativeTypeId;
  typeName: string;
  /** タイプ固有の基本解説 */
  typeDescription: string;
  /** スペシャリスト型向け追記 */
  specialistNote: string;
  /** バランス型向け追記 */
  balancedNote: string;
  experts: ExpertKind[];
};

export const RELATIVE_TYPES: Record<RelativeTypeId, RelativeTypeDef> = {
  steel_embodiment: {
    id: "steel_embodiment",
    typeName: "鋼の体現者",
    typeDescription:
      "フィジカルが頂点で、スタイルと規律が続く。身体そのものが説得力になり、見た目と習慣がそれを支えています。",
    specialistNote:
      "突出した身体能力が武器。得意領域で圧倒しつつ、最下位軸を一点だけ補強すると完成度が跳ねます。",
    balancedNote:
      "四軸の差は小さめ。鋼の身体を軸に、全体を均等に磨くほど「隙のない男」に近づきます。",
    experts: ["trainer", "nutrition"],
  },
  pioneering_frontier: {
    id: "pioneering_frontier",
    typeName: "開拓する先駆者",
    typeDescription:
      "身体とマインドが先頭。動ける知性で未知を切り拓く先駆者です。規律が三番手にあり、継続が次の鍵です。",
    specialistNote:
      "尖った開拓力が強み。一点突破の勢いを活かし、弱い軸は最小コストで底上げしましょう。",
    balancedNote:
      "先駆者でありつつ全体が安定。挑戦の幅を広げても崩れにくい、拡張型のバランスです。",
    experts: ["mental", "habit"],
  },
  refined_warrior: {
    id: "refined_warrior",
    typeName: "洗練された戦士",
    typeDescription:
      "スタイルが先に立ち、身体がすぐ続く。見た目の完成度に肉体の根拠が伴う、洗練された戦士タイプです。",
    specialistNote:
      "美意識と身体の尖りが武器。その二軸で差別化し、最下位の内面・習慣を一点強化すると無敵です。",
    balancedNote:
      "洗練と強度が均等に近い。日常の細部まで整えるほど、戦士の品格が伝わります。",
    experts: ["stylist", "trainer"],
  },
  solitary_aesthetic: {
    id: "solitary_aesthetic",
    typeName: "孤高の美学主義者",
    typeDescription:
      "スタイルと規律が上位。自分の美意識をルーティンで守り抜く、孤高の美学主義者です。",
    specialistNote:
      "美学の尖りがアイデンティティ。少数の強い軸で勝負し、身体や内面は必要最小限で補いましょう。",
    balancedNote:
      "美意識が安定して循環しています。孤高さを保ちつつ、他軸を少し足すと影響力が増します。",
    experts: ["beauty", "habit"],
  },
  flawless_routiner: {
    id: "flawless_routiner",
    typeName: "無欠のルーティナー",
    typeDescription:
      "規律が頂点で、身体とマインドが続く。崩さない生活設計が武器の、無欠のルーティナーです。",
    specialistNote:
      "継続の尖りが圧倒的。ルーティンを軸に成果を積み、弱い見た目軸は週次の小さな改善で十分です。",
    balancedNote:
      "生活の型が全体を支えています。無欠さを保ちながら、表現面を少し足すと説得力が増します。",
    experts: ["habit", "trainer"],
  },
  silent_strategist: {
    id: "silent_strategist",
    typeName: "静寂の戦略家",
    typeDescription:
      "規律とスタイルが上位。静かに整え、静かに勝つ戦略家。マインドが三番手で設計力が効いています。",
    specialistNote:
      "秩序と美意識の尖りが武器。表に出さない強みを活かし、最下位軸だけを戦略的に補強してください。",
    balancedNote:
      "静かで安定した四軸。戦略家らしい控えめさのまま、全体を少しずつ上げるのが最適です。",
    experts: ["habit", "stylist"],
  },
  evolution_seeker: {
    id: "evolution_seeker",
    typeName: "進化の探求者",
    typeDescription:
      "マインドが先頭で身体が続く。考えながら進化する探求者。規律が三番手で、学びが行動に落ちています。",
    specialistNote:
      "知的好奇心の尖りがエンジン。探求を深めつつ、最下位の見た目軸を一点だけ可視化しましょう。",
    balancedNote:
      "進化のペースが安定。探求と身体の両輪を保ちながら、全体を底上げすると成長が加速します。",
    experts: ["mental", "trainer"],
  },
  intellectual_builder: {
    id: "intellectual_builder",
    typeName: "知的な構築者",
    typeDescription:
      "マインドと規律で人生を組み立てる構築者。思想と型が先にあり、表現と身体が伸びしろです。",
    specialistNote:
      "設計力の尖りが強み。知的な構築を武器に、最下位軸は「見える成果」に変換する一手で十分です。",
    balancedNote:
      "内面と習慣が均衡。構築者らしい丁寧さで、フィジカルとスタイルも同じ精度で積み上げられます。",
    experts: ["mental", "habit"],
  },
  unyielding_hardworker: {
    id: "unyielding_hardworker",
    typeName: "不屈のハードワーカー",
    typeDescription:
      "フィジカルと規律が上位。止まらない努力で結果を出す、不屈のハードワーカーです。",
    specialistNote:
      "努力の尖りが武器。量で押せる強みを活かし、最下位の内面・表現を一点だけ言語化しましょう。",
    balancedNote:
      "努力が全体に分散しています。不屈さを保ちつつ、効率と見た目の翻訳を足すとさらに強くなります。",
    experts: ["trainer", "habit"],
  },
  charismatic_innovator: {
    id: "charismatic_innovator",
    typeName: "カリスマ・イノベーター",
    typeDescription:
      "スタイルとマインドが上位。感性と思想で人を動かす、カリスマ・イノベーターです。",
    specialistNote:
      "発信力の尖りが武器。カリスマ性で勝負し、最下位の規律は最小のルーティンで支えましょう。",
    balancedNote:
      "魅力と知性が安定。イノベーションを続けつつ、身体と習慣の土台を均等に積むと影響が持続します。",
    experts: ["stylist", "mental"],
  },
  ironclad_logical: {
    id: "ironclad_logical",
    typeName: "鉄壁のロジカルマン",
    typeDescription:
      "規律とマインドが上位。論理と型で崩れない、鉄壁のロジカルマンです。",
    specialistNote:
      "論理の尖りが防壁。鉄壁を活かし、最下位の見た目・身体は週1の固定タスクで補強すれば足ります。",
    balancedNote:
      "論理と習慣が均衡。鉄壁さを保ったまま、表現面を少し足すと説得力が外に漏れ出します。",
    experts: ["habit", "mental"],
  },
  refined_philosopher: {
    id: "refined_philosopher",
    typeName: "洗練された哲学士",
    typeDescription:
      "マインドとスタイルが上位。言葉と装いに品がある、洗練された哲学士です。",
    specialistNote:
      "思想と美意識の尖りが武器。哲学で差別化し、最下位の身体・規律は小さな習慣から始めましょう。",
    balancedNote:
      "知性と洗練が安定。哲学士らしい深みを保ちつつ、フィジカルを足すと思想に厚みが出ます。",
    experts: ["mental", "stylist"],
  },
  passionate_artist: {
    id: "passionate_artist",
    typeName: "情熱のアーティスト",
    typeDescription:
      "フィジカルとマインドが上位でスタイルが続く。身体に宿る情熱を表現へつなぐアーティストです。",
    specialistNote:
      "情熱の尖りが創作の燃料。強い二軸で勝負し、最下位の規律は制作リズムとして最小限整えましょう。",
    balancedNote:
      "情熱が四軸に分散しにくい安定感。表現の幅を広げても崩れにくい、持続型のアーティストです。",
    experts: ["trainer", "mental"],
  },
  disciplined_tank: {
    id: "disciplined_tank",
    typeName: "規律の重戦車",
    typeDescription:
      "規律が頂点で身体が続く。止まらず押し切る、規律の重戦車タイプです。",
    specialistNote:
      "推進力の尖りが武器。重戦車の勢いを活かし、最下位の内面・表現は「勝利条件」だけ定めれば足ります。",
    balancedNote:
      "規律が全体を牽引しています。重戦車の安定感を保ちつつ、スタイルを少し足すと威圧が品格に変わります。",
    experts: ["habit", "trainer"],
  },
};

const AXIS_CODE: Record<CategoryId, "P" | "S" | "D" | "M"> = {
  physique: "P",
  appearance: "S",
  lifestyle: "D",
  mind: "M",
};

/** 定義済み14順列（コード列 → タイプ） */
const PATTERN_TO_TYPE: Record<string, RelativeTypeId> = {
  PSDM: "steel_embodiment",
  PMDS: "pioneering_frontier",
  SPDM: "refined_warrior",
  SDPM: "solitary_aesthetic",
  DPMS: "flawless_routiner",
  DSMP: "silent_strategist",
  MPDS: "evolution_seeker",
  MDSP: "intellectual_builder",
  PDSM: "unyielding_hardworker",
  SMPD: "charismatic_innovator",
  DMPS: "ironclad_logical",
  MSDP: "refined_philosopher",
  PMSD: "passionate_artist",
  DPSM: "disciplined_tank",
};

/** 未定義の順列は上位2軸が同じ定義済みタイプへフォールバック */
const TOP2_FALLBACK: Record<string, RelativeTypeId> = {
  PS: "steel_embodiment",
  PM: "passionate_artist",
  PD: "unyielding_hardworker",
  SP: "refined_warrior",
  SD: "solitary_aesthetic",
  SM: "charismatic_innovator",
  DP: "flawless_routiner",
  DS: "silent_strategist",
  DM: "ironclad_logical",
  MP: "evolution_seeker",
  MS: "refined_philosopher",
  MD: "intellectual_builder",
};

/**
 * 高い順のカテゴリ配列 → 14タイプID
 */
export function resolveRelativeTypeId(
  orderedIds: CategoryId[],
): RelativeTypeId {
  const codes = orderedIds.map((id) => AXIS_CODE[id]);
  const pattern = codes.join("");
  if (PATTERN_TO_TYPE[pattern]) return PATTERN_TO_TYPE[pattern];

  const top2 = `${codes[0]}${codes[1]}`;
  return TOP2_FALLBACK[top2] ?? "intellectual_builder";
}

export function getRelativeType(id: RelativeTypeId): RelativeTypeDef {
  return RELATIVE_TYPES[id];
}

export function formatRankOrderLabel(
  ordered: Array<{ axisName: string; axisCode?: string }>,
): string {
  return ordered.map((o) => o.axisName).join(" > ");
}

export function formatAxisCodeOrder(
  ordered: Array<{ axisCode: string }>,
): string {
  return ordered.map((o) => o.axisCode).join(" > ");
}

/** タイプ名 + 状態（スペシャリスト／バランス）に応じた解説文 */
export function buildTypeDescription(
  type: RelativeTypeDef,
  balanceStyle: BalanceStyle,
): string {
  const note =
    balanceStyle === "specialist" ? type.specialistNote : type.balancedNote;
  return `${type.typeDescription}\n\n${note}`;
}

/**
 * 標準偏差で状態を判定。
 * SD ≥ 12 → スペシャリスト型（項目間のバラつき大）
 * SD < 12 → バランス型
 */
export const SPECIALIST_SD_THRESHOLD = 12;

export function calculateStandardDeviation(values: number[]): number {
  if (values.length === 0) return 0;
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance =
    values.reduce((sum, v) => sum + (v - mean) ** 2, 0) / values.length;
  return Math.sqrt(variance);
}

export function resolveBalanceStyle(scores: number[]): BalanceStyle {
  const sd = calculateStandardDeviation(scores);
  return sd >= SPECIALIST_SD_THRESHOLD ? "specialist" : "balanced";
}

export function balanceStyleLabel(style: BalanceStyle): string {
  return style === "specialist" ? "スペシャリスト型" : "バランス型";
}
