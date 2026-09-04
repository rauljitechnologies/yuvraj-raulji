import type { PlatformService } from '../platform-services';

/* ═══════════════════════════════════════════════════════════════
   WORDPRESS
   Hub: /wordpress/. Five services, each the site-side counterpart of
   a WooCommerce page, and each carrying a boundary that says so.

   The line, stated once in lib/services/woocommerce.ts and held here:

     WordPress pages are about **the site**: content model, editorial
     workflow, templates, hosting, security and the non-commerce
     stack. The reader publishes things.

     WooCommerce pages are about **the store**: catalogue, cart and
     checkout, orders, payments and the commerce plugin layer. The
     reader sells things.

   Where a subject belongs to both, it is written once on the side
   that owns it and linked from the other. Page caching, hosting and
   core security are WordPress. Cart fragments, checkout testing and
   the commerce plugin stack are WooCommerce. Neither page repeats the
   other's argument, and each names the other in visible copy so a
   search engine has the same distinction the reader does.

   No percentage appears anywhere in this file. The hub says why: none
   of the six builds on the work record is published as a WordPress
   case. The record is real and sits in the service and infrastructure
   record, including custom builds, bespoke themes, plugin development
   and production provisioning on AWS EC2, RDS and S3 with Nginx.
   ═══════════════════════════════════════════════════════════════ */

