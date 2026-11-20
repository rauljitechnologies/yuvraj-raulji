/**
 * /services/{slug}/ : the sixteen service pages.
 *
 * ── Why these exist alongside the platform pages ──────────────────────────
 *
 * The site already has eleven technology hubs and twenty-six platform service
 * pages. These sixteen are not a second copy of them, and the difference is
 * intent rather than topic:
 *
 *   /magento/                 the entity page. "Who is a Magento consultant."
 *                             Educational, long, states when Magento is the
 *                             wrong choice.
 *   /magento/consulting/      the advisory spoke. "I need an opinion."
 *   /services/magento-development/
 *                             the build page. "I have a project and I want
 *                             someone to build it." Conversion-framed, scoped,
 *                             with a process and a price conversation at the
 *                             end.
 *
 * A reader searching "magento consultant" and a reader searching "magento
 * development services" want different pages, and until now the second got
 * the first. That is the gap these fill.
 *
 * ── How they are kept from cannibalising ──────────────────────────────────
 *
 * Three mechanisms, in order of how much they are relied on:
 *
 * 1. **Distinct primary keywords, enforced at build.** Every page on this site
 *    declares one, and lib/content-map.ts throws if two claim the same string.
 *    The existing pages own the "consultant" and "<platform> consulting
 *    services" queries; these own "<x> development services", which nothing
 *    claimed. The gate is what makes this a guarantee rather than an
 *    intention.
 *
 * 2. **Every page states what it is not.** `boundary` below is rendered as
 *    visible copy near the top of each page and links to the platform page it
 *    is adjacent to. This is the same device lib/platform-services.ts uses
 *    between migration and upgrade, and the note there is worth repeating:
 *    that line is not a courtesy, it is the thing that stops the two pages
 *    merging.
 *
 * 3. **Different content, not reworded content.** The brief is explicit that
 *    the same copy must not appear on every service page, and the risk is
 *    real with sixteen of them. Each carries its own challenges, its own
 *    solution set, its own process and its own questions. Where two services
 *    genuinely share a technology, they say so and link rather than both
 *    describing it.
 *
 * ── The rule this file is written under ───────────────────────────────────
 *
 * CONTENT-PRINCIPLES.md section 1. No invented client, no invented outcome, no
 * figure without the context that says where it came from. `cases` resolves
 * against the six real builds in WORK_ITEMS; a service with no matching build
 * carries an empty array and the page renders no proof section rather than
 * borrowing someone else's.
 *
 * Copy in this file avoids em-dashes on purpose.
 */

import type { ServiceAnchor } from './platform-services';

export interface ServiceChallenge {
  /** The symptom in the buyer's own words. */
  symptom: string;
  /** What it is costing them. */
  impact: string;
}

export interface ServiceSolution {
  name: string;
  body: string;
}

export interface ServiceTechGroup {
  group: string;
  items: readonly string[];
}

export interface ServiceStep {
  num: string;
  title: string;
  body: string;
}

export interface ServicePage {
  slug: string;
  /** Nav and card label. */
  label: string;
  /** Short label for the header dropdown, where width is tight. */
  navLabel: string;
  /**
   * Shown in the header dropdown.
   *
   * Every service is on /services/ and in the sitemap; only ten are in the
   * menu. Seventeen links plus "All services" is a 700px panel that runs off a
   * laptop screen, and a menu nobody can read in one glance is not a menu. The
   * ten are the engagements this site is pointed at: the four platform build
   * pages, the two routes in through a whole project, the frontend, the two
   * AI pages and the retainer.
   *
   * The counts in that paragraph are the only place in this file they are
   * typed rather than derived; the display copy reads them from
   * FEATURED_COUNT_WORD and SERVICE_COUNT_WORD at the bottom.
   */
  featured?: boolean;
  eyebrow: string;
  /** The single H1, held as lines because each break does typographic work. */
  h1: readonly string[];
  lede: string;
  cta: string;

  title: string;
  description: string;

  primaryKeyword: string;
  /**
   * The other queries this page is written to catch. Reported by
   * scripts/check-keywords.mjs, never enforced, because a page covering a
   * query in its own words rather than in the query's words is this site
   * working as intended.
   *
   * What was removed from these rows when that report was first read: every
   * "hire <x> developer" variant, because /hire/ owns the hire intent and
   * these pages open with a scope rather than an offer of employment; and the
   * "development agency" and "development company" variants, because this
   * site is one person and says so.
   */
  secondaryKeywords: readonly string[];
  searchIntent: string;
  audience: string;
  purpose: string;
  entities: readonly string[];

  /** The extractable definition. Written to stand alone when lifted. */
  quickAnswer: { question: string; answer: string };

  /** Two or three paragraphs of orientation. */
  overview: readonly string[];

  /**
   * What this page is NOT, and where to go instead. Rendered as visible copy.
   * The mechanism that keeps this page off the platform page's query.
   */
  boundary: { body: string; link: ServiceAnchor };

  challenges: readonly ServiceChallenge[];
  solutions: readonly ServiceSolution[];
  technologies: readonly ServiceTechGroup[];
  process: readonly ServiceStep[];

  /** WORK_ITEMS ids. Empty where no build on the record fits. */
  cases: readonly string[];

  faqs: readonly { q: string; a: string }[];
  /**
   * Where this page connects. Rendered as section 11, between the questions
   * and the closing call to action, which is the same slot the platform
   * pages and the technology hubs put it in.
   *
   * These seventeen pages shipped without one. The in-content link graph of
   * the exported site says what that cost: each of them had one or two pages
   * linking to it and three to seven links out, against thirteen to seventeen
   * out on every platform spoke. A page at the end of the funnel with no way
   * onward is a dead end for a reader and a leaf for a crawler.
   *
   * `boundary.link` is deliberately not repeated here: it is already rendered
   * high on the page, in section 04, where it does more work.
   */
  related: readonly ServiceAnchor[];
  /**
   * Plain strings, not `DisplayLine`.
   *
   * An accent on the last line would read well and `Lines` accepts it, but
   * `DisplayLine` lives in components/homepage/motion.tsx and importing it
   * here would make lib/ depend on components/, which is backwards. The
   * default `Lines` behaviour already puts the weight on the last line, so
   * the typographic emphasis is there without the dependency.
   */
  finalHeadline: readonly string[];
}

/* ═══════════════════════════════════════════════════════════════
   THE SHARED DELIVERY PROCESS

   Most of the build services run the same way and a handful do not.
   Rather than copy near-identical arrays, the common one is defined
   once and the services that genuinely differ (architecture, AI,
   integration, maintenance, performance and automation) author
   their own. This is the one place duplication is avoided by
   sharing rather than by rewriting, because the process really is
   the same.
   ═══════════════════════════════════════════════════════════════ */

const BUILD_PROCESS: readonly ServiceStep[] = [
  {
    num: '01',
    title: 'Scope, in writing',
    body: 'What the work is, and what it explicitly is not. The second half is the one that protects both of us, and it is written before anything is quoted.',
  },
  {
    num: '02',
    title: 'Architecture before code',
    body: 'The data model, the integration points and the failure modes, agreed on paper. Most of the expensive mistakes in commerce are made here and discovered six weeks later.',
  },
  {
    num: '03',
    title: 'Build in reviewable slices',
    body: 'Work lands in increments you can see running, not in one drop at the end. You find out early if something is going the wrong way, which is when it is still cheap.',
  },
  {
    num: '04',
    title: 'Test against the real thing',
    body: 'Production-shaped data, production-shaped traffic. A checkout that works on twelve test products tells you nothing about one carrying a hundred thousand.',
  },
  {
    num: '05',
    title: 'Deploy, document, hand over',
    body: 'Release process written down, documentation aimed at your team rather than at me, and a defined window afterwards where fixes are mine.',
  },
];

/* ═══════════════════════════════════════════════════════════════
   THE SEVENTEEN

   Ten shipped first. Six more were added to close the gap against
   the service list in the brief, and each one was added only where
   it owns a query none of the ten could own without competing with
   itself:

     adobe-commerce-development   the licensed platform, not Open Source
     shopify-plus-development     the tier, not the platform
     nextjs-development     the framework, not the application
     custom-module-development    the extension, not the build around it
     erp-crm-integration          the business systems, not the API itself
     workflow-automation          the operation, not the model

   Three existing pages gave ground so the new ones are not
   competing with their own site: Magento handed over "adobe
   commerce development" and "custom magento module development",
   Shopify handed over "shopify plus development", and full stack
   handed over the Next.js and React queries. The content-map gate
   in lib/content-map.ts is what proves it.

   The seventeenth, ai-ecommerce-development, was added for a query
   that fell between three pages and was therefore owned by none of
   them: generative-ai owns the AI feature built against a platform
   that is staying, ecommerce-development owns the store build with
   no AI in the brief, and /ai-commerce/ is the hub and owns the
   entity term rather than a service. The build where the two are
   one project had no page, so "ai ecommerce development" was a
   query this site could not answer. It takes no ground from the
   other three: each one's boundary block names it, and it names
   them back.
   ═══════════════════════════════════════════════════════════════ */

