import type { Metadata } from "next";
import { NutritionCalculator } from "@/components/calculator/NutritionCalculator";

export const metadata: Metadata = {
  title:
    "PFC・カロリー計算機 | ビタミン・ミネラルまで無料で計算、1日のメニュー例つき",
  description:
    "性別・年齢・活動量から、あなたに必要なPFCバランスとカロリーを無料で計算。ビタミン・ミネラルまで網羅した、他にはない詳しい無料栄養計算ツールです。計算結果に近い1日のメニュー例も表示します。",
};

export default function CalculatorPage() {
  return <NutritionCalculator />;
}
