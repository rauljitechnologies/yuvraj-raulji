/**
 * Homepage content, imported from the Claude Design canvas
 * "Yuvraj Raulji - Homepage.dc.html" (project 76be536d).
 *
 * The mockup carried its data in a `renderVals()` block on the canvas runtime.
 * That runtime does not exist here, so the same values live as typed constants
 * and the sections read them at module scope. Nothing here is fetched, so every
 * section stays a server component and the whole page prerenders to static HTML.
 *
 * Copy note: the mockup's prose used em-dashes throughout. They are replaced
 * here with commas, colons and full stops, per the standing rule that site copy
 * carries no em-dashes.
 */

/** Portrait used by a section. Kept here so swapping a file is a one-line edit. */
export const PORTRAITS = {
  /**
   * The canvas project also holds `yr-hero.png` and `yr-quote.png`. Both exceed
   * the 256 KiB read cap on the design API and came back truncated, so the two
   * complete files stand in for all four slots. Drop the real PNGs into
   * `public/assets/home/` and repoint `hero` and `quote` when they are exported.
   */
  hero: '/assets/home/yr-about.jpg',
  about: '/assets/home/yr-about.jpg',
  quote: '/assets/home/yr-contact.jpg',
  contact: '/assets/home/yr-contact.jpg',
} as const;

export const CONTACT = {
  email: 'hello@yuvrajraulji.com',
  phone: '+91 9898 334 731',
  phoneHref: 'tel:+919898334731',
  whatsapp: 'https://wa.me/919898334731',
  linkedin: 'https://www.linkedin.com/in/yuvraj-raulji/',
  instagram: 'https://www.instagram.com/iamyuvrajraulji',
  facebook: 'https://www.facebook.com/iamyuvrajraulji',
  location: 'Vadodara, Gujarat, India',
  timezone: 'IST · GMT+5:30',
} as const;

export const HERO = {
  eyebrow: '01 — Yuvraj Raulji',
  lead:
    'End-to-end technology consulting for companies and agencies: eCommerce platforms, mobile apps, custom software and AI-driven systems. 12+ years, 15+ brands, and an operating belief that every layer of a modern business should be AI-driven by design, not retrofitted later.',
  marquee: [
    'Magento 2',
    'Shopify',
    'Headless commerce',
    'AI & automation',
    'SEO',
    'Digital transformation',
  ],
} as const;

export type Stat = { value: string; label: string };

export const STATS: readonly Stat[] = [
  { value: '12+', label: 'Years in technology' },
  { value: '12+', label: 'Multi-store Magento 2 platforms' },
  { value: '500K+', label: 'SKUs under architecture' },
  { value: '1M+', label: 'Monthly users served' },
];

export type SystemCard = {
  no: string;
  title: string;
  body: string;
  tags: readonly string[];
};

export const SYSTEMS: readonly SystemCard[] = [
  {
    no: '01',
    title: 'Commerce systems',
    body: 'The platform is rarely the problem. It is where the problem becomes visible, usually as a catalogue, a checkout, or an architecture that has outgrown the decision behind it.',
    tags: ['Magento 2', 'Shopify', 'WooCommerce', 'Headless'],
  },
  {
    no: '02',
    title: 'Digital architecture',
    body: 'Frontends over REST and GraphQL, caching that holds under traffic, and infrastructure sized to the order book rather than to the pitch deck.',
    tags: ['Next.js', 'GraphQL', 'AWS', 'Varnish · Redis'],
  },
  {
    no: '03',
    title: 'Growth systems',
    body: 'A beautiful store means nothing if the customer journey is broken. Search, speed and checkout are the growth levers people keep looking past.',
    tags: ['Technical SEO', 'CRO', 'Performance', 'GA4'],
  },
  {
    no: '04',
    title: 'AI systems',
    body: 'Where language models stop being a demo and start being infrastructure: grounded in real data, scoped to real tasks, checked by a person before anything consequential happens.',
    tags: ['AI agents', 'RAG', 'MCP', 'Automation'],
  },
];

export type Project = {
  no: string;
  short: string;
  name: string;
  industry: string;
  challenge: string;
  role: string;
  stack: string;
  /** Cover already in `public/assets/case-covers`, or null for the ghost tile. */
  cover: string | null;
};

