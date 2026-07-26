import questionsData from "@/data/questions.json";
import type { Question, QuestionsData } from "@/types/diagnosis";

/** 診断画面用の軽量データアクセス（score.ts 全体をクライアントに載せない） */
const data = questionsData as QuestionsData;

const CATEGORY_ORDER = [
  "physique",
  "appearance",
  "lifestyle",
  "mind",
] as const;

export function getOrderedQuestions(): Question[] {
  return CATEGORY_ORDER.flatMap((id) =>
    data.questions.filter((q) => q.categoryId === id),
  );
}

export { data as questionsDataset };
