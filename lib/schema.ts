/**
 * Structured data for the whole site.
 *
 * One entity, defined once. Every page emits the same `@id` for the person,
 * the company and the website, and references them rather than restating them.
 * Before this file was reorganised, the homepage and the About page each
 * declared a Person with a different `jobTitle` and a different `description`
 * under the same `@id`, which is precisely the condition that stops a search
 * engine resolving an entity confidently.
 *
 * The relationship the brief cares about most is expressed the way schema.org
 * actually models it:
 *
 *     Organization.founder  →  Person
 *     Person.worksFor       →  Organization
 *
 * `Person.founder` is not a property that exists. Declaring one would validate
 * as an unrecognised term and carry no meaning, so the pair above is used
 * instead and it says the same thing in both directions.
 *
 * Nothing here may invent a property value. Where the record has no figure,
 * the property is absent rather than estimated.
 */

import {
  COMPANY_FOUNDED,
  COMPANY_NAME,
  COMPANY_SHORT,
  RAULJI_TECHNOLOGIES_URL,
  TIMELINE,
} from './home';
import { PILLARS, pillarHref, type Pillar } from './expertise';
import { POSTS } from './posts';
import { CERTIFICATIONS, CONTACT, EDUCATION, EXPERIENCE, SITE_URL } from './site';

/* ═══════════════════════════════════════════════════════════════
   STABLE NODE IDENTIFIERS
   ═══════════════════════════════════════════════════════════════ */

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const SERVICE_ID = `${SITE_URL}/#service`;

/**
 * The execution brand is a separate legal entity with its own site, so it gets
 * its own node on its own origin and the Person links to it rather than the two
 * being collapsed into one organisation.
 */
export const COMPANY_ID = `${RAULJI_TECHNOLOGIES_URL}#organization`;

/** Reference to an already-defined node, rather than a second copy of it. */
export const personRef = { '@id': PERSON_ID } as const;

const ADDRESS = {
  '@type': 'PostalAddress',
  addressLocality: 'Vadodara',
  addressRegion: 'Gujarat',
  addressCountry: 'IN',
} as const;

/**
 * The one description of the person, used wherever a description is needed.
 *
 * It carries no company and no foundership. That is not only the Phase 1
 * naming rule: there is exactly one Person node on this site, sharing one
 * `@id` across every page, and it has to say the same thing on all of them.
 * Two bodies under one `@id` is the precise condition that stops a search
 * engine resolving an entity, which is the problem this file was reorganised
 * to fix in the first place.
 *
 * The company relationship is still expressed, from the side schema.org
 * actually models it on: `Organization.founder → Person`, in
 * `organizationNode()` below. Pages outside the personal-brand set emit that
 * node; Home, About and Work do not.
 */
export const PERSON_DESCRIPTION =
  'Yuvraj Raulji works at the intersection of AI, business and eCommerce. Nine years in technology since the first Magento role in 2016, across Magento and Adobe Commerce, Shopify, WooCommerce and headless architecture, on B2B, B2C, D2C and marketplace models.';

/** The positioning string, as a job title. One string, used everywhere. */
export const PERSON_JOB_TITLE = 'AI & eCommerce Consultant';

/** Points at a file that exists in public/. Verified, not assumed. */
const PERSON_IMAGE = `${SITE_URL}/assets/yuvraj-raulji.jpg`;

/* ═══════════════════════════════════════════════════════════════
   CORE NODES
   ═══════════════════════════════════════════════════════════════ */

/**
 * The Person.
 *
 * `full` adds the credential and education record. Those belong on the page
 * that is genuinely about the person (/about/) and are noise on a service page,
 * but the `@id`, name, jobTitle and description never vary between the two.
 */
