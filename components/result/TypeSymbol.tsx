"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_TYPE_SYMBOL,
  getTypePngSrc,
  getTypeSvgSrc,
} from "@/lib/diagnosis/type-visuals";
import type { ResultTypeId } from "@/types/diagnosis";

type TypeSymbolProps = {
  typeId: ResultTypeId;
  alt: string;
  className?: string;
};

/**
 * 中央アイコン: `{typeId}.png` を優先。
 * 親の円形クリップ内で object-fit: cover し、四角い黒背景を見せない。
 * mix-blend-mode は使わない（タッチ／スクロール阻害の原因になるため）。
 */
export function TypeSymbol({ typeId, alt, className = "" }: TypeSymbolProps) {
  const pngSrc = getTypePngSrc(typeId);
  const svgSrc = getTypeSvgSrc(typeId);
  const [src, setSrc] = useState(pngSrc);

  useEffect(() => {
    setSrc(pngSrc);
  }, [pngSrc]);

  const isPng = src.endsWith(".png");

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={`${typeId}:${src}`}
      src={src}
      alt={alt}
      width={220}
      height={220}
      decoding="async"
      draggable={false}
      className={[
        "pointer-events-none block h-full w-full rounded-full object-center",
        isPng ? "object-cover" : "object-contain p-[10%]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        borderRadius: "50%",
        objectFit: isPng ? "cover" : "contain",
        objectPosition: "center",
        pointerEvents: "none",
        // 横長 PNG の余白黒を円内で最小化
        ...(isPng ? { transform: "scale(1.08)" } : null),
      }}
      onError={() => {
        setSrc((current) => {
          if (current === pngSrc) return svgSrc;
          if (current === svgSrc) return DEFAULT_TYPE_SYMBOL;
          return current;
        });
      }}
    />
  );
}
