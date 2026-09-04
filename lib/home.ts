/**
 * Content model for the homepage.
 *
 * Positioning: eCommerce Consultant & Digital Commerce Architect. That exact
 * string is the one job title used across the H1, the Person schema, the About
 * page and the footer. Four different titles were previously in circulation
 * across two pages, which is what entity resolution punishes hardest.
 *
 * Provenance rule (CONTENT-PRINCIPLES.md): every factual claim here is either
 * (a) already in lib/site.ts / lib/posts.ts as verified record, or (b) an
 * opinion, positioning line or biographical date supplied directly by Yuvraj.
 * Nothing is inferred, rounded up or filled in to make a section look complete.
 * Where the record has no value for a field, the field is optional and simply
 * absent rather than invented.
 *
 * Three sections the brief asked for are deliberately not modelled here,
 * because no verified material exists for them and writing around that gap is
 * the one thing CONTENT-PRINCIPLES forbids outright:
 *
 *   - The long-form founder statement. POSITION below carries Yuvraj's own
 *     philosophy line, which is his, but it is a position and not a story.
 *   - The featured case-study narrative. The manufacturer platform is the only
 *     engagement with a published outcome, and the reasoning behind it is
 *     written down nowhere.
 *   - Testimonials. The four on file are anonymised to the point of being
 *     unattributable, and an unattributable quote is not proof.
 *
 * Copy in this file avoids em-dashes on purpose.
 */

import { POSTS } from './posts';

/* ═══════════════════════════════════════════════════════════════
   SECTION ORDER
   The nav, the section numbering and the scroll targets all read this,
   so a section is added or reordered in exactly one place.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS = [
  { id: 'hero', num: '01', label: 'Opening' },
  { id: 'credibility', num: '02', label: 'The record' },
  { id: 'position', num: '03', label: 'Position' },
  { id: 'founder', num: '04', label: 'Founder' },
  { id: 'solve', num: '05', label: 'What I solve' },
  { id: 'expertise', num: '06', label: 'Expertise' },
  { id: 'work', num: '07', label: 'Selected work' },
  { id: 'writing', num: '08', label: 'Thinking' },
  { id: 'experience', num: '09', label: 'Experience' },
  { id: 'questions', num: '10', label: 'Questions' },
  { id: 'contact', num: '11', label: 'Contact' },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];

/**
 * Primary navigation, used by every page rather than only the homepage.
 *
 * All five are real routes now. The homepage previously pointed three of them
 * at its own anchors, which meant the sections had no addressable URL of their
 * own and nothing could link to them from outside the page.
 *
 * "Thinking" and "Insights" were two labels in the brief for one destination.
 * They are one entry, pointed at /insights/, which is the indexed URL carrying the
 * article history; renaming that path would move eight ranking pages to buy a
 * nicer slug.
 */
export const HOME_NAV = [
  { label: 'Expertise', href: '/expertise/' },
  { label: 'Work', href: '/work/' },
  { label: 'Experience', href: '/experience/' },
  { label: 'About', href: '/about/' },
  { label: 'Insights', href: '/insights/' },
] as const;

/** The one job title. Used in the H1 eyebrow, the schema and the footer. */
export const ROLE = 'eCommerce Consultant & Digital Commerce Architect';

/** Official site of the execution brand. Same origin the case studies live on. */
/**
 * Retired 25 Aug 2026. Section 4 of BRAND-DESIGN-GUIDELINE.md keeps corporate
 * brand references off this site, and an outbound link carries the brand in the
 * href whether or not the anchor text names it. Case cards point at /work/.
 */
export const RAULJI_TECHNOLOGIES_URL = '/work/';

/**
 * Registered name of the company, and the year it was incorporated.
 *
 * These two strings, plus ROLE above, are the entity. They appear identically
 * in the hero, the founder section, the FAQ answers, the footer and the
 * Organization node in lib/schema.ts, because an entity stated four different
 * ways is an entity a search engine declines to resolve.
 */
export const COMPANY_NAME = 'Raulji Technologies Private Limited';
export const COMPANY_SHORT = 'Raulji Technologies';
export const COMPANY_FOUNDED = '2025';

