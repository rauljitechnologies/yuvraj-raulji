/**
 * Platform service pages: the spokes under a technology hub.
 *
 * One data model, one route file per platform, so a heading level, a schema
 * field or a call to action is fixed in one place rather than in seven. This
 * mirrors lib/expertise.ts and app/expertise/[slug]/, which is the pattern
 * already proven on this site; the alternative was seven near-identical page
 * files per platform and thirty-five across the five platforms that will
 * eventually have them.
 *
 * ── The rules this file is written under ────────────────────────────────────
 *
 * 1. **One primary intent per page, and it is declared.** Every service
 *    carries `primaryKeyword`, and no two services in a platform share one.
 *    The hub above them never targets a spoke's query either: /magento/ owns
 *    "magento consultant", the entity term, and /magento/consulting/ owns
 *    "magento consulting services", the service term. Cannibalisation is
 *    prevented here, at the model, rather than discovered later in Search
 *    Console.
 *
 * 2. **Adjacent pages state what they are not.** Migration and upgrade are the
 *    same word to most buyers, so each carries a `boundary` that says in the
 *    visible copy which job it is not and links to the page that is. That line
 *    is not a courtesy; it is the thing that stops the two pages merging.
 *
 * 3. **No invented experience.** CONTENT-PRINCIPLES.md §1. A figure appears in
 *    `outcomes` only when it is in the verified record, and it always carries
 *    the `context` that says where it came from. Three of these seven services
 *    have no measured number attached to them and they say so rather than
 *    borrowing one from a neighbour.
 *
 * 4. **Every page answers questions directly.** `quickAnswer` is the
 *    extractable definition, and `faqs` is rendered as open text on the page,
 *    which is the only condition under which the FAQPage markup built from the
 *    same array is legitimate.
 *
 * 5. **Descriptive anchors only.** `related` carries the sentence the link is
 *    worth, never "learn more" and never the exact-match keyword repeated.
 *
 * Copy in this file avoids em-dashes on purpose.
 */

import { POSTS } from './posts';
import { HEADLESS_SERVICES } from './services/headless';
import { MAGENTO_SERVICES } from './services/magento';
import { SHOPIFY_SERVICES } from './services/shopify';
import { WOOCOMMERCE_SERVICES } from './services/woocommerce';
import { WORDPRESS_SERVICES } from './services/wordpress';
import { PILLARS, pillarHref } from './expertise';
import { TECHNOLOGIES, TECHNOLOGIES_BY_SLUG, techHref } from './technology';

/* ═══════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════ */

/** A descriptive internal link. Generic anchors are banned. */
export interface ServiceAnchor {
  href: string;
  /** The anchor text. Says where it goes and why. */
  label: string;
  note?: string;
}

/** The symptom as the buyer says it, and what it is costing them. */
export interface ServiceProblem {
  symptom: string;
  impact: string;
}

export interface ServiceStep {
  num: string;
  title: string;
  body: string;
}

export interface ServiceCapability {
  group: string;
  items: readonly string[];
}

/**
 * A business outcome. `metric` stays empty unless the number is in the
 * verified record, and `context` is required whenever a metric is set: a
 * percentage with no account of where it happened is unsupported, which
 * CONTENT-PRINCIPLES.md §1 treats as invention.
 */
