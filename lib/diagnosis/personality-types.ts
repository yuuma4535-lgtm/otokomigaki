import type {
  AxisLevel,
  CategoryId,
  ExpertKind,
  PersonalityTypeCode,
  PersonalityTypeDef,
} from "@/types/diagnosis";

/** 軸順: Pフィジカル / Sスタイル / D規律 / Mマインド */
export const AXIS_ORDER = [
  "physique",
  "appearance",
  "lifestyle",
  "mind",
] as const;

export const AXIS_DISPLAY: Record<
  (typeof AXIS_ORDER)[number],
  { code: "P" | "S" | "D" | "M"; name: string }
> = {
  physique: { code: "P", name: "フィジカル" },
  appearance: { code: "S", name: "スタイル" },
  lifestyle: { code: "D", name: "規律" },
  mind: { code: "M", name: "マインド" },
};

/** High/Low は平均3.0境界（grade.ts の averageToAxisLevel） */
export {
  averageToGrade,
  averageToAxisLevel,
  AXIS_HIGH_AVERAGE,
  RANK_S_MIN_AVERAGE,
  RANK_C_MAX_AVERAGE,
} from "@/lib/diagnosis/grade";

/**
 * カテゴリ別フィードバック（4段階レベル基準）
 */
export const CATEGORY_FEEDBACK: Record<
  CategoryId,
  Record<1 | 2 | 3 | 4, string>
> = {
  physique: {
    1: "睡眠・水分・週1の運動から、土台づくりの型。",
    2: "運動回数と食事の質を、一段だけ明確にする余白。",
    3: "記録と回復の精度で、卓越へ押し上げられる一手。",
    4: "余裕と持続可能性が、さらなる凄み。",
  },
  appearance: {
    1: "スキンケアと清潔な服選びからの、最短の一手。",
    2: "髪型・手元・靴の三点が、日々の習慣に。",
    3: "TPOの微調整で研ぎ澄まされる第一印象。",
    4: "一貫した美学が、無言のブランド。",
  },
  lifestyle: {
    1: "就寝・起床の固定から、小さな勝ちの積み重ね。",
    2: "起床固定とデスク整理で、一日の主導権。",
    3: "最適化の余白が、高いパフォーマンスを支える土台。",
    4: "静かで再現可能な日常が、成果を自動で生む型。",
  },
  mind: {
    1: "毎日3行の振り返りで、自分の中心への回帰。",
    2: "理想像の言語化と学習継続で、決断の質が上がる余白。",
    3: "言葉と行動の一致が、さらなる影響力の源泉。",
    4: "信念と品格が、周囲の選択基準。",
  },
};

/** カテゴリ別・内省を促す問いかけ（アドバイス文末に付与） */
export const CATEGORY_REFLECTION_PROMPT: Record<CategoryId, string> = {
  physique: "その身体は、意図通りに動かせていますか？",
  appearance: "それに、あなた自身は気づいていますか？",
  lifestyle: "その型は、昨日も守れましたか？",
  mind: "その強みを、次はどう活かしますか？",
};

export function resolveCategoryFeedback(
  categoryId: CategoryId,
  grade: 1 | 2 | 3 | 4,
): string {
  return CATEGORY_FEEDBACK[categoryId][grade];
}

export function resolveCategoryReflectionPrompt(
  categoryId: CategoryId,
): string {
  return CATEGORY_REFLECTION_PROMPT[categoryId];
}

export const EXPERT_META: Record<
  ExpertKind,
  { label: string; blurb: string }
> = {
  trainer: {
    label: "パーソナルトレーナー",
    blurb: "身体づくり・フォーム・過負荷の設計",
  },
  nutrition: {
    label: "栄養・食事アドバイザー",
    blurb: "PFC・食事タイミング・体組成改善",
  },
  stylist: {
    label: "ファッションスタイリスト",
    blurb: "似合う服・TPO・着こなしの洗練",
  },
  beauty: {
    label: "美容・身だしなみの専門家",
    blurb: "スキンケア・髪型・清潔感の底上げ",
  },
  habit: {
    label: "習慣・ライフコーチ",
    blurb: "ルーティン・時間管理・継続の仕組み",
  },
  mental: {
    label: "メンタル・自己理解コーチ",
    blurb: "軸・感情・自己効力感の強化",
  },
  leadership: {
    label: "リーダーシップコーチ",
    blurb: "対人・品格・影響力の磨き込み",
  },
  mentor: {
    label: "男磨き総合メンター",
    blurb: "全体最適での次の一手を伴走",
  },
};

/**
 * 16タイプ定義（判定順: P/S/D/M = フィジカル/スタイル/規律/マインド）
 */
