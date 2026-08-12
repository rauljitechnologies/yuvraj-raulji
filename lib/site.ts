/**
 * All copy/content previously hardcoded inside app/_html/home.html — either as
 * literal markup or inside Alpine `x-data` blobs. Extracted verbatim.
 */

export const CONTACT = {
  email: 'toyuvrajraulji@gmail.com',
  phoneDisplay: '+91 9898 334 731',
  phoneE164: '+919898334731',
  whatsapp: 'https://wa.me/919898334731?text=Hi%20Yuvraj%2C%20I%27d%20like%20to%20discuss%20a%20project.',
  linkedin: 'https://www.linkedin.com/in/yuvraj-raulji/',
  instagram: 'https://www.instagram.com/iamyuvrajraulji',
  facebook: 'https://www.facebook.com/iamyuvrajraulji',
  location: 'Vadodara, Gujarat, India',
} as const;

export const LEAD_ENDPOINT =
  'https://script.google.com/macros/s/AKfycby7S2OHkpqvM_HdKdivemmw6PGeYkKnH98eH7mw57iZ1gQyb_vENtxoUouQgu6aoK1WRg/exec';

/** GA4 measurement ID. Only loaded in production builds — see app/layout.tsx. */
export const GA_MEASUREMENT_ID = 'G-5JHWRDWD9K';

/** Google Tag Manager container. Production-only, same as GA4. */
export const GTM_CONTAINER_ID = 'GTM-TNKVWXJ5';

export const NAV_LINKS = [
  { label: 'Services', href: '/#expertise' },
  { label: 'Work', href: '/#work' },
  { label: 'Technology', href: '/#technology' },
  { label: 'Blog', href: '/blog' },
] as const;

export const ROTATING_ITEMS = [
  'Luxury E-Commerce Architecture',
  'Magento 2 Commerce',
  'Shopify Brand Stores',
  'AI-Powered Commerce',
  'AWS Infrastructure',
  'SEO & CRO Strategy',
  'WordPress & WooCommerce',
];

export const HERO_CHIPS = [
  { label: 'Magento 2 Expert', pos: 'top-[22%] left-[6%]' },
  { label: 'SEO & CRO Specialist', pos: 'top-[36%] right-[8%]' },
  { label: 'AWS & Server Setup', pos: 'bottom-[28%] left-[8%]' },
  { label: '9+ Years Experience', pos: 'bottom-[18%] right-[7%]' },
];

export const HERO_STATS = [
  { value: '9+', label: 'Years of Craft' },
  { value: '50+', label: 'Brands Built' },
  { value: '15+', label: 'Technologies' },
  { value: '100%', label: 'Precision' },
];

export const MARQUEE_ITEMS = [
  'Magento 2', 'Shopify Plus', 'WordPress', 'Next.js', 'React', 'SEO Optimization',
  'CRO Strategy', 'AWS EC2', 'AWS S3', 'Nginx', 'Redis Cache', 'Varnish',
  'Core Web Vitals', 'GA4', 'GTM', 'Hotjar', 'n8n Automation', 'OpenAI',
  'GraphQL', 'Headless Commerce', 'PHP', 'MySQL', 'Cloudflare',
];

export interface ExpertiseCard {
  icon: string;
  title: string;
  desc: string;
}

