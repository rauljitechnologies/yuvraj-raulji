/**
 * /agencies/
 *
 * ── Why this page exists ────────────────────────────────────────────────────
 *
 * The Sep 2026 business diagnosis found agencies to be the highest-fit audience
 * on the site and the only one with no page at all. They buy quickly, they buy
 * repeatedly, they need no persuading that commerce technology is hard, and
 * they are not comparing this against an agency, which is the comparison the
 * rest of the site loses on authority.
 *
 * It is also the one audience for whom being one named person is the product
 * rather than the limitation. An agency cannot subcontract to another agency
 * without introducing a competitor to its own client.
 *
 * ── The objection that has to be answered first ─────────────────────────────
 *
 * Every agency evaluating a technical partner is asking one question before any
 * other: will this person take my client? Nothing else on the page matters
 * until that is answered, so it is answered in the first sentence and again,
 * explicitly and in writing, in its own section.
 *
 * ── What this page must not become ──────────────────────────────────────────
 *
 * A services page. The rest of the site sells judgement to businesses; this
 * sells capacity and depth to a partner who already owns the relationship. The
 * voice is the same, the buyer is not, and the CTA is deliberately different:
 * "a project you have already won" rather than a consultation.
 */

export interface AgencyFaq {
  q: string;
  a: string;
}

export interface AgencyItem {
  title: string;
  body: string;
}