export const PERSONALITY_TYPES: Record<PersonalityTypeCode, PersonalityTypeDef> =
  {
    HHHH: {
      code: "HHHH",
      typeName: "至高の支配者",
      typeDescription:
        "四軸すべてが高水準（平均3.0以上）。身体・装い・規律・精神が連動し、場を引き締める中心に立てる存在です。",
      experts: ["mentor", "leadership"],
    },
    HHHL: {
      code: "HHHL",
      typeName: "孤高の戦士",
      typeDescription:
        "フィジカル・スタイル・規律は強靭。内面の言語化と対人の深みが次の戦場です。強さを魅力へ翻訳する段階にいます。",
      experts: ["mental", "leadership"],
    },
    HHLH: {
      code: "HHLH",
      typeName: "ストイック・エリート",
      typeDescription:
        "身体・スタイル・マインドは高いが、日常の型が揺れやすい。才能を「再現可能な成果」に変える規律設計が鍵です。",
      experts: ["habit", "mentor"],
    },
    HHLL: {
      code: "HHLL",
      typeName: "スタイル・マスター",
      typeDescription:
        "フィジカルとスタイルが前面に立つ視覚的リーダー。習慣と内面の軸を足すと、長く続くブランドになります。",
      experts: ["habit", "mental"],
    },
    HLHH: {
      code: "HLHH",
      typeName: "哲学する求道者",
      typeDescription:
        "身体・規律・マインドで自分を律する求道タイプ。装いの精度が上がれば、思想に品格が宿ります。",
      experts: ["stylist", "beauty"],
    },
    HLHL: {
      code: "HLHL",
      typeName: "美意識の体現者",
      typeDescription:
        "身体と規律に裏打ちされた美意識。スタイルと精神の表現を整えれば、黙っていても伝わる引力が生まれます。",
      experts: ["stylist", "leadership"],
    },
    HLLH: {
      code: "HLLH",
      typeName: "ストイックな挑戦者",
      typeDescription:
        "身体とマインドで挑み続ける挑戦者。見た目と生活の型を整えれば、努力が外からも見える成果に変わります。",
      experts: ["stylist", "habit"],
    },
    HLLL: {
      code: "HLLL",
      typeName: "ポテンシャル・アスリート",
      typeDescription:
        "まずは身体という拠点を持つタイプ。スタイル・規律・マインドを順番に拓けば、短期間で景色が変わります。",
      experts: ["habit", "beauty", "mental"],
    },
    LHHH: {
      code: "LHHH",
      typeName: "知的な紳士",
      typeDescription:
        "スタイル・規律・マインドが整った知性派。フィジカルという根拠を足すと、言葉に説得力が宿ります。",
      experts: ["trainer", "nutrition"],
    },
    LHHL: {
      code: "LHHL",
      typeName: "モダン・ダンディ",
      typeDescription:
        "装いと生活の精度が高い現代のダンディ。身体と精神の深みで、「整っている」を「凄み」へ昇華できます。",
      experts: ["trainer", "mental"],
    },
    LHLH: {
      code: "LHLH",
      typeName: "冷然なプランナー",
      typeDescription:
        "スタイルとマインドで先を読む戦略家。フィジカルと規律を底上げすると、計画が現実の成果に直結します。",
      experts: ["trainer", "habit"],
    },
    LHLL: {
      code: "LHLL",
      typeName: "スマート・ルーティン型",
      typeDescription:
        "装いを起点に日常を整えるタイプ。身体と精神・規律の連動を強めると、美学が人生のOSになります。",
      experts: ["habit", "trainer", "mental"],
    },
    LLHH: {
      code: "LLHH",
      typeName: "覚醒前夜のポテンシャル型",
      typeDescription:
        "規律とマインドに火が入りつつある段階。身体とスタイルを伴わせれば、内なる理想が外へ現れ始めます。",
      experts: ["trainer", "stylist"],
    },
    LLHL: {
      code: "LLHL",
      typeName: "クリエイティブ・スタイル型",
      typeDescription:
        "規律の枠のなかで独自の感性が芽吹くタイプ。フィジカルとマインドを足すと、表現に説得力が生まれます。",
      experts: ["beauty", "mental", "trainer"],
    },
    LLLH: {
      code: "LLLH",
      typeName: "精神の開拓者",
      typeDescription:
        "マインドの深さで世界を拓く開拓者。身体・スタイル・規律という器を整えると、思想が伝播しやすくなります。",
      experts: ["habit", "stylist", "trainer"],
    },
    LLLL: {
      code: "LLLL",
      typeName: "原石のプロトタイプ",
      typeDescription:
        "すべての軸に大きな伸びしろがある原石。一点突破より、小さな勝ちを四方向に積むのが最短の磨き方です。",
      experts: ["mentor", "habit", "trainer"],
    },
  };

export function buildTypeCode(
  levels: Record<(typeof AXIS_ORDER)[number], AxisLevel>,
): PersonalityTypeCode {
  return AXIS_ORDER.map((id) => levels[id]).join("") as PersonalityTypeCode;
}

export function getPersonalityType(
  code: PersonalityTypeCode,
): PersonalityTypeDef {
  return PERSONALITY_TYPES[code];
}
