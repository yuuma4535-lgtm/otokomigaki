"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** 遅延（ms）。スタッガー用 */
  delayMs?: number;
};

/**
 * スクロール進入でフェードイン。
 * 重要: 初期状態は「表示」寄り。IO 失敗や hydration 遅延で文字が消えたままにしない。
 */
export function Reveal({ children, className = "", delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => setVisible(true);

    // すでに画面内ならそのまま表示
    const rect = el.getBoundingClientRect();
    const alreadyInView =
      rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
    if (alreadyInView) {
      show();
      return;
    }

    // 画面外のみ一旦隠して進入アニメ（失敗しても必ず再表示）
    setVisible(false);

    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "64px 0px 64px 0px" },
    );
    observer.observe(el);

    const fallback = window.setTimeout(show, 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms, transform 0.75s cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
}
