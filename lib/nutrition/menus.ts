import type { NutritionResult } from "@/lib/nutrition/calculate";

export type MenuMeal = {
  label: string;
  items: string[];
};

export type MenuExample = {
  id: string;
  title: string;
  note: string;
  meals: MenuMeal[];
  kcal: number;
  proteinG: number;
  fatG: number;
  carbG: number;
};

type Food = {
  name: string;
  unit: string;
  per: number;
  kcal: number;
  p: number;
  f: number;
  c: number;
};

function food(
  name: string,
  unit: string,
  per: number,
  kcal: number,
  p: number,
  f: number,
  c: number,
): Food {
  return { name, unit, per, kcal, p, f, c };
}

const RICE = food("ご飯", "g", 100, 168, 2.5, 0.3, 37.1);
const CHICKEN = food("鶏むね肉", "g", 100, 108, 22.3, 1.5, 0);
const EGG = food("卵", "個", 1, 91, 7.4, 6.2, 0.2);
const SALMON = food("鮭", "g", 80, 133, 18, 6.4, 0.1);
const NATTO = food("納豆", "パック", 1, 100, 8.3, 5, 6);
const TOFU = food("豆腐", "g", 150, 84, 7.8, 4.5, 2.1);
const BROCCOLI = food("ブロッコリー", "g", 80, 27, 3.4, 0.3, 4.2);
const MISO = food("味噌汁", "杯", 1, 40, 2.5, 1, 4);
const MACKEREL = food("さば缶（水煮）", "缶", 1, 190, 20.5, 11, 0.2);
const PORK = food("豚もも", "g", 100, 183, 20.5, 10.2, 0.2);
const YOGURT = food("無糖ヨーグルト", "g", 100, 62, 3.6, 3, 4.9);
const BANANA = food("バナナ", "本", 1, 86, 1.1, 0.2, 22.5);
const CABBAGE = food("キャベツ", "g", 80, 18, 1, 0.2, 3.8);

function portion(item: Food, amount: number): string {
  if (item.unit === "缶") {
    const cans = amount < 1.25 ? 1 : 1.5;
    return `${item.name} ${cans}${item.unit}`;
  }
  const rounded =
    item.unit === "g" ? Math.round(amount / 5) * 5 : Math.round(amount);
  const qty = item.unit === "g" ? Math.max(rounded, 40) : Math.max(rounded, 1);
  return `${item.name} ${qty}${item.unit}`;
}

function macros(item: Food, amount: number) {
  const ratio = amount / item.per;
  return {
    kcal: item.kcal * ratio,
    p: item.p * ratio,
    f: item.f * ratio,
    c: item.c * ratio,
  };
}

function sum(parts: ReturnType<typeof macros>[]) {
  return parts.reduce(
    (acc, part) => ({
      kcal: acc.kcal + part.kcal,
      p: acc.p + part.p,
      f: acc.f + part.f,
      c: acc.c + part.c,
    }),
    { kcal: 0, p: 0, f: 0, c: 0 },
  );
}

function riceGramsForCarbs(carbG: number, fixedCarb: number): number {
  const remaining = Math.max(carbG - fixedCarb, 40);
  return (remaining / RICE.c) * RICE.per;
}

