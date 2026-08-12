import { CONTACT, FAQS, SITE_URL } from './site';

const PERSON_ID = `${SITE_URL}/#person`;

/** JSON-LD @graph previously inlined at the top of app/_html/home.html. */
export function homeSchema() {
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
        image: `${SITE_URL}/og-image.jpg`,
        jobTitle: 'E-commerce & Digital Transformation Consultant',
        description:
          'E-commerce & Digital Transformation Consultant and Technology Strategist with 9+ years across B2B, B2C, D2C and marketplace commerce. Specializing in Magento 2, Shopify, headless commerce, modern web architecture, server infrastructure, analytics, SEO, Generative AI and Agentic AI.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Vadodara',
          addressRegion: 'Gujarat',
          addressCountry: 'IN',
        },
        sameAs: [CONTACT.linkedin, CONTACT.instagram, CONTACT.facebook],
        knowsAbout: [
          'Digital Transformation',
          'E-Commerce Architecture',
          'Magento 2',
          'Shopify',
          'SEO',
          'CRO',
          'AWS',
          'WordPress',
          'WooCommerce',
          'AI Automation',
        ],
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
          'E-commerce technology strategy, digital transformation and enterprise commerce architecture — Magento 2, Shopify, headless commerce, infrastructure, analytics, SEO and AI.',
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
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/#faq`,
        mainEntity: FAQS.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a.replace('{EMAIL}', CONTACT.email) },
        })),
      },
    ],
  };
}
