import Image from "next/image";
import Link from "next/link";
import { CTA, PHONE, PHONE_HREF, NAV_LINKS } from "@/lib/content";
import { Icon } from "@/components/icons";

// Solid white from scroll 0 with a 1px hairline — never transparent over the
// hero photo, so the logo and buttons stay legible at all times.
export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[var(--color-border)] bg-white">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-4 py-2.5 md:px-8 md:py-3">
        <Link
          href="#hero"
          className="flex shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]"
          aria-label="Clear Choice Home Cleaning Services — home"
        >
          <Image
            src="/logo.png"
            alt="Clear Choice Home Cleaning Services"
            width={569}
            height={96}
            priority
            className="h-8 w-auto max-w-[190px] object-contain md:h-10 md:max-w-none"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-[var(--color-ink)] transition-colors hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-1.5 rounded-xl border-[1.5px] border-[var(--color-primary)] px-2.5 py-2 text-[13px] font-bold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] md:px-4 md:text-sm"
            aria-label={`Call Clear Choice at ${PHONE}`}
          >
            <Icon name="phone" className="h-4 w-4 shrink-0" strokeWidth={0} fill="currentColor" />
            <span className="whitespace-nowrap">{PHONE}</span>
          </a>
          <a
            href={CTA.quoteAnchor}
            className="hidden items-center gap-2 rounded-xl bg-[var(--color-accent)] px-5 py-2.5 text-sm font-bold text-white shadow-cta transition-colors hover:bg-[var(--color-accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] focus-visible:ring-offset-2 sm:inline-flex"
          >
            {CTA.primary}
            <Icon name="arrow" className="h-3.5 w-3.5" strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </header>
  );
}
