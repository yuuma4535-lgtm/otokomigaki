import Link from "next/link";
import type { ReactNode } from "react";
import { PageAtmosphere } from "@/components/ui/PageAtmosphere";

type LegalPageShellProps = {
  title: string;
  updatedAt: string;
  children: ReactNode;
};

/** 利用規約・プライバシーポリシー共通の読みやすい枠 */
export function LegalPageShell({
  title,
  updatedAt,
  children,
}: LegalPageShellProps) {
  return (
    <PageAtmosphere>
      <div className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-8 sm:py-16">
        <p className="font-display text-[0.7rem] tracking-[0.36em] text-gold">
          Otokomigaki
        </p>
        <h1 className="mt-4 font-display text-[clamp(1.5rem,4vw,2rem)] font-medium tracking-wide text-ivory">
          {title}
        </h1>
        <p className="mt-3 text-[0.7rem] tracking-wide text-muted-dim">
          最終更新日：{updatedAt}
        </p>
        <div className="ui-hairline mt-8 max-w-[12rem]" />

        <div className="mt-10 space-y-8 text-sm leading-[1.95] text-muted sm:text-[0.95rem]">
          {children}
        </div>

        <div className="mt-14 border-t border-line pt-8">
          <Link
            href="/"
            className="text-sm tracking-[0.16em] text-gold transition-colors hover:text-gold-soft"
          >
            ← トップへ戻る
          </Link>
        </div>
      </div>
    </PageAtmosphere>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-base tracking-[0.12em] text-ivory-soft">
        {title}
      </h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}