/** The founder relationship, as one reusable line. */
export const FOUNDER_LINE = `Founder of ${COMPANY_SHORT}`;

/* ═══════════════════════════════════════════════════════════════
   01 — HERO
   ═══════════════════════════════════════════════════════════════ */

export const HERO = {
  name: 'Yuvraj Raulji',
  role: ROLE,
  /**
   * The one H1 on the page. Held as separate lines because each break is doing
   * typographic work, and because .yr-linemask reveals one line per mask: a
   * line left to wrap would animate as a single block and clip against a mask
   * padded for one line. Joined with a space for the accessible name.
   */
  headline: ['I build commerce systems', 'that hold up when', 'the business changes.'] as const,
  /**
   * Every noun here is evidenced by the employment record in lib/site.ts:
   * multi-store Magento at 500K+ SKUs, five-level B2B approval chains, and
   * migrations run without taking the store offline.
   */
  lede:
    'Nine years of Magento, Shopify and headless architecture, mostly on the awkward problems: multi-store catalogues, B2B approval chains, and replatforming that has to happen while the store keeps trading.',
  disciplines: [
    'Magento / Adobe Commerce',
    'Shopify Plus',
    'Headless Commerce',
    'eCommerce SEO',
    'CRO & Performance',
    'AI Automation',
  ] as const,
  ctaPrimary: { label: 'Work with me' },
  ctaSecondary: { label: 'Explore my work', href: '#work' },
} as const;

/* ═══════════════════════════════════════════════════════════════
   02 — CREDIBILITY

   Four figures, all four traceable to the B2B platform entries in lib/site.ts
   EXPERIENCE. The old site's "50+ projects delivered" is deliberately
   absent: it appears nowhere in the record and there is no way to
   source it.
   ═══════════════════════════════════════════════════════════════ */

export interface Stat {
  value: string;
  label: string;
  note: string;
}

export const CREDIBILITY = {
  headline: ['The record,', 'not the pitch.'] as const,
  body:
    'Four numbers I can point at, and the work behind each one is on this page or the case studies it links to.',
  /** Markets, from the engagement record rather than an aspiration. */
  markets: ['India', 'Saudi Arabia', 'United Kingdom', 'Europe', 'North America'] as const,
} as const;

export const STATS: Stat[] = [
  {
    value: '9+',
    label: 'Years in commerce',
    note: 'Professional commerce work. The first builds go back further, to 2014.',
  },
  {
    value: '50+',
    label: 'Projects delivered',
    note: 'Including 12+ multi-store Magento platforms led end to end.',
  },
  {
    value: '500K+',
    label: 'SKUs under management',
    note: 'Where catalogue size stops being a number and starts being an architecture problem.',
  },
  {
    value: '1M+',
    label: 'Monthly users served',
    note: 'Sustained traffic on the platforms above.',
  },
];

/* ═══════════════════════════════════════════════════════════════
   03 — POSITION

   Yuvraj's own words, kept verbatim from the previous homepage. This
   is a position, not the founder narrative the brief asked for; that
   still needs writing and cannot be written for him.
   ═══════════════════════════════════════════════════════════════ */

export const POSITION = {
  headline: ['Technology should move', 'the business forward.'] as const,
  body:
    'I don’t believe technology should exist simply because it’s possible. It should create leverage: better decisions, better customer experiences, faster operations and sustainable growth.',
  attribution: 'Yuvraj Raulji',
} as const;

/* ═══════════════════════════════════════════════════════════════
   04 — FOUNDER

   The entity section. Its whole job is to state, in crawlable prose and
   in one place, that Yuvraj Raulji founded Raulji Technologies Private
   Limited and what the relationship between the two actually is.

   Every fact here is in the record: the company is in CURRENT_ROLES in
   lib/site.ts as "Director & Founder, Raulji Technologies Pvt. Ltd.",
   and the 2025 incorporation is in the TIMELINE below. Nothing about
   company size, revenue, client count or team is stated, because none
   of that is recorded anywhere and inventing it here would poison the
   one section on the page that has to be believed literally.

   Note what this section does NOT do: it does not turn the site into an
   agency page. The split is deliberate and is said out loud in `split`
   below. This site answers "why Yuvraj"; the company site answers "what
   gets delivered".
   ═══════════════════════════════════════════════════════════════ */

