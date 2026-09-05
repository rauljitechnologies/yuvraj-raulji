/**
 * /magento-shopify-migration/
 *
 * ── Why this page exists ────────────────────────────────────────────────────
 *
 * The Sep 2026 audit found this the clearest content gap on the site. Five
 * migration pages exist, one per platform, and each is written from the
 * destination's point of view: /shopify/migration/ covers moving on to Shopify
 * from anywhere, /magento/migration/ covers moving on to Magento from anywhere.
 * A reader deciding specifically between Magento and Shopify gets half an
 * answer from each and a complete one from neither.
 *
 * That specific pairing is also the highest commercial intent shape in commerce
 * search. It is a decision that is expensive to reverse, researched hard before
 * anyone speaks to a consultant, and the exact question "when should a business
 * migrate from Magento to Shopify" had no owning page.
 *
 * ── The boundary this page has to hold ──────────────────────────────────────
 *
 * It owns the *comparison and the decision*. It does not own the delivery work
 * on either side: /shopify/migration/ and /magento/migration/ keep that, and
 * this page links to both rather than restating them. Without that boundary
 * this becomes a third page competing with two that already rank.
 *
 * ── What is deliberately not in it ──────────────────────────────────────────
 *
 * No client names, no migration counts, no percentage improvements, no
 * timelines presented as typical. CONTENT-PRINCIPLES rules out inventing
 * experience, and none of those numbers exist in a form that could be stated
 * honestly. What the page does have is the decision logic and the mechanics,
 * which is what the reader is actually missing and what neither existing page
 * gives them in one place.
 */

export interface MigrationFaq {
  q: string;
  a: string;
}

export interface MigrationSignal {
  title: string;
  body: string;
}

export interface MigrationStep {
  num: string;
  title: string;
  body: string;
}

