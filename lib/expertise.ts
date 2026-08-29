/**
 * Content model for /expertise/ and the one pillar page beneath it.
 *
 * Provenance rule (CONTENT-PRINCIPLES.md §1): every factual claim below is
 * either already in lib/site.ts as verified employment record, already in
 * lib/home.ts, or an opinion in Yuvraj's own voice. Nothing is inferred and no
 * outcome is attached to an engagement the record does not measure.
 *
 * Two things this file will not do, and both are deliberate:
 *
 *   - No client is named that the record does not already name publicly.
 *     Client and employer names are described rather than named, per section 4
 *     of BRAND-DESIGN-GUIDELINE.md. The rule used to be narrower, because naming a
 *     brand in marketing copy needs its permission and that permission has not
 *     been given.
 *   - No pillar claims a measured result it does not have. AI commerce is the
 *     thinnest delivery record on the site, so that page is written as a
 *     position rather than a portfolio, and says so.
 *
 * Every pillar carries a `wrong` line. CONTENT-PRINCIPLES §4: appearing to
 * recommend every technology for every business is what makes someone a vendor
 * rather than a strategist, and a buyer evaluating a platform decision reads
 * the refusals more carefully than the capabilities.
 *
 * Copy in this file avoids em-dashes on purpose.
 */

import { RAULJI_TECHNOLOGIES_URL } from './home';

/* ═══════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════ */

export interface PillarProblem {
  /** The symptom, phrased the way the person with the problem would phrase it. */
  symptom: string;
  body: string;
}

export interface PillarStep {
  num: string;
  title: string;
  body: string;
}

export interface PillarFaq {
  q: string;
  a: string;
}

/** A descriptive internal link. Generic anchors ("learn more") are banned. */
export interface Anchor {
  href: string;
  /** The anchor text itself. Says where the link goes and why. */
  label: string;
  /** Optional one-line context rendered beside the anchor. */
  note?: string;
}

export interface Pillar {
  slug: string;
  /** Nav and card label. Short. */
  label: string;
  /** Two-digit ordering marker. Sequence is the IA, not a ranking. */
  num: string;
  /** The single H1. Held as lines because each break does typographic work. */
  h1: readonly string[];
  /**
   * The call to action for this pillar, in its own words.
   *
   * Section 21 of BRAND-DESIGN-GUIDELINE.md asks for a contextual CTA per page
   * and says in as many words not to put a generic one everywhere; every
   * pillar used to render "Discuss a project" twice. Written in sentence case
   * because the button styling uppercases it.
   */
  cta: string;
  /** <title>. Kept under ~60 characters so it survives the SERP pixel budget. */
  title: string;
  /** Meta description. Kept under ~155 characters for the same reason. */
  description: string;
  /** Eyebrow above the H1. The discipline, not the job title. */
  eyebrow: string;
  /** One paragraph under the H1. */
  lede: string;
  /** What the discipline actually means, in two or three paragraphs. */
  what: readonly string[];
  /** Problems this solves. */
  problems: readonly PillarProblem[];
  /** Observable signals that a business has reached this. */
  signals: readonly string[];
  /** When this is the wrong call. Every pillar has one. */
  wrong: string;
  /** How Yuvraj approaches it. Ordered. */
  approach: readonly PillarStep[];
  /** Concrete platforms and tools, not adjectives. */
  stack: readonly string[];
  /** Case-study ids, matching WorkItem.id in lib/home.ts. */
  /**
   * Work item ids, resolved against WORK_ITEMS at render time. These carried
   * the client brand names until d00fd91 renamed every case study by what the
   * build actually was; this list was not renamed with them, so the resolver
   * dropped all six ids and Related work rendered empty on all seven pillar
   * pages. An id with no match is still dropped rather than printed as a
   * broken row, which is why it failed silently for as long as it did.
   */
  cases: readonly string[];
  /** Article slugs, matching keys in lib/posts.ts. */
  posts: readonly string[];
  /** Sibling pillars, with the anchor text written for each pairing. */
  related: readonly Anchor[];
  faqs: readonly PillarFaq[];
}

export const EXPERTISE_BASE = '/expertise';

export function pillarHref(slug: string): string {
  return `${EXPERTISE_BASE}/${slug}/`;
}

/* ═══════════════════════════════════════════════════════════════
   HUB
   ═══════════════════════════════════════════════════════════════ */

export const EXPERTISE_HUB = {
  title: 'Expertise | Yuvraj Raulji, eCommerce Consultant',
  description:
    'Nine technology pages plus eCommerce consulting: Shopify, Magento, WooCommerce, WordPress, headless commerce and AI. What each is, and when it is wrong.',
  eyebrow: 'Expertise',
  h1: ['Nine technologies.', 'And the situation', 'each one is wrong for.'] as const,
  lede:
    'Anyone can publish a service list. The useful half is knowing when not to reach for something, so every page below carries the case against itself alongside the case for it.',
  body:
    'Every page below answers the same four questions about one technology: what it is, who it suits, where it stops, and how AI extends it. They overlap on purpose, because a replatforming decision is an architecture question before it is a Magento question, and an AI project is usually a process question before it is a model question.',
} as const;

/* ═══════════════════════════════════════════════════════════════
   THE PILLARS
   ═══════════════════════════════════════════════════════════════ */

