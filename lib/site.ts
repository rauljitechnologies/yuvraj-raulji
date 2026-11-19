/**
 * All copy/content previously hardcoded inside app/_html/home.html — either as
 * literal markup or inside Alpine `x-data` blobs. Extracted verbatim.
 */

import type { IconName } from '../components/ui/icons';
import { POSTS } from './posts';

/* Moved to lib/contact.ts, and re-exported here so every server-side import
   of it from this module keeps resolving. The move is a bundle one: four
   client components need these eight strings and none of the 880 lines below
   them. See the note in that file. */
import { CONTACT } from './contact';
export { CONTACT };

/**
 * Canonical origin, no trailing slash. Must match the host the site is actually
 * served from — Vercel currently 308-redirects the apex to www, so canonical
 * URLs, schema @ids and the sitemap all use www. If the Vercel primary domain is
 * ever flipped back to the apex, change this one line.
 */
export const SITE_URL = 'https://www.yuvrajraulji.com';

/**
 * Every profile that belongs in the Person entity's `sameAs`.
 *
 * `sameAs` is how a search engine or an answer engine confirms that a LinkedIn
 * profile, a GitHub account and this site are the same person. It is the
 * strongest off-site entity signal available and the cheapest one to get wrong,
 * because it only works while every URL in it resolves to a profile that is
 * genuinely his. One wrong URL does not simply fail to help: it turns a
 * confirmation into a contradiction, and the entity resolves less confidently
 * than it did with three links instead of four.
 *
 * **Never add a URL here that has not been opened and confirmed.** Guessing a
 * handle on one platform from a handle on another is the exact failure mode,
 * and it is tempting here because three of these already share `iamyuvrajraulji`.
 *
 * Confirmed and live, 4 Sep 2026:
 */
export const PROFILES: readonly string[] = [
  CONTACT.linkedin,
  CONTACT.instagram,
  CONTACT.facebook,
  /*
   * Awaiting URLs. Yuvraj has confirmed a GitHub, an X account and a
   * publishing profile exist; the URLs are not on the record yet, and a
   * plausible-looking guess in structured data is worse than an absence.
   *
   * Add each one here once opened and checked. GitHub is the highest value of
   * the three for a technology consultant, and X additionally unlocks the
   * `twitter:site` and `twitter:creator` tags the site does not currently set.
   */
];

/**
 * The share card every route falls back to.
 *
 * It is declared here rather than on the root layout because Next only
 * inherits `openGraph` into a page that sets no `openGraph` of its own, and
 * every page here sets one. A parent default would therefore have reached no
 * page at all; a constant each page spreads in reaches all of them.
 *
 * 1200x630 is the ratio every platform crops to, so nothing is cut. It
 * replaces the 400x400 portrait, which was the only photograph in the
 * repository and forced every card to `summary`: a square asset in a 1.91:1
 * frame is cropped through the face. The card carries the positioning line,
 * the name and the core idea, so a shared link says what the site is before
 * anyone clicks it.
 *
 * Rebuilt from scripts/og-card.html — edit that, re-screenshot at 2x, and
 * downscale to 1200x630.
 */
export const OG_IMAGE = {
  url: `${SITE_URL}/assets/og-card.jpg`,
  width: 1200,
  height: 630,
  /* The alt names the person and the role, matching the card and the Person
     node. It used to say "working across AI, business and eCommerce", which is
     the old brand line the card itself was rebuilt to stop repeating. */
  alt: 'Yuvraj Raulji, eCommerce, AI and Technology Consultant',
} as const;

/** The same asset in the shape the `twitter.images` field takes. */
export const OG_IMAGE_URL = OG_IMAGE.url;

/**
 * Section cards.
 *
 * One card for fifty four pages meant an article, a platform page and the
 * hiring page all shared a portrait that said nothing about any of them. These
 * three cover the sections where the shared link is doing different work, and
 * every page outside them still falls back to OG_IMAGE.
 *
 * All four are rebuilt from scripts/og/*.html. To change one: edit the HTML,
 * re-render with headless Chrome at 1200x630 and a device scale factor of 1,
 * then convert to progressive JPEG. **Not at 2x**: the only photograph on the
 * record is 400x400, and rendering the 330px plate at 2x upscales it from a
 * 400px source, which is exactly what made the previous card soft.
 */
function card(file: string, alt: string) {
  return { url: `${SITE_URL}/assets/${file}`, width: 1200, height: 630, alt } as const;
}

/** Platform hubs and their service pages. */
export const OG_EXPERTISE = card(
  'og-expertise.jpg',
  'Nine technologies, and where each one is the wrong choice',
);

/** /hire/ */
export const OG_HIRE = card('og-hire.jpg', 'Hire Yuvraj Raulji, Your Technology Partner');

/** /insights/ */
export const OG_INSIGHTS = card('og-insights.jpg', 'Insights written for the people making the decision');

