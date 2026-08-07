import { Reveal } from "@/components/Reveal";
import { DualCTA } from "@/components/DualCTA";
import { RECURRING } from "@/lib/content";

export function RecurringSavings() {
  return (
    <section id="recurring-savings" className="bg-[var(--color-surface)] py-14 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Recurring-service savings</p>
          <h2 className="t-h2 mt-3 text-[var(--color-ink)]">{RECURRING.headline}</h2>
          <p className="mt-4 text-[var(--color-muted)]">{RECURRING.body}</p>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:mt-14 md:grid-cols-3">
          {RECURRING.tiers.map((tier, i) => (
            <Reveal key={tier.cadence} delay={i * 60} className="h-full">
              <div className="flex h-full flex-col items-center rounded-2xl border border-[var(--color-border)] bg-white p-8 text-center shadow-card">
                <p className="font-display text-6xl font-extrabold leading-none tracking-tight text-[var(--color-accent)]">
                  {tier.pct}
                </p>
                <p className="mt-3 text-base font-bold text-[var(--color-ink)]">{tier.cadence}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-muted)]">{tier.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-10">
          <DualCTA align="center" />
        </Reveal>
      </div>
    </section>
  );
}
