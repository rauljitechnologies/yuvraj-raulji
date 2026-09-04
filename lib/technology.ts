/**
 * Content model for the technology landing pages at the root of the site.
 *
 * These are the pages a buyer lands on from a platform search: /shopify/,
 * /magento/, /woocommerce/, /wordpress/, /headless-commerce/, /ai-commerce/,
 * /ai-search/, /ai-automation/ and /digital-transformation/.
 *
 * ── Why this file exists next to lib/expertise.ts ──────────────────────────
 *
 * The six pillars under /expertise/ answered "what does he do". These answer
 * "is this technology right for my business", which is a different search and
 * a different page. Five of the pillars were about the same subjects, so they
 * moved here rather than being duplicated: keeping both would have split the
 * ranking signal across two URLs per topic and put two pages of near-identical
 * copy on the site. The old paths redirect, in vercel.json.
 * /expertise/ecommerce-consulting/ stays where it is, because consulting is a
 * discipline rather than a technology.
 *
 * ── Provenance ─────────────────────────────────────────────────────────────
 *
 * CONTENT-PRINCIPLES.md §1 applies to every line below. Each factual claim is
 * already in the verified record (lib/site.ts, lib/home.ts, lib/brand.ts) or
 * is an opinion in Yuvraj's own voice, marked as one. Specifically:
 *
 *   - No measured outcome is attached to a technology that has not produced
 *     one. The 60% page-load and 90% automation figures came out of Magento
 *     work at B2B scale, so they appear on the Magento page and are described
 *     as Magento's on every other page that mentions them. The Shopify page
 *     says in as many words that it has no published metric of its own.
 *   - No client is named. Cases are described by what was built, per section 4
 *     of BRAND-DESIGN-GUIDELINE.md.
 *   - The AI pages are written as positions, not portfolios, and say so. There
 *     is no delivered AI engagement with a published measurement yet.
 *
 * ── House style ────────────────────────────────────────────────────────────
 *
 * No em-dashes and no multiplication sign anywhere in this file, per section 1
 * of BRAND-DESIGN-GUIDELINE.md. The separator in the positioning line is a
 * pipe. Every section is written so it still answers its question when an AI
 * system quotes it away from the rest of the page, which means the technology
 * is named rather than referred to as "the platform".
 */

import type { Anchor } from './expertise';

/* ═══════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════ */

/**
 * Section 02. The direct answer, written for a person who has just arrived
 * from a search and for the AI systems that now summarise these pages.
 *
 * `answer` is held to 60 to 120 words on purpose: shorter and it says nothing
 * useful, longer and it stops being extractable as a single passage.
 */
export interface QuickAnswer {
  answer: string;
  /** Business types this genuinely suits. Three to five. */
  bestFor: readonly string[];
}

/**
 * Section 03. A business problem, not a service.
 *
 * The three fields are the whole point: a symptom the reader recognises, why
 * it costs them something, and only then what the technology does about it.
 * Leading with the capability is what makes a landing page read as a brochure.
 */
export interface TechProblem {
  /** The symptom, phrased the way the person with the problem would phrase it. */
  symptom: string;
  /** Why it matters, in business terms. */
  body: string;
  /** What the technology can actually do about it. */
  opportunity: string;
}

/**
 * Section 04. The five stages, identical in name across every technology page
 * because the method genuinely is the same one. The bodies are specific to the
 * technology, which is what keeps this from being the filler that repeated
 * methodology sections usually are.
 */
export interface ApproachStage {
  num: string;
  /** UNDERSTAND, ARCHITECT, BUILD, OPTIMIZE, SCALE. */
  title: string;
  /** The four things the stage covers. Rendered as a list, not a sentence. */
  covers: readonly string[];
  body: string;
}

/** Section 05. Capabilities grouped by what they are for, not listed flat. */
export interface CapabilityGroup {
  group: string;
  items: readonly string[];
}

/**
 * Section 06. One practical AI application.
 *
 * Five fields, and all five are required, because "AI-powered" with no
 * mechanism attached is the exact thing CONTENT-PRINCIPLES.md §2 bans. If an
 * application cannot be described down to where a human still has to look at
 * it and what it cannot do, it does not go on the page.
 */
export interface AiApplication {
  title: string;
  /** What it does. */
  what: string;
  /** How it works, concretely enough to be argued with. */
  how: string;
  /** Where the value shows up. */
  value: string;
  /** Where a human still reviews the output. */
  human: string;
  /** What it does not do. Never optional. */
  limit: string;
}

/** Section 07. One tier of the architecture diagram, top to bottom. */
export interface ArchLayer {
  name: string;
  detail: string;
  /** The named technologies at this tier. Only ones actually used. */
  tech: readonly string[];
}

/** Section 08. The honest two columns. */
export interface FitTest {
  goodFit: readonly string[];
  thinkTwice: readonly string[];
}

/**
 * Section 09. A comparison against genuinely alternative choices.
 *
 * `columns[0]` is always this page's technology. No row declares a winner: the
 * cells describe behaviour, and the reader draws the conclusion. A comparison
 * table that grades the page's own subject highest on every row is an
 * advertisement with gridlines.
 */
export interface Comparison {
  /** What is being compared. First entry is this page's technology. */
  columns: readonly string[];
  rows: readonly { criterion: string; cells: readonly string[] }[];
  /** The sentence that stops the table being read as a ranking. */
  note: string;
  /** Links to the pages for the other columns. */
  links: readonly Anchor[];
}

/**
 * Section 11. A business outcome.
 *
 * `metric` is optional and stays empty unless the number is in the verified
 * record. `context` is not optional when there is a metric: a percentage with
 * no account of where it happened and what was changed is unsupported, which
 * CONTENT-PRINCIPLES.md §1 treats as invention.
 */
export interface Outcome {
  /** Only from the verified record. Omitted rather than estimated. */
  metric?: string;
  label: string;
  body: string;
  /** Where the number came from. Required whenever `metric` is set. */
  context?: string;
}

export interface TechFaq {
  q: string;
  a: string;
}

export interface Technology {
  slug: string;
  /** Nav and card label. Short. */
  label: string;
  /** The word that fills [TECHNOLOGY] in the section headings. */
  name: string;
  /** Eyebrow above the H1. Pipe separator, never a multiplication sign. */
  eyebrow: string;
  /** The single H1, held as lines so each break does typographic work. */
  h1: readonly string[];
  /** Two or three sentences under the H1. */
  lede: string;
  /** Hero and final calls to action, in this technology's own words. */
  cta: string;
  /** <title>, kept under about 60 characters. */
  title: string;
  /** Meta description, kept under about 155 characters. */
  description: string;

  quickAnswer: QuickAnswer;
  problems: readonly TechProblem[];
  approach: readonly ApproachStage[];
  capabilities: readonly CapabilityGroup[];
  ai: readonly AiApplication[];
  architecture: readonly ArchLayer[];
  fit: FitTest;
  comparison: Comparison;
  /** Work item ids, resolved against WORK_ITEMS in lib/home.ts at render time. */
  cases: readonly string[];
  /** Article slugs, resolved against POSTS in lib/posts.ts. */
  posts: readonly string[];
  /** One line saying why these particular cases are on this page. */
  casesNote: string;
  outcomes: readonly Outcome[];
  /** The sentence that qualifies the outcomes above. */
  outcomesNote: string;
  faqs: readonly TechFaq[];
  related: readonly Anchor[];
  /** Section 15. The closing question, held as lines like the H1. */
  finalHeadline: readonly string[];
}

/** Every technology page lives at the root. */
export function techHref(slug: string): string {
  return `/${slug}/`;
}

/**
 * The five methodology stages, by name. Exported so the pages cannot drift
 * into five different methodologies while claiming to share one.
 */
export const STAGE_NAMES = ['Understand', 'Architect', 'Build', 'Optimize', 'Scale'] as const;

/* ═══════════════════════════════════════════════════════════════
   SHOPIFY
   Search intent: commercial and informational. A buyer comparing
   platforms, or one already on Shopify whose store has stopped
   moving. Both need the same thing first: where the platform stops.
   ═══════════════════════════════════════════════════════════════ */

const SHOPIFY: Technology = {
  slug: 'shopify',
  label: 'Shopify',
  name: 'Shopify',
  eyebrow: 'Yuvraj Raulji | Shopify',
  h1: ['Shopify commerce', 'built for growth.'],
  lede:
    'Shopify takes the expensive parts of commerce off your hands: PCI scope, checkout reliability, uptime, platform upgrades. What is left is the work that actually moves the number, which is theme architecture, the checkout, the app list and the way this particular catalogue gets browsed. AI belongs in that list now, on search and product data long before it belongs on a chat widget.',
  cta: 'Discuss your Shopify project',
  title: 'Shopify Commerce | Yuvraj Raulji',
  description:
    'Shopify and Shopify Plus: theme architecture, checkout, app consolidation and the AI that pays on a D2C catalogue. Where it fits, and where it stops.',

  quickAnswer: {
    answer:
      'Shopify is a hosted commerce platform. It runs the storefront, the checkout and the payment layer as a managed service, so a business rents the parts of commerce that are expensive to own: PCI scope, uptime, platform upgrades. It suits brands selling their own catalogue that need to be trading in weeks rather than quarters. The business problem Shopify addresses is time and operating cost, not raw capability. What Shopify will not express is quote-driven pricing, negotiated terms or multi-level approval chains, and a business that needs those is usually looking at Magento instead.',
    bestFor: [
      'D2C brands selling their own catalogue',
      'Retail moving online, or online and in store',
      'Growing brands without a platform team',
      'Multi-channel selling across web, social and marketplaces',
    ],
  },

  problems: [
    {
      symptom: 'Traffic is fine, conversion is not',
      body:
        'The money leaves at the checkout, and almost never because of price. Every field is a question the customer has to agree to answer, and most carts are lost to hesitation rather than cost.',
      opportunity:
        'Shopify owns the checkout, which means the work is field count, guest flow, address handling and payment order rather than a rebuild. On Shopify Plus that extends to checkout extensions and branded one-page flows.',
    },
    {
      symptom: 'The theme has become unmaintainable',
      body:
        'Six years of edits layered onto a purchased theme, with no section model and no way to change anything without changing everything. Every merchandising request becomes a developer ticket.',
      opportunity:
        'A Shopify section and block architecture puts the store back in the hands of the people running it. This is a theme architecture job, not a redesign, and it is the difference between a store that keeps moving after launch and one that freezes.',
    },
    {
      symptom: 'The app bill is bigger than the development budget',
      body:
        'Twenty apps, four of them doing the same job, three of them injecting script into every page. The subscription cost is visible. The page weight and the coupling are not, until Core Web Vitals move.',
      opportunity:
        'Auditing the Shopify app list as a dependency graph, with what each one costs in subscription, in script weight and in lock-in. Several are usually replaceable with fifty lines of Liquid.',
    },
    {
      symptom: 'On-site search returns nothing on products you stock',
      body:
        'Customers search in their own language, not in your product titles. A no-result page is a customer who was ready to buy and left, and it is the least monitored screen on most stores.',
      opportunity:
        'Semantic search over the Shopify catalogue, which understands intent rather than matching strings. This is the AI application with the clearest number attached on a D2C store: no-result rate, and conversion on sessions that used search.',
    },
    {
      symptom: 'The brand has outgrown the storefront',
      body:
        'International expansion, wholesale, or a product configurator the theme cannot express. Growth stops being a marketing question and becomes an architecture one.',
      opportunity:
        'Some of this is Shopify Plus, some of it is a headless front end on the Storefront API, and some of it is a signal to leave the platform. Those are three different answers and they cost three different amounts.',
    },
  ],

  approach: [
    {
      num: '01',
      title: 'Understand',
      covers: ['Business model', 'Customers', 'Products', 'Operations'],
      body:
        'How the business makes money, who is buying, how the catalogue is actually browsed, and what happens after the order. Most Shopify briefs arrive as a design request and turn out to be a merchandising or an operations problem, which is a much cheaper thing to fix.',
    },
    {
      num: '02',
      title: 'Architect',
      covers: ['Systems', 'Integrations', 'Customer journey'],
      body:
        'The section and block model the theme will be built on, the app list treated as a dependency graph, and the integration boundary to ERP, CRM, fulfilment and analytics. Decided before the first template, because retrofitting a section model into a live theme is most of a rebuild.',
    },
    {
      num: '03',
      title: 'Build',
      covers: ['Technology', 'Experience', 'Functionality'],
      body:
        'Liquid, the Storefront API where the front end needs its own roadmap, and checkout work kept inside what Shopify actually supports. Product pages built for the specific way this catalogue is browsed rather than for a template preview.',
    },
    {
      num: '04',
      title: 'Optimize',
      covers: ['Performance', 'CRO', 'SEO', 'Customer experience'],
      body:
        'The checkout first, because it is the highest-leverage surface on the store and the one most often left at its defaults. Then script weight, Core Web Vitals on real devices, collection and product URL structure, and GA4 commerce events with a deliberate dataLayer so the conversion conversation is about what happened.',
    },
    {
      num: '05',
      title: 'Scale',
      covers: ['Automation', 'AI', 'Analytics', 'Personalization'],
      body:
        'Semantic search over the catalogue, product data enrichment with a human review step, and operations automation across orders and fulfilment. Added once the store converts, never as the thing that is supposed to make it convert.',
    },
  ],

  capabilities: [
    {
      group: 'Commerce experience',
      items: ['Theme and section architecture', 'Navigation and collections', 'On-site search', 'Product pages', 'Checkout and Shop Pay'],
    },
    {
      group: 'Integrations',
      items: ['ERP and inventory', 'CRM and marketing', 'Payment gateways', 'Fulfilment and logistics', 'GA4 and GTM'],
    },
    {
      group: 'Operations',
      items: ['Catalogue and variants', 'Order workflows', 'Inventory sync', 'Returns', 'Shopify Flow automation'],
    },
    {
      group: 'Growth',
      items: ['Conversion rate optimisation', 'Core Web Vitals', 'Technical SEO', 'Retention and subscriptions', 'Multi-channel selling'],
    },
    {
      group: 'AI',
      items: ['Semantic product search', 'Recommendations', 'Catalogue enrichment', 'Support deflection', 'Operations automation'],
    },
  ],

  ai: [
    {
      title: 'Semantic product search',
      what: 'On-site search that understands what a customer means rather than matching the words they typed against product titles.',
      how: 'Product titles, descriptions and attributes are turned into vector embeddings and queried by meaning, with the keyword index kept underneath for exact matches like SKUs and brand names. The two are blended, not replaced.',
      value: 'The no-result rate and the conversion rate on sessions that used search. Both are measurable before the work starts, which is why this is the AI application worth doing first on a Shopify store.',
      human: 'Someone reads the top failing queries every month. Ranking that looks right in a test set and wrong on the real catalogue is common, and only the merchandiser can see it.',
      limit: 'It cannot sell a product the catalogue describes badly. If the product data is thin, semantic search surfaces the thinness faster rather than fixing it.',
    },
    {
      title: 'Catalogue enrichment',
      what: 'Generating the attributes, descriptions and structured data a large catalogue needs and nobody has the staff to write.',
      how: 'A pipeline reads existing product data, supplier feeds and images, drafts the missing fields against a fixed schema, and writes back through the Shopify Admin API in reviewed batches.',
      value: 'Coverage. A catalogue where every product has real attributes filters better, ranks better and converts better, and none of that is possible while half the fields are empty.',
      human: 'Review before publish, always. The failure mode is a confident, fluent, wrong specification, and on a product page that is a returns problem and a trust problem.',
      limit: 'It does not know your products. It works from what it is given, so a supplier feed with wrong dimensions produces enriched wrong dimensions.',
    },
    {
      title: 'Recommendations',
      what: 'Product suggestions driven by behaviour and context rather than by a static related-products list.',
      how: 'Session behaviour, purchase history and catalogue relationships feed a ranking model that decides what to show on the product page, in the cart and in email.',
      value: 'Average order value and the share of sessions that view more than one product. On a catalogue with genuine breadth this pays. On a catalogue of forty products it does not.',
      human: 'Merchandising rules stay on top of the model: margin, stock, and the products the business needs to move this month.',
      limit: 'It needs traffic and history. A store doing modest volume will not produce a model better than a well-chosen manual list, and paying for one is common.',
    },
    {
      title: 'Support deflection',
      what: 'Answering pre-purchase and post-purchase questions from the store content and the order record.',
      how: 'Retrieval over policies, product data and order status, with the model restricted to what it can retrieve rather than left to generate freely.',
      value: 'Contact volume on questions that are answerable from data the business already holds, which on most stores is where and when.',
      human: 'Anything touching a refund, an exception or a commitment goes to a person. That is a design decision, not a limitation to be engineered away later.',
      limit: 'It should not quote price, stock or delivery promises it cannot verify at that moment. A confidently wrong delivery date costs more than the ticket it saved.',
    },
  ],

  architecture: [
    { name: 'Customer', detail: 'Web, mobile and social, arriving from search, paid and email.', tech: ['Browser', 'Shop app'] },
    { name: 'Storefront', detail: 'The Shopify theme, or a headless front end when the front end needs its own release cycle.', tech: ['Liquid', 'Sections', 'Hydrogen', 'Next.js'] },
    { name: 'Commerce platform', detail: 'Catalogue, pricing, cart and the hosted checkout Shopify does not hand over.', tech: ['Shopify', 'Shopify Plus', 'Checkout extensions'] },
    { name: 'APIs and events', detail: 'How everything else talks to the platform, and how the platform tells everything else what happened.', tech: ['Storefront API', 'Admin API', 'Webhooks', 'Shopify Flow'] },
    { name: 'Business systems', detail: 'The systems that were there before the store and will outlast it.', tech: ['ERP', 'CRM', 'Payments', 'Fulfilment'] },
    { name: 'Data', detail: 'Commerce events defined deliberately rather than inherited from a template.', tech: ['GA4', 'GTM', 'Server-side events'] },
    { name: 'AI', detail: 'Sits on the catalogue and the search layer, reading through the same APIs.', tech: ['Semantic search', 'Enrichment pipeline', 'Recommendations'] },
  ],

  fit: {
    goodFit: [
      'Speed to market matters more than platform flexibility',
      'A brand-owned catalogue rather than a marketplace assortment',
      'Checkout reliability and PCI scope you would rather not own',
      'A team that will merchandise the store themselves after launch',
      'A merchandising cadence measured in days, not quarters',
    ],
    thinkTwice: [
      'Quote-driven pricing, negotiated terms or multi-level approvals',
      'A catalogue whose structure needs custom entity modelling',
      'Multi-store operations with genuinely different catalogues and rules',
      'Integration requirements that need control over the checkout server side',
      'A cost model where platform fees on volume outweigh the operating saving',
    ],
  },

  comparison: {
    columns: ['Shopify', 'Magento', 'WooCommerce'],
    rows: [
      { criterion: 'Speed to launch', cells: ['Weeks', 'Months', 'Weeks to months'] },
      { criterion: 'Customisation', cells: ['Within platform limits', 'Effectively unlimited', 'Unlimited, at plugin quality'] },
      { criterion: 'Enterprise complexity', cells: ['Plus, up to a point', 'Where it is strongest', 'Rarely the right answer'] },
      { criterion: 'Operations', cells: ['Managed for you', 'You own the operating cost', 'You own the operating cost'] },
      { criterion: 'Scalability', cells: ['Handled by the platform', 'Yours to engineer', 'Yours to engineer'] },
      { criterion: 'Content ecosystem', cells: ['Adequate', 'Adequate', 'Best of the three'] },
      { criterion: 'Headless capability', cells: ['Storefront API, Hydrogen', 'GraphQL, mature', 'REST, workable'] },
      { criterion: 'AI opportunity', cells: ['Search and catalogue', 'Search, catalogue, operations', 'Search and content'] },
    ],
    note:
      'None of these rows says better. They say different, and which difference matters depends on whether the constraint on your business is time, complexity or content. A business that picks Magento for flexibility it never uses has bought an operating cost, and a business that picks Shopify with quote-driven pricing on the roadmap has bought a migration.',
    links: [
      { href: '/magento/', label: 'Magento for quote-driven, multi-store and catalogue complexity' },
      { href: '/woocommerce/', label: 'WooCommerce for content-led commerce inside WordPress' },
      { href: '/headless-commerce/', label: 'headless commerce when the front end needs its own roadmap' },
    ],
  },

  cases: ['plant-store', 'sports-nutrition'],
  posts: ['shopify-plus-vs-magento2-2025', 'shopify-headless-nextjs-guide', 'cro-double-conversion'],
  casesNote:
    'Two Shopify builds from the record, described by what was built rather than by the brand name. Both are D2C catalogues where the checkout and the product page carried the result.',

  outcomes: [
    {
      label: 'Checkout completion',
      body:
        'Field count, guest flow and payment order are the levers, and on Shopify they are available without a platform rebuild. On the plant store this meant OTP login and a GoKwik one-page checkout, built for an Indian D2C audience buying live plants.',
    },
    {
      label: 'Merchandising speed',
      body:
        'A section and block architecture moves routine change from a developer ticket to a person in the business. The measurable version of this is how many store changes ship in a month without a deployment.',
    },
    {
      label: 'Page weight and Core Web Vitals',
      body:
        'App consolidation is usually the largest single win available on an established Shopify store, because every app that injects script is paying rent on every page load.',
    },
    {
      label: 'Search recovery',
      body:
        'The no-result rate is the cheapest number to improve on most stores and the least monitored. It is also the one AI application on Shopify with a number attached before the work starts.',
    },
  ],
  outcomesNote:
    'These are the levers, described as levers. The measured figures published on this site, the 60% cut in page load times and the 90% of order and quote processing automated, came out of Magento work at B2B scale and belong to that platform, not to this one. There is no Shopify engagement on the record with a published measurement, and inventing one would cost more credibility than it bought.',

  faqs: [
    {
      q: 'What is Shopify?',
      a: 'Shopify is a hosted commerce platform that runs the storefront, catalogue, cart and checkout as a managed service. The business rents the infrastructure, the PCI scope and the platform upgrades rather than owning them, and pays for that in platform fees and in the customisation limits that come with a hosted checkout.',
    },
    {
      q: 'Who is Shopify best suited for?',
      a: 'Brands selling their own catalogue that need to be trading quickly and do not want to run a platform team. D2C, retail moving online, and multi-channel sellers. The common thread is that the complexity of the business sits in merchandising and marketing rather than in pricing rules and approval chains.',
    },
    {
      q: 'Is Shopify suitable for a growing commerce business?',
      a: 'Yes, and that is the case for it. Shopify absorbs the scaling problems that would otherwise become engineering projects: traffic peaks, checkout reliability, PCI scope, platform upgrades. The point to reconsider is not a revenue threshold, it is the first requirement the platform cannot express.',
    },
    {
      q: 'Can Shopify integrate with ERP and CRM systems?',
      a: 'Yes, through the Admin API and webhooks, and this is normal rather than exotic. What matters is the boundary: which system owns the customer record, which owns stock, and what happens when they disagree. Integrations fail on that question far more often than on the API.',
    },
    {
      q: 'Can Shopify support headless commerce?',
      a: 'Yes, through the Storefront API, with Hydrogen or a Next.js front end. It is worth doing when the front end genuinely needs its own release cycle or a rendering model the theme cannot give you. It is not worth doing to make the site faster, which is usually a theme and app-weight problem wearing a headless costume.',
    },
    {
      q: 'Can AI be integrated with Shopify?',
      a: 'Yes, and the applications that hold up are semantic search over the catalogue, product data enrichment with human review, and behaviour-driven recommendations. Each has a number attached before the work starts. A chat widget on the storefront is the most requested and the least valuable of the group.',
    },
    {
      q: 'How can Shopify improve eCommerce conversion?',
      a: 'By fixing the checkout first, then the product page, then search. Field count and guest flow beat design changes almost every time, and on-site search failure is the most common invisible loss on a store with a real catalogue.',
    },
    {
      q: 'When should a business migrate to Shopify?',
      a: 'When the current platform is costing more in maintenance, hosting and developer time than the flexibility it provides is worth. That is a spreadsheet, not a feeling. The risk in the move is the cutover: URLs, redirects, order history and the integrations either side.',
    },
    {
      q: 'Shopify or Magento: which is better?',
      a: 'Neither, in the abstract. Shopify wins on time to market and operating cost. Magento wins on catalogue complexity, quote-driven pricing, multi-store and B2B workflow. The honest test is whether your pricing and approval rules can be expressed inside a hosted checkout, and if they cannot, the comparison is already settled.',
    },
    {
      q: 'How should Shopify performance be optimised?',
      a: 'Start with the app list, because third-party script is the largest controllable weight on most stores. Then image handling, theme JavaScript and the number of blocking requests before first render. Measure on a real mid-range phone on a real network, not on a laptop on office wifi.',
    },
    {
      q: 'Do you work on Shopify Plus?',
      a: 'Yes. Plus earns its cost when there is a specific checkout customisation, a multi-store organisation or an API volume requirement behind it. Crossing a revenue number is not on its own a reason to upgrade, and it is sold as though it is.',
    },
  ],

  related: [
    { href: '/magento/', label: 'Magento commerce', note: 'Where Shopify stops fitting: quotes, approvals, multi-store.' },
    { href: '/nextjs/', label: 'Next.js', note: 'For a storefront decoupled from Shopify over the Storefront API.' },
    {
      href: '/magento/migration/',
      label: 'Moving a store onto Magento 2',
      note: 'The shape of the work when the complexity turns out to be real.',
    },
    { href: '/headless-commerce/', label: 'Headless commerce', note: 'When the front end needs its own roadmap.' },
    { href: '/ai-commerce/', label: 'AI commerce', note: 'The catalogue and search work that pays on a D2C store.' },
    { href: '/ai-search/', label: 'AI search and GEO', note: 'Being findable when the answer arrives before the link.' },
    { href: '/woocommerce/', label: 'WooCommerce', note: 'If the business is content first and commerce second.' },
    { href: '/work/', label: 'Selected work', note: 'The builds behind all of this.' },
  ],

  finalHeadline: ['Is Shopify the right', 'move for your business?'],
};

