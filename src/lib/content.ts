// Site-wide content + config for Clear Choice Home Cleaning Services — Google Ads LP.
// Single source of truth for copy, phone, form options, and tracking IDs.
// All copy is constrained by the authoritative facts + content bans in the build
// brief: no years-in-business, no credential claims, no prices in copy, no
// warranty language, no invented statistics.

export const PHONE = "(470) 622-8884";
export const PHONE_HREF = "tel:4706228884";

// The single conversion anchor every "get a quote" CTA points at.
export const QUOTE_ANCHOR = "#contact";

export const CTA = {
  primary: "Get My Free Quote",
  phone: "Call (470) 622-8884",
  quoteAnchor: QUOTE_ANCHOR,
};

export const BRAND = {
  company: "Clear Choice Home Cleaning Services LLC",
  shortName: "Clear Choice Home Cleaning",
  owner: "Michael Jones",
  tagline: "We don't cut corners. We clean them.",
  address: "5905 Atlanta Hwy Ste 101 #1243, Alpharetta, GA 30004",
  hours: "9am–6pm, 7 days a week",
  email: "michael@clearchoicehomecleaningservices.com",
  emailHref: "mailto:michael@clearchoicehomecleaningservices.com",
  zip: "30004",
};

export const CURRENT_YEAR = new Date().getFullYear();

// ─── Hero ───
export const HERO = {
  chips: [
    { icon: "shield", label: "Veteran-owned" },
    { icon: "pin", label: "Locally owned" },
    { icon: "star", label: "30 five-star Google reviews" },
    { icon: "spray", label: "Supplies included" },
  ],
  h1: "Move-Out, Post-Construction & Office Cleaning Across Metro Atlanta",
  homeCleaningLine: "House & Deep Cleaning in Metro Atlanta",
  h1Tagline: "We don't cut corners. We clean them.",
  rateLine:
    "Professional cleaning rates start at $130. Request a clear, no-obligation cleaning quote.",
  subhead:
    "A veteran-owned, locally owned Alpharetta crew that brings all the supplies and equipment. Free, no-obligation quotes on the space you need cleaned.",
};

// ─── Trust bar ───
export const TRUST_ITEMS = [
  { icon: "shield", label: "Veteran-Owned" },
  { icon: "pin", label: "Locally Owned in Alpharetta" },
  { icon: "star", label: "30 Five-Star Google Reviews" },
  { icon: "spray", label: "All Supplies Included" },
  { icon: "leaf", label: "Eco-Friendly Products" },
];

