/**
 * /pricing/ : engagement models, and deliberately no prices.
 *
 * ── Why there are no numbers on this page ──────────────────────────────────
 *
 * The brief is explicit: do not invent prices. That is not a limitation to
 * work around, it is the correct position for this page, and the page says so
 * out loud rather than leaving a reader to notice the absence.
 *
 * Two reasons, and both are stated in `whyNoPrices` below because a pricing
 * page that shows no price and does not explain itself reads as evasion:
 *
 *   1. There is no rate card on the record. Publishing one here would be
 *      inventing a commercial fact, which CONTENT-PRINCIPLES.md section 1
 *      forbids in the same terms it forbids inventing a case study metric.
 *   2. The work genuinely does not have one number. A Magento performance
 *      diagnosis and a headless replatform are different orders of magnitude,
 *      and a single published figure would be wrong for both.
 *
 * What the page does instead is the thing a buyer actually needs before a
 * call: how each engagement is structured, what is inside it, what is not,
 * and which one fits the situation they are in. That is answerable without a
 * number and it is most of what a pricing page is for.
 *
 * ── Why these five models ─────────────────────────────────────────────────
 *
 * They are the five shapes the brief names, and each is a genuinely different
 * commercial structure rather than a tier of the same one. There is no
 * "Starter / Pro / Enterprise" ladder, because the work is not a product and
 * a ladder would imply a worse version of it exists.
 *
 * Copy in this file avoids em-dashes on purpose.
 */

import { CONTACT } from './site';

export interface EngagementModel {
  num: string;
  name: string;
  /** The one-line summary of the commercial shape. */
  shape: string;
  /** Who this is the right answer for. */
  bestFor: string;
  /** How it is actually structured and billed. */
  structure: readonly string[];
  /** What is inside the engagement. */
  includes: readonly string[];
  /** What it is not, so the wrong buyer self-selects out. */
  notFor: string;
}

