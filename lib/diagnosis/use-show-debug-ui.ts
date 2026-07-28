"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

/** クライアントの URL から ?debug= を確実に読む */
export function readDebugFlagFromWindow(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return isDebugFlagEnabled(
      new URLSearchParams(window.location.search).get("debug"),
    );
  } catch {
    return false;
  }
}

/**
 * デバッグUIの表示可否。
 * - 開発環境（NODE_ENV === 'development'）: 常に表示
 * - 本番等: URL に ?debug=1（または true / yes / on）があるときのみ表示
 *
 * useSearchParams と window.location.search の両方で判定し、
 * どちらかで拾えれば表示する（クライアントで確実に反映）。
 *
 * 呼び出し側は Suspense 境界内に置くこと（useSearchParams 要件）。
 */
export function useShowDebugUi(): boolean {
  const searchParams = useSearchParams();
  const [fromWindow, setFromWindow] = useState(false);

  useEffect(() => {
    setFromWindow(readDebugFlagFromWindow());
  }, [searchParams]);

  if (process.env.NODE_ENV === "development") {
    return true;
  }

  return (
    isDebugFlagEnabled(searchParams.get("debug")) || fromWindow
  );
}