/* ═══════════════════════════════════════════════════════════════
   AI SEARCH AND GEO
   Search intent: informational and strategic. Nobody buys "AI
   search" off a landing page. They arrive trying to work out
   whether the change in search is real and what it means for a
   business that has spent a decade optimising for a ranked list.

   Written as a position, not a portfolio. The technical SEO record
   behind it is real and is named as such; there is no delivered AI
   search engagement with a published measurement, and the page
   says so rather than implying otherwise.
   ═══════════════════════════════════════════════════════════════ */

const AI_SEARCH: Technology = {
  slug: 'ai-search',
  label: 'AI Search',
  name: 'AI search',
  eyebrow: 'Yuvraj Raulji | AI Search',
  h1: ['The next search', 'experience is', 'conversational.'],
  lede:
    'Search is changing in two places at once. On your own site, customers type in their own language and a keyword index hands them nothing. In front of your site, an answer engine now reads the page and states a conclusion, and the click that used to follow the ranking sometimes never happens. Both are the same problem: whether a machine can understand what you sell.',
  cta: 'Discuss an AI search opportunity',
  title: 'AI Search and GEO | Yuvraj Raulji',
  description:
    'AI search and Generative Engine Optimization: semantic on-site search, and being cited by AI answer engines. What works, and what is still speculation.',

  quickAnswer: {
    answer:
      'AI search covers two related shifts. On-site, it means semantic and retrieval-based search that ranks products by what a query means rather than by which words it shares with a product title. Off-site, it means Generative Engine Optimization: structuring content so AI answer engines can read it, understand what a business does, and cite it correctly. It matters because both change the same assumption, that a customer types keywords and picks from a ranked list. The business problem AI search addresses is being found and understood by systems that answer rather than list.',
    bestFor: [
      'Catalogues large enough that customers search rather than browse',
      'Businesses whose buyers now start in an AI assistant',
      'Content-led brands that earn traffic through explanation',
      'Any site where the no-result page is a real share of sessions',
    ],
  },

  problems: [
    {
      symptom: 'Customers search and get nothing back',
      body:
        'A no-result page is a customer who arrived ready to buy and left. On most catalogues it is a meaningful share of search sessions, and it is the least monitored screen on the site because nobody reports on it.',
      opportunity:
        'Retrieval-based search that matches meaning, with the keyword index kept underneath for SKUs and exact model numbers. The measurable version is the no-result rate before and after.',
    },
    {
      symptom: 'AI answers describe the business incorrectly',
      body:
        'Language models increasingly sit between a buyer and a brand. Whether they can state what you sell, to whom, and on what terms is now a content structure and structured data problem rather than a public relations one.',
      opportunity:
        'Clear definitions, direct answers, schema that matches the visible page, and an author with a verifiable record. AI systems reward pages that answer a question in one passage, which is also what makes a page useful to a person.',
    },
    {
      symptom: 'Rankings hold but traffic falls',
      body:
        'The position is the same and the click is not. When the answer is stated above the results, the informational half of a content strategy stops converting to sessions even though nothing on the site got worse.',
      opportunity:
        'Shifting the content that exists to earn the citation rather than the click, and moving conversion weight onto the queries where a person still needs a page. This is a measurement change before it is a content change.',
    },
    {
      symptom: 'Search relevance is a synonym list nobody maintains',
      body:
        'Every new product category means another set of hand-written synonyms, and the list rots. The team ends up maintaining a dictionary instead of a catalogue.',
      opportunity:
        'Embeddings replace most of that maintenance, because meaning does not need to be enumerated. The synonym list shrinks to genuine business vocabulary rather than every phrasing a customer might use.',
    },
  ],

  approach: [
    {
      num: '01',
      title: 'Understand',
      covers: ['Business model', 'Customers', 'Products', 'Operations'],
      body:
        'Read the search logs first. They are the most honest document any business owns: what customers actually call your products, what they expect you to stock, and where they gave up. This costs nothing and usually changes the brief.',
    },
    {
      num: '02',
      title: 'Architect',
      covers: ['Systems', 'Integrations', 'Customer journey'],
      body:
        'Decide what is retrieved and from where. Which fields carry meaning, which need to stay exact, where the vector index lives, and how it stays in step with a catalogue that changes daily. An index that drifts from the catalogue is worse than the keyword search it replaced.',
    },
    {
      num: '03',
      title: 'Build',
      covers: ['Technology', 'Experience', 'Functionality'],
      body:
        'Embeddings over the catalogue, hybrid ranking that keeps exact matching for SKUs and model numbers, and the answer surfaces themselves. Off-site, the content structure and schema that let an answer engine read a page correctly.',
    },
    {
      num: '04',
      title: 'Optimize',
      covers: ['Performance', 'CRO', 'SEO', 'Customer experience'],
      body:
        'Review the top failing queries every month, because ranking that tests well and behaves badly on a live catalogue is normal. On the GEO side, check what the answer engines actually say about the business, and treat a wrong answer as a content defect with an owner.',
    },
    {
      num: '05',
      title: 'Scale',
      covers: ['Automation', 'AI', 'Analytics', 'Personalization'],
      body:
        'Catalogue enrichment feeding the index, so search improves because the product data improved. Then ranking informed by real behaviour. In that order, because personalising a bad index personalises the wrong results.',
    },
  ],

  capabilities: [
    {
      group: 'On-site search',
      items: ['Semantic and vector retrieval', 'Hybrid keyword ranking', 'Faceting and filters', 'No-result recovery', 'Search analytics'],
    },
    {
      group: 'Discovery',
      items: ['Query intent classification', 'Category and collection mapping', 'Recommendations', 'Merchandising rules'],
    },
    {
      group: 'GEO and AI visibility',
      items: ['Content structure for extraction', 'Schema.org and entity clarity', 'llms.txt', 'Citation monitoring', 'Author and record signals'],
    },
    {
      group: 'Technical SEO',
      items: ['Crawlability and indexation', 'Canonical and URL structure', 'Core Web Vitals', 'Structured data validation'],
    },
    {
      group: 'Measurement',
      items: ['No-result rate', 'Search-session conversion', 'Query coverage', 'AI answer accuracy'],
    },
  ],

  ai: [
    {
      title: 'Semantic retrieval',
      what: 'Search that ranks by what a query means rather than by which words it shares with the product record.',
      how: 'Product and content text is encoded as vector embeddings; a query is encoded the same way and matched by distance. The keyword index stays underneath and wins on exact identifiers, so a SKU search still behaves like a SKU search.',
      value: 'No-result rate and conversion on sessions that used search. Both exist before the project starts, which is what makes this worth funding rather than piloting.',
      human: 'A merchandiser reads the failing queries monthly. Relevance is a business opinion at the edges, and the model does not hold one.',
      limit: 'It cannot rescue thin product data. Embeddings of an empty description are an accurate representation of nothing.',
    },
    {
      title: 'Query understanding',
      what: 'Classifying what a customer is trying to do: find a specific item, compare options, or check whether you stock a category at all.',
      how: 'Intent classification over the query stream, mapped onto different result layouts. A comparison query and a known-item query should not return the same page.',
      value: 'Fewer sessions that end on a result page nobody engaged with, and a clearer picture of which categories customers expect and you do not carry.',
      human: 'The category gaps this exposes are a buying decision, not a search decision. It surfaces them and stops.',
      limit: 'Classification is confident on common queries and unreliable on the long tail, which is exactly where the interesting queries are.',
    },
    {
      title: 'Generative Engine Optimization',
      what: 'Making content that an AI answer engine can read, understand and cite without misrepresenting the business.',
      how: 'Direct answers near the top of a section, definitions that stand alone when extracted, schema that matches the visible text, a named author with a verifiable record, and llms.txt describing what the site is.',
      value: 'Being cited correctly when the answer arrives before the link. On this site that is why every FAQ is open text rather than an accordion, and why the structured data is built from the same array the page renders.',
      human: 'Someone has to read what the answer engines currently say about the business. There is no dashboard that will do this honestly yet.',
      limit: 'None of it is a ranking control. It makes a page easier to understand and quote, and it cannot make a system cite you. Anyone selling guaranteed AI visibility is selling something they do not have.',
    },
    {
      title: 'Catalogue enrichment for search',
      what: 'Filling in the attributes and descriptions that both the index and the customer need.',
      how: 'A pipeline drafts missing fields against a fixed schema from existing data, feeds and images, and writes back in reviewed batches.',
      value: 'Coverage, and search quality as a downstream effect. This is usually the cheapest way to improve search results without touching the search engine at all.',
      human: 'Review before publish. A fluent, confident, wrong specification on a product page is a returns problem.',
      limit: 'It works from what it is given. Wrong source data becomes enriched wrong data, at scale and faster.',
    },
  ],

  architecture: [
    { name: 'Customer', detail: 'Typing in their own language, on your site or in an assistant that answers before it links.', tech: ['On-site search', 'AI assistants'] },
    { name: 'Query layer', detail: 'Understanding the query before deciding what to retrieve.', tech: ['Intent classification', 'Query parsing'] },
    { name: 'Retrieval', detail: 'Meaning and exactness, blended rather than chosen between.', tech: ['Vector index', 'Keyword index', 'Hybrid ranking'] },
    { name: 'Content and catalogue', detail: 'The source of truth. Everything above is a projection of this, and inherits its gaps.', tech: ['Product data', 'Attributes', 'Editorial content'] },
    { name: 'Structure', detail: 'What makes the same content legible to a machine that is answering rather than listing.', tech: ['Schema.org', 'llms.txt', 'Semantic HTML'] },
    { name: 'Measurement', detail: 'The numbers that decide whether any of it worked.', tech: ['No-result rate', 'Search conversion', 'Citation checks'] },
  ],

  fit: {
    goodFit: [
      'A catalogue large enough that customers search rather than browse',
      'Search logs full of queries that return nothing',
      'Content that earns its traffic by explaining something',
      'Product data good enough to be worth retrieving',
      'Someone in the business who will read the failing queries',
    ],
    thinkTwice: [
      'A catalogue of a few dozen products, where good navigation beats any search engine',
      'Product data so thin that retrieval would surface the gaps rather than fix them',
      'An expectation that GEO controls what an AI system says about you',
      'No baseline measurement, which makes the result unarguable in both directions',
      'A business hoping this replaces the technical SEO it has not done',
    ],
  },

  comparison: {
    columns: ['AI search', 'Keyword search', 'Classic SEO'],
    rows: [
      { criterion: 'Matches on', cells: ['Meaning', 'Exact terms', 'Terms and links'] },
      { criterion: 'Handles unseen phrasing', cells: ['Yes', 'Only with synonyms', 'Partly'] },
      { criterion: 'Exact SKU lookup', cells: ['Needs a keyword fallback', 'Its strongest case', 'Not applicable'] },
      { criterion: 'Maintenance', cells: ['Index freshness', 'Synonym lists', 'Ongoing content work'] },
      { criterion: 'Setup cost', cells: ['Moderate', 'Low', 'Low to moderate'] },
      { criterion: 'Where it acts', cells: ['On your site', 'On your site', 'In front of your site'] },
      { criterion: 'Measured by', cells: ['No-result rate, search conversion', 'Same, on a lower ceiling', 'Rankings, sessions, citations'] },
      { criterion: 'Fails by', cells: ['Confident wrong ranking', 'Returning nothing', 'Slow, visible decline'] },
    ],
    note:
      'These are layers, not rivals. Nearly every working implementation is hybrid: embeddings for meaning, the keyword index for identifiers, and technical SEO underneath both because a page an engine cannot crawl is a page no model will ever cite. Replacing keyword search outright is the most common way this goes wrong.',
    links: [
      { href: '/ai-commerce/', label: 'AI commerce, where search sits alongside catalogue and operations' },
      { href: '/ai-automation/', label: 'AI automation for the processes behind the catalogue' },
      { href: '/shopify/', label: 'Shopify, where semantic search is usually the first AI application worth funding' },
    ],
  },

  cases: ['manufacturing', 'b2b-procurement'],
  posts: ['magento2-seo-technical-audit', 'ai-ecommerce-revenue-2025'],
  casesNote:
    'Search and discovery work from the record, and it is technical SEO and catalogue work rather than AI search. That distinction is deliberate: there is no delivered AI search engagement with a published measurement yet, and this section will not borrow one.',

  outcomes: [
    {
      metric: '3x traffic growth and 45% better engagement',
      label: 'Discovery on an engineering brand platform',
      body:
        'Search and content work on a manufacturer platform built for discovery and enquiry rather than for transactions.',
      context:
        'From the engineering manufacturer build on the work record. It came from technical SEO, site structure and content, before any AI retrieval was involved, and it is quoted here as what search work produced rather than as an AI result.',
    },
    {
      label: 'No-result rate',
      body:
        'The most improvable number in on-site search and the least reported. Every no-result session is a customer who told you what they wanted in their own words and got nothing back.',
    },
    {
      label: 'Search-session conversion',
      body:
        'Customers who use search convert at a different rate to customers who browse. Separating the two is usually the moment a business starts taking its search seriously.',
    },
    {
      label: 'Answer accuracy',
      body:
        'Whether an AI assistant can state correctly what the business sells and to whom. It is checkable by hand today, and treating a wrong answer as a content defect with an owner is most of GEO in practice.',
    },
  ],
  outcomesNote:
    'One measured figure here, and it belongs to technical SEO and content work rather than to AI retrieval. The rest are the numbers this work is measured on, listed as numbers to establish rather than results already achieved. There is no AI search engagement on the record with a published outcome, and there will not be a claim of one on this page until there is.',

  faqs: [
    {
      q: 'What is AI search?',
      a: 'Search that ranks results by the meaning of a query rather than by word overlap with the indexed text. It is built on vector embeddings and retrieval, usually blended with a keyword index so exact identifiers still behave correctly. In practice it means a customer can describe what they want in their own words and still find it.',
    },
    {
      q: 'What is Generative Engine Optimization?',
      a: 'GEO is the practice of structuring content so AI answer engines can read it, understand it and cite it correctly. It overlaps heavily with good technical SEO and clear writing: direct answers, definitions that survive being extracted from the page, schema that matches the visible text, and a named author with a record behind them.',
    },
    {
      q: 'Is GEO different from SEO?',
      a: 'It is a shift of emphasis rather than a separate discipline. SEO optimises to be ranked in a list; GEO optimises to be understood and quoted in an answer. The technical foundation is the same, and a site that cannot be crawled or whose structured data contradicts its page will not be cited by anything.',
    },
    {
      q: 'Can you guarantee visibility in AI Overviews or ChatGPT?',
      a: 'No, and neither can anyone else. There is no submission, no ranking control and no published mechanism. What can be done is to make the site easy to read, accurate in its structured data, and clearly attributable to a real person with a record. Anyone selling a guarantee is selling something they do not have.',
    },
    {
      q: 'How does semantic search actually work?',
      a: 'Text is converted into vectors that place similar meanings near each other. A query is converted the same way, and the nearest items are retrieved. Because the comparison is on meaning rather than characters, a query the catalogue has never seen phrased that way still matches, which is the part a synonym list cannot do.',
    },
    {
      q: 'Will AI search replace keyword search?',
      a: 'No, and implementations that try tend to regress. Keyword matching is better at exact identifiers, model numbers and brand names, where a customer is being precise on purpose. Nearly every working system is hybrid, with meaning and exactness blended and the balance tuned against real queries.',
    },
    {
      q: 'What does AI search cost to run?',
      a: 'Embedding a catalogue is inexpensive and one-off; keeping the index in step with a catalogue that changes daily is the ongoing cost, along with the review time to check what is failing. Budgeting for the build and not for the maintenance is the usual mistake.',
    },
    {
      q: 'How do I measure whether AI search worked?',
      a: 'Three numbers, all of which exist before you start: the share of searches that return nothing, the conversion rate of sessions that used search, and the share of the query stream that returns something a person then engaged with. If those are not being recorded today, record them for a month before changing anything.',
    },
    {
      q: 'Does my site need llms.txt?',
      a: 'It is cheap and it is honest, so this site publishes one. It is a plain description of what the site is and what it covers, at /llms.txt. It is not yet a standard anyone is obliged to read, and it should be treated as a courtesy rather than as an optimisation with a return attached.',
    },
    {
      q: 'Do you have an AI search case study?',
      a: 'Not with a published measurement, and I would rather say that here than dress up adjacent work as one. The search and content record is real, including 3x traffic growth on an engineering manufacturer platform, and it came from technical SEO rather than from AI retrieval. The AI layer is where this practice is going, not where its published results already are.',
    },
  ],

  related: [
    { href: '/ai-commerce/', label: 'AI commerce', note: 'Search alongside catalogue, ranking and operations.' },
    { href: '/ai-automation/', label: 'AI automation', note: 'Agents, retrieval and the workflows behind the catalogue.' },
    { href: '/shopify/', label: 'Shopify', note: 'Where semantic search is usually the first AI spend worth making.' },
    { href: '/magento/', label: 'Magento', note: 'Catalogue scale, where search failure costs the most.' },
    { href: '/digital-transformation/', label: 'Digital transformation', note: 'When the search problem is really a data problem.' },
    { href: '/insights/', label: 'Writing on search, commerce and AI', note: 'The reasoning, worked out in longer form.' },
  ],

  finalHeadline: ['Is AI search worth', 'your attention yet?'],
};

/* ═══════════════════════════════════════════════════════════════
   MAGENTO
   Search intent: commercial and technical. The deepest part of the
   record, and the platform most often recommended against.
   ═══════════════════════════════════════════════════════════════ */

