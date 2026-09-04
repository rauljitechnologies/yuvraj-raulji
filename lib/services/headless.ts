import type { PlatformService } from '../platform-services';

/* ═══════════════════════════════════════════════════════════════
   HEADLESS COMMERCE
   Hub: /headless-commerce/. Four services, and the hub's own
   argument runs through all of them: headless is an organisational
   decision sold as a performance one, and most stores asking for it
   want a faster theme.

   That argument is why /headless-commerce/consulting/ leads the
   cluster and why its honest outcome is often a recommendation
   against the project. A cluster that could only ever say yes would
   be a sales funnel wearing a service page.

   No percentage appears on any of these four. The hub says why: no
   headless engagement on the record has a published performance
   measurement, and headless results are inseparable from the
   rendering and caching choices made alongside them, so a number
   without those attached transfers to nobody.
   ═══════════════════════════════════════════════════════════════ */

export const HEADLESS_SERVICES: readonly PlatformService[] = [
  /* ── 01 Consulting ──────────────────────────────────────────── */
  {
    platform: 'headless-commerce',
    slug: 'consulting',
    label: 'Headless consulting',
    eyebrow: 'Yuvraj Raulji | Headless consulting',
    h1: ['Most stores asking for headless', 'want a faster theme.'],
    lede:
      'Headless is sold as a performance upgrade and is really an organisational one: it decouples the storefront from the commerce release cycle so the front end stops waiting on back-end deployments. If that is not your bottleneck, it will not pay, and it will hand you a deployment surface, a rendering strategy and a cache layer you now own.',
    cta: 'Test whether headless would pay',
    title: 'Headless Commerce Consulting | Yuvraj Raulji',
    description:
      'Independent headless commerce advice: whether decoupling would actually pay, what it costs to own, and the cheaper answers that solve the same symptom.',

    primaryKeyword: 'headless commerce consulting',
    secondaryKeywords: [
      'is headless commerce worth it',
      'headless commerce consultant',
      'headless vs traditional commerce',
      'composable commerce advice',
    ],
    searchIntent: 'Commercial and informational. Someone weighing a headless build, often after being sold one.',
    audience: 'Founders and technology leads holding a headless proposal and no independent read on it.',
    purpose: 'Own the "should we go headless" question, and answer it honestly enough to lose some of them.',
    entities: ['Headless Commerce', 'Composable Commerce', 'Shopify', 'Magento', 'eCommerce Consultant'],

    quickAnswer: {
      question: 'Is headless commerce worth it?',
      answer:
        'Headless commerce is worth it when the storefront release cycle is genuinely your bottleneck: when front-end changes wait on back-end deployments, when several channels need the same commerce data, or when the experience you want cannot be expressed inside the platform\'s theme layer. It is not worth it as a speed fix on its own, because a well-built theme on a hosted platform is fast and a badly configured headless storefront is not. Decoupling moves work rather than removing it, and the work it moves is rendering, caching and deployment, which you then own.',
      bestFor: [
        'Front-end changes blocked behind commerce releases',
        'Several channels consuming the same commerce data',
        'An experience the theme layer genuinely cannot express',
        'Deciding against a headless proposal already on the table',
      ],
    },

    boundary: {
      body:
        'This page is the decision. If it has been made and the question is how the system should be shaped, that is a different conversation with different deliverables.',
      href: '/headless-commerce/architecture/',
      label: 'Headless architecture, for a decision already made',
    },

    problems: [
      {
        symptom: 'Headless has been proposed and nobody can say why',
        impact:
          'The argument is that it is faster and modern. Neither is a business case, and a build committed to on that basis is discovered to be expensive at the point it is too late to stop.',
      },
      {
        symptom: 'The storefront waits on the commerce release',
        impact:
          'Marketing changes queue behind platform deployments, so the front end moves at the speed of the slowest thing in the release. This is the genuine case for decoupling and it is worth confirming rather than assuming.',
      },
      {
        symptom: 'The last headless build was abandoned',
        impact:
          'Two storefronts now exist, one of them half migrated, and the team maintains both. This is the most expensive outcome available and it usually follows a decision made on the wrong grounds.',
      },
      {
        symptom: 'Nobody has priced the ownership',
        impact:
          'Rendering strategy, cache invalidation, preview, a deployment pipeline and a front-end on-call are all now yours. None appears in a build estimate, and together they outlast it.',
      },
    ],

    approach: [
      {
        num: '01',
        title: 'Find the actual bottleneck',
        body:
          'What is being waited on, by whom, and how often. If front-end work is not queuing behind commerce releases, the central argument for headless does not apply to this business, whatever else is true.',
      },
      {
        num: '02',
        title: 'Price the cheaper answers first',
        body:
          'A theme rebuild, an app audit, a caching fix or a CDN change solves the stated symptom for a fraction of the cost in a large share of cases. They deserve to be ruled out explicitly rather than skipped.',
      },
      {
        num: '03',
        title: 'Cost the ownership, not the build',
        body:
          'Rendering, caching, preview, deployment and the people to run them. Comparing a headless build against a theme build is the wrong comparison; the difference is mostly what happens afterwards.',
      },
      {
        num: '04',
        title: 'Test it against the roadmap',
        body:
          'Headless pays over years, through release independence and multi-channel reuse. A roadmap with no second channel and no blocked release cycle will not collect that return.',
      },
      {
        num: '05',
        title: 'Give a straight answer',
        body:
          'Including no, which is a frequent outcome. A recommendation against a headless build is the most valuable thing this page can produce, and it is why the advice is independent of who would deliver it.',
      },
    ],

    capabilities: [
      {
        group: 'The decision',
        items: ['Bottleneck analysis', 'Cheaper alternatives', 'Ownership cost model', 'Roadmap fit'],
      },
      {
        group: 'Options',
        items: ['Headless against theme rebuild', 'Hydrogen against Next.js', 'Full against partial decoupling', 'Composable scope'],
      },
      {
        group: 'Review',
        items: ['Headless proposal review', 'Stalled build assessment', 'Team capability read', 'Second opinion'],
      },
      {
        group: 'Planning',
        items: ['Phasing and sequencing', 'Risk shape', 'Exit and rollback position', 'Ownership model'],
      },
    ],

    outcomes: [
      {
        label: 'A decision with reasoning attached',
        body:
          'The deliverable is a recommendation you could defend to a board, including the alternatives that were ruled out and why. That is what makes it possible to stop the project later without it being a reversal.',
      },
      {
        label: 'Frequently, a recommendation against',
        body:
          'Most stores that ask for headless want a faster theme, and getting that for a fraction of the cost is a better result than a build. This is the outcome nobody selling a headless build is incentivised to reach.',
      },
    ],
    outcomesNote:
      'No percentage is quoted on this page. No headless engagement on the record has a published performance measurement, and headless results are inseparable from the rendering and caching choices made alongside them, so a number without those attached would not transfer to your build.',

    faqs: [
      {
        q: 'Does headless commerce make a store faster?',
        a: 'Not by itself. Speed comes from the rendering and caching strategy, and both are available inside a well-built theme too. A headless storefront that renders on every request with no cache is slower than the theme it replaced. Decoupling changes who controls the front end, not what physics applies to it.',
      },
      {
        q: 'What does headless actually cost to own?',
        a: 'A rendering strategy, cache invalidation, content preview, a deployment pipeline and someone accountable for the front end being up. None of that appears in a build estimate and all of it is permanent, which is why the ownership cost matters more than the project cost.',
      },
      {
        q: 'When is headless clearly the right answer?',
        a: 'When front-end work is genuinely blocked behind commerce releases, when the same commerce data has to serve several channels, or when the experience cannot be built in the theme layer at all. Those are real and they are narrower than the way headless is usually sold.',
      },
      {
        q: 'Can we go partially headless?',
        a: 'Often, and it is under-used. Decoupling one high-value template while the rest stays in the theme captures much of the benefit at a fraction of the ownership cost, and it leaves a route back. Full decoupling should be a decision, not a default.',
      },
      {
        q: 'We already started a headless build and it stalled. What now?',
        a: 'Assess honestly whether the original reason still holds before deciding whether to finish it. Running two storefronts is the most expensive position available, so the answer is either to complete the move or to stop it deliberately, and either is better than maintaining both indefinitely.',
      },
    ],

    cases: ['fashion-d2c', 'b2b-procurement'],
    casesNote: 'A headless storefront and a custom B2B platform, both built over API boundaries rather than inside a platform theme.',
    posts: ['shopify-headless-nextjs-guide', 'magento2-pwa-studio-headless'],

    related: [
      {
        href: '/headless-commerce/',
        label: 'Headless and composable commerce, and when decoupling pays',
        note: 'The parent page, with the full argument for and against.',
      },
      {
        href: '/headless-commerce/architecture/',
        label: 'Headless architecture, once the decision is made',
        note: 'Rendering, caching and the boundary, decided deliberately.',
      },
      {
        href: '/shopify/optimization/',
        label: 'Shopify store optimisation, the cheaper answer most of the time',
        note: 'A faster theme is what most headless enquiries actually want.',
      },
      {
        href: '/nextjs/',
        label: 'Next.js, if the answer turns out to be yes',
        note: 'What you would be building in, and what it costs to own.',
      },
      {
        href: '/expertise/ecommerce-consulting/',
        label: 'eCommerce consulting, when the question is bigger than the front end',
        note: 'Sometimes the storefront is not what is holding the business back.',
      },
      {
        href: '/magento/consulting/',
        label: 'Magento consulting, where PWA Studio is the version of this question',
        note: 'The same decision, framed by a self-hosted platform.',
      },
      {
        href: '/insights/shopify-headless-nextjs-guide/',
        label: 'A headless Shopify build on Next.js, written out step by step',
        note: 'What the work actually looks like, before committing to it.',
      },
    ],
    finalHeadline: ['Is headless solving', 'your bottleneck?'],
  },

  /* ── 02 Architecture ────────────────────────────────────────── */
  {
    platform: 'headless-commerce',
    slug: 'architecture',
    label: 'Headless architecture',
    eyebrow: 'Yuvraj Raulji | Headless architecture',
    h1: ['The rendering decision', 'is the architecture.'],
    lede:
      'Once decoupling is decided, almost everything that follows is downstream of one question: what renders where, and when. Get that right and caching, preview, cost and the failure modes all fall into place. Get it wrong and no amount of front-end work recovers it, because you are fighting the shape of the system rather than its details.',
    cta: 'Discuss a headless architecture',
    title: 'Headless Commerce Architecture | Yuvraj Raulji',
    description:
      'Headless commerce architecture on Next.js, GraphQL and the Storefront API: rendering strategy, cache invalidation, the API boundary, preview and failure modes.',

    primaryKeyword: 'headless commerce architecture',
    secondaryKeywords: [
      'composable commerce architecture',
      'headless storefront rendering strategy',
      'next.js commerce architecture',
      'storefront api design',
    ],
    searchIntent: 'Commercial. A team that has committed to headless and needs the system shaped before it is built.',
    audience: 'Technology leads and architects who will own the storefront after the build team leaves.',
    purpose: 'Own the architecture query, distinct from the go or no-go decision above it.',
    entities: ['Headless Commerce', 'Composable Commerce', 'Next.js', 'GraphQL', 'Shopify', 'Magento'],

    quickAnswer: {
      question: 'How should a headless commerce storefront be architected?',
      answer:
        'The first decision is rendering: which pages are built at deploy time, which are cached at the edge and revalidated, and which genuinely need to render per request. Product and collection pages usually belong in the cached tier, cart and account per request. Everything else follows from that: cache invalidation has to be driven by commerce webhooks rather than by time, the API boundary should expose what the storefront needs rather than mirroring the platform schema, preview needs a path that does not bypass the cache design, and every third-party call needs a defined behaviour when it fails.',
      bestFor: [
        'A headless build about to start',
        'A storefront whose cache nobody can reason about',
        'Content preview that fights the rendering strategy',
        'Multi-channel storefronts sharing one commerce backend',
      ],
    },

    boundary: {
      body:
        'This page assumes decoupling is already decided. If it is still an open question, the honest first step is testing whether it would pay at all, because most stores asking for headless want something cheaper.',
      href: '/headless-commerce/consulting/',
      label: 'Headless consulting, for the decision itself',
    },

    problems: [
      {
        symptom: 'Nobody can say what is cached and for how long',
        impact:
          'Stale prices, stale stock, and a team afraid to change caching in case something breaks. Cache behaviour that cannot be reasoned about becomes cache behaviour nobody touches.',
      },
      {
        symptom: 'The storefront renders everything per request',
        impact:
          'The decoupled front end is slower than the theme it replaced and costs more to run. This is the commonest way a headless build fails to deliver the thing it was sold on.',
      },
      {
        symptom: 'Preview and production disagree',
        impact:
          'Editors cannot trust what they see, so content goes live to be checked. The workflow degrades into publishing as testing, which is exactly the thing decoupling was supposed to improve.',
      },
      {
        symptom: 'One slow third-party call takes down the page',
        impact:
          'A reviews widget or a personalisation service has no timeout and no fallback, so the storefront inherits the availability of its least reliable dependency.',
      },
    ],

    approach: [
      {
        num: '01',
        title: 'Decide rendering per template',
        body:
          'Static, cached and revalidated, or per request, chosen for each template against how often the data changes and how much staleness costs. A single site-wide answer is how storefronts end up either stale or expensive.',
      },
      {
        num: '02',
        title: 'Drive invalidation from commerce events',
        body:
          'Webhooks on price, stock and publish, invalidating precisely what changed. Time-based revalidation is a guess, and it is either too slow for stock or too expensive for everything else.',
      },
      {
        num: '03',
        title: 'Design the API boundary deliberately',
        body:
          'Expose what the storefront needs rather than mirroring the platform schema. Over-fetching from GraphQL is the standard performance failure in these builds, and it is a boundary design problem rather than a query tuning one.',
      },
      {
        num: '04',
        title: 'Give preview a real path',
        body:
          'Editors need to see unpublished content without bypassing the rendering model in a way that hides cache bugs until launch. Preview designed late is preview that contradicts production.',
      },
      {
        num: '05',
        title: 'Define every failure mode',
        body:
          'Timeouts, fallbacks and degraded states for each third-party call, decided before launch. A storefront should lose a reviews widget rather than a page.',
      },
    ],

    capabilities: [
      {
        group: 'Rendering',
        items: ['Static and cached tiers', 'Incremental revalidation', 'Per-request boundaries', 'Edge and CDN strategy'],
      },
      {
        group: 'Data',
        items: ['Storefront API design', 'GraphQL query shape', 'Over-fetch elimination', 'Search and filtering'],
      },
      {
        group: 'Platform',
        items: ['Next.js', 'Shopify Storefront API', 'Magento GraphQL and PWA Studio', 'Headless CMS boundary'],
      },
      {
        group: 'Operations',
        items: ['Cache invalidation from webhooks', 'Preview and draft mode', 'Failure modes and fallbacks', 'Deployment and rollback'],
      },
    ],

    outcomes: [
      {
        label: 'A cache anyone on the team can explain',
        body:
          'The durable outcome of architecture work is not a diagram. It is that a new engineer can say what is cached, for how long, and what invalidates it, which is the property that lets the storefront keep changing safely.',
      },
      {
        label: 'Failure that degrades instead of stopping',
        body:
          'Every third-party dependency has a timeout and a defined fallback, so the storefront survives its least reliable integration. That is a design decision, and it is only cheap before launch.',
      },
    ],
    outcomesNote:
      'No Lighthouse score or response-time figure is quoted here. Headless performance is a property of the rendering and caching choices rather than of the approach, so a number from another build tells you about its architecture and nothing about yours.',

    faqs: [
      {
        q: 'What rendering strategy should a headless storefront use?',
        a: 'Per template rather than site wide. Product and collection pages usually belong in a cached tier that revalidates on commerce events, because their data changes on a known trigger. Cart, checkout and account render per request. Marketing pages are often fully static. A single strategy applied everywhere is either stale or expensive.',
      },
      {
        q: 'How should cache invalidation work?',
        a: 'Driven by webhooks from the commerce platform on price, stock and publish events, invalidating precisely the affected pages. Time-based revalidation is a guess about how often things change, and on a commerce catalogue it is wrong in both directions at once.',
      },
      {
        q: 'Hydrogen or Next.js for a Shopify headless build?',
        a: 'Hydrogen is closer to Shopify\'s own primitives and Oxygen hosting; Next.js is more general and easier to staff for, and it suits builds that also serve non-commerce content. The decision is usually about the team you will have in two years rather than about the framework\'s features today.',
      },
      {
        q: 'Why is our GraphQL slow?',
        a: 'Almost always over-fetching. Storefront queries that mirror the platform schema pull far more than the template renders, and the fix is designing the boundary around what the page needs rather than tuning the query afterwards. This is the single most common performance failure in headless commerce builds.',
      },
      {
        q: 'How do editors preview content in a headless build?',
        a: 'Through a draft mode that renders the same components against unpublished data, on a path that does not silently bypass the caching model. Preview designed after launch tends to hide cache behaviour that then surfaces in production.',
      },
    ],

    cases: ['fashion-d2c', 'b2b-procurement'],
    casesNote: 'A headless storefront where rendering strategy carried the result, and a B2B platform built over an explicit API boundary.',
    posts: ['shopify-headless-nextjs-guide', 'magento2-pwa-studio-headless', 'aws-magento2-server-setup'],

    related: [
      {
        href: '/headless-commerce/',
        label: 'Headless and composable commerce, and when decoupling pays',
        note: 'The parent page, and the argument this work assumes.',
      },
      {
        href: '/headless-commerce/consulting/',
        label: 'Headless consulting, for the decision itself',
        note: 'Worth being certain about before the architecture is designed.',
      },
      {
        href: '/headless-commerce/optimization/',
        label: 'Storefront performance work on an existing headless build',
        note: 'When the architecture is set and the numbers still disappoint.',
      },
      {
        href: '/nextjs/',
        label: 'Next.js, the framework most of these are built in',
        note: 'The rendering tiers on this page, in the framework that expresses them.',
      },
      {
        href: '/magento/integrations/',
        label: 'Magento API and integration boundaries',
        note: 'The same boundary argument, pointed at the back office.',
      },
      {
        href: '/shopify/integrations/',
        label: 'Shopify APIs, webhooks and the integration contract',
        note: 'Where the invalidation events on this page come from.',
      },
      {
        href: '/insights/magento2-pwa-studio-headless/',
        label: 'PWA Studio and GraphQL performance, written out',
        note: 'Over-fetching and the 90+ Lighthouse target, in detail.',
      },
    ],
    finalHeadline: ['What renders where,', 'and when?'],
  },

  /* ── 03 Migration ───────────────────────────────────────────── */
  {
    platform: 'headless-commerce',
    slug: 'migration',
    label: 'Headless migration',
    eyebrow: 'Yuvraj Raulji | Headless migration',
    h1: ['Decouple one template', 'at a time.'],
    lede:
      'The riskiest way to go headless is all at once, and it is the way most projects are scoped. A storefront can move template by template behind the same domain, so each move is small, reversible and measurable. It takes longer on paper and it is the version that finishes.',
    cta: 'Discuss a headless migration',
    title: 'Headless Commerce Migration | Yuvraj Raulji',
    description:
      'Move a theme-based storefront to headless without a big-bang launch: template-by-template routing, URL and SEO continuity, and a rollback at every step.',

    primaryKeyword: 'headless commerce migration',
    secondaryKeywords: [
      'migrate to headless storefront',
      'theme to headless migration',
      'incremental headless migration',
      'replatform to next.js storefront',
    ],
    searchIntent: 'Commercial. A trading store moving from a theme to a decoupled storefront.',
    audience: 'Technology and eCommerce leads who cannot afford a launch-night cutover on a revenue-carrying store.',
    purpose: 'Own the headless replatforming query, with incrementalism as the argument.',
    entities: ['Headless Commerce', 'Next.js', 'Shopify', 'Magento', 'Technical SEO'],

    quickAnswer: {
      question: 'How do you migrate to a headless storefront?',
      answer:
        'The safest headless migration is incremental rather than a single launch. A proxy or edge router sits in front of the domain and sends specific paths to the new storefront while everything else continues to be served by the existing theme, so templates move one at a time. Each move is small enough to measure, and each is reversible by changing a route. Big-bang headless launches concentrate every rendering, caching, SEO and integration risk into one night, which is why so many of them stall halfway and leave two storefronts running.',
      bestFor: [
        'A revenue-carrying store that cannot risk a cutover',
        'Proving the approach on one template before committing',
        'A stalled headless build that needs a route forward',
        'Teams learning the operating model as they go',
      ],
    },

    boundary: {
      body:
        'This is moving an existing storefront to headless. Moving between commerce platforms is a different job, and doing both at once is the combination most likely to fail, because when traffic drops nobody can say which change caused it.',
      href: '/shopify/migration/',
      label: 'Shopify migration, for a change of commerce platform',
    },

    problems: [
      {
        symptom: 'The whole storefront is scoped as one launch',
        impact:
          'Every risk lands on the same night, and the only decision available when something goes wrong is whether to proceed anyway. Projects scoped this way stall more often than they fail outright, which is worse.',
      },
      {
        symptom: 'Two storefronts are already running',
        impact:
          'A migration stopped halfway, so the team maintains both and changes have to be made twice. This is the most expensive steady state available and it rarely resolves without a deliberate decision.',
      },
      {
        symptom: 'Rankings dropped after the new storefront went live',
        impact:
          'Rendering, internal linking or structured data changed in ways nobody diffed against the old templates. On a headless move the markup changes even when the URLs do not, and that is easy to miss.',
      },
      {
        symptom: 'The old integrations were assumed rather than checked',
        impact:
          'Analytics, consent, reviews, search and personalisation all lived in the theme. Each has to be reimplemented, and the ones nobody listed are found by the marketing team after launch.',
      },
    ],

    approach: [
      {
        num: '01',
        title: 'Inventory the theme, including what is not yours',
        body:
          'Templates, analytics, consent, reviews, search, personalisation and every embedded script. The list of third-party behaviour living in the theme is longer than anyone expects, and it is the usual source of post-launch surprises.',
      },
      {
        num: '02',
        title: 'Put a router in front',
        body:
          'A proxy or edge routing layer on the same domain, so paths can be moved individually and moved back. This is the piece that makes everything else incremental, and it is worth building first.',
      },
      {
        num: '03',
        title: 'Move one template, and measure it',
        body:
          'Usually a content or collection template rather than the product page, so the first move is real but not revenue critical. Field performance, conversion and rankings all get compared against the template it replaced.',
      },
      {
        num: '04',
        title: 'Hold URL and markup continuity',
        body:
          'Same URLs where possible, and a deliberate diff of canonical tags, internal linking, headings and structured data against the old template. On a headless move the markup changes even when the address does not.',
      },
      {
        num: '05',
        title: 'Proceed template by template, with a way back',
        body:
          'Each move is small enough to reverse by changing a route. The migration finishes because no single step is ever large enough to be worth stopping for.',
      },
    ],

    capabilities: [
      {
        group: 'Routing',
        items: ['Edge and proxy routing', 'Path-level cutover', 'Rollback by route', 'Domain and cookie continuity'],
      },
      {
        group: 'Continuity',
        items: ['URL preservation', 'Canonical and structured data diff', 'Internal link parity', 'Sitemap handling'],
      },
      {
        group: 'Reimplementation',
        items: ['Analytics and consent', 'Reviews and UGC', 'On-site search', 'Personalisation and A/B tooling'],
      },
      {
        group: 'Assurance',
        items: ['Per-template measurement', 'Field performance comparison', 'Conversion parity checks', 'Ranking monitoring'],
      },
    ],

    outcomes: [
      {
        label: 'A migration that can be stopped',
        body:
          'The most valuable property of an incremental move is that stopping is a legitimate outcome at every point. A store that has moved three templates and decided the rest are not worth it has succeeded, not failed.',
      },
      {
        label: 'Evidence per template, not per project',
        body:
          'Because each move is measured against the template it replaced, the business finds out whether headless is paying while it still has the option to change its mind.',
      },
    ],
    outcomesNote:
      'No traffic or performance figure is published here. What a headless move delivers depends almost entirely on the rendering and caching choices made alongside it, so a percentage from another build would describe that build rather than yours.',

    faqs: [
      {
        q: 'Can we migrate to headless without a big-bang launch?',
        a: 'Yes, and it is the approach worth defaulting to. An edge router or proxy on the same domain sends chosen paths to the new storefront while the theme continues to serve everything else, so templates move one at a time and each move is reversible by changing a route.',
      },
      {
        q: 'Which template should move first?',
        a: 'Usually a content or collection template rather than the product page. It is real enough to prove the rendering, caching and analytics model, and low enough in revenue that a problem is a lesson rather than an incident.',
      },
      {
        q: 'Will a headless migration affect SEO if the URLs stay the same?',
        a: 'It can, because the markup changes even when the address does not. Canonical tags, internal linking, heading structure and structured data are all regenerated by the new templates, so each moved template needs an explicit diff against the one it replaced rather than an assumption of parity.',
      },
      {
        q: 'What usually gets forgotten?',
        a: 'Everything third-party that lived in the theme: analytics and consent, reviews, on-site search, personalisation and A/B tooling. Each has to be reimplemented in the new storefront, and the ones nobody inventoried are found by the marketing team after launch.',
      },
      {
        q: 'Can we change commerce platform at the same time?',
        a: 'It is possible and it is the combination most likely to go wrong, because when traffic or conversion drops there is no way to attribute it. Sequencing the two, in either order, costs more calendar time and far less risk.',
      },
    ],

    cases: ['fashion-d2c'],
    casesNote: 'A headless storefront built over an API boundary rather than inside a platform theme.',
    posts: ['shopify-headless-nextjs-guide', 'magento2-pwa-studio-headless'],

    related: [
      {
        href: '/headless-commerce/',
        label: 'Headless and composable commerce, and when decoupling pays',
        note: 'The parent page, and the case this migration assumes.',
      },
      {
        href: '/headless-commerce/architecture/',
        label: 'Headless architecture, decided before the first template moves',
        note: 'Rendering and caching, which every moved template inherits.',
      },
      {
        href: '/headless-commerce/consulting/',
        label: 'Testing whether headless would pay at all',
        note: 'The step that stops a migration nobody needed.',
      },
      {
        href: '/shopify/migration/',
        label: 'Shopify migration, for a change of commerce platform',
        note: 'The other move, and the reason not to do both at once.',
      },
      {
        href: '/magento/migration/',
        label: 'Magento migration, for a move towards workflow complexity',
        note: 'Same rule: change one thing at a time.',
      },
      {
        href: '/insights/magento2-seo-technical-audit/',
        label: 'The technical SEO audit framework, applied per template',
        note: 'Canonicals, structured data and internal linking, checked rather than assumed.',
      },
    ],
    finalHeadline: ['Which template', 'moves first?'],
  },

  /* ── 04 Optimization ────────────────────────────────────────── */
  {
    platform: 'headless-commerce',
    slug: 'optimization',
    label: 'Headless optimisation',
    eyebrow: 'Yuvraj Raulji | Headless optimisation',
    h1: ['A headless storefront is', 'only as fast as its cache.'],
    lede:
      'Headless storefronts that disappoint almost always disappoint for the same three reasons: pages render per request that did not need to, GraphQL fetches far more than the template shows, and the JavaScript bundle grew every sprint without anyone owning the total. All three are recoverable, and none of them is an argument against the approach.',
    cta: 'Discuss storefront performance',
    title: 'Headless Storefront Performance | Yuvraj Raulji',
    description:
      'Performance work on an existing headless storefront: rendering tiers, cache hit rate, GraphQL over-fetching, bundle size and Core Web Vitals on field data.',

    primaryKeyword: 'headless storefront performance',
    secondaryKeywords: [
      'headless commerce performance optimization',
      'next.js commerce performance',
      'graphql over-fetching storefront',
      'headless core web vitals',
    ],
    searchIntent: 'Commercial. A live headless storefront that is not delivering the speed it was built for.',
    audience: 'Technology leads who own a decoupled storefront and are being asked why it is not faster.',
    purpose: 'Own the headless performance query, distinct from architecture and from the platform performance pages.',
    entities: ['Headless Commerce', 'Next.js', 'GraphQL', 'Core Web Vitals', 'Technical SEO'],

    quickAnswer: {
      question: 'Why is our headless storefront slow?',
      answer:
        'Usually because it renders more per request than it needs to. The three recurring causes are templates that render dynamically when they could be cached and revalidated on commerce events, GraphQL queries that fetch far more than the page displays because the boundary mirrors the platform schema, and a JavaScript bundle that grew with every feature while nobody owned the total. Server response and cache hit rate are where the recoverable time is; image and font work matters but arrives after the response, so it moves the smaller half of the number.',
      bestFor: [
        'A headless build that is slower than the theme it replaced',
        'Core Web Vitals failing in field data',
        'Cache hit rates nobody measures',
        'Bundle size that grew without a budget',
      ],
    },

    boundary: {
      body:
        'This is work on a storefront that already exists. If the rendering model was never designed, the fix is structural rather than incremental, and tuning around it will not hold.',
      href: '/headless-commerce/architecture/',
      label: 'Headless architecture, when the rendering model is the problem',
    },

    problems: [
      {
        symptom: 'The headless build is slower than the theme it replaced',
        impact:
          'The central promise of the project is visibly unmet, which puts every future front-end investment under suspicion. It is nearly always a rendering and caching decision rather than a framework limit.',
      },
      {
        symptom: 'Nobody measures the cache hit rate',
        impact:
          'The team optimises what it can see, which is bundle size and images, while most of the latency sits in requests that missed the cache and were built from scratch.',
      },
      {
        symptom: 'GraphQL returns far more than the page renders',
        impact:
          'Every request pays for fields nothing displays, on the storefront and on the commerce platform behind it. It is invisible in the browser and expensive at both ends.',
      },
      {
        symptom: 'The bundle grew every sprint',
        impact:
          'No budget, no owner, and a date-formatting library shipped three times. Interaction latency degrades gradually enough that nobody can point at the release that caused it.',
      },
    ],

    approach: [
      {
        num: '01',
        title: 'Measure the field, by template',
        body:
          'Real user data segmented by template and device, alongside cache hit rate and server response. A single site-wide score hides which template is losing the money.',
      },
      {
        num: '02',
        title: 'Move templates into the right rendering tier',
        body:
          'Anything rendering per request that could be cached and revalidated on a commerce event gets moved. This is where most of the recoverable time is and it is usually a configuration decision rather than a rewrite.',
      },
      {
        num: '03',
        title: 'Cut the query to the template',
        body:
          'Query shape driven by what the page renders, not by the platform schema. Over-fetching is the standard headless performance failure and fixing it improves the storefront and the commerce backend at the same time.',
      },
      {
        num: '04',
        title: 'Put a budget on the bundle',
        body:
          'Route-level budgets enforced in the pipeline, duplicate libraries removed, and anything that can be server-rendered kept off the client. A budget nobody enforces is a preference.',
      },
      {
        num: '05',
        title: 'Then images, fonts and stability',
        body:
          'Sizing, format, preloading the LCP element and eliminating layout shift. Real, and it arrives after the response, so it belongs after the response work rather than before it.',
      },
    ],

    capabilities: [
      {
        group: 'Rendering',
        items: ['Tier review per template', 'Revalidation triggers', 'Edge caching', 'Cache hit rate measurement'],
      },
      {
        group: 'Data',
        items: ['GraphQL query shape', 'Over-fetch elimination', 'Request waterfall reduction', 'Payload budgets'],
      },
      {
        group: 'Client',
        items: ['Bundle budgets', 'Duplicate dependency removal', 'Hydration cost', 'Third-party script control'],
      },
      {
        group: 'Experience',
        items: ['Core Web Vitals in the field', 'LCP element handling', 'Layout stability', 'Font and image pipeline'],
      },
    ],

    outcomes: [
      {
        label: 'The storefront finally does what it was built for',
        body:
          'When a decoupled front end underperforms the theme it replaced, the project has not delivered its central argument. Moving templates into the right rendering tier is usually what closes that gap, and it is rarely a rewrite.',
      },
      {
        label: 'A budget that outlives the engagement',
        body:
          'Bundle budgets in the pipeline and cache hit rate on a dashboard are what stop the next six months of features quietly undoing this work. Performance without a guard rail is a one-off.',
      },
    ],
    outcomesNote:
      'No Lighthouse score or percentage improvement is published here. Headless performance is a property of the rendering and caching decisions rather than of the approach, so a number from another storefront describes its architecture, not what is available in yours.',

    faqs: [
      {
        q: 'Why is our headless storefront slower than the old theme?',
        a: 'Almost always because too much renders per request. A cached page served from the edge beats a theme comfortably; a page rendered on demand against a slow GraphQL query does not. The fix is moving templates into a cached tier with invalidation driven by commerce events, and it is usually configuration rather than a rewrite.',
      },
      {
        q: 'What should we measure on a headless storefront?',
        a: 'Cache hit rate and server response first, then Core Web Vitals from field data segmented by template. Lab scores are useful for regression checks and poor for finding out where the money is going, because they do not tell you how often you missed the cache.',
      },
      {
        q: 'How much does GraphQL over-fetching actually cost?',
        a: 'More than it looks, because it is paid at both ends: the storefront waits longer and the commerce platform does more work per request. It is invisible in the browser, which is why it survives so long, and it is found by comparing what a query returns against what the template renders.',
      },
      {
        q: 'Is bundle size still a problem with modern frameworks?',
        a: 'Yes, mainly for interaction latency rather than initial paint. Server components and streaming reduce how much has to ship, but nothing prevents a team adding libraries every sprint. Route-level budgets enforced in the pipeline are what actually hold the line.',
      },
      {
        q: 'Can this be fixed without rebuilding?',
        a: 'Usually. Rendering tiers, query shape and bundle budgets are all changeable in place. The exception is a storefront with no coherent rendering model at all, where tuning around the structure does not hold and the fix is architectural.',
      },
    ],

    cases: ['fashion-d2c'],
    casesNote: 'A headless storefront where the rendering and caching strategy, rather than the framework, decided the result.',
    posts: ['shopify-headless-nextjs-guide', 'magento2-pwa-studio-headless', 'cro-double-conversion'],

    related: [
      {
        href: '/headless-commerce/',
        label: 'Headless and composable commerce, and when decoupling pays',
        note: 'The parent page, including what headless does not fix on its own.',
      },
      {
        href: '/headless-commerce/architecture/',
        label: 'Headless architecture, when the rendering model is the problem',
        note: 'Tuning does not hold on a storefront with no coherent model.',
      },
      {
        href: '/magento/performance/',
        label: 'Magento performance, where the cache is yours to configure',
        note: 'The same argument with the server side back in scope.',
      },
      {
        href: '/shopify/optimization/',
        label: 'Shopify store optimisation, where the server side is not yours',
        note: 'The other end of the spectrum, and different levers entirely.',
      },
      {
        href: '/insights/shopify-headless-nextjs-guide/',
        label: 'A headless Shopify build on Next.js, with the SEO and ISR detail',
        note: 'Where the rendering tiers on this page come from in practice.',
      },
      {
        href: '/expertise/ecommerce-consulting/',
        label: 'eCommerce consulting, when speed is not the constraint',
        note: 'Sometimes the storefront is fast and the business problem is elsewhere.',
      },
    ],
    finalHeadline: ['How often does your', 'storefront miss the cache?'],
  },
];
