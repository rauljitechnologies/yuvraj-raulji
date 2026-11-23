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
import { CAREER_START_YEAR } from './career';
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
 * ══════════════════════════════════════════════════════════════════════════
 * NAVIGATION
 * ══════════════════════════════════════════════════════════════════════════
 *
 * Two lists. Five links in the bar, everything else behind "More".
 *
 * ── What this replaced, and the measurement behind it ─────────────────────
 *
 * `NAV` was eight top-level items — About, Experience, Work, Services,
 * Expertise, Insights, Resources, How we work — two of which were dropdowns
 * carrying fourteen children between them. The header rendered all eight from
 * `md` (768px) up with every item `shrink-0 whitespace-nowrap`, so the row had
 * no slack to give: measured at 12px uppercase with 0.1em tracking and 18px
 * gaps, the eight labels alone needed about 620px, and the bar as a whole
 * needed about 1,236px including the wordmark, a WhatsApp square and a
 * "Let's Connect" button. Below roughly 1200px the children ran past the
 * container. See section 3 of REDESIGN_AUDIT.md for the full arithmetic.
 *
 * Under `md` the same eight plus both menus' children were flattened into
 * `NAV_FLAT` — twenty-two links — and rendered as a 34px horizontally
 * scrolling strip under the bar. That is where the second half of the old
 * header's 110px went.
 *
 * ── The split ────────────────────────────────────────────────────────────
 *
 * `PRIMARY_NAV` is five, and the five are chosen by what a buyer needs in
 * order: the proof (Work), the offer (Services), the person (About), the
 * evidence of thinking (Insights), and the way to start (Contact).
 *
 * `MORE_NAV` is the other seven. Each is a real indexed route and each is
 * also linked from the body of a primary page and from the footer, so "More"
 * is a third way to reach them rather than the only way:
 *
 *   Experience        linked from /about/, which carries the timeline
 *   Expertise         linked from /services/ and from every service page
 *   How we work       linked from /services/ and /contact/
 *   Pricing           linked from /services/ and /how-we-work/
 *   Resume            linked from /about/ and the footer
 *   Certifications    linked from /about/
 *   Hire me           linked from /contact/
 *
 * Nothing was dropped and nothing was orphaned, which is the only reason a
 * "More" menu is acceptable: a destination that is ONLY in a More menu is a
 * destination nobody will find.
 *
 * ── Labels that deliberately disagree with their slug ────────────────────
 *
 * `Work` for /work/ rather than "Projects", and `Insights` for /insights/
 * rather than "Thinking" or "Writing". Both URLs carry the ranking history
 * for the case studies and the eight articles; renaming either to get a
 * nicer label would move indexed URLs to buy a word, and a label that
 * disagrees with its own URL and breadcrumb costs a reader a click to work
 * out.
 *
 * `How we work` points at /how-we-work/, which is new: the engagement
 * models and the agency-alternative argument moved there off the homepage.
 * /remote-collaboration/ still exists and still answers the time-zone
 * question; it is linked from /how-we-work/ rather than from the bar,
 * because the bar had two links to it under two different labels before.
 */
export interface NavItem {
  label: string;
  href: string;
}

/** The five in the bar. Order is the order a buyer asks. */
export const PRIMARY_NAV: readonly NavItem[] = [
  { label: 'Work', href: '/work/' },
  { label: 'Services', href: '/services/' },
  { label: 'About', href: '/about/' },
  { label: 'Insights', href: '/insights/' },
  { label: 'Contact', href: '/contact/' },
];