const MAGENTO: Technology = {
  slug: 'magento',
  label: 'Magento',
  name: 'Magento',
  eyebrow: 'Yuvraj Raulji | Magento',
  h1: ['Magento commerce built', 'for complexity and scale.'],
  lede:
    'Magento earns its cost in one situation: when the catalogue, the pricing logic or the approval structure is genuinely complicated, and that complication is the business rather than an accident of how the last system was built. Nine years on it, most of that on the awkward end. It is also the platform I most often tell people not to buy.',
  cta: 'Discuss your Magento architecture',
  title: 'Magento Commerce | Yuvraj Raulji',
  description:
    'Magento 2 and Adobe Commerce: multi-store catalogues at 500K+ SKUs, B2B approval workflows, performance engineering and migrations run without going offline.',

  quickAnswer: {
    answer:
      'Magento is a self-hosted commerce platform, sold commercially as Adobe Commerce. Unlike a hosted platform it hands you the data model: attribute sets, store and website scope, price scope, inventory sources and the workflow layer above them. That is what makes Magento the right answer for catalogues, pricing rules and approval chains a hosted checkout cannot express, and the wrong answer for everything else. The business problem Magento addresses is complexity that genuinely exists. The cost is that you own the operating burden: hosting, caching, upgrades and the engineering time all three consume.',
    bestFor: [
      'B2B commerce with quotes, contracts and approvals',
      'Multi-store or multi-currency operations',
      'Catalogues large enough that indexing is a planning constraint',
      'Businesses where an ERP or PIM is the system of record',
    ],
  },

  problems: [
    {
      symptom: 'The store is slow and nobody can say why',
      body:
        'Time to first byte climbing, Core Web Vitals failing on real devices while the lab score looks fine. On Magento the cause is almost always below the front end: cache invalidation, a query plan, or an index doing a full scan.',
      opportunity:
        'Magento performance is a caching and query problem before it is a front-end one. Varnish, Redis, full-page cache, CDN and database tuning cut page load times by 60% on a high-traffic B2B platform, and none of that touched the theme.',
    },
    {
      symptom: 'Every B2B order needs a human, twice',
      body:
        'Quotes, negotiated pricing and approval chains run through email and a spreadsheet. The cost is not the software, it is the people waiting for each other.',
      opportunity:
        'Magento models approvals as a data structure rather than a plugin. Five-level chains covering development, B2B orders, quotes and vendor management took 90% of order and quote processing off people and cut approval cycle time by 40%.',
    },
    {
      symptom: 'Multi-store has become multi-copy',
      body:
        'Each storefront diverging until a change has to be made four times. Every new market makes the next one more expensive.',
      opportunity:
        'The fix is in the store and website scope model and the attribute set design, and it is much cheaper before the fourth store than after it. This is the decision Magento exists to give you.',
    },
    {
      symptom: 'Search cannot find the catalogue',
      body:
        'Crawl budget spent on faceted URLs, thin category pages, and product data structured so neither a crawler nor a language model can make sense of it.',
      opportunity:
        'Layered navigation and canonical strategy at the Magento configuration level, plus catalogue structure that makes the same product data usable by search, by on-site filtering and by AI retrieval.',
    },
    {
      symptom: 'The ERP integration is the whole roadmap',
      body:
        'Stock, price and order sync built as point-to-point scripts rather than a boundary. Every schema change on either side becomes an outage.',
      opportunity:
        'An explicit integration contract over the Magento API, with the system of record named for each field. Boring, and it is the difference between a roadmap and a maintenance rota.',
    },
  ],

  approach: [
    {
      num: '01',
      title: 'Understand',
      covers: ['Business model', 'Customers', 'Products', 'Operations'],
      body:
        'What the pricing rules genuinely are, who approves what, and which system is the source of truth for stock and price. On Magento this is not discovery theatre: these answers become the data model, and the data model is the part that cannot be changed later.',
    },
    {
      num: '02',
      title: 'Architect',
      covers: ['Systems', 'Integrations', 'Customer journey'],
      body:
        'Attribute sets, store and website scope, price scope and inventory sources, decided before the theme. These are close to irreversible once real data is in, and they are most often set by whoever configured the first storefront in a hurry.',
    },
    {
      num: '03',
      title: 'Build',
      covers: ['Technology', 'Experience', 'Functionality'],
      body:
        'Custom modules rather than accumulated extensions, workflow modelled explicitly, and the cache layer built with the build rather than added when the site gets slow. Cache invalidation is designed at the same time, because that is the half that breaks.',
    },
    {
      num: '04',
      title: 'Optimize',
      covers: ['Performance', 'CRO', 'SEO', 'Customer experience'],
      body:
        'Core Web Vitals from field data rather than a lab score, checkout flow, and the technical SEO that catalogue-scale Magento specifically needs: faceted URL handling, canonical strategy and crawl budget.',
    },
    {
      num: '05',
      title: 'Scale',
      covers: ['Automation', 'AI', 'Analytics', 'Personalization'],
      body:
        'Catalogue enrichment where the SKU count is past what people can maintain, semantic search over that catalogue, and operations automation across quotes, approvals and reconciliation. Magento is where most of this gets wired in, because it is where the rules already live.',
    },
  ],

  capabilities: [
    {
      group: 'Catalogue',
      items: ['Attribute set design', 'Multi-store scope', 'Layered navigation', 'Pricing rules', 'Inventory sources'],
    },
    {
      group: 'B2B commerce',
      items: ['Quotes and negotiation', 'Approval workflows', 'Company accounts', 'Contract pricing', 'Requisition lists'],
    },
    {
      group: 'Integrations',
      items: ['ERP and PIM', 'CRM', 'Payment gateways', 'OMS and fulfilment', 'GraphQL and REST APIs'],
    },
    {
      group: 'Performance',
      items: ['Varnish and Redis', 'Full-page cache', 'Database tuning', 'CDN and image pipeline', 'AWS provisioning'],
    },
    {
      group: 'AI',
      items: ['Catalogue enrichment', 'Semantic search', 'Operations automation', 'Data reconciliation'],
    },
  ],

  ai: [
    {
      title: 'Catalogue enrichment at scale',
      what: 'Generating the attributes, descriptions and structured data a 500K SKU catalogue needs and no team can write by hand.',
      how: 'A pipeline reads existing product data, supplier feeds and images, drafts missing fields against the attribute set, and writes back through the Magento API in reviewed batches.',
      value: 'Attribute coverage, which is what layered navigation, search relevance and category page quality all depend on. On a catalogue this size it is the difference between filters that work and filters that are decorative.',
      human: 'Review before publish, and spot checks by category afterwards. Enrichment that is 98% right across 500,000 products is still ten thousand wrong product pages.',
      limit: 'It cannot correct a supplier feed. Wrong source dimensions become enriched wrong dimensions, faster and in more places.',
    },
    {
      title: 'Semantic search over the catalogue',
      what: 'On-site search that understands what a customer means rather than matching their words against product titles.',
      how: 'Embeddings over product text and attributes, blended with the existing keyword index so SKUs and part numbers still match exactly. On Magento this sits alongside the search engine rather than replacing it.',
      value: 'No-result rate and conversion on search sessions. On a large catalogue this is where the money is, because a customer who searches has already decided to buy something.',
      human: 'A merchandiser reviews the failing queries monthly, and the category gaps they expose are a buying decision rather than a search one.',
      limit: 'It amplifies the catalogue it is given. Thin product data produces confident, thin results.',
    },
    {
      title: 'Operations automation',
      what: 'Taking repetitive work out of quotes, approvals, catalogue QA and data reconciliation.',
      how: 'Workflow automation wired into the Magento API and the approval model, with retrieval where a step needs to read policy or contract terms rather than follow a fixed rule.',
      value: 'Hours off the rota and cycle time on approvals. On a B2B platform this route took 90% of order and quote processing off people and cut approval cycle time by 40%, and the first version of it was deterministic rather than generative.',
      human: 'Anything touching price, credit or a customer commitment keeps a named approver. The automation prepares the decision; it does not make it.',
      limit: 'It cannot fix a process that should not exist. Automating an unnecessary approval step makes it permanent, which is why the process redesign comes first.',
    },
    {
      title: 'Data reconciliation',
      what: 'Finding where Magento, the ERP and the PIM disagree, before a customer does.',
      how: 'Scheduled comparison across the integration boundary, with the differences classified rather than dumped into a report nobody reads.',
      value: 'Fewer oversells, fewer price disputes, and integration bugs found while they are still small. This is unglamorous and it is the highest-return automation on most B2B platforms.',
      human: 'Someone decides what the correct value is. The system says the two sides disagree; it does not know which one is right.',
      limit: 'It reports, it does not repair. Automatic correction across a system boundary is how a small discrepancy becomes a large one.',
    },
  ],

  architecture: [
    { name: 'Customer', detail: 'Web and mobile, plus the B2B buyer working inside an approval chain.', tech: ['Browser', 'PWA'] },
    { name: 'Storefront', detail: 'Magento templates, or a decoupled front end when the front end needs its own release cycle.', tech: ['Luma / custom theme', 'PWA Studio', 'Next.js'] },
    { name: 'Application', detail: 'The catalogue, pricing, workflow and approval model. This is what you are paying for.', tech: ['Magento 2', 'Adobe Commerce', 'Custom modules', 'PHP'] },
    { name: 'APIs', detail: 'How the front end and every other system reach the platform.', tech: ['GraphQL', 'REST', 'Message queues'] },
    { name: 'Cache and search', detail: 'Designed with the build, not added when the site gets slow.', tech: ['Varnish', 'Redis', 'Full-page cache', 'Elasticsearch / OpenSearch'] },
    { name: 'Business systems', detail: 'The systems of record, behind an explicit contract rather than point-to-point scripts.', tech: ['ERP', 'PIM', 'CRM', 'OMS', 'Payments'] },
    { name: 'Infrastructure', detail: 'Reproducible production environments rather than a server somebody configured once.', tech: ['AWS EC2', 'RDS', 'S3', 'Nginx', 'Auto-scaling'] },
    { name: 'AI', detail: 'Reads and writes through the same APIs, respecting the price and permission scope.', tech: ['Enrichment pipeline', 'Semantic search', 'Workflow automation'] },
  ],

  fit: {
    goodFit: [
      'More than one storefront, or more than one currency, or both',
      'Pricing that varies by customer, contract or volume',
      'An approval step between the cart and the order',
      'A catalogue large enough that indexing time is a planning constraint',
      'An ERP or PIM that is the system of record for price and stock',
    ],
    thinkTwice: [
      'A single store with a few hundred SKUs and no custom workflow',
      'No engineering capacity to own hosting, caching and upgrades',
      'A team that needs to ship merchandising changes without a developer',
      'Speed to market as the binding constraint',
      'Flexibility bought for a roadmap that has not been written yet',
    ],
  },

  comparison: {
    columns: ['Magento', 'Shopify', 'WooCommerce'],
    rows: [
      { criterion: 'Speed to launch', cells: ['Months', 'Weeks', 'Weeks to months'] },
      { criterion: 'Customisation', cells: ['Effectively unlimited', 'Within platform limits', 'Unlimited, at plugin quality'] },
      { criterion: 'Enterprise complexity', cells: ['Where it is strongest', 'Plus, up to a point', 'Rarely the right answer'] },
      { criterion: 'Operations', cells: ['You own the operating cost', 'Managed for you', 'You own the operating cost'] },
      { criterion: 'Scalability', cells: ['Yours to engineer, proven at 1M+ users', 'Handled by the platform', 'Yours to engineer'] },
      { criterion: 'Content ecosystem', cells: ['Adequate', 'Adequate', 'Best of the three'] },
      { criterion: 'Headless capability', cells: ['GraphQL, mature', 'Storefront API, Hydrogen', 'REST, workable'] },
      { criterion: 'AI opportunity', cells: ['Search, catalogue, operations', 'Search and catalogue', 'Search and content'] },
    ],
    note:
      'Magento wins the rows that matter only if your business is actually in them. A single-store brand with two hundred SKUs pays for this platform twice, once to build it and again every month to keep it running, and that business belongs on Shopify. The test is whether your pricing and approval rules can be expressed inside a hosted checkout.',
    links: [
      { href: '/shopify/', label: 'Shopify, if speed to market is the binding constraint' },
      { href: '/woocommerce/', label: 'WooCommerce for content-led commerce at a smaller scale' },
      { href: '/headless-commerce/', label: 'headless commerce on the Magento GraphQL layer' },
    ],
  },

  cases: ['marketplace', 'b2b-procurement'],
  posts: [
    'magento2-seo-technical-audit',
    'magento2-checkout-optimization',
    'aws-magento2-server-setup',
    'magento2-pwa-studio-headless',
    'shopify-plus-vs-magento2-2025',
  ],
  casesNote:
    'The two builds where Magento was doing the work it is actually for: catalogue scale, and a B2B workflow that could not be expressed anywhere else.',

  outcomes: [
    {
      metric: '60%',
      label: 'Cut in page load times',
      body:
        'Performance work on a high-traffic B2B commerce platform, where the bottleneck was below the front end rather than in it.',
      context:
        'Achieved through Varnish, Redis, full-page cache, CDN and database tuning on Magento 2 at multi-store scale. It is a caching and query result, not a theme result, and it is the figure this site quotes most often because it is the best measured.',
    },
    {
      metric: '90%',
      label: 'Of B2B order and quote processing automated',
      body:
        'Approval chains modelled as a data structure rather than assembled from extensions, covering development, B2B orders, quotes and vendor management.',
      context:
        'From the same B2B commerce platform. Approval cycle time fell by 40% alongside it. The automation was deterministic workflow, not AI, which is worth saying plainly.',
    },
    {
      metric: '500K+',
      label: 'SKUs under management',
      body:
        'The point where catalogue size stops being a number and starts being an architecture problem: indexing time, attribute design and search relevance all become planning constraints.',
      context:
        'Across 12+ multi-store Magento 2 platforms serving 1M+ monthly users, led end to end.',
    },
    {
      label: 'Operating cost',
      body:
        'The figure nobody puts on a slide. Magento is worth its maintenance, hosting and upgrade burden only when the complexity it handles is real, and measuring that ratio honestly is the most useful thing a platform review produces.',
    },
  ],
  outcomesNote:
    'Every figure above comes from Magento work and is quoted with the conditions it was measured under. They are not portable: a 60% improvement on a badly cached multi-store platform says nothing about what is available on a store that is already fast.',

  faqs: [
    {
      q: 'What is Magento?',
      a: 'Magento is a self-hosted commerce platform, sold commercially by Adobe as Adobe Commerce. It gives you the catalogue data model, pricing rules and workflow layer directly, which is why it suits complex B2B and multi-store commerce and why it costs more to run than a hosted platform.',
    },
    {
      q: 'When is Magento the right choice?',
      a: 'When the catalogue, the pricing logic or the approval structure is genuinely complicated and that complication is the business. More than one storefront, pricing that varies by contract, an approval step between cart and order, or an ERP that owns price and stock. Any one of those is a real reason; none of them being present is a real reason not to.',
    },
    {
      q: 'Is Magento suitable for B2B commerce?',
      a: 'It is the strongest case for it. Quotes, negotiated pricing, company accounts and multi-level approvals are modelled in the platform rather than bolted on. Five-level approval chains across development, B2B orders, quotes and vendor management is the shape of work this platform is built for.',
    },
    {
      q: 'Can Magento support multi-store commerce?',
      a: 'Yes, and the store and website scope model is one of the main reasons to choose it. The caution is that scope and attribute set decisions are close to irreversible once real data is in, so they need deciding before the first storefront rather than before the fourth.',
    },
    {
      q: 'How much Magento experience is behind this?',
      a: 'Magento work since 2016 and Magento 2 specifically across three commerce teams since then. Most recently 12+ multi-store Magento 2 platforms carrying 500K+ SKUs and 1M+ monthly users, first as a senior developer and since 2023 as team leader setting architecture direction.',
    },
    {
      q: 'Is Adobe Commerce different from Magento 2 for this work?',
      a: 'Architecturally they are the same platform. The difference is what arrives without being built: B2B modules, staging and preview, and a commercial support contract. Whether that is worth the licence depends on whether you would otherwise build those pieces, which is a due diligence question rather than a preference.',
    },
    {
      q: 'Can Magento integrate with ERP and CRM systems?',
      a: 'Yes, over GraphQL, REST and message queues. The integration succeeds or fails on the contract rather than the protocol: which system owns each field, what happens when they disagree, and how a schema change on either side is versioned. Point-to-point scripts are what turn every change into an outage.',
    },
    {
      q: 'Can Magento support headless architecture?',
      a: 'Yes, through GraphQL, with PWA Studio or a custom Next.js front end. It is worth doing when the front end needs its own release cycle. It is not a performance fix on its own, and on Magento the performance answer is usually the cache layer.',
    },
    {
      q: 'How can AI be integrated with Magento?',
      a: 'Catalogue enrichment with human review, semantic search over the catalogue, and operations automation across quotes, approvals and reconciliation. All three read and write through the Magento APIs so they respect the price scope and permission model, which is what separates them from a demo.',
    },
    {
      q: 'How can Magento performance be improved?',
      a: 'Start below the front end. Cache invalidation, query plans and indexing account for most Magento slowness, and Varnish, Redis, full-page cache, CDN and database tuning are where the 60% improvement on the B2B platform came from. Measure with field data from real devices, not a lab score.',
    },
    {
      q: 'Magento or Shopify: which is better?',
      a: 'Neither in the abstract. Magento wins on catalogue complexity, quote-driven pricing, multi-store and B2B workflow. Shopify wins on time to market and operating cost. If your pricing and approval rules fit inside a hosted checkout, the comparison is already settled and the answer is Shopify.',
    },
    {
      q: 'When should a business consider migrating away from Magento?',
      a: 'When the flexibility is no longer being used. If the store is single-site, the pricing is uniform and nobody approves anything, the platform is charging maintenance and hosting for capability the business does not exercise. That is a spreadsheet exercise, and it is worth doing honestly.',
    },
  ],

  related: [
    { href: '/shopify/', label: 'Shopify', note: 'The alternative, and often the right one.' },
    { href: '/headless-commerce/', label: 'Headless commerce', note: 'Decoupling the storefront from the Magento release cycle.' },
    { href: '/ai-commerce/', label: 'AI commerce', note: 'Catalogue, search and operations, wired into the rules already here.' },
    { href: '/ai-search/', label: 'AI search and GEO', note: 'Where catalogue-scale search failure costs the most.' },
    { href: '/digital-transformation/', label: 'Digital transformation', note: 'When the Magento question is really a process question.' },
    { href: '/expertise/ecommerce-consulting/', label: 'eCommerce consulting', note: 'If the platform decision is still open.' },
  ],

  finalHeadline: ['Is Magento the right', 'move for your business?'],
};

/* ═══════════════════════════════════════════════════════════════
   WOOCOMMERCE
   Search intent: commercial and informational. Verified from the
   services record: custom builds, bespoke themes, plugin
   development, checkout and catalogue customisation, plus the
   hardening and performance tuning these stacks arrive without.

   No case study is claimed. None of the six builds on the work
   record is a WooCommerce build, so the Relevant work section does
   not render on this page and the outcomes section says why.
   ═══════════════════════════════════════════════════════════════ */

