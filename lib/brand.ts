/**
 * PHASE 1 CONTENT MODEL — Home, About, Work.
 *
 * The personal brand, positioned AI x BUSINESS x ECOMMERCE. This module is the
 * only place the copy for those three pages is written; the pages compose it
 * and never author a sentence of their own. Adding a section means adding an
 * export here, not a paragraph in a component.
 *
 * ── Two rules govern every string below ────────────────────────────────────
 *
 * 1. PROVENANCE (CONTENT-PRINCIPLES.md §1). Every factual claim traces to the
 *    professional record in lib/site.ts or lib/posts.ts. Where the record has
 *    no value, the field is absent rather than filled in. This is why five of
 *    the six case studies carry no outcome line and why nothing here states a
 *    client count, a team size or a revenue figure.
 *
 * 2. NAMING. This is the personal site. It carries no company name, no
 *    corporate brand and no directorship or foundership language, in copy, in
 *    metadata, in schema or in image alt text. The execution relationship is
 *    real and is published elsewhere; it is deliberately not published here.
 *    Employer and project names survive where they are load-bearing evidence
 *    (an engagement cannot be described without naming it), because the rule
 *    is about not turning a personal site into a company site, not about
 *    erasing the record.
 *
 * Copy avoids em dashes throughout, matching the rest of the site.
 */

import type { Anchor } from './expertise';
import { POSTS } from './posts';

/* ═══════════════════════════════════════════════════════════════
   IDENTITY
   ═══════════════════════════════════════════════════════════════ */

export const NAME = 'Yuvraj Raulji';

/**
 * The one positioning string. Used in every eyebrow and every meta title.
 *
 * The separator is a pipe, not a multiplication sign. Section 1 of
 * BRAND-DESIGN-GUIDELINE.md bans that character outright and names
 * `AI | BUSINESS | ECOMMERCE` as the preferred visual brand line.
 */
export const POSITIONING = 'AI | BUSINESS | ECOMMERCE';

/*
 * POSITIONING_PLAIN, 'AI, business and eCommerce', used to live here as the
 * metadata variant of the line above. Its only consumer was the homepage
 * WebPage node, where it produced a fourth account of this person after the
 * <title>, the H1 and the Person node, all three of which name the role. That
 * node carries the role now (HOME_NAME in lib/schema-brand.ts), so the string
 * is gone rather than left as a second positioning anything could pick up.
 */

/**
 * The job description, written as what he does rather than as a title. No
 * title is used anywhere on these three pages: a title invites the reader to
 * bucket the person, and the whole positioning is that the buckets overlap.
 */
export const DOING =
  'Working at the intersection of technology and business: AI, digital commerce and the systems that connect them.';

/** The idea the whole site hangs off. */
export const CORE_IDEA = 'Technology that creates business leverage.';

/**
 * Primary navigation. One list, rendered by the one header on every route.
 *
 * Five destinations and one action. It used to be three, from the days when
 * the header linked only to the personal-brand set; the homepage carried a
 * sixth, entirely separate bar whose five links were in-page anchors to its own
 * sections, so "About" meant a section on the homepage and a page everywhere
 * else. Every item here is a real, indexed route, which is what lets the same
 * bar ship on every page and what makes a click a navigation rather than a
 * scroll.
 *
 * "Thinking" was the old label for /insights/; the header and the footer both say
 * Insights now, because the page itself is titled Insights and a label that
 * disagrees with its destination costs a reader a click to work out.
 *
 * /insights/ is the indexed path carrying the article history. Renaming it to
 * /thinking/ would move eight ranking URLs to buy a nicer slug, which is a bad
 * trade.
 */
export const NAV = [
  { label: 'About', href: '/about/' },
  { label: 'Expertise', href: '/expertise/' },
  { label: 'Work', href: '/work/' },
  { label: 'Experience', href: '/experience/' },
  { label: 'Insights', href: '/insights/' },
] as const;

export const CTA_LABEL = "Let's talk";

/* ═══════════════════════════════════════════════════════════════
   01 — HERO
   ═══════════════════════════════════════════════════════════════ */