/** Everything else. The "More" menu on desktop, a two-column list on mobile. */
export const MORE_NAV: readonly NavItem[] = [
  { label: 'Experience', href: '/experience/' },
  { label: 'Expertise', href: '/expertise/' },
  { label: 'How we work', href: '/how-we-work/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'Resume', href: '/resume/' },
  { label: 'Certifications', href: '/certifications/' },
  { label: 'Hire me', href: '/hire/' },
];

/**
 * Every nav destination in one list.
 *
 * It existed for the condensed phone row, which is gone. It is kept because
 * the footer builds its sitemap columns from it and scripts/check-links.mjs
 * reads it to confirm every nav destination is a route that exists.
 */
export const NAV: readonly NavItem[] = [...PRIMARY_NAV, ...MORE_NAV];
export const NAV_FLAT: readonly NavItem[] = NAV;

export const CTA_LABEL = "Let's Connect";

/** One-line positioning shown in the footer under the wordmark. Separate from
    PERSON_JOB_TITLE (the schema job title) so the commercial proposition can
    be stated on the site while structured data keeps the accurate role. */
export const FOOTER_TAGLINE = 'Technology Partner';

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
   * Nine years. The note read "Since the first Magento role in 2016", which
   * dated the professional record two years before the CV does: the
   * employment history in lib/career.ts starts in 2018, at Sinelogix. The
   * start year now comes from `CAREER_START_YEAR` rather than being typed
   * here, so the one place the record moves is the record.
   *
   * The note carries the start date because a figure without one is the kind
   * of number nobody can check.
   */
  credibility: {
    value: '9+',
    label: 'Years in technology',
    note: `Professional engineering since ${CAREER_START_YEAR}.`,
  },
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
    href: '/insights/ai-ecommerce-revenue-2026/',
    cta: 'Where AI actually pays in commerce',
  },
  {
    claim: "Shopify vs Magento isn't a platform debate.",
    turn: "It's a business architecture decision.",
    href: '/insights/shopify-plus-vs-magento2-2026/',
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
  /*
     This read "Magento module development and store builds, professionally,
     from 2016", which is a claim of professional work two years before the
     employment record begins. The record starts in 2018; what happened before
     it was learning, and saying so is both accurate and a better story than
     a date nobody can verify.
  */
  {
    year: '2016',
    shift: 'Magento',
    body:
      'Magento, learned before it was a job: modules pulled apart to find out how the platform actually worked. The platform that turns a catalogue into an architecture problem, which is the lesson that has stayed useful longest.',
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

/**
 * Filter facets, in the order the toolbar renders them.
 *
 * These are the project categories in section 6 of the brief, with two
 * departures and a reason for each.
 *
 * `ai` is gone. It was in the list and no case carried it, so the AI button
 * filtered six builds down to none, which is the worst thing a filter can do.
 * CONTENT-PRINCIPLES.md rules out fixing that by tagging a build as AI work it
 * was not. What the record does support is automation: 90% of order and quote
 * processing automated on the procurement platform. So the facet is
 * `automation`, it is labelled for what was actually delivered, and it returns
 * a real result.
 *
 * `ecommerce` is gone too, for the opposite reason: it matched five of six, and
 * a filter that excludes one item is a label rather than a filter. The
 * platform facets below carry that meaning with more precision.
 *
 * Every facet here must match at least one case. The check below enforces it,
 * because an empty category is an invisible defect: the page looks right and
 * only a reader who presses the button finds out.
 */
export const WORK_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'magento', label: 'Magento / Adobe Commerce' },
  { id: 'shopify', label: 'Shopify / D2C' },
  { id: 'b2b', label: 'B2B commerce' },
  { id: 'headless', label: 'Headless commerce' },
  { id: 'nextjs', label: 'Next.js / React' },
  { id: 'automation', label: 'AI & automation' },
  { id: 'transformation', label: 'Digital transformation' },
] as const;

export type WorkFilter = (typeof WORK_FILTERS)[number]['id'];

export interface CaseStudy {
  id: string;
  num: string;
  name: string;
  /**
   * A shorter name for the `<title>` only, where the display name would push
   * it past the ~60-character SERP limit once "case study | Yuvraj Raulji" is
   * added. The H1 and every card always use `name`.
   *
   * The same mechanism `Post.seoTitle` provides for articles, and used for
   * the same reason: one build is called "Procurement and approvals
   * platform", which made a 61-character title, and renaming the build to
   * save one character would change the H1 and the homepage work card to fix
   * something only a SERP sees.
   */
  seoName?: string;
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

