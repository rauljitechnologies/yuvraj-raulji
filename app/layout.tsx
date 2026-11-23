import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import Script from 'next/script';
import { UIProvider } from '../components/ui-context';
import { GA_MEASUREMENT_ID, SITE_URL } from '../lib/site';
import './globals.css';
/* The shared editorial page system. Imported here, not per page: the nav and
   the footer are built out of it and they render on every route, including the
   ones that do not wrap their body in `.yr-page`. */
import './home.css';

/**
 * ── THE THREE FACES ────────────────────────────────────────────────────────
 *
 * Three faces, three jobs, no overlap. Redesign v2 fixes the job of each one
 * in app/globals.css and this file is the only place any of them is loaded.
 *
 *   Plus Jakarta Sans   headings. h1, h2, h3, and nothing else.
 *   Inter               body. Every sentence, label, button and form field.
 *   JetBrains Mono      small labels and eyebrows ONLY. Never a sentence.
 *
 * ── What this replaced ────────────────────────────────────────────────────
 *
 * Manrope and Newsreader, both removed. Manrope was the single sans for
 * everything (headings, body and chrome alike, so a heading differed from the
 * paragraph under it only by size and weight) and Newsreader was an editorial
 * display serif layered on top of it for the H1 and H2 of every page.
 *
 * Two problems with that pairing, and the redesign brief resolves both by
 * naming the faces outright:
 *
 *   One face for headings and body means the type system has no voice of its
 *   own. Plus Jakarta Sans against Inter is a real pairing: the geometric
 *   display gives a heading its own shape, and Inter is the most legible
 *   interface face at 16 to 18px, which is where this site does most of its
 *   reading.
 *
 *   A serif display and a sans display were both in play. `.yr-display` used
 *   the serif, the homepage H1 hand-set its own copy of it, and
 *   `.yr-display--3` deliberately stayed in the sans at section-heading size.
 *   So one page carried two display voices by design. There is one now.
 *
 * ── Why the CSS variables are named for the file, not the role ────────────
 *
 * `--font-jakarta`, `--font-inter` and `--font-jetbrains` name the FACE.
 * app/globals.css maps them onto the roles (`--font-heading`, `--font-body`,
 * `--font-mono`) and then onto every legacy alias the templates still ask for
 * (`--font-display`, `--font-manrope`, `--font-serif`, `--font-sans`).
 *
 * That indirection is what let Manrope and Newsreader be removed without
 * touching 400+ `font-manrope` and `font-serif` class names across 89 routes,
 * and it is what makes swapping a face one line in two files rather than a
 * find-and-replace across the repo.
 *
 * ── Loading cost ─────────────────────────────────────────────────────────
 *
 * All three are variable fonts, so each is one woff2 for its whole weight
 * range: three files, same as before, and no synthesised weights. `display:
 * 'swap'` on all three, and next/font emits a `<link rel="preload">` for each
 * because all three render above the fold (heading, body, hero eyebrow).
 *
 * `adjustFontFallback` is left at its default (on). next/font computes a
 * size-adjusted local fallback per face, which is what keeps the swap from
 * costing layout shift — the CLS term the brief asks to hold down.
 */
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  /* Variable 200-800. The heading scale uses 500 to 800; the range is one
     file either way, so it is not narrowed. */
  variable: '--font-jakarta',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  /* Variable 100-900. Body copy is 400, emphasis 600, buttons 600. */
  variable: '--font-inter',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  /* Two cuts, not the variable range. This face only ever sets 12px eyebrows
     and 14px labels, at 400 and 500; loading 100-800 for two weights is bytes
     on the critical path for nothing. */
  weight: ['400', '500'],
  variable: '--font-jetbrains',
});

/* The near-black ground, so the browser chrome matches the page.
   Literal rather than var(--near-black): this is serialised into a <meta>
   tag at build time, where a custom property has nothing to resolve
   against. Keep in sync with --near-black in app/globals.css. */
