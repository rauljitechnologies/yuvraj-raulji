import { RAULJI_TECHNOLOGIES_URL } from './home';
import { CONTACT, FAQS, SITE_URL } from './site';

const PERSON_ID = `${SITE_URL}/#person`;
/**
 * The execution brand is a separate legal entity with its own site, so it gets
 * its own node and the Person links to it via `worksFor` rather than the two
 * being collapsed into one organisation.
 */
const COMPANY_ID = `${RAULJI_TECHNOLOGIES_URL}#organization`;

/**
 * JSON-LD @graph previously inlined at the top of app/_html/home.html.
 *
 * `faq` exists because FAQPage markup must correspond to questions actually
 * visible on the page. The redesigned homepage does not carry an FAQ block, so
 * it opts out; anything that does render the questions can opt back in.
 */
export function homeSchema({ faq = true }: { faq?: boolean } = {}) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: 'Yuvraj Raulji',
        url: `${SITE_URL}/`,
        email: CONTACT.email,
        telephone: CONTACT.phoneE164,
        // Points at a file that exists. /og-image.jpg was never in public/.
        image: `${SITE_URL}/assets/yuvraj-raulji.jpg`,
        jobTitle: 'Technology & Business Consultant',
        description:
          'Yuvraj Raulji explores AI, LLMs, eCommerce, digital transformation and the technologies shaping modern business. Twelve years building commerce platforms, headless architecture and applied AI across B2B, B2C, D2C and marketplace models.',
        worksFor: { '@id': COMPANY_ID },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Vadodara',
          addressRegion: 'Gujarat',
          addressCountry: 'IN',
        },
        sameAs: [CONTACT.linkedin, CONTACT.instagram, CONTACT.facebook],
        knowsAbout: [
          'Artificial Intelligence',
          'Large Language Models',
          'AI Agents',
          'AI Automation',
          'Digital Transformation',
          'E-Commerce Architecture',
          'Headless Commerce',
          'Magento 2',
          'Shopify',
          'AI Search',
          'Conversion Rate Optimization',
          'Customer Experience',
          'Emerging Technology',
        ],
      },
      {
        '@type': 'Organization',
        '@id': COMPANY_ID,
        name: 'Raulji Technologies Private Limited',
        url: RAULJI_TECHNOLOGIES_URL,
        founder: { '@id': PERSON_ID },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Vadodara',
          addressRegion: 'Gujarat',
          addressCountry: 'IN',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: 'Yuvraj Raulji',
        description: 'E-commerce technology strategy, digital transformation and enterprise commerce architecture',
        publisher: { '@id': PERSON_ID },
        inLanguage: 'en-US',
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#service`,
        name: 'Yuvraj Raulji',
        description:
          'E-commerce technology strategy, digital transformation and enterprise commerce architecture across Magento 2, Shopify, headless commerce, infrastructure, analytics, SEO and AI.',
        url: `${SITE_URL}/`,
        telephone: CONTACT.phoneE164,
        email: CONTACT.email,
        founder: { '@id': PERSON_ID },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Vadodara',
          addressRegion: 'Gujarat',
          addressCountry: 'IN',
        },
        areaServed: 'Worldwide',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Services',
          itemListElement: [
            'E-commerce Technology Strategy',
            'Digital Transformation',
            'Magento 2 E-Commerce Development',
            'Shopify Brand Store Development',
            'SEO & CRO Strategy',
            'AWS & Server Infrastructure',
            'WordPress & WooCommerce Development',
            'AI Automation & Commerce Systems',
          ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` }],
      },
      ...(faq
        ? [
            {
              '@type': 'FAQPage',
              '@id': `${SITE_URL}/#faq`,
              mainEntity: FAQS.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a.replace('{EMAIL}', CONTACT.email) },
              })),
            },
          ]
        : []),
    ],
  };
}
