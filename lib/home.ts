/**
 * Content model for the homepage.
 *
 * Provenance rule (CONTENT-PRINCIPLES.md): every factual claim here is either
 * (a) already in lib/site.ts / lib/posts.ts as verified record, or (b) an
 * opinion, positioning line or biographical date supplied directly by Yuvraj.
 * Nothing is inferred, rounded up or filled in to make a section look complete.
 * Where the record has no value for a field the brief asked for, the field is
 * optional and simply absent rather than invented.
 *
 * Copy in this file avoids em-dashes on purpose.
 */

import { POSTS } from './posts';

/* ═══════════════════════════════════════════════════════════════
   SECTION ORDER
   The nav, the section numbering and the scroll targets all read this,
   so a section is added or reordered in exactly one place.
   ═══════════════════════════════════════════════════════════════ */

export const SECTIONS = [
  { id: 'hero', num: '01', label: 'Opening' },
  { id: 'philosophy', num: '02', label: 'Philosophy' },
  { id: 'thinking', num: '03', label: 'What I think about' },
  { id: 'lab', num: '04', label: 'AI learning lab' },
  { id: 'commerce', num: '05', label: 'Commerce intelligence' },
  { id: 'pov', num: '06', label: 'Point of view' },
  { id: 'experience', num: '07', label: 'Experience' },
  { id: 'work', num: '08', label: 'Selected work' },
  { id: 'now', num: '09', label: 'What I am working on' },
  { id: 'writing', num: '10', label: 'Thinking out loud' },
  { id: 'company', num: '11', label: 'Raulji Technologies' },
  { id: 'contact', num: '12', label: 'Contact' },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];

