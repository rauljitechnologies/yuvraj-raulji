import type { MetadataRoute } from 'next';
import { PILLARS, pillarHref } from '../lib/expertise';
import { TECHNOLOGIES, techHref } from '../lib/technology';
import { ALL_PLATFORM_SERVICES, serviceHref } from '../lib/platform-services';
import { CASES } from '../lib/brand';
/* Imported for its build-time gate: the content map throws if a route has no
   row, if two rows share a primary keyword, or if a row points at a page that
   does not exist. Importing it here means those checks run on every build,
   because the sitemap is the other artifact that must cover every route. */
import { CONTENT_MAP } from '../lib/content-map';
import { POSTS, postDateUTC } from '../lib/posts';
import { CERTS } from '../lib/certifications';
import { PRIVACY } from '../lib/legal';
import { PRICING } from '../lib/pricing';
import { SERVICES } from '../lib/services-hub';
import { REMOTE } from '../lib/remote';
import { RESUME } from '../lib/resume';
import { SITE_URL } from '../lib/site';

export const dynamic = 'force-static';

const BASE = SITE_URL;

/**
 * `lastModified` previously used `new Date()` for every entry, so every URL
 * claimed to have changed at build time — a freshness signal Google discounts,
 * and one that misrepresents articles which have not been touched in months.
 * Articles now report their own publication date; only the hub pages, whose
 * contents genuinely change when posts are added, use the build date.
 *
 * Six routes were missing entirely and are now listed: /work/, /experience/,
 * /expertise/ and the six pillar pages under it. They were real, rendered,
 * linked pages that the sitemap simply did not mention.
 */
function postDate(date: string): Date {
  return postDateUTC(date) ?? new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date();
  /* Referenced so the import is not elided and the gate above actually runs. */
  void CONTENT_MAP.length;
  return [
    { url: BASE + '/', lastModified: buildDate, changeFrequency: 'weekly', priority: 1 },
    { url: BASE + '/about/', lastModified: buildDate, changeFrequency: 'monthly', priority: 0.9 },
    { url: BASE + '/work/', lastModified: buildDate, changeFrequency: 'monthly', priority: 0.9 },
    { url: BASE + '/insights/', lastModified: buildDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: BASE + '/experience/', lastModified: buildDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: BASE + '/expertise/', lastModified: buildDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: BASE + '/contact/', lastModified: buildDate, changeFrequency: 'yearly', priority: 0.7 },
    /* /hire/ carries transactional intent, so it sits with the core pages
       rather than with the services below them. */
    { url: BASE + '/hire/', lastModified: buildDate, changeFrequency: 'monthly', priority: 0.9 },
    /* The replatforming decision page. Priority with the technology hubs
       rather than the services: it is an entry point for a query in its own
       right, not a spoke under one of them. */
    { url: BASE + '/magento-shopify-migration/', lastModified: buildDate, changeFrequency: 'monthly', priority: 0.8 },
    /* The agency partner channel. Same priority as the technology hubs: it is
       an entry point for its own audience rather than a spoke under one. */
    { url: BASE + '/agencies/', lastModified: buildDate, changeFrequency: 'monthly', priority: 0.8 },
    /* The one purchasable offer, and the destination the commercial pages
       should be routing toward. Priority with the core pages. */
    { url: BASE + '/ecommerce-audit/', lastModified: buildDate, changeFrequency: 'monthly', priority: 0.9 },
    /* The services hub. Priority with /expertise/, which it is the sibling of:
       both route to the platform pages rather than competing with them. */
    { url: BASE + SERVICES.path, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.8 },
    /* Commercial intent, so with the core pages. */
    { url: BASE + PRICING.path, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.8 },
    /* Credentials. A verification page rather than an entry point. */
    { url: BASE + CERTS.path, lastModified: buildDate, changeFrequency: 'yearly', priority: 0.6 },
    /* The employment funnel. Priority with the core pages: /remote-work/ is
       the page the repositioned site is pointed at, and /resume/ is what a
       recruiter opens next. */
    { url: BASE + REMOTE.path, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.9 },
    { url: BASE + RESUME.path, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.8 },
    /* The policy. Lowest priority on the site and `yearly`: it is listed
       because it is a real indexable page and the content-map gate requires
       every route to be here, not because it competes for anything. */
    { url: BASE + PRIVACY.path, lastModified: buildDate, changeFrequency: 'yearly', priority: 0.2 },
    /* The technology landing pages, at the root. Priority above the pillars:
       these are the pages a platform search lands on. */
    ...TECHNOLOGIES.map((t) => ({
      url: `${BASE}${techHref(t.slug)}`,
      lastModified: buildDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    /* Platform service pages, one level under their technology hub. Priority
       below the hubs at 0.8: a hub is the page a platform search lands on and
       the spokes are the pages a service search lands on, which is the less
       common query of the two. Driven off the same registry the routes are,
       so a service cannot ship unlisted. */
    /* The six case studies. Priority with the platform hubs: these are proof
       pages and they are what a buyer asks for before a call. */
    ...CASES.map((c) => ({
      url: `${BASE}/work/${c.id}/`,
      lastModified: buildDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...ALL_PLATFORM_SERVICES.map((svc) => ({
      url: `${BASE}${serviceHref(svc.platform, svc.slug)}`,
      lastModified: buildDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...PILLARS.map((p) => ({
      url: `${BASE}${pillarHref(p.slug)}`,
      lastModified: buildDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...Object.entries(POSTS).map(([slug, p]) => ({
      url: `${BASE}/insights/${slug}/`,
      lastModified: postDate(p.date),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