export const PRICING = {
  path: '/pricing/',
  label: 'Pricing',
  eyebrow: 'How engagements are structured',
  h1: ['Engagement models,', { text: 'and what is in each.' }],
  lede:
    'Five ways to work together, each a different commercial shape rather than a tier of the same one. Every engagement starts with the same conversation about what is actually in front of you, and the scope follows from that rather than the other way round.',
  cta: 'Request a Project Estimate',

  title: 'Pricing & Engagement Models | Yuvraj Raulji',
  description:
    'Hourly consulting, fixed-scope eCommerce development, retainer, contract engineering and long-term partnership. How each is structured and what is included.',

  primaryKeyword: 'ecommerce development engagement models',
  secondaryKeywords: [
    'magento developer hourly rate',
    'ecommerce consulting retainer',
    'fixed scope ecommerce development',
    'contract magento engineer',
  ],
  searchIntent:
    'Commercial. A buyer working out what an engagement would look like and what it would cost to find out.',
  audience:
    'Businesses, agencies and engineering leaders comparing how to buy senior commerce engineering.',
  purpose:
    'Explain the commercial structures honestly, state plainly why no rate card is published, and route to a quote.',
  entities: ['Yuvraj Raulji', 'eCommerce Consulting', 'Engagement Model', 'Technical Consulting'],

  /**
   * The answer to the question the page does not answer with a number.
   *
   * It sits high on the page, directly under the hero, because a reader who
   * has to scroll past five cards to find out why there is no price has
   * already drawn their own conclusion.
   */
  whyNoPrices: {
    heading: ['Why there are', 'no numbers here.'],
    body: [
      'Because any number I printed would be wrong for most of the people reading it. A performance diagnosis on a slow Magento store and a headless replatform with an ERP integration behind it are not the same size of work, and one published figure would misprice both.',
      'And because a quote is cheap to get. Describe what is in front of you and you get a real number against a real scope, usually the same day. That is a better use of both our time than a rate card you would have to caveat anyway.',
    ],
    /* What a buyer gets instead of a price, stated as a commitment. */
    instead: [
      'A scope written down before anything starts, in terms you can hold me to.',
      'A fixed number for fixed-scope work, not an estimate that drifts.',
      'A clear hourly rate once I know what the work is, confirmed in writing.',
      'A recommendation that no project is needed, where that is the honest answer.',
    ],
  },

  models: [
    {
      num: '01',
      name: 'Hourly Technical Consulting',
      shape: 'Time, bought in blocks, against questions rather than deliverables.',
      bestFor:
        'A decision you would rather not make alone: a platform choice, an architecture review, a proposal from someone else that you cannot independently evaluate.',
      structure: [
        'Billed hourly, in agreed blocks, with the time logged against what it was spent on.',
        'No minimum retainer and no commitment past the block you have bought.',
        'Scheduled sessions plus written follow-up, because the reasoning is the deliverable and it needs to survive the call.',
      ],
      includes: [
        'Architecture and platform review',
        'Code and infrastructure assessment',
        'Written recommendation with the reasoning behind it',
        'Second opinion on an estimate, proposal or vendor',
        'Direct access, with no account manager in between',
      ],
      notFor:
        'Implementation. If the answer turns out to be "build this", that is a different engagement and I will say so.',
    },
    {
      num: '02',
      name: 'Fixed-Scope Development',
      shape: 'A defined piece of work, a fixed number, an end date.',
      bestFor:
        'Work you can describe: a migration, a module, an integration, a checkout rebuild, a performance programme with a target.',
      structure: [
        'Scoped first, in writing, including what is explicitly out of scope.',
        'Fixed price against that scope, staged across agreed milestones.',
        'Change requests priced separately rather than absorbed quietly, so the number you agreed stays the number.',
      ],
      includes: [
        'Technical specification and architecture',
        'Implementation, code review and testing',
        'Deployment, with the release process documented',
        'Handover documentation written for your team, not for me',
        'A defined warranty period after go-live',
      ],
      notFor:
        'Work nobody can describe yet. If the scope is genuinely unknown, an hourly diagnosis first is cheaper than a fixed price padded for the unknown.',
    },
    {
      num: '03',
      name: 'Monthly Retainer',
      shape: 'A reserved block of capacity each month, with priority access.',
      bestFor:
        'A live platform that needs someone to own it technically: a steady stream of changes, releases and the occasional thing that breaks at a bad time.',
      structure: [
        'An agreed number of hours each month, reserved rather than sold speculatively.',
        'Rolling monthly, cancellable with notice. No annual lock-in.',
        'Priority response, and a standing slot rather than joining a queue.',
      ],
      includes: [
        'Platform maintenance, upgrades and security patching',
        'Performance monitoring and tuning',
        'Feature development inside the monthly allocation',
        'Incident response during agreed hours',
        'A monthly written summary of what changed and what it cost',
      ],
      notFor:
        'A large build. A retainer that gets consumed by one project is not a retainer, and the project should be scoped as one.',
    },
    {
      num: '04',
      name: 'Contract Engineering',
      shape: 'A senior engineer inside your team, for a fixed term.',
      bestFor:
        'A team that needs commerce or full-stack depth for a defined period: a release to get out, a gap to cover, a capability to build in-house.',
      structure: [
        'Fixed-term contract, full-time or an agreed fraction of a week.',
        'Working inside your process: your board, your standups, your review cycle, your definition of done.',
        'Monthly or milestone billing against the agreed term.',
      ],
      includes: [
        'Hands-on development in your stack and your repository',
        'Architecture input and code review for the wider team',
        'Mentoring, where the brief includes building the capability',
        'Documentation and handover at the end of the term',
      ],
      notFor:
        'A permanent seat. If that is what you are filling, the remote work page is the right place to start.',
    },
    {
      num: '05',
      name: 'Long-Term Development Partnership',
      shape: 'An ongoing technical relationship rather than a sequence of projects.',
      bestFor:
        'A business whose platform is the business: a multi-year roadmap, a growing catalogue, and a need for the person who makes the decisions to remember why the last ones were made.',
      structure: [
        'An annual or multi-year arrangement, reviewed quarterly against the roadmap.',
        'Blended commercially: a retained base for continuity, with projects scoped on top.',
        'Involved in the roadmap rather than handed it, which is the whole point of the model.',
      ],
      includes: [
        'Technical ownership of the platform and its direction',
        'Roadmap planning alongside the commercial side of the business',
        'Architecture governance as the platform and team grow',
        'Everything in the retainer and fixed-scope models',
        'Continuity: the context does not get rebuilt every engagement',
      ],
      notFor:
        'A first engagement. This is where a working relationship ends up, not where it starts, and it should follow a project that went well.',
    },
  ] as readonly EngagementModel[],

  /**
   * The route to a number, in four steps, with the honest timings.
   *
   * No step promises something that is not in my control: "usually the same
   * day" is hedged because it depends on the day, and a promise this page
   * cannot keep is the fastest way to make the rest of it untrustworthy.
   */
  process: [
    {
      num: '01',
      title: 'Tell me what is in front of you',
      body: 'A few paragraphs is enough. The platform, the problem, and what you have already tried or been quoted.',
    },
    {
      num: '02',
      title: 'A short call, or a written reply',
      body: 'Whichever is faster for the question. Usually within 24 hours, and the call is 30 minutes rather than an hour of discovery theatre.',
    },
    {
      num: '03',
      title: 'A written scope and a number',
      body: 'What the work is, what it is not, the structure it fits, and the figure. Usually within a few days of the call.',
    },
    {
      num: '04',
      title: 'Decide, including deciding not to',
      body: 'No follow-up sequence and no pressure. If the answer is that you do not need this, the scope will say so.',
    },
  ],

  faqs: [
    {
      q: 'Why is there no price list on this page?',
      a: 'Because one number would be wrong for most of the work. A performance diagnosis and a headless replatform differ by an order of magnitude, and publishing a single rate would misprice both. A quote against a real scope takes a day or two and is accurate, which a rate card cannot be.',
    },
    {
      q: 'How do I get an actual number?',
      a: `Describe the work on the contact page or email ${CONTACT.email}. You get a written scope and a figure, usually within a few days of a short call. There is no charge for the quote.`,
    },
    {
      q: 'Which engagement model should I pick?',
      a: 'You do not have to. Describe the problem and I will tell you which one fits, including when the answer is the cheapest one on the page. A decision you are unsure about is hourly consulting; work you can describe is fixed scope; a live platform that needs owning is a retainer.',
    },
    {
      q: 'Do you charge for the first conversation?',
      a: 'No. The first call and the scope that follows it are free, because neither is the work and pricing them would just slow down finding out whether there is any.',
    },
    {
      q: 'Can a fixed-scope project turn into a retainer?',
      a: 'Often, and that is the usual path into one. A platform that has just been built or migrated is the platform most in need of someone to own it, and by then the context is already there.',
    },
    {
      q: 'Do you work with agencies as a subcontractor?',
      a: 'Yes, white-labelled where that is what the arrangement needs. The agency partner page covers how that works and what the commercial structure looks like.',
    },
  ],

  finalHeadline: ['Describe the work,', { text: 'get a real number.', accent: true }],
} as const;
