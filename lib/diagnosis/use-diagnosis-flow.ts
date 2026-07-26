"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS_PER_PAGE } from "@/lib/diagnosis/constants";
import { getOrderedQuestions } from "@/lib/diagnosis/questions-data";
import type { Answers, Question } from "@/types/diagnosis";

type FlowState = {
  pageIndex: number;
  answers: Answers;
};

function chunkQuestions(
  questions: Question[],
  size: number,
): Question[][] {
  if (size <= 0) return [questions];
  const pages: Question[][] = [];
  for (let i = 0; i < questions.length; i += size) {
    pages.push(questions.slice(i, i + size));
  }
  return pages;
}

function isPageComplete(pageQuestions: Question[], answers: Answers): boolean {
  return pageQuestions.every((q) => {
    const value = answers[q.id];
    return typeof value === "number" && value >= 1 && value <= 5;
  });
}

/** 診断の進行管理（ページ単位 + 回答マップ） */
export function useDiagnosisFlow(questionsPerPage = QUESTIONS_PER_PAGE) {
  const router = useRouter();
  const questions = useMemo(() => getOrderedQuestions(), []);
  const pages = useMemo(
    () => chunkQuestions(questions, questionsPerPage),
    [questions, questionsPerPage],
  );

  const [flow, setFlow] = useState<FlowState>({ pageIndex: 0, answers: {} });
  const flowRef = useRef(flow);
  flowRef.current = flow;

  const total = questions.length;
  const pageCount = pages.length;
  const pageIndex = Math.min(flow.pageIndex, Math.max(pageCount - 1, 0));
  const currentPageQuestions = pages[pageIndex] ?? [];
  const answeredCount = Object.keys(flow.answers).filter((id) => {
    const value = flow.answers[id];
    return typeof value === "number" && value >= 1 && value <= 5;
  }).length;
  const progress = total === 0 ? 0 : (answeredCount / total) * 100;
  const isFirstPage = pageIndex === 0;
  const isLastPage = pageCount > 0 && pageIndex === pageCount - 1;
  const canGoNext = isPageComplete(currentPageQuestions, flow.answers);

  const rangeStart =
    currentPageQuestions.length === 0
      ? 0
      : pageIndex * questionsPerPage + 1;
  const rangeEnd = Math.min((pageIndex + 1) * questionsPerPage, total);

  const setAnswer = useCallback((questionId: string, value: number) => {
    const score = Number(value);
    if (!Number.isFinite(score) || score < 1 || score > 5) return;

    setFlow((prev) => {
      const next: FlowState = {
        ...prev,
        answers: { ...prev.answers, [questionId]: score },
      };
      flowRef.current = next;
      return next;
    });
  }, []);

  const persistAndFinish = useCallback(
    (nextAnswers: Answers) => {
      try {
        sessionStorage.setItem(
          "otokomigaki.answers",
          JSON.stringify(nextAnswers),
        );
      } catch {
        /* private mode 等 */
      }
      router.push("/result");
    },
    [router],
  );

  const goNext = useCallback(() => {
    const { pageIndex: current, answers } = flowRef.current;
    const pageQuestions = pages[current] ?? [];
    if (!isPageComplete(pageQuestions, answers)) return;

    if (current >= pages.length - 1) {
      persistAndFinish(answers);
      return;
    }

    setFlow((prev) => {
      const next: FlowState = {
        ...prev,
        pageIndex: Math.min(prev.pageIndex + 1, pages.length - 1),
      };
      flowRef.current = next;
      return next;
    });
  }, [pages, persistAndFinish]);

  const goBack = useCallback(() => {
    setFlow((prev) => {
      const next: FlowState = {
        ...prev,
        pageIndex: Math.max(prev.pageIndex - 1, 0),
      };
      flowRef.current = next;
      return next;
    });
  }, []);

  return {
    questions,
    pages,
    currentPageQuestions,
    pageIndex,
    pageCount,
    total,
    answeredCount,
    progress,
    rangeStart,
    rangeEnd,
    answers: flow.answers,
    isFirstPage,
    isLastPage,
    canGoNext,
    setAnswer,
    goNext,
    goBack,
  };
}