export const HOME_NAV = [
  { label: 'Thinking', href: '#thinking' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Writing', href: '#writing' },
  { label: 'About', href: '/about/' },
] as const;

/** Official site of the execution brand. Same origin the case studies live on. */
export const RAULJI_TECHNOLOGIES_URL = 'https://www.rauljitechnologies.com/';

/* ═══════════════════════════════════════════════════════════════
   01 — HERO
   ═══════════════════════════════════════════════════════════════ */

export const HERO = {
  name: 'Yuvraj Raulji',
  /**
   * The one H1 on the page, matching the line break and wording the production
   * site uses on its own H1. Held as separate lines because each break is doing
   * typographic work, and because .yr-linemask reveals one line per mask: a
   * line left to wrap would animate as a single block and clip against a mask
   * padded for one line. It is joined with a space for the accessible name.
   */
  headline: ['E-commerce & Digital', 'Transformation', 'Consultant'] as const,
  highlight: ['AI', 'Commerce', 'Transformation'] as const,
  lede:
    'I explore the technologies, systems and ideas shaping the next generation of digital business.',
  disciplines: [
    'AI',
    'LLMs',
    'Automation',
    'eCommerce',
    'Digital Transformation',
  ] as const,
  ctaPrimary: { label: 'Explore my thinking', href: '#thinking' },
  ctaSecondary: { label: 'Work with me' },
  /**
   * Supplied by Yuvraj, and consistent with the timeline below: building from
   * 2014 reads as 12 years at the time of writing. Note this is deliberately
   * broader than the "9+ years" commerce figure elsewhere on the site, which
   * counts professional Magento work from 2016 only.
   */
  meta: [
    { value: '12+', label: 'Years in technology' },
    { value: 'Vadodara, India', label: 'Base' },
  ],
} as const;

/* ═══════════════════════════════════════════════════════════════
   02 — PHILOSOPHY
   ═══════════════════════════════════════════════════════════════ */

export const PHILOSOPHY = {
  headline: ['Technology should move', 'the business forward.'] as const,
  body:
    'I don’t believe technology should exist simply because it’s possible. It should create leverage: better decisions, better customer experiences, faster operations and sustainable growth.',
} as const;

/* ═══════════════════════════════════════════════════════════════
   03 — WHAT I THINK ABOUT
   ═══════════════════════════════════════════════════════════════ */

export interface ThinkingCard {
  num: string;
  title: string;
  body: string;
  tags: string[];
}

export const THINKING: ThinkingCard[] = [
  {
    num: '01',
    title: 'AI & LLMs',
    body:
      'Generative AI, LLMs, AI agents, automation, RAG, MCP and intelligent business systems.',
    tags: ['LLMs', 'Agents', 'RAG', 'MCP'],
  },
  {
    num: '02',
    title: 'Digital Commerce',
    body:
      'Shopify, Magento, headless commerce, AI search, CRO, checkout psychology and customer experience.',
    tags: ['Shopify', 'Magento', 'Headless', 'CRO'],
  },
  {
    num: '03',
    title: 'Business Transformation',
    body:
      'How companies modernize processes, systems and operations to become faster and more scalable.',
    tags: ['Process', 'Systems', 'Operations'],
  },
  {
    num: '04',
    title: 'Future of Technology',
    body:
      'Emerging technology, new business models, AI-first organizations and the future of work.',
    tags: ['AI-first', 'Business models', 'Future of work'],
  },
];

/* ═══════════════════════════════════════════════════════════════
   04 — AI LEARNING LAB

   Deliberately framed as study and experiment. No certification,
   accreditation or expertise claim is made anywhere in this section,
   because the record does not support one.
   ═══════════════════════════════════════════════════════════════ */

export interface LabTrack {
  id: string;
  label: string;
  summary: string;
  items: string[];
}

export const LAB = {
  headline: ['I’m constantly learning.', 'Because technology doesn’t stand still.'] as const,
  body:
    'I actively study and experiment with emerging AI technologies to understand not only what they can do, but where they create real business value.',
  cta: { label: 'Explore my AI notes', href: '/blog/' },
} as const;

export const LAB_TRACKS: LabTrack[] = [
  {
    id: 'llms',
    label: 'LLMs',
    summary:
      'Reading the models against each other rather than in isolation: where reasoning depth is worth the latency, and where a smaller model is the correct answer.',
    items: ['GPT', 'Claude', 'Gemini', 'Open models'],
  },
  {
    id: 'agents',
    label: 'AI Agents',
    summary:
      'Where a model that can plan and call tools changes the shape of a workflow, and where it just adds an expensive layer over a form.',
    items: ['Agents', 'Tools', 'Workflows', 'MCP'],
  },
  {
    id: 'engineering',
    label: 'AI Engineering',
    summary:
      'The plumbing that decides whether any of it survives contact with production: retrieval quality, API boundaries, cost and failure behaviour.',
    items: ['RAG', 'APIs', 'Vector databases', 'Automation'],
  },
  {
    id: 'commerce',
    label: 'AI Commerce',
    summary:
      'What AI actually changes on a storefront: how products are found, how they are ranked and how a catalogue answers a question rather than matching a keyword.',
    items: ['AI search', 'Recommendations', 'Personalization', 'Intelligent shopping'],
  },
];

/* ═══════════════════════════════════════════════════════════════
   05 — COMMERCE INTELLIGENCE

   `diagram` selects the bespoke inline SVG drawn for that module in
   components/homepage/commerce.tsx. No icon library, no stock glyphs.
   ═══════════════════════════════════════════════════════════════ */

export type CommerceDiagram =
  | 'velocity'
  | 'modules'
  | 'split'
  | 'query'
  | 'funnel'
  | 'cycle';

export interface CommerceModule {
  id: string;
  label: string;
  /** Three words. They are set as a typographic run, not a sentence. */
  beats: [string, string, string];
  note: string;
  diagram: CommerceDiagram;
}

export const COMMERCE = {
  headline: ['The future of commerce', 'is not just digital.', 'It is intelligent.'] as const,
  body:
    'Six surfaces where a commerce decision is really a business decision. The platform question is usually the last one worth asking, not the first.',
} as const;

export const COMMERCE_MODULES: CommerceModule[] = [
  {
    id: 'shopify',
    label: 'Shopify',
    beats: ['Fast commerce', 'D2C', 'Scale'],
    note: 'Speed to market as a strategy. The constraint is the platform, and for most brands that constraint is a feature.',
    diagram: 'velocity',
  },
  {
    id: 'magento',
    label: 'Magento',
    beats: ['Complex commerce', 'Enterprise', 'Flexibility'],
    note: 'Multi-store catalogues, B2B workflows, approval chains and ERP boundaries that no theme setting will express.',
    diagram: 'modules',
  },
  {
    id: 'headless',
    label: 'Headless',
    beats: ['Performance', 'Experience', 'Architecture'],
    note: 'Decoupling the storefront from the commerce release cycle. Worth it when the front end has its own roadmap.',
    diagram: 'split',
  },
  {
    id: 'ai',
    label: 'AI Commerce',
    beats: ['Search', 'Personalization', 'Recommendations'],
    note: 'Discovery stops being a keyword match and starts being an answer. This is the layer changing fastest.',
    diagram: 'query',
  },
  {
    id: 'checkout',
    label: 'Checkout',
    beats: ['Psychology', 'Friction', 'Conversion'],
    note: 'Every field is a question the customer has to agree to answer. Most carts are lost to hesitation, not price.',
    diagram: 'funnel',
  },
  {
    id: 'retention',
    label: 'Retention',
    beats: ['Data', 'Experience', 'Lifetime value'],
    note: 'Acquisition buys the first order. The second one is earned by the systems running behind it.',
    diagram: 'cycle',
  },
];

/* ═══════════════════════════════════════════════════════════════
   06 — POINT OF VIEW

   Each statement is Yuvraj's own position. `href` points at the piece
   that argues it out. The fifth has no single matching article yet, so
   it points at the writing index rather than at a mismatched post.
   ═══════════════════════════════════════════════════════════════ */

export interface PovItem {
  statement: string;
  context: string;
  href: string;
  cta: string;
}

export const POV: PovItem[] = [
  {
    statement: 'AI isn’t replacing businesses. It’s replacing inefficient ways of working.',
    context: 'The threat isn’t to the company. It’s to the process nobody has revisited in nine years.',
    href: '/blog/ai-ecommerce-revenue-2025/',
    cta: 'Read the case',
  },
  {
    statement: 'Shopify vs Magento isn’t a technology decision. It’s a business architecture decision.',
    context: 'Pick the platform after you know how the business sells, approves and fulfils. Not before.',
    href: '/blog/shopify-plus-vs-magento2-2025/',
    cta: 'Read the comparison',
  },
  {
    statement: 'The next evolution of SEO isn’t only ranking. It’s being recommended by AI.',
    context: 'Retrieval reads structure. A page that a model cannot parse is a page it will not cite.',
    href: '/blog/magento2-seo-technical-audit/',
    cta: 'Read the audit guide',
  },
  {
    statement: 'A beautiful eCommerce store means nothing if the customer journey is broken.',
    context: 'Design gets the visitor to the cart. Only the checkout decides whether that mattered.',
    href: '/blog/magento2-checkout-optimization/',
    cta: 'Read the breakdown',
  },
  {
    statement: 'Most companies don’t have an AI problem. They have a process problem.',
    context: 'Automating a broken workflow produces the same bad outcome, faster and at higher cost.',
    href: '/blog/',
    cta: 'Read the notes',
  },
];

/* ═══════════════════════════════════════════════════════════════
   07 — EXPERIENCE

   Dates supplied by Yuvraj. Two of the four also appear in lib/site.ts:
   Ariya InfoTech is recorded there as founded Mar 2016 and running to
   Dec 2025, which is consistent with it becoming an established business
   in 2017. No achievement, client or revenue figure is attached to any
   entry, because none is documented.
   ═══════════════════════════════════════════════════════════════ */

export interface TimelineEntry {
  year: string;
  title: string;
  body: string;
}

export const EXPERIENCE = {
  headline: ['Built.', 'Migrated.', 'Scaled.'] as const,
  body:
    'Twelve years of building the same thing from different angles: systems that a business can actually run on.',
} as const;

export const TIMELINE: TimelineEntry[] = [
  {
    year: '2014',
    title: 'The first builds',
    body: 'Started building websites and online stores.',
  },
  {
    year: '2017',
    title: 'Ariya InfoTech',
    body: 'Ariya InfoTech became an established business.',
  },
  {
    year: '2025',
    title: 'Raulji Technologies',
    body: 'Raulji Technologies Private Limited.',
  },
  {
    year: '2026',
    title: 'A new chapter',
    body: 'A new chapter focused on AI, eCommerce and digital transformation.',
  },
];

/* ═══════════════════════════════════════════════════════════════
   08 — SELECTED WORK

   Six of the eleven engagements recorded in lib/site.ts WORK_SLIDES,
   chosen to cover headless, Shopify, Magento, marketplace and B2B.

   The brief asked each card to carry Problem, Thinking, Technology and
   Outcome. `stack` is derivable from the recorded category, so it is
   present on all six. `outcome` is present only where the record states
   a measured result, which today is Synergy Water Slides alone. The
   remaining five render without an outcome row rather than with an
   invented one; fill the field in and the row appears.
   ═══════════════════════════════════════════════════════════════ */

export interface WorkItem {
  id: string;
  name: string;
  category: string;
  summary: string;
  stack: string[];
  outcome?: string;
  img: string;
  /** Intrinsic pixels. Present so width/height can be set and nothing shifts. */
  imgW: number;
  imgH: number;
  href: string;
}

export const WORK = {
  headline: ['Real work.', 'Real systems.'] as const,
  body:
    'Case studies are published on the Raulji Technologies site. Each one links through to the full write-up.',
} as const;

export const WORK_ITEMS: WorkItem[] = [
  {
    id: 'powerlook',
    name: 'Powerlook',
    category: 'Headless commerce · Fashion',
    summary:
      'High-performance headless commerce architecture for India’s fastest-growing men’s fashion brand.',
    stack: ['Headless', 'Storefront API', 'Performance'],
    img: '/assets/case-covers/powerlook-cover.webp',
    imgW: 1920,
    imgH: 1290,
    href: 'https://www.rauljitechnologies.com/case-study/powerlook/',
  },
  {
    id: 'future-roots',
    name: 'Future Roots',
    category: 'Shopify · D2C',
    summary:
      'India’s most trusted online plant store on Shopify, with OTP login, GoKwik one-page checkout and custom product pages.',
    stack: ['Shopify', 'GoKwik checkout', 'Custom PDP'],
    img: '/assets/case-covers/future-roots-cover.webp',
    imgW: 1920,
    imgH: 1280,
    href: 'https://www.rauljitechnologies.com/case-study/future-roots/',
  },
  {
    id: 's3buy',
    name: 'S3Buy',
    category: 'E-commerce · Health & fitness',
    summary:
      'Online fitness and supplement store delivering authentic sports nutrition at speed.',
    stack: ['Commerce build', 'Catalogue', 'Checkout'],
    img: '/assets/case-covers/s3buy-cover.webp',
    imgW: 1920,
    imgH: 1047,
    href: 'https://www.rauljitechnologies.com/case-study/s3buy/',
  },
  {
    id: 'nxtby',
    name: 'Nxtby',
    category: 'Custom platform · B2B',
    summary:
      'Scalable B2B procurement platform streamlining purchase requests and approvals.',
    stack: ['B2B workflows', 'Approvals', 'Integrations'],
    img: '/assets/case-covers/nxtby-cover.webp',
    imgW: 1920,
    imgH: 1080,
    href: 'https://www.rauljitechnologies.com/case-study/nxtby/',
  },
  {
    id: 'shopunicore',
    name: 'ShopUnicore',
    category: 'Magento 2 · Marketplace',
    summary:
      'A scalable Magento 2 platform powering a wide multi-category retail catalogue.',
    stack: ['Magento 2', 'Multi-category', 'Scale'],
    img: '/assets/case-covers/shopunicore-cover.webp',
    imgW: 1920,
    imgH: 1440,
    href: 'https://www.rauljitechnologies.com/case-study/shopunicore/',
  },
  {
    id: 'synergy',
    name: 'Synergy Water Slides',
    category: 'Web platform · Manufacturing',
    summary: 'A modern engineering brand platform built for discovery and enquiry.',
    stack: ['Web platform', 'Technical SEO', 'Content'],
    outcome: '3× traffic growth and 45% better engagement',
    img: '/assets/case-covers/synergy-water-slides-cover.webp',
    imgW: 1920,
    imgH: 867,
    href: 'https://www.rauljitechnologies.com/case-study/synergy-water-slides/',
  },
];

/* ═══════════════════════════════════════════════════════════════
   09 — WHAT I AM WORKING ON

   `photo` names a file in public/assets/founder/. The section checks at
   build time whether it exists (lib/founder-photos.ts) and renders the
   photographic layout only for the ones that do. Nothing is generated,
   substituted or stock-filled.
   ═══════════════════════════════════════════════════════════════ */

export interface NowCard {
  status: string;
  subject: string;
  note: string;
  photo: string;
}

export const NOW = {
  headline: ['What I’m', 'working on'] as const,
  body: 'Current, not archived. This is what has my attention right now.',
} as const;

export const NOW_CARDS: NowCard[] = [
  {
    status: 'Learning',
    subject: 'AI agents + MCP',
    note: 'Where a tool-calling agent earns its place in a workflow, and where a plain API call was always the right answer.',
    photo: 'research',
  },
  {
    status: 'Exploring',
    subject: 'AI search',
    note: 'How discovery changes when the catalogue is being read by a model instead of scanned by a query parser.',
    photo: 'desk',
  },
  {
    status: 'Building',
    subject: 'Intelligent commerce systems',
    note: 'Retrieval, ranking and automation wired into commerce platforms that already carry real order volume.',
    photo: 'whiteboard',
  },
  {
    status: 'Thinking about',
    subject: 'AI-first businesses',
    note: 'What an organisation looks like when the process is designed around the model rather than retrofitted to it.',
    photo: 'portrait-close',
  },
];

/* ═══════════════════════════════════════════════════════════════
   10 — THINKING OUT LOUD

   Built off lib/posts.ts so a new post appears here automatically.
   `format` and `topic` are the two filter axes the brief asked for.
   Only formats and topics that actually have items are rendered as
   filters, so the section never offers an empty result set. Reels,
   podcasts and AI notes are absent today; adding one item with that
   format is all it takes for the filter to appear.
   ═══════════════════════════════════════════════════════════════ */

export type ContentFormat = 'article' | 'reel' | 'ai-note' | 'podcast';
export type ContentTopic =
  | 'AI'
  | 'Business'
  | 'eCommerce'
  | 'Technology'
  | 'Digital Transformation';

export interface ContentItem {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  meta: string;
  topic: ContentTopic;
  format: ContentFormat;
  href: string;
  external?: boolean;
}

export const FORMAT_LABEL: Record<ContentFormat, string> = {
  article: 'Articles',
  reel: 'Reels',
  'ai-note': 'AI Notes',
  podcast: 'Podcasts',
};

/**
 * Topic assignment per post. Kept explicit rather than derived from the
 * post's `filter`, because the blog taxonomy is platform-shaped
 * (magento-2, shopify, aws-server) and this one is subject-shaped.
 */
const POST_TOPICS: Record<string, ContentTopic> = {
  'magento2-seo-technical-audit': 'eCommerce',
  'ai-ecommerce-revenue-2025': 'AI',
  'magento2-checkout-optimization': 'eCommerce',
  'shopify-plus-vs-magento2-2025': 'Business',
  'aws-magento2-server-setup': 'Technology',
  'shopify-headless-nextjs-guide': 'Technology',
  'cro-double-conversion': 'eCommerce',
  'magento2-pwa-studio-headless': 'Technology',
};

export const CONTENT = {
  headline: ['Thinking', 'out loud'] as const,
  body: 'Long-form breakdowns of the decisions behind the builds.',
  cta: { label: 'All writing', href: '/blog/' },
} as const;

/** Newest first. Dates in POSTS are "12 Jun 2026" format. */
export const CONTENT_ITEMS: ContentItem[] = Object.entries(POSTS)
  .map(([slug, p]): ContentItem => ({
    slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    meta: p.readTime,
    topic: POST_TOPICS[slug] ?? 'Technology',
    format: 'article',
    href: `/blog/${slug}/`,
  }))
  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

/** Filters are derived, so an empty category can never be offered. */
export const CONTENT_TOPICS: ContentTopic[] = (
  ['AI', 'Business', 'eCommerce', 'Technology', 'Digital Transformation'] as ContentTopic[]
).filter((t) => CONTENT_ITEMS.some((i) => i.topic === t));

export const CONTENT_FORMATS: ContentFormat[] = (
  ['article', 'reel', 'ai-note', 'podcast'] as ContentFormat[]
).filter((f) => CONTENT_ITEMS.some((i) => i.format === f));

/* ═══════════════════════════════════════════════════════════════
   11 — RAULJI TECHNOLOGIES
   ═══════════════════════════════════════════════════════════════ */

export const COMPANY = {
  eyebrow: 'The execution brand',
  headline: 'Turning ideas into real systems.',
  body:
    'Some ideas stay on paper. Others become products, platforms and businesses. Through Raulji Technologies, these ideas become real-world digital commerce, AI and technology solutions.',
  cta: { label: 'Explore Raulji Technologies', href: RAULJI_TECHNOLOGIES_URL },
} as const;

/* ═══════════════════════════════════════════════════════════════
   12 — CLOSING
   ═══════════════════════════════════════════════════════════════ */

export const CLOSING = {
  headline: ['What are you', 'building next?'] as const,
  lines: [
    'A better commerce experience?',
    'An AI-powered workflow?',
    'A new digital product?',
    'Or simply a better way to run your business?',
  ],
  ctaPrimary: { label: "Let's talk" },
  ctaSecondary: { label: 'Explore my thinking', href: '/blog/' },
  signoff: 'Yuvraj Raulji',
  signoffLine: ['AI', 'Business', 'eCommerce', 'Digital Transformation'] as const,
} as const;
