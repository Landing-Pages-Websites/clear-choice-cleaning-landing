import type { Metadata } from "next";
import Script from "next/script";
import { preload } from "react-dom";
import "./fonts.css";
import "./globals.css";

// Self-hosted fonts (see fonts.css): the classes set --font-display-active /
// --font-body-active, and the Latin subsets are preloaded as next/font did.
const FONT_VARIABLE_CLASSES =
  "plus_jakarta_sans_e3fd564a-module__xYzUtq__variable inter_d5f8f0da-module__ISg8pG__variable";
const PRELOADED_FONTS = [
  "/fonts/inter-latin.woff2",
  "/fonts/plus-jakarta-sans-latin.woff2",
];

// === MEGA TAG CONFIG === (Clear Choice — client declined Meta, so NO pixelId)
const SITE_KEY = "o919lqt9cidpi082";
const SITE_ID = "033b2c33-c1ce-4962-969f-f81533113c12";
const GTM_ID = "GTM-5SKCDNMX";

export const metadata: Metadata = {
  metadataBase: new URL("https://book.clearchoicehomecleaningservices.com"),
  title:
    "Move-Out, Post-Construction & Office Cleaning in Metro Atlanta | Clear Choice Home Cleaning",
  description:
    "Clear Choice Home Cleaning Services — a veteran-owned, locally owned Alpharetta crew handling move-out, post-construction and office cleaning across metro Atlanta. All supplies included, eco-friendly products, free no-obligation quotes. Rated EXCELLENT across 30 five-star Google reviews.",
  openGraph: {
    title:
      "Clear Choice Home Cleaning — Move-Out, Post-Construction & Office Cleaning in Metro Atlanta",
    description:
      "Veteran-owned, locally owned Alpharetta cleaning crew. All supplies included, eco-friendly products, free no-obligation quotes. We don't cut corners. We clean them.",
    images: ["/images/hero-living-room.jpg"],
    type: "website",
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  robots: { index: false, follow: false }, // paid LP — not indexed
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const megaTagConfig = `window.MEGA_TAG_CONFIG={siteKey:"${SITE_KEY}",siteId:"${SITE_ID}",gtmId:"${GTM_ID}"};window.API_ENDPOINT="https://optimizer.gomega.ai";window.TRACKING_API_ENDPOINT="https://events-api.gomega.ai";`;

  for (const href of PRELOADED_FONTS) {
    preload(href, { as: "font", type: "font/woff2", crossOrigin: "" });
  }

  return (
    <html lang="en" className={FONT_VARIABLE_CLASSES}>
      <head>
        <meta name="mega-site-id" content={SITE_ID} />
        <script
          id="mega-tag-config"
          dangerouslySetInnerHTML={{ __html: megaTagConfig }}
        />
        <script
          id="optimizer-script"
          src="https://cdn.gomega.ai/scripts/optimizer.min.js"
          data-site-id={SITE_ID}
          async
        />
      </head>
      <body className="bg-[var(--color-bg)] text-[var(--color-text)] antialiased">
        {children}
        {/* CallTrackingMetrics — universal Mega account (never remove) */}
        <Script src="https://572388.tctm.co/t.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
