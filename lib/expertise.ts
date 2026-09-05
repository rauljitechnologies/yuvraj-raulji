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
      {
        href: '/ecommerce-audit/',
        label: 'the technical audit, if the problem needs diagnosing first',
        note: 'A fixed-scope review with a written, prioritised output.',
      },
      { href: '/digital-transformation/', label: 'digital transformation and legacy replatforming', note: 'When the answer is a programme rather than a project.' },
      { href: '/magento/', label: 'Magento 2 and Adobe Commerce consulting', note: 'Where the shortlist lands for multi-store and B2B.' },
      {
        href: '/magento/consulting/',
        label: 'Magento consulting, once the shortlist has narrowed to it',
        note: 'The data model and scope decisions that come next, and are hard to reverse.',
      },
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

  /* ── 02 ────────────────────────────────────────────────────────
     Website management.

     This page is the collapse of five briefed URLs into one:
     /expertise/management/, /web-management/, /technology-management/,
     /website-management/ and /website-maintenance/ all described the same
     service under different words, and the brief's own rule is that a page
     exists only when the search intent is distinct. Approved as two pages on
     5 Sep 2026, this being the site-side one.

     The boundary that matters is not against those five, which no longer
     exist. It is against the four platform maintenance pages that do:
     /magento/maintenance/, /shopify/maintenance/, /woocommerce/maintenance/
     and /wordpress/maintenance/. Those are the arrangement on one platform.
     This is the arrangement when the estate is more than one thing and nobody
     owns the whole of it, and it is written to send a single-platform reader
     down to the platform page rather than to compete with it.
     ─────────────────────────────────────────────────────────────── */
  {
    slug: 'website-management',
    cta: 'Discuss ongoing ownership',
    label: 'Website Management',
    num: '02',
    h1: ['Someone has to own', 'the whole estate.'],
    title: 'Website Management Services | Yuvraj Raulji',
    description:
      'Ongoing technical ownership across a web estate: release discipline, patch cadence, monitoring, hosting and the decisions nobody currently makes.',
    eyebrow: 'Ongoing ownership',
    lede:
      'Most website problems are not technical failures. They are ownership failures: nobody decides when to update, nobody watches the thing that fails quietly, and the person who knows how to deploy is on holiday. Management is the arrangement that makes those decisions somebody\'s job before they become an incident.',
    what: [
      'Website management is continuous technical ownership of a site or an estate of sites: keeping versions current, applying security releases on a cadence rather than on alarm, monitoring the parts that fail without announcing themselves, holding a deployment path more than one person can run, and making the small architectural decisions that otherwise wait until they are expensive.',
      'It is not a ticket queue, and the difference matters commercially. A support arrangement answers what has already broken. Management is the work that reduces how often that happens, which is why a good engagement should make its own ticket volume fall rather than justify itself by how many tickets it closes.',
      'The goal is to hand it back. Documentation, runbooks and enough transfer that an internal team can hold it. An arrangement that quietly makes itself indispensable has become a commercial arrangement rather than a technical one.',
    ],
    problems: [
      {
        symptom: 'Only one person can deploy',
        body:
          'Releases wait on an individual and their holiday is a business risk. It also means the deployment path is undocumented, so the first time anyone else runs it will be during an incident.',
      },
      {
        symptom: 'Updates are deferred because the last one broke something',
        body:
          'The gap grows, each update gets larger, and the security exposure compounds. Eventually the update is a project, which is exactly what deferring was meant to avoid.',
      },
      {
        symptom: 'Problems are reported by customers first',
        body:
          'A failed cron, a stalled queue, a form that stopped delivering. Uptime monitoring says the homepage answered, which was never the risk. By the time support hears about it the recovery includes an apology.',
      },
      {
        symptom: 'Nobody owns the estate, only the pieces',
        body:
          'A marketing site on one stack, a store on another, a landing page somebody built for a campaign. Each has an owner and the whole has none, so anything that spans them is nobody\'s job.',
      },
    ],
    signals: [
      'More than one site or stack, and no single technical owner',
      'A deployment that depends on one person being available',
      'Security releases applied late, in batches, or not at all',
      'Backups that exist and have never been restored',
      'Recurring incidents that each get fixed and never get prevented',
    ],
    wrong:
      'This is the wrong engagement when everything runs on one platform and the work is genuinely that platform\'s upkeep. A single Magento store needs a patch cadence and a rehearsal environment, not an estate-level arrangement, and the platform maintenance pages describe that better and cost less. It is also wrong where there is an internal team that already has the discipline and simply needs capacity, which is a hiring question rather than a consulting one.',
    approach: [
      {
        num: '01',
        title: 'Establish what exists',
        body:
          'Every site, stack, host, domain and certificate, who holds each one, and where the knowledge lives. On an inherited estate this alone is usually the first accurate picture anyone has had.',
      },
      {
        num: '02',
        title: 'Make releases repeatable',
        body:
          'A deployment path more than one person can run, with the same steps in staging and production. Removing the single point of failure is normally the highest-value week of the whole arrangement.',
      },
      {
        num: '03',
        title: 'Set a cadence',
        body:
          'Security releases promptly, everything else on a schedule agreed in advance rather than when something forces it. Cadence is what keeps each update small enough that nobody is tempted to defer it.',
      },
      {
        num: '04',
        title: 'Monitor what actually fails',
        body:
          'Queues, crons, integration boundaries, form delivery, certificate expiry and error rates, alerting a person rather than a log file. Then backups, restored on a schedule to prove they work.',
      },
      {
        num: '05',
        title: 'Hand it back',
        body:
          'Runbooks, documentation and transfer. The measure of the engagement is whether the internal team could hold it without you, not whether they still need you.',
      },
    ],
    stack: [
      'Deployment pipelines',
      'Staging parity',
      'Security patching',
      'Uptime and error monitoring',
      'Backup and restore testing',
      'DNS and certificates',
      'AWS provisioning',
      'Nginx and PHP-FPM',
      'Cloudflare',
    ],
    cases: ['manufacturing', 'b2b-procurement'],
    posts: ['aws-magento2-server-setup', 'magento2-seo-technical-audit'],
    related: [
      {
        href: '/expertise/ecommerce-management/',
        label: 'eCommerce management, for the store rather than the stack',
        note: 'Catalogue, merchandising and trading operations, which is a different job and a different buyer.',
      },
      {
        href: '/magento/maintenance/',
        label: 'Magento support and maintenance, when the estate is one Magento store',
        note: 'Patch cadence and release discipline on the platform that needs it most.',
      },
      {
        href: '/wordpress/maintenance/',
        label: 'WordPress maintenance, when the estate is one WordPress site',
        note: 'Core, plugins, hardening and tested backups.',
      },
      {
        href: '/shopify/maintenance/',
        label: 'Shopify maintenance, where the platform carries more of it',
        note: 'Theme, apps and integrations, since Shopify owns the platform layer.',
      },
      {
        href: '/expertise/ecommerce-consulting/',
        label: 'eCommerce consulting, when the recurring problem is structural',
        note: 'Some maintenance load is a symptom of the architecture rather than a workload.',
      },
      {
        href: '/hire/',
        label: 'How engagements work, including the ongoing shape',
        note: 'What retained ownership actually looks like, and what it deliberately is not.',
      },
    ],
    faqs: [
      {
        q: 'What is the difference between website management and support?',
        a: 'Support is reactive and answers what has already broken. Management is the work that reduces how often that happens: patching, release discipline, monitoring and the ownership decisions nobody is currently making. Buying only support is why some estates have a monthly invoice and a monthly incident.',
      },
      {
        q: 'We only have one website. Do we need this?',
        a: 'Probably not. One site on one platform is better served by that platform\'s own maintenance arrangement, which is narrower and cheaper. This page is for an estate where more than one thing runs, or where the technical decisions span the sites and nobody currently owns them.',
      },
      {
        q: 'Is managed hosting the same thing?',
        a: 'No. Managed hosting covers the server, and often core updates and backups, which is a genuine foundation. It does not own your plugin or extension list, test an update against your checkout, notice that a form stopped delivering, or decide when to upgrade. Those are the failures that actually cost money.',
      },
      {
        q: 'Do you replace our developers?',
        a: 'No, and an arrangement that tried to would be the wrong one. Where there is an internal team, what is usually missing is the routine rather than the capability: a cadence, a staging step, a restore test and an owner for the list. That can be set up and handed over.',
      },
      {
        q: 'How do we know it is working?',
        a: 'Incident count and severity fall, updates stop being events, and a release does not depend on one person being reachable. If the engagement is measured by tickets closed rather than by incidents that did not happen, it is being measured backwards.',
      },
    ],
  },

  /* ── 03 ────────────────────────────────────────────────────────
     eCommerce management.

     The second half of the collapsed cluster, and the one that survives on
     its own merits: store operations is a genuinely different buyer from
     technical upkeep. A merchandiser asking why a collection is not selling
     and a technology lead asking why deploys wait on one person are not the
     same person and do not search the same thing.

     Its boundary runs against /expertise/website-management/ above, and it is
     stated on both pages: this one is the trading operation, that one is the
     stack underneath it.
     ─────────────────────────────────────────────────────────────── */
  {
    slug: 'ecommerce-management',
    cta: 'Discuss store operations',
    label: 'eCommerce Management',
    num: '03',
    h1: ['A store is an operation,', 'not a project that ended.'],
    title: 'eCommerce Management Services | Yuvraj Raulji',
    description:
      'Running an online store as an operation: catalogue and merchandising, pricing and promotions, order and stock accuracy, reporting and the trading rhythm.',
    eyebrow: 'Store operations',
    lede:
      'Most stores are launched and then run by whoever has time. Catalogue quality drifts, promotions are set up by hand under deadline, stock accuracy is maintained by someone checking twice, and the reporting nobody trusts gets ignored. eCommerce management is treating the store as a trading operation with a rhythm, rather than as a project that finished.',
    what: [
      'eCommerce management is the ongoing work of running a store commercially: keeping the catalogue accurate and merchandisable, setting up pricing and promotions without breaking the rules underneath them, keeping stock and order data honest across the systems that touch it, and producing reporting a decision can be made on.',
      'It sits above the platform and below the marketing. It is not campaign management and it is not technical upkeep. It is the layer where a decision to run a promotion becomes correct product data, working price rules, accurate stock and an order flow that does not need a person to intervene.',
      'On most stores the largest available gain here is removing manual correction. A team that checks stock twice, re-keys orders, or fixes attribute data by hand is spending its week on work the system should be doing, and that cost never appears as a line item because it is somebody\'s job.',
    ],
    problems: [
      {
        symptom: 'The catalogue is accurate only where someone recently looked',
        body:
          'Attributes are incomplete, categories overlap, and the same product exists twice under different names. Filters return the wrong things, search fails on products you stock, and nobody trusts a report broken down by category.',
      },
      {
        symptom: 'Promotions are built by hand every time',
        body:
          'Each campaign is a set of manual price changes made under deadline, and each one is a chance to publish the wrong price. The rollback is equally manual, which is why some promotions quietly run for longer than intended.',
      },
      {
        symptom: 'Stock is checked twice because it is not trusted',
        body:
          'Oversells, cancellations and a support routine built around distrust of the platform. The manual check has become the process and its cost is invisible, because nobody logs it as a ticket.',
      },
      {
        symptom: 'The reporting is ignored',
        body:
          'Numbers from the platform, the analytics tool and the accounting system disagree, so meetings argue about the data rather than deciding anything. The usual outcome is that all three get ignored and decisions are made on instinct.',
      },
    ],
    signals: [
      'Merchandising changes wait on a developer',
      'A person re-keys orders or corrects stock as part of their week',
      'Promotions are set up manually and rolled back manually',
      'Product data quality varies by whoever added the product',
      'Two systems report different revenue and nobody has reconciled them',
    ],
    wrong:
      'This is the wrong engagement while the store is still being built, or while the platform itself is the constraint. A catalogue that cannot be merchandised because the attribute model is wrong needs the data model fixed first, and no amount of operational rhythm compensates for a platform the business has genuinely outgrown. It is also wrong for a business that wants campaigns run: that is marketing, and it is a different discipline with different people.',
    approach: [
      {
        num: '01',
        title: 'Read the trading week',
        body:
          'What actually happens, who does it, and how long it takes. The manual corrections are the interesting part, because they are invisible in every system and they are usually the largest single cost.',
      },
      {
        num: '02',
        title: 'Fix the catalogue foundation',
        body:
          'Attribute completeness, category structure, naming and duplicates. Everything downstream, filtering, search, reporting and recommendations, is a function of this, and it is the step most often skipped in favour of the visible ones.',
      },
      {
        num: '03',
        title: 'Make pricing and promotions rule-based',
        body:
          'Expressed as rules in the platform with a start, an end and a rollback, rather than as manual edits. The point is not speed, it is that a promotion cannot outlive its intended window by accident.',
      },
      {
        num: '04',
        title: 'Make the data honest',
        body:
          'One source of truth per field across the platform, the ERP and the fulfilment system, with reconciliation on a schedule so drift is found by a job rather than by a customer.',
      },
      {
        num: '05',
        title: 'Set a rhythm and hand it over',
        body:
          'A weekly and monthly operating cadence, the few reports worth reading, and documentation the team can run without you. A store that needs an external party present to trade has not been improved.',
      },
    ],
    stack: [
      'Catalogue and attribute modelling',
      'Merchandising and collections',
      'Pricing and promotion rules',
      'Stock and inventory accuracy',
      'Order and fulfilment flow',
      'PIM and ERP boundaries',
      'GA4 and event reporting',
      'Mixpanel',
    ],
    cases: ['marketplace', 'sports-nutrition', 'plant-store'],
    posts: ['cro-double-conversion', 'ai-ecommerce-revenue-2025'],
    related: [
      {
        href: '/expertise/website-management/',
        label: 'Website management, for the stack rather than the store',
        note: 'Releases, patching, monitoring and hosting, which is a different job and a different owner.',
      },
      {
        href: '/expertise/ecommerce-consulting/',
        label: 'eCommerce consulting, when the platform itself is the constraint',
        note: 'Operational rhythm cannot compensate for a platform the business has outgrown.',
      },
      {
        href: '/ai-commerce/',
        label: 'AI for catalogue enrichment and operations',
        note: 'Where catalogue work stops being something a person does by hand.',
      },
      {
        href: '/mixpanel/',
        label: 'Mixpanel, for reporting a decision can be made on',
        note: 'The tracking plan behind numbers a meeting will actually act on.',
      },
      {
        href: '/magento/integrations/',
        label: 'Magento integration boundaries, where stock accuracy is decided',
        note: 'A source of truth per field is what stops the manual correction rota.',
      },
      {
        href: '/shopify/optimization/',
        label: 'Shopify store optimisation, on the commercial side',
        note: 'Where merchandising and conversion work meet.',
      },
    ],
    faqs: [
      {
        q: 'What is eCommerce management?',
        a: 'It is the ongoing commercial operation of a store: catalogue and merchandising quality, pricing and promotion rules, stock and order accuracy, and reporting that supports a decision. It sits above the platform and below marketing, and it is the layer where a commercial decision becomes correct data and working rules.',
      },
      {
        q: 'How is this different from website management?',
        a: 'Website management is the stack: releases, patching, monitoring, hosting. This is the trading operation: what is in the catalogue, what it costs, whether the stock number is true and whether the reporting can be trusted. Different work, different owner, and usually a different person asking for it.',
      },
      {
        q: 'Is this the same as running our marketing?',
        a: 'No. Campaigns, channels and creative are marketing. This is the operation the campaigns land on: if a promotion is set up by hand and the stock figure is wrong, the campaign spends money to expose that. The two work together and they are not the same discipline.',
      },
      {
        q: 'Where does this usually start?',
        a: 'With the manual corrections. Whatever a person is doing by hand every week, re-keying orders, checking stock twice, fixing attributes, is both the clearest cost and the fastest thing to remove. It is also the work nobody has ever counted, because it is somebody\'s job rather than a line item.',
      },
      {
        q: 'Do you need access to our platform?',
        a: 'For the assessment, read access to the catalogue, orders and reporting is enough. Anything that changes pricing, stock or customer data is agreed explicitly and made through the platform\'s own rules rather than by direct edits, so every change is reversible and visible to your team.',
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
