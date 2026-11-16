/**
 * The technical capability matrix.
 *
 * ── Why this exists ──────────────────────────────────────────────────────
 *
 * /expertise/ had no skills section at all. It carried the eleven technology
 * hubs and the three pillars, which answer "what do you consult on", and
 * nothing that answered "what do you actually work in". Nine of the
 * technologies named in the brief appeared nowhere on the page: custom
 * modules, B2B commerce, custom apps, Tailwind, EC2, RabbitMQ, Jenkins,
 * GitLab CI/CD, Cloudflare and n8n.
 *
 * `TECH_PROFICIENCIES` in lib/site.ts existed and was thinner, grouped
 * differently, and rendered only on /experience/ and /resume/. It now derives
 * from this file, so there is one list and three pages read it rather than two
 * lists drifting apart.
 *
 * ── No percentages, deliberately ─────────────────────────────────────────
 *
 * The brief rules out skill percentage bars and it is right to. "Magento 92%"
 * is a number with no definition behind it: nobody can say what the missing
 * 8% is, and a reader who takes it seriously is being misled by a chart.
 *
 * What replaces it is a description per category saying what the work in that
 * category actually consists of, which is the thing a technical interviewer
 * or an engineering manager is trying to establish. Where a category has a
 * figure from the verified record, the figure appears with its context, the
 * same rule CONTENT-PRINCIPLES.md section 1 applies everywhere else.
 *
 * ── The seventh category ─────────────────────────────────────────────────
 *
 * The brief names six. Measurement is the seventh and it is kept because it
 * was already on the site, it is real, and dropping it to match a list would
 * be losing accurate information to tidy a structure.
 *
 * Copy in this file avoids em-dashes on purpose.
 */

export interface CapabilityGroup {
  /** Category name, as the brief names it. */
  group: string;
  /** What work in this category actually consists of. Never a rating. */
  description: string;
  items: readonly string[];
  /**
   * Where this sits in the verified record, when it does. Rendered under the
   * list. Omitted rather than invented.
   */
  evidence?: string;
  /** The page that covers this category in depth. */
  href?: string;
}

export const CAPABILITIES: readonly CapabilityGroup[] = [
  {
    group: 'Magento & Adobe Commerce',
    description:
      'Building inside the platform rather than around it: modules written through the plugin and preference system so an upgrade does not become a project, multi-store structures where shared logic is genuinely shared, and B2B account hierarchies with the approval chains a real procurement process needs.',
    items: [
      'Magento 2',
      'Adobe Commerce',
      'Custom Modules',
      'Multi-Store & Multi-Currency',
      'B2B Commerce',
      'Magento GraphQL',
      'MSI',
      'Upgrades & Migrations',
    ],
    evidence:
      '12+ multi-store platforms carrying 500K+ SKUs and 1M+ monthly users, led from 2023. Site speed improved 60% through Varnish, Redis, full-page cache, CDN and database tuning.',
    href: '/services/magento-development/',
  },
  {
    group: 'Shopify & Shopify Plus',
    description:
      'Theme architecture structured so a merchandiser can work without a developer, private and custom apps on the Admin and Storefront APIs, and checkout extensibility through the supported extension points rather than through script injection that breaks on the next platform update.',
    items: [
      'Shopify',
      'Shopify Plus',
      'Liquid',
      'Custom Apps',
      'Storefront API',
      'Admin API',
      'Checkout Extensibility',
      'Shopify Functions',
    ],
    evidence:
      'Storefronts for consumer brands since 2018, across D2C fashion, horticulture and sports nutrition.',
    href: '/services/shopify-development/',
  },
  {
    group: 'Frontend',
    description:
      'Rendering strategy chosen per route against what the data actually does, rather than one strategy applied everywhere. Static for a catalogue, incremental for what changes, server-rendered for what is personal, with Core Web Vitals treated as an acceptance criterion carrying a number.',
    items: [
      'Next.js',
      'React.js',
      'JavaScript',
      'TypeScript',
      'Tailwind CSS',
      'Core Web Vitals',
      'PWA',
    ],
    href: '/services/full-stack-development/',
  },
  {
    group: 'Backend',
    description:
      'The services behind a storefront and the contracts between them. API design that is versioned, documented and authenticated properly, built for the consumers that exist rather than every consumer that might.',
    items: ['PHP', 'Node.js', 'GraphQL', 'REST APIs', 'MySQL', 'PostgreSQL', 'MongoDB'],
    evidence:
      '90% of B2B order and quote processing automated, cutting approval cycle time by 40%.',
    href: '/services/api-integration/',
  },
  {
    group: 'Infrastructure & DevOps',
    description:
      'Where a commerce platform stops being code and starts being a running system. Caching layers, search, queues and the release process, with the part that matters written down so a deploy is not something only one person can do.',
    items: [
      'AWS',
      'EC2',
      'RDS',
      'S3',
      'Redis',
      'Varnish',
      'Elasticsearch',
      'RabbitMQ',
      'Docker',
      'Jenkins',
      'GitLab CI/CD',
      'Cloudflare',
    ],
    evidence:
      'Magento 2 on AWS with EC2, RDS, S3, load balancing and auto-scaling, from 2020.',
    href: '/services/ecommerce-architecture/',
  },
  {
    group: 'Generative AI',
    description:
      'Applied to the problems that are genuinely language problems: catalogue content at a scale no copywriter can match, assistants grounded in your own product data rather than in a model’s memory, and the operational steps that are really text moving between systems. Certified with IBM and AcceleratorX in November 2026.',
    items: [
      'Generative AI',
      'LLMs',
      'RAG',
      'Embeddings',
      'Prompt Engineering',
      'n8n',
      'Workflow Automation',
      'Evaluation',
    ],
    /* No `evidence`. The certification is November 2026 and this site
       publishes no AI engagement with a measured outcome; claiming one here
       would be the exact invention CONTENT-PRINCIPLES.md section 1 forbids. */
    href: '/services/generative-ai/',
  },
  {
    group: 'Measurement',
    description:
      'Instrumenting what the business needs to decide with, rather than what is easy to collect. Event schemas defined before the dashboard, so two departments stop disagreeing about what a conversion is.',
    items: ['GA4', 'Google Tag Manager', 'dataLayer', 'MoEngage', 'WebEngage', 'Technical SEO'],
    href: '/mixpanel/',
  },
];

/**
 * The shape lib/site.ts used to author by hand, derived from the matrix above.
 *
 * Kept exported under its old name because app/experience/page.tsx and
 * app/resume/page.tsx both type against it. They now show the same seven
 * categories the expertise page does, which is the point: a reader comparing
 * the resume against the expertise page should not find two different answers.
 */
export const TECH_PROFICIENCIES = CAPABILITIES.map(({ group, items }) => ({ group, items }));
