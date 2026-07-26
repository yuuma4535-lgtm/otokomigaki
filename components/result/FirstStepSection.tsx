"use client";

import type { FirstStepAdvice } from "@/types/diagnosis";

type FirstStepSectionProps = {
  firstStep: FirstStepAdvice;
};

export function FirstStepSection({ firstStep }: FirstStepSectionProps) {
  if (firstStep.isLegend) {
    return (
      <div className="relative w-full overflow-hidden rounded-md border-2 border-gold bg-gradient-to-br from-gold/20 via-charcoal-raised to-bordeaux-deep/40 px-6 py-12 text-center shadow-[0_24px_60px_-24px_rgba(184,148,61,0.55)] sm:px-10 sm:py-16">
        <div
          className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
          aria-hidden
        />
        <p className="text-[0.7rem] tracking-[0.32em] text-gold">
          Rank S · メンターへの指針
        </p>
        <p className="mt-4 inline-flex rounded-sm border border-gold/50 bg-gold/15 px-3 py-1 text-xs tracking-wide text-gold-soft">
          {firstStep.typeName}
        </p>
        <p className="mx-auto mt-6 max-w-lg text-sm leading-[1.85] text-muted">
          {firstStep.why}
        </p>
        <p className="mx-auto mt-6 max-w-lg font-display text-lg leading-[1.95] tracking-wide text-ivory sm:text-xl">
          {firstStep.action}
        </p>
      </div>
    );
  }

  if (firstStep.isPrototype) {
    return (
      <div className="relative w-full overflow-hidden rounded-md border-2 border-bordeaux/60 bg-gradient-to-br from-bordeaux-deep/50 via-charcoal to-charcoal-raised px-6 py-12 text-center shadow-[0_24px_60px_-24px_rgba(110,47,61,0.55)] sm:px-10 sm:py-16">
        <div
          className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-bordeaux to-transparent"
          aria-hidden
        />
        <p className="text-[0.7rem] tracking-[0.32em] text-gold-soft">
          Rank C · 始動の宣言
        </p>
        <p className="mt-4 inline-flex rounded-sm border border-bordeaux/50 bg-bordeaux/20 px-3 py-1 text-xs tracking-wide text-ivory-soft">
          {firstStep.typeName}
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-sm border border-line bg-void/40 px-3 py-1 text-xs tracking-wide text-muted">
            優先補強：{firstStep.axisName}
          </span>
          {firstStep.gradeLabel && (
            <span className="rounded-sm border border-bordeaux/40 bg-bordeaux/15 px-3 py-1 text-xs tracking-wide text-ivory-soft">
              {firstStep.gradeLabel}
            </span>
          )}
        </div>
        <p className="mx-auto mt-6 max-w-lg text-sm leading-[1.85] text-muted">
          {firstStep.why}
        </p>
        <p className="mx-auto mt-6 max-w-lg font-display text-lg leading-[1.95] tracking-wide text-ivory sm:text-xl">
          {firstStep.action}
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-md border-2 border-gold/50 bg-gradient-to-br from-charcoal-raised via-charcoal to-bordeaux-deep/40 px-6 py-11 text-center shadow-[0_20px_50px_-28px_rgba(184,148,61,0.45)] sm:px-10 sm:py-14">
      <div
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent"
        aria-hidden
      />
      <p className="text-[0.7rem] tracking-[0.3em] text-gold">
        今のあなたに必要な最初の一歩
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <span className="rounded-sm border border-gold/35 bg-gold/10 px-3 py-1 text-xs tracking-wide text-gold-soft">
          {firstStep.typeName}
        </span>
        <span className="rounded-sm border border-line bg-void/40 px-3 py-1 text-xs tracking-wide text-muted">
          優先補強：{firstStep.axisName}
        </span>
        {firstStep.gradeLabel && (
          <span className="rounded-sm border border-bordeaux/40 bg-bordeaux/15 px-3 py-1 text-xs tracking-wide text-ivory-soft">
            {firstStep.gradeLabel}
          </span>
        )}
      </div>
      <p className="mx-auto mt-6 max-w-lg text-sm leading-[1.85] text-muted">
        {firstStep.why}
      </p>
      <p className="mx-auto mt-5 max-w-lg font-display text-base leading-[1.95] tracking-wide text-ivory sm:text-xl">
        {firstStep.action}
      </p>
    </div>
  );
}