export function personNode({ full = false }: { full?: boolean } = {}) {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Yuvraj Raulji',
    url: `${SITE_URL}/`,
    email: CONTACT.email,
    telephone: CONTACT.phoneE164,
    image: PERSON_IMAGE,
    jobTitle: PERSON_JOB_TITLE,
    description: PERSON_DESCRIPTION,
    address: ADDRESS,
    sameAs: [CONTACT.linkedin, CONTACT.instagram, CONTACT.facebook],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'eCommerce Consultant',
      occupationalCategory: '15-1252.00',
      description:
        'Commerce platform architecture, selection and migration across Magento 2, Adobe Commerce, Shopify Plus and headless storefronts, and the application of AI to commerce operations.',
    },
    knowsAbout: [
      'E-Commerce Architecture',
      'Magento 2',
      'Adobe Commerce',
      'Shopify Plus',
      'Headless Commerce',
      'Composable Commerce',
      'E-Commerce SEO',
      'Conversion Rate Optimization',
      'Web Performance Optimization',
      'Commerce Platform Migration',
      'B2B E-Commerce',
      'Next.js',
      'GraphQL',
      'AI Automation',
      'Digital Transformation',
      'Large Language Models',
      'Retrieval-Augmented Generation',
      'AI Agents',
      'AI Search',
      'Business Automation',
    ],
    ...(full
      ? {
          /* The current employer is stated as an Organization here because it is
             not the same entity as the company Yuvraj founded, and collapsing
             the two would be a factual error in the graph. */
          alumniOf: EDUCATION.map((e) => ({
            '@type': 'EducationalOrganization',
            name: e.qualification,
          })),
          hasCredential: CERTIFICATIONS.map((c) => ({
            '@type': 'EducationalOccupationalCredential',
            name: c.name,
            credentialCategory: 'certificate',
            recognizedBy: { '@type': 'Organization', name: c.issuer },
            ...(c.url ? { url: c.url } : {}),
          })),
        }
      : {}),
  };
}

/**
 * The company.
 *
 * `founder: personRef` was here and has been removed, along with the same
 * property on serviceNode() below. The brand rule for this site is that no
 * foundership or directorship is asserted anywhere, in copy or in markup, and
 * structured data is named in that rule explicitly.
 *
 * The relationship itself is not lost, which is the reason this was a safe
 * removal rather than a costly one: `employee: personRef` still points this
 * node at the Person, so a consumer can still resolve the two entities to each
 * other. What is gone is the claim about *which* relationship it is. That is a
 * weaker signal than `founder` and it is a deliberate trade.
 */
/*
 * The Organization node was removed on 25 Aug 2026.
 *
 * Section 27 of BRAND-DESIGN-GUIDELINE.md lists the structured data this site
 * may emit (Person, WebSite, BreadcrumbList, Article, FAQPage, ImageObject) and
 * Organization is not on it; section 4 keeps the corporate name out of markup
 * as well as out of copy. lib/schema-brand.ts had already reached the same
 * conclusion for Home, About and Work, so this brings the remaining routes into
 * line rather than inventing a new rule.
 *
 * Nothing pointed at COMPANY_ID by reference: `provider` and `publisher` both
 * carry `personRef`, so entity resolution runs through the Person and is
 * unaffected.
 */

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: 'Yuvraj Raulji',
    description:
      'eCommerce consulting and digital commerce architecture: Magento and Adobe Commerce, Shopify Plus, headless commerce, AI commerce and digital transformation.',
    publisher: personRef,
    inLanguage: 'en-US',
  };
}

/**
 * The consulting practice as an offering. The offer catalogue is generated from
 * the six pillars rather than the eight homepage disciplines, so that every
 * Offer has a page behind it that a crawler can reach.
 */
export function serviceNode() {
  return {
    '@type': 'ProfessionalService',
    '@id': SERVICE_ID,
    name: 'Yuvraj Raulji',
    description:
      'eCommerce consulting and digital commerce architecture across Magento 2 and Adobe Commerce, Shopify Plus, headless commerce, AI commerce and digital transformation.',
    url: `${SITE_URL}/`,
    telephone: CONTACT.phoneE164,
    email: CONTACT.email,
    /* No `founder` here either; see organizationNode(). `provider` carries the
       Person link this node actually needs. */
    provider: personRef,
    address: ADDRESS,
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Expertise',
      itemListElement: PILLARS.map((p) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: p.label,
          description: p.description,
          url: `${SITE_URL}${pillarHref(p.slug)}`,
          provider: personRef,
        },
      })),
    },
  };
}

