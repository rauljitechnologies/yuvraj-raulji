/**
 * Homepage content, imported from the Claude Design canvas
 * "Yuvraj Raulji - Homepage.dc.html" (project 76be536d).
 *
 * The mockup carried its data in a `renderVals()` block on the canvas runtime.
 * That runtime does not exist here, so the same values live as typed constants
 * and the sections read them at module scope. Nothing here is fetched, so every
 * section stays a server component and the whole page prerenders to static HTML.
 *
 * Copy note: the mockup's prose used em-dashes throughout. They are replaced
 * here with commas, colons and full stops, per the standing rule that site copy
 * carries no em-dashes.
 */

import { CONTACT as SITE_CONTACT } from './site';

/** Portrait used by a section. Kept here so swapping a file is a one-line edit. */
export const PORTRAITS = {
  /**
   * Background-removed cutouts, not the raw studio files.
   *
   * The two source photographs are shot on pure white. Every slot that uses
   * them sits on either the near-black ground or the accent band, and the hero
   * plate additionally lays a dark gradient over the image, so a white backdrop
   * rendered as a lit rectangle punched into the page: exactly what the
   * `--veil-*` tokens exist to prevent.
   *
   * The canvas ships its own `yr-hero.png` and `yr-quote.png`, which are
   * already cut out, but both exceed the 256 KiB read cap on the design API and
   * come back truncated with no IEND chunk. These are the equivalent, derived
   * from the two JPEGs that are in the repo. The masters stay beside them.
   *
   * Opaque, not alpha. The hero plate stacks a red rectangle behind the photo
   * and offsets it down-right by 34px so it reads as a sliver down two edges;
   * a transparent backdrop lets that red flood the whole panel instead. So the
   * subject is cut out and then given a dark studio sweep of its own, which is
   * what the plate wants: a photo panel, on a page that is already near-black.
   */
  hero: '/assets/home/yr-hero.webp',
  /**
   * The same cutout at 700px, for phones.
   *
   * The hero plate is at most 400px wide under `lg`, so a 1200px source is
   * three times the pixels a phone can show and it is the page's LCP element.
   * The two are offered as a srcset rather than swapped, so a desktop still
   * gets the full-resolution file.
   */
  heroSmall: '/assets/home/yr-hero-700.webp',
  about: '/assets/home/yr-hero.webp',
  quote: '/assets/home/yr-quote.webp',
} as const;

export const CONTACT = {
  /*
   * Derived from lib/site.ts rather than typed again. This module carried its
   * own literal, hello@yuvrajraulji.com, while every other part of the site
   * printed the address in lib/site.ts, so the homepage and the interior pages
   * named a different mailbox for the same person, and one of them was not a
   * mailbox at all. Deriving it is what stops the two drifting apart again. The
   * phone and timezone fields stay local because lib/site.ts holds those in a
   * different shape.
   */
  email: SITE_CONTACT.email,
  phone: '+91 9898 334 731',
  phoneHref: 'tel:+919898334731',
  whatsapp: 'https://wa.me/919898334731',
  linkedin: 'https://www.linkedin.com/in/yuvraj-raulji/',
  instagram: 'https://www.instagram.com/iamyuvrajraulji',
  facebook: 'https://www.facebook.com/iamyuvrajraulji',
  location: 'Vadodara, Gujarat, India',
  timezone: 'IST · GMT+5:30',
} as const;