export const EXPERTISE: ExpertiseCard[] = [
  {
    icon: '◆',
    title: 'Magento 2 Commerce',
    desc: 'Enterprise Adobe Commerce & Magento 2 architectures — custom modules, multi-store setups, B2B workflows, and scalable performance engineering.',
  },
  {
    icon: '◇',
    title: 'Shopify Plus',
    desc: 'High-growth Shopify Plus ecosystems for premium storefronts, international scaling, theme customization, and conversion-led experiences.',
  },
  {
    icon: '▲',
    title: 'SEO & CRO Optimization',
    desc: 'Technical SEO audits, Core Web Vitals, on-page & schema optimization, GA4 & GTM setup, heatmap analysis, and conversion rate strategies that grow organic revenue.',
  },
  {
    icon: '☁',
    title: 'Server & Cloud Setup',
    desc: 'End-to-end server provisioning on AWS EC2 / RDS / S3, Nginx, Varnish, Redis — including Magento 2, WordPress, and WooCommerce production environments.',
  },
  {
    icon: '⚡',
    title: 'Performance Optimization',
    desc: 'Deep code profiling, caching layers, CDN configuration, image optimization, and database tuning to achieve sub-2-second load times and 90+ PageSpeed scores.',
  },
  {
    icon: '✦',
    title: 'Headless Commerce',
    desc: 'API-first commerce layers using Next.js, GraphQL, composable systems, and PWA Studio for lightning-fast, flexible storefronts.',
  },
  {
    icon: '✧',
    title: 'AI & n8n Automation',
    desc: 'AI agents, n8n & Zapier workflows, GPT integrations, automated reporting, and intelligent systems that eliminate repetitive operations across teams.',
  },
  {
    icon: '⌁',
    title: 'WordPress & WooCommerce',
    desc: 'Custom WordPress development, WooCommerce stores, plugin development, performance tuning, and secure managed hosting on AWS or WP Engine.',
  },
  {
    icon: '●',
    title: 'Digital Transformation',
    desc: 'Strategic modernization roadmaps — replacing legacy stacks with cloud-native, API-first ecosystems that turn technology into a measurable competitive advantage.',
  },
];

export interface WorkSlide {
  cat: string;
  title: string;
  desc: string;
  img: string;
  url: string;
}

export const WORK_SLIDES: WorkSlide[] = [
  {
    cat: 'Headless Commerce · Fashion',
    title: 'Powerlook',
    desc: 'High-performance headless commerce architecture for India’s fastest-growing men’s fashion brand.',
    img: '/assets/case-covers/powerlook-cover.jpg',
    url: 'https://www.rauljitechnologies.com/case-study/powerlook/',
  },
  {
    cat: 'Magento 2 · Marketplace',
    title: 'ShopUnicore',
    desc: 'A scalable Magento 2 platform powering a wide multi-category retail catalogue.',
    img: '/assets/case-covers/shopunicore-cover.jpg',
    url: 'https://www.rauljitechnologies.com/case-study/shopunicore/',
  },
  {
    cat: 'E-Commerce · Health & Fitness',
    title: 'S3Buy',
    desc: 'Online fitness and supplement store delivering authentic sports nutrition at speed.',
    img: '/assets/case-covers/s3buy-cover.jpg',
    url: 'https://www.rauljitechnologies.com/case-study/s3buy/',
  },
  {
    cat: 'Magento 2 · Textiles',
    title: 'Modern Fabrics',
    desc: 'A powerful, flexible Magento 2 commerce build for a premium fabric retailer.',
    img: '/assets/case-covers/modern-fabrics-cover.jpg',
    url: 'https://www.rauljitechnologies.com/case-study/modern-fabrics/',
  },
  {
    cat: 'Shopify · D2C',
    title: 'Future Roots',
    desc: 'India’s most trusted online plant store on Shopify — OTP login, GoKwik one-page checkout, custom PDPs.',
    img: '/assets/case-covers/future-roots-cover.jpg',
    url: 'https://www.rauljitechnologies.com/case-study/future-roots/',
  },
  {
    cat: 'Magento 2 · Fabrics',
    title: 'Regal Fabric Gallery',
    desc: 'High-performance Magento 2 storefront serving fabric customers worldwide.',
    img: '/assets/case-covers/regal-fabric-gallery-cover.jpg',
    url: 'https://www.rauljitechnologies.com/case-study/regal/',
  },
  {
    cat: 'Magento 2 · Luxury Fashion',
    title: 'Africa Fashion House',
    desc: 'A Magento 2 flagship showcasing luxury African fashion collections.',
    img: '/assets/case-covers/africa-fashion-house-cover.jpg',
    url: 'https://www.rauljitechnologies.com/case-study/africa-fashion-house/',
  },
  {
    cat: 'Custom Platform · B2B',
    title: 'Nxtby',
    desc: 'Scalable B2B procurement platform streamlining purchase requests and approvals.',
    img: '/assets/case-covers/nxtby-cover.jpg',
    url: 'https://www.rauljitechnologies.com/case-study/nxtby/',
  },
  {
    cat: 'Web Platform · Manufacturing',
    title: 'Synergy Water Slides',
    desc: 'A modern engineering brand platform — 3× traffic growth and 45% better engagement.',
    img: '/assets/case-covers/synergy-water-slides-cover.jpg',
    url: 'https://www.rauljitechnologies.com/case-study/synergy-water-slides/',
  },
  {
    cat: 'Magento 2 · Industrial Safety',
    title: 'Sure Safety',
    desc: 'Magento 2 commerce for a leading manufacturer of PPE and industrial safety solutions.',
    img: '/assets/case-covers/sure-safety-cover.jpg',
    url: 'https://www.rauljitechnologies.com/case-study/sure-safety/',
  },
  {
    cat: 'Magento 2 · Grocery',
    title: 'Al Jazira Supermarket',
    desc: 'Scalable Magento 2 grocery commerce serving thousands of supermarket products online.',
    img: '/assets/case-covers/al-jazira-supermarket-cover.jpg',
    url: 'https://www.rauljitechnologies.com/case-study/al-jazira-supermarket/',
  },
];

