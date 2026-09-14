"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { COCONALA_URL } from "@/lib/diagnosis/constants";
import {
  calculateNutrition,
  type ActivityLevel,
  type Goal,
  type NutritionResult,
  type Sex,
} from "@/lib/nutrition/calculate";
import { buildMenuExamples } from "@/lib/nutrition/menus";

const GOLD = "#b8943d";

const ACTIVITY_OPTIONS: Array<{ id: ActivityLevel; label: string; hint: string }> = [
  { id: "sedentary", label: "座り仕事中心", hint: "ほぼ運動なし" },
  { id: "light", label: "軽い運動あり", hint: "週1〜2回" },
  { id: "moderate", label: "中程度の運動", hint: "週3〜5回" },
  { id: "intense", label: "激しい運動", hint: "ほぼ毎日・ハード" },
];

const GOAL_OPTIONS: Array<{ id: Goal; label: string }> = [
  { id: "cut", label: "減量" },
  { id: "maintain", label: "維持" },
  { id: "bulk", label: "増量" },
];

type FormState = {
  sex: Sex | "";
  age: string;
  heightCm: string;
  weightKg: string;
  activity: ActivityLevel | "";
  goal: Goal | "";
};

const EMPTY: FormState = {
  sex: "",
  age: "",
  heightCm: "",
  weightKg: "",
  activity: "",
  goal: "",
};

