"use client";

import { useEffect, useRef, useState } from "react";

type UseInViewOnceOptions = {
  threshold?: number;
  rootMargin?: string;
};

/**
 * 初回のみ intersection を検知するフック（再スクロールでは再発火しない）。
 */
export function useInViewOnce<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOnceOptions = {},
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const isVisible = () => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
    };

    if (isVisible()) {
      setInView(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: options.threshold ?? 0.12,
        rootMargin: options.rootMargin ?? "0px 0px -6% 0px",
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, options.rootMargin, options.threshold]);

  return { ref, inView };
}
