import Link from "next/link";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { PageAtmosphere } from "@/components/ui/PageAtmosphere";
import { Reveal } from "@/components/home/Reveal";

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
    num: "01",
    title: "質問に回答",
    body: "全70問。5段階で、いまの自分を素直に選びます。登録不要、約10分。",
  },
  {
    num: "02",
    title: "4つの軸で多角分析",
    body: "フィジカル・スタイル・規律・マインドを独自アルゴリズムが読み解き、相対的な現在地を算出します。",
  },
  {
    num: "03",
    title: "現在地と最初の一歩",
    body: "16タイプ分類と、あなたに必要な最初の一手。結果はシェアもコピーもできます。",
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

function CtaButton({ className = "" }: { className?: string }) {
  return (
    <LuxuryButton
      href="/diagnose"
      prefetch={false}
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

/** ランディング：ヒーロー + 軸紹介 + 期待感 + 3ステップ + 最終CTA */
export function HomeLanding() {
  return (
    <PageAtmosphere>
      {/* 装飾は高さ制限つき + pointer-events-none（ページ全体を覆わない） */}
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

      <header className="relative flex items-center justify-between px-4 py-5 sm:px-12 sm:py-8 lg:px-20">
        <p className="font-display text-[0.7rem] tracking-[0.42em] text-muted uppercase">
          Otokomigaki
        </p>
        <p className="text-[0.7rem] tracking-[0.28em] text-muted-dim">約10分</p>
      </header>

      <section className="relative px-4 pb-16 pt-8 sm:px-12 sm:pb-24 sm:pt-12 lg:px-20">
        <div className="mx-auto w-full min-w-0 max-w-2xl">
          <p className="animate-[heroFade_1s_ease_both] font-display text-[clamp(2.15rem,8.5vw,5.75rem)] leading-[1.05] tracking-[0.08em] text-gold">
            男磨き診断
          </p>

          <div className="ui-hairline mt-5 max-w-[11rem] animate-[heroFade_1s_0.08s_ease_both] sm:mt-10 sm:max-w-xs" />

          <h1 className="mt-5 max-w-lg animate-[heroFade_1s_0.15s_ease_both] font-display text-[clamp(1.1rem,3.8vw,1.85rem)] font-medium leading-relaxed tracking-wide text-ivory sm:mt-10">
            理想の自分へ、静かに近づくための現在地。
          </h1>

          <p className="mt-4 max-w-md animate-[heroFade_1s_0.25s_ease_both] text-[0.9rem] leading-[1.85] text-muted sm:mt-6 sm:text-base sm:leading-[1.9]">
            全70問の深層分析が、あなたの男磨きを16タイプへ導きます。
          </p>

          <div className="mt-8 flex w-full min-w-0 flex-col gap-4 animate-[heroFade_1s_0.38s_ease_both] sm:mt-14 sm:flex-row sm:items-center sm:gap-5">
            <CtaButton />
            <p className="text-sm tracking-[0.12em] text-muted-dim">
              独自アルゴリズム・登録不要
            </p>
          </div>
        </div>
      </section>

      <section className="relative border-t border-line px-4 py-20 sm:px-12 sm:py-28 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="font-display text-[0.7rem] tracking-[0.35em] text-gold uppercase">
              Four Axes
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,4vw,2.4rem)] font-medium tracking-wide text-ivory">
              4つの分析軸
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-[1.9] text-muted sm:text-base">
              男磨きは、一つの得意分野だけでは語れません。身体・装い・日常・内面——四方向から、静かに現在地を測ります。
            </p>
          </Reveal>

          <div className="mt-14 grid gap-px bg-line sm:grid-cols-2">
            {AXES.map((axis, i) => (
              <Reveal key={axis.code} delayMs={i * 90}>
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
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-line px-4 py-20 sm:px-12 sm:py-28 lg:px-20">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bordeaux/15 blur-[100px]"
          aria-hidden
          style={{ pointerEvents: "none" }}
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
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
          </Reveal>

          <Reveal delayMs={120}>
            <ul className="mt-14 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-8">
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
          </Reveal>
        </div>
      </section>

      <section className="relative border-t border-line px-4 py-20 sm:px-12 sm:py-28 lg:px-20">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="font-display text-[0.7rem] tracking-[0.35em] text-gold uppercase">
              Process
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,4vw,2.4rem)] font-medium tracking-wide text-ivory">
              診断の流れ
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-[1.9] text-muted sm:text-base">
              複雑な設定はありません。答える、測る、知る——この三つだけです。
            </p>
          </Reveal>

          <ol className="mt-14 space-y-0">
            {STEPS.map((step, i) => (
              <Reveal key={step.num} delayMs={i * 100}>
                <li className="relative grid grid-cols-[auto_1fr] gap-x-6 border-t border-line py-10 sm:gap-x-10 sm:py-12">
                  <span className="font-display text-2xl tracking-[0.2em] text-gold sm:text-3xl">
                    {step.num}
                  </span>
                  <div>
                    <h3 className="font-display text-lg tracking-[0.12em] text-ivory sm:text-xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-[1.9] text-muted">
                      {step.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative border-t border-line px-4 py-24 sm:px-12 sm:py-32 lg:px-20">
        <Reveal>
          <div className="relative mx-auto max-w-xl text-center">
            <div className="ui-hairline mx-auto max-w-[12rem]" />
            <p className="mt-10 font-display text-[clamp(1.4rem,3.5vw,2rem)] leading-relaxed tracking-wide text-ivory">
              いまの自分を、
              <br />
              正確に知ることから。
            </p>
            <p className="mx-auto mt-6 max-w-sm text-sm leading-[1.9] text-muted">
              全70問・約10分。結果はすぐに表示され、最初の一歩まで届きます。
            </p>
            <div className="mt-12 flex flex-col items-center gap-5">
              <CtaButton />
              <p className="text-[0.7rem] tracking-[0.2em] text-muted-dim">
                結果から、プロの男磨きサポートへ。
              </p>
            </div>
          </div>
        </Reveal>
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