export const WORDPRESS_SERVICES: readonly PlatformService[] = [
  /* ── 01 Consulting ──────────────────────────────────────────── */
  {
    platform: 'wordpress',
    slug: 'consulting',
    label: 'WordPress consulting',
    eyebrow: 'Yuvraj Raulji | WordPress consulting',
    h1: ['WordPress is easy to start,', 'and easy to start badly.'],
    lede:
      'Built deliberately, with a real content model and a caching strategy, WordPress runs marketing sites and publishing operations at a cost no other platform matches. Built by accumulation, it becomes forty plugins and a security incident. The difference is almost always decisions made in the first month by someone who was in a hurry.',
    cta: 'Discuss a WordPress decision',
    title: 'WordPress Consulting Services | Yuvraj Raulji',
    description:
      'Independent WordPress consulting: content modelling, theme and block architecture, plugin strategy, hosting and an honest read on custom against off-the-shelf.',

    primaryKeyword: 'wordpress consulting services',
    secondaryKeywords: [
      'wordpress consultant',
      'wordpress architecture review',
      'wordpress content modelling',
      'wordpress technical audit',
    ],
    searchIntent: 'Commercial. An organisation whose WordPress site has become harder to change than it should be.',
    audience: 'Marketing and technology leads responsible for a site that publishes, and for the team that has to run it.',
    purpose: 'Own the WordPress advisory query, and keep it clear of WooCommerce consulting.',
    entities: ['WordPress', 'WooCommerce', 'Technology Consultant', 'Yuvraj Raulji'],

    quickAnswer: {
      question: 'What does a WordPress consultant do?',
      answer:
        'WordPress consulting is advice on the decisions that determine whether a site stays workable: how content should be modelled rather than dumped into page builders, whether the theme should be block-based or classic, which plugins are load-bearing and which are technical debt with a subscription, how hosting and caching should be arranged, and whether a requirement is worth a custom plugin or belongs off the shelf. The most valuable output is usually a content model, because that is the decision everything else inherits and the one nobody made deliberately.',
      bestFor: [
        'A site that has become slow to change',
        'Content trapped in page builders nobody can restructure',
        'Deciding between a rebuild and a rescue',
        'Planning a site that has to last five years',
      ],
    },

    boundary: {
      body:
        'This page is about the site: content, templates, plugins, hosting and how the whole thing is put together. If there is a store on it and the question is the catalogue, the checkout or the commerce plugin stack, that is WooCommerce rather than WordPress.',
      href: '/woocommerce/consulting/',
      label: 'WooCommerce consulting, for the store rather than the site',
    },

    problems: [
      {
        symptom: 'The content has no model, only pages',
        impact:
          'Everything is a page built in an editor, so nothing can be listed, filtered, reused or moved. Every new requirement becomes a manual rebuild, and the archive gets less useful as it grows.',
      },
      {
        symptom: 'The page builder became the architecture',
        impact:
          'Layout, content and styling are fused in the database. Redesigning means re-entering the content, and leaving the builder is priced as a full rebuild because it effectively is one.',
      },
      {
        symptom: 'Forty plugins, and nobody chose them together',
        impact:
          'Overlapping features, abandoned authors, and a combination that defines the site\'s real behaviour. Each update is a risk nobody can size, so updates get deferred and the exposure compounds.',
      },
      {
        symptom: 'Nobody can say whether to rebuild or rescue',
        impact:
          'The decision is made by whoever is most frustrated. Rebuilding a site whose problem is its content model just recreates the problem with better typography.',
      },
    ],

    approach: [
      {
        num: '01',
        title: 'Start from what gets published',
        body:
          'Who publishes, how often, what kinds of thing, and what has to be reusable or listable. This is the input to the content model, and it is the step that gets replaced by a design conversation.',
      },
      {
        num: '02',
        title: 'Model the content properly',
        body:
          'Post types, taxonomies, fields and blocks, so content is structured data rather than markup in a database. Everything that follows, templates, search, feeds, reuse, an eventual headless front end, depends on this being right.',
      },
      {
        num: '03',
        title: 'Read the plugin stack as a system',
        body:
          'What is load-bearing, what overlaps, what is abandoned, and what nothing uses. On WordPress the plugin list quietly becomes the architecture, so it deserves reviewing as one.',
      },
      {
        num: '04',
        title: 'Decide custom against off-the-shelf',
        body:
          'Build where the requirement is specific to the organisation; buy where it is not. A bought plugin bent into an unusual shape becomes the thing that blocks every future update.',
      },
      {
        num: '05',
        title: 'Answer rebuild or rescue directly',
        body:
          'With the reasoning attached. A rescue is often possible and much cheaper, and a rebuild that does not fix the content model will produce the same site again in three years.',
      },
    ],

    capabilities: [
      {
        group: 'Content architecture',
        items: ['Post types and taxonomies', 'Custom fields', 'Block and pattern design', 'Reuse and listing strategy'],
      },
      {
        group: 'Build decisions',
        items: ['Block theme against classic', 'Page builder exit', 'Custom plugin against off-the-shelf', 'Multisite fit'],
      },
      {
        group: 'Review',
        items: ['Plugin stack audit', 'Theme and template review', 'Hosting and caching read', 'Rebuild or rescue assessment'],
      },
      {
        group: 'Planning',
        items: ['Phasing and sequencing', 'Editorial workflow design', 'Ownership model', 'Second opinion on a proposal'],
      },
    ],

    outcomes: [
      {
        label: 'A content model the site can grow into',
        body:
          'Structured content is what makes a site listable, reusable, searchable and eventually headless. It is the decision with the longest reach and the one most often skipped in favour of choosing a theme.',
      },
      {
        label: 'A rescue instead of a rebuild, where that is honest',
        body:
          'Many sites described as needing a rebuild need a content model, a plugin cull and a caching fix. That is a fraction of the cost, and recommending it is the point of independent advice.',
      },
    ],
    outcomesNote:
      'No measured figure is quoted here. None of the six builds on the work record is published as a WordPress case, though the record includes custom builds, bespoke themes, plugin development and production provisioning on AWS. Borrowing a number from the Magento work would be dishonest.',

    faqs: [
      {
        q: 'Should we use a page builder?',
        a: 'For a small site with one or two editors, they earn their place. For a site that has to last, they fuse layout, content and styling in the database, which means a redesign becomes a re-entry of every page. Native blocks with a designed pattern library get most of the flexibility without that trap.',
      },
      {
        q: 'How many plugins should a WordPress site have?',
        a: 'The count matters less than what each does and who maintains it. Thirty well-chosen plugins can be healthier than twelve where two overlap and one has been abandoned for years. The question worth asking is which could be removed today without anyone noticing.',
      },
      {
        q: 'Should we rebuild or fix what we have?',
        a: 'Fix it if the content model is sound and the problems are performance, plugins or templates, which is more often the case than agencies suggest. Rebuild when the content is trapped in a structure that cannot be restructured, because that is the one problem a rescue cannot solve.',
      },
      {
        q: 'Is WordPress still a serious choice?',
        a: 'For content-led sites and publishing operations, yes, and the cost comparison is not close. Its reputation problems come from how easy it is to assemble badly rather than from its ceiling. Built deliberately it runs large publishing operations, and it can be run headless where the front end needs its own release cycle.',
      },
      {
        q: 'Do we need custom development or will plugins do?',
        a: 'Plugins for anything generic, custom for anything that encodes how your organisation actually works. The failure mode is buying a plugin for a specific requirement and configuring it into a shape its author never intended, which is where the update risk comes from.',
      },
    ],

    cases: ['manufacturing'],
    casesNote: 'A content-led brand platform built for discovery and enquiry, which is the shape of site this work applies to.',
    posts: ['magento2-seo-technical-audit', 'cro-double-conversion'],

    related: [
      {
        href: '/wordpress/',
        label: 'WordPress builds, performance and infrastructure',
        note: 'The parent page: what WordPress does well, and how it goes wrong.',
      },
      {
        href: '/woocommerce/consulting/',
        label: 'WooCommerce consulting, for the store rather than the site',
        note: 'Catalogue, checkout and the commerce plugin layer.',
      },
      {
        href: '/wordpress/optimization/',
        label: 'WordPress speed work, if the symptom is performance',
        note: 'Often cheaper than the rebuild it gets mistaken for.',
      },
      {
        href: '/digital-transformation/',
        label: 'Modernising a legacy stack into API-first systems',
        note: 'When the site is one part of a larger technology problem.',
      },
      {
        href: '/headless-commerce/consulting/',
        label: 'Testing whether a decoupled front end would pay',
        note: 'WordPress runs headless well, and rarely needs to.',
      },
      {
        href: '/ai-search/',
        label: 'AI search and being cited by answer engines',
        note: 'What a real content model makes possible, and a page builder does not.',
      },
    ],
    finalHeadline: ['Rebuild, or fix', 'what is already there?'],
  },

  /* ── 02 Migration ───────────────────────────────────────────── */
  {
    platform: 'wordpress',
    slug: 'migration',
    label: 'WordPress migration',
    eyebrow: 'Yuvraj Raulji | WordPress migration',
    h1: ['Move the site,', 'keep the archive.'],
    lede:
      'Most WordPress migrations are described as a host move and are actually a content move. The files and database copy across in an afternoon; the risk is in the URLs, the media library, the redirects that were already there, and whether the content arrives as content or as markup nobody can restructure afterwards.',
    cta: 'Discuss a WordPress migration',
    title: 'WordPress Migration Services | Yuvraj Raulji',
    description:
      'WordPress migrations done safely: host and domain moves, onto WordPress from another CMS, URL and redirect preservation, media library integrity and cutover.',

    primaryKeyword: 'wordpress migration services',
    secondaryKeywords: [
      'wordpress site migration',
      'migrate to wordpress',
      'wordpress host migration',
      'wordpress domain change',
    ],
    searchIntent: 'Commercial. An organisation moving a WordPress site between hosts, domains or platforms.',
    audience: 'Marketing and technology leads for whom the content archive is the asset at risk.',
    purpose: 'Own the WordPress site-move query, distinct from a WooCommerce store move.',
    entities: ['WordPress', 'WooCommerce', 'Technical SEO'],

    quickAnswer: {
      question: 'What is involved in a WordPress migration?',
      answer:
        'A WordPress migration moves a site between hosts, onto a new domain, or onto WordPress from another CMS. Copying files and the database is the routine part, and it is not where sites get damaged. The risk sits in URL continuity, the redirects that already existed and are easy to lose, a media library whose paths are hardcoded in content, and, on a move from another CMS, whether content arrives as structured posts and fields or as one block of markup that can never be restructured again.',
      bestFor: [
        'Moving off hosting that has become the constraint',
        'A domain or brand change with an archive to protect',
        'Coming onto WordPress from another CMS',
        'Consolidating several sites into one install',
      ],
    },

    boundary: {
      body:
        'This page covers the site: files, database, content, media, hosting and domains. If there is a WooCommerce store on it, products, orders and customers need their own plan, and doing both at once is how attribution gets lost when something goes wrong.',
      href: '/woocommerce/migration/',
      label: 'WooCommerce migration, for the store data',
    },

    problems: [
      {
        symptom: 'The existing redirects are lost in the move',
        impact:
          'Years of accumulated redirects live in a plugin, a server config or an htaccess file nobody inventoried. Losing them breaks links that were already working, which is damage the migration created rather than inherited.',
      },
      {
        symptom: 'Media paths are hardcoded in content',
        impact:
          'Absolute URLs to the old domain sit inside post content and serialised options. A naive find and replace corrupts the serialised data, and the images break in places nobody checks.',
      },
      {
        symptom: 'Content arrives as markup instead of content',
        impact:
          'Migrating from another CMS into single blobs of HTML means nothing can be listed, filtered or restructured afterwards. The archive technically moved and stopped being an asset.',
      },
      {
        symptom: 'The move happens without a rehearsal',
        impact:
          'The first time the process runs is on the live site, with DNS already changing. Anything that only fails on real data fails in front of the audience.',
      },
    ],

    approach: [
      {
        num: '01',
        title: 'Inventory what exists, including the redirects',
        body:
          'Content, media, users, plugins, cron jobs, and every redirect already in place across plugins, htaccess and server config. The redirect layer is the part most often discovered after it is gone.',
      },
      {
        num: '02',
        title: 'Decide the content structure on arrival',
        body:
          'On a move from another CMS, what becomes a post type, a taxonomy, a field or a block. Content that lands as one markup blob is content that cannot be restructured later, which quietly ends its usefulness.',
      },
      {
        num: '03',
        title: 'Handle URLs and media properly',
        body:
          'Serialisation-safe replacement rather than a plain find and replace, a full redirect map where paths change, and verification that media resolves from content as well as from the library.',
      },
      {
        num: '04',
        title: 'Rehearse on real data',
        body:
          'The whole migration, end to end, on a copy of the production database, with the result checked rather than glanced at. The live run should be a repeat.',
      },
      {
        num: '05',
        title: 'Cut over with DNS planned',
        body:
          'TTLs lowered ahead of time, a read-only or low-traffic window agreed, and a rollback written down. The technical move is minutes; the propagation is the part people forget to plan.',
      },
    ],

    capabilities: [
      {
        group: 'Moves',
        items: ['Host to host', 'Domain change', 'Another CMS to WordPress', 'Multisite consolidation'],
      },
      {
        group: 'Content',
        items: ['Post type and taxonomy mapping', 'Field and block structure', 'Author and date integrity', 'Media library transfer'],
      },
      {
        group: 'Continuity',
        items: ['Existing redirect inventory', 'Redirect mapping', 'Serialisation-safe URL replacement', 'Sitemap and canonical checks'],
      },
      {
        group: 'Cutover',
        items: ['Rehearsal on production data', 'DNS and TTL planning', 'Rollback path', 'Post-move verification'],
      },
    ],

    outcomes: [
      {
        label: 'The archive arrives usable, not just present',
        body:
          'Content that lands as structured posts with fields and taxonomies stays listable, filterable and reusable. Content that lands as markup has technically migrated and has stopped being an asset.',
      },
      {
        label: 'Links that already worked keep working',
        body:
          'Preserving the redirects that were already in place is the least glamorous part of a migration and the one whose absence is most visible afterwards, because it breaks things that were not broken before.',
      },
    ],
    outcomesNote:
      'No traffic figure is published here. None of the six builds on the work record is published as a WordPress case, and the migrations behind this experience belong to the organisations that ran them.',

    faqs: [
      {
        q: 'Will moving hosts affect our search rankings?',
        a: 'It should not, if the URLs stay the same, the existing redirects come with you and the new host is not slower. Rankings move when redirects are lost, when media stops resolving, or when the move is combined with a redesign and nobody can tell afterwards which change caused what.',
      },
      {
        q: 'What is the safest way to change domain?',
        a: 'A complete one-hop redirect map from every old URL to its new equivalent, serialisation-safe replacement of internal links and media paths, canonicals updated, both properties verified in Search Console, and the old domain kept and redirecting rather than allowed to lapse.',
      },
      {
        q: 'How long does a WordPress migration take?',
        a: 'The copy is usually hours. The timeline is set by the inventory, the redirect work and, on a move from another CMS, deciding how content maps onto post types and fields. Content mapping is nearly always the longest part and the one that gets estimated as if it were the copy.',
      },
      {
        q: 'Can we migrate without downtime?',
        a: 'Close to it. The site can be prepared and verified on the new host before DNS changes, with TTLs lowered in advance so propagation is short. The usual practical constraint is avoiding content changes during the window rather than the site being unavailable.',
      },
      {
        q: 'What about the store on the same site?',
        a: 'It needs its own plan, because products, orders and customers keep changing while a site migration is prepared. Sequencing the two is safer than combining them, since a combined move makes it impossible to attribute a problem to either.',
      },
    ],

    cases: ['manufacturing'],
    casesNote: 'A content-led platform where the archive and its discoverability were the point of the build.',
    posts: ['magento2-seo-technical-audit', 'aws-magento2-server-setup'],

    related: [
      {
        href: '/wordpress/',
        label: 'WordPress builds, performance and infrastructure',
        note: 'The parent page, including production hosting on AWS.',
      },
      {
        href: '/woocommerce/migration/',
        label: 'WooCommerce migration, for the store data',
        note: 'Products, orders and customers, planned separately.',
      },
      {
        href: '/wordpress/consulting/',
        label: 'WordPress consulting, for the content model on arrival',
        note: 'The decision that determines whether the archive stays useful.',
      },
      {
        href: '/wordpress/optimization/',
        label: 'WordPress speed work, once the site has landed',
        note: 'A new host is a starting position, not a result.',
      },
      {
        href: '/blog/magento2-seo-technical-audit/',
        label: 'The technical SEO audit framework, applied to a move',
        note: 'Redirects, canonicals and crawl budget, checked rather than assumed.',
      },
      {
        href: '/blog/aws-magento2-server-setup/',
        label: 'Production hosting on AWS, written out',
        note: 'EC2, RDS, S3 and Nginx, which is where these sites usually land.',
      },
    ],
    finalHeadline: ['What breaks when', 'the site moves?'],
  },

  /* ── 03 Optimization ────────────────────────────────────────── */
  {
    platform: 'wordpress',
    slug: 'optimization',
    label: 'WordPress optimisation',
    eyebrow: 'Yuvraj Raulji | WordPress optimisation',
    h1: ['Caching hides the problem.', 'It does not fix it.'],
    lede:
      'A caching plugin makes a slow WordPress site look fast to anyone testing the homepage, which is why so many sites have one and are still slow. Underneath, the same page is being built from an options table nobody has cleaned, a theme loading assets it does not use, and plugins running on every request regardless of relevance.',
    cta: 'Discuss WordPress performance',
    title: 'WordPress Speed Optimization | Yuvraj Raulji',
    description:
      'WordPress performance work: page and object caching done properly, database and autoload cleanup, theme and asset weight, hosting fit and Core Web Vitals.',

    primaryKeyword: 'wordpress speed optimization',
    secondaryKeywords: [
      'wordpress performance optimization',
      'slow wordpress site',
      'wordpress core web vitals',
      'wordpress caching setup',
    ],
    searchIntent: 'Commercial. A site owner whose WordPress site is slow and who has already tried a caching plugin.',
    audience: 'Marketing leads losing rankings or attention to load time on a content-led site.',
    purpose: 'Own the WordPress site-speed query, leaving cart and checkout speed to WooCommerce.',
    entities: ['WordPress', 'WooCommerce', 'Core Web Vitals', 'Technical SEO'],

    quickAnswer: {
      question: 'How do you actually speed up a WordPress site?',
      answer:
        'In order of usual impact: get page caching and object caching configured properly rather than merely installed, clean the database, particularly autoloaded options and accumulated transients, cut the theme and plugin assets that load on every page whether or not they are used, size and convert images properly, and only then tune the host. A caching plugin makes an uncached site look fast in a test and does nothing for logged-in users, dynamic pages or the work happening behind the cache, which is why sites with one are still slow.',
      bestFor: [
        'A site that is fast in tests and slow in use',
        'Core Web Vitals failing in field data',
        'A large content archive with slow queries',
        'Admin and editing that has become painful',
      ],
    },

    boundary: {
      body:
        'This page covers the site: caching, database, theme, assets and hosting. Cart, checkout and account pages are excluded from page caching by design and need commerce-specific work, so they belong to the store.',
      href: '/woocommerce/optimization/',
      label: 'WooCommerce performance, for cart and checkout',
    },

    problems: [
      {
        symptom: 'There is a caching plugin and the site is still slow',
        impact:
          'Installed and largely unconfigured, so it caches the homepage for logged-out visitors and little else. The test looks fine and the actual experience does not, which delays finding the real cause.',
      },
      {
        symptom: 'The options table has grown for years',
        impact:
          'Autoloaded options are read on every single request, and plugins add to them and rarely clean up. It is invisible in every front-end tool and it is often the largest single cost on an older site.',
      },
      {
        symptom: 'Every plugin loads on every page',
        impact:
          'Assets and queries run where they do nothing. The homepage carries the cost of a form plugin, a slider, and an analytics wrapper that only matter on three pages.',
      },
      {
        symptom: 'The admin is slower than the site',
        impact:
          'Editors work around it and publishing slows down. It is also a reliable signal of database and query problems that the cache is hiding from visitors but not from the people using it.',
      },
    ],

    approach: [
      {
        num: '01',
        title: 'Measure the field, and measure logged in',
        body:
          'Real user data by template, plus the experience of an editor, who never benefits from page caching. Both matter, and only one of them shows up in the tools people usually run.',
      },
      {
        num: '02',
        title: 'Configure caching properly',
        body:
          'Page caching for anonymous traffic and object caching so uncached requests stop recomputing the same queries. Installed is not configured, and object caching is the layer most sites are missing entirely.',
      },
      {
        num: '03',
        title: 'Clean the database',
        body:
          'Autoloaded options, orphaned postmeta, accumulated transients and missing indexes on a large archive. Unglamorous, invisible to front-end tools, and frequently the biggest single gain available.',
      },
      {
        num: '04',
        title: 'Cut what loads on every page',
        body:
          'Theme assets, plugin scripts and styles restricted to where they do something. Removal beats deferral, and on most sites there is something to remove outright.',
      },
      {
        num: '05',
        title: 'Then images, fonts and hosting',
        body:
          'Sizing, modern formats, font loading and layout stability, and a hosting arrangement matched to the traffic. Hosting last, because moving unoptimised work to a faster server is a monthly cost rather than a fix.',
      },
    ],

    capabilities: [
      {
        group: 'Caching',
        items: ['Page cache configuration', 'Object caching', 'CDN setup', 'Cache exclusion rules'],
      },
      {
        group: 'Database',
        items: ['Autoload cleanup', 'Transient hygiene', 'Query and index review', 'Archive-scale tuning'],
      },
      {
        group: 'Front end',
        items: ['Conditional asset loading', 'Theme weight', 'Image pipeline', 'Font loading', 'Layout stability'],
      },
      {
        group: 'Infrastructure',
        items: ['Hosting fit', 'PHP and OPcache tuning', 'Nginx configuration', 'AWS provisioning'],
      },
    ],

    outcomes: [
      {
        label: 'Fast without the cache, then cached',
        body:
          'The durable result is a site that does less work per request, so caching becomes an accelerator rather than a disguise. It is also what makes the admin and logged-in experience improve, which caching alone never does.',
      },
      {
        label: 'Core Web Vitals measured where they count',
        body:
          'Field data by template rather than a lab score, so the work targets the pages real visitors arrive on and the conditions they arrive under.',
      },
    ],
    outcomesNote:
      'The 60% site speed figure published on this site came from caching, CDN and database work on a Magento platform and belongs to that page. No WordPress build on the record has a published measurement, so none is claimed here.',

    faqs: [
      {
        q: 'Why is my WordPress site still slow with a caching plugin?',
        a: 'Because page caching only helps anonymous visitors on cacheable pages. Logged-in users, dynamic pages and everything behind the cache still do the full work, and if that work is heavy the cache is hiding the problem rather than solving it. Object caching and database cleanup are usually what is missing.',
      },
      {
        q: 'What is autoloaded options bloat?',
        a: 'WordPress loads every option marked autoload on every single request. Plugins add to that table and frequently never clean up, so an older site can be reading a large amount of unnecessary data before it renders anything. It is invisible to front-end tools and is often the single largest cost on a mature site.',
      },
      {
        q: 'Will better hosting fix it?',
        a: 'It raises the floor and does not change the work. If the site is slow because of autoload bloat, unconditional asset loading and missing object caching, faster hardware does the same work more quickly and you pay for it every month. Fix the work first, then match the host to it.',
      },
      {
        q: 'How many plugins is too many for speed?',
        a: 'What matters is how many run on a given request. A plugin that only acts on its own template costs nothing elsewhere; one that loads scripts and queries globally costs on every page. The audit worth doing is per-page, not a count.',
      },
      {
        q: 'Does speed still matter for SEO?',
        a: 'It is a ranking input and a genuine one at the slow end, but the larger effect on a content site is usually engagement: people leave slow pages before they read them. Core Web Vitals from field data is the measure worth watching, because that is what Google uses and what visitors experience.',
      },
    ],

    cases: ['manufacturing'],
    casesNote: 'A content-led platform built for discovery, where page speed and technical SEO were part of the same brief.',
    posts: ['aws-magento2-server-setup', 'magento2-seo-technical-audit'],

    related: [
      {
        href: '/wordpress/',
        label: 'WordPress builds, performance and infrastructure',
        note: 'The parent page, including production hosting on AWS.',
      },
      {
        href: '/woocommerce/optimization/',
        label: 'WooCommerce performance, for cart and checkout',
        note: 'The pages page caching cannot reach.',
      },
      {
        href: '/wordpress/maintenance/',
        label: 'WordPress maintenance, which is what holds a speed gain',
        note: 'Plugin updates give performance back if nothing watches.',
      },
      {
        href: '/wordpress/consulting/',
        label: 'WordPress consulting, if speed is a symptom of the build',
        note: 'Some slowness is a content model problem wearing a performance costume.',
      },
      {
        href: '/blog/aws-magento2-server-setup/',
        label: 'Nginx, PHP-FPM and Redis tuning on AWS, written out',
        note: 'The infrastructure layer, in detail.',
      },
      {
        href: '/magento/performance/',
        label: 'Magento performance, where the same argument scales further',
        note: 'Varnish, Redis and query tuning at catalogue scale.',
      },
    ],
    finalHeadline: ['Is your site fast,', 'or just cached?'],
  },

  /* ── 04 Integrations ────────────────────────────────────────── */
  {
    platform: 'wordpress',
    slug: 'integrations',
    label: 'WordPress integrations',
    eyebrow: 'Yuvraj Raulji | WordPress integrations',
    h1: ['The enquiry that never', 'reached the CRM.'],
    lede:
      'WordPress integration failures are quiet by nature. A form plugin posts to a CRM, the endpoint changes, the plugin keeps returning a success message to the visitor, and nobody finds out until someone asks why the pipeline looks thin. The fix is not a better plugin. It is a boundary that fails loudly.',
    cta: 'Discuss a WordPress integration',
    title: 'WordPress API Integration | Yuvraj Raulji',
    description:
      'WordPress integration with CRM, marketing and business systems: the REST API, webhooks, form and lead capture reliability, retries and failure visibility.',

    primaryKeyword: 'wordpress api integration',
    secondaryKeywords: [
      'wordpress crm integration',
      'wordpress rest api development',
      'wordpress webhook integration',
      'wordpress form integration',
    ],
    searchIntent: 'Commercial. An organisation whose WordPress site has to exchange data with business systems.',
    audience: 'Marketing operations and technology leads who depend on the site feeding something downstream.',
    purpose: 'Own the WordPress integration query, kept clear of WooCommerce commerce data.',
    entities: ['WordPress', 'WooCommerce', 'AI Automation', 'Digital Transformation'],

    quickAnswer: {
      question: 'How does WordPress integrate with a CRM or business system?',
      answer:
        'WordPress integrates through its REST API, webhooks and scheduled tasks, usually with a queue or middleware so the site is not making blocking calls during a page request. The most common integration on a WordPress site is lead capture, and it is also the most commonly broken, because form plugins report success to the visitor whether or not the downstream system accepted the submission. A reliable integration stores the submission locally first, delivers it asynchronously, retries on failure, and makes a failure visible to a person rather than to a log file.',
      bestFor: [
        'Enquiry and lead flow into a CRM',
        'Content syndicated to or from other systems',
        'Membership, gating or single sign-on',
        'Replacing several overlapping connector plugins',
      ],
    },

    boundary: {
      body:
        'This page covers site data: enquiries, content, users and marketing systems. If the data crossing the boundary is products, stock, orders or invoices, that is commerce and it has different failure consequences.',
      href: '/woocommerce/integrations/',
      label: 'WooCommerce integrations, for commerce data',
    },

    problems: [
      {
        symptom: 'Enquiries stop arriving and nothing says so',
        impact:
          'The form still shows a thank-you page, so visitors believe they made contact and the business believes demand fell. It is the most expensive silent failure on a marketing site.',
      },
      {
        symptom: 'Integration calls happen during the page request',
        impact:
          'A slow or unavailable third-party system makes the site slow or the submission fail. The visitor pays for an availability problem that has nothing to do with them.',
      },
      {
        symptom: 'One connector plugin per system',
        impact:
          'Each with its own authentication, error handling and idea of what a failure is. Nobody owns the whole picture, and the debugging path differs for every one of them.',
      },
      {
        symptom: 'Submissions exist only in the destination',
        impact:
          'If the delivery failed, the data is gone. Storing the submission locally first costs almost nothing and is the difference between a retry and a lost enquiry.',
      },
    ],

    approach: [
      {
        num: '01',
        title: 'Store first, deliver second',
        body:
          'Every submission is persisted locally before any external call. This single decision converts most lost-lead incidents into a replay, and it is usually missing.',
      },
      {
        num: '02',
        title: 'Move delivery off the request',
        body:
          'Queued or scheduled delivery so a slow CRM never slows the site and never fails a visitor. WordPress has the scheduling primitives; the common mistake is calling out inline because it is simpler.',
      },
      {
        num: '03',
        title: 'Define failure and retry',
        body:
          'What counts as a failure, how many retries, with what backoff, and where it goes when it finally gives up. A dead letter that a person actually sees is the part that matters.',
      },
      {
        num: '04',
        title: 'Consolidate the connectors',
        body:
          'One integration layer with consistent authentication, logging and error handling instead of a plugin per system. Fewer moving parts and one debugging path rather than five.',
      },
      {
        num: '05',
        title: 'Alert a person, not a log',
        body:
          'Delivery failures and a stalled queue need to reach someone who can act. An integration that logs failures nobody reads is functionally an integration with no error handling.',
      },
    ],

    capabilities: [
      {
        group: 'Systems',
        items: ['CRM', 'Marketing automation', 'Analytics and attribution', 'Membership and SSO', 'Internal business systems'],
      },
      {
        group: 'Interfaces',
        items: ['WordPress REST API', 'Custom endpoints', 'Webhooks', 'WP-Cron and queued tasks'],
      },
      {
        group: 'Lead capture',
        items: ['Form reliability', 'Local persistence', 'Spam and validation', 'Consent and data handling'],
      },
      {
        group: 'Assurance',
        items: ['Retry and dead letter', 'Delivery monitoring', 'Failure alerting', 'Connector consolidation'],
      },
    ],

    outcomes: [
      {
        label: 'Enquiries that cannot silently disappear',
        body:
          'Stored locally, delivered asynchronously, retried on failure and alerted when they finally fail. On a marketing site this is the highest-value reliability work available and it is rarely in scope.',
      },
      {
        label: 'One integration path instead of several',
        body:
          'Consolidating connector plugins gives one place to authenticate, one place to log and one place to debug, which is what makes a failure a task rather than an investigation.',
      },
    ],
    outcomesNote:
      'No measured figure is published here. The automation figures on this site came from a Magento B2B platform and belong to that page; no WordPress integration on the record has a published measurement.',

    faqs: [
      {
        q: 'Why do our form submissions not always reach the CRM?',
        a: 'Usually because the form plugin treats sending as fire and forget: it shows the visitor a thank-you page regardless of whether the CRM accepted the submission. Storing every submission locally first and delivering it asynchronously with retries turns a lost lead into a replayable one.',
      },
      {
        q: 'Should integrations run on WP-Cron?',
        a: 'WP-Cron is triggered by traffic, so on a quiet site scheduled work runs late or not at all. For anything that matters, trigger it from a real system cron and treat WP-Cron as a convenience rather than a guarantee.',
      },
      {
        q: 'Plugin or custom integration?',
        a: 'A plugin is right when it covers the whole flow and your requirements match its assumptions. Build when several connectors already overlap, when the mapping is specific to your business, or when you need failures to be visible and recoverable on your terms rather than the vendor\'s.',
      },
      {
        q: 'Is the WordPress REST API safe to expose?',
        a: 'It is safe when you are deliberate about it: restrict what is exposed, authenticate properly, rate limit, and do not assume default endpoints are harmless. Most problems come from leaving the surface at its default rather than from the API itself.',
      },
      {
        q: 'How do we know an integration is still working?',
        a: 'Monitor delivery rather than errors. A drop to zero submissions looks identical to a quiet week in a log file, so the useful alert is on the absence of expected traffic, not just on failures that were recorded.',
      },
    ],

    cases: ['manufacturing'],
    casesNote: 'A brand platform built for discovery and enquiry, where the enquiry path is the commercial outcome.',
    posts: ['ai-ecommerce-revenue-2025', 'magento2-seo-technical-audit'],

    related: [
      {
        href: '/wordpress/',
        label: 'WordPress builds, performance and infrastructure',
        note: 'The parent page, including custom plugin development.',
      },
      {
        href: '/woocommerce/integrations/',
        label: 'WooCommerce integrations, for commerce data',
        note: 'Products, stock and orders, where failure costs differently.',
      },
      {
        href: '/ai-automation/',
        label: 'AI automation for enquiry handling and routing',
        note: 'What becomes possible once the lead data is reliable.',
      },
      {
        href: '/digital-transformation/',
        label: 'Modernising legacy stacks into API-first systems',
        note: 'The same boundary argument across the business.',
      },
      {
        href: '/wordpress/maintenance/',
        label: 'WordPress maintenance, and monitoring the integration',
        note: 'A connector nobody watches fails quietly by design.',
      },
      {
        href: '/magento/integrations/',
        label: 'The contract-first argument at commerce scale',
        note: 'Where the same reasoning meets ERP and PIM boundaries.',
      },
    ],
    finalHeadline: ['How would you know', 'if enquiries stopped?'],
  },

  /* ── 05 Maintenance ─────────────────────────────────────────── */
  {
    platform: 'wordpress',
    slug: 'maintenance',
    label: 'WordPress maintenance',
    eyebrow: 'Yuvraj Raulji | WordPress maintenance',
    h1: ['A WordPress site does not', 'sit still on its own.'],
    lede:
      'WordPress powers a large share of the web, which makes it the most systematically scanned software most organisations run. Nearly every compromised site was running something with a published patch. Maintenance here is unexciting on purpose: updates on a cadence, backups that have actually been restored, and someone who owns the plugin list.',
    cta: 'Discuss ongoing WordPress support',
    title: 'WordPress Maintenance Services | Yuvraj Raulji',
    description:
      'Ongoing WordPress maintenance: core and plugin update cadence, security hardening, tested backups, uptime and error monitoring, and plugin ownership.',

    primaryKeyword: 'wordpress maintenance services',
    secondaryKeywords: [
      'wordpress support services',
      'wordpress care plan',
      'wordpress security hardening',
      'wordpress update management',
    ],
    searchIntent: 'Commercial. An organisation whose WordPress site is business critical and unowned.',
    audience: 'Marketing and operations leads who would not know if the site were compromised.',
    purpose: 'Own the WordPress ongoing-support query, distinct from WooCommerce store maintenance.',
    entities: ['WordPress', 'WooCommerce', 'Technology Consultant'],

    quickAnswer: {
      question: 'What does WordPress maintenance include?',
      answer:
        'WordPress maintenance is core, theme and plugin updates applied on a cadence rather than when something forces it, security hardening covering admin access, file permissions and the login surface, backups that are periodically restored rather than merely scheduled, uptime and error monitoring that reaches a person, and ownership of the plugin list so it does not grow by accumulation. Almost every compromised WordPress site was running a known vulnerability with a patch available, which is why cadence matters more than any individual control.',
      bestFor: [
        'A business-critical site nobody owns technically',
        'Updates deferred because the last one broke something',
        'Backups that have never been restored',
        'Sites where a compromise would go unnoticed',
      ],
    },

    boundary: {
      body:
        'This is the site: core, plugins, hosting, security and backups. If there is a store on it, the update routine has to include a checkout test and the commerce plugin layer needs its own owner, which is a different arrangement.',
      href: '/woocommerce/maintenance/',
      label: 'WooCommerce maintenance, when there is a store to protect',
    },

    problems: [
      {
        symptom: 'Updates are deferred because the last one broke something',
        impact:
          'The gap grows, the exposure compounds, and the eventual update becomes a project. WordPress is scanned constantly, so a deferred security release is a decision with a real risk attached rather than a scheduling preference.',
      },
      {
        symptom: 'Backups are scheduled and have never been restored',
        impact:
          'An untested backup is a belief. The test happens during the incident, and an incomplete database dump is discovered at the worst possible moment.',
      },
      {
        symptom: 'Admin access has accumulated',
        impact:
          'Old accounts, shared logins, no two-factor and a default login path being scanned continuously. Most practical WordPress exposure sits here rather than in application code, and it costs almost nothing to fix.',
      },
      {
        symptom: 'Nobody would notice a compromise',
        impact:
          'Injected content and spam pages can run for months, and the usual first signal is a search engine warning or a customer. By then the cleanup includes reputation as well as files.',
      },
    ],

    approach: [
      {
        num: '01',
        title: 'Establish the current position',
        body:
          'Versions, plugin inventory, admin accounts, hosting, backup state and whether anything is already compromised. On inherited sites this last check is worth doing before anything else.',
      },
      {
        num: '02',
        title: 'Set an update cadence',
        body:
          'Security releases promptly, everything else on a schedule, tested on a staging copy first. Cadence is what keeps each update small enough that nobody is tempted to defer it.',
      },
      {
        num: '03',
        title: 'Harden the obvious surface',
        body:
          'Two-factor on every admin account, removal of accounts nobody uses, file permissions, a login path that is not the default, and disabling file editing from the dashboard. Cheap, and it removes most of the practical exposure.',
      },
      {
        num: '04',
        title: 'Make backups real',
        body:
          'Off-site, versioned, and restored on a schedule to prove they work. A restore rehearsal is the only thing that distinguishes a backup from a scheduled task.',
      },
      {
        num: '05',
        title: 'Monitor what actually fails',
        body:
          'Uptime, PHP errors, file integrity, SSL expiry and search engine warnings, alerting a person. The point is to find a problem before it is reported from outside.',
      },
    ],

    capabilities: [
      {
        group: 'Updates',
        items: ['Core, theme and plugin updates', 'Security release handling', 'Staging-first routine', 'PHP version currency'],
      },
      {
        group: 'Security',
        items: ['Two-factor and account review', 'Login surface hardening', 'File permissions', 'File integrity monitoring'],
      },
      {
        group: 'Recovery',
        items: ['Off-site versioned backups', 'Scheduled restore tests', 'Rollback path', 'Incident response'],
      },
      {
        group: 'Monitoring',
        items: ['Uptime and error alerting', 'SSL expiry', 'Search Console warnings', 'Plugin list review'],
      },
    ],

    outcomes: [
      {
        label: 'The patch gap closed, and kept closed',
        body:
          'The measurable outcome is the distance between the site and current releases, and whether it stays small without anyone pushing. Nearly every compromised WordPress site was running something with a patch already available.',
      },
      {
        label: 'A backup you have actually restored',
        body:
          'The value is not in having backups, which almost everyone does. It is in having restored one recently enough to know it works, which very few have.',
      },
    ],
    outcomesNote:
      'No uptime percentage or response-time commitment is published here. Those are contractual terms depending on the hosting and cover agreed, and no WordPress engagement on the record carries a published measurement.',

    faqs: [
      {
        q: 'How often should WordPress be updated?',
        a: 'Security releases promptly, and everything else on a regular cadence tested against a staging copy. The gap is what creates the danger: a site a month behind updates easily, and a site two years behind is a project that keeps getting postponed.',
      },
      {
        q: 'How do WordPress sites actually get hacked?',
        a: 'Overwhelmingly through known vulnerabilities in outdated plugins and themes, and through weak or excessive admin access. Targeted attacks on custom code exist and are rare by comparison, which is why update cadence and access hardening deliver more security per hour than anything else.',
      },
      {
        q: 'Is managed hosting the same as maintenance?',
        a: 'No. Managed hosting usually covers the server, core updates and backups, which is a good foundation. It does not own your plugin list, test updates against your site, or notice that something was injected into your templates.',
      },
      {
        q: 'How do we know our backups work?',
        a: 'By restoring one, on a schedule, into a staging environment. Until a backup has been restored it is an assumption, and the failure modes, incomplete database dumps, missing uploads, are not visible from the backup log.',
      },
      {
        q: 'What if we already have an in-house team?',
        a: 'Then what is often missing is the routine rather than the capability: a cadence, a staging step, a restore test and an owner for the plugin list. That can be set up and handed over rather than held indefinitely.',
      },
    ],

    cases: ['manufacturing'],
    casesNote: 'A brand platform where the site is the discovery and enquiry channel, so an outage is a commercial event.',
    posts: ['aws-magento2-server-setup', 'magento2-seo-technical-audit'],

    related: [
      {
        href: '/wordpress/',
        label: 'WordPress builds, hardening and production hosting',
        note: 'The parent page, and why these stacks need an owner.',
      },
      {
        href: '/woocommerce/maintenance/',
        label: 'WooCommerce maintenance, when there is a store to protect',
        note: 'Where checkout testing joins the update routine.',
      },
      {
        href: '/wordpress/optimization/',
        label: 'WordPress speed work, and the gain updates give back',
        note: 'Performance erodes with the plugin list if nothing watches.',
      },
      {
        href: '/magento/security/',
        label: 'The same patching argument on a commerce platform',
        note: 'Where the stakes include the payment path.',
      },
      {
        href: '/wordpress/integrations/',
        label: 'WordPress integrations, and the enquiry path worth monitoring',
        note: 'The failure that is silent and commercially expensive.',
      },
      {
        href: '/blog/aws-magento2-server-setup/',
        label: 'Production hosting on AWS, written out',
        note: 'EC2, RDS, S3 and Nginx, the stack these sites run best on.',
      },
    ],
    finalHeadline: ['When did you last', 'restore a backup?'],
  },
];
