/**
 * /remote-collaboration/ : working with clients worldwide.
 *
 * ── What this page was, and why the URL stayed ────────────────────────────
 *
 * It was the recruiter funnel: target job titles, employment types, work
 * arrangements and an eight-field form asking for a job description URL. The
 * objective has changed and is now explicit that this is not a recruiter
 * portal and not a job application website, so all of that is gone.
 *
 * The URL did not go with it. It is indexed, it is linked from the header and
 * the footer, and "remote work" is still exactly what a prospective client is
 * searching when they want someone who works this way. What changed is the
 * direction the page faces: it used to ask a recruiter for a role, and now it
 * tells a business how to engage.
 *
 * The primary keyword moved with the intent, from "remote magento developer"
 * (an employment query) to "remote ecommerce development" (a service query).
 * The content-map gate confirms no other page claims it.
 *
 * ── The rule this file is written under ───────────────────────────────────
 *
 * CONTENT-PRINCIPLES.md section 1. Nothing here states a rate, a client name
 * or a project outcome. The engagement models describe structure, which is
 * answerable without a number, and /pricing/ carries the rest.
 *
 * Copy in this file avoids em-dashes on purpose.
 */

import { CAREER, RECORD_INDUSTRIES } from './career';
import {
  AVAILABILITY,
  CLIENT_TYPES,
  ENGAGEMENT_MODELS,
  LOCATION,
  MARKETS,
  TIMEZONE,
} from './identity';
import { CONTACT } from './site';

export interface RemoteFact {
  label: string;
  value: string;
  note?: string;
}

export interface EngagementModel {
  num: string;
  name: string;
  /** The commercial shape, in one line. */
  shape: string;
  /** Who it suits. */
  bestFor: string;
}

