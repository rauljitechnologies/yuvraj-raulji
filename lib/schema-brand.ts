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
import { FAQS, HOME_FAQ_COUNT } from './homepage';
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
/**
 * The homepage description, repositioned.
 *
 * Repositioned three times. It described a consultant, then a Senior
 * Software Engineer "open to remote", which is an employment signal, then a
 * freelance developer. It leads with the discipline and the seniority now,
 * and still ends with availability for projects rather than for roles: the
 * offer is in the last clause, where it was.

 * The engagement word is gone from the positioning across the site. This
 * description is one of the places that has room to say it plainly anyway,
 * because a SERP snippet is read by someone deciding whether to click.
 *
 * Under 160 characters, which keeps it inside the SERP limit. It was 167 and
 * the comment claimed otherwise; the last clause is shorter now and says the
 * same thing.
 */
export const HOME_DESCRIPTION =
  'Senior Software Developer and Technology Consultant, 9+ years across Magento 2, Adobe Commerce, Shopify, Next.js and AI. Available for remote project work.';

/* "from the first Magento role in 2016" described a career start the CV does
   not support: the record in lib/career.ts begins in 2018. */
export const ABOUT_DESCRIPTION =
  'Nine years in technology, from the first Magento role in 2018 through Shopify, headless commerce, full-stack engineering and Generative AI.';

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
     * FAQPage, over the SIX questions the FaqContact section renders.
     *
     * It was `faqNode('/', FAQS)` — all fourteen — against a section that
     * showed all fourteen. The section shows six now, and the node has to
     * follow: FAQPage markup describing questions that are not visible text
     * on the page it is attached to is a structured-data violation and a
     * manual-action risk.
     *
     * `HOME_FAQ_COUNT` is the one constant the section, this node and
     * /faq/'s own FAQPage node all slice against, so the homepage's six and
     * /faq/'s eight partition the array exactly: no question is claimed by
     * two pages, and none is claimed by neither.
     */
    faqNode('/', FAQS.slice(0, HOME_FAQ_COUNT)),
    /*
     * The article links the Insights section renders, as an ItemList, so the
     * page's clearest internal-linking signal is machine-readable as pointers
     * at real indexed URLs rather than only as anchors. Both the section and
     * this list slice `WRITING` to three, so they name the same three in the
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

   An ItemList of the six case studies. Each item carries `name`, `url`
   and `image`. Individual case pages exist at /work/{id}/ and the url
   property connects the index ItemList to those pages for AEO resolution.
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
        url: `${SITE_URL}/work/${c.id}/`,
        item: {
          '@type': 'CreativeWork',
          '@id': `${SITE_URL}/work/${c.id}/`,
          name: c.name,
          url: `${SITE_URL}/work/${c.id}/`,
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
  /* Three, matching what the Insights section renders. It was six, which was
     also what the section showed; the section shows three cards now and an
     ItemList claiming six items on a page displaying three is markup
     describing a page that is not there. */
  const shown = WRITING.slice(0, 3);

  return {
    '@type': 'ItemList',
    '@id': `${SITE_URL}/#writing`,
    numberOfItems: shown.length,
    itemListElement: shown.map((w, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: w.title,
      url: `${SITE_URL}/insights/${w.slug}/`,
    })),
  };
}

/* ═══════════════════════════════════════════════════════════════
   FAQ

   The other eight questions, as their own FAQPage.

   ── Why two FAQPage nodes and not one ─────────────────────────────────────

   The homepage shows six questions and emits a FAQPage over those six; this
   page shows the remaining eight and emits a FAQPage over those. Both slice
   `FAQS` against `HOME_FAQ_COUNT`, so the two nodes partition the fourteen
   exactly.

   The alternative, one FAQPage on /faq/ carrying all fourteen, would have
   claimed six questions that are not visible text on /faq/, which is the
   structured-data violation this split exists to avoid. The alternative in
   the other direction, dropping the homepage's node, would give up a rich
   result on the page that earns the traffic.
   ═══════════════════════════════════════════════════════════════ */

export const FAQ_DESCRIPTION =
  'Answers to the questions asked before a first call: platforms, scope, timelines, pricing, communication and what happens after launch.';

export function brandFaqSchema(crumbs: Crumb[]) {
  return graph([
    personNode(),
    websiteNode(),
    webPageNode({
      path: '/faq/',
      name: 'Frequently asked questions',
      description: FAQ_DESCRIPTION,
      crumbs,
    }),
    breadcrumbNode(crumbs),
    faqNode('/faq/', FAQS.slice(HOME_FAQ_COUNT)),
  ]);
}

/* ═══════════════════════════════════════════════════════════════
   AI

   The eight practical AI tracks and the three operational problems that
   moved off the homepage. A WebPage rather than a CollectionPage: it argues
   a position and lists capabilities, it does not index a set of other pages.
   ═══════════════════════════════════════════════════════════════ */

export const AI_DESCRIPTION =
  'Practical AI and automation: LLM applications, agents with a deliberate tool boundary, retrieval augmented generation, AI search and workflow automation.';

export function brandAiSchema(crumbs: Crumb[]) {
  return graph([
    personNode(),
    websiteNode(),
    webPageNode({
      path: '/ai/',
      name: 'AI and automation',
      description: AI_DESCRIPTION,
      crumbs,
    }),
    breadcrumbNode(crumbs),
  ]);
}

/* ═══════════════════════════════════════════════════════════════
   HOW WE WORK

   The engagement models, the remote facts and the agency-alternative
   argument.

   Distinct from /remote-collaboration/, which is linked from it and which
   answers the time-zone question at length. This page answers "how would I
   buy this"; that one answers "can someone in Vadodara actually work with
   us". Two questions, two pages, and each one's canonical points at itself.
   ═══════════════════════════════════════════════════════════════ */

export const HOW_WE_WORK_DESCRIPTION =
  'How an engagement runs: seven engagement models from fixed-scope to retainer, the practical facts of working across time zones, and direct access to the person doing the work.';

export function brandHowWeWorkSchema(crumbs: Crumb[]) {
  return graph([
    personNode(),
    websiteNode(),
    webPageNode({
      path: '/how-we-work/',
      name: 'How we work',
      description: HOW_WE_WORK_DESCRIPTION,
      crumbs,
    }),
    breadcrumbNode(crumbs),
  ]);
}
