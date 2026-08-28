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

import { CONTACT as SITE_CONTACT } from './site';

/** Portrait used by a section. Kept here so swapping a file is a one-line edit. */
export const PORTRAITS = {
  /**
   * Background-removed cutouts, not the raw studio files.
   *
   * The two source photographs are shot on pure white. Every slot that uses
   * them sits on either the near-black ground or the accent band, and the hero
   * plate additionally lays a dark gradient over the image, so a white backdrop
   * rendered as a lit rectangle punched into the page: exactly what the
   * `--veil-*` tokens exist to prevent.
   *
   * The canvas ships its own `yr-hero.png` and `yr-quote.png`, which are
   * already cut out, but both exceed the 256 KiB read cap on the design API and
   * come back truncated with no IEND chunk. These are the equivalent, derived
   * from the two JPEGs that are in the repo. The masters stay beside them.
   *
   * Opaque, not alpha. The hero plate stacks a red rectangle behind the photo
   * and offsets it down-right by 34px so it reads as a sliver down two edges;
   * a transparent backdrop lets that red flood the whole panel instead. So the
   * subject is cut out and then given a dark studio sweep of its own, which is
   * what the plate wants: a photo panel, on a page that is already near-black.
   */
  hero: '/assets/home/yr-hero.webp',
  about: '/assets/home/yr-hero.webp',
  quote: '/assets/home/yr-quote.webp',
} as const;