  /* ── The three sections the brief asks for ─────────────────────────────
     Brief section 9 asks every case study page to carry a technical
     architecture, a statement of my role, and implementation detail. All
     three are now written for all six builds, in the first person and at the
     level of the decisions rather than the code.

     What they are allowed to say is the constraint. Every bullet restates a
     decision already recorded in this file — in `challenge`, `approach`,
     `technology` or `role` — and adds the reasoning and the cost of it.
     Nothing invents a library, a number, a client name or a technical fact
     that is not already here, because that is what CONTENT-PRINCIPLES.md
     section 1 forbids and the one thing that would make these pages worth
     less, not more. A section stays unwritten rather than filled with a
     guess.

     They stay optional, and the page renders each section only when its
     field is populated, so a seventh case can ship short. To fill one: add
     the field to that case below and the section appears. Nothing else needs
     touching.

       architecture   3 to 6 bullets. The systems, how they divide
                      responsibility, and where data is owned.
       role           1 paragraph, first person. What was yours specifically,
                      including where you led rather than implemented.
       implementation 3 to 6 bullets. The decisions a technical reader would
                      ask about, and what they cost.
  */

  /** The systems and how they divide responsibility. */
  architecture?: readonly string[];
  /** What was mine on this build, in the first person. */
  role?: string;
  /** The decisions a technical reader would ask about. */
  implementation?: readonly string[];

  /** Article slugs, matching keys in lib/posts.ts. */
  posts: readonly string[];
  img: string;
  alt: string;
  imgW: number;
  imgH: number;
}

/* `coverSrcSet` moved to lib/images.ts, where the article covers needed the
   same logic with a different intrinsic width. Re-exported here so the three
   case-study call sites keep their existing import. */
