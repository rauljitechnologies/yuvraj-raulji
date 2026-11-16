/**
 * The employment record.
 *
 * ── What changed, and why the employers are named now ──────────────────────
 *
 * This record previously lived in `EXPERIENCE` in lib/site.ts with every
 * employer anonymised: "B2B commerce platform", "Commerce agency, Gulf
 * retail", "Digital agency". That was section 4 of BRAND-DESIGN-GUIDELINE.md
 * being applied to the wrong set of names. Section 4 keeps off this site "any
 * corporate brand or historical company name that has previously been
 * requested for removal", and the names it was written about are the ones in
 * `CURRENT_ROLES`: Nxtby, Ariya InfoTech, Raulji Technologies, Raulji Group.
 * Those are gone, with the `FOUNDER` block in lib/home.ts and the `founder`
 * properties in lib/schema.ts, and they are not coming back.
 *
 * The four employers below were never on this site and were never asked to be
 * removed. They are the employment record, they are what a recruiter verifies
 * against LinkedIn, and an anonymised record is worth nothing to the audience
 * this site now exists for: "B2B commerce platform" is not a company a
 * background check can confirm. They are named.
 *
 * ── The rule this file is written under ────────────────────────────────────
 *
 * CONTENT-PRINCIPLES.md section 1: no invented experience, and no figure
 * without the context that says where it came from. Every `period`, `org` and
 * `title` below is as given in the CV and is not adjusted to make a timeline
 * tidier. Every bullet is carried over from the record that was already
 * verified on 12 Aug 2026; none has been written for this file.
 *
 * Clients inside an employment are described rather than named. That is not
 * the section 4 rule, it is the confidentiality one: a retail group that
 * engaged an employer did not engage this site, and naming it here publishes a
 * relationship that is not mine to publish.
 */

export interface CareerRole {
  title: string;
  /** The employer, named. */
  org: string;
  /** Verbatim from the CV. Never widened or tidied. */
  period: string;
  location?: string;
  /** Still held. Drives the `Present` affordance and the schema end date. */
  current?: boolean;
  summary: string;
  /** Verified achievements. Empty is honest; invented is not. */
  points: readonly string[];
  /** The stack this role was actually delivered on. */
  stack: readonly string[];
}

/**
 * Reverse chronological, which is the order a recruiter reads.
 *
 * Two entries share one employer. They are listed separately rather than
 * merged into one block with a promotion arrow, because the brief is explicit
 * that historical designations are not modified, and a single row titled
 * "Senior Magento Developer to Team Lead" is a modification: it hides which
 * work was done in which seat, which is the thing a technical interviewer
 * asks about.
 */