export const HERO = {
  eyebrowName: NAME,
  eyebrowPositioning: POSITIONING,
  /**
   * The one H1. Four authored lines rather than two, which is what lets the
   * type be genuinely oversized: the longest line is eleven characters, so it
   * can be set at 90px in a half-width column instead of 48px. Each line
   * reveals out of its own mask, which is why they arrive as separate strings.
   *
   * `accent` marks the single word carrying the red. One per headline: two
   * accented words in a sentence and neither one is emphasis any more.
   */
  headline: [
    { text: 'I build with' },
    { text: 'technology.' },
    { text: 'I think in' },
    { text: 'business.', accent: true },
  ] as const,
  /** The secondary statement, set as three beats under the headline. */
  statement: ['AI.', 'Commerce.', 'Transformation.'] as const,
  lede:
    'I explore the technologies, systems and ideas shaping how modern businesses operate, sell and grow.',
  ctaPrimary: { label: 'Explore my work', href: '/work/' },
  ctaSecondary: { label: 'Read my thinking', href: '/insights/' },
  /**
   * The credibility line, and the only number in the hero.
   *
   * Nine years, measured from the first Magento role in June 2016. Yuvraj
   * settled this on 26 Aug 2026 against his own record; the earlier 12+ was
   * measured from the first websites in 2014, which is a broader claim than he
   * wants to make. The note carries the start date, because a figure without
   * one is the kind of number nobody can check.
   */
  credibility: { value: '9+', label: 'Years in technology', note: 'Since the first Magento role in 2016.' },
} as const;

/* ═══════════════════════════════════════════════════════════════
   02 — THE POSITION

   Yuvraj's own words, carried over verbatim from the previous site. This is
   the one statement on the page that is a belief rather than a description,
   and it is set as the whole section for exactly that reason.
   ═══════════════════════════════════════════════════════════════ */

export const STATEMENT = {
  headline: ['Technology should move', { text: 'the business forward.', accent: true }] as const,
  body:
    'Technology is valuable when it creates leverage: better decisions, stronger customer experiences, faster operations and sustainable growth. Not because it is possible, and not because it is new.',
} as const;

/* ═══════════════════════════════════════════════════════════════
   03 — WHERE TECHNOLOGY MEETS BUSINESS

   Four areas of thought. Deliberately not four services: no price, no
   deliverable, no "get started". What each one lists is the set of subjects
   inside it, which is what an area of thought has instead of a scope of work.
   ═══════════════════════════════════════════════════════════════ */

export interface ThoughtArea {
  num: string;
  title: string;
  /** One line on why the area exists, in business terms rather than technical ones. */
  premise: string;
  subjects: readonly string[];
}

export const THOUGHT_INTRO = {
  headline: ['Where technology', 'meets business.'] as const,
  body:
    'Four subjects, and the reason each one earns attention. They overlap on purpose: a commerce decision is an architecture decision before it is a platform decision, and an AI decision is a process decision before it is a model decision.',
} as const;