export const HERO = {
  /**
   * Two lines, not one. The name and the disciplines were a single run of
   * middots, which at 11px and 0.3em tracking reads as one long string that a
   * visitor skips. Split, the first line is the brand and the second is the
   * remit, and the eye takes both.
   *
   * The separator is a middot. The brand line used a multiplication sign for a
   * long time; section 1 of BRAND-DESIGN-GUIDELINE.md bans it and the
   * guideline outranks any mockup.
   */
  eyebrow: 'Yuvraj Raulji',
  eyebrowSub: 'eCommerce · AI · Technology',
  /**
   * The H1 is a role, not a slogan.
   *
   * It previously read "I build with technology. I think in business.", which
   * is a good line and answers none of the four questions a visitor arrives
   * with. A consultant's homepage has to name the job in the H1, because that
   * is both what a buyer scans for and what a search engine resolves the
   * entity against. The personality moved down to the positioning section,
   * where it now has a section of its own rather than competing with the role.
   */
  h1: 'eCommerce, AI & Technology Consultant',
  /**
   * The one-line statement under the H1, and the page's actual value claim.
   *
   * It read "I help businesses improve eCommerce performance, technology
   * architecture, customer experience and AI adoption across Shopify, Magento,
   * WooCommerce and modern commerce platforms." That is a capability list, and
   * every agency and freelancer competing for this buyer can write the same
   * sentence. Nothing in the first screen was unavailable elsewhere.
   *
   * The Sep 2026 acquisition diagnosis found the one genuinely differentiated
   * claim on the site sitting three clicks deep on /hire/: "nothing here
   * depends on selling the build". An agency structurally cannot say it,
   * because the agency's revenue IS the build. That is the position, and it
   * belongs on the first screen rather than on page three.
   *
   * No year count, deliberately. See the note in hero.tsx: the number lives in
   * STATS and only in STATS, so it cannot contradict itself across the page.
   */
  subLead:
    'The independent opinion on commerce decisions that are expensive to get wrong: which platform, what the architecture has to carry, and where revenue is actually being lost. Nothing here depends on selling you the build.',
  /**
   * The longer lead paragraph is not here: it links three of its own nouns to
   * the sections that answer them, so it is JSX and it lives in hero.tsx
   * rather than as a string a component would have to split apart to re-link.
   */
  marquee: [
    'Magento 2',
    'Shopify Plus',
    'Headless commerce',
    'AI and automation',
    'Technical SEO',
    'Digital transformation',
  ],
} as const;

export type Stat = { value: string; label: string };

/**
 * The four tiles under the position statement.
 *
 * Tiles 2 to 4 are the canvas values. Two tiles previously both read "12+",
 * which reads as a rendering bug rather than as two facts, and the canvas stat
 * that had been dropped (90% of B2B order and quote processing automated at
 * the B2B platform) is the same figure the 2020 entry in TIMELINE already
 * carries.
 *
 * Tile 1 reads 9+, settled by Yuvraj on 26 Aug 2026 against his own
 * professional record. The count runs from the first Magento role in June
 * 2016, not from the first websites in 2014, which is why it is 9+ and not
 * the 12+ this used to claim. Note the other "12+" on this page is a count of
 * platforms, not of years, and is a different confirmed figure.
 */
export const STATS: readonly Stat[] = [
  { value: '9+', label: 'Years in technology' },
  { value: '90%', label: 'Of B2B order and quote processing automated' },
  { value: '500K+', label: 'SKUs across 12+ multi-store Magento 2 platforms' },
  { value: '1M+', label: 'Monthly users on platforms under architecture' },
];

export type Project = {
  no: string;
  /**
   * The id of the same case in CASES (lib/brand.ts), which is also the anchor
   * that case renders on /work/. It exists so each card here deep-links to the
   * case it is a summary of, rather than six cards linking at the top of one
   * page with the same anchor text.
   */
  id: string;
  short: string;
  name: string;
  industry: string;
  challenge: string;
  role: string;
  stack: string;
  /** Cover already in `public/assets/case-covers`, or null for the ghost tile. */
  cover: string | null;
};