export const SERVICE_PAGES: readonly ServicePage[] = [
  /* ── 1. Magento ─────────────────────────────────────────────── */
  {
    slug: 'magento-development',
    featured: true,
    label: 'Magento 2 Development',
    navLabel: 'Magento Development',
    eyebrow: 'Magento 2 | Open Source',
    h1: ['Magento development', 'for catalogues that have', 'outgrown the defaults.'],
    lede:
      'Custom module development, multi-store architecture, B2B workflows and the performance work that follows. Nine years on the platform, most of it on stores where the catalogue size is the architecture problem.',
    cta: 'Discuss Your Magento Project',
    title: 'Magento 2 Development Services | Yuvraj Raulji',
    description:
      'Magento 2 and Adobe Commerce development: custom modules, multi-store, B2B workflows, ERP integration and performance engineering. 500K+ SKUs on the record.',
    primaryKeyword: 'magento development services',
    secondaryKeywords: [
      'magento 2 development company',
      'magento b2b development',
    ],
    searchIntent: 'Commercial. Someone with a Magento build or a Magento problem, looking for who does it.',
    audience: 'Businesses and agencies running Magento 2 or Adobe Commerce at a size where the defaults stopped being enough.',
    purpose: 'Own the Magento development query, show the depth behind it, and route an advisory reader to the consulting page instead.',
    entities: ['Magento 2', 'Adobe Commerce', 'Yuvraj Raulji', 'B2B Commerce', 'Multi-store'],
    quickAnswer: {
      question: 'What does Magento 2 development actually involve?',
      answer:
        'Custom module development against the platform rather than around it, multi-store and multi-currency architecture, B2B quote and approval workflows, integration with ERP, CRM, payment and logistics systems, and the caching, indexing and database work that keeps a large catalogue fast. On the record: 12+ multi-store Magento 2 platforms carrying 500K+ SKUs and 1M+ monthly users, with site speed improved by 60% through Varnish, Redis, full-page cache, CDN and database tuning, and 90% of B2B order and quote processing automated.',
    },
    overview: [
      'Magento stops being a product and starts being a system at a point most businesses can name precisely: the catalogue grows past what the default indexers handle comfortably, or the second store view arrives, or someone asks for an approval chain. After that, what you have is an application, and it needs to be treated like one.',
      'The work here is building inside that application properly. Modules that follow the platform rather than fight it, so an upgrade is a Tuesday rather than a project. Multi-store setups where the shared logic is actually shared. B2B workflows that model how the business really buys, including the parts nobody documented.',
    ],
    boundary: {
      body:
        'This page is about building. If you have not decided yet whether Magento is the right platform, or you want an opinion on a proposal from someone else, that is a different conversation and a cheaper one.',
      link: {
        href: '/magento/consulting/',
        label: 'Magento consulting, for a decision rather than a build',
      },
    },
    challenges: [
      {
        symptom: 'The catalogue grew and everything got slow.',
        impact: 'Reindexing takes hours, category pages time out, and the fix keeps being described as "more servers".',
      },
      {
        symptom: 'Every upgrade breaks something.',
        impact: 'Customisation was written around the platform instead of through it, so each release is a week of regression hunting.',
      },
      {
        symptom: 'B2B customers are handled by email and spreadsheet.',
        impact: 'Quotes, approvals and account-specific pricing live outside the system, so nothing is auditable and nothing scales.',
      },
      {
        symptom: 'The ERP and the store disagree about stock.',
        impact: 'Oversells, manual reconciliation, and a support team doing data entry.',
      },
    ],
    solutions: [
      {
        name: 'Custom modules that survive upgrades',
        body: 'Built against the plugin and preference system, with dependency injection used as intended. The test is simple and it is applied: a minor version upgrade should not require touching your code.',
      },
      {
        name: 'Multi-store and multi-currency architecture',
        body: 'Website, store and store view structured so shared logic is shared and the differences are configuration rather than forks. Localisation, tax and pricing handled per market.',
      },
      {
        name: 'B2B quote and approval workflows',
        body: 'Company accounts, role-based permissions and multi-level approvals. Five-level approval chains covering development, orders, quotes and vendor management are on the record.',
      },
      {
        name: 'Performance engineering',
        body: 'Varnish, Redis, full-page cache, Elasticsearch tuning, database indexing and query work, measured before and after rather than asserted.',
      },
      {
        name: 'Integration with the systems behind the store',
        body: 'ERP, CRM, payment gateways, logistics and PIM, over REST and GraphQL, with the retry and reconciliation behaviour defined rather than assumed.',
      },
    ],
    technologies: [
      { group: 'Platform', items: ['Magento 2', 'Adobe Commerce', 'Magento B2B', 'MSI'] },
      { group: 'Language & data', items: ['PHP', 'MySQL', 'GraphQL', 'REST APIs'] },
      { group: 'Performance', items: ['Varnish', 'Redis', 'Elasticsearch', 'RabbitMQ', 'Cloudflare'] },
      { group: 'Infrastructure', items: ['AWS EC2', 'RDS', 'S3', 'Docker', 'Jenkins', 'GitLab CI'] },
    ],
    process: BUILD_PROCESS,
    cases: ['b2b-procurement', 'marketplace', 'manufacturing'],
    faqs: [
      {
        q: 'Do you work on Magento 2 or Adobe Commerce?',
        a: 'Both. They are the same platform with a different licence and a different feature set on top, and most of the architecture work is identical. Adobe Commerce B2B, staging and content staging are the parts that genuinely differ.',
      },
      {
        q: 'Can you work on an existing Magento build you did not write?',
        a: 'Yes, and that is most of this work. It starts with reading the code rather than quoting on it, because the honest estimate on an unfamiliar codebase comes after a few days inside it, not before.',
      },
      {
        q: 'Our Magento is on an old version. Is upgrading or rebuilding cheaper?',
        a: 'It depends on how the customisation was written, not on how old the version is. Code written through the platform upgrades; code written around it often costs more to carry forward than to replace. That assessment is a few days of work and it is the one thing worth paying for before committing to either.',
      },
      {
        q: 'Do you do Magento performance work on its own?',
        a: 'Yes, and it is one of the more satisfying engagements because the result is measurable. It starts with finding out where the time actually goes, which is frequently not where the team assumes.',
      },
    ],
    related: [
      {
        href: '/magento/',
        label: 'Magento 2 and Adobe Commerce, and where the platform stops',
        note: 'The entity page above this one, including the catalogues Magento is the wrong answer for.',
      },
      {
        href: '/services/adobe-commerce-development/',
        label: 'Adobe Commerce, if the licence is in the picture',
        note: 'Company accounts, shared catalogues and purchase approvals, which Open Source does not carry.',
      },
      {
        href: '/services/custom-module-development/',
        label: 'Custom modules, against the documented extension points',
        note: 'The part of a Magento build that decides what the next upgrade costs.',
      },
      {
        href: '/magento/performance/',
        label: 'Magento performance work on a store already live',
        note: 'Varnish, Redis, the indexers and the database, once catalogue scale is the problem.',
      },
      {
        href: '/insights/aws-magento2-server-setup/',
        label: 'The production server setup behind a build like this',
        note: 'EC2, RDS, Varnish and Redis, and why each is sized the way it is.',
      },
      {
        href: '/pricing/',
        label: 'How a build like this is scoped and priced',
        note: 'Fixed scope, retainer or hourly, and which one fits work with a defined end.',
      },
    ],

    finalHeadline: ['Magento project', 'that needs doing properly?'],
  },

  /* ── 2. Shopify ─────────────────────────────────────────────── */
  {
    slug: 'shopify-development',
    featured: true,
    label: 'Shopify Development',
    navLabel: 'Shopify Development',
    eyebrow: 'Shopify | Liquid | Apps',
    h1: ['Shopify development', 'for brands that have', 'outgrown the theme.'],
    lede:
      'Custom theme architecture, private apps, checkout extensibility and app consolidation. The work that starts when the store is working and the stack around it is not.',
    cta: 'Discuss Your Shopify Project',
    title: 'Shopify Development Services | Yuvraj Raulji',
    description:
      'Shopify and Shopify Plus development: custom themes, private apps, checkout extensions and app consolidation. Senior engineering, not a theme install.',
    primaryKeyword: 'shopify development services',
    secondaryKeywords: [
      'custom shopify theme development',
      'shopify liquid development',
      'shopify theme development',
      'shopify checkout extensibility',
    ],
    searchIntent: 'Commercial. A D2C brand or agency with Shopify work that a theme editor cannot do.',
    audience: 'D2C brands on Shopify or Shopify Plus, and agencies needing senior Shopify engineering on client work.',
    purpose: 'Own the Shopify development query and separate real engineering from theme configuration.',
    entities: ['Shopify', 'Shopify Plus', 'Liquid', 'Storefront API', 'Yuvraj Raulji'],
    quickAnswer: {
      question: 'What does Shopify development cover beyond installing a theme?',
      answer:
        'Custom theme architecture in Liquid with sections and blocks structured so a merchandiser can work without a developer, private and custom apps built on the Admin and Storefront APIs, checkout extensibility and Shopify Functions on Plus, app consolidation to remove the script-tag tax several installed apps impose on page speed, and integration with ERP, PIM and fulfilment systems. The distinction that matters: configuration is what the theme editor does, and engineering is everything the theme editor cannot.',
    },
    overview: [
      'Shopify is deliberately opinionated, and that is its strength: a brand can launch quickly and run without an engineer. The engineering work starts at the edges of those opinions, which is where a growing brand inevitably ends up.',
      'Usually it arrives as one of three things. The theme has accumulated enough custom sections that nobody can safely change it. The store has twelve apps, four of which do overlapping jobs and all of which inject scripts. Or something outside Shopify, an ERP or a 3PL, needs to agree with it in real time.',
    ],
    boundary: {
      body:
        'This page is about building on Shopify. Moving to Shopify from another platform is a different job with different risks, and it has its own page.',
      link: {
        href: '/shopify/migration/',
        label: 'Shopify migration, for replatforming rather than building',
      },
    },
    challenges: [
      {
        symptom: 'The theme has been customised to the point where nobody will touch it.',
        impact: 'Every change is quoted defensively, and the marketing team has stopped asking.',
      },
      {
        symptom: 'Twelve apps, each adding scripts to every page.',
        impact: 'The store is slow, the subscription bill is significant, and several apps overlap.',
      },
      {
        symptom: 'Checkout needs behaviour Shopify does not offer out of the box.',
        impact: 'Workarounds live in the theme, break on Shopify updates, and nobody is sure what is load-bearing.',
      },
      {
        symptom: 'Stock and orders have to agree with a system Shopify has never heard of.',
        impact: 'Someone is exporting CSVs on a schedule, and the gap between exports is where the oversells happen.',
      },
    ],
    solutions: [
      {
        name: 'Theme architecture a merchandiser can use',
        body: 'Sections and blocks structured so layout changes are configuration rather than code. The test is whether your team can build a landing page without opening a ticket.',
      },
      {
        name: 'Private and custom apps',
        body: 'Built on the Admin and Storefront APIs, deployed under your own account, with the webhook and rate-limit handling that keeps them reliable rather than mostly reliable.',
      },
      {
        name: 'Storefront behaviour the theme cannot express',
        body: 'Cart logic, bundling, subscriptions and product configurators built into the storefront properly. Checkout itself is only customisable on Plus, which is a different tier and has its own page.',
      },
      {
        name: 'App consolidation',
        body: 'Audit what each installed app actually does, replace the overlapping ones with purpose-built code where that is cheaper over two years, and measure the page weight before and after.',
      },
      {
        name: 'Systems integration',
        body: 'ERP, PIM, 3PL and subscription platforms, with reconciliation defined rather than hoped for.',
      },
    ],
    technologies: [
      { group: 'Platform', items: ['Shopify', 'Shopify Plus', 'Liquid', 'Shopify Functions'] },
      { group: 'APIs', items: ['Storefront API', 'Admin API', 'GraphQL', 'Webhooks'] },
      { group: 'Frontend', items: ['JavaScript', 'TypeScript', 'Hydrogen', 'Next.js'] },
      { group: 'Integration', items: ['ERP connectors', '3PL', 'Payment gateways', 'Klaviyo'] },
    ],
    process: BUILD_PROCESS,
    cases: ['plant-store', 'sports-nutrition', 'fashion-d2c'],
    faqs: [
      {
        q: 'Do I need Shopify Plus for custom development?',
        a: 'For most things, no. Custom themes, private apps and API integration all work on standard Shopify. Plus is what you need for checkout extensibility, Shopify Functions, scripts and multiple expansion stores, and those are the specific reasons to pay for it rather than a general sense that the business has grown.',
      },
      {
        q: 'Can you reduce the number of apps we are paying for?',
        a: 'Often, and the saving is usually page weight before it is subscription cost. The audit is the deliverable: what each app does, which ones overlap, and which are cheaper to replace than to keep over a two-year horizon.',
      },
      {
        q: 'Will custom work break when Shopify updates?',
        a: 'Not if it is built on the supported extension points, which is why checkout work goes through UI extensions and Functions rather than through script injection. Work built on workarounds does break, and some of this job is replacing exactly that.',
      },
      {
        q: 'Do you build headless Shopify storefronts?',
        a: 'Yes, over the Storefront API with Next.js or Hydrogen. It is the right answer less often than it is proposed, and the headless commerce page covers when it is and is not.',
      },
    ],
    related: [
      {
        href: '/shopify/',
        label: 'Shopify and Shopify Plus, and where the platform stops',
        note: 'The entity page above this one, including the limits no build can engineer around.',
      },
      {
        href: '/services/shopify-plus-development/',
        label: 'Shopify Plus, if the work needs the tier',
        note: 'Checkout extensibility, Functions and B2B, which are the only reasons to upgrade.',
      },
      {
        href: '/shopify/integrations/',
        label: 'Shopify integrations, platform-specific',
        note: 'ERP, 3PL and payment connections, and what happens while one of them is down.',
      },
      {
        href: '/insights/shopify-headless-nextjs-guide/',
        label: 'Shopify behind a Next.js storefront, implemented',
        note: 'The Storefront API route, and the decisions made before the first component.',
      },
      {
        href: '/services/performance-optimization/',
        label: 'Performance optimisation on a store already live',
        note: 'App scripts, theme weight and Core Web Vitals, measured before anything is changed.',
      },
      {
        href: '/pricing/',
        label: 'How a build like this is scoped and priced',
        note: 'A written scope and a figure before anything is committed to.',
      },
    ],

    finalHeadline: ['Shopify work', 'a theme editor cannot do?'],
  },

  /* ── 3. Full stack ──────────────────────────────────────────── */
  {
    slug: 'full-stack-development',
    label: 'Full Stack Development',
    navLabel: 'Full Stack Development',
    eyebrow: 'Next.js | React | Node.js',
    h1: ['Full stack development', 'for the product around', 'the commerce platform.'],
    lede:
      'Next.js and React on the front, Node.js and APIs behind it. The internal tools, customer portals and custom applications a commerce platform cannot be, built by someone who knows what it has to talk to.',
    cta: 'Discuss a build',
    title: 'Full Stack Development Services | Yuvraj Raulji',
    description:
      'Full stack development on Next.js, React and Node.js: customer portals, internal tools, dashboards and custom applications around your commerce platform.',
    primaryKeyword: 'full stack development services',
    secondaryKeywords: [
      'node.js development services',
      'custom portal development',
      'internal tools development',
      'custom web application development',
    ],
    searchIntent: 'Commercial. Someone needing an application built, not a storefront configured.',
    audience: 'Businesses needing a custom application, portal or internal tool, usually adjacent to a commerce platform they already run.',
    purpose: 'Own the full stack development query and show that the commerce depth is what makes the application work.',
    entities: ['Next.js', 'React', 'Node.js', 'TypeScript', 'GraphQL', 'Yuvraj Raulji'],
    quickAnswer: {
      question: 'What kind of full stack work is this?',
      answer:
        'Applications built on Next.js, React and TypeScript with Node.js services behind them, over REST and GraphQL: customer and dealer portals, internal operations tools, reporting dashboards, and custom products that sit alongside a commerce platform rather than inside it. The useful difference from a general web agency is that these almost always have to agree with a store, an ERP or both, and the integration is usually where the project actually lives.',
    },
    overview: [
      'A lot of the work described as eCommerce is not inside the store at all. It is the portal a dealer logs into, the tool the operations team uses to fix what the store got wrong, the dashboard that answers whether last month was good. Commerce platforms are built to sell things, and they are poor at being all three.',
      'What makes these projects succeed or fail is rarely the frontend. It is whether the application and the systems it depends on agree about state, under load, when one of them is briefly unavailable. That is the part this work takes seriously.',
    ],
    boundary: {
      body:
        'This is application development. If what you need is a storefront built on an existing commerce platform, the Magento and Shopify pages are the right ones.',
      link: {
        href: '/nextjs/',
        label: 'Next.js in depth, including when a framework is the wrong answer',
      },
    },
    challenges: [
      {
        symptom: 'The operations team runs the business out of spreadsheets.',
        impact: 'Nothing is auditable, two people know how it works, and onboarding a third takes months.',
      },
      {
        symptom: 'B2B customers want self-service and there is nowhere to send them.',
        impact: 'Order status, reordering and invoices all arrive by email, which is a cost that scales with revenue.',
      },
      {
        symptom: 'The reporting everyone relies on is a manual export.',
        impact: 'Decisions are made on numbers that are a week old and occasionally wrong.',
      },
      {
        symptom: 'An integration was built once and nobody will touch it.',
        impact: 'It fails silently, the failures are found days later, and the fix is always manual.',
      },
    ],
    solutions: [
      {
        name: 'Customer and dealer portals',
        body: 'Authentication, account hierarchy, order history, reordering and invoice access, reading from the commerce platform and the ERP rather than keeping a third copy of the truth.',
      },
      {
        name: 'Internal operations tools',
        body: 'The things the team currently does in spreadsheets, with permissions, an audit trail and validation that stops the mistakes the spreadsheet allowed.',
      },
      {
        name: 'Dashboards and reporting',
        body: 'Numbers pulled from the systems that own them, on a schedule or live, with the definition of each metric written down so two departments stop disagreeing about revenue.',
      },
      {
        name: 'API layers and integration services',
        body: 'A service that sits between systems and owns the translation, with retries, idempotency and observable failure, rather than a cron job nobody is watching.',
      },
      {
        name: 'Rendering strategy that fits the content',
        body: 'Static, incremental or server-rendered chosen per route against what the data actually does, because the wrong choice is either a stale page or an unnecessary server bill.',
      },
    ],
    technologies: [
      { group: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
      { group: 'Backend', items: ['Node.js', 'PHP', 'GraphQL', 'REST APIs'] },
      { group: 'Data', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch'] },
      { group: 'Infrastructure', items: ['AWS', 'Vercel', 'Docker', 'GitLab CI', 'Jenkins'] },
    ],
    process: BUILD_PROCESS,
    cases: ['b2b-procurement', 'manufacturing'],
    faqs: [
      {
        q: 'Do you only build things connected to eCommerce?',
        a: 'Not only, but that is where the work is strongest, because the domain knowledge is what makes the integration decisions good. A business application with no commerce component is well within scope; a project where the value is entirely in a field I have never worked in is not the best use of your budget.',
      },
      {
        q: 'Can you work inside our existing codebase and team?',
        a: 'Yes. That is contract engineering: your repository, your board, your review cycle, your definition of done, for a fixed term. The pricing page covers how it is structured.',
      },
      {
        q: 'Do you use a database, and which one?',
        a: 'Whichever the data shape argues for, which is usually PostgreSQL or MySQL. The more useful question is normally whether the application should own data at all, because a second copy of the truth is how two systems start disagreeing.',
      },
      {
        q: 'What about hosting and deployment?',
        a: 'AWS where there is existing infrastructure to fit into, Vercel where the application is Next.js and the team is small. Either way the release process gets written down, because a deploy only one person can do is a risk rather than a convenience.',
      },
    ],
    related: [
      {
        href: '/services/nextjs-development/',
        label: 'Next.js and React development, the frontend half',
        note: 'Where each page renders, which is most of what a Next.js application is.',
      },
      {
        href: '/services/api-integration/',
        label: 'The API layer the application talks to',
        note: 'Retries, duplicates, and the field that has never been null before.',
      },
      {
        href: '/work/b2b-procurement/',
        label: 'A procurement platform on the record',
        note: 'The dealer-facing application behind the approval workflow.',
      },
      {
        href: '/work/manufacturing/',
        label: 'A manufacturer platform on the record',
        note: 'The tooling around a site that had to serve engineers rather than shoppers.',
      },
      {
        href: '/headless-commerce/',
        label: 'Headless commerce, when the application is a storefront',
        note: 'The decision this page does not assume you have made.',
      },
      {
        href: '/services/ecommerce-architecture/',
        label: 'Architecture first, when the system boundaries are not settled',
        note: 'What the application owns and what the platform owns, written down.',
      },
    ],

    finalHeadline: ['Something to build', 'that is not a storefront?'],
  },

  /* ── 4. Headless ────────────────────────────────────────────── */
  {
    slug: 'headless-commerce',
    featured: true,
    label: 'Headless Commerce Development',
    navLabel: 'Headless Commerce',
    eyebrow: 'Composable | API-first',
    h1: ['Headless commerce,', 'when the trade is', 'actually worth making.'],
    lede:
      'Decoupled storefronts on Next.js and React over GraphQL, built for the cases that justify them. The honest version of this service includes telling you when it does not.',
    cta: 'Discuss a headless build',
    title: 'Headless Commerce Development | Yuvraj Raulji',
    description:
      'Headless and composable commerce: Next.js and React storefronts over the Storefront API and GraphQL, with the trade-offs named before the decision.',
    primaryKeyword: 'headless commerce development',
    secondaryKeywords: [
      'headless ecommerce development services',
      'composable commerce development',
      'next.js headless storefront',
      'shopify headless development',
      'magento pwa development',
    ],
    searchIntent: 'Commercial, with a decision still partly open. Someone considering headless and looking for who builds it.',
    audience: 'Brands and agencies evaluating or committed to a decoupled storefront.',
    purpose: 'Own the headless development query, build well for the cases that justify it, and disqualify the ones that do not.',
    entities: ['Headless Commerce', 'Composable Commerce', 'Next.js', 'GraphQL', 'Storefront API'],
    quickAnswer: {
      question: 'When is headless commerce the right choice?',
      answer:
        'When one of four things is true: the frontend has performance requirements the platform theme cannot meet, the same catalogue has to serve several channels, the design genuinely cannot be expressed in the platform templating, or the organisation needs frontend and backend to release independently. When none of those is true, headless adds a build to maintain, a rendering layer to debug and a hosting bill, in exchange for architecture diagrams. A well-tuned Liquid theme or Magento frontend beats a badly built headless storefront on every metric a business cares about.',
    },
    overview: [
      'Headless is the most oversold architecture in commerce, which is unfortunate, because for the right store it is genuinely the correct answer. The problem is that the cases where it wins are specific and the pitch is general.',
      'What a decoupled storefront actually buys is control over rendering, over the delivery of the frontend, and over the release cycle. If none of those three is currently a constraint, it buys complexity. The engagement starts by establishing which, and occasionally ends there.',
    ],
    boundary: {
      body:
        'This page is about building a headless storefront. If the decision itself is still open, that is an architecture question and worth answering before a line of code.',
      link: {
        href: '/headless-commerce/architecture/',
        label: 'Headless architecture, for the decision rather than the build',
      },
    },
    challenges: [
      {
        symptom: 'Core Web Vitals will not improve no matter what gets tuned.',
        impact: 'The theme layer sets a floor, and paid traffic is being bought against a page that converts below what it should.',
      },
      {
        symptom: 'The same catalogue has to serve web, app and a marketplace feed.',
        impact: 'Three teams maintain three versions of what is meant to be one product truth.',
      },
      {
        symptom: 'The frontend team waits on backend releases to ship a layout change.',
        impact: 'Design iteration runs at the speed of the slowest deployment in the stack.',
      },
      {
        symptom: 'A previous headless build was started and is now half-finished.',
        impact: 'Two storefronts to maintain, and the migration path was never written down.',
      },
    ],
    solutions: [
      {
        name: 'The decision, before the build',
        body: 'Which of the four justifications applies to you, what it is currently costing, and what the headless version would cost to run. Sometimes the output is a recommendation not to.',
      },
      {
        name: 'Storefront architecture',
        body: 'Next.js over the Storefront API or GraphQL, with routing, caching and revalidation designed against how your catalogue actually changes rather than copied from a template.',
      },
      {
        name: 'Rendering strategy per route',
        body: 'Static for the catalogue, incremental for what changes, server-rendered for what is personal. A single strategy applied to every route is the most common reason headless builds disappoint.',
      },
      {
        name: 'Progressive migration',
        body: 'Route by route where the risk profile demands it, so the old storefront keeps trading while the new one takes over in pieces.',
      },
      {
        name: 'Core Web Vitals as an acceptance criterion',
        body: 'Measured on real devices and real network conditions, written into the scope as a number rather than an aspiration.',
      },
    ],
    technologies: [
      { group: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
      { group: 'Commerce APIs', items: ['Shopify Storefront API', 'Magento GraphQL', 'REST', 'Hydrogen'] },
      { group: 'Delivery', items: ['Vercel', 'Cloudflare', 'ISR', 'Edge caching'] },
      { group: 'Measurement', items: ['Core Web Vitals', 'Lighthouse', 'GA4', 'Real user monitoring'] },
    ],
    process: BUILD_PROCESS,
    cases: ['fashion-d2c'],
    faqs: [
      {
        q: 'Will headless make our store faster?',
        a: 'It can, and it is not automatic. Headless removes the ceiling the theme layer imposes; it does not deliver the improvement on its own. A poorly built headless storefront is comfortably slower than a well-tuned theme, and that outcome is common enough to plan against.',
      },
      {
        q: 'Can we go headless gradually?',
        a: 'Usually yes, route by route, with the old storefront serving everything not yet moved. It takes longer and costs more than a single cutover, and for a store with meaningful traffic it is almost always the right trade.',
      },
      {
        q: 'What does headless cost to run afterwards?',
        a: 'A frontend codebase that needs maintaining, a hosting bill that was previously inside the platform fee, and a team that needs frontend engineering available. That ongoing cost belongs in the decision, and it is the part most often left out of it.',
      },
      {
        q: 'Does headless work with Magento as well as Shopify?',
        a: 'Yes, over Magento GraphQL, and PWA Studio exists for it. The considerations differ: Magento gives more control over the API layer and more responsibility with it.',
      },
    ],
    related: [
      {
        href: '/headless-commerce/',
        label: 'Headless and composable commerce, and when decoupling pays',
        note: 'The entity page above this one, written to talk you out of it where it does not.',
      },
      {
        href: '/services/nextjs-development/',
        label: 'Next.js and React development, the framework underneath',
        note: 'Rendering tiers, caching and the data layer, decided before the first component.',
      },
      {
        href: '/headless-commerce/optimization/',
        label: 'Storefront performance on a decoupled build already live',
        note: 'Cache hit rate, rendering tiers and bundle budgets, measured rather than assumed.',
      },
      {
        href: '/work/fashion-d2c/',
        label: 'A decoupled storefront on the record',
        note: 'The one headless build here, and the decision inside it.',
      },
      {
        href: '/insights/shopify-headless-nextjs-guide/',
        label: 'The Shopify and Next.js route, written out',
        note: 'Storefront API, Hydrogen against plain Next.js, and where each one costs more.',
      },
      {
        href: '/insights/magento2-pwa-studio-headless/',
        label: 'The Magento and PWA Studio route, written out',
        note: 'What Venia gives you, and what you end up replacing anyway.',
      },
    ],

    finalHeadline: ['Considering headless?', 'Start with whether to.'],
  },

  /* ── 5. Architecture ────────────────────────────────────────── */
  {
    slug: 'ecommerce-architecture',
    label: 'eCommerce Architecture',
    navLabel: 'eCommerce Architecture',
    eyebrow: 'Architecture | Scale',
    h1: ['eCommerce architecture', 'for decisions that are', 'expensive to reverse.'],
    lede:
      'Platform selection, system design, integration architecture and scale planning. The work that happens before the build, and determines most of what the build will cost.',
    cta: 'Discuss an architecture engagement',
    title: 'eCommerce Architecture Services | Yuvraj Raulji',
    description:
      'Enterprise eCommerce architecture: platform selection, system and integration design, multi-store structure, scale planning and technical due diligence.',
    primaryKeyword: 'ecommerce architecture services',
    secondaryKeywords: [
      'enterprise ecommerce architect',
      'ecommerce system design',
      'commerce platform selection',
      'ecommerce technical due diligence',
      'ecommerce scalability consulting',
    ],
    searchIntent: 'Commercial and high-stakes. Someone facing a decision rather than a task.',
    audience: 'Engineering leaders, operations directors and businesses facing a platform or architecture decision with real cost attached.',
    purpose: 'Own the architecture query, and be the page a reader opens before committing to a build.',
    entities: ['eCommerce Architecture', 'Enterprise eCommerce', 'System Design', 'Yuvraj Raulji'],
    quickAnswer: {
      question: 'What does an eCommerce architecture engagement produce?',
      answer:
        'A written document: the decision, the options considered, what each would cost to build and to run, the failure modes of each, and a recommendation with the reasoning attached so it can be argued with. Typically covering platform selection, how the commerce platform and the surrounding systems divide responsibility, where product and customer data is owned, the integration pattern between systems, and what the architecture does at three times current volume. The deliverable is the reasoning, not a diagram.',
    },
    overview: [
      'Most expensive commerce problems are architecture decisions made quickly two years earlier: the platform chosen because a vendor was persuasive, the integration built point-to-point because it was the fastest route, the data model that assumed one warehouse.',
      'None of those is visible when it is made. They surface as a second brand nobody can launch, a catalogue that cannot be extended, an ERP integration that breaks whenever volume moves. The work here is making those decisions deliberately, with the trade-offs written down while they are still cheap to change.',
    ],
    boundary: {
      body:
        'This is design and decision work, and the deliverable is a document rather than a running system. If you have already decided and need it built, the platform pages cover the implementation.',
      link: {
        href: '/expertise/ecommerce-consulting/',
        label: 'eCommerce consulting, for platform selection and due diligence',
      },
    },
    challenges: [
      {
        symptom: 'Three vendors have proposed three different platforms.',
        impact: 'Nobody internally can evaluate the technical claims, and the decision is drifting toward whoever presented best.',
      },
      {
        symptom: 'Launching a second brand or market means rebuilding.',
        impact: 'The architecture assumed one of everything, and the cost of the assumption arrives all at once.',
      },
      {
        symptom: 'Every system talks to every other system directly.',
        impact: 'Point-to-point integrations grow with the square of the system count, and no one can change anything safely.',
      },
      {
        symptom: 'Nobody can say what happens at three times the traffic.',
        impact: 'Capacity is managed by over-provisioning and hoping, which is expensive and still fails on the day it matters.',
      },
    ],
    solutions: [
      {
        name: 'Platform selection with the reasoning written down',
        body: 'Requirements against candidates, cost to build and to run, and an explicit statement of what each option would be bad at. A recommendation you can argue with is worth more than one you have to trust.',
      },
      {
        name: 'System and data ownership design',
        body: 'Which system owns product, price, stock and customer, and what the others are allowed to assume. Most integration pain is really an ownership question nobody answered.',
      },
      {
        name: 'Integration architecture',
        body: 'Event-driven, queued or synchronous, chosen per flow against what the business actually tolerates when one side is down.',
      },
      {
        name: 'Multi-store and multi-market structure',
        body: 'Designed so the second brand, market or currency is configuration and content rather than a fork.',
      },
      {
        name: 'Scale and failure planning',
        body: 'Where the system breaks first, what it does when it breaks, and what it costs to move that ceiling. Answered with numbers.',
      },
      {
        name: 'Technical due diligence',
        body: 'An independent read on a codebase, a proposal or an estimate, for a buyer who cannot evaluate it internally.',
      },
    ],
    technologies: [
      { group: 'Platforms assessed', items: ['Magento 2', 'Adobe Commerce', 'Shopify Plus', 'WooCommerce', 'Headless'] },
      { group: 'Integration', items: ['REST', 'GraphQL', 'Webhooks', 'RabbitMQ', 'ETL'] },
      { group: 'Scale', items: ['Varnish', 'Redis', 'Elasticsearch', 'CDN', 'Read replicas'] },
      { group: 'Infrastructure', items: ['AWS', 'Docker', 'CI/CD', 'Observability'] },
    ],
    process: [
      {
        num: '01',
        title: 'The actual question',
        body: 'Often not the one in the brief. "Which platform" is usually "what does this business need the platform to do in three years", and the second question has a defensible answer.',
      },
      {
        num: '02',
        title: 'Read what exists',
        body: 'The codebase, the integrations, the data, the release process, and the numbers. Opinions here are worth little without reading the thing first.',
      },
      {
        num: '03',
        title: 'Options, with costs attached',
        body: 'Two or three real options, what each costs to build and to run, and what each would be bad at. An option with no stated downside has not been examined.',
      },
      {
        num: '04',
        title: 'A recommendation that can be argued with',
        body: 'One recommendation, the reasoning, and the conditions under which it would change. Written so someone who disagrees can say precisely where.',
      },
      {
        num: '05',
        title: 'A sequence, if it is wanted',
        body: 'What to do first, what can wait, and what must not start until something else is finished. Phasing is where most good architecture decisions are lost.',
      },
    ],
    cases: ['b2b-procurement', 'marketplace', 'manufacturing', 'fashion-d2c'],
    faqs: [
      {
        q: 'How long does an architecture engagement take?',
        a: 'A platform selection or a due diligence read is usually one to three weeks. A full architecture for a replatform is longer and is better phased, because decisions made after reading the code are considerably better than decisions made before.',
      },
      {
        q: 'Will you recommend a platform you do not work on?',
        a: 'Yes, and it happens. A recommendation that always lands on the platforms I build for is a sales pitch with a document attached, and it is worth nothing to you.',
      },
      {
        q: 'Can you review a proposal from another vendor?',
        a: 'Yes, and it is one of the highest-value things on this page. An independent read on an estimate you cannot evaluate internally costs a fraction of the project and occasionally saves the whole of it.',
      },
      {
        q: 'Do you stay involved after the architecture is agreed?',
        a: 'Where it is useful. An architecture nobody owns during the build tends to be followed for about six weeks. That can be a review cadence rather than a full engagement.',
      },
    ],
    related: [
      {
        href: '/services/ecommerce-development/',
        label: 'The build that follows the decision',
        note: 'Once the platform is chosen, this is the shape of the work.',
      },
      {
        href: '/magento-shopify-migration/',
        label: 'Magento and Shopify compared, in both directions',
        note: 'The commonest version of this decision, including when neither move is the answer.',
      },
      {
        href: '/services/erp-crm-integration/',
        label: 'Integration architecture, system by system',
        note: 'Which system owns each field, which is the decision the rest hangs off.',
      },
      {
        href: '/services/performance-optimization/',
        label: 'Scale planning, checked against a store carrying it',
        note: 'What the architecture has to survive, measured rather than estimated.',
      },
      {
        href: '/ecommerce-audit/',
        label: 'An audit, if the platform is already live',
        note: 'What the current build is costing, in writing, before a new one is designed.',
      },
      {
        href: '/digital-transformation/',
        label: 'Digital transformation, when the architecture is one part of it',
        note: 'Sequencing the programme this document feeds.',
      },
    ],

    finalHeadline: ['A decision that is', 'expensive to get wrong?'],
  },

  /* ── 6. Generative AI ───────────────────────────────────────── */
  {
    slug: 'generative-ai',
    featured: true,
    label: 'Generative AI Integration',
    navLabel: 'Generative AI',
    eyebrow: 'LLMs | RAG | Automation',
    h1: ['Generative AI', 'applied to problems', 'that are actually language problems.'],
    lede:
      'Retrieval-augmented assistants, catalogue content at scale and workflow automation, grounded in your own data. Certified with IBM and AcceleratorX in November 2026, and deliberately scoped to where it earns its place.',
    cta: 'Discuss an AI project',
    title: 'Generative AI Development Services | Yuvraj Raulji',
    description:
      'Generative AI for commerce: RAG over a product catalogue, AI assistants, catalogue content at scale and workflow automation with n8n. Honestly scoped.',
    primaryKeyword: 'generative ai development services',
    secondaryKeywords: [
      'ai integration services ecommerce',
      'rag development services',
      'llm application development',
      'ai workflow automation n8n',
      'ai product description generation',
    ],
    searchIntent: 'Commercial, often exploratory. Someone with an AI idea who needs to know which half of it is real.',
    audience: 'Commerce businesses with a specific AI idea, or with a process they suspect a model could absorb.',
    purpose: 'Own the generative AI development query for commerce, and be straight about what the certification does and does not represent.',
    entities: [
      'Generative AI',
      'Large Language Models',
      'Retrieval-Augmented Generation',
      'Prompt Engineering',
      'n8n',
      'IBM',
      'AcceleratorX',
    ],
    quickAnswer: {
      question: 'What generative AI work is worth doing on a commerce platform?',
      answer:
        'The problems that are genuinely language problems: generating and translating catalogue content at a scale no copywriter can match, answering customer questions from your own product data rather than from a model\'s memory, semantic search that understands a description instead of matching keywords, and absorbing the operational steps that are really text moving between systems. The ones not worth doing are the ones where a model is being asked to be a database, a pricing engine or a decision-maker, which is most of what gets proposed.',
    },
    overview: [
      'Most AI proposals in commerce fail for the same reason: a language model is asked to do something that is not a language task. It gets asked to know stock levels, apply pricing rules or make a decision that has to be auditable, and it produces something confident and wrong.',
      'The work that holds up is narrower and considerably more useful. Ground the model in your own data so it answers from the catalogue rather than from training. Use it where a human would otherwise be rewriting text. Put a review step wherever the output is customer-facing and the cost of being wrong is real.',
    ],
    boundary: {
      body:
        'This is build work against a platform you are keeping, and the certification is from November 2026, so the honest statement is that it formalised and extended work already underway rather than started it. There is no published AI engagement with a measured outcome on this site. Where the platform itself is being built or replatformed, the AI work belongs inside that project rather than after it.',
      link: {
        href: '/services/ai-ecommerce-development/',
        label: 'AI designed into a commerce build, rather than added to one',
      },
    },
    challenges: [
      {
        symptom: 'Forty thousand products with no usable descriptions.',
        impact: 'Search and category pages underperform, and writing them manually is a year of work nobody will fund.',
      },
      {
        symptom: 'Support answers the same twenty questions all day.',
        impact: 'A team is being paid to retrieve information that is already written down somewhere.',
      },
      {
        symptom: 'On-site search fails unless the customer uses your exact words.',
        impact: 'A shopper describing what they want gets nothing, and leaves for a search engine that understands them.',
      },
      {
        symptom: 'A chatbot was launched and had to be turned off.',
        impact: 'It was ungrounded, so it invented answers confidently, and now the organisation distrusts the whole category.',
      },
    ],
    solutions: [
      {
        name: 'Retrieval-augmented generation over your catalogue',
        body: 'Chunking, embeddings and retrieval tuned against your product data, so answers come from your catalogue and cite it. This is the difference between a useful assistant and the one that had to be switched off.',
      },
      {
        name: 'Catalogue content at scale',
        body: 'Descriptions, attributes and translations generated against your tone and your attribute data, with a review queue rather than direct publication.',
      },
      {
        name: 'Semantic search and discovery',
        body: 'Search that handles a description rather than a keyword, measured against the queries currently returning nothing.',
      },
      {
        name: 'Workflow automation with n8n',
        body: 'The operational steps that are text moving between systems, automated with the human checkpoint kept wherever a wrong answer costs something.',
      },
      {
        name: 'Evaluation before rollout',
        body: 'A held-out set and a measured pass rate before anything reaches a customer. An AI feature with no evaluation is a feature nobody can defend when it is wrong.',
      },
    ],
    technologies: [
      { group: 'Models', items: ['GPT', 'Claude', 'Gemini', 'Open models'] },
      { group: 'Technique', items: ['RAG', 'Embeddings', 'Prompt engineering', 'Evaluation', 'Tool calling'] },
      { group: 'Automation', items: ['n8n', 'Webhooks', 'Queues', 'Human-in-the-loop review'] },
      { group: 'Delivery', items: ['Node.js', 'Next.js', 'Vector stores', 'Elasticsearch'] },
    ],
    process: [
      {
        num: '01',
        title: 'Is this a language problem?',
        body: 'The cheapest step and the one that saves the most. If the task needs to be exact, auditable or arithmetic, a model is the wrong tool and the engagement should say so.',
      },
      {
        num: '02',
        title: 'Ground it in your data',
        body: 'Retrieval against your catalogue, your documentation, your policies. An ungrounded model answers from training, which is where invented answers come from.',
      },
      {
        num: '03',
        title: 'Build an evaluation set first',
        body: 'Real questions with known good answers, before the feature is built. Without it there is no way to tell improvement from a change of mood.',
      },
      {
        num: '04',
        title: 'Ship behind a review step',
        body: 'Customer-facing output goes through a human until the measured pass rate justifies removing them. The checkpoint comes out on evidence, not on schedule.',
      },
      {
        num: '05',
        title: 'Measure in production',
        body: 'What it answered, what it refused, what a person corrected. An AI feature nobody is measuring quietly degrades.',
      },
    ],
    cases: [],
    faqs: [
      {
        q: 'Will AI write our product descriptions well enough to publish?',
        a: 'At volume, with good attribute data and a defined tone, yes, with a review step. The quality ceiling is set by your attribute data far more than by the model: rich structured attributes produce good copy, and a product with three fields produces plausible filler.',
      },
      {
        q: 'How do you stop an assistant inventing answers?',
        a: 'Ground it in your data with retrieval and make it cite what it used, then evaluate against a held-out set before launch. A model with no retrieval layer answers from training, which is exactly the failure that gets chatbots switched off.',
      },
      {
        q: 'Is this proven work or is it new?',
        a: 'The certification is from November 2026 and this site publishes no AI engagement with a measured outcome, so it is stated as applied capability rather than as a decade of practice. The commerce platform experience underneath it is the part with nine years behind it.',
      },
      {
        q: 'What does an AI feature cost to run?',
        a: 'Per-token inference, embedding storage, and the engineering to keep the retrieval layer current as the catalogue changes. The third is the one left out of most estimates and it is usually the largest.',
      },
    ],
    related: [
      {
        href: '/ai-search/',
        label: 'AI search and GEO, the discovery half',
        note: 'Semantic search on your own site, and being cited by the engines in front of it.',
      },
      {
        href: '/services/workflow-automation/',
        label: 'Workflow automation, when no model is needed',
        note: 'Most of what gets asked for as AI is a process problem with a cheaper answer.',
      },
      {
        href: '/ai-commerce/',
        label: 'AI commerce, the entity page above this',
        note: 'Catalogue, search and operations, and what is worth funding before anything else.',
      },
      {
        href: '/insights/ai-ecommerce-revenue-2026/',
        label: 'The AI use cases that actually return something',
        note: 'Written out, with the ones that do not included.',
      },
      {
        href: '/mixpanel/',
        label: 'The event record these features depend on',
        note: 'What customers searched for, saw and skipped, instrumented properly.',
      },
      {
        href: '/certifications/',
        label: 'The Generative AI certification in detail',
        note: 'IBM and AcceleratorX, November 2026, and what it does and does not establish.',
      },
    ],

    finalHeadline: ['An AI idea that needs', 'an honest second opinion?'],
  },

  /* ── 7. API integration ─────────────────────────────────────── */
  {
    slug: 'api-integration',
    label: 'API Development & Integration',
    navLabel: 'API Integration',
    eyebrow: 'REST | GraphQL | ERP',
    h1: ['API development', 'and the integrations', 'nobody wants to own.'],
    lede:
      'ERP, CRM, payment, logistics and PIM connected to your commerce platform, with the failure behaviour defined rather than discovered. The least glamorous work on this site and the most frequently load-bearing.',
    cta: 'Discuss an integration',
    title: 'API Development & Integration Services | Yuvraj Raulji',
    description:
      'API development and systems integration for commerce: ERP, CRM, payment and logistics over REST and GraphQL, with retries and observable failure.',
    primaryKeyword: 'api integration services',
    secondaryKeywords: [
      'ecommerce api development',
      'erp integration services',
      'rest api development services',
      'graphql api development',
      'third party integration ecommerce',
    ],
    searchIntent: 'Commercial and usually urgent. Something is not talking to something else.',
    audience: 'Businesses whose commerce platform has to agree with an ERP, a CRM or a fulfilment system, and currently does not.',
    purpose: 'Own the API integration query, and make the case that failure handling is the actual deliverable.',
    entities: ['API Integration', 'REST', 'GraphQL', 'ERP Integration', 'Webhooks', 'Yuvraj Raulji'],
    quickAnswer: {
      question: 'What does a commerce API integration actually have to get right?',
      answer:
        'Not the happy path, which is a day of work. What takes the time and determines whether the integration survives is the rest: what happens when the other system is down, what happens when the same message arrives twice, what happens when a field is null that has never been null before, and how anyone finds out that any of it happened. An integration without retries, idempotency and observable failure is not finished, it is merely working for now.',
    },
    overview: [
      'Integration is where commerce projects quietly go wrong. The demo works, the launch works, and three months later someone notices that stock has been drifting since a timeout nobody saw.',
      'The work is unglamorous and specific: define what each system owns, define what happens on every failure, make failure visible, and make the whole thing replayable. Most of the cost is in the second and third, and most integrations skip both.',
    ],
    boundary: {
      body:
        'This covers integration as its own engagement. Where the integration is one part of a larger platform build, it is usually better scoped inside that project.',
      link: {
        href: '/magento/integrations/',
        label: 'Magento ERP and systems integration, platform-specific',
      },
    },
    challenges: [
      {
        symptom: 'Stock in the store and stock in the ERP disagree.',
        impact: 'Oversells, cancellations, and a support team manually reconciling two systems daily.',
      },
      {
        symptom: 'An integration fails silently.',
        impact: 'Nobody finds out for days, the recovery is manual, and nobody can say how many records were affected.',
      },
      {
        symptom: 'Orders occasionally duplicate.',
        impact: 'A retry somewhere is not idempotent, and finance is reconciling by hand.',
      },
      {
        symptom: 'The integration was built by someone who has left.',
        impact: 'It is undocumented, nobody will change it, and it is in the path of every order.',
      },
    ],
    solutions: [
      {
        name: 'Ownership defined before anything is written',
        body: 'Which system is authoritative for product, price, stock, customer and order. Most integration bugs are really two systems both believing they own a field.',
      },
      {
        name: 'Idempotent, retryable message handling',
        body: 'Every operation safe to repeat, every message traceable, with queues where the volume or the failure cost justifies them.',
      },
      {
        name: 'Observable failure',
        body: 'Failures that alert rather than accumulate, with enough context to act on and a replay path that does not involve a database console.',
      },
      {
        name: 'REST and GraphQL API design',
        body: 'Versioned, documented and authenticated properly, built for the consumers that exist rather than for every consumer that might.',
      },
      {
        name: 'ERP, CRM, payment and logistics connectors',
        body: 'The systems commerce platforms actually have to talk to, including the ones with documentation written in 2011.',
      },
      {
        name: 'Rescuing an integration nobody owns',
        body: 'Read it, document it, make it observable, then change it. In that order, because changing an undocumented integration in the order path is how a bad week starts.',
      },
    ],
    technologies: [
      { group: 'Protocols', items: ['REST', 'GraphQL', 'Webhooks', 'SOAP', 'SFTP'] },
      { group: 'Messaging', items: ['RabbitMQ', 'Queues', 'Retries', 'Dead letter handling'] },
      { group: 'Systems', items: ['ERP', 'CRM', 'PIM', '3PL', 'Payment gateways'] },
      { group: 'Platform', items: ['Magento 2', 'Shopify', 'Node.js', 'PHP', 'AWS'] },
    ],
    process: [
      {
        num: '01',
        title: 'Map what exists',
        body: 'Every system, every flow, and which of them anyone is currently watching. This map almost never exists and is frequently the most useful part of the engagement.',
      },
      {
        num: '02',
        title: 'Agree ownership',
        body: 'One authoritative system per field, written down. Disagreements surface here, on paper, rather than in production at volume.',
      },
      {
        num: '03',
        title: 'Design the failure behaviour',
        body: 'What happens on timeout, on duplicate, on malformed data, on the other side being down for an hour. Before the happy path is built, not after.',
      },
      {
        num: '04',
        title: 'Build, with the logging first',
        body: 'Observability goes in as the integration is written. Added afterwards it is always thinner than it should be.',
      },
      {
        num: '05',
        title: 'Run it in parallel',
        body: 'Alongside the existing process where one exists, comparing outputs, until the comparison is boring. Then switch.',
      },
    ],
    cases: ['b2b-procurement', 'manufacturing', 'marketplace'],
    faqs: [
      {
        q: 'Can you integrate with our ERP? It is quite old.',
        a: 'Usually, and age is rarely the obstacle. What matters is whether it exposes anything at all: an API, a database view, a scheduled file drop. All three are workable and they have very different failure characteristics, which is the thing to establish first.',
      },
      {
        q: 'Our integration works. Why would we change it?',
        a: 'If it has retries, idempotency and alerting, you would not, and that is a real answer. If none of those is true it is working by luck, and the usual trigger for finding out is a volume increase or a dependency outage.',
      },
      {
        q: 'Should this be real-time or batched?',
        a: 'Per flow, against what the business tolerates. Stock usually wants to be near-real-time; a nightly product export is fine batched and considerably cheaper to run. Making everything real-time is a common and expensive default.',
      },
      {
        q: 'Can you document an integration we already have?',
        a: 'Yes, and for anything in the order path it is worth doing before it needs changing. The output is the map, the failure modes and the replay procedure.',
      },
    ],
    related: [
      {
        href: '/services/erp-crm-integration/',
        label: 'ERP and CRM integration, where the systems are named',
        note: 'Stock, pricing, orders and customers, and which system owns each field.',
      },
      {
        href: '/shopify/integrations/',
        label: 'Shopify integrations, platform-specific',
        note: 'The same work inside the app and webhook model Shopify gives you.',
      },
      {
        href: '/wordpress/integrations/',
        label: 'WordPress and WooCommerce integrations',
        note: 'The same work where the plugin layer is the integration surface.',
      },
      {
        href: '/services/workflow-automation/',
        label: 'The process on top, once the systems are connected',
        note: 'The step after integration, and the conditions that have to hold before it pays.',
      },
      {
        href: '/work/b2b-procurement/',
        label: 'An integration-heavy build on the record',
        note: 'Approval workflow and ERP boundaries inside one system.',
      },
      {
        href: '/services/ecommerce-architecture/',
        label: 'Integration architecture, before any of it is built',
        note: 'The boundaries and the failure modes agreed on paper.',
      },
    ],

    finalHeadline: ['Two systems that', 'need to agree?'],
  },

  /* ── 8. eCommerce website development ───────────────────────── */
  {
    slug: 'ecommerce-development',
    featured: true,
    label: 'eCommerce Website Development',
    navLabel: 'eCommerce Development',
    eyebrow: 'Platform-agnostic | End to end',
    h1: ['An online store built', 'for the business behind it,', 'not the demo.'],
    lede:
      'A complete eCommerce build, from choosing the platform to the handover. For a business launching its first store, or replacing one that has stopped keeping up.',
    cta: 'Discuss your store',
    title: 'eCommerce Website Development | Yuvraj Raulji',
    description:
      'End-to-end eCommerce website development: platform selection, build, integration and launch on Magento, Shopify or a headless stack. Nine years, 50+ projects.',
    primaryKeyword: 'ecommerce website development',
    secondaryKeywords: [
      'ecommerce website developer',
      'build an online store',
      'custom ecommerce website',
      'b2b ecommerce website development',
    ],
    searchIntent: 'Commercial. Someone who wants a store built and has not settled on a platform.',
    audience: 'Businesses launching a first online store, or replacing one that has outgrown its platform.',
    purpose: 'Own the generic store-build query, and get the platform decision made properly before the build starts.',
    entities: ['eCommerce Development', 'Magento 2', 'Shopify', 'Headless Commerce', 'Yuvraj Raulji'],
    quickAnswer: {
      question: 'What does end-to-end eCommerce website development involve?',
      answer:
        'Choosing the platform against what the business actually needs rather than what is popular, designing the catalogue and data model, building the storefront and checkout, integrating the systems behind it (payment, shipping, ERP, accounting), migrating existing products and customers where there are any, and launching with the release process documented. The platform decision is the part that matters most and the part most often made quickest: it sets the cost of everything afterwards.',
    },
    overview: [
      'Most store builds go wrong at the first decision rather than the last. A platform gets chosen because a vendor presented well or because it is what the previous developer knew, and two years later the business is paying for that choice in work it cannot do and features it cannot have.',
      'So this starts with the platform question and treats it as a real question. Sometimes the answer is Shopify and the build is three weeks. Sometimes it is Magento and the build is three months. The difference is worth establishing before anybody writes code.',
    ],
    boundary: {
      body:
        'This is a whole-store build with no AI in the brief, which is the right shape more often than the alternative. If you already know the platform and need specific work on it, the platform pages are more direct; if the brief does include AI, the catalogue and search decisions in this build change and they are better made with that known.',
      link: {
        href: '/services/ai-ecommerce-development/',
        label: 'The same build with AI designed into it',
      },
    },
    challenges: [
      {
        symptom: 'We are selling through social media and a spreadsheet.',
        impact: 'Every order is manual, nothing is reportable, and the business cannot grow past the person doing the typing.',
      },
      {
        symptom: 'Three vendors have quoted three platforms and three prices.',
        impact: 'Nobody internally can evaluate the technical claims, so the decision is drifting toward whoever presented best.',
      },
      {
        symptom: 'The current store cannot do what the business now needs.',
        impact: 'Workarounds have accumulated, and nobody is sure whether to extend it or replace it.',
      },
      {
        symptom: 'The store works but nothing behind it is connected.',
        impact: 'Stock, orders and invoices are reconciled by hand, which is a cost that grows with revenue.',
      },
    ],
    solutions: [
      {
        name: 'Platform selection, with the reasoning written down',
        body: 'Requirements against candidates, what each costs to build and to run, and what each would be bad at. A recommendation you can argue with is worth more than one you have to trust.',
      },
      {
        name: 'Catalogue and data modelling',
        body: 'Attributes, variants, categories and pricing structured for how the business actually sells. Getting this wrong is the single most expensive thing to fix later.',
      },
      {
        name: 'Storefront and checkout build',
        body: 'Built against your design, responsive, and measured on Core Web Vitals rather than assumed to be fast.',
      },
      {
        name: 'Systems integration',
        body: 'Payment, shipping, tax, accounting and ERP, with the failure behaviour defined rather than discovered in production.',
      },
      {
        name: 'Migration of what exists',
        body: 'Products, customers, orders and URLs, with redirects mapped so the SEO you have already paid for survives the move.',
      },
      {
        name: 'Launch and handover',
        body: 'Release process written down, documentation aimed at your team, and a defined window afterwards where fixes are mine.',
      },
    ],
    technologies: [
      { group: 'Platforms', items: ['Magento 2', 'Adobe Commerce', 'Shopify', 'Shopify Plus', 'WooCommerce'] },
      { group: 'Frontend', items: ['Next.js', 'React', 'Liquid', 'Tailwind CSS'] },
      { group: 'Integration', items: ['Payment gateways', 'Shipping & 3PL', 'ERP', 'Accounting', 'PIM'] },
      { group: 'Launch', items: ['AWS', 'Cloudflare', 'Redirect mapping', 'Core Web Vitals'] },
    ],
    process: BUILD_PROCESS,
    cases: ['plant-store', 'sports-nutrition', 'marketplace'],
    faqs: [
      {
        q: 'Which platform should we use?',
        a: 'It depends on catalogue size, how custom the checkout needs to be, whether you sell B2B, and how much engineering you want to own. Shopify for speed to market and low operational burden; Magento when the catalogue or the B2B rules are genuinely complex; headless when the frontend has requirements the platform theme cannot meet. The assessment is a few days and it is the cheapest part of the project.',
      },
      {
        q: 'How long does a store build take?',
        a: 'A focused Shopify build is usually weeks. A multi-store Magento platform with ERP integration is months. The honest answer comes after the scope is written, which is why that is step one and why it is free.',
      },
      {
        q: 'Can you work with our existing designer?',
        a: 'Yes, and that is the usual arrangement. I build against a design rather than creating brand systems, so a designer you already trust is an asset to the project rather than a complication.',
      },
      {
        q: 'What about SEO when we move platforms?',
        a: 'URL mapping and redirects are part of the scope, not an afterthought. A replatform that drops its old URLs loses the ranking the business has already paid for, and recovering it costs more than mapping it would have.',
      },
    ],
    related: [
      {
        href: '/services/ecommerce-architecture/',
        label: 'Platform selection as its own engagement',
        note: 'The decision written down first, when it is neither obvious nor agreed.',
      },
      {
        href: '/magento/',
        label: 'Magento, if the complexity is real',
        note: 'Catalogue scale, pricing logic and approvals, and when it is the wrong answer.',
      },
      {
        href: '/shopify/',
        label: 'Shopify, which is the right answer more often',
        note: 'Where it fits, and the point at which stores outgrow it.',
      },
      {
        href: '/woocommerce/',
        label: 'WooCommerce, for content-led commerce at a smaller scale',
        note: 'And the point a store outgrows the plugin layer.',
      },
      {
        href: '/services/ecommerce-maintenance/',
        label: 'Who keeps it running after launch',
        note: 'Patching, upgrades and monitoring, without a developer on payroll.',
      },
      {
        href: '/work/plant-store/',
        label: 'A store build on the record',
        note: 'What a complete build looks like once it is finished.',
      },
    ],

    finalHeadline: ['Store to build,', 'or replace?'],
  },

  /* ── 9. Maintenance and support ─────────────────────────────── */
  {
    slug: 'ecommerce-maintenance',
    featured: true,
    label: 'Website Maintenance & Support',
    navLabel: 'Maintenance & Support',
    eyebrow: 'Retainer | Ongoing',
    h1: ['Someone who owns', 'the platform', 'between projects.'],
    lede:
      'Patching, upgrades, monitoring and the occasional thing that breaks at a bad time. For a store that works and needs to keep working, without a developer on payroll.',
    cta: 'Get Technical Support',
    title: 'eCommerce Website Maintenance & Support | Yuvraj Raulji',
    description:
      'Ongoing maintenance for Magento, Shopify and WooCommerce stores: security patching, upgrades, monitoring and incident response, on a retainer.',
    primaryKeyword: 'ecommerce website maintenance',
    secondaryKeywords: [
      'ecommerce support retainer',
      'magento maintenance services',
      'online store support services',
      'website maintenance and support contract',
      'ongoing ecommerce development support',
    ],
    searchIntent: 'Commercial. A business with a live store and nobody technical looking after it.',
    audience: 'Businesses running a live store with no in-house developer, and agencies needing overflow support capacity.',
    purpose: 'Own the maintenance query, and make the case that unowned platforms fail predictably.',
    entities: ['Website Maintenance', 'eCommerce Support', 'Magento 2', 'Shopify', 'Security Patching'],
    quickAnswer: {
      question: 'What does eCommerce website maintenance actually cover?',
      answer:
        'Security patching on the platform and its extensions, version upgrades, dependency and certificate renewals, uptime and error monitoring, database and cache health, backup verification that actually restores, performance tuning as the catalogue grows, and incident response during agreed hours. Plus the small changes that accumulate: a payment method, a shipping rule, a template fix. Typically a reserved block of hours each month rather than an hourly call-out, because the work that prevents incidents is the work that gets skipped when it is billed by the emergency.',
    },
    overview: [
      'A commerce platform is not a finished object. Dependencies get security advisories, payment providers change APIs, certificates expire, the catalogue grows past what the current indexing handles, and the backup nobody has tested turns out not to restore.',
      'None of that is urgent until it is all urgent at once, usually on the highest-traffic day of the year. The point of a retainer is that the preventable half never becomes an incident, and the unpreventable half has someone who already knows the system.',
    ],
    boundary: {
      body:
        'This is ongoing ownership, not a one-off fix. If something is broken right now and you need it diagnosed, that is better as an hourly engagement than a retainer.',
      link: {
        href: '/pricing/',
        label: 'Engagement models, including hourly for a one-off',
      },
    },
    challenges: [
      {
        symptom: 'The store has not been patched in a year.',
        impact: 'Known vulnerabilities in the platform and its extensions, and a card-skimming incident is the usual way a business finds out.',
      },
      {
        symptom: 'The developer who built it has gone.',
        impact: 'Nobody knows how it deploys, nothing is documented, and every change is a risk nobody wants to take.',
      },
      {
        symptom: 'When something breaks, nobody knows until a customer says so.',
        impact: 'No monitoring, so the time between a failure and finding out is however long it takes someone to complain.',
      },
      {
        symptom: 'Small changes wait weeks for a quote.',
        impact: 'A payment method or a shipping rule becomes a project, so the business stops asking and works around its own store.',
      },
    ],
    solutions: [
      {
        name: 'Security patching and upgrades',
        body: 'Platform and extension patches applied on a schedule and tested before they reach production, with the version position reported rather than assumed.',
      },
      {
        name: 'Monitoring that reaches a person',
        body: 'Uptime, error rates and the key transactional flows, alerting to somebody rather than accumulating in a dashboard nobody opens.',
      },
      {
        name: 'Backup verification',
        body: 'Restores tested, not just backups taken. An untested backup is a belief rather than a safeguard, and this is where that gets found out safely.',
      },
      {
        name: 'Performance as the catalogue grows',
        body: 'Cache, index and query health reviewed as the data changes, because the configuration that was right at 5,000 products is not right at 200,000.',
      },
      {
        name: 'The small changes',
        body: 'Payment methods, shipping rules, template fixes and content structure, inside the monthly allocation rather than quoted individually.',
      },
      {
        name: 'Incident response',
        body: 'Priority access during agreed hours, from someone who already knows the system rather than someone reading it for the first time under pressure.',
      },
    ],
    technologies: [
      { group: 'Platforms', items: ['Magento 2', 'Adobe Commerce', 'Shopify', 'WooCommerce', 'WordPress'] },
      { group: 'Infrastructure', items: ['AWS', 'Nginx', 'Varnish', 'Redis', 'Cloudflare'] },
      { group: 'Monitoring', items: ['Uptime monitoring', 'Error tracking', 'Log review', 'Backup verification'] },
      { group: 'Release', items: ['Git', 'GitLab CI', 'Jenkins', 'Staging environments'] },
    ],
    process: [
      {
        num: '01',
        title: 'Audit what you have',
        body: 'Version position, patch status, extension inventory, monitoring, backups and deployment process. The output is a list, and often the first useful document the platform has ever had.',
      },
      {
        num: '02',
        title: 'Fix what is urgent',
        body: 'Security patches and anything actively broken, before any routine work starts. This is usually the first month.',
      },
      {
        num: '03',
        title: 'Put the routine in place',
        body: 'Patch schedule, monitoring, backup verification and a documented release process, so the preventable half stops being incidents.',
      },
      {
        num: '04',
        title: 'Run it, and report monthly',
        body: 'A written summary of what changed, what was patched, what broke and where the hours went. Rolling monthly, cancellable with notice.',
      },
    ],
    cases: ['manufacturing', 'b2b-procurement'],
    faqs: [
      {
        q: 'What happens in the first month?',
        a: 'An audit and then the urgent fixes. On a platform that has been unmaintained for a while the first month is almost entirely catching up, and the routine work starts once the backlog of security patches is clear.',
      },
      {
        q: 'Do unused hours roll over?',
        a: 'That is agreed per arrangement and I am flexible about it. What I will not do is treat a retainer as a budget to be consumed: the point is reserved capacity, and a month where little goes wrong is the arrangement working rather than value lost.',
      },
      {
        q: 'What if a large project comes up mid-retainer?',
        a: 'It gets scoped separately. A retainer consumed by one build is not a retainer, and pretending otherwise means the maintenance stops happening precisely when the platform is changing most.',
      },
      {
        q: 'Can you support a platform you did not build?',
        a: 'Yes, and that is most of this work. It starts with reading it, which is the audit in step one, because an undocumented platform in the order path is not something to start changing on day one.',
      },
    ],
    related: [
      {
        href: '/magento/maintenance/',
        label: 'Magento support and maintenance, platform-specific',
        note: 'Patching, upgrades and the indexers, on the platform that needs it most.',
      },
      {
        href: '/shopify/maintenance/',
        label: 'Shopify store maintenance, platform-specific',
        note: 'Apps, themes and the script-tag tax, kept under control.',
      },
      {
        href: '/wordpress/maintenance/',
        label: 'WordPress maintenance, platform-specific',
        note: 'Plugins, core updates, and the hardening that has to come with them.',
      },
      {
        href: '/magento/security/',
        label: 'Security patching, where the stakes are highest',
        note: 'A patch applied once is a task. Staying patched is what this retainer is.',
      },
      {
        href: '/services/performance-optimization/',
        label: 'Performance work, which this retainer does not include',
        note: 'Diagnosis and fixing as its own engagement, measured first.',
      },
      {
        href: '/remote-collaboration/',
        label: 'How a retainer runs across time zones',
        note: 'Hours, handover, and what response actually means in practice.',
      },
      /* The seventh link, and the only one on these pages pointing at an
         expertise pillar. /expertise/website-management/ had two in-content
         links to its name, the thinnest of the three pillars, and this is the
         page whose reader is closest to it: a retainer is what owning a web
         estate looks like once it is bought. */
      {
        href: '/expertise/website-management/',
        label: 'Website management as a discipline rather than a retainer',
        note: 'The pillar above this page: owning the estate instead of patching it.',
      },
    ],

    finalHeadline: ['Platform nobody', 'is looking after?'],
  },

  /* ── 10. Performance optimisation ───────────────────────────── */
  {
    slug: 'performance-optimization',
    label: 'Performance Optimization',
    navLabel: 'Performance Optimization',
    eyebrow: 'Core Web Vitals | Speed',
    h1: ['Finding out where', 'the time actually goes.'],
    lede:
      'Store speed and Core Web Vitals work that starts with measurement rather than a checklist. The bottleneck is usually not where the team assumes, which is why the guesses have not worked.',
    cta: 'Discuss a performance audit',
    title: 'eCommerce Performance Optimization | Yuvraj Raulji',
    description:
      'eCommerce speed and Core Web Vitals work for Magento, Shopify and headless stores: caching, indexing, database and frontend delivery. Measured, not guessed.',
    primaryKeyword: 'ecommerce performance optimization',
    secondaryKeywords: [
      'ecommerce site speed optimization',
      'core web vitals ecommerce',
      'magento speed optimization service',
      'shopify speed optimization',
      'improve online store loading speed',
    ],
    searchIntent: 'Commercial and usually frustrated. A store that is slow and a team that has already tried things.',
    audience: 'Businesses losing conversion to page speed, and teams whose Core Web Vitals will not move.',
    purpose: 'Own the performance query, and establish that diagnosis precedes optimisation.',
    entities: ['Core Web Vitals', 'Performance Optimization', 'Magento 2', 'Shopify', 'Varnish', 'Redis'],
    quickAnswer: {
      question: 'How do you actually make an eCommerce store faster?',
      answer:
        'By measuring first. Server response, database queries, cache hit rates, index freshness, third-party scripts, image delivery and render-blocking resources are all candidates, and on any given store one or two of them dominate while the rest are noise. The work is finding which, fixing those, and measuring again. On the record: site speed improved by 60% through Varnish, Redis, full-page cache, CDN and database tuning. The checklist approach, applying every known optimisation, usually moves the number a little and costs a lot.',
    },
    overview: [
      'Almost every slow store has already had things tried on it. Images compressed, a CDN added, a caching extension installed, lazy loading switched on. Sometimes it helped a little; usually the number barely moved, because the actual bottleneck was somewhere nobody looked.',
      'That is the whole argument for measuring before optimising. A store where the database is doing a full scan on category pages will not be fixed by better images, and one where twelve third-party scripts block render will not be fixed by a faster server.',
    ],
    boundary: {
      body:
        'This is diagnosis and fixing. If the storefront architecture itself is the ceiling, the honest answer is sometimes a decoupled frontend rather than more tuning, and that is a bigger decision.',
      link: {
        href: '/services/headless-commerce/',
        label: 'Headless commerce, and when the theme layer is the actual limit',
      },
    },
    challenges: [
      {
        symptom: 'Core Web Vitals will not improve no matter what we try.',
        impact: 'Paid traffic is landing on a page that converts below what it should, and the spend is unchanged.',
      },
      {
        symptom: 'The site is fine until traffic arrives.',
        impact: 'It falls over on exactly the days that matter, and the response has been to over-provision and hope.',
      },
      {
        symptom: 'Category pages take seconds to load.',
        impact: 'Shoppers abandon before the products appear, and the catalogue the business has invested in is effectively hidden.',
      },
      {
        symptom: 'Someone added a caching extension and nothing changed.',
        impact: 'Money spent on a fix for a problem that was never diagnosed, and now less confidence that anything will work.',
      },
    ],
    solutions: [
      {
        name: 'Measurement before anything else',
        body: 'Server timing, query profiling, cache hit rates, index state and real-user Core Web Vitals. The deliverable of this step is knowing which two things matter.',
      },
      {
        name: 'Backend and database',
        body: 'Query profiling, missing indexes, N+1 patterns and the queries that only become a problem at your data volume.',
      },
      {
        name: 'Caching architecture',
        body: 'Full-page cache, Varnish, Redis and the invalidation rules, because a cache that is correct but never hit is a cache that does nothing.',
      },
      {
        name: 'Search and indexing',
        body: 'Elasticsearch configuration and reindex strategy, which is where large-catalogue stores usually lose their category pages.',
      },
      {
        name: 'Frontend delivery',
        body: 'Render-blocking resources, image formats and sizing, font loading, and the third-party scripts nobody has audited since they were added.',
      },
      {
        name: 'Measured again, and written down',
        body: 'Before and after on the same conditions, so the improvement is a number rather than an impression. This is the part that makes the next decision easier.',
      },
    ],
    technologies: [
      { group: 'Caching', items: ['Varnish', 'Redis', 'Full-page cache', 'Cloudflare', 'CDN'] },
      { group: 'Data', items: ['MySQL profiling', 'Elasticsearch', 'Query optimisation', 'Indexing'] },
      { group: 'Frontend', items: ['Core Web Vitals', 'LCP', 'INP', 'CLS', 'Image optimisation'] },
      { group: 'Measurement', items: ['Lighthouse', 'CrUX', 'Real user monitoring', 'New Relic'] },
    ],
    process: [
      {
        num: '01',
        title: 'Measure the real thing',
        body: 'Production conditions, production data, real devices and real networks. A local profile of a store with twelve test products tells you nothing about one with two hundred thousand.',
      },
      {
        num: '02',
        title: 'Find the two that matter',
        body: 'Rank the candidates by how much time each actually accounts for. On most stores one or two dominate and the rest are rounding errors.',
      },
      {
        num: '03',
        title: 'Fix those, in order',
        body: 'Largest first, measured after each. Changing six things at once means not knowing which one worked, which matters the next time something slows down.',
      },
      {
        num: '04',
        title: 'Report the before and after',
        body: 'Same conditions, same measurement, written down. A performance engagement with no number at the end is indistinguishable from one that did nothing.',
      },
      {
        num: '05',
        title: 'Leave the monitoring behind',
        body: 'So the next regression is visible when it happens rather than when someone notices months later.',
      },
    ],
    cases: ['marketplace', 'b2b-procurement', 'fashion-d2c'],
    faqs: [
      {
        q: 'How much faster will our store get?',
        a: 'I will not quote a number before measuring, and anyone who does is guessing. What I can say is what the record shows: 60% improvement on a large multi-store Magento platform through caching, CDN and database work. Your store has its own bottleneck and its own ceiling.',
      },
      {
        q: 'Is a performance audit worth it on its own?',
        a: 'Often yes, and it is the cheapest way to find out whether the work is worth doing. The audit tells you what is wrong and roughly what fixing each thing costs, and you can then decide, including deciding not to.',
      },
      {
        q: 'Will this help SEO?',
        a: 'Core Web Vitals are a ranking factor, so improving them helps, and it is rarely the largest factor. The more reliable benefit is conversion: a faster checkout loses fewer people who had already decided to buy.',
      },
      {
        q: 'Do we need to replatform to be fast?',
        a: 'Usually not. Most slow stores are slow because of configuration, queries and third-party scripts rather than because the platform is incapable. Replatforming for speed alone is an expensive answer to a question that has not been diagnosed.',
      },
    ],
    related: [
      {
        href: '/magento/performance/',
        label: 'Magento performance, platform-specific',
        note: 'Varnish, Redis, the indexers and the database, where catalogue scale bites.',
      },
      {
        href: '/shopify/optimization/',
        label: 'Shopify optimisation, platform-specific',
        note: 'Apps, theme weight and the funnel, in that order.',
      },
      {
        href: '/wordpress/optimization/',
        label: 'WordPress speed optimisation, platform-specific',
        note: 'Hosting, plugins and the render path.',
      },
      {
        href: '/headless-commerce/optimization/',
        label: 'Storefront performance on a decoupled build',
        note: 'Rendering tiers, cache hit rate and bundle budgets.',
      },
      {
        href: '/insights/magento2-seo-technical-audit/',
        label: 'Core Web Vitals, read from the crawler side',
        note: 'The third phase of that audit is the same subject as this page.',
      },
      {
        href: '/ecommerce-audit/',
        label: 'An audit, if nothing has been measured yet',
        note: 'Where the time is actually going, in writing, before any work is scoped.',
      },
    ],

    finalHeadline: ['Slow store,', 'and nobody knows why?'],
  },

  /* ── 11. Adobe Commerce ─────────────────────────────────────── */
  {
    slug: 'adobe-commerce-development',
    featured: true,
    label: 'Adobe Commerce Development',
    navLabel: 'Adobe Commerce',
    eyebrow: 'Adobe Commerce | Commerce Cloud',
    h1: ['Adobe Commerce', 'development for the', 'features you pay for.'],
    lede:
      'B2B company accounts, shared catalogues, customer segments, Page Builder and Commerce Cloud. The licensed half of the platform, built properly rather than worked around.',
    cta: 'Discuss an Adobe Commerce project',
    title: 'Adobe Commerce Development Services | Yuvraj Raulji',
    description:
      'Adobe Commerce development: B2B company accounts and approvals, shared catalogues, customer segments, Page Builder, staging and Commerce Cloud on Fastly.',
    primaryKeyword: 'adobe commerce development services',
    secondaryKeywords: [
      'adobe commerce developer',
      'adobe commerce b2b development',
      'magento commerce development',
      'adobe commerce cloud development',
    ],
    searchIntent: 'Commercial, and usually enterprise. A business already paying for Adobe Commerce, or deciding whether to.',
    audience: 'Mid-market and enterprise merchants on Adobe Commerce, and the agencies delivering for them.',
    purpose: 'Own the Adobe Commerce development query separately from Magento Open Source, because the licence changes what the work is.',
    entities: ['Adobe Commerce', 'Magento 2', 'Commerce Cloud', 'B2B Commerce', 'Page Builder', 'Yuvraj Raulji'],
    quickAnswer: {
      question: 'How is Adobe Commerce development different from Magento Open Source?',
      answer:
        'The architecture is the same and the surface is not. Adobe Commerce adds company accounts, shared catalogues, requisition lists and multi-level purchase approvals for B2B, customer segments and targeted rules, Page Builder, content staging and preview, and on the Cloud tier a managed Fastly, New Relic and deployment pipeline. Development work therefore splits in two: building correctly inside those modules instead of rebuilding them, and configuring the infrastructure the licence already provides. Most of the waste on Adobe Commerce projects is custom code that duplicates a feature the business is already paying for.',
    },
    overview: [
      'A business on Adobe Commerce is paying a significant annual licence, and the first useful question on any engagement is which of the paid features it is actually using. The answer is frequently "about half", with custom modules sitting alongside the native ones doing a worse version of the same job.',
      'The second question is whether the B2B module fits the way the business really buys. Company accounts, shared catalogues and approval rules cover a great deal of it natively. Where they do not, the right extension point exists and the wrong one is writing a parallel workflow next to it. Knowing which is which is most of the value here.',
      'On the Cloud tier there is a third layer: Fastly, the deployment pipeline, the three-environment model and New Relic are part of what was bought. Treating them as managed hosting and nothing else leaves performance and release safety on the table.',
    ],
    boundary: {
      body:
        'This page is about the licensed platform. If you are on Magento Open Source, most of the work is the same engineering without the B2B, staging and segment modules, and that has its own page.',
      link: {
        href: '/services/magento-development/',
        label: 'Magento 2 development, for Open Source builds',
      },
    },
    challenges: [
      {
        symptom: 'We pay for Adobe Commerce and use it like Open Source.',
        impact: 'A six-figure licence funding features that are switched off, while custom modules do the same work less reliably.',
      },
      {
        symptom: 'The B2B module almost fits, so someone built around it.',
        impact: 'Two approval systems in one codebase, and nobody is certain which one a given order went through.',
      },
      {
        symptom: 'Page Builder was disabled because the theme fought it.',
        impact: 'Every campaign page is a developer ticket, and the content team has stopped planning them.',
      },
      {
        symptom: 'Cloud deploys are slow and occasionally frightening.',
        impact: 'Releases get batched up, which makes each one larger and the next one more frightening still.',
      },
    ],
    solutions: [
      {
        name: 'B2B built on the native module',
        body: 'Company accounts, company users and roles, shared catalogues, requisition lists and multi-level approval rules configured and extended through the module rather than beside it. Five-level approval chains covering orders, quotes and vendor management are on the record.',
      },
      {
        name: 'Customer segments and targeted rules',
        body: 'Segments driven by real attributes and order history, wired into cart price rules, targeted content and related product rules, so merchandising stops needing a deployment.',
      },
      {
        name: 'Page Builder that the theme supports',
        body: 'Content types the theme actually renders, with the layout constraints built in. The test is whether a marketer can ship a landing page without a developer and without breaking the grid.',
      },
      {
        name: 'Staging, preview and scheduled updates',
        body: 'Campaign content, pricing and rules scheduled ahead and previewed before they run, which is the feature most often left unconfigured and the one that removes the most midnight deployments.',
      },
      {
        name: 'Commerce Cloud configuration',
        body: 'Fastly VCL and cache policy, the three-environment branching model, deployment hooks and New Relic alerting, treated as part of the product rather than as someone else is hosting.',
      },
      {
        name: 'Licence audit before any custom build',
        body: 'What the platform already does, what is genuinely missing, and what should be deleted because a native feature covers it. This is routinely the cheapest deliverable of an engagement.',
      },
    ],
    technologies: [
      { group: 'Platform', items: ['Adobe Commerce', 'Magento 2', 'Magento B2B', 'Page Builder', 'MSI'] },
      { group: 'Cloud', items: ['Commerce Cloud', 'Fastly', 'New Relic', 'ECE Tools'] },
      { group: 'Language & data', items: ['PHP', 'MySQL', 'GraphQL', 'REST APIs'] },
      { group: 'Performance', items: ['Varnish', 'Redis', 'Elasticsearch', 'RabbitMQ'] },
    ],
    process: BUILD_PROCESS,
    cases: ['b2b-procurement', 'marketplace'],
    faqs: [
      {
        q: 'Is Adobe Commerce worth the licence over Magento Open Source?',
        a: 'It is when you need the B2B module, customer segments, staging or the Cloud tooling, and it is not when you need none of them. That is a short assessment rather than a long one: list what you would otherwise build, price it honestly, and compare. Businesses that answer "we would build the approval workflow and the segment engine" nearly always come out ahead on the licence.',
      },
      {
        q: 'Can you work on an Adobe Commerce build somebody else delivered?',
        a: 'Yes, and that is most of this work. It begins by reading the code and the admin configuration together, because the usual finding is a custom module shadowing a native feature, and that is visible only when you look at both.',
      },
      {
        q: 'Do you work on Commerce Cloud or self-hosted Adobe Commerce?',
        a: 'Both. Cloud changes the deployment and caching work rather than the application work: Fastly instead of your own Varnish, the ECE pipeline instead of your own CI. The architecture, the B2B model and the catalogue work are identical.',
      },
      {
        q: 'We are on Magento Open Source and considering Adobe Commerce. Is that a migration?',
        a: 'It is an upgrade path rather than a replatform, and the data comes across. The real work is adopting the modules you are now paying for, which means retiring the custom code that was standing in for them. Budget for that rather than for the move.',
      },
    ],
    related: [
      {
        href: '/magento/',
        label: 'Magento and Adobe Commerce, and where the platform stops',
        note: 'The entity page above both build pages, licence or no licence.',
      },
      {
        href: '/services/custom-module-development/',
        label: 'Modules against the B2B and staging surfaces',
        note: 'Written so Page Builder and content staging survive the next upgrade.',
      },
      {
        href: '/magento/upgrade/',
        label: 'Upgrades on the licensed platform',
        note: 'Rehearsed and reversible, and the part the licence does not make easier.',
      },
      {
        href: '/work/b2b-procurement/',
        label: 'Company accounts and approvals on the record',
        note: 'The B2B build this tier exists for.',
      },
      {
        href: '/insights/shopify-plus-vs-magento2-2026/',
        label: 'The two licensed tiers compared',
        note: 'Adobe Commerce against Shopify Plus, cost drivers included.',
      },
      {
        href: '/pricing/',
        label: 'How a licensed-platform build is scoped',
        note: 'And why the licence is not the figure that decides the project.',
      },
    ],

    finalHeadline: ['Paying for Adobe Commerce', 'and using half of it?'],
  },

  /* ── 12. Shopify Plus ───────────────────────────────────────── */
  {
    slug: 'shopify-plus-development',
    featured: true,
    label: 'Shopify Plus Development',
    navLabel: 'Shopify Plus',
    eyebrow: 'Shopify Plus | Functions',
    h1: ['Shopify Plus work', 'that needs the tier,', 'and knows why.'],
    lede:
      'Checkout extensibility, Shopify Functions, B2B on Plus, expansion stores and Markets. The things the tier exists for, built on the supported extension points.',
    cta: 'Discuss a Shopify Plus project',
    title: 'Shopify Plus Development Services | Yuvraj Raulji',
    description:
      'Shopify Plus development: checkout UI extensions, Shopify Functions, B2B company accounts, expansion stores, Markets and Flow automation. Senior engineering.',
    primaryKeyword: 'shopify plus development services',
    secondaryKeywords: [
      'shopify plus developer',
      'shopify checkout extensibility development',
      'shopify functions development',
      'shopify plus b2b development',
    ],
    searchIntent: 'Commercial. A brand already on Plus, or about to upgrade and wanting to know what it buys.',
    audience: 'High-volume D2C and B2B brands on Shopify Plus, and agencies needing Plus-specific engineering.',
    purpose: 'Own the Shopify Plus query, and separate the work that genuinely requires the tier from work that does not.',
    entities: ['Shopify Plus', 'Shopify Functions', 'Checkout Extensibility', 'Shopify Markets', 'Shopify Flow', 'Yuvraj Raulji'],
    quickAnswer: {
      question: 'What can you build on Shopify Plus that you cannot build on Shopify?',
      answer:
        'Checkout itself. Plus is the tier where checkout stops being fixed: checkout UI extensions add content and fields to the real checkout, and Shopify Functions replace discount, delivery, payment and cart logic server side. It also carries B2B company accounts with catalogues and payment terms, up to nine expansion stores under one contract, Shopify Flow for operational automation, and higher API limits. Everything else, custom themes, private apps, Storefront API work and systems integration, runs perfectly well on standard Shopify, which is why the upgrade decision should be made against that list rather than against revenue.',
    },
    overview: [
      'Plus is sold on volume and bought for capability, and the two do not always coincide. The useful way to approach it is to write down what the business cannot currently do, then check which of those things the tier actually unlocks. Often it is one: the checkout.',
      'Once the business is on Plus, the engineering changes shape. Scripts are gone and Functions have replaced them, which is a better model and a rewrite. Checkout customisation moves from script injection, which broke on every update, to extension points that Shopify supports and tests against. Work built the old way has to move, and that migration is a large part of current Plus work.',
      'The second half is operational. Flow automates the processes a growing brand is doing by hand, Markets handles currency, duty and localisation per region, and expansion stores let a brand run a separate storefront per market without a separate contract. These pay back quickly and are frequently unconfigured.',
    ],
    boundary: {
      body:
        'This page is for work that needs the tier. Custom themes, private apps and integrations do not, and if that is what you need you should not be upgrading for it.',
      link: {
        href: '/services/shopify-development/',
        label: 'Shopify development, for work that runs on any plan',
      },
    },
    challenges: [
      {
        symptom: 'Our checkout customisation was written in Scripts.',
        impact: 'Scripts are retired, the logic has to move to Functions, and nobody has documented what the Scripts actually do.',
      },
      {
        symptom: 'We upgraded to Plus and are not using anything new.',
        impact: 'A materially larger monthly bill funding a tier whose distinguishing features are switched off.',
      },
      {
        symptom: 'B2B customers are handled by a separate wholesale site.',
        impact: 'Two storefronts, two catalogues and two sets of inventory truth, reconciled by a person.',
      },
      {
        symptom: 'Every new market means another store nobody has time to run.',
        impact: 'Pricing, duty and translation drift between storefronts, and the brand looks different in each one.',
      },
    ],
    solutions: [
      {
        name: 'Checkout UI extensions',
        body: 'Content, fields, upsells and validation inside the real checkout, at the supported extension points, so a Shopify release does not take the checkout down with it.',
      },
      {
        name: 'Shopify Functions',
        body: 'Discount, delivery, payment and cart transform logic running server side, including migration of existing Scripts logic with the behaviour documented on the way through.',
      },
      {
        name: 'B2B on Plus',
        body: 'Company accounts, locations, catalogues with account-specific pricing and payment terms on the same store as D2C, which removes the second storefront and the reconciliation behind it.',
      },
      {
        name: 'Expansion stores and Markets',
        body: 'Per-market storefronts with shared operations, currency and duty handled by Markets, and a content model that does not fork per region.',
      },
      {
        name: 'Flow and Launchpad automation',
        body: 'Operational workflows, tagging, fraud and fulfilment rules, and scheduled launches, built so the operations team owns them afterwards rather than me.',
      },
      {
        name: 'Headless over the Storefront API',
        body: 'Hydrogen or Next.js against the Storefront API where the storefront genuinely needs it, which is less often than it is proposed and is covered honestly on the headless page.',
      },
    ],
    technologies: [
      { group: 'Platform', items: ['Shopify Plus', 'Shopify Functions', 'Checkout extensions', 'Shopify B2B'] },
      { group: 'Operations', items: ['Shopify Flow', 'Launchpad', 'Shopify Markets', 'Expansion stores'] },
      { group: 'APIs', items: ['Storefront API', 'Admin API', 'GraphQL', 'Webhooks'] },
      { group: 'Frontend', items: ['Liquid', 'TypeScript', 'Hydrogen', 'Next.js'] },
    ],
    process: BUILD_PROCESS,
    cases: ['plant-store', 'fashion-d2c', 'sports-nutrition'],
    faqs: [
      {
        q: 'Should we upgrade to Shopify Plus?',
        a: 'Write down what you cannot do today, then check that list against what the tier unlocks: checkout extensibility, Functions, B2B company accounts, expansion stores, Flow and higher API limits. If nothing on your list is on that list, the upgrade buys you support and a bill. If the checkout is on your list, it is the only route.',
      },
      {
        q: 'We still run Shopify Scripts. How bad is the migration?',
        a: 'It is a rewrite rather than a port, because Functions have a different execution model. The hard part is almost never the code: it is establishing what the Scripts currently do, since the edge cases were usually added over years by people who have left. That archaeology is the first phase and it is worth doing carefully.',
      },
      {
        q: 'Can Plus handle B2B and D2C on one store?',
        a: 'Yes, and that is the strongest argument for the tier for a brand running both. Company accounts, account-specific catalogues and payment terms sit alongside the consumer storefront, which removes the separate wholesale site and the inventory reconciliation it required.',
      },
      {
        q: 'Will checkout extensions survive Shopify updates?',
        a: 'That is precisely why they exist. Extensions and Functions are supported extension points that Shopify tests against; the previous generation of checkout customisation was script injection into a page Shopify kept changing, which is why it kept breaking.',
      },
    ],
    related: [
      {
        href: '/shopify/',
        label: 'Shopify and Shopify Plus, and where the platform stops',
        note: 'The entity page above both build pages, tier or no tier.',
      },
      {
        href: '/shopify/consulting/',
        label: 'Whether the tier is worth it, before upgrading',
        note: 'The cheaper version of this conversation, and sometimes the one that ends it.',
      },
      {
        href: '/services/custom-module-development/',
        label: 'Apps and extensions on the supported surfaces',
        note: 'Admin and Storefront APIs, with no script-tag workarounds.',
      },
      {
        href: '/insights/shopify-plus-vs-magento2-2026/',
        label: 'Plus against Adobe Commerce',
        note: 'The comparison most Plus decisions are actually made against.',
      },
      {
        href: '/work/fashion-d2c/',
        label: 'A D2C build on the record',
        note: 'Where the storefront was decoupled and the checkout deliberately was not.',
      },
      {
        href: '/services/workflow-automation/',
        label: 'Flow, Launchpad and the operations around the store',
        note: 'The process work the tier makes possible, and when it pays for itself.',
      },
    ],

    finalHeadline: ['On Plus, and using', 'none of what it bought?'],
  },

  /* ── 13. Next.js and React ──────────────────────────────────── */
  {
    slug: 'nextjs-development',
    featured: true,
    label: 'Next.js & React Development',
    navLabel: 'Next.js & React',
    eyebrow: 'Next.js | React | TypeScript',
    h1: ['Next.js and React,', 'with the rendering', 'decision made on purpose.'],
    lede:
      'App Router applications, commerce storefronts and interfaces over existing APIs. The decisions that matter are made before the first component, and most of them are about where things render.',
    cta: 'Discuss Your Next.js Project',
    title: 'Next.js & React Development Services | Yuvraj Raulji',
    description:
      'Next.js and React development: App Router architecture, server components, commerce storefronts, TypeScript, and Core Web Vitals held as a budget.',
    primaryKeyword: 'next.js development services',
    secondaryKeywords: [
      'react development services',
      'next.js ecommerce development',
      'next.js app router development',
    ],
    searchIntent: 'Commercial. A team that has chosen React or Next.js and needs someone senior to build it.',
    audience: 'Businesses building storefronts, dashboards and customer-facing applications on React, and agencies needing senior frontend engineering.',
    purpose: 'Own the Next.js and React development query, and separate it from the platform build pages and from the Next.js entity page.',
    entities: ['Next.js', 'React', 'TypeScript', 'App Router', 'Server Components', 'Core Web Vitals'],
    quickAnswer: {
      question: 'What does Next.js development involve beyond writing React?',
      answer:
        'Deciding where each page renders and why. Static generation, incremental revalidation, server rendering and client rendering each carry a different cost in latency, infrastructure and cache behaviour, and a Next.js application is largely the sum of those decisions. Around that sits the data layer, server components and server actions where they belong, caching and revalidation rules that match how the content actually changes, TypeScript across the boundary so the API contract is enforced rather than remembered, and a performance budget held during the build instead of audited after it.',
    },
    overview: [
      'Most Next.js projects that go wrong went wrong at the rendering decision. Everything is client rendered because that was the default in the last project, or everything is static because static is fast, and then a page needs personalisation and the whole model has to be revisited. Deciding per route, early, with the reasons written down, is the single highest-leverage hour on the project.',
      'The second recurring problem is the data layer. React has become very good at fetching on the server, and a lot of code is still written as though it has not: a client component fetching on mount, a loading spinner, and a waterfall of three requests that could have been one server render. Server components fix this when the boundary is drawn deliberately.',
      'This site is built the way described here. It is a Next.js App Router application exported to static files, typed end to end, with every section rendering on the server and client JavaScript limited to the places that genuinely need it.',
    ],
    boundary: {
      body:
        'This page is about building the frontend. If what you need is advice on whether Next.js is the right choice at all, or how it fits a commerce stack you already have, that is a consulting conversation.',
      link: {
        href: '/nextjs/',
        label: 'Next.js, and the decisions it is actually good for',
      },
    },
    challenges: [
      {
        symptom: 'The app is fast in development and slow in production.',
        impact: 'Everything renders on the client, the bundle keeps growing, and the fix keeps being described as code splitting.',
      },
      {
        symptom: 'Nobody can explain why a given page renders the way it does.',
        impact: 'Rendering strategy was decided per pull request, so caching behaviour is now unpredictable and nobody wants to change it.',
      },
      {
        symptom: 'The API changed and the frontend found out in production.',
        impact: 'Types are hand-written and optimistic, so the contract exists in a document rather than in the compiler.',
      },
      {
        symptom: 'Core Web Vitals fail on exactly the pages that convert.',
        impact: 'Paid traffic lands on the slowest route on the site, and the team only sees it in a monthly report.',
      },
    ],
    solutions: [
      {
        name: 'Rendering strategy, per route, written down',
        body: 'Static, incremental, server rendered or client rendered, chosen against how the content changes and who it changes for. The document is short and it is the thing that keeps the application coherent as it grows.',
      },
      {
        name: 'App Router architecture',
        body: 'Layouts, route groups, loading and error boundaries, and a server and client boundary drawn where data actually lives rather than where the first component happened to need state.',
      },
      {
        name: 'Commerce storefronts over a headless backend',
        body: 'Next.js against Shopify Storefront API, Magento GraphQL or a custom commerce API, with the cart, the catalogue and the checkout handoff each treated as a separate problem.',
      },
      {
        name: 'TypeScript across the boundary',
        body: 'Generated types from the schema where there is one, strict mode on, and the API contract enforced by the compiler instead of by a changelog nobody reads.',
      },
      {
        name: 'Performance as a budget',
        body: 'Core Web Vitals targets agreed at the start, measured on every build, and treated as a blocker rather than as a report. Images, fonts and third-party scripts are where it is usually lost.',
      },
      {
        name: 'Accessibility built in',
        body: 'Semantic structure, focus management on route changes, and keyboard paths through anything interactive. Retrofitting this is several times the cost of doing it as you go.',
      },
    ],
    technologies: [
      { group: 'Framework', items: ['Next.js', 'React', 'App Router', 'Server Components', 'Server Actions'] },
      { group: 'Language', items: ['TypeScript', 'JavaScript', 'Zod'] },
      { group: 'Styling', items: ['Tailwind CSS', 'CSS Modules', 'Design tokens'] },
      { group: 'Data & delivery', items: ['GraphQL', 'REST APIs', 'Vercel', 'Cloudflare', 'Node.js'] },
    ],
    process: BUILD_PROCESS,
    cases: ['fashion-d2c', 'manufacturing'],
    faqs: [
      {
        q: 'Should a commerce storefront be built in Next.js?',
        a: 'Sometimes. It is the right answer when the storefront needs behaviour or performance the platform theme layer cannot give, and the wrong one when the theme would have done and you have just taken on a frontend codebase to maintain. The headless commerce page sets out that trade-off in full, including the cases where the honest recommendation is to stay on the theme.',
      },
      {
        q: 'Can you work on an existing React codebase?',
        a: 'Yes. It starts with reading it and writing down the rendering and data-fetching patterns already in use, because the expensive mistake on an inherited codebase is introducing a second pattern alongside the first.',
      },
      {
        q: 'Do you do the design as well?',
        a: 'I build from a design, and I will push back on parts of it that will cost performance or accessibility. Where there is no designer I can work from a structure and a component system rather than a blank page, which is honest about what that produces: something clean and conventional rather than something art directed.',
      },
      {
        q: 'App Router or Pages Router?',
        a: 'App Router for new work. For an existing Pages Router application the answer is usually not to migrate wholesale: they interoperate, so new routes can go in the App Router and the old ones can move when they are being touched anyway.',
      },
    ],
    related: [
      {
        href: '/services/full-stack-development/',
        label: 'The services behind the frontend',
        note: 'Node, APIs and the data layer, when the application is more than a storefront.',
      },
      {
        href: '/services/headless-commerce/',
        label: 'The same framework, pointed at a commerce API',
        note: 'Decoupled storefronts, and the four conditions that justify one.',
      },
      {
        href: '/headless-commerce/optimization/',
        label: 'Rendering tiers and cache hit rate on a live build',
        note: 'Where the rendering decisions turn into numbers.',
      },
      {
        href: '/work/fashion-d2c/',
        label: 'A Next.js storefront on the record',
        note: 'The decoupled build, and the decision inside it.',
      },
      {
        href: '/insights/shopify-headless-nextjs-guide/',
        label: 'Next.js over the Shopify Storefront API',
        note: 'Implementation, including Hydrogen against plain Next.js.',
      },
      {
        href: '/services/api-integration/',
        label: 'The APIs the application renders from',
        note: 'Failure behaviour defined rather than discovered.',
      },
    ],

    finalHeadline: ['Frontend that needs', 'deciding before building?'],
  },

  /* ── 14. Custom module development ──────────────────────────── */
  {
    slug: 'custom-module-development',
    label: 'Custom Module Development',
    navLabel: 'Custom Modules',
    eyebrow: 'Magento | Shopify | WordPress',
    h1: ['Custom modules', 'built through the platform,', 'not around it.'],
    lede:
      'Magento 2 modules, Shopify apps and WordPress plugins written against the extension points the platform documents, so an upgrade is a Tuesday rather than a project.',
    cta: 'Discuss a custom module',
    title: 'Custom Module Development | Magento, Shopify & WordPress',
    description:
      'Custom Magento 2 module development, Shopify private apps and WordPress plugins, built on documented extension points so platform upgrades do not break them.',
    primaryKeyword: 'custom magento module development',
    secondaryKeywords: [
      'custom module development services',
      'magento 2 extension development',
      'custom shopify app development',
      'custom wordpress plugin development',
    ],
    searchIntent: 'Commercial and specific. Someone who knows they need a module and wants it written properly.',
    audience: 'Merchants and agencies needing platform functionality that no existing extension provides, or whose existing one has become a liability.',
    purpose: 'Own the custom module query, which the platform build pages mention but do not answer in depth.',
    entities: ['Magento 2', 'Adobe Commerce', 'Shopify', 'WordPress', 'Dependency Injection', 'Plugins'],
    quickAnswer: {
      question: 'What makes a custom module safe to upgrade?',
      answer:
        'Using the extension points the platform documents, and nothing else. On Magento 2 that means plugins, observers, preferences used sparingly, dependency injection as intended, declarative schema for database changes and no core overrides at all. On Shopify it means the Admin and Storefront APIs with webhooks and rate limiting handled, rather than script injection into a theme. On WordPress it means hooks and filters rather than edits to a parent theme. The practical test is the same everywhere: a minor version upgrade should not require touching your code, and if it does, the module was written around the platform instead of through it.',
    },
    overview: [
      'Nearly every store reaches a point where the thing it needs does not exist. The marketplace extension does eighty percent of it, the remaining twenty percent is the part the business actually competes on, and the options are a module or a compromise.',
      'The risk with a module is not writing it. It is carrying it. A module written against the documented extension points costs almost nothing at upgrade time; one written by overriding core classes costs a regression hunt on every release, forever, and the cost arrives long after whoever wrote it has moved on.',
      'So the work here is as much about restraint as construction: the smallest module that solves the problem, built on the supported surface, with tests around the behaviour the business depends on and documentation aimed at whoever inherits it.',
    ],
    boundary: {
      body:
        'A module is sometimes the wrong answer, and the cheapest version of this conversation establishes that first. If the platform already does it, or an existing extension does it well, the honest recommendation is to configure rather than build.',
      link: {
        href: '/services/magento-development/',
        label: 'Magento development, for the wider build around it',
      },
    },
    challenges: [
      {
        symptom: 'Every Magento upgrade turns into a week of regression hunting.',
        impact: 'Custom code overrides core classes, so each release breaks something, and upgrades get deferred until security forces one.',
      },
      {
        symptom: 'We bought an extension and it does eighty percent of the job.',
        impact: 'The remaining twenty percent is being done by hand every day, and the extension cannot be modified safely.',
      },
      {
        symptom: 'Nobody knows what the custom module actually does.',
        impact: 'No tests, no documentation, and the person who wrote it has left. It is load-bearing and untouchable.',
      },
      {
        symptom: 'Two modules fight over the same behaviour.',
        impact: 'Behaviour depends on load order, which means it changes when something unrelated is installed.',
      },
    ],
    solutions: [
      {
        name: 'Magento 2 modules on the supported surface',
        body: 'Plugins, observers, dependency injection, declarative schema and service contracts. Preferences only where no plugin point exists, and core overrides never. The result upgrades cleanly because it never reached into anything that moves.',
      },
      {
        name: 'Shopify private and custom apps',
        body: 'Admin and Storefront API applications deployed under your account, with webhook verification, idempotency and rate-limit backoff handled, rather than a theme snippet pretending to be an integration.',
      },
      {
        name: 'WordPress and WooCommerce plugins',
        body: 'Hooks and filters, correct capability checks, nonces and sanitisation on everything that touches input, and no edits to a theme that will be updated.',
      },
      {
        name: 'Rescuing an existing module',
        body: 'Read what is there, document the behaviour the business actually depends on, write tests around it, then refactor off the core overrides. Rewriting blind is how a working feature gets lost.',
      },
      {
        name: 'Admin interfaces your team can use',
        body: 'Configuration in the platform admin where it belongs, with sensible defaults, so changing behaviour is a setting rather than a deployment.',
      },
      {
        name: 'Documentation and handover',
        body: 'What it does, which extension points it uses, what will break it, and how to test it. Written for the next developer, who is usually not me.',
      },
    ],
    technologies: [
      { group: 'Magento', items: ['PHP', 'Dependency Injection', 'Plugins', 'Declarative schema', 'GraphQL'] },
      { group: 'Shopify', items: ['Admin API', 'Storefront API', 'Webhooks', 'Node.js', 'OAuth'] },
      { group: 'WordPress', items: ['Hooks', 'Filters', 'WooCommerce', 'REST API'] },
      { group: 'Quality', items: ['PHPUnit', 'Static analysis', 'Git', 'CI pipelines'] },
    ],
    process: BUILD_PROCESS,
    cases: ['b2b-procurement', 'marketplace'],
    faqs: [
      {
        q: 'How do I know whether we need a module or a configuration change?',
        a: 'Ask what the platform already does, and ask it before scoping. A good share of requested modules duplicate a native feature nobody knew was there, and finding that out is a short piece of work rather than a project. Where the feature genuinely does not exist, the module is the answer and the scope is usually smaller than expected.',
      },
      {
        q: 'Will a custom module survive Magento upgrades?',
        a: 'If it is written against plugins, observers and declarative schema, yes, and that is the explicit design goal. The modules that do not survive are the ones that override core classes, and that choice is almost always made for speed in week one and paid for every release afterwards.',
      },
      {
        q: 'Can you fix a module somebody else wrote?',
        a: 'Yes, and the order matters: read it, document the behaviour the business depends on, put tests around that behaviour, then change it. Refactoring an undocumented module without that first step is how a quiet working feature disappears.',
      },
      {
        q: 'Do you hand over the source code?',
        a: 'Always, in your repository, with the documentation. There is no arrangement here where the code stays with me.',
      },
    ],
    related: [
      {
        href: '/magento/upgrade/',
        label: 'Upgrades, which is where module quality shows up',
        note: 'Most of what makes an upgrade expensive was written years earlier.',
      },
      {
        href: '/services/adobe-commerce-development/',
        label: 'Modules on the licensed platform',
        note: 'B2B, Page Builder and staging, which carry their own extension points.',
      },
      {
        href: '/services/shopify-plus-development/',
        label: 'Shopify apps and extensions',
        note: 'Admin and Storefront APIs, and checkout extensibility on Plus.',
      },
      {
        href: '/wordpress/',
        label: 'WordPress plugins, the same discipline',
        note: 'Hooks and filters, and nothing that edits core.',
      },
      {
        href: '/work/marketplace/',
        label: 'A marketplace build on the record',
        note: 'Where custom modules carried the business logic.',
      },
      {
        href: '/services/api-integration/',
        label: 'When the module is really an integration',
        note: 'A different job, with different failure modes.',
      },
    ],

    finalHeadline: ['Platform almost', 'does what you need?'],
  },

  /* ── 15. ERP and CRM integration ────────────────────────────── */
  {
    slug: 'erp-crm-integration',
    label: 'ERP & CRM Integration',
    navLabel: 'ERP & CRM Integration',
    eyebrow: 'ERP | CRM | Middleware',
    h1: ['Making the store', 'and the back office', 'agree.'],
    lede:
      'Stock, pricing, orders and customers synchronised between the storefront and the systems that run the business, with the failure behaviour designed rather than discovered.',
    cta: 'Discuss an integration',
    title: 'ERP & CRM Integration for eCommerce | Yuvraj Raulji',
    description:
      'ERP and CRM integration for Magento, Shopify and WooCommerce: stock, pricing, order and customer sync with reconciliation, retries and an audit trail.',
    primaryKeyword: 'erp integration services',
    secondaryKeywords: [
      'ecommerce erp integration',
      'crm integration services',
      'magento erp integration services',
      'shopify erp integration',
      'erp ecommerce sync',
    ],
    searchIntent: 'Commercial and operational. A business whose store and back office disagree, and it is costing them.',
    audience: 'Merchants running an ERP, CRM or WMS alongside a storefront, and agencies whose client integration is failing.',
    purpose: 'Own the ERP and CRM integration query, which the API page touches generically and this page answers in business terms.',
    entities: ['ERP Integration', 'CRM Integration', 'SAP', 'Magento 2', 'Shopify', 'Middleware'],
    quickAnswer: {
      question: 'What makes an eCommerce ERP integration reliable?',
      answer:
        'Deciding three things before any code: which system owns each field, what happens when the other one is unavailable, and how a disagreement is detected. Ownership stops two systems writing the same value and overwriting each other. A queue with retries and backoff turns an ERP outage into a delay rather than a lost order. Scheduled reconciliation catches the drift that inevitably accumulates anyway, and reports it instead of waiting for a customer to find it. Most failing integrations fail on those three questions rather than on the API, which is why rewriting the connector rarely fixes them.',
    },
    overview: [
      'An integration is rarely a technical problem first. It is a question about who owns what: if the ERP owns stock and the store owns price, both systems can be right at once. If neither owns anything clearly, both are authoritative, and the last write wins in a race nobody is watching.',
      'The second thing that decides whether an integration holds is what it does when the other side is down. A direct call that fails loses an order. A queued message with retries and a dead-letter path turns the same outage into a delay and a visible alert. The difference is an afternoon of design and it is the difference between an integration people trust and one they check manually.',
      'On the record: 90% of B2B order and quote processing automated on a Magento platform, with the systems behind the store wired in rather than reconciled by hand afterwards.',
    ],
    boundary: {
      body:
        'This page is about connecting business systems. If the work is building or exposing an API rather than integrating two systems that already have them, that is the API page.',
      link: {
        href: '/services/api-integration/',
        label: 'API development and integration, for building the interface itself',
      },
    },
    challenges: [
      {
        symptom: 'The store and the ERP disagree about stock.',
        impact: 'Oversells, cancellations and a support team doing data entry to keep two systems in step.',
      },
      {
        symptom: 'Sync is a nightly CSV export.',
        impact: 'Everything that happens between exports is invisible, and the gap is exactly where the expensive mistakes live.',
      },
      {
        symptom: 'When the ERP goes down, orders are lost.',
        impact: 'A back-office outage becomes a revenue outage, because the integration was built as a direct call.',
      },
      {
        symptom: 'Nobody can say which system is right.',
        impact: 'Reconciliation is a weekly meeting, and decisions get made on whichever report is open.',
      },
    ],
    solutions: [
      {
        name: 'A field ownership map, first',
        body: 'Which system is authoritative for stock, price, customer, order status and product data, written down and agreed before a line of code. This single document prevents most of what goes wrong later.',
      },
      {
        name: 'Queued, retried, observable sync',
        body: 'Message queues with backoff and a dead-letter path, so an unavailable system causes a delay and an alert rather than a lost transaction. RabbitMQ on Magento, webhooks and workers elsewhere.',
      },
      {
        name: 'Order and fulfilment flow',
        body: 'Order down to the ERP or WMS, status and tracking back up, with idempotency so a retried message cannot create a second order.',
      },
      {
        name: 'Customer and CRM sync',
        body: 'Accounts, segments and order history into the CRM with consent and data-protection boundaries respected, so marketing works from the same customer the finance system has.',
      },
      {
        name: 'Product and pricing feeds',
        body: 'Catalogue, attributes, account-specific pricing and tax rules from the ERP or PIM, with validation at the boundary rather than a bad record propagating silently.',
      },
      {
        name: 'Reconciliation and alerting',
        body: 'A scheduled job that compares both systems and reports the difference. Drift happens on every integration; the only choice is whether you find out from a report or from a customer.',
      },
    ],
    technologies: [
      { group: 'Transport', items: ['REST APIs', 'GraphQL', 'Webhooks', 'SFTP', 'RabbitMQ'] },
      { group: 'Commerce', items: ['Magento 2', 'Adobe Commerce', 'Shopify', 'WooCommerce'] },
      { group: 'Business systems', items: ['ERP', 'CRM', 'WMS', 'PIM', 'Accounting'] },
      { group: 'Reliability', items: ['Queues', 'Idempotency', 'Retry and backoff', 'Reconciliation jobs', 'Monitoring'] },
    ],
    process: [
      {
        num: '01',
        title: 'Map the systems and the fields',
        body: 'What exists on both sides, what each one is authoritative for, and where the two currently disagree. The disagreements found here are usually already costing money.',
      },
      {
        num: '02',
        title: 'Agree ownership in writing',
        body: 'One owner per field, signed off by the people who run both systems. This is a business decision wearing a technical hat, and it cannot be made by the integration.',
      },
      {
        num: '03',
        title: 'Design the failure behaviour',
        body: 'What happens when the other side is slow, down or wrong. Queue, retry, dead-letter and alert, decided now rather than discovered during a sale.',
      },
      {
        num: '04',
        title: 'Build with the logging first',
        body: 'Every message in and out, correlated, before the business logic. An integration you cannot observe is one you will be debugging by guesswork at the worst possible time.',
      },
      {
        num: '05',
        title: 'Run in parallel, then cut over',
        body: 'The new path running alongside the old one with the differences reported, so cutover is a decision made on evidence rather than a date in a plan.',
      },
    ],
    cases: ['b2b-procurement', 'marketplace', 'manufacturing'],
    faqs: [
      {
        q: 'Do you work with our specific ERP?',
        a: 'The question that matters is what it exposes: a REST or SOAP API, a database, a file drop, or a middleware layer. Those four cover nearly every system, and the integration pattern is chosen from them rather than from the vendor name. Where the ERP is genuinely closed, the honest answer is a file-based integration with reconciliation, and I will say so rather than quote for an API that does not exist.',
      },
      {
        q: 'Real-time or scheduled sync?',
        a: 'Per field, not per integration. Stock usually needs to be near real time because the cost of being wrong is an oversell. Product descriptions can run nightly because nobody is harmed by a six-hour delay. Deciding this per field rather than globally is what keeps the load reasonable.',
      },
      {
        q: 'Should we use middleware or point to point?',
        a: 'Point to point is fine for two systems and becomes a liability at four, because each new system multiplies the connections. If a third and fourth system are already on the roadmap, a middleware layer pays for itself; if they are not, it is architecture bought ahead of need.',
      },
      {
        q: 'How long does an integration take?',
        a: 'The build is rarely the long part. Establishing what each system actually contains, and getting agreement on who owns which field, routinely takes longer than writing the connector, and skipping it is why integrations get rebuilt.',
      },
    ],
    related: [
      {
        href: '/magento/integrations/',
        label: 'Magento ERP integration, platform-specific',
        note: 'The same boundaries drawn inside the Magento model.',
      },
      {
        href: '/woocommerce/integrations/',
        label: 'WooCommerce integrations, platform-specific',
        note: 'The same boundaries where the plugin layer is the surface.',
      },
      {
        href: '/services/workflow-automation/',
        label: 'The process on top of the connected systems',
        note: 'The step after the data is reliable, which is the condition it needs.',
      },
      {
        href: '/work/b2b-procurement/',
        label: 'Order and approval flow across systems, on the record',
        note: 'Where field ownership decided the architecture.',
      },
      {
        href: '/services/ecommerce-architecture/',
        label: 'Integration architecture, agreed on paper first',
        note: 'Ownership, queues and reconciliation, before any code.',
      },
      {
        href: '/mixpanel/',
        label: 'When a disagreement has to be visible',
        note: 'Instrumentation and reporting across the system boundary.',
      },
    ],

    finalHeadline: ['Store and back office', 'telling different stories?'],
  },

  /* ── 16. Workflow automation ────────────────────────────────── */
  {
    slug: 'workflow-automation',
    label: 'Workflow Automation',
    navLabel: 'Workflow Automation',
    eyebrow: 'n8n | Integrations | AI',
    h1: ['Automating the work', 'that is eating', 'your people.'],
    lede:
      'Operational processes wired together so the repetitive parts run themselves, with a person kept in the loop exactly where the cost of being wrong requires one.',
    cta: 'Discuss an automation',
    title: 'Workflow Automation Services for eCommerce | Yuvraj Raulji',
    description:
      'Business and eCommerce workflow automation with n8n, APIs and AI where it earns its place: order operations, catalogue work, reporting and support.',
    primaryKeyword: 'workflow automation services',
    secondaryKeywords: [
      'business process automation services',
      'n8n automation development',
      'ecommerce workflow automation',
      'automate manual business processes',
      'ai workflow automation',
    ],
    searchIntent: 'Commercial. A business with a process absorbing people and a suspicion it should not be.',
    audience: 'Operations teams in commerce businesses, and owners watching headcount go into repetitive work.',
    purpose: 'Own the workflow automation query, and separate practical process automation from the AI page it is adjacent to.',
    entities: ['Workflow Automation', 'n8n', 'Business Process Automation', 'Generative AI', 'Integrations'],
    quickAnswer: {
      question: 'When is a process ready to automate?',
      answer:
        'When four things are true: it is repetitive, it is already documented or can be written down in an afternoon, the data it runs on is reliable, and the cost of a mistake is known. Automating a process that fails any of those makes it faster and more confusing rather than better, which is the most common way these projects disappoint. The second rule is where the person goes: anything with a financial, legal or customer-facing consequence keeps a review step, and the automation is judged on how much work it removes before that step rather than on removing the step itself. On the record: 90% of B2B order and quote processing automated on a Magento platform.',
    },
    overview: [
      'Every growing business accumulates work that exists only because two systems do not talk: someone copying orders into a spreadsheet, someone re-keying a supplier feed, someone producing the same report every Monday. It is invisible on the org chart and expensive on the payroll.',
      'The honest first step is usually not automation. It is writing the process down, because a surprising share of these turn out to be undefined, performed differently by each person doing them, and an undefined process does not become better when it is automated. It becomes confusing faster.',
      'Where AI belongs in this is narrower than the current enthusiasm suggests, and more useful than the scepticism allows. A model is good at the judgement-shaped middle of a process: classifying a message, drafting a description, extracting fields from a document a human wrote. It is not a replacement for the deterministic parts, and wiring it in where a rule would have done is how an automation becomes unpredictable.',
    ],
    boundary: {
      body:
        'This page is about operational processes. If the question is whether a model should be in the product itself, retrieval, agents and evaluation, that is the generative AI page.',
      link: {
        href: '/services/generative-ai/',
        label: 'Generative AI development, for models inside the product',
      },
    },
    challenges: [
      {
        symptom: 'Someone exports a spreadsheet every morning.',
        impact: 'A full-time person doing integration work by hand, and a daily window where the data is wrong.',
      },
      {
        symptom: 'Orders are re-keyed into a second system.',
        impact: 'Transcription errors reaching customers, and a process that cannot scale without another hire.',
      },
      {
        symptom: 'The same report is rebuilt every week.',
        impact: 'Hours spent on assembly rather than on the decision the report exists to support.',
      },
      {
        symptom: 'We automated something and now nobody trusts it.',
        impact: 'It was built without logging or a review step, so a single bad outcome removed confidence in all of it.',
      },
    ],
    solutions: [
      {
        name: 'Process mapping before tooling',
        body: 'What actually happens, including the exceptions people handle without mentioning them. The map frequently shortens the process on its own, before anything is automated.',
      },
      {
        name: 'Order and fulfilment operations',
        body: 'Routing, status updates, supplier notifications, returns and exception handling, wired between the store and the systems behind it so the normal case runs without a person.',
      },
      {
        name: 'Catalogue and content operations',
        body: 'Enrichment, attribute completion, categorisation and translation drafted automatically and reviewed by a person, which is the arrangement that makes catalogue work tractable at scale.',
      },
      {
        name: 'Reporting and alerting',
        body: 'Scheduled reports assembled from the systems that hold the data, and alerts on the conditions that need a decision, so nobody is manually checking whether something happened.',
      },
      {
        name: 'AI in the judgement-shaped steps',
        body: 'Classification, extraction and drafting where a rule cannot express the task, with the deterministic steps left deterministic and the model constrained to the part it is actually good at.',
      },
      {
        name: 'A review step where it is warranted',
        body: 'Financial, legal and customer-facing outputs keep a person in the loop. The measure is how much work is removed before that step, not whether the step was eliminated.',
      },
    ],
    technologies: [
      { group: 'Automation', items: ['n8n', 'Webhooks', 'Scheduled jobs', 'Queues'] },
      { group: 'AI', items: ['LLMs', 'RAG', 'Prompt engineering', 'Evaluation sets'] },
      { group: 'Integration', items: ['REST APIs', 'GraphQL', 'ERP', 'CRM', 'Spreadsheets'] },
      { group: 'Commerce', items: ['Magento 2', 'Shopify', 'WooCommerce', 'Order management'] },
    ],
    process: [
      {
        num: '01',
        title: 'Write the process down',
        body: 'Including the exceptions, which is where the real work is hiding. A process that cannot be written down in an afternoon is not ready to be automated, and that finding is itself worth having.',
      },
      {
        num: '02',
        title: 'Cost the manual version',
        body: 'Hours per week, error rate, and what a mistake costs. Without this the automation cannot be judged afterwards, and most of them never are.',
      },
      {
        num: '03',
        title: 'Decide where the person stays',
        body: 'Draw the review step before building, based on the consequence of being wrong rather than on how confident the technology feels.',
      },
      {
        num: '04',
        title: 'Build the smallest version',
        body: 'The highest-volume path first, running alongside the manual process. Automating every branch at once is how these projects stall before anything ships.',
      },
      {
        num: '05',
        title: 'Measure, then widen',
        body: 'Against the number from step two. If it has not moved, that is information, and the next branch waits until it has.',
      },
    ],
    cases: ['b2b-procurement', 'marketplace'],
    faqs: [
      {
        q: 'Do we need AI to automate a process?',
        a: 'Usually not, and reaching for it first is the common mistake. Most operational waste is two systems that do not talk, and the fix is an integration with rules, which is cheaper, faster and entirely predictable. A model earns its place in the judgement-shaped step: classifying, extracting or drafting where a rule cannot express the task.',
      },
      {
        q: 'What should not be automated?',
        a: 'Anything undefined, anything running on unreliable data, and anything where a mistake is expensive and undetectable. The first two get worse when automated. The third can be automated up to the decision and then handed to a person, which is nearly always the right shape.',
      },
      {
        q: 'Why n8n rather than a bigger platform?',
        a: 'Because it self-hosts, the workflows are readable by the people who own the process, and there is no per-task pricing that punishes success. Where a business already runs something else, I will build in that instead rather than add a tool to the stack for its own sake.',
      },
      {
        q: 'Who maintains the automation afterwards?',
        a: 'Your team, by design. The workflows are built to be read and changed by the operations people who own the process, documented accordingly, and I am available on a retainer where that is wanted rather than assumed.',
      },
    ],
    related: [
      {
        href: '/ai-automation/',
        label: 'AI automation, the entity page above this',
        note: 'Agents, retrieval and the workflows behind the catalogue.',
      },
      {
        href: '/services/erp-crm-integration/',
        label: 'The systems this automation runs on',
        note: 'Reliable data first, which is one of the four conditions.',
      },
      {
        href: '/services/api-integration/',
        label: 'The interfaces the automation calls',
        note: 'Retries, idempotency, and what happens while one side is down.',
      },
      {
        href: '/digital-transformation/',
        label: 'Redesigning the process before automating it',
        note: 'Automating a bad process makes it faster and more confusing.',
      },
      {
        href: '/insights/ai-ecommerce-revenue-2026/',
        label: 'The automation use cases that return something',
        note: 'And the ones that do not, which is the more useful half.',
      },
      {
        href: '/work/marketplace/',
        label: 'Operations at marketplace scale, on the record',
        note: 'Where the repetitive work was worth removing.',
      },
    ],

    finalHeadline: ['Process quietly', 'absorbing a salary?'],
  },
  /* ── 17. AI eCommerce development ───────────────────────────── */
  {
    slug: 'ai-ecommerce-development',
    featured: true,
    label: 'AI eCommerce Development',
    navLabel: 'AI eCommerce Development',
    eyebrow: 'Commerce build | AI in the architecture',
    h1: ['A store built so', 'the AI parts can', 'actually work.'],
    lede:
      'A commerce build where the catalogue, the search layer and the event data are designed for AI from the start, rather than a model attached later to a platform that cannot feed it. Nine years of commerce engineering underneath, and the generative AI work scoped to where it earns its place.',
    cta: 'Discuss an AI-ready build',
    title: 'AI eCommerce Development | Yuvraj Raulji',
    description:
      'eCommerce development with AI in the architecture: catalogue data worth generating from, a swappable search layer, assistants grounded in live stock.',
    primaryKeyword: 'ai ecommerce development',
    secondaryKeywords: [
      'ecommerce development with ai',
      'ai powered ecommerce development',
      'ai ecommerce development services',
      'ai ready ecommerce architecture',
      'ai ecommerce developer',
    ],
    searchIntent:
      'Commercial. Someone commissioning a build or a replatform who wants the AI work to be part of it rather than a separate project in a year.',
    audience:
      'Founders and technology leads planning a build, who have been told AI should be in it and want to know what that actually requires of the platform.',
    purpose:
      'Own the AI eCommerce development query, and make the case that what decides an AI feature in commerce is the commerce data model rather than the model.',
    entities: [
      'AI eCommerce Development',
      'Generative AI',
      'Retrieval-Augmented Generation',
      'Semantic Search',
      'Magento 2',
      'Shopify',
      'Headless Commerce',
      'Yuvraj Raulji',
    ],
    quickAnswer: {
      question: 'What does an eCommerce platform need before AI features can work on it?',
      answer:
        'Four things, and none of them is the model. Product attributes structured well enough that generated copy has something to say. A search layer that can be replaced with a semantic one without rebuilding the category pages. An event record of what customers searched for, saw and skipped. And an integration boundary where an automated step can be added with a human checkpoint in front of it. A store with those four can take AI features one at a time. A store without them needs the data work first, and that is the part most AI proposals leave out of the estimate.',
    },
    overview: [
      'AI features in commerce usually fail on the commerce side rather than on the model side. The assistant invents an answer because nothing grounded it in the catalogue. The generated descriptions read as filler because the products carry three usable attributes between them. The recommendation engine has nothing to learn from because no one recorded what customers did. In each case the model was the part that worked.',
      'So this is a build service rather than an AI service. The platform decision, the catalogue data model, the search layer and the event data get made in the order that leaves the AI work possible, which is the order they should be made in anyway, because every one of them pays for itself without a model attached.',
      'It is also deliberately incremental. An AI feature that ships behind an evaluation and a review step can be judged on what it does; a build where five of them land at launch cannot be, and the first wrong answer takes the credibility of the other four with it.',
    ],
    boundary: {
      body:
        'This is a commerce build with the AI work designed into it. If the platform is staying and you want the AI feature on its own against it, that is the generative AI page rather than this one. If you want a store built and AI is not in the brief, the eCommerce development page is the straight version of the same work, and it is the right page more often than this one is.',
      link: {
        href: '/services/generative-ai/',
        label: 'Generative AI against a platform you are keeping',
      },
    },
    challenges: [
      {
        symptom: 'AI was quoted against a catalogue with three usable attributes per product.',
        impact:
          'Generated copy has nothing to work from, so it produces confident filler, and the quality ceiling was set by the attribute data before any model was chosen.',
      },
      {
        symptom: 'The search is the platform default and cannot be replaced without rebuilding the category pages.',
        impact:
          'Semantic search becomes a replatform rather than a feature, which is how it ends up postponed indefinitely.',
      },
      {
        symptom: 'Nobody can say what customers searched for last month.',
        impact:
          'There is no held-out set to evaluate against and no baseline to improve on, so any AI feature is judged on impressions rather than on evidence.',
      },
      {
        symptom: 'An assistant answers from a product feed that is a day old.',
        impact:
          'It is confidently wrong about stock and price, which is the one failure customers remember and the reason the category gets distrusted internally.',
      },
    ],
    solutions: [
      {
        name: 'A catalogue data model worth generating from',
        body: 'Attributes defined, normalised and required, so generated descriptions and translations have source material rather than a product name to paraphrase. This is the unglamorous half of the project and it sets the ceiling for everything above it.',
      },
      {
        name: 'A search layer you can swap',
        body: 'Search behind an interface the storefront does not know the internals of, so moving from keyword matching to semantic retrieval is a change in one place rather than a rebuild of the category pages.',
      },
      {
        name: 'Event data recorded from launch',
        body: 'Searches, including the ones that returned nothing, views, and what was skipped. It costs little during a build and cannot be backfilled afterwards, which is why it belongs in the first release.',
      },
      {
        name: 'Assistants grounded in live catalogue data',
        body: 'Retrieval against your own products, prices and policies, reading the same source the storefront reads, with citation. An assistant on a stale export is a support ticket generator.',
      },
      {
        name: 'Automation at the integration boundary',
        body: 'The operational steps that are text moving between systems, automated where a wrong answer is visible and cheap, and left with a human checkpoint where it is neither.',
      },
      {
        name: 'An evaluation set before the feature ships',
        body: 'Real questions with known good answers, built before the AI work starts. Without one there is no way to separate an improvement from a change of mood in the model.',
      },
    ],
    technologies: [
      { group: 'Platforms', items: ['Magento 2', 'Adobe Commerce', 'Shopify', 'Shopify Plus'] },
      { group: 'Storefront', items: ['Next.js', 'React', 'GraphQL', 'Headless'] },
      { group: 'AI layer', items: ['RAG', 'Embeddings', 'Vector stores', 'Evaluation', 'Tool calling'] },
      { group: 'Search & data', items: ['Elasticsearch', 'Semantic search', 'Event tracking', 'Mixpanel'] },
      { group: 'Operations', items: ['n8n', 'Webhooks', 'Queues', 'Human-in-the-loop review'] },
    ],
    process: [
      {
        num: '01',
        title: 'The readiness pass',
        body: 'Attributes, search layer, event data and integration points, assessed against the AI features actually wanted. It frequently ends with a shorter AI scope and a longer data scope, which is the finding, not a failure of the exercise.',
      },
      {
        num: '02',
        title: 'Fix the data model first',
        body: 'The attribute work and the event tracking go in before the model does. Both are worth doing on their own evidence, so the build is not hostage to whether the AI layer proves out.',
      },
      {
        num: '03',
        title: 'Build the commerce platform properly',
        body: 'Catalogue, checkout, integrations and performance, to the same standard as a build with no AI in it. A store that is slow or wrong is not rescued by an assistant on top of it.',
      },
      {
        num: '04',
        title: 'Add one AI feature behind an evaluation',
        body: 'The highest-volume one first, measured against the set from step one, shipped with a review step in front of any customer-facing output. The checkpoint is removed on measured evidence rather than on schedule.',
      },
      {
        num: '05',
        title: 'Measure in production, then widen',
        body: 'What it answered, what it refused, what a person corrected. If the number has not moved, that is information, and the second feature waits until it has.',
      },
    ],
    cases: [],
    faqs: [
      {
        q: 'Can AI be added to our existing store, or does it need a rebuild?',
        a: 'Usually it can be added, and the readiness pass is what tells you which. The three things that force a larger piece of work are a search layer that cannot be replaced, an attribute set too thin to generate from, and no event data at all. None of those is a rebuild on its own; together on an ageing platform they often cost more to work around than to replatform, and that comparison is worth making explicitly rather than discovering halfway.',
      },
      {
        q: 'Will AI fix our catalogue data?',
        a: 'It can expand and translate what is there, and it cannot invent what was never recorded. A model can write a good description from a dozen structured attributes; from a product name and a weight it produces plausible text that says nothing, and at catalogue scale that is worse than empty fields because it reads as content. The attribute work comes first in the order for that reason.',
      },
      {
        q: 'Does this need a headless build?',
        a: 'No, and I would not recommend one for that reason alone. A semantic search layer, a grounded assistant and generated catalogue content all run against a conventional Magento or Shopify build. Headless earns its place when you need independent frontend releases or several experiences off one catalogue, which is a separate decision with its own operational cost.',
      },
      {
        q: 'What AI work have you actually shipped?',
        a: 'The generative AI certification with IBM and AcceleratorX is from November 2026, and this site publishes no AI engagement with a measured outcome, so I state this as applied capability rather than as a long track record. The nine years and the fifty-plus projects are in the commerce engineering underneath it, which is the half that decides whether the AI features can work at all.',
      },
      {
        q: 'What does an AI feature cost to keep running?',
        a: 'Per-token inference, embedding storage, and the engineering to keep retrieval current as the catalogue changes. The third is the one missing from most estimates and it is usually the largest, because a catalogue that moves daily is a retrieval layer that has to move with it.',
      },
    ],
    related: [
      {
        href: '/ai-commerce/',
        label: 'AI commerce, the entity page above this',
        note: 'Catalogue, search and operations, and what to fund first.',
      },
      {
        href: '/services/ecommerce-development/',
        label: 'The same build with no AI in the brief',
        note: 'The straight version, and the right page more often than this one.',
      },
      {
        href: '/ai-search/',
        label: 'Search, on your site and in front of it',
        note: 'Semantic search, and being cited by the engines that answer instead of listing.',
      },
      {
        href: '/mixpanel/',
        label: 'The event record this build depends on',
        note: 'What customers searched for, saw and skipped, captured from the start.',
      },
      {
        href: '/insights/ai-ecommerce-revenue-2026/',
        label: 'Which AI features actually return something',
        note: 'Written out, with the honest list of the ones that do not.',
      },
      {
        href: '/certifications/',
        label: 'The Generative AI certification, dated',
        note: 'November 2026, and what it does and does not establish.',
      },
    ],

    finalHeadline: ['Planning a build', 'with AI in the brief?'],
  },
];

/** `/services/{slug}/`. */
export function servicePageHref(slug: string): string {
  return `/services/${slug}/`;
}

export const SERVICE_PAGES_BY_SLUG: Record<string, ServicePage> = Object.fromEntries(
  SERVICE_PAGES.map((s) => [s.slug, s]),
);

/** Every service, for the hub's index and anywhere a full list is wanted. */
export const SERVICE_PAGE_LINKS = SERVICE_PAGES.map((s) => ({
  label: s.navLabel,
  href: servicePageHref(s.slug),
}));

/**
 * The header dropdown. The nine flagged `featured`, and nothing else.
 *
 * See the note on `featured` above for why this is not the full list. The
 * other seven are one click away from "All services" at the bottom of the same
 * panel, and from every service page's own cross-links.
 */
export const SERVICE_NAV_LINKS = SERVICE_PAGE_LINKS.filter(
  (_, i) => SERVICE_PAGES[i]!.featured,
);

/** The nine themselves, for the homepage index. */
export const FEATURED_SERVICE_PAGES = SERVICE_PAGES.filter((s) => s.featured);

/* ═══════════════════════════════════════════════════════════════
   THE COUNTS, SPELLED

   Three places said "seven services" in display copy while the
   array held ten, because the number was typed into the sentence.
   These are read from the array, so the sentence cannot drift from
   the data again. Spelled rather than numeric because the house
   display style sets counts as words.
   ═══════════════════════════════════════════════════════════════ */

const WORDS = [
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight',
  'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
  'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty',
] as const;

/** `4` to `'four'`, falling back to the digits past twenty. */
export function spellCount(n: number): string {
  return WORDS[n] ?? String(n);
}

/** "sixteen" */
export const SERVICE_COUNT_WORD = spellCount(SERVICE_PAGES.length);

/** "Sixteen" */
export const SERVICE_COUNT_WORD_CAP =
  SERVICE_COUNT_WORD.charAt(0).toUpperCase() + SERVICE_COUNT_WORD.slice(1);

/** "nine" */
export const FEATURED_COUNT_WORD = spellCount(FEATURED_SERVICE_PAGES.length);
