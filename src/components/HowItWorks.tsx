import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { DualCTA } from "@/components/DualCTA";
import { Icon } from "@/components/icons";
import { HOW_IT_WORKS } from "@/lib/content";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[var(--color-surface)] py-14 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <p className="eyebrow">How it works</p>
            <h2 className="t-h2 mt-3 text-[var(--color-ink)]">Four steps to a spotless space.</h2>

            <ol className="mt-8 space-y-6">
              {HOW_IT_WORKS.steps.map((step, i) => (
                <Reveal as="li" key={step.title} delay={i * 60} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)] text-base font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="flex items-center gap-2 text-base font-bold text-[var(--color-ink)]">
                      <Icon name={step.icon} className="h-4 w-4 text-[var(--color-secondary)]" strokeWidth={2} />
                      {step.title}
                    </h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-[var(--color-muted)]">{step.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={120} className="mt-9">
              <DualCTA align="start" />
            </Reveal>
          </Reveal>

          <Reveal delay={80} className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-card-lg">
              <Image
                src={HOW_IT_WORKS.image}
                alt={HOW_IT_WORKS.imageAlt}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