export interface ServiceOutcome {
  metric?: string;
  label: string;
  body: string;
  context?: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface PlatformService {
  /** Parent technology slug, resolved against TECHNOLOGIES_BY_SLUG. */
  platform: string;
  /** Second URL segment. `/magento/consulting/`. */
  slug: string;
  /** Nav and card label, short. */
  label: string;
  /** Eyebrow above the H1. Pipe separator, never a multiplication sign. */
  eyebrow: string;
  /** The single H1, held as lines because each break does typographic work. */
  h1: readonly string[];
  lede: string;
  /** This page's own call to action, in its own words. */
  cta: string;
  /** <title>, under about 60 characters. */
  title: string;
  /** Meta description, under about 155 characters. */
  description: string;

  /* ── The content map fields, carried on the page itself ── */

  /** The one query this page owns. No sibling may repeat it. */
  primaryKeyword: string;
  secondaryKeywords: readonly string[];
  searchIntent: string;
  audience: string;
  /** Why the page exists, in one line. Not rendered; it governs the writing. */
  purpose: string;
  /** The entities the page has to name consistently for AI retrieval. */
  entities: readonly string[];

  /** The extractable definition, and who the service suits. */
  quickAnswer: {
    question: string;
    answer: string;
    bestFor: readonly string[];
  };

  /** The anti-cannibalisation line, rendered in visible copy. */
  boundary?: {
    body: string;
    href: string;
    label: string;
  };

  problems: readonly ServiceProblem[];
  approach: readonly ServiceStep[];
  capabilities: readonly ServiceCapability[];
  outcomes: readonly ServiceOutcome[];
  /** The sentence that qualifies the outcomes above. Never a disclaimer. */
  outcomesNote: string;
  faqs: readonly ServiceFaq[];
  /** Work item ids, resolved against WORK_ITEMS in lib/home.ts. */
  cases: readonly string[];
  /** One line on why these particular builds are on this page. */
  casesNote?: string;
  /** Article slugs, resolved against POSTS in lib/posts.ts. */
  posts: readonly string[];
  related: readonly ServiceAnchor[];
  finalHeadline: readonly string[];
}

/** Every platform service lives one level under its platform. */
export function serviceHref(platform: string, slug: string): string {
  return `/${platform}/${slug}/`;
}


/* ═══════════════════════════════════════════════════════════════
   REGISTRY
   ═══════════════════════════════════════════════════════════════ */

/** Every platform service on the site, in page order, grouped by platform. */
export const PLATFORM_SERVICES: Record<string, readonly PlatformService[]> = {
  magento: MAGENTO_SERVICES,
  shopify: SHOPIFY_SERVICES,
  woocommerce: WOOCOMMERCE_SERVICES,
  wordpress: WORDPRESS_SERVICES,
  'headless-commerce': HEADLESS_SERVICES,
};

/** Flat list, for the sitemap and for cross-platform checks. */
export const ALL_PLATFORM_SERVICES: readonly PlatformService[] =
  Object.values(PLATFORM_SERVICES).flat();

/** Services under one platform, or an empty list. Used by the hub pages. */
export function servicesFor(platform: string): readonly PlatformService[] {
  return PLATFORM_SERVICES[platform] ?? [];
}

export function findService(platform: string, slug: string): PlatformService | undefined {
  return servicesFor(platform).find((s) => s.slug === slug);
}

/**
 * Build-time integrity checks.
 *
 * These throw during `next build` rather than shipping a page that links to
 * nothing or two pages that compete for one query. Each has cost a real
 * afternoon somewhere on this site:
 *
 *   - A `posts` slug that no longer exists rendered an empty related block.
 *   - A `platform` with no matching technology would produce a page whose
 *     breadcrumb points at a 404.
 *   - Two services sharing a `primaryKeyword` is the exact cannibalisation the
 *     model exists to prevent, and it is invisible on the rendered page.
 */
for (const service of ALL_PLATFORM_SERVICES) {
  if (!TECHNOLOGIES_BY_SLUG[service.platform]) {
    throw new Error(`Unknown platform "${service.platform}" on service "${service.slug}"`);
  }
  for (const slug of service.posts) {
    if (!POSTS[slug]) {
      throw new Error(`Unknown post "${slug}" on ${service.platform}/${service.slug}`);
    }
  }
}

/**
 * Every `related` and `boundary` href must resolve to a page that exists.
 *
 * This check exists because the first draft of the Magento cluster linked
 * forward to /expertise/technical-seo/, /expertise/ecommerce-cro/ and
 * /expertise/website-management/, which are on the roadmap and not yet built.
 * Three service pages therefore shipped with a link to a 404, and nothing in
 * the type system had an opinion about it. A forward link is the easiest
 * mistake to make in a model whose whole purpose is cross-linking.
 */
const KNOWN_ROUTES = new Set<string>([
  '/',
  '/about/',
  '/work/',
  '/experience/',
  '/blog/',
  '/contact/',
  '/expertise/',
  '/hire/',
  ...TECHNOLOGIES.map((t) => techHref(t.slug)),
  ...PILLARS.map((p) => pillarHref(p.slug)),
  ...Object.keys(POSTS).map((slug) => `/blog/${slug}/`),
  ...ALL_PLATFORM_SERVICES.map((s) => serviceHref(s.platform, s.slug)),
]);

for (const service of ALL_PLATFORM_SERVICES) {
  const hrefs = [
    ...service.related.map((r) => r.href),
    ...(service.boundary ? [service.boundary.href] : []),
  ];
  for (const href of hrefs) {
    if (!KNOWN_ROUTES.has(href)) {
      throw new Error(
        `${service.platform}/${service.slug} links to "${href}", which is not a page on this site`,
      );
    }
  }
}

/**
 * No two pages may claim the same primary keyword, **across all platforms**.
 *
 * The check started per-platform and had to become global the moment
 * WooCommerce and WordPress arrived together. WooCommerce runs on WordPress, so
 * those two clusters are five pairs of pages about one stack, and they are the
 * worst duplicate-intent risk on this site by a distance. A per-platform check
 * would have happily allowed /woocommerce/optimization/ and
 * /wordpress/optimization/ to target the same phrase, which is precisely the
 * collision nobody would notice on the rendered pages.
 *
 * The hub entity terms are seeded first, so a spoke can never claim the query
 * its own parent is written to answer.
 */
const keywordOwners = new Map<string, string>();
for (const platform of Object.keys(PLATFORM_SERVICES)) {
  keywordOwners.set(`${platform} consultant`, `${platform} (hub)`);
}
for (const service of ALL_PLATFORM_SERVICES) {
  const key = service.primaryKeyword.toLowerCase();
  const owner = keywordOwners.get(key);
  const self = `${service.platform}/${service.slug}`;
  if (owner) {
    throw new Error(`Keyword collision: "${service.primaryKeyword}" is claimed by both ${owner} and ${self}`);
  }
  keywordOwners.set(key, self);
}

/**
 * Every WooCommerce and WordPress service must carry a visible boundary.
 *
 * These two clusters are the only pages on the site that describe one stack
 * from two sides: WooCommerce runs on WordPress, so /woocommerce/optimization/
 * and /wordpress/optimization/ are about the same install. The distinction that
 * keeps them apart, the store against the site, exists in the copy and nowhere
 * else, so a page that drops its boundary block silently merges with its twin.
 *
 * The rule deliberately does **not** cover a slug shared across different
 * platforms. An earlier version did, and it fired on magento/maintenance,
 * magento/integrations and shopify/integrations, which was a false positive:
 * "magento support and maintenance" and "shopify store maintenance" name their
 * platform in the query and compete for nothing. Forcing a boundary block onto
 * those pages would have produced three paragraphs telling readers a Shopify
 * page is not about Magento, which is filler wearing a guard rail.
 */
const STACK_TWINS = new Set(['woocommerce', 'wordpress']);
for (const service of ALL_PLATFORM_SERVICES) {
  if (STACK_TWINS.has(service.platform) && !service.boundary) {
    throw new Error(
      `${service.platform}/${service.slug} shares the WordPress stack with its twin and must declare a boundary`,
    );
  }
}