// ─── Priority services (the three money ad groups) ───
export const PRIORITY_SERVICES = [
  {
    id: "move-out",
    icon: "boxes",
    title: "Move-In / Move-Out Cleaning",
    image: "/images/service-move-out.jpg",
    imageAlt:
      "Freshly cleaned hardwood floor in an emptied room, ready for the final walkthrough.",
    body: "For renters, homeowners, landlords, property managers and realtors who need a space handed over spotless. We schedule around your key handoff, lease end and final walkthrough so the place is ready the moment it needs to be. Every job covers kitchen surfaces, full bathroom cleaning and sanitizing, dusting of open surfaces, vacuuming carpets and rugs, mopping hard floors, entry areas, bedrooms and living areas, and trash removal from the areas we clean — the details a walkthrough actually checks.",
    inclusions: [
      "Kitchen surfaces + bathroom cleaning and sanitizing",
      "Carpets and rugs vacuumed, hard floors mopped",
      "Entry, bedroom and living areas dusted; trash removed",
    ],
  },
  {
    id: "post-construction",
    icon: "hardhat",
    title: "Post-Construction Cleaning",
    image: "/images/service-post-construction.jpg",
    imageAlt:
      "A tiled interior being cleared and cleaned after construction work, with materials boxed up.",
    body: "For builders, general contractors, remodels and repairs — the fine dust a build leaves behind on every surface. We handle dust removal from open surfaces, window sill and ledge dusting, wiping cabinet exteriors, vacuuming and mopping floors, kitchen and counter cleaning, bathroom cleaning and sanitizing, trash removal, and final surface touch-ups before the space is shown or handed back. We work on both residential and commercial projects and schedule around your contractor timeline.",
    inclusions: [
      "Dust removal from open surfaces, sills, ledges and cabinets",
      "Floors vacuumed and mopped; kitchen and counters cleaned",
      "Bathrooms sanitized, trash removed, final touch-ups",
    ],
  },
  {
    id: "office",
    icon: "briefcase",
    title: "Office & Workspace Cleaning",
    image: "/images/service-office.jpg",
    imageAlt:
      "A bright, tidy office with a conference table, seating area and clean floors.",
    body: "For offices, workspaces and small businesses that want to open to a clean space. We cover desk and surface cleaning, breakroom and kitchen areas, restroom cleaning and sanitizing, vacuuming, mopping, entry and waiting areas, high-touch surface wiping, and trash removal. Scheduling is yours to set — daily, weekly, biweekly, monthly, one-time or a custom rhythm that fits how your team actually uses the space.",
    inclusions: [
      "Desks, surfaces and high-touch points wiped",
      "Breakroom, kitchen and restrooms cleaned and sanitized",
      "Entry and waiting areas vacuumed, mopped, trash removed",
    ],
  },
  {
    id: "home-cleaning",
    icon: "home",
    title: "Home Cleaning",
    image: "/images/home-cleaning.jpg",
    imageAlt: "A clean residential living room after home cleaning service.",
    body: "Standard, deep, recurring and single-visit home cleaning across the 40-mile Atlanta service area. Request a clear quote.",
    inclusions: [],
  },
];

// ─── Why Clear Choice ───
export const WHY = {
  headline: "The owner calls before the crew leaves.",
  lead: "Michael Jones personally checks in — usually before the crew is even out the door — to make sure you're happy with the work. You talk to him directly, not a call center.",
  proofQuote:
    "Mr. Jones called approximately 15 minutes before the cleaners left to make sure I was satisfied. I highly recommend! This is TOP-NOTCH cleaning service with EXCEPTIONAL customer service!",
  proofName: "Cynthia Brown-McNeill",
  image: "/images/crew-at-work.jpg",
  imageAlt:
    "The Clear Choice cleaning crew in branded aprons cleaning a workspace with professional equipment.",
  points: [
    {
      icon: "phone",
      title: "Talk to Michael directly",
      body: "Questions, scheduling, a change of plans — you reach the owner, not a phone tree.",
    },
    {
      icon: "spray",
      title: "We bring everything",
      body: "The crew arrives with all the cleaning supplies and equipment. You don't provide a thing.",
    },
    {
      icon: "leaf",
      title: "Eco-friendly products",
      body: "We clean with eco-friendly products throughout the home or workspace.",
    },
    {
      icon: "calendar",
      title: "Scheduling that flexes",
      body: "We work around your move dates and contractor timelines instead of a rigid slot.",
    },
  ],
};

// ─── Recurring savings ───
export const RECURRING = {
  headline: "Cleaning on a schedule? Keep more of your money.",
  body: "Set up recurring service and the savings come off every visit — just mention it when you get your quote. No countdowns, no gimmicks.",
  tiers: [
    { pct: "20%", cadence: "off weekly service", note: "The most you save — a spotless space, every week." },
    { pct: "10%", cadence: "off biweekly service", note: "Every other week keeps things consistently clean." },
    { pct: "5%", cadence: "off monthly service", note: "A monthly reset for the whole space." },
  ],
};

