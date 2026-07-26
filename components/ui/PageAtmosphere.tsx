import type { CSSProperties, ReactNode } from "react";

type PageAtmosphereProps = {
  children: ReactNode;
  mood?: "default" | "result" | "supreme" | "prototype";
  /** タイプ別アクセント（結果ページ用）。指定時は glow に反映 */
  accentGlow?: string;
  className?: string;
  style?: CSSProperties;
};

/**
 * 背景装飾のみ。タッチ・スクロールは常に子要素へ通す。
 * height 固定 / overflow:hidden / isolate / 全面 pointer キャプチャはしない。
 */
export function PageAtmosphere({
  children,
  mood = "default",
  accentGlow,
  className = "",
  style,
}: PageAtmosphereProps) {
  const glow =
    mood === "supreme"
      ? "bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,rgba(184,148,61,0.38),transparent_55%),radial-gradient(ellipse_50%_40%_at_80%_80%,rgba(212,181,106,0.18),transparent_50%)]"
      : mood === "prototype"
        ? "bg-[radial-gradient(ellipse_75%_50%_at_50%_10%,rgba(110,47,61,0.45),transparent_55%),radial-gradient(ellipse_45%_35%_at_20%_85%,rgba(184,148,61,0.12),transparent_50%)]"
        : mood === "result"
          ? "bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(110,47,61,0.28),transparent_58%),radial-gradient(ellipse_50%_40%_at_85%_70%,rgba(184,148,61,0.1),transparent_55%)]"
          : "bg-[radial-gradient(ellipse_75%_50%_at_20%_0%,rgba(184,148,61,0.12),transparent_55%),radial-gradient(ellipse_55%_40%_at_90%_80%,rgba(110,47,61,0.18),transparent_50%)]";

  return (
    <div
      className={`relative min-h-dvh bg-void text-ivory ${className}`}
      style={style}
    >
      {/* 背景のみ。inset-0 でも pointer-events: none で操作を奪わない */}
      <div
        className={`pointer-events-none absolute inset-0 ${glow}`}
        aria-hidden
        style={{ pointerEvents: "none", zIndex: 0 }}
      />
      {accentGlow ? (
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            pointerEvents: "none",
            zIndex: 0,
            background: `radial-gradient(ellipse 75% 45% at 50% 0%, ${accentGlow}, transparent 58%)`,
          }}
        />
      ) : null}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.2] [background-image:linear-gradient(rgba(235,230,220,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(235,230,220,0.03)_1px,transparent_1px)] [background-size:80px_80px]"
        aria-hidden
        style={{ pointerEvents: "none", zIndex: 0 }}
      />
      {/* コンテンツは装飾より前面。pointer-events はデフォルト（auto）のまま */}
      <div className="relative" style={{ zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
