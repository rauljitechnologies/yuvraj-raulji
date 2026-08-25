/**
 * Structured data for the three personal-brand pages: Home, About, Work.
 *
 * What these graphs emit: Person, WebSite, WebPage / ProfilePage /
 * CollectionPage, BreadcrumbList, ImageObject and ItemList.
 *
 * What they deliberately do not emit:
 *
 *   - Organization. No company is named on these pages in visible copy, so
 *     naming one in the markup would be markup describing a page that does not
 *     exist. It would also be the exact mismatch structured-data guidance warns
 *     about, in the direction that gets markup ignored.
 *   - ProfessionalService / OfferCatalog. A personal site that ships an offer
 *     catalogue in its <head> is a service catalogue whatever the visible page
 *     looks like, and a search engine reads the markup.
 *
 * The Person node itself comes from lib/schema.ts and is shared with every
 * other route, so there is exactly one Person definition on the site and one
 * `@id` carrying it. See the note above PERSON_DESCRIPTION there.
 */

import { CASES, POSITIONING_PLAIN, WRITING } from './brand';
import { FAQS } from './homepage';
import {
  breadcrumbNode,
  faqNode,
  personNode,
  personRef,
  webPageNode,
  websiteNode,
  type Crumb,
} from './schema';
import { SITE_URL } from './site';

const graph = (nodes: unknown[]) => ({ '@context': 'https://schema.org', '@graph': nodes });

/** Points at a file that exists in public/. Verified, not assumed. */
const PERSON_IMAGE = `${SITE_URL}/assets/yuvraj-raulji.jpg`;

export const HOME_DESCRIPTION =
  'Yuvraj Raulji works at the intersection of technology and business, exploring how AI, digital commerce and intelligent systems change the way companies operate, sell and grow.';

export const ABOUT_DESCRIPTION =
  'Nine years in technology, from the first Magento role in 2016 through Magento, Shopify, headless commerce and digital transformation to AI. The thinking behind the work, and how the decisions get made.';

export const WORK_DESCRIPTION =
  'Six builds across headless commerce, Shopify, Magento 2, B2B procurement and marketplace catalogues, with the business decision inside each one.';

/* ═══════════════════════════════════════════════════════════════
   HOME
   ═══════════════════════════════════════════════════════════════ */

export function brandHomeSchema() {
  return graph([
    personNode(),
    websiteNode(),
    webPageNode({
      path: '/',
      name: `Yuvraj Raulji, ${POSITIONING_PLAIN}`,
      description: HOME_DESCRIPTION,
      primaryImage: PERSON_IMAGE,
    }),
    {
      '@type': 'ImageObject',
      '@id': `${PERSON_IMAGE}#primaryimage`,
      url: PERSON_IMAGE,
      width: 400,
      height: 400,
      caption: 'Yuvraj Raulji',
    },
    /*
     * FAQPage, from the same FAQS array the Questions section renders. The
     * node is only legitimate because those ten questions and answers are
     * visible text on this page; if that section is ever removed, this comes
     * out with it.
     */
    faqNode('/', FAQS),
  ]);
}

/* ═══════════════════════════════════════════════════════════════
   ABOUT

   ProfilePage with the full Person, credentials and education included. This
   is the page that should define the entity for search engines and answer
   engines, so it is the one that carries the record.
   ═══════════════════════════════════════════════════════════════ */

export function brandAboutSchema(crumbs: Crumb[]) {
  return graph([
    personNode({ full: true }),
    websiteNode(),
    webPageNode({
      path: '/about/',
      name: 'About Yuvraj Raulji',
      description: ABOUT_DESCRIPTION,
      type: 'ProfilePage',
      crumbs,
      primaryImage: PERSON_IMAGE,
    }),
    breadcrumbNode(crumbs),
  ]);
}

/* ═══════════════════════════════════════════════════════════════
   WORK

   An ItemList of the six case studies. Each item carries `name` and `image`
   but no `url`: none of the six has a page of its own on this site, and a
   ListItem pointing at an in-page fragment claims a document that does not
   exist. When individual case-study routes are built, the url goes back in.
   ═══════════════════════════════════════════════════════════════ */

export function brandWorkSchema(crumbs: Crumb[]) {
  return graph([
    personNode(),
    websiteNode(),
    webPageNode({
      path: '/work/',
      name: 'Selected work',
      description: WORK_DESCRIPTION,
      type: 'CollectionPage',
      crumbs,
    }),
    breadcrumbNode(crumbs),
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/work/#list`,
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      numberOfItems: CASES.length,
      itemListElement: CASES.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: {
          '@type': 'CreativeWork',
          name: c.name,
          description: c.challenge,
          about: c.industry,
          creator: personRef,
          image: `${SITE_URL}${c.img}`,
        },
      })),
    },
  ]);
}

/**
 * The article previews the homepage renders. Emitted as a separate ItemList so
 * the six visible cards are machine-readable as pointers to real, indexed
 * URLs, which is the internal-linking signal the section exists to send.
 */
export function homeWritingList() {
  return {
    '@type': 'ItemList',
    '@id': `${SITE_URL}/#writing`,
    numberOfItems: WRITING.length,
    itemListElement: WRITING.map((w, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: w.title,
      url: `${SITE_URL}/blog/${w.slug}/`,
    })),
  };
}
