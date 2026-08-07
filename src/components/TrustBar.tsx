import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/icons";
import { CTA, TRUST_ITEMS } from "@/lib/content";

export function TrustBar() {
  return (
    <section id="trust" className="border-b border-[var(--color-border)] bg-white py-8 md:py-10">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-5 md:gap-6">
          {TRUST_ITEMS.map((item, i) => (
            <Reveal
              as="li"
              key={item.label}
              delay={i * 60}
              className="flex items-center gap-2.5 md:flex-col md:gap-2 md:text-center"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-surface)] text-[var(--color-primary)]">
                <Icon name={item.icon} className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="text-sm font-semibold leading-tight text-[var(--color-ink)]">
                {item.label}
              </span>
            </Reveal>
          ))}
        </ul>

        <div className="mt-7 text-center">
          <a
            href={CTA.quoteAnchor}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] rounded"
          >
            {CTA.primary}
            <Icon name="arrow" className="h-4 w-4" strokeWidth={2.4} />
          </a>
        </div>
      </div>
    </section>
  );
}
