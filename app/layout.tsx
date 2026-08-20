import type { Metadata, Viewport } from 'next';
import { Bebas_Neue, Inter } from 'next/font/google';
import Script from 'next/script';
import { UIProvider } from '../components/ui-context';
import { GA_MEASUREMENT_ID, GTM_CONTAINER_ID, SITE_URL } from '../lib/site';
import './globals.css';

/**
 * Body face, and the only face paragraph copy is ever set in. The display
 * faces below and above are drawn to be looked at; Inter is drawn to be read at
 * 16px and at 0.66rem uppercase, which is where the other two get effortful.
 *
 * No `weight` array: that requests the variable font, so every weight from 400
 * to 700 arrives in one file rather than four static cuts.
 */
const body = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

/**
 * The single display face, for every heading on every page, matching the face
 * the production site sets its H1 in.
 *
 * Bebas Neue ships one cut only, so nothing here may ask for a bold weight:
 * a `font-weight` above 400 makes the browser synthesise one by smearing the
 * outlines. Every display rule pins 400 for that reason.
 *
 * It is condensed, so display type runs roughly a quarter shorter than a
 * normal-width grotesque at the same size. Sizes tuned against a wider face
 * will read small here.
 */
const display = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

export const viewport: Viewport = { themeColor: '#050505' };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  authors: [{ name: 'Yuvraj Raulji', url: SITE_URL }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

const isProd = process.env.NODE_ENV === 'production';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-bg text-[#f5f5f2] font-body overflow-x-hidden">
        {isProd && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <UIProvider>{children}</UIProvider>
        {isProd && (
          <>
            <Script id="gtm-init" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');`}
            </Script>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