export const AGENCIES = {
  eyebrow: 'For agencies and studios',
  h1: ['Your client stays yours.', 'The hard part is mine.'],
  lede:
    'Agencies win commerce work that needs Magento, headless or integration depth they cannot justify employing full time. This is that depth, working behind your brand, under your project management, with a written commitment never to approach the client directly.',
  cta: 'Discuss a project you have won',
  title: 'Technical Commerce Partner for Agencies | Yuvraj Raulji',
  description:
    'Commerce technology depth for agencies and studios: Magento, headless, integrations and performance, delivered behind your brand with your client relationship left alone.',

  primaryKeyword: 'ecommerce technical partner for agencies',
  secondaryKeywords: [
    'white label magento partner',
    'agency shopify technical partner',
    'subcontract ecommerce development',
    'freelance magento consultant for agencies',
    'headless commerce partner agency',
  ],
  searchIntent: 'Transactional. An agency with work in hand and a capability gap.',
  audience:
    'Agency owner or delivery lead at a digital, SEO, marketing or design studio that has won commerce work beyond its in-house technical depth.',
  purpose:
    'Own the agency partner channel, which is the highest-fit and fastest-converting audience on the site and the only one with no page.',
  entities: [
    'Magento 2',
    'Adobe Commerce',
    'Shopify Plus',
    'WooCommerce',
    'Headless Commerce',
    'Next.js',
    'ERP',
    'Core Web Vitals',
  ],

  quickAnswer: {
    question: 'What does a technical commerce partner do for an agency?',
    answer:
      'They take the part of a commerce project an agency cannot staff, and they do it behind the agency’s brand. The agency keeps the client relationship, the commercial terms and the project management. The partner supplies platform depth: architecture decisions, migrations, integrations, performance work and the technical judgement that stops a fixed-price project going wrong halfway through.',
    bestFor: [
      'A project already won, with a technical shape nobody in-house has done before',
      'A client whose platform is not the one your team knows',
      'A build that needs an architecture decision before anyone writes code',
    ],
  },

  /* The objection, in writing, before anything else is asked of the reader. */
  commitments: [
    {
      title: 'I do not contact your client',
      body:
        'Not during the project, not after it, not for anything. Communication runs through you unless you specifically put me in a room, and if a client approaches me directly I tell you and route it back.',
    },
    {
      title: 'I do not pitch competing services',
      body:
        'Your client is not a lead. Nothing I do on your project becomes an opportunity to sell around you, including the ongoing work that follows it, which is yours to quote.',
    },
    {
      title: 'I work under your brand',
      body:
        'Your process, your project management, your client-facing documents. If you want me on a call I will introduce myself however you have positioned the engagement.',
    },
    {
      title: 'You get the reasoning, not just the output',
      body:
        'Every decision written up in language you can put in front of a client, so your team owns the explanation afterwards rather than depending on me to give it.',
    },
  ] as readonly AgencyItem[],

  takesOn: [
    {
      title: 'The architecture decision before the build',
      body:
        'Whether the thing the client asked for is the thing they need, what the data model has to carry, and where the integration boundaries sit. This is the cheapest hour in the project and the one most often skipped.',
    },
    {
      title: 'Migrations and replatforming',
      body:
        'Between Magento, Shopify and WooCommerce in any direction: catalogue mapping, the redirect map built from a real crawl, order and customer transfer, and a cutover with a written rollback.',
    },
    {
      title: 'Integrations that have to be reliable',
      body:
        'ERP, PIM, CRM, OMS and fulfilment. A source of truth named per field, queues and retries, reconciliation, and failure that is visible rather than silent.',
    },
    {
      title: 'Performance and Core Web Vitals',
      body:
        'Caching layers, rendering strategy, database and index work, and the front-end weight that accumulated over three years of app installs.',
    },
    {
      title: 'The second opinion on a proposal',
      body:
        'Sometimes the useful thing is a written view on whether a scope is deliverable at the price, before the agency commits to it. This is often the first engagement and it is deliberately small.',
    },
  ] as readonly AgencyItem[],

  notFor: [
    {
      title: 'Overflow front-end capacity',
      body:
        'If the work is templating and volume rather than judgement, a development studio will be cheaper and faster than I will be. That is not false modesty; it is a different job.',
    },
    {
      title: 'Work with no technical decision in it',
      body:
        'A theme install, a plugin configuration or a content build does not need this. If that is the scope, you are paying for depth you will not use.',
    },
    {
      title: 'Anything requiring a team on site',
      body:
        'One person, remote, on your process. Where a project genuinely needs a staffed team in a room, it needs an agency and I will say so.',
    },
  ] as readonly AgencyItem[],

  howItWorks: [
    {
      num: '01',
      title: 'You describe the project you have won',
      body:
        'The platform, the client’s business, what you have already committed to and where the technical uncertainty sits. A short call is usually enough.',
    },
    {
      num: '02',
      title: 'I tell you whether it is a fit',
      body:
        'Including when it is not, which happens. A wrong fit costs you more than a declined enquiry, and I would rather say so before either of us has scoped anything.',
    },
    {
      num: '03',
      title: 'A written scope, in your language',
      body:
        'What I take on, what stays with your team, the sequence and the assumptions. Written so you can lift it into your own client document without translating it.',
    },
    {
      num: '04',
      title: 'Delivery behind your brand',
      body:
        'Your process, your cadence, your tooling. Progress in whatever form your project management needs, and decisions written up as they are made rather than at the end.',
    },
  ],

  faqs: [
    {
      q: 'Will you approach our client directly?',
      a: 'No, and it is a written commitment rather than an assurance. Communication runs through the agency unless you put me in a room, I do not pitch services around you during or after a project, and if a client contacts me directly I tell you and route it back to you.',
    },
    {
      q: 'Do you work under our brand?',
      a: 'Yes. Your process, your project management and your client-facing documents. If you want me on a client call I introduce myself however you have positioned the engagement, and if you would rather I stayed invisible that is also fine.',
    },
    {
      q: 'Which platforms can you take on?',
      a: 'Magento 2 and Adobe Commerce, Shopify and Shopify Plus, WooCommerce, WordPress, and headless storefronts over REST and GraphQL. The deepest work is Magento and headless architecture, which are also the two agencies most often cannot staff.',
    },
    {
      q: 'What size of engagement makes sense?',
      a: 'Anything from a written second opinion on a proposal, which is deliberately small and often the first thing, up to owning the technical side of a replatforming. Very small configuration tasks are usually not worth the overhead of bringing someone in.',
    },
    {
      q: 'Can you join client calls?',
      a: 'Yes, positioned however you prefer. Many agencies use this selectively for the architecture conversation, where having the person who made the decision explain it lands better than relaying it.',
    },
    {
      q: 'What if the project turns out to be the wrong shape?',
      a: 'I say so early, in writing, with what I would do instead. An agency that finds out at the halfway point carries that cost with its own client, which is a far more expensive conversation than a declined engagement.',
    },
  ] as readonly AgencyFaq[],

  finalHeadline: ['Won something', 'you cannot staff?'],
} as const;
