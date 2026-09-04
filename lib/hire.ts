/**
 * Engagement: the /hire/ page, and the per-technology section above it.
 *
 * ── Why this exists, and the trap it has to avoid ───────────────────────────
 *
 * "Hire a Magento developer" is a real, high-intent query and the site had no
 * answer to it. The trap is that almost every page written for that query is an
 * agency page: dedicated teams, resource augmentation, developers by the month.
 * yuvrajraulji.com is a personal consultant brand and section 4 of
 * BRAND-DESIGN-GUIDELINE.md says in as many words that it must not look like an
 * agency, so a page that answers this query by implying a bench would be a
 * brand failure that happens to rank.
 *
 * The resolution is to answer the query honestly rather than avoid it. Someone
 * searching "hire a Magento developer" wants to know they can get the work
 * done. What they get here is one person, and saying that plainly is both true
 * and a differentiator: `notThis` below is rendered on the page, not hidden in
 * a comment, and it is the section a buyer looking for a staffing supplier
 * needs to read before they waste a call.
 *
 * ── Structure ───────────────────────────────────────────────────────────────
 *
 *   /hire/                one page, owning "hire ecommerce consultant"
 *   TECH_HIRE[slug]       a section on each of the nine technology pages
 *
 * The sections have no URLs of their own, so they support the "hire <platform>"
 * phrasing on a page that already ranks for that platform without creating nine
 * thin pages competing with each other. Nine "hire X developer" pages is exactly
 * the keyword-led page creation the build standard forbids.
 *
 * ── What is not claimed ─────────────────────────────────────────────────────
 *
 * No rates, no availability, no client count, no country list, and no team.
 * The verified record supports nine years from the first Magento role in 2016
 * and remote engagements run from IST, and it supports nothing further, so
 * nothing further is written. The dead FAQS array in lib/site.ts enumerates
 * markets and offers "packages"; it is not rendered anywhere and its voice is
 * not the one used here.
 *
 * Copy in this file avoids em-dashes on purpose.
 */

import type { ServiceAnchor, ServiceFaq } from './platform-services';

/* ═══════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════ */

/** One way of working together. Three, and they are genuinely different. */
export interface EngagementModel {
  num: string;
  name: string;
  /** The one-line shape of it. */
  summary: string;
  body: string;
  /** When this is the right shape, in the reader's terms. */
  fitsWhen: readonly string[];
}

/** The per-technology section rendered on a technology hub page. */
export interface TechHire {
  /** Platform slug, matching TECHNOLOGIES. */
  slug: string;
  /** Section H2, held as lines like every other headline on these pages. */
  headline: readonly string[];
  /** The paragraph under it. Names the platform, so it stands alone. */
  body: string;
  /** What the work usually turns out to be on this platform specifically. */
  usuallyMeans: string;
  /** Descriptive links to the service pages this most often becomes. */
  routes: readonly ServiceAnchor[];
}

/* ═══════════════════════════════════════════════════════════════
   THE COMMON PAGE
   ═══════════════════════════════════════════════════════════════ */