export const THOUGHT_AREAS: ThoughtArea[] = [
  {
    num: '01',
    title: 'AI & LLMs',
    premise:
      'Where language models stop being a demo and start being infrastructure: grounded in real data, scoped to real tasks, and checked by a person before anything consequential happens.',
    subjects: ['LLMs', 'AI Agents', 'RAG', 'MCP', 'Generative AI', 'Automation'],
  },
  {
    num: '02',
    title: 'Digital commerce',
    premise:
      'The platform is rarely the problem. It is where the problem becomes visible, usually as a catalogue, a checkout or an architecture that has outgrown the decision behind it.',
    subjects: ['Shopify', 'Magento', 'WooCommerce', 'Headless Commerce', 'AI Search', 'CRO'],
  },
  {
    num: '03',
    title: 'Business transformation',
    premise:
      'Most transformation programmes are process work wearing a technology budget. The sequence that holds is the other way round: fix the process, then choose the system that carries it.',
    subjects: ['Automation', 'Systems', 'Operations', 'Data', 'Technology strategy'],
  },
  {
    num: '04',
    title: 'Future technology',
    premise:
      'What an AI-first business actually looks like from the inside, and which parts of that are already buildable rather than still a slide.',
    subjects: [
      'AI-first businesses',
      'Intelligent systems',
      'Emerging technology',
      'The future of commerce',
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════
   04 — WHAT I AM LEARNING NOW

   Framed as study, not as expertise, and the framing is load-bearing. Nothing
   in this section claims delivery, a certification or a client engagement,
   because none of that is in the record for these subjects. What is claimed is
   attention, which is both true and, for a personal brand, the more useful
   thing to be able to demonstrate.
   ═══════════════════════════════════════════════════════════════ */

export interface Track {
  id: string;
  title: string;
  /** What the study is actually about, in one line. */
  focus: string;
  items: readonly string[];
}

export const LEARNING_INTRO = {
  headline: ["What I'm", 'learning now.'] as const,
  body:
    'Four tracks I am reading, building against and forming opinions about. Listed as study rather than as service, because that is what they are: none of these carries a published engagement yet, and saying so is cheaper than implying otherwise.',
  cta: { label: 'Explore my thinking', href: '/insights/' },
} as const;

export const TRACKS: Track[] = [
  {
    id: 'llms',
    title: 'LLMs',
    focus:
      'How the frontier models actually differ once you are past the benchmark table: context handling, instruction following, and what each one costs to run at volume.',
    items: ['GPT', 'Claude', 'Gemini', 'Open models'],
  },
  {
    id: 'agents',
    title: 'AI Agents',
    focus:
      'Agents that do bounded work against real systems. The interesting part is not autonomy, it is the tool boundary and the checkpoint where a person still signs off.',
    items: ['Tool calling', 'MCP', 'Planning loops', 'Human checkpoints'],
  },
  {
    id: 'engineering',
    title: 'AI Engineering',
    focus:
      'The unglamorous half: retrieval that returns the right passage, evaluation you can trust, and grounding that stops a fluent answer from being a confident wrong one.',
    items: ['RAG', 'Retrieval', 'Evaluation', 'Grounding'],
  },
  {
    id: 'commerce',
    title: 'AI Commerce',
    focus:
      'Where AI meets a catalogue and an order book. Search that understands intent, enrichment that survives review, and recommendations built on behaviour rather than on vibes.',
    items: ['AI search', 'Recommendations', 'Personalization', 'Catalogue enrichment'],
  },
];

/* ═══════════════════════════════════════════════════════════════
   05 — THE COMMERCE SYSTEM

   Eight entries, framed as decisions rather than as an offer. Each line says
   what choosing that thing buys you, which is the only framing under which a
   list of platforms is useful to a business reader: the alternative is a logo
   wall that tells them nothing they did not already know.
   ═══════════════════════════════════════════════════════════════ */

export interface CommerceNode {
  label: string;
  /** What the decision buys. Not a feature list. */
  decision: string;
}

export const COMMERCE_INTRO = {
  headline: ['The future of commerce', { text: 'is intelligent.', accent: true }] as const,
  body:
    'Eight decisions, not eight services. Each one is a trade you make on purpose, and each one is wrong for somebody: the useful half of knowing a platform is knowing who should not be on it.',
} as const;

export const COMMERCE_NODES: CommerceNode[] = [
  { label: 'Shopify', decision: 'Speed to market and operational simplicity.' },
  { label: 'Magento', decision: 'Complex commerce, scale and flexibility.' },
  { label: 'WooCommerce', decision: 'Content-led commerce and WordPress ecosystems.' },
  { label: 'Headless', decision: 'Experience, performance and architecture.' },
  { label: 'AI Search', decision: 'Discovery, intent and conversational shopping.' },
  { label: 'Checkout', decision: 'Friction, trust and conversion.' },
  { label: 'Customer experience', decision: 'Personalization and journey design.' },
  { label: 'Retention', decision: 'Experience, data and lifetime value.' },
];

/* ═══════════════════════════════════════════════════════════════
   06 — POINT OF VIEW

   Five positions. Each is an argument with a turn in it: a claim, then the
   correction. A position without the second half is a slogan.

   `href` is present only where an article actually argues the position out.
   Three of the five have one; two do not, and they are unlinked rather than
   pointed at a route that does not exist. A placeholder link is a 404 in the
   internal link graph and a dead end for a reader who trusted it.
   ═══════════════════════════════════════════════════════════════ */

export interface Position {
  claim: string;
  turn: string;
  href?: string;
  cta?: string;
}

export const POV_INTRO = {
  headline: ['My point', 'of view.'] as const,
  body: 'Five positions I will defend, and the reasoning that gets me to each one.',
} as const;

export const POSITIONS: Position[] = [
  {
    claim: "AI isn't replacing businesses.",
    turn: "It's replacing inefficient ways of working.",
    href: '/insights/ai-ecommerce-revenue-2025/',
    cta: 'Where AI actually pays in commerce',
  },
  {
    claim: "Shopify vs Magento isn't a platform debate.",
    turn: "It's a business architecture decision.",
    href: '/insights/shopify-plus-vs-magento2-2025/',
    cta: 'The full platform comparison, by business model',
  },
  {
    claim: "The next evolution of search isn't only ranking.",
    turn: "It's being the answer a model recommends.",
  },
  {
    claim: 'A beautiful store means nothing',
    turn: 'if the customer journey is broken.',
    href: '/insights/cro-double-conversion/',
    cta: 'What the conversion work actually changes',
  },
  {
    claim: "Most companies don't have an AI problem.",
    turn: 'They have a process problem.',
  },
];

/* ═══════════════════════════════════════════════════════════════
   07 — THE EVOLUTION

   The progression the brief asks for: web, commerce, Magento, Shopify,
   headless, transformation, AI. Every date and every claim is from the
   employment record in lib/site.ts.

   Employer names are present where they are the evidence, but they are not
   the headline of any entry. The headline is the shift in what the work was,
   which is the actual subject: this is a story about how the thinking changed,
   and a list of logos does not tell it.
   ═══════════════════════════════════════════════════════════════ */

export interface Era {
  year: string;
  shift: string;
  body: string;
}

export const EVOLUTION_INTRO = {
  headline: ['Built through', 'years of change.'] as const,
  body:
    'Seven shifts, each one forced by a problem the previous way of working could not hold. The technology on the left changed roughly every three years. What it was for did not.',
} as const;

export const ERAS: Era[] = [
  {
    year: '2010',
    shift: 'Web',
    body:
      'Six years of formal study in information technology: a diploma from 2010, a degree from 2013. The point at which this stopped being a hobby.',
  },
  {
    year: '2014',
    shift: 'Commerce',
    body:
      'The first websites and online stores. Building for other people, and discovering that the interesting problems were never the ones on the page.',
  },
  {
    year: '2016',
    shift: 'Magento',
    body:
      'Magento module development and store builds, professionally, from 2016. The platform that turns a catalogue into an architecture problem, which is the lesson that has stayed useful longest.',
  },
  {
    year: '2018',
    shift: 'Shopify & scale',
    body:
      'Shopify storefronts for consumer brands, then commerce builds for Saudi retail across grocery, commercial kitchen equipment and fashion. Two very different answers to the same question about where complexity should live.',
  },
  {
    year: '2020',
    shift: 'Headless & performance',
    body:
      'Headless frontends over REST and GraphQL, and high-traffic B2B commerce: 90% of order and quote processing automated, page load times cut by 60% through Varnish, Redis, full-page cache and database tuning.',
  },
  {
    year: '2023',
    shift: 'Transformation',
    body:
      'Architecture direction across 12+ multi-store Magento 2 platforms carrying 500K+ SKUs and 1M+ monthly users, with five-level approval workflows for development, B2B orders, quotes and vendor management. The work stopped being code and became process.',
  },
  {
    year: 'Now',
    shift: 'AI',
    body:
      'Where the process work leads. Retrieval, agents and automation aimed at the parts of a commerce operation that absorb people who should be doing something else.',
  },
];

/* ═══════════════════════════════════════════════════════════════
   08 — SELECTED WORK

   Six engagements. `challenge` and `approach` restate what the record says
   about each build, in the language of the problem rather than the language
   of the deliverable. Neither invents a constraint, a metric or a client
   requirement that is not already in the summary and the stack.

   `outcome` is present on exactly one. The manufacturer platform is the only
   engagement with a published measured result, and five rows carrying a
   plausible percentage would cost more credibility than the one real figure
   buys. WORK_NOTE below says that out loud rather than leaving a reader to
   wonder why the column is thin.
   ═══════════════════════════════════════════════════════════════ */

/** Filter facets, in the order the toolbar renders them. */
export const WORK_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'ecommerce', label: 'eCommerce' },
  { id: 'shopify', label: 'Shopify' },
  { id: 'magento', label: 'Magento' },
  { id: 'headless', label: 'Headless' },
  { id: 'ai', label: 'AI' },
  { id: 'transformation', label: 'Digital transformation' },
] as const;

export type WorkFilter = (typeof WORK_FILTERS)[number]['id'];

export interface CaseStudy {
  id: string;
  num: string;
  name: string;
  industry: string;
  challenge: string;
  approach: string;
  technology: readonly string[];
  outcome?: string;
  facets: readonly WorkFilter[];
  /**
   * The pages this build actually used, for the case-study page.
   *
   * Authored per case rather than derived from `technology`, because the tags
   * are display labels and a guess from them would eventually link a build to a
   * platform it never ran on. Every href must resolve: these are checked
   * against KNOWN_ROUTES in lib/platform-services.ts at build time.
   */
  related: readonly Anchor[];
  /** Article slugs, matching keys in lib/posts.ts. */
  posts: readonly string[];
  img: string;
  alt: string;
  imgW: number;
  imgH: number;
}

export const WORK_INTRO = {
  headline: ['Real work.', 'Real systems.'] as const,
  body:
    'Six builds, and the decision inside each one. Read them as case studies in technology and business thinking rather than as a portfolio: the interesting part of every one of these was the choice made before the code.',
  cta: { label: 'View all work', href: '/work/' },
} as const;

export const CASES: CaseStudy[] = [
  {
    id: 'fashion-d2c',
    num: '01',
    name: 'Headless fashion storefront',
    industry: 'Fashion retail · D2C',
    challenge:
      'A fast-growing fashion brand whose storefront had to keep getting faster while the catalogue and the traffic behind it kept moving.',
    approach:
      'Headless architecture: the storefront decoupled from the commerce engine and served over a storefront API. Front-end releases stop waiting on back-end ones, and performance becomes a budget the front end can actually hold rather than an outcome it inherits.',
    technology: ['Headless', 'Storefront API', 'Performance'],
    related: [
      { href: '/headless-commerce/', label: 'Headless commerce, and when decoupling actually pays' },
      { href: '/headless-commerce/architecture/', label: 'The rendering and caching decisions behind a build like this' },
      { href: '/headless-commerce/optimization/', label: 'Storefront performance once the front end is decoupled' },
      { href: '/nextjs/', label: 'Next.js, and the rendering decisions a build like this turns on' },
    ],
    posts: ['shopify-headless-nextjs-guide', 'magento2-pwa-studio-headless'],
    facets: ['ecommerce', 'headless'],
    img: '/assets/case-covers/fashion-d2c-cover.webp',
    alt: 'The Fashion D2C storefront headless commerce storefront, a mens fashion brand',
    imgW: 1920,
    imgH: 1290,
  },
  {
    id: 'plant-store',
    num: '02',
    name: 'Online plant store',
    industry: 'Horticulture · D2C',
    challenge:
      'An online plant store selling a product that is fragile, seasonal and hard to photograph, to customers who abandon at any friction in the buy.',
    approach:
      'Shopify, chosen for speed to market rather than for flexibility, with the customisation spent where it converts: OTP login, a one-page checkout through GoKwik, and product pages built for a catalogue that does not behave like apparel.',
    technology: ['Shopify', 'GoKwik checkout', 'Custom PDP', 'OTP login'],
    related: [
      { href: '/shopify/', label: 'Shopify and Shopify Plus, and where the platform stops' },
      { href: '/shopify/optimization/', label: 'Shopify speed and conversion work' },
      { href: '/shopify/integrations/', label: 'Shopify integrations, where a checkout like this is wired in' },
    ],
    posts: ['cro-double-conversion'],
    facets: ['ecommerce', 'shopify'],
    img: '/assets/case-covers/plant-store-cover.webp',
    alt: 'The Online plant store Shopify storefront, an online plant store',
    imgW: 1920,
    imgH: 1280,
  },
  {
    id: 'sports-nutrition',
    num: '03',
    name: 'Sports nutrition store',
    industry: 'Health & fitness · Retail',
    challenge:
      'Sports nutrition is a category where authenticity is the purchase decision and delivery speed is the repeat one. The storefront has to carry both.',
    approach:
      'A commerce build organised around catalogue clarity and a short checkout, on the principle that in a trust-led category the product page is doing the selling and everything after it should get out of the way.',
    technology: ['Commerce build', 'Catalogue', 'Checkout'],
    related: [
      { href: '/shopify/', label: 'Shopify and Shopify Plus, and where the platform stops' },
      { href: '/shopify/optimization/', label: 'Product page and checkout conversion work' },
      { href: '/expertise/ecommerce-management/', label: 'Running the catalogue as an operation afterwards' },
    ],
    posts: ['cro-double-conversion'],
    facets: ['ecommerce'],
    img: '/assets/case-covers/sports-nutrition-cover.webp',
    alt: 'The Sports nutrition store storefront, an online sports nutrition retailer',
    imgW: 1920,
    imgH: 1047,
  },
  {
    id: 'b2b-procurement',
    num: '04',
    name: 'Procurement and approvals platform',
    industry: 'B2B procurement · Platform',
    challenge:
      'B2B buying is not a cart. It is a request, a quote, an approval chain and a budget holder, and a consumer checkout models none of that.',
    approach:
      'A custom procurement platform built around the approval structure rather than around the catalogue: purchase requests, quotes and multi-level sign-off with role-based permissions, wired into the systems that already held the order data.',
    technology: ['B2B workflows', 'Approvals', 'Role-based permissions', 'Integrations'],
    related: [
      { href: '/magento/', label: 'Magento, for quotes, approvals and multi-store complexity' },
      { href: '/magento/integrations/', label: 'Magento B2B workflow and integration boundaries' },
      { href: '/ai-automation/', label: 'AI automation for quotes, approvals and reconciliation' },
    ],
    posts: ['ai-ecommerce-revenue-2025'],
    facets: ['ecommerce', 'transformation'],
    img: '/assets/case-covers/b2b-procurement-cover.webp',
    alt: 'A B2B procurement platform, built on Magento 2',
    imgW: 1920,
    imgH: 1080,
  },
  {
    id: 'marketplace',
    num: '05',
    name: 'Multi-category marketplace',
    industry: 'Multi-category retail · Marketplace',
    challenge:
      'A wide multi-category catalogue, which is the point at which catalogue size stops being a number and starts being an architecture problem.',
    approach:
      'Magento 2, which is the right answer precisely here and the wrong one for a small single-store catalogue: the platform earns its complexity when the category tree, the attribute model and the scale are all genuinely hard.',
    technology: ['Magento 2', 'Multi-category', 'Scale'],
    related: [
      { href: '/magento/', label: 'Magento, built for catalogue and workflow complexity' },
      { href: '/magento/performance/', label: 'Magento performance at catalogue scale' },
      { href: '/magento/consulting/', label: 'The data model decisions a catalogue this wide depends on' },
    ],
    posts: ['magento2-seo-technical-audit', 'magento2-checkout-optimization'],
    facets: ['ecommerce', 'magento'],
    img: '/assets/case-covers/marketplace-cover.webp',
    alt: 'The Multi-category marketplace Magento 2 multi-category marketplace',
    imgW: 1920,
    imgH: 1440,
  },
  {
    id: 'manufacturing',
    num: '06',
    name: 'Engineering manufacturer platform',
    industry: 'Manufacturing · Engineering',
    challenge:
      'An engineering manufacturer whose buyers research for months and never fill in a form, on a site that search could not read.',
    approach:
      'A brand platform built for discovery rather than for transaction: technical content structured so a crawler and a buyer can both follow it, and an enquiry path short enough to survive a long consideration cycle.',
    technology: ['Web platform', 'Technical SEO', 'Content'],
    outcome: '3x traffic growth and 45% better engagement',
    related: [
      { href: '/wordpress/', label: 'WordPress builds, performance and infrastructure' },
      { href: '/wordpress/consulting/', label: 'The content model a discovery-led site depends on' },
      { href: '/wordpress/optimization/', label: 'WordPress speed work, beyond a caching plugin' },
    ],
    posts: ['magento2-seo-technical-audit'],
    facets: ['transformation'],
    img: '/assets/case-covers/manufacturing-cover.webp',
    alt: 'The Engineering manufacturer platform engineering brand platform',
    imgW: 1920,
    imgH: 867,
  },
];

/**
 * Said on the Work page, in the reader's line of sight rather than in a
 * footnote. The absence of a logo wall and of five more percentages is a
 * decision, and a decision that is not explained reads as a gap.
 */
export const WORK_NOTE = {
  headline: ['What is missing', 'from this page.'] as const,
  body:
    'No client logo wall, no invented percentages, and no testimonials. One of the six has a published measured result and it is the only one showing a number. The other five say what was built and stop there, which is less impressive and considerably more useful.',
  note:
    'The same rule governs the filters. There is no published AI case study with a measured outcome yet, so selecting that facet returns nothing rather than returning something reframed to fill it.',
} as const;

/* ═══════════════════════════════════════════════════════════════
   09 — CURRENT ATTENTION

   The section that keeps the site current. Four states of engagement, from
   reading about something to building with it, which is a more honest ladder
   than four claims of expertise.
   ═══════════════════════════════════════════════════════════════ */

export interface Attention {
  state: string;
  subject: string;
  detail: string;
}

export const ATTENTION_INTRO = {
  headline: ['What has my attention', 'right now.'] as const,
} as const;

export const ATTENTION: Attention[] = [
  {
    state: 'Learning',
    subject: 'AI agents & MCP',
    detail:
      'Specifically the tool boundary: what an agent is allowed to call, and who approves the call that costs money.',
  },
  {
    state: 'Exploring',
    subject: 'AI search',
    detail:
      'What discovery looks like when the query is a sentence and the answer is a recommendation rather than a results page.',
  },
  {
    state: 'Building',
    subject: 'Intelligent commerce systems',
    detail:
      'Retrieval and enrichment wired into a catalogue that already carries order volume, with review kept in the loop.',
  },
  {
    state: 'Thinking about',
    subject: 'AI-first businesses',
    detail:
      'What an operation designed around models from the start does differently from one that added them afterwards.',
  },
];

/* ═══════════════════════════════════════════════════════════════
   10 — THINKING OUT LOUD

   Built from lib/posts.ts, so a new article appears here without anyone
   editing this file. Six, newest first.
   ═══════════════════════════════════════════════════════════════ */

export interface WritingItem {
  slug: string;
  category: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
}

export const WRITING_INTRO = {
  headline: ['Thinking', 'out loud.'] as const,
  body:
    'Long-form technical writing on the subjects above. Written to be useful to someone with the problem, which is a harder brief than written to rank.',
  cta: { label: 'All writing', href: '/insights/' },
} as const;

/** Newest first, by the date string the post record carries. */
export const WRITING: WritingItem[] = Object.entries(POSTS)
  .map(([slug, p]) => ({
    slug,
    category: p.cat,
    title: p.title,
    summary: p.excerpt,
    date: p.date,
    readTime: p.readTime,
  }))
  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
  .slice(0, 6);

/* ═══════════════════════════════════════════════════════════════
   CLOSING — every page ends here
   ═══════════════════════════════════════════════════════════════ */

export const CLOSING = {
  headline: ['What are you', { text: 'building next?', accent: true }] as const,
  lines: [
    'A better commerce experience?',
    'An AI-powered workflow?',
    'A new digital product?',
    'Or a smarter way to operate?',
  ] as const,
  signoff: NAME,
} as const;

export const ABOUT_CLOSING = {
  headline: ['What should we', { text: 'build next?', accent: true }] as const,
  body:
    'If any of the above is the conversation you are already having internally, it is probably worth having out loud.',
} as const;