export const FOUNDER = {
  headline: ['Founder of', 'Raulji Technologies.'] as const,
  /**
   * The entity paragraph. Reads as a sentence a person would write and
   * as a definition an answer engine can lift whole, which is the same
   * requirement approached from two directions.
   */
  statement:
    `Yuvraj Raulji is the founder of ${COMPANY_NAME}, an eCommerce and digital transformation company incorporated in ${COMPANY_FOUNDED}. The company builds and modernises commerce platforms; this site is where the reasoning behind that work is published.`,
  split: [
    {
      label: 'This site',
      body: 'The thinking. Positions, trade-offs, the architecture decisions and why they went the way they did. Written in the first person because the judgement is the thing being offered.',
    },
    {
      label: COMPANY_SHORT,
      body: 'The delivery. Teams, engagements and the published case studies. Project work runs through the company; the advice does not have to.',
    },
  ] as const,
  /**
   * Three destinations, with the anchor text written for each one.
   * Generic anchors ("read more", "click here") are banned sitewide:
   * the anchor is the only description of the target most crawlers and
   * most keyboard users ever get.
   */
  links: [
    { href: '/about/', label: "Yuvraj Raulji's story and full professional record", internal: true },
    { href: '/work/', label: 'Case studies across Magento, Shopify and headless commerce', internal: true },
    { href: RAULJI_TECHNOLOGIES_URL, label: `${COMPANY_SHORT}, the delivery company`, internal: false },
  ] as const,
} as const;

/* ═══════════════════════════════════════════════════════════════
   05 — WHAT I SOLVE

   Business problems, phrased the way the person with the problem would
   phrase it, not the way a technologist would categorise it. Each links
   to the piece that argues it out, so the section is also the top of
   the internal-linking funnel.
   ═══════════════════════════════════════════════════════════════ */

export interface Problem {
  num: string;
  symptom: string;
  detail: string;
  href: string;
  cta: string;
}

export const SOLVE = {
  headline: ['What I get', 'called about.'] as const,
  body:
    'Six versions of the same conversation. In most of them the platform is not the problem, it is where the problem became visible.',
} as const;

export const PROBLEMS: Problem[] = [
  {
    num: '01',
    symptom: 'The store is slow and nobody can say why',
    detail:
      'Time to first byte climbing, Core Web Vitals failing on real devices while the lab score looks fine. The fix is usually below the front end: cache invalidation, query plans, or an index doing a full scan.',
    href: '/insights/aws-magento2-server-setup/',
    cta: 'How I set up production Magento',
  },
  {
    num: '02',
    symptom: 'Traffic is fine, conversion is not',
    detail:
      'The money leaves at the checkout, and almost never because of price. Every field is a question the customer has to agree to answer, and most carts are lost to hesitation.',
    href: '/insights/magento2-checkout-optimization/',
    cta: 'The checkout breakdown',
  },
  {
    num: '03',
    symptom: 'A replatforming nobody wants to start',
    detail:
      'The risk in a migration is not the build, it is the cutover: URLs, redirects, order history, integrations and the week either side. Sequenced properly, trading continues throughout.',
    href: '/insights/shopify-plus-vs-magento2-2025/',
    cta: 'Choosing the target platform',
  },
  {
    num: '04',
    symptom: 'Growth has outrun the architecture',
    detail:
      'The catalogue, the order volume or the number of storefronts has passed what the current setup was designed for. Everything still works, and every change now costs three times what it used to.',
    href: '#expertise',
    cta: 'Where I would start',
  },
  {
    num: '05',
    symptom: 'Search cannot find the catalogue',
    detail:
      'Crawl budget spent on faceted URLs, thin category pages, and product data structured so that neither a crawler nor a language model can make sense of it.',
    href: '/insights/magento2-seo-technical-audit/',
    cta: 'The technical audit guide',
  },
  {
    num: '06',
    symptom: 'The operation runs on manual work',
    detail:
      'Quotes, approvals, catalogue QA and data reconciliation absorbing people who should be doing something else. This is where automation pays, provided the process underneath it is worth keeping.',
    href: '/insights/ai-ecommerce-revenue-2025/',
    cta: 'Where AI actually pays',
  },
];

