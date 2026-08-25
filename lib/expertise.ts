/**
 * Content model for /expertise/ and the six pillar pages beneath it.
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
    'Six practice areas: eCommerce consulting, Magento 2, Shopify, headless commerce, AI commerce and digital transformation. What each is, and when it is wrong.',
  eyebrow: 'Expertise',
  h1: ['Six practice areas.', 'And the situation', 'each one is wrong for.'] as const,
  lede:
    'Anyone can publish a service list. The useful half is knowing when not to reach for something, so every page below carries the case against itself alongside the case for it.',
  body:
    'These are the six conversations that make up most of the work. They overlap on purpose: a replatforming decision is an architecture question before it is a Magento question, and an AI project is usually a process question before it is a model question.',
} as const;

/* ═══════════════════════════════════════════════════════════════
   THE SIX PILLARS
   ═══════════════════════════════════════════════════════════════ */

export const PILLARS: Pillar[] = [
  /* ── 01 ──────────────────────────────────────────────────────── */
  {
    slug: 'ecommerce-consulting',
    label: 'eCommerce Consulting',
    num: '01',
    h1: ['eCommerce consulting', 'for decisions that', 'are hard to reverse.'],
    title: 'eCommerce Consultant | Yuvraj Raulji',
    description:
      'Independent eCommerce consulting: platform selection, build versus buy, phasing and technical due diligence, from nine years inside Magento, Shopify and headless builds.',
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
    cases: ['nxtby', 'shopunicore', 'powerlook'],
    posts: ['shopify-plus-vs-magento2-2025', 'magento2-seo-technical-audit', 'cro-double-conversion'],
    related: [
      { href: pillarHref('digital-transformation'), label: 'digital transformation and legacy replatforming', note: 'When the answer is a programme rather than a project.' },
      { href: pillarHref('magento-2'), label: 'Magento 2 and Adobe Commerce consulting', note: 'Where the shortlist lands for multi-store and B2B.' },
      { href: pillarHref('shopify'), label: 'Shopify and Shopify Plus consulting', note: 'Where it lands when speed to market wins.' },
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

  /* ── 02 ──────────────────────────────────────────────────────── */
  {
    slug: 'magento-2',
    label: 'Magento 2 & Adobe Commerce',
    num: '02',
    h1: ['Magento 2', 'where the catalogue', 'is the hard part.'],
    title: 'Magento 2 Consultant & Adobe Commerce Expert | Yuvraj Raulji',
    description:
      'Magento 2 and Adobe Commerce consulting: multi-store catalogues at 500K+ SKUs, B2B approval workflows, performance engineering and migrations run without going offline.',
    eyebrow: 'Magento 2 & Adobe Commerce',
    lede:
      'Nine years on Magento, most of it on the awkward end: multi-store catalogues, five-level approval chains, and the ERP and PIM boundaries no theme setting will ever express.',
    what: [
      'Magento earns its cost in exactly one situation, and it is not the one it is usually sold into. It earns it when the catalogue, the pricing logic or the approval structure is genuinely complicated, and when that complication is the business rather than an accident of how the last system was built.',
      'On a high-traffic B2B commerce platform I led delivery of 12+ multi-store Magento 2 platforms handling 500K+ SKUs and 1M+ monthly users, and designed five-level approval workflows covering development, B2B orders, quotes and vendor management. Before that, Magento builds for Saudi retail groups across grocery, commercial kitchen equipment and fashion, with layered navigation, dynamic pricing and custom checkout flows.',
      'The performance half is not separable from the build. Magento at catalogue scale is a caching and query problem long before it is a front-end problem, which is why that work included cutting page load times by 60% through Varnish, Redis, full-page cache, CDN and database tuning, and running the platform on AWS EC2, RDS and S3 with load balancing and auto-scaling.',
    ],
    problems: [
      {
        symptom: 'The store is slow and nobody can say why',
        body: 'Time to first byte climbing, Core Web Vitals failing on real devices while the lab score looks fine. On Magento the cause is almost always below the front end: cache invalidation, a query plan, or an index doing a full scan.',
      },
      {
        symptom: 'Every B2B order needs a human, twice',
        body: 'Quotes, negotiated pricing and approval chains being run through email and a spreadsheet. Automating that took 90% of B2B order and quote processing off people and cut approval cycle time by 40%.',
      },
      {
        symptom: 'Multi-store has become multi-copy',
        body: 'Each storefront diverging until a change has to be made four times. The fix is in the store and website scope model and the attribute set design, and it is much cheaper before the fourth store than after it.',
      },
      {
        symptom: 'Search cannot find the catalogue',
        body: 'Crawl budget spent on faceted URLs, thin category pages, and product data structured so that neither a crawler nor a language model can make sense of it.',
      },
      {
        symptom: 'The ERP integration is the whole roadmap',
        body: 'Stock, price and order sync built as point-to-point scripts rather than a boundary. Every schema change on either side becomes an outage.',
      },
    ],
    signals: [
      'More than one storefront, or more than one currency, or both',
      'Pricing that varies by customer, contract or volume',
      'An approval step between the cart and the order',
      'A catalogue large enough that indexing time is a planning constraint',
      'An ERP or PIM that is the system of record for price and stock',
    ],
    wrong:
      'A single-store brand with two hundred SKUs and no custom workflow pays for Magento twice: once to build it, and again every month to keep it running. That business is better served on Shopify, and I will say so.',
    approach: [
      {
        num: '01',
        title: 'Model the catalogue before the theme',
        body: 'Attribute sets, store and website scope, price scope and inventory sources. These are the decisions that are almost impossible to reverse once real data is in, and the ones most often made by whoever set up the first storefront.',
      },
      {
        num: '02',
        title: 'Design the workflow as a first-class thing',
        body: 'Quote, approval, role and permission structures modelled explicitly rather than assembled from extensions. Five levels of approval is a data model, not a plugin.',
      },
      {
        num: '03',
        title: 'Build the cache layer with the build',
        body: 'Varnish, Redis, full-page cache and CDN configured as part of the architecture rather than added when the site gets slow. Cache invalidation designed at the same time, because that is the half that breaks.',
      },
      {
        num: '04',
        title: 'Measure on real devices',
        body: 'Core Web Vitals from field data, not a lab score. The number that pays is the one collected from the devices your customers actually hold.',
      },
    ],
    stack: ['Magento 2', 'Adobe Commerce', 'Custom modules', 'Multi-store', 'B2B workflows', 'GraphQL', 'Varnish & Redis', 'AWS EC2 / RDS / S3'],
    cases: ['shopunicore', 'nxtby'],
    posts: [
      'magento2-seo-technical-audit',
      'magento2-checkout-optimization',
      'aws-magento2-server-setup',
      'magento2-pwa-studio-headless',
      'shopify-plus-vs-magento2-2025',
    ],
    related: [
      { href: pillarHref('headless-commerce'), label: 'headless commerce architecture on Magento', note: 'Decoupling the storefront from the Magento release cycle.' },
      { href: pillarHref('shopify'), label: 'the case for Shopify instead', note: 'Read this before committing to Magento.' },
      { href: pillarHref('ecommerce-consulting'), label: 'eCommerce consulting and platform selection', note: 'If the platform decision is still open.' },
    ],
    faqs: [
      {
        q: 'How much Magento 2 experience is behind this?',
        a: 'Magento work since 2016, and Magento 2 specifically across three commerce teams since then. Most recently that has meant 12+ multi-store Magento 2 platforms carrying 500K+ SKUs and 1M+ monthly users, first as a senior developer and since 2023 as team leader setting architecture direction.',
      },
      {
        q: 'Is Adobe Commerce different from Magento 2 for this work?',
        a: 'Architecturally they are the same platform. The difference is what you get without building it: B2B modules, staging and preview, and the commercial support contract. Whether that is worth the licence depends entirely on whether you would otherwise build those pieces, which is a due diligence question rather than a preference.',
      },
      {
        q: 'Can you improve an existing Magento store rather than rebuild it?',
        a: 'Usually yes, and usually faster. Performance work, checkout optimisation and catalogue restructuring on a live store return value in weeks. A rebuild is justified when the data model itself is wrong, and that is rarer than it is proposed.',
      },
      {
        q: 'Do you handle Magento hosting and server setup?',
        a: 'Yes. Production Magento on AWS with EC2, RDS and S3, load balancing and auto-scaling, behind Nginx with Varnish and Redis. I have written up the full production setup, and that article is linked below.',
      },
    ],
  },

  /* ── 03 ──────────────────────────────────────────────────────── */
  {
    slug: 'shopify',
    label: 'Shopify & Shopify Plus',
    num: '03',
    h1: ['Shopify, where', 'the constraints', 'do useful work.'],
    title: 'Shopify Consultant & Shopify Plus Expert | Yuvraj Raulji',
    description:
      'Shopify and Shopify Plus consulting: speed to market as a strategy, checkout and PDP work, app architecture, and an honest account of where the platform stops fitting.',
    eyebrow: 'Shopify & Shopify Plus',
    lede:
      'Shopify is the right answer more often than platform debates admit. The interesting question is not whether it can do something, it is whether the thing you are about to build against it is worth the fight.',
    what: [
      'Shopify buys speed to market and takes away the parts of commerce nobody should be maintaining: PCI scope, checkout reliability, uptime, platform upgrades. On a brand-owned storefront that trade is close to free, which is why so much D2C work belongs here and not on an enterprise platform.',
      'The work is therefore mostly about restraint. Theme architecture that survives a redesign, a considered app list rather than an accumulated one, product pages built for the specific way this catalogue is browsed, and checkout customisation kept inside what the platform actually supports. On Future Roots that meant OTP login, a GoKwik one-page checkout and custom product pages, built for an Indian D2C audience buying live plants.',
      'My Shopify work goes back to 2018, building customised storefronts and third-party app integrations for consumer brands before the Magento years, and it has stayed in the practice since because a meaningful share of the businesses that ask about Magento should be on Shopify instead.',
    ],
    problems: [
      {
        symptom: 'Traffic is fine, conversion is not',
        body: 'The money leaves at the checkout, and almost never because of price. Every field is a question the customer has to agree to answer, and most carts are lost to hesitation rather than cost.',
      },
      {
        symptom: 'The theme has become unmaintainable',
        body: 'Six years of edits layered onto a purchased theme, with no section model and no way to change anything without changing everything. The rebuild is a theme architecture job, not a redesign.',
      },
      {
        symptom: 'The app bill is bigger than the development budget',
        body: 'Twenty apps, four of them doing the same job, three of them injecting script into every page. Consolidating this usually pays for itself in the first quarter, in both subscription and page weight.',
      },
      {
        symptom: 'The brand has outgrown the storefront',
        body: 'International expansion, wholesale, or a product configurator the theme cannot express. Some of this is Plus, some of it is headless, and some of it is a signal to leave the platform. Those are three different answers.',
      },
    ],
    signals: [
      'Speed to market matters more than platform flexibility',
      'A brand-owned D2C catalogue rather than a marketplace assortment',
      'Checkout reliability and PCI scope you would rather not own',
      'A team that will maintain the store themselves after launch',
      'A merchandising cadence measured in days, not quarters',
    ],
    wrong:
      'The moment the business needs quote-driven pricing and multi-level approvals, you stop building on the platform and start fighting it. That is the point to look at Magento, and the fight tends to start earlier than anyone plans for.',
    approach: [
      {
        num: '01',
        title: 'Fix the checkout before anything else',
        body: 'It is the highest-leverage surface on the store and the one most often left at its defaults. Field count, guest flow, address handling, payment order and the specific step where the funnel drops.',
      },
      {
        num: '02',
        title: 'Architect the theme for the second year',
        body: 'A section and block model that a merchandiser can use without a developer, so the store keeps moving after launch instead of accumulating one-off edits.',
      },
      {
        num: '03',
        title: 'Audit the app list as a dependency graph',
        body: 'What each app costs in subscription, in script weight, and in the coupling it creates. Several of them are usually replaceable with fifty lines of Liquid.',
      },
      {
        num: '04',
        title: 'Instrument it properly',
        body: 'GA4 commerce events and a deliberate dataLayer, so the conversion conversation is about what happened rather than what people think happened.',
      },
    ],
    stack: ['Shopify', 'Shopify Plus', 'Liquid', 'Checkout extensions', 'Storefront API', 'Hydrogen', 'GA4 & GTM'],
    cases: ['future-roots', 's3buy'],
    posts: ['shopify-plus-vs-magento2-2025', 'shopify-headless-nextjs-guide', 'cro-double-conversion'],
    related: [
      { href: pillarHref('magento-2'), label: 'Magento 2 for quote-driven and multi-store commerce', note: 'Where Shopify stops fitting.' },
      { href: pillarHref('headless-commerce'), label: 'headless commerce on the Shopify Storefront API', note: 'When the front end needs its own roadmap.' },
      { href: pillarHref('ai-commerce'), label: 'AI commerce, search and catalogue enrichment', note: 'The catalogue work that pays on a D2C store.' },
    ],
    faqs: [
      {
        q: 'Shopify Plus or standard Shopify?',
        a: 'Plus is worth it for checkout customisation, multiple stores under one organisation, higher API limits and the commercial terms at volume. Below that, standard Shopify plus a considered app list does the same job for less. The honest test is whether you have a specific checkout or multi-store requirement, not whether you have crossed a revenue threshold.',
      },
      {
        q: 'Should we move from Shopify to Magento?',
        a: 'Only if the business has developed quote-driven pricing, multi-level approvals, or catalogue and multi-store complexity that the platform genuinely cannot express. Wanting more control over the checkout is not on its own a reason to take on a Magento operating cost.',
      },
      {
        q: 'Can you migrate an existing store to Shopify?',
        a: 'Yes. The build is the straightforward half; the risk is in the cutover, which means URLs, redirects, order history and the integrations either side. Sequenced properly the store keeps trading throughout.',
      },
    ],
  },

  /* ── 04 ──────────────────────────────────────────────────────── */
  {
    slug: 'headless-commerce',
    label: 'Headless Commerce',
    num: '04',
    h1: ['Headless commerce,', 'and the honest', 'case against it.'],
    title: 'Headless Commerce Consultant & Architect | Yuvraj Raulji',
    description:
      'Headless and composable commerce on Next.js, GraphQL and the Storefront API. When decoupling pays, when it only adds a deployment surface, and how to sequence it.',
    eyebrow: 'Headless commerce',
    lede:
      'Headless is sold as a performance upgrade. It is really an organisational one: it decouples the storefront from the commerce release cycle so the front end stops waiting on back-end deployments. If that is not your bottleneck, it will not pay.',
    what: [
      'A headless build separates the storefront from the commerce platform, talking to it over an API instead of rendering from its templates. Next.js on the front, GraphQL or a Storefront API in between, the platform still doing catalogue, pricing, cart and order behind it.',
      'What that buys is independence. The front end gets its own roadmap, its own release cadence and its own performance budget, and a merchandising change stops being a platform deployment. What it costs is a second system: another build pipeline, another hosting surface, another place for state to be wrong, and a rendering and caching strategy somebody now has to own.',
      'I built my first headless frontends over REST and GraphQL for mobile and PWA, and the pattern has recurred since, most visibly in the Powerlook headless architecture. It is the right call more often at the large end than the small one, and the deciding factor is almost never the technology.',
    ],
    problems: [
      {
        symptom: 'Front-end work is queued behind platform releases',
        body: 'A copy change waits three weeks for a deployment window. This is the problem headless actually solves, and it is an organisational symptom rather than a technical one.',
      },
      {
        symptom: 'The storefront has to serve more than the store',
        body: 'Web, app, kiosk, marketplace feed, all needing the same catalogue and pricing. At that point the API boundary already exists in practice and is worth making explicit.',
      },
      {
        symptom: 'Performance has hit the template ceiling',
        body: 'Server-rendered platform templates carrying a decade of accumulated front-end. Sometimes the answer is a rewrite of the theme rather than a decoupling, and it is worth being honest about which.',
      },
      {
        symptom: 'The content stack and the commerce stack are fighting',
        body: 'Editorial in one system, catalogue in another, and every landing page a negotiation. Composable puts them side by side behind one front end rather than nesting one inside the other.',
      },
    ],
    signals: [
      'The front end has a roadmap of its own, with people assigned to it',
      'More than one consumer of the same catalogue and pricing',
      'A content team that needs to ship independently of platform releases',
      'A performance budget that the platform theme cannot meet',
      'The engineering capacity to own a second deployment surface, permanently',
    ],
    wrong:
      'If the front end has no independent roadmap, headless buys an extra deployment surface, an extra failure mode and nothing else. Most stores that ask for it want a faster theme, which is a much cheaper project.',
    approach: [
      {
        num: '01',
        title: 'Establish whether the bottleneck is real',
        body: 'How often does front-end work actually wait on a platform release, and for how long. If that number is small, the project is a theme rebuild and should be scoped as one.',
      },
      {
        num: '02',
        title: 'Draw the API boundary deliberately',
        body: 'What the storefront owns, what the platform owns, and where cart and session state live. Every ambiguity here becomes a bug that only appears under load.',
      },
      {
        num: '03',
        title: 'Decide rendering and caching before building',
        body: 'Static, incremental or server rendered, per route, with the cache invalidation path written down. On a commerce site this is the architecture, not a configuration detail.',
      },
      {
        num: '04',
        title: 'Keep SEO parity as a launch gate',
        body: 'URLs, canonical handling, structured data, pagination and faceted navigation carried across before cutover, not after. A headless launch that resets the URL structure is the most expensive way to redesign a site.',
      },
    ],
    stack: ['Next.js', 'React', 'GraphQL', 'Storefront API', 'Magento PWA Studio', 'Hydrogen', 'Edge caching'],
    cases: ['powerlook', 'nxtby'],
    posts: ['shopify-headless-nextjs-guide', 'magento2-pwa-studio-headless', 'aws-magento2-server-setup'],
    related: [
      { href: pillarHref('magento-2'), label: 'Magento 2 as the commerce layer behind a headless front end', note: 'PWA Studio, GraphQL and the catalogue underneath.' },
      { href: pillarHref('shopify'), label: 'Shopify as the commerce layer', note: 'Storefront API and Hydrogen.' },
      { href: pillarHref('ecommerce-consulting'), label: 'eCommerce consulting and architecture review', note: 'If you are still deciding whether to decouple.' },
    ],
    faqs: [
      {
        q: 'Does headless make a store faster?',
        a: 'It makes a fast store possible, which is not the same thing. A headless build with an unconsidered rendering strategy is comfortably slower than a well-tuned platform theme. The speed comes from the caching and rendering decisions, and those are available to you either way.',
      },
      {
        q: 'Headless on Magento or on Shopify?',
        a: 'Both work. Magento with PWA Studio or a custom GraphQL front end suits complex catalogues and B2B rules; Shopify with the Storefront API or Hydrogen suits brand-owned D2C. The commerce layer should be chosen on the commerce requirements, then decoupled, not the other way round.',
      },
      {
        q: 'What is the ongoing cost of running headless?',
        a: 'A second build and deploy pipeline, a hosting surface with its own scaling behaviour, and someone who owns the caching strategy. Budget for that permanently rather than as a launch cost, because it does not go away after go-live.',
      },
    ],
  },

  /* ── 05 ──────────────────────────────────────────────────────── */
  {
    slug: 'ai-commerce',
    label: 'AI Commerce',
    num: '05',
    h1: ['AI in commerce,', 'once the process', 'is worth automating.'],
    title: 'AI Commerce Consultant | Yuvraj Raulji',
    description:
      'AI for eCommerce: catalogue enrichment, semantic search, retrieval and operations automation, wired into platforms carrying real order volume rather than left as demos.',
    eyebrow: 'AI commerce',
    lede:
      'Most companies asking about AI have a process problem, not an AI problem. Automating a process nobody has fixed gets you the same bad outcome, faster and at higher cost. That sentence is most of the consulting.',
    what: [
      'The applications that hold up in commerce are unglamorous and specific: catalogue enrichment at a scale nobody can staff, semantic and retrieval-based search that understands a query the keyword index cannot, ranking and recommendation fed by real behaviour, and operations automation across quotes, approvals and data reconciliation.',
      'What separates those from the demos is where they sit. An AI feature is only worth building if it is wired into a platform already carrying order volume, with the catalogue, pricing and permission rules it has to respect. Retrieval that ignores the price scope, or an agent with no defined tool access, is a prototype with a support burden.',
      'This is the newest practice area on the site and I would rather say that than dress it up. The automation and integration record behind it is real, including taking 90% of B2B order and quote processing off people on a B2B commerce platform, and the AI layer is where that work is now going. If you want a delivered AI case study with a published metric, I do not have one to show you yet.',
    ],
    problems: [
      {
        symptom: 'The operation runs on manual work',
        body: 'Quotes, approvals, catalogue QA and data reconciliation absorbing people who should be doing something else. This is where automation pays, provided the process underneath it is worth keeping.',
      },
      {
        symptom: 'On-site search does not understand the catalogue',
        body: 'Customers searching in language the keyword index has never seen, and leaving with no results on products you stock. Retrieval and semantic ranking fix this in a way that another synonym list will not.',
      },
      {
        symptom: 'Product data is too thin to rank or convert',
        body: 'Tens of thousands of SKUs with supplier descriptions and no attributes. Enrichment at that scale is either an AI pipeline with human review or it does not happen at all.',
      },
      {
        symptom: 'AI answers describe the business incorrectly',
        body: 'Language models increasingly sit between a buyer and a brand. Whether they can state what you sell, to whom and on what terms is now a structured data and content structure problem.',
      },
    ],
    signals: [
      'A repeatable process with high volume and low judgement per instance',
      'A catalogue too large to enrich or QA by hand',
      'Search logs full of queries returning nothing',
      'Data reconciliation that people do on a schedule',
      'A defined place for a human to check the output before it matters',
    ],
    wrong:
      'Automating a process nobody has fixed. You get the same bad outcome, faster and at higher cost. Fix the process, then decide whether the remaining work is worth automating, and quite often it is not.',
    approach: [
      {
        num: '01',
        title: 'Fix the process first, on paper',
        body: 'Map the current steps and remove the ones that exist because of a system limitation nobody has revisited. Most of the saving is here, and it costs nothing.',
      },
      {
        num: '02',
        title: 'Choose applications with a measurable edge',
        body: 'Enrichment, retrieval, ranking, reconciliation. Each one has a number attached before it starts: coverage, no-result rate, conversion on search sessions, hours off the rota.',
      },
      {
        num: '03',
        title: 'Wire it into the real system',
        body: 'Against the live catalogue, pricing rules and permission model, through the platform APIs and workflow tooling. An integration that runs beside the platform rather than inside it drifts within a quarter.',
      },
      {
        num: '04',
        title: 'Keep a human checkpoint where it matters',
        body: 'Explicit scope, explicit tool access, and a review step wherever the output touches price, stock or a customer commitment. Agentic systems that plan and execute need this more than generative ones, not less.',
      },
    ],
    stack: ['OpenAI APIs', 'Retrieval & semantic search', 'Catalogue enrichment', 'n8n', 'Workflow automation', 'Structured data'],
    cases: ['nxtby'],
    posts: ['ai-ecommerce-revenue-2025', 'magento2-seo-technical-audit'],
    related: [
      { href: pillarHref('digital-transformation'), label: 'digital transformation and process redesign', note: 'The half that has to happen before automation.' },
      { href: pillarHref('ecommerce-consulting'), label: 'eCommerce consulting', note: 'If the question is whether to build this at all.' },
      { href: pillarHref('magento-2'), label: 'Magento 2, where most of this gets wired in', note: 'Catalogue, pricing and permission rules it has to respect.' },
    ],
    faqs: [
      {
        q: 'What is the most reliable AI use case in eCommerce today?',
        a: 'Catalogue enrichment with human review, and retrieval-based on-site search. Both have a number attached before you start, both fail visibly rather than silently, and neither requires the customer to trust the model directly.',
      },
      {
        q: 'Do you build AI agents for eCommerce?',
        a: 'Where the task genuinely needs planning across multiple steps, and with explicit scope, defined tool access and a human checkpoint before anything touches price, stock or a customer commitment. Most requests described as agents are better served by a deterministic workflow, and I will usually say so.',
      },
      {
        q: 'Is there an AI case study with published results?',
        a: 'Not yet. The automation and integration record behind this practice is real and is documented in the experience timeline, but no AI engagement on the list has a published measured outcome. Writing one up before it exists would be the fastest way to lose the argument that this page is trying to make.',
      },
    ],
  },

  /* ── 06 ──────────────────────────────────────────────────────── */
  {
    slug: 'digital-transformation',
    label: 'Digital Transformation',
    num: '06',
    h1: ['Digital transformation', 'that survives', 'contact with the business.'],
    title: 'Digital Transformation Consultant | Yuvraj Raulji',
    description:
      'Modernising legacy commerce stacks into API-first systems: process redesign, phased migration and integration boundaries, sequenced so trading continues throughout.',
    eyebrow: 'Digital transformation',
    lede:
      'The phrase usually arrives attached to a two-year programme and a slide deck. The version worth paying for is narrower: replace the parts of the stack that are actively costing money, in an order that lets the business keep trading, and stop.',
    what: [
      'Transformation here means moving a legacy commerce operation onto a cloud-native, API-first footing without a big-bang cutover. Process redesign first, then the architecture that supports the redesigned process, then a phased rollout with the riskiest work deliberately not scheduled into peak season.',
      'The process half is not a soft preamble to the technical work, it is where most of the return is. Introducing structured workflows and approval processes cut development cycle time by 30%, and modelling five-level approval chains for development, B2B orders, quotes and vendor management took 90% of B2B order and quote processing off people, reducing approval cycle time by 40%. None of that required a new platform.',
      'What makes these programmes fail is almost never the technology. It is sequencing: cutovers scheduled by convenience rather than risk, integrations discovered late, and a phase whose success depends on a phase that has not started. Getting the order right is the deliverable.',
    ],
    problems: [
      {
        symptom: 'A replatforming nobody wants to start',
        body: 'The risk is not the build, it is the cutover: URLs, redirects, order history, integrations and the week either side. Sequenced properly, trading continues throughout, and the decision stops being all-or-nothing.',
      },
      {
        symptom: 'The legacy stack is a full-time job',
        body: 'Most of the engineering capacity is spent keeping the current system running, so nothing on the roadmap moves. That ratio is the business case, and it is usually easy to measure.',
      },
      {
        symptom: 'Every system is integrated with every other system',
        body: 'Point-to-point connections built one at a time until any schema change is an outage. The work is drawing boundaries and service contracts, and it can be done incrementally.',
      },
      {
        symptom: 'The process was designed around a system nobody uses any more',
        body: 'Approval steps and manual reconciliation that exist because of a limitation removed years ago. Remove those before automating anything, or you automate the wrong thing permanently.',
      },
    ],
    signals: [
      'More engineering time spent on maintenance than on the roadmap',
      'A platform version far enough behind that upgrading is itself a project',
      'Integrations that break whenever either side changes',
      'Processes with steps nobody can explain the reason for',
      'A commercial plan that assumes capabilities the stack does not have',
    ],
    wrong:
      'If the current system works and the constraint is commercial rather than technical, a transformation programme is an expensive way to avoid a marketing decision. Modernise the part that is costing money and leave the rest alone.',
    approach: [
      {
        num: '01',
        title: 'Measure what the current stack costs to run',
        body: 'Maintenance hours, change cost, incident frequency, and the roadmap items blocked. This is the business case, and it is nearly always stronger than the one on the slide.',
      },
      {
        num: '02',
        title: 'Redesign the process before the system',
        body: 'Remove the steps that exist because of a limitation nobody has revisited. Automating an unnecessary approval makes it permanent.',
      },
      {
        num: '03',
        title: 'Phase by risk, not by convenience',
        body: 'The riskiest cutover gets the calmest trading week and the most rehearsal. Nothing critical lands in peak season, and each phase is independently valuable in case the next one is deferred.',
      },
      {
        num: '04',
        title: 'Make the integration boundaries explicit',
        body: 'Service contracts rather than point-to-point scripts, so the next change on either side is a version, not an outage.',
      },
    ],
    stack: ['Legacy migration', 'Process redesign', 'API-first architecture', 'Phased rollout', 'ERP & PIM integration', 'AWS', 'Workflow automation'],
    cases: ['nxtby', 'synergy', 'shopunicore'],
    posts: ['shopify-plus-vs-magento2-2025', 'aws-magento2-server-setup', 'ai-ecommerce-revenue-2025'],
    related: [
      { href: pillarHref('ecommerce-consulting'), label: 'eCommerce consulting and technical due diligence', note: 'Where a transformation programme should start.' },
      { href: pillarHref('ai-commerce'), label: 'AI commerce and operations automation', note: 'What to automate once the process is fixed.' },
      { href: pillarHref('headless-commerce'), label: 'headless and composable commerce', note: 'A common target architecture for the front end.' },
    ],
    faqs: [
      {
        q: 'How long does a transformation programme take?',
        a: 'Phase it so that question stops mattering. Each phase should be independently valuable and independently deferrable, which means the programme can stop after any of them without leaving the business worse off. Programmes that only pay at the end are the ones that get cancelled at month nine.',
      },
      {
        q: 'Can the business keep trading during a migration?',
        a: 'Yes, and it should. The risk sits in the cutover rather than the build, so the work is in URL and redirect mapping, order history, integration switchover and rehearsal. Migrations run on that basis are what most of my replatforming experience consists of.',
      },
      {
        q: 'Is digital transformation the same as replatforming?',
        a: 'No, and conflating them is the common expensive mistake. Replatforming changes the system. Transformation changes how the business operates, and often the highest-return part of it needs no new platform at all.',
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
