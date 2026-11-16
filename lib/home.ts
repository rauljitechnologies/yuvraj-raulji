/**
 * Shared homepage and interior-page content model.
 *
 * ── What this file used to be, and why it is a tenth of the size ───────────
 *
 * It was 803 lines modelling the whole of a previous homepage: a hero, a
 * credibility band, a position statement, a FOUNDER section, a problems list,
 * an expertise grid, a work section, a content feed, an experience section,
 * ten FAQs and a closing call to action. The homepage was rebuilt against
 * lib/homepage.ts and components/homepage-sections/, and when it was, nothing
 * was deleted here: 94% of this file became unreachable and stayed exported.
 *
 * Three exports are actually imported anywhere, and they are what remains:
 *
 *   STATS        app/experience/page.tsx
 *   TIMELINE     app/experience/page.tsx
 *   WORK_ITEMS   app/expertise/[slug]/, components/technology/,
 *                components/platform/
 *
 * The dead 700 lines are not a tidiness problem, which is why they went rather
 * than being left alone. They carried a `FOUNDER` block headlined "Founder of
 * Raulji Technologies.", a `FOUNDER_LINE`, a section registry entry labelled
 * "Founder", and two FAQ answers, one of which was the question "Is Yuvraj
 * Raulji the founder of Raulji Technologies?" answered "Yes". Section 3 of
 * BRAND-DESIGN-GUIDELINE.md rules that word off this site and the brand brief
 * extends the rule to CTO, Co-Founder and Business Owner. None of it was
 * rendering, so none of it reached the built HTML, but all of it was one
 * `import` away from doing so, which is not a state a naming rule survives.
 *
 * The company constants went with it: `COMPANY_NAME`, `COMPANY_SHORT`,
 * `COMPANY_FOUNDED` and `RAULJI_TECHNOLOGIES_URL` were read only by
 * `COMPANY_ID` in lib/schema.ts, which was itself unreferenced after the
 * Organization node was removed on 25 Aug 2026.
 *
 * Copy in this file avoids em-dashes on purpose.
 */

import { CAREER_STATS } from './career';

/* ═══════════════════════════════════════════════════════════════
   THE VERIFIED FIGURES
   ═══════════════════════════════════════════════════════════════ */

export interface Stat {
  value: string;
  label: string;
  note: string;
}

/**
 * Derived from `CAREER_STATS` in lib/career.ts rather than restated.
 *
 * These four numbers were authored here with their own notes, and one of them
 * claimed "the first builds go back further, to 2014", which does not appear
 * in the employment record and contradicts the career start the CV states.
 * CONTENT-PRINCIPLES.md section 1 requires the context that says where a
 * figure came from, so the figure and its provenance now live together in one
 * place and every page reads them from there.
 *
 * `note` takes the `context` string for exactly that reason: the sentence under
 * the number on the page is the sentence that justifies it.
 */
export const STATS: Stat[] = CAREER_STATS.map((s) => ({
  value: s.value,
  label: s.label,
  note: s.context,
}));

/* ═══════════════════════════════════════════════════════════════
   THE CAREER RAIL
   ═══════════════════════════════════════════════════════════════ */

export interface TimelineEntry {
  year: string;
  title: string;
  body: string;
}

/**
 * The rail on /experience/, above the role-by-role record.
 *
 * Reconciled against the CV. Three entries were removed and one was added:
 *
 *   2014  "The first builds"      not in the employment record
 *   2016  "Working independently" not in the employment record, and it dated
 *                                 the career two years before it starts
 *   2025  "Incorporated"          the company this site does not publish
 *   2026  IBM certification       added; it is on the record and is the most
 *                                 recent thing on it
 *
 * The education entry stays, because the qualifications and their periods are
 * in `EDUCATION` in lib/site.ts. It is deliberately not titled as the start of
 * the career: the career starts in 2018, which is the next entry.
 */
export const TIMELINE: TimelineEntry[] = [
  {
    year: '2010',
    title: 'Information Technology',
    body:
      'Diploma from 2010 to 2013, then a bachelor\u2019s degree in Information Technology from 2013 to 2016.',
  },
  {
    year: '2018',
    title: 'Where the Magento work started',
    body:
      'Module development and store builds, then Shopify storefronts for consumer brands, and the first hands-on Magento 2 and multi-platform architecture.',
  },
  {
    year: '2018',
    title: 'Gulf retail, at scale',
    body:
      'Commerce builds for retail groups in the Saudi market: grocery, commercial kitchen equipment and fashion. First headless frontends over REST and GraphQL.',
  },
  {
    year: '2020',
    title: 'Senior Magento, B2B',
    body:
      'High-traffic B2B commerce. Automated 90% of order and quote processing, and cut page load times by 60% through Varnish, Redis, full-page cache and database tuning.',
  },
  {
    year: '2023',
    title: 'Team Lead',
    body:
      'Architecture direction across multi-store Magento 2 builds. Five-level approval workflows for development, B2B orders, quotes and vendor management.',
  },
  {
    year: '2026',
    title: 'Generative AI',
    body:
      'Generative AI certification with IBM and AcceleratorX: LLM concepts, retrieval-augmented generation, prompt engineering and AI workflow automation.',
  },
];