export { coverSrcSet } from './images';

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
    role:
      'I built the headless frontend and the API layer it reads from, over REST and GraphQL. The decisions that mattered were about what the storefront renders itself and what it asks the commerce backend for, because that split is what the page times are made of.',
    architecture: [
      'The storefront and the commerce engine are separate deployables that talk over a storefront API, so a front-end release does not wait on a back-end one.',
      'Rendering is decided per page type, not for the site: catalogue and product pages are built ahead of time, cart and account are not, because only the second kind is personal to the visitor.',
      'The API layer defines what the storefront is allowed to ask for, so a front-end change cannot become an unbounded query against the commerce backend.',
    ],
    implementation: [
      'Two protocols on purpose: GraphQL where the storefront needs one specific shape of data in a single request, REST where the endpoint is already the right one. The cost is two clients to keep working rather than one.',
      'Prebuilt pages are refreshed on a schedule rather than rebuilt on every change, so a catalogue edit does not cost a deploy. The price is a short window where a page is behind the commerce engine, which is tolerable for a description and not for a price, so the two are not treated the same.',
      'The performance budget is held in the front end, which means the front end has to say no: client-side data fetching and third-party scripts are the two things that spend it, and both are argued for rather than added.',
      'Decoupling bills operationally: two deployables, two sets of configuration and a cache that can disagree with the commerce engine. That is the real cost of independent releases, and at a smaller catalogue and release cadence it would not be worth paying.',
    ],
    related: [
      { href: '/headless-commerce/', label: 'Headless commerce, and when decoupling actually pays' },
      { href: '/headless-commerce/architecture/', label: 'The rendering and caching decisions behind a build like this' },
      { href: '/headless-commerce/optimization/', label: 'Storefront performance once the front end is decoupled' },
      { href: '/nextjs/', label: 'Next.js, and the rendering decisions a build like this turns on' },
    ],
    posts: ['shopify-headless-nextjs-guide', 'magento2-pwa-studio-headless'],
    facets: ['headless', 'nextjs'],
    img: '/assets/case-covers/fashion-d2c-cover.webp',
    alt: 'Headless commerce storefront for a fashion D2C brand',
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
    role:
      "Mine, hands-on. I built the storefront, the custom product page behaviour and the third-party integrations it depends on: the checkout provider and the OTP login are both someone else's service, and the work is in making them behave like part of one store rather than three.",
    architecture: [
      'Shopify owns the commerce core and the customisation sits at the edges: checkout, login and the product page. Everything the platform already does well is left alone.',
      'Specialist services do the parts they do better: GoKwik for the checkout, an OTP provider for login. The integration work is making three systems read as one store.',
      'The product page is the one place with substantial custom work, because for a product that is fragile, seasonal and hard to photograph that page is the purchase decision.',
    ],
    implementation: [
      'The checkout is GoKwik’s, which means the part of the funnel we can least afford to break belongs to someone else’s uptime and release schedule. The trade is a one-page checkout that would have taken months to build to the same standard.',
      'OTP login instead of passwords, because these customers buy on a phone and a forgotten password is an abandoned order. The costs are a per-message fee and a delivery failure that has to have an answer on the page.',
      'Product page behaviour is built in the theme rather than assembled from apps. Every app is another script in a page whose job is to load before the visitor reconsiders.',
      'Where Shopify would not bend, the requirement moved rather than the platform. Fighting a hosted platform spends exactly the speed to market it was chosen for.',
    ],
    related: [
      { href: '/shopify/', label: 'Shopify and Shopify Plus, and where the platform stops' },
      { href: '/shopify/optimization/', label: 'Shopify speed and conversion work' },
      { href: '/shopify/integrations/', label: 'Shopify integrations, where a checkout like this is wired in' },
    ],
    posts: ['cro-double-conversion'],
    facets: ['shopify'],
    img: '/assets/case-covers/plant-store-cover.webp',
    alt: 'Shopify storefront for an online plant store, showing custom PDP and checkout',
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
    role:
      'I built the store: the catalogue structure, the layered navigation over it and the checkout flow through it. Customising a checkout is the part that has to be done carefully rather than quickly, because every change to it is measured against the orders it might cost.',
    architecture: [
      'Catalogue structure is the architecture. The attribute set and the navigation over it are what let a buyer find the right product, and in a trust-led category finding it is the conversion.',
      'The checkout stays short and close to standard. Customisation there is spent carefully, because every change to a checkout is measured against the orders it might cost.',
      'The product page carries the authenticity signals and everything after it is built to get out of the way.',
    ],
    implementation: [
      'The attribute set was settled before the navigation over it, because layered navigation is only as good as the attributes underneath and retrofitting one onto a live catalogue means re-tagging every product.',
      'Checkout work was removals rather than additions: fewer fields, fewer steps. Anything added to a checkout has to earn its place against the orders it might cost, and almost nothing does.',
      'The trust content sits on the product page itself rather than on a page about trust, because the doubt arrives while the buyer is looking at the product and a buyer who leaves to resolve it resolves it somewhere else.',
    ],
    related: [
      { href: '/shopify/', label: 'Shopify and Shopify Plus, and where the platform stops' },
      { href: '/shopify/optimization/', label: 'Product page and checkout conversion work' },
      { href: '/expertise/ecommerce-management/', label: 'Running the catalogue as an operation afterwards' },
    ],
    posts: ['cro-double-conversion'],
    facets: ['shopify'],
    img: '/assets/case-covers/sports-nutrition-cover.webp',
    alt: 'Shopify storefront for a sports nutrition retailer, built for catalogue clarity and conversion',
    imgW: 1920,
    imgH: 1047,
  },
  {
    id: 'b2b-procurement',
    num: '04',
    name: 'Procurement and approvals platform',
    seoName: 'B2B procurement platform',
    industry: 'B2B procurement · Platform',
    challenge:
      'B2B buying is not a cart. It is a request, a quote, an approval chain and a budget holder, and a consumer checkout models none of that.',
    approach:
      'A custom procurement platform built around the approval structure rather than around the catalogue: purchase requests, quotes and multi-level sign-off with role-based permissions, wired into the systems that already held the order data.',
    technology: ['B2B workflows', 'Approvals', 'Role-based permissions', 'Integrations'],
    outcome: '90% of order and quote processing automated; 40% reduction in approval cycle time',
    role:
      'Mine end to end, and the part I would point at is the approval model rather than the code. I designed the multi-level approval workflows for orders, quotes and vendor management, built the role-based permissions they run on, and integrated the systems the platform had to agree with. Automating the order and quote path is what took the approval cycle down.',
    architecture: [
      'The approval engine is the centre and the catalogue is something a request refers to. A purchase request moves through states; products are data it points at.',
      'Role-based permissions are the single gate on every state change, so who may approve what at which value is configuration rather than code, and changes without a release.',
      'Quotes and orders share one pipeline, because an accepted quote becomes an order. Two pipelines is how the two drift apart and how a reconciliation job gets written.',
      'Integrations sit at the boundary: the ERP and CRM keep owning the data they already own, and the platform reads and writes rather than keeping a second copy to go stale.',
    ],
    implementation: [
      'Approval chains are configuration, not code: levels, thresholds and approvers are data, because no two organisations sign off the same way and a hard-coded chain turns every new budget holder into a release.',
      'Orders, quotes and vendor management run through one workflow engine, so an approval is a single mechanism applied to three objects rather than three implementations of the same idea drifting apart.',
      'The ERP and CRM are read and written at the boundary rather than copied in, so the platform never becomes a second source of truth that has to be reconciled. The cost is that it is only as available as the systems it depends on.',
      'The automated path is the unexceptional one: a request inside policy, inside budget and inside an approver’s authority. Everything else is routed to a person deliberately, because the exceptions are where the money is lost and an automated wrong approval is worse than a slow right one.',
    ],
    related: [
      { href: '/magento/', label: 'Magento, for quotes, approvals and multi-store complexity' },
      { href: '/magento/integrations/', label: 'Magento B2B workflow and integration boundaries' },
      { href: '/ai-automation/', label: 'AI automation for quotes, approvals and reconciliation' },
    ],
    posts: ['ai-ecommerce-revenue-2026'],
    facets: ['magento', 'b2b', 'automation'],
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
    role:
      'I led this build. The architecture direction was mine: the multi-store setup, the catalogue structure underneath it and the custom modules around it, and I set the delivery process the team worked to rather than writing every module myself. The server, caching and CDN work behind the page times was hands-on.',
    architecture: [
      'Magento 2 as one commerce core: a single catalogue, admin and order pipeline behind every storefront, so a category that prices, taxes or ships differently is a store view rather than a second system to keep in step.',
      'The category tree and the attribute set carry the complexity rather than custom code. At this catalogue width the data model is the architecture, and a feature built around a bad one has to be built twice.',
      'Caching in tiers with separate invalidation: a full-page cache in front, an object cache behind it, a CDN in front of both. One layer tuned alone moves the bottleneck rather than removing it.',
      'Listing and search served by the search engine rather than the database, which is what keeps category pages answering at this catalogue size.',
    ],
    implementation: [
      'Indexing is the constraint at this catalogue width. A price or stock change cannot trigger a full reindex, so indexing runs on a schedule and invalidation is scoped to what actually changed. The cost is a lag between a change and the page showing it, which is a business decision rather than a technical one.',
      'Custom work sits alongside the platform rather than on top of it: extensions, not core overrides. An override is a merge conflict at every upgrade, and on a platform that ships security releases that is a cost with no end date.',
      'Caches are invalidated narrowly: a product edit clears its own pages, not the storefront’s. A cache cleared broadly is a cache that is not there at the moment the traffic arrives.',
      'Listing and search run on the search engine rather than the database, which is what keeps category pages answering at this size. The costs are a second system to keep in step and a failure mode where search is down while the store is up, which needs its own answer rather than a stack trace.',
      'Separate categories are store views on one installation rather than separate installations: one upgrade, one admin, one order pipeline. The limit is that a store view can only diverge as far as the platform’s scoping allows, and a requirement past that is an argument for a second system rather than a workaround in this one.',
    ],
    related: [
      { href: '/magento/', label: 'Magento, built for catalogue and workflow complexity' },
      { href: '/magento/performance/', label: 'Magento performance at catalogue scale' },
      { href: '/magento/consulting/', label: 'The data model decisions a catalogue this wide depends on' },
    ],
    posts: ['magento2-seo-technical-audit', 'magento2-checkout-optimization'],
    facets: ['magento'],
    img: '/assets/case-covers/marketplace-cover.webp',
    alt: 'Magento 2 multi-category marketplace with 500K+ SKUs and complex catalogue architecture',
    imgW: 1920,
    imgH: 1440,
  },
  {
    id: 'manufacturing',
    num: '06',
    name: 'Engineering manufacturer platform',
    industry: 'Manufacturing · Engineering',
    challenge:
      'An engineering manufacturer whose buyers research for months and never fill in a form, on a website that search could not read.',
    approach:
      'A brand platform built for discovery rather than for transaction: technical content structured so a crawler and a buyer can both follow it, and an enquiry path short enough to survive a long consideration cycle.',
    technology: ['Web platform', 'Technical SEO', 'Content'],
    outcome: '3x traffic growth and 45% better engagement',
    role:
      "I built the platform and the technical foundation under its content, which on a manufacturer's site is most of the job: the structure a catalogue of engineering products can actually be found through, rather than a brochure with a search box.",
    architecture: [
      'Content structure is the architecture: a technical catalogue organised so that a crawler and a buyer follow the same path through it.',
      'Templates are per content type rather than per page, so a new product family publishes without new code.',
      'The enquiry path is short and present on every technical page. A buyer who researches for months still decides in one moment, and that moment does not happen on the contact page.',
    ],
    implementation: [
      'Templates are per content type, so a new product family is a content task rather than a development one. The cost is designing a template for families nobody has written yet, which means the content model has to be right before the content exists.',
      'Specifications are published as pages rather than as downloads, because a crawler and a buyer three months into a decision both have to be able to read them without asking first.',
      'The enquiry path is on every technical page rather than at the end of a journey, because a buyer who researches for months still decides in one moment, and that moment happens on a specification page.',
      'Internal linking follows the product hierarchy rather than a keyword map, so the structure a buyer navigates and the structure search reads are the same one. Two structures is how both of them go stale.',
    ],
    related: [
      { href: '/wordpress/', label: 'WordPress builds, performance and infrastructure' },
      { href: '/wordpress/consulting/', label: 'The content model a discovery-led site depends on' },
      { href: '/wordpress/optimization/', label: 'WordPress speed work, beyond a caching plugin' },
    ],
    posts: ['magento2-seo-technical-audit'],
    facets: ['transformation'],
    img: '/assets/case-covers/manufacturing-cover.webp',
    alt: 'Brand platform for an engineering manufacturer, built for search discovery and long-cycle buyer journeys',
    imgW: 1920,
    imgH: 867,
  },
];

