import { CASES } from './brand';
import { PILLARS, pillarHref } from './expertise';
import { HIRE } from './hire';
import { ALL_PLATFORM_SERVICES, serviceHref } from './platform-services';
import { MIGRATION } from './migration';
import { POSTS } from './posts';
import { TECHNOLOGIES, techHref } from './technology';

/**
 * The master SEO content map, and the gate in front of it.
 *
 * ── Why this file exists ────────────────────────────────────────────────────
 *
 * The build standard says a page is not built before its row in the content map
 * exists, and that no two pages target the same primary keyword. Until now only
 * the 26 platform services and /hire/ declared one, because they were the pages
 * built under the standard. The other 35, including all eleven technology hubs,
 * every article and every core page, declared nothing.
 *
 * That left the cannibalisation guard blind to more than half the site. It was
 * not weak, it was unaware: nothing stopped a hub, an article or a case study
 * from targeting a query one of the service pages already owned, because those
 * pages never stated what they were targeting.
 *
 * ── Why a registry and not six more fields on four interfaces ───────────────
 *
 * The alternative was adding primaryKeyword, secondaryKeywords, searchIntent,
 * audience, purpose and entities to `Technology`, `Pillar`, `Post` and
 * `CaseStudy`, then filling them in across 28 objects. That works and it
 * scatters the map across four files, so nobody can read the thing the standard
 * actually asks for: one table of every indexable URL.
 *
 * Here the 27 pages that already declare a keyword keep declaring it in their
 * own model and are read from it, so there is still exactly one source per
 * page. The 35 that have no model to hang it on are authored below.
 *
 * ── The three checks, which run at build ────────────────────────────────────
 *
 * 1. No two rows share a primary keyword.
 * 2. Every row points at a route that exists.
 * 3. **Every route has a row.** This is the one that enforces the standard: a
 *    new page that ships without a content-map row fails the build rather than
 *    quietly going live unmapped, which is how the first 35 accumulated.
 */

export interface ContentMapRow {
  url: string;
  pageType: string;
  /** The one query this page owns. Unique across the whole site. */
  primaryKeyword: string;
  secondaryKeywords: readonly string[];
  searchIntent: string;
  audience: string;
  /** Why the page exists, in one line. Governs the writing rather than rendering. */
  purpose: string;
  /** Entities the page must name consistently, for GEO. */
  entities: readonly string[];
}

/* ═══════════════════════════════════════════════════════════════
   DERIVED: the pages that already declare their own row
   ═══════════════════════════════════════════════════════════════ */

const FROM_SERVICES: ContentMapRow[] = ALL_PLATFORM_SERVICES.map((s) => ({
  url: serviceHref(s.platform, s.slug),
  pageType: 'Platform service',
  primaryKeyword: s.primaryKeyword,
  secondaryKeywords: s.secondaryKeywords,
  searchIntent: s.searchIntent,
  audience: s.audience,
  purpose: s.purpose,
  entities: s.entities,
}));

/* Declares its own row for the same reason the services do: the keyword lives
   next to the copy it governs, so the two cannot drift apart. */
const FROM_MIGRATION: ContentMapRow = {
  url: '/magento-shopify-migration/',
  pageType: 'Replatforming decision',
  primaryKeyword: MIGRATION.primaryKeyword,
  secondaryKeywords: MIGRATION.secondaryKeywords,
  searchIntent: MIGRATION.searchIntent,
  audience: MIGRATION.audience,
  purpose: MIGRATION.purpose,
  entities: MIGRATION.entities,
};

const FROM_HIRE: ContentMapRow = {
  url: HIRE.path,
  pageType: 'Engagement',
  primaryKeyword: HIRE.primaryKeyword,
  secondaryKeywords: HIRE.secondaryKeywords,
  searchIntent: HIRE.searchIntent,
  audience: HIRE.audience,
  purpose: HIRE.purpose,
  entities: HIRE.entities,
};

/* ═══════════════════════════════════════════════════════════════
   AUTHORED: the 35 that had no model to declare it in

   Every primary here is checked against every other one below, so a
   collision is a build failure rather than something Search Console
   reports in three months.
   ═══════════════════════════════════════════════════════════════ */

const CONSULTANT = ['Yuvraj Raulji', 'eCommerce Consultant', 'AI Consultant', 'Technology Consultant'];