/* With CONTACT, in lib/contact.ts, and re-exported for the same reason. */
export { LEAD_ENDPOINT } from './contact';

/** GA4 measurement ID. Only loaded in production builds — see app/layout.tsx. */
export const GA_MEASUREMENT_ID = 'G-5JHWRDWD9K';

/** Google Tag Manager container. Production-only, same as GA4. */
export const GTM_CONTAINER_ID = 'GTM-TNKVWXJ5';

/**
 * Primary navigation. Kept deliberately short. "Contact" is a button rather than
 * a link (it opens the enquiry modal), so it lives in the header component.
 */
export const NAV_LINKS = [
  { label: 'About', href: '/about/' },
  { label: 'Expertise', href: '/expertise/' },
  { label: 'Work', href: '/work/' },
  { label: 'Insights', href: '/insights/' },
] as const;

export const HERO_CHIPS = [
  { label: 'Magento 2 Expert', pos: 'top-[22%] left-[6%]' },
  { label: 'SEO & CRO Specialist', pos: 'top-[36%] right-[8%]' },
  { label: 'Platform Migration', pos: 'bottom-[28%] left-[8%]' },
  { label: '9+ Years Experience', pos: 'bottom-[18%] right-[7%]' },
];

/**
 * Every figure here must be verifiable. "100% — Precision" was removed: it was
 * not a measurable claim, and an invented metric standing beside real ones
 * undermines all of them. Replaced with catalogue scale, which is evidenced.
 */
export const HERO_STATS = [
  { value: '9+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Delivered' },
  { value: '500K+', label: 'SKUs Managed' },
  { value: '1M+', label: 'Monthly Users' },
];

export const MARQUEE_ITEMS = [
  'Magento 2', 'Shopify Plus', 'WordPress', 'Next.js', 'React', 'SEO Optimization',
  'CRO Strategy', 'AWS EC2', 'AWS S3', 'Nginx', 'Redis Cache', 'Varnish',
  'Core Web Vitals', 'GA4', 'GTM', 'Hotjar', 'n8n Automation', 'OpenAI',
  'GraphQL', 'Headless Commerce', 'PHP', 'MySQL', 'Cloudflare',
];

export interface Capability {
  /** Display number, 01–13. Sequence is the information architecture, not a ranking. */
  num: string;
  icon: IconName;
  title: string;
  /** WHAT it is + HOW I approach it, in first person consultant voice. */
  desc: string;
  /** PROOF rail — concrete platforms/tools, not adjectives. */
  stack: string[];
}

/**
 * The 14 Strategic Capabilities. Ordered strategy → architecture → platform →
 * engineering → growth → AI, so the grid reads as a consulting practice rather
 * than a service menu.
 */