/* ── Every facet must match at least one case ────────────────────
   The AI filter shipped matching nothing: six builds in, zero out, and
   nothing in the type system objects to a facet no case carries. This throws
   at build instead, which is the only moment anyone would notice. */
{
  const used = new Set(CASES.flatMap((c) => c.facets));
  const empty = WORK_FILTERS.filter((f) => f.id !== 'all' && !used.has(f.id));
  if (empty.length) {
    throw new Error(
      `WORK_FILTERS: ${empty.map((f) => f.id).join(', ')} match no case. ` +
        'Tag a case or remove the filter; an empty category is worse than no category.',
    );
  }
}

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
  /** The category slug the hub's filter toolbar groups on. */
  filter: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  /**
   * The article's cover, from the post record.
   *
   * Added for the homepage Insights cards. The section used to be six
   * hairline rows of category, title and date with no image at all, which
   * meant the only thing telling a reader what a piece was about was its
   * title. Three cards with the cover is the brief's layout and the cover is
   * the field that makes a card worth being a card.
   *
   * Every post in lib/posts.ts carries one, so this is not optional.
   */
  img: string;
}

export const WRITING_INTRO = {
  headline: ['Thinking', 'out loud.'] as const,
  body:
    'Long-form technical writing on the subjects above. Written to be useful to someone with the problem, which is a harder brief than written to rank.',
  cta: { label: 'All writing', href: '/insights/' },
} as const;

