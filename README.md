# Clear Choice Home Cleaning Services — Google Ads Landing Page

A single-page, production landing page for Clear Choice Home Cleaning Services LLC,
built for a paid Google Search campaign. Next.js (App Router) + Tailwind CSS v4 +
the Mega component conventions.

## About the business

- **Business:** Clear Choice Home Cleaning Services LLC (veteran-owned, locally owned)
- **Owner:** Michael Jones
- **Location:** 5905 Atlanta Hwy Ste 101 #1243, Alpharetta, GA 30004
- **Hours:** 9am–6pm, 7 days a week
- **Phone (call-tracking):** (470) 622-8884
- **Service area:** ~40-mile radius of Atlanta — Alpharetta, Sandy Springs, Roswell,
  Johns Creek, Cumming, Milton, Suwanee, Duluth, and the surrounding metro area.
- **Priority services:** move-in/move-out, post-construction, and office cleaning.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
```

## Structure

- `src/app/layout.tsx` — fonts (Plus Jakarta Sans + Inter), metadata, Mega tag config + tracking.
- `src/app/globals.css` — brand tokens, type scale, motion, shadows.
- `src/lib/content.ts` — single source of truth for all copy, phone, form options, tracking IDs.
- `src/components/*` — section components in DOM order: Hero, TrustBar, PriorityServices,
  WhyClearChoice, RecurringSavings, AdditionalServices, HowItWorks, Testimonials,
  ServiceArea, Faq, FinalCta, plus Header, SiteFooter, FloatingCTA and the shared
  FormCard / DualCTA / Reveal / Icon primitives.
- `src/hooks/useMegaLeadForm.ts` — lead submission to the Mega analytics endpoint.

## Lead form

Fields (all posted as separate snake_case keys): `first_name`, `last_name`, `email`,
`phone`, `zip_code`, `cleaning_type`, `rate_alignment`. Submission uses a synchronous
`useRef` latch so a rapid click burst produces exactly one submission. Disqualified
leads (`rate_alignment = No`) still submit and still see a thank-you — they simply do
not fire the `qualified_lead` event.

## Content guardrails

All copy is fact-checked in `content-sources.json`. The page carries no years-in-business,
no licensing/insurance claims, no prices in copy (the sole `$130` lives on the form's
rate-alignment label), no guarantees, no invented statistics, and no careers content.

## Deployment

Deploys via the Git-linked Vercel project — push to the branch, never the
`vercel deploy --prod` CLI fallback.
