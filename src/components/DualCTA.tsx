import { CTA, PHONE, PHONE_HREF } from "@/lib/content";
import { Icon } from "@/components/icons";

interface DualCTAProps {
  align?: "start" | "center";
  /** Use on the deep-teal contact band — switches the phone link to light-on-dark. */
  onDark?: boolean;
}

// Primary = the accent-red conversion button (Get My Free Quote → #contact).
// Secondary = tap-to-call. Reused across sections so every band has a CTA.
export function DualCTA({ align = "center", onDark = false }: DualCTAProps) {
  const justify = align === "start" ? "justify-start" : "justify-center";
  const phoneClasses = onDark
    ? "border-white/40 text-white hover:bg-white/10 hover:border-white"
    : "border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-surface)]";

  return (
    <div className={`flex flex-wrap items-center ${justify} gap-3`}>
      <a
        href={CTA.quoteAnchor}
        className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-7 py-3.5 text-base font-bold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:bg-[var(--color-accent-hover)] active:translate-y-0 active:bg-[var(--color-accent-active)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] focus-visible:ring-offset-2"
      >
        {CTA.primary}
        <Icon name="arrow" className="h-4 w-4" strokeWidth={2.4} />
      </a>
      <a
        href={PHONE_HREF}
        className={`inline-flex items-center gap-2 rounded-xl border-[1.5px] px-6 py-3.5 text-base font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] ${phoneClasses}`}
        aria-label={`Call Clear Choice at ${PHONE}`}
      >
        <Icon name="phone" className="h-4 w-4" strokeWidth={0} fill="currentColor" />
        {CTA.phone}
      </a>
    </div>
  );
}