const WOOCOMMERCE: Technology = {
  slug: 'woocommerce',
  label: 'WooCommerce',
  name: 'WooCommerce',
  eyebrow: 'Yuvraj Raulji | WooCommerce',
  h1: ['WooCommerce built around', 'content and commerce.'],
  lede:
    'WooCommerce is commerce inside WordPress, which means the content system is the host and the store is the guest. That is an advantage when the business sells through explanation, editorial and search, and a liability when it grows into catalogue and workflow complexity the plugin layer was never designed to carry.',
  cta: 'Discuss your WooCommerce project',
  title: 'WooCommerce | Yuvraj Raulji',
  description:
    'WooCommerce builds and performance work: bespoke themes, plugin development, checkout and catalogue customisation, and the hardening these stacks lack.',

  quickAnswer: {
    answer:
      'WooCommerce is an open-source commerce plugin for WordPress. It turns a WordPress site into a store, which means the catalogue, orders and checkout live inside the content system rather than beside it. It suits businesses whose commerce is downstream of content: publishers selling products, brands that earn traffic through explanation, and smaller catalogues where editorial and merchandising are the same job. The business problem WooCommerce addresses is the cost and friction of running content and commerce as two systems. What it does not give you is a platform-grade catalogue model, and that ceiling arrives earlier than most businesses expect.',
    bestFor: [
      'Content-led brands where editorial drives the sale',
      'Smaller catalogues with straightforward pricing',
      'Businesses already running WordPress',
      'Teams that want one system for pages and products',
    ],
  },

  problems: [
    {
      symptom: 'The site is slow and the plugin list is long',
      body:
        'Thirty plugins, each loading its own scripts and styles on every page, several duplicating each other. WooCommerce sites degrade through accumulation rather than through any single decision.',
      opportunity:
        'A plugin audit treated as a dependency graph, then object caching, a page cache that understands cart and session, and an image pipeline. This is the most reliable performance work available on a WooCommerce site.',
    },
    {
      symptom: 'Checkout is a default nobody has looked at',
      body:
        'The stock checkout with three plugins layered on it, more fields than the business needs and no measurement of where people stop.',
      opportunity:
        'Checkout and catalogue customisation is core WooCommerce work: field logic, guest flow, payment order and the specific step the funnel drops at, instrumented properly rather than guessed.',
    },
    {
      symptom: 'A plugin is now the business logic',
      body:
        'Pricing rules, subscriptions or shipping logic living inside a third-party plugin that is unmaintained, unreadable and impossible to change safely.',
      opportunity:
        'Custom plugin development so the rules that are specific to the business are code you own, versioned and testable, rather than a setting screen in someone else abandoned project.',
    },
    {
      symptom: 'The store has outgrown WordPress',
      body:
        'Variant explosion, multi-currency, or B2B pricing that the plugin layer can only fake. The symptom is that every new requirement needs another plugin.',
      opportunity:
        'This is the honest moment to compare against Shopify or Magento rather than to buy another extension. Knowing where the ceiling is means you can plan the move instead of discovering it in peak season.',
    },
  ],

  approach: [
    {
      num: '01',
      title: 'Understand',
      covers: ['Business model', 'Customers', 'Products', 'Operations'],
      body:
        'Whether the content or the catalogue is really the engine. On WooCommerce that answer decides everything else, because a store that earns its traffic through writing is architected very differently from one that earns it through range.',
    },
    {
      num: '02',
      title: 'Architect',
      covers: ['Systems', 'Integrations', 'Customer journey'],
      body:
        'Which behaviour belongs in a theme, which in a custom plugin, and which should not be in WordPress at all. Plus the plugin list as a dependency graph rather than a shopping list, decided before the build rather than audited after it.',
    },
    {
      num: '03',
      title: 'Build',
      covers: ['Technology', 'Experience', 'Functionality'],
      body:
        'Bespoke themes and custom plugin development, with checkout and catalogue customisation written as code rather than assembled from settings screens. Business-specific logic belongs in a plugin you own.',
    },
    {
      num: '04',
      title: 'Optimize',
      covers: ['Performance', 'CRO', 'SEO', 'Customer experience'],
      body:
        'Object and page caching that understands cart and session state, an image pipeline, script consolidation, and the hardening these stacks usually arrive without. WooCommerce SEO has its own traps: permalink structure, pagination and product category behaviour.',
    },
    {
      num: '05',
      title: 'Scale',
      covers: ['Automation', 'AI', 'Analytics', 'Personalization'],
      body:
        'Content and product data workflows first, because on WooCommerce the content is the asset. Then search, then the honest conversation about whether the next requirement is still a WordPress requirement.',
    },
  ],

  capabilities: [
    {
      group: 'Commerce experience',
      items: ['Bespoke themes', 'Product and category templates', 'Checkout customisation', 'Cart behaviour', 'Search and filtering'],
    },
    {
      group: 'Custom development',
      items: ['Plugin development', 'Pricing and shipping logic', 'Custom post types', 'REST API endpoints'],
    },
    {
      group: 'Integrations',
      items: ['Payment gateways', 'Shipping and fulfilment', 'CRM and email', 'Accounting', 'GA4 and GTM'],
    },
    {
      group: 'Performance and security',
      items: ['Object and page caching', 'Image pipeline', 'Plugin consolidation', 'Hardening', 'AWS provisioning'],
    },
    {
      group: 'Content and AI',
      items: ['Editorial and product content workflows', 'Structured data', 'Product data enrichment', 'On-site search'],
    },
  ],

  ai: [
    {
      title: 'Product and content enrichment',
      what: 'Drafting the product descriptions, attributes and metadata a content-led store needs across a growing catalogue.',
      how: 'A pipeline reads existing product data and editorial context, drafts missing fields against a fixed schema, and writes back through the WooCommerce REST API in reviewed batches.',
      value: 'Coverage and consistency, which on a WooCommerce store feed both search visibility and the on-site filtering customers use.',
      human: 'An editor reviews before publish. On a content-led brand the writing is part of the product, so this is drafting assistance rather than publication.',
      limit: 'It will produce competent, generic copy unless it is given the brand voice and real product knowledge. On a store that sells through explanation, generic is the failure mode that matters.',
    },
    {
      title: 'On-site search',
      what: 'Search that understands intent across both products and articles, which is the specific thing WooCommerce sites need and rarely have.',
      how: 'Embeddings over product and editorial content together, blended with the keyword index. The point is that a WooCommerce site has two content types answering the same question.',
      value: 'No-result rate, and the share of sessions that move from an article to a product. On a content-led store that second number is the funnel.',
      human: 'Someone reads the failing queries. On a small catalogue the answer is often a product the business should stock, not a ranking change.',
      limit: 'Below a few hundred products, good navigation and category structure will outperform any search engine. Buying retrieval for a small catalogue is a common waste.',
    },
    {
      title: 'Content operations',
      what: 'Reducing the repetitive work in publishing: metadata, structured data, internal linking suggestions, and content gap analysis.',
      how: 'Analysis over the existing library and the search console data, proposing rather than publishing.',
      value: 'Editorial throughput on a team where writing is the growth channel and everything around the writing is overhead.',
      human: 'Every suggestion is a suggestion. The editorial judgement about what is worth publishing is the part that is not automatable and not worth trying to automate.',
      limit: 'It cannot generate the expertise. A content-led brand that publishes generated articles loses the exact advantage that made WooCommerce the right platform.',
    },
  ],

  architecture: [
    { name: 'Customer', detail: 'Usually arriving on an article rather than a product page, which is the whole point.', tech: ['Browser', 'Organic search'] },
    { name: 'Presentation', detail: 'A bespoke theme, with product and editorial templates designed as one system.', tech: ['WordPress theme', 'Block editor', 'PHP templates'] },
    { name: 'Application', detail: 'WordPress as the host, WooCommerce as the commerce layer inside it.', tech: ['WordPress', 'WooCommerce', 'Custom plugins'] },
    { name: 'Data', detail: 'Products, orders and content in the same database, which is the convenience and the ceiling.', tech: ['MySQL', 'Custom post types', 'WooCommerce tables'] },
    { name: 'Integrations', detail: 'Payments, shipping and the systems that pick up after the order.', tech: ['REST API', 'Webhooks', 'Payment gateways'] },
    { name: 'Delivery', detail: 'Caching that understands a logged-in customer with a cart, which naive page caching does not.', tech: ['Object cache', 'Page cache', 'CDN', 'Nginx'] },
    { name: 'AI', detail: 'Reads through the REST API, writes only into reviewed drafts.', tech: ['Enrichment pipeline', 'On-site search'] },
  ],

  fit: {
    goodFit: [
      'Content is the growth channel and commerce follows it',
      'A catalogue in the hundreds rather than the hundreds of thousands',
      'Straightforward pricing without contract or approval logic',
      'A team already comfortable in WordPress',
      'One system for pages and products is genuinely worth something',
    ],
    thinkTwice: [
      'Variant complexity, multi-currency or B2B pricing rules',
      'A catalogue growing faster than the team can maintain it',
      'A plugin list already past twenty, with no owner',
      'Checkout requirements that need control at the server',
      'Uptime and PCI scope you would rather not own',
    ],
  },

  comparison: {
    columns: ['WooCommerce', 'Shopify', 'Magento'],
    rows: [
      { criterion: 'Speed to launch', cells: ['Weeks to months', 'Weeks', 'Months'] },
      { criterion: 'Customisation', cells: ['Unlimited, at plugin quality', 'Within platform limits', 'Effectively unlimited'] },
      { criterion: 'Enterprise complexity', cells: ['Rarely the right answer', 'Plus, up to a point', 'Where it is strongest'] },
      { criterion: 'Operations', cells: ['You own the operating cost', 'Managed for you', 'You own the operating cost'] },
      { criterion: 'Scalability', cells: ['Fine until it is not', 'Handled by the platform', 'Yours to engineer'] },
      { criterion: 'Content ecosystem', cells: ['Best of the three', 'Adequate', 'Adequate'] },
      { criterion: 'Headless capability', cells: ['REST, workable', 'Storefront API, Hydrogen', 'GraphQL, mature'] },
      { criterion: 'AI opportunity', cells: ['Search and content', 'Search and catalogue', 'Search, catalogue, operations'] },
    ],
    note:
      'WooCommerce wins one row decisively and it is often the row that matters: nothing else puts editorial and commerce in the same system as cleanly. The trap is treating that advantage as general. When catalogue or pricing complexity arrives, the plugin layer can imitate a platform feature but it cannot become one, and the imitation is what eventually costs the migration.',
    links: [
      { href: '/wordpress/', label: 'WordPress itself, when commerce is not the point' },
      { href: '/shopify/', label: 'Shopify when the catalogue outgrows the plugin layer' },
      { href: '/magento/', label: 'Magento when pricing and approvals become the business' },
    ],
  },

  cases: [],
  posts: ['cro-double-conversion', 'magento2-seo-technical-audit', 'aws-magento2-server-setup'],
  casesNote: '',

  outcomes: [
    {
      label: 'Page weight and plugin count',
      body:
        'The most reliable improvement available on an established WooCommerce site. Plugins accumulate, each one loading assets on every page, and consolidating them usually pays for itself in both licence cost and load time.',
    },
    {
      label: 'Checkout completion',
      body:
        'Field logic, guest flow and payment order, measured rather than assumed. WooCommerce gives you full control of the checkout, which means there is no platform limit to hide behind.',
    },
    {
      label: 'Content to product conversion',
      body:
        'The number that tells you whether the content-led model is working: the share of readers who reach a product page. On a WooCommerce store this is the funnel, and it is usually unmeasured.',
    },
    {
      label: 'Security posture',
      body:
        'Hardening and update discipline, which these stacks generally arrive without. On WordPress the attack surface is the plugin list, so the security work and the performance work are the same audit.',
    },
  ],
  outcomesNote:
    'No measured figure is quoted on this page, because none of the six builds on the work record is a WooCommerce build. The WooCommerce experience is real and is in the service record: custom builds, bespoke themes, plugin development, checkout and catalogue customisation, and the hardening and performance tuning these stacks usually arrive without. Attaching a Magento performance number to a WooCommerce page would be the fastest way to lose the argument the rest of this site is making.',

  faqs: [
    {
      q: 'What is WooCommerce?',
      a: 'WooCommerce is an open-source commerce plugin for WordPress. It adds products, cart, checkout and orders to a WordPress site, so commerce runs inside the content system rather than alongside it. It is free to install, and the real cost is hosting, plugins and the engineering time the stack needs to stay fast and secure.',
    },
    {
      q: 'Who is WooCommerce best suited for?',
      a: 'Businesses whose commerce follows their content. Publishers with products, brands that earn traffic by explaining something, and smaller catalogues with straightforward pricing. If editorial and merchandising are done by the same people, having one system for both is a genuine advantage.',
    },
    {
      q: 'Is WooCommerce good for SEO?',
      a: 'The WordPress side is excellent for it, which is most of why the platform is chosen. The commerce side has its own traps: permalink structure, product category and tag behaviour, pagination, and faceted URLs generated by filter plugins. Those are configuration decisions rather than platform limits, and they are worth making deliberately.',
    },
    {
      q: 'How do I make WooCommerce faster?',
      a: 'Start with the plugin list, because it is almost always the cause. Then object caching, a page cache that correctly excludes cart and checkout, an image pipeline, and script consolidation. Measure on a real mid-range phone rather than on a desktop connection.',
    },
    {
      q: 'Can WooCommerce handle a large catalogue?',
      a: 'It can be made to, and the question is whether it should be. Product and variant data in the WordPress schema gets expensive at scale, and the work to keep it fast eventually costs more than a platform built for catalogue size. The signal is that every new requirement needs another plugin.',
    },
    {
      q: 'Can WooCommerce integrate with ERP and CRM systems?',
      a: 'Yes, through the REST API and webhooks. The same rule applies as anywhere else: name the system of record for each field before writing any code. Most WooCommerce integration pain comes from two systems both believing they own stock.',
    },
    {
      q: 'Should business logic live in a plugin?',
      a: 'Logic specific to your business should live in a custom plugin that you own and can version, not in a third-party extension chosen for a settings screen. The most expensive WooCommerce problems are pricing or shipping rules trapped inside an unmaintained plugin.',
    },
    {
      q: 'Can AI be integrated with WooCommerce?',
      a: 'Yes, and the useful applications are product and content enrichment with editorial review, and on-site search that spans articles and products together. That second one is specific to WooCommerce: the site has two content types answering the same customer question, and most search implementations only look at one.',
    },
    {
      q: 'WooCommerce or Shopify?',
      a: 'WooCommerce if content is the growth channel and you want one system for pages and products. Shopify if commerce is the business and you would rather not own hosting, security and uptime. The deciding question is which of the two, content or catalogue, the business actually runs on.',
    },
    {
      q: 'When should a business move off WooCommerce?',
      a: 'When the plugin layer is imitating a platform feature rather than extending one: multi-currency, contract pricing, complex variants, or approval workflow. Imitation works until it does not, and it usually stops working in the quarter you can least afford it.',
    },
  ],

  related: [
    { href: '/wordpress/', label: 'WordPress', note: 'The host system, and what it is good at on its own.' },
    { href: '/shopify/', label: 'Shopify', note: 'Where most WooCommerce stores go when they outgrow it.' },
    { href: '/magento/', label: 'Magento', note: 'If the growth is in pricing and approval complexity.' },
    {
      href: '/magento/migration/',
      label: 'Migrating a WooCommerce catalogue onto Magento 2',
      note: 'Catalogue remodelling and URL preservation, which is where these moves fail.',
    },
    { href: '/headless-commerce/', label: 'Headless commerce', note: 'Decoupling the front end from WordPress.' },
    { href: '/ai-search/', label: 'AI search and GEO', note: 'Search across articles and products together.' },
    { href: '/ai-commerce/', label: 'AI commerce', note: 'Product data and content workflows.' },
  ],

  finalHeadline: ['Is WooCommerce the right', 'move for your business?'],
};

/* ═══════════════════════════════════════════════════════════════
   WORDPRESS
   Search intent: commercial and informational. Deliberately not a
   second WooCommerce page: this one is about content platforms,
   performance and the systems behind them, and it hands the
   commerce question to /woocommerce/ rather than answering it
   twice.
   ═══════════════════════════════════════════════════════════════ */

const WORDPRESS: Technology = {
  slug: 'wordpress',
  label: 'WordPress',
  name: 'WordPress',
  eyebrow: 'Yuvraj Raulji | WordPress',
  h1: ['WordPress experiences built', 'for content and performance.'],
  lede:
    'WordPress is the most underestimated system in this list, mostly because it is so easy to start badly. Built deliberately, with a real content model and a caching strategy, it runs marketing sites and publishing operations at a cost no other platform matches. Built by accumulation, it becomes forty plugins and a security incident.',
  cta: 'Discuss your WordPress project',
  title: 'WordPress Commerce | Yuvraj Raulji',
  description:
    'WordPress builds, performance and infrastructure: bespoke themes, custom plugins, a real content model, hardening, and production hosting on AWS.',

  quickAnswer: {
    answer:
      'WordPress is an open-source content management system that runs a large share of the web. It suits businesses whose growth comes from publishing: marketing sites, documentation, editorial operations and brand platforms where the people writing need to ship without a developer. The business problem WordPress addresses is the cost of publishing, and it addresses it well. What it is not, on its own, is a commerce platform. That is WooCommerce, and it is a separate decision with a separate ceiling.',
    bestFor: [
      'Marketing and brand platforms',
      'Publishing and editorial operations',
      'Businesses where non-developers must ship content',
      'Sites where organic search is the growth channel',
    ],
  },

  problems: [
    {
      symptom: 'The site is a plugin graveyard',
      body:
        'Forty plugins, half of them installed for one feature that is no longer used, each one an update obligation and an attack surface. This is how most WordPress sites arrive rather than how any of them were designed.',
      opportunity:
        'A plugin audit that ends in custom code for the handful of things the business actually needs. Fewer dependencies is simultaneously the performance fix and the security fix.',
    },
    {
      symptom: 'Editors cannot build a page without a developer',
      body:
        'Either the theme is too rigid and every layout is a ticket, or a page builder has been installed and every page is now a unique snowflake nobody can maintain.',
      opportunity:
        'A real content model: custom post types, structured fields and block patterns, so editors compose from components that were designed rather than from a blank canvas.',
    },
    {
      symptom: 'It is slow, and caching plugins have not fixed it',
      body:
        'Time to first byte on an uncached page measured in seconds, because the caching layer is a plugin sitting on top of a hosting arrangement that was never sized for the site.',
      opportunity:
        'Object caching, a page cache at the server rather than in PHP, an image pipeline and a CDN, on infrastructure provisioned for the workload. AWS with EC2, RDS and S3 behind Nginx is the reproducible version of this.',
    },
    {
      symptom: 'The site is a security liability',
      body:
        'Unpatched plugins, no update discipline, no separation between the editing surface and the public one. On WordPress the attack surface is the plugin list, and it grows quietly.',
      opportunity:
        'Hardening as part of the build rather than after the incident: reduced plugin surface, controlled update path, least-privilege roles, and infrastructure that can be rebuilt from configuration.',
    },
  ],

  approach: [
    {
      num: '01',
      title: 'Understand',
      covers: ['Business model', 'Customers', 'Products', 'Operations'],
      body:
        'Who publishes, how often, and what they are blocked by today. WordPress projects succeed or fail on whether the people writing can work without help, and that is a workflow question rather than a design one.',
    },
    {
      num: '02',
      title: 'Architect',
      covers: ['Systems', 'Integrations', 'Customer journey'],
      body:
        'The content model first: custom post types, taxonomies and structured fields, so the site has a shape rather than a pile of pages. Then the plugin list as a deliberate dependency set, and where WordPress hands off to another system.',
    },
    {
      num: '03',
      title: 'Build',
      covers: ['Technology', 'Experience', 'Functionality'],
      body:
        'A bespoke theme built from block patterns editors can actually compose with, and custom plugins for the behaviour that is specific to this business. Anything business-critical is code you own rather than a settings screen.',
    },
    {
      num: '04',
      title: 'Optimize',
      covers: ['Performance', 'CRO', 'SEO', 'Customer experience'],
      body:
        'Server-level page caching, object caching, image pipeline and CDN, plus the technical SEO WordPress makes easy to get wrong: permalink structure, pagination, archive handling and structured data. Measured with field data from real devices.',
    },
    {
      num: '05',
      title: 'Scale',
      covers: ['Automation', 'AI', 'Analytics', 'Personalization'],
      body:
        'Editorial workflow automation, structured data that makes the library legible to search and to AI answer engines, and content operations that raise throughput without lowering the standard. The writing itself stays human, which on a publishing business is the asset.',
    },
  ],

  capabilities: [
    {
      group: 'Content platform',
      items: ['Custom post types', 'Taxonomies and structured fields', 'Block patterns', 'Editorial workflow', 'Multilingual'],
    },
    {
      group: 'Custom development',
      items: ['Bespoke themes', 'Plugin development', 'REST API endpoints', 'Headless front ends'],
    },
    {
      group: 'Performance',
      items: ['Server page caching', 'Object caching', 'Image pipeline', 'CDN', 'Core Web Vitals'],
    },
    {
      group: 'Infrastructure and security',
      items: ['AWS EC2, RDS and S3', 'Nginx', 'Hardening', 'Backup and recovery', 'Reproducible environments'],
    },
    {
      group: 'Search and AI',
      items: ['Technical SEO', 'Structured data', 'Content operations', 'On-site search', 'AI answer readiness'],
    },
  ],

  ai: [
    {
      title: 'Content operations',
      what: 'Taking the overhead off publishing: metadata, structured data, internal link suggestions and content gap analysis.',
      how: 'Analysis across the existing library and search performance data, producing proposals for an editor rather than published output.',
      value: 'Editorial throughput. On a publishing business the constraint is rarely writing ability, it is everything that surrounds each piece.',
      human: 'Every proposal is reviewed. What is worth publishing is the editorial judgement that makes the site worth reading, and automating it removes the reason anyone visits.',
      limit: 'It cannot supply expertise or first-hand experience. A site that publishes generated articles trades its only durable advantage for volume.',
    },
    {
      title: 'Structuring for AI answers',
      what: 'Making the library legible to systems that answer questions rather than list links.',
      how: 'Direct answers near the top of each section, definitions that survive extraction, schema that matches the visible page, a named author with a verifiable record, and llms.txt.',
      value: 'Being cited correctly when the answer arrives before the click. For a content-led business this is the shift that most changes the traffic model.',
      human: 'Someone reads what the answer engines currently say about the business and treats a wrong answer as a content defect with an owner.',
      limit: 'It is not a ranking control and no one can guarantee an AI citation. It makes a page easier to understand and quote, and that is the whole of it.',
    },
    {
      title: 'On-site search',
      what: 'Search across a large content library that understands what a reader is asking rather than which words they used.',
      how: 'Embeddings over post content and structured fields, blended with the keyword index for titles and exact terms.',
      value: 'Whether a large archive is usable. Most WordPress sites past a few hundred posts have a library nobody can navigate, including the people who wrote it.',
      human: 'The failing queries tell you what the library is missing, and that is an editorial plan rather than a search fix.',
      limit: 'It surfaces what exists. If the archive does not answer the question, better retrieval only proves that faster.',
    },
  ],

  architecture: [
    { name: 'Reader', detail: 'Usually arriving from organic search onto a single page, not the homepage.', tech: ['Browser', 'Organic search', 'AI answer engines'] },
    { name: 'Presentation', detail: 'A bespoke theme built from patterns an editor can compose with.', tech: ['WordPress theme', 'Block editor', 'Block patterns'] },
    { name: 'Application', detail: 'WordPress itself, plus only the plugins that earn their place.', tech: ['WordPress', 'Custom plugins', 'PHP'] },
    { name: 'Content model', detail: 'The part that decides whether the site has a shape or a pile of pages.', tech: ['Custom post types', 'Taxonomies', 'Structured fields'] },
    { name: 'Delivery', detail: 'Caching at the server rather than inside PHP, with an image pipeline in front.', tech: ['Nginx', 'Page cache', 'Object cache', 'CDN'] },
    { name: 'Infrastructure', detail: 'Provisioned for the workload and rebuildable from configuration.', tech: ['AWS EC2', 'RDS', 'S3', 'Backups'] },
    { name: 'Structure', detail: 'What makes the same content legible to a machine that answers rather than lists.', tech: ['Schema.org', 'llms.txt', 'Semantic HTML'] },
  ],

  fit: {
    goodFit: [
      'Publishing is the growth channel',
      'Non-developers need to ship pages without a ticket',
      'A content library large enough to need a real model',
      'Marketing and brand platforms with frequent change',
      'A budget where platform licence cost matters',
    ],
    thinkTwice: [
      'Commerce is the business rather than a section of the site',
      'Nobody will own updates, backups and the security posture',
      'The requirement is really an application rather than a site',
      'Complex user accounts, permissions or transactional workflow',
      'A team that wants a page builder and no content model',
    ],
  },

  comparison: {
    columns: ['WordPress', 'WordPress plus WooCommerce', 'A hosted commerce platform'],
    rows: [
      { criterion: 'Primary job', cells: ['Publishing', 'Publishing with a store', 'Selling'] },
      { criterion: 'Speed to launch', cells: ['Weeks', 'Weeks to months', 'Weeks'] },
      { criterion: 'Editorial control', cells: ['Best of the three', 'Strong', 'Limited'] },
      { criterion: 'Catalogue depth', cells: ['Not applicable', 'Modest', 'Where it is strongest'] },
      { criterion: 'Operations', cells: ['You own it', 'You own it', 'Managed for you'] },
      { criterion: 'Security burden', cells: ['Plugin surface', 'Larger plugin surface', 'Mostly the platform'] },
      { criterion: 'Cost model', cells: ['Hosting and build', 'Hosting, build, plugins', 'Platform fees on volume'] },
      { criterion: 'AI opportunity', cells: ['Content and search', 'Content, search, product data', 'Search and catalogue'] },
    ],
    note:
      'The useful comparison for WordPress is not against commerce platforms, it is against the version of itself you would get by accumulation. A deliberate WordPress build with a real content model and server-level caching outperforms most hosted alternatives on cost and editorial control. The same site assembled from plugins over three years underperforms all of them.',
    links: [
      { href: '/woocommerce/', label: 'WooCommerce, when the store becomes part of the job' },
      { href: '/shopify/', label: 'Shopify, when selling is the business rather than a section' },
      { href: '/ai-search/', label: 'AI search and GEO for a content library' },
    ],
  },

  cases: [],
  posts: ['magento2-seo-technical-audit', 'aws-magento2-server-setup', 'cro-double-conversion'],
  casesNote: '',

  outcomes: [
    {
      label: 'Publishing throughput',
      body:
        'How many pages the team ships without a developer. It is the number a WordPress project should be judged on, and a content model is what moves it.',
    },
    {
      label: 'Time to first byte',
      body:
        'The number caching plugins claim to fix and mostly do not, because the fix is at the server and in the hosting rather than in PHP.',
    },
    {
      label: 'Dependency count',
      body:
        'Plugins are simultaneously the performance cost, the security surface and the upgrade burden. Reducing the count improves all three at once, which is rare enough to be worth naming.',
    },
    {
      label: 'Answer accuracy',
      body:
        'Whether an AI assistant can state correctly what the business does, from the content the business has published. For a publishing operation this is becoming the visibility metric that matters.',
    },
  ],
  outcomesNote:
    'No measured figure is quoted here. The WordPress record is real and sits in the service and infrastructure record, including custom builds, bespoke themes, plugin development, and production provisioning on AWS EC2, RDS and S3 with Nginx for WordPress and WooCommerce. None of the six builds on the work record is published as a WordPress case, so this page describes the levers rather than borrowing a number from a different platform.',

  faqs: [
    {
      q: 'What is WordPress used for?',
      a: 'Publishing. Marketing sites, editorial operations, documentation and brand platforms where the people writing need to ship without a developer. It is a content management system first, and everything else it does is an extension of that.',
    },
    {
      q: 'Is WordPress good for business websites?',
      a: 'Yes, when it is built deliberately. A real content model, a bespoke theme, a small and intentional plugin set and server-level caching produce a site that is cheap to run and easy to publish on. The bad reputation comes from sites assembled by accumulation, which is a process problem rather than a platform one.',
    },
    {
      q: 'Can WordPress handle commerce?',
      a: 'Through WooCommerce, yes, and that is a separate decision with its own ceiling. WordPress on its own manages content. If the business is primarily selling rather than primarily publishing, the platform question should start from the commerce requirements instead.',
    },
    {
      q: 'Why is my WordPress site slow?',
      a: 'Almost always the plugin list and the hosting, in that order. Each plugin loads its own assets on every page, and a caching plugin cannot fix an uncached time to first byte caused by undersized infrastructure. The fix is fewer dependencies, caching at the server, an image pipeline and a CDN.',
    },
    {
      q: 'How do you make WordPress secure?',
      a: 'Reduce the plugin surface, control the update path, apply least-privilege roles, and run infrastructure that can be rebuilt from configuration rather than restored from memory. On WordPress the attack surface is the dependency list, so the security audit and the performance audit are the same piece of work.',
    },
    {
      q: 'Should I use a page builder?',
      a: 'Usually not. A page builder trades a content model for short-term flexibility, and the bill arrives as pages nobody can maintain and markup nobody can optimise. Block patterns designed for the site give editors real freedom inside a system that still has a shape.',
    },
    {
      q: 'Is WordPress good for SEO?',
      a: 'It is one of the best platforms for it, provided the structure is deliberate. Permalinks, archive and pagination behaviour, canonical handling and structured data are all easy to get wrong by default and straightforward to get right on purpose.',
    },
    {
      q: 'Can WordPress run headless?',
      a: 'Yes, through the REST API with a Next.js front end. It is worth doing when the front end genuinely needs its own release cycle or rendering model. It also costs you the WordPress preview and editing experience, which on a publishing site is a real loss rather than a footnote.',
    },
    {
      q: 'Can AI help with a WordPress site?',
      a: 'For content operations, structured data and on-site search, yes. For writing the content, only as drafting assistance with editorial review. A publishing business that generates its articles has traded the expertise that made it worth reading for volume that anyone can produce.',
    },
    {
      q: 'Do you handle WordPress hosting?',
      a: 'Yes. Production environments on AWS with EC2, RDS and S3 behind Nginx, built to be reproducible rather than configured once by hand. The same infrastructure practice covers Magento and WooCommerce.',
    },
  ],

  related: [
    { href: '/woocommerce/', label: 'WooCommerce', note: 'When the content site needs to sell.' },
    { href: '/ai-search/', label: 'AI search and GEO', note: 'Being cited when the answer arrives before the link.' },
    { href: '/shopify/', label: 'Shopify', note: 'If selling is the business rather than a section of the site.' },
    { href: '/headless-commerce/', label: 'Headless commerce', note: 'Next.js in front, WordPress behind.' },
    { href: '/ai-automation/', label: 'AI automation', note: 'Editorial and operational workflow.' },
    { href: '/digital-transformation/', label: 'Digital transformation', note: 'When the website is one part of a larger stack.' },
  ],

  finalHeadline: ['Is WordPress the right', 'platform for your business?'],
};