/** 計算結果に近い、シンプルな日本食の1日例を3パターン返す */
export function buildMenuExamples(result: NutritionResult): MenuExample[] {
  const proteinLeft = Math.max(result.proteinG - 20, 80);
  const chickenG = (proteinLeft * 0.45 * CHICKEN.per) / CHICKEN.p;
  const salmonG = (proteinLeft * 0.25 * SALMON.per) / SALMON.p;
  const porkG = (proteinLeft * 0.4 * PORK.per) / PORK.p;
  const mackerelCans = Math.min(1.5, Math.max(0.7, (proteinLeft * 0.35) / MACKEREL.p));

  const patternAFixed = [
    macros(EGG, 1),
    macros(NATTO, 1),
    macros(MISO, 2),
    macros(CHICKEN, chickenG),
    macros(BROCCOLI, 80),
    macros(SALMON, salmonG),
    macros(TOFU, 150),
  ];
  const riceA = riceGramsForCarbs(result.carbG, sum(patternAFixed).c) / 3;

  const patternBFixed = [
    macros(YOGURT, 150),
    macros(BANANA, 1),
    macros(EGG, 1),
    macros(MACKEREL, mackerelCans),
    macros(CABBAGE, 80),
    macros(PORK, porkG),
    macros(MISO, 1),
  ];
  const riceB = riceGramsForCarbs(result.carbG, sum(patternBFixed).c) / 2;

  const patternCFixed = [
    macros(EGG, 2),
    macros(MISO, 1),
    macros(CHICKEN, chickenG * 0.7),
    macros(BROCCOLI, 100),
    macros(SALMON, salmonG),
    macros(TOFU, 100),
    macros(CABBAGE, 60),
  ];
  const riceC = riceGramsForCarbs(result.carbG, sum(patternCFixed).c) / 3;

  const examples: Array<Omit<MenuExample, "kcal" | "proteinG" | "fatG" | "carbG"> & {
    parts: ReturnType<typeof macros>[];
  }> = [
    {
      id: "washoku",
      title: "和食の定番",
      note: "ご飯・魚・卵を軸にした、作りやすい1日。",
      meals: [
        {
          label: "朝食",
          items: [
            portion(RICE, riceA),
            portion(EGG, 1),
            portion(NATTO, 1),
            portion(MISO, 1),
          ],
        },
        {
          label: "昼食",
          items: [
            portion(RICE, riceA),
            portion(CHICKEN, chickenG),
            portion(BROCCOLI, 80),
          ],
        },
        {
          label: "夕食",
          items: [
            portion(RICE, riceA),
            portion(SALMON, salmonG),
            portion(TOFU, 150),
            portion(MISO, 1),
          ],
        },
      ],
      parts: [...patternAFixed, macros(RICE, riceA * 3)],
    },
    {
      id: "simple",
      title: "かんたん自炊",
      note: "調理が少ない日向け。さば缶と豚肉でタンパク質を確保。",
      meals: [
        {
          label: "朝食",
          items: [portion(YOGURT, 150), portion(BANANA, 1), portion(EGG, 1)],
        },
        {
          label: "昼食",
          items: [
            portion(RICE, riceB),
            portion(MACKEREL, mackerelCans),
            portion(CABBAGE, 80),
          ],
        },
        {
          label: "夕食",
          items: [portion(RICE, riceB), portion(PORK, porkG), portion(MISO, 1)],
        },
      ],
      parts: [...patternBFixed, macros(RICE, riceB * 2)],
    },
    {
      id: "balanced",
      title: "バランス重視",
      note: "鶏むねと鮭を分け、野菜を多めにした1日。",
      meals: [
        {
          label: "朝食",
          items: [portion(RICE, riceC), portion(EGG, 2), portion(MISO, 1)],
        },
        {
          label: "昼食",
          items: [
            portion(RICE, riceC),
            portion(CHICKEN, chickenG * 0.7),
            portion(BROCCOLI, 100),
          ],
        },
        {
          label: "夕食",
          items: [
            portion(RICE, riceC),
            portion(SALMON, salmonG),
            portion(TOFU, 100),
            portion(CABBAGE, 60),
          ],
        },
      ],
      parts: [...patternCFixed, macros(RICE, riceC * 3)],
    },
  ];

  return examples.map(({ parts, ...menu }) => {
    const total = sum(parts);
    return {
      ...menu,
      kcal: Math.round(total.kcal),
      proteinG: Math.round(total.p),
      fatG: Math.round(total.f),
      carbG: Math.round(total.c),
    };
  });
}
