import { Reveal } from "@/components/Reveal";
import { DualCTA } from "@/components/DualCTA";
import { Icon } from "@/components/icons";
import { ADDITIONAL_SERVICES } from "@/lib/content";

export function AdditionalServices() {
  return (
    <section id="additional-services" className="bg-white py-14 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">More ways we help</p>
          <h2 className="t-h2 mt-3 text-[var(--color-ink)]">Other cleaning we handle.</h2>
          <p className="mt-4 text-[var(--color-muted)]">
            Beyond our three specialties, tell us what your space needs — we&apos;ll scope any of these
            into your free quote.
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 md:mt-12">
          {ADDITIONAL_SERVICES.map((svc, i) => (
            <Reveal
              as="li"
              key={svc.title}
              delay={i * 40}
              className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition-colors hover:border-[var(--color-secondary)]/50"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[var(--color-secondary)] shadow-card">
                <Icon name={svc.icon} className="h-5 w-5" strokeWidth={1.9} />
              </span>
              <div>
                <h3 className="text-[15px] font-bold text-[var(--color-ink)]">{svc.title}</h3>
                <p className="mt-0.5 text-sm leading-snug text-[var(--color-muted)]">{svc.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120} className="mt-10">
          <DualCTA align="center" />
        </Reveal>
      </div>
    </section>
  );
}
