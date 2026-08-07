import { Reveal } from "@/components/Reveal";
import { FormCard } from "@/components/FormCard";
import { Icon } from "@/components/icons";
import { FINAL_CTA, PHONE, PHONE_HREF, BRAND } from "@/lib/content";

export function FinalCta() {
  return (
    <section id="contact" className="bg-[var(--color-primary)] py-14 text-white md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <p className="eyebrow text-white/80">Free quote</p>
            <h2 className="t-h2 mt-3 text-white">{FINAL_CTA.headline}</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/85">{FINAL_CTA.body}</p>

            <div className="mt-8">
              <p className="text-sm text-white/80">Prefer to talk first?</p>
              <a
                href={PHONE_HREF}
                className="mt-2 inline-flex items-center gap-3 font-display text-3xl font-extrabold text-white transition-colors hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md md:text-4xl"
                aria-label={`Call Clear Choice at ${PHONE}`}
              >
                <Icon name="phone" className="h-7 w-7" strokeWidth={0} fill="currentColor" />
                {PHONE}
              </a>
              <p className="mt-3 text-sm text-white/80">
                {BRAND.owner}, owner · Open {BRAND.hours}
              </p>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {FINAL_CTA.trustItems.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Icon name="check" className="h-4 w-4 text-white" strokeWidth={2.6} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80}>
            <FormCard
              idPrefix="contact"
              heading="Request your free quote"
              subheading="A few details and we'll get you a clear, no-obligation quote."
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