export const CAPABILITIES: Capability[] = [
  {
    num: '01',
    icon: 'strategy',
    title: 'E-commerce Technology Strategy',
    desc: 'I map commercial goals to a technology plan — platform selection, build-vs-buy, phasing and total cost — so the stack follows the business case instead of the other way round.',
    stack: ['Platform Selection', 'Roadmapping', 'Technical Due Diligence'],
  },
  {
    num: '02',
    icon: 'transformation',
    title: 'Digital Transformation',
    desc: 'Strategic modernization roadmaps that replace legacy stacks with cloud-native, API-first ecosystems — sequenced so trading continues throughout the migration.',
    stack: ['Legacy Migration', 'Process Redesign', 'Phased Rollout'],
  },
  {
    num: '03',
    icon: 'architecture',
    title: 'Enterprise Commerce Architecture',
    desc: 'System design for multi-store, multi-currency and B2B commerce — data models, integration boundaries and service contracts that stay maintainable as catalogues and order volume grow.',
    stack: ['Multi-store', 'B2B Workflows', 'ERP & PIM Integration'],
  },
  {
    num: '04',
    icon: 'magento',
    title: 'Magento 2 & Adobe Commerce',
    desc: 'Enterprise Magento 2 and Adobe Commerce builds — custom modules, multi-store setups, B2B workflows and the performance engineering that keeps large catalogues fast.',
    stack: ['Custom Modules', 'Multi-store', 'Adobe Commerce'],
  },
  {
    num: '05',
    icon: 'shopify',
    title: 'Shopify & Shopify Plus',
    desc: 'High-growth Shopify Plus ecosystems for premium storefronts — international scaling, theme architecture, app integration and conversion-led merchandising.',
    stack: ['Shopify Plus', 'Liquid & Hydrogen', 'International'],
  },
  {
    num: '06',
    icon: 'headless',
    title: 'Headless & Composable Commerce',
    desc: 'API-first commerce layers built on Next.js, GraphQL and composable services — decoupling the storefront so front-end iteration stops waiting on back-end release cycles.',
    stack: ['Next.js', 'GraphQL', 'PWA Studio'],
  },
  {
    num: '07',
    icon: 'web',
    title: 'Modern Web Architecture',
    desc: 'Production front-end architecture in React and Next.js — typed, componentized, and structured so the codebase stays maintainable years after launch rather than being rewritten.',
    stack: ['React', 'Next.js', 'GraphQL'],
  },
  {
    num: '08',
    icon: 'cms',
    title: 'WordPress & WooCommerce',
    desc: 'Custom WordPress and WooCommerce builds — bespoke themes, plugin development, checkout and catalogue customization, plus the hardening and performance tuning these stacks usually arrive without.',
    stack: ['WordPress', 'WooCommerce', 'Custom Plugins'],
  },
  {
    num: '09',
    icon: 'server',
    title: 'Server & Cloud Infrastructure',
    desc: 'End-to-end provisioning on AWS EC2, RDS and S3 with Nginx, Varnish and Redis — production environments for Magento 2, WordPress and WooCommerce, built to be reproducible.',
    stack: ['AWS', 'Nginx & Varnish', 'Redis'],
  },
  {
    num: '10',
    icon: 'performance',
    title: 'Performance Engineering',
    desc: 'Code profiling, caching layers, CDN configuration, image pipelines and database tuning — measured against Core Web Vitals rather than synthetic scores alone.',
    stack: ['Core Web Vitals', 'Caching', 'Database Tuning'],
  },
  {
    num: '11',
    icon: 'seo',
    title: 'E-commerce SEO & Growth',
    desc: 'Technical SEO for large catalogues — crawlability, indexation, structured data, category and product optimization, and the internal linking that compounds organic revenue.',
    stack: ['Technical SEO', 'Structured Data', 'Indexation'],
  },
  {
    num: '12',
    icon: 'analytics',
    title: 'Analytics & Measurement',
    desc: 'Engineer-grade measurement — GA4 e-commerce events, GTM dataLayer design and server-side conversion tracking, so reporting reflects what actually happened.',
    stack: ['GA4', 'GTM & dataLayer', 'Conversions API'],
  },
  {
    num: '13',
    icon: 'generative',
    title: 'Generative AI & Automation',
    desc: 'Applied generative AI for content workflows, product discovery and internal operations, wired into real systems through n8n and API integrations rather than left as demos.',
    stack: ['OpenAI APIs', 'n8n', 'Content Workflows'],
  },
  {
    num: '14',
    icon: 'agentic',
    title: 'Agentic AI & AI Agents',
    desc: 'Where generative AI produces output, agentic AI reasons, plans and executes multi-step tasks inside defined systems — with explicit scope, tool access and human checkpoints.',
    stack: ['Agent Architecture', 'Tool Use', 'Workflow Automation'],
  },
];

export interface InfraLayer {
  label: string;
  role: string;
  items: string[];
}

/**
 * §10 architecture stack, top-down as a request travels it. Rendered as real
 * HTML text with an SVG connector overlay — never baked into an image or canvas,
 * so the layer names stay crawlable and screen-reader accessible.
 */
export const INFRA_LAYERS: InfraLayer[] = [
  {
    label: 'Frontend',
    role: 'What the customer touches — rendering, routing and asset delivery.',
    items: ['Next.js', 'React', 'PWA Studio', 'CDN'],
  },
  {
    label: 'Application Layer',
    role: 'Business logic, checkout, catalogue and integration surface.',
    items: ['PHP', 'PHP-FPM', 'Node.js', 'Magento 2'],
  },
  {
    label: 'Cache',
    role: 'Absorbs repeat load before it ever reaches PHP or the database.',
    items: ['Redis', 'Varnish', 'Full-page Cache'],
  },
  {
    label: 'Database',
    role: 'Transactional store — indexing, query plans and replication.',
    items: ['MySQL', 'PostgreSQL', 'Query Optimization'],
  },
  {
    label: 'Search',
    role: 'Catalogue search and faceted navigation at catalogue scale.',
    items: ['Elasticsearch', 'Indexing Strategy', 'Faceted Search'],
  },
  {
    label: 'Infrastructure',
    role: 'The ground everything runs on — provisioning, deployment, recovery.',
    items: ['Linux', 'Nginx', 'Apache', 'Docker', 'CI/CD'],
  },
];

/**
 * Google's published Core Web Vitals "good" thresholds — cited targets, not
 * measurements of this or any client site. §13 forbids presenting illustrative
 * numbers as live data.
 */
export const CWV_TARGETS = [
  { metric: 'LCP', target: '< 2.5s', name: 'Largest Contentful Paint', note: 'Loading' },
  { metric: 'INP', target: '< 200ms', name: 'Interaction to Next Paint', note: 'Responsiveness' },
  { metric: 'CLS', target: '< 0.1', name: 'Cumulative Layout Shift', note: 'Visual stability' },
];