export const PROJECTS: readonly Project[] = [
  {
    no: '01',
    short: 'PWL',
    name: 'Powerlook',
    industry: 'Fashion · D2C',
    challenge:
      'A fast-growing fashion brand whose storefront had to keep getting faster while the catalogue and traffic behind it kept moving.',
    role: 'Architecture + delivery',
    stack: 'Magento 2 · Next.js · Varnish',
    cover: '/assets/case-covers/powerlook-cover.webp',
  },
  {
    no: '02',
    short: 'FR',
    name: 'Future Roots',
    industry: 'Horticulture · D2C',
    challenge:
      'An online plant store selling a product that is fragile, seasonal and hard to photograph, to customers who abandon at any friction in the buy.',
    role: 'Commerce build',
    stack: 'Shopify · CRO',
    cover: '/assets/case-covers/future-roots-cover.webp',
  },
  {
    no: '03',
    short: 'S3',
    name: 'S3Buy',
    industry: 'Health & fitness',
    challenge:
      'Sports nutrition is a category where authenticity is the purchase decision and delivery speed is the repeat one. The storefront has to carry both.',
    role: 'Platform + growth',
    stack: 'Magento 2 · SEO',
    cover: '/assets/case-covers/s3buy-cover.webp',
  },
  {
    no: '04',
    short: 'NXT',
    name: 'Nxtby',
    industry: 'B2B procurement',
    challenge:
      'B2B buying is not a cart. It is a request, a quote, an approval chain and a budget holder, and a consumer checkout models none of that.',
    role: 'Systems architecture',
    stack: 'Magento 2 · Workflows · API',
    cover: '/assets/case-covers/nxtby-cover.webp',
  },
  {
    no: '05',
    short: 'SU',
    name: 'ShopUnicore',
    industry: 'Marketplace',
    challenge:
      'A wide multi-category catalogue, which is the point at which catalogue size stops being a number and starts being an architecture problem.',
    role: 'Architecture direction',
    stack: 'Magento 2 multi-store · Redis',
    cover: '/assets/case-covers/shopunicore-cover.webp',
  },
  {
    no: '06',
    short: 'SWS',
    name: 'Synergy Water Slides',
    industry: 'Manufacturing',
    challenge:
      'An engineering manufacturer whose buyers research for months and never fill in a form, on a site that search could not read.',
    role: 'Technical SEO + build',
    stack: 'WordPress · Schema · GA4',
    cover: '/assets/case-covers/synergy-water-slides-cover.webp',
  },
];

/** The light-ground featured case study. */
export const FEATURED = {
  name: 'POWERLOOK',
  kicker: 'Headless commerce',
  cover: '/assets/case-covers/powerlook-cover.webp',
  facts: [
    {
      label: 'Challenge',
      body: 'A fast-growing fashion brand whose storefront had to keep getting faster while the catalogue and the traffic behind it kept moving.',
    },
    {
      label: 'Architecture',
      body: 'A decoupled storefront over the commerce API, with caching pushed to the edge of every layer that could hold it.',
    },
    {
      label: 'My role',
      body: 'Architecture direction and delivery: platform decisions, performance strategy and the engineering behind them.',
    },
    {
      label: 'Performance',
      body: 'Varnish, Redis, full-page cache and database tuning, the same stack that cut page load times by 60% on high-traffic B2B commerce.',
    },
    {
      label: 'Outcome',
      body: 'A storefront that scales with the catalogue instead of against it. Detailed metrics on request rather than on a marketing page.',
    },
  ],
  tech: ['Magento 2', 'Next.js', 'React', 'GraphQL', 'Redis', 'Varnish', 'Cloud'],
} as const;

export type StackLayer = { no: string; title: string; items: readonly string[] };

export const STACK_LAYERS: readonly StackLayer[] = [
  {
    no: '01',
    title: 'Commerce layer',
    items: ['Magento 2', 'Shopify Plus', 'WooCommerce', 'Headless storefronts'],
  },
  {
    no: '02',
    title: 'Experience layer',
    items: ['Next.js', 'React', 'GraphQL', 'AI search'],
  },
  {
    no: '03',
    title: 'Platform layer',
    items: ['Node.js', 'PHP', 'MySQL', 'Redis · Varnish'],
  },
  {
    no: '04',
    title: 'Growth & intelligence',
    items: ['AWS · Cloudflare', 'GA4 · Analytics', 'Technical SEO', 'AI & automation'],
  },
];

export type AiTrack = { no: string; name: string; note: string };

