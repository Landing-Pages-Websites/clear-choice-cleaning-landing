import { Reveal } from "@/components/Reveal";
import { DualCTA } from "@/components/DualCTA";
import { Icon } from "@/components/icons";
import { FAQ } from "@/lib/content";

export function Faq() {
  return (
    <section id="faq" className="bg-white py-14 md:py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <Reveal className="text-center">
          <p className="eyebrow">Before you book</p>
          <h2 className="t-h2 mt-3 text-[var(--color-ink)]">Questions clients ask us.</h2>
        </Reveal>

        <div className="mt-10 space-y-3 md:mt-12">
          {FAQ.map((item, i) => (
            <Reveal key={item.q} delay={i * 40}>
              <details className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-colors open:border-[var(--color-primary)] open:bg-white open:shadow-card">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 md:p-6 [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] rounded-2xl">
                  <span className="text-base font-bold leading-snug text-[var(--color-ink)] md:text-lg">
                    {item.q}
                  </span>
                  <Icon
                    name="plus"
                    className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-primary)] transition-transform duration-200 group-open:rotate-45"
                    strokeWidth={2.2}
                  />
                </summary>
                <p className="px-5 pb-6 text-[15px] leading-relaxed text-[var(--color-muted)] md:px-6">
                  {item.a}
                </p>
              </details>
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
