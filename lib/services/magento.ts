import type { PlatformService } from '../platform-services';

/* ═══════════════════════════════════════════════════════════════
   MAGENTO
   Hub: /magento/, which owns the entity terms. These seven own the
   service terms, one each.
   ═══════════════════════════════════════════════════════════════ */

export const MAGENTO_SERVICES: readonly PlatformService[] = [
  /* ── 01 Consulting ──────────────────────────────────────────── */
  {
    platform: 'magento',
    slug: 'consulting',
    label: 'Magento consulting',
    eyebrow: 'Yuvraj Raulji | Magento consulting',
    h1: ['Magento advice before', 'the build starts.'],
    lede:
      'The expensive Magento decisions are made in the first fortnight, by whoever configured the first storefront, and they are close to irreversible once real data is in. Consulting is the work of making those decisions deliberately: attribute sets, store and website scope, price scope, where the system of record sits, and whether Magento is the right platform at all.',
    cta: 'Discuss a Magento decision',
    title: 'Magento Consulting Services | Yuvraj Raulji',
    description:
      'Independent Magento 2 and Adobe Commerce consulting: platform fit, data model and scope decisions, architecture review, phasing and technical due diligence.',

    primaryKeyword: 'magento consulting services',
    secondaryKeywords: [
      'magento 2 consulting',
      'adobe commerce consulting',
      'magento architecture review',
      'magento technical due diligence',
    ],
    searchIntent: 'Commercial. A buyer deciding whether to commit to Magento, or already on it and unsure the foundation is right.',
    audience: 'Founders, heads of eCommerce and technology leads at the point of a platform or architecture decision.',
    purpose: 'Own the advisory query, and keep it out of the delivery pages below it.',
    entities: ['Magento', 'Magento 2', 'Adobe Commerce', 'eCommerce Consultant', 'Yuvraj Raulji'],

    quickAnswer: {
      question: 'What is Magento consulting?',
      answer:
        'Magento consulting is independent advice on the Magento decisions that are hard to reverse: whether Magento is the right platform for the business at all, how the catalogue data model should be structured, which system is the source of truth for stock and price, how many storefronts the scope model actually needs, and what order the work should happen in. It is judgement about trade-offs rather than the delivery of a build, and on Magento specifically it matters more than on a hosted platform, because Magento hands you the data model and expects you to have an opinion about it.',
      bestFor: [
        'Choosing between Magento, Adobe Commerce and a hosted platform',
        'Inheriting a Magento build nobody can explain',
        'Planning a second, third or fourth storefront',
        'Technical due diligence before an acquisition or an investment',
      ],
    },

    boundary: {
      body:
        'This page is the thinking, not the delivery. If the decision is already made and the job is moving a live store onto Magento, that is a different piece of work with a different shape.',
      href: '/magento/migration/',
      label: 'Magento migration, for a store already committed to the move',
    },

    problems: [
      {
        symptom: 'Nobody can say whether Magento is the right platform',
        impact:
          'The debate runs on preference and on whichever agency spoke last. Magento is genuinely the wrong answer for most catalogues, and the cost of finding that out after the build is a second replatform inside three years.',
      },
      {
        symptom: 'The attribute set was designed in a hurry, two years ago',
        impact:
          'Every new product type needs a workaround, layered navigation returns filters nobody can use, and the fix gets more expensive with every SKU added. This is the single most common inherited Magento problem and it is a data model problem, not a theme problem.',
      },
      {
        symptom: 'Two systems both think they own the price',
        impact:
          'Magento and the ERP disagree, and which one is right depends on the day. Support absorbs it as a manual correction rota, and the correction rota is treated as normal until someone counts the hours.',
      },
      {
        symptom: 'The roadmap is a list of features with no order',
        impact:
          'Work gets sequenced by whoever asked most recently rather than by what unblocks the next thing. On Magento this shows up as a theme rebuild scheduled before the scope model is settled, which is the wrong way round and has to be paid for twice.',
      },
    ],

    approach: [
      {
        num: '01',
        title: 'Understand the business',
        body:
          'What the pricing rules genuinely are, who approves what, where the margin actually sits, and which parts of the current complexity are the business rather than an accident of the last system. This is the part that gets skipped, and it is the part the data model is built out of.',
      },
      {
        num: '02',
        title: 'Read the current state',
        body:
          'The attribute sets, the scope model, the extension list, the integration boundary and the deployment path. On an inherited build this usually takes a week and produces a document the team has never had, which on its own changes how the next decision gets made.',
      },
      {
        num: '03',
        title: 'Test the platform decision honestly',
        body:
          'Including the answer where Magento is the wrong choice. A catalogue that fits a hosted platform should be on one, and saying so is the point of hiring someone independent rather than an agency that only builds one thing.',
      },
      {
        num: '04',
        title: 'Design the data model',
        body:
          'Attribute sets, store and website scope, price scope and inventory sources, decided against the business model rather than copied from the last project. These are close to irreversible once real orders exist, which is why they come before anything visual.',
      },
      {
        num: '05',
        title: 'Sequence the work',
        body:
          'What has to happen first because everything else depends on it, what can wait, and what should not be built at all. The output is an order of work with the reasoning attached, not a feature list.',
      },
    ],

    capabilities: [
      {
        group: 'Platform decisions',
        items: ['Magento against hosted platforms', 'Magento 2 against Adobe Commerce', 'Build against buy', 'Headless against Luma'],
      },
      {
        group: 'Data model',
        items: ['Attribute set design', 'Store and website scope', 'Price and inventory scope', 'Category and taxonomy structure'],
      },
      {
        group: 'Review',
        items: ['Inherited build audit', 'Extension and customisation review', 'Integration boundary review', 'Technical due diligence'],
      },
      {
        group: 'Planning',
        items: ['Phasing and sequencing', 'Effort and risk shape', 'Team and ownership model', 'Second opinion on a proposal'],
      },
    ],

    outcomes: [
      {
        metric: '12+',
        label: 'Multi-store Magento 2 platforms delivered',
        body:
          'Across catalogues reaching 500K+ SKUs and 1M+ monthly users. The scope and attribute decisions on this page are the ones those platforms were built on, and the ones that were expensive to get wrong.',
        context:
          'From the employment record: multi-store Magento 2 delivery across B2B, B2C and marketplace models since 2016.',
      },
      {
        label: 'The decision not to build',
        body:
          'Some of these conversations end with a recommendation against the project, or against Magento. That is a legitimate outcome and it is cheaper than the alternative, which is why the engagement is priced as advice rather than as a deposit against a build.',
      },
    ],
    outcomesNote:
      'There is no measured outcome attached to advice on its own, and inventing one would be dishonest. The figure above is a delivery record, and it is here because it is what the advice is drawn from rather than a result the advice produced.',

    faqs: [
      {
        q: 'What does a Magento consulting engagement actually produce?',
        a: 'A written account of the current state, the decisions that need making with a recommendation on each, and an order of work. On an inherited platform the current-state document is usually the part with the most immediate value, because it is the first time the whole system has been described in one place.',
      },
      {
        q: 'Is Magento worth it for a catalogue of a few hundred products?',
        a: 'Usually not. Magento earns its operating cost when the catalogue, the pricing logic or the approval structure is genuinely complicated. A few hundred simple products on a single storefront will run better and cheaper on a hosted platform, and the honest recommendation is to say so.',
      },
      {
        q: 'What is the difference between Magento 2 and Adobe Commerce?',
        a: 'Magento 2 Open Source and Adobe Commerce share the same core. Adobe Commerce adds the commercial B2B module, page builder, customer segmentation and Adobe support, and it carries a licence fee scaled to revenue. The decision is rarely about features and almost always about whether the B2B module replaces work you would otherwise build and maintain yourself.',
      },
      {
        q: 'Can you review a proposal from another agency?',
        a: 'Yes, and it is a common reason people get in touch. The useful part is usually not the price. It is whether the proposal has an opinion about the data model, whether the phasing puts the irreversible decisions early, and what it is quietly leaving out.',
      },
      {
        q: 'Do you take the build as well?',
        a: 'The advice stands on its own and is not a route into a delivery contract. That independence is the reason a recommendation against Magento, or against the project, is possible at all.',
      },
    ],

    cases: ['marketplace', 'b2b-procurement'],
    casesNote:
      'Both are Magento 2 builds where the scope and workflow decisions on this page were the ones that mattered.',
    posts: ['shopify-plus-vs-magento2-2025', 'magento2-pwa-studio-headless'],

    related: [
      {
        href: '/magento/',
        label: 'Magento 2 and Adobe Commerce, and where the platform stops',
        note: 'The parent page: what Magento is for, and the situations it is the wrong choice for.',
      },
      {
        href: '/expertise/ecommerce-consulting/',
        label: 'eCommerce consulting, when the platform is still an open question',
        note: 'Platform-neutral advice, for a decision that has not narrowed to Magento yet.',
      },
      {
        href: '/magento/migration/',
        label: 'Moving a live store onto Magento 2',
        note: 'Once the decision is made, this is the shape of the work.',
      },
      {
        href: '/magento/integrations/',
        label: 'Magento ERP and CRM integration boundaries',
        note: 'The source-of-truth question, taken from decision to implementation.',
      },
      {
        href: '/shopify/',
        label: 'Shopify and Shopify Plus, the usual alternative',
        note: 'The other side of the comparison, written the same way.',
      },
      {
        href: '/headless-commerce/',
        label: 'Headless commerce, and when decoupling actually pays',
        note: 'Often the real question behind a Magento front-end rebuild.',
      },
    ],
    finalHeadline: ['Is Magento the right', 'answer for your catalogue?'],
  },

  /* ── 02 Migration ───────────────────────────────────────────── */
  {
    platform: 'magento',
    slug: 'migration',
    label: 'Magento migration',
    eyebrow: 'Yuvraj Raulji | Magento migration',
    h1: ['Move onto Magento', 'without going offline.'],
    lede:
      'A migration is four problems wearing one name: the catalogue has to be modelled again rather than copied, the URLs have to survive, the order and customer history has to arrive intact, and the business has to keep trading throughout. The technical part is rarely what goes wrong. The mapping is.',
    cta: 'Discuss a Magento migration',
    title: 'Magento Migration Services | Yuvraj Raulji',
    description:
      'Magento 2 migration from Shopify, WooCommerce or a legacy platform: catalogue mapping, URL and SEO preservation, order history, and a phased cutover.',

    primaryKeyword: 'magento migration services',
    secondaryKeywords: [
      'migrate to magento 2',
      'magento data migration',
      'woocommerce to magento migration',
      'magento replatforming',
    ],
    searchIntent: 'Commercial. A business that has decided to move onto Magento and is looking for someone who has done it on a live store.',
    audience: 'eCommerce and technology leads responsible for a replatform that cannot lose traffic or orders.',
    purpose: 'Own the inbound replatforming query, distinct from a version upgrade.',
    entities: ['Magento', 'Magento 2', 'Adobe Commerce', 'WooCommerce', 'Shopify', 'Technical SEO'],

    quickAnswer: {
      question: 'What does a Magento migration involve?',
      answer:
        'A Magento migration moves a live store from another platform onto Magento 2 or Adobe Commerce. The work is four things at once: remodelling the catalogue into Magento attribute sets rather than copying fields across, preserving the URL structure and redirects so search rankings survive, transferring customers and order history so support and returns still work on day one, and sequencing the cutover so the business keeps trading. Data transfer is the smallest of the four. The catalogue remodelling and the URL work are where migrations are won or lost.',
      bestFor: [
        'Outgrowing a hosted platform on catalogue or pricing complexity',
        'Consolidating several storefronts onto one platform',
        'Moving off a legacy or unsupported system',
        'Adding B2B ordering to a business already trading B2C',
      ],
    },

    boundary: {
      body:
        'This page is about arriving on Magento from somewhere else. Changing Magento version, including Magento 1 to Magento 2, is a different job with different risks, and it has its own page.',
      href: '/magento/upgrade/',
      label: 'Magento 2 upgrades, including Magento 1 to Magento 2',
    },

    problems: [
      {
        symptom: 'The catalogue does not fit the new model',
        impact:
          'Product data that was flat on the old platform has to become attribute sets, configurable products and scope-aware values. Copied across as-is it produces a catalogue that technically imports and cannot be merchandised, and the cost lands months later on the people trying to use it.',
      },
      {
        symptom: 'Traffic falls after launch and nobody predicted it',
        impact:
          'The URL structure changed, the redirect map was partial, and the pages that ranked were not the pages anyone tested. This is the most common way a technically successful migration becomes a commercial failure.',
      },
      {
        symptom: 'Order history did not come across',
        impact:
          'Support cannot answer a question about anything bought before launch, returns break, and lifetime-value reporting starts again from zero. It is discoverable on day one and expensive to fix afterwards.',
      },
      {
        symptom: 'The cutover needs the shop closed',
        impact:
          'Every day of downtime is revenue, and a big-bang launch concentrates all of the risk into the one night nobody has slept. A phased cutover costs more in planning and much less in outcome.',
      },
    ],

    approach: [
      {
        num: '01',
        title: 'Map before moving',
        body:
          'Every field on the old platform gets a decision: which Magento attribute it becomes, which scope it lives at, or that it is deliberately dropped. The map is the deliverable that makes the rest of the migration boring, and it is the step people try to skip.',
      },
      {
        num: '02',
        title: 'Model the catalogue in Magento terms',
        body:
          'Attribute sets, configurable and simple product structure, category taxonomy and price scope, built for how the business merchandises rather than for how the last platform happened to store things.',
      },
      {
        num: '03',
        title: 'Preserve the URLs',
        body:
          'A full redirect map from the ranking pages, not just the top level. Canonicals, layered navigation URL handling and the sitemap are decided at the same time, because on Magento faceted URLs are what quietly consume the crawl budget after launch.',
      },
      {
        num: '04',
        title: 'Move customers and orders',
        body:
          'Accounts, addresses, order history and, where they exist, credit terms and company accounts. Verified by reconciliation against the source rather than by a row count.',
      },
      {
        num: '05',
        title: 'Cut over in phases',
        body:
          'Rehearsed on a full data set, with the rollback path written down before it is needed. Where the structure allows it, traffic moves in stages rather than in one night.',
      },
    ],

    capabilities: [
      {
        group: 'Sources',
        items: ['WooCommerce', 'Shopify and Shopify Plus', 'Magento 1', 'Custom and legacy platforms'],
      },
      {
        group: 'Data',
        items: ['Catalogue and attributes', 'Customers and addresses', 'Order and invoice history', 'Media and digital assets'],
      },
      {
        group: 'Search preservation',
        items: ['Redirect mapping', 'Canonical strategy', 'Layered navigation URLs', 'Sitemap and crawl budget'],
      },
      {
        group: 'Cutover',
        items: ['Rehearsal on full data', 'Phased traffic move', 'Rollback plan', 'Post-launch reconciliation'],
      },
    ],

    outcomes: [
      {
        metric: '500K+',
        label: 'SKUs carried across multi-store catalogues',
        body:
          'Catalogue scale is what makes the mapping step non-negotiable. At this size a field mapped wrong is not a bug report, it is a category that cannot be merchandised.',
        context:
          'From the employment record: multi-store Magento 2 platforms handling 500K+ SKUs and 1M+ monthly users.',
      },
      {
        label: 'Search visibility held through the move',
        body:
          'The measure of a migration is what the organic traffic does in the eight weeks after launch, not whether the site went live on the planned date. That is why the redirect map is treated as a launch blocker rather than a follow-up task.',
      },
    ],
    outcomesNote:
      'No before-and-after traffic figure is published for a named migration here, because the ones I have worked on belong to the businesses that ran them. The scale figure above is from the delivery record and describes the catalogues involved, not a result claimed for this service.',

    faqs: [
      {
        q: 'How long does a Magento migration take?',
        a: 'The mapping and catalogue modelling dominate the timeline, and both scale with how messy the source data is rather than with how many products there are. A clean single-store catalogue is a different order of work from a multi-store catalogue with inconsistent attributes, and the honest answer comes after reading the source data rather than before.',
      },
      {
        q: 'Will the migration hurt our search rankings?',
        a: 'It can, and that is the main commercial risk. Rankings are held by mapping every ranking URL to its replacement before launch, keeping the redirect chain to one hop, and deciding canonical and faceted-URL handling at the same time. Rankings usually wobble for a few weeks even when this is done properly; they fall and stay down when it is not.',
      },
      {
        q: 'Can we migrate without taking the store offline?',
        a: 'Usually the store stays trading throughout and only the final cutover has a short window. What makes that possible is rehearsing the migration on a full data set first, so the cutover is a repeat of something that has already worked rather than the first attempt.',
      },
      {
        q: 'Does order history come across?',
        a: 'Yes, and it should be treated as a requirement rather than an option. Customers, addresses, orders and invoices transfer, and on B2B platforms company accounts and credit terms come with them. It is verified by reconciling values against the source, not by comparing row counts.',
      },
      {
        q: 'Should we move to Magento or to Shopify Plus?',
        a: 'It depends on whether your complexity is real. Magento is worth its operating cost when the catalogue, the pricing logic or the approval structure genuinely is complicated; Shopify Plus wins on speed of operation when it is not. That decision belongs before a migration, not during one.',
      },
    ],

    cases: ['marketplace', 'b2b-procurement'],
    casesNote: 'Both are multi-store Magento 2 platforms where catalogue structure was the constraint.',
    posts: ['shopify-plus-vs-magento2-2025', 'magento2-seo-technical-audit'],

    related: [
      {
        href: '/magento/',
        label: 'Magento 2 and Adobe Commerce, and where the platform stops',
        note: 'The parent page, including the catalogues Magento is the wrong answer for.',
      },
      {
        href: '/magento/upgrade/',
        label: 'Magento 2 upgrades, including Magento 1 to Magento 2',
        note: 'The other job people call a migration. Same platform, different version.',
      },
      {
        href: '/magento/consulting/',
        label: 'Deciding whether Magento is the right platform at all',
        note: 'Worth reading before committing to the move rather than after.',
      },
      {
        href: '/shopify/',
        label: 'Shopify and Shopify Plus, the usual alternative',
        note: 'The comparison most migrations are decided against.',
      },
      {
        href: '/woocommerce/',
        label: 'WooCommerce, and the point stores outgrow it',
        note: 'The most common platform people migrate onto Magento from.',
      },
      {
        href: '/insights/magento2-seo-technical-audit/',
        label: 'The Magento 2 technical SEO audit framework, written out',
        note: 'Redirects, canonicals and crawl budget, which is the half of a migration that fails quietly.',
      },
    ],
    finalHeadline: ['Planning a move', 'onto Magento?'],
  },

  /* ── 03 Upgrade ─────────────────────────────────────────────── */
  {
    platform: 'magento',
    slug: 'upgrade',
    label: 'Magento upgrade',
    eyebrow: 'Yuvraj Raulji | Magento upgrade',
    h1: ['Upgrade Magento without', 'holding your breath.'],
    lede:
      'Most Magento platforms fall behind for the same reason: the last upgrade hurt, so the next one gets deferred, and every deferral makes the one after it larger. The way out is not a braver upgrade. It is a smaller one, run against a rehearsed path, with the extension debt dealt with as its own piece of work.',
    cta: 'Discuss a Magento upgrade',
    title: 'Magento 2 Upgrade Services | Yuvraj Raulji',
    description:
      'Magento 2 version upgrades and Magento 1 to Magento 2 moves: extension compatibility, regression testing, a rehearsed path and a written rollback.',

    primaryKeyword: 'magento 2 upgrade services',
    secondaryKeywords: [
      'magento 1 to magento 2 upgrade',
      'magento version upgrade',
      'magento 2 upgrade cost',
      'adobe commerce upgrade',
    ],
    searchIntent: 'Commercial. A team already on Magento, behind on version, weighing the risk of moving.',
    audience: 'Technology leads and eCommerce managers carrying an ageing Magento platform they cannot take offline.',
    purpose: 'Own the version-change query so it never competes with inbound migration.',
    entities: ['Magento', 'Magento 2', 'Adobe Commerce', 'PHP', 'Technology Consultant'],

    quickAnswer: {
      question: 'What is a Magento 2 upgrade?',
      answer:
        'A Magento 2 upgrade moves a store from one Magento version to a newer one, including the move from Magento 1 to Magento 2, which is really a rebuild wearing the word upgrade. The core version change is usually the straightforward part. The work is extension compatibility, custom code that reached into internals it should not have, the regression surface across checkout and pricing, and running the whole thing on a rehearsal environment first so the production window is a repeat rather than an experiment.',
      bestFor: [
        'A platform two or more minor versions behind',
        'Security patches that cannot be applied cleanly',
        'A PHP version approaching end of life',
        'Magento 1 stores still trading',
      ],
    },

    boundary: {
      body:
        'This page is about staying on Magento and changing version. Arriving on Magento from Shopify, WooCommerce or a legacy system is a different job, with catalogue remodelling and URL preservation at the centre of it.',
      href: '/magento/migration/',
      label: 'Magento migration, for a move from another platform',
    },

    problems: [
      {
        symptom: 'Security patches will not apply cleanly',
        impact:
          'The platform is carrying known vulnerabilities because the patch conflicts with a customisation nobody wants to touch. This is the point at which deferring stops being a scheduling choice and becomes a risk decision.',
      },
      {
        symptom: 'Extensions block the version the business needs',
        impact:
          'Three extensions have no compatible release, one vendor has disappeared, and the upgrade is held hostage by code that was bought to save time. Every version deferred makes the eventual replacement work larger.',
      },
      {
        symptom: 'The last upgrade broke checkout',
        impact:
          'Confidence is gone, so the next upgrade is postponed indefinitely and the platform ages into a rewrite. The cause is almost always an untested regression surface rather than the upgrade itself.',
      },
      {
        symptom: 'PHP is going out of support',
        impact:
          'The hosting stack forces the timetable, and the deadline arrives whether the extension work is done or not. Started early this is a plan; started late it is an outage with a date on it.',
      },
    ],

    approach: [
      {
        num: '01',
        title: 'Inventory what is actually installed',
        body:
          'Every extension, every core override, every patch applied by hand. On an inherited platform this list is routinely longer than the team expects, and it is what determines the shape of the work.',
      },
      {
        num: '02',
        title: 'Decide extension by extension',
        body:
          'Upgrade, replace, or remove because nothing uses it any more. Removal is the outcome people forget to consider, and on an ageing platform it is often the largest single reduction in upgrade cost.',
      },
      {
        num: '03',
        title: 'Rehearse on production data',
        body:
          'The upgrade runs end to end on a copy of the real catalogue and the real order volume. Anything that only fails at scale fails here instead of on the night.',
      },
      {
        num: '04',
        title: 'Test the regression surface',
        body:
          'Checkout, pricing rules, tax, shipping, approvals and every integration boundary. On B2B platforms the pricing and approval paths matter more than the storefront and get tested first.',
      },
      {
        num: '05',
        title: 'Write the rollback before the window',
        body:
          'What gets reverted, by whom, and inside what time. A rollback plan authored during an incident is not a plan, and its absence is what turns a bad upgrade into a bad week.',
      },
    ],

    capabilities: [
      {
        group: 'Version moves',
        items: ['Magento 2.x to current', 'Magento 1 to Magento 2', 'Adobe Commerce upgrades', 'PHP and stack upgrades'],
      },
      {
        group: 'Compatibility',
        items: ['Extension audit', 'Core override review', 'Custom module remediation', 'Theme compatibility'],
      },
      {
        group: 'Assurance',
        items: ['Rehearsal environment', 'Checkout and pricing regression', 'Integration verification', 'Written rollback plan'],
      },
      {
        group: 'After',
        items: ['Security patch cadence', 'Upgrade schedule', 'Deployment pipeline', 'Handover to the internal team'],
      },
    ],

    outcomes: [
      {
        metric: '30%',
        label: 'Reduction in development cycle time',
        body:
          'Achieved through structured workflows and approval processes rather than through faster typing. The same structure is what turns upgrading from an event into a routine, because most of the cost of an upgrade is coordination.',
        context:
          'From the verified delivery record, while leading Magento 2 platform delivery.',
      },
      {
        label: 'An upgrade path that stays open',
        body:
          'The real outcome of the first upgrade is that the second one is small. That comes from removing the extensions nothing uses, keeping customisation out of core internals, and putting a patch cadence in place before the next deferral starts.',
      },
    ],
    outcomesNote:
      'There is no published figure here for upgrade duration or defect rate, because those depend almost entirely on what the platform is carrying, and a number quoted before reading the extension list would be a guess.',

    faqs: [
      {
        q: 'How much does a Magento 2 upgrade cost?',
        a: 'The version change is a small and fairly predictable part of it. The cost is the extension list, the custom code that reached into core internals, and the size of the regression surface, so an honest estimate follows an inventory rather than preceding one. A platform with few extensions and clean customisation upgrades for a fraction of one that has neither.',
      },
      {
        q: 'Is Magento 1 to Magento 2 an upgrade or a rebuild?',
        a: 'Technically it is a rebuild. The data migrates, the extensions do not, the theme does not, and most custom modules do not. It is worth planning it as a Magento 2 build that inherits data, because planning it as an upgrade is how the timeline gets set at half of what it needs.',
      },
      {
        q: 'Can we skip several versions at once?',
        a: 'Usually yes, and often it is the right call, because the regression testing is the expensive part and it is paid for once rather than per hop. What decides it is the extension and PHP compatibility across the range, which comes out of the inventory step.',
      },
      {
        q: 'How often should Magento be upgraded?',
        a: 'Security patches on release, and version upgrades on a schedule the business sets deliberately rather than when something forces it. The cadence matters more than the frequency: platforms that upgrade regularly find each one small, and platforms that defer find each one larger than the last.',
      },
      {
        q: 'What happens if the upgrade goes wrong on the night?',
        a: 'It gets rolled back, using a plan written before the window and rehearsed with everything else. That is why the rehearsal environment carries production-scale data: an upgrade that has only ever run on a small data set has not been tested, it has been demonstrated.',
      },
    ],

    cases: ['marketplace'],
    casesNote: 'A multi-store Magento 2 catalogue, which is the kind of platform where upgrade cost is decided by the extension list.',
    posts: ['aws-magento2-server-setup', 'magento2-pwa-studio-headless'],

    related: [
      {
        href: '/magento/',
        label: 'Magento 2 and Adobe Commerce, and where the platform stops',
        note: 'The parent page, and the case for staying on Magento at all.',
      },
      {
        href: '/magento/migration/',
        label: 'Moving a live store onto Magento 2 from another platform',
        note: 'The other job called a migration. Different risks entirely.',
      },
      {
        href: '/magento/security/',
        label: 'Magento security patching and hardening',
        note: 'The reason most upgrades stop being optional.',
      },
      {
        href: '/magento/maintenance/',
        label: 'Magento support and maintenance, and the patch cadence',
        note: 'What keeps the next upgrade small.',
      },
      {
        href: '/magento/performance/',
        label: 'Magento 2 performance and Core Web Vitals work',
        note: 'Often the first thing measured after an upgrade lands.',
      },
      {
        href: '/headless-commerce/',
        label: 'Headless commerce, and when decoupling actually pays',
        note: 'Sometimes the honest answer to a theme that will not survive the upgrade.',
      },
    ],
    finalHeadline: ['How far behind', 'is your platform?'],
  },

  /* ── 04 Performance ─────────────────────────────────────────── */
  {
    platform: 'magento',
    slug: 'performance',
    label: 'Magento performance',
    eyebrow: 'Yuvraj Raulji | Magento performance',
    h1: ['Magento speed is a caching', 'problem before a front-end one.'],
    lede:
      'A slow Magento store is rarely slow because of the theme. Time to first byte climbing while the lab score looks respectable points below the front end every time: cache invalidation, a query plan, an index doing a full scan. Fixing the images first is the most common wasted month in Magento performance work.',
    cta: 'Discuss Magento performance',
    title: 'Magento 2 Performance Optimization | Yuvraj Raulji',
    description:
      'Magento 2 performance and Core Web Vitals work: Varnish, Redis, full-page cache, database and index tuning, CDN and image pipeline, measured on field data.',

    primaryKeyword: 'magento 2 performance optimization',
    secondaryKeywords: [
      'magento speed optimization',
      'magento core web vitals',
      'magento 2 slow',
      'magento caching',
    ],
    searchIntent: 'Commercial. A store already on Magento losing conversion or rankings to speed.',
    audience: 'eCommerce managers watching conversion fall, and technology leads watching time to first byte climb.',
    purpose: 'Own the Magento speed query with the caching-first argument the platform actually needs.',
    entities: ['Magento', 'Magento 2', 'Adobe Commerce', 'Core Web Vitals', 'Technical SEO', 'CRO'],

    quickAnswer: {
      question: 'Why is Magento 2 slow, and what fixes it?',
      answer:
        'Magento 2 is slow for infrastructure and data reasons far more often than for front-end ones. The usual causes are full-page cache being invalidated too widely, Redis or Varnish misconfigured or absent, indexers running on save rather than on schedule, and database queries that scan rather than seek on a large catalogue. Fixing those changes time to first byte, which is the number every other metric sits on top of. Image and JavaScript work matters too, but it improves what the visitor sees after the server has already answered, so on Magento it comes second.',
      bestFor: [
        'Time to first byte climbing under real traffic',
        'Core Web Vitals failing in field data while lab scores pass',
        'Large catalogues where indexing is a planning constraint',
        'Stores that got slower after a sale or a catalogue import',
      ],
    },

    problems: [
      {
        symptom: 'The lab score is fine and real users are not',
        impact:
          'Lighthouse passes on a fast connection and Core Web Vitals fail in the field, so the team optimises what the tool measures rather than what the customer experiences. Google ranks on the field data, and the customer leaves on it too.',
      },
      {
        symptom: 'Time to first byte climbs with traffic',
        impact:
          'The store is fastest when nobody is using it, which points at caching and query cost rather than at page weight. It fails hardest during exactly the campaigns the business spent money on.',
      },
      {
        symptom: 'A single catalogue import slows the whole site',
        impact:
          'Indexers reindex on save, cache is invalidated broadly, and an ordinary merchandising task becomes an outage. Operations learn to import at night, which hides the problem rather than fixing it.',
      },
      {
        symptom: 'Checkout is where the speed loss actually costs money',
        impact:
          'A slow category page loses patience; a slow checkout loses the order that was already won. It is the highest-value place to measure and the one most often left until last.',
      },
    ],

    approach: [
      {
        num: '01',
        title: 'Measure the field, not the lab',
        body:
          'Real user data first, segmented by device and template, so the work targets the pages and the conditions that actually carry revenue. A lab score is a useful check afterwards and a poor place to start.',
      },
      {
        num: '02',
        title: 'Work down the stack, not across the surface',
        body:
          'Cache configuration, then query and index behaviour, then the front end. Almost every Magento engagement that starts with images ends up repeating the work once the server response is fixed.',
      },
      {
        num: '03',
        title: 'Fix cache invalidation, not just cache hits',
        body:
          'Full-page cache, Varnish and Redis tuned together, with attention to what invalidates what. Broad invalidation is why a store with caching enabled still behaves as though it has none.',
      },
      {
        num: '04',
        title: 'Tune the database and the indexers',
        body:
          'Query plans, indexer mode, and the specific scans that only appear at catalogue scale. This is where large-catalogue Magento differs most from the generic advice written for small stores.',
      },
      {
        num: '05',
        title: 'Then the front end, and hold it',
        body:
          'CDN, image pipeline, critical path and layout stability, followed by a monitor so the gain does not quietly erode over the next two releases. Performance work without a monitor is a one-off, not an improvement.',
      },
    ],

    capabilities: [
      {
        group: 'Caching',
        items: ['Varnish', 'Redis', 'Full-page cache', 'Invalidation strategy', 'CDN configuration'],
      },
      {
        group: 'Data layer',
        items: ['Query plan analysis', 'Indexer mode and scheduling', 'MySQL tuning', 'Elasticsearch and OpenSearch'],
      },
      {
        group: 'Infrastructure',
        items: ['AWS provisioning', 'PHP-FPM tuning', 'Nginx configuration', 'Cron and queue behaviour'],
      },
      {
        group: 'Front end',
        items: ['Core Web Vitals', 'Image pipeline', 'Critical path', 'Layout stability', 'Checkout speed'],
      },
    ],

    outcomes: [
      {
        metric: '60%',
        label: 'Improvement in site speed',
        body:
          'Delivered through caching, CDN and database optimization on a high-traffic platform. None of it touched the theme, which is the point of the caching-first order of work on this page.',
        context:
          'From the verified delivery record: site speed improved by 60% through caching, CDN and database optimization.',
      },
      {
        label: 'Core Web Vitals measured where they count',
        body:
          'Field data on real devices rather than a lab score, segmented by template, so the improvement shows up in what Google uses to rank and in what a customer on a mid-range phone actually waits for.',
      },
    ],
    outcomesNote:
      'The figure above comes from one platform and its own starting position. A store that already has Varnish and Redis configured correctly has less headroom than one that does not, and quoting the same percentage to both would be dishonest.',

    faqs: [
      {
        q: 'Why is my Magento 2 store slow when the server looks idle?',
        a: 'Usually cache invalidation. When full-page cache is invalidated too broadly, a large share of requests miss the cache and are built from scratch, so the platform behaves as though caching were switched off while the infrastructure graph looks calm. The fix is in what invalidates what, not in a bigger server.',
      },
      {
        q: 'Will a bigger server fix Magento performance?',
        a: 'It buys headroom and hides the cause. If the store is slow because of cache misses, scans on a large catalogue or indexers running on save, more hardware moves the ceiling without changing the shape of the problem, and the cost recurs monthly.',
      },
      {
        q: 'How do Core Web Vitals apply to Magento?',
        a: 'They are measured on real visits, so the number that matters is field data rather than a Lighthouse run. On Magento the server response usually dominates, which means caching and query work move the vitals more than image compression does, and category and product templates need measuring separately because they fail differently.',
      },
      {
        q: 'Does Magento performance work help SEO or conversion more?',
        a: 'Both, at different points. Speed is a ranking input and a genuine one at the slow end of the scale, but the larger commercial effect is usually conversion, and it concentrates in checkout, where the order has already been won and is waiting on the server.',
      },
      {
        q: 'How long before the improvement shows up?',
        a: 'Server-side gains are visible immediately in field data collection, and Core Web Vitals reporting moves over the following weeks because it is measured on a rolling window. Conversion effects are visible sooner than ranking effects, which is worth knowing before setting expectations with a board.',
      },
    ],

    cases: ['marketplace', 'b2b-procurement'],
    casesNote: 'Both carry catalogue volume large enough that indexing and query cost, not page weight, set the speed.',
    posts: ['magento2-seo-technical-audit', 'magento2-checkout-optimization', 'aws-magento2-server-setup'],

    related: [
      {
        href: '/magento/',
        label: 'Magento 2 and Adobe Commerce, and where the platform stops',
        note: 'The parent page, including what Magento costs to operate.',
      },
      {
        href: '/magento/maintenance/',
        label: 'Magento support and maintenance, which is what holds a speed gain',
        note: 'Performance work without monitoring erodes across two releases.',
      },
      {
        href: '/magento/upgrade/',
        label: 'Magento 2 upgrades, including Magento 1 to Magento 2',
        note: 'An ageing platform limits how far tuning can take you.',
      },
      {
        href: '/expertise/ecommerce-consulting/',
        label: 'Deciding which fix pays first, before any of them are scoped',
        note: 'Speed is rarely the only thing costing money, and rarely the most expensive.',
      },
      {
        href: '/insights/cro-double-conversion/',
        label: 'The CRO frameworks behind a faster checkout',
        note: 'The commercial half of a performance engagement, written out.',
      },
      {
        href: '/headless-commerce/',
        label: 'Headless commerce, and when decoupling actually pays',
        note: 'Sometimes proposed as a speed fix. Often it is not one.',
      },
    ],
    finalHeadline: ['Where is your store', 'actually losing time?'],
  },

  /* ── 05 Maintenance ─────────────────────────────────────────── */
  {
    platform: 'magento',
    slug: 'maintenance',
    label: 'Magento maintenance',
    eyebrow: 'Yuvraj Raulji | Magento maintenance',
    h1: ['Keep the platform boring,', 'on purpose.'],
    lede:
      'Magento maintenance is not a ticket queue. It is the set of habits that decide whether next year is a routine or a rescue: patches applied on release rather than when something forces it, a deployment path anyone can run, monitoring that fires before a customer notices, and a version cadence that keeps each upgrade small.',
    cta: 'Discuss ongoing Magento support',
    title: 'Magento Support and Maintenance | Yuvraj Raulji',
    description:
      'Ongoing Magento 2 support and maintenance: patch cadence, monitoring, deployment pipeline and the version schedule that keeps every upgrade small.',

    primaryKeyword: 'magento support and maintenance',
    secondaryKeywords: [
      'magento 2 maintenance services',
      'magento retainer',
      'magento support services',
      'magento managed support',
    ],
    searchIntent: 'Commercial. A business that has a Magento platform and no reliable ownership of it.',
    audience: 'Operators without an in-house Magento team, and teams that have one but no release discipline.',
    purpose: 'Own the ongoing-support query, distinct from the one-off performance and security engagements.',
    entities: ['Magento', 'Magento 2', 'Adobe Commerce', 'AWS', 'Technology Consultant'],

    quickAnswer: {
      question: 'What does Magento maintenance cover?',
      answer:
        'Magento maintenance is the ongoing work that keeps a store trading safely: applying security patches on release, keeping the version close enough to current that the next upgrade stays small, monitoring the platform so failures are found before customers report them, maintaining a deployment path that anyone on the team can run, and holding the performance and integration behaviour steady across releases. It is deliberately unexciting. The measure of it is how few incidents there are, not how many tickets get closed.',
      bestFor: [
        'A platform with no in-house Magento ownership',
        'Teams whose deploys depend on one person',
        'Stores where patches are applied late or not at all',
        'Businesses that want the upgrade to stay routine',
      ],
    },

    problems: [
      {
        symptom: 'Only one person can deploy',
        impact:
          'Releases wait on an individual, and their holiday is a business risk. It also means the deployment path is undocumented, so the first time anyone else runs it will be during an incident.',
      },
      {
        symptom: 'Patches are applied late, or in batches, or never',
        impact:
          'Each deferral makes the next application harder, because the gap between the platform and the patch grows. The security exposure is the visible cost; the compounding upgrade cost is the larger one.',
      },
      {
        symptom: 'Problems are reported by customers first',
        impact:
          'A failed cron, a stalled queue or a broken integration runs unnoticed until an order does not arrive. By the time support hears about it, the recovery includes an apology and a reconciliation.',
      },
      {
        symptom: 'Performance quietly erodes after every release',
        impact:
          'The store was tuned once and nothing watches it, so each release gives back a little of the gain until the work has to be paid for again from the start.',
      },
    ],

    approach: [
      {
        num: '01',
        title: 'Establish what exists',
        body:
          'Version, patch level, extension list, deployment path, monitoring coverage and who currently holds the knowledge. On most inherited platforms this produces the first accurate picture the business has had.',
      },
      {
        num: '02',
        title: 'Make deployment repeatable',
        body:
          'A pipeline anyone on the team can run, with the same steps in staging and production. Removing the single point of failure is usually the highest-value week of a maintenance engagement.',
      },
      {
        num: '03',
        title: 'Put a patch cadence in place',
        body:
          'Security releases applied on a defined schedule rather than on alarm, and version upgrades planned on the calendar. Cadence is what keeps each upgrade small enough not to be feared.',
      },
      {
        num: '04',
        title: 'Monitor what actually fails',
        body:
          'Cron and queue health, integration boundaries, indexer state, cache hit rate and checkout errors. Uptime monitoring alone reports that the homepage answered, which is not the same as the business working.',
      },
      {
        num: '05',
        title: 'Hand it back',
        body:
          'Documentation, runbooks and enough transfer that the internal team can hold it. A maintenance arrangement that makes itself indispensable is a commercial arrangement rather than a technical one.',
      },
    ],

    capabilities: [
      {
        group: 'Release',
        items: ['Deployment pipeline', 'Staging parity', 'Release checklist', 'Rollback path'],
      },
      {
        group: 'Patching',
        items: ['Security patch cadence', 'Version schedule', 'Extension updates', 'PHP and stack currency'],
      },
      {
        group: 'Monitoring',
        items: ['Cron and queue health', 'Integration boundaries', 'Indexer state', 'Cache hit rate', 'Checkout errors'],
      },
      {
        group: 'Hosting',
        items: ['AWS provisioning', 'Backup and restore testing', 'Log and alert routing', 'Capacity review'],
      },
    ],

    outcomes: [
      {
        metric: '30%',
        label: 'Reduction in development cycle time',
        body:
          'From structured workflows and approval processes rather than from working faster. Release discipline is what most Magento teams are missing, and it pays back on every change rather than once.',
        context:
          'From the verified delivery record, while leading Magento 2 platform delivery.',
      },
      {
        label: 'Fewer incidents, and shorter ones',
        body:
          'The point of monitoring the queue, the cron and the integration boundary is that most Magento incidents announce themselves for a while before a customer notices. Catching them there turns an outage into a task.',
      },
    ],
    outcomesNote:
      'No uptime percentage or response-time commitment is published here, because those are contractual terms that depend on the hosting arrangement and the cover agreed, and a number on a page is not a service level.',

    faqs: [
      {
        q: 'What is included in Magento maintenance?',
        a: 'Security patching on a defined cadence, version planning, deployment and release management, monitoring of the parts that actually fail, and holding performance and integration behaviour steady across releases. Feature development is usually kept separate, because mixing the two is how patching gets postponed for a roadmap item.',
      },
      {
        q: 'How often should Magento security patches be applied?',
        a: 'On release, as the default. Magento security releases are published with enough detail for the vulnerability to be understood by people who are not on your side, so the window between publication and exploitation attempts is short. A platform that batches patches quarterly is making a risk decision, and it should be a stated one rather than an accidental one.',
      },
      {
        q: 'Do we need a retainer if we already have developers?',
        a: 'Often what is missing is not hands but discipline: a deployment path more than one person can run, a patch cadence, and monitoring on the parts that fail quietly. That can be set up and handed over rather than held indefinitely, and for a team with its own developers that is usually the better arrangement.',
      },
      {
        q: 'What is the difference between maintenance and support?',
        a: 'Support is reactive and answers what has already broken. Maintenance is the work that reduces how often that happens: patching, upgrading, monitoring and release discipline. Buying only the first is why some platforms have a support contract and an incident every month.',
      },
      {
        q: 'Can maintenance cover hosting as well?',
        a: 'Yes, where the platform runs on AWS or a comparable stack. In practice the hosting and the application are one system on Magento, because caching, cron behaviour and queue processing sit across the boundary between them.',
      },
    ],

    cases: ['b2b-procurement', 'marketplace'],
    casesNote: 'Both are platforms where an unnoticed queue or cron failure stops orders rather than degrading a page.',
    posts: ['aws-magento2-server-setup', 'magento2-seo-technical-audit'],

    related: [
      {
        href: '/magento/',
        label: 'Magento 2 and Adobe Commerce, and where the platform stops',
        note: 'The parent page, including the operating burden Magento asks you to own.',
      },
      {
        href: '/magento/security/',
        label: 'Magento security patching and hardening',
        note: 'The half of maintenance with a deadline attached.',
      },
      {
        href: '/magento/upgrade/',
        label: 'Magento 2 upgrades, including Magento 1 to Magento 2',
        note: 'What a patch cadence exists to keep small.',
      },
      {
        href: '/magento/performance/',
        label: 'Magento 2 performance and Core Web Vitals work',
        note: 'The gain that erodes without something watching it.',
      },
      {
        href: '/magento/integrations/',
        label: 'Magento ERP and CRM integration boundaries',
        note: 'The boundary that fails quietly, and so needs monitoring most.',
      },
      {
        href: '/wordpress/',
        label: 'WordPress builds, hardening and production hosting',
        note: 'The same discipline applied to the content side of a stack.',
      },
    ],
    finalHeadline: ['Who owns your', 'Magento platform?'],
  },

  /* ── 06 Security ────────────────────────────────────────────── */
  {
    platform: 'magento',
    slug: 'security',
    label: 'Magento security',
    eyebrow: 'Yuvraj Raulji | Magento security',
    h1: ['Magento security is a', 'patching habit, mostly.'],
    lede:
      'Almost every compromised Magento store was running a known vulnerability with a published patch. The interesting attacks are rare; the ordinary ones are automated, indiscriminate and looking for platforms that fell behind. Security work on Magento is therefore mostly about cadence, access and what your customisations reach into.',
    cta: 'Discuss a Magento security review',
    title: 'Magento Security and Hardening | Yuvraj Raulji',
    description:
      'Magento 2 security work: patch cadence, admin and access hardening, extension risk review, and the monitoring that catches a checkout change early.',

    primaryKeyword: 'magento security',
    secondaryKeywords: [
      'magento 2 security patches',
      'magento hardening',
      'magento security audit',
      'magento vulnerability',
    ],
    searchIntent: 'Commercial and informational. A team worried about exposure, or one that has just had a scare.',
    audience: 'Technology leads accountable for a store that takes payments, and operators carrying compliance obligations.',
    purpose: 'Own the Magento security query without overlapping the maintenance retainer page.',
    entities: ['Magento', 'Magento 2', 'Adobe Commerce', 'Technology Consultant'],

    problems: [
      {
        symptom: 'The platform is behind on security releases',
        impact:
          'Magento security releases describe the vulnerability in enough detail to be useful to both sides. Every week a patch is deferred is a week the store is exposed to something already documented and already automated.',
      },
      {
        symptom: 'Admin access has accumulated',
        impact:
          'Old accounts, shared logins, no two-factor and an admin path anyone can find. Most of the practical exposure on a Magento store is here rather than in the application code, and it costs almost nothing to fix.',
      },
      {
        symptom: 'Nobody knows what the extensions can reach',
        impact:
          'Third-party code runs with full application privileges, and on an inherited platform the list usually includes something whose vendor no longer exists. An extension is a supply chain, and it is rarely treated as one.',
      },
      {
        symptom: 'A change to the payment path would go unnoticed',
        impact:
          'Skimming attacks on commerce platforms target checkout specifically and are designed to be quiet. Without file integrity monitoring and content security policy, the first signal is a payment processor asking questions.',
      },
    ],

    approach: [
      {
        num: '01',
        title: 'Establish the current exposure',
        body:
          'Version, patch level, known vulnerabilities that apply, admin accounts, extension inventory and where customisation touches the payment path. The output is a list ordered by exposure rather than by ease.',
      },
      {
        num: '02',
        title: 'Close the patch gap',
        body:
          'Apply what applies, and where a patch conflicts with a customisation, fix the customisation rather than skipping the patch. That conflict is the usual reason a platform fell behind in the first place.',
      },
      {
        num: '03',
        title: 'Harden access',
        body:
          'Two-factor on every admin account, removal of accounts nobody uses, an admin path that is not the default, session and password policy, and separation between the people who need catalogue access and the people who need system access.',
      },
      {
        num: '04',
        title: 'Review the extension supply chain',
        body:
          'What is installed, what is maintained, what is abandoned, and what can be removed outright. Removal is the strongest available control and the one most often overlooked.',
      },
      {
        num: '05',
        title: 'Monitor for change',
        body:
          'File integrity monitoring, content security policy on the checkout path, admin action logging and alerting that reaches a person. The goal is that an unexpected change is noticed in hours rather than by a processor months later.',
      },
    ],

    capabilities: [
      {
        group: 'Patching',
        items: ['Security release assessment', 'Patch application', 'Customisation conflict resolution', 'Cadence and ownership'],
      },
      {
        group: 'Access',
        items: ['Two-factor enforcement', 'Admin account review', 'Role separation', 'Admin path and session policy'],
      },
      {
        group: 'Supply chain',
        items: ['Extension inventory', 'Abandoned extension identification', 'Removal and replacement', 'Custom code review'],
      },
      {
        group: 'Detection',
        items: ['File integrity monitoring', 'Content security policy', 'Admin action logging', 'Alert routing'],
      },
    ],

    outcomes: [
      {
        label: 'The patch gap closed, and kept closed',
        body:
          'The measurable outcome of security work on Magento is the distance between the store and the current security release, and whether that distance stays small without anyone pushing. Everything else on this page supports that one number.',
      },
      {
        label: 'Exposure reduced by removal',
        body:
          'The extensions that come out during a review are a permanent reduction in surface, not a control that has to be maintained. On inherited platforms this is routinely the largest single improvement available.',
      },
    ],
    outcomesNote:
      'No incident statistics, breach counts or compliance certifications are claimed here. I do not publish security outcomes for client platforms, and a consultant advertising how many breaches they have prevented is describing something nobody can measure.',

    faqs: [
      {
        q: 'How do Magento stores actually get compromised?',
        a: 'Overwhelmingly through known vulnerabilities that had a patch available, weak or excessive admin access, and third-party extension code. Targeted attacks against bespoke code exist and are rare by comparison. That is why cadence and access hardening deliver more security per hour than almost anything else.',
      },
      {
        q: 'What is a Magento security audit?',
        a: 'A review of the patch gap, the admin and access position, the extension inventory including anything abandoned, where customisation touches the payment path, and whether an unexpected change would be detected. The output is a list ordered by exposure, with the items that cost nothing separated from the ones that need engineering.',
      },
      {
        q: 'Is Adobe Commerce more secure than Magento Open Source?',
        a: 'They share a core and receive the same security releases, so the difference is support and response rather than an inherently safer platform. Neither is secure while patches are deferred, and the licence does not apply them for you.',
      },
      {
        q: 'Do we need a web application firewall?',
        a: 'It is useful and it is not a substitute for patching. A firewall buys time against automated scanning of known vulnerabilities, which is real value, but a platform relying on it while running unpatched code has bought a delay rather than a fix.',
      },
      {
        q: 'We think we have been compromised. What first?',
        a: 'Preserve the evidence before changing anything, because a hurried cleanup destroys the record of how entry was gained and guarantees a repeat. Then contain, involve your payment processor if checkout is implicated, and treat the root cause as the deliverable rather than the removal.',
      },
    ],

    quickAnswer: {
      question: 'What does Magento security work involve?',
      answer:
        'Magento security work is mostly about closing and then keeping closed the gap between your store and the current security release, hardening administrative access, understanding what your third-party extensions can reach, and making an unexpected change to the checkout path visible quickly. Magento publishes security releases with enough detail to be actionable by attackers as well as operators, so cadence matters more than any single control. Sophisticated attacks against custom code are rare next to automated scanning for vulnerabilities that already have a patch.',
      bestFor: [
        'Platforms behind on security releases',
        'Stores taking payments with no integrity monitoring',
        'Inherited builds with an unreviewed extension list',
        'Businesses facing a compliance or customer security review',
      ],
    },

    cases: ['b2b-procurement'],
    casesNote: 'A platform where approvals and credit terms make administrative access control a commercial control, not just a technical one.',
    posts: ['aws-magento2-server-setup'],

    related: [
      {
        href: '/magento/',
        label: 'Magento 2 and Adobe Commerce, and where the platform stops',
        note: 'The parent page, including the operating burden that comes with self-hosting.',
      },
      {
        href: '/magento/maintenance/',
        label: 'Magento support and maintenance, and the patch cadence',
        note: 'Where a one-off security review becomes a habit.',
      },
      {
        href: '/magento/upgrade/',
        label: 'Magento 2 upgrades, including Magento 1 to Magento 2',
        note: 'The usual reason a patch will not apply cleanly.',
      },
      {
        href: '/magento/integrations/',
        label: 'Magento ERP and CRM integration boundaries',
        note: 'Credentials and access across a system boundary, treated deliberately.',
      },
      {
        href: '/wordpress/',
        label: 'WordPress builds, hardening and production hosting',
        note: 'The same argument on the platform where it is ignored most often.',
      },
      {
        href: '/magento/consulting/',
        label: 'Reading an inherited Magento build you did not commission',
        note: 'Most unreviewed extension lists arrive with a platform nobody documented.',
      },
    ],
    finalHeadline: ['How far behind', 'are your patches?'],
  },

  /* ── 07 Integrations ────────────────────────────────────────── */
  {
    platform: 'magento',
    slug: 'integrations',
    label: 'Magento integrations',
    eyebrow: 'Yuvraj Raulji | Magento integrations',
    h1: ['Name the system of record,', 'then build the boundary.'],
    lede:
      'Most Magento integration pain comes from one unanswered question: for each field, which system is right when the two disagree? Answer it per field and the integration becomes a contract that can be tested. Leave it unanswered and you get point-to-point scripts, a manual correction rota, and a roadmap that is mostly maintenance.',
    cta: 'Discuss a Magento integration',
    title: 'Magento ERP and CRM Integration | Yuvraj Raulji',
    description:
      'Magento 2 integration with ERP, PIM, CRM and OMS: an explicit contract per field, GraphQL and REST APIs, queues, reconciliation and failure handling.',

    primaryKeyword: 'magento erp integration',
    secondaryKeywords: [
      'magento api integration',
      'magento crm integration',
      'magento 2 integration services',
      'magento pim integration',
    ],
    searchIntent: 'Commercial. A business whose Magento store has to agree with the systems behind it.',
    audience: 'Operations and technology leads where stock, price or order data crosses a system boundary.',
    purpose: 'Own the integration query, and carry the B2B workflow automation record.',
    entities: ['Magento', 'Magento 2', 'Adobe Commerce', 'GraphQL', 'AI Automation', 'Digital Transformation'],

    quickAnswer: {
      question: 'How does Magento integrate with an ERP?',
      answer:
        'Magento integrates with an ERP, PIM, CRM or OMS through its REST and GraphQL APIs, usually with a message queue between them so neither system has to be available for the other to keep working. The technical connection is the easy part. What makes an integration reliable is an explicit contract: for every field, which system is the source of truth, how often it syncs, what happens when a message fails, and how the two sides are reconciled when they drift. Integrations built as point-to-point scripts without that contract turn every schema change on either side into an outage.',
      bestFor: [
        'ERP as the system of record for stock and price',
        'B2B ordering with quotes, contracts and approvals',
        'PIM-driven catalogues at scale',
        'Order and fulfilment flows spanning several systems',
      ],
    },

    problems: [
      {
        symptom: 'Stock is wrong often enough that people check manually',
        impact:
          'Oversells, cancellations and a support rota built around distrust of the platform. The manual check becomes the process, and its cost is never counted because nobody logs it as a ticket.',
      },
      {
        symptom: 'Every schema change on either side is an outage',
        impact:
          'The integration was built as scripts against whatever the fields happened to be called. Both systems become frozen, and any improvement to either is priced as an integration project.',
      },
      {
        symptom: 'B2B orders wait on people, twice',
        impact:
          'Quotes, negotiated pricing and approval chains run through email and a spreadsheet. The delay is not the software, it is people waiting for each other, and it is felt by the customer as a slow supplier.',
      },
      {
        symptom: 'Nobody can say which system is right',
        impact:
          'Magento and the ERP disagree on a price and the answer depends on who is asked. Without a per-field source of truth the disagreement cannot be resolved by rule, so it is resolved by a person, every time.',
      },
    ],

    approach: [
      {
        num: '01',
        title: 'Name the source of truth per field',
        body:
          'Not per system. Stock may belong to the ERP while merchandising copy belongs to the PIM and promotional price belongs to Magento. Writing this down is unglamorous and it settles most of the arguments the integration would otherwise cause.',
      },
      {
        num: '02',
        title: 'Write the contract',
        body:
          'Fields, direction, frequency, and the behaviour on failure. A contract makes the integration testable, which means a change on either side can be verified rather than discovered.',
      },
      {
        num: '03',
        title: 'Build with a queue between',
        body:
          'Message queues over the Magento API so neither system needs the other to be up. Point-to-point synchronous calls make each system a dependency of the other, which is how one supplier maintenance window stops the store taking orders.',
      },
      {
        num: '04',
        title: 'Model the workflow explicitly',
        body:
          'On B2B platforms, approvals, quotes and company accounts are data structures in Magento rather than a plugin, so they can be reported on and changed. This is what Magento is actually for, and it is where the platform earns its cost.',
      },
      {
        num: '05',
        title: 'Reconcile, and alert on drift',
        body:
          'Scheduled comparison across the boundary with the differences classified rather than dumped into a report nobody opens. It reports; it does not auto-correct, because automatic correction across a boundary turns a small discrepancy into a large one.',
      },
    ],

    capabilities: [
      {
        group: 'Systems',
        items: ['ERP', 'PIM', 'CRM', 'OMS and fulfilment', 'Payment gateways', 'Marketing and engagement platforms'],
      },
      {
        group: 'Interfaces',
        items: ['Magento REST API', 'GraphQL', 'Message queues', 'Webhooks', 'Bulk and async endpoints'],
      },
      {
        group: 'B2B workflow',
        items: ['Quotes and negotiation', 'Approval chains', 'Company accounts', 'Contract pricing', 'Requisition lists'],
      },
      {
        group: 'Assurance',
        items: ['Per-field contract', 'Failure handling and retry', 'Reconciliation jobs', 'Drift alerting'],
      },
    ],

    outcomes: [
      {
        metric: '90%',
        label: 'Of B2B order and quote processing automated',
        body:
          'Approval chains modelled in Magento as a data structure rather than as email, across development, B2B orders, quotes and vendor management. The first version was deterministic rather than generative, which is why it was trustworthy enough to leave running.',
        context:
          'From the verified delivery record on a B2B procurement platform: approximately 90% of B2B order and quote processes automated.',
      },
      {
        metric: '40%',
        label: 'Cut in approval cycle time',
        body:
          'The commercial effect of the same work. On a B2B platform the delay customers actually feel is the wait between people, not the page load, and it is the number worth moving.',
        context:
          'From the same B2B procurement platform, measured against the approval process it replaced.',
      },
    ],
    outcomesNote:
      'Both figures come from one B2B procurement platform and describe the process it replaced. A business whose approvals are already partly automated has less headroom, and the same percentages would not be honest applied to it.',

    faqs: [
      {
        q: 'How do you decide which system owns a field?',
        a: 'By asking where the value is actually created and who is accountable for it being right. Stock is created by the warehouse, so it belongs to the ERP or the WMS. Merchandising copy is created by the merchandising team, so it belongs to the PIM or to Magento. The test is simple: when the two disagree, whose answer would you act on?',
      },
      {
        q: 'Should Magento integrations be real time?',
        a: 'Rarely all of them. Stock usually needs to be near real time because the cost of being wrong is an oversell; product copy can sync on a schedule; order export can queue. Making everything real time raises cost and coupling, and makes the store dependent on the ERP being available.',
      },
      {
        q: 'What happens when the ERP is down?',
        a: 'With a queue between the systems the store keeps trading and messages are delivered when the ERP returns. Without one, an ERP maintenance window becomes a commerce outage, which is the single strongest argument for not building integrations as direct synchronous calls.',
      },
      {
        q: 'Can AI help with integration work?',
        a: 'It helps most with reconciliation and with the data quality either side of the boundary: finding where two systems disagree, and drafting the catalogue attributes that arrive incomplete. It should not be making the correction. A system that can silently rewrite a value across a boundary turns a small discrepancy into a large one.',
      },
      {
        q: 'Does Magento need Adobe Commerce for B2B?',
        a: 'The Adobe Commerce B2B module supplies company accounts, requisition lists, quotes and negotiable pricing out of the box. The same behaviour can be built on Open Source, and whether it is worth it depends on how far your approval and pricing rules diverge from the module. The comparison is licence cost against build and maintenance cost, not features against features.',
      },
    ],

    cases: ['b2b-procurement', 'marketplace'],
    casesNote: 'The procurement platform is where the approval and quote automation figures on this page come from.',
    posts: ['ai-ecommerce-revenue-2025', 'shopify-plus-vs-magento2-2025'],

    related: [
      {
        href: '/magento/',
        label: 'Magento 2 and Adobe Commerce, and where the platform stops',
        note: 'The parent page, including why the workflow layer is what you are paying for.',
      },
      {
        href: '/ai-automation/',
        label: 'AI automation for quotes, approvals and reconciliation',
        note: 'Where the workflow above meets retrieval and agents, with human checkpoints.',
      },
      {
        href: '/digital-transformation/',
        label: 'Modernising legacy stacks into API-first systems',
        note: 'The same boundary argument, applied across the business rather than one platform.',
      },
      {
        href: '/magento/migration/',
        label: 'Moving a live store onto Magento 2 from another platform',
        note: 'Integration contracts are cheapest to define during a migration.',
      },
      {
        href: '/magento/maintenance/',
        label: 'Magento support and maintenance, and boundary monitoring',
        note: 'An integration that is not monitored fails quietly by design.',
      },
      {
        href: '/headless-commerce/',
        label: 'Headless commerce on Next.js, GraphQL and the Storefront API',
        note: 'The same APIs, pointed at the storefront instead of the back office.',
      },
    ],
    finalHeadline: ['Which system is right', 'when they disagree?'],
  },
];