export const PROJECTS: readonly Project[] = [
  {
    no: '01',
    id: 'fashion-d2c',
    short: 'FSH',
    name: 'Headless fashion storefront',
    industry: 'Fashion · D2C',
    challenge:
      'A fast-growing fashion brand whose storefront had to keep getting faster while the catalogue and traffic behind it kept moving.',
    role: 'Architecture + delivery',
    stack: 'Magento 2 · Next.js · Varnish',
    cover: '/assets/case-covers/fashion-d2c-cover.webp',
  },
  {
    no: '02',
    id: 'plant-store',
    short: 'PLT',
    name: 'Online plant store',
    industry: 'Horticulture · D2C',
    challenge:
      'An online plant store selling a product that is fragile, seasonal and hard to photograph, to customers who abandon at any friction in the buy.',
    role: 'Commerce build',
    stack: 'Shopify · CRO',
    cover: '/assets/case-covers/plant-store-cover.webp',
  },
  {
    no: '03',
    id: 'sports-nutrition',
    short: 'SPN',
    name: 'Sports nutrition store',
    industry: 'Health & fitness',
    challenge:
      'Sports nutrition is a category where authenticity is the purchase decision and delivery speed is the repeat one. The storefront has to carry both.',
    role: 'Platform + growth',
    stack: 'Magento 2 · SEO',
    cover: '/assets/case-covers/sports-nutrition-cover.webp',
  },
  {
    no: '04',
    id: 'b2b-procurement',
    short: 'B2B',
    name: 'Procurement and approvals platform',
    industry: 'B2B procurement',
    challenge:
      'B2B buying is not a cart. It is a request, a quote, an approval chain and a budget holder, and a consumer checkout models none of that.',
    role: 'Systems architecture',
    stack: 'Magento 2 · Workflows · API',
    cover: '/assets/case-covers/b2b-procurement-cover.webp',
  },
  {
    no: '05',
    id: 'marketplace',
    short: 'MKT',
    name: 'Multi-category marketplace',
    industry: 'Marketplace',
    challenge:
      'A wide multi-category catalogue, which is the point at which catalogue size stops being a number and starts being an architecture problem.',
    role: 'Architecture direction',
    stack: 'Magento 2 multi-store · Redis',
    cover: '/assets/case-covers/marketplace-cover.webp',
  },
  {
    no: '06',
    id: 'manufacturing',
    short: 'MFG',
    name: 'Engineering manufacturer platform',
    industry: 'Manufacturing',
    challenge:
      'An engineering manufacturer whose buyers research for months and never fill in a form, on a site that search could not read.',
    role: 'Technical SEO + build',
    stack: 'WordPress · Schema · GA4',
    cover: '/assets/case-covers/manufacturing-cover.webp',
  },
];

export type AiTrack = { no: string; name: string; note: string };

export const AI_TRACKS: readonly AiTrack[] = [
  { no: '01', name: 'AI agents', note: 'Bounded work against real systems, with the tool boundary drawn on purpose.' },
  { no: '02', name: 'LLM apps', note: 'Past the benchmark table: context, instruction following, cost at volume.' },
  { no: '03', name: 'RAG', note: 'Retrieval that returns the right passage, and grounding you can audit.' },
  { no: '04', name: 'Automation', note: 'The parts of an operation that absorb people who should be doing something else.' },
  { no: '05', name: 'AI search', note: 'Discovery when the query is a sentence and the answer is a recommendation.' },
  { no: '06', name: 'GEO', note: 'Being the answer a model recommends, not only the result that ranks.' },
  { no: '07', name: 'Content systems', note: 'Catalogue enrichment that survives human review.' },
  { no: '08', name: 'Business intelligence', note: 'Decisions carried by data instead of by the loudest opinion in the room.' },
];

export type QaBlock = { no: string; q: string; a: string };

/**
 * 12 — Questions.
 *
 * The questions that come up before a first call. This array is the single
 * source for both the visible section and the FAQPage node in
 * lib/schema-brand.ts: FAQPage markup that does not match visible text on the
 * page is a structured-data violation, so the two can never be allowed to
 * drift apart.
 */
