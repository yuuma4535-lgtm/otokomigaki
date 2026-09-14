export type Sex = "male" | "female";
export type ActivityLevel = "sedentary" | "light" | "moderate" | "intense";
export type Goal = "cut" | "maintain" | "bulk";

export type NutritionInput = {
  sex: Sex;
  age: number;
  heightCm: number;
  weightKg: number;
  activity: ActivityLevel;
  goal: Goal;
};

export type NutritionResult = {
  bmr: number;
  tdee: number;
  targetKcal: number;
  adjustmentKcal: number;
  proteinG: number;
  fatG: number;
  carbG: number;
  proteinPerKg: number;
  fatRatio: number;
};

/** 活動係数（座り仕事〜激しい運動） */
export const ACTIVITY_FACTOR: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  intense: 1.725,
};

/** 目的別のカロリー調整（-300〜500 / +300〜500 の中央値） */
const GOAL_ADJUSTMENT: Record<Goal, number> = {
  cut: -400,
  maintain: 0,
  bulk: 400,
};

/** 目的別：体重1kgあたりのタンパク質（1.6〜2.2gの範囲） */
const PROTEIN_PER_KG: Record<Goal, number> = {
  cut: 2.2,
  maintain: 1.8,
  bulk: 2.0,
};

/** 脂質は総カロリーの25%（指定レンジ20〜30%の中間） */
const FAT_RATIO = 0.25;

/**
 * 改訂ハリス・ベネディクト式（1984）で基礎代謝量を算出。
 */
export function calculateBmr(input: Pick<NutritionInput, "sex" | "age" | "heightCm" | "weightKg">): number {
  const { sex, age, heightCm, weightKg } = input;
  if (sex === "male") {
    return 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age;
  }
  return 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * age;
}

export function calculateNutrition(input: NutritionInput): NutritionResult {
  const bmr = calculateBmr(input);
  const tdee = bmr * ACTIVITY_FACTOR[input.activity];
  const adjustmentKcal = GOAL_ADJUSTMENT[input.goal];
  const targetKcal = Math.max(tdee + adjustmentKcal, 1200);

  const proteinPerKg = PROTEIN_PER_KG[input.goal];
  const proteinG = input.weightKg * proteinPerKg;
  const proteinKcal = proteinG * 4;

  let fatKcal = targetKcal * FAT_RATIO;
  let fatG = fatKcal / 9;
  let carbKcal = targetKcal - proteinKcal - fatKcal;

  if (carbKcal < targetKcal * 0.2) {
    carbKcal = targetKcal * 0.2;
    fatKcal = Math.max(targetKcal - proteinKcal - carbKcal, targetKcal * 0.2);
    fatG = fatKcal / 9;
  }

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    targetKcal: Math.round(targetKcal),
    adjustmentKcal,
    proteinG: Math.round(proteinG),
    fatG: Math.round(fatG),
    carbG: Math.round((targetKcal - proteinG * 4 - fatG * 9) / 4),
    proteinPerKg,
    fatRatio: FAT_RATIO,
  };
}
