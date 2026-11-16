/**
 * /services/{slug}/ : the seven service pages.
 *
 * ── Why these exist alongside the platform pages ──────────────────────────
 *
 * The site already has eleven technology hubs and twenty-six platform service
 * pages. These seven are not a second copy of them, and the difference is
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
 *    real with seven of them. Each carries its own challenges, its own
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
  eyebrow: string;
  /** The single H1, held as lines because each break does typographic work. */
  h1: readonly string[];
  lede: string;
  cta: string;

  title: string;
  description: string;

  primaryKeyword: string;
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
  finalHeadline: readonly string[];
}

/* ═══════════════════════════════════════════════════════════════
   THE SHARED DELIVERY PROCESS

   Four services run the same way and three do not. Rather than
   copy four near-identical arrays, the common one is defined once
   and the three that genuinely differ author their own. This is
   the one place duplication is avoided by sharing rather than by
   rewriting, because the process really is the same.
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
   THE SEVEN
   ═══════════════════════════════════════════════════════════════ */

export const SERVICE_PAGES: readonly ServicePage[] = [
  /* ── 1. Magento ─────────────────────────────────────────────── */
  {
    slug: 'magento-development',
    label: 'Magento 2 & Adobe Commerce Development',
    navLabel: 'Magento Development',
    eyebrow: 'Magento 2 | Adobe Commerce',
    h1: ['Magento development', 'for catalogues that have', 'outgrown the defaults.'],
    lede:
      'Custom module development, multi-store architecture, B2B workflows and the performance work that follows. Nine years on the platform, most of it on stores where the catalogue size is the architecture problem.',
    cta: 'Discuss a Magento project',
    title: 'Magento 2 Development Services | Yuvraj Raulji',
    description:
      'Magento 2 and Adobe Commerce development: custom modules, multi-store, B2B workflows, ERP integration and performance engineering. 500K+ SKUs on the record.',
    primaryKeyword: 'magento development services',
    secondaryKeywords: [
      'magento 2 development company',
      'adobe commerce development',
      'custom magento module development',
      'magento b2b development',
      'hire magento developer',
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
    finalHeadline: ['Magento project', 'that needs doing properly?'],
  },

  /* ── 2. Shopify ─────────────────────────────────────────────── */
  {
    slug: 'shopify-development',
    label: 'Shopify & Shopify Plus Development',
    navLabel: 'Shopify Development',
    eyebrow: 'Shopify | Shopify Plus',
    h1: ['Shopify development', 'for brands that have', 'outgrown the theme.'],
    lede:
      'Custom theme architecture, private apps, checkout extensibility and app consolidation. The work that starts when the store is working and the stack around it is not.',
    cta: 'Discuss a Shopify project',
    title: 'Shopify Development Services | Yuvraj Raulji',
    description:
      'Shopify and Shopify Plus development: custom themes, private apps, checkout extensions and app consolidation. Senior engineering, not a theme install.',
    primaryKeyword: 'shopify development services',
    secondaryKeywords: [
      'shopify plus development',
      'custom shopify app development',
      'shopify theme development',
      'hire shopify developer',
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
        name: 'Checkout extensibility on Plus',
        body: 'Checkout UI extensions and Shopify Functions for discount, delivery and payment customisation, using the supported extension points so an update does not break the checkout.',
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
      'next.js development services',
      'react development services',
      'node.js development',
      'hire full stack developer',
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
    finalHeadline: ['Something to build', 'that is not a storefront?'],
  },

  /* ── 4. Headless ────────────────────────────────────────────── */
  {
    slug: 'headless-commerce',
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
    finalHeadline: ['A decision that is', 'expensive to get wrong?'],
  },

  /* ── 6. Generative AI ───────────────────────────────────────── */
  {
    slug: 'generative-ai',
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
        'This is build work. The certification is from November 2026, so the honest statement is that it formalised and extended work already underway rather than started it, and there is no published AI engagement with a measured outcome on this site.',
      link: {
        href: '/ai-commerce/',
        label: 'AI in commerce, including where it does not belong',
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
    finalHeadline: ['Two systems that', 'need to agree?'],
  },
];

/** `/services/{slug}/`. */
export function servicePageHref(slug: string): string {
  return `/services/${slug}/`;
}

export const SERVICE_PAGES_BY_SLUG: Record<string, ServicePage> = Object.fromEntries(
  SERVICE_PAGES.map((s) => [s.slug, s]),
);

/** For the header dropdown and the hub's index. */
export const SERVICE_PAGE_LINKS = SERVICE_PAGES.map((s) => ({
  label: s.navLabel,
  href: servicePageHref(s.slug),
}));
