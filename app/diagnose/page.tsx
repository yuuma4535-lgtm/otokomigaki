import type { Metadata } from "next";
import { DiagnosisWizard } from "@/components/diagnosis/DiagnosisWizard";

export const metadata: Metadata = {
  title: "診断中 | 男磨き診断",
  description:
    "全70問の深層分析。独自アルゴリズムが、あなたの男磨きを16タイプへ導きます。",
};

export default function DiagnosePage() {
  return <DiagnosisWizard />;
}