/* ═══════════════════════════════════════════════════════════════
   HEADLESS COMMERCE
   Search intent: technical and commercial. The page most likely to
   talk a reader out of the project, which is the point.
   ═══════════════════════════════════════════════════════════════ */

const HEADLESS: Technology = {
  slug: 'headless-commerce',
  label: 'Headless Commerce',
  name: 'headless commerce',
  eyebrow: 'Yuvraj Raulji | Headless Commerce',
  h1: ['Headless commerce built', 'around customer experience.'],
  lede:
    'Headless is sold as a performance upgrade. It is really an organisational one: it decouples the storefront from the commerce release cycle so the front end stops waiting on back-end deployments. If that is not your bottleneck, it will not pay, and most stores asking for it want a faster theme instead.',
  cta: 'Discuss your commerce architecture',
  title: 'Headless Commerce | Yuvraj Raulji',
  description:
    'Headless and composable commerce on Next.js, GraphQL and the Storefront API. When decoupling pays, when it only adds a deployment surface, and how.',

  quickAnswer: {
    answer:
      'Headless commerce separates the storefront from the commerce platform. The front end is its own application, usually Next.js, talking to the platform over an API instead of rendering from its templates, while the platform still owns catalogue, pricing, cart and orders. What this buys is independence: the front end gets its own roadmap, release cadence and performance budget. What it costs is a second system, with its own build pipeline, hosting surface and caching strategy that somebody has to own permanently. The business problem headless commerce addresses is organisational, not technical.',
    bestFor: [
      'Front-end teams with a roadmap of their own',
      'More than one consumer of the same catalogue',
      'Content teams that ship independently of platform releases',
      'Performance budgets a platform theme cannot meet',
    ],
  },

  problems: [
    {
      symptom: 'Front-end work is queued behind platform releases',
      body:
        'A copy change waits three weeks for a deployment window. This is the problem headless actually solves, and it is an organisational symptom rather than a technical one.',
      opportunity:
        'Decoupling gives the storefront its own pipeline. The measurable version is how often front-end work waits on a platform release today, and for how long, which is worth counting before committing to anything.',
    },
    {
      symptom: 'The storefront has to serve more than the store',
      body:
        'Web, app, kiosk and marketplace feed all needing the same catalogue and pricing, each currently getting its own partial copy.',
      opportunity:
        'At that point the API boundary already exists in practice, and headless makes it explicit rather than inventing it. This is the case where decoupling is close to free, because you were paying for it informally.',
    },
    {
      symptom: 'Performance has hit the template ceiling',
      body:
        'Server-rendered platform templates carrying a decade of accumulated front-end, where every improvement fights the one before it.',
      opportunity:
        'Sometimes the answer is a theme rebuild rather than a decoupling, and it is worth being honest about which. When it genuinely is the ceiling, rendering and caching decided per route is what lifts it.',
    },
    {
      symptom: 'The content stack and the commerce stack are fighting',
      body:
        'Editorial in one system, catalogue in another, and every landing page a negotiation between them.',
      opportunity:
        'Composable puts them side by side behind one front end rather than nesting one inside the other, so a campaign page stops being a platform deployment.',
    },
  ],

  approach: [
    {
      num: '01',
      title: 'Understand',
      covers: ['Business model', 'Customers', 'Products', 'Operations'],
      body:
        'Establish whether the bottleneck is real. How often does front-end work actually wait on a platform release, and for how long. If that number is small, the project is a theme rebuild and should be scoped and priced as one.',
    },
    {
      num: '02',
      title: 'Architect',
      covers: ['Systems', 'Integrations', 'Customer journey'],
      body:
        'Draw the API boundary deliberately: what the storefront owns, what the platform owns, and where cart and session state live. Every ambiguity here becomes a bug that only appears under load, which is the worst time to find it.',
    },
    {
      num: '03',
      title: 'Build',
      covers: ['Technology', 'Experience', 'Functionality'],
      body:
        'Next.js against GraphQL or a Storefront API, with rendering decided per route: static, incremental or server rendered, and the cache invalidation path written down. On a commerce site that is the architecture, not a configuration detail.',
    },
    {
      num: '04',
      title: 'Optimize',
      covers: ['Performance', 'CRO', 'SEO', 'Customer experience'],
      body:
        'SEO parity as a launch gate. URLs, canonical handling, structured data, pagination and faceted navigation carried across before cutover, not after. A headless launch that resets the URL structure is the most expensive way to redesign a site.',
    },
    {
      num: '05',
      title: 'Scale',
      covers: ['Automation', 'AI', 'Analytics', 'Personalization'],
      body:
        'Edge caching and personalisation at the front end, and search that reads from the same API layer. Decoupling makes AI retrieval easier to add, because the boundary it needs already exists and is documented.',
    },
  ],

  capabilities: [
    {
      group: 'Front end',
      items: ['Next.js and React', 'Rendering strategy per route', 'Design system', 'Edge caching', 'Core Web Vitals'],
    },
    {
      group: 'API layer',
      items: ['GraphQL', 'Storefront API', 'REST', 'BFF patterns', 'Schema versioning'],
    },
    {
      group: 'Commerce backend',
      items: ['Magento with PWA Studio', 'Shopify with Hydrogen', 'Cart and session', 'Pricing and promotions'],
    },
    {
      group: 'Composable',
      items: ['Headless CMS', 'Search service', 'Payments', 'Personalisation', 'CDN'],
    },
    {
      group: 'Operations',
      items: ['Build pipelines', 'Preview environments', 'Observability', 'Cache invalidation'],
    },
  ],

  ai: [
    {
      title: 'Retrieval at the API layer',
      what: 'Semantic search and recommendations served through the same boundary the storefront already uses.',
      how: 'A retrieval service reads catalogue and content through the existing API, returns ranked results, and the front end renders them like any other data source.',
      value: 'Decoupled architectures make this cheaper to add than monolithic ones, because the integration point is documented and versioned rather than improvised.',
      human: 'Merchandising rules stay in front of the model, and someone reviews the failing queries.',
      limit: 'It does not make the catalogue better. Retrieval quality is bounded by product data quality, and that lives behind the API rather than in front of it.',
    },
    {
      title: 'Edge personalisation',
      what: 'Varying what a visitor sees based on context, at the CDN rather than after the page has loaded.',
      how: 'Segment decisions resolved at the edge with the cached shell, so personalisation does not force every request to the origin.',
      value: 'Relevance without giving up the cache, which is the trade that usually kills personalisation on a commerce site.',
      human: 'Someone owns the segment definitions, because a badly drawn segment is worse than no personalisation at all.',
      limit: 'It cannot personalise what it does not know, and inferring identity from behaviour is the part that goes wrong most visibly in front of customers.',
    },
    {
      title: 'Content and catalogue assembly',
      what: 'Drafting the merchandising content a decoupled front end needs across many landing pages and collections.',
      how: 'Generation against the schema the front end consumes, written into the CMS as drafts rather than published directly.',
      value: 'Throughput on campaign and collection pages, which is where composable stacks generate the most manual work.',
      human: 'Editorial review before publish, every time. The point of composable is that content ships fast, and that is exactly why an unreviewed pipeline is dangerous here.',
      limit: 'It will produce plausible merchandising copy with no knowledge of what is in stock or on promotion unless it is given that data explicitly.',
    },
  ],

  architecture: [
    { name: 'Customer', detail: 'Web, app, kiosk or marketplace, all consuming the same catalogue and pricing.', tech: ['Browser', 'Native app', 'Feeds'] },
    { name: 'Front end', detail: 'Its own application with its own release cycle. This independence is the entire product.', tech: ['Next.js', 'React', 'Design system'] },
    { name: 'Rendering and cache', detail: 'Static, incremental or server rendered per route, with invalidation designed rather than discovered.', tech: ['ISR', 'Edge cache', 'CDN'] },
    { name: 'API layer', detail: 'The contract. Where it is ambiguous, bugs appear under load.', tech: ['GraphQL', 'Storefront API', 'REST', 'BFF'] },
    { name: 'Commerce platform', detail: 'Still owns catalogue, pricing, cart and orders. Headless does not remove it.', tech: ['Magento', 'Shopify', 'PWA Studio', 'Hydrogen'] },
    { name: 'Composable services', detail: 'Content, search and payments as peers rather than nested inside the platform.', tech: ['Headless CMS', 'Search service', 'Payments'] },
    { name: 'AI', detail: 'Another consumer of the same API boundary, which is why it is cheaper to add here.', tech: ['Retrieval', 'Recommendations', 'Edge personalisation'] },
  ],

  fit: {
    goodFit: [
      'The front end has a roadmap of its own, with people assigned to it',
      'More than one consumer of the same catalogue and pricing',
      'A content team that needs to ship independently of platform releases',
      'A performance budget the platform theme cannot meet',
      'Capacity to own a second deployment surface, permanently',
    ],
    thinkTwice: [
      'The real request is a faster site, which is usually a theme project',
      'One team, one storefront, and no queue behind platform releases',
      'Nobody who will own rendering and cache invalidation after launch',
      'A launch date that cannot absorb SEO parity work',
      'A budget that treats the second pipeline as a one-off cost',
    ],
  },

  comparison: {
    columns: ['Headless', 'Platform theme', 'Theme rebuild'],
    rows: [
      { criterion: 'Solves', cells: ['Release coupling', 'Nothing, it is the default', 'Accumulated front-end debt'] },
      { criterion: 'Time to deliver', cells: ['Months', 'Immediate', 'Weeks'] },
      { criterion: 'Ceiling on performance', cells: ['Highest, if managed', 'Platform templates', 'High'] },
      { criterion: 'Ongoing cost', cells: ['A second pipeline, permanently', 'None beyond the platform', 'None beyond the platform'] },
      { criterion: 'Multi-channel', cells: ['Native', 'Awkward', 'Awkward'] },
      { criterion: 'SEO risk at launch', cells: ['Real, and manageable', 'None', 'Low'] },
      { criterion: 'Who must own it', cells: ['A front-end team', 'Whoever has the platform', 'Whoever has the platform'] },
      { criterion: 'AI opportunity', cells: ['Cheapest to add', 'Possible', 'Possible'] },
    ],
    note:
      'The comparison that matters is against a theme rebuild, not against doing nothing. A rebuild reaches most of the performance ceiling in a fraction of the time and adds no permanent operating cost. Headless is worth the difference only when the coupling between front end and platform is genuinely costing you delivery time, and that is a number you can measure before deciding.',
    links: [
      { href: '/magento/', label: 'Magento as the commerce layer, over GraphQL and PWA Studio' },
      { href: '/shopify/', label: 'Shopify as the commerce layer, over the Storefront API' },
      { href: '/ai-commerce/', label: 'AI commerce, which the API boundary makes cheaper to add' },
    ],
  },

  cases: ['fashion-d2c', 'b2b-procurement'],
  posts: ['shopify-headless-nextjs-guide', 'magento2-pwa-studio-headless', 'aws-magento2-server-setup'],
  casesNote:
    'A headless storefront and a custom B2B platform, both built over REST and GraphQL boundaries rather than inside a platform theme.',

  outcomes: [
    {
      label: 'Front-end release cadence',
      body:
        'The number the project exists to change: how often the storefront can ship without waiting for a platform deployment. Measure it before, or the result is unarguable afterwards.',
    },
    {
      label: 'Core Web Vitals',
      body:
        'Headless makes a fast site possible rather than making a site fast. The gain comes from rendering and caching decisions, and those decisions are what to hold the project to.',
    },
    {
      label: 'SEO parity at cutover',
      body:
        'The most valuable outcome of a headless launch is that nothing happens: URLs, canonicals, structured data and pagination survive intact. It is invisible when done well and catastrophic when skipped.',
    },
    {
      label: 'Second-pipeline cost',
      body:
        'The honest counterweight. A build pipeline, a hosting surface and a caching strategy, owned permanently. Projects that budget this as a launch cost rather than an operating one are the ones that regret the architecture.',
    },
  ],
  outcomesNote:
    'No percentage is quoted on this page. The headless record is real and appears in the work list, but no engagement on it has a published performance measurement, and the honest reason is that headless results are inseparable from the rendering and caching choices made alongside them. A number without those choices attached would not tell you anything transferable.',

  faqs: [
    {
      q: 'What is headless commerce?',
      a: 'An architecture where the storefront is a separate application from the commerce platform, talking to it over an API. The platform keeps catalogue, pricing, cart and orders; the front end owns presentation, rendering and its own release cycle. Composable extends the same idea to content, search and payments as independent services.',
    },
    {
      q: 'Does headless make a store faster?',
      a: 'It makes a fast store possible, which is not the same thing. A headless build with an unconsidered rendering strategy is comfortably slower than a well-tuned platform theme. The speed comes from caching and rendering decisions, and most of those are available to you without decoupling at all.',
    },
    {
      q: 'When is headless commerce worth it?',
      a: 'When front-end work is genuinely queued behind platform releases, or when more than one channel consumes the same catalogue. Both are measurable before you commit. If neither is true, headless buys an extra deployment surface, an extra failure mode and very little else.',
    },
    {
      q: 'Headless on Magento or on Shopify?',
      a: 'Both work. Magento with PWA Studio or a custom GraphQL front end suits complex catalogues and B2B rules; Shopify with the Storefront API or Hydrogen suits brand-owned D2C. Choose the commerce layer on the commerce requirements first, then decouple, never the other way round.',
    },
    {
      q: 'What does headless cost to run?',
      a: 'A second build and deploy pipeline, a hosting surface with its own scaling behaviour, and someone who owns the caching strategy. Budget for it permanently rather than as a launch cost, because it does not go away after go-live.',
    },
    {
      q: 'What is the SEO risk in going headless?',
      a: 'The cutover. URLs, redirects, canonical handling, structured data, pagination and faceted navigation all have to carry across before launch rather than after it. Treat parity as a launch gate: if it is not verified, the launch waits.',
    },
    {
      q: 'Is composable the same as headless?',
      a: 'Headless separates the front end from the commerce platform. Composable goes further and treats content, search, payments and commerce as independent services assembled behind one front end. Composable is a superset, and it multiplies both the flexibility and the number of contracts you now own.',
    },
    {
      q: 'Can we go headless incrementally?',
      a: 'Yes, and it is usually the right sequencing. Take one route or one template at a time behind the same domain, with the platform still serving the rest. That keeps each step independently valuable and stops the project becoming a single cutover with no way back.',
    },
    {
      q: 'How does AI fit into a headless architecture?',
      a: 'It becomes another consumer of the API boundary that already exists, which is why retrieval and recommendations are cheaper to add on a decoupled stack. The integration point is documented and versioned instead of improvised, and that is most of the work on a monolith.',
    },
    {
      q: 'Should we go headless just to use Next.js?',
      a: 'No. Enjoying the framework is a real thing, and it is not an architecture decision. If the team wants a modern front-end toolchain and there is no release coupling to solve, a theme rebuild with a proper build pipeline gets most of the benefit without the permanent second system.',
    },
  ],

  related: [
    { href: '/magento/', label: 'Magento', note: 'The commerce layer, over GraphQL and PWA Studio.' },
    { href: '/nextjs/', label: 'Next.js', note: 'The framework the decoupled storefront is actually built in.' },
    {
      href: '/magento/integrations/',
      label: 'Magento API and integration boundaries',
      note: 'The same GraphQL and REST surface, pointed at the back office.',
    },
    { href: '/shopify/', label: 'Shopify', note: 'The commerce layer, over the Storefront API.' },
    { href: '/ai-commerce/', label: 'AI commerce', note: 'What the API boundary makes cheaper to add.' },
    { href: '/ai-search/', label: 'AI search and GEO', note: 'Retrieval served through the same layer.' },
    { href: '/digital-transformation/', label: 'Digital transformation', note: 'Sequencing a decoupling without going offline.' },
    { href: '/wordpress/', label: 'WordPress', note: 'A common content peer in a composable stack.' },
  ],

  finalHeadline: ['Is headless the right', 'architecture for you?'],
};

/* ═══════════════════════════════════════════════════════════════
   AI COMMERCE
   Search intent: informational and strategic. Written as a
   position, not a portfolio. The delivery record behind it is
   automation and integration work, which is named as such.
   ═══════════════════════════════════════════════════════════════ */

