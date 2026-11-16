/**
 * /remote-work/ : the recruiter funnel.
 *
 * ── What this page is for, and why it is separate from /hire/ ──────────────
 *
 * /hire/ answers "I have a project, will you do it". This answers "I have a
 * seat, will you take it". They are different buyers reading for different
 * things, and one page serving both is a page that reads as written for
 * someone else whichever of the two opens it: a hiring manager does not want
 * engagement models, and a client does not want notice periods and time zone
 * overlap.
 *
 * The two are kept apart at the keyword as well, which is what stops them
 * competing in search. /hire/ owns "hire ecommerce consultant", the engagement
 * query. This owns "remote magento developer", the employment query. The gate
 * in lib/content-map.ts enforces that no two pages claim one primary keyword,
 * so the split is checked at build rather than discovered in Search Console.
 *
 * ── The rule this file is written under ────────────────────────────────────
 *
 * CONTENT-PRINCIPLES.md section 1. Every figure traces to lib/career.ts, the
 * employment record. Nothing here states a salary expectation, a notice
 * period or a visa status, because none of those is on the record and all
 * three are things a candidate negotiates rather than publishes.
 *
 * Copy in this file avoids em-dashes on purpose.
 */

import { CAREER, RECORD_INDUSTRIES } from './career';
import {
  AVAILABILITY,
  LOCATION,
  MARKETS,
  ROLE,
  TARGET_ROLES,
  TIMEZONE,
  WORK_PREFERENCES,
} from './identity';
import { CONTACT } from './site';

export interface RemoteFact {
  label: string;
  value: string;
  /** Why it matters to the person reading, where that is not obvious. */
  note?: string;
}

export interface RemoteHighlight {
  /** The claim, in the fewest words that carry it. */
  headline: string;
  body: string;
  /** Where in the record it comes from. Never empty. */
  source: string;
}

