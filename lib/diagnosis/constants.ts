import type { LikertChoice } from "@/types/diagnosis";

/** ココナラ導線URL */
export const COCONALA_URL = "https://coconala.com/services/4317364";

export const TOTAL_QUESTIONS = 70;
export const MAX_CHOICE_SCORE = 5;
/** 70問 × 5点 = 350点満点 */
export const MAX_TOTAL_SCORE = TOTAL_QUESTIONS * MAX_CHOICE_SCORE;

/**
 * 診断1ページあたりの質問数。
 * 70問 ÷ 5 = 14ページ（スクロール量とページ数のバランス）。
 */
export const QUESTIONS_PER_PAGE = 5;

/**
 * 全質問共通の 5 段階評価スケール
 * 1: 全く当てはまらない 〜 5: 非常に当てはまる
 */
export const LIKERT_SCALE: LikertChoice[] = [
  { value: 1, label: "全く当てはまらない" },
  { value: 2, label: "あまり当てはまらない" },
  { value: 3, label: "どちらともいえない" },
  { value: 4, label: "やや当てはまる" },
  { value: 5, label: "非常に当てはまる" },
];
