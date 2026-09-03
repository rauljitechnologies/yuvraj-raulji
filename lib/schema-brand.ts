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

import { CASES, WRITING } from './brand';
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

/**
 * One description, carried by <meta name="description">, og:description,
 * twitter:description and the WebPage node. It names the job and the outcomes
 * rather than the interests, which is the same change the <title> and the H1
 * made: a search engine resolving this entity should meet one consistent
 * account of it in all four places.
 */
export const HOME_DESCRIPTION =
  'Yuvraj Raulji is an eCommerce, AI and technology consultant helping businesses improve commerce architecture, performance, customer experience, AI adoption, technical SEO and digital growth.';

export const ABOUT_DESCRIPTION =
  'Nine years in technology, from the first Magento role in 2016 through Shopify, headless commerce and AI. The thinking behind the work, and how it is decided.';

export const WORK_DESCRIPTION =
  'Six builds across headless commerce, Shopify, Magento 2, B2B procurement and marketplace catalogues, with the business decision inside each one.';

/* ═══════════════════════════════════════════════════════════════
   HOME
   ═══════════════════════════════════════════════════════════════ */

/**
 * The page name in the markup, and the same string the <title> carries.
 *
 * It was `Yuvraj Raulji, ${POSITIONING_PLAIN}`, which resolved to "Yuvraj
 * Raulji, AI, business and eCommerce": a description of interests, and the
 * fourth different account of this person after the title, the H1 and the
 * Person node, which all say "eCommerce, AI & Technology Consultant". The
 * whole argument in the comment above is that those must agree, so this one
 * agrees too.
 */
export const HOME_NAME = 'Yuvraj Raulji, eCommerce, AI & Technology Consultant';

export function brandHomeSchema() {
  return graph([
    personNode(),
    websiteNode(),
    webPageNode({
      path: '/',
      name: HOME_NAME,
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
     * node is only legitimate because every one of those questions and answers
     * is visible text on this page; if that section is ever removed, this
     * comes out with it.
     */
    faqNode('/', FAQS),
    /*
     * The six article links the Insights section renders, as an ItemList.
     * This function has existed since the section did and was never added to
     * the graph, so the page's clearest internal-linking signal, six pointers
     * at real indexed URLs, was machine-readable only as six anchors. Both the
     * section and this list slice WRITING, so they name the same six in the
     * same order.
     */
    homeWritingList(),
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
  /* Sliced against what the section actually renders. WRITING already holds
     six, so this is a guard rather than a change: if that array is ever
     widened, the list would start claiming articles the page does not show,
     which is markup describing a page that is not there. */
  const shown = WRITING.slice(0, 6);

  return {
    '@type': 'ItemList',
    '@id': `${SITE_URL}/#writing`,
    numberOfItems: shown.length,
    itemListElement: shown.map((w, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: w.title,
      url: `${SITE_URL}/blog/${w.slug}/`,
    })),
  };
}
