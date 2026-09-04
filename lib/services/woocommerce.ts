import type { PlatformService } from '../platform-services';

/* ═══════════════════════════════════════════════════════════════
   WOOCOMMERCE
   Hub: /woocommerce/. Five services, and every one of them carries a
   boundary pointing at its WordPress sibling.

   ── The cannibalisation problem this file exists to solve ──────

   WooCommerce runs on WordPress, so /woocommerce/{service}/ and
   /wordpress/{service}/ are five pairs of pages about one stack.
   Left to drift they would be the worst duplicate-intent problem on
   the site, and the weaker of each pair would simply disappear.

   The line is drawn once and held on all ten pages:

     WooCommerce pages are about **the store**: catalogue, variations,
     cart and checkout, orders, payments, tax and the commerce plugin
     layer. The reader sells things.

     WordPress pages are about **the site**: content model, editorial
     workflow, templates, hosting and the non-commerce stack. The
     reader publishes things.

   Where a subject genuinely belongs to both, it is written once on
   the side that owns it and linked from the other. Server tuning is
   WordPress. Cart fragments and checkout are WooCommerce. Neither
   page repeats the other's argument.

   No percentage appears anywhere in this file. The hub says why in
   its own outcomesNote: none of the six builds on the work record is
   a WooCommerce build. The WooCommerce experience is real and sits in
   the service record, and attaching a Magento performance figure to a
   WooCommerce page would be exactly the invention CONTENT-PRINCIPLES
   §1 forbids.
   ═══════════════════════════════════════════════════════════════ */