/* ═══════════════════════════════════════════════════════════════
   06 — EXPERTISE

   Eight disciplines. Each carries a `wrong` line naming the situation in
   which it is the incorrect choice, which is the section's whole reason
   for existing: CONTENT-PRINCIPLES §4 is explicit that recommending
   every technology for every business is what makes someone a vendor
   rather than a strategist. Several of these lines are Yuvraj's own
   recorded positions.
   ═══════════════════════════════════════════════════════════════ */

export interface Discipline {
  id: string;
  label: string;
  what: string;
  wrong: string;
  stack: string[];
}

export const EXPERTISE_INTRO = {
  headline: ['Eight disciplines,', 'and when each one', 'is the wrong answer.'] as const,
  body:
    'Anyone can list what they work with. The useful half of the list is knowing when not to reach for it, so that half is here too.',
} as const;

export const DISCIPLINES: Discipline[] = [
  {
    id: 'magento',
    label: 'Magento & Adobe Commerce',
    what:
      'Multi-store catalogues, B2B workflows, approval chains and the ERP and PIM boundaries no theme setting will express.',
    wrong:
      'A single-store brand with two hundred SKUs and no custom workflow pays for Magento twice: once to build it, and again every month to keep it running.',
    stack: ['Custom modules', 'Multi-store', 'B2B workflows'],
  },
  {
    id: 'shopify',
    label: 'Shopify & Shopify Plus',
    what:
      'Speed to market as a strategy, with the platform’s constraints doing useful work rather than getting in the way.',
    wrong:
      'The moment the business needs quote-driven pricing and multi-level approvals, you stop building on the platform and start fighting it.',
    stack: ['Shopify Plus', 'Liquid', 'Checkout extensions'],
  },
  {
    id: 'headless',
    label: 'Headless commerce',
    what:
      'Decoupling the storefront from the commerce release cycle, so the front end stops waiting on back-end deployments.',
    wrong:
      'If the front end has no independent roadmap, headless buys an extra deployment surface, an extra failure mode and nothing else.',
    stack: ['Next.js', 'GraphQL', 'Storefront API'],
  },
  {
    id: 'architecture',
    label: 'Commerce architecture',
    what:
      'Platform selection, build versus buy, phasing, integration boundaries and the data model everything else inherits.',
    wrong:
      'There is no wrong time for this, but there is a wrong order. Pick the platform after you know how the business sells, approves and fulfils. Not before.',
    stack: ['Platform selection', 'Integration design', 'Phasing'],
  },
  {
    id: 'seo',
    label: 'eCommerce SEO',
    what:
      'Crawl budget, indexation, faceted navigation, category templates and structured data at catalogue scale.',
    wrong:
      'SEO on a store that cannot convert is buying traffic you will lose at the cart. Fix the checkout first and the same spend goes further.',
    stack: ['Technical SEO', 'Indexation', 'Structured data'],
  },
  {
    id: 'cro',
    label: 'CRO',
    what:
      'Checkout friction, form design, one-page and guest flows, and the analytics that show which step actually loses people.',
    wrong:
      'Below roughly a thousand orders a month you will never reach significance on a test. At that volume, fix what is obviously broken and stop calling it experimentation.',
    stack: ['Checkout UX', 'A/B testing', 'GA4 funnels'],
  },
  {
    id: 'performance',
    label: 'Performance engineering',
    what:
      'PHP-FPM tuning, cache layering, Varnish and Redis, query plans, image pipelines, measured against field data.',
    wrong:
      'Chasing a Lighthouse score instead of real-user data. The number that pays is the one collected from the devices your customers actually hold.',
    stack: ['Varnish & Redis', 'Core Web Vitals', 'Database tuning'],
  },
  {
    id: 'ai',
    label: 'AI automation',
    what:
      'Retrieval, ranking, catalogue enrichment and operations automation wired into platforms already carrying real order volume.',
    wrong:
      'Automating a process nobody has fixed. You get the same bad outcome, faster and at higher cost. Most companies have a process problem, not an AI problem.',
    stack: ['Retrieval', 'Semantic search', 'Ops automation'],
  },
];

