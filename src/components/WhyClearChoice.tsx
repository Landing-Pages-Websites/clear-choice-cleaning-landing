import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { DualCTA } from "@/components/DualCTA";
import { Icon } from "@/components/icons";
import { WHY } from "@/lib/content";

export function WhyClearChoice() {
  return (
    <section id="why-clear-choice" className="bg-white py-14 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image + pinned proof quote */}
          <Reveal className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-card-lg">
              <Image
                src={WHY.image}
                alt={WHY.imageAlt}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
            <figure className="relative -mt-10 ml-4 mr-4 rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-card md:ml-8 md:mr-10">
              <Icon name="quote" className="h-6 w-6 text-[var(--color-secondary)]" strokeWidth={2} />
              <blockquote className="mt-2 text-[15px] leading-relaxed text-[var(--color-ink)]">
                &ldquo;{WHY.proofQuote}&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-sm font-semibold text-[var(--color-muted)]">
                {WHY.proofName} · <span className="font-normal">Google review</span>
              </figcaption>
            </figure>
          </Reveal>

          {/* Differentiator copy */}
          <div>
            <Reveal>
              <p className="eyebrow">Why Clear Choice</p>
              <h2 className="t-h2 mt-3 text-[var(--color-ink)]">{WHY.headline}</h2>
              <p className="mt-4 text-[var(--color-muted)]">{WHY.lead}</p>
            </Reveal>

            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {WHY.points.map((pt, i) => (
                <Reveal as="li" key={pt.title} delay={i * 60} className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                    <Icon name={pt.icon} className="h-5 w-5" strokeWidth={2} fill={pt.icon === "phone" ? "currentColor" : "none"} />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-[var(--color-ink)]">{pt.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-[var(--color-muted)]">{pt.body}</p>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={120} className="mt-8">
              <DualCTA align="start" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