const AI_COMMERCE: Technology = {
  slug: 'ai-commerce',
  label: 'AI Commerce',
  name: 'AI commerce',
  eyebrow: 'Yuvraj Raulji | AI Commerce',
  h1: ['AI is changing how', 'people discover and buy.'],
  lede:
    'Most companies asking about AI have a process problem, not an AI problem. Automating a process nobody has fixed gets you the same bad outcome, faster and at higher cost. The applications that hold up in commerce are unglamorous and specific: catalogue enrichment, retrieval-based search, ranking fed by real behaviour, and operations automation.',
  cta: 'Discuss an AI opportunity',
  title: 'AI Commerce | Yuvraj Raulji',
  description:
    'AI for eCommerce: catalogue enrichment, semantic search and operations automation, wired into platforms carrying real order volume rather than left as demos.',

  quickAnswer: {
    answer:
      'AI commerce is the application of machine learning and language models to the parts of an online business that are repetitive, high-volume and low-judgement: enriching product data, understanding what a customer means when they search, ranking what to show them, and automating operational work like quotes, approvals and reconciliation. It matters because those tasks scale badly with people and well with software. The business problem AI commerce addresses is throughput on work nobody should be doing by hand. What it does not address is a process that should not exist.',
    bestFor: [
      'Catalogues too large to enrich or QA by hand',
      'Repeatable processes with high volume and low judgement',
      'Search logs full of queries returning nothing',
      'Operations with data reconciliation on a schedule',
    ],
  },

  problems: [
    {
      symptom: 'The operation runs on manual work',
      body:
        'Quotes, approvals, catalogue QA and data reconciliation absorbing people who should be doing something else. The cost is capacity rather than payroll.',
      opportunity:
        'This is where automation pays, provided the process underneath is worth keeping. On a B2B commerce platform this route took 90% of order and quote processing off people and cut approval cycle time by 40%, and the first version was deterministic workflow rather than AI.',
    },
    {
      symptom: 'On-site search does not understand the catalogue',
      body:
        'Customers searching in language the keyword index has never seen, and leaving with no results on products you actually stock.',
      opportunity:
        'Retrieval and semantic ranking fix this in a way another synonym list will not, because meaning does not have to be enumerated in advance.',
    },
    {
      symptom: 'Product data is too thin to rank or convert',
      body:
        'Tens of thousands of SKUs with supplier descriptions and no attributes. Filters do not work, search does not work, and the category pages have nothing to say.',
      opportunity:
        'Enrichment at that scale is either an AI pipeline with human review or it does not happen at all. Coverage is the metric, and it is countable from day one.',
    },
    {
      symptom: 'AI answers describe the business incorrectly',
      body:
        'Language models increasingly sit between a buyer and a brand, and what they say is now part of how the business is perceived.',
      opportunity:
        'Content structure and structured data that let an answer engine read the business correctly. This is a publishing and markup problem rather than a model problem.',
    },
  ],

  approach: [
    {
      num: '01',
      title: 'Understand',
      covers: ['Business model', 'Customers', 'Products', 'Operations'],
      body:
        'Fix the process first, on paper. Map the current steps and remove the ones that exist because of a system limitation nobody has revisited. Most of the saving is here, and it costs nothing.',
    },
    {
      num: '02',
      title: 'Architect',
      covers: ['Systems', 'Integrations', 'Customer journey'],
      body:
        'Choose applications with a measurable edge and attach the number before starting: coverage, no-result rate, conversion on search sessions, hours off the rota. An AI project without a baseline cannot be judged, which is convenient for the vendor and nobody else.',
    },
    {
      num: '03',
      title: 'Build',
      covers: ['Technology', 'Experience', 'Functionality'],
      body:
        'Wire it into the real system: the live catalogue, the pricing rules and the permission model, through the platform APIs. An integration that runs beside the platform rather than inside it drifts within a quarter.',
    },
    {
      num: '04',
      title: 'Optimize',
      covers: ['Performance', 'CRO', 'SEO', 'Customer experience'],
      body:
        'Keep a human checkpoint wherever the output touches price, stock or a customer commitment, and review the failure cases on a schedule. Agentic systems that plan and execute need this more than generative ones, not less.',
    },
    {
      num: '05',
      title: 'Scale',
      covers: ['Automation', 'AI', 'Analytics', 'Personalization'],
      body:
        'Extend from the application that worked to the one next to it, in the same order every time: data quality, then retrieval, then ranking, then personalisation. Reversing that order personalises bad data, which is worse than doing nothing.',
    },
  ],

  capabilities: [
    {
      group: 'Catalogue',
      items: ['Attribute enrichment', 'Description drafting', 'Categorisation', 'Image tagging', 'Data QA'],
    },
    {
      group: 'Discovery',
      items: ['Semantic search', 'Query understanding', 'Ranking', 'Recommendations', 'Merchandising rules'],
    },
    {
      group: 'Operations',
      items: ['Quote and approval automation', 'Data reconciliation', 'Order exception handling', 'Supplier data processing'],
    },
    {
      group: 'Customer experience',
      items: ['Pre-purchase questions', 'Order status', 'Returns guidance', 'Support deflection'],
    },
    {
      group: 'Foundations',
      items: ['Retrieval and RAG', 'Structured data', 'Workflow automation', 'Evaluation and review'],
    },
  ],

  ai: [
    {
      title: 'Catalogue enrichment',
      what: 'Generating the attributes, descriptions and structured data a large catalogue needs and nobody has the staff to write.',
      how: 'A pipeline reads existing product data, supplier feeds and images, drafts missing fields against a fixed schema, and writes back through the platform API in reviewed batches.',
      value: 'Coverage. Filters, search relevance and category page quality all depend on attributes existing, and none of them can be fixed while half the fields are empty.',
      human: 'Review before publish. The failure mode is a confident, fluent, wrong specification, which on a product page is a returns problem and a trust problem.',
      limit: 'It does not know your products. It works from what it is given, so a supplier feed with wrong dimensions produces enriched wrong dimensions at scale.',
    },
    {
      title: 'Retrieval-based search',
      what: 'Search that understands intent rather than matching strings against product titles.',
      how: 'Embeddings over product text and attributes, queried by meaning, with the keyword index kept underneath for SKUs and exact identifiers. The two are blended rather than swapped.',
      value: 'No-result rate and conversion on search sessions, both of which exist before the project starts. This is the application to fund first on almost any catalogue.',
      human: 'A merchandiser reads the top failing queries monthly. Relevance is a business opinion at the edges and the model does not hold one.',
      limit: 'It cannot sell a product the catalogue describes badly. Retrieval surfaces thin data faster; it does not repair it.',
    },
    {
      title: 'Operations automation',
      what: 'Taking repetitive work out of quotes, approvals, catalogue QA and reconciliation.',
      how: 'Workflow automation wired into the platform APIs and the approval model, with retrieval added only where a step must read policy or contract terms rather than follow a fixed rule.',
      value: 'Hours off the rota and cycle time on approvals. The measured version of this on a B2B platform was 90% of order and quote processing automated and a 40% cut in approval cycle time.',
      human: 'Anything touching price, credit or a customer commitment keeps a named approver. The system prepares the decision, it does not make it.',
      limit: 'It cannot fix a process that should not exist. Automating an unnecessary approval makes it permanent and much harder to remove later.',
    },
    {
      title: 'Agents, where they are actually warranted',
      what: 'Systems that plan across several steps and call tools, rather than answering a single question.',
      how: 'Explicit scope, defined tool access, a bounded set of actions, and a review step before anything commits. Most requests described as agents are better served by deterministic workflow.',
      value: 'Genuine multi-step tasks where the sequence varies by case: exception handling, supplier data with inconsistent shapes, reconciliation that needs judgement about which side is right.',
      human: 'A checkpoint before any action that touches money, stock or a customer. This is a design requirement, not a phase-one compromise to be removed later.',
      limit: 'Reliability falls as the number of steps rises. An agent that is 95% reliable per step is roughly 60% reliable across ten, and commerce operations notice the difference.',
    },
  ],

  architecture: [
    { name: 'Customer', detail: 'Searching, browsing and asking questions in their own words.', tech: ['Storefront', 'Support', 'AI assistants'] },
    { name: 'Experience layer', detail: 'Where AI output is actually seen: search results, product pages, recommendations.', tech: ['Search UI', 'Recommendations', 'PDP content'] },
    { name: 'AI services', detail: 'Retrieval, enrichment and ranking as services, not as a feature inside one page.', tech: ['Embeddings', 'Vector index', 'LLM APIs', 'RAG'] },
    { name: 'Commerce platform', detail: 'Owns catalogue, pricing, permissions and orders. Everything above must respect it.', tech: ['Magento', 'Shopify', 'Custom platform'] },
    { name: 'Workflow', detail: 'Where operations automation runs, with the human checkpoints in it.', tech: ['n8n', 'Queues', 'Approval model'] },
    { name: 'Business systems', detail: 'ERP, PIM and CRM, still the systems of record.', tech: ['ERP', 'PIM', 'CRM'] },
    { name: 'Evaluation', detail: 'The part most projects skip, and the reason they cannot tell whether it worked.', tech: ['Baselines', 'Review queues', 'Coverage metrics'] },
  ],

  fit: {
    goodFit: [
      'A repeatable process with high volume and low judgement per instance',
      'A catalogue too large to enrich or QA by hand',
      'Search logs full of queries returning nothing',
      'Data reconciliation that people do on a schedule',
      'A defined place for a human to check the output before it matters',
    ],
    thinkTwice: [
      'A process nobody has fixed, where automation would make it permanent',
      'No baseline measurement, so the result cannot be argued either way',
      'Product data too thin for retrieval to have anything to work with',
      'An expectation that a chat widget will lift conversion',
      'Volume too low for a model to beat a well-chosen manual rule',
    ],
  },

  comparison: {
    columns: ['AI commerce', 'Deterministic automation', 'Doing nothing'],
    rows: [
      { criterion: 'Best at', cells: ['Ambiguous, unstructured input', 'Fixed rules at volume', 'Nothing, but it is free'] },
      { criterion: 'Setup cost', cells: ['Moderate', 'Low to moderate', 'None'] },
      { criterion: 'Running cost', cells: ['Per call, plus review time', 'Low', 'The manual work continues'] },
      { criterion: 'Predictability', cells: ['Statistical', 'Exact', 'Human variable'] },
      { criterion: 'Fails by', cells: ['Being confidently wrong', 'Refusing to proceed', 'Slowly, and invisibly'] },
      { criterion: 'Needs review', cells: ['Always, somewhere', 'At exceptions', 'Constantly'] },
      { criterion: 'Scales with volume', cells: ['Well', 'Very well', 'Badly'] },
      { criterion: 'Right first choice for', cells: ['Enrichment, search', 'Approvals, routing', 'Low volume'] },
    ],
    note:
      'Most commerce automation should start deterministic and only reach for a model where the input is genuinely unstructured. The 90% automation figure on the B2B platform came from workflow and approval modelling, not from AI, and saying so is the point: choosing the more impressive technology when the simpler one fits is how these projects end up expensive and unreliable at the same time.',
    links: [
      { href: '/ai-search/', label: 'AI search and GEO, the discovery half of this' },
      { href: '/ai-automation/', label: 'AI automation for the operational half' },
      { href: '/magento/', label: 'Magento, where most of this gets wired in' },
    ],
  },

  cases: ['b2b-procurement', 'marketplace'],
  posts: ['ai-ecommerce-revenue-2025', 'magento2-seo-technical-audit'],
  casesNote:
    'The automation and integration record this practice is built on. Both are workflow and catalogue engagements rather than AI deployments, and they are on this page because they are the honest foundation for it.',

  outcomes: [
    {
      metric: '90%',
      label: 'Of B2B order and quote processing automated',
      body:
        'Approval chains and quote handling modelled explicitly, taking the repetitive half of the process off people entirely.',
      context:
        'From a high-traffic B2B commerce platform on Magento 2, with a 40% cut in approval cycle time alongside it. This was deterministic workflow automation, not AI. It is quoted here because it is the record this practice stands on, and mislabelling it would be exactly the thing this page argues against.',
    },
    {
      label: 'Attribute coverage',
      body:
        'The metric for enrichment, and the one everything downstream depends on. Countable before the project starts and countable every week afterwards.',
    },
    {
      label: 'No-result rate',
      body:
        'The clearest measure of whether retrieval improved discovery. Every no-result session is a customer who described what they wanted and got nothing back.',
    },
    {
      label: 'Hours off the rota',
      body:
        'The plainest business case for operations automation, and the one that survives contact with a finance review. Cycle time is the second number.',
    },
  ],
  outcomesNote:
    'One measured figure, and it belongs to workflow automation rather than to AI. This is the newest practice area on the site and no AI engagement on the record has a published measured outcome yet. If you want a delivered AI case study with a number attached, I do not have one to show you, and writing one before it exists would be the fastest way to lose the argument this page is making.',

  faqs: [
    {
      q: 'What is AI commerce?',
      a: 'The application of machine learning and language models to commerce operations: enriching catalogue data, understanding search intent, ranking products, and automating repetitive operational work. It is a set of specific applications with measurable outcomes, not a layer you add to a store.',
    },
    {
      q: 'What is the most reliable AI use case in eCommerce today?',
      a: 'Catalogue enrichment with human review, and retrieval-based on-site search. Both have a number attached before you start, both fail visibly rather than silently, and neither requires the customer to trust the model directly.',
    },
    {
      q: 'Where should a business start with AI in commerce?',
      a: 'With the process, on paper, before any technology. Map the steps, remove the ones that exist because of a system limitation nobody revisited, and then look at what is left. A surprising amount of the available saving is in that first pass and costs nothing.',
    },
    {
      q: 'Do you build AI agents for eCommerce?',
      a: 'Where the task genuinely needs planning across multiple steps, and with explicit scope, defined tool access and a human checkpoint before anything touches price, stock or a customer commitment. Most requests described as agents are better served by deterministic workflow, and I will usually say so.',
    },
    {
      q: 'Will AI replace on-site search as we know it?',
      a: 'It will change the ranking, not remove the requirement. Working implementations are hybrid: embeddings for meaning, keyword matching for identifiers like SKUs and part numbers. Replacing keyword search outright is the most common way these projects regress.',
    },
    {
      q: 'How do you measure whether an AI project worked?',
      a: 'By choosing the number before starting. Attribute coverage for enrichment, no-result rate and search-session conversion for retrieval, hours and cycle time for operations. If none of those is being recorded today, record them for a month first.',
    },
    {
      q: 'Is a chat widget worth adding to a store?',
      a: 'It is the most requested and the least valuable AI feature on most stores. It can genuinely deflect where-is-my-order questions if it is wired to real order data. It cannot be trusted to quote price, stock or delivery, and a confidently wrong delivery date costs more than the ticket it saved.',
    },
    {
      q: 'What does AI cost to run in commerce?',
      a: 'Per-call model cost is usually the smaller half. The larger half is keeping indexes in step with a catalogue that changes daily and the human review time that makes the output safe to publish. Projects budgeted only for the build are the ones abandoned in month four.',
    },
    {
      q: 'Does AI commerce work on any platform?',
      a: 'It works wherever there is a real API and a real permission model to respect. Magento, Shopify and custom platforms all qualify. What matters is that the integration runs inside the platform rules rather than beside them, because anything running beside them drifts within a quarter.',
    },
    {
      q: 'Is there an AI case study with published results?',
      a: 'Not yet. The automation and integration record behind this practice is real and documented in the experience timeline, but no AI engagement on the list has a published measured outcome. Writing one up before it exists would be the fastest way to lose the argument this page is trying to make.',
    },
  ],

  related: [
    { href: '/ai-search/', label: 'AI search and GEO', note: 'Discovery, on your site and in front of it.' },
    { href: '/ai-automation/', label: 'AI automation', note: 'Agents, retrieval and workflow beyond the storefront.' },
    { href: '/magento/', label: 'Magento', note: 'Where the catalogue, pricing and permission rules live.' },
    { href: '/shopify/', label: 'Shopify', note: 'Where semantic search is usually the first spend worth making.' },
    { href: '/digital-transformation/', label: 'Digital transformation', note: 'The process work that has to happen first.' },
    { href: '/headless-commerce/', label: 'Headless commerce', note: 'An API boundary makes all of this cheaper to add.' },
  ],

  finalHeadline: ['Is there an AI opportunity', 'worth funding here?'],
};

/* ═══════════════════════════════════════════════════════════════
   AI AUTOMATION
   Search intent: strategic and commercial. Broader than commerce:
   this is the workflow, agent and retrieval page. It leans on the
   verified automation record and is explicit that the measured
   figure came from deterministic workflow rather than from a model.
   ═══════════════════════════════════════════════════════════════ */

const AI_AUTOMATION: Technology = {
  slug: 'ai-automation',
  label: 'AI Automation',
  name: 'AI automation',
  eyebrow: 'Yuvraj Raulji | AI Automation',
  h1: ['Turn repetitive processes', 'into intelligent workflows.'],
  lede:
    'Automation earns its money on work that is high in volume and low in judgement. The mistake is reaching for a model first: most of what businesses want automated is deterministic, and the parts that genuinely need language understanding are narrower than the pitch suggests. Fix the process, automate what remains, and put a person where it matters.',
  cta: 'Discuss your automation challenge',
  title: 'AI Automation | Yuvraj Raulji',
  description:
    'Workflow and AI automation: agents, LLMs, RAG and MCP applied to quotes, approvals and reconciliation, with human checkpoints where the output touches money.',

  quickAnswer: {
    answer:
      'AI automation is the use of language models and workflow tooling to handle business processes that were previously manual. It covers deterministic workflow, retrieval over a company knowledge base, and agents that plan across several steps and call tools. It suits processes that are repeatable, frequent and low in judgement per instance: quotes, approvals, data reconciliation, exception handling and supplier data processing. The business problem AI automation addresses is capacity. What it cannot do is repair a process that should not exist, and automating one of those makes it permanent.',
    bestFor: [
      'Operations with repeatable, high-volume steps',
      'Approval and quote processes run through email',
      'Data reconciliation done to a schedule',
      'Teams whose capacity is the growth constraint',
    ],
  },

  problems: [
    {
      symptom: 'People are the integration between two systems',
      body:
        'Someone exports from one system, reformats it, and pastes it into another. It works, it is invisible in any budget, and it consumes a person indefinitely.',
      opportunity:
        'This is the highest-return automation available in most businesses and it rarely needs a model. A workflow with an explicit contract on both sides replaces the person, and the person moves to work that needs judgement.',
    },
    {
      symptom: 'Approvals run through email',
      body:
        'Quotes and authorisations chased through inboxes, with no record of who approved what or how long it took. The cost is cycle time, and cycle time is the thing customers actually feel.',
      opportunity:
        'Modelling the approval chain explicitly. On a B2B commerce platform, five-level chains covering development, orders, quotes and vendor management took 90% of order and quote processing off people and cut approval cycle time by 40%.',
    },
    {
      symptom: 'The knowledge is in people, and they are the bottleneck',
      body:
        'Policy, contract terms and product knowledge held in documents nobody can search and heads that are in meetings.',
      opportunity:
        'Retrieval over the real documents, answering with citations rather than from memory. This is where language models genuinely earn their place, because the input is unstructured and the output is a reference rather than an action.',
    },
    {
      symptom: 'Every exception becomes a person',
      body:
        'The happy path is automated and everything else lands on a human, so volume growth still means headcount growth.',
      opportunity:
        'This is the narrow case where agents are warranted: multi-step handling where the sequence varies per case. With explicit scope, defined tool access and a checkpoint before anything commits.',
    },
  ],

  approach: [
    {
      num: '01',
      title: 'Understand',
      covers: ['Business model', 'Customers', 'Products', 'Operations'],
      body:
        'Map the process as it is actually performed, not as it is documented. Count the volume and the time per instance. This step regularly ends the project early by revealing that the work should simply stop, which is the cheapest possible outcome.',
    },
    {
      num: '02',
      title: 'Architect',
      covers: ['Systems', 'Integrations', 'Customer journey'],
      body:
        'Decide what is deterministic and what genuinely needs a model, then design the human checkpoints before anything else. Where the output touches money, stock or a customer commitment, the checkpoint is part of the architecture rather than a phase-two addition.',
    },
    {
      num: '03',
      title: 'Build',
      covers: ['Technology', 'Experience', 'Functionality'],
      body:
        'Workflow tooling for the deterministic majority, retrieval where the input is unstructured, and agents only where the sequence genuinely varies. Wired into the real systems through their APIs and permission models rather than running alongside them.',
    },
    {
      num: '04',
      title: 'Optimize',
      covers: ['Performance', 'CRO', 'SEO', 'Customer experience'],
      body:
        'Review the failure cases on a schedule, not on complaint. Track how often the checkpoint catches something, because that number is the honest measure of how much trust the automation has earned.',
    },
    {
      num: '05',
      title: 'Scale',
      covers: ['Automation', 'AI', 'Analytics', 'Personalization'],
      body:
        'Extend to the adjacent process only after the first one has run unattended for a quarter. Automation that is expanded before it is stable compounds its own errors, and in operations those errors reach customers.',
    },
  ],

  capabilities: [
    {
      group: 'Workflow',
      items: ['Approval chains', 'Quote processing', 'Order exceptions', 'Routing and escalation', 'Scheduled reconciliation'],
    },
    {
      group: 'Language models',
      items: ['Document extraction', 'Classification', 'Drafting with review', 'Summarisation'],
    },
    {
      group: 'Retrieval',
      items: ['RAG over policy and contracts', 'Knowledge base search', 'Citation and provenance', 'Index freshness'],
    },
    {
      group: 'Agents and tools',
      items: ['Scoped tool access', 'MCP integrations', 'Multi-step planning', 'Action checkpoints'],
    },
    {
      group: 'Integration',
      items: ['Platform APIs', 'ERP and CRM', 'Queues and webhooks', 'Permission models'],
    },
  ],

  ai: [
    {
      title: 'Retrieval over company knowledge',
      what: 'Answering internal questions from the documents the business already has, with a reference back to the source.',
      how: 'Documents are chunked and embedded, a question retrieves the relevant passages, and the model answers from those passages rather than from training. The citation is the deliverable as much as the answer.',
      value: 'Time recovered from the people who currently are the knowledge base, and consistency in what the organisation tells itself.',
      human: 'Whoever owns the source document owns the answer. When the retrieval is wrong, the fix is usually the document rather than the model.',
      limit: 'It cannot answer what is not written down, and it will answer anyway unless it is built to say it does not know. That behaviour has to be engineered and tested.',
    },
    {
      title: 'Document extraction',
      what: 'Turning unstructured inbound documents, such as supplier data and purchase orders, into structured records.',
      how: 'A model reads the document, populates a fixed schema, and the result goes into a review queue where confidence is low.',
      value: 'This is the classic case where models beat rules. Twenty suppliers with twenty formats defeat a parser and are unremarkable for an extraction pipeline.',
      human: 'Low-confidence extractions go to a person by design, and the confidence threshold is tuned against real cost rather than set at a default.',
      limit: 'It is confidently wrong on edge cases that look ordinary. Without a review queue the errors are invisible until they are expensive.',
    },
    {
      title: 'Agents with scoped tools',
      what: 'Multi-step handling where the sequence varies by case rather than following a fixed path.',
      how: 'An explicit tool list, a bounded set of actions, a step budget, and a checkpoint before anything commits. MCP is one way to define that tool boundary cleanly.',
      value: 'Exception handling, which is where automation projects usually stop and headcount usually starts.',
      human: 'A person approves any action touching money, stock or a customer commitment. This is a permanent design constraint, not a launch precaution.',
      limit: 'Reliability compounds downward. A step that is 95% reliable is about 60% reliable across ten of them, and operations notice long before that.',
    },
    {
      title: 'Deterministic workflow, which is usually the answer',
      what: 'Rules, routing and approvals implemented as software, with no model involved at all.',
      how: 'Workflow tooling wired into the platform and business systems through their APIs, with the approval model expressed as data.',
      value: 'The 90% automation of B2B order and quote processing came from exactly this, alongside a 40% cut in approval cycle time. No model was involved, and none was needed.',
      human: 'Exceptions route to a named person rather than to a queue nobody owns.',
      limit: 'It cannot handle genuinely unstructured input. That is the boundary where a model starts to earn its place, and it is further out than most proposals assume.',
    },
  ],

  architecture: [
    { name: 'Trigger', detail: 'What starts the process: an order, a document, a schedule, a threshold.', tech: ['Webhooks', 'Queues', 'Schedulers'] },
    { name: 'Orchestration', detail: 'The workflow itself, where the sequence and the branching live.', tech: ['n8n', 'Workflow engine', 'State machine'] },
    { name: 'Reasoning', detail: 'Used only where the input is genuinely unstructured. Most steps skip this tier.', tech: ['LLM APIs', 'Classification', 'Extraction'] },
    { name: 'Retrieval', detail: 'Grounding answers in real documents, with provenance attached.', tech: ['Vector index', 'RAG', 'Citations'] },
    { name: 'Tools', detail: 'What the automation is permitted to do, enumerated rather than implied.', tech: ['MCP', 'Platform APIs', 'Scoped credentials'] },
    { name: 'Checkpoint', detail: 'Where a person approves before anything commits. Designed in, never added later.', tech: ['Review queue', 'Approval model'] },
    { name: 'Systems of record', detail: 'The platforms that hold the truth after the process finishes.', tech: ['ERP', 'CRM', 'Commerce platform'] },
  ],

  fit: {
    goodFit: [
      'A process performed the same way many times a week',
      'Clear inputs and a checkable output',
      'A named person who can own the exceptions',
      'Volume high enough that the review time is worth it',
      'A measurable baseline: hours, cycle time, error rate',
    ],
    thinkTwice: [
      'A process that should be removed rather than automated',
      'Judgement required on every instance',
      'No appetite for a human checkpoint on financial actions',
      'Low volume, where a checklist outperforms a pipeline',
      'A brief that specifies agents before the process is understood',
    ],
  },

  comparison: {
    columns: ['Deterministic workflow', 'LLM in the loop', 'Agents'],
    rows: [
      { criterion: 'Best at', cells: ['Fixed rules at volume', 'Unstructured input', 'Varying multi-step cases'] },
      { criterion: 'Predictability', cells: ['Exact', 'Statistical', 'Lowest'] },
      { criterion: 'Setup cost', cells: ['Low to moderate', 'Moderate', 'High'] },
      { criterion: 'Running cost', cells: ['Low', 'Per call plus review', 'Per call, multiplied by steps'] },
      { criterion: 'Fails by', cells: ['Refusing to proceed', 'Being confidently wrong', 'Compounding across steps'] },
      { criterion: 'Review needed', cells: ['At exceptions', 'On low confidence', 'Before every action'] },
      { criterion: 'Debuggable', cells: ['Fully', 'Partly', 'With difficulty'] },
      { criterion: 'Try this first', cells: ['Almost always', 'When rules fail', 'Rarely, and last'] },
    ],
    note:
      'Read this table left to right and stop at the first column that fits. The industry sells it right to left. The measured 90% automation figure on this site came from the leftmost column, and the projects that disappoint are almost always the ones that started at the right.',
    links: [
      { href: '/ai-commerce/', label: 'AI commerce, where this applies to catalogue and search' },
      { href: '/digital-transformation/', label: 'digital transformation, the process work that comes first' },
      { href: '/ai-search/', label: 'AI search and GEO, retrieval pointed outward instead of inward' },
    ],
  },

  cases: ['b2b-procurement', 'manufacturing'],
  posts: ['ai-ecommerce-revenue-2025', 'aws-magento2-server-setup'],
  casesNote:
    'Automation and integration work from the record. The B2B platform is where the approval and quote automation was built, and it was workflow engineering rather than AI.',

  outcomes: [
    {
      metric: '90%',
      label: 'Of order and quote processing automated',
      body:
        'Five-level approval chains covering development, B2B orders, quotes and vendor management, modelled as a data structure rather than assembled from extensions.',
      context:
        'From a high-traffic B2B commerce platform on Magento 2. This was deterministic workflow automation with no model involved. It appears on an AI automation page because it is the honest benchmark: this is what the simpler technology achieved, and it is the bar anything more complicated has to clear.',
    },
    {
      metric: '40%',
      label: 'Cut in approval cycle time',
      body:
        'The number customers and colleagues actually feel, as distinct from the volume of work removed.',
      context: 'Measured on the same B2B platform, alongside the automation figure above.',
    },
    {
      metric: '30%',
      label: 'Cut in development cycle time',
      body:
        'From introducing structured workflows and approval processes to the delivery process itself, rather than to the commerce operation.',
      context:
        'Recorded as part of the same period of work. It required no new platform, which is the part worth noticing.',
    },
    {
      label: 'Checkpoint catch rate',
      body:
        'How often the human review step finds something wrong. It is the honest measure of how much trust an automation has earned, and it belongs on the dashboard from day one.',
    },
  ],
  outcomesNote:
    'All three figures come from workflow and approval automation, not from language models or agents. That distinction is kept deliberately: the AI layer is where this practice is now going, and it does not yet have a delivered engagement with a published measurement. Presenting workflow results as AI results would make this page an example of the thing it warns about.',

  faqs: [
    {
      q: 'What is AI automation?',
      a: 'Using language models and workflow tooling to handle processes that were previously manual. In practice it spans three things: deterministic workflow, retrieval over documents, and agents that plan across steps and call tools. Most useful implementations are mostly the first and a little of the second.',
    },
    {
      q: 'What should be automated first?',
      a: 'The process where a person is acting as the integration between two systems. It is high volume, it is invisible in every budget, it needs no model, and it is usually the single highest return available. Start there rather than with the most interesting technology.',
    },
    {
      q: 'Do I need AI, or just automation?',
      a: 'Usually just automation. A model earns its place when the input is genuinely unstructured: documents in twenty formats, free-text queries, mixed supplier data. If the input has a shape, rules will be cheaper, faster, exactly predictable and far easier to debug at two in the morning.',
    },
    {
      q: 'What is RAG?',
      a: 'Retrieval-augmented generation: the model answers from documents retrieved at question time rather than from what it memorised in training. It is the right pattern for company knowledge because the answer can cite its source and the source can be corrected without retraining anything.',
    },
    {
      q: 'What is MCP?',
      a: 'The Model Context Protocol, a standard way to give a model access to a defined set of tools and data sources. Its value in automation is the boundary: the tool list is explicit and enumerable, which is exactly what you want when deciding what an automated system is permitted to do.',
    },
    {
      q: 'When are AI agents actually the right choice?',
      a: 'When the sequence of steps genuinely varies per case and cannot be expressed as branching logic. Exception handling is the honest example. If you can draw the flowchart, build the flowchart, because it will be cheaper and it will not surprise you.',
    },
    {
      q: 'How reliable are agents in production?',
      a: 'Less reliable than the demo, and the maths is not intuitive. Reliability compounds across steps, so 95% per step is roughly 60% across ten. That is why scope, step budgets and a checkpoint before committing are structural requirements rather than caution.',
    },
    {
      q: 'Where should a human stay in the loop?',
      a: 'Anywhere the output touches money, stock, credit or a customer commitment. Design the checkpoint in from the start, because a review step added after an incident is much harder to place well than one that was there from the beginning.',
    },
    {
      q: 'How do I measure whether automation worked?',
      a: 'Hours removed, cycle time, error rate and checkpoint catch rate. Record all four before starting. Automation projects without a baseline are impossible to defend in a budget review and impossible to improve.',
    },
    {
      q: 'What does this cost to run?',
      a: 'Per-call model cost is usually the smaller half. The larger half is index freshness, review time and the engineering to keep integrations working as the systems either side change. Budget it as an operating cost rather than a project cost.',
    },
    {
      q: 'Can you automate a process that is not documented?',
      a: 'You can, and it is the most common way these projects go wrong. Undocumented processes contain steps nobody can justify, and automating them makes them permanent. Mapping first is not bureaucracy, it is where most of the saving turns out to be.',
    },
  ],

  related: [
    { href: '/ai-commerce/', label: 'AI commerce', note: 'The same thinking, applied to catalogue and search.' },
    { href: '/ai-search/', label: 'AI search and GEO', note: 'Retrieval pointed at customers instead of at staff.' },
    { href: '/digital-transformation/', label: 'Digital transformation', note: 'Redesigning the process before automating it.' },
    { href: '/magento/', label: 'Magento', note: 'Where the approval and quote automation was built.' },
    {
      href: '/magento/integrations/',
      label: 'Magento B2B workflow and ERP integration',
      note: 'The platform side of the quote and approval automation.',
    },
    { href: '/expertise/ecommerce-consulting/', label: 'eCommerce consulting', note: 'If the question is whether to build this at all.' },
    { href: '/work/', label: 'Selected work', note: 'The record behind the automation figures.' },
  ],

  finalHeadline: ['Is this process worth', 'automating at all?'],
};

