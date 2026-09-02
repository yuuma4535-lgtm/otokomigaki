"use client";

import Link from "next/link";
import { ResultReveal } from "@/components/result/ResultReveal";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { PageAtmosphere } from "@/components/ui/PageAtmosphere";

const AXES = [
  {
    code: "P",
    name: "フィジカル",
    label: "健康・筋トレ・栄養",
    body: "睡眠・運動・栄養・身体づくりの総合力。見た目の根拠となり、一日の勢いを決める土台です。",
  },
  {
    code: "S",
    name: "スタイル",
    label: "外見・身だしなみ",
    body: "清潔感・装い・TPOと品格。第一印象と存在感を静かに、しかし確実に形づくります。",
  },
  {
    code: "D",
    name: "規律",
    label: "生活習慣",
    body: "リズム・時間管理・環境・継続改善。才能を再現可能な日常へ落とす、男磨きの骨格です。",
  },
  {
    code: "M",
    name: "マインド",
    label: "教養・対人・信念",
    body: "軸・学習・感情・リーダーシップ。選択の質と、影響力の深さを決める内面の設計図です。",
  },
] as const;

const STEPS = [
  {
    num: "1",
    title: "質問に回答",
    body: "5段階で、いまの自分を素直に選びます。",
  },
  {
    num: "2",
    title: "4つの軸で多角分析",
    body: "身体・装い・日常・内面——四方向から現在地を算出します。",
  },
  {
    num: "3",
    title: "現在地と最初の一歩",
    body: "16タイプと、あなたに必要な最初の一手。",
  },
] as const;

const TYPE_PREVIEW = [
  "鋼の体現者",
  "洗練された戦士",
  "孤高の美学主義者",
  "知的な構築者",
  "進化の探求者",
  "至高の支配者",
] as const;

const SECTION_PY =
  "px-4 py-32 sm:px-12 sm:py-48 lg:px-20 lg:py-56";

function CtaButton({ className = "" }: { className?: string }) {
  return (
    <LuxuryButton
      href="/diagnose"
      prefetch={false}
      microInteraction
      className={`group w-full max-w-full touch-manipulation sm:w-auto ${className}`}
    >
      診断を始める
      <span
        className="translate-x-0 transition-transform duration-300 group-hover:translate-x-1"
        aria-hidden
      >
        →
      </span>
    </LuxuryButton>
  );
}