/** The eleven technology hubs. Each owns its entity term, never a service term. */
const HUB_KEYWORDS: Record<string, { primary: string; secondary: string[]; entities: string[] }> = {
  magento: {
    primary: 'magento consultant',
    secondary: ['magento 2 consultant', 'adobe commerce consultant', 'magento ecommerce consultant'],
    entities: ['Magento', 'Magento 2', 'Adobe Commerce'],
  },
  shopify: {
    primary: 'shopify consultant',
    secondary: ['shopify plus consultant', 'shopify ecommerce consultant', 'shopify expert'],
    entities: ['Shopify', 'Shopify Plus'],
  },
  woocommerce: {
    primary: 'woocommerce consultant',
    secondary: ['woocommerce expert', 'woocommerce developer', 'wordpress ecommerce consultant'],
    entities: ['WooCommerce', 'WordPress'],
  },
  wordpress: {
    primary: 'wordpress consultant',
    secondary: ['wordpress expert', 'wordpress architecture', 'wordpress technical consultant'],
    entities: ['WordPress', 'WooCommerce'],
  },
  'headless-commerce': {
    primary: 'headless commerce consultant',
    secondary: ['composable commerce consultant', 'headless ecommerce expert', 'decoupled storefront'],
    entities: ['Headless Commerce', 'Composable Commerce', 'Next.js'],
  },
  nextjs: {
    primary: 'next.js consultant',
    secondary: ['next.js developer', 'react commerce storefront', 'next.js ecommerce'],
    entities: ['Next.js', 'React', 'GraphQL', 'Headless Commerce'],
  },
  'ai-commerce': {
    primary: 'ai commerce consultant',
    secondary: ['ai for ecommerce', 'ai product discovery', 'catalogue enrichment'],
    entities: ['AI Commerce', 'Large Language Models', 'Retrieval-Augmented Generation'],
  },
  'ai-search': {
    primary: 'ai search consultant',
    secondary: ['semantic site search', 'generative engine optimization', 'geo consultant'],
    entities: ['AI Search', 'Generative Engine Optimization'],
  },
  'ai-automation': {
    primary: 'ai automation consultant',
    secondary: ['business process automation', 'ai agents for operations', 'workflow automation'],
    entities: ['AI Automation', 'AI Agents', 'MCP'],
  },
  'digital-transformation': {
    primary: 'digital transformation consultant',
    secondary: ['legacy modernisation', 'api-first architecture', 'commerce modernisation'],
    entities: ['Digital Transformation', 'API-first architecture'],
  },
  mixpanel: {
    primary: 'mixpanel consultant',
    secondary: ['mixpanel implementation', 'mixpanel audit', 'product analytics consultant'],
    entities: ['Mixpanel', 'Product analytics'],
  },
};

const FROM_HUBS: ContentMapRow[] = TECHNOLOGIES.map((t) => {
  const k = HUB_KEYWORDS[t.slug];
  if (!k) throw new Error(`Technology "${t.slug}" has no content-map row in HUB_KEYWORDS`);
  return {
    url: techHref(t.slug),
    pageType: 'Platform hub',
    primaryKeyword: k.primary,
    secondaryKeywords: k.secondary,
    searchIntent: `Commercial. A buyer evaluating ${t.name} or already on it and hitting a limit.`,
    audience: 'Founders, eCommerce leads and technology leads making a platform decision.',
    purpose: `Own the ${t.name} entity term, and route the service queries to the pages beneath it.`,
    entities: [...k.entities, ...CONSULTANT],
  };
});

/** The three expertise pillars. */
const PILLAR_KEYWORDS: Record<string, { primary: string; secondary: string[] }> = {
  'ecommerce-consulting': {
    primary: 'ecommerce consulting',
    secondary: ['ecommerce consultant', 'platform selection', 'technical due diligence'],
  },
  'website-management': {
    primary: 'website management services',
    secondary: ['website maintenance services', 'technology management', 'web estate ownership'],
  },
  'ecommerce-management': {
    primary: 'ecommerce management services',
    secondary: ['online store management', 'catalogue management', 'ecommerce operations'],
  },
};

const FROM_PILLARS: ContentMapRow[] = PILLARS.map((p) => {
  const k = PILLAR_KEYWORDS[p.slug];
  if (!k) throw new Error(`Pillar "${p.slug}" has no content-map row in PILLAR_KEYWORDS`);
  return {
    url: pillarHref(p.slug),
    pageType: 'Expertise pillar',
    primaryKeyword: k.primary,
    secondaryKeywords: k.secondary,
    searchIntent: 'Commercial. Someone buying the discipline rather than a platform.',
    audience: 'Decision makers who have a problem but not yet a platform in mind.',
    purpose: `Own the ${p.label} query, platform-neutral, and route down to the platform pages.`,
    entities: [p.label, ...CONSULTANT],
  };
});