export const WOOCOMMERCE_SERVICES: readonly PlatformService[] = [
  /* ── 01 Consulting ──────────────────────────────────────────── */
  {
    platform: 'woocommerce',
    slug: 'consulting',
    label: 'WooCommerce consulting',
    eyebrow: 'Yuvraj Raulji | WooCommerce consulting',
    h1: ['Is WooCommerce still', 'the right host for this store?'],
    lede:
      'WooCommerce is commerce inside a content system, which is an advantage while the business sells through explanation and search, and a liability once it grows into catalogue and workflow complexity the plugin layer was never designed to carry. Knowing which side of that line you are on is worth more than any individual fix.',
    cta: 'Discuss a WooCommerce decision',
    title: 'WooCommerce Consulting Services | Yuvraj Raulji',
    description:
      'Independent WooCommerce consulting: platform fit, plugin stack review, catalogue and checkout architecture, and an honest read on when to leave Woo.',

    primaryKeyword: 'woocommerce consulting services',
    secondaryKeywords: [
      'woocommerce consultant',
      'woocommerce audit',
      'woocommerce plugin stack review',
      'when to leave woocommerce',
    ],
    searchIntent: 'Commercial. A store on WooCommerce deciding whether to invest in it or leave it.',
    audience: 'Owners and marketing leads of content-led stores where the site was built to publish and now has to sell.',
    purpose: 'Own the WooCommerce advisory query, and keep it separate from WordPress consulting.',
    entities: ['WooCommerce', 'WordPress', 'eCommerce Consultant', 'Yuvraj Raulji'],

    quickAnswer: {
      question: 'What does a WooCommerce consultant do?',
      answer:
        'WooCommerce consulting is independent advice on the commerce decisions a WooCommerce business faces: whether the plugin stack is carrying the store or slowly strangling it, how the product and variation model should be structured, whether checkout should be extended or replaced, and whether the business has outgrown commerce-inside-a-CMS altogether. Because WooCommerce is assembled from plugins rather than shipped as a platform, the most valuable output is usually a decision about what to remove.',
      bestFor: [
        'A plugin stack nobody has reviewed in years',
        'Growth that has started to strain the commerce layer',
        'Weighing WooCommerce against Shopify or Magento',
        'An inherited store with no documentation',
      ],
    },

    boundary: {
      body:
        'This page is about the store: catalogue, checkout, orders and the commerce plugin layer. If the question is about the site around it, the content model, the editorial workflow or the hosting, that belongs to WordPress rather than to WooCommerce.',
      href: '/wordpress/consulting/',
      label: 'WordPress consulting, for the site rather than the store',
    },

    problems: [
      {
        symptom: 'The store is a stack of plugins nobody chose together',
        impact:
          'Each was added to solve one thing and none of them were evaluated as a system. Two do the same job, one is abandoned by its author, and the combination is what actually defines your store\'s behaviour.',
      },
      {
        symptom: 'Every plugin update is a small risk nobody can size',
        impact:
          'Updates get deferred, which raises the security exposure and makes the eventual update larger. The team ends up choosing between two bad options monthly.',
      },
      {
        symptom: 'The catalogue has outgrown the product model',
        impact:
          'Variable products with dozens of variations, attributes used as a workaround, and admin pages that time out. WooCommerce holds this for longer than people expect and not forever.',
      },
      {
        symptom: 'Nobody can say whether to stay or leave',
        impact:
          'The decision is made by whoever is most frustrated on the day. Both leaving too early and staying too long are expensive, and the difference between them is a genuine assessment rather than a mood.',
      },
    ],

    approach: [
      {
        num: '01',
        title: 'Understand what is being sold',
        body:
          'Catalogue shape, pricing rules, order volume, fulfilment and how much of the business comes through content and search. WooCommerce suits some commercial models far better than others, and this is what decides it.',
      },
      {
        num: '02',
        title: 'Read the plugin stack as a system',
        body:
          'What is installed, what is still maintained, what overlaps and what nothing uses. On WooCommerce the plugin list is the architecture, so reviewing it is not housekeeping.',
      },
      {
        num: '03',
        title: 'Test where the strain actually is',
        body:
          'Admin performance, checkout behaviour, order processing and catalogue queries under real data. Symptoms attributed to WooCommerce are frequently one plugin or one unindexed query.',
      },
      {
        num: '04',
        title: 'Answer the stay-or-leave question directly',
        body:
          'Including the answer that WooCommerce is fine and something smaller is wrong. Replatforming is the most expensive available response and it deserves evidence rather than exasperation.',
      },
      {
        num: '05',
        title: 'Sequence what is worth doing',
        body:
          'What to remove, what to fix, what to leave alone, in an order where each step makes the next cheaper. Removal usually leads.',
      },
    ],

    capabilities: [
      {
        group: 'The decision',
        items: ['Stay against replatform', 'WooCommerce against Shopify', 'WooCommerce against Magento', 'Custom build against plugin'],
      },
      {
        group: 'Stack review',
        items: ['Plugin audit', 'Abandoned plugin identification', 'Overlap and removal', 'Theme and commerce coupling'],
      },
      {
        group: 'Commerce model',
        items: ['Product and variation structure', 'Attribute and taxonomy design', 'Checkout and payment flow', 'Tax and shipping rules'],
      },
      {
        group: 'Planning',
        items: ['Phasing and sequencing', 'Risk shape', 'Second opinion on a proposal', 'Ownership model'],
      },
    ],

    outcomes: [
      {
        label: 'A plugin list somebody has actually decided on',
        body:
          'On WooCommerce the plugin stack is the architecture, and most stores have never had it reviewed as one. The removals alone usually change performance, security exposure and update risk together.',
      },
      {
        label: 'A stay-or-leave answer you can defend',
        body:
          'With the reasoning attached, so the decision survives the next frustrating week. That is the difference between a platform decision and a platform mood.',
      },
    ],
    outcomesNote:
      'No measured figure is quoted on this page, because none of the six builds on the work record is a WooCommerce build. The WooCommerce experience is real and sits in the service record: custom builds, bespoke themes, plugin development, and checkout and catalogue customisation. Borrowing a Magento number for it would be dishonest.',

    faqs: [
      {
        q: 'When should a business move off WooCommerce?',
        a: 'When the commerce logic has outgrown the plugin layer rather than when the site is slow. Complex B2B pricing, approval chains, multi-store operations or a catalogue where admin operations time out are real signals. Slowness on its own is usually hosting, a plugin, or an unindexed query, and none of those is a reason to replatform.',
      },
      {
        q: 'How many plugins is too many?',
        a: 'The count matters less than what they do and who maintains them. Forty well-chosen plugins can be healthier than twelve where two overlap and one has been abandoned for three years. The useful question is which ones you could remove today without anyone noticing.',
      },
      {
        q: 'Is WooCommerce suitable for a large catalogue?',
        a: 'It holds more than its reputation suggests, and the constraint usually appears in admin operations and in variation-heavy products before it appears on the storefront. Where the catalogue is large and the pricing simple it often works well; where both are complex it stops being the cheaper option.',
      },
      {
        q: 'Should we build a custom plugin or buy one?',
        a: 'Buy when your requirement matches what the plugin assumes. Build when the logic is specific to your business, because a bought plugin bent into an unusual shape becomes the thing that blocks every future update.',
      },
      {
        q: 'Can you review a WooCommerce proposal from an agency?',
        a: 'Yes. What is worth checking is whether it has an opinion about the existing plugin stack, whether it distinguishes a WooCommerce limit from a plugin limit, and whether anything is being rebuilt that could simply be removed.',
      },
    ],

    cases: [],
    posts: ['cro-double-conversion', 'shopify-plus-vs-magento2-2025'],

    related: [
      {
        href: '/woocommerce/',
        label: 'WooCommerce, and the point a store outgrows the plugin layer',
        note: 'The parent page: what Woo is good at, and where it stops.',
      },
      {
        href: '/wordpress/consulting/',
        label: 'WordPress consulting, for the site rather than the store',
        note: 'Content model, templates and the stack the store runs inside.',
      },
      {
        href: '/expertise/ecommerce-consulting/',
        label: 'eCommerce consulting, when the platform is still an open question',
        note: 'Platform-neutral advice, before the shortlist narrows.',
      },
      {
        href: '/shopify/',
        label: 'Shopify, the usual destination when Woo stops fitting',
        note: 'Hosted checkout and operational simplicity, at the cost of flexibility.',
      },
      {
        href: '/magento/',
        label: 'Magento, when the complexity is pricing and approvals',
        note: 'The other direction, for catalogue and workflow depth.',
      },
      {
        href: '/woocommerce/optimization/',
        label: 'WooCommerce performance work, if the symptom is speed',
        note: 'Usually cheaper than the replatform it gets mistaken for.',
      },
    ],
    finalHeadline: ['Stay on WooCommerce,', 'or leave it?'],
  },

  /* ── 02 Migration ───────────────────────────────────────────── */
  {
    platform: 'woocommerce',
    slug: 'migration',
    label: 'WooCommerce migration',
    eyebrow: 'Yuvraj Raulji | WooCommerce migration',
    h1: ['Move the store', 'without losing the content.'],
    lede:
      'A WooCommerce migration is unusual because the store is a guest in a content system. Move it badly and you take the products and abandon the thing that was actually ranking, which on a content-led store is most of the business. Whichever direction you are going, the editorial archive is the asset to protect.',
    cta: 'Discuss a WooCommerce migration',
    title: 'WooCommerce Migration Services | Yuvraj Raulji',
    description:
      'Migrating to or from WooCommerce: product and order transfer, URL and redirect strategy, preserving the content archive, and a cutover that keeps trading.',

    primaryKeyword: 'woocommerce migration services',
    secondaryKeywords: [
      'migrate to woocommerce',
      'woocommerce to shopify migration',
      'woocommerce data migration',
      'woocommerce replatforming',
    ],
    searchIntent: 'Commercial. A business moving a store onto or off WooCommerce.',
    audience: 'Owners of content-led stores where the blog archive is as valuable as the catalogue.',
    purpose: 'Own the WooCommerce replatforming query, in both directions, with content preservation as the argument.',
    entities: ['WooCommerce', 'WordPress', 'Shopify', 'Magento', 'Technical SEO'],

    quickAnswer: {
      question: 'What is involved in a WooCommerce migration?',
      answer:
        'A WooCommerce migration moves a store onto WooCommerce from another platform, or off it onto Shopify or Magento. Products, variations, customers and orders transfer through well-trodden routes. What decides the outcome is the content: WooCommerce stores usually sit on years of editorial that carries a large share of the organic traffic, and a migration scoped as a store move quietly abandons it. The other half is the plugin layer, because logic living in plugins has to be rebuilt, replaced or dropped, and deciding which is the actual work.',
      bestFor: [
        'A content-led store outgrowing the plugin layer',
        'Moving onto WooCommerce to unify site and store',
        'Leaving a store whose plugin stack is unmaintainable',
        'Consolidating a separate blog and storefront',
      ],
    },

    boundary: {
      body:
        'This page covers moving the store. Moving the site itself, hosts, domains, or a WordPress install with no commerce on it, is a different job with different risks.',
      href: '/wordpress/migration/',
      label: 'WordPress migration, for the site, host or domain',
    },

    problems: [
      {
        symptom: 'The content archive is treated as out of scope',
        impact:
          'Years of posts that carry the organic traffic are left behind or moved without their URLs. On a content-led store this is usually the largest asset in the business and the one nobody put in the migration plan.',
      },
      {
        symptom: 'Plugin logic has nowhere to go',
        impact:
          'Pricing rules, shipping logic and checkout behaviour live in plugins, and the destination platform expresses them differently or not at all. Rebuilding all of it on day one is how the budget doubles.',
      },
      {
        symptom: 'Variations do not survive the model change',
        impact:
          'A variable product with many attributes maps badly onto a platform with tighter option limits. Discovered during import rather than before it, the result is a catalogue nobody can merchandise.',
      },
      {
        symptom: 'Orders and customers are moved on faith',
        impact:
          'Row counts match and values do not. Support finds out first, usually on a refund, and the reconciliation costs more than the checking would have.',
      },
    ],

    approach: [
      {
        num: '01',
        title: 'Inventory the whole site, not just the store',
        body:
          'Products and orders, but also every post, page, taxonomy and media item with traffic or links. On a WooCommerce site the content and the store are one system and only one of them tends to make it into the plan.',
      },
      {
        num: '02',
        title: 'Decide what the plugins become',
        body:
          'For each piece of plugin logic: rebuild, replace with a platform capability, or drop. Written down before the move, this is the decision that keeps the scope honest.',
      },
      {
        num: '03',
        title: 'Remodel the catalogue for the destination',
        body:
          'Products, variations and attributes mapped into the target model, not copied. Where the destination is more constrained, the constraints get resolved before import rather than during it.',
      },
      {
        num: '04',
        title: 'Preserve URLs across both halves',
        body:
          'A redirect map covering the content archive and the catalogue, built from real traffic and link data. On these sites the blog usually holds more inbound links than the product pages do.',
      },
      {
        num: '05',
        title: 'Rehearse, reconcile, cut over',
        body:
          'A full rehearsal on real data, order and customer values reconciled rather than counted, and a rollback written before the window.',
      },
    ],

    capabilities: [
      {
        group: 'Directions',
        items: ['Onto WooCommerce', 'WooCommerce to Shopify', 'WooCommerce to Magento', 'Merging a separate blog and store'],
      },
      {
        group: 'Data',
        items: ['Products and variations', 'Customers and orders', 'Coupons and tax rules', 'Media library'],
      },
      {
        group: 'Content',
        items: ['Post and page archive', 'Taxonomy mapping', 'Internal link preservation', 'Author and date integrity'],
      },
      {
        group: 'Search preservation',
        items: ['Redirect map from search data', 'Canonical strategy', 'Sitemap handling', 'Post-launch monitoring'],
      },
    ],

    outcomes: [
      {
        label: 'The content survives the store move',
        body:
          'On a content-led store the editorial archive usually carries more organic traffic than the catalogue does. Treating it as in scope from the start is the single decision that most changes what a migration does to the business.',
      },
      {
        label: 'A smaller plugin surface on the other side',
        body:
          'A migration is the cheapest moment to decide that some logic does not come. Carried across wholesale, the stack that made the old store unmaintainable is simply reassembled on the new one.',
      },
    ],
    outcomesNote:
      'No traffic figure is published here. None of the six builds on the work record is a WooCommerce build, and the migrations behind this experience belong to the businesses that ran them.',

    faqs: [
      {
        q: 'Will we lose our blog traffic if we move the store?',
        a: 'Only if the migration is scoped as a store move. On content-led WooCommerce sites the editorial archive typically carries a large share of the organic traffic and most of the inbound links, so it belongs in the inventory and the redirect map from the first day rather than being handled afterwards.',
      },
      {
        q: 'Can we keep WordPress and move only the store?',
        a: 'Yes, and it is a common and sensible arrangement: WordPress continues to serve content while commerce moves to a hosted platform, joined by a headless storefront or by subdomain. It keeps the editorial asset intact and removes the plugin-layer commerce burden.',
      },
      {
        q: 'How do WooCommerce variable products migrate?',
        a: 'Variations map cleanly where the destination model is at least as expressive and awkwardly where it is not, which is the usual direction of travel. The mapping decision belongs before the import, because a catalogue that technically imported but cannot be merchandised is the expensive failure here.',
      },
      {
        q: 'What happens to our custom plugin logic?',
        a: 'Each piece gets a decision: rebuild it, replace it with a platform capability, or drop it. Most stores find a meaningful share of it is no longer used, and a migration is the cheapest moment there will ever be to find that out.',
      },
      {
        q: 'Is it safe to migrate a store that is trading?',
        a: 'Yes, with a rehearsal on real data and a cutover window rather than a live edit. What makes it safe is that the cutover repeats something that has already worked, rather than being the first attempt.',
      },
    ],

    cases: [],
    posts: ['shopify-plus-vs-magento2-2025', 'magento2-seo-technical-audit'],

    related: [
      {
        href: '/woocommerce/',
        label: 'WooCommerce, and the point a store outgrows the plugin layer',
        note: 'The parent page, and the case for moving at all.',
      },
      {
        href: '/wordpress/migration/',
        label: 'WordPress migration, for the site, host or domain',
        note: 'The other half of the same stack, moved separately.',
      },
      {
        href: '/woocommerce/consulting/',
        label: 'Deciding whether to leave WooCommerce in the first place',
        note: 'Replatforming deserves evidence rather than exasperation.',
      },
      {
        href: '/shopify/migration/',
        label: 'Shopify migration, the commonest destination',
        note: 'Where the variant model becomes the constraint.',
      },
      {
        href: '/magento/migration/',
        label: 'Magento migration, when the complexity is real',
        note: 'For pricing, approvals and multi-store, rather than simplicity.',
      },
      {
        href: '/insights/magento2-seo-technical-audit/',
        label: 'The technical SEO audit framework, applied to a replatform',
        note: 'Redirects and canonicals, across content and catalogue alike.',
      },
    ],
    finalHeadline: ['Which half of the site', 'is actually moving?'],
  },

  /* ── 03 Optimization ────────────────────────────────────────── */
  {
    platform: 'woocommerce',
    slug: 'optimization',
    label: 'WooCommerce optimisation',
    eyebrow: 'Yuvraj Raulji | WooCommerce optimisation',
    h1: ['WooCommerce is slow', 'where it cannot cache.'],
    lede:
      'Page caching makes a WordPress site fast and stops at the cart. Everything WooCommerce adds, cart fragments, session handling, dynamic pricing, the admin order screen, runs outside the cache by design, which is why a store can score well on its homepage and crawl on the pages that take money.',
    cta: 'Discuss WooCommerce performance',
    title: 'WooCommerce Performance Optimization | Yuvraj Raulji',
    description:
      'WooCommerce speed work: cart fragments, the uncached commerce paths, database and query tuning, plugin weight, checkout experience and Core Web Vitals.',

    primaryKeyword: 'woocommerce performance optimization',
    secondaryKeywords: [
      'woocommerce speed optimization',
      'woocommerce slow checkout',
      'woocommerce cart fragments',
      'woocommerce core web vitals',
    ],
    searchIntent: 'Commercial. A WooCommerce store losing conversion or rankings to speed.',
    audience: 'Store owners and marketing leads watching mobile conversion fall on the pages that matter.',
    purpose: 'Own WooCommerce speed as a commerce problem, leaving generic site speed to WordPress.',
    entities: ['WooCommerce', 'WordPress', 'Core Web Vitals', 'CRO'],

    quickAnswer: {
      question: 'Why is WooCommerce slow, and what fixes it?',
      answer:
        'WooCommerce is usually slow in the places page caching cannot reach. Cart, checkout, account and any page with dynamic pricing are excluded from full-page cache by design, so they fall back to PHP and the database on every request. The usual fixes are removing or limiting cart fragments, adding object caching so repeated queries are not recomputed, indexing the postmeta queries a large catalogue generates, and cutting the plugin weight that runs on every page. The storefront pages benefit from ordinary WordPress caching; the commerce pages need this work specifically.',
      bestFor: [
        'A fast homepage and a slow cart',
        'Checkout timing out under campaign traffic',
        'Admin order screens that hang on a large store',
        'Core Web Vitals failing on product templates',
      ],
    },

    boundary: {
      body:
        'This page is about the commerce paths: cart, checkout, account, product and the queries behind them. General site speed, page caching, hosting, templates and assets across a whole WordPress install, belongs to the site rather than the store.',
      href: '/wordpress/optimization/',
      label: 'WordPress speed optimisation, for the site as a whole',
    },

    problems: [
      {
        symptom: 'The homepage is fast and the cart is not',
        impact:
          'Page caching covers everything except the pages that take money. The reported site speed looks healthy while the commercial pages are the slowest on the site.',
      },
      {
        symptom: 'Cart fragments run on every page',
        impact:
          'An uncached request fires on pages with no cart interaction at all, adding latency site wide to keep a counter accurate. It is one of the most common and most fixable WooCommerce performance costs.',
      },
      {
        symptom: 'The admin becomes unusable as the store grows',
        impact:
          'Order screens and product lists time out, so operations moves to exports and spreadsheets. The storefront looks fine and the business is being run around the platform.',
      },
      {
        symptom: 'Plugins run everywhere, including where they do nothing',
        impact:
          'Each loads assets and queries on every request regardless of relevance. The cumulative cost lands hardest on mobile, which is where the conversion is lost.',
      },
    ],

    approach: [
      {
        num: '01',
        title: 'Measure the commerce paths separately',
        body:
          'Field data for cart, checkout and product templates on their own rather than a site average. A blended score hides the exact pages the money moves through.',
      },
      {
        num: '02',
        title: 'Deal with the uncached paths first',
        body:
          'Cart fragments limited or removed, object caching in place so uncached pages are not recomputing the same queries, and session handling checked. This is where WooCommerce specifically differs from WordPress.',
      },
      {
        num: '03',
        title: 'Fix the database work',
        body:
          'Postmeta queries, missing indexes, autoloaded options and transients accumulating in the options table. On a store of any age this is usually a larger cost than the front end.',
      },
      {
        num: '04',
        title: 'Cut plugin weight per page',
        body:
          'Stop plugins loading assets and running queries where they do nothing. Removal beats deferral, and on WooCommerce there is normally something to remove.',
      },
      {
        num: '05',
        title: 'Then the experience and the funnel',
        body:
          'Images, layout stability and the checkout form itself. Speed raises the ceiling on the commerce pages; the form design is what collects it.',
      },
    ],

    capabilities: [
      {
        group: 'Uncached paths',
        items: ['Cart fragment control', 'Object caching', 'Session handling', 'Dynamic pricing cost'],
      },
      {
        group: 'Data layer',
        items: ['Postmeta query tuning', 'Index review', 'Autoloaded options', 'Transient hygiene'],
      },
      {
        group: 'Front end',
        items: ['Plugin asset control', 'Image pipeline', 'Layout stability', 'Core Web Vitals by template'],
      },
      {
        group: 'Conversion',
        items: ['Checkout form design', 'Guest checkout path', 'Payment UX', 'Funnel instrumentation'],
      },
    ],

    outcomes: [
      {
        label: 'The pages that take money get measured',
        body:
          'Most WooCommerce stores have never seen cart and checkout performance separated from the site average. Simply measuring them properly usually changes what the team works on next.',
      },
      {
        label: 'Less work per request, permanently',
        body:
          'Removing cart fragments, unused plugin assets and recomputed queries reduces the work every request does. That is a durable change rather than a tuning setting somebody can undo.',
      },
    ],
    outcomesNote:
      'The 60% site speed improvement published on this site came from caching, CDN and database work on a Magento platform and belongs to that page. No WooCommerce build appears on the work record with a published measurement, so no percentage is claimed here.',

    faqs: [
      {
        q: 'Why is my WooCommerce checkout slow when the rest of the site is fast?',
        a: 'Because cart, checkout and account are excluded from full-page caching by design, since their content is specific to each visitor. Those pages fall back to PHP and the database on every request, so they need object caching, query work and a lighter plugin load rather than the page caching that made the rest of the site quick.',
      },
      {
        q: 'Should I disable WooCommerce cart fragments?',
        a: 'Usually limit rather than disable outright. Fragments keep the cart counter live and fire an uncached request to do it, including on pages with no cart interaction. Restricting them to the pages that genuinely need a live count keeps the behaviour and removes most of the cost.',
      },
      {
        q: 'Does hosting fix WooCommerce performance?',
        a: 'Good hosting removes a floor and does not remove the causes. If the store is slow because of cart fragments, unindexed postmeta queries or plugins loading everywhere, faster hardware makes the same work happen more quickly and the cost recurs every month.',
      },
      {
        q: 'How many plugins can a WooCommerce store carry?',
        a: 'It depends far more on what they do per request than on the count. A plugin that loads assets and runs queries on every page costs more than five that only act on their own templates. The audit worth running is per-page cost, not a total.',
      },
      {
        q: 'Is a slow WooCommerce admin a sign we should replatform?',
        a: 'Not on its own. Admin slowness is usually postmeta queries, missing indexes and an options table nobody has cleaned, all of which are fixable in place. It becomes a platform signal when the commerce logic itself has outgrown what plugins can express.',
      },
    ],

    cases: [],
    posts: ['cro-double-conversion', 'aws-magento2-server-setup'],

    related: [
      {
        href: '/woocommerce/',
        label: 'WooCommerce, and the point a store outgrows the plugin layer',
        note: 'The parent page, including the hardening these stacks arrive without.',
      },
      {
        href: '/wordpress/optimization/',
        label: 'WordPress speed optimisation, for the site as a whole',
        note: 'Page caching, hosting and templates, which this page deliberately leaves alone.',
      },
      {
        href: '/woocommerce/maintenance/',
        label: 'WooCommerce maintenance, which is what holds a speed gain',
        note: 'Plugin updates give performance back if nothing is watching.',
      },
      {
        href: '/magento/performance/',
        label: 'Magento performance, where the same argument scales further',
        note: 'Varnish, Redis and query tuning on a platform built for it.',
      },
      {
        href: '/insights/cro-double-conversion/',
        label: 'The CRO frameworks behind a better converting checkout',
        note: 'The commercial half of a performance engagement.',
      },
      {
        href: '/woocommerce/consulting/',
        label: 'WooCommerce consulting, if speed is a symptom of something bigger',
        note: 'Sometimes the store has genuinely outgrown the plugin layer.',
      },
    ],
    finalHeadline: ['How slow are the pages', 'that take money?'],
  },

  /* ── 04 Integrations ────────────────────────────────────────── */
  {
    platform: 'woocommerce',
    slug: 'integrations',
    label: 'WooCommerce integrations',
    eyebrow: 'Yuvraj Raulji | WooCommerce integrations',
    h1: ['One integration you own,', 'not four plugins you rent.'],
    lede:
      'The default WooCommerce answer to any integration is a plugin, and the default result is several of them syncing overlapping data on different schedules with no agreement about which side is right. The alternative is one boundary with a contract behind it, which is less exciting and much cheaper to live with.',
    cta: 'Discuss a WooCommerce integration',
    title: 'WooCommerce Integration Services | Yuvraj Raulji',
    description:
      'WooCommerce integration with ERP, accounting, CRM and fulfilment: source of truth per field, the REST API and webhooks, reconciliation and failure handling.',

    primaryKeyword: 'woocommerce integration services',
    secondaryKeywords: [
      'woocommerce erp integration',
      'woocommerce api integration',
      'woocommerce accounting integration',
      'woocommerce fulfilment integration',
    ],
    searchIntent: 'Commercial. A WooCommerce store whose data has to agree with the systems behind it.',
    audience: 'Operators whose orders, stock or invoices cross into accounting, fulfilment or an ERP.',
    purpose: 'Own the WooCommerce integration query, distinct from WordPress API work.',
    entities: ['WooCommerce', 'WordPress', 'AI Automation', 'Digital Transformation'],

    quickAnswer: {
      question: 'How do you integrate WooCommerce with an ERP or accounting system?',
      answer:
        'WooCommerce integrates through its REST API and webhooks, usually with a queue or middleware between it and the other system so neither depends on the other being available. Because WooCommerce is plugin-first, most stores arrive with several sync plugins that overlap and disagree, so the work is often consolidation rather than connection. What makes an integration reliable is naming the source of truth for every field, defining what happens when a message fails, and reconciling both sides on a schedule instead of trusting that they agree.',
      bestFor: [
        'Accounting or ERP holding stock, price or invoices',
        'Fulfilment and 3PL order flow',
        'Several overlapping sync plugins already installed',
        'Orders being re-keyed by hand into another system',
      ],
    },

    boundary: {
      body:
        'This page covers commerce data: products, stock, prices, orders, customers and invoices. Connecting WordPress itself to other systems, forms, CRM for enquiries, content APIs or membership data, is site work rather than store work.',
      href: '/wordpress/integrations/',
      label: 'WordPress API integration, for the site rather than the store',
    },

    problems: [
      {
        symptom: 'Orders are re-keyed into the accounting system by hand',
        impact:
          'It works until volume rises, then it becomes a full-time task and a source of errors nobody can trace. The cost is invisible because it is somebody\'s job rather than a line item.',
      },
      {
        symptom: 'Several sync plugins disagree with each other',
        impact:
          'Each was bought for one system and none owns the whole picture. Staff learn which plugin to trust for which field, and that knowledge never gets written down.',
      },
      {
        symptom: 'A failed sync is silent',
        impact:
          'WooCommerce webhooks fail quietly, so a stalled integration looks like a quiet afternoon. The discovery is a reconciliation, usually with a customer waiting.',
      },
      {
        symptom: 'The integration falls over during a sale',
        impact:
          'Designed for average volume, it backs up exactly when the store is busiest. The failure lands on the day the business spent money to create.',
      },
    ],

    approach: [
      {
        num: '01',
        title: 'Name the source of truth per field',
        body:
          'Not per system. Stock may belong to the warehouse, price to the ERP, customer records to the CRM. Writing it down settles most of the disputes the integration would otherwise create.',
      },
      {
        num: '02',
        title: 'Audit the plugins already syncing',
        body:
          'What each one moves, in which direction, and whether anything still depends on it. On WooCommerce the consolidation frequently pays for the work in subscriptions alone.',
      },
      {
        num: '03',
        title: 'Build one boundary you control',
        body:
          'The REST API and webhooks behind a single integration layer with retries and a dead letter path, rather than a plugin per system each with its own idea of failure.',
      },
      {
        num: '04',
        title: 'Design for the peak',
        body:
          'Queued writes, batching and backoff, because a WooCommerce store on shared or modest hosting will feel a sync spike immediately and will feel it during the campaign.',
      },
      {
        num: '05',
        title: 'Reconcile, and alert on drift',
        body:
          'Scheduled comparison with differences classified rather than dumped into a report. It reports; it does not auto-correct, because silent correction across a boundary turns a small discrepancy into a large one.',
      },
    ],

    capabilities: [
      {
        group: 'Systems',
        items: ['ERP', 'Accounting', 'CRM', '3PL and fulfilment', 'Payment and tax services'],
      },
      {
        group: 'Interfaces',
        items: ['WooCommerce REST API', 'Webhooks', 'Action Scheduler', 'Custom endpoints'],
      },
      {
        group: 'Reliability',
        items: ['Per-field contract', 'Retry and dead letter', 'Queued and batched writes', 'Idempotency'],
      },
      {
        group: 'Assurance',
        items: ['Reconciliation jobs', 'Drift alerting', 'Failure visibility', 'Sync plugin consolidation'],
      },
    ],

    outcomes: [
      {
        label: 'Fewer moving parts than you started with',
        body:
          'Replacing several overlapping sync plugins with one boundary removes subscriptions, conflicting behaviour and a maintenance dependency in the same decision. On a plugin-first platform that is usually the clearest available return.',
      },
      {
        label: 'Failures that announce themselves',
        body:
          'Syncs will fail. The change worth buying is that a failure is visible in minutes rather than found during a reconciliation, which is the difference between a task and an incident.',
      },
    ],
    outcomesNote:
      'The automation figures on this site, 90% of B2B order and quote processing and 40% off approval cycle time, came from a Magento B2B platform. No WooCommerce integration on the record has a published measurement, so none is claimed here.',

    faqs: [
      {
        q: 'Should we use a WooCommerce sync plugin or build an integration?',
        a: 'A plugin is right when your process matches what it assumes and one plugin covers the whole flow. Build when the source-of-truth rules are specific to your business, when several plugins already overlap, or when a failure needs to be visible and recoverable on your terms rather than the vendor\'s.',
      },
      {
        q: 'Are WooCommerce webhooks reliable?',
        a: 'They are reliable enough to build on and they fail quietly, which is the actual problem. Delivery needs monitoring, failures need a retry path, and the whole thing needs periodic reconciliation, because a webhook that stopped firing looks exactly like a period with no orders.',
      },
      {
        q: 'How do we stop stock being wrong?',
        a: 'Decide which system owns it, sync in one direction from that system, and reconcile on a schedule so drift is found by a job rather than by a customer. Two systems both writing stock is the usual cause, and no amount of sync frequency fixes it.',
      },
      {
        q: 'Will an integration slow the store down?',
        a: 'It can if writes happen inline during a request. Queued and batched processing keeps the sync off the customer\'s path, which matters more on WooCommerce than on hosted platforms because the same server is serving the storefront.',
      },
      {
        q: 'Can AI help here?',
        a: 'Mostly with reconciliation and data quality: finding where two systems disagree and drafting product data that arrives incomplete. It should not be making the correction, because a system that silently rewrites values across a boundary turns a small discrepancy into a large one.',
      },
    ],

    cases: [],
    posts: ['ai-ecommerce-revenue-2025', 'aws-magento2-server-setup'],

    related: [
      {
        href: '/woocommerce/',
        label: 'WooCommerce, and the point a store outgrows the plugin layer',
        note: 'The parent page, and why the plugin stack is the architecture.',
      },
      {
        href: '/wordpress/integrations/',
        label: 'WordPress API integration, for the site rather than the store',
        note: 'Forms, content APIs and enquiry data, which are not commerce.',
      },
      {
        href: '/magento/integrations/',
        label: 'The same contract-first argument on Magento',
        note: 'Where the workflow layer is richer and the boundary is bigger.',
      },
      {
        href: '/shopify/integrations/',
        label: 'Shopify integrations, where the platform absorbs more of it',
        note: 'The hosted version of the same problem.',
      },
      {
        href: '/ai-automation/',
        label: 'AI automation for reconciliation and operations',
        note: 'Where drift detection stops being a report and starts being a process.',
      },
      {
        href: '/digital-transformation/',
        label: 'Modernising legacy stacks into API-first systems',
        note: 'The same boundary argument across the business rather than one store.',
      },
    ],
    finalHeadline: ['How many plugins', 'are syncing your data?'],
  },

  /* ── 05 Maintenance ─────────────────────────────────────────── */
  {
    platform: 'woocommerce',
    slug: 'maintenance',
    label: 'WooCommerce maintenance',
    eyebrow: 'Yuvraj Raulji | WooCommerce maintenance',
    h1: ['Updates are the risk,', 'and skipping them is worse.'],
    lede:
      'On WooCommerce every update is a small unmanaged risk, so teams defer them, and deferral turns a routine into an event. The way out is not braver updates. It is a staging copy, a checkout test that runs every time, and someone who owns the plugin list rather than inheriting it.',
    cta: 'Discuss ongoing WooCommerce support',
    title: 'WooCommerce Maintenance and Support | Yuvraj Raulji',
    description:
      'Ongoing WooCommerce support: safe update routine, staging and checkout testing, plugin ownership, order and stock monitoring, backups that are restored.',

    primaryKeyword: 'woocommerce maintenance and support',
    secondaryKeywords: [
      'woocommerce support services',
      'woocommerce store maintenance',
      'woocommerce update management',
      'woocommerce care plan',
    ],
    searchIntent: 'Commercial. A trading WooCommerce store with no reliable ownership of updates or plugins.',
    audience: 'Owners of stores where an update breaking checkout would go unnoticed until a customer reported it.',
    purpose: 'Own the WooCommerce ongoing-support query, distinct from WordPress site maintenance.',
    entities: ['WooCommerce', 'WordPress', 'Technology Consultant'],

    quickAnswer: {
      question: 'What does WooCommerce maintenance involve?',
      answer:
        'WooCommerce maintenance is the routine that keeps a store updatable: applying WooCommerce, plugin and WordPress updates on a staging copy first, testing the checkout and order flow every time rather than only when something looks risky, owning the plugin list so it does not grow by accretion, monitoring that orders and stock are still moving, and holding backups that have actually been restored. The commerce paths are what separates it from site maintenance, because a broken checkout is silent revenue loss rather than a visible outage.',
      bestFor: [
        'Stores where updates are deferred out of fear',
        'A plugin list nobody has owned in a year',
        'Checkout failures found by customers first',
        'Backups nobody has ever tested',
      ],
    },

    boundary: {
      body:
        'This is maintenance of the store: updates tested against checkout, the commerce plugin layer, and order and stock monitoring. General site upkeep, hosting, security hardening, WordPress core and content workflow, is the site rather than the store.',
      href: '/wordpress/maintenance/',
      label: 'WordPress maintenance, for the site around the store',
    },

    problems: [
      {
        symptom: 'Updates are deferred because the last one broke something',
        impact:
          'The gap grows, each update gets larger, and the security exposure compounds. Eventually the update is a project, which is precisely what deferring was supposed to avoid.',
      },
      {
        symptom: 'Nothing tests the checkout after a change',
        impact:
          'Checkout can break silently while the storefront looks perfect, so the first signal is a customer or a quiet sales day. It is the highest-cost failure on the store and the least likely to be noticed.',
      },
      {
        symptom: 'The plugin list grows and never shrinks',
        impact:
          'Plugins are added under time pressure and removed under none. The store carries the cost of every experiment anyone has run, in performance, update risk and security surface.',
      },
      {
        symptom: 'Backups exist and have never been restored',
        impact:
          'An untested backup is a belief rather than a control. The test happens during the incident, which is the worst possible time to find out the database dump was incomplete.',
      },
    ],

    approach: [
      {
        num: '01',
        title: 'Establish the current position',
        body:
          'Versions, plugin inventory with what each still does, hosting arrangement, backup state and who currently holds the knowledge. On most inherited stores this is the first accurate picture anyone has had.',
      },
      {
        num: '02',
        title: 'Build a staging copy that matches production',
        body:
          'Real data, real plugin set, real payment gateway in test mode. An update tested on a staging site that differs from production has not been tested.',
      },
      {
        num: '03',
        title: 'Make checkout testing routine',
        body:
          'A test order through the real flow after every update, every time, including the boring ones. The whole point is that it catches the update nobody thought was risky.',
      },
      {
        num: '04',
        title: 'Own the plugin list',
        body:
          'Reviewed on a schedule, with removal as the default for anything nothing uses. On WooCommerce the plugin list is the architecture, so this is design work rather than housekeeping.',
      },
      {
        num: '05',
        title: 'Monitor the commerce signals',
        body:
          'Orders still arriving, stock still syncing, payment gateway still responding, and backups restored on a schedule rather than assumed. Uptime monitoring reports the homepage answered, which was never the risk.',
      },
    ],

    capabilities: [
      {
        group: 'Updates',
        items: ['WooCommerce and plugin updates', 'WordPress core', 'Staging-first routine', 'Rollback path'],
      },
      {
        group: 'Testing',
        items: ['Checkout and order flow', 'Payment gateway verification', 'Tax and shipping rules', 'Regression checklist'],
      },
      {
        group: 'Plugins',
        items: ['Scheduled review', 'Removal and consolidation', 'Abandoned plugin replacement', 'Custom code upkeep'],
      },
      {
        group: 'Monitoring',
        items: ['Order flow alerting', 'Stock sync health', 'Error and log review', 'Tested backups'],
      },
    ],

    outcomes: [
      {
        label: 'Updates stop being events',
        body:
          'A staging copy and a checkout test turn the monthly decision from a risk assessment into a routine. That is the change that stops the version gap growing, and the version gap is what makes everything else worse.',
      },
      {
        label: 'A store that stops accumulating',
        body:
          'Plugins, tables, options and scheduled tasks all grow by default. A scheduled review is the only mechanism that reliably takes anything out.',
      },
    ],
    outcomesNote:
      'No uptime figure or response-time commitment is published here. Those are contractual terms that depend on hosting and the cover agreed, and the 30% development cycle time figure on this site came from Magento delivery and belongs to that page.',

    faqs: [
      {
        q: 'How often should WooCommerce and its plugins be updated?',
        a: 'On a regular cadence rather than when something forces it, with security releases treated as urgent. The gap is what makes updates dangerous: a store two versions behind updates easily, and a store two years behind is a project. Cadence matters more than frequency.',
      },
      {
        q: 'Do we really need a staging site?',
        a: 'For a store taking money, yes. Checkout can break in ways the storefront does not show, so the alternative is testing in production and finding out from a customer. Staging only helps if it matches production, including the plugin set and a gateway in test mode.',
      },
      {
        q: 'What should be tested after an update?',
        a: 'A real order end to end: add to cart, checkout, payment in test mode, order confirmation, and whatever the order triggers downstream. Storefront checks tell you the theme survived, which is not the expensive question.',
      },
      {
        q: 'Is managed WordPress hosting enough?',
        a: 'It covers the server, and often core updates and backups. It does not own your plugin list, test your checkout, or notice that a sync stopped, and those are the WooCommerce-specific failures. Good hosting is a foundation rather than a maintenance plan.',
      },
      {
        q: 'What if a plugin we depend on is abandoned?',
        a: 'It becomes a planned replacement rather than an emergency, which is the entire argument for reviewing the list on a schedule. Found during a review it is a project with a date; found during a security advisory it is an incident.',
      },
    ],

    cases: [],
    posts: ['aws-magento2-server-setup', 'cro-double-conversion'],

    related: [
      {
        href: '/woocommerce/',
        label: 'WooCommerce, and the hardening these stacks arrive without',
        note: 'The parent page, and why the plugin layer needs an owner.',
      },
      {
        href: '/wordpress/maintenance/',
        label: 'WordPress maintenance, for the site around the store',
        note: 'Core, hosting and security, which this page leaves alone.',
      },
      {
        href: '/woocommerce/optimization/',
        label: 'WooCommerce performance, and the gain updates give back',
        note: 'Optimisation without a review erodes with the plugin list.',
      },
      {
        href: '/woocommerce/integrations/',
        label: 'WooCommerce integrations, and the boundary that fails quietly',
        note: 'The part of the stack most worth monitoring.',
      },
      {
        href: '/magento/maintenance/',
        label: 'The same discipline on a platform with a patch cadence',
        note: 'Where the stakes and the tooling both rise.',
      },
      {
        href: '/shopify/maintenance/',
        label: 'Shopify maintenance, where the platform carries more of it',
        note: 'The hosted comparison, and what it removes from the list.',
      },
    ],
    finalHeadline: ['When did you last', 'test a checkout?'],
  },
];
