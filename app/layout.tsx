import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import Script from 'next/script';
import { UIProvider } from '../components/ui-context';
import { GA_MEASUREMENT_ID, GTM_CONTAINER_ID, SITE_URL } from '../lib/site';
import './globals.css';
/* The shared editorial page system. Imported here, not per page: the nav and
   the footer are built out of it and they render on every route, including the
   ones that do not wrap their body in `.yr-page`. */
import './home.css';

/**
 * Body face, and the only face paragraph copy is ever set in. The display face
 * below is drawn to be looked at; Inter is drawn to be read at 16px and at
 * 0.64rem uppercase, which is where a display grotesque gets effortful.
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
 * The display face, for every heading on every page.
 *
 * Space Grotesk replaces Bebas Neue. Bebas ships a single 400 cut and is
 * condensed uppercase-only, which suited a headline set as a poster but gave
 * the page no way to set an editorial H2 in mixed case or to hold a statement
 * at 300. Space Grotesk is variable across 300-700, so the whole display scale
 * comes from one file and a statement can be set light and large rather than
 * heavy and small.
 *
 * It is a normal-width grotesque, so it runs roughly a quarter wider than
 * Bebas at the same size. Every clamp in app/home.css was retuned downward for
 * that; sizes carried over from the condensed face would overflow.
 */
const display = Space_Grotesk({
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
      <body className="bg-ground text-ink font-body overflow-x-hidden">
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
