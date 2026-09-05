/**
 * /ecommerce-audit/
 *
 * ── Why this page exists ────────────────────────────────────────────────────
 *
 * The Sep 2026 diagnosis found the site sells "a 30-minute consultation" and
 * nothing else. That is a request for the visitor's time with no stated
 * deliverable, and it is a weaker ask than it looks: the buyer cannot picture
 * what arrives, cannot justify it internally, and cannot say yes to it without
 * also agreeing to a sales conversation.
 *
 * A named diagnostic with a written output is easier to accept, filters out
 * buyers who will never pay, and produces a document that does the selling for
 * whatever engagement follows. It converts a stranger into a client in one step
 * rather than four.
 *
 * ── The boundary against /hire/ and /expertise/ecommerce-consulting/ ────────
 *
 * /expertise/ecommerce-consulting/ owns the service definition and the
 * informational query. /hire/ owns the engagement shapes and the decision to
 * work together. This page owns one purchasable thing. Without that split the
 * three compete, which is the cannibalisation the audit already flagged
 * between the first two.
 *
 * ── No pricing here ─────────────────────────────────────────────────────────
 *
 * Deliberately. The diagnosis recommends the offer, not the number, and
 * inventing a price would be inventing a commercial decision that is Yuvraj's
 * to make. The page is written so a price can be added in one place later.
 */

export interface AuditFaq {
  q: string;
  a: string;
}

export interface AuditItem {
  title: string;
  body: string;
}

export const AUDIT = {
  eyebrow: 'Diagnostic engagement',
  h1: ['Find out what is actually', 'wrong, in writing.'],
  lede:
    'A fixed-scope technical review of a live store, delivered as a written document with findings ordered by what they are costing you. It is deliberately a small piece of work, it ends with a recommendation rather than a proposal, and the recommendation is occasionally that you do not need the project you were about to commission.',
  cta: 'Request an audit',
  title: 'eCommerce Technical Audit | Yuvraj Raulji',
  description:
    'A fixed-scope technical audit of a live commerce store: architecture, performance, checkout, integrations, analytics and search, delivered as a written, prioritised document.',

  primaryKeyword: 'ecommerce technical audit',
  secondaryKeywords: [
    'shopify performance audit',
    'magento technical audit',
    'ecommerce site audit service',
    'ecommerce architecture review',
    'independent ecommerce audit',
  ],
  searchIntent: 'Transactional. A business with a symptom and no diagnosis.',
  audience:
    'Business owner, managing director or head of eCommerce on a live store, usually with flat revenue, a slow site, a failing integration or a replatforming proposal they cannot evaluate.',
  purpose:
    'Give the site one named, scoped, purchasable offer, replacing an open invitation to talk as the primary conversion.',
  entities: [
    'Magento 2',
    'Adobe Commerce',
    'Shopify Plus',
    'WooCommerce',
    'Core Web Vitals',
    'GA4',
    'ERP',
    'Technical SEO',
  ],

  quickAnswer: {
    question: 'What does an eCommerce technical audit include?',
    answer:
      'A review of the parts of a store that decide whether it performs: the platform architecture and data model, page and checkout performance on real devices, the checkout and search journeys, the integrations that carry orders and stock, the analytics you are making decisions from, and crawlability and indexation. The output is a written document listing what is wrong, what it is plausibly costing, and what to do in what order. It is not a proposal, and about a third of the findings are usually things a business can fix without hiring anyone.',
    bestFor: [
      'Revenue flat while traffic is not',
      'A replatforming proposal you cannot independently evaluate',
      'A store nobody has technically owned for a while',
    ],
  },

  covers: [
    {
      title: 'Architecture and data model',
      body:
        'Whether the catalogue, attribute and store structure matches how the business actually trades, and where it will stop scaling.',
    },
    {
      title: 'Performance, on field data',
      body:
        'Core Web Vitals from real devices rather than a lab score, the caching layers, and the front-end weight accumulated over years of additions.',
    },
    {
      title: 'Checkout and conversion path',
      body:
        'Where people leave, which steps are doing damage, and which of the usual suspects are actually the problem on this store rather than in general.',
    },
    {
      title: 'Integrations',
      body:
        'ERP, PIM, CRM, OMS and fulfilment: what the source of truth is per field, what fails silently, and what nobody is reconciling.',
    },
    {
      title: 'Analytics you can trust',
      body:
        'Whether the numbers being used to make decisions are correct. Double counting, missing conversions and untracked steps are common and quietly expensive.',
    },
    {
      title: 'Crawlability, indexation and structure',
      body:
        'Whether search engines can read the catalogue, and whether the URL, canonical and structured data decisions are working or fighting each other.',
    },
  ] as readonly AuditItem[],

  deliverables: [
    {
      title: 'A written findings document',
      body:
        'Every finding with its current state, why it matters commercially, and a specific recommendation. Written to be read by a business owner and actioned by a technical team.',
    },
    {
      title: 'A priority order',
      body:
        'Ranked by the combination of business impact and effort, so the list can be worked from the top rather than argued about.',
    },
    {
      title: 'A walkthrough conversation',
      body:
        'A call to go through it, challenge it and decide what happens next. Bring whoever will do the work.',
    },
    {
      title: 'An honest verdict on the platform',
      body:
        'Including when the platform is fine and the problem is elsewhere, which is a common and unwelcome finding.',
    },
  ] as readonly AuditItem[],

  notFor: [
    {
      title: 'A store that has not launched',
      body:
        'There is nothing to measure. That conversation is an architecture review before the build, which is a different and cheaper piece of work.',
    },
    {
      title: 'A business that has already decided',
      body:
        'If the platform decision is made and the budget is committed, an audit is a formality. Spend the money on the delivery instead.',
    },
    {
      title: 'Anyone wanting a number to justify a decision',
      body:
        'The findings go where the evidence goes. If the honest answer contradicts the plan, that is what the document will say.',
    },
  ] as readonly AuditItem[],

  faqs: [
    {
      q: 'What does an eCommerce technical audit include?',
      a: 'Architecture and data model, performance on real device data, the checkout and search journeys, the integrations carrying orders and stock, the analytics behind your decisions, and crawlability and indexation. The output is a written, prioritised document rather than a call.',
    },
    {
      q: 'How is this different from a free consultation?',
      a: 'A consultation is a conversation and produces an opinion. An audit is a piece of work and produces a document you keep, which your team can action whether or not anything else follows. It also ends with a recommendation rather than a proposal.',
    },
    {
      q: 'What access do you need?',
      a: 'Read access to the platform admin and analytics, and a conversation with whoever knows the integrations. Nothing is changed on the store during an audit.',
    },
    {
      q: 'Will this turn into a sales pitch?',
      a: 'The document ends with what to do, not with what to buy. A reasonable proportion of findings are usually things an in-house team can fix without hiring anyone, and those are marked as such.',
    },
    {
      q: 'Which platforms can be audited?',
      a: 'Magento 2 and Adobe Commerce, Shopify and Shopify Plus, WooCommerce, and headless storefronts. The commerce questions are largely the same across them; the mechanics differ.',
    },
    {
      q: 'What if the audit finds nothing serious?',
      a: 'That is a valid and useful outcome, and it gets written up as plainly as any other. Knowing the platform is sound redirects the conversation to where the problem actually is, which is usually merchandising, acquisition or pricing.',
    },
  ] as readonly AuditFaq[],

  finalHeadline: ['Know what is wrong', 'before you spend on fixing it.'],
} as const;
