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

The six required visitor fields, in order, are `first_name`, `last_name`, `email`,
`phone`, `zip_code`, and `cleaning_type`, posted as separate snake_case keys.
Submission uses a synchronous `useRef` latch so a rapid click burst produces exactly
one submission. Per the client-directed Nov 19, 2026 edit (Atlas task
8d4a3dc3-c751-4c16-9eac-3db6df4914a3), the former `rate_alignment` question and
submitted key are removed. Every server-confirmed submission carries `qualified:true`
and fires the existing `form_submit` and `qualified_lead` signals in their unchanged
MegaTag-then-dataLayer order. The out-of-area ZIP guard remains unchanged. Downstream
qualification/routing compatibility is handled separately, not in this LP edit.

Form integrity (same task, QA attempt 1 rework; director ruling
61586b7f-d52a-5030-b620-ffc2d9d44e04, QA 144f929b-32da-44b2-ae4e-c0c0e4931f41):

- `src/lib/fields.ts` is a byte-identical copy of `lp-starter` `src/lib/fields.ts` at
  `e8e8d9b5c8cd4be6d65818a914c33edecdbeed69` (SHA-256
  `d25400ba6ee08423f81f50a3dda98d6bd8d110952edfd99f0618799aeeedfe89`). Never edit it here;
  both the form (`src/lib/quoteForm.ts` `validateFields`) and `useMegaLeadForm.submit()` use it.
- Both forms are `noValidate` with a `type="button"` submit: validate first, apply the ZIP
  guard, then send directly. Enter is stopped on `keydown` and routed through the same gate.
  The page never calls `requestSubmit()` or raises a native submit, so the optimizer's
  capture listener does not emit its own pre-response `form_submit`.
- After `ok:true` only: MegaTag `form_submit` (adds `elementId` = `hero-quote-form` /
  `contact-quote-form` and `formData` = the six normalized fields), dataLayer `form_submit`,
  MegaTag `qualified_lead`, dataLayer `qualified_lead`. The last three keep only
  `form_route`/`qualified`. Each call is isolated so a tag error can never undo the
  thank-you or trigger a resend.

## Content guardrails

Copy provenance is recorded in `content-sources.json`. The page carries no years-in-business,
no licensing/insurance claims, no guarantees, no invented statistics, and no careers content.
The existing hero starting-rate sentence is preserved by the Nov 19 task above; the
former form question is absent. The live CCP's older pricing restriction remains an
inherited conflict outside this surgical edit, not permission to add other prices.

## Deployment

Deploys via the Git-linked Vercel project — push to the branch, never the
`vercel deploy --prod` CLI fallback.
