import type { PlatformService } from '../platform-services';

/* ═══════════════════════════════════════════════════════════════
   SHOPIFY
   Hub: /shopify/, which owns the entity terms. These five own the
   service terms, one each.

   Every outcome on these five pages is descriptive, and none carries
   a percentage. That is deliberate and it matches what the hub above
   them already says in its own outcomesNote: the 60% page-load cut
   and the 90% order-processing automation came out of Magento work at
   B2B scale and belong to that platform. There is no Shopify
   engagement on the record with a published measurement, and moving a
   Magento number onto a Shopify page would cost more credibility than
   it bought.

   The two builds on the record are the plant store and the sports
   nutrition store, both D2C catalogues where the checkout and the
   product page carried the result.
   ═══════════════════════════════════════════════════════════════ */

export const SHOPIFY_SERVICES: readonly PlatformService[] = [
  /* ── 01 Consulting ──────────────────────────────────────────── */
  {
    platform: 'shopify',
    slug: 'consulting',
    label: 'Shopify consulting',
    eyebrow: 'Yuvraj Raulji | Shopify consulting',
    h1: ['Shopify advice from', 'outside the app store.'],
    lede:
      'Most Shopify advice is a recommendation to install something. The useful conversation is the opposite one: what the platform already does that you are paying an app to repeat, which of your constraints are real and which are theme decisions, and whether the thing you are about to build should be built at all.',
    cta: 'Discuss a Shopify decision',
    title: 'Shopify Consulting Services | Yuvraj Raulji',
    description:
      'Independent Shopify and Shopify Plus consulting: platform fit, theme architecture, app consolidation, Plus upgrade decisions and where the platform stops.',

    primaryKeyword: 'shopify consulting services',
    secondaryKeywords: [
      'shopify plus consultant',
      'shopify expert advice',
      'shopify app audit',
      'shopify architecture review',
    ],
    searchIntent: 'Commercial. A brand on Shopify facing a decision bigger than a task, or weighing Shopify against something else.',
    audience: 'Founders and eCommerce leads at the point where the next Shopify decision costs real money.',
    purpose: 'Own the Shopify advisory query, and keep it out of the delivery pages below it.',
    entities: ['Shopify', 'Shopify Plus', 'eCommerce Consultant', 'Yuvraj Raulji'],

    quickAnswer: {
      question: 'What does a Shopify consultant actually do?',
      answer:
        'Shopify consulting is independent advice on the decisions a Shopify business cannot easily undo: whether to move to Shopify Plus, whether the theme should be extended or rebuilt, which apps are earning their subscription and which are duplicating platform behaviour, where the catalogue and merchandising model is fighting the platform, and whether Shopify is still the right home for the business at all. It is judgement about trade-offs rather than implementation, and the value is usually in what it stops you building.',
      bestFor: [
        'Deciding whether Shopify Plus is worth the step up',
        'An app bill that has outgrown the development budget',
        'A theme that has become unmaintainable',
        'Weighing Shopify against Magento or a headless build',
      ],
    },

    boundary: {
      body:
        'This page is the thinking, not the build. If the decision is already made and the work is a faster storefront or a better converting one, that is delivery and it has its own page.',
      href: '/shopify/optimization/',
      label: 'Shopify store optimisation, for speed and conversion work',
    },

    problems: [
      {
        symptom: 'The app bill is bigger than the development budget',
        impact:
          'Fifteen subscriptions, several doing the same job, two of them injecting scripts into every page. The monthly cost is visible; the performance cost and the upgrade risk are not, and both are usually larger.',
      },
      {
        symptom: 'Nobody can say whether Plus is worth it',
        impact:
          'The decision gets made on revenue thresholds and sales conversations rather than on which Plus capabilities the business would actually use. Paid for and unused, it is the most expensive line item on the stack.',
      },
      {
        symptom: 'The theme cannot take another change',
        impact:
          'Four agencies have touched it, sections are duplicated, and every change carries a risk nobody can size. Teams respond by not changing it, which quietly ends merchandising as a practice.',
      },
      {
        symptom: 'Shopify is being blamed for a business problem',
        impact:
          'Replatforming is proposed as the answer to something the platform is not causing. It is an expensive way to discover the constraint was the catalogue data, the pricing model or the operation behind it.',
      },
    ],

    approach: [
      {
        num: '01',
        title: 'Understand the business first',
        body:
          'What is actually being sold, to whom, at what margin, and which parts of the operation the storefront is carrying. Shopify decisions look technical and are almost always commercial underneath.',
      },
      {
        num: '02',
        title: 'Read the current stack',
        body:
          'Theme, sections, apps, scripts, integrations and the checkout customisations. The app list on its own usually explains most of the performance and half the maintenance cost.',
      },
      {
        num: '03',
        title: 'Separate platform limits from build decisions',
        body:
          'A surprising share of what gets described as a Shopify limitation is a theme decision or an app working around another app. Only the genuine limits should be part of a replatform argument.',
      },
      {
        num: '04',
        title: 'Test the Plus and headless questions honestly',
        body:
          'Both get proposed for problems they do not fix. Plus is worth it for specific capabilities, and headless pays when the storefront release cycle is genuinely the bottleneck. When they are not, saying so is the job.',
      },
      {
        num: '05',
        title: 'Sequence what is left',
        body:
          'What unblocks the rest, what can wait, and what should be removed rather than improved. The output is an order of work with the reasoning attached, not a backlog.',
      },
    ],

    capabilities: [
      {
        group: 'Platform decisions',
        items: ['Shopify against Shopify Plus', 'Shopify against Magento', 'Theme rebuild against extension', 'Headless against Liquid'],
      },
      {
        group: 'Stack review',
        items: ['App audit and consolidation', 'Theme architecture review', 'Checkout customisation review', 'Script and pixel audit'],
      },
      {
        group: 'Commerce model',
        items: ['Catalogue and variant structure', 'Merchandising and collections', 'Markets and currency', 'Subscription and B2B fit'],
      },
      {
        group: 'Planning',
        items: ['Phasing and sequencing', 'Effort and risk shape', 'Second opinion on a proposal', 'Team and ownership model'],
      },
    ],

    outcomes: [
      {
        label: 'A shorter app list, and a cheaper one',
        body:
          'App consolidation is usually the fastest return available on a mature Shopify store, because it removes a monthly cost, a set of injected scripts and a maintenance dependency in one decision. It is also the one nobody is incentivised to recommend.',
      },
      {
        label: 'The decision not to replatform',
        body:
          'Some of these conversations end with a recommendation to stay where you are and fix something smaller. That is a legitimate result and it is cheaper than the alternative, which is why the engagement is priced as advice rather than as a deposit against a build.',
      },
    ],
    outcomesNote:
      'No percentage is quoted on this page. The measured figures published on this site came out of Magento work at B2B scale and belong to that platform; there is no Shopify engagement on the record with a published measurement, and borrowing one would be dishonest.',

    faqs: [
      {
        q: 'Is Shopify Plus worth the upgrade?',
        a: 'It depends on whether you would use what it adds: checkout extensibility, scripts and functions, Launchpad, expanded API limits, multiple storefronts and B2B. A business hitting none of those is buying a support tier at a premium price. The honest test is to list the specific things you cannot do today and check how many Plus actually unlocks.',
      },
      {
        q: 'How do I know if my Shopify theme should be rebuilt?',
        a: 'The signal is not how it looks, it is whether the team has stopped changing it. When merchandising avoids the theme because nobody can size the risk of a change, the theme has already failed, and patching it costs more over a year than replacing it.',
      },
      {
        q: 'Should we go headless on Shopify?',
        a: 'Only if the storefront release cycle is genuinely your bottleneck. Headless decouples the front end from the commerce release, which is an organisational gain rather than an automatic performance one. Most stores asking for it want a faster theme, and get it for a fraction of the cost and the ongoing complexity.',
      },
      {
        q: 'Can you review a Shopify agency proposal?',
        a: 'Yes, and it is a common reason people get in touch. What is worth checking is rarely the price. It is whether the proposal has an opinion about the app list, whether it distinguishes platform limits from theme decisions, and what it is quietly leaving out.',
      },
      {
        q: 'When is Shopify the wrong platform?',
        a: 'When the pricing logic, the approval structure or the catalogue complexity genuinely cannot be expressed in a hosted checkout. That is a real boundary and it is narrower than most replatforming conversations assume, so it is worth testing carefully before acting on it.',
      },
    ],

    cases: ['plant-store', 'sports-nutrition'],
    casesNote: 'Two Shopify builds from the record, both D2C catalogues where the checkout and the product page carried the result.',
    posts: ['shopify-plus-vs-magento2-2025', 'cro-double-conversion'],

    related: [
      {
        href: '/shopify/',
        label: 'Shopify and Shopify Plus, and where the platform stops',
        note: 'The parent page: what Shopify takes off your hands, and what it will not carry.',
      },
      {
        href: '/expertise/ecommerce-consulting/',
        label: 'eCommerce consulting, when the platform is still an open question',
        note: 'Platform-neutral advice, for a decision that has not narrowed to Shopify yet.',
      },
      {
        href: '/shopify/migration/',
        label: 'Moving a store onto Shopify from another platform',
        note: 'Once the decision is made, this is the shape of the work.',
      },
      {
        href: '/magento/',
        label: 'Magento, for quotes, approvals and multi-store complexity',
        note: 'The comparison most of these conversations are decided against.',
      },
      {
        href: '/headless-commerce/consulting/',
        label: 'Testing whether headless would actually pay',
        note: 'The other proposal that arrives attached to a slow storefront.',
      },
      {
        href: '/blog/shopify-plus-vs-magento2-2025/',
        label: 'Shopify Plus against Magento 2, written out in full',
        note: 'TCO, customisation depth and B2B, compared rather than asserted.',
      },
    ],
    finalHeadline: ['What is Shopify actually', 'costing you?'],
  },

  /* ── 02 Migration ───────────────────────────────────────────── */
  {
    platform: 'shopify',
    slug: 'migration',
    label: 'Shopify migration',
    eyebrow: 'Yuvraj Raulji | Shopify migration',
    h1: ['Move onto Shopify', 'and keep your rankings.'],
    lede:
      'Moving onto Shopify is mostly a simplification, and simplification is where things get lost. The catalogue has to fit a variant model that is deliberately less expressive than what you are leaving, the URLs change shape whether you like it or not, and the customisations you are proud of may have no home. Deciding what does not come is the work.',
    cta: 'Discuss a Shopify migration',
    title: 'Shopify Migration Services | Yuvraj Raulji',
    description:
      'Migrate to Shopify or Shopify Plus from Magento, WooCommerce or a legacy platform: catalogue mapping, URL and redirect strategy, customers, orders and cutover.',

    primaryKeyword: 'shopify migration services',
    secondaryKeywords: [
      'migrate to shopify plus',
      'magento to shopify migration',
      'woocommerce to shopify migration',
      'shopify replatforming',
    ],
    searchIntent: 'Commercial. A business that has decided to move onto Shopify and needs it done without losing traffic or history.',
    audience: 'eCommerce leads replatforming a trading store, usually off a self-hosted system they no longer want to operate.',
    purpose: 'Own the inbound-to-Shopify replatforming query.',
    entities: ['Shopify', 'Shopify Plus', 'Magento', 'WooCommerce', 'Technical SEO'],

    quickAnswer: {
      question: 'What is involved in migrating to Shopify?',
      answer:
        'A Shopify migration moves a trading store from Magento, WooCommerce or a legacy platform onto Shopify or Shopify Plus. The technical transfer of products, customers and orders is the routine part. The work that decides the outcome is mapping a catalogue into Shopify variants and metafields when the source model was more expressive, building a complete redirect map because Shopify imposes its own URL structure, and deciding honestly which customisations do not come across rather than rebuilding them as apps on day one.',
      bestFor: [
        'Leaving a self-hosted platform you no longer want to operate',
        'Consolidating several storefronts onto Shopify Markets',
        'Replacing a build nobody left documented',
        'Moving before a hosting or licence renewal',
      ],
    },

    boundary: {
      body:
        'This page is about arriving on Shopify. If you are moving in the other direction, off Shopify because the pricing or approval logic no longer fits a hosted checkout, that is a different job with a different risk profile.',
      href: '/magento/migration/',
      label: 'Magento migration, for a move towards catalogue and workflow complexity',
    },

    problems: [
      {
        symptom: 'The catalogue does not fit the variant model',
        impact:
          'Shopify caps options per product and models everything through variants and metafields. A catalogue built on a richer attribute system has to be remodelled, and doing it during the import rather than before produces a store that cannot be merchandised.',
      },
      {
        symptom: 'URLs change shape whether you want them to or not',
        impact:
          'Shopify enforces its own path structure for products and collections, so every ranking URL moves. Without a complete redirect map built from real search data, the traffic loss shows up four weeks after a launch everyone called successful.',
      },
      {
        symptom: 'The customisations have nowhere to go',
        impact:
          'Logic that lived in platform code has to become an app, a Function, or be dropped. Rebuilding all of it on day one is how a migration doubles in cost, and most of it turns out not to be missed.',
      },
      {
        symptom: 'Order and customer history is treated as optional',
        impact:
          'Support loses the ability to answer anything about a pre-launch order, returns break, and lifetime value reporting restarts at zero. It is cheap during the migration and expensive afterwards.',
      },
    ],

    approach: [
      {
        num: '01',
        title: 'Decide what does not come',
        body:
          'The first deliverable is a list of what is deliberately being left behind, agreed before anything moves. A migration that tries to preserve everything is a rebuild of the old platform inside the new one.',
      },
      {
        num: '02',
        title: 'Remodel the catalogue',
        body:
          'Products, variants, options and metafields, structured for how the business merchandises rather than mapped one to one from the source. Metafields carry what the variant model cannot, and deciding that split early keeps it coherent.',
      },
      {
        num: '03',
        title: 'Build the redirect map from real data',
        body:
          'Every URL with traffic or links gets a destination, taken from analytics and Search Console rather than from a crawl of the old sitemap. One hop, no chains, checked before launch rather than after.',
      },
      {
        num: '04',
        title: 'Move customers and orders',
        body:
          'Accounts, addresses and historical orders, verified by reconciliation against the source. Where the old platform held subscriptions or store credit, those need an explicit decision rather than an import.',
      },
      {
        num: '05',
        title: 'Rehearse, then cut over',
        body:
          'A full rehearsal on real data, with the rollback path written down. Shopify makes the launch itself simpler than most platforms, which is exactly why it gets under-rehearsed.',
      },
    ],

    capabilities: [
      {
        group: 'Sources',
        items: ['Magento 2 and Adobe Commerce', 'WooCommerce', 'Legacy and custom platforms', 'Shopify to Shopify Plus'],
      },
      {
        group: 'Catalogue',
        items: ['Variant and option modelling', 'Metafield design', 'Collections and merchandising', 'Media and asset transfer'],
      },
      {
        group: 'Search preservation',
        items: ['Redirect map from search data', 'Canonical and pagination', 'Sitemap and indexation', 'Post-launch monitoring'],
      },
      {
        group: 'Cutover',
        items: ['Customer and order import', 'Payment and gateway switch', 'Rehearsal on full data', 'Rollback plan'],
      },
    ],

    outcomes: [
      {
        label: 'Search visibility held through the move',
        body:
          'The measure of a migration is what organic traffic does in the eight weeks after launch, not whether the site went live on the planned date. That is why the redirect map is a launch blocker here rather than a follow-up task.',
      },
      {
        label: 'A smaller store than the one you left',
        body:
          'The point of moving to Shopify is usually to stop operating a platform. A migration that recreates every customisation as an app has kept the operating burden and added a subscription to it.',
      },
    ],
    outcomesNote:
      'No before-and-after traffic figure is published here. The migrations I have worked on belong to the businesses that ran them, and a percentage without the starting position attached would not tell you anything transferable.',

    faqs: [
      {
        q: 'Will migrating to Shopify hurt our SEO?',
        a: 'It can, and the URL structure is the reason. Shopify imposes its own paths for products and collections, so every ranking page moves. Rankings hold when the redirect map is built from actual traffic and link data before launch and kept to one hop; they fall and stay down when the map is generated from a sitemap crawl and checked afterwards.',
      },
      {
        q: 'How long does a Shopify migration take?',
        a: 'The catalogue remodelling drives the timeline, and it scales with how far the source data model sits from variants and metafields rather than with product count. A flat catalogue of ten thousand products is faster than a thousand products with a rich attribute system behind them.',
      },
      {
        q: 'Can we keep our custom checkout?',
        a: 'Not as it exists. Checkout is Shopify\'s, which is the main thing you are buying, and customisation happens through checkout extensibility and Functions on Plus rather than through code you control. That constraint is worth testing against your actual rules before committing to the move.',
      },
      {
        q: 'Does order history transfer?',
        a: 'Yes, and it should be treated as a requirement. Customers, addresses and historical orders come across and are verified by reconciling values rather than counting rows. Subscriptions and store credit need a specific decision, because they usually depend on an app rather than the platform.',
      },
      {
        q: 'Should we move to Shopify or stay where we are?',
        a: 'Stay if your pricing logic, approval chains or catalogue complexity genuinely cannot be expressed in a hosted checkout. Move if you are paying to operate a platform whose flexibility you are not using. That question belongs before a migration, not during one.',
      },
    ],

    cases: ['plant-store', 'sports-nutrition'],
    casesNote: 'Two D2C catalogues on Shopify, both with checkout customisation carried through apps rather than platform code.',
    posts: ['shopify-plus-vs-magento2-2025', 'magento2-seo-technical-audit'],

    related: [
      {
        href: '/shopify/',
        label: 'Shopify and Shopify Plus, and where the platform stops',
        note: 'The parent page, including the constraints a migration has to fit.',
      },
      {
        href: '/shopify/consulting/',
        label: 'Testing whether Shopify is the right destination at all',
        note: 'Worth doing before committing to the move rather than after.',
      },
      {
        href: '/magento/migration/',
        label: 'Magento migration, for a move in the opposite direction',
        note: 'When the complexity turns out to be real rather than inherited.',
      },
      {
        href: '/woocommerce/migration/',
        label: 'WooCommerce migrations, the most common source platform',
        note: 'Where the store outgrew the plugin layer rather than the platform.',
      },
      {
        href: '/shopify/optimization/',
        label: 'Shopify store optimisation, once the migration has landed',
        note: 'A migrated store is a starting position, not a finished one.',
      },
      {
        href: '/blog/magento2-seo-technical-audit/',
        label: 'The technical SEO audit framework, applied to a replatform',
        note: 'Redirects, canonicals and crawl budget, which is the half that fails quietly.',
      },
    ],
    finalHeadline: ['Planning a move', 'onto Shopify?'],
  },

  /* ── 03 Optimization ────────────────────────────────────────── */
  {
    platform: 'shopify',
    slug: 'optimization',
    label: 'Shopify optimisation',
    eyebrow: 'Yuvraj Raulji | Shopify optimisation',
    h1: ['Shopify is fast until', 'you make it slow.'],
    lede:
      'Shopify hands you a fast platform and then lets you spend that speed. Almost every slow Shopify store is slow for the same reasons: apps injecting scripts on every page, a theme carrying sections it no longer uses, and images shipped at the size they were uploaded. All three are recoverable, and none of them is a platform limitation.',
    cta: 'Discuss Shopify optimisation',
    title: 'Shopify Store Optimization | Yuvraj Raulji',
    description:
      'Shopify speed and conversion work: app and script consolidation, theme and Liquid performance, Core Web Vitals, product page and checkout conversion.',

    primaryKeyword: 'shopify store optimization',
    secondaryKeywords: [
      'shopify speed optimization',
      'shopify conversion rate optimization',
      'shopify core web vitals',
      'shopify theme performance',
    ],
    searchIntent: 'Commercial. A store already on Shopify losing conversion or rankings to speed and experience.',
    audience: 'eCommerce managers accountable for conversion rate and for what paid traffic does when it lands.',
    purpose: 'Own the Shopify speed and conversion query without touching the Magento performance keyword.',
    entities: ['Shopify', 'Shopify Plus', 'Core Web Vitals', 'CRO', 'Technical SEO'],

    quickAnswer: {
      question: 'How do you make a Shopify store faster?',
      answer:
        'On Shopify the server side is not yours to tune, so speed work is almost entirely about what the store adds on top of the platform. In order of usual impact: remove or consolidate apps that inject scripts into every page, cut the theme back to the sections it actually renders, serve images at the size they are displayed in modern formats, defer third-party tags that do not need to run before paint, and fix the layout shifts that make a fast page feel slow. Conversion work then sits on top of that, because a faster page raises the ceiling rather than the number on its own.',
      bestFor: [
        'Core Web Vitals failing in field data',
        'A store that got slower with every app added',
        'Paid traffic converting below its landing page benchmark',
        'Product and collection pages that feel heavy on mobile',
      ],
    },

    boundary: {
      body:
        'This page is delivery work on a store that is staying on Shopify. If the question underneath is whether the theme should be rebuilt, whether Plus is worth it, or whether to leave the platform, that is a decision rather than a task.',
      href: '/shopify/consulting/',
      label: 'Shopify consulting, for the decision behind the work',
    },

    problems: [
      {
        symptom: 'Every app added a little, and now it is a lot',
        impact:
          'Each app justified its own weight and none of them own the total. Scripts run on pages that do not need them, several apps duplicate one job, and the cumulative cost lands on the pages paid traffic arrives at.',
      },
      {
        symptom: 'Core Web Vitals fail in the field and pass in the lab',
        impact:
          'The team optimises what the tool measures rather than what a customer on a mid-range phone experiences. Google ranks on the field data, and the customer leaves on it.',
      },
      {
        symptom: 'The page paints and then jumps',
        impact:
          'Banners, app widgets and lazily loaded sections shift the layout after paint. It reads as a slow, unreliable store even when the timings are respectable, and it costs most on the tap that mattered.',
      },
      {
        symptom: 'Traffic is fine and conversion is not',
        impact:
          'The spend keeps working and the store does not convert what it brings. Speed is usually part of it and rarely all of it, and treating the two as one project is why some speed engagements deliver nothing commercially.',
      },
    ],

    approach: [
      {
        num: '01',
        title: 'Measure the field, by template',
        body:
          'Real user data segmented by device and by template, because product, collection and cart pages fail in different ways. A single site-wide score hides which page is costing the money.',
      },
      {
        num: '02',
        title: 'Audit the app and script layer first',
        body:
          'What each app injects, on which pages, and whether anything still uses it. On Shopify this is where most of the recoverable time is, and removal is a stronger fix than optimisation.',
      },
      {
        num: '03',
        title: 'Cut the theme back',
        body:
          'Unused sections, duplicated assets, render-blocking includes and Liquid doing work in a loop that could be done once. Theme weight is the part teams assume is fixed, and it usually is not.',
      },
      {
        num: '04',
        title: 'Fix the visible experience',
        body:
          'Image sizing and format, the critical path, and layout stability. This is the part a customer actually perceives, and on a hosted platform it is where most of the remaining gain lives.',
      },
      {
        num: '05',
        title: 'Then work the conversion path',
        body:
          'Product page, cart and checkout entry, tested rather than assumed. Speed raises the ceiling; the conversion work is what collects it.',
      },
    ],

    capabilities: [
      {
        group: 'Speed',
        items: ['App and script audit', 'Theme and Liquid performance', 'Image pipeline', 'Third-party tag deferral', 'Core Web Vitals'],
      },
      {
        group: 'Experience',
        items: ['Layout stability', 'Mobile product page', 'Collection and filtering', 'On-site search behaviour'],
      },
      {
        group: 'Conversion',
        items: ['Product page structure', 'Cart and checkout entry', 'Trust and payment signals', 'A/B test design'],
      },
      {
        group: 'Measurement',
        items: ['Field data by template', 'GA4 event model', 'Funnel instrumentation', 'Post-change monitoring'],
      },
    ],

    outcomes: [
      {
        label: 'A store that stops getting slower',
        body:
          'The durable outcome is not a one-off score. It is an app list somebody owns, a theme small enough to reason about, and a measurement in place so the next three releases do not quietly give the gain back.',
      },
      {
        label: 'Conversion measured where it is decided',
        body:
          'Instrumented at the product page, the cart and the checkout entry rather than as a single site-wide rate. A site-wide number tells you something changed; it does not tell you where or what to do next.',
      },
    ],
    outcomesNote:
      'No percentage is published here. The measured speed and conversion figures on this site came from Magento work at B2B scale and belong to that platform, and a Shopify store that has never had an app audit has far more headroom than one that has, so a single number would mislead in both directions.',

    faqs: [
      {
        q: 'Why is my Shopify store slow?',
        a: 'Almost always apps, theme weight and images, in that order. Shopify runs the server side, so the platform is rarely the constraint. What is left is what the store adds on top: injected scripts on every page, sections the theme no longer renders but still ships, and images served far larger than they display.',
      },
      {
        q: 'Do Shopify apps really slow the store down?',
        a: 'Many do, and the cost is cumulative rather than per app. An app that injects a script into every page pays that cost on every page, including the ones it does nothing on. The useful audit is not which apps are slow but which are still earning their place at all.',
      },
      {
        q: 'How much of Core Web Vitals can I control on Shopify?',
        a: 'More than most people expect. Server response is Shopify\'s, but LCP is usually a hero image you control, CLS is almost always your own layout, and the interaction delay is usually third-party JavaScript you added. The parts you cannot change are rarely the parts failing.',
      },
      {
        q: 'Is speed or conversion work the better investment?',
        a: 'They are sequential rather than competing. Speed raises the ceiling and conversion work collects it, so doing conversion work on a slow store means testing variants against a constraint neither variant removes. Fix the obvious speed cost first, then test.',
      },
      {
        q: 'Will this survive our next theme update?',
        a: 'Only if the work goes into the theme and the app list rather than into patches around them. That is why removal is preferred over optimisation here, and why the engagement ends with monitoring rather than with a report.',
      },
    ],

    cases: ['plant-store', 'sports-nutrition'],
    casesNote: 'Both are D2C catalogues where the product page and the checkout carried the result rather than the homepage.',
    posts: ['cro-double-conversion', 'shopify-headless-nextjs-guide'],

    related: [
      {
        href: '/shopify/',
        label: 'Shopify and Shopify Plus, and where the platform stops',
        note: 'The parent page, including what Shopify handles so you do not have to.',
      },
      {
        href: '/shopify/consulting/',
        label: 'Shopify consulting, for the decision behind the work',
        note: 'When the real question is the theme, Plus, or the platform itself.',
      },
      {
        href: '/shopify/maintenance/',
        label: 'Shopify maintenance, which is what holds a speed gain',
        note: 'Optimisation without monitoring erodes across the next few releases.',
      },
      {
        href: '/ai-search/',
        label: 'AI and semantic on-site search, when search is the leak',
        note: 'On a D2C catalogue, search sessions convert hardest and fail quietest.',
      },
      {
        href: '/blog/cro-double-conversion/',
        label: 'The CRO frameworks behind a better converting store',
        note: 'A/B methodology, heatmaps and checkout work, written out.',
      },
      {
        href: '/headless-commerce/optimization/',
        label: 'Storefront performance once the front end is decoupled',
        note: 'The same problem with different levers, and different costs.',
      },
    ],
    finalHeadline: ['Where is your store', 'spending its speed?'],
  },

  /* ── 04 Integrations ────────────────────────────────────────── */
  {
    platform: 'shopify',
    slug: 'integrations',
    label: 'Shopify integrations',
    eyebrow: 'Yuvraj Raulji | Shopify integrations',
    h1: ['Connect Shopify without', 'buying four more apps.'],
    lede:
      'Most Shopify integration problems are bought rather than built: an app per system, each with its own sync logic, none of them agreeing on which side is right. The alternative is unglamorous and much cheaper to live with, which is naming the source of truth per field and building one boundary you can test.',
    cta: 'Discuss a Shopify integration',
    title: 'Shopify Integration Services | Yuvraj Raulji',
    description:
      'Shopify integration with ERP, CRM, 3PL and marketing systems: a source of truth per field, the Admin API, webhooks, reconciliation and failure handling.',

    primaryKeyword: 'shopify integration services',
    secondaryKeywords: [
      'shopify erp integration',
      'shopify api integration',
      'shopify 3pl integration',
      'shopify crm integration',
    ],
    searchIntent: 'Commercial. A Shopify business whose store has to agree with the systems behind it.',
    audience: 'Operations and technology leads where stock, orders or customer data crosses a system boundary.',
    purpose: 'Own the Shopify integration query, with the contract-first argument.',
    entities: ['Shopify', 'Shopify Plus', 'AI Automation', 'Digital Transformation'],

    quickAnswer: {
      question: 'How does Shopify integrate with an ERP or a 3PL?',
      answer:
        'Shopify integrates through its Admin API, Storefront API and webhooks, usually with a queue or middleware between it and the other system so neither has to be available for the other to keep working. The connection itself is straightforward. What makes an integration reliable is the contract: for every field, which system is the source of truth, how often it syncs, what happens when a message fails, and how the two sides are reconciled when they drift. Buying an app per system skips that decision, which is why stores with five sync apps still correct data by hand.',
      bestFor: [
        'ERP or accounting as the system of record',
        '3PL and fulfilment across multiple locations',
        'Marketing and engagement platforms needing clean customer data',
        'Replacing several overlapping sync apps with one boundary',
      ],
    },

    problems: [
      {
        symptom: 'Three apps sync the same data and disagree',
        impact:
          'Each was bought to solve one problem and none owns the whole picture. Staff learn which one to trust for which field, and that knowledge lives in people rather than in the system.',
      },
      {
        symptom: 'Stock is wrong often enough that people check manually',
        impact:
          'Oversells, cancellations and a support routine built around distrust of the store. The manual check becomes the process and its cost is never counted, because nobody logs it as a ticket.',
      },
      {
        symptom: 'Nobody knows a sync failed until a customer says so',
        impact:
          'Failures are silent by default, so a stalled queue looks exactly like a quiet afternoon. By the time it surfaces, the recovery includes an apology and a reconciliation.',
      },
      {
        symptom: 'API limits are hit during the busy hour',
        impact:
          'Sync backs up precisely when the store is busiest, because the integration was designed for the average rather than the peak. The failure lands on the day the business spent money to create.',
      },
    ],

    approach: [
      {
        num: '01',
        title: 'Name the source of truth per field',
        body:
          'Not per system. Stock may belong to the 3PL while price belongs to Shopify and customer records belong to the CRM. Writing it down settles most of the arguments the integration would otherwise cause.',
      },
      {
        num: '02',
        title: 'Write the contract',
        body:
          'Fields, direction, frequency and behaviour on failure. A contract makes the integration testable, which means a change on either side gets verified rather than discovered by a customer.',
      },
      {
        num: '03',
        title: 'Build one boundary, not four apps',
        body:
          'Webhooks and the Admin API through a single integration layer, with retries and a dead letter path. Consolidating overlapping sync apps usually pays for the work on subscriptions alone.',
      },
      {
        num: '04',
        title: 'Design for the peak, not the average',
        body:
          'Shopify rate limits are generous and finite. Bulk operations, queued writes and backoff belong in the design, because the integration will be tested hardest on the day it matters most.',
      },
      {
        num: '05',
        title: 'Reconcile, and alert on drift',
        body:
          'Scheduled comparison across the boundary with differences classified rather than dumped into a report nobody opens. It reports; it does not auto-correct, because silent correction across a boundary makes a small discrepancy large.',
      },
    ],

    capabilities: [
      {
        group: 'Systems',
        items: ['ERP and accounting', '3PL and fulfilment', 'CRM', 'PIM', 'Marketing and engagement platforms'],
      },
      {
        group: 'Interfaces',
        items: ['Admin API', 'Storefront API', 'Webhooks', 'Bulk operations', 'Shopify Flow'],
      },
      {
        group: 'Reliability',
        items: ['Per-field contract', 'Retry and dead letter', 'Rate limit handling', 'Idempotent writes'],
      },
      {
        group: 'Assurance',
        items: ['Reconciliation jobs', 'Drift alerting', 'Failure visibility', 'App consolidation'],
      },
    ],

    outcomes: [
      {
        label: 'One boundary instead of several apps',
        body:
          'Consolidation removes a monthly cost, a set of overlapping sync behaviours and a maintenance dependency in the same decision. On a mature store it is frequently the clearest return in the whole stack.',
      },
      {
        label: 'Failures that announce themselves',
        body:
          'The measurable change is not that syncs stop failing, because they will. It is that a failure is visible in minutes rather than being discovered by a customer, which is the difference between a task and an incident.',
      },
    ],
    outcomesNote:
      'The automation figures published on this site, 90% of B2B order and quote processing and 40% off approval cycle time, came from a Magento B2B procurement platform and belong to that page. There is no Shopify integration on the record with a published measurement.',

    faqs: [
      {
        q: 'Should we use an app or build a custom Shopify integration?',
        a: 'An app is right when your process matches what it assumes and you are happy to accept its sync model. Build when the source-of-truth rules are specific to your business, when several apps are already overlapping, or when a failure needs to be visible and recoverable on your terms rather than the vendor\'s.',
      },
      {
        q: 'How do you decide which system owns a field?',
        a: 'By asking where the value is created and who is accountable for it being right. Stock is created by the warehouse or the 3PL. Price is usually created in the ERP or in Shopify depending on how promotions run. The test is simple: when the two disagree, whose answer would you act on?',
      },
      {
        q: 'What happens when the ERP is unavailable?',
        a: 'With a queue between the systems the store keeps trading and messages deliver when the ERP returns. Without one, an ERP maintenance window becomes a commerce incident, which is the strongest argument against direct synchronous calls between them.',
      },
      {
        q: 'Do Shopify API rate limits cause real problems?',
        a: 'They do when an integration was designed against average volume. Bulk operations, queued writes and proper backoff handle the peak, and the peak is exactly when the integration is under the most commercial pressure, so it deserves the design attention rather than the average.',
      },
      {
        q: 'Can Shopify Flow replace a custom integration?',
        a: 'For triggering internal actions and simple routing, often yes, and it is worth trying first. It is not a substitute for a bidirectional sync with a contract, retries and reconciliation, and using it as one produces automation nobody can debug.',
      },
    ],

    cases: ['plant-store', 'b2b-procurement'],
    casesNote: 'A Shopify D2C store with checkout and login handled through third-party services, and a custom B2B platform where the integration boundary was the whole product.',
    posts: ['ai-ecommerce-revenue-2025', 'shopify-headless-nextjs-guide'],

    related: [
      {
        href: '/shopify/',
        label: 'Shopify and Shopify Plus, and where the platform stops',
        note: 'The parent page, including the app layer this work usually reduces.',
      },
      {
        href: '/magento/integrations/',
        label: 'The same contract-first argument on Magento',
        note: 'Where the workflow layer is richer and the boundary is bigger.',
      },
      {
        href: '/ai-automation/',
        label: 'AI automation for reconciliation and operations',
        note: 'Where drift detection stops being a report and starts being a process.',
      },
      {
        href: '/shopify/maintenance/',
        label: 'Shopify maintenance, and monitoring the boundary',
        note: 'An integration nobody watches fails quietly by design.',
      },
      {
        href: '/digital-transformation/',
        label: 'Modernising legacy stacks into API-first systems',
        note: 'The same argument, applied across the business rather than one store.',
      },
      {
        href: '/headless-commerce/',
        label: 'Headless commerce on the Storefront API',
        note: 'The same APIs, pointed at the storefront instead of the back office.',
      },
    ],
    finalHeadline: ['Which system is right', 'when they disagree?'],
  },

  /* ── 05 Maintenance ─────────────────────────────────────────── */
  {
    platform: 'shopify',
    slug: 'maintenance',
    label: 'Shopify maintenance',
    eyebrow: 'Yuvraj Raulji | Shopify maintenance',
    h1: ['Shopify runs itself.', 'Your store does not.'],
    lede:
      'Shopify handles the platform: uptime, PCI, upgrades, the parts that used to keep people awake. What it does not handle is your theme, your app list, your integrations and your data quality, and those are what actually break. Maintenance here is ownership of the layer Shopify deliberately left to you.',
    cta: 'Discuss ongoing Shopify support',
    title: 'Shopify Store Maintenance | Yuvraj Raulji',
    description:
      'Ongoing Shopify support: theme and app ownership, integration monitoring, release discipline, performance watch and the data hygiene a store quietly loses.',

    primaryKeyword: 'shopify store maintenance',
    secondaryKeywords: [
      'shopify support services',
      'shopify retainer',
      'shopify ongoing support',
      'shopify theme maintenance',
    ],
    searchIntent: 'Commercial. A Shopify business without reliable ownership of the layer above the platform.',
    audience: 'Operators whose store is business critical and whose theme changes currently depend on whoever is available.',
    purpose: 'Own the ongoing-support query for Shopify, distinct from one-off optimisation.',
    entities: ['Shopify', 'Shopify Plus', 'Technology Consultant'],

    quickAnswer: {
      question: 'What does Shopify maintenance actually cover?',
      answer:
        'Shopify maintains the platform, so store maintenance is everything above it: keeping the theme releasable rather than frozen, owning the app list so it does not grow by accretion, monitoring integrations and webhooks that fail silently, watching performance so an optimisation does not erode, and keeping product and customer data clean enough that the marketing and merchandising built on it can be trusted. It is deliberately unexciting, and the measure of it is how rarely anything becomes an incident.',
      bestFor: [
        'A store where theme changes wait on whoever is free',
        'App lists nobody has reviewed in a year',
        'Integrations that fail without telling anyone',
        'Teams who want changes made without a project each time',
      ],
    },

    boundary: {
      body:
        'This is the ongoing arrangement. A one-off engagement to make the store faster or convert better is a project with an end, and it is usually the right thing to do first.',
      href: '/shopify/optimization/',
      label: 'Shopify store optimisation, as a piece of work with an end',
    },

    problems: [
      {
        symptom: 'Theme changes wait on whoever is available',
        impact:
          'Merchandising slows to the speed of the queue, and the person who eventually makes the change is rarely the person who made the last one. The theme drifts, and nobody owns the drift.',
      },
      {
        symptom: 'The app list only ever grows',
        impact:
          'Apps are added for a campaign and never removed. Each leaves scripts, data and permissions behind, and the store carries the cost of every experiment anyone ever ran.',
      },
      {
        symptom: 'Integrations fail silently',
        impact:
          'A webhook stops delivering and nothing says so. Orders, stock or customer records diverge quietly, and the discovery is a reconciliation rather than an alert.',
      },
      {
        symptom: 'Performance gains erode after every release',
        impact:
          'The store was optimised once and nothing watches it, so each release gives back a little until the work has to be paid for again from the beginning.',
      },
    ],

    approach: [
      {
        num: '01',
        title: 'Take stock of what exists',
        body:
          'Theme and its history, the app list with what each one still does, integrations and their failure behaviour, and who currently holds the knowledge. On most stores this is the first accurate picture anyone has had.',
      },
      {
        num: '02',
        title: 'Make theme changes routine',
        body:
          'A working copy, a review step and a way to publish that does not depend on one person being available. Removing that dependency is usually the highest-value week of the arrangement.',
      },
      {
        num: '03',
        title: 'Own the app list',
        body:
          'Reviewed on a schedule rather than when the invoice is questioned. Anything nothing uses comes out, and anything duplicating another app gets a decision rather than a coexistence.',
      },
      {
        num: '04',
        title: 'Monitor what actually fails',
        body:
          'Webhook delivery, integration drift, checkout errors and Core Web Vitals in the field. Uptime monitoring reports that Shopify is up, which was never the risk.',
      },
      {
        num: '05',
        title: 'Hand it back',
        body:
          'Documentation and enough transfer that the internal team can hold it. An arrangement that makes itself indispensable is a commercial arrangement rather than a technical one.',
      },
    ],

    capabilities: [
      {
        group: 'Theme',
        items: ['Release process', 'Section and template changes', 'Theme update handling', 'Working copy discipline'],
      },
      {
        group: 'Apps',
        items: ['Scheduled app review', 'Removal and consolidation', 'Script and pixel hygiene', 'Permission review'],
      },
      {
        group: 'Monitoring',
        items: ['Webhook delivery', 'Integration drift', 'Checkout errors', 'Core Web Vitals in the field'],
      },
      {
        group: 'Data',
        items: ['Product and metafield hygiene', 'Customer data quality', 'GA4 and event integrity', 'Collection and tag structure'],
      },
    ],

    outcomes: [
      {
        label: 'Changes stop being projects',
        body:
          'The practical outcome is that a merchandising change takes a day rather than a planning cycle, because the release path exists and more than one person can run it.',
      },
      {
        label: 'A store that stops accumulating',
        body:
          'Apps, scripts, tags and unused sections all grow by default. The value of a scheduled review is not any single removal, it is that the total stops rising without anyone deciding it should.',
      },
    ],
    outcomesNote:
      'No uptime or response-time commitment is published here. Uptime is Shopify\'s and it is not mine to claim, and response times are contractual terms that depend on the cover agreed rather than a number on a page.',

    faqs: [
      {
        q: 'Does a Shopify store need maintenance at all?',
        a: 'The platform does not, and that is genuinely what you are buying. The theme, the app list, the integrations and the data do, and they are what break. Stores that treat Shopify\'s reliability as covering the whole stack tend to discover the gap through a silent integration failure.',
      },
      {
        q: 'What is the difference between maintenance and a retainer for changes?',
        a: 'Maintenance is the work that reduces how often something goes wrong: review, monitoring and release discipline. A change retainer is capacity for things you want built. Both are reasonable to buy; buying only the second is why some stores have a monthly invoice and a monthly surprise.',
      },
      {
        q: 'How often should the app list be reviewed?',
        a: 'On a schedule rather than when someone questions the invoice, because apps are added under time pressure and removed under none. A regular review is the only mechanism that reliably takes anything out.',
      },
      {
        q: 'Do theme updates break customisation?',
        a: 'They can, which is why customisation belongs in sections and settings rather than scattered through templates, and why a working copy exists before an update rather than after it. A theme that cannot take an update has already stopped being maintainable.',
      },
      {
        q: 'Can you work alongside our existing agency?',
        a: 'Yes, and it is often the sensible arrangement when the agency owns design and campaigns and what is missing is the technical ownership underneath. What matters is that one party owns the app list and the release path, rather than both assuming the other does.',
      },
    ],

    cases: ['plant-store', 'sports-nutrition'],
    casesNote: 'Both are trading D2C stores where a silent checkout or login failure costs orders rather than degrading a page.',
    posts: ['cro-double-conversion', 'shopify-plus-vs-magento2-2025'],

    related: [
      {
        href: '/shopify/',
        label: 'Shopify and Shopify Plus, and where the platform stops',
        note: 'The parent page, and the line between what Shopify owns and what you do.',
      },
      {
        href: '/shopify/optimization/',
        label: 'Shopify store optimisation, as a project with an end',
        note: 'The gain that erodes without something watching it.',
      },
      {
        href: '/shopify/integrations/',
        label: 'Shopify integrations, and the boundary that fails quietly',
        note: 'The part of the stack most worth monitoring.',
      },
      {
        href: '/magento/maintenance/',
        label: 'The same discipline on a self-hosted platform',
        note: 'Where patching and hosting join the list, and the stakes rise.',
      },
      {
        href: '/wordpress/maintenance/',
        label: 'WordPress maintenance, for the content side of the stack',
        note: 'Often the other half of the same business.',
      },
      {
        href: '/expertise/ecommerce-consulting/',
        label: 'eCommerce consulting, when the recurring problem is structural',
        note: 'Some maintenance load is a symptom rather than a workload.',
      },
    ],
    finalHeadline: ['Who owns the layer', 'Shopify left to you?'],
  },
];