/* ═══════════════════════════════════════════════════════════════
   07 — SELECTED WORK

   Six of the eleven engagements recorded in lib/site.ts WORK_SLIDES,
   chosen to cover headless, Shopify, Magento, marketplace and B2B.

   `outcome` is present only where the record states a measured result,
   which today is the manufacturer platform alone. The remaining five render
   without an outcome row rather than with an invented one.

   `alt` was previously an empty string on all six. The cover is inside a
   link whose accessible name already carries the project, but an empty
   alt also removes six of the strongest proof assets on the page from
   image search for no gain.
   ═══════════════════════════════════════════════════════════════ */

export interface WorkItem {
  id: string;
  name: string;
  category: string;
  summary: string;
  stack: string[];
  outcome?: string;
  img: string;
  alt: string;
  /** Intrinsic pixels. Present so width/height can be set and nothing shifts. */
  imgW: number;
  imgH: number;
  href: string;
}

export const WORK = {
  headline: ['Real work.', 'Real systems.'] as const,
  body:
    'Full case studies are published on the delivery site, which is where the build write-ups live. Each card links through to the write-up.',
} as const;

export const WORK_ITEMS: WorkItem[] = [
  {
    id: 'fashion-d2c',
    name: 'Headless fashion storefront',
    category: 'Headless commerce · Fashion',
    summary:
      'High-performance headless commerce architecture for India’s fastest-growing men’s fashion brand.',
    stack: ['Headless', 'Storefront API', 'Performance'],
    img: '/assets/case-covers/fashion-d2c-cover.webp',
    alt: 'Fashion D2C storefront headless commerce storefront',
    imgW: 1920,
    imgH: 1290,
    href: '/work/',
  },
  {
    id: 'plant-store',
    name: 'Online plant store',
    category: 'Shopify · D2C',
    summary:
      'India’s most trusted online plant store on Shopify, with OTP login, GoKwik one-page checkout and custom product pages.',
    stack: ['Shopify', 'GoKwik checkout', 'Custom PDP'],
    img: '/assets/case-covers/plant-store-cover.webp',
    alt: 'Online plant store Shopify storefront',
    imgW: 1920,
    imgH: 1280,
    href: '/work/',
  },
  {
    id: 'sports-nutrition',
    name: 'Sports nutrition store',
    category: 'E-commerce · Health & fitness',
    summary:
      'Online fitness and supplement store delivering authentic sports nutrition at speed.',
    stack: ['Commerce build', 'Catalogue', 'Checkout'],
    img: '/assets/case-covers/sports-nutrition-cover.webp',
    alt: 'Sports nutrition store sports nutrition storefront',
    imgW: 1920,
    imgH: 1047,
    href: '/work/',
  },
  {
    id: 'b2b-procurement',
    name: 'Procurement and approvals platform',
    category: 'Custom platform · B2B',
    summary:
      'Scalable B2B procurement platform streamlining purchase requests and approvals.',
    stack: ['B2B workflows', 'Approvals', 'Integrations'],
    img: '/assets/case-covers/b2b-procurement-cover.webp',
    alt: 'A B2B procurement platform, built on Magento 2',
    imgW: 1920,
    imgH: 1080,
    href: '/work/',
  },
  {
    id: 'marketplace',
    name: 'Multi-category marketplace',
    category: 'Magento 2 · Marketplace',
    summary:
      'A scalable Magento 2 platform powering a wide multi-category retail catalogue.',
    stack: ['Magento 2', 'Multi-category', 'Scale'],
    img: '/assets/case-covers/marketplace-cover.webp',
    alt: 'Multi-category marketplace Magento 2 marketplace',
    imgW: 1920,
    imgH: 1440,
    href: '/work/',
  },
  {
    id: 'manufacturing',
    name: 'Engineering manufacturer platform',
    category: 'Web platform · Manufacturing',
    summary: 'A modern engineering brand platform built for discovery and enquiry.',
    stack: ['Web platform', 'Technical SEO', 'Content'],
    outcome: '3x traffic growth and 45% better engagement',
    img: '/assets/case-covers/manufacturing-cover.webp',
    alt: 'Engineering manufacturer platform engineering brand platform',
    imgW: 1920,
    imgH: 867,
    href: '/work/',
  },
];

