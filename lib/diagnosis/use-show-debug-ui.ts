"use client";

import { useSearchParams } from "next/navigation";

/** debug クエリの許容値（1 / true / yes / on） */
export function isDebugFlagEnabled(value: string | null | undefined): boolean {
  if (value == null) return false;
  try {
    const normalized = String(value).trim().toLowerCase();
    return (
      normalized === "1" ||
      normalized === "true" ||
      normalized === "yes" ||
      normalized === "on"
    );
  } catch {
    return false;
  }
}

/**
 * デバッグUIの表示可否。
 * - 開発環境: 常に表示
 * - 本番等: ?debug=1（または true 等）のときのみ表示
 *
 * useSearchParams で App Router のクエリを確実に読む。
 */
export function useShowDebugUi(): boolean {
  const searchParams = useSearchParams();

  try {
    if (process.env.NODE_ENV === "development") {
      return true;
    }

    if (isDebugFlagEnabled(searchParams.get("debug"))) {
      return true;
    }

    // 念のためのフォールバック（一部環境で searchParams が空の場合）
    if (typeof window !== "undefined") {
      const fromLocation = new URLSearchParams(window.location.search).get(
        "debug",
      );
      return isDebugFlagEnabled(fromLocation);
    }

    return false;
  } catch {
    return process.env.NODE_ENV === "development";
  }
}
