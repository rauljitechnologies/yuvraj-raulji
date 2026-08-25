/**
 * Content model for the 3D homepage.
 *
 * Every string here traces back to something already verified in lib/site.ts
 * (experience, capabilities, case studies) or to lib/posts.ts. Nothing is
 * invented: no results, no revenue figures, no client counts, no awards, no
 * fabricated project "challenge / solution" narratives. Where the record does
 * not contain a field the brief asked for, the field is simply absent rather
 * than filled in — see CONTENT-PRINCIPLES.md.
 *
 * Copy written for this page avoids em-dashes on purpose.
 */

/* ═══════════════════════════════════════════════════════════════
   SCENE ORDER
   The DOM sections and the 3D modules share these ids. The camera rig
   walks them in array order, so this list is the single source of truth
   for the journey.
   ═══════════════════════════════════════════════════════════════ */

export const SCENES = [
  'hero',
  'philosophy',
  'commerce',
  'intelligence',
  'expertise',
  'work',
  'technology',
  'experience',
  'insights',
  'statement',
  'contact',
] as const;

export type SceneId = (typeof SCENES)[number];

export const sceneIndex = (id: SceneId) => SCENES.indexOf(id);

/* ═══════════════════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════════════════ */

export const UNIVERSE_NAV = [
  { label: 'About', href: '/about/' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Work', href: '#work' },
  { label: 'Insights', href: '#insights' },
  { label: 'Contact', href: '#contact' },
] as const;

/* ═══════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════ */

export const HERO = {
  eyebrow: 'Yuvraj Raulji',
  /** The single H1 on the page. */
  headline: 'I build the technology behind modern commerce.',
  roles: [
    'E-commerce Consultant',
    'Digital Commerce Architect',
    'AI & Automation Strategist',
  ],
  lede:
    'I help ambitious businesses build, modernize and scale digital commerce through technology, automation and intelligent digital systems.',
  ctaPrimary: 'Work with me',
  ctaSecondary: 'Explore my work',
  /**
   * Both strings already appear in the site footer, so the hero card states
   * nothing the page did not already say. `base` is the location from
   * lib/site.ts, shortened to fit a one-line status row.
   */
  availability: 'Available for new projects',
  base: 'Vadodara, India · IST',
} as const;

/**
 * The line spoken in the founder intro. Rendered as a caption track so the
 * sequence still communicates when it autoplays muted, which is what every
 * browser will do on first load.
 */
export const FOUNDER_LINE = 'I build technology that helps modern businesses grow.';

/**
 * Verified credibility strip. These four figures are the ones lib/site.ts
 * records as confirmed (9+ years, 50+ projects, catalogue and traffic scale
 * from the Nxtby engagement). Nothing new has been added.
 */
export const CREDIBILITY = [
  { value: '9+', label: 'Years in commerce' },
  { value: '50+', label: 'Projects delivered' },
  { value: '500K+', label: 'SKUs managed' },
  { value: '1M+', label: 'Monthly users' },
] as const;

/* ═══════════════════════════════════════════════════════════════
   01 — PHILOSOPHY
   ═══════════════════════════════════════════════════════════════ */

export const PHILOSOPHY = {
  eyebrow: 'Philosophy',
  headline: 'Technology should move the business forward.',
  body:
    'I approach technology from the business problem first, then build the architecture, systems and automation required to solve it.',
  support:
    'Platform choice, integration boundaries and automation are commercial decisions before they are technical ones. The stack follows the business case, not the other way round.',
} as const;

/* ═══════════════════════════════════════════════════════════════
   02 — COMMERCE
   Node labels double as the 3D object labels. `note` is what the
   hover panel reveals.
   ═══════════════════════════════════════════════════════════════ */

export interface CommerceNode {
  id: string;
  label: string;
  note: string;
  /** Unit-sphere-ish layout seed, resolved into world space in the module. */
  pos: [number, number, number];
  size: number;
}

export const COMMERCE = {
  eyebrow: 'Section 02 / Commerce',
  headline: 'Building digital commerce that scales.',
  body:
    'Multi-store catalogues, B2B workflows and integration surfaces that stay maintainable as order volume grows.',
} as const;

export const COMMERCE_NODES: CommerceNode[] = [
  { id: 'magento', label: 'Magento 2', note: 'Enterprise builds, custom modules, multi-store and B2B workflows.', pos: [-4.6, 1.5, 0.4], size: 1.15 },
  { id: 'shopify', label: 'Shopify', note: 'Shopify and Shopify Plus storefronts, theme architecture, international scaling.', pos: [4.3, 2.0, -1.1], size: 1.05 },
  { id: 'headless', label: 'Headless', note: 'API-first commerce layers that decouple the storefront from the release cycle.', pos: [0.2, 3.3, 1.4], size: 1.0 },
  { id: 'nextjs', label: 'Next.js', note: 'Typed, componentized front-end architecture built to stay maintainable.', pos: [-2.9, -1.9, 1.8], size: 0.92 },
  { id: 'graphql', label: 'GraphQL', note: 'Contract-first data access between storefront and commerce services.', pos: [3.2, -2.3, 1.2], size: 0.9 },
  { id: 'api', label: 'API', note: 'Integration boundaries and service contracts defined before code is written.', pos: [-5.4, -0.6, -1.6], size: 0.86 },
  { id: 'crm', label: 'CRM', note: 'Customer and lifecycle data wired to the same event stream that powers reporting.', pos: [5.2, -0.3, 1.9], size: 0.82 },
  { id: 'erp', label: 'ERP', note: 'Catalogue, pricing and order sync against the systems the business already runs.', pos: [1.4, -3.4, -0.9], size: 0.86 },
  { id: 'data', label: 'Data', note: 'GA4, GTM and server-side events, so reporting reflects what actually happened.', pos: [-1.6, 2.2, -2.4], size: 0.88 },
];

/* ═══════════════════════════════════════════════════════════════
   03 — AI + AUTOMATION
   ═══════════════════════════════════════════════════════════════ */

export const INTELLIGENCE = {
  eyebrow: 'Section 03 / Intelligence',
  headline: 'Turning complexity into intelligence.',
  body:
    'AI and automation can transform how digital businesses operate, from workflows and customer experiences to data and decision-making.',
  chain: ['Data', 'Intelligence', 'Automation'],
  /** Drawn from CAPABILITIES 13 and 14 in lib/site.ts. */
  points: [
    {
      title: 'Applied generative AI',
      note: 'Content workflows, product discovery and internal operations wired into real systems through n8n and API integrations, rather than left as demos.',
    },
    {
      title: 'Agentic systems',
      note: 'Where generative AI produces output, agentic AI reasons, plans and executes multi-step tasks inside defined systems, with explicit scope, tool access and human checkpoints.',
    },
  ],
} as const;

/* ═══════════════════════════════════════════════════════════════
   04 — EXPERTISE ORBIT
   ═══════════════════════════════════════════════════════════════ */

export interface OrbitItem {
  num: string;
  label: string;
  note: string;
}

export const EXPERTISE = {
  eyebrow: 'Section 04 / Expertise',
  headline: 'One practice, six orbits.',
  body:
    'Strategy, architecture, platform and growth work that connects rather than sitting in separate silos.',
} as const;

export const ORBIT_ITEMS: OrbitItem[] = [
  { num: '01', label: 'E-commerce', note: 'Magento 2, Adobe Commerce, Shopify Plus and WooCommerce builds across B2B, B2C, D2C and marketplace models.' },
  { num: '02', label: 'Headless', note: 'API-first storefronts on Next.js, GraphQL and PWA Studio, decoupled from the commerce back end.' },
  { num: '03', label: 'AI', note: 'Where AI genuinely changes unit economics, and where it is an expensive distraction, decided before any build starts.' },
  { num: '04', label: 'Automation', note: 'Order, quote and approval workflows automated through n8n and API integration inside defined rules.' },
  { num: '05', label: 'Performance', note: 'Caching layers, CDN configuration, image pipelines and database tuning, measured against Core Web Vitals.' },
  { num: '06', label: 'Transformation', note: 'Legacy stacks replaced with cloud-native, API-first ecosystems, sequenced so trading continues throughout.' },
];

/* ═══════════════════════════════════════════════════════════════
   05 — SELECTED WORK

   Only fields the record actually supports. The brief asked for
   "Challenge / Solution" per project; the verified record contains a
   scope line and a platform, not a documented problem statement, so
   `scope` carries what is known and nothing is written to fill the gap.
   `role` appears only for Nxtby, which is an employer relationship with
   a documented title in lib/site.ts, not a client engagement.
   ═══════════════════════════════════════════════════════════════ */

export interface WorkItem {
  id: string;
  title: string;
  industry: string;
  tech: string;
  scope: string;
  role?: string;
  img: string;
  url: string;
}

export const WORK = {
  eyebrow: 'Section 05 / Selected work',
  headline: 'Built, migrated and scaled.',
  body: 'A selection of commerce platforms delivered across fashion, B2B procurement, grocery, fitness and manufacturing.',
} as const;

export const WORK_ITEMS: WorkItem[] = [
  {
    id: 'powerlook',
    title: 'Powerlook',
    industry: 'Fashion',
    tech: 'Headless commerce',
    scope: 'High-performance headless commerce architecture for a fast-growing men’s fashion brand.',
    img: '/assets/case-covers/powerlook-cover.webp',
    url: '/work/',
  },
  {
    id: 'future-roots',
    title: 'Future Roots',
    industry: 'D2C plants',
    tech: 'Shopify',
    scope: 'Shopify storefront with OTP login, GoKwik one-page checkout and custom product detail pages.',
    img: '/assets/case-covers/future-roots-cover.webp',
    url: '/work/',
  },
  {
    id: 'nxtby',
    title: 'Nxtby',
    industry: 'B2B procurement',
    tech: 'Magento 2, custom platform',
    scope:
      'B2B procurement platform with multi-level purchase approval, quote management and role-based accounts.',
    role: 'Team Leader, Nxtby.com',
    img: '/assets/case-covers/nxtby-cover.webp',
    url: '/work/',
  },
  {
    id: 'al-jazira',
    title: 'Al Jazira Supermarket',
    industry: 'Grocery',
    tech: 'Magento 2',
    scope: 'Magento 2 grocery commerce serving thousands of supermarket products online.',
    img: '/assets/case-covers/al-jazira-supermarket-cover.webp',
    url: '/work/',
  },
  {
    id: 'sure-safety',
    title: 'Sure Safety',
    industry: 'Industrial safety',
    tech: 'Magento 2',
    scope: 'Magento 2 commerce for a manufacturer of PPE and industrial safety equipment.',
    img: '/assets/case-covers/sure-safety-cover.webp',
    url: '/work/',
  },
  {
    id: 'shopunicore',
    title: 'ShopUnicore',
    industry: 'Marketplace',
    tech: 'Magento 2',
    scope: 'A scalable Magento 2 platform powering a wide multi-category retail catalogue.',
    img: '/assets/case-covers/shopunicore-cover.webp',
    url: '/work/',
  },
];

/* ═══════════════════════════════════════════════════════════════
   06 — TECHNOLOGY
   Orbit ring assignment drives the 3D layout; no proficiency scores.
   ═══════════════════════════════════════════════════════════════ */

export interface TechOrbiter {
  label: string;
  /** 0 = innermost ring. */
  ring: 0 | 1 | 2;
}

export const TECHNOLOGY = {
  eyebrow: 'Section 06 / Technology',
  headline: 'The stack, and why each piece is there.',
  body:
    'Platforms, infrastructure and measurement chosen for the job in front of them. No scores, no percentages: the case studies are the evidence.',
  groups: [
    { title: 'Commerce', items: ['Magento 2 / Adobe Commerce', 'Shopify & Shopify Plus', 'WordPress & WooCommerce', 'Headless commerce'] },
    { title: 'Cloud & infrastructure', items: ['AWS (EC2, S3, CloudFront)', 'Nginx / Apache', 'Redis & Varnish', 'MySQL / PostgreSQL', 'Elasticsearch'] },
    { title: 'Frontend', items: ['Next.js / React', 'TypeScript', 'GraphQL', 'Tailwind CSS'] },
    { title: 'AI & automation', items: ['OpenAI APIs', 'Claude (Anthropic)', 'n8n', 'Python / API integration'] },
    { title: 'Measurement', items: ['GA4', 'Google Tag Manager', 'Search Console', 'Core Web Vitals'] },
    { title: 'DevOps', items: ['Git / GitHub', 'Docker', 'CI/CD', 'Cloudflare', 'Linux'] },
  ],
} as const;

export const TECH_ORBITERS: TechOrbiter[] = [
  { label: 'Magento', ring: 0 },
  { label: 'Shopify', ring: 0 },
  { label: 'Next.js', ring: 0 },
  { label: 'React', ring: 1 },
  { label: 'Node.js', ring: 1 },
  { label: 'PHP', ring: 1 },
  { label: 'GraphQL', ring: 1 },
  { label: 'AWS', ring: 2 },
  { label: 'Redis', ring: 2 },
  { label: 'AI', ring: 2 },
  { label: 'n8n', ring: 2 },
  { label: 'GA4', ring: 2 },
];

/* ═══════════════════════════════════════════════════════════════
   07 — EXPERIENCE
   Mirrors EXPERIENCE in lib/site.ts. Kept as its own list so the
   timeline can carry a short label without editing the About page data.
   ═══════════════════════════════════════════════════════════════ */

export interface Milestone {
  period: string;
  title: string;
  org: string;
  location: string;
  summary: string;
  points: string[];
}

export const EXPERIENCE_SECTION = {
  eyebrow: 'Section 07 / Experience',
  headline: 'Nine years, one throughline.',
  body: 'Magento from 2016 onward, then platform breadth, infrastructure, measurement and AI layered on top of it.',
} as const;

export const MILESTONES: Milestone[] = [
  {
    period: '2016 to 2018',
    title: 'Magento Developer to Sr. Magento Developer',
    org: 'Sinelogix Technologies',
    location: 'Vadodara',
    summary: 'Where the Magento work started: module development and store builds.',
    points: [],
  },
  {
    period: '2018',
    title: 'Software Engineer',
    org: 'OrionCoders Digital',
    location: 'Vadodara',
    summary: 'Shopify development for consumer brands, including skincare storefronts for Unilever.',
    points: [
      'Customised Shopify storefronts with third-party app and API integration',
      'First hands-on exposure to Magento 2 and multi-platform commerce architecture',
    ],
  },
  {
    period: '2018 to 2021',
    title: 'Sr. Magento 2 Full Stack Developer',
    org: 'Magneto IT Solutions',
    location: 'Ahmedabad',
    summary: 'Commerce builds for Saudi Arabian retail: grocery, commercial kitchen equipment and fashion.',
    points: [
      'B2B and B2C stores localised for the Saudi market',
      'Layered navigation, dynamic pricing and custom checkout flows',
      'Headless frontends over REST and GraphQL for mobile and PWA',
    ],
  },
  {
    period: '2020 to 2022',
    title: 'Sr. Magento Developer',
    org: 'Nxtby.com',
    location: 'Bengaluru, remote',
    summary: 'Full-stack Magento 2 development for high-traffic B2B commerce.',
    points: [
      'Automated 90% of B2B order and quote processes, reducing approval cycle time by 40%',
      'Improved site speed by 60% through Varnish, Redis, full-page cache, CDN and database tuning',
      'Magento 2 server setup on AWS: EC2, RDS, S3, load balancing and auto-scaling',
    ],
  },
  {
    period: '2023 to now',
    title: 'Team Leader',
    org: 'Nxtby.com',
    location: 'Bengaluru, remote',
    summary: 'Leading a development team across Magento 2 and multi-platform commerce builds.',
    points: [
      'Led delivery of 12+ multi-store Magento 2 platforms handling 500K+ SKUs and 1M+ monthly users',
      'Cut development cycle time by 30% with structured workflows and approval processes',
      'Designed 5-level approval workflows for development, B2B orders, quotes and vendor management',
    ],
  },
];

/** Concurrent positions, stated as they appear in the professional record. */
export const CURRENT_POSITIONS = [
  { title: 'Director & Founder', org: 'Raulji Technologies Pvt. Ltd.' },
  { title: 'Chairman', org: 'Raulji Group' },
  { title: 'Founder', org: 'Ariya InfoTech' },
] as const;

/* ═══════════════════════════════════════════════════════════════
   08 — INSIGHTS
   Slugs must exist in lib/posts.ts and content/articles/.
   ═══════════════════════════════════════════════════════════════ */

export const INSIGHTS = {
  eyebrow: 'Section 08 / Insights',
  headline: 'Thinking about what’s next.',
  body: 'Working notes on commerce architecture, performance, AI and the platforms underneath them.',
} as const;

export const INSIGHT_SLUGS = [
  'ai-ecommerce-revenue-2025',
  'magento2-seo-technical-audit',
  'shopify-headless-nextjs-guide',
  'magento2-pwa-studio-headless',
  'cro-double-conversion',
  'aws-magento2-server-setup',
] as const;

/* ═══════════════════════════════════════════════════════════════
   09 — FOUNDER STATEMENT
   ═══════════════════════════════════════════════════════════════ */

export const STATEMENT = {
  lines: ['Build systems that don’t just work today.', 'Build systems ready for tomorrow.'],
  signature: 'Yuvraj Raulji',
} as const;

/* ═══════════════════════════════════════════════════════════════
   FINAL — CONTACT
   ═══════════════════════════════════════════════════════════════ */

export const CONTACT_SECTION = {
  eyebrow: 'Contact',
  headline: 'Let’s build something significant.',
  body: 'Have a complex commerce, technology or AI challenge? Let’s talk.',
  primary: 'Start a conversation',
  secondary: 'Connect on LinkedIn',
} as const;
