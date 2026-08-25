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
  /**
   * The section-01 eyebrow.
   *
   * Not the canvas string. The canvas writes the brand line with a
   * multiplication sign, which section 1 of BRAND-DESIGN-GUIDELINE.md bans;
   * the guideline outranks the canvas. The comma form is used here rather than
   * the pipe form because this line already carries two separators of its own
   * and a third would read as noise.
   */
  eyebrow: '01 / Yuvraj Raulji · AI, Business and eCommerce',
  /** The one-line statement under the H1. */
  subLead: 'AI, eCommerce and digital transformation for modern businesses.',
  /**
   * The longer lead paragraph is not here: the canvas links "AI" and
   * "eCommerce" inside the sentence to #ai and #expertise, so it is JSX and it
   * lives in hero.tsx rather than as a string that a component would have to
   * split apart to re-link.
   */
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

/**
 * The four tiles under the position statement.
 *
 * Tiles 2 to 4 are the canvas values. Two tiles previously both read "12+",
 * which reads as a rendering bug rather than as two facts, and the canvas stat
 * that had been dropped (90% of B2B order and quote processing automated at
 * the B2B platform) is the same figure the 2020 entry in TIMELINE already
 * carries.
 *
 * Tile 1 is left at 12+ deliberately. The canvas says "9+ years" and this said
 * "12+"; both are the same person's own claim and only he can say which is
 * right, so it is unchanged until he does.
 */
export const STATS: readonly Stat[] = [
  { value: '12+', label: 'Years in technology' },
  { value: '90%', label: 'Of B2B order and quote processing automated' },
  { value: '500K+', label: 'SKUs across 12+ multi-store Magento 2 platforms' },
  { value: '1M+', label: 'Monthly users on platforms under architecture' },
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
    short: 'FSH',
    name: 'Headless fashion storefront',
    industry: 'Fashion · D2C',
    challenge:
      'A fast-growing fashion brand whose storefront had to keep getting faster while the catalogue and traffic behind it kept moving.',
    role: 'Architecture + delivery',
    stack: 'Magento 2 · Next.js · Varnish',
    cover: '/assets/case-covers/fashion-d2c-cover.webp',
  },
  {
    no: '02',
    short: 'PLT',
    name: 'Online plant store',
    industry: 'Horticulture · D2C',
    challenge:
      'An online plant store selling a product that is fragile, seasonal and hard to photograph, to customers who abandon at any friction in the buy.',
    role: 'Commerce build',
    stack: 'Shopify · CRO',
    cover: '/assets/case-covers/plant-store-cover.webp',
  },
  {
    no: '03',
    short: 'SPN',
    name: 'Sports nutrition store',
    industry: 'Health & fitness',
    challenge:
      'Sports nutrition is a category where authenticity is the purchase decision and delivery speed is the repeat one. The storefront has to carry both.',
    role: 'Platform + growth',
    stack: 'Magento 2 · SEO',
    cover: '/assets/case-covers/sports-nutrition-cover.webp',
  },
  {
    no: '04',
    short: 'B2B',
    name: 'Procurement and approvals platform',
    industry: 'B2B procurement',
    challenge:
      'B2B buying is not a cart. It is a request, a quote, an approval chain and a budget holder, and a consumer checkout models none of that.',
    role: 'Systems architecture',
    stack: 'Magento 2 · Workflows · API',
    cover: '/assets/case-covers/b2b-procurement-cover.webp',
  },
  {
    no: '05',
    short: 'MKT',
    name: 'Multi-category marketplace',
    industry: 'Marketplace',
    challenge:
      'A wide multi-category catalogue, which is the point at which catalogue size stops being a number and starts being an architecture problem.',
    role: 'Architecture direction',
    stack: 'Magento 2 multi-store · Redis',
    cover: '/assets/case-covers/marketplace-cover.webp',
  },
  {
    no: '06',
    short: 'MFG',
    name: 'Engineering manufacturer platform',
    industry: 'Manufacturing',
    challenge:
      'An engineering manufacturer whose buyers research for months and never fill in a form, on a site that search could not read.',
    role: 'Technical SEO + build',
    stack: 'WordPress · Schema · GA4',
    cover: '/assets/case-covers/manufacturing-cover.webp',
  },
];

