/**
 * All copy/content previously hardcoded inside app/_html/home.html — either as
 * literal markup or inside Alpine `x-data` blobs. Extracted verbatim.
 */

import type { IconName } from '../components/ui/icons';
import { POSTS } from './posts';

export const CONTACT = {
  email: 'toyuvrajraulji@gmail.com',
  phoneDisplay: '+91 9898 334 731',
  phoneE164: '+919898334731',
  whatsapp: 'https://wa.me/919898334731?text=Hi%20Yuvraj%2C%20I%27d%20like%20to%20discuss%20a%20project.',
  linkedin: 'https://www.linkedin.com/in/yuvraj-raulji/',
  instagram: 'https://www.instagram.com/iamyuvrajraulji',
  facebook: 'https://www.facebook.com/iamyuvrajraulji',
  location: 'Vadodara, Gujarat, India',
} as const;

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
  alt: 'Yuvraj Raulji, working across AI, business and eCommerce',
} as const;

/** The same asset in the shape the `twitter.images` field takes. */
export const OG_IMAGE_URL = OG_IMAGE.url;

export const LEAD_ENDPOINT =
  'https://script.google.com/macros/s/AKfycby7S2OHkpqvM_HdKdivemmw6PGeYkKnH98eH7mw57iZ1gQyb_vENtxoUouQgu6aoK1WRg/exec';

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
  { label: 'Expertise', href: '/#expertise' },
  { label: 'Work', href: '/#work' },
  { label: 'Insights', href: '/blog/' },
] as const;