/** ランディング：1画面1メッセージ + スクロールで段階的に開示 */
export function HomeLanding() {
  return (
    <PageAtmosphere>
      <div
        className="pointer-events-none absolute right-0 top-0 h-[min(100dvh,48rem)] w-[46%] bg-[linear-gradient(110deg,transparent_0%,rgba(184,148,61,0.05)_35%,rgba(110,47,61,0.12)_100%)]"
        aria-hidden
        style={{ pointerEvents: "none" }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[18%] h-40 w-40 -translate-x-1/2 rounded-full bg-gold/20 blur-[90px]"
        aria-hidden
        style={{ pointerEvents: "none" }}
      />

      {/* 1. ファーストビュー：サイト名・キャッチ・CTA のみ */}
      <section
        className={`relative flex min-h-dvh flex-col items-center justify-center ${SECTION_PY}`}
      >
        <div className="mx-auto flex w-full min-w-0 max-w-2xl flex-col items-center text-center">
          <ResultReveal>
            <p className="font-display text-[0.7rem] tracking-[0.42em] text-muted-dim uppercase">
              男磨き診断
            </p>
          </ResultReveal>
          <ResultReveal delayMs={250}>
            <h1 className="mt-10 max-w-xl font-display text-[clamp(1.75rem,6vw,3.25rem)] font-medium leading-[1.35] tracking-[0.06em] text-gold sm:mt-12">
              理想の自分へ、静かに近づくための現在地。
            </h1>
          </ResultReveal>
          <ResultReveal delayMs={500}>
            <div className="mt-14 w-full max-w-xs sm:mt-16">
              <CtaButton className="w-full" />
            </div>
          </ResultReveal>
        </div>
      </section>

      {/* 3. 差別化ポジショニング */}
      <section
        className={`relative flex min-h-[85dvh] items-center border-t border-line ${SECTION_PY}`}
      >
        <div className="mx-auto w-full max-w-3xl text-center">
          <ResultReveal>
            <p className="font-display text-[clamp(1.35rem,4.2vw,2.5rem)] font-medium leading-[1.65] tracking-wide text-ivory">
              性格ではなく&quot;今の行動&quot;を測る診断です。
              <br className="hidden sm:block" />
              生まれ持った性格は変えられませんが、行動は今日から変えられます。
            </p>
          </ResultReveal>
        </div>
      </section>

      {/* 4つの分析軸 */}
      <section className={`relative border-t border-line ${SECTION_PY}`}>
        <div className="mx-auto max-w-5xl">
          <ResultReveal>
            <p className="font-display text-[0.7rem] tracking-[0.35em] text-gold uppercase">
              Four Axes
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,4vw,2.4rem)] font-medium tracking-wide text-ivory">
              4つの分析軸
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-[1.9] text-muted sm:text-base">
              男磨きは、一つの得意分野だけでは語れません。身体・装い・日常・内面——四方向から、静かに現在地を測ります。
            </p>
          </ResultReveal>

          <div className="mt-20 grid gap-px bg-line sm:grid-cols-2">
            {AXES.map((axis, i) => (
              <ResultReveal key={axis.code} delayMs={i * 250}>
                <article className="flex h-full flex-col bg-void px-6 py-9 sm:px-8 sm:py-11">
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-3xl tracking-[0.12em] text-gold/80 sm:text-4xl">
                      {axis.code}
                    </span>
                    <div>
                      <h3 className="font-display text-lg tracking-[0.14em] text-ivory sm:text-xl">
                        {axis.name}
                      </h3>
                      <p className="mt-1 text-[0.7rem] tracking-[0.18em] text-muted-dim">
                        {axis.label}
                      </p>
                    </div>
                  </div>
                  <p className="mt-6 text-sm leading-[1.9] text-muted">
                    {axis.body}
                  </p>
                </article>
              </ResultReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 16 Types */}
      <section className={`relative border-t border-line ${SECTION_PY}`}>
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bordeaux/15 blur-[100px]"
          aria-hidden
          style={{ pointerEvents: "none" }}
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <ResultReveal>
            <p className="font-display text-[0.7rem] tracking-[0.35em] text-gold uppercase">
              16 Types
            </p>
            <p className="mt-6 font-display text-[clamp(2rem,8vw,4.5rem)] leading-[1.1] tracking-[0.06em] text-gold">
              あなたは、
              <br className="sm:hidden" />
              どの型か。
            </p>
            <p className="mx-auto mt-8 max-w-lg text-sm leading-[1.95] text-muted sm:text-base">
              相対スコアが描く16の類型。強みの配置と伸びしろがわかれば、努力の方向は迷わなくなります。現在地を知ることは、理想へ近づく最短の礼儀です。
            </p>
          </ResultReveal>

          <ResultReveal delayMs={250}>
            <ul className="mt-20 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-8">
              {TYPE_PREVIEW.map((name) => (
                <li
                  key={name}
                  className="font-display text-sm tracking-[0.16em] text-ivory-soft/70 sm:text-base"
                >
                  {name}
                </li>
              ))}
              <li className="font-display text-sm tracking-[0.16em] text-gold/70 sm:text-base">
                ほか全16タイプ
              </li>
            </ul>
          </ResultReveal>
        </div>
      </section>

      {/* 4. Process：1ステップずつ */}
      <section className={`relative border-t border-line ${SECTION_PY}`}>
        <div className="mx-auto max-w-3xl">
          <ResultReveal>
            <p className="font-display text-[0.7rem] tracking-[0.35em] text-gold uppercase">
              Process
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,4vw,2.4rem)] font-medium tracking-wide text-ivory">
              診断の流れ
            </h2>
          </ResultReveal>
        </div>
      </section>

      {STEPS.map((step, i) => (
        <section
          key={step.num}
          className={`relative flex min-h-[72dvh] items-center border-t border-line ${SECTION_PY}`}
        >
          <div className="mx-auto w-full max-w-3xl">
            <ResultReveal delayMs={i * 100}>
              <p className="font-display text-[clamp(4.5rem,18vw,9rem)] leading-none tracking-[0.04em] text-gold/25">
                {step.num}
              </p>
              <h3 className="mt-8 font-display text-[clamp(1.35rem,3.5vw,2rem)] tracking-[0.1em] text-ivory">
                {step.title}
              </h3>
              <p className="mt-5 max-w-md text-sm leading-[1.9] text-muted sm:text-base">
                {step.body}
              </p>
            </ResultReveal>
          </div>
        </section>
      ))}

      {/* 5 & 6. 最終CTA */}
      <section className={`relative border-t border-line ${SECTION_PY}`}>
        <div className="relative mx-auto flex max-w-xl flex-col items-center text-center">
          <ResultReveal>
            <div className="ui-hairline mx-auto max-w-[12rem]" />
            <p className="mt-12 font-display text-[clamp(1.35rem,4vw,2.25rem)] leading-[1.55] tracking-wide text-ivory">
              16タイプのうち、
              <br />
              あなたはどれでしょうか。
            </p>
          </ResultReveal>
          <ResultReveal delayMs={250}>
            <p className="mx-auto mt-10 max-w-sm text-sm leading-[1.9] text-muted sm:text-base">
              所要時間は約10分。今の自分を知ることから始めましょう。
            </p>
            <div className="mt-12 flex w-full max-w-xs flex-col items-center gap-5">
              <CtaButton className="w-full" />
              <p className="text-[0.7rem] tracking-[0.2em] text-muted-dim">
                結果から、プロの男磨きサポートへ。
              </p>
            </div>
          </ResultReveal>
        </div>
      </section>

      <footer className="relative border-t border-line px-4 py-8 text-center text-[0.7rem] tracking-[0.14em] text-muted-dim sm:px-12 lg:px-20">
        <p>Otokomigaki · 男磨き診断</p>
        <nav
          className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
          aria-label="法的情報"
        >
          <Link
            href="/terms"
            className="tracking-[0.16em] text-muted transition-colors hover:text-gold-soft"
          >
            利用規約
          </Link>
          <span className="text-line" aria-hidden>
            |
          </span>
          <Link
            href="/privacy"
            className="tracking-[0.16em] text-muted transition-colors hover:text-gold-soft"
          >
            プライバシーポリシー
          </Link>
        </nav>
      </footer>
    </PageAtmosphere>
  );
}
