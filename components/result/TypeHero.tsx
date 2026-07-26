"use client";

import type { CSSProperties } from "react";
import { TypeSymbol } from "@/components/result/TypeSymbol";
import { getTypeVisual } from "@/lib/diagnosis/type-visuals";
import type { DiagnosisResult } from "@/types/diagnosis";

type TypeHeroProps = {
  result: DiagnosisResult;
};

/**
 * タイプ別アクセント＋シンボル付きの結果ヘッダー。
 * 装飾はすべて pointer-events: none（タッチ／スクロールを奪わない）。
 * mix-blend-mode は使わない（iOS Safari のヒットテスト拡大バグ回避）。
 */
export function TypeHero({ result }: TypeHeroProps) {
  const visual = getTypeVisual(result.typeId);

  return (
    <section
      className="w-full min-w-0 text-center animate-[heroFade_1s_ease_both]"
      style={
        {
          "--type-accent": visual.accent,
          "--type-accent-soft": visual.accentSoft,
          "--type-accent-glow": visual.accentGlow,
        } as CSSProperties
      }
    >
      <p
        className="font-display text-[0.7rem] tracking-[0.36em]"
        style={{ color: "var(--type-accent)" }}
      >
        診断結果
      </p>

      <div
        className="pointer-events-none relative mx-auto mt-8 h-[10.5rem] w-[10.5rem] sm:mt-10 sm:h-[12.5rem] sm:w-[12.5rem]"
        aria-hidden
        style={{ pointerEvents: "none" }}
      >
        <div
          className="pointer-events-none absolute inset-[10%] rounded-full opacity-55 blur-2xl"
          style={{
            background: "var(--type-accent-glow)",
            pointerEvents: "none",
          }}
        />

        {/*
          円形ベース：装飾枠の下に密着（inset-0）して黒い隙間を消す。
          枠サイズ・scale は変更しない。
        */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-full border bg-void shadow-[var(--shadow-panel)]"
          style={{
            borderRadius: "50%",
            clipPath: "circle(50% at 50% 50%)",
            WebkitClipPath: "circle(50% at 50% 50%)",
            borderColor:
              "color-mix(in srgb, var(--type-accent) 40%, transparent)",
            pointerEvents: "none",
          }}
        >
          {/* 画像は枠の内縁直下まで広げ、見切れ・余白の両方を抑える */}
          <div className="absolute inset-[2%] overflow-hidden rounded-full">
            <TypeSymbol
              typeId={result.typeId}
              alt={visual.symbolAlt}
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>

        {/*
          装飾枠（透過 PNG）。エンブレムよりわずかに大きくして
          細いブレスレット状に被せる。mix-blend 禁止。
        */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/types/emblem-frame.png"
          alt=""
          width={606}
          height={601}
          decoding="async"
          draggable={false}
          className="pointer-events-none absolute inset-0 z-[1] h-full w-full origin-center scale-[1.16] object-contain opacity-90"
          style={{ pointerEvents: "none" }}
        />
      </div>

      <p className="mt-8 text-[0.95rem] tracking-wide text-ivory-soft">あなたは</p>
      <h1
        className="mt-3 break-keep px-1 font-display text-[clamp(1.45rem,6.5vw,2.75rem)] font-medium leading-tight tracking-[0.06em] sm:tracking-[0.08em]"
        style={{ color: "var(--type-accent-soft)" }}
      >
        『{result.typeName}』
      </h1>
      <p className="mt-3 text-[0.95rem] tracking-wide text-ivory-soft">です。</p>

      <p
        className="mx-auto mt-6 max-w-sm font-display text-sm leading-[1.9] tracking-wide sm:text-base"
        style={{ color: "var(--type-accent)" }}
      >
        {visual.catchphrase}
      </p>

      <div
        className="mx-auto mt-8 h-px w-20"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--type-accent), transparent)",
        }}
        aria-hidden
      />

      <p className="mx-auto mt-8 max-w-md text-[0.95rem] leading-[2] text-muted">
        {result.typeDescription}
      </p>
    </section>
  );
}