// ─── Additional services (lighter row) ───
export const ADDITIONAL_SERVICES = [
  { icon: "sparkle", title: "Standard Cleaning", body: "The regular refresh — surfaces, floors, kitchen and bathrooms kept in good shape." },
  { icon: "spray", title: "Deep Cleaning", body: "A top-to-bottom clean that gets into the built-up spots a standard visit skips." },
  { icon: "refresh", title: "Recurring Cleaning", body: "A standing schedule that fits your week, with savings for weekly, biweekly or monthly." },
  { icon: "clock", title: "One-Time Cleaning", body: "A single visit for an event, a guest, or a space that just needs a reset." },
  { icon: "building", title: "Apartment Cleaning", body: "Right-sized cleaning for apartments and smaller units, common areas included." },
  { icon: "home", title: "Real Estate / Listing Cleaning", body: "Get a listing or property show-ready before photos, showings or handover." },
  { icon: "boxes", title: "Moving-Related Cleaning", body: "Cleaning timed to your move so the old or new place is ready on schedule." },
];

// ─── How it works ───
export const HOW_IT_WORKS = {
  image: "/images/crew-office-door.jpg",
  imageAlt:
    "A Clear Choice team member arriving at a doorway with cleaning equipment, ready to start.",
  steps: [
    { icon: "chat", title: "Tell us the space and your date", body: "Share what needs cleaning and when — a move, a build, or an office rhythm." },
    { icon: "receipt", title: "Get a free, no-obligation quote", body: "We scope the job and send a clear quote. No pressure, no obligation." },
    { icon: "truck", title: "Our crew arrives with everything", body: "The team shows up with all supplies and equipment and gets to work." },
    { icon: "check", title: "Michael confirms you're satisfied", body: "The owner checks in before the crew leaves to make sure it's done right." },
  ],
};

// ─── Testimonials (verbatim Google reviews — never paraphrased) ───
export const TESTIMONIALS = [
  {
    name: "Pamela Cathey",
    quote:
      "Within less than a year of occupancy, my rental property was left in an appalling condition by the tenants. The level of filth was unlike anything I've ever encountered… Fortunately, Clear Choice Home Cleaning Services delivered outstanding results. They restored the property to its original condition with exceptional care and efficiency. I highly recommend their services.",
  },
  {
    name: "Patrick Morgan (Captain)",
    quote:
      "I called on a Sunday, House was cleaned on Monday. Fantastic Job, they cleaned everything!",
  },
  {
    name: "Cynthia Brown-McNeill",
    quote:
      "I found mr. Jones on Google, I called and the next day, which was today, the cleaners came out, and when I tell you, my home is spotless, oh my God. To Top all of this off, Mr. Jones called approximately 15 minutes before the cleaners left to make sure I was satisfied. I highly recommend! This is TOP-NOTCH cleaning service with EXCEPTIONAL customer service!",
  },
  {
    name: "Elsiemae Simmons",
    quote:
      "I needed some deep cleaning done in my home… I'm a very particular person when it comes to cleaning and has always been skeptical when having outsiders come in and clean for me. When Christina and Sylvia arrived they did a walk through with me and were clear as to what I needed done. They did a fabulous job and I was extremely pleased with their service.",
  },
  {
    name: "Alonzo Foster",
    quote:
      "Clear Choice Home Cleaning Services exceeded my expectations! The team was professional, punctual, and paid great attention to detail. Every room looked spotless and smelled fresh — they truly went above and beyond. Communication was excellent, and they made sure I was completely satisfied before leaving.",
  },
];

// ─── Service area ───
export const SERVICE_AREA = {
  cities: [
    "Alpharetta",
    "Sandy Springs",
    "Roswell",
    "Johns Creek",
    "Cumming",
    "Milton",
    "Suwanee",
    "Duluth",
  ],
  gallery: [
    { src: "/images/kitchen-clean.jpg", alt: "A clean, tidy residential kitchen after service." },
    { src: "/images/bathroom-clean.jpg", alt: "A sanitized, spotless bathroom after service." },
    { src: "/images/kitchen-appliance.jpg", alt: "A wiped-down kitchen appliance and clean counter surface." },
  ],
};