/* ═══════════════════════════════════════════════════════════════
   PAGE-LEVEL NODES
   ═══════════════════════════════════════════════════════════════ */

export interface Crumb {
  name: string;
  /** Site-relative path, with the trailing slash the export writes. */
  href: string;
}

/**
 * Breadcrumbs. The same array drives the visible trail and this node, so the
 * markup can never describe a path the page does not show.
 *
 * The final crumb keeps its `item`. Google's guidance allows omitting the URL
 * on the last element, but including a self-referential one is also valid and
 * makes the list usable by consumers that do not special-case the tail.
 */
export function breadcrumbNode(crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}${crumbs[crumbs.length - 1].href}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.href}`,
    })),
  };
}

export function webPageNode({
  path,
  name,
  description,
  type = 'WebPage',
  crumbs,
  primaryImage,
}: {
  path: string;
  name: string;
  description: string;
  type?: 'WebPage' | 'ProfilePage' | 'CollectionPage' | 'AboutPage' | 'ContactPage';
  crumbs?: Crumb[];
  primaryImage?: string;
}) {
  return {
    '@type': type,
    '@id': `${SITE_URL}${path}#webpage`,
    url: `${SITE_URL}${path}`,
    name,
    description,
    inLanguage: 'en-US',
    isPartOf: { '@id': WEBSITE_ID },
    about: personRef,
    ...(type === 'ProfilePage' ? { mainEntity: personRef } : {}),
    ...(crumbs ? { breadcrumb: { '@id': `${SITE_URL}${crumbs[crumbs.length - 1].href}#breadcrumb` } } : {}),
    ...(primaryImage ? { primaryImageOfPage: { '@type': 'ImageObject', url: primaryImage } } : {}),
  };
}

/**
 * FAQPage.
 *
 * Only ever called from a page that renders the questions as visible text.
 * FAQPage markup without the matching visible content is a structured-data
 * violation rather than a free win, which is why this takes the same array the
 * component renders instead of a separate list.
 */
export function faqNode(path: string, faqs: readonly { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    '@id': `${SITE_URL}${path}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

const graph = (nodes: unknown[]) => ({ '@context': 'https://schema.org', '@graph': nodes });

/* ═══════════════════════════════════════════════════════════════
   PER-PAGE GRAPHS

   Home, About and Work are not here. They are the personal-brand pages and
   their graphs live in lib/schema-brand.ts, which emits Person, WebSite,
   WebPage and BreadcrumbList and deliberately emits no Organization and no
   ProfessionalService: a service catalogue in the markup is a service
   catalogue, whatever the visible page looks like.
   ═══════════════════════════════════════════════════════════════ */

/** /expertise/ hub. An ItemList of the six pillars, in page order. */
export function expertiseHubSchema(crumbs: Crumb[]) {
  return graph([
    personNode(),
    webPageNode({
      path: '/expertise/',
      name: 'Expertise',
      description:
        'Six practice areas: eCommerce consulting, Magento 2, Shopify, headless commerce, AI commerce and digital transformation.',
      type: 'CollectionPage',
      crumbs,
    }),
    breadcrumbNode(crumbs),
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/expertise/#list`,
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      numberOfItems: PILLARS.length,
      itemListElement: PILLARS.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: p.label,
        url: `${SITE_URL}${pillarHref(p.slug)}`,
      })),
    },
  ]);
}

