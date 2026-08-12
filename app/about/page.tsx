import type { Metadata } from 'next';
import { ContactModal } from '../../components/contact-modal';
import { AboutContent } from '../../components/about/about-content';
import { JsonLd } from '../../components/json-ld';
import { Preloader } from '../../components/preloader';
import { SiteEffects } from '../../components/site-effects';
import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';
import { CERTIFICATIONS, CONTACT, EDUCATION, EXPERIENCE, SITE_URL } from '../../lib/site';

const title = 'About Yuvraj Raulji | E-commerce Consultant & Strategist';
const description =
  'Yuvraj Raulji — 9+ years across B2B, B2C, D2C and marketplace commerce. Magento 2, Shopify, headless commerce, infrastructure, analytics and AI.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/about/` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/about/`,
    siteName: 'Yuvraj Raulji',
    type: 'profile',
    images: [{ url: `${SITE_URL}/assets/yuvraj-raulji.jpg`, alt: 'Yuvraj Raulji' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: [`${SITE_URL}/assets/yuvraj-raulji.jpg`] },
};

export default function About() {
  /**
   * ProfilePage + a fuller Person than the homepage carries: this is the page
   * that should define the entity for Google and AI answer engines, so it adds
   * worksFor, alumniOf and hasCredential.
   */
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/about/#profilepage`,
        url: `${SITE_URL}/about/`,
        name: title,
        description,
        inLanguage: 'en-US',
        mainEntity: { '@id': `${SITE_URL}/#person` },
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Yuvraj Raulji',
        url: `${SITE_URL}/`,
        email: CONTACT.email,
        telephone: CONTACT.phoneE164,
        image: `${SITE_URL}/assets/yuvraj-raulji.jpg`,
        jobTitle: 'E-commerce & Digital Transformation Consultant',
        description,
        sameAs: [CONTACT.linkedin, CONTACT.instagram, CONTACT.facebook],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Vadodara',
          addressRegion: 'Gujarat',
          addressCountry: 'IN',
        },
        worksFor: EXPERIENCE.slice(0, 1).map((r) => ({ '@type': 'Organization', name: r.org })),
        alumniOf: EDUCATION.map((e) => ({ '@type': 'EducationalOrganization', name: e.qualification })),
        hasCredential: CERTIFICATIONS.map((c) => ({
          '@type': 'EducationalOccupationalCredential',
          name: c.name,
          credentialCategory: 'certificate',
          recognizedBy: { '@type': 'Organization', name: c.issuer },
          ...(c.url ? { url: c.url } : {}),
        })),
        knowsAbout: [
          'E-commerce Architecture',
          'Digital Transformation',
          'Magento 2',
          'Adobe Commerce',
          'Shopify',
          'Headless Commerce',
          'Next.js',
          'Server Infrastructure',
          'Performance Engineering',
          'E-commerce SEO',
          'Analytics',
          'Generative AI',
          'Agentic AI',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/about/` },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={ld} />
      <div className="noise" aria-hidden="true" />
      <Preloader tagline="E-commerce & Digital Transformation" />
      <SiteHeader active="About" />
      <SiteEffects />

      <main id="top">
        <AboutContent />
      </main>

      <SiteFooter />
      <ContactModal />
    </>
  );
}
