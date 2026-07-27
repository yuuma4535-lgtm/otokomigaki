"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ResultPreparingScreen } from "@/components/diagnosis/ResultPreparingScreen";
import { CategoryAdviceGrid } from "@/components/result/CategoryAdviceGrid";
import { CategoryLevelBars } from "@/components/result/CategoryLevelBars";
import { DebugResultPanel } from "@/components/result/DebugResultPanel";
import { FirstStepSection } from "@/components/result/FirstStepSection";
import { RelativeInsight } from "@/components/result/RelativeInsight";
import { ShareButtons } from "@/components/result/ShareButtons";
import { TypeHero } from "@/components/result/TypeHero";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { PageAtmosphere } from "@/components/ui/PageAtmosphere";
import { COCONALA_URL } from "@/lib/diagnosis/constants";
import { buildDiagnosisResult } from "@/lib/diagnosis/score";
import { getTypeVisual } from "@/lib/diagnosis/type-visuals";
import { useShowDebugUi } from "@/lib/diagnosis/use-show-debug-ui";
import type { Answers, DiagnosisResult } from "@/types/diagnosis";

/** 診断完了後のみ結果表示を許可するフラグ */
export const DIAGNOSIS_COMPLETED_KEY = "otokomigaki.diagnosisCompleted";
const ANSWERS_KEY = "otokomigaki.answers";

/** 重いチャート／Canvas を遅延し、エンブレム画像の取得・描画を優先 */
const CategoryRadarChart = dynamic(
  () =>
    import("@/components/result/CategoryRadarChart").then((m) => ({
      default: m.CategoryRadarChart,
    })),
  { ssr: false },
);

const ResultCardDownload = dynamic(
  () =>
    import("@/components/result/ResultCardDownload").then((m) => ({
      default: m.ResultCardDownload,
    })),
  { ssr: false },
);

function markDiagnosisCompleted() {
  try {
    sessionStorage.setItem(DIAGNOSIS_COMPLETED_KEY, "1");
  } catch {
    /* private mode 等 */
  }
}

export function ResultView() {
  const router = useRouter();
  const showDebug = useShowDebugUi();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [missing, setMissing] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const loadTimerRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(ANSWERS_KEY);
      const completed = sessionStorage.getItem(DIAGNOSIS_COMPLETED_KEY) === "1";
      const shareType = new URLSearchParams(window.location.search).get("type");

      // 共有リンク（?type=）直アクセスで診断未完了ならトップへ誘導
      // （?debug=1 のときはデバッグ用に結果ページへ留まる）
      const debugParam =
        new URLSearchParams(window.location.search).get("debug") === "1";
      if (shareType && (!raw || !completed) && !debugParam) {
        setIsRedirecting(true);
        router.replace("/");
        return;
      }

      if (!raw || !completed) {
        setMissing(true);
        return;
      }

      const answers = JSON.parse(raw) as Answers;
      setResult(buildDiagnosisResult(answers));
      setMissing(false);
    } catch {
      setMissing(true);
    }
  }, [router]);

  useEffect(() => {
    return () => {
      if (loadTimerRef.current !== null) {
        window.clearTimeout(loadTimerRef.current);
      }
    };
  }, []);

  /** デバッグ切替: isLoading → 1.5秒 → 結果表示 */
  const applyDebugResult = (next: DiagnosisResult) => {
    if (loadTimerRef.current !== null) {
      window.clearTimeout(loadTimerRef.current);
    }

    markDiagnosisCompleted();
    setMissing(false);
    setResult(null);
    setIsLoading(true);

    loadTimerRef.current = window.setTimeout(() => {
      setResult(next);
      setIsLoading(false);
      loadTimerRef.current = null;
    }, 1500);
  };

  if (isRedirecting) {
    return (
      <PageAtmosphere mood="result">
        <div className="flex min-h-dvh items-center justify-center text-muted">
          トップへ移動中…
        </div>
      </PageAtmosphere>
    );
  }

  if (isLoading) {
    return <ResultPreparingScreen />;
  }

  if (missing && !result) {
    return (
      <PageAtmosphere mood="result">
        <DebugResultPanel onApply={(r) => applyDebugResult(r)} />
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <p className="font-display text-lg text-ivory">
            診断データが見つかりません。
          </p>
          {showDebug ? (
            <p className="mt-3 text-sm text-muted">
              右下の Debug で各ランクを検証できます。
            </p>
          ) : null}
          <Link
            href="/"
            className="mt-8 text-sm tracking-[0.2em] text-gold hover:text-gold-soft"
          >
            トップへ戻る
          </Link>
        </div>
      </PageAtmosphere>
    );
  }

  if (!result) {
    return (
      <PageAtmosphere mood="result">
        <div className="flex flex-1 items-center justify-center text-muted">
          結果を集計中…
        </div>
      </PageAtmosphere>
    );
  }

  const visual = getTypeVisual(result.typeId);
  const atmosphereMood =
    result.rank === "S"
      ? "supreme"
      : result.rank === "C"
        ? "prototype"
        : "result";

  return (
    <PageAtmosphere
      mood={atmosphereMood}
      accentGlow={visual.accentGlow}
      style={
        {
          "--type-accent": visual.accent,
          "--type-accent-soft": visual.accentSoft,
          "--type-accent-glow": visual.accentGlow,
        } as CSSProperties
      }
    >
      <DebugResultPanel onApply={(r) => applyDebugResult(r)} />

      <div className="relative mx-auto flex w-full max-w-3xl min-w-0 flex-col gap-12 px-4 py-12 sm:gap-20 sm:px-8 sm:py-24">
        <TypeHero result={result} />

        <section className="w-full">
          <div
            className="rounded-md border bg-charcoal-raised/60 px-3 py-8 shadow-[var(--shadow-panel)] sm:px-6 sm:py-10"
            style={{
              borderColor:
                "color-mix(in srgb, var(--type-accent) 45%, rgba(235,230,220,0.1))",
              boxShadow: `0 24px 48px -28px rgba(0,0,0,0.65), 0 0 40px -18px var(--type-accent-glow)`,
            }}
          >
            <p
              className="text-center text-[0.7rem] tracking-[0.28em]"
              style={{ color: "var(--type-accent-soft)" }}
            >
              4軸バランス（0〜100%）
            </p>
            <div className="mt-4">
              <CategoryRadarChart scores={result.categoryScores} />
            </div>
            <RelativeInsight result={result} />
            <CategoryLevelBars scores={result.categoryScores} />
          </div>

          <CategoryAdviceGrid
            scores={result.orderedScores}
            weakestId={result.growthAxis.categoryId}
          />
        </section>

        <section className="flex w-full flex-col gap-12">
          <FirstStepSection firstStep={result.firstStep} />

          <div className="relative flex w-full min-w-0 flex-col items-center gap-5 border-t border-line pt-10 text-center sm:pt-12">
            <p className="max-w-sm px-1 text-sm leading-[1.9] text-ivory-soft">
              一緒に、次の一歩を確実なものに。
            </p>
            <div className="flex w-full max-w-xs flex-col items-center gap-4 px-0">
              <LuxuryButton
                href={COCONALA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-full"
              >
                ココナラで相談する
              </LuxuryButton>
              <LuxuryButton href="/" variant="ghost">
                もう一度診断する
              </LuxuryButton>
            </div>
          </div>

          <ResultCardDownload result={result} />
          <ShareButtons result={result} />
        </section>
      </div>
    </PageAtmosphere>
  );
}