export const CAREER: readonly CareerRole[] = [
  {
    title: 'Team Lead',
    org: 'Archer Business Solution Private Limited',
    period: '2023 to 2026',
    current: true,
    summary:
      'Leading a development team across Magento 2 and multi-platform commerce builds: architecture direction, code review and delivery accountability.',
    points: [
      'Led delivery of 12+ multi-store Magento 2 platforms handling 500K+ SKUs and 1M+ monthly users',
      'Cut development cycle time by 30% by introducing structured workflows and approval processes',
      'Designed 5-level approval workflows for development, B2B orders, quotes and vendor management',
      'Set architecture direction for multi-store setups, custom modules and B2B workflows',
      'Tuned server, caching, CDN and cloud infrastructure for performance and reliability',
    ],
    stack: ['Magento 2', 'Adobe Commerce', 'AWS', 'Redis', 'Varnish', 'Elasticsearch', 'GraphQL'],
  },
  {
    title: 'Senior Magento Developer',
    org: 'Archer Business Solution Private Limited',
    period: 'March 2020 to 2023',
    summary:
      'Full-stack Magento 2 development for high-traffic B2B commerce: custom modules, multi-store setups and end-to-end API integration.',
    points: [
      'Automated 90% of B2B order and quote processes, reducing approval cycle time by 40%',
      'Improved site speed by 60% through Varnish, Redis, full-page cache, CDN and database tuning',
      'Built B2B order and quote management with role-based permissions and multi-level approvals',
      'Ran Magento 2 server setup on AWS: EC2, RDS, S3, load balancing and auto-scaling',
      'Integrated payment gateways, logistics, CRM and ERP systems',
    ],
    stack: ['Magento 2', 'PHP', 'MySQL', 'AWS', 'REST APIs', 'ERP integration', 'CRM integration'],
  },
  {
    title: 'Senior Magento Developer',
    org: 'Magento IT Solutions Private Limited',
    period: '2018 to 2020',
    summary:
      'Commerce builds for retail groups in the Gulf market: grocery, commercial kitchen equipment and fashion.',
    points: [
      'Built B2B and B2C stores localised for the Saudi Arabian market',
      'Implemented layered navigation, dynamic pricing and custom checkout flows',
      'Delivered headless frontends over REST and GraphQL for mobile and PWA',
      'Integrated loyalty programmes, discount engines and customer dashboards',
    ],
    stack: ['Magento 2', 'PHP', 'REST APIs', 'GraphQL', 'PWA', 'Knockout.js'],
  },
  {
    title: 'Software Engineer',
    org: 'OrionCoders Digital Private Limited',
    period: 'March 2018 to July 2018',
    location: 'Vadodara',
    summary:
      'Shopify development for consumer brands, including skincare storefronts for a global personal-care group.',
    points: [
      'Built customised Shopify storefronts with third-party app and API integration',
      'Wrote custom JavaScript for dynamic product display and frontend behaviour',
      'First hands-on exposure to Magento 2 and multi-platform commerce architecture',
    ],
    stack: ['Shopify', 'Liquid', 'JavaScript', 'Shopify APIs'],
  },
  {
    title: 'Magento Developer',
    org: 'Sinelogix Technologies',
    period: '2018',
    location: 'Vadodara',
    summary: 'Where the Magento work started: module development and store builds.',
    /* Empty on purpose. The achievements from this seat are not in the
       verified record, and CONTENT-PRINCIPLES.md section 1 treats a borrowed
       bullet as an invented one. */
    points: [],
    stack: ['Magento', 'PHP', 'MySQL'],
  },
];

/**
 * The first professional role, and the year the 9+ years is counted from.
 *
 * Stated as a constant because three pages print it and a fourth computes
 * against it. It read 2016 across the site until the CV was reconciled; the
 * record starts in 2018 and the figure the brief states is 9+ years, so both
 * are carried here together rather than one being derived from the other and
 * silently disagreeing.
 */
export const CAREER_START_YEAR = 2018;

/** Current employer, for the Person node's `worksFor`. */
export const CURRENT_EMPLOYER = CAREER.find((r) => r.current) ?? CAREER[0];

/**
 * Industries the record actually covers. Named because /about/ and
 * /remote-work/ both claim breadth, and a claim of breadth with no list under
 * it is the kind of sentence CONTENT-PRINCIPLES.md exists to stop.
 *
 * Not `INDUSTRIES`: lib/site.ts already exports that name, for the richer
 * sector cards with imagery and B2B/B2C labels. This is the flat list of what
 * the employment record touched, which is a different claim from a sector the
 * site markets into.
 */
export const RECORD_INDUSTRIES = [
  'Grocery and supermarket retail',
  'Fashion and apparel',
  'Sports nutrition and supplements',
  'Commercial kitchen equipment',
  'Industrial manufacturing and safety equipment',
  'Horticulture and lifestyle retail',
  'Multi-vendor marketplaces',
  'Personal care and skincare',
] as const;

/**
 * The verified headline figures.
 *
 * `context` is required on every one of them. A percentage with no account of
 * where it happened is unsupported, which CONTENT-PRINCIPLES.md section 1
 * treats as invention, and these are the numbers the homepage prints largest.
 */
export const CAREER_STATS = [
  {
    value: '9+',
    label: 'Years Experience',
    context: `Continuous professional engineering since ${CAREER_START_YEAR}, across four employers.`,
  },
  {
    value: '50+',
    label: 'Projects Delivered',
    context: 'Across Magento 2, Adobe Commerce, Shopify, WooCommerce and headless builds.',
  },
  {
    value: '1M+',
    label: 'Monthly Users',
    context: 'Peak monthly traffic served by the multi-store Magento 2 platforms led from 2023.',
  },
  {
    value: '500K+',
    label: 'Products',
    context: 'SKU count across the multi-store catalogues on those same platforms.',
  },
  {
    value: '40+',
    label: 'Brands Served',
    context: 'Distinct brands and storefronts delivered for, as an employee of the four employers above.',
  },
] as const;