/* ═══════════════════════════════════════════════════════════════
   SELECTED WORK, AS CARDS

   Read by the technology hubs, the platform service pages and the
   expertise pillars, each of which resolves a subset by `id` against
   the same six builds the case studies in lib/brand.ts cover. One id
   renamed here is renamed on every one of those pages at once.
   ═══════════════════════════════════════════════════════════════ */

export interface WorkItem {
  id: string;
  name: string;
  category: string;
  summary: string;
  stack: string[];
  outcome?: string;
  img: string;
  alt: string;
  /** Intrinsic pixels. Present so width/height can be set and nothing shifts. */
  imgW: number;
  imgH: number;
  href: string;
}

export const WORK_ITEMS: WorkItem[] = [
  {
    id: 'fashion-d2c',
    name: 'Headless fashion storefront',
    category: 'Headless commerce · Fashion',
    summary:
      'High-performance headless commerce architecture for India’s fastest-growing men’s fashion brand.',
    stack: ['Headless', 'Storefront API', 'Performance'],
    img: '/assets/case-covers/fashion-d2c-cover.webp',
    alt: 'Fashion D2C storefront headless commerce storefront',
    imgW: 1920,
    imgH: 1290,
    href: '/work/fashion-d2c/',
  },
  {
    id: 'plant-store',
    name: 'Online plant store',
    category: 'Shopify · D2C',
    summary:
      'India’s most trusted online plant store on Shopify, with OTP login, GoKwik one-page checkout and custom product pages.',
    stack: ['Shopify', 'GoKwik checkout', 'Custom PDP'],
    img: '/assets/case-covers/plant-store-cover.webp',
    alt: 'Online plant store Shopify storefront',
    imgW: 1920,
    imgH: 1280,
    href: '/work/plant-store/',
  },
  {
    id: 'sports-nutrition',
    name: 'Sports nutrition store',
    category: 'E-commerce · Health & fitness',
    summary:
      'Online fitness and supplement store delivering authentic sports nutrition at speed.',
    stack: ['Commerce build', 'Catalogue', 'Checkout'],
    img: '/assets/case-covers/sports-nutrition-cover.webp',
    alt: 'Sports nutrition store sports nutrition storefront',
    imgW: 1920,
    imgH: 1047,
    href: '/work/sports-nutrition/',
  },
  {
    id: 'b2b-procurement',
    name: 'Procurement and approvals platform',
    category: 'Custom platform · B2B',
    summary:
      'Scalable B2B procurement platform streamlining purchase requests and approvals.',
    stack: ['B2B workflows', 'Approvals', 'Integrations'],
    img: '/assets/case-covers/b2b-procurement-cover.webp',
    alt: 'A B2B procurement platform, built on Magento 2',
    imgW: 1920,
    imgH: 1080,
    href: '/work/b2b-procurement/',
  },
  {
    id: 'marketplace',
    name: 'Multi-category marketplace',
    category: 'Magento 2 · Marketplace',
    summary:
      'A scalable Magento 2 platform powering a wide multi-category retail catalogue.',
    stack: ['Magento 2', 'Multi-category', 'Scale'],
    img: '/assets/case-covers/marketplace-cover.webp',
    alt: 'Multi-category marketplace Magento 2 marketplace',
    imgW: 1920,
    imgH: 1440,
    href: '/work/marketplace/',
  },
  {
    id: 'manufacturing',
    name: 'Engineering manufacturer platform',
    category: 'Web platform · Manufacturing',
    summary: 'A modern engineering brand platform built for discovery and enquiry.',
    stack: ['Web platform', 'Technical SEO', 'Content'],
    outcome: '3x traffic growth and 45% better engagement',
    img: '/assets/case-covers/manufacturing-cover.webp',
    alt: 'Engineering manufacturer platform engineering brand platform',
    imgW: 1920,
    imgH: 867,
    href: '/work/manufacturing/',
  },
];
