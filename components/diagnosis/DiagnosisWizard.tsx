"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ResultPreparingScreen } from "@/components/diagnosis/ResultPreparingScreen";
import { PageAtmosphere } from "@/components/ui/PageAtmosphere";
import { LIKERT_SCALE } from "@/lib/diagnosis/constants";
import { questionsDataset } from "@/lib/diagnosis/questions-data";
import { useDiagnosisFlow } from "@/lib/diagnosis/use-diagnosis-flow";
import type { Answers, Question } from "@/types/diagnosis";

function categoryLabel(categoryId: string): string {
  return (
    questionsDataset.categories.find((c) => c.id === categoryId)?.label ??
    "診断"
  );
}

function isAnswered(answers: Answers, questionId: string): boolean {
  const value = answers[questionId];
  return typeof value === "number" && value >= 1 && value <= 5;
}

/** 回答直後にスクロールすべき次の対象を決める */
function findScrollTargetId(
  pageQuestions: Question[],
  answeredQuestionId: string,
  nextAnswers: Answers,
): string {
  const answeredIndex = pageQuestions.findIndex(
    (q) => q.id === answeredQuestionId,
  );

  for (let i = answeredIndex + 1; i < pageQuestions.length; i += 1) {
    const q = pageQuestions[i];
    if (q && !isAnswered(nextAnswers, q.id)) {
      return `question-${q.id}`;
    }
  }

  for (let i = 0; i < answeredIndex; i += 1) {
    const q = pageQuestions[i];
    if (q && !isAnswered(nextAnswers, q.id)) {
      return `question-${q.id}`;
    }
  }

  return "diagnosis-next-action";
}

function scrollToTarget(targetId: string) {
  if (targetId === "diagnosis-next-action") {
    // 最終問回答後はページ下部へ。「次へ」は sticky フッターで常に届く
    const doc = document.documentElement;
    window.scrollTo({
      top: Math.max(doc.scrollHeight - window.innerHeight, 0),
      behavior: "smooth",
    });
    const nextBtn = document.getElementById("diagnosis-next-action");
    nextBtn?.focus({ preventScroll: true });
    return;
  }

  const el = document.getElementById(targetId);
  if (!el) return;

  // sticky ヘッダーを避けつつ、次の質問を画面中央付近へ
  el.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest",
  });
}

function QuestionBlock({
  question,
  displayNumber,
  selected,
  onSelect,
}: {
  question: Question;
  displayNumber: number;
  selected: number | undefined;
  onSelect: (value: number) => void;
}) {
  return (
    <section
      id={`question-${question.id}`}
      className="scroll-mt-28 border-t border-line pt-8 first:border-t-0 first:pt-0 sm:scroll-mt-32"
    >
      <p className="font-display text-[0.65rem] tracking-[0.32em] text-gold uppercase">
        Q{String(displayNumber).padStart(2, "0")}
        <span className="ml-3 tracking-[0.2em] text-muted-dim">
          {categoryLabel(question.categoryId)}
        </span>
      </p>
      <h2 className="mt-3 font-display text-base font-medium leading-[1.7] tracking-wide text-ivory sm:text-lg">
        {question.text}
      </h2>

      <div className="relative mt-5" role="group" aria-label={`${question.text} の評価`}>
        <div className="relative z-10 grid grid-cols-5 gap-1.5 sm:gap-2">
          {LIKERT_SCALE.map((choice) => (
            <button
              key={choice.value}
              type="button"
              aria-label={`${choice.value}点: ${choice.label}`}
              aria-pressed={selected === choice.value}
              data-active={selected === choice.value ? "true" : "false"}
              className="ui-likert-option ui-likert-option--compact"
              onClick={() => onSelect(choice.value)}
            >
              {choice.value}
            </button>
          ))}
        </div>
        <div className="mt-2.5 flex justify-between gap-2 text-[0.6rem] leading-relaxed tracking-wide text-muted-dim sm:text-[0.65rem]">
          <span className="max-w-[42%]">1 全く当てはまらない</span>
          <span className="max-w-[42%] text-right">5 非常に当てはまる</span>
        </div>
      </div>
    </section>
  );
}

