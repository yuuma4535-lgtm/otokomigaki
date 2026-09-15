import type { ActivityLevel, Sex } from "@/lib/nutrition/calculate";

export type MicronutrientId =
  | "vitaminA"
  | "vitaminB1"
  | "vitaminB2"
  | "vitaminC"
  | "vitaminD"
  | "calcium"
  | "iron"
  | "zinc"
  | "magnesium"
  | "fiber";

export type MicronutrientTarget = {
  id: MicronutrientId;
  name: string;
  amount: number;
  unit: string;
  why: string;
  /** カードの色分け用アクセント */
  accent: string;
  /** 表示用の短い記号 */
  mark: string;
};

type AgeBand = "15-17" | "18-29" | "30-49" | "50-64" | "65-74" | "75+";

/** 日本人の食事摂取基準（2020年版）を参考にした推奨量／目安量 */
type BandValues = Record<
  MicronutrientId,
  { male: number; female: number; unit: string }
>;

const META: Record<
  MicronutrientId,
  { name: string; why: string; accent: string; mark: string }
> = {
  vitaminA: {
    name: "ビタミンA",
    why: "皮膚や粘膜の健康を保ち、視覚機能にも関わる栄養素です。",
    accent: "#c9a066",
    mark: "A",
  },
  vitaminB1: {
    name: "ビタミンB1",
    why: "糖質のエネルギー代謝を助け、疲労感のケアにも関わります。",
    accent: "#b8943d",
    mark: "B1",
  },
  vitaminB2: {
    name: "ビタミンB2",
    why: "脂質の代謝や細胞の再生を支える水溶性ビタミンです。",
    accent: "#d4b56a",
    mark: "B2",
  },
  vitaminC: {
    name: "ビタミンC",
    why: "抗酸化やコラーゲン生成を助け、免疫の維持にも関わります。",
    accent: "#8f7129",
    mark: "C",
  },
  vitaminD: {
    name: "ビタミンD",
    why: "カルシウムの吸収を助け、骨の健康に関わる栄養素です。",
    accent: "#a67c3a",
    mark: "D",
  },
  calcium: {
    name: "カルシウム",
    why: "骨や歯の構成成分で、筋肉の収縮にも関わります。",
    accent: "#9a8a6a",
    mark: "Ca",
  },
  iron: {
    name: "鉄",
    why: "ヘモグロビンの材料となり、酸素を全身へ運ぶ助けになります。",
    accent: "#8a6a4a",
    mark: "Fe",
  },
  zinc: {
    name: "亜鉛",
    why: "味覚や皮膚・免疫の維持、たんぱく質合成に関わります。",
    accent: "#7a735f",
    mark: "Zn",
  },
  magnesium: {
    name: "マグネシウム",
    why: "筋肉の弛緩やエネルギー代謝、神経の働きを支えます。",
    accent: "#6f6a62",
    mark: "Mg",
  },
  fiber: {
    name: "食物繊維",
    why: "腸内環境を整え、血糖や脂質のコントロールを助けます。",
    accent: "#8a857c",
    mark: "Fi",
  },
};

/**
 * 年齢区分ごとの基準値。
 * 単位: ビタミンAは μgRAE、ビタミンDは μg、食物繊維・ミネラルは mg／g。
 */