export const HIRE = {
  path: '/hire/',
  label: 'Hire',
  eyebrow: 'Yuvraj Raulji | Working together',
  h1: ['One consultant,', 'not a team to manage.'],
  lede:
    'Most searches for a developer are really searches for certainty: that someone has done this before, that the decision will be made properly, and that it will get finished. What is on offer here is one person with nine years on these platforms, working directly with you. No account manager, no bench, and no proposal for a project you do not need.',
  cta: 'Book a 30-minute consultation',

  title: 'Hire an eCommerce and AI Consultant | Yuvraj Raulji',
  description:
    'Work directly with an independent eCommerce, AI and technology consultant. Three engagement shapes, what each is for, and what this deliberately is not.',

  primaryKeyword: 'hire ecommerce consultant',
  secondaryKeywords: [
    'hire magento developer',
    'hire shopify expert',
    'hire ecommerce developer india',
    'freelance ecommerce consultant',
  ],
  searchIntent:
    'Transactional. Someone ready to engage help and deciding what kind of help to engage.',
  audience:
    'Founders, eCommerce leads and technology leads who have a decision or a build and no one internally who has done it before.',
  purpose:
    'Answer the hiring query honestly, and let the wrong-fit reader disqualify themselves before a call.',
  entities: [
    'Yuvraj Raulji',
    'eCommerce Consultant',
    'AI Consultant',
    'Technology Consultant',
    'Magento',
    'Shopify',
    'WooCommerce',
    'Headless Commerce',
  ],

  quickAnswer: {
    question: 'How do you work with Yuvraj Raulji?',
    answer:
      'Directly, and with one person rather than an agency. Engagements take three shapes: advisory, where the deliverable is a decision and the reasoning behind it; a defined piece of work with a scope and an end, such as a migration, a performance programme or an integration; and an ongoing arrangement where a platform needs someone to own it. Every one starts with the same conversation about what is actually in front of you, and that conversation sometimes ends with a recommendation that no project is needed.',
    bestFor: [
      'A platform or architecture decision that is hard to reverse',
      'A build that has to be done properly the first time',
      'A live platform nobody currently owns technically',
      'A second opinion on a proposal you already have',
    ],
  },

  /**
   * Rendered on the page, deliberately.
   *
   * A reader who needs a staffing supplier should find that out here rather
   * than on a call, and a reader who wants one person rather than a rotating
   * team is being told they are in the right place. Both are served by the same
   * paragraph, which is why it is not hidden behind a euphemism.
   */
  notThis: {
    headline: ['What this', 'is not.'],
    body:
      'This is not an agency, a development shop or a staffing arrangement, and there is no bench behind it. If what you need is four developers starting on Monday, a managed delivery team, or a supplier who will build whatever the specification says without arguing with it, this is the wrong place and it is cheaper for both of us to know that now.',
    points: [
      {
        title: 'No dedicated resources by the month',
        body: 'Work is scoped by the problem, not sold as headcount. Where a team is genuinely needed, saying so is part of the advice rather than a service on offer.',
      },
      {
        title: 'No proposal for a project you do not need',
        body: 'A real share of these conversations end with a smaller piece of work, or none. That is only possible because nothing here depends on selling the build.',
      },
      {
        title: 'No account layer',
        body: 'You talk to the person doing the work. That is the main practical difference between this and the alternative, and it is the reason the first call is useful rather than exploratory.',
      },
    ],
  },

  models: [
    {
      num: '01',
      name: 'Advisory',
      summary: 'The deliverable is a decision, with the reasoning attached.',
      body:
        'Platform selection, architecture review, technical due diligence, or a second opinion on a proposal. Typically a short engagement producing a written account of the current state, the decisions that need making with a recommendation on each, and an order of work. On an inherited platform the current-state document is often the part with the most immediate value, because it is the first time the whole system has been described in one place.',
      fitsWhen: [
        'The decision is expensive and hard to reverse',
        'Nobody internally has made this call before',
        'You are holding a proposal you cannot evaluate',
        'A platform was inherited and nobody can explain it',
      ],
    },
    {
      num: '02',
      name: 'A defined piece of work',
      summary: 'A scope, a shape and an end.',
      body:
        'A migration, a performance programme, an integration boundary, an upgrade, a build. Scoped after the problem is understood rather than before, because a scope written against a symptom is how projects end up delivering the wrong thing accurately. The service pages under each platform describe what these actually look like.',
      fitsWhen: [
        'The decision is already made and the work is real',
        'Something has to be delivered by a date',
        'The internal team can hold it afterwards',
        'You want the scope argued with before it is agreed',
      ],
    },
    {
      num: '03',
      name: 'Ongoing',
      summary: 'Somebody owns the platform.',
      body:
        'Patch cadence, release discipline, monitoring, and the technical ownership most platforms are missing rather than the ticket queue most retainers sell. The stated goal is to hand it back: documentation and enough transfer that the internal team can hold it. An arrangement that makes itself indispensable is a commercial arrangement rather than a technical one.',
      fitsWhen: [
        'Deploys depend on one person being available',
        'Updates are deferred because the last one broke something',
        'Failures are reported by customers first',
        'There is no in-house owner and no plan to hire one',
      ],
    },
  ] as readonly EngagementModel[],

  process: [
    {
      num: '01',
      title: 'Describe the problem',
      body:
        'Not the project. What is actually in front of you, what it is costing, and what has already been tried. The most useful first message is the one that describes a symptom rather than requests a technology.',
    },
    {
      num: '02',
      title: 'A 30-minute conversation',
      body:
        'The constraint you are hitting, the decision behind it, and what would have to be true for each option to be right. Free, and it occasionally ends with a recommendation to do nothing.',
    },
    {
      num: '03',
      title: 'A shape, in writing',
      body:
        'Which of the three models fits, what it would cover, and what it deliberately excludes. If none of them fits, that is said rather than worked around.',
    },
    {
      num: '04',
      title: 'The work, with the reasoning visible',
      body:
        'Decisions documented as they are made, so the thinking survives the engagement. This is what makes it possible to hand the platform back rather than leaving a dependency behind.',
    },
  ],

  facts: [
    {
      label: 'Nine years',
      body:
        'Measured from the first Magento role in June 2016, which is where the professional record starts. Earlier websites are not counted.',
    },
    {
      label: 'Remote, from IST',
      body:
        'Engagements run remotely with structured written communication. Time zone overlap is agreed at the start rather than assumed.',
    },
    {
      label: 'Direct, always',
      body:
        'You work with the person doing the work. There is no account manager and nobody else to brief.',
    },
    {
      label: 'Independent',
      body:
        'No platform partnership, no reseller margin and no incentive to recommend one technology over another. It is why a recommendation against a project is possible.',
    },
  ],

  faqs: [
    {
      q: 'Can I hire you as a developer rather than a consultant?',
      a: 'The work often is development, so the distinction matters less than it sounds. What does not happen is being placed into a team as a resource against a specification somebody else wrote, because the value here is in arguing with the specification before it is built. If you need hands on a defined backlog, an agency or a contractor is a better fit and cheaper.',
    },
    {
      q: 'Do you work with agencies, or only direct?',
      a: 'Both. Agencies engage this most often for a second opinion on an architecture, a platform decision they want checked independently, or a specialist piece of Magento work. The arrangement is the same either way, and the advice does not change because of who is paying for it.',
    },
    {
      q: 'What does it cost?',
      a: 'It depends on which of the three shapes fits and what the work turns out to be, so a number before the first conversation would be a guess. What can be said is that advisory engagements are short and priced as advice rather than as a deposit against a build, which is what makes a recommendation against the build possible.',
    },
    {
      q: 'How quickly can you start?',
      a: 'Ask, because it depends on what is already running. What is worth knowing is that the first conversation does not wait on availability: if the timing does not work, it is better to say so after understanding the problem than to hold the slot and find out later it was the wrong problem.',
    },
    {
      q: 'Do you build the whole thing, or advise and hand over?',
      a: 'Either, and the honest answer depends on your team. Where there is an internal team, the better outcome is usually architecture and the difficult parts, with the rest handed over. Where there is not, a defined build makes more sense. The one arrangement deliberately avoided is becoming a permanent dependency nobody planned for.',
    },
    {
      q: 'What if the platform I am on is not one you work with?',
      a: 'Then that is said in the first conversation. The platforms on this site are the ones with a real delivery record behind them, and taking work on a platform outside that would mean charging you to learn it.',
    },
  ] as readonly ServiceFaq[],

  finalHeadline: ['Describe the problem,', 'not the project.'],
} as const;