/** The eight articles. Informational, and the easiest intent to collide by accident. */
const POST_KEYWORDS: Record<string, string[]> = {
  'magento2-seo-technical-audit': ['magento 2 seo audit', 'magento technical seo', 'magento crawl budget'],
  'ai-ecommerce-revenue-2025': ['ai ecommerce use cases', 'ai product recommendations', 'ai catalogue content'],
  'magento2-checkout-optimization': ['magento 2 checkout optimization', 'magento cart abandonment', 'one page checkout'],
  'shopify-plus-vs-magento2-2025': ['shopify plus vs magento 2', 'magento or shopify', 'enterprise platform comparison'],
  'aws-magento2-server-setup': ['magento 2 aws hosting', 'magento server setup', 'magento varnish redis'],
  'shopify-headless-nextjs-guide': ['shopify headless next.js', 'shopify storefront api', 'hydrogen vs next.js'],
  'cro-double-conversion': ['ecommerce cro strategies', 'conversion rate optimisation', 'ab testing ecommerce'],
  'magento2-pwa-studio-headless': ['magento pwa studio', 'magento headless storefront', 'venia storefront'],
};

const FROM_POSTS: ContentMapRow[] = Object.keys(POSTS).map((slug) => {
  const k = POST_KEYWORDS[slug];
  if (!k) throw new Error(`Post "${slug}" has no content-map row in POST_KEYWORDS`);
  return {
    url: `/insights/${slug}/`,
    pageType: 'Article',
    primaryKeyword: k[0],
    secondaryKeywords: k.slice(1),
    searchIntent: 'Informational. Someone researching the problem, and the engines that cite them.',
    audience: 'Practitioners and the technology leads who brief them.',
    purpose: 'Answer the question fully, and route to the commercial page it belongs to.',
    entities: [POSTS[slug].cat, ...CONSULTANT],
  };
});

/** The six case studies. Long-tail proof, one per build. */
const CASE_KEYWORDS: Record<string, string> = {
  'fashion-d2c': 'headless fashion storefront case study',
  'plant-store': 'shopify plant store case study',
  'sports-nutrition': 'sports nutrition ecommerce case study',
  'b2b-procurement': 'b2b procurement platform case study',
  marketplace: 'magento marketplace case study',
  manufacturing: 'manufacturer website case study',
};

const FROM_CASES: ContentMapRow[] = CASES.map((c) => {
  const k = CASE_KEYWORDS[c.id];
  if (!k) throw new Error(`Case study "${c.id}" has no content-map row in CASE_KEYWORDS`);
  return {
    url: `/work/${c.id}/`,
    pageType: 'Case study',
    primaryKeyword: k,
    secondaryKeywords: c.technology.map((t) => t.toLowerCase()),
    searchIntent: 'Commercial. A buyer looking for proof before a conversation.',
    audience: 'Someone with a comparable problem, checking it has been solved before.',
    purpose: 'Carry the proof, and route to the platform and service the build used.',
    entities: [c.industry, ...c.technology, ...CONSULTANT],
  };
});