export const PERF_AREAS = [
  { title: 'Server & Application', desc: 'PHP-FPM tuning, opcode caching, worker sizing and request profiling to cut time-to-first-byte.' },
  { title: 'Database', desc: 'Slow-query analysis, index design and schema tuning so catalogue and order queries stay flat as volume grows.' },
  { title: 'Caching Strategy', desc: 'Full-page, block and object caching layered so invalidation is predictable rather than accidental.' },
  { title: 'Search', desc: 'Index structure and query shaping to keep faceted navigation responsive on large catalogues.' },
  { title: 'Frontend', desc: 'Critical path, bundle size, image pipelines and font loading — measured against real-user data, not lab scores alone.' },
  { title: 'Scalability', desc: 'Load characterisation and capacity planning ahead of campaigns, migrations and seasonal peaks.' },
];

/**
 * §12 — Analytics & Tracking. Each entry carries what it is, how it is built and
 * what it changes commercially. The brief is explicit that listing tool names
 * alone is not enough.
 */
export const ANALYTICS_STACK = [
  {
    title: 'GA4 E-commerce Events',
    desc: 'The full purchase funnel instrumented as spec-compliant events — item lists, add-to-cart, checkout steps, purchase — with consistent item payloads.',
    value: 'Drop-off becomes attributable to a step instead of a guess.',
  },
  {
    title: 'GTM & dataLayer Design',
    desc: 'A documented dataLayer contract implemented at the template level, so tags read structured data rather than scraping the DOM.',
    value: 'Tags survive redesigns instead of breaking silently on deploy.',
  },
  {
    title: 'Meta Pixel & Conversions API',
    desc: 'Browser pixel paired with server-side CAPI, deduplicated by event ID and enriched with hashed customer parameters.',
    value: 'Recovers conversions lost to ad blockers and cookie restrictions.',
  },
  {
    title: 'TikTok & Snapchat Pixels',
    desc: 'Channel pixels mapped to the same event taxonomy as GA4 and Meta, rather than each platform defining its own truth.',
    value: 'Channel reporting becomes comparable instead of contradictory.',
  },
  {
    title: 'Product Analytics',
    desc: 'Mixpanel event modelling for behavioural questions GA4 answers poorly — cohorts, retention and feature-level funnels.',
    value: 'Shows why users churn, not just that they did.',
  },
  {
    title: 'Engagement Platforms',
    desc: 'WebEngage, MoEngage and HubSpot wired to the same event stream that powers reporting, including identity resolution.',
    value: 'Lifecycle campaigns trigger on real behaviour, not stale segments.',
  },
  {
    title: 'Payment Gateway Tracking',
    desc: 'Reconciling gateway callbacks against front-end purchase events to catch orders that complete off-site or after redirect.',
    value: 'Closes the gap between analytics revenue and actual settled revenue.',
  },
  {
    title: 'Performance Tracking',
    desc: 'Real-user Core Web Vitals collected per template and correlated with conversion rate.',
    value: 'Turns performance work into a revenue argument rather than a score.',
  },
];

/**
 * §14 — SEO framed as a systems discipline. The section must show SEO connecting
 * to technology, architecture, performance, analytics, content and conversion.
 */
export const SEO_PILLARS = [
  {
    title: 'Technical SEO',
    desc: 'Crawl budget, render behaviour, status codes, redirects and log-file analysis — the layer most catalogue sites lose rankings to without noticing.',
  },
  {
    title: 'Crawlability & Indexation',
    desc: 'Controlling what gets crawled and what deserves to be indexed: faceted navigation, parameter handling, pagination and thin-page suppression.',
  },
  {
    title: 'Category & Product SEO',
    desc: 'Category pages treated as the primary ranking asset, with product templates that scale metadata and copy without duplicating it.',
  },
  {
    title: 'Structured Data',
    desc: 'Product, Offer, Breadcrumb and Organization markup that validates and matches on-page reality, so rich results hold rather than flicker.',
  },
  {
    title: 'Internal Linking',
    desc: 'Deliberate link architecture between hubs, categories and content so authority reaches the pages that actually convert.',
  },
  {
    title: 'Platform SEO',
    desc: 'The platform-specific traps — Magento layered navigation, Shopify collection URLs, WooCommerce permalink and pagination behaviour.',
  },
];

/** The disciplines §14 requires SEO to be shown connecting to. */
export const SEO_CONNECTIONS = [
  { label: 'Technology', note: 'Rendering and platform behaviour decide what Google can see.' },
  { label: 'Architecture', note: 'URL and category structure is information architecture.' },
  { label: 'Performance', note: 'Core Web Vitals are a ranking and conversion input.' },
  { label: 'Analytics', note: 'Measurement proves which organic work paid.' },
  { label: 'Content', note: 'Coverage and intent matching drive qualified traffic.' },
  { label: 'Conversion', note: 'Traffic without conversion is a cost, not a result.' },
];