export const REMOTE = {
  path: '/remote-collaboration/',
  label: 'Remote work',
  eyebrow: 'Remote collaboration',
  h1: ['Working with clients', { text: 'worldwide.', accent: true }],
  lede:
    'I collaborate remotely with businesses, agencies, startups and eCommerce brands across different time zones. Nine years of it, mostly with stakeholders I have never met in person, which is the only real test of whether a remote arrangement works.',
  cta: 'Discuss Your Project',

  title: 'Remote eCommerce Development | Yuvraj Raulji',
  description:
    'Remote eCommerce and full-stack development for businesses worldwide. Freelance projects, fixed-scope work, retainers and long-term collaboration.',

  primaryKeyword: 'remote ecommerce development',
  secondaryKeywords: [
    'remote magento developer for hire',
    'hire remote shopify developer',
    'freelance ecommerce developer india',
    'remote full stack developer for hire',
    'long term remote development partner',
    /* The two geo-qualified queries the brief names. They belong here rather
       than on the platform hubs because the hubs answer "what is this
       platform and who does it", and these ask where the developer is, which
       is this page's whole subject. */
    'magento developer india',
    'shopify developer india',
  ],
  searchIntent:
    'Commercial. A business or agency looking for a developer who works remotely, and checking whether the arrangement would actually work.',
  audience:
    'Businesses, agencies and startups in India, the USA, the UK, Europe and the UAE who need development capacity they do not have in-house.',
  purpose:
    'Answer the practical questions about remote collaboration before they cost an email exchange, and route to a project conversation.',
  entities: [
    'Yuvraj Raulji',
    'Remote Development',
    'Freelance eCommerce Developer',
    'Magento 2',
    'Shopify',
    'Next.js',
  ],

  /**
   * The extractable answer.
   *
   * Written as a definition a language model can lift whole, because the query
   * is increasingly answered rather than listed. It names the arrangement, the
   * overlap and the engagement shapes in one passage.
   */
  quickAnswer: {
    question: 'How does working remotely with Yuvraj Raulji actually work?',
    answer: `Directly, and with one person rather than an account manager. I work from ${LOCATION} on ${TIMEZONE}, which overlaps the full European and Gulf working day, the UK afternoon and the US East Coast morning. Engagements run as freelance projects, fixed-scope development, hourly work, a monthly retainer, contract development, a long-term collaboration or ongoing maintenance and support. ${AVAILABILITY}`,
  },

  engagementModels: [
    {
      num: '01',
      name: 'Freelance Projects',
      shape: 'A defined piece of work, start to finish.',
      bestFor: 'A build, a feature or a fix you can describe, where you want it done and handed over.',
    },
    {
      num: '02',
      name: 'Fixed-Scope Development',
      shape: 'A written scope, a fixed number, an end date.',
      bestFor: 'Work with a budget to protect, where the scope is clear enough to price properly.',
    },
    {
      num: '03',
      name: 'Hourly Development',
      shape: 'Time, bought in blocks, against whatever comes up.',
      bestFor: 'A backlog of small changes, or work nobody can scope yet because the problem is not diagnosed.',
    },
    {
      num: '04',
      name: 'Monthly Retainer',
      shape: 'Reserved capacity each month, with priority response.',
      bestFor: 'A live platform that needs someone to own it rather than someone to call in an emergency.',
    },
    {
      num: '05',
      name: 'Contract Development',
      shape: 'Inside your team, for a fixed term.',
      bestFor: 'A team that needs commerce or full-stack depth for a release, a gap or a capability to build.',
    },
    {
      num: '06',
      name: 'Long-Term Remote Collaboration',
      shape: 'An ongoing relationship rather than a sequence of projects.',
      bestFor: 'A business whose platform is the business, with a roadmap rather than a to-do list.',
    },
    {
      num: '07',
      name: 'Ongoing Maintenance & Support',
      shape: 'Patching, upgrades, monitoring and the occasional thing that breaks.',
      bestFor: 'A platform that works and needs to keep working, without a developer on payroll.',
    },
  ] as readonly EngagementModel[],

  /** The engagement shapes as plain strings, for a tag row. */
  models: ENGAGEMENT_MODELS,
  clients: CLIENT_TYPES,
  industries: RECORD_INDUSTRIES,

  /**
   * The logistics, which is the half of a remote arrangement that usually
   * takes an email exchange to establish. Answering it here removes a round
   * trip before the first reply.
   */
  facts: [
    { label: 'Based in', value: LOCATION },
    {
      label: 'Time zone',
      value: TIMEZONE,
      note: 'Full overlap with Europe and the Gulf. Four hours with UK afternoons, and the US East Coast morning.',
    },
    {
      label: 'Communication',
      value: 'Email, WhatsApp, Slack, Teams, or whatever your team already uses',
      note: 'I join your tools rather than asking you to join mine.',
    },
    { label: 'Working with clients in', value: MARKETS.join(', ') },
    {
      label: 'Reply time',
      value: 'Within 24 hours on IST business days',
      note: 'Usually faster. This is the commitment rather than the average.',
    },
    { label: 'Languages', value: 'English (professional), Hindi, Gujarati' },
  ] as readonly RemoteFact[],

  /**
   * How a project starts. Four steps, with honest timings: nothing here
   * promises something outside my control.
   */
  process: [
    {
      num: '01',
      title: 'Tell me what you need',
      body: 'A few paragraphs is enough. The platform, the problem, and anything you have already tried or been quoted.',
    },
    {
      num: '02',
      title: 'A short call, or a written reply',
      body: 'Whichever is faster for the question. Usually within 24 hours, and the call is 30 minutes rather than an hour of discovery.',
    },
    {
      num: '03',
      title: 'A written scope and a figure',
      body: 'What the work is, what it is not, and what it costs. Usually within a few days. No charge for it.',
    },
    {
      num: '04',
      title: 'We start, in your tools',
      body: 'Your repository, your board, your review cycle. Work lands in slices you can see running rather than one drop at the end.',
    },
  ],

  /**
   * Where I am not the right answer.
   *
   * The most useful block on the page for both sides, and the one that makes
   * the rest credible. A reader who needs an agency finds out here instead of
   * after two calls.
   */
  notAFit: [
    'Work that needs a team of five starting Monday. I am one person and I will say so rather than subcontracting it out.',
    'Design-led projects where the deliverable is the visual identity. I build well against a design; I do not create brand systems.',
    'Projects where the budget is fixed before the scope is known. That ends badly for both of us and I would rather scope it first.',
    'Anything requiring on-site presence as a condition. I work remotely and travel occasionally, not the other way round.',
  ],

  /** Open text on the page, which is the only condition the FAQPage markup is legitimate under. */
  faqs: [
    {
      q: 'Do you work with clients outside India?',
      a: `Yes, and most of the work is. ${MARKETS.join(', ')} are the markets I work with most. My hours overlap the full European and Gulf working day and the US East Coast morning, so a daily sync is practical with all of them.`,
    },
    {
      q: 'Do you work with Indian businesses as well as international ones?',
      a: `Both, and on the same terms. I am a Magento and Shopify developer based in ${LOCATION}, so an Indian client gets the whole working day overlapped and a conversation in Hindi or Gujarati if that is easier, and a client in the USA, the UK, Europe or the UAE gets the overlap above. Nothing else about the engagement changes.`,
    },
    {
      q: 'How do we communicate during a project?',
      a: 'Whatever your team already uses: email, WhatsApp, Slack, Teams. I join your tools rather than asking you to adopt mine, and work goes through your repository and your board so you can see progress without asking for a status update.',
    },
    {
      q: 'What is the smallest project you take on?',
      a: 'There is no formal minimum. A performance diagnosis, one integration or a version upgrade is a perfectly good engagement and several of them are the most useful work there is. If something is too small to be worth a contract, I will tell you and point you at how to do it yourself.',
    },
    {
      q: 'Can you work inside our existing team and codebase?',
      a: 'Yes. That is contract development: your repository, your board, your review cycle and your definition of done, for an agreed term. It is the arrangement most of the last few years have run under.',
    },
    {
      q: 'What happens after a project finishes?',
      a: 'Handover documentation written for your team, a defined period where fixes are mine, and the option of a maintenance arrangement if the platform needs someone to keep owning it. None of that is compulsory and the project is finished whether or not you take it.',
    },
    {
      q: 'How do I start?',
      a: `Describe the work on the contact page, email ${CONTACT.email}, or message me on WhatsApp. You get a written scope and a figure, usually within a few days of a short call, and there is no charge for either.`,
    },
  ],

  finalHeadline: ['Have a project', { text: 'in mind?', accent: true }],
} as const;

/** The number of roles on the record, printed next to the stats. */
export const ROLE_COUNT = CAREER.length;
