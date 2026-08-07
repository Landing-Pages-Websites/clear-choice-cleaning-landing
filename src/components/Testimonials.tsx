import { Reveal } from "@/components/Reveal";
import { DualCTA } from "@/components/DualCTA";
import { Icon } from "@/components/icons";
import { TESTIMONIALS } from "@/lib/content";

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="star" className="h-4 w-4 text-[#F5A623]" strokeWidth={0} fill="currentColor" />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-white py-14 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">What clients say</p>
          <h2 className="t-h2 mt-3 text-[var(--color-ink)]">
            Rated EXCELLENT across 30 Google reviews.
          </h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <Stars />
            <span className="text-sm font-semibold text-[var(--color-muted)]">
              TrustIndex-verified · Google
            </span>
          </div>
        </Reveal>

        <div className="mt-10 columns-1 gap-5 md:mt-14 md:columns-2 lg:columns-3 [column-fill:_balance]">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 60} className="mb-5 break-inside-avoid">
              <figure className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-card">
                <Stars />
                <blockquote className="mt-3 text-[15px] leading-relaxed text-[var(--color-ink)]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-2 text-sm">
                  <span className="font-bold text-[var(--color-ink)]">{t.name}</span>
                  <span className="text-[var(--color-muted)]">· Google review</span>
                </figcaption>
              </figure>
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