const TABLE: Record<AgeBand, BandValues> = {
  "15-17": {
    vitaminA: { male: 900, female: 650, unit: "μgRAE" },
    vitaminB1: { male: 1.4, female: 1.2, unit: "mg" },
    vitaminB2: { male: 1.6, female: 1.4, unit: "mg" },
    vitaminC: { male: 100, female: 100, unit: "mg" },
    vitaminD: { male: 8.5, female: 8.5, unit: "μg" },
    calcium: { male: 800, female: 650, unit: "mg" },
    iron: { male: 10, female: 10.5, unit: "mg" },
    zinc: { male: 12, female: 9, unit: "mg" },
    magnesium: { male: 300, female: 260, unit: "mg" },
    fiber: { male: 19, female: 18, unit: "g" },
  },
  "18-29": {
    vitaminA: { male: 850, female: 650, unit: "μgRAE" },
    vitaminB1: { male: 1.4, female: 1.1, unit: "mg" },
    vitaminB2: { male: 1.6, female: 1.2, unit: "mg" },
    vitaminC: { male: 100, female: 100, unit: "mg" },
    vitaminD: { male: 8.5, female: 8.5, unit: "μg" },
    calcium: { male: 800, female: 650, unit: "mg" },
    iron: { male: 7.5, female: 10.5, unit: "mg" },
    zinc: { male: 11, female: 8, unit: "mg" },
    magnesium: { male: 340, female: 270, unit: "mg" },
    fiber: { male: 21, female: 18, unit: "g" },
  },
  "30-49": {
    vitaminA: { male: 900, female: 700, unit: "μgRAE" },
    vitaminB1: { male: 1.4, female: 1.1, unit: "mg" },
    vitaminB2: { male: 1.6, female: 1.2, unit: "mg" },
    vitaminC: { male: 100, female: 100, unit: "mg" },
    vitaminD: { male: 8.5, female: 8.5, unit: "μg" },
    calcium: { male: 750, female: 650, unit: "mg" },
    iron: { male: 7.5, female: 10.5, unit: "mg" },
    zinc: { male: 11, female: 8, unit: "mg" },
    magnesium: { male: 370, female: 290, unit: "mg" },
    fiber: { male: 21, female: 18, unit: "g" },
  },
  "50-64": {
    vitaminA: { male: 900, female: 700, unit: "μgRAE" },
    vitaminB1: { male: 1.3, female: 1.1, unit: "mg" },
    vitaminB2: { male: 1.5, female: 1.2, unit: "mg" },
    vitaminC: { male: 100, female: 100, unit: "mg" },
    vitaminD: { male: 8.5, female: 8.5, unit: "μg" },
    calcium: { male: 750, female: 650, unit: "mg" },
    iron: { male: 7.5, female: 6.5, unit: "mg" },
    zinc: { male: 11, female: 8, unit: "mg" },
    magnesium: { male: 350, female: 290, unit: "mg" },
    fiber: { male: 20, female: 18, unit: "g" },
  },
  "65-74": {
    vitaminA: { male: 850, female: 700, unit: "μgRAE" },
    vitaminB1: { male: 1.2, female: 1.1, unit: "mg" },
    vitaminB2: { male: 1.3, female: 1.2, unit: "mg" },
    vitaminC: { male: 100, female: 100, unit: "mg" },
    vitaminD: { male: 8.5, female: 8.5, unit: "μg" },
    calcium: { male: 750, female: 650, unit: "mg" },
    iron: { male: 7.5, female: 6, unit: "mg" },
    zinc: { male: 11, female: 8, unit: "mg" },
    magnesium: { male: 320, female: 270, unit: "mg" },
    fiber: { male: 20, female: 17, unit: "g" },
  },
  "75+": {
    vitaminA: { male: 800, female: 650, unit: "μgRAE" },
    vitaminB1: { male: 1.1, female: 0.9, unit: "mg" },
    vitaminB2: { male: 1.2, female: 1.1, unit: "mg" },
    vitaminC: { male: 100, female: 100, unit: "mg" },
    vitaminD: { male: 8.5, female: 8.5, unit: "μg" },
    calcium: { male: 700, female: 650, unit: "mg" },
    iron: { male: 7, female: 6, unit: "mg" },
    zinc: { male: 11, female: 8, unit: "mg" },
    magnesium: { male: 290, female: 250, unit: "mg" },
    fiber: { male: 19, female: 16, unit: "g" },
  },
};

const ORDER: MicronutrientId[] = [
  "vitaminA",
  "vitaminB1",
  "vitaminB2",
  "vitaminC",
  "vitaminD",
  "calcium",
  "iron",
  "zinc",
  "magnesium",
  "fiber",
];

function ageBand(age: number): AgeBand {
  if (age < 18) return "15-17";
  if (age < 30) return "18-29";
  if (age < 50) return "30-49";
  if (age < 65) return "50-64";
  if (age < 75) return "65-74";
  return "75+";
}

/**
 * 活動量が高い場合に増えるとされる水溶性ビタミン等を、一般的な範囲で少し上乗せ。
 */
function activityFactor(id: MicronutrientId, activity: ActivityLevel): number {
  if (activity === "sedentary" || activity === "light") return 1;
  const boostIntense = activity === "intense";
  switch (id) {
    case "vitaminB1":
    case "vitaminB2":
      return boostIntense ? 1.15 : 1.08;
    case "vitaminC":
      return boostIntense ? 1.12 : 1.05;
    case "magnesium":
      return boostIntense ? 1.08 : 1.03;
    default:
      return 1;
  }
}

function formatAmount(id: MicronutrientId, value: number): number {
  if (
    id === "vitaminB1" ||
    id === "vitaminB2" ||
    id === "vitaminD" ||
    id === "iron"
  ) {
    return Math.round(value * 10) / 10;
  }
  return Math.round(value);
}

/**
 * 性別・年齢・活動レベルから、1日のミクロ栄養素の目安量を返す。
 */
export function getMicronutrientTargets(
  sex: Sex,
  age: number,
  activity: ActivityLevel,
): MicronutrientTarget[] {
  const band = TABLE[ageBand(age)];

  return ORDER.map((id) => {
    const row = band[id];
    const base = sex === "male" ? row.male : row.female;
    const amount = formatAmount(id, base * activityFactor(id, activity));
    const meta = META[id];
    return {
      id,
      name: meta.name,
      amount,
      unit: row.unit,
      why: meta.why,
      accent: meta.accent,
      mark: meta.mark,
    };
  });
}
