"use client";

import { useState } from "react";
import {
  createAnswersForType,
  DEBUG_RESULT_JUMP_TARGETS,
} from "@/lib/diagnosis/debug-answers";
import { useShowDebugUi } from "@/lib/diagnosis/use-show-debug-ui";
import type { ResultTypeId } from "@/types/diagnosis";

const ANSWERS_KEY = "otokomigaki.answers";
const COMPLETED_KEY = "otokomigaki.diagnosisCompleted";

/**
 * デバッグ有効時のみ表示。
 * 全診断結果ページへ一発でジャンプできるメニュー（トップ／任意画面）。
 */
export function GlobalDebugJumpMenu() {
  const showDebug = useShowDebugUi();
  const [open, setOpen] = useState(false);

  if (!showDebug) return null;

  const jumpToType = (typeId: ResultTypeId) => {
    try {
      const answers = createAnswersForType(typeId);
      sessionStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
      sessionStorage.setItem(COMPLETED_KEY, "1");
    } catch {
      /* private mode 等 */
    }
    // 本番でもデバッグUIを維持。結果ページ上からの再ジャンプでも確実に再読込する
    window.location.assign("/result?debug=1");
    setOpen(false);
  };

  return (
    <div className="pointer-events-auto fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-2 z-40 flex max-w-[14rem] flex-col gap-1.5 sm:left-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="pointer-events-auto touch-manipulation rounded-md border border-line bg-void/95 px-2.5 py-1.5 text-left text-[0.65rem] tracking-[0.14em] text-muted-dim uppercase shadow-[var(--shadow-panel)] backdrop-blur-sm transition-colors hover:border-gold/40 hover:text-gold-soft"
      >
        {open ? "Close Debug Jump" : "Debug → Results"}
      </button>

      {open ? (
        <div className="max-h-[min(22rem,50vh)] overflow-y-auto rounded-md border border-line bg-void/95 p-2 shadow-[var(--shadow-panel)] backdrop-blur-sm">
          <p className="mb-1.5 px-1 text-[0.55rem] tracking-[0.18em] text-muted-dim uppercase">
            Jump to type
          </p>
          <ul className="flex flex-col gap-1">
            {DEBUG_RESULT_JUMP_TARGETS.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => jumpToType(t.id)}
                  className="pointer-events-auto w-full touch-manipulation rounded-sm border border-line bg-charcoal-raised px-2 py-1.5 text-left text-[0.65rem] leading-snug tracking-wide text-muted transition-colors hover:border-gold/35 hover:text-ivory-soft"
                >
                  {t.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