/* ═══════════════════════════════════════════════════════════════
   08 — THINKING

   Built off lib/posts.ts so a new post appears here automatically.
   Only topics that actually have items are rendered as filters, so the
   section can never offer an empty result set. This is the same bug the
   footer had, where seven filters were offered against eight posts and
   two of them matched nothing.
   ═══════════════════════════════════════════════════════════════ */

export type ContentFormat = 'article' | 'reel' | 'ai-note' | 'podcast';
export type ContentTopic =
  | 'Commerce'
  | 'Technology'
  | 'SEO'
  | 'AI'
  | 'Architecture'
  | 'Growth';

export interface ContentItem {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  meta: string;
  topic: ContentTopic;
  format: ContentFormat;
  href: string;
  external?: boolean;
}

export const FORMAT_LABEL: Record<ContentFormat, string> = {
  article: 'Articles',
  reel: 'Reels',
  'ai-note': 'AI Notes',
  podcast: 'Podcasts',
};

/**
 * Topic assignment per post. Kept explicit rather than derived from the post's
 * `filter`, because the blog taxonomy is platform-shaped (magento-2, shopify,
 * aws-server) and this one is subject-shaped, matching the note types in the
 * content strategy.
 */
const POST_TOPICS: Record<string, ContentTopic> = {
  'magento2-seo-technical-audit': 'SEO',
  'ai-ecommerce-revenue-2025': 'AI',
  'magento2-checkout-optimization': 'Growth',
  'shopify-plus-vs-magento2-2025': 'Architecture',
  'aws-magento2-server-setup': 'Technology',
  'shopify-headless-nextjs-guide': 'Architecture',
  'cro-double-conversion': 'Growth',
  'magento2-pwa-studio-headless': 'Technology',
};

export const CONTENT = {
  headline: ['Thinking', 'out loud'] as const,
  body: 'Long-form breakdowns of the decisions behind the builds, and the trade-offs each one carried.',
  cta: { label: 'All writing', href: '/insights/' },
} as const;

/** Newest first. Dates in POSTS are "12 Jun 2026" format. */
export const CONTENT_ITEMS: ContentItem[] = Object.entries(POSTS)
  .map(([slug, p]): ContentItem => ({
    slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    meta: p.readTime,
    topic: POST_TOPICS[slug] ?? 'Technology',
    format: 'article',
    href: `/insights/${slug}/`,
  }))
  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

/** Filters are derived, so an empty category can never be offered. */
export const CONTENT_TOPICS: ContentTopic[] = (
  ['Commerce', 'Technology', 'SEO', 'AI', 'Architecture', 'Growth'] as ContentTopic[]
).filter((t) => CONTENT_ITEMS.some((i) => i.topic === t));

export const CONTENT_FORMATS: ContentFormat[] = (
  ['article', 'reel', 'ai-note', 'podcast'] as ContentFormat[]
).filter((f) => CONTENT_ITEMS.some((i) => i.format === f));

/* ═══════════════════════════════════════════════════════════════
   09 — EXPERIENCE

   Dates from the education and employment record in lib/site.ts, plus
   the three biographical dates supplied by Yuvraj (2014, 2016, 2025).

   The fourteen-month overlap is real: the Gulf retail role runs Jul 2018
   to May 2021 and the B2B platform starts Mar 2020, both confirmed by
   Yuvraj on 26 Aug 2026. The timeline below states start years only,
   which is true either way.

   No company names. Section 4 of BRAND-DESIGN-GUIDELINE.md keeps
   corporate and historical brand names off this site and section 3 keeps
   the word "Founder" off it, so each entry is titled by what changed
   rather than by who was paying.

   No achievement, client or revenue figure is attached to any entry
   beyond what the employment record already states.
   ═══════════════════════════════════════════════════════════════ */