/** §15 — applied generative AI. Each entry states the work, not the technology. */
export const GENERATIVE_AI = [
  {
    title: 'AI Strategy',
    desc: 'Deciding where AI genuinely changes unit economics and where it is an expensive distraction — before any build starts.',
  },
  {
    title: 'Content Workflows',
    desc: 'Product copy, category descriptions and metadata generated against brand rules, with human review kept in the loop.',
  },
  {
    title: 'Product Discovery',
    desc: 'Semantic search, attribute enrichment and recommendation logic that help customers find products the catalogue already has.',
  },
  {
    title: 'Customer Experience',
    desc: 'Assisted support and pre-sales answers grounded in real product data, so responses stay accurate rather than plausible.',
  },
  {
    title: 'AI Analytics',
    desc: 'Turning reporting into questions a merchandiser can ask in plain language, answered from the warehouse rather than guessed.',
  },
  {
    title: 'AI Operations',
    desc: 'Back-office automation — data cleanup, catalogue QA, exception handling — where volume makes manual work the bottleneck.',
  },
];

/**
 * §16 — the agent loop. Deliberately ends at a human checkpoint: the brief
 * forbids unsupported claims about fully autonomous operation, and scoping is
 * the honest differentiator anyway.
 */
export const AGENT_LOOP = [
  { step: 'Goal', desc: 'A defined objective with explicit constraints and success criteria.' },
  { step: 'Plan', desc: 'The agent decomposes the goal into ordered, checkable steps.' },
  { step: 'Act', desc: 'Execution through a fixed set of tools and APIs it is permitted to call.' },
  { step: 'Observe', desc: 'Results are verified against the criteria, and the plan is revised.' },
  { step: 'Checkpoint', desc: 'A person approves anything consequential before it takes effect.' },
];

export const AGENT_TYPES = [
  { title: 'Shopping Agents', desc: 'Guided product selection across large or technical catalogues.' },
  { title: 'Sales Agents', desc: 'Qualification and quote preparation inside defined B2B rules.' },
  { title: 'Customer Service Agents', desc: 'Order, returns and status handling against real system data.' },
  { title: 'Analytics Agents', desc: 'Recurring analysis and anomaly reporting on commerce data.' },
  { title: 'SEO Agents', desc: 'Crawl, audit and content-gap analysis at a cadence humans will not sustain.' },
  { title: 'Ops Agents', desc: 'Catalogue QA, data reconciliation and exception routing.' },
];

/* `WorkSlide` and `WORK_SLIDES` stood here: eleven slides, each pointing at a
   case-cover JPEG. Nothing imported either of them. They were the only
   reference to eleven image files that the site never served, including an
   older case set (fabric retail, fabric gallery, supermarket, safety
   equipment, fashion retail) that does not appear in CASES in lib/brand.ts.

   Removed with the files. The live case covers are the WebP cuts in CASES,
   which are served with a responsive srcSet; see lib/images.ts. */

export const WORK_METRICS = [
  { count: 42, suffix: '%', label: 'Performance Lift' },
  { count: 9, suffix: '+ Yrs', label: 'Commerce Experience' },
  { count: 50, suffix: '+', label: 'Projects Delivered' },
];

export type TechIcon = 'cart' | 'activity' | 'code' | 'lock' | 'bars' | 'orbit';

export interface TechGroup {
  icon: TechIcon;
  title: string;
  sub: string;
  level: 'Expert' | 'Advanced';
  /** `strong: false` renders the dimmed dot + dimmed label variant. */
  items: { label: string; strong: boolean }[];
}

