import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/icons";
import { CTA, PHONE, PHONE_HREF, PRIORITY_SERVICES } from "@/lib/content";

export function PriorityServices() {
  return (
    <section id="services" className="bg-[var(--color-surface)] py-14 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">What we do best</p>
          <h2 className="t-h2 mt-3 text-[var(--color-ink)]">
            The three cleans metro Atlanta calls us for.
          </h2>
          <p className="mt-4 text-[var(--color-muted)]">
            Whichever you need, the crew arrives with every supply and tool — and Michael
            confirms it&apos;s done right before they leave.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:mt-14 lg:grid-cols-3">
          {PRIORITY_SERVICES.map((svc, i) => (
            <Reveal key={svc.id} delay={i * 60} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-card transition-transform duration-200 hover:-translate-y-1">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={svc.image}
                    alt={svc.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 380px, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/95 text-[var(--color-primary)] shadow-card">
                    <Icon name={svc.icon} className="h-6 w-6" strokeWidth={1.9} />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="t-h3 text-[var(--color-ink)]">{svc.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-muted)]">
                    {svc.body}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {svc.inclusions.map((inc) => (
                      <li key={inc} className="flex items-start gap-2.5 text-[15px] text-[var(--color-ink)]">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                          <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {inc}
                      </li>
                    ))}
                  </ul>

                  {/* Dual-CTA row pinned to the card bottom */}
                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
                    <a
                      href={CTA.quoteAnchor}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-bold text-white shadow-cta transition-colors hover:bg-[var(--color-accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] focus-visible:ring-offset-2"
                    >
                      {CTA.primary}
                    </a>
                    <a
                      href={PHONE_HREF}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border-[1.5px] border-[var(--color-primary)] px-4 py-2.5 text-sm font-bold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]"
                      aria-label={`Call Clear Choice at ${PHONE}`}
                    >
                      <Icon name="phone" className="h-4 w-4" strokeWidth={0} fill="currentColor" />
                      Call
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