export const HERO_CHIPS = [
  { label: 'Magento 2 Expert', pos: 'top-[22%] left-[6%]' },
  { label: 'SEO & CRO Specialist', pos: 'top-[36%] right-[8%]' },
  { label: 'AWS & Server Setup', pos: 'bottom-[28%] left-[8%]' },
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

export interface WorkSlide {
  cat: string;
  title: string;
  desc: string;
  img: string;
  url: string;
}

export const WORK_SLIDES: WorkSlide[] = [
  {
    cat: 'Headless Commerce · Fashion',
    title: 'Headless fashion storefront',
    desc: 'High-performance headless commerce architecture for India’s fastest-growing men’s fashion brand.',
    img: '/assets/case-covers/fashion-d2c-cover.jpg',
    url: '/work/',
  },
  {
    cat: 'Magento 2 · Marketplace',
    title: 'Multi-category marketplace',
    desc: 'A scalable Magento 2 platform powering a wide multi-category retail catalogue.',
    img: '/assets/case-covers/marketplace-cover.jpg',
    url: '/work/',
  },
  {
    cat: 'E-Commerce · Health & Fitness',
    title: 'Sports nutrition store',
    desc: 'Online fitness and supplement store delivering authentic sports nutrition at speed.',
    img: '/assets/case-covers/sports-nutrition-cover.jpg',
    url: '/work/',
  },
  {
    cat: 'Magento 2 · Textiles',
    title: 'Fabric retail storefront',
    desc: 'A powerful, flexible Magento 2 commerce build for a premium fabric retailer.',
    img: '/assets/case-covers/fabric-retail-cover.jpg',
    url: '/work/',
  },
  {
    cat: 'Shopify · D2C',
    title: 'Online plant store',
    desc: 'India’s most trusted online plant store on Shopify — OTP login, GoKwik one-page checkout, custom PDPs.',
    img: '/assets/case-covers/plant-store-cover.jpg',
    url: '/work/',
  },
  {
    cat: 'Magento 2 · Fabrics',
    title: 'Fabric gallery storefront',
    desc: 'High-performance Magento 2 storefront serving fabric customers worldwide.',
    img: '/assets/case-covers/fabric-gallery-cover.jpg',
    url: '/work/',
  },
  {
    cat: 'Magento 2 · Luxury Fashion',
    title: 'Fashion retail storefront',
    desc: 'A Magento 2 flagship showcasing luxury African fashion collections.',
    img: '/assets/case-covers/fashion-retail-cover.jpg',
    url: '/work/',
  },
  {
    cat: 'Custom Platform · B2B',
    title: 'Procurement and approvals platform',
    desc: 'Scalable B2B procurement platform streamlining purchase requests and approvals.',
    img: '/assets/case-covers/b2b-procurement-cover.jpg',
    url: '/work/',
  },
  {
    cat: 'Web Platform · Manufacturing',
    title: 'Engineering manufacturer platform',
    desc: 'A modern engineering brand platform. 3x traffic growth and 45% better engagement.',
    img: '/assets/case-covers/manufacturing-cover.jpg',
    url: '/work/',
  },
  {
    cat: 'Magento 2 · Industrial Safety',
    title: 'Safety equipment store',
    desc: 'Magento 2 commerce for a leading manufacturer of PPE and industrial safety solutions.',
    img: '/assets/case-covers/safety-equipment-cover.jpg',
    url: '/work/',
  },
  {
    cat: 'Magento 2 · Grocery',
    title: 'Supermarket chain storefront',
    desc: 'Scalable Magento 2 grocery commerce serving thousands of supermarket products online.',
    img: '/assets/case-covers/supermarket-cover.jpg',
    url: '/work/',
  },
];

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

/**
 * The enquiry dropdown.
 *
 * Written as subjects to talk about rather than as services to buy. The
 * previous list was eight service names ("Magento 2 Development", "AWS &
 * Server Setup"), which turned the one modal on a personal site into a price
 * list with no prices, and made the first question a visitor answered
 * "which package am I choosing" rather than "what is my problem".
 *
 * They are also phrased as the situation, not the technology, because the
 * person filling this in usually knows the former and is guessing at the
 * latter.
 */
export const SERVICE_OPTIONS = [
  'An AI idea I want a second opinion on',
  'A commerce platform decision',
  'A replatforming or migration',
  'A store that is slow, or losing people at checkout',
  'Automating a process that eats people',
  'A technology strategy conversation',
];

/* ─────────────────────────────────────────────────────────────────────────────
   About page — every claim below traces to Yuvraj's own professional record.
   Confirmed 12 Aug 2026: 9+ years, 50+ projects, the B2B platform is an
   employer (not a client). Nothing here may be embellished; see
   CONTENT-PRINCIPLES.md.

   Employers and clients are described, not named. Section 4 of
   BRAND-DESIGN-GUIDELINE.md keeps corporate and historical brand names off
   this site. CURRENT_ROLES below is the one exception and is deliberately
   left as written: it renders nowhere, and it is the factual record.
   ───────────────────────────────────────────────────────────────────────────*/

export interface Role {
  title: string;
  org: string;
  period: string;
  location?: string;
  summary: string;
  points: string[];
}

/** Current positions held alongside the employed role. */
export const CURRENT_ROLES = [
  { title: 'Team Leader', org: 'Nxtby.com', period: 'Jan 2023 to present' },
  { title: 'Founder', org: 'Ariya InfoTech', period: 'Mar 2016 to Dec 2025' },
  { title: 'Director & Founder', org: 'Raulji Technologies Pvt. Ltd.', period: '' },
  { title: 'Chairman', org: 'Raulji Group', period: '' },
];

export const EXPERIENCE: Role[] = [
  {
    title: 'Team Leader',
    org: 'B2B commerce platform',
    period: 'Jan 2023 to present',
    location: 'Bengaluru · Remote',
    summary:
      'Leading a development team across Magento 2 and multi-platform commerce builds: architecture guidance, code review and delivery.',
    points: [
      'Led delivery of 12+ multi-store Magento 2 platforms handling 500K+ SKUs and 1M+ monthly users',
      'Cut development cycle time by 30% by introducing structured workflows and approval processes',
      'Designed 5-level approval workflows for development, B2B orders, quotes and vendor management',
      'Set architecture direction for multi-store setups, custom modules and B2B workflows',
      'Tuned server, caching, CDN and cloud infrastructure for performance and reliability',
    ],
  },
  {
    title: 'Sr. Magento Developer',
    org: 'B2B commerce platform',
    period: 'Mar 2020 to Dec 2022',
    location: 'Bengaluru · Remote',
    summary:
      'Full-stack Magento 2 development for high-traffic B2B commerce: custom modules, multi-store setups and end-to-end API integration.',
    points: [
      'Automated 90% of B2B order and quote processes, reducing approval cycle time by 40%',
      'Improved site speed by 60% through Varnish, Redis, full-page cache, CDN and database tuning',
      'Built B2B order and quote management with role-based permissions and multi-level approvals',
      'Ran Magento 2 server setup on AWS: EC2, RDS, S3, load balancing and auto-scaling',
      'Integrated payment gateways, logistics, CRM and ERP systems',
    ],
  },
  {
    title: 'Sr. Magento 2 Full Stack Developer',
    org: 'Commerce agency, Gulf retail',
    period: 'Jul 2018 to May 2021',
    location: 'Ahmedabad · On-site',
    summary:
      'Commerce builds for Saudi Arabian retail groups: grocery, commercial kitchen equipment and fashion.',
    points: [
      'Built B2B and B2C stores localised for the Saudi market',
      'Implemented layered navigation, dynamic pricing and custom checkout flows',
      'Delivered headless frontends over REST and GraphQL for mobile and PWA',
      'Integrated loyalty programmes, discount engines and customer dashboards',
    ],
  },
  {
    title: 'Software Engineer',
    org: 'Digital agency',
    period: 'Mar 2018 to Jul 2018',
    location: 'Vadodara',
    summary:
      'Shopify development for consumer brands, including skincare storefronts for a global personal-care group.',
    points: [
      'Built customised Shopify storefronts with third-party app and API integration',
      'Wrote custom JavaScript for dynamic product display and frontend behaviour',
      'First hands-on exposure to Magento 2 and multi-platform commerce architecture',
    ],
  },
  {
    title: 'Magento Developer → Sr. Magento Developer',
    org: 'Commerce agency',
    period: 'Jun 2016 to May 2018',
    location: 'Vadodara',
    summary: 'Where the Magento work started: module development and store builds.',
    points: [],
  },
];

export const TECH_PROFICIENCIES = [
  { group: 'Commerce', items: ['Magento 2 / Adobe Commerce', 'Shopify & Shopify Plus', 'WooCommerce', 'Headless & Composable'] },
  { group: 'Languages & Frameworks', items: ['PHP', 'Next.js', 'React.js', 'GraphQL'] },
  { group: 'Data & Search', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'RabbitMQ'] },
  { group: 'Infrastructure', items: ['AWS (EC2, S3, RDS)', 'Google Cloud', 'Azure', 'Docker', 'Jenkins', 'GitLab CI'] },
  { group: 'Measurement & Growth', items: ['GA4', 'GTM', 'MoEngage', 'WebEngage', 'Technical SEO'] },
];