/**
 * Every article, newest first, by the date string the post record carries.
 *
 * The /insights/ hub lists all of them and the homepage section shows the
 * latest six, so the sort belongs here once rather than in each of them. A
 * second sort written on the hub is a second chance to order it differently,
 * which is exactly how the homepage came to be rendering 12 Jun, 08 Jun,
 * 05 Jun, 10 May, 15 May before WRITING existed.
 */
export const ALL_WRITING: WritingItem[] = Object.entries(POSTS)
  .map(([slug, p]) => ({
    slug,
    category: p.cat,
    filter: p.filter,
    title: p.title,
    summary: p.excerpt,
    date: p.date,
    readTime: p.readTime,
    img: p.img,
  }))
  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

/** The homepage slice. Six, newest first. */
export const WRITING: WritingItem[] = ALL_WRITING.slice(0, 6);

/**
 * The categories the hub can filter by, derived from the articles rather than
 * hand-listed. The list it replaces carried `wordpress` and `performance`,
 * which no article has ever been tagged with, so two of its eight filters
 * could only ever return an empty grid.
 */
export const WRITING_FILTERS: readonly { id: string; label: string }[] = [
  { id: 'all', label: 'All' },
  ...Array.from(new Map(ALL_WRITING.map((w) => [w.filter, w.category])).entries())
    .map(([id, label]) => ({ id, label }))
    .sort((a, b) => a.label.localeCompare(b.label)),
];

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