/** A single expertise pillar. Service + FAQPage, both backed by visible text. */
export function pillarSchema(pillar: Pillar, crumbs: Crumb[]) {
  const path = pillarHref(pillar.slug);
  return graph([
    personNode(),
    webPageNode({
      path,
      name: pillar.label,
      description: pillar.description,
      crumbs,
    }),
    breadcrumbNode(crumbs),
    {
      '@type': 'Service',
      '@id': `${SITE_URL}${path}#service`,
      name: pillar.label,
      serviceType: pillar.label,
      description: pillar.description,
      url: `${SITE_URL}${path}`,
      provider: personRef,
      areaServed: 'Worldwide',
      /* No `offers` node: there is no published price, and an Offer without a
         price is either empty or an invitation to invent one. */
    },
    faqNode(path, pillar.faqs),
  ]);
}

/**
 * /experience/ — the timeline.
 *
 * Modelled as the Person's `hasOccupation` history is not available as a clean
 * schema.org construct, so the page emits a ProfilePage plus the full Person.
 * The timeline itself is rendered as semantic HTML rather than forced into a
 * vocabulary that does not fit it.
 */
export function experienceSchema(crumbs: Crumb[]) {
  return graph([
    personNode({ full: true }),
    webPageNode({
      path: '/experience/',
      name: 'Experience',
      description: 'Nine years of commerce work, from the first Magento role in 2016 to independent practice today.',
      type: 'ProfilePage',
      crumbs,
    }),
    breadcrumbNode(crumbs),
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/experience/#timeline`,
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      numberOfItems: TIMELINE.length,
      itemListElement: TIMELINE.map((t, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `${t.year}: ${t.title}`,
      })),
    },
  ]);
}

/** /contact/ */
export function contactSchema(crumbs: Crumb[]) {
  return graph([
    personNode(),
    serviceNode(),
    webPageNode({
      path: '/contact/',
      name: 'Contact',
      description: `Discuss a commerce platform, migration, headless architecture or AI project with ${'Yuvraj Raulji'}.`,
      type: 'ContactPage',
      crumbs,
    }),
    breadcrumbNode(crumbs),
  ]);
}

/**
 * A blog article.
 *
 * The author is a reference to the one Person node, not a repeated name string.
 * That reference is the entire point of the author block on every article: it
 * ties eight pieces of writing to the same entity the rest of the site defines.
 */
export function articleSchema({
  slug,
  crumbs,
}: {
  slug: string;
  crumbs: Crumb[];
}) {
  const post = POSTS[slug];
  const path = `/blog/${slug}/`;
  const published = new Date(post.date).toISOString();

  return graph([
    personNode(),
    breadcrumbNode(crumbs),
    {
      '@type': 'BlogPosting',
      '@id': `${SITE_URL}${path}#article`,
      headline: post.title,
      description: post.excerpt,
      url: `${SITE_URL}${path}`,
      image: post.img,
      datePublished: published,
      dateModified: published,
      articleSection: post.cat,
      inLanguage: 'en-US',
      author: personRef,
      publisher: personRef,
      isPartOf: { '@id': `${SITE_URL}/blog/#blog` },
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${path}` },
    },
  ]);
}

/** /blog/ hub. */
export function blogHubSchema(crumbs: Crumb[]) {
  const posts = Object.entries(POSTS);
  return graph([
    personNode(),
    breadcrumbNode(crumbs),
    {
      '@type': 'Blog',
      '@id': `${SITE_URL}/blog/#blog`,
      url: `${SITE_URL}/blog/`,
      name: 'Insights on eCommerce Technology & AI',
      description:
        'Practical writing on Magento 2, Shopify, headless commerce, infrastructure, analytics, SEO and AI.',
      inLanguage: 'en-US',
      publisher: personRef,
      author: personRef,
      blogPost: posts.map(([slug, p]) => ({
        '@type': 'BlogPosting',
        '@id': `${SITE_URL}/blog/${slug}/#article`,
        headline: p.title,
        url: `${SITE_URL}/blog/${slug}/`,
        image: p.img,
        datePublished: new Date(p.date).toISOString(),
        author: personRef,
      })),
    },
  ]);
}

/** Employment record, exported so the About page can render it from one place. */
export { EXPERIENCE };
