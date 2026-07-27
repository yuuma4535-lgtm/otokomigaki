"use client";

import { useEffect, useState } from "react";

/**
 * デバッグUIの表示可否。
 * - 開発環境: 常に表示
 * - 本番等: URL に ?debug=1 があるときのみ表示
 */
export function useShowDebugUi(): boolean {
  const [showDebug, setShowDebug] = useState(
    () => process.env.NODE_ENV === "development",
  );

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setShowDebug(true);
      return;
    }
    const params = new URLSearchParams(window.location.search);
    setShowDebug(params.get("debug") === "1");
  }, []);

  return showDebug;
}