export const FAQS: readonly QaBlock[] = [
  {
    no: '01',
    q: 'What does Yuvraj Raulji specialize in?',
    a: 'AI, eCommerce and digital transformation. The practical work spans commerce platforms, the APIs behind mobile apps, performance and cloud architecture, and AI systems such as agents, retrieval and automation.',
  },
  {
    no: '02',
    q: 'What kind of AI work does Yuvraj Raulji explore?',
    a: 'LLM applications, agents with a deliberate tool boundary, retrieval augmented generation, MCP-based integrations, AI search, catalogue enrichment and process automation, with evaluation and human review around anything consequential.',
  },
  {
    no: '03',
    q: 'Which eCommerce platforms does Yuvraj Raulji work with?',
    a: 'Magento 2 and Adobe Commerce, Shopify and Shopify Plus, WooCommerce on WordPress, and headless storefronts built over REST and GraphQL APIs.',
  },
  {
    no: '04',
    q: 'How is AI changing eCommerce?',
    a: 'Four layers move first: discovery, where search interprets intent instead of matching keywords; merchandising, where recommendations use behaviour and catalogue context; catalogue operations, where enrichment is drafted by a model and reviewed by a person; and support, where grounded answers resolve order and product questions.',
  },
  {
    no: '05',
    q: 'What is AI search?',
    a: 'AI search interprets intent rather than matching keywords. A full sentence, such as a gift request under a budget for a specific occasion, can return products, categories or guidance, because the query is read as a goal instead of a string.',
  },
  {
    no: '06',
    q: 'When should a business consider AI automation?',
    a: 'When the process is repetitive and already documented, the data behind it is reliable, the cost of a mistake is measurable, and a person can review the output. Automating an undefined process only makes the confusion faster.',
  },
  {
    no: '07',
    q: 'What is eCommerce consulting?',
    a: 'eCommerce consulting is independent advice on the commerce decisions a business cannot easily reverse: which platform to be on, what the architecture has to carry, where performance and conversion are actually being lost, and which of those to fix first. It is judgement about trade-offs rather than the delivery of a fixed package.',
  },
  {
    no: '08',
    q: 'What is AI commerce?',
    a: 'AI commerce uses artificial intelligence across product discovery, search, recommendations, catalogue enrichment, customer support and purchasing workflows to create more relevant digital shopping experiences.',
  },
  {
    no: '09',
    q: 'What is headless commerce?',
    a: 'Headless commerce separates the customer-facing frontend from the commerce backend through APIs, so a business can build a custom experience while keeping the underlying commerce platform.',
  },
  {
    no: '10',
    q: 'Can an existing store be audited for technical SEO and conversion?',
    a: 'Yes, and it is the most common starting point. An audit covers crawlability and indexation, Core Web Vitals on real devices, checkout and search behaviour, analytics you can trust, and the architecture underneath all four. The output is a prioritised list of what is costing the most, not a list of everything that could be improved.',
  },
  {
    no: '11',
    q: 'What is the difference between Shopify and Magento?',
    a: 'Shopify is hosted and favours speed of launch and operational simplicity, which suits D2C brands with a focused catalogue. Magento 2 and Adobe Commerce are open architectures that carry complex catalogues, multi-store setups, B2B pricing and approval rules, at the cost of more engineering ownership.',
  },
  {
    no: '12',
    q: 'How does Yuvraj Raulji approach digital transformation?',
    a: 'Understand the business, map the process, choose technology against that process, build it, then measure. The technology decision comes fourth, not first.',
  },
  {
    no: '13',
    q: 'What does a 30-minute consultation cover?',
    a: 'The constraint you are actually hitting, the architecture or platform decision behind it, what AI should and should not touch in your operation, and the next practical step.',
  },
  {
    no: '14',
    q: 'How can someone work with Yuvraj Raulji?',
    a: 'Start a conversation by email at toyuvrajraulji@gmail.com, or book a 30-minute consultation. Replies usually arrive within 24 hours on IST business days.',
  },
];

/** What the contact form's subject select offers. */
export const ENQUIRY_TOPICS: readonly string[] = [
  'A commerce platform decision',
  'A replatforming or migration',
  'A slow store, or checkout drop-off',
  'An AI idea I want a second opinion on',
  'Automating a process that eats people',
  'A technology strategy conversation',
  'Search, discovery or AI visibility',
];