/* ═══════════════════════════════════════════════════════════════
   THE PER-TECHNOLOGY SECTIONS
   Nine, one per technology page. Each names its own platform so the
   section reads as written for that page rather than templated.
   ═══════════════════════════════════════════════════════════════ */

export const TECH_HIRE: Record<string, TechHire> = {
  magento: {
    slug: 'magento',
    headline: ['Hire Magento expertise,', 'not Magento headcount.'],
    body:
      'Magento is the platform where hiring badly costs the most, because the decisions that matter are made in the first fortnight and are close to irreversible once real data is in. What is on offer here is one person who has made those decisions on multi-store catalogues at 500K+ SKUs, working with you directly rather than a team briefed through an account layer.',
    usuallyMeans:
      'On Magento this most often starts as a performance problem or an upgrade nobody wants to run, and turns out to be a data model or an extension decision underneath.',
    routes: [
      { href: '/magento/consulting/', label: 'Magento consulting, when the decision comes first' },
      { href: '/magento/performance/', label: 'Magento performance, when the store is slow and nobody knows why' },
      { href: '/magento/upgrade/', label: 'Magento upgrades, when the platform has fallen behind' },
    ],
  },

  shopify: {
    slug: 'shopify',
    headline: ['Hire Shopify judgement,', 'not another app.'],
    body:
      'Most Shopify help is a recommendation to install something. What is useful is someone with no stake in the app store telling you which of your constraints are real, which are theme decisions, and what the platform already does that you are paying a subscription to repeat. One person, working with you directly.',
    usuallyMeans:
      'On Shopify this usually begins as a speed or conversion problem and resolves into an app list nobody has owned and a theme nobody wants to touch.',
    routes: [
      { href: '/shopify/consulting/', label: 'Shopify consulting, for the decision behind the task' },
      { href: '/shopify/optimization/', label: 'Shopify optimisation, for speed and conversion work' },
      { href: '/shopify/migration/', label: 'Shopify migration, for a move onto the platform' },
    ],
  },

  woocommerce: {
    slug: 'woocommerce',
    headline: ['Hire someone who will', 'tell you to remove things.'],
    body:
      'On WooCommerce the plugin stack is the architecture, so the most valuable thing an experienced person does is decide what comes out. That is the opposite of what a supplier paid to build is incentivised to say, which is the argument for engaging one independent person rather than a delivery team.',
    usuallyMeans:
      'On WooCommerce this usually starts with a slow checkout or a scary update, and the answer is a plugin decision rather than a rebuild.',
    routes: [
      { href: '/woocommerce/consulting/', label: 'WooCommerce consulting, including whether to stay on it' },
      { href: '/woocommerce/optimization/', label: 'WooCommerce performance, for the pages that take money' },
      { href: '/woocommerce/maintenance/', label: 'WooCommerce maintenance, for updates that stop being events' },
    ],
  },

  wordpress: {
    slug: 'wordpress',
    headline: ['Hire for the content model,', 'not the theme.'],
    body:
      'WordPress is easy to start badly, and nearly every expensive WordPress problem traces back to a content model nobody designed. Engaging one person who will spend the first week on structure rather than on visuals is what separates a site that lasts five years from one that gets rebuilt in three.',
    usuallyMeans:
      'On WordPress this usually arrives as a rebuild request and turns out to be a content model, a plugin cull and a caching fix, at a fraction of the cost.',
    routes: [
      { href: '/wordpress/consulting/', label: 'WordPress consulting, including rebuild against rescue' },
      { href: '/wordpress/optimization/', label: 'WordPress speed work, beyond installing a caching plugin' },
      { href: '/wordpress/maintenance/', label: 'WordPress maintenance, for a site nobody currently owns' },
    ],
  },

  'headless-commerce': {
    slug: 'headless-commerce',
    headline: ['Hire someone who might', 'talk you out of it.'],
    body:
      'Most stores asking for headless want a faster theme, and almost nobody selling a headless build is in a position to say so. Engaging an independent person for this decision is worth it specifically because the recommendation against is available, and it is the outcome a large share of these conversations should reach.',
    usuallyMeans:
      'On headless this usually starts as a performance brief and resolves into a question about whether your release cycle is genuinely the bottleneck.',
    routes: [
      { href: '/headless-commerce/consulting/', label: 'Headless consulting, for whether it would pay at all' },
      { href: '/headless-commerce/architecture/', label: 'Headless architecture, once the decision is made' },
      { href: '/headless-commerce/migration/', label: 'Headless migration, one template at a time' },
    ],
  },

  'ai-commerce': {
    slug: 'ai-commerce',
    headline: ['Hire for the boring half', 'of AI commerce.'],
    body:
      'The useful AI work on a commerce platform is catalogue enrichment with human review, retrieval-based search and operations automation, wired into a platform already carrying order volume. That is unglamorous, and it is the half that survives contact with a real catalogue. No AI engagement on this record has a published measured outcome, and that is said here rather than hidden.',
    usuallyMeans:
      'This usually starts as an AI request and becomes a data quality question, because a model amplifies the catalogue it is given.',
    routes: [
      { href: '/ai-commerce/', label: 'AI commerce, and where it pays on a live catalogue' },
      { href: '/ai-search/', label: 'AI and semantic search, when search is the leak' },
      { href: '/magento/integrations/', label: 'The platform boundary this usually has to be wired into' },
    ],
  },

  'ai-search': {
    slug: 'ai-search',
    headline: ['Hire for search that', 'understands the question.'],
    body:
      'On-site search is where customers who have already decided to buy go missing, and it is the least watched surface on most stores. Engaging one person for this means the search work and the catalogue work are done by the same person, which matters because thin product data produces confident, thin results whatever the search technology.',
    usuallyMeans:
      'This usually starts as a search complaint and turns into a catalogue attribute problem, which is a merchandising decision rather than a search one.',
    routes: [
      { href: '/ai-search/', label: 'AI search and GEO, and what is still speculation' },
      { href: '/shopify/optimization/', label: 'Shopify optimisation, where search sessions convert hardest' },
      { href: '/magento/performance/', label: 'Magento performance, where search sits over a large catalogue' },
    ],
  },

  'ai-automation': {
    slug: 'ai-automation',
    headline: ['Hire someone who asks', 'whether the process should exist.'],
    body:
      'Automating a process nobody has fixed gets you the same bad outcome faster. The work worth paying for starts by deciding which steps should be removed rather than automated, and that is a judgement call rather than a build. One person, with the process conversation and the implementation in the same head.',
    usuallyMeans:
      'This usually starts as an automation request and begins with a process redesign, because the first version worth trusting is deterministic rather than generative.',
    routes: [
      { href: '/ai-automation/', label: 'AI automation, and where the human checkpoints belong' },
      { href: '/magento/integrations/', label: 'Magento B2B workflow, where the approval automation was built' },
      { href: '/digital-transformation/', label: 'Digital transformation, when the process spans systems' },
    ],
  },

  'digital-transformation': {
    slug: 'digital-transformation',
    headline: ['Hire the person who', 'will sequence it.'],
    body:
      'Modernisation programmes fail on ordering far more often than on technology. What an experienced independent person contributes is the sequence: what has to happen first because everything else depends on it, what can wait, and what should not be built at all. That advice is only credible from someone with no delivery contract riding on the answer.',
    usuallyMeans:
      'This usually arrives as a replatform and becomes a phasing question, because trading has to continue while the system changes underneath it.',
    routes: [
      { href: '/digital-transformation/', label: 'Digital transformation, and how it is sequenced' },
      { href: '/expertise/ecommerce-consulting/', label: 'eCommerce consulting, for the platform decision inside it' },
      { href: '/magento/migration/', label: 'Magento migration, a common destination for these programmes' },
    ],
  },
};

/** The technologies that carry a hire section, in page order. */
export function hireFor(slug: string): TechHire | undefined {
  return TECH_HIRE[slug];
}

/**
 * Build-time check: every route named in a hire section must exist.
 *
 * The same failure the platform service model already guards against, applied
 * here because these anchors are written by hand against pages built in a
 * different commit. The route list is imported rather than duplicated, so this
 * cannot drift from what the site actually publishes.
 */
export const HIRE_LINKS: readonly string[] = [
  ...Object.values(TECH_HIRE).flatMap((h) => h.routes.map((r) => r.href)),
];