export const TECH_GROUPS: TechGroup[] = [
  {
    icon: 'cart',
    title: 'Commerce',
    sub: 'Platforms',
    level: 'Expert',
    items: [
      { label: 'Magento 2 / Adobe Commerce', strong: true },
      { label: 'Shopify & Shopify Plus', strong: true },
      { label: 'WordPress & WooCommerce', strong: true },
      { label: 'Headless Commerce', strong: false },
      { label: 'Multi-store Architecture', strong: false },
    ],
  },
  {
    icon: 'activity',
    title: 'Cloud &',
    sub: 'Infrastructure',
    level: 'Expert',
    items: [
      { label: 'AWS (EC2, S3, CloudFront)', strong: true },
      { label: 'Nginx / Apache', strong: true },
      { label: 'Redis & Varnish Cache', strong: true },
      { label: 'MySQL / PostgreSQL', strong: true },
      { label: 'Elasticsearch', strong: false },
    ],
  },
  {
    icon: 'code',
    title: 'Frontend',
    sub: '& UI Development',
    level: 'Advanced',
    items: [
      { label: 'Next.js / React', strong: true },
      { label: 'Tailwind CSS', strong: true },
      { label: 'Alpine.js / JavaScript', strong: true },
      { label: 'TypeScript', strong: false },
      { label: 'HTML5 / CSS3 / SCSS', strong: false },
    ],
  },
  {
    icon: 'lock',
    title: 'AI &',
    sub: 'Automation',
    level: 'Advanced',
    items: [
      { label: 'OpenAI / GPT-4', strong: true },
      { label: 'Claude AI (Anthropic)', strong: true },
      { label: 'n8n Automation', strong: true },
      { label: 'Python / API Integration', strong: false },
      { label: 'Prompt Engineering', strong: false },
    ],
  },
  {
    icon: 'bars',
    title: 'SEO &',
    sub: 'Analytics',
    level: 'Expert',
    items: [
      { label: 'Google Analytics 4 / GA4', strong: true },
      { label: 'Google Search Console', strong: true },
      { label: 'Core Web Vitals / CRO', strong: true },
      { label: 'Ahrefs / SEMrush', strong: false },
      { label: 'GTM / Tag Management', strong: false },
    ],
  },
  {
    icon: 'orbit',
    title: 'DevOps',
    sub: '& Tools',
    level: 'Advanced',
    items: [
      { label: 'Git / GitHub', strong: true },
      { label: 'Docker / CI/CD', strong: true },
      { label: 'Cloudflare CDN / SSL', strong: true },
      { label: 'Linux Server Admin', strong: false },
      { label: 'Composer / CLI Tools', strong: false },
    ],
  },
];

export interface Industry {
  t: string;
  d: string;
  desc: string;
  img: string;
}

export const INDUSTRIES: Industry[] = [
  {
    t: 'Fashion & Apparel',
    d: 'B2C · Shopify · Magento',
    desc: 'High-conversion storefronts for fashion labels across Shopify and Magento.',
    img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=80',
  },
  {
    t: 'Manufacturing',
    d: 'B2B · ERP · Wholesale',
    desc: 'ERP-connected B2B commerce and wholesale ordering platforms built for scale.',
    img: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=1400&q=80',
  },
  {
    t: 'Healthcare',
    d: 'Clinics · Pharma · Wellness',
    desc: 'Compliant digital platforms for clinics, pharma, and wellness brands.',
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80',
  },
  {
    t: 'Real Estate',
    d: 'Listings · CRM · Portals',
    desc: 'Property portals, listing engines, and CRM-driven lead generation systems.',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=80',
  },
  {
    t: 'Automotive',
    d: 'Dealers · Parts · Booking',
    desc: 'Dealer platforms, parts catalogues with complex fitment data, and service booking flows.',
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80',
  },
  {
    t: 'B2B Commerce',
    d: 'Catalog · Quotes · Wholesale',
    desc: 'Quote-driven catalogues and negotiated pricing flows at enterprise scale.',
    img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=80',
  },
  {
    t: 'Tech & SaaS',
    d: 'Startups · APIs · Platforms',
    desc: 'Product sites, API platforms, and growth engines for ambitious startups.',
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80',
  },
];

export const INSIGHT_CARDS = [
  { t: 'Magento 2 SEO: Technical Audit Guide', c: 'SEO', m: '8 min read' },
  { t: 'CRO Strategies That Double Conversion', c: 'CRO', m: '6 min read' },
  { t: 'AWS Server Setup for Magento 2', c: 'AWS', m: '10 min read' },
  { t: 'Core Web Vitals & PageSpeed 90+', c: 'Performance', m: '7 min read' },
  { t: 'n8n Automation for E-commerce Teams', c: 'Automation', m: '5 min read' },
  { t: 'WordPress Performance on AWS', c: 'WordPress', m: '6 min read' },
  { t: 'Headless Commerce Architecture 2026', c: 'Architecture', m: '9 min read' },
  { t: 'AI-Powered Digital Transformation', c: 'AI', m: '7 min read' },
];

export interface Testimonial {
  q: string;
  n: string;
  r: string;
  m: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    q: 'Exceptional technical expertise combined with strong strategic thinking that delivered real business results.',
    n: 'Growth-Focused Business',
    r: 'D2C Brand Engagement',
    m: 'GB',
  },
  {
    q: 'Delivered scalable solutions that significantly improved our digital operations and team velocity.',
    n: 'Commerce Leadership Team',
    r: 'Enterprise Retail Group',
    m: 'CL',
  },
  {
    q: 'A valuable technology partner for complex commerce initiatives with deep understanding of enterprise scale.',
    n: 'Enterprise Client',
    r: 'Platform Modernization',
    m: 'EC',
  },
  {
    q: 'Professional, innovative, and highly focused on results. One of the best technology engagements we have had.',
    n: 'Transformation Stakeholder',
    r: 'Global B2B Enterprise',
    m: 'TS',
  },
];

