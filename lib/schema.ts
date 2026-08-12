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
        jobTitle: 'Luxury Brand Developer & E-Commerce Architect',
        description:
          'Expert in luxury brand development and e-commerce architecture with 9+ years of experience. Specializing in Magento 2, Shopify, AWS infrastructure, SEO & CRO, and AI-powered commerce systems.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Vadodara',
          addressRegion: 'Gujarat',
          addressCountry: 'IN',
        },
        sameAs: [CONTACT.linkedin, CONTACT.instagram, CONTACT.facebook],
        knowsAbout: [
          'Luxury Brand Development',
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
        description: 'Luxury brand development and premium e-commerce architecture',
        publisher: { '@id': PERSON_ID },
        inLanguage: 'en-US',
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#service`,
        name: 'Yuvraj Raulji',
        description:
          'Luxury brand development and premium e-commerce architecture — Magento 2, Shopify, AWS, SEO & CRO, WordPress.',
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
            'Luxury Brand Development',
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