export const viewport: Viewport = { themeColor: '#0A0A0A' };

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
    <html lang="en" className={`${jakarta.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="bg-ground text-ink font-body overflow-x-hidden">
        {/* The GTM noscript iframe stood here. It went with the container.
            See the note above the tag scripts at the bottom of this file. */}
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

          Three events were added with the repositioning, and each is a
          conversion the brief asks to be able to count:

            resume_download     any link to the CV file, wherever it is. Keyed
                                off the href rather than a class, so a link
                                added on a new page is counted without the
                                author remembering to mark it up.
            linkedin_click      an outbound click to the LinkedIn profile. It
                                was invisible: `wa.me` was matched and
                                linkedin.com was not, so the second-largest
                                way a recruiter makes contact counted as
                                nothing.
            project_view        a click through to a case study. `destination`
                                carries the slug, so the per-project numbers
                                the brief asks for fall out of one event.

          `contact_cta_click` was added after testing every rule above against
          the live tag and finding that the site's most prominent conversion
          action fired nothing at all. The last rule here is a fallback keyed
          on the `yr-btn` class, and no link to /contact/ carries it: the
          header call to action uses HEADER_CTA_CLASS, the bar above it uses a
          mono underline, and the homepage hero uses its own `Cta`. So the
          header button on all 89 pages, the "Start a project" link beside it
          and "Hire Me for Your Project" in the hero were all untracked, which
          is the top of the funnel on a site whose objective is enquiries.

          Keyed off the destination rather than a class, for the reason
          `resume_download` is: a new call to action on a new page is counted
          without the author remembering to mark it up.

          `data-event` is honoured first where a link declares it, so a page
          can name its own event without this script needing to know about it.

          ── Why `p()` calls gtag and not dataLayer ──────────────────────────

          It pushed `{ event: name, ... }` to `dataLayer`, which is GTM's
          object format, and gtag.js does not read it. Every one of the nine
          events above was therefore recorded into nothing: no WhatsApp tap,
          no phone tap, no email click, no resume download and no project view
          has ever reached GA4 from this site.

          The reason it went unnoticed is that the push itself always
          succeeds. `dataLayer` exists, the array grows, nothing throws, and
          the only way to see the failure is to watch for the collect request
          that never arrives.

          The container was audited to settle which path is live. GTM-TNKVWXJ5
          contains no GA4 tag: its published JavaScript does not mention the
          measurement ID. Blocking gtag.js and leaving GTM in place produces
          zero GA4 hits; blocking GTM and leaving gtag.js produces the full
          set. So gtag is the live path and this now calls it, falling back to
          the container's format when gtag is absent. Same change, same
          reasoning, as lib/analytics.ts; the note there has the measurements.

          The container has since been removed from the page entirely, for
          the reason set out below. The `dataLayer` fallback stays: it costs
          one line and it is what makes this code correct again the day a
          container is reintroduced.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){function p(e,o){o=o||{};o.page_path=location.pathname;if(typeof window.gtag==='function'){window.gtag('event',e,o);return}window.dataLayer=window.dataLayer||[];o.event=e;window.dataLayer.push(o)}addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('a[href],button');if(!a)return;var t=(a.textContent||'').trim().slice(0,80);var h=a.getAttribute('href')||'';var d=a.getAttribute('data-event');if(d)return p(d,{cta_text:t,destination:h});if(h.indexOf('mailto:')===0)return p('email_click',{cta_text:t});if(h.indexOf('tel:')===0)return p('phone_click',{cta_text:t});if(h.indexOf('wa.me')>-1)return p('whatsapp_click',{cta_text:t});if(h.indexOf('linkedin.com')>-1)return p('linkedin_click',{cta_text:t,destination:h});if(h.indexOf('/contact/')===0||h.indexOf('#contact')>-1)return p('contact_cta_click',{cta_text:t,destination:h});if(/\\.pdf(\\?|$)/i.test(h))return p('resume_download',{cta_text:t,destination:h});if(/^\\/work\\/[^/]+\\//.test(h))return p('project_view',{cta_text:t,destination:h});if(/book/i.test(h)||/book\\s*(a\\s*)?30/i.test(t))return p('consultation_cta_click',{cta_text:t,destination:h});if(a.className&&String(a.className).indexOf('yr-btn')>-1)p('cta_click',{cta_text:t,destination:h})},true)})();",
          }}
        />
        {/*
          One tagging path, which is gtag.js.

          GTM-TNKVWXJ5 loaded on every production page beside it. The
          container was fetched and read on 19 Nov 2026, not inferred:

            https://www.googletagmanager.com/gtm.js?id=GTM-TNKVWXJ5
            "tags":[]   "rules":[]

          It is empty. No GA4 tag, no Ads tag, no pixel, nothing. It cost
          every visitor a connection to googletagmanager.com and a 335 KB
          script that fires nothing, on a site where the article pages were
          already the heaviest thing a mobile reader downloads.

          Removing it also removes the standing hazard the note below used to
          describe: with both loaded, adding a GA4 tag to the container would
          have doubled every page view silently.

          The container is not deleted and the ID is still recorded in
          lib/site.ts. If it is ever given tags, this snippet comes back as
          four lines, and the GA4 config below comes out in the same release.
        */}
        {isProd && (
          <>
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