export interface Faq {
  q: string;
  /** Answer may contain a single inline mailto link, hence the parts split. */
  a: string;
  linkEmail?: boolean;
}

export const FAQS: Faq[] = [
  {
    q: 'What platforms do you specialise in?',
    a: 'Magento 2 (Adobe Commerce), Shopify & Shopify Plus, WordPress & WooCommerce, and headless/custom Next.js commerce architectures. For cloud, I work primarily on AWS (EC2, RDS, S3, CloudFront) alongside Nginx/Apache server stacks with Redis, Varnish, and Cloudflare.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'Timelines depend on scope. A Shopify brand store typically takes 3–5 weeks. A Magento 2 enterprise build ranges from 6–16 weeks. SEO & CRO audits with implementation run 4–8 weeks. Every engagement begins with a clear roadmap and milestone schedule agreed upon upfront.',
  },
  {
    q: 'Do you work with international brands?',
    a: 'Yes — I work with brands across India, the UAE, Europe, UK, and North America. All engagements are conducted remotely with structured communication, detailed deliverables, and regular milestone reviews. Time zone differences are managed proactively from IST.',
  },
  {
    q: 'What does the engagement process look like?',
    a: 'Every project begins with a strategic consultation call to understand your goals and constraints. A detailed proposal follows with scope, timeline, and investment. Once approved, work proceeds through clear phases — discovery, architecture, development, QA, and launch — with regular check-ins throughout.',
  },
  {
    q: 'Do you offer post-launch support?',
    a: "Yes. Post-launch retainers cover ongoing optimisation, security updates, performance monitoring, SEO iterations, and feature development. Support packages are tailored to each brand's operational needs — from lightweight quarterly reviews to dedicated monthly retainers.",
  },
  {
    q: 'Can you optimise an existing store rather than rebuild it?',
    a: 'Absolutely. Many of my most impactful engagements are performance audits, CRO programmes, and platform migrations rather than ground-up builds. I assess your current architecture, identify critical bottlenecks, and implement targeted improvements — often delivering faster ROI than a full rebuild.',
  },
  {
    q: 'How is AI integrated into your e-commerce work?',
    a: 'AI is embedded practically: intelligent product recommendations, automated catalogue enrichment, smart semantic search, dynamic pricing logic, and operations automation via n8n + OpenAI workflows. The goal is always measurable efficiency or revenue impact — not technology for its own sake.',
  },
  {
    q: 'How do I get started?',
    a: "Simply reach out via the contact form or email {EMAIL}. Describe your project briefly and I'll respond within 24 hours to schedule a no-obligation strategy conversation.",
    linkEmail: true,
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   THE ENQUIRY SELECTS ARE GONE

   Four lists stood here: SERVICE_OPTIONS (what is this about), ROLE_OPTIONS
   (your role), PLATFORM_OPTIONS and TIMELINE_OPTIONS. They were rendered by
   the enquiry modal on every route and by the homepage form, and they were
   the qualifying fields the lead scoring in google-apps-script/Code.gs read.

   They are removed because the brief fixes the form at five fields, three of
   them required: name, email, company or website, project requirements and
   budget. Role, platform and timeline are all answerable in the reply, where
   asking costs nothing, and on the form each one cost submissions.

   `LeadFields` in lib/lead.ts still declares `role`, `platform` and
   `timeline` as optional, so the sheet's existing columns and the scoring
   that reads them keep working for the rows already in it. Nothing sends them
   any more. Removing the columns is a change to the spreadsheet, not to this
   repository, and it is not worth breaking the history for.

   One consequence, stated rather than discovered later: the lead API now
   reports every enquiry as UNSCORED, because the fields it scored on are no
   longer collected. The budget field is sent inside `service` and is the
   triage signal that replaces them.
   ───────────────────────────────────────────────────────────────────────────*/

/* ─────────────────────────────────────────────────────────────────────────────
   The professional record.

   It used to be authored here, with every employer anonymised as "B2B commerce
   platform" or "Commerce agency, Gulf retail", and with a CURRENT_ROLES array
   that carried four titles against two company names. Both are gone.

   The record now lives in lib/career.ts, with the employers named, and this
   file re-exports it under the old name so the pages and the schema that read
   `EXPERIENCE` keep working. The reasoning for naming them is at the top of
   that file: section 4 of BRAND-DESIGN-GUIDELINE.md keeps off this site the
   company names that were asked to be removed, and the four employers in the
   record were never among them.

   `Role` stays exported from here because `components/brand/about-sections.tsx`
   and app/experience/page.tsx both type against it.
   ───────────────────────────────────────────────────────────────────────────*/

export type { CareerRole as Role } from './career';
export { CAREER as EXPERIENCE, CAREER_START_YEAR, CAREER_STATS } from './career';
/* `RECORD_INDUSTRIES` is deliberately NOT re-exported here: this file already
   exports `INDUSTRIES`, the sector cards, and two lists one import apart with
   near-identical names is how the wrong one gets rendered. Pages that want the
   record read it from lib/career.ts directly. */

/* `TECH_PROFICIENCIES` was authored here as five hand-written groups. It is
   now derived from the capability matrix in lib/capabilities.ts, which is the
   one list /expertise/, /experience/ and /resume/ all read: two skill lists one
   import apart is how a resume and an expertise page end up disagreeing. */
export { TECH_PROFICIENCIES } from './capabilities';

export const EDUCATION = [
  { qualification: 'Bachelor of Engineering, Information Technology', period: '2013 to 2016' },
  { qualification: 'Diploma, Information Technology', period: '2010 to 2013' },
];

/**
 * Credentials, newest first.
 *
 * `url` is a verification page and it is empty wherever one does not exist.
 * It is never guessed: a dead or wrong verification link is worse than none,
 * because it invites a check that then fails. CONTENT-PRINCIPLES.md section 1
 * covers this, and /certifications/ only renders a link where the string is
 * non-empty.
 */
export const CERTIFICATIONS = [
  {
    name: 'Generative AI Certification',
    issuer: 'IBM & AcceleratorX',
    date: 'Nov 2026',
    /* No verification URL. One was not supplied, and inventing a credential
       verification link is the single worst fabrication available on a page
       like this. Add it here the day it is to hand. */
    url: '',
  },
  { name: 'Magento Appreciation', issuer: 'Parul University', date: 'Sep 2022', url: '' },
  { name: 'Magento', issuer: 'TOPS Technologies', date: '', url: '' },
  { name: 'PHP', issuer: 'TOPS Technologies', date: '', url: '' },
  { name: 'Copilot for Startups', issuer: 'Microsoft', date: '', url: '' },
  {
    name: 'Create your e-commerce store with Shopify',
    issuer: 'Coursera Project Network',
    date: 'Oct 2025',
    url: 'https://www.coursera.org/account/accomplishments/verify/XOAZTN8GS5HM',
  },
  {
    name: 'AWS S3 Basics',
    issuer: 'Coursera Project Network',
    date: 'Oct 2025',
    url: 'https://www.coursera.org/account/accomplishments/verify/FXRLTIZN71KI',
  },
];

export const BUSINESS_MODEL_DETAIL = [
  { model: 'B2B', note: 'Procurement platforms, quote and approval workflows, role-based account structures, ERP connectivity.' },
  { model: 'B2C', note: 'High-traffic retail catalogues, checkout optimisation and conversion work across grocery, fashion and fitness.' },
  { model: 'D2C', note: 'Brand-owned storefronts on Shopify and Magento with bespoke product experiences and one-page checkout.' },
  { model: 'Marketplace', note: 'Multi-vendor and multi-category catalogues, vendor management and large-scale product data.' },
];

export const FOOTER_NAV = [
  { label: 'Home', href: '/', active: true },
  { label: 'About', href: '/about/' },
  { label: 'Expertise', href: '/expertise/' },
  { label: 'Work', href: '/work/' },
  { label: 'Insights', href: '/insights/' },
  { label: 'Contact', href: '/contact/' },
];

/**
 * Footer expertise column. Every entry previously linked to `/#services`, an
 * anchor the redesigned homepage does not render, so all six landed at the top
 * of the page. Each now points at the section or article that actually covers
 * it, and the label is the anchor text rather than a generic one.
 */
export const FOOTER_EXPERTISE = [
  { label: 'Magento & Adobe Commerce', href: '/magento/' },
  { label: 'Shopify & Shopify Plus', href: '/shopify/' },
  { label: 'Headless Commerce', href: '/headless-commerce/' },
  { label: 'eCommerce SEO', href: '/insights/magento2-seo-technical-audit/' },
  { label: 'CRO & Performance', href: '/insights/cro-double-conversion/' },
  { label: 'AI Automation', href: '/ai-automation/' },
];

const TOPIC_LABELS: Record<string, string> = {
  'magento-2': 'Magento 2',
  shopify: 'Shopify',
  'seo-cro': 'SEO & CRO',
  'ai-automation': 'AI & Automation',
  'aws-server': 'AWS & Server',
  wordpress: 'WordPress',
  performance: 'Performance',
};

export const FOOTER_TOPICS = Object.entries(
  Object.values(POSTS).reduce<Record<string, number>>((acc, p) => {
    acc[p.filter] = (acc[p.filter] ?? 0) + 1;
    return acc;
  }, {}),
)
  .map(([filter, count]) => ({ label: TOPIC_LABELS[filter] ?? filter, filter, count }))
  .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));

/** Total published articles. Drives the count the footer prints. */
export const POST_COUNT = Object.keys(POSTS).length;