export const WORK_METRICS = [
  { count: 42, suffix: '%', label: 'Performance Lift' },
  { count: 9, suffix: '+ Yrs', label: 'Commerce Experience' },
  { count: 50, suffix: '+', label: 'Projects Delivered' },
];

export type TechIcon = 'cart' | 'activity' | 'code' | 'lock' | 'bars' | 'orbit';

export interface TechGroup {
  icon: TechIcon;
  title: string;
  sub: string;
  level: 'Expert' | 'Advanced';
  /** `strong: false` renders the dimmed dot + dimmed label variant. */
  items: { label: string; strong: boolean }[];
}

export const TECH_GROUPS: TechGroup[] = [
  {
    icon: 'cart',
    title: 'Commerce',
    sub: 'Platforms',
    level: 'Expert',
    items: [
      { label: 'Magento 2 / Adobe Commerce', strong: true },
      { label: 'Shopify & Shopify Plus', strong: true },
      { label: 'WordPress & WooCommerce', strong: true },
      { label: 'Headless Commerce', strong: false },
      { label: 'Multi-store Architecture', strong: false },
    ],
  },
  {
    icon: 'activity',
    title: 'Cloud &',
    sub: 'Infrastructure',
    level: 'Expert',
    items: [
      { label: 'AWS (EC2, S3, CloudFront)', strong: true },
      { label: 'Nginx / Apache', strong: true },
      { label: 'Redis & Varnish Cache', strong: true },
      { label: 'MySQL / MariaDB', strong: true },
      { label: 'Elasticsearch / OpenSearch', strong: false },
    ],
  },
  {
    icon: 'code',
    title: 'Frontend',
    sub: '& UI Development',
    level: 'Advanced',
    items: [
      { label: 'Next.js / React', strong: true },
      { label: 'Tailwind CSS', strong: true },
      { label: 'Alpine.js / JavaScript', strong: true },
      { label: 'TypeScript', strong: false },
      { label: 'HTML5 / CSS3 / SCSS', strong: false },
    ],
  },
  {
    icon: 'lock',
    title: 'AI &',
    sub: 'Automation',
    level: 'Advanced',
    items: [
      { label: 'OpenAI / GPT-4', strong: true },
      { label: 'Claude AI (Anthropic)', strong: true },
      { label: 'n8n Automation', strong: true },
      { label: 'Python / API Integration', strong: false },
      { label: 'Prompt Engineering', strong: false },
    ],
  },
  {
    icon: 'bars',
    title: 'SEO &',
    sub: 'Analytics',
    level: 'Expert',
    items: [
      { label: 'Google Analytics 4 / GA4', strong: true },
      { label: 'Google Search Console', strong: true },
      { label: 'Core Web Vitals / CRO', strong: true },
      { label: 'Ahrefs / SEMrush', strong: false },
      { label: 'GTM / Tag Management', strong: false },
    ],
  },
  {
    icon: 'orbit',
    title: 'DevOps',
    sub: '& Tools',
    level: 'Advanced',
    items: [
      { label: 'Git / GitHub', strong: true },
      { label: 'Docker / CI/CD', strong: true },
      { label: 'Cloudflare CDN / SSL', strong: true },
      { label: 'Linux Server Admin', strong: false },
      { label: 'Composer / CLI Tools', strong: false },
    ],
  },
];

