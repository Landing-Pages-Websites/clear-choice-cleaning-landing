import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { DualCTA } from "@/components/DualCTA";
import { Icon } from "@/components/icons";
import { SERVICE_AREA } from "@/lib/content";

export function ServiceArea() {
  return (
    <section id="service-area" className="bg-[var(--color-surface)] py-14 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow">Where we clean</p>
            <h2 className="t-h2 mt-3 text-[var(--color-ink)]">
              Serving metro Atlanta, within about 40 miles.
            </h2>
            <p className="mt-4 text-[var(--color-muted)]">
              Based in Alpharetta and covering the communities around it. We regularly clean in:
            </p>

            <ul className="mt-6 flex flex-wrap gap-2.5">
              {SERVICE_AREA.cities.map((city) => (
                <li
                  key={city}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-white px-3.5 py-1.5 text-sm font-semibold text-[var(--color-ink)]"
                >
                  <Icon name="pin" className="h-4 w-4 text-[var(--color-secondary)]" strokeWidth={2} />
                  {city}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[15px] text-[var(--color-muted)]">
              …and the surrounding metro Atlanta area.
            </p>

            <Reveal delay={120} className="mt-8">
              <DualCTA align="start" />
            </Reveal>
          </Reveal>

          <Reveal delay={80}>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-2xl shadow-card">
                <Image
                  src={SERVICE_AREA.gallery[0].src}
                  alt={SERVICE_AREA.gallery[0].alt}
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                />
              </div>
              {SERVICE_AREA.gallery.slice(1).map((img) => (
                <div key={img.src} className="relative aspect-square overflow-hidden rounded-2xl shadow-card">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 275px, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