export const AI_TRACKS: readonly AiTrack[] = [
  { no: '01', name: 'AI agents', note: 'Bounded work against real systems, with the tool boundary drawn on purpose.' },
  { no: '02', name: 'LLM apps', note: 'Past the benchmark table: context, instruction following, cost at volume.' },
  { no: '03', name: 'RAG', note: 'Retrieval that returns the right passage, and grounding you can audit.' },
  { no: '04', name: 'Automation', note: 'The parts of an operation that absorb people who should be doing something else.' },
  { no: '05', name: 'AI search', note: 'Discovery when the query is a sentence and the answer is a recommendation.' },
  { no: '06', name: 'GEO', note: 'Being the answer a model recommends, not only the result that ranks.' },
  { no: '07', name: 'Content systems', note: 'Catalogue enrichment that survives human review.' },
  { no: '08', name: 'Business intelligence', note: 'Decisions carried by data instead of by the loudest opinion in the room.' },
];

export type Engagement = { no: string; name: string; note: string };

export const ENGAGEMENTS: readonly Engagement[] = [
  { no: '01', name: 'eCommerce platforms', note: 'Magento 2, Shopify Plus, headless: B2B, B2C, D2C and marketplace.' },
  { no: '02', name: 'Mobile apps', note: 'App architecture and the commerce APIs behind it: REST, GraphQL, PWA.' },
  { no: '03', name: 'Custom software', note: 'Internal tools, approval workflows, ERP/CRM/POS integration.' },
  { no: '04', name: 'AI systems', note: 'Agents, RAG and automation wired into the operation, not bolted on.' },
  { no: '05', name: 'Cloud & DevOps', note: 'AWS, Docker, CI/CD, Varnish/Redis/CDN, scaled to real traffic.' },
  { no: '06', name: 'Fractional CTO', note: 'Architecture direction and team leadership for companies and agencies.' },
];

export type TimelineEntry = { year: string; title: string; org: string; body: string };

export const TIMELINE: readonly TimelineEntry[] = [
  {
    year: '2010–13',
    title: 'Foundations',
    org: 'Education',
    body: 'Six years of formal study in information technology, diploma in 2010, degree in 2013. The point at which this stopped being a hobby.',
  },
  {
    year: '2016',
    title: 'Founder, Ariya InfoTech',
    org: 'Ariya InfoTech · 2016–2025',
    body: 'Started my own consultancy in Vadodara and never closed it. Magento 2 full-stack and headless commerce for B2B, B2C, D2C and marketplace brands, plus MoEngage, WebEngage and multi-currency gateway work.',
  },
  {
    year: '2016',
    title: 'Magento, professionally',
    org: 'Sinelogix Technologies · 2016–2018',
    body: 'Magento developer, then Sr. Magento developer: module development and store builds. The platform that turns a catalogue into an architecture problem.',
  },
  {
    year: '2018',
    title: 'Shopify at brand scale',
    org: 'OrionCoders Digital · 2018',
    body: 'Shopify development for top brands including Unilever face and skincare stores: custom storefronts, app and gateway integrations, and my first exposure to Salesforce Commerce Cloud.',
  },
  {
    year: '2018',
    title: 'Saudi retail, full-stack',
    org: 'Magneto IT Solutions · 2018–2021',
    body: 'Sr. Magento 2 full-stack developer for leading Saudi brands, Haymart, Kawader and Aljazira Supermarkets, across grocery, commercial kitchen equipment and fashion. Mobile app APIs, custom payment gateways, multi-vendor and multi-store.',
  },
  {
    year: '2020',
    title: 'B2B systems & performance',
    org: 'Nxtby.com · 2020–2022',
    body: 'Five-level approval workflows, B2B order and quote management with role-based permissions, AWS setup with EC2/RDS/auto-scaling. 90% of order and quote processing automated; approval cycles down 40%; page load down 60%.',
  },
  {
    year: '2023',
    title: 'Leading the team',
    org: 'Nxtby.com · 2023–present',
    body: 'Team Lead: architecture guidance, code review and mentorship across 12+ multi-store Magento 2 platforms carrying 500K+ SKUs and 1M+ monthly users. Structured workflows cut development cycle time by 30%.',
  },
  {
    year: 'Now',
    title: 'Fully AI-driven',
    org: 'Consulting',
    body: 'Every layer of the stack designed AI-first: agents, retrieval and automation aimed at the parts of a company that absorb people who should be doing something else, for companies and agencies planning their next phase of growth.',
  },
];

/** What the contact form's subject select offers. */
export const ENQUIRY_TOPICS: readonly string[] = [
  'A commerce platform decision',
  'A replatforming or migration',
  'A slow store, or checkout drop-off',
  'An AI idea I want a second opinion on',
  'Automating a process that eats people',
  'A technology strategy conversation',
];