export const EDUCATION = [
  { qualification: 'Bachelor of Engineering, Information Technology', period: '2013 to 2016' },
  { qualification: 'Diploma, Information Technology', period: '2010 to 2013' },
];

export const CERTIFICATIONS = [
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
  { label: 'Expertise', href: '/#expertise' },
  { label: 'Work', href: '/#work' },
  { label: 'Insights', href: '/blog/' },
  { label: 'Contact', href: '/#contact' },
];

/**
 * Footer expertise column. Every entry previously linked to `/#services`, an
 * anchor the redesigned homepage does not render, so all six landed at the top
 * of the page. Each now points at the section or article that actually covers
 * it, and the label is the anchor text rather than a generic one.
 */
export const FOOTER_EXPERTISE = [
  { label: 'Magento & Adobe Commerce', href: '/#expertise' },
  { label: 'Shopify & Shopify Plus', href: '/#expertise' },
  { label: 'Headless Commerce', href: '/blog/shopify-headless-nextjs-guide/' },
  { label: 'E-commerce SEO', href: '/blog/magento2-seo-technical-audit/' },
  { label: 'CRO & Performance', href: '/blog/cro-double-conversion/' },
  { label: 'AI Automation', href: '/blog/ai-ecommerce-revenue-2025/' },
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