/** 診断ウィザード（複数問 / ページ + 次へ・戻る） */
export function DiagnosisWizard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    currentPageQuestions,
    pageIndex,
    pageCount,
    total,
    answeredCount,
    progress,
    rangeStart,
    rangeEnd,
    answers,
    isFirstPage,
    isLastPage,
    canGoNext,
    setAnswer,
    goNext,
    goBack,
  } = useDiagnosisFlow();

  const answersRef = useRef(answers);
  answersRef.current = answers;
  const scrollTimerRef = useRef<number | null>(null);
  const loadingTimerRef = useRef<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pageIndex]);

  useEffect(() => {
    return () => {
      if (scrollTimerRef.current !== null) {
        window.clearTimeout(scrollTimerRef.current);
      }
      if (loadingTimerRef.current !== null) {
        window.clearTimeout(loadingTimerRef.current);
      }
    };
  }, []);

  const handleSelect = useCallback(
    (questionId: string, value: number) => {
      setAnswer(questionId, value);

      const nextAnswers: Answers = {
        ...answersRef.current,
        [questionId]: value,
      };
      const targetId = findScrollTargetId(
        currentPageQuestions,
        questionId,
        nextAnswers,
      );

      if (scrollTimerRef.current !== null) {
        window.clearTimeout(scrollTimerRef.current);
      }

      // タップの :active が終わってからスムーズに移動
      scrollTimerRef.current = window.setTimeout(() => {
        scrollToTarget(targetId);
        scrollTimerRef.current = null;
      }, 80);
    },
    [currentPageQuestions, setAnswer],
  );

  /** 「結果を見る」: isLoading → 1.5秒表示 → /result へ */
  const handleFinishClick = useCallback(() => {
    if (!canGoNext || isLoading) return;

    setIsLoading(true);

    try {
      sessionStorage.setItem(
        "otokomigaki.answers",
        JSON.stringify(answersRef.current),
      );
    } catch {
      /* private mode 等 */
    }

    loadingTimerRef.current = window.setTimeout(() => {
      loadingTimerRef.current = null;
      router.push("/result");
    }, 1500);
  }, [canGoNext, isLoading, router]);

  const handlePrimaryClick = useCallback(() => {
    if (isLastPage) {
      handleFinishClick();
      return;
    }
    goNext();
  }, [goNext, handleFinishClick, isLastPage]);

  if (isLoading) {
    return <ResultPreparingScreen />;
  }

  if (pageCount === 0 || currentPageQuestions.length === 0) {
    return null;
  }

  return (
    <PageAtmosphere>
      <header className="sticky top-0 z-30 border-b border-line/60 bg-void/90 px-4 pt-5 pb-4 backdrop-blur-sm sm:px-12 sm:pt-6">
        <div className="mx-auto flex max-w-xl items-center justify-between text-[0.7rem] tracking-[0.28em] text-muted">
          <span className="font-display text-gold-soft">
            ページ {pageIndex + 1} / {pageCount}
          </span>
          <span className="tabular-nums text-muted-dim">
            {answeredCount} / {total}
          </span>
        </div>
        <div className="mx-auto mt-4 h-px max-w-xl overflow-hidden bg-line">
          <div
            className="h-full bg-gradient-to-r from-bordeaux to-gold transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mx-auto mt-3 max-w-xl text-[0.65rem] tracking-[0.18em] text-muted-dim">
          質問 {rangeStart}–{rangeEnd} を回答してください
        </p>
      </header>

      <main className="relative z-10 mx-auto w-full min-w-0 max-w-xl flex-1 px-4 py-8 sm:px-12 sm:py-10">
        <div className="flex flex-col gap-10">
          {currentPageQuestions.map((question, offset) => (
            <QuestionBlock
              key={question.id}
              question={question}
              displayNumber={rangeStart + offset}
              selected={answers[question.id]}
              onSelect={(value) => handleSelect(question.id, value)}
            />
          ))}
        </div>
      </main>

      <footer className="sticky bottom-0 z-30 border-t border-line/60 bg-void/95 px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-sm sm:px-12">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          {!isFirstPage ? (
            <button
              type="button"
              onClick={goBack}
              className="relative z-10 min-h-12 shrink-0 touch-manipulation px-2 text-sm tracking-[0.14em] text-muted transition-colors duration-300 hover:text-ivory-soft"
            >
              ← 戻る
            </button>
          ) : (
            <span className="min-h-12 w-[4.5rem] shrink-0" aria-hidden />
          )}

          <button
            id="diagnosis-next-action"
            type="button"
            onClick={handlePrimaryClick}
            disabled={!canGoNext || isLoading}
            className="ui-button-primary relative z-10 min-h-12 flex-1 scroll-mt-24 touch-manipulation disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          >
            {isLastPage ? "結果を見る" : "次へ"}
          </button>
        </div>
        {!canGoNext && (
          <p className="mx-auto mt-2.5 max-w-xl text-center text-[0.65rem] tracking-wide text-muted-dim">
            このページの質問すべてに回答すると進めます
          </p>
        )}
      </footer>
    </PageAtmosphere>
  );
}