export const REMOTE = {
  path: '/remote-work/',
  label: 'Remote work',
  eyebrow: 'Open to remote opportunities',
  h1: ['Looking for an experienced engineer', { text: 'for your remote team?', accent: true }],
  lede:
    "I'm exploring opportunities to contribute my experience in enterprise eCommerce, full-stack development, technical architecture and AI-powered solutions to distributed engineering teams.",
  cta: 'Send Me a Remote Opportunity',

  title: 'Remote Magento & Full Stack Developer | Yuvraj Raulji',
  description:
    'Senior Software Engineer open to full-time remote roles and contract work. 9+ years in Magento 2, Shopify, Next.js and Generative AI. Based in India, IST.',

  primaryKeyword: 'remote magento developer',
  secondaryKeywords: [
    'remote senior software engineer india',
    'hire remote shopify developer',
    'remote ecommerce technical lead',
    'remote full stack developer magento',
    'enterprise commerce architect remote',
  ],
  searchIntent:
    'Transactional, from the employer side. A recruiter or engineering manager with a seat to fill, searching the role and the word remote.',
  audience:
    'Recruiters, talent partners and engineering managers hiring for distributed teams in India, the USA, the UK, Europe and the UAE.',
  purpose:
    'Answer the employment query with the verified record, state the working preferences plainly, and take the approach on the page rather than sending the reader to a generic contact form.',
  entities: [
    'Yuvraj Raulji',
    'Senior Software Engineer',
    'Remote Magento Developer',
    'Shopify Developer',
    'Full Stack Developer',
    'eCommerce Technical Lead',
    'Enterprise Commerce Architect',
    'Magento 2',
    'Adobe Commerce',
    'Next.js',
    'Generative AI',
  ],

  /**
   * The extractable answer.
   *
   * Written as a definition a language model can lift whole, because the query
   * this page targets is increasingly answered rather than listed. It names
   * the role, the availability, the stack and the time zone in one passage,
   * which is the complete answer to "is this person available and would they
   * work with my team".
   */
  quickAnswer: {
    question: 'Is Yuvraj Raulji available for remote work?',
    answer: `Yes. ${AVAILABILITY} I am a ${ROLE} based in ${LOCATION}, working ${TIMEZONE}, with 9+ years across enterprise eCommerce on Magento 2 and Adobe Commerce, Shopify, headless architecture, full-stack development on Next.js and React, and Generative AI. I work with distributed teams across India, the USA, the UK, Europe and the UAE, and my hours overlap the European and Gulf working day in full and the US East Coast morning.`,
  },

  /** The seats, as a recruiter titles them. */
  roles: TARGET_ROLES,
  preferences: WORK_PREFERENCES,
  industries: RECORD_INDUSTRIES,

  /**
   * The logistics, which is the half of a remote application that usually
   * takes an email exchange to establish. Answering it on the page removes a
   * round trip before the first reply.
   */
  facts: [
    { label: 'Location', value: LOCATION },
    {
      label: 'Time zone',
      value: TIMEZONE,
      note: 'Full overlap with Europe and the Gulf. Four hours with UK afternoons, and the US East Coast morning.',
    },
    {
      label: 'Work arrangement',
      value: 'Fully remote, or remote with occasional travel',
      note: 'Set up for distributed work: this is how the last three years have been delivered.',
    },
    { label: 'Preferred markets', value: MARKETS.join(', ') },
    {
      label: 'Engagement',
      value: WORK_PREFERENCES.join(', '),
      note: 'Open to a permanent seat, a fixed-term contract, or a contract that converts.',
    },
    {
      label: 'Languages',
      value: 'English (professional), Hindi, Gujarati',
    },
  ] as readonly RemoteFact[],

  /**
   * The case for the record, four claims deep.
   *
   * Each carries a `source` naming where in lib/career.ts it comes from.
   * That field is not decoration: it is the thing that stops a highlight
   * drifting into a claim the record does not support, which is the failure
   * CONTENT-PRINCIPLES.md section 1 is written against.
   */
  highlights: [
    {
      headline: 'Platforms at enterprise scale, not demo scale',
      body: 'Multi-store Magento 2 platforms carrying 500K+ SKUs and 1M+ monthly users, with the catalogue size, indexing and cache behaviour that only becomes an architecture problem at that volume.',
      source: 'Team Lead, 2023 to 2026',
    },
    {
      headline: 'Leading a team, and still in the code',
      body: 'Architecture direction, code review and delivery accountability across a development team, alongside hands-on implementation. Development cycle time cut by 30% by introducing structured workflows and approval processes.',
      source: 'Team Lead, 2023 to 2026',
    },
    {
      headline: 'Performance and integration work with numbers attached',
      body: 'Site speed improved by 60% through Varnish, Redis, full-page cache, CDN and database tuning. 90% of B2B order and quote processing automated, cutting approval cycle time by 40%. Payment, logistics, CRM and ERP systems integrated end to end.',
      source: 'Senior Magento Developer, March 2020 to 2023',
    },
    {
      headline: 'Full stack, and current with it',
      body: 'Next.js, React, TypeScript and Node.js over GraphQL and REST, with headless storefronts delivered for mobile and PWA. Generative AI certified with IBM and AcceleratorX in November 2026: LLM concepts, retrieval-augmented generation, prompt engineering and workflow automation.',
      source: 'Across the record, and the 2026 certification',
    },
  ] as readonly RemoteHighlight[],

  /**
   * What I am not looking for.
   *
   * The most useful block on the page for both sides. A recruiter with a
   * mismatched role finds out here instead of after two calls, and a recruiter
   * with the right role reads it as a person who knows what they want. Written
   * as preferences rather than as complaints.
   */
  notLookingFor: [
    'Junior or mid-level engineering seats. The record is nine years and a team lead role, and a seat below that would not use it.',
    'On-site relocation outside India as a condition of the role.',
    'Unpaid take-home exercises that run past a few hours. I will happily walk through the architecture of anything in the record, live, for as long as it is useful.',
    'Roles with no engineering ownership, where the work is ticket throughput against someone else’s architecture.',
  ],

  /** Open text on the page, which is the only condition the FAQPage markup is legitimate under. */
  faqs: [
    {
      q: 'Are you available for full-time remote roles?',
      a: `Yes. ${AVAILABILITY} A permanent remote seat is the arrangement I am most interested in, and I am equally open to a fixed-term contract or a contract that converts to permanent.`,
    },
    {
      q: 'Where are you based, and what hours do you work?',
      a: `${LOCATION}, working ${TIMEZONE}. That overlaps the full European and Gulf working day, the UK afternoon, and the US East Coast morning. I have delivered against European and Gulf stakeholders for most of the last six years, so the overlap is routine rather than theoretical.`,
    },
    {
      q: 'Would you relocate?',
      a: 'Not as a condition of a role. I am set up for distributed work and that is how I want to keep working. Occasional travel for onboarding, planning or a team offsite is not a problem and I am glad to do it.',
    },
    {
      q: 'What roles are the best fit?',
      a: `${TARGET_ROLES.slice(0, 4).join(', ')}, and ${TARGET_ROLES.slice(4).join(' or ')}. The common thread is senior ownership of a commerce platform or a full-stack product, with the architecture decisions inside the role rather than above it.`,
    },
    {
      q: 'Do you have experience leading engineers?',
      a: 'Yes, as Team Lead since 2023: architecture direction across multi-store Magento 2 builds, code review, and accountability for delivery. The role is hands-on as well as leading, which is the shape I would want to keep.',
    },
    {
      q: 'How do I send you a role?',
      a: `Use the form on this page. It asks for the company, the title, the employment type, the arrangement and a link to the posting, which is enough for me to give you a straight yes or no rather than a holding reply. You can also email ${CONTACT.email} or message me on LinkedIn.`,
    },
    {
      q: 'Will you reply if it is not a fit?',
      a: 'Yes, within 24 hours, and I will say why. A clear no is more useful to a recruiter than silence, and it costs me a minute.',
    },
  ],

  finalHeadline: ['Have a role that fits?', { text: 'Send it over.', accent: true }],
} as const;

/** The number of roles on the record, printed next to the stats. */
export const ROLE_COUNT = CAREER.length;