/* ═══════════════════════════════════════════════════════════════
   DIGITAL TRANSFORMATION
   Search intent: strategic and commercial. The page that has to
   resist becoming a slide deck.
   ═══════════════════════════════════════════════════════════════ */

const DIGITAL_TRANSFORMATION: Technology = {
  slug: 'digital-transformation',
  label: 'Digital Transformation',
  name: 'digital transformation',
  eyebrow: 'Yuvraj Raulji | Digital Transformation',
  h1: ['Modernize the systems', 'behind your business.'],
  lede:
    'The phrase usually arrives attached to a two-year programme and a slide deck. The version worth paying for is narrower: replace the parts of the stack that are actively costing money, in an order that lets the business keep trading, and stop. What makes these programmes fail is almost never the technology, it is the sequencing.',
  cta: 'Discuss a transformation plan',
  title: 'Digital Transformation | Yuvraj Raulji',
  description:
    'Modernising legacy commerce stacks into API-first systems: process redesign, phased migration and integration boundaries, sequenced so trading continues.',

  quickAnswer: {
    answer:
      'Digital transformation means changing how a business operates using technology, which is different from replatforming, which only changes the system. In commerce it usually covers three things: redesigning processes that were built around a limitation nobody has revisited, moving a legacy stack onto a cloud-native and API-first footing, and drawing integration boundaries so systems stop breaking each other. It suits businesses spending more engineering time on maintenance than on the roadmap. The highest-return part of it frequently needs no new platform at all.',
    bestFor: [
      'Legacy stacks consuming most of the engineering capacity',
      'Businesses whose processes outlived the systems that shaped them',
      'Operations where every integration change is an outage',
      'Replatforming that cannot afford to go offline',
    ],
  },

  problems: [
    {
      symptom: 'A replatforming nobody wants to start',
      body:
        'The risk is not the build, it is the cutover: URLs, redirects, order history, integrations and the week either side. So the decision is deferred, and the cost of the old system compounds quietly.',
      opportunity:
        'Sequenced properly, trading continues throughout and the decision stops being all-or-nothing. Each phase is independently valuable and independently deferrable, which is what makes it approvable.',
    },
    {
      symptom: 'The legacy stack is a full-time job',
      body:
        'Most engineering capacity spent keeping the current system running, so nothing on the roadmap moves. The business is paying for a team it cannot deploy.',
      opportunity:
        'That ratio is the business case and it is usually easy to measure: maintenance hours, change cost, incident frequency and the roadmap items blocked. It is nearly always stronger than the case on the slide.',
    },
    {
      symptom: 'Every system is integrated with every other system',
      body:
        'Point-to-point connections built one at a time until any schema change on either side is an outage. Nobody can say what depends on what.',
      opportunity:
        'Service contracts and explicit boundaries, introduced incrementally rather than in a rewrite. The next change becomes a version rather than an incident.',
    },
    {
      symptom: 'The process was designed around a system nobody uses',
      body:
        'Approval steps and manual reconciliation that exist because of a limitation removed years ago, still being performed daily.',
      opportunity:
        'Remove those before automating anything. Automating an unnecessary step makes it permanent, and this is where the cheapest return in the entire programme sits.',
    },
  ],

  approach: [
    {
      num: '01',
      title: 'Understand',
      covers: ['Business model', 'Customers', 'Products', 'Operations'],
      body:
        'Measure what the current stack costs to run: maintenance hours, change cost, incident frequency, and the roadmap items blocked by it. This is the business case, and it is nearly always more persuasive than the strategic version.',
    },
    {
      num: '02',
      title: 'Architect',
      covers: ['Systems', 'Integrations', 'Customer journey'],
      body:
        'Redesign the process before the system, then draw the integration boundaries the redesigned process needs. Service contracts rather than point-to-point scripts, with the system of record named for every field.',
    },
    {
      num: '03',
      title: 'Build',
      covers: ['Technology', 'Experience', 'Functionality'],
      body:
        'Phase by risk, not by convenience. The riskiest cutover gets the calmest trading week and the most rehearsal, nothing critical lands in peak season, and each phase is independently valuable in case the next one is deferred.',
    },
    {
      num: '04',
      title: 'Optimize',
      covers: ['Performance', 'CRO', 'SEO', 'Customer experience'],
      body:
        'Carry SEO, order history and integration behaviour across intact. Most of the visible damage from a transformation programme happens at cutover, and almost all of it is preventable with mapping and rehearsal.',
    },
    {
      num: '05',
      title: 'Scale',
      covers: ['Automation', 'AI', 'Analytics', 'Personalization'],
      body:
        'Automate what remains once the process is worth keeping. Introducing structured workflows and approval processes cut development cycle time by 30% on its own, before any AI entered the picture.',
    },
  ],

  capabilities: [
    {
      group: 'Assessment',
      items: ['Technical due diligence', 'Cost-to-run analysis', 'Platform selection', 'Risk mapping'],
    },
    {
      group: 'Process',
      items: ['Process redesign', 'Approval modelling', 'Workflow definition', 'Role and permission design'],
    },
    {
      group: 'Architecture',
      items: ['API-first design', 'Integration boundaries', 'Service contracts', 'Cloud migration'],
    },
    {
      group: 'Migration',
      items: ['Phased rollout', 'Data migration', 'URL and redirect mapping', 'Cutover rehearsal', 'Rollback planning'],
    },
    {
      group: 'Operations',
      items: ['Workflow automation', 'Monitoring', 'Reproducible environments', 'Handover and documentation'],
    },
  ],

  ai: [
    {
      title: 'Process discovery from system data',
      what: 'Establishing what a process actually does, from the records systems already keep, rather than from what people remember.',
      how: 'Analysis over order, approval and change logs to reconstruct the real path, including the steps that are skipped and the ones that always stall.',
      value: 'It replaces weeks of interviews with evidence, and it consistently finds steps nobody defends once they are visible.',
      human: 'The business decides which steps to remove. The analysis says what happens; it has no view on what should.',
      limit: 'It only sees what is logged. Work done in email and spreadsheets is invisible to it, and that is often where the worst of it lives.',
    },
    {
      title: 'Migration data mapping',
      what: 'Matching fields between an old system and a new one, including the ones with no obvious counterpart.',
      how: 'A model proposes mappings from schemas and sample data, flags low-confidence matches, and a person confirms every one before anything runs.',
      value: 'Migration mapping is slow, high-volume and error-prone, which is exactly the profile that suits assisted drafting.',
      human: 'Every mapping is confirmed. An unreviewed field mapping is how order history quietly becomes wrong for a decade.',
      limit: 'It cannot know business meaning. Two fields with the same name and different semantics look identical to it and will be mapped together.',
    },
    {
      title: 'Post-migration reconciliation',
      what: 'Checking that what arrived in the new system matches what left the old one.',
      how: 'Automated comparison across both sides, with differences classified by type and severity rather than dumped into a spreadsheet.',
      value: 'It compresses the riskiest week of the programme. Finding a discrepancy on day one instead of month three is the difference between a fix and an incident.',
      human: 'Someone decides which side is correct. The comparison reports the disagreement; it does not resolve it.',
      limit: 'It reports rather than repairs. Automatic correction across a migration boundary is how one bad record becomes a bad dataset.',
    },
  ],

  architecture: [
    { name: 'Current state', detail: 'Measured rather than described: what it costs to run and what it blocks.', tech: ['Cost-to-run analysis', 'Incident data', 'Change logs'] },
    { name: 'Process', detail: 'Redesigned first, because the architecture should serve the process rather than preserve it.', tech: ['Workflow model', 'Approval chains', 'Roles'] },
    { name: 'Boundaries', detail: 'Explicit contracts between systems, with the system of record named per field.', tech: ['API contracts', 'Versioning', 'Event streams'] },
    { name: 'Target platform', detail: 'Chosen against the constraints, not the feature list.', tech: ['Commerce platform', 'ERP', 'CMS'] },
    { name: 'Migration', detail: 'Phased by risk, rehearsed, and reversible for as long as possible.', tech: ['Data mapping', 'Redirect mapping', 'Rollback plan'] },
    { name: 'Infrastructure', detail: 'Reproducible from configuration rather than assembled by hand.', tech: ['AWS', 'Containers', 'CI pipelines'] },
    { name: 'Operations', detail: 'What the business is left running once the programme ends.', tech: ['Monitoring', 'Automation', 'Documentation'] },
  ],

  fit: {
    goodFit: [
      'More engineering time spent on maintenance than on the roadmap',
      'A platform version far enough behind that upgrading is itself a project',
      'Integrations that break whenever either side changes',
      'Processes with steps nobody can explain the reason for',
      'A commercial plan that assumes capabilities the stack does not have',
    ],
    thinkTwice: [
      'The current system works and the constraint is commercial',
      'No executive sponsor who will hold the sequencing when it slips',
      'A programme that only pays at the end',
      'Peak season inside the proposed cutover window',
      'A brief that names the target platform before measuring the current one',
    ],
  },

  comparison: {
    columns: ['Transformation', 'Replatforming', 'Incremental modernisation'],
    rows: [
      { criterion: 'Changes', cells: ['How the business operates', 'The system', 'One constraint at a time'] },
      { criterion: 'Typical duration', cells: ['Phased, ongoing', 'One project', 'Continuous'] },
      { criterion: 'Risk profile', cells: ['Spread across phases', 'Concentrated at cutover', 'Low per change'] },
      { criterion: 'Pays back', cells: ['Per phase, if sequenced', 'At go-live', 'Immediately, in small amounts'] },
      { criterion: 'Needs new platform', cells: ['Often not', 'By definition', 'Rarely'] },
      { criterion: 'Fails by', cells: ['Bad sequencing', 'A bad cutover', 'Losing momentum'] },
      { criterion: 'Best when', cells: ['Process and system both wrong', 'The platform is the constraint', 'The stack is mostly fine'] },
      { criterion: 'Executive attention', cells: ['Sustained', 'Concentrated', 'Minimal'] },
    ],
    note:
      'These are not competing philosophies, they are different-sized answers to different-sized problems, and the expensive mistake is conflating the first two. Replatforming changes the system; transformation changes how the business operates, and the highest-return part of it often needs no new platform at all. If the stack is broadly fine, the third column is the honest recommendation.',
    links: [
      { href: '/magento/', label: 'Magento, a common target for complex commerce' },
      { href: '/headless-commerce/', label: 'headless commerce, a common target for the front end' },
      { href: '/ai-automation/', label: 'AI automation, for what remains once the process is fixed' },
    ],
  },

  cases: ['b2b-procurement', 'manufacturing', 'marketplace'],
  posts: ['shopify-plus-vs-magento2-2025', 'aws-magento2-server-setup', 'ai-ecommerce-revenue-2025'],
  casesNote:
    'Three builds where the work was as much about process and sequencing as about the platform underneath it.',

  outcomes: [
    {
      metric: '30%',
      label: 'Cut in development cycle time',
      body:
        'From introducing structured workflows and approval processes into the delivery process itself.',
      context:
        'Recorded during the same period as the B2B commerce work. It required no new platform, which is the argument this page is making in a single number.',
    },
    {
      metric: '90%',
      label: 'Of B2B order and quote processing automated',
      body:
        'Five-level approval chains modelled explicitly across development, B2B orders, quotes and vendor management.',
      context:
        'From a high-traffic B2B commerce platform on Magento 2, with a 40% reduction in approval cycle time alongside it. Process redesign and workflow modelling, not a replatforming.',
    },
    {
      label: 'Cost to run',
      body:
        'Maintenance hours, change cost and incident frequency. The programme should move all three, and if it cannot be shown to have moved them, it did not work.',
    },
    {
      label: 'Continuity through cutover',
      body:
        'The outcome nobody celebrates: the business kept trading, order history survived, and search visibility was unchanged the week after. It is the hardest part to do and the easiest to take for granted.',
    },
  ],
  outcomesNote:
    'Both figures come from process and workflow work rather than from a platform migration, and they are quoted that way deliberately. The most useful thing this page can tell you is that the highest-return part of a transformation programme is frequently the part that changes no technology at all.',

  faqs: [
    {
      q: 'What is digital transformation?',
      a: 'Changing how a business operates using technology. In commerce that usually means redesigning processes built around old limitations, moving a legacy stack onto an API-first footing, and drawing integration boundaries so systems stop breaking each other. It is broader than a platform project and often includes no new platform.',
    },
    {
      q: 'Is digital transformation the same as replatforming?',
      a: 'No, and conflating them is the common expensive mistake. Replatforming changes the system. Transformation changes how the business operates, and the highest-return part of it frequently needs no new platform at all.',
    },
    {
      q: 'How long does a transformation programme take?',
      a: 'Phase it so that question stops mattering. Each phase should be independently valuable and independently deferrable, which means the programme can stop after any of them without leaving the business worse off. Programmes that only pay at the end are the ones cancelled at month nine.',
    },
    {
      q: 'Can the business keep trading during a migration?',
      a: 'Yes, and it should. The risk sits in the cutover rather than the build, so the work is URL and redirect mapping, order history, integration switchover and rehearsal. Migrations run on that basis are what most of my replatforming experience consists of.',
    },
    {
      q: 'Where should a transformation programme start?',
      a: 'By measuring what the current stack costs to run: maintenance hours, change cost, incident frequency and blocked roadmap items. That measurement is the business case, and it is almost always more convincing than the strategic narrative it replaces.',
    },
    {
      q: 'What makes these programmes fail?',
      a: 'Sequencing, almost never technology. Cutovers scheduled by convenience rather than risk, integrations discovered late, and a phase whose success depends on a phase that has not started. Getting the order right is the actual deliverable.',
    },
    {
      q: 'Do we need to replace the ERP?',
      a: 'Usually not, and it is the most expensive assumption in most proposals. The ERP is generally the system of record and the problem is the integration boundary around it. Fixing the boundary is a fraction of the cost and carries a fraction of the risk.',
    },
    {
      q: 'How does AI fit into digital transformation?',
      a: 'After the process work, not before it. Automating a process nobody has fixed makes the wrong process permanent. Once the steps are worth keeping, retrieval, extraction and workflow automation are where the remaining capacity is recovered.',
    },
    {
      q: 'What if the current system works?',
      a: 'Then leave it alone. If the constraint is commercial rather than technical, a transformation programme is an expensive way to avoid a marketing decision. Modernise the part that is costing money and stop there.',
    },
    {
      q: 'Who needs to be involved from the business?',
      a: 'An executive sponsor who will hold the sequencing when it slips, and the people who actually perform the processes being redesigned. Programmes designed only with managers reliably discover the real process during the first cutover, which is the worst possible moment.',
    },
  ],

  related: [
    { href: '/ai-automation/', label: 'AI automation', note: 'What to automate once the process is worth keeping.' },
    { href: '/magento/', label: 'Magento', note: 'A common target platform for complex commerce.' },
    {
      href: '/magento/consulting/',
      label: 'Testing whether Magento is the right target at all',
      note: 'The platform decision, taken before the modernisation programme commits to one.',
    },
    { href: '/headless-commerce/', label: 'Headless commerce', note: 'A common target architecture for the front end.' },
    { href: '/shopify/', label: 'Shopify', note: 'The simpler answer, when the complexity is not real.' },
    { href: '/ai-commerce/', label: 'AI commerce', note: 'Where the recovered capacity usually goes next.' },
    { href: '/expertise/ecommerce-consulting/', label: 'eCommerce consulting', note: 'Where a programme like this should start.' },
  ],

  finalHeadline: ['Which part of the stack', 'is actually costing you?'],
};

/* ═══════════════════════════════════════════════════════════════
   REGISTRY

   Order is the reading order of the hub, not a ranking: the three
   commerce platforms, then the two content-led ones, then the
   architecture page, then the three AI topics, then the programme
   that contains all of them.
   ═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════
   MIXPANEL
   Search intent: commercial. Someone who has bought Mixpanel, or is
   about to, and needs the implementation to produce numbers anyone
   trusts.

   ── Why one page and not five ──────────────────────────────────

   The master sitemap originally carried /expertise/mixpanel-consulting/,
   -implementation/, -audit/ and -tracking/ alongside a root /mixpanel/.
   That is five pages for one product, four of which the same brief bans
   in as many words for WebEngage and MoEngage, and it would have put
   five pages in competition for one query. Approved as one root page on
   4 Sep 2026, matching the treatment its two siblings get.

   So this page has to carry consulting, implementation, audit and
   tracking design as sections rather than as URLs, which is what the
   `capabilities` groups below do.

   ── What is not claimed ────────────────────────────────────────

   No measured outcome. The analytics record on this site is GA4, GTM
   and dataLayer work; there is no published Mixpanel engagement with a
   number attached, and `outcomesNote` says so rather than borrowing the
   Magento figures.
   ═══════════════════════════════════════════════════════════════ */