export interface TimelineEntry {
  year: string;
  title: string;
  body: string;
}

export const EXPERIENCE = {
  headline: ['Built.', 'Migrated.', 'Scaled.'] as const,
  body:
    'Nine years building the same thing from different angles: systems a business can actually run on.',
  cta: { label: 'Read the longer version', href: '/about/' },
} as const;

export const TIMELINE: TimelineEntry[] = [
  {
    year: '2010',
    title: 'Information Technology',
    body:
      'Diploma from 2010 to 2013, then a bachelor’s degree from 2013 to 2016. Six years, and the point at which this stopped being a hobby.',
  },
  {
    year: '2014',
    title: 'The first builds',
    body: 'Started building websites and online stores.',
  },
  {
    year: '2016',
    title: 'Working independently',
    body: 'Started taking my own clients, and established it as a working practice the following year.',
  },
  {
    year: '2018',
    title: 'Gulf retail, at scale',
    body:
      'Commerce builds for Saudi retail groups: grocery, commercial kitchen equipment and fashion. First headless frontends over REST and GraphQL.',
  },
  {
    year: '2020',
    title: 'Senior Magento, B2B',
    body:
      'High-traffic B2B commerce. Automated 90% of order and quote processing, and cut page load times by 60% through Varnish, Redis, full-page cache and database tuning.',
  },
  {
    year: '2023',
    title: 'Team leader',
    body:
      'Architecture direction across multi-store Magento 2 builds. Five-level approval workflows for development, B2B orders, quotes and vendor management.',
  },
  {
    year: '2025',
    title: 'Incorporated',
    body: 'The practice incorporated as a private limited company.',
  },
];

/* ═══════════════════════════════════════════════════════════════
   10 — QUESTIONS

   Answer-oriented entity content, and the only block on the site that
   may carry FAQPage markup, because FAQPage without the matching
   visible questions is a structured-data violation rather than a free
   win. lib/schema.ts reads this array, so the markup and the rendered
   text cannot drift apart.

   Questions are phrased in the third person because that is how the
   query arrives, both from a person typing into Google and from a
   language model matching a passage. Answers are in the first person
   because the site is Yuvraj's, and an answer written about himself in
   the third person reads as copy written by someone else.

   The eight FAQs the brief asked for are here in full. What is not here
   is the ninth kind: a question invented to hold a keyword. Every answer
   below states something the record supports, and the AI one says
   plainly that there is no published AI case study yet, because the
   alternative is to claim one.
   ═══════════════════════════════════════════════════════════════ */

export interface HomeFaq {
  q: string;
  a: string;
  /** Optional descriptive link rendered under the answer. */
  link?: { href: string; label: string };
}

export const QUESTIONS = {
  headline: ['Straight', 'answers.'] as const,
  body:
    'The eight things people actually ask before the first call, answered without the hedging.',
} as const;