/** The light-ground featured case study. */
export const FEATURED = {
  name: 'FASHION D2C',
  kicker: 'Headless commerce',
  cover: '/assets/case-covers/fashion-d2c-cover.webp',
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

/**
 * The record, told as shifts rather than as an employment history.
 *
 * No company names. Section 4 of BRAND-DESIGN-GUIDELINE.md keeps corporate and
 * historical brand names off this site, and section 3 keeps the word "Founder"
 * off it, so `org` carries the role and the dates instead of an employer. The
 * facts, the dates and the numbers are unchanged: what was removed is the
 * letterhead, not the record. Client names went the same way, which also
 * settles the standing question about naming them without permission.
 */
export const TIMELINE: readonly TimelineEntry[] = [
  {
    year: '2010–13',
    title: 'Foundations',
    org: 'Education',
    body: 'Six years of formal study in information technology, diploma in 2010, degree in 2013. The point at which this stopped being a hobby.',
  },
  {
    year: '2016',
    title: 'Independent practice',
    org: 'Independent · 2016–2025',
    body: 'Started taking my own clients in Vadodara and never stopped. Magento 2 full-stack and headless commerce for B2B, B2C, D2C and marketplace brands, plus engagement-platform and multi-currency gateway work.',
  },
  {
    year: '2016',
    title: 'Magento, professionally',
    org: 'Magento developer, then senior · 2016–2018',
    body: 'Module development and store builds, full time. The platform that turns a catalogue into an architecture problem, which is the lesson the next ten years kept re-teaching.',
  },
  {
    year: '2018',
    title: 'Shopify at brand scale',
    org: 'Shopify development · 2018',
    body: 'Custom storefronts, app and gateway integrations for global personal-care brands, and a first look at Salesforce Commerce Cloud. Different platform, same question: what does the catalogue actually need.',
  },
  {
    year: '2018',
    title: 'Gulf retail, full-stack',
    org: 'Senior Magento 2 full-stack · 2018–2021',
    body: 'Grocery, commercial kitchen equipment and fashion for leading Saudi retail groups. Mobile app APIs, custom payment gateways, multi-vendor and multi-store, in a market where the operational constraints are not the ones a European catalogue trains you for.',
  },
  {
    year: '2020',
    title: 'B2B systems and performance',
    org: 'B2B commerce platform · 2020–2022',
    body: 'Five-level approval workflows, B2B order and quote management with role-based permissions, AWS with EC2, RDS and auto-scaling. 90% of order and quote processing automated; approval cycles down 40%; page load down 60%.',
  },
  {
    year: '2023',
    title: 'Leading the team',
    org: 'Team Lead · 2023–present',
    body: 'Architecture guidance, code review and mentorship across 12+ multi-store Magento 2 platforms carrying 500K+ SKUs and 1M+ monthly users. Structured workflows cut development cycle time by 30%.',
  },
  {
    year: 'Now',
    title: 'AI in the operating layer',
    org: 'Consulting',
    body: 'Agents with a deliberate tool boundary, retrieval grounded in a real catalogue, AI search, and automation pointed at the processes that absorb people who should be doing something else. Evaluated before rollout, and reviewed by a person wherever the output reaches a customer or a ledger.',
  },
];

export type QaBlock = { no: string; q: string; a: string };

/**
 * 08 — Direct answers.
 *
 * Four definitions, written to be quotable in isolation. This is the section an
 * answer engine lifts from, so each body is a complete answer to its own
 * heading and depends on nothing above it on the page.
 */
export const ANSWERS: readonly QaBlock[] = [
  {
    no: '01',
    q: 'What does Yuvraj Raulji work on?',
    a: 'AI, eCommerce and digital transformation. Practical work across Magento, Shopify, WooCommerce and headless commerce, the APIs behind mobile apps, cloud and performance architecture, AI search and automation.',
  },
  {
    no: '02',
    q: 'What is AI commerce?',
    a: 'AI commerce uses artificial intelligence across product discovery, search, recommendations, catalogue enrichment, customer support and purchasing workflows to create more relevant digital shopping experiences.',
  },
  {
    no: '03',
    q: 'What is headless commerce?',
    a: 'Headless commerce separates the customer-facing frontend from the commerce backend through APIs, so a business can build a custom experience while keeping the underlying commerce platform.',
  },
  {
    no: '04',
    q: 'What is GEO?',
    a: 'Generative Engine Optimization focuses on making information clear, authoritative and structurally understandable, so AI-powered search and answer systems can accurately interpret and reference a brand or topic.',
  },
];

/**
 * 12 — Questions.
 *
 * The ten questions that come up before a first call. This array is the single
 * source for both the visible section and the FAQPage node in
 * lib/schema-brand.ts: FAQPage markup that does not match visible text on the
 * page is a structured-data violation, so the two can never be allowed to
 * drift apart.
 */
export const FAQS: readonly QaBlock[] = [
  {
    no: '01',
    q: 'What does Yuvraj Raulji specialize in?',
    a: 'AI, eCommerce and digital transformation. The practical work spans commerce platforms, the APIs behind mobile apps, performance and cloud architecture, and AI systems such as agents, retrieval and automation.',
  },
  {
    no: '02',
    q: 'What kind of AI work does Yuvraj Raulji explore?',
    a: 'LLM applications, agents with a deliberate tool boundary, retrieval augmented generation, MCP-based integrations, AI search, catalogue enrichment and process automation, with evaluation and human review around anything consequential.',
  },
  {
    no: '03',
    q: 'Which eCommerce platforms does Yuvraj Raulji work with?',
    a: 'Magento 2 and Adobe Commerce, Shopify and Shopify Plus, WooCommerce on WordPress, and headless storefronts built over REST and GraphQL APIs.',
  },
  {
    no: '04',
    q: 'How is AI changing eCommerce?',
    a: 'Four layers move first: discovery, where search interprets intent instead of matching keywords; merchandising, where recommendations use behaviour and catalogue context; catalogue operations, where enrichment is drafted by a model and reviewed by a person; and support, where grounded answers resolve order and product questions.',
  },
  {
    no: '05',
    q: 'What is AI search?',
    a: 'AI search interprets intent rather than matching keywords. A full sentence, such as a gift request under a budget for a specific occasion, can return products, categories or guidance, because the query is read as a goal instead of a string.',
  },
  {
    no: '06',
    q: 'When should a business consider AI automation?',
    a: 'When the process is repetitive and already documented, the data behind it is reliable, the cost of a mistake is measurable, and a person can review the output. Automating an undefined process only makes the confusion faster.',
  },
  {
    no: '07',
    q: 'What is the difference between Shopify and Magento?',
    a: 'Shopify is hosted and favours speed of launch and operational simplicity, which suits D2C brands with a focused catalogue. Magento 2 and Adobe Commerce are open architectures that carry complex catalogues, multi-store setups, B2B pricing and approval rules, at the cost of more engineering ownership.',
  },
  {
    no: '08',
    q: 'How does Yuvraj Raulji approach digital transformation?',
    a: 'Understand the business, map the process, choose technology against that process, build it, then measure. The technology decision comes fourth, not first.',
  },
  {
    no: '09',
    q: 'What does a 30-minute consultation cover?',
    a: 'The constraint you are actually hitting, the architecture or platform decision behind it, what AI should and should not touch in your operation, and the next practical step.',
  },
  {
    no: '10',
    q: 'How can someone work with Yuvraj Raulji?',
    a: 'Start a conversation by email at hello@yuvrajraulji.com, or book a 30-minute consultation. Replies usually arrive within 24 hours on IST business days.',
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
  'Search, discovery or AI visibility',
];