function parsePositive(value: string): number | null {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

export function NutritionCalculator() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<NutritionResult | null>(null);

  const menus = useMemo(
    () => (result ? buildMenuExamples(result) : []),
    [result],
  );

  const macroKcal = result
    ? {
        p: result.proteinG * 4,
        f: result.fatG * 9,
        c: Math.max(result.carbG * 4, 0),
      }
    : null;
  const macroTotal = macroKcal
    ? Math.max(macroKcal.p + macroKcal.f + macroKcal.c, 1)
    : 1;

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const age = parsePositive(form.age);
    const heightCm = parsePositive(form.heightCm);
    const weightKg = parsePositive(form.weightKg);

    if (!form.sex || !form.activity || !form.goal || age == null || heightCm == null || weightKg == null) {
      setError("すべての項目を入力してください。");
      setResult(null);
      return;
    }
    if (age < 15 || age > 80 || heightCm < 120 || heightCm > 230 || weightKg < 30 || weightKg > 200) {
      setError("年齢・身長・体重が一般的な範囲を外れています。数値を確認してください。");
      setResult(null);
      return;
    }

    setError(null);
    setResult(
      calculateNutrition({
        sex: form.sex,
        age,
        heightCm,
        weightKg,
        activity: form.activity,
        goal: form.goal,
      }),
    );
  };

  return (
    <div
      className="min-h-dvh bg-[#f4f3f0] text-[#1f1e1c]"
      style={{
        fontFamily:
          'var(--font-body), "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Noto Sans JP", sans-serif',
      }}
    >
      <header className="border-b border-[#e4e0d8] bg-white/80">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <Link href="/" className="text-xs tracking-[0.18em] text-[#6f6a62]">
            男磨き診断
          </Link>
          <p className="text-xs text-[#8a847b]">無料ツール</p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
        <p className="text-xs font-medium tracking-[0.16em] text-[#b8943d]">
          PFC計算 · カロリー計算
        </p>
        <h1 className="mt-3 text-[1.7rem] font-semibold leading-snug tracking-tight text-[#1a1917] sm:text-[2rem]">
          PFC・カロリー計算機
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-[1.9] text-[#5c574f] sm:text-base">
          性別・年齢・活動量から、タンパク質の必要量と1日の目標カロリーを無料でチェックできます。結果に近い、シンプルな日本食のメニュー例も表示します。
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-10 rounded-2xl border border-[#e6e2da] bg-white p-5 shadow-[0_8px_30px_-24px_rgba(40,32,16,0.35)] sm:p-7"
        >
          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-[#2a2824]">性別</legend>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  ["male", "男性"],
                  ["female", "女性"],
                ] as const
              ).map(([id, label]) => (
                <label
                  key={id}
                  className={`cursor-pointer rounded-xl border px-4 py-3 text-center text-sm transition-colors ${
                    form.sex === id
                      ? "border-[#b8943d] bg-[#fbf7ee] text-[#1a1917]"
                      : "border-[#e6e2da] bg-[#fafaf8] text-[#4a453e]"
                  }`}
                >
                  <input
                    type="radio"
                    name="sex"
                    value={id}
                    checked={form.sex === id}
                    onChange={() => setForm((prev) => ({ ...prev, sex: id }))}
                    className="sr-only"
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <NumberField
              label="年齢"
              suffix="歳"
              value={form.age}
              onChange={(age) => setForm((prev) => ({ ...prev, age }))}
            />
            <NumberField
              label="身長"
              suffix="cm"
              value={form.heightCm}
              onChange={(heightCm) => setForm((prev) => ({ ...prev, heightCm }))}
            />
            <NumberField
              label="体重"
              suffix="kg"
              value={form.weightKg}
              onChange={(weightKg) => setForm((prev) => ({ ...prev, weightKg }))}
            />
          </div>

          <fieldset className="mt-6 space-y-3">
            <legend className="text-sm font-medium text-[#2a2824]">活動レベル</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {ACTIVITY_OPTIONS.map((option) => (
                <label
                  key={option.id}
                  className={`cursor-pointer rounded-xl border px-4 py-3 text-sm transition-colors ${
                    form.activity === option.id
                      ? "border-[#b8943d] bg-[#fbf7ee]"
                      : "border-[#e6e2da] bg-[#fafaf8]"
                  }`}
                >
                  <input
                    type="radio"
                    name="activity"
                    value={option.id}
                    checked={form.activity === option.id}
                    onChange={() =>
                      setForm((prev) => ({ ...prev, activity: option.id }))
                    }
                    className="sr-only"
                  />
                  <span className="block text-[#1f1e1c]">{option.label}</span>
                  <span className="mt-0.5 block text-xs text-[#8a847b]">
                    {option.hint}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6 space-y-3">
            <legend className="text-sm font-medium text-[#2a2824]">目的</legend>
            <div className="grid grid-cols-3 gap-2">
              {GOAL_OPTIONS.map((option) => (
                <label
                  key={option.id}
                  className={`cursor-pointer rounded-xl border px-3 py-3 text-center text-sm transition-colors ${
                    form.goal === option.id
                      ? "border-[#b8943d] bg-[#fbf7ee] text-[#1a1917]"
                      : "border-[#e6e2da] bg-[#fafaf8] text-[#4a453e]"
                  }`}
                >
                  <input
                    type="radio"
                    name="goal"
                    value={option.id}
                    checked={form.goal === option.id}
                    onChange={() => setForm((prev) => ({ ...prev, goal: option.id }))}
                    className="sr-only"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>

          {error ? (
            <p className="mt-5 text-sm text-[#8a4b32]" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            className="mt-7 w-full rounded-xl px-4 py-3.5 text-sm font-semibold tracking-wide text-[#1a160e] transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
            style={{ backgroundColor: GOLD }}
          >
            カロリーとPFCを計算する
          </button>
        </form>

        {result && macroKcal ? (
          <section className="mt-12 space-y-8" aria-live="polite">
            <div className="rounded-2xl border border-[#e6e2da] bg-white p-6 sm:p-8">
              <p className="text-xs tracking-[0.14em] text-[#8a847b]">1日の目標カロリー</p>
              <p className="mt-2 text-4xl font-semibold tabular-nums tracking-tight text-[#1a1917]">
                {result.targetKcal.toLocaleString()}
                <span className="ml-1 text-base font-medium text-[#6f6a62]">kcal</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#5c574f]">
                基礎代謝 {result.bmr.toLocaleString()} kcal × 活動量 = 消費カロリー{" "}
                {result.tdee.toLocaleString()} kcal。目的に合わせて{" "}
                {result.adjustmentKcal === 0
                  ? "調整なし"
                  : `${result.adjustmentKcal > 0 ? "+" : ""}${result.adjustmentKcal} kcal`}
                （減量は-300〜500kcal、増量は+300〜500kcalの目安）です。
              </p>
            </div>

            <div className="rounded-2xl border border-[#e6e2da] bg-white p-6 sm:p-8">
              <h2 className="text-base font-semibold text-[#1a1917]">PFCバランスの目安</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#5c574f]">
                タンパク質は体重1kgあたり{result.proteinPerKg}g（一般的な必要量の目安
                1.6〜2.2g）。脂質は総カロリーの約{Math.round(result.fatRatio * 100)}%（20〜30%の範囲）で、残りを炭水化物にしています。
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <MacroCard label="P タンパク質" grams={result.proteinG} tone="gold" />
                <MacroCard label="F 脂質" grams={result.fatG} />
                <MacroCard label="C 炭水化物" grams={result.carbG} />
              </div>

              <div className="mt-6">
                <div className="flex h-3 overflow-hidden rounded-full bg-[#efece6]">
                  <div
                    className="h-full"
                    style={{
                      width: `${(macroKcal.p / macroTotal) * 100}%`,
                      backgroundColor: GOLD,
                    }}
                  />
                  <div
                    className="h-full bg-[#cfc6b6]"
                    style={{ width: `${(macroKcal.f / macroTotal) * 100}%` }}
                  />
                  <div
                    className="h-full bg-[#e7e1d6]"
                    style={{ width: `${(macroKcal.c / macroTotal) * 100}%` }}
                  />
                </div>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#6f6a62]">
                  <li>タンパク質 {Math.round((macroKcal.p / macroTotal) * 100)}%</li>
                  <li>脂質 {Math.round((macroKcal.f / macroTotal) * 100)}%</li>
                  <li>炭水化物 {Math.round((macroKcal.c / macroTotal) * 100)}%</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-base font-semibold text-[#1a1917]">
                計算結果に近い、1日のメニュー例
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#5c574f]">
                目安量に合わせて分量を調整した、シンプルな日本の食事です。味つけや食材の置き換えで前後します。
              </p>
              <ul className="mt-5 space-y-4">
                {menus.map((menu) => (
                  <li
                    key={menu.id}
                    className="rounded-2xl border border-[#e6e2da] bg-white p-5 sm:p-6"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-sm font-semibold text-[#1a1917]">{menu.title}</h3>
                      <p className="text-xs tabular-nums text-[#6f6a62]">
                        約{menu.kcal.toLocaleString()}kcal · P{menu.proteinG} / F{menu.fatG} / C{menu.carbG}g
                      </p>
                    </div>
                    <p className="mt-1 text-xs text-[#8a847b]">{menu.note}</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {menu.meals.map((meal) => (
                        <div key={meal.label}>
                          <p className="text-xs font-medium text-[#b8943d]">{meal.label}</p>
                          <ul className="mt-1.5 space-y-1 text-sm leading-relaxed text-[#3d3933]">
                            {meal.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs leading-relaxed text-[#8a847b]">
              この計算結果は一般的な目安であり、医学的なアドバイスではありません。持病や体調に不安がある場合は、医師や管理栄養士にご相談ください。
            </p>

            <div className="space-y-3 border-t border-[#e4e0d8] pt-8">
              <p className="text-sm leading-relaxed text-[#3d3933]">
                もっと詳しく、あなたに合ったメニューを知りたい方は
              </p>
              <a
                href={COCONALA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-xl px-5 py-3 text-sm font-semibold text-[#1a160e] transition-transform duration-200 hover:scale-[1.01]"
                style={{ backgroundColor: GOLD }}
              >
                ココナラで相談する
              </a>
              <p className="pt-4 text-sm leading-relaxed text-[#3d3933]">
                あなたの&quot;男としての現在地&quot;も気になる方は
              </p>
              <Link
                href="/"
                className="inline-flex rounded-xl border border-[#d8c79a] bg-white px-5 py-3 text-sm font-medium text-[#6d5824] transition-colors hover:border-[#b8943d]"
              >
                男磨き診断をはじめる
              </Link>
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}

function NumberField({
  label,
  suffix,
  value,
  onChange,
}: {
  label: string;
  suffix: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-[#2a2824]">{label}</span>
      <span className="mt-2 flex items-center rounded-xl border border-[#e6e2da] bg-[#fafaf8] px-3">
        <input
          inputMode="decimal"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full bg-transparent py-3 text-sm outline-none"
        />
        <span className="text-xs text-[#8a847b]">{suffix}</span>
      </span>
    </label>
  );
}

function MacroCard({
  label,
  grams,
  tone,
}: {
  label: string;
  grams: number;
  tone?: "gold";
}) {
  return (
    <div className="rounded-xl bg-[#f7f5f1] px-3 py-4 text-center">
      <p className="text-[0.7rem] text-[#6f6a62]">{label}</p>
      <p
        className="mt-1 text-xl font-semibold tabular-nums"
        style={{ color: tone === "gold" ? GOLD : "#2a2824" }}
      >
        {grams}
        <span className="ml-0.5 text-xs font-medium text-[#6f6a62]">g</span>
      </p>
    </div>
  );
}
