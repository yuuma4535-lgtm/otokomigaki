"use client";

import type { ReactNode } from "react";

type FadePanelProps = {
  /** 質問切替などで再マウントさせるキー */
  animKey: string | number;
  children: ReactNode;
  className?: string;
  /** 診断の選択肢など、タッチを確実にしたい領域ではアニメを無効化 */
  disableAnimation?: boolean;
};

/**
 * 質問切替時のソフトなフェードイン。
 * ※ opacity アニメは iOS で子孫のヒットテストを壊すことがあるため、
 *   インタラクティブ領域では disableAnimation を使う。
 */
export function FadePanel({
  animKey,
  children,
  className = "",
  disableAnimation = false,
}: FadePanelProps) {
  return (
    <div
      key={animKey}
      className={
        disableAnimation
          ? className
          : `animate-[softFade_0.4s_ease-out] ${className}`
      }
    >
      {children}
    </div>
  );
}