export const MIGRATION = {
  slug: 'magento-shopify-migration',
  eyebrow: 'Magento | Shopify | Migration',
  h1: ['Magento to Shopify,', 'and the case for staying put.'],
  lede:
    'Both platforms are capable, and most of the arguments made for moving between them are really arguments about cost, staffing or a catalogue that has outgrown its data model. This is the decision logic, in both directions, and the situations where the honest answer is that the platform is not the problem.',
  cta: 'Discuss a replatforming decision',
  title: 'Magento to Shopify Migration | Yuvraj Raulji',
  description:
    'When moving between Magento 2 and Shopify Plus is the right call, when it is not, what actually transfers, and how a cutover runs without losing rankings.',

  primaryKeyword: 'magento to shopify migration',
  secondaryKeywords: [
    'shopify to magento migration',
    'magento 2 to shopify plus',
    'replatform magento to shopify',
    'magento shopify comparison',
    'commerce replatforming',
  ],
  searchIntent: 'Commercial investigation, immediately before a transactional decision',
  audience:
    'A business owner or head of eCommerce carrying a platform they suspect is wrong, usually driven by cost, release speed or a team they can no longer staff.',
  purpose:
    'Own the specific Magento and Shopify pairing that the two per-platform migration pages each answer only half of, and answer the decision question directly enough to be quoted.',
  entities: [
    'Magento 2',
    'Adobe Commerce',
    'Shopify',
    'Shopify Plus',
    'Liquid',
    'Storefront API',
    'ERP',
    'Core Web Vitals',
    '301 redirect',
  ],

  /* The extractable answer. Placed first in the page and first in the FAQ,
     because it is the question the URL exists to answer. */
  quickAnswer: {
    question: 'When should a business migrate from Magento to Shopify?',
    answer:
      'When the cost of running Magento has stopped buying anything the business uses. That usually shows up in three places at once: the catalogue and checkout no longer need behaviour Shopify cannot express, the team maintaining the platform has become hard to staff or retain, and the release cycle is slow enough that merchandising decisions wait on technical ones. If all three are true the move usually pays. If the reason is only hosting cost, or only a slow site, the platform is rarely the problem and a migration is an expensive way to avoid diagnosing it.',
    bestFor: [
      'A catalogue whose complexity has shrunk rather than grown',
      'A team without a dedicated platform specialist',
      'A business trading in a few markets, not dozens of tax and locale combinations',
    ],
  },

  /* Both directions, because a page that only argues one way is a sales page. */
  toShopify: [
    {
      title: 'The customisation has quietly gone unused',
      body:
        'Magento earns its cost through behaviour a hosted platform cannot express: negotiated pricing, approval chains, deep attribute inheritance, per-store catalogues. If the modules delivering that were removed two roadmaps ago and nobody noticed, the business is paying for an open architecture it no longer opens.',
    },
    {
      title: 'The platform has become a staffing problem',
      body:
        'Magento needs someone who knows Magento. When that person leaves, and the replacement is a contractor who bills to relearn the codebase every quarter, the real cost of the platform is not the hosting. Shopify moves that burden onto the vendor, which is worth something specific and worth nothing at all if the reason for Magento was never staffing.',
    },
    {
      title: 'Merchandising is waiting on releases',
      body:
        'If changing a promotion, a template or a collection needs a deployment, the trading team is running at the technical team’s cadence. That gap is the most common reason a business outgrows its own platform, and it is the one Shopify closes most decisively.',
    },
  ] as readonly MigrationSignal[],

  toMagento: [
    {
      title: 'B2B buying that a consumer checkout cannot model',
      body:
        'A request, a quote, an approval chain and a budget holder is not a cart with a discount on it. Shopify can be extended toward it, and past a certain depth the extensions become the system, at which point an open platform is cheaper to own than a hosted one being argued with.',
    },
    {
      title: 'Catalogue size that has become an architecture problem',
      body:
        'Wide multi-category catalogues, deep attribute inheritance and per-store overrides are where catalogue size stops being a number and starts being a data model. Magento was built around that model, and rebuilding it on top of a platform that was not is a long way to arrive somewhere Magento already is.',
    },
    {
      title: 'Locale and tax combinations that multiply',
      body:
        'A handful of markets is a configuration. Dozens of tax, currency, language and catalogue combinations is a multi-store architecture, and that is a distinction worth drawing before choosing the platform rather than after.',
    },
  ] as readonly MigrationSignal[],

  /* The section that makes the page trustworthy rather than promotional. */
  stayPut: [
    {
      title: 'The site is slow',
      body:
        'Slow is a symptom, and on Magento it is usually a caching problem before it is a front-end one. Varnish, full-page cache, the index and image pipeline account for most of it. Replatforming to fix speed replaces a diagnosable problem with a project, and a badly built Shopify theme carrying twenty apps is not fast either.',
    },
    {
      title: 'Hosting costs too much',
      body:
        'Infrastructure is usually a small fraction of the total cost of a platform, and the licence and app subscriptions on the other side are not zero. If the sum has not been done properly on both sides, cost is a feeling rather than a reason.',
    },
    {
      title: 'The current agency is not working out',
      body:
        'That is a supplier problem wearing a platform problem’s clothes. Changing platform to change who works on it is the most expensive way to end a relationship, and the new platform inherits every process that made the old one difficult.',
    },
  ] as readonly MigrationSignal[],

  /* What actually moves, which is the part most quotes are vague about. */
  transfers: [
    {
      title: 'Catalogue',
      body:
        'Products, variants, media and categories transfer with mapping work. Attribute inheritance, per-store overrides and complex configurables do not have a one-to-one equivalent and are where the estimate is actually decided.',
    },
    {
      title: 'Customers',
      body:
        'Accounts and addresses transfer. Passwords do not: hashes are not portable between platforms, so every customer resets on first login, and how that is communicated matters more to retention than the migration itself.',
    },
    {
      title: 'Orders',
      body:
        'Order history transfers as records for reference and reporting. It does not transfer as live, actionable orders, so returns and service against historical orders need a decision before cutover rather than after the first one arrives.',
    },
    {
      title: 'URLs and rankings',
      body:
        'The single highest-risk item, and the one most often left to the end. Every indexed URL needs a mapped destination and a 301. Product, category, CMS and paginated URLs all use different patterns on the two platforms, so the map is built from a crawl of what is actually indexed rather than from the sitemap.',
    },
    {
      title: 'Content and SEO metadata',
      body:
        'Titles, descriptions, canonical intent and structured data are content, not configuration, and they are the cheapest thing to lose silently in a rebuild.',
    },
    {
      title: 'Integrations',
      body:
        'ERP, PIM, OMS, 3PL and marketing systems each need the source of truth named per field before anything is rebuilt. This is where migrations overrun, because the integration surface is usually larger than anyone has written down.',
    },
  ] as readonly MigrationSignal[],

  steps: [
    {
      num: '01',
      title: 'Decide whether to move at all',
      body:
        'A short piece of work against the current platform: what it is actually costing, what behaviour is genuinely in use, and whether the symptom driving the conversation is a platform problem. This occasionally ends with a recommendation not to migrate, which is a cheaper outcome than discovering it midway.',
    },
    {
      num: '02',
      title: 'Map the data and the integration surface',
      body:
        'Every entity, every field, every system that reads or writes it, and the source of truth for each. The gaps between the two data models are the scope, and they are found here or they are found during cutover.',
    },
    {
      num: '03',
      title: 'Build the redirect map from a real crawl',
      body:
        'Crawl what search engines have actually indexed, not what the sitemap claims. Map every URL to a destination, decide what is deliberately retired, and treat anything unmapped as a defect rather than an acceptable loss.',
    },
    {
      num: '04',
      title: 'Rebuild, rather than port, the front end',
      body:
        'Templates do not transfer between Liquid and Magento theming. That is an opportunity rather than a cost: it is the one point where checkout, product page and search behaviour can be improved against measured data instead of inherited.',
    },
    {
      num: '05',
      title: 'Reconcile before cutover, not after',
      body:
        'Counts and totals on both sides: products, variants, customers, orders, and every integration exercised end to end against real records. Reconciliation before the switch is cheap; after it, it is done while trading.',
    },
    {
      num: '06',
      title: 'Cut over, then watch the right things',
      body:
        'Redirect coverage, crawl errors, index coverage, checkout completion and integration failures, watched daily for the first weeks. A migration is not finished at launch. It is finished when the numbers on the other side are boring.',
    },
  ] as readonly MigrationStep[],

  faqs: [
    {
      q: 'When should a business migrate from Magento to Shopify?',
      a: 'When the cost of running Magento has stopped buying anything the business uses: the catalogue and checkout no longer need behaviour Shopify cannot express, the platform has become hard to staff, and merchandising is waiting on release cycles. If only one of those is true, the platform is usually not the problem.',
    },
    {
      q: 'When is moving from Shopify to Magento the right direction?',
      a: 'When B2B buying, catalogue depth or locale and tax complexity have grown past what the hosted platform models, and the extensions bridging the gap have become the system. At that point an open architecture is cheaper to own than a hosted one being argued with.',
    },
    {
      q: 'Will a migration lose search rankings?',
      a: 'It can, and the cause is almost always an incomplete redirect map rather than the platform change itself. Every indexed URL needs a mapped destination and a 301, built from a crawl of what is actually indexed. Rankings typically move for a period after any replatforming even when the mapping is complete.',
    },
    {
      q: 'Does order history transfer between Magento and Shopify?',
      a: 'Orders transfer as records for reference and reporting, not as live actionable orders. How returns and customer service against historical orders will work is a decision to make before cutover.',
    },
    {
      q: 'Do customers have to reset their passwords?',
      a: 'Yes. Password hashes are not portable between platforms, so accounts and addresses transfer but credentials do not. Communicating that well matters more to retention than the migration mechanics.',
    },
    {
      q: 'How long does a Magento to Shopify migration take?',
      a: 'It is decided by the integration surface and the catalogue data model rather than by the platform, so an honest estimate follows the mapping work in step two rather than preceding it. Any timeline quoted before the integrations are written down is a guess.',
    },
    {
      q: 'Is Shopify Plus cheaper than Adobe Commerce?',
      a: 'Usually on infrastructure and specialist staffing, and not always in total. Licence, apps and transaction costs are not zero, and a business using Magento behaviour it genuinely needs can pay more to reproduce it on Shopify than it paid to keep it.',
    },
    {
      q: 'Can a migration happen without going offline?',
      a: 'Yes. The new platform is built and reconciled alongside the live one, and the switch is a DNS and redirect change made against a rehearsed plan with a written rollback rather than a launch event.',
    },
  ] as readonly MigrationFaq[],

  finalHeadline: ['Not sure the platform', 'is the problem?'],
} as const;
