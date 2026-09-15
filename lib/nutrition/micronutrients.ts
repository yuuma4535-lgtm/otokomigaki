import type { ActivityLevel, Sex } from "@/lib/nutrition/calculate";

export type MicronutrientId =
  | "vitaminA"
  | "vitaminD"
  | "vitaminE"
  | "vitaminK"
  | "vitaminB1"
  | "vitaminB2"
  | "niacin"
  | "vitaminB6"
  | "vitaminB12"
  | "folate"
  | "pantothenic"
  | "biotin"
  | "vitaminC"
  | "calcium"
  | "phosphorus"
  | "magnesium"
  | "sodiumSalt"
  | "potassium"
  | "iron"
  | "zinc"
  | "copper"
  | "manganese"
  | "iodine"
  | "selenium"
  | "chromium"
  | "molybdenum"
  | "fiber";

export type MicronutrientCategoryId =
  | "fatSoluble"
  | "waterSoluble"
  | "majorMineral"
  | "traceMineral"
  | "other";

export type MicronutrientTarget = {
  id: MicronutrientId;
  name: string;
  amount: number;
  unit: string;
  why: string;
  accent: string;
  mark: string;
  category: MicronutrientCategoryId;
};

export type MicronutrientCategory = {
  id: MicronutrientCategoryId;
  label: string;
  items: MicronutrientTarget[];
};

type AgeBand = "15-17" | "18-29" | "30-49" | "50-64" | "65-74" | "75+";

type BandValues = Record<
  MicronutrientId,
  { male: number; female: number; unit: string }
>;

const CATEGORY_META: Array<{ id: MicronutrientCategoryId; label: string }> = [
  { id: "fatSoluble", label: "脂溶性ビタミン" },
  { id: "waterSoluble", label: "水溶性ビタミン" },
  { id: "majorMineral", label: "多量ミネラル" },
  { id: "traceMineral", label: "微量ミネラル" },
  { id: "other", label: "その他" },
];

const META: Record<
  MicronutrientId,
  {
    name: string;
    why: string;
    accent: string;
    mark: string;
    category: MicronutrientCategoryId;
  }