export interface Industry {
  t: string;
  d: string;
  desc: string;
  img: string;
}

export const INDUSTRIES: Industry[] = [
  {
    t: 'Luxury Retail',
    d: 'D2C · Multi-store · Premium',
    desc: 'Flagship digital boutiques and multi-store premium retail experiences engineered for desire.',
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80',
  },
  {
    t: 'Fashion & Apparel',
    d: 'B2C · Shopify · Magento',
    desc: 'High-conversion storefronts for fashion labels across Shopify and Magento.',
    img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=80',
  },
  {
    t: 'Manufacturing',
    d: 'B2B · ERP · Wholesale',
    desc: 'ERP-connected B2B commerce and wholesale ordering platforms built for scale.',
    img: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=1400&q=80',
  },
  {
    t: 'Healthcare',
    d: 'Clinics · Pharma · Wellness',
    desc: 'Compliant digital platforms for clinics, pharma, and wellness brands.',
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80',
  },
  {
    t: 'Real Estate',
    d: 'Listings · CRM · Portals',
    desc: 'Property portals, listing engines, and CRM-driven lead generation systems.',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=80',
  },
  {
    t: 'Automotive',
    d: 'Dealers · Parts · Booking',
    desc: 'Dealer platforms, parts catalogues, and seamless service booking systems.',
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80',
  },
  {
    t: 'B2B Commerce',
    d: 'Catalog · Quotes · Wholesale',
    desc: 'Quote-driven catalogues and negotiated pricing flows at enterprise scale.',
    img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=80',
  },
  {
    t: 'Tech & SaaS',
    d: 'Startups · APIs · Platforms',
    desc: 'Product sites, API platforms, and growth engines for ambitious startups.',
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80',
  },
];

export const INSIGHT_CARDS = [
  { t: 'Magento 2 SEO: Technical Audit Guide', c: 'SEO', m: '8 min read' },
  { t: 'CRO Strategies That Double Conversion', c: 'CRO', m: '6 min read' },
  { t: 'AWS Server Setup for Magento 2', c: 'AWS', m: '10 min read' },
  { t: 'Core Web Vitals & PageSpeed 90+', c: 'Performance', m: '7 min read' },
  { t: 'n8n Automation for E-commerce Teams', c: 'Automation', m: '5 min read' },
  { t: 'WordPress Performance on AWS', c: 'WordPress', m: '6 min read' },
  { t: 'Headless Commerce Architecture 2026', c: 'Architecture', m: '9 min read' },
  { t: 'AI-Powered Digital Transformation', c: 'AI', m: '7 min read' },
];

export interface Testimonial {
  q: string;
  n: string;
  r: string;
  m: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    q: 'Exceptional technical expertise combined with strong strategic thinking that delivered real business results.',
    n: 'Growth-Focused Business',
    r: 'D2C Brand Engagement',
    m: 'GB',
  },
  {
    q: 'Delivered scalable solutions that significantly improved our digital operations and team velocity.',
    n: 'Commerce Leadership Team',
    r: 'Enterprise Retail Group',
    m: 'CL',
  },
  {
    q: 'A valuable technology partner for complex commerce initiatives with deep understanding of enterprise scale.',
    n: 'Enterprise Client',
    r: 'Platform Modernization',
    m: 'EC',
  },
  {
    q: 'Professional, innovative, and highly focused on results. One of the best technology engagements we have had.',
    n: 'Transformation Stakeholder',
    r: 'Global B2B Enterprise',
    m: 'TS',
  },
];

