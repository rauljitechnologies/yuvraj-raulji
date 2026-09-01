// Auto-generated from blog data. Eight posts, which is what POSTS below holds
// and what /blog/ and the sitemap render. The count previously read 22, a
// figure left over from an earlier data set and true of nothing in this repo.

export interface Post {
  cat: string;
  /** Optional shorter <title>. Set only where the display title would exceed
      the ~60-char SERP limit; the visible H1 always uses `title`. */
  seoTitle?: string;
  filter: string;
  date: string;
  readTime: string;
  /** On-page cover, self-hosted WebP. */
  img: string;
  /**
   * The same cover as JPEG, for `og:image`, `twitter:image` and the
   * `BlogPosting` image. Kept separate from `img` because X and several
   * scrapers still refuse WebP in a card, so the page gets the light format
   * and the crawlers get the compatible one.
   */
  ogImg: string;
  title: string;
  excerpt: string;
}

export const POSTS: Record<string, Post> = {
  "magento2-seo-technical-audit": {
    "cat": "Magento 2",
    "filter": "magento-2",
    "date": "12 Jun 2026",
    "readTime": "8 min read",
    "img": "/assets/blog/magento2-seo-technical-audit.webp",
    "ogImg": "/assets/blog/magento2-seo-technical-audit.jpg",
    "title": "Magento 2 SEO: The Complete Technical Audit Guide 2026",
    "excerpt": "A step-by-step framework for auditing Magento 2 stores: XML sitemaps, canonical tags, hreflang, structured data, crawl budget"
  },
  "ai-ecommerce-revenue-2025": {
    "seoTitle": "AI for E-commerce in 2026: Real Use Cases That Drive Revenue",
    "cat": "AI & Automation",
    "filter": "ai-automation",
    "date": "08 Jun 2026",
    "readTime": "11 min read",
    "img": "/assets/blog/ai-ecommerce-revenue-2025.webp",
    "ogImg": "/assets/blog/ai-ecommerce-revenue-2025.jpg",
    "title": "AI for E-commerce in 2026: Real Use Cases That Actually Drive Revenue",
    "excerpt": "Six battle-tested AI implementations: product recommendations, dynamic pricing, inventory forecasting, GPT catalog content, chatbot sales agents"
  },
  "magento2-checkout-optimization": {
    "cat": "Magento 2",
    "filter": "magento-2",
    "date": "05 Jun 2026",
    "readTime": "9 min read",
    "img": "/assets/blog/magento2-checkout-optimization.webp",
    "ogImg": "/assets/blog/magento2-checkout-optimization.jpg",
    "title": "Magento 2 Checkout Optimization: Cut Cart Abandonment by 40%",
    "excerpt": "Proven checkout redesign framework: one-page checkout, guest checkout, address autocomplete, payment UX, mobile-first form design"
  },
  "shopify-plus-vs-magento2-2025": {
    "seoTitle": "Shopify Plus vs Magento 2 in 2026: Enterprise Comparison",
    "cat": "Shopify",
    "filter": "shopify",
    "date": "10 May 2026",
    "readTime": "12 min read",
    "img": "/assets/blog/shopify-plus-vs-magento2-2025.webp",
    "ogImg": "/assets/blog/shopify-plus-vs-magento2-2025.jpg",
    "title": "Shopify Plus vs Magento 2 in 2026: The Definitive Enterprise Comparison",
    "excerpt": "Real-world breakdown of TCO, customisation depth, B2B features, API capabilities, and which platform wins for which business model in 2026."
  },
  "aws-magento2-server-setup": {
    "cat": "AWS & Server",
    "filter": "aws-server",
    "date": "15 May 2026",
    "readTime": "14 min read",
    "img": "/assets/blog/aws-magento2-server-setup.webp",
    "ogImg": "/assets/blog/aws-magento2-server-setup.jpg",
    "title": "AWS Server Setup for Magento 2: Production-Ready Guide",
    "excerpt": "Complete walkthrough: EC2 instance selection, RDS config, S3 media, Nginx + PHP-FPM tuning, Varnish, Redis, SSL, and CI/CD deployment pipeline on AWS."
  },
  "shopify-headless-nextjs-guide": {
    "seoTitle": "Shopify Headless with Next.js: Implementation Guide 2026",
    "cat": "Shopify",
    "filter": "shopify",
    "date": "25 Apr 2026",
    "readTime": "14 min read",
    "img": "/assets/blog/shopify-headless-nextjs-guide.webp",
    "ogImg": "/assets/blog/shopify-headless-nextjs-guide.jpg",
    "title": "Shopify Headless with Next.js: Complete Implementation Guide 2026",
    "excerpt": "Step-by-step headless Shopify build using Next.js 14, Hydrogen 2.0, and Storefront API: cart, checkout, ISR, SEO best practices, and Vercel deployment."
  },
  "cro-double-conversion": {
    "cat": "SEO & CRO",
    "filter": "seo-cro",
    "date": "28 May 2026",
    "readTime": "10 min read",
    "img": "/assets/blog/cro-double-conversion.webp",
    "ogImg": "/assets/blog/cro-double-conversion.jpg",
    "title": "CRO Strategies That Double E-commerce Conversion Rates",
    "excerpt": "Data-backed CRO frameworks from real Magento and Shopify stores: A/B testing methodology, heatmap analysis, checkout optimisation"
  },
  "magento2-pwa-studio-headless": {
    "cat": "Magento 2",
    "filter": "magento-2",
    "date": "20 May 2026",
    "readTime": "13 min read",
    "img": "/assets/blog/magento2-pwa-studio-headless.webp",
    "ogImg": "/assets/blog/magento2-pwa-studio-headless.jpg",
    "title": "Magento 2 PWA Studio: Building a Headless Storefront in 2026",
    "excerpt": "Hands-on guide to Magento 2 PWA Studio: Venia storefront, GraphQL API, local setup, performance tuning for 90+ Lighthouse"
  }
};
