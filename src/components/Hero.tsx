"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { FormCard } from "@/components/FormCard";
import { Icon } from "@/components/icons";
import { HERO } from "@/lib/content";

export function Hero() {
  return (
    <section id="hero" className="relative isolate overflow-hidden bg-[var(--color-ink)]">
      {/* Decorative background: photo + left-weighted ink scrim (no negative z-index) */}
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <Image
          src="/images/hero-living-room.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Mobile: near-solid vertical scrim under the full-bleed copy (photo stays faintly visible). */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-ink)]/88 via-[var(--color-ink)]/84 to-[var(--color-ink)]/88 lg:hidden" />
        {/* Desktop: left-weighted scrim held at ~80-88% under the copy column, fading to 0 by the right edge. */}
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-[var(--color-ink)]/90 from-0% via-[var(--color-ink)]/80 via-42% to-transparent to-82%" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1200px] gap-6 px-4 pb-12 pt-20 md:px-8 md:pb-20 md:pt-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-6 lg:items-start">
        {/* 1 — Headline (mobile: first; desktop: left/top) */}
        <Reveal className="order-1 lg:col-start-1 lg:row-start-1">
          {/* Non-breaking hyphen keeps "Post‑Construction" on one line; wider column handles the rest. */}
          <h1 className="t-h1 text-white">{HERO.h1.replace("Post-Construction", "Post‑Construction")}</h1>
          <p className="mt-3 text-xl font-semibold text-[var(--color-secondary)] md:text-2xl">
            {HERO.homeCleaningLine}
          </p>
          <p className="mt-3 text-xl font-semibold text-[var(--color-secondary)] md:text-2xl">
            {HERO.h1Tagline}
          </p>
          <p className="mt-4 max-w-xl text-[17px] font-medium leading-relaxed text-white/90">
            {HERO.rateLine}
          </p>
        </Reveal>

        {/* 2 — Form (mobile: second, above the fold; desktop: right column) */}
        <div className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2">
          <Reveal delay={80}>
            <FormCard idPrefix="hero" />
          </Reveal>
        </div>

        {/* 3 — Supporting copy and chips (mobile: below form) */}
        <Reveal delay={140} className="order-3 lg:col-start-1 lg:row-start-2">
          <p className="max-w-xl text-[17px] leading-relaxed text-white/85">{HERO.subhead}</p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {HERO.chips.map((chip) => (
              <li
                key={chip.label}
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/20 bg-white/[0.08] px-3 py-1.5 text-[13px] font-medium text-white backdrop-blur-sm"
              >
                <Icon name={chip.icon} className="h-4 w-4 shrink-0 text-[var(--color-secondary)]" strokeWidth={2.2} />
                {chip.label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