// ─── FAQ (native details/summary) ───
export const FAQ = [
  {
    q: "What's included in a clean?",
    a: "It depends on the space and the type of clean, but a typical visit covers kitchen surfaces, bathroom cleaning and sanitizing, dusting of open surfaces, vacuuming carpets and rugs, mopping hard floors, entry, bedroom and living areas, and trash removal from the areas we clean. When you request a quote we'll confirm exactly what's covered for your space.",
  },
  {
    q: "Do I need to provide any supplies?",
    a: "No. Our crew brings all the cleaning supplies and equipment needed for the job, so there's nothing for you to buy or set out ahead of time.",
  },
  {
    q: "Can you work around my move or closing date?",
    a: "Yes. Move-in/move-out and post-construction jobs are timed around your key handoff, lease end, final walkthrough or contractor schedule. Tell us your date when you request a quote and we'll build the visit around it.",
  },
  {
    q: "Are your products safe around pets and kids?",
    a: "We clean with eco-friendly products throughout. If anyone in the home has specific sensitivities, let us know when you request your quote and we'll take that into account.",
  },
  {
    q: "How does pricing work?",
    a: "Every job is quoted individually based on the space and the type of clean you need. The quote is free and comes with no obligation — you'll know what the job costs before anything is scheduled.",
  },
  {
    q: "What areas do you serve?",
    a: "We serve Alpharetta, Sandy Springs, Roswell, Johns Creek, Cumming, Milton, Suwanee, Duluth and the surrounding metro Atlanta area. Not sure if you're in range? Ask when you request a quote.",
  },
  {
    q: "How soon can you schedule?",
    a: "Scheduling flexes around your date. We're open 9am–6pm, 7 days a week, and weekend and month-end slots tend to fill first — so if your move or closing has a hard date, it helps to reach out early.",
  },
];

// ─── Final CTA / contact ───
export const FINAL_CTA = {
  headline: "Get your free, no-obligation cleaning quote.",
  body: "Tell us the space and your date and we'll send a clear quote — no pressure, no obligation. Prefer to talk it through? Call and you'll reach Michael directly.",
  trustLine: "Veteran-owned · Locally owned · 30 five-star Google reviews",
  trustItems: ["Veteran-owned", "Locally owned", "30 five-star Google reviews"],
};

// ─── Header nav anchors (desktop, up to 5) ───
export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-clear-choice" },
  { label: "Savings", href: "#recurring-savings" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Service Area", href: "#service-area" },
];

// ─── Form select options ───
// All cleaning_type options qualify — they route/contextualize the lead only.
export const CLEANING_TYPES = [
  "Standard cleaning",
  "Deep cleaning",
  "Move-in/move-out cleaning",
  "Post-construction cleaning",
  "Office cleaning",
  "Recurring cleaning",
  "One-time cleaning",
];

// The rate-alignment qualifier — the sole place a price figure appears on the page.
export const RATE_QUESTION_LABEL =
  "Are you comfortable with professional cleaning rates starting at $130?";
export const RATE_OPTIONS = ["Yes", "No"];

// ─── Mega tracking — Clear Choice IDs. NO Meta Pixel (client declined Meta). ───
export const TRACKING = {
  siteKey: "o919lqt9cidpi082",
  siteId: "033b2c33-c1ce-4962-969f-f81533113c12",
  gtmId: "GTM-5SKCDNMX",
};

// Mega submission API expects snake_case keys: customer_id, site_id, source_provider
export const FORM = {
  customerId: "8155b611-55c6-4d4b-9766-d094b6a3c291",
  siteId: "033b2c33-c1ce-4962-969f-f81533113c12",
  sourceProvider: "clear-choice-cleaning-landing",
  // snake_case mirrors for documentation + lint visibility:
  customer_id: "8155b611-55c6-4d4b-9766-d094b6a3c291",
  site_id: "033b2c33-c1ce-4962-969f-f81533113c12",
};