export const PILLARS: Pillar[] = [
  /* ── 01 ──────────────────────────────────────────────────────── */
  {
    slug: 'ecommerce-consulting',
    cta: 'Discuss a platform decision',
    label: 'eCommerce Consulting',
    num: '01',
    h1: ['eCommerce consulting', 'for decisions that', 'are hard to reverse.'],
    title: 'eCommerce Consulting | Yuvraj Raulji',
    description:
      'Independent eCommerce consulting: platform selection, build versus buy, phasing and technical due diligence, from nine years of Magento and Shopify builds.',
    eyebrow: 'eCommerce consulting',
    lede:
      'Most of the expensive mistakes in commerce are made in the first three weeks, before anyone writes code. Platform chosen before the sales process is understood, integrations scoped as an afterthought, a migration sequenced so the riskiest work lands in peak season.',
    what: [
      'Consulting here means the decisions above the build: which platform, built or bought, in what order, at what total cost, and what has to be true before any of it starts. It is deliberately separable from delivery. I have sat on both sides of that line for nine years, and the advice is more useful when it is not also a quote.',
      'The work usually starts as a technical due diligence. What is actually running, what it costs to change, where the data model is fighting the business, and which of the current problems are platform problems as opposed to process problems wearing a platform costume. That distinction decides almost everything that follows.',
      'The output is a plan a business can act on without me: a target architecture, a sequence, the integration boundaries, and an honest account of what each phase risks. Delivery can then run through my own practice or through an existing team, and the plan does not change either way.',
    ],
    problems: [
      {
        symptom: 'Nobody can agree which platform to move to',
        body: 'The debate is being held in the wrong order. Platform choice is downstream of how the business sells, approves, prices and fulfils. Establish those four and the shortlist usually resolves to one, occasionally two.',
      },
      {
        symptom: 'Growth has outrun the architecture',
        body: 'Catalogue size, order volume or storefront count has passed what the current setup was designed for. Everything still works, and every change now costs three times what it used to. That is the signal, and it arrives long before anything breaks.',
      },
      {
        symptom: 'A build quote arrived and nobody can evaluate it',
        body: 'Technical due diligence on a proposal: is the scope right, is the sequence safe, is the integration count realistic, and what is missing that will surface as a change request in month four.',
      },
      {
        symptom: 'The roadmap and the stack disagree',
        body: 'The commercial plan assumes capabilities the platform does not have, or the platform is carrying capacity the business will never use. Both are expensive; the second one is quieter.',
      },
    ],
    signals: [
      'A replatforming is being discussed and no one has written down the cutover plan',
      'Two vendors are proposing different platforms and both sound convincing',
      'Change requests cost more than the original build did',
      'The same integration keeps breaking and nobody owns the boundary',
      'A capability the roadmap depends on has no home in the current stack',
    ],
    wrong:
      'If the decision is already made and funded, and the constraint is delivery capacity rather than direction, consulting is an expensive way to buy hands. Hire the build instead.',
    approach: [
      {
        num: '01',
        title: 'Read the system before the brief',
        body: 'Catalogue shape, order flow, approval chains, integration map, hosting, cache layers, analytics. What the system is doing is usually different from what everyone believes it is doing, and the gap between those two is where the budget goes.',
      },
      {
        num: '02',
        title: 'Separate platform problems from process problems',
        body: 'A slow approval chain is not a Magento problem. A checkout losing people at the shipping step is rarely a theme problem. Naming this correctly saves more money than any technology choice on the list.',
      },
      {
        num: '03',
        title: 'Choose against constraints, not features',
        body: 'Every platform demos well. The question is which constraints you can live inside for three years: quote-driven pricing, multi-level approval, multi-store catalogue, per-market tax and fulfilment, and what each of those costs to bolt on when the platform did not ship with it.',
      },
      {
        num: '04',
        title: 'Sequence so trading continues',
        body: 'The risk in a migration is not the build, it is the cutover. URLs, redirects, order history, integrations, and the week either side. Sequenced properly, the store keeps trading throughout, and I have run migrations on that basis.',
      },
    ],
    stack: ['Platform selection', 'Technical due diligence', 'Integration design', 'Phasing', 'Total cost modelling'],
    cases: ['b2b-procurement', 'marketplace', 'fashion-d2c'],
    posts: ['shopify-plus-vs-magento2-2025', 'magento2-seo-technical-audit', 'cro-double-conversion'],
    related: [
      { href: '/digital-transformation/', label: 'digital transformation and legacy replatforming', note: 'When the answer is a programme rather than a project.' },
      { href: '/magento/', label: 'Magento 2 and Adobe Commerce consulting', note: 'Where the shortlist lands for multi-store and B2B.' },
      { href: '/shopify/', label: 'Shopify and Shopify Plus consulting', note: 'Where it lands when speed to market wins.' },
    ],
    faqs: [
      {
        q: 'Do you consult without doing the build?',
        a: 'Yes, and it is often the better arrangement. The advice is worth more when it is not also a quote. Where delivery is wanted afterwards it runs through my own practice, and the plan does not change depending on who executes it.',
      },
      {
        q: 'What does a technical due diligence cover?',
        a: 'The running system rather than the documentation: catalogue and data model, order and approval flow, integration boundaries, hosting and cache layers, measurement, and the change cost of the areas the roadmap depends on. The output names which current problems are platform problems and which are process problems.',
      },
      {
        q: 'Can you assess a proposal from another agency?',
        a: 'Yes. Scope completeness, sequencing risk, integration count, and what is missing that will arrive later as a change request. This is one of the shortest and most useful engagements on the list.',
      },
    ],
  },

];

export const PILLARS_BY_SLUG: Record<string, Pillar> = Object.fromEntries(
  PILLARS.map((p) => [p.slug, p]),
);

/** Footer and nav use this so a new pillar appears everywhere at once. */
export const PILLAR_LINKS = PILLARS.map((p) => ({
  label: p.label,
  href: pillarHref(p.slug),
}));

/** Delivery reference, re-exported so pillar pages need one import. */
export { RAULJI_TECHNOLOGIES_URL };
