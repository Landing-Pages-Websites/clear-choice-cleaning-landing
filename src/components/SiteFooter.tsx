import Image from "next/image";
import { BRAND, CURRENT_YEAR } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)]">
      <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-8">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div>
            <Image
              src="/logo.png"
              alt="Clear Choice Home Cleaning Services"
              width={569}
              height={96}
              className="h-10 w-auto object-contain"
            />
            <p className="mt-4 max-w-sm font-display text-lg font-bold text-[var(--color-ink)]">
              {BRAND.tagline}
            </p>
          </div>

          <address className="not-italic text-[15px] leading-relaxed md:text-right">
            <p className="font-semibold text-[var(--color-ink)]">{BRAND.company}</p>
            <p className="mt-1">{BRAND.address}</p>
            <p className="mt-1">Open {BRAND.hours}</p>
            <p className="mt-1">
              <a href={BRAND.emailHref} className="transition-colors hover:text-[var(--color-ink)]">
                {BRAND.email}
              </a>
            </p>
          </address>
        </div>

        <div className="mt-10 border-t border-[var(--color-border)] pt-6 text-[13px]">
          <p>
            © {CURRENT_YEAR} {BRAND.company}. All rights reserved. Veteran-owned and locally owned in
            Alpharetta, GA.
          </p>
          <p className="mt-3 font-semibold">
            <a
              href="/privacy-policy"
              className="text-[var(--color-primary)] underline underline-offset-4 hover:text-[var(--color-primary-hover)]"
            >
              Privacy Policy
            </a>
            {" · "}
            <a
              href="/terms-and-conditions"
              className="text-[var(--color-primary)] underline underline-offset-4 hover:text-[var(--color-primary-hover)]"
            >
              Terms &amp; Conditions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