export const CONTACT = {
  /*
   * Derived from lib/site.ts rather than typed again. This module carried its
   * own literal, hello@yuvrajraulji.com, while every other part of the site
   * printed the address in lib/site.ts, so the homepage and the interior pages
   * named a different mailbox for the same person, and one of them was not a
   * mailbox at all. Deriving it is what stops the two drifting apart again. The
   * phone and timezone fields stay local because lib/site.ts holds those in a
   * different shape.
   */
  email: SITE_CONTACT.email,
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
   * The hero eyebrow. No ordinal: this string used to open with "01 /" back
   * when every band carried a number, and the numbers are off the page now.
   *
   * Not the canvas string. The canvas writes the brand line with a
   * multiplication sign, which section 1 of BRAND-DESIGN-GUIDELINE.md bans;
   * the guideline outranks the canvas. The comma form is used here rather than
   * the pipe form because this line already carries two separators of its own
   * and a third would read as noise.
   */
  eyebrow: 'Yuvraj Raulji · AI, Business and eCommerce',
  /** The one-line statement under the H1. Section 7, verbatim. */
  subLead:
    'Exploring AI, digital commerce and technology systems that help modern businesses operate, sell and grow.',
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
 * Tile 1 reads 9+, settled by Yuvraj on 26 Aug 2026 against his own
 * professional record. The count runs from the first Magento role in June
 * 2016, not from the first websites in 2014, which is why it is 9+ and not
 * the 12+ this used to claim. Note the other "12+" on this page is a count of
 * platforms, not of years, and is a different confirmed figure.
 */
export const STATS: readonly Stat[] = [
  { value: '9+', label: 'Years in technology' },
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

/**
 * One entry per thing, not per line of a mockup.
 *
 * Three of these used to pack two names into one row with a middot ("Redis ·
 * Varnish", "AWS · Cloudflare"), which made those rows read as one item with a
 * stray character in it while every other row held exactly one name. The
 * ampersands went at the same time, per section 1 of BRAND-DESIGN-GUIDELINE.md.
 */
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
    items: ['Node.js', 'PHP', 'MySQL', 'Redis', 'Varnish'],
  },
  {
    no: '04',
    title: 'Growth and intelligence',
    items: ['AWS', 'Cloudflare', 'GA4 and analytics', 'Technical SEO', 'AI and automation'],
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
  { no: '06', name: 'Fractional CTO', note: 'Architecture direction and team leadership, without the full-time hire.' },
];

export type TimelineEntry = {
  /** Year span. En-dashes are fine here: a range is a number span, not a clause. */
  period: string;
  place: string;
  /** The role held, which is the thing a reader is actually scanning for. */
  role: string;
  /** What kind of organisation, never which one. See the note on the array. */
  org: string;
  body: string;
  /** What was actually built or changed. */
  points: readonly string[];
  /** Platforms and tools, not adjectives. */
  tags: readonly string[];
};

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
    period: '2010–2016',
    place: 'Gujarat, India',
    role: 'Formal study in information technology',
    org: 'Diploma, then degree',
    body: 'Six years of formal education in two stages: a three-year diploma in information technology from 2010 to 2013, then a three-year degree from 2013 to 2016. The point at which this stopped being a hobby and started being a discipline.',
    points: [
      '2010 to 2013, diploma in information technology',
      '2013 to 2016, degree in information technology',
      'The fundamentals that still decide architecture: data modelling, networking, systems',
    ],
    tags: ['Diploma', 'Degree', 'Information technology'],
  },
  {
    period: '2016–2025',
    place: 'Vadodara, India',
    role: 'Independent practice',
    org: 'Own clients, alongside the employed roles',
    body: 'Started taking my own clients in Vadodara and never stopped. The engagements ran in parallel with the full-time roles below, which is why the dates overlap.',
    points: [
      'Magento 2 full-stack and headless commerce for B2B, B2C, D2C and marketplace brands',
      'Engagement-platform and multi-currency gateway work',
      'Incorporated as a private limited company in 2025',
    ],
    tags: ['Magento 2', 'Headless', 'Independent'],
  },
  {
    period: '2016–2018',
    place: 'Vadodara, India',
    role: 'Magento Developer, then Sr. Magento Developer',
    org: 'Commerce agency',
    body: 'Two years building Magento stores and modules professionally. Magento is the platform that turns a catalogue into an architecture problem, and that reframing shaped everything after it.',
    points: [
      'Custom module and extension development on Magento',
      'Store builds and platform customisation for client brands',
      'Promoted to Sr. Magento Developer within the first year',
    ],
    tags: ['Magento', 'PHP', 'Module development'],
  },
  {
    period: '2018',
    place: 'Vadodara, India',
    role: 'Software Engineer',
    org: 'Digital agency',
    body: 'Shopify development for global personal-care brands: fully customised storefronts with JavaScript enhancements, third-party tools and custom features.',
    points: [
      'Built and customised Shopify storefronts with advanced functionality and responsive design',
      'Integrated third-party apps, payment gateways and APIs to automate workflows',
      'Custom JavaScript for interactive features and dynamic product displays',
      'Optimised store performance, page load times and UX workflows',
      'First exposure to Salesforce Commerce Cloud and to Magento 2 multi-platform architecture',
    ],
    tags: ['Shopify', 'JavaScript', 'SFCC, beginner', 'Integrations'],
  },
  {
    period: '2018–2021',
    place: 'Ahmedabad, India',
    role: 'Sr. Magento 2 Full Stack Developer',
    org: 'Commerce agency, Gulf retail',
    body: 'Nearly three years building scalable, high-performance commerce for leading Saudi Arabian retail groups, across grocery, commercial kitchen equipment and fashion.',
    points: [
      'Full-stack Magento 2: custom modules, extensions, frontend and backend',
      'Mobile app API development, and headless over REST and GraphQL',
      'Custom payment gateway integration with localised payment and shipping methods',
      'Multi-vendor and multi-store setups, with ERP and POS integration',
      'Advanced filtering, layered navigation, dynamic pricing and custom checkout flows',
      'Loyalty programmes, discount engines and customer dashboards',
      'Performance and speed optimisation for high-traffic stores',
    ],
    tags: ['Magento 2', 'Elasticsearch', 'GraphQL', 'B2B and B2C', 'Saudi market'],
  },
  {
    period: '2020–2022',
    place: 'India, remote',
    role: 'Sr. Magento Developer, B2B systems and performance',
    org: 'B2B commerce platform',
    body: 'B2B procurement is not a cart. It is a request, a quote, an approval chain and a budget holder. I built the systems that model that, and the infrastructure to hold them.',
    points: [
      'Five-level approval workflows with role-based permissions',
      'B2B order and quote management, with 90% of processing automated',
      'Approval cycle times reduced by 40%',
      'AWS architecture on EC2, RDS and auto-scaling, with Varnish, Redis and full-page cache',
      'Page load times cut by 60% on high-traffic B2B commerce',
    ],
    tags: ['Magento 2', 'AWS', 'Redis and Varnish', 'Workflows', 'APIs'],
  },
  {
    period: '2023–now',
    place: 'India, remote',
    role: 'Team Lead, architecture and delivery',
    org: 'B2B commerce platform',
    body: 'The work stopped being code and became process: architecture guidance, code review and mentorship across a platform estate rather than a single store.',
    points: [
      'Architecture direction across 12+ multi-store Magento 2 platforms',
      '500K+ SKUs and 1M+ monthly users under architecture',
      'Structured workflows and review cut development cycle time by 30%',
      'Mentorship and technical documentation for team onboarding',
    ],
    tags: ['Architecture', 'Team leadership', 'Code review', 'Multi-store'],
  },
  {
    period: 'Now',
    place: 'Vadodara, remote',
    role: 'AI in the operating layer',
    org: 'Consulting',
    body: 'Where the work is now: agents with a deliberate tool boundary, retrieval grounded in a real catalogue, AI search, and automation pointed at the processes that absorb people who should be doing something else.',
    points: [
      'AI agents, retrieval and automation grounded in real business data',
      'AI search and GEO, for discovery beyond the ranked result',
      'Fractional CTO engagements and architecture direction',
      'Evaluated before rollout, and reviewed by a person wherever the output reaches a customer or a ledger',
    ],
    tags: ['AI systems', 'Automation', 'Fractional CTO', 'Cloud'],
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
    a: 'Start a conversation by email at toyuvrajraulji@gmail.com, or book a 30-minute consultation. Replies usually arrive within 24 hours on IST business days.',
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