> = {
  vitaminA: {
    name: "ビタミンA",
    why: "皮膚・粘膜の健康と視覚機能に関わります。",
    accent: "#c9a066",
    mark: "A",
    category: "fatSoluble",
  },
  vitaminD: {
    name: "ビタミンD",
    why: "カルシウム吸収を助け、骨の健康に関わります。",
    accent: "#a67c3a",
    mark: "D",
    category: "fatSoluble",
  },
  vitaminE: {
    name: "ビタミンE",
    why: "抗酸化作用があり、細胞膜の保護に関わります。",
    accent: "#b8943d",
    mark: "E",
    category: "fatSoluble",
  },
  vitaminK: {
    name: "ビタミンK",
    why: "血液凝固と骨代謝の維持に関わります。",
    accent: "#8f7129",
    mark: "K",
    category: "fatSoluble",
  },
  vitaminB1: {
    name: "ビタミンB1",
    why: "糖質のエネルギー代謝を助けます。",
    accent: "#b8943d",
    mark: "B1",
    category: "waterSoluble",
  },
  vitaminB2: {
    name: "ビタミンB2",
    why: "脂質の代謝や細胞の再生を支えます。",
    accent: "#d4b56a",
    mark: "B2",
    category: "waterSoluble",
  },
  niacin: {
    name: "ナイアシン（B3）",
    why: "エネルギー産生と皮膚・粘膜の健康に関わります。",
    accent: "#c9a066",
    mark: "B3",
    category: "waterSoluble",
  },
  vitaminB6: {
    name: "ビタミンB6",
    why: "たんぱく質代謝や神経伝達に関わります。",
    accent: "#a89050",
    mark: "B6",
    category: "waterSoluble",
  },
  vitaminB12: {
    name: "ビタミンB12",
    why: "赤血球の形成と神経機能の維持に関わります。",
    accent: "#9a7d42",
    mark: "B12",
    category: "waterSoluble",
  },
  folate: {
    name: "葉酸",
    why: "DNA合成や赤血球の正常な形成に関わります。",
    accent: "#8a7540",
    mark: "葉",
    category: "waterSoluble",
  },
  pantothenic: {
    name: "パントテン酸",
    why: "エネルギー代謝とホルモン合成を支えます。",
    accent: "#7a6a45",
    mark: "Pa",
    category: "waterSoluble",
  },
  biotin: {
    name: "ビオチン",
    why: "皮膚・毛髪の健康と代謝酵素の働きに関わります。",
    accent: "#6f6340",
    mark: "Bi",
    category: "waterSoluble",
  },
  vitaminC: {
    name: "ビタミンC",
    why: "抗酸化やコラーゲン生成を助けます。",
    accent: "#8f7129",
    mark: "C",
    category: "waterSoluble",
  },
  calcium: {
    name: "カルシウム",
    why: "骨や歯の構成成分で、筋肉の収縮にも関わります。",
    accent: "#9a8a6a",
    mark: "Ca",
    category: "majorMineral",
  },
  phosphorus: {
    name: "リン",
    why: "骨や歯の形成、エネルギー代謝に関わります。",
    accent: "#8a8070",
    mark: "P",
    category: "majorMineral",
  },
  magnesium: {
    name: "マグネシウム",
    why: "筋肉の弛緩やエネルギー代謝を支えます。",
    accent: "#6f6a62",
    mark: "Mg",
    category: "majorMineral",
  },
  sodiumSalt: {
    name: "ナトリウム（食塩相当量）",
    why: "体液のバランス維持に関わります。摂りすぎに注意が必要です。",
    accent: "#7a7368",
    mark: "Na",
    category: "majorMineral",
  },
  potassium: {
    name: "カリウム",
    why: "血圧調整や筋肉・神経の働きに関わります。",
    accent: "#6a655c",
    mark: "K",
    category: "majorMineral",
  },
  iron: {
    name: "鉄",
    why: "ヘモグロビンの材料となり、酸素運搬を助けます。",
    accent: "#8a6a4a",
    mark: "Fe",
    category: "traceMineral",
  },
  zinc: {
    name: "亜鉛",
    why: "味覚・皮膚・免疫の維持に関わります。",
    accent: "#7a735f",
    mark: "Zn",
    category: "traceMineral",
  },
  copper: {
    name: "銅",
    why: "鉄の利用や抗酸化酵素の働きに関わります。",
    accent: "#8a7560",
    mark: "Cu",
    category: "traceMineral",
  },
  manganese: {
    name: "マンガン",
    why: "骨形成や抗酸化酵素の構成に関わります。",
    accent: "#7a6f5a",
    mark: "Mn",
    category: "traceMineral",
  },
  iodine: {
    name: "ヨウ素",
    why: "甲状腺ホルモンの材料となり、代謝調整に関わります。",
    accent: "#6f6858",
    mark: "I",
    category: "traceMineral",
  },
  selenium: {
    name: "セレン",
    why: "抗酸化酵素の構成成分として細胞を守ります。",
    accent: "#655e50",
    mark: "Se",
    category: "traceMineral",
  },
  chromium: {
    name: "クロム",
    why: "糖代謝の正常な維持に関わります。",
    accent: "#5c564a",
    mark: "Cr",
    category: "traceMineral",
  },
  molybdenum: {
    name: "モリブデン",
    why: "体内の酵素反応を助ける微量ミネラルです。",
    accent: "#524c42",
    mark: "Mo",
    category: "traceMineral",
  },
  fiber: {
    name: "食物繊維",
    why: "腸内環境を整え、血糖・脂質のコントロールを助けます。",
    accent: "#8a857c",
    mark: "Fi",
    category: "other",
  },
};

/**
 * 日本人の食事摂取基準（2020年版）を参考にした推奨量／目安量／目標量。
 * ナトリウムは食塩相当量（g）で表示。
 */