/* ═══════════════════════════════════════════════════════════════
   The consultant homepage
   ═══════════════════════════════════════════════════════════════

   The constants below were added when the homepage was restructured from a
   personal-interest narrative ("what I'm exploring") to a consulting page
   ("what I solve, and what it is worth to you"). The older constants above are
   still the source for the sections that survived that change, which is why
   both sets live in one file rather than in two that could drift.

   Nothing here carries a number. Every figure on the page comes from STATS,
   which is the one place a verified figure is written down. */

export type Problem = { no: string; name: string; note: string };

/**
 * 03 — What is actually holding the business back.
 *
 * Symptoms as the person with the problem would describe them, not as a
 * services list. The note says what it costs, because a symptom a reader does
 * not recognise as expensive is a symptom they will keep living with.
 */
export const PROBLEMS: readonly Problem[] = [
  {
    no: '01',
    name: 'Slow commerce experience',
    note: 'Pages that pass a lab score and still feel slow on a real phone, on a real network.',
  },
  {
    no: '02',
    name: 'Low conversion',
    note: 'Traffic arrives and does not buy, and the analytics say where but not why.',
  },
  {
    no: '03',
    name: 'Checkout friction',
    note: 'The last four steps lose the customers the first forty earned.',
  },
  {
    no: '04',
    name: 'Technical SEO issues',
    note: 'Crawl budget spent on pages that should never have been indexed.',
  },
  {
    no: '05',
    name: 'Poor search experience',
    note: 'On-site search that matches words instead of understanding what was asked.',
  },
  {
    no: '06',
    name: 'ERP and CRM integration',
    note: 'Stock, price and order sync built as scripts, so every schema change is an outage.',
  },
  {
    no: '07',
    name: 'Manual operations',
    note: 'Work that absorbs people who should be doing something the business cannot automate.',
  },
  {
    no: '08',
    name: 'Weak analytics',
    note: 'Numbers nobody trusts, so decisions get made on the loudest opinion instead.',
  },
  {
    no: '09',
    name: 'Scattered technology systems',
    note: 'Tools bought one problem at a time, now holding each other up.',
  },
];

export type Capability = {
  no: string;
  name: string;
  /** What this area is for, in the client's terms rather than the tooling's. */
  body: string;
  items: readonly string[];
};

/**
 * 04 — The four areas.
 *
 * Four, not nine. A consultant who lists nine specialisms is read as a
 * generalist, and the four below are the shape the actual engagements take.
 */
export const CAPABILITIES: readonly Capability[] = [
  {
    no: '01',
    name: 'eCommerce strategy',
    body: 'The decision before the build. Which platform the business should be on, what the architecture has to carry, and what a migration is genuinely worth.',
    items: [
      'Platform strategy',
      'Commerce architecture',
      'Technology planning',
      'Migration planning',
      'Performance strategy',
      'Digital commerce optimization',
    ],
  },
  {
    no: '02',
    name: 'Commerce technology',
    body: 'The platforms themselves, and the integrations that decide whether they hold. Most commerce problems turn out to be integration problems wearing a storefront.',
    items: [
      'Shopify and Shopify Plus',
      'Magento 2 and Adobe Commerce',
      'WooCommerce',
      'Headless commerce',
      'APIs and integrations',
      'ERP and CRM connectivity',
    ],
  },
  {
    no: '03',
    name: 'Growth and experience',
    body: 'What happens after the platform is right. Speed, search, checkout and measurement, which is where revenue is quietly won or lost.',
    items: [
      'Conversion optimization',
      'Technical SEO',
      'Core Web Vitals',
      'Analytics',
      'Search experience',
      'Checkout optimization',
      'Performance optimization',
      'Customer experience',
    ],
  },
  {
    no: '04',
    name: 'AI and automation',
    body: 'Where AI earns its place in an operation, and where it does not. The useful question is which process it should touch, not which model to use.',
    items: [
      'AI search',
      'AI agents',
      'LLM applications',
      'RAG systems',
      'Business automation',
      'Product discovery',
      'Customer support automation',
      'Content and catalog intelligence',
    ],
  },
];