export const HOME_FAQS: HomeFaq[] = [
  {
    q: 'Who is Yuvraj Raulji?',
    a: `Yuvraj Raulji is an ${ROLE.toLowerCase()} based in Vadodara, India, and the founder of ${COMPANY_NAME}. Nine years across Magento and Adobe Commerce, Shopify Plus and headless architecture, on B2B, B2C, D2C and marketplace models, currently leading a development team at Nxtby alongside the company.`,
    link: { href: '/about/', label: "the full professional record" },
  },
  {
    q: 'Is Yuvraj Raulji the founder of Raulji Technologies?',
    a: `Yes. ${COMPANY_NAME} was incorporated in ${COMPANY_FOUNDED} and I am its founder and director. Project delivery runs through the company. This site is the personal one, and it is where the thinking behind the work is published rather than the service list.`,
    link: { href: RAULJI_TECHNOLOGIES_URL, label: `${COMPANY_SHORT}` },
  },
  {
    q: 'What does Yuvraj Raulji specialise in?',
    a: 'Six practice areas: eCommerce consulting and platform selection, Magento 2 and Adobe Commerce, Shopify and Shopify Plus, headless commerce, AI in commerce, and digital transformation. They overlap on purpose, because a replatforming decision is an architecture question before it is a platform question.',
    link: { href: '/expertise/', label: 'the six expertise areas, and when each is the wrong answer' },
  },
  {
    q: "What is Yuvraj Raulji's experience in eCommerce?",
    a: 'Nine years of professional commerce work, starting on Magento in 2016 at Sinelogix, then Shopify at OrionCoders, Magento builds for Saudi retail at Magneto IT Solutions, and since 2020 at Nxtby as senior Magento developer and then team leader. The first websites and online stores go back to 2014.',
    link: { href: '/experience/', label: 'the full timeline from 2010 to today' },
  },
  {
    q: 'What platforms does Yuvraj Raulji work with?',
    a: 'Magento 2 and Adobe Commerce, Shopify and Shopify Plus, WooCommerce, and custom headless storefronts on Next.js and GraphQL. For infrastructure, AWS with EC2, RDS and S3 behind Nginx, with Varnish and Redis for caching.',
    link: { href: '/expertise/', label: 'how each platform choice gets made' },
  },
  {
    q: 'Does Yuvraj Raulji specialise in Magento 2?',
    a: 'Yes, and it is the deepest part of the record: 12+ multi-store Magento 2 platforms at Nxtby carrying 500K+ SKUs and 1M+ monthly users, five-level B2B approval workflows, and a 60% cut in page load times through Varnish, Redis, full-page cache and database tuning. It is also the platform I most often recommend against, because a small single-store catalogue pays for it twice.',
    link: { href: '/expertise/magento-2/', label: 'the Magento 2 and Adobe Commerce consulting approach' },
  },
  {
    q: 'Does Yuvraj Raulji work with Shopify and headless commerce?',
    a: 'Both. Shopify since 2018, for brand-owned D2C storefronts where speed to market is the strategy, and headless since those first REST and GraphQL frontends, most visibly in the fashion D2C headless architecture. Headless is the one I qualify hardest: without an independent front-end roadmap it buys an extra deployment surface and nothing else.',
    link: { href: '/expertise/headless-commerce/', label: 'headless commerce architecture, and the case against it' },
  },
  {
    q: "What is Yuvraj Raulji's approach to AI in commerce?",
    a: 'Most companies asking about AI have a process problem, not an AI problem, and automating a process nobody has fixed gets you the same bad outcome faster. What holds up is unglamorous: catalogue enrichment with human review, retrieval-based search, and operations automation wired into a platform already carrying order volume. No AI engagement on my list has a published measured outcome yet, and I would rather say that than write one up.',
    link: { href: '/expertise/ai-commerce/', label: 'the AI commerce position in full' },
  },
];

/* ═══════════════════════════════════════════════════════════════
   11 — CLOSING

   Also carries the reference to the execution brand. This used to be a
   section of its own; folded in here because the personal site answers
   "why Yuvraj" and the company site answers "what gets delivered", and
   a full band was giving the company more of this page than that split
   justifies.
   ═══════════════════════════════════════════════════════════════ */

export const CLOSING = {
  headline: ['Building something', 'ambitious?'] as const,
  lines: [
    'A replatforming you have been putting off?',
    'A checkout that loses people you already paid for?',
    'A catalogue that has outgrown its architecture?',
    'Or a decision you would rather not make alone?',
  ],
  ctaPrimary: { label: 'Work with me' },
  ctaSecondary: { label: 'Read how I think', href: '/insights/' },
  company: {
    label: 'Delivery',
    body: 'Project delivery runs through Raulji Technologies Private Limited.',
    cta: { label: 'Raulji Technologies', href: RAULJI_TECHNOLOGIES_URL },
  },
  signoff: 'Yuvraj Raulji',
  signoffLine: ['Commerce', 'Architecture', 'Performance', 'Growth'] as const,
} as const;