export interface Faq {
  q: string;
  /** Answer may contain a single inline mailto link, hence the parts split. */
  a: string;
  linkEmail?: boolean;
}

export const FAQS: Faq[] = [
  {
    q: 'What platforms do you specialise in?',
    a: 'Magento 2 (Adobe Commerce), Shopify & Shopify Plus, WordPress & WooCommerce, and headless/custom Next.js commerce architectures. For cloud, I work primarily on AWS (EC2, RDS, S3, CloudFront) alongside Nginx/Apache server stacks with Redis, Varnish, and Cloudflare.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'Timelines depend on scope. A Shopify brand store typically takes 3–5 weeks. A Magento 2 enterprise build ranges from 6–16 weeks. SEO & CRO audits with implementation run 4–8 weeks. Every engagement begins with a clear roadmap and milestone schedule agreed upon upfront.',
  },
  {
    q: 'Do you work with international brands?',
    a: 'Yes — I work with brands across India, the UAE, Europe, UK, and North America. All engagements are conducted remotely with structured communication, detailed deliverables, and regular milestone reviews. Time zone differences are managed proactively from IST.',
  },
  {
    q: 'What does the engagement process look like?',
    a: 'Every project begins with a strategic consultation call to understand your goals and constraints. A detailed proposal follows with scope, timeline, and investment. Once approved, work proceeds through clear phases — discovery, architecture, development, QA, and launch — with regular check-ins throughout.',
  },
  {
    q: 'Do you offer post-launch support?',
    a: "Yes. Post-launch retainers cover ongoing optimisation, security updates, performance monitoring, SEO iterations, and feature development. Support packages are tailored to each brand's operational needs — from lightweight quarterly reviews to dedicated monthly retainers.",
  },
  {
    q: 'Can you optimise an existing store rather than rebuild it?',
    a: 'Absolutely. Many of my most impactful engagements are performance audits, CRO programmes, and platform migrations rather than ground-up builds. I assess your current architecture, identify critical bottlenecks, and implement targeted improvements — often delivering faster ROI than a full rebuild.',
  },
  {
    q: 'How is AI integrated into your e-commerce work?',
    a: 'AI is embedded practically: intelligent product recommendations, automated catalogue enrichment, smart semantic search, dynamic pricing logic, and operations automation via n8n + OpenAI workflows. The goal is always measurable efficiency or revenue impact — not technology for its own sake.',
  },
  {
    q: 'How do I get started?',
    a: "Simply reach out via the contact form or email {EMAIL}. Describe your project briefly and I'll respond within 24 hours to schedule a no-obligation strategy conversation.",
    linkEmail: true,
  },
];

export const SERVICE_OPTIONS = [
  'Luxury Brand Development',
  'Magento 2 Development',
  'Shopify Brand Store',
  'SEO & CRO Strategy',
  'AWS & Server Setup',
  'WordPress & WooCommerce',
  'AI Automation',
];

export const FOOTER_NAV = [
  { label: 'Home', href: '/', active: true },
  { label: 'Services', href: '/#expertise' },
  { label: 'Work', href: '/#work' },
  { label: 'Technology', href: '/#technology' },
  { label: 'Blog & Insights', href: '/blog' },
  { label: 'Contact', href: '/#contact' },
];

export const FOOTER_EXPERTISE = [
  'Magento 2 Commerce',
  'Shopify',
  'SEO & CRO',
  'AWS & Server Setup',
  'WordPress & WooCommerce',
  'AI Automation',
];

export const FOOTER_TOPICS = [
  { label: 'Magento 2', filter: 'magento-2', count: 6 },
  { label: 'Shopify', filter: 'shopify', count: 4 },
  { label: 'SEO & CRO', filter: 'seo-cro', count: 3 },
  { label: 'WordPress', filter: 'wordpress', count: 3 },
  { label: 'AI & Automation', filter: 'ai-automation', count: 3 },
  { label: 'AWS & Server', filter: 'aws-server', count: 2 },
  { label: 'Performance', filter: 'performance', count: 1 },
];