export type ApproachStep = { no: string; name: string; body: string };

/** 09 — How an engagement actually runs. */
export const APPROACH: readonly ApproachStep[] = [
  {
    no: '01',
    name: 'Audit',
    body: 'Understand the business, the technology and the customer experience as they are, not as the last deck described them.',
  },
  {
    no: '02',
    name: 'Diagnose',
    body: 'Identify the technical and commercial issues actually affecting performance, and separate them from the ones that only look urgent.',
  },
  {
    no: '03',
    name: 'Prioritize',
    body: 'Focus on the problems that matter most, in the order that pays for the next one.',
  },
  {
    no: '04',
    name: 'Optimize',
    body: 'Implement practical improvements across commerce, technology and growth, and measure whether they moved anything.',
  },
  {
    no: '05',
    name: 'Scale',
    body: 'Build systems that support long-term growth, so the next stage does not require starting again.',
  },
];

/**
 * One entry in the stack list.
 *
 * `href` is set only where the site actually publishes a page about that
 * technology. Nine of them do, at the root: /shopify/, /magento/,
 * /woocommerce/, /wordpress/, /headless-commerce/, /ai-commerce/, /ai-search/,
 * /ai-automation/ and /digital-transformation/. Those pages were built to be
 * the landing page for a platform search, and until this section linked to
 * them the homepage named every one of their subjects in plain text and passed
 * nothing on. The rest carry no href because there is no page to send a reader
 * to, and a link to a page that does not exist is worse than no link.
 */
export type EcoItem = { name: string; href?: string };

export type EcosystemGroup = { name: string; items: readonly EcoItem[] };

/**
 * 08 — The ecosystem, grouped by what a thing is for.
 *
 * Set as type rather than as logos on purpose. A logo wall says "we have heard
 * of these"; a grouped list says which layer each one sits in, which is the
 * only part a client's technical reviewer will actually read.
 *
 * It is also the page's technology index: each name that has a page behind it
 * is the link to that page, with the technology's own name as the anchor text.
 */
export const ECOSYSTEM: readonly EcosystemGroup[] = [
  {
    name: 'Commerce',
    items: [
      { name: 'Shopify', href: '/shopify/' },
      { name: 'Shopify Plus', href: '/shopify/' },
      { name: 'Magento 2', href: '/magento/' },
      { name: 'Adobe Commerce', href: '/magento/' },
      { name: 'WooCommerce', href: '/woocommerce/' },
      { name: 'WordPress', href: '/wordpress/' },
    ],
  },
  {
    name: 'Frontend',
    items: [
      { name: 'Next.js' },
      { name: 'React' },
      { name: 'Headless commerce', href: '/headless-commerce/' },
    ],
  },
  {
    name: 'AI',
    items: [
      { name: 'AI search', href: '/ai-search/' },
      { name: 'AI commerce', href: '/ai-commerce/' },
      { name: 'LLMs' },
      { name: 'RAG' },
      { name: 'AI agents', href: '/ai-automation/' },
      { name: 'Automation', href: '/ai-automation/' },
    ],
  },
  {
    name: 'Data and infrastructure',
    items: [
      { name: 'GraphQL' },
      { name: 'Node.js' },
      { name: 'PHP' },
      { name: 'MySQL' },
      { name: 'Redis' },
      { name: 'Varnish' },
      { name: 'AWS' },
      { name: 'Cloudflare' },
    ],
  },
  {
    name: 'Analytics and growth',
    items: [
      { name: 'GA4' },
      { name: 'Technical SEO' },
      { name: 'CRO' },
      { name: 'Digital transformation', href: '/digital-transformation/' },
    ],
  },
];
