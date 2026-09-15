import type { NutritionResult } from "@/lib/nutrition/calculate";

export type MenuMeal = {
  label: string;
  items: string[];
};

export type MenuExample = {
  id: string;
  title: string;
  note: string;
  /** 代表的なミクロ栄養素の補足（精密計算ではない） */
  microHighlights: string[];
  meals: MenuMeal[];
  kcal: number;
  proteinG: number;
  fatG: number;
  carbG: number;
};

/** 日本食品標準成分表の代表値。kcal / P / F / C は basisG あたり */
type Food = {
  name: string;
  basisG: number;
  kcal: number;
  p: number;
  f: number;
  c: number;
};

type Line = {
  meal: "朝食" | "昼食" | "夕食";
  food: Food;
  grams: number;
  step: number;
  min: number;
  max: number;
  label: (grams: number) => string;
};

type Macros = { kcal: number; p: number; f: number; c: number };

const RICE = food("ご飯（炊飯）", 100, 168, 2.5, 0.3, 37.1);
/** 皮なし。皮つきより脂質が大幅に少ない代表値 */
const CHICKEN = food("鶏むね肉（皮なし）", 100, 108, 22.3, 1.5, 0);
/** 白鮭。銀鮭・養殖サーモンより脂質が少ない代表値 */
const SALMON = food("鮭（白鮭）", 100, 133, 22.3, 4.1, 0.1);
const EGG = food("卵", 100, 151, 12.3, 10.3, 0.3);
const NATTO = food("納豆", 100, 200, 16.5, 10, 12.1);
const TOFU = food("木綿豆腐", 100, 73, 6.6, 4.2, 1.6);
const BROCCOLI = food("ブロッコリー", 100, 33, 4.3, 0.5, 5.2);
const MISO = food("味噌汁", 150, 40, 2.4, 1.1, 3.8);
const MACKEREL = food("さば缶（水煮）", 100, 190, 20.9, 10.7, 0.2);
const PORK = food("豚もも（脂身つき）", 100, 183, 20.5, 10.2, 0.2);
const YOGURT = food("無糖ヨーグルト", 100, 62, 3.6, 3, 4.9);
const BANANA = food("バナナ", 100, 86, 1.1, 0.2, 22.5);
const CABBAGE = food("キャベツ", 100, 23, 1.3, 0.2, 5.2);
const OLIVE_OIL = food("オリーブオイル", 100, 921, 0, 100, 0);
const AVOCADO = food("アボカド", 100, 187, 2.5, 18.7, 6.2);
const WALNUT = food("くるみ", 100, 674, 14.6, 68.8, 11.7);

const MEALS = ["朝食", "昼食", "夕食"] as const;
const TOLERANCE = 0.12;

function food(
  name: string,
  basisG: number,
  kcal: number,
  p: number,
  f: number,
  c: number,
): Food {
  return { name, basisG, kcal, p, f, c };
}

function of(item: Food, grams: number): Macros {
  const ratio = grams / item.basisG;
  return {
    kcal: item.kcal * ratio,
    p: item.p * ratio,
    f: item.f * ratio,
    c: item.c * ratio,
  };
}

