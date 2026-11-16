/**
 * /services/ : the hub, and deliberately not 26 new pages.
 *
 * ── The decision this file records ─────────────────────────────────────────
 *
 * The brief asks for a /services/ page plus individual service URLs such as
 * /services/magento-development/ and /services/shopify-development/.
 *
 * Those pages already exist. They are at /magento/ and /magento/consulting/,
 * /shopify/ and /shopify/migration/, and so on: eleven technology hubs and
 * twenty-six service pages, all indexed, all linked, each with its own
 * declared primary keyword in lib/platform-services.ts and a row in the
 * content map. Building a second set under /services/ would mean two pages
 * targeting one query, which is the exact cannibalisation the model in
 * lib/platform-services.ts was written to prevent, and it would split the
 * authority the existing URLs have accumulated.
 *
 * So /services/ is a hub and nothing else. It owns the generic
 * "services" query, it routes to the pages that own the specific ones, and it
 * never competes with them. That is the same relationship /expertise/ already
 * has with its pillars, and the comment on its content-map row says so:
 * "Route to every platform and pillar, and never compete with them."
 *
 * The URL mapping, for the record:
 *
 *   brief's URL                        the page that already serves it
 *   /services/magento-development/     /magento/  and /magento/consulting/
 *   /services/shopify-development/     /shopify/  and /shopify/consulting/
 *   /services/headless-commerce/       /headless-commerce/
 *   /services/full-stack-development/  /nextjs/
 *   /services/generative-ai/           /ai-automation/  and /ai-commerce/
 *   /services/ecommerce-architecture/  /headless-commerce/architecture/
 *   /services/api-integration/         /magento/integrations/ and siblings
 *
 * ── Why the groups are not the technology list ─────────────────────────────
 *
 * The eleven technologies are how the site is organised. They are not how a
 * buyer arrives: someone with a slow store does not search for a platform,
 * they search for the problem. The four groups below are stated as the kind
 * of work rather than the tool, and each one routes into the technology pages
 * underneath it.
 *
 * Copy in this file avoids em-dashes on purpose.
 */

import { ALL_PLATFORM_SERVICES, serviceHref } from './platform-services';
import { TECHNOLOGIES, techHref } from './technology';

export interface ServiceGroup {
  num: string;
  /** The kind of work, as the buyer would name it. */
  name: string;
  body: string;
  /** Technology slugs this group routes into. */
  platforms: readonly string[];
  /** The named capabilities inside the group. */
  capabilities: readonly string[];
}

