import { CTA } from "@/lib/content";
import { Icon } from "@/components/icons";

interface DualCTAProps {
  align?: "start" | "center";
}

// Primary = the accent-red conversion button (Get My Free Quote → #contact).
export function DualCTA({ align = "center" }: DualCTAProps) {
  const justify = align === "start" ? "justify-start" : "justify-center";

  return (
    <div className={`flex flex-wrap items-center ${justify} gap-3`}>
      <a
        href={CTA.quoteAnchor}
        className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-7 py-3.5 text-base font-bold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:bg-[var(--color-accent-hover)] active:translate-y-0 active:bg-[var(--color-accent-active)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] focus-visible:ring-offset-2"
      >
        {CTA.primary}
        <Icon name="arrow" className="h-4 w-4" strokeWidth={2.4} />
      </a>
    </div>
  );
}