function sum(lines: Line[]): Macros {
  return lines.reduce(
    (acc, line) => {
      const part = of(line.food, line.grams);
      return {
        kcal: acc.kcal + part.kcal,
        p: acc.p + part.p,
        f: acc.f + part.f,
        c: acc.c + part.c,
      };
    },
    { kcal: 0, p: 0, f: 0, c: 0 },
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function snap(line: Line) {
  const stepped = Math.round(line.grams / line.step) * line.step;
  line.grams = clamp(stepped, line.min, line.max);
}

function gramsFor(item: Food, macro: "p" | "f" | "c", amount: number) {
  const perGram = item[macro] / item.basisG;
  if (perGram <= 0) return 0;
  return amount / perGram;
}

function line(
  meal: Line["meal"],
  item: Food,
  grams: number,
  step: number,
  min: number,
  max: number,
  label: (grams: number) => string,
): Line {
  return {
    meal,
    food: item,
    grams: clamp(grams, min, max),
    step,
    min,
    max,
    label,
  };
}

function gramLabel(name: string, suffix = "") {
  return (grams: number) => `${name} ${grams}g${suffix}`;
}

function pieceLabel(name: string, pieceG: number, unit: string) {
  return (grams: number) => {
    const count = Math.max(1, Math.round(grams / pieceG));
    return `${name} ${count}${unit}`;
  };
}

function matches(lines: Line[], item: Food) {
  return lines.filter((entry) => entry.food === item);
}

function tune(
  lines: Line[],
  macro: "p" | "f" | "c",
  target: number,
  levers: Food[],
) {
  let gap = target - sum(lines)[macro];
  if (Math.abs(gap) < target * 0.04) return;

  for (const item of levers) {
    const entries = matches(lines, item);
    if (entries.length === 0) continue;
    const perGram = item[macro] / item.basisG;
    if (perGram <= 0) continue;

    const room = entries.reduce((total, entry) => {
      const limit = gap > 0 ? entry.max - entry.grams : entry.grams - entry.min;
      return total + Math.max(limit, 0);
    }, 0);
    if (room <= 0) continue;

    const usable = Math.min(Math.abs(gap) / perGram, room);
    let remaining = usable;
    for (const entry of entries) {
      if (remaining <= 0) break;
      const roomHere =
        gap > 0 ? entry.max - entry.grams : entry.grams - entry.min;
      const take = Math.min(Math.max(roomHere, 0), remaining);
      entry.grams += gap > 0 ? take : -take;
      remaining -= take;
    }
    gap -= (usable - remaining) * (gap > 0 ? perGram : -perGram);
    if (Math.abs(gap) < target * 0.04) return;
  }
}

function stepToward(
  lines: Line[],
  macro: "p" | "f" | "c",
  target: number,
  levers: Food[],
) {
  const gap = target - sum(lines)[macro];
  if (Math.abs(gap) <= target * TOLERANCE) return;

  const direction = gap > 0 ? 1 : -1;
  for (const item of levers) {
    if (item[macro] <= 0) continue;
    for (const entry of matches(lines, item)) {
      const next = entry.grams + direction * entry.step;
      if (next < entry.min || next > entry.max) continue;
      entry.grams = next;
      return;
    }
  }
}

function equalize(lines: Line[], item: Food) {
  const entries = matches(lines, item);
  if (entries.length < 2) return;
  const total = entries.reduce((sumGrams, entry) => sumGrams + entry.grams, 0);
  const share =
    Math.round(total / entries.length / entries[0]!.step) * entries[0]!.step;
  let used = 0;
  entries.forEach((entry, index) => {
    if (index === entries.length - 1) {
      entry.grams = clamp(total - used, entry.min, entry.max);
      return;
    }
    entry.grams = clamp(share, entry.min, entry.max);
    used += entry.grams;
  });
}

function within(total: Macros, target: { p: number; f: number; c: number }) {
  return (["p", "f", "c"] as const).every((key) => {
    const goal = target[key];
    if (goal <= 0) return true;
    return Math.abs(total[key] - goal) / goal <= TOLERANCE;
  });
}

function fit(
  lines: Line[],
  target: { p: number; f: number; c: number },
  protein: Food[],
  fat: Food[],
  carb: Food[],
) {
  for (let i = 0; i < 24; i++) {
    tune(lines, "p", target.p, protein);
    tune(lines, "f", target.f, fat);
    tune(lines, "c", target.c, carb);
  }

  for (const entry of lines) snap(entry);

  for (let i = 0; i < 80; i++) {
    const total = sum(lines);
    if (within(total, target)) break;
    stepToward(lines, "p", target.p, protein);
    stepToward(lines, "f", target.f, fat);
    stepToward(lines, "c", target.c, carb);
    for (const entry of lines) snap(entry);
  }
}

function toMenu(
  id: string,
  title: string,
  note: string,
  microHighlights: string[],
  lines: Line[],
): MenuExample {
  const total = sum(lines);
  return {
    id,
    title,
    note,
    microHighlights,
    meals: MEALS.map((meal) => ({
      label: meal,
      items: lines
        .filter((entry) => entry.meal === meal && entry.grams > 0)
        .map((entry) => entry.label(entry.grams)),
    })).filter((meal) => meal.items.length > 0),
    kcal: Math.round(total.kcal),
    proteinG: Math.round(total.p),
    fatG: Math.round(total.f),
    carbG: Math.round(total.c),
  };
}

function riceLine(meal: Line["meal"], grams: number) {
  return line(meal, RICE, grams, 10, 80, 450, gramLabel("ご飯"));
}

/** 計算した P/F/C に、表示分量の積み上げが近づく1日例 */
export function buildMenuExamples(result: NutritionResult): MenuExample[] {
  const target = {
    p: result.proteinG,
    f: result.fatG,
    c: result.carbG,
  };
  const riceEach = clamp(gramsFor(RICE, "c", result.carbG * 0.85) / 3, 120, 380);

  const washoku: Line[] = [
    riceLine("朝食", riceEach),
    line("朝食", EGG, 60, 60, 60, 180, pieceLabel("卵", 60, "個")),
    line("朝食", NATTO, 50, 50, 50, 50, () => "納豆 1パック（50g）"),
    line("朝食", MISO, 150, 150, 150, 150, () => "味噌汁 1杯"),
    riceLine("昼食", riceEach),
    line("昼食", CHICKEN, 160, 10, 80, 400, gramLabel("鶏むね肉（皮なし）")),
    line("昼食", BROCCOLI, 80, 10, 60, 150, gramLabel("ブロッコリー")),
    line(
      "昼食",
      OLIVE_OIL,
      8,
      1,
      0,
      24,
      gramLabel("オリーブオイル", "（炒め・かけ）"),
    ),
    riceLine("夕食", riceEach),
    line("夕食", SALMON, 120, 10, 60, 260, gramLabel("鮭（白鮭）")),
    line("夕食", TOFU, 100, 10, 80, 200, gramLabel("木綿豆腐")),
    line("夕食", AVOCADO, 40, 10, 0, 120, gramLabel("アボカド")),
  ];

  const simple: Line[] = [
    line("朝食", YOGURT, 150, 10, 100, 250, gramLabel("無糖ヨーグルト")),
    line("朝食", BANANA, 100, 100, 100, 100, () => "バナナ 1本（100g）"),
    line("朝食", EGG, 60, 60, 60, 180, pieceLabel("卵", 60, "個")),
    line("朝食", WALNUT, 10, 5, 0, 30, gramLabel("くるみ")),
    riceLine("朝食", riceEach * 0.7),
    riceLine("昼食", riceEach),
    line("昼食", MACKEREL, 100, 10, 70, 180, gramLabel("さば缶（水煮）")),
    line("昼食", CABBAGE, 80, 10, 50, 150, gramLabel("キャベツ")),
    line(
      "昼食",
      OLIVE_OIL,
      6,
      1,
      0,
      20,
      gramLabel("オリーブオイル", "（かけ）"),
    ),
    riceLine("夕食", riceEach * 1.1),
    line("夕食", PORK, 120, 10, 70, 280, gramLabel("豚もも（脂身つき）")),
    line("夕食", CHICKEN, 80, 10, 0, 280, gramLabel("鶏むね肉（皮なし）")),
    line("夕食", MISO, 150, 150, 0, 150, (grams) =>
      grams > 0 ? "味噌汁 1杯" : "",
    ),
  ];

  const balanced: Line[] = [
    riceLine("朝食", riceEach),
    line("朝食", EGG, 120, 60, 60, 180, pieceLabel("卵", 60, "個")),
    line("朝食", MISO, 150, 150, 150, 150, () => "味噌汁 1杯"),
    line("朝食", AVOCADO, 30, 10, 0, 100, gramLabel("アボカド")),
    riceLine("昼食", riceEach),
    line("昼食", CHICKEN, 150, 10, 80, 360, gramLabel("鶏むね肉（皮なし）")),
    line("昼食", BROCCOLI, 100, 10, 60, 160, gramLabel("ブロッコリー")),
    line(
      "昼食",
      OLIVE_OIL,
      10,
      1,
      0,
      24,
      gramLabel("オリーブオイル", "（炒め）"),
    ),
    riceLine("夕食", riceEach),
    line("夕食", SALMON, 110, 10, 60, 240, gramLabel("鮭（白鮭）")),
    line("夕食", TOFU, 80, 10, 60, 180, gramLabel("木綿豆腐")),
    line("夕食", CABBAGE, 60, 10, 40, 140, gramLabel("キャベツ")),
    line("夕食", WALNUT, 8, 5, 0, 25, gramLabel("くるみ")),
  ];

  fit(
    washoku,
    target,
    [CHICKEN, SALMON, EGG],
    [OLIVE_OIL, AVOCADO, EGG, SALMON],
    [RICE],
  );
  fit(
    simple,
    target,
    [CHICKEN, PORK, MACKEREL, EGG],
    [OLIVE_OIL, WALNUT, PORK, MACKEREL, EGG],
    [RICE],
  );
  fit(
    balanced,
    target,
    [CHICKEN, SALMON, EGG],
    [OLIVE_OIL, AVOCADO, WALNUT, EGG, SALMON],
    [RICE],
  );
  equalize(washoku, RICE);
  equalize(simple, RICE);
  equalize(balanced, RICE);

  return [
    toMenu(
      "washoku",
      "和食の定番",
      "ご飯・魚・卵を軸に、足りない脂質は炒め油とアボカドで補っています。",
      [
        "鮭はビタミンDが豊富です",
        "納豆はビタミンK・食物繊維の補給に役立ちます",
        "卵はビタミンB群のサポートになります",
      ],
      washoku,
    ),
    toMenu(
      "simple",
      "かんたん自炊",
      "さば缶と豚肉に、くるみとオリーブオイルを足して脂質量を目標に近づけています。",
      [
        "さば缶はビタミンD・カルシウムの補給に向きます",
        "くるみはマグネシウム・亜鉛の補強に役立ちます",
        "豚肉はビタミンB1を摂りやすい食材です",
      ],
      simple,
    ),
    toMenu(
      "balanced",
      "バランス重視",
      "皮なし鶏むねを軸に、油・アボカド・くるみで脂質を目標量へ合わせています。",
      [
        "ブロッコリーはビタミンC・食物繊維が豊富です",
        "鮭はビタミンDが豊富です",
        "アボカドはマグネシウムや食物繊維の補足になります",
      ],
      balanced,
    ),
  ];
}