const TABLE: Record<AgeBand, BandValues> = {
  "15-17": {
    vitaminA: { male: 900, female: 650, unit: "μgRAE" },
    vitaminD: { male: 8.5, female: 8.5, unit: "μg" },
    vitaminE: { male: 7.0, female: 6.0, unit: "mg" },
    vitaminK: { male: 160, female: 160, unit: "μg" },
    vitaminB1: { male: 1.4, female: 1.2, unit: "mg" },
    vitaminB2: { male: 1.6, female: 1.4, unit: "mg" },
    niacin: { male: 15, female: 12, unit: "mgNE" },
    vitaminB6: { male: 1.4, female: 1.2, unit: "mg" },
    vitaminB12: { male: 2.4, female: 2.4, unit: "μg" },
    folate: { male: 240, female: 240, unit: "μg" },
    pantothenic: { male: 5, female: 5, unit: "mg" },
    biotin: { male: 50, female: 50, unit: "μg" },
    vitaminC: { male: 100, female: 100, unit: "mg" },
    calcium: { male: 800, female: 650, unit: "mg" },
    phosphorus: { male: 1000, female: 800, unit: "mg" },
    magnesium: { male: 300, female: 260, unit: "mg" },
    sodiumSalt: { male: 7.5, female: 6.5, unit: "g" },
    potassium: { male: 2700, female: 2400, unit: "mg" },
    iron: { male: 10, female: 10.5, unit: "mg" },
    zinc: { male: 12, female: 9, unit: "mg" },
    copper: { male: 0.9, female: 0.7, unit: "mg" },
    manganese: { male: 4.5, female: 3.5, unit: "mg" },
    iodine: { male: 140, female: 140, unit: "μg" },
    selenium: { male: 35, female: 25, unit: "μg" },
    chromium: { male: 10, female: 10, unit: "μg" },
    molybdenum: { male: 30, female: 25, unit: "μg" },
    fiber: { male: 19, female: 18, unit: "g" },
  },
  "18-29": {
    vitaminA: { male: 850, female: 650, unit: "μgRAE" },
    vitaminD: { male: 8.5, female: 8.5, unit: "μg" },
    vitaminE: { male: 6.0, female: 5.5, unit: "mg" },
    vitaminK: { male: 150, female: 150, unit: "μg" },
    vitaminB1: { male: 1.4, female: 1.1, unit: "mg" },
    vitaminB2: { male: 1.6, female: 1.2, unit: "mg" },
    niacin: { male: 15, female: 11, unit: "mgNE" },
    vitaminB6: { male: 1.4, female: 1.1, unit: "mg" },
    vitaminB12: { male: 2.4, female: 2.4, unit: "μg" },
    folate: { male: 240, female: 240, unit: "μg" },
    pantothenic: { male: 5, female: 5, unit: "mg" },
    biotin: { male: 50, female: 50, unit: "μg" },
    vitaminC: { male: 100, female: 100, unit: "mg" },
    calcium: { male: 800, female: 650, unit: "mg" },
    phosphorus: { male: 1000, female: 800, unit: "mg" },
    magnesium: { male: 340, female: 270, unit: "mg" },
    sodiumSalt: { male: 7.5, female: 6.5, unit: "g" },
    potassium: { male: 2500, female: 2000, unit: "mg" },
    iron: { male: 7.5, female: 10.5, unit: "mg" },
    zinc: { male: 11, female: 8, unit: "mg" },
    copper: { male: 0.9, female: 0.7, unit: "mg" },
    manganese: { male: 4.0, female: 3.5, unit: "mg" },
    iodine: { male: 130, female: 130, unit: "μg" },
    selenium: { male: 30, female: 25, unit: "μg" },
    chromium: { male: 10, female: 10, unit: "μg" },
    molybdenum: { male: 30, female: 25, unit: "μg" },
    fiber: { male: 21, female: 18, unit: "g" },
  },
  "30-49": {
    vitaminA: { male: 900, female: 700, unit: "μgRAE" },
    vitaminD: { male: 8.5, female: 8.5, unit: "μg" },
    vitaminE: { male: 6.0, female: 5.5, unit: "mg" },
    vitaminK: { male: 150, female: 150, unit: "μg" },
    vitaminB1: { male: 1.4, female: 1.1, unit: "mg" },
    vitaminB2: { male: 1.6, female: 1.2, unit: "mg" },
    niacin: { male: 15, female: 11, unit: "mgNE" },
    vitaminB6: { male: 1.4, female: 1.1, unit: "mg" },
    vitaminB12: { male: 2.4, female: 2.4, unit: "μg" },
    folate: { male: 240, female: 240, unit: "μg" },
    pantothenic: { male: 5, female: 5, unit: "mg" },
    biotin: { male: 50, female: 50, unit: "μg" },
    vitaminC: { male: 100, female: 100, unit: "mg" },
    calcium: { male: 750, female: 650, unit: "mg" },
    phosphorus: { male: 1000, female: 800, unit: "mg" },
    magnesium: { male: 370, female: 290, unit: "mg" },
    sodiumSalt: { male: 7.5, female: 6.5, unit: "g" },
    potassium: { male: 2500, female: 2000, unit: "mg" },
    iron: { male: 7.5, female: 10.5, unit: "mg" },
    zinc: { male: 11, female: 8, unit: "mg" },
    copper: { male: 0.9, female: 0.7, unit: "mg" },
    manganese: { male: 4.0, female: 3.5, unit: "mg" },
    iodine: { male: 130, female: 130, unit: "μg" },
    selenium: { male: 30, female: 25, unit: "μg" },
    chromium: { male: 10, female: 10, unit: "μg" },
    molybdenum: { male: 30, female: 25, unit: "μg" },
    fiber: { male: 21, female: 18, unit: "g" },
  },
  "50-64": {
    vitaminA: { male: 900, female: 700, unit: "μgRAE" },
    vitaminD: { male: 8.5, female: 8.5, unit: "μg" },
    vitaminE: { male: 6.0, female: 5.5, unit: "mg" },
    vitaminK: { male: 150, female: 150, unit: "μg" },
    vitaminB1: { male: 1.3, female: 1.1, unit: "mg" },
    vitaminB2: { male: 1.5, female: 1.2, unit: "mg" },
    niacin: { male: 14, female: 11, unit: "mgNE" },
    vitaminB6: { male: 1.4, female: 1.1, unit: "mg" },
    vitaminB12: { male: 2.4, female: 2.4, unit: "μg" },
    folate: { male: 240, female: 240, unit: "μg" },
    pantothenic: { male: 5, female: 5, unit: "mg" },
    biotin: { male: 50, female: 50, unit: "μg" },
    vitaminC: { male: 100, female: 100, unit: "mg" },
    calcium: { male: 750, female: 650, unit: "mg" },
    phosphorus: { male: 1000, female: 800, unit: "mg" },
    magnesium: { male: 350, female: 290, unit: "mg" },
    sodiumSalt: { male: 7.5, female: 6.5, unit: "g" },
    potassium: { male: 2500, female: 2000, unit: "mg" },
    iron: { male: 7.5, female: 6.5, unit: "mg" },
    zinc: { male: 11, female: 8, unit: "mg" },
    copper: { male: 0.9, female: 0.7, unit: "mg" },
    manganese: { male: 4.0, female: 3.5, unit: "mg" },
    iodine: { male: 130, female: 130, unit: "μg" },
    selenium: { male: 30, female: 25, unit: "μg" },
    chromium: { male: 10, female: 10, unit: "μg" },
    molybdenum: { male: 30, female: 25, unit: "μg" },
    fiber: { male: 20, female: 18, unit: "g" },
  },
  "65-74": {
    vitaminA: { male: 850, female: 700, unit: "μgRAE" },
    vitaminD: { male: 8.5, female: 8.5, unit: "μg" },
    vitaminE: { male: 6.5, female: 6.0, unit: "mg" },
    vitaminK: { male: 150, female: 150, unit: "μg" },
    vitaminB1: { male: 1.2, female: 1.1, unit: "mg" },
    vitaminB2: { male: 1.3, female: 1.2, unit: "mg" },
    niacin: { male: 13, female: 10, unit: "mgNE" },
    vitaminB6: { male: 1.4, female: 1.1, unit: "mg" },
    vitaminB12: { male: 2.4, female: 2.4, unit: "μg" },
    folate: { male: 240, female: 240, unit: "μg" },
    pantothenic: { male: 5, female: 5, unit: "mg" },
    biotin: { male: 50, female: 50, unit: "μg" },
    vitaminC: { male: 100, female: 100, unit: "mg" },
    calcium: { male: 750, female: 650, unit: "mg" },
    phosphorus: { male: 1000, female: 800, unit: "mg" },
    magnesium: { male: 320, female: 270, unit: "mg" },
    sodiumSalt: { male: 7.5, female: 6.5, unit: "g" },
    potassium: { male: 2500, female: 2000, unit: "mg" },
    iron: { male: 7.5, female: 6.0, unit: "mg" },
    zinc: { male: 11, female: 8, unit: "mg" },
    copper: { male: 0.9, female: 0.7, unit: "mg" },
    manganese: { male: 4.0, female: 3.5, unit: "mg" },
    iodine: { male: 130, female: 130, unit: "μg" },
    selenium: { male: 30, female: 25, unit: "μg" },
    chromium: { male: 10, female: 10, unit: "μg" },
    molybdenum: { male: 30, female: 25, unit: "μg" },
    fiber: { male: 20, female: 17, unit: "g" },
  },
  "75+": {
    vitaminA: { male: 800, female: 650, unit: "μgRAE" },
    vitaminD: { male: 8.5, female: 8.5, unit: "μg" },
    vitaminE: { male: 6.5, female: 6.0, unit: "mg" },
    vitaminK: { male: 150, female: 150, unit: "μg" },
    vitaminB1: { male: 1.1, female: 0.9, unit: "mg" },
    vitaminB2: { male: 1.2, female: 1.1, unit: "mg" },
    niacin: { male: 11, female: 9, unit: "mgNE" },
    vitaminB6: { male: 1.4, female: 1.1, unit: "mg" },
    vitaminB12: { male: 2.4, female: 2.4, unit: "μg" },
    folate: { male: 240, female: 240, unit: "μg" },
    pantothenic: { male: 5, female: 5, unit: "mg" },
    biotin: { male: 50, female: 50, unit: "μg" },
    vitaminC: { male: 100, female: 100, unit: "mg" },
    calcium: { male: 700, female: 650, unit: "mg" },
    phosphorus: { male: 1000, female: 800, unit: "mg" },
    magnesium: { male: 290, female: 250, unit: "mg" },
    sodiumSalt: { male: 7.5, female: 6.5, unit: "g" },
    potassium: { male: 2500, female: 2000, unit: "mg" },
    iron: { male: 7.0, female: 6.0, unit: "mg" },
    zinc: { male: 11, female: 8, unit: "mg" },
    copper: { male: 0.8, female: 0.7, unit: "mg" },
    manganese: { male: 4.0, female: 3.5, unit: "mg" },
    iodine: { male: 130, female: 130, unit: "μg" },
    selenium: { male: 30, female: 25, unit: "μg" },
    chromium: { male: 10, female: 10, unit: "μg" },
    molybdenum: { male: 25, female: 20, unit: "μg" },
    fiber: { male: 19, female: 16, unit: "g" },
  },
};