const MIXPANEL: Technology = {
  slug: 'mixpanel',
  label: 'Mixpanel',
  name: 'Mixpanel',
  eyebrow: 'Yuvraj Raulji | Mixpanel',
  h1: ['Mixpanel answers product questions.', 'Most implementations cannot.'],
  lede:
    'Mixpanel is only as good as its tracking plan, and most implementations do not have one. Events get added by whoever needed a number that week, properties drift, and within a year nobody trusts a funnel enough to act on it. The work worth paying for is the naming, the schema and the governance, not the installation.',
  cta: 'Discuss a Mixpanel implementation',
  title: 'Mixpanel Consultant | Yuvraj Raulji',
  description:
    'Mixpanel consulting and implementation: tracking plan and event schema, funnels and retention, identity resolution, audits of an existing setup, and governance.',

  quickAnswer: {
    answer:
      'Mixpanel is a product analytics platform for event-based behaviour: what people do inside a product or a store, in what order, and who comes back. Unlike a session-based tool it models a user and their events, which is what makes funnels, retention and cohort analysis possible. The platform is straightforward to install and difficult to get value from, because everything downstream depends on a tracking plan: consistent event names, a property schema, and a rule for who owns changes. An implementation without that produces charts nobody trusts within about a year.',
    bestFor: [
      'Products and stores where behaviour matters more than pageviews',
      'Teams arguing about numbers from two different tools',
      'An existing Mixpanel nobody trusts any more',
      'Funnel and retention questions GA4 answers badly',
    ],
  },

  problems: [
    {
      symptom: 'Two tools give two different numbers',
      body:
        'Mixpanel and GA4 disagree on the same funnel, so meetings become arguments about instrumentation rather than decisions about the product. Nobody wins that argument, and the usual outcome is that both are ignored.',
      opportunity:
        'The two are measuring different things by design, session-based against event-based, and the fix is deciding which question each tool owns and reconciling the definitions once, in writing.',
    },
    {
      symptom: 'Event names were never agreed',
      body:
        'Checkout Started, checkout_started and Started Checkout all exist, from three different releases. Every report has to know which is current, so the knowledge lives in one person rather than in the schema.',
      opportunity:
        'A tracking plan with a naming convention, a property schema and a review step before a new event ships. Unglamorous, and it is the whole difference between analytics and a data landfill.',
    },
    {
      symptom: 'Identity is broken across sign-in',
      body:
        'A person is one user before they log in and another afterwards, so acquisition and retention both understate. This is the single most common Mixpanel implementation error and it is invisible in the charts.',
      opportunity:
        'Identity resolution set up deliberately, with aliasing and identity merge handled at the point of sign-in and sign-up rather than left to defaults.',
    },
    {
      symptom: 'Nobody knows what an event is supposed to mean',
      body:
        'Properties were added ad hoc, some events fire twice, and a few fire on render rather than on action. The reports are precise and wrong, which is worse than obviously broken.',
      opportunity:
        'An audit against the live implementation: what fires, when, with what properties, and which of it contradicts the plan. The output is a list ordered by how much each error distorts a decision.',
    },
  ],

  approach: [
    {
      num: '01',
      title: 'Understand',
      covers: ['Decisions', 'Questions', 'Owners', 'Current tools'],
      body:
        'Which decisions the data is supposed to inform, and who makes them. An analytics implementation designed without that produces a lot of events and no answers, which is the normal failure here.',
    },
    {
      num: '02',
      title: 'Architect',
      covers: ['Tracking plan', 'Event schema', 'Identity', 'Governance'],
      body:
        'Event names, properties, types and the identity model, written down before anything is instrumented. This is the deliverable that outlives the engagement, and the one most implementations skip.',
    },
    {
      num: '03',
      title: 'Build',
      covers: ['Instrumentation', 'Server and client', 'QA', 'Backfill'],
      body:
        'Implemented against the plan, with server-side events where a client-side one would be blocked or unreliable, and each event verified against its definition rather than against whether it appeared.',
    },
    {
      num: '04',
      title: 'Optimize',
      covers: ['Funnels', 'Retention', 'Cohorts', 'Dashboards'],
      body:
        'The reports the questions actually need, kept few. A workspace with forty dashboards has the same problem as no dashboards, because nobody knows which one is authoritative.',
    },
    {
      num: '05',
      title: 'Scale',
      covers: ['Governance', 'Warehouse', 'Handover', 'Review cadence'],
      body:
        'A review step for new events, a route into the warehouse where one exists, and enough documentation that the team can add an event correctly without asking. The goal is to hand it back.',
    },
  ],

  capabilities: [
    {
      group: 'Consulting',
      items: ['Tool fit against GA4', 'Question and decision mapping', 'Measurement strategy', 'Second opinion on a setup'],
    },
    {
      group: 'Implementation',
      items: ['Tracking plan', 'Event and property schema', 'Client and server instrumentation', 'Identity resolution'],
    },
    {
      group: 'Audit',
      items: ['Live event review', 'Duplicate and misfiring events', 'Property drift', 'Plan against reality gap'],
    },
    {
      group: 'Reporting',
      items: ['Funnels', 'Retention and cohorts', 'Dashboards worth keeping', 'Alerting on the numbers that matter'],
    },
  ],

  ai: [
    {
      title: 'Finding the events nobody trusts',
      what: 'Reviewing a large event catalogue for names, properties and volumes that contradict the tracking plan.',
      how: 'The event schema and recent volumes are compared against the documented plan, and the differences are classified rather than listed, so the output is ordered by how much each one distorts a decision.',
      value: 'On a workspace with hundreds of events this is the difference between an audit that finishes and one that gets abandoned halfway.',
      human: 'Every proposed change is reviewed before anything is renamed or deprecated, because an event rename breaks historical reporting.',
      limit: 'It cannot tell you what an event was meant to mean. Where the intent was never written down, the answer comes from the person who added it, or the event gets redefined deliberately.',
    },
  ],

  architecture: [
    { name: 'Product and storefront', detail: 'Where the behaviour happens, and where most events originate.', tech: ['Web', 'App', 'Commerce platform'] },
    { name: 'Client instrumentation', detail: 'Events fired from the browser, with the caveat that ad blockers and privacy modes drop some of them.', tech: ['Mixpanel JS', 'GTM'] },
    { name: 'Server instrumentation', detail: 'The events that must not be lost: purchases, refunds, subscription state.', tech: ['Server SDK', 'Webhooks', 'Queue'] },
    { name: 'Identity', detail: 'The model that decides whether one person is one user. Set deliberately, not by default.', tech: ['Identify', 'Alias', 'Merge'] },
    { name: 'Mixpanel', detail: 'Events, user profiles, funnels, retention and cohorts.', tech: ['Mixpanel'] },
    { name: 'Downstream', detail: 'Where the data goes next, when the questions outgrow the tool.', tech: ['Warehouse', 'BI', 'Engagement platforms'] },
  ],

  fit: {
    goodFit: [
      'A product or store where the question is behaviour over time',
      'Funnels and retention that GA4 cannot answer cleanly',
      'A team that will actually act on the numbers',
      'Someone willing to own a tracking plan',
    ],
    thinkTwice: [
      'Traffic and acquisition reporting, which GA4 does well and free',
      'A team with nobody to own event governance',
      'Sites where the real gap is that nothing is instrumented at all',
      'Buying a second tool to settle an argument the first one could answer',
    ],
  },

  comparison: {
    columns: ['Mixpanel', 'GA4', 'WebEngage or MoEngage'],
    rows: [
      { criterion: 'Model', cells: ['Event and user', 'Session and event', 'Event, plus messaging'] },
      { criterion: 'Best question', cells: ['What do people do, and do they come back', 'Where did traffic come from, and what did it do', 'Who should receive what, and when'] },
      { criterion: 'Funnels and retention', cells: ['Its core strength', 'Workable, less flexible', 'Present, in service of campaigns'] },
      { criterion: 'Acts on the data', cells: ['No, it reports', 'No, it reports', 'Yes, that is the point'] },
      { criterion: 'Cost shape', cells: ['Scales with events', 'Free at most volumes', 'Scales with contacts and messages'] },
    ],
    note:
      'These are not competing products so much as different jobs, and most stacks end up with more than one. The mistake is buying a second tool to answer a question the first one already answers.',
    /* WebEngage and MoEngage are the natural third column here and neither page
       exists yet, so they are named in the table and not linked. A link to an
       unbuilt page is the mistake the platform-service model already guards
       against; the technology registry has no such guard, so it is caught by
       hand. Add both hrefs when those pages ship. */
    links: [
      { href: '/ai-commerce/', label: 'AI commerce, where behavioural data becomes personalisation' },
      { href: '/ai-automation/', label: 'AI automation, when the reporting turns into a process' },
      { href: '/expertise/ecommerce-consulting/', label: 'eCommerce consulting, for which decisions need data at all' },
    ],
  },

  cases: ['b2b-procurement', 'marketplace'],
  casesNote:
    'Two platforms where the measurable behaviour was an internal workflow rather than a storefront funnel, which is the case Mixpanel handles better than a session-based tool.',
  posts: ['cro-double-conversion', 'ai-ecommerce-revenue-2025'],

  outcomes: [
    {
      label: 'Numbers a meeting can act on',
      body:
        'The deliverable is not a dashboard. It is that one set of definitions exists, everyone reads the same funnel the same way, and a disagreement is about the product rather than about the instrumentation.',
    },
    {
      label: 'A tracking plan that outlives the engagement',
      body:
        'Event names, properties, identity rules and a review step, written down. Without it a workspace degrades to the same state within about a year, whoever implemented it.',
    },
  ],
  outcomesNote:
    'No percentage is published here. The measurement record on this site is GA4, Google Tag Manager and dataLayer work, and no Mixpanel engagement on it carries a published figure. A number borrowed from the Magento performance work would describe a different platform and a different problem.',

  faqs: [
    {
      q: 'Do we need Mixpanel if we already have GA4?',
      a: 'Often not. GA4 answers acquisition and traffic well and costs nothing at most volumes. Mixpanel earns its place when the question is behavioural over time: does this cohort come back, where exactly does this multi-step flow break, what do the people who convert do differently. If nobody is asking those questions yet, a second tool adds cost and another set of numbers to disagree with.',
    },
    {
      q: 'What is a tracking plan, and why does it matter so much?',
      a: 'It is the document that defines every event, its properties, their types and when it fires, plus who approves a change. It matters because analytics degrades by accretion: events get added under deadline, names drift, and after a year nobody can say which of three similar events is authoritative. The plan is the only thing that prevents that, and it is what most implementations skip.',
    },
    {
      q: 'Our Mixpanel data is not trusted. Where do you start?',
      a: 'With an audit against the live implementation rather than a rebuild. What fires, when, with what properties, and which of it contradicts what people believe. The output is ordered by how much each error distorts an actual decision, because a wrong event nobody reports on is not worth the migration risk of renaming it.',
    },
    {
      q: 'Should events be sent from the browser or the server?',
      a: 'Both, with the split decided by cost of loss. Anything commercially significant, purchases, refunds, subscription changes, belongs server-side where ad blockers and privacy modes cannot drop it. Interaction detail that only needs to be directionally right can stay client-side.',
    },
    {
      q: 'How does Mixpanel relate to WebEngage or MoEngage?',
      a: 'Mixpanel reports behaviour; engagement platforms act on it. They overlap in that both consume events, and the common mistake is buying an engagement platform for its analytics or Mixpanel for messaging. Decide which tool owns which job before either is implemented, because the integration between them is straightforward and the ownership question is not.',
    },
  ],

  related: [
    { href: '/ai-commerce/', label: 'AI commerce', note: 'Where behavioural data becomes personalisation and recommendation.' },
    { href: '/ai-automation/', label: 'AI automation', note: 'When a reported number should trigger a process instead.' },
    { href: '/shopify/optimization/', label: 'Shopify optimisation', note: 'Where the funnel instrumentation usually gets used first.' },
    { href: '/magento/integrations/', label: 'Magento integrations', note: 'Server-side events across the platform boundary.' },
    { href: '/expertise/ecommerce-consulting/', label: 'eCommerce consulting', note: 'When the question is which decisions need data at all.' },
  ],

  finalHeadline: ['What decision is the', 'data supposed to inform?'],
};

/* ═══════════════════════════════════════════════════════════════
   NEXT.JS
   Search intent: commercial. Someone building or rebuilding a
   storefront in React and deciding who should do it.

   ── The boundary this page has to hold ─────────────────────────

   /headless-commerce/ owns the *decision*: whether decoupling would
   pay at all, and it is written to talk a large share of readers out
   of it. This page owns the *framework*: what you build in once that
   decision is made, and how the rendering and caching model decides
   the result.

   So this page must not re-argue decoupling. It says once, in the
   boundary paragraph, that the decision belongs upstream and links
   there. Without that line the two pages become one page written
   twice, and the weaker of them disappears.

   Tier 1, and deliberately one page. The brief bans /nextjs/consulting/,
   /nextjs/development/ and /nextjs/migration/, which is right: those
   would compete with each other and with the headless services that
   already cover the same work.

   ── What is not claimed ────────────────────────────────────────

   No percentage. The headless hub already states that no engagement
   on the record has a published performance measurement and that
   results are inseparable from the rendering choices made alongside
   them. That applies here with more force, not less, so the outcomes
   are descriptive.

   The one genuinely verifiable Next.js artifact is this site: a static
   export, self-hosted fonts, no render-blocking third party. It is
   cited as what it is rather than dressed up as a case study.
   ═══════════════════════════════════════════════════════════════ */

const NEXTJS: Technology = {
  slug: 'nextjs',
  label: 'Next.js',
  name: 'Next.js',
  eyebrow: 'Yuvraj Raulji | Next.js',
  h1: ['The framework is the easy part.', 'The rendering model is not.'],
  lede:
    'Next.js is the default way to build a decoupled storefront in React, and choosing it settles far less than people expect. What decides whether the result is fast is the rendering tier each template sits in, what invalidates the cache, and how much the GraphQL boundary is asked to return. Teams that get those three right succeed on any framework. Teams that do not are slower than the theme they replaced.',
  cta: 'Discuss a Next.js storefront',
  title: 'Next.js Consultant | Yuvraj Raulji',
  description:
    'Next.js for commerce storefronts: rendering strategy, caching and revalidation, the GraphQL boundary, Core Web Vitals and SEO on Shopify and Magento.',

  quickAnswer: {
    answer:
      'Next.js is a React framework used to build storefronts that are decoupled from the commerce platform behind them. It matters for commerce because it gives you a rendering choice per template: a product page can be built at deploy time and revalidated when the product changes, while cart and account render per request. That choice, not the framework itself, is what makes a headless storefront fast. It connects to Shopify through the Storefront API and to Magento through GraphQL, and the same rendering rules apply to both.',
    bestFor: [
      'A decoupled storefront over Shopify or Magento',
      'A front end that has to release independently of the commerce platform',
      'Content and commerce served from one application',
      'Core Web Vitals that the platform theme cannot reach',
    ],
  },

  problems: [
    {
      symptom: 'The Next.js build is slower than the theme it replaced',
      body:
        'The central promise of the project is visibly unmet, and every future front-end investment is now under suspicion. It is the most common way a headless rebuild loses its budget.',
      opportunity:
        'Almost always too much rendering per request. Moving templates into a cached tier that revalidates on commerce events is configuration rather than a rewrite, and it is where the recoverable time is.',
    },
    {
      symptom: 'Nobody can say what is cached, or for how long',
      body:
        'Stale prices and stock, and a team afraid to touch caching in case something breaks. Cache behaviour nobody can reason about becomes cache behaviour nobody changes.',
      opportunity:
        'Invalidation driven by webhooks on price, stock and publish, so the rule is legible: this event clears these pages. Time-based revalidation is a guess, and on a catalogue it is wrong in both directions at once.',
    },
    {
      symptom: 'GraphQL returns far more than the page shows',
      body:
        'Paid for twice, by the storefront waiting and the commerce platform working. It is invisible in the browser, which is why it survives so long.',
      opportunity:
        'A boundary designed around what each template renders rather than mirroring the platform schema. Fixing it improves the storefront and the backend in the same change.',
    },
    {
      symptom: 'Rankings moved after the rebuild, and the URLs did not',
      body:
        'Canonical tags, internal linking, heading structure and structured data are all regenerated by the new templates, so markup changes even when the address does not. It is easy to miss because nothing looks broken.',
      opportunity:
        'A deliberate diff of the rendered markup against the template it replaced, per template, before the traffic moves.',
    },
  ],

  approach: [
    {
      num: '01',
      title: 'Understand',
      covers: ['Bottleneck', 'Channels', 'Team', 'Roadmap'],
      body:
        'What is actually being waited on, and whether a decoupled front end is the answer to it. This step ends some projects, and that is a cheaper outcome than the alternative.',
    },
    {
      num: '02',
      title: 'Architect',
      covers: ['Rendering tiers', 'Invalidation', 'API boundary', 'Preview'],
      body:
        'Static, cached and revalidated, or per request, chosen per template rather than site wide. Then the events that invalidate each tier and the query shape each template needs. Everything downstream inherits this.',
    },
    {
      num: '03',
      title: 'Build',
      covers: ['Templates', 'Cart and checkout', 'Search', 'Analytics'],
      body:
        'Including everything third party that lived in the old theme: consent, reviews, on-site search, personalisation and A/B tooling. The forgotten ones are found by marketing after launch.',
    },
    {
      num: '04',
      title: 'Optimize',
      covers: ['Core Web Vitals', 'Bundle budgets', 'Images', 'Cache hit rate'],
      body:
        'Field data by template, cache hit rate on a dashboard, and route-level bundle budgets enforced in the pipeline. A budget nobody enforces is a preference.',
    },
    {
      num: '05',
      title: 'Scale',
      covers: ['Failure modes', 'Multi-channel', 'Handover', 'Release cadence'],
      body:
        'A timeout and a fallback for every third-party call, so the storefront loses a widget rather than a page, and enough documentation that the team can add a template without asking.',
    },
  ],

  capabilities: [
    {
      group: 'Rendering',
      items: ['Static generation', 'Incremental revalidation', 'Server components', 'Edge and CDN caching'],
    },
    {
      group: 'Commerce data',
      items: ['Shopify Storefront API', 'Magento GraphQL', 'WooCommerce REST', 'Query shape and over-fetch'],
    },
    {
      group: 'Performance',
      items: ['Core Web Vitals', 'Bundle budgets', 'Image pipeline', 'Font loading', 'Layout stability'],
    },
    {
      group: 'Search',
      items: ['Rendered markup parity', 'Canonicals and pagination', 'Structured data', 'Sitemaps and redirects'],
    },
  ],

  ai: [
    {
      title: 'Semantic search over the catalogue',
      what: 'On-site search that reads a query as a goal rather than matching it against product titles.',
      how: 'Embeddings over product text and attributes, queried from the storefront and blended with the keyword index so SKUs and part numbers still match exactly. In a decoupled front end this sits behind the same API boundary as everything else.',
      value: 'No-result rate and conversion on search sessions, which is where customers who have already decided to buy go missing.',
      human: 'A merchandiser reviews the failing queries. The gaps they expose are usually a buying decision rather than a search one.',
      limit: 'It amplifies the catalogue it is given. Thin product data produces confident, thin results, whatever the front end is built in.',
    },
  ],

  architecture: [
    { name: 'Customer', detail: 'Web and mobile, and any second channel the same commerce data has to serve.', tech: ['Browser', 'PWA'] },
    { name: 'Storefront', detail: 'The Next.js application: templates, rendering tiers and the cache that makes them fast.', tech: ['Next.js', 'React', 'Server components'] },
    { name: 'Edge', detail: 'Where the cached tiers are served from, and where invalidation lands.', tech: ['CDN', 'Edge cache', 'Revalidation'] },
    { name: 'Commerce APIs', detail: 'The boundary the storefront reads through. Designed around templates, not mirrored from the schema.', tech: ['Storefront API', 'GraphQL', 'REST'] },
    { name: 'Commerce platform', detail: 'Catalogue, pricing, cart and orders. Still the system of record.', tech: ['Shopify', 'Magento 2', 'WooCommerce'] },
    { name: 'Content', detail: 'Editorial served by the same application, with preview that does not bypass the cache design.', tech: ['Headless CMS', 'Draft mode'] },
  ],

  fit: {
    goodFit: [
      'Front-end work genuinely blocked behind commerce releases',
      'One commerce backend serving more than one channel',
      'An experience the platform theme cannot express',
      'A team that will own rendering and caching afterwards',
    ],
    thinkTwice: [
      'A slow theme, which is usually cheaper to fix than to replace',
      'No second channel and no blocked release cycle',
      'Nobody to own the deployment and cache once it ships',
      'A rebuild being run at the same time as a platform migration',
    ],
  },

  comparison: {
    columns: ['Next.js', 'Platform theme', 'Hydrogen'],
    rows: [
      { criterion: 'Release cycle', cells: ['Independent of the platform', 'Tied to the platform', 'Independent, Shopify only'] },
      { criterion: 'Rendering control', cells: ['Per template, yours', 'The platform decides', 'Per route, Shopify primitives'] },
      { criterion: 'You now own', cells: ['Cache, deploys, preview, on-call', 'Very little', 'The same, on Oxygen'] },
      { criterion: 'Works with', cells: ['Shopify, Magento, WooCommerce', 'Its own platform', 'Shopify'] },
      { criterion: 'Staffing', cells: ['React, widely available', 'Platform specialists', 'React plus Shopify specifics'] },
    ],
    note:
      'A well-built theme beats a badly configured decoupled storefront comfortably, and most stores asking for this want the theme fixed. The comparison only starts once the release cycle is genuinely the constraint.',
    links: [
      { href: '/headless-commerce/consulting/', label: 'Testing whether decoupling would pay at all' },
      { href: '/shopify/optimization/', label: 'Shopify store optimisation, the cheaper answer most of the time' },
      { href: '/headless-commerce/architecture/', label: 'The rendering and caching decisions in full' },
    ],
  },

  cases: ['fashion-d2c', 'b2b-procurement'],
  casesNote:
    'A headless storefront and a custom B2B platform, both built over an API boundary rather than inside a platform theme.',
  posts: ['shopify-headless-nextjs-guide', 'magento2-pwa-studio-headless', 'cro-double-conversion'],

  outcomes: [
    {
      label: 'A storefront that does what it was built for',
      body:
        'When a decoupled front end underperforms the theme it replaced, the project has not delivered its central argument. Moving templates into the right rendering tier is usually what closes that gap, and it is rarely a rewrite.',
    },
    {
      label: 'A cache anyone on the team can explain',
      body:
        'The durable result is not a score. It is that a new engineer can say what is cached, for how long, and what invalidates it, which is the property that lets the storefront keep changing safely.',
    },
    {
      metric: 'This site',
      label: 'Built on Next.js, and measurable',
      body:
        'yuvrajraulji.com is a Next.js static export: no render-blocking third-party CSS, self-hosted fonts, dimensioned and lazy-loaded images, and every page pre-rendered. It is not a client engagement and it is not offered as one, but it is the one Next.js build on this site anyone can open the source of.',
      context: 'Verifiable directly, rather than reported.',
    },
  ],
  outcomesNote:
    'No percentage is quoted for a client build. The headless hub gives the reason and it applies here with more force: results from a decoupled storefront are inseparable from the rendering and caching decisions made alongside them, so a figure from another build would describe its architecture rather than what is available in yours.',

  faqs: [
    {
      q: 'Does Next.js make a storefront faster?',
      a: 'Not on its own. Speed comes from the rendering and caching strategy, and a Next.js storefront that renders every request against a slow GraphQL query is slower than the theme it replaced. What Next.js gives you is the choice: which templates are built ahead of time, which are cached and revalidated on a commerce event, and which genuinely need to render per request.',
    },
    {
      q: 'Next.js or Hydrogen for a Shopify storefront?',
      a: 'Hydrogen is closer to Shopify\'s own primitives and Oxygen hosting; Next.js is more general, easier to staff for, and suits builds that also serve non-commerce content. The decision is usually about the team you will have in two years rather than the framework\'s features today.',
    },
    {
      q: 'Can Next.js work with Magento or WooCommerce?',
      a: 'Yes. Magento exposes GraphQL and WooCommerce a REST API, and the rendering rules are the same in all three cases. What differs is how much work the boundary has to do: a Magento catalogue with deep attribute structure needs more deliberate query design than a small WooCommerce store.',
    },
    {
      q: 'What does a Next.js storefront cost to own after launch?',
      a: 'A rendering strategy, cache invalidation, content preview, a deployment pipeline and someone accountable for the front end being up. None of that appears in a build estimate and all of it is permanent, which is why the ownership cost matters more than the project cost when deciding.',
    },
    {
      q: 'Is SEO harder on a Next.js storefront?',
      a: 'It is not harder, it is less automatic. The platform theme generated canonicals, internal linking and structured data for you; now your templates do. The risk is a rebuild that keeps the URLs and quietly changes the markup, so each moved template needs an explicit diff against the one it replaced rather than an assumption of parity.',
    },
  ],

  related: [
    { href: '/headless-commerce/', label: 'Headless commerce', note: 'The decision this page assumes has already been made.' },
    { href: '/shopify/', label: 'Shopify', note: 'The commonest commerce backend behind a Next.js storefront.' },
    { href: '/magento/', label: 'Magento', note: 'Over GraphQL, where the catalogue is the complicated part.' },
    { href: '/woocommerce/', label: 'WooCommerce', note: 'Over the REST API, when the content system stays in place.' },
    { href: '/headless-commerce/optimization/', label: 'Storefront performance', note: 'Rendering tiers, cache hit rate and bundle budgets on a live build.' },
    { href: '/work/fashion-d2c/', label: 'A headless storefront, built', note: 'The decoupled build on the record, and the decision inside it.' },
  ],

  finalHeadline: ['What renders where,', 'and when?'],
};

export const TECHNOLOGIES: Technology[] = [
  SHOPIFY,
  MAGENTO,
  WOOCOMMERCE,
  WORDPRESS,
  HEADLESS,
  AI_COMMERCE,
  AI_SEARCH,
  AI_AUTOMATION,
  DIGITAL_TRANSFORMATION,
  /* Tier 1, and the last of that tier to be built. One page: the brief bans
     /nextjs/consulting/, /development/ and /migration/, which would compete
     with each other and with the headless services that already cover it. */
  NEXTJS,
  /* Tier 2. Root level like every other platform, and one page rather than
     five: see the note above the MIXPANEL definition. */
  MIXPANEL,
];

export const TECHNOLOGIES_BY_SLUG: Record<string, Technology> = Object.fromEntries(
  TECHNOLOGIES.map((t) => [t.slug, t]),
);

/** Nav and hub links, in registry order. */
export const TECHNOLOGY_LINKS = TECHNOLOGIES.map((t) => ({
  href: techHref(t.slug),
  label: t.label,
}));

/**
 * The same links, grouped for the footer.
 *
 * Grouped here rather than sliced by index inside the footer component, so
 * adding a technology cannot silently drop it out of one column and into the
 * other. A slug named here that no longer exists throws at build time, which is
 * the failure mode to want: the alternative is a footer that quietly stops
 * linking a page.
 *
 * The footer is where these links matter most. Every older page on the site
 * collects inbound internal links from the header and footer on all 25 routes;
 * before this, the technology pages were reachable only from the hub and from
 * each other, which left the pages built to rank with the least internal link
 * equity on the site.
 */
function group(slugs: readonly string[]) {
  return slugs.map((slug) => {
    const t = TECHNOLOGIES_BY_SLUG[slug];
    if (!t) throw new Error(`Unknown technology slug in footer group: ${slug}`);
    return { href: techHref(t.slug), label: t.label };
  });
}

export const PLATFORM_LINKS = group([
  'shopify',
  'magento',
  'woocommerce',
  'wordpress',
  'headless-commerce',
  'nextjs',
  /* Added when /mixpanel/ shipped. Without it the page had exactly one inbound
     link on the whole site, from the expertise hub's generated list, and no
     chrome link at all: a Tier 2 commercial page reachable only by someone who
     had already found the hub above it. */
  'mixpanel',
]);

export const AI_LINKS = group([
  'ai-commerce',
  'ai-search',
  'ai-automation',
  'digital-transformation',
]);