export const SERVICES = {
  path: '/services/',
  label: 'Services',
  eyebrow: 'What I build, and what I fix',
  h1: ['Services.'],
  lede:
    'Enterprise eCommerce engineering, full-stack development and AI integration. Four kinds of work, routed to the platform pages that cover each one in depth.',
  cta: 'Discuss a project',

  title: 'Services | Magento, Shopify, Full Stack & AI Engineering',
  description:
    'Enterprise eCommerce development, headless commerce, full-stack engineering, API integration and Generative AI across Magento 2, Shopify and Next.js.',

  /* "services" alone is too broad to own and too vague to convert. This claims
     the service query qualified by what the service actually is, which no
     platform page or pillar claims. */
  primaryKeyword: 'ecommerce development services',
  secondaryKeywords: [
    'enterprise ecommerce engineering services',
    'magento and shopify development services',
    'headless commerce development services',
    'ai integration services ecommerce',
  ],
  searchIntent:
    'Commercial. Someone scanning the full offer before deciding which specific page they need.',
  audience:
    'Businesses, agencies and engineering leaders who know they need commerce engineering and not yet which kind.',
  purpose:
    'Index every service the site offers, route to the page that owns each query, and never compete with those pages.',
  entities: [
    'Yuvraj Raulji',
    'eCommerce Development',
    'Magento 2',
    'Adobe Commerce',
    'Shopify',
    'Headless Commerce',
    'Next.js',
    'Generative AI',
    'API Integration',
  ],

  quickAnswer: {
    question: 'What services does Yuvraj Raulji offer?',
    answer:
      'Enterprise eCommerce development and architecture on Magento 2 and Adobe Commerce, Shopify and Shopify Plus, WooCommerce and WordPress; headless and composable commerce on Next.js and React over GraphQL; full-stack application development on Node.js and TypeScript; API, ERP and CRM integration; and Generative AI integration including retrieval-augmented assistants and workflow automation. Engagements run as hourly consulting, fixed-scope projects, monthly retainers, contract engineering or a long-term partnership.',
  },

  groups: [
    {
      num: '01',
      name: 'Enterprise eCommerce platforms',
      body:
        'Building, migrating and running commerce platforms at a size where catalogue, caching and indexing stop being settings and become architecture. Multi-store, B2B and B2C, with the integrations behind them.',
      platforms: ['magento', 'shopify', 'woocommerce', 'wordpress'],
      capabilities: [
        'Magento 2 and Adobe Commerce development',
        'Shopify and Shopify Plus development',
        'Replatforming and migration',
        'Version upgrades',
        'Multi-store and multi-currency architecture',
        'B2B quote and approval workflows',
        'Performance, caching and checkout optimisation',
        'Security patching and ongoing maintenance',
      ],
    },
    {
      num: '02',
      name: 'Headless and composable commerce',
      body:
        'Decoupling the storefront from the platform, where that is the right answer. A Next.js or React frontend over a commerce backend via GraphQL, with the trade-offs named before the decision rather than after it.',
      platforms: ['headless-commerce', 'nextjs'],
      capabilities: [
        'Headless storefront architecture',
        'Next.js and React storefronts',
        'GraphQL and Storefront API integration',
        'Progressive web applications',
        'Core Web Vitals and rendering strategy',
        'Composable architecture assessment',
      ],
    },
    {
      num: '03',
      name: 'Full stack and integration',
      body:
        'The application and systems work around a commerce platform: the services it talks to, the data that moves between them, and the custom product the platform cannot be.',
      platforms: ['nextjs', 'mixpanel'],
      capabilities: [
        'Full-stack development on Next.js, React and Node.js',
        'REST and GraphQL API design',
        'ERP and CRM integration',
        'Payment and logistics integration',
        'AWS infrastructure, Docker and CI/CD',
        'Analytics and event instrumentation',
      ],
    },
    {
      num: '04',
      name: 'Generative AI and automation',
      body:
        'Putting language models to work on commerce problems that are actually language problems: catalogue content, support, search and the operational steps nobody should be doing by hand.',
      platforms: ['ai-commerce', 'ai-automation', 'ai-search'],
      capabilities: [
        'Generative AI integration',
        'Retrieval-augmented generation over a product catalogue',
        'AI assistants for support and sales',
        'Catalogue content generation at scale',
        'Workflow automation with n8n',
        'AI search and discovery',
      ],
    },
  ] as readonly ServiceGroup[],

  /**
   * The engagement note. One paragraph, because /pricing/ is the page for it
   * and repeating that page here would make two pages compete for the same
   * query.
   */
  engagement:
    'Work runs as hourly technical consulting, fixed-scope development, a monthly retainer, contract engineering or a long-term development partnership. The pricing page has what is inside each one and how to get a real number against a real scope.',

  faqs: [
    {
      q: 'Which platforms do you work with?',
      a: 'Magento 2 and Adobe Commerce, Shopify and Shopify Plus, WooCommerce and WordPress, and custom headless storefronts on Next.js and React over GraphQL. For infrastructure, AWS with EC2, RDS and S3, behind Varnish and Redis.',
    },
    {
      q: 'Do you take on a single service, or only full projects?',
      a: 'Either. A performance diagnosis, a version upgrade or one integration is a perfectly good engagement, and several of them are the most useful work there is. Each platform page lists the individual services under it.',
    },
    {
      q: 'Can you work as part of our existing engineering team?',
      a: 'Yes, as contract engineering: inside your repository, your board and your review cycle, for a fixed term. The pricing page covers how that is structured.',
    },
    {
      q: 'Do you do AI work that is not eCommerce?',
      a: 'The AI work is strongest where it sits next to a commerce problem, because that is where the domain knowledge is. A generative AI integration on a product that is not a store is still well within scope; a pure research engagement is not what this is.',
    },
    {
      q: 'What if I do not know which service I need?',
      a: 'That is the normal case and it is what the first conversation is for. Describe the symptom rather than the solution and the diagnosis is part of the reply, not a separate purchase.',
    },
  ],

  finalHeadline: ['Know the problem,', { text: 'not the service?', accent: true }],
} as const;

/**
 * Technologies in the order the groups reference them, deduplicated.
 *
 * Derived rather than hand-listed so a technology added to the registry cannot
 * be silently missing from the hub, which is the failure the content-map gate
 * catches for routes and nothing was catching for links.
 */
export const HUB_TECHNOLOGIES = TECHNOLOGIES.filter((t) =>
  SERVICES.groups.some((g) => g.platforms.includes(t.slug)),
);

/** Every technology, whether or not a group names it. The full index at the foot of the page. */
export const ALL_TECH_LINKS = TECHNOLOGIES.map((t) => ({
  slug: t.slug,
  label: t.label,
  href: techHref(t.slug),
  /** The individual service pages under this technology, if any. */
  services: ALL_PLATFORM_SERVICES.filter((s) => s.platform === t.slug).map((s) => ({
    label: s.label,
    href: serviceHref(s.platform, s.slug),
  })),
}));