const ORDER: MicronutrientId[] = [
  "vitaminA",
  "vitaminD",
  "vitaminE",
  "vitaminK",
  "vitaminB1",
  "vitaminB2",
  "niacin",
  "vitaminB6",
  "vitaminB12",
  "folate",
  "pantothenic",
  "biotin",
  "vitaminC",
  "calcium",
  "phosphorus",
  "magnesium",
  "sodiumSalt",
  "potassium",
  "iron",
  "zinc",
  "copper",
  "manganese",
  "iodine",
  "selenium",
  "chromium",
  "molybdenum",
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

function activityFactor(id: MicronutrientId, activity: ActivityLevel): number {
  if (activity === "sedentary" || activity === "light") return 1;
  const boostIntense = activity === "intense";
  switch (id) {
    case "vitaminB1":
    case "vitaminB2":
    case "niacin":
    case "vitaminB6":
      return boostIntense ? 1.15 : 1.08;
    case "vitaminC":
      return boostIntense ? 1.12 : 1.05;
    case "magnesium":
    case "potassium":
      return boostIntense ? 1.08 : 1.03;
    case "sodiumSalt":
      // 発汗が増える場合の目安。過剰摂取を推奨するものではない
      return boostIntense ? 1.05 : 1;
    default:
      return 1;
  }
}

function formatAmount(id: MicronutrientId, value: number): number {
  if (
    id === "vitaminB1" ||
    id === "vitaminB2" ||
    id === "vitaminD" ||
    id === "vitaminE" ||
    id === "vitaminB6" ||
    id === "vitaminB12" ||
    id === "iron" ||
    id === "copper" ||
    id === "manganese" ||
    id === "sodiumSalt"
  ) {
    return Math.round(value * 10) / 10;
  }
  return Math.round(value);
}

/** フラットな一覧（互換用） */
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
      category: meta.category,
    };
  });
}

/** カテゴリ分けした一覧（UI用） */
export function getMicronutrientCategories(
  sex: Sex,
  age: number,
  activity: ActivityLevel,
): MicronutrientCategory[] {
  const items = getMicronutrientTargets(sex, age, activity);
  return CATEGORY_META.map((category) => ({
    id: category.id,
    label: category.label,
    items: items.filter((item) => item.category === category.id),
  }));
}
