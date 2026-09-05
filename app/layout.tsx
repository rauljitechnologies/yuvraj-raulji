import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Manrope, Space_Grotesk } from 'next/font/google';
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

/**
 * The homepage pair, from the design canvas the homepage is built to.
 *
 * They are declared here because next/font has to be called at module scope in
 * a layout or page to be hoisted into the build, but nothing in `<body>` uses
 * them by default: only components under components/homepage-sections reach for
 * `font-manrope` / `font-mono`. The rest of the site keeps Space Grotesk and
 * Inter.
 *
 * Both are self-hosted by next/font at build time, so there is no render-blocking
 * request to fonts.googleapis.com and no layout shift, which is what the raw
 * `<link>` in the canvas mockup would have cost.
 */
const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-mono',
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
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${manrope.variable} ${mono.variable}`}
    >
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

        {/*
          Scroll-reveal failsafe.

          The reveals write `opacity:0` into the server-rendered HTML and rely
          on the bundle hydrating and an IntersectionObserver firing to clear
          it. When that does not happen, and it does not on a failed chunk, a
          blocked script or a tab Chrome has throttled the observer in, the
          reader gets a painted but empty page and reads it as still loading.
          The <noscript> block only covers scripting being switched off, which
          is the one case that never actually happens in the wild.

          This only touches elements that are in the viewport and still
          invisible after two seconds, so it can never reveal below-the-fold
          content early and never fights a reveal that is working. The hero
          does not rely on it at all: that animates from CSS and carries no
          .yr-rv marker.

          Raw script rather than next/script, deliberately. It has to survive
          the framework runtime not arriving, which is the failure it exists
          for.

          The second half is the smooth-scroll opt-in. `scroll-behavior: smooth`
          used to sit on `html` unconditionally, which meant the App Router's
          scroll-to-top on every client navigation was *animated*: leaving a long
          page scrolled the reader all the way back up before the next page
          appeared, which reads as a broken navigation rather than a nicety.

          Smooth is now a class, added here only for a click on a link whose
          target is a fragment on the page you are already on, and dropped a
          second later. Route changes land instantly; anchors still glide. The
          listener is delegated on the document and capturing, so it survives
          every client-side navigation without re-binding, and it costs no
          bundle.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var t;function s(){var h=innerHeight,n=document.querySelectorAll('.yr-rv');for(var i=0;i<n.length;i++){var e=n[i],r=e.getBoundingClientRect();if(r.top<h&&r.bottom>0&&parseFloat(getComputedStyle(e).opacity)<0.05){e.style.setProperty('opacity','1','important');e.style.setProperty('transform','none','important')}}}addEventListener('load',function(){setTimeout(s,2000)});addEventListener('scroll',function(){clearTimeout(t);t=setTimeout(s,600)},{passive:true});var m,d=document.documentElement;addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('a[href]');if(!a)return;var u;try{u=new URL(a.getAttribute('href'),location.href)}catch(x){return}if(!u.hash||u.origin!==location.origin||u.pathname!==location.pathname)return;d.classList.add('yr-smooth');clearTimeout(m);m=setTimeout(function(){d.classList.remove('yr-smooth')},1000)},true)})();",
          }}
        />
        {/*
          Conversion tracking for the routes a reader leaves by.

          Delegated on the document, capturing, and written as a raw script for
          the same reason the block above is: it costs no bundle and it survives
          every client-side navigation without re-binding. The alternative was
          an onClick on every call to action, which would have turned a few
          dozen server components into client components to record a click.

          Form submissions are not here. Those fire from lib/lead.ts, which is
          the one path both the /contact/ form and the enquiry modal go through,
          so a submission is counted once wherever it was sent from.

          `wa.me` is counted as a conversion rather than as a CTA click because
          on this site it is one: the WhatsApp link is a real way a reader
          starts a conversation, not a step toward one.

          The booking call to action fires `consultation_cta_click`, not
          `consultation_booked`, and it is deliberately not a conversion. There
          is no scheduling step on the site yet: "Book a 30-minute consultation"
          resolves to an on-page anchor or to WhatsApp, so a click means a
          reader wanted to book and could not. Counting that as a booking would
          put the exact number we need to see into the column that hides it.
          When a real booking destination exists, `consultation_booked` fires
          on arrival there and becomes the conversion.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){function p(e,o){window.dataLayer=window.dataLayer||[];o=o||{};o.event=e;o.page_path=location.pathname;window.dataLayer.push(o)}addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('a[href],button');if(!a)return;var t=(a.textContent||'').trim().slice(0,80);var h=a.getAttribute('href')||'';if(h.indexOf('mailto:')===0)return p('email_click',{cta_text:t});if(h.indexOf('tel:')===0)return p('phone_click',{cta_text:t});if(h.indexOf('wa.me')>-1)return p('whatsapp_click',{cta_text:t});if(/book/i.test(h)||/book\\s*(a\\s*)?30/i.test(t))return p('consultation_cta_click',{cta_text:t,destination:h});if(a.className&&String(a.className).indexOf('yr-btn')>-1)p('cta_click',{cta_text:t,destination:h})},true)})();",
          }}
        />
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
