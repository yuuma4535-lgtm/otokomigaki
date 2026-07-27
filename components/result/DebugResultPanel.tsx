"use client";

import {
  createMixedAnswers,
  createPrototypeAnswers,
  createSupremeAnswers,
} from "@/lib/diagnosis/debug-answers";
import { buildDiagnosisResult } from "@/lib/diagnosis/score";
import type { DiagnosisResult } from "@/types/diagnosis";

type DebugResultPanelProps = {
  onApply: (result: DiagnosisResult) => void;
};

/**
 * 開発検証用デバッグパネル
 * - 至高：全99%
 * - 原石：全10%
 * - ランダム：20〜97%（14タイプ検証）
 */
export function DebugResultPanel({ onApply }: DebugResultPanelProps) {
  const apply = (factory: () => ReturnType<typeof createSupremeAnswers>) => {
    const answers = factory();
    const result = buildDiagnosisResult(answers);
    sessionStorage.setItem("otokomigaki.answers", JSON.stringify(answers));
    sessionStorage.setItem("otokomigaki.diagnosisCompleted", "1");
    onApply(result);
  };

  return (
    <div className="pointer-events-auto fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-2 z-40 flex max-w-[11rem] flex-col gap-1.5 rounded-md border border-line bg-void/95 p-2 shadow-[var(--shadow-panel)] backdrop-blur-sm sm:right-3 sm:max-w-[13rem]">
      <p className="px-1 text-[0.55rem] tracking-[0.18em] text-muted-dim uppercase">
        Debug
      </p>
      <button
        type="button"
        onClick={() => apply(createSupremeAnswers)}
        className="pointer-events-auto touch-manipulation rounded-sm border border-gold/40 bg-gold/10 px-2 py-1.5 text-left text-[0.65rem] tracking-wide text-gold-soft transition-colors hover:bg-gold/20"
      >
        至高をシミュレート
      </button>
      <button
        type="button"
        onClick={() => apply(createPrototypeAnswers)}
        className="pointer-events-auto touch-manipulation rounded-sm border border-bordeaux/50 bg-bordeaux-deep/40 px-2 py-1.5 text-left text-[0.65rem] tracking-wide text-ivory-soft transition-colors hover:bg-bordeaux/30"
      >
        原石をシミュレート
      </button>
      <button
        type="button"
        onClick={() => apply(createMixedAnswers)}
        className="pointer-events-auto touch-manipulation rounded-sm border border-line bg-charcoal-raised px-2 py-1.5 text-left text-[0.65rem] tracking-wide text-muted transition-colors hover:border-white/20 hover:text-ivory-soft"
      >
        ランダムにシミュレート
      </button>
    </div>
  );
}
