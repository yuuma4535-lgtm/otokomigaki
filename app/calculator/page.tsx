import type { Metadata } from "next";
import { NutritionCalculator } from "@/components/calculator/NutritionCalculator";

export const metadata: Metadata = {
  title: "PFC・カロリー計算機 | 無料で栄養バランスをチェック",
  description:
    "性別・年齢・活動量から、あなたに必要なPFCバランスとカロリーを無料で計算。1日のメニュー例つき。",
};

export default function CalculatorPage() {
  return <NutritionCalculator />;
}