/** The core pages, which have no content model of their own. */
const CORE: ContentMapRow[] = [
  {
    url: '/',
    pageType: 'Home',
    primaryKeyword: 'yuvraj raulji',
    secondaryKeywords: [
      'ecommerce ai and technology consultant',
      'ecommerce technology consultant india',
      'independent ecommerce consultant',
    ],
    searchIntent: 'Navigational and commercial. The name, or the role.',
    audience: 'Anyone arriving on the brand, from any channel.',
    purpose: 'Resolve the entity, state the positioning once, and route to the strongest pillars.',
    entities: CONSULTANT,
  },
  {
    url: '/about/',
    pageType: 'Core',
    primaryKeyword: 'about yuvraj raulji',
    secondaryKeywords: ['yuvraj raulji biography', 'ecommerce consultant background'],
    searchIntent: 'Informational. Someone deciding whether to trust the person.',
    audience: 'A buyer doing due diligence before a call.',
    purpose: 'Be authoritative for the biography, and carry the beliefs behind the work.',
    entities: CONSULTANT,
  },
  {
    url: '/work/',
    pageType: 'Core',
    primaryKeyword: 'ecommerce case studies',
    secondaryKeywords: ['magento case study', 'shopify case study', 'headless commerce case study'],
    searchIntent: 'Commercial. Looking for proof.',
    audience: 'A buyer who wants evidence before a conversation.',
    purpose: 'Index the six builds, and say plainly what is not claimed.',
    entities: ['Magento', 'Shopify', 'Headless Commerce', ...CONSULTANT],
  },
  {
    url: '/experience/',
    pageType: 'Core',
    primaryKeyword: 'ecommerce consultant experience',
    secondaryKeywords: ['magento developer experience', 'ecommerce career record'],
    searchIntent: 'Informational. Verifying the record.',
    audience: 'Due diligence, including recruiters and procurement.',
    purpose: 'Carry the employment record, unembellished.',
    entities: CONSULTANT,
  },
  {
    url: '/expertise/',
    pageType: 'Hub',
    primaryKeyword: 'ecommerce technology expertise',
    secondaryKeywords: ['ecommerce consulting services', 'commerce platform expertise'],
    searchIntent: 'Commercial. Scanning the full capability set.',
    audience: 'A buyer who does not yet know which page they need.',
    purpose: 'Route to every platform and pillar, and never compete with them.',
    entities: CONSULTANT,
  },
  {
    url: '/insights/',
    pageType: 'Article hub',
    primaryKeyword: 'ecommerce technology insights',
    secondaryKeywords: ['magento and shopify articles', 'ecommerce architecture writing'],
    searchIntent: 'Informational. Browsing the writing.',
    audience: 'Practitioners, and the answer engines that cite them.',
    purpose: 'Index the articles and pass authority down to the commercial pillars.',
    entities: CONSULTANT,
  },
  {
    url: '/contact/',
    pageType: 'Core',
    primaryKeyword: 'contact ecommerce consultant',
    secondaryKeywords: ['book ecommerce consultation', 'ecommerce consultant enquiry'],
    searchIntent: 'Transactional. Ready to make contact.',
    audience: 'Someone who has already decided to write.',
    purpose: 'Take the enquiry with the least friction, and set the reply expectation.',
    entities: CONSULTANT,
  },
];

/* ═══════════════════════════════════════════════════════════════
   THE MAP, AND THE GATE
   ═══════════════════════════════════════════════════════════════ */

export const CONTENT_MAP: readonly ContentMapRow[] = [
  ...CORE,
  ...FROM_HUBS,
  ...FROM_PILLARS,
  ...FROM_SERVICES,
  FROM_HIRE,
  FROM_MIGRATION,
  ...FROM_CASES,
  ...FROM_POSTS,
];

/** Every indexable route the site publishes, from the same sources the sitemap uses. */
export const INDEXABLE_ROUTES: readonly string[] = [
  '/',
  '/about/',
  '/work/',
  '/experience/',
  '/expertise/',
  '/insights/',
  '/contact/',
  '/hire/',
  '/magento-shopify-migration/',
  ...TECHNOLOGIES.map((t) => techHref(t.slug)),
  ...PILLARS.map((p) => pillarHref(p.slug)),
  ...ALL_PLATFORM_SERVICES.map((s) => serviceHref(s.platform, s.slug)),
  ...CASES.map((c) => `/work/${c.id}/`),
  ...Object.keys(POSTS).map((s) => `/insights/${s}/`),
];

/* ── 1. One primary keyword per page, across the whole site ────── */
{
  const owner = new Map<string, string>();
  for (const row of CONTENT_MAP) {
    const key = row.primaryKeyword.trim().toLowerCase();
    const prev = owner.get(key);
    if (prev) {
      throw new Error(
        `Content map: "${row.primaryKeyword}" is claimed by both ${prev} and ${row.url}`,
      );
    }
    owner.set(key, row.url);
  }
}

/* ── 2. Every row points at a route that exists ─────────────────── */
{
  const routes = new Set(INDEXABLE_ROUTES);
  for (const row of CONTENT_MAP) {
    if (!routes.has(row.url)) {
      throw new Error(`Content map: ${row.url} has a row but is not an indexable route`);
    }
  }
}

/* ── 3. Every route has a row ────────────────────────────────────
   The gate. A page that ships without a content-map row fails the build
   instead of quietly going live unmapped, which is exactly how the first
   thirty-five accumulated. */
{
  const mapped = new Set(CONTENT_MAP.map((r) => r.url));
  const missing = INDEXABLE_ROUTES.filter((u) => !mapped.has(u));
  if (missing.length) {
    throw new Error(
      `Content map: ${missing.length} route(s) have no row: ${missing.join(', ')}. ` +
        'Add one in lib/content-map.ts before the page ships.',
    );
  }
}
