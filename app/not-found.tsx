import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { PageAtmosphere } from "@/components/ui/PageAtmosphere";

export default function NotFound() {
  return (
    <PageAtmosphere>
      <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col items-center justify-center px-4 py-16 text-center sm:px-8">
        <p className="font-display text-[0.7rem] tracking-[0.42em] text-muted uppercase">
          Otokomigaki
        </p>

        <p
          className="mt-10 font-display text-[clamp(3.5rem,14vw,5.5rem)] leading-none tracking-[0.12em] text-gold/40"
          aria-hidden
        >
          404
        </p>

        <div className="ui-hairline mx-auto mt-8 max-w-[8rem]" />

        <h1 className="mt-8 font-display text-[clamp(1.05rem,3.5vw,1.35rem)] font-medium leading-relaxed tracking-wide text-ivory">
          お探しのページは見つかりませんでした
        </h1>

        <p className="mt-4 max-w-sm text-sm leading-[1.9] tracking-wide text-muted">
          URLが正しいかご確認のうえ、トップページからお進みください。
        </p>

        <div className="mt-12">
          <LuxuryButton href="/" className="group touch-manipulation">
            トップへ戻る
            <span
              className="translate-x-0 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </LuxuryButton>
        </div>
      </div>
    </PageAtmosphere>
  );
}
