import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Crumb } from '../../lib/schema';
import { JsonLd } from '../json-ld';
import { ContactModal } from '../contact-modal';
import { Lines, type DisplayLine } from '../homepage/motion';
import { Eager, NO_SCRIPT_REVEAL_CSS } from '../homepage-sections/rv';
import { Shell } from '../homepage/primitives';
import { SiteFooter } from './footer';
import { MobileCta } from './mobile-cta';
import { SiteNav } from './nav';

/**
 * Interior page chrome.
 *
 * Every route other than the homepage renders through `Page`, so the nav, the
 * footer, the enquiry modal, the `.yr-page` token scope and the `#main` skip
 * target are defined once. Before this, /about/ and /insights/ each assembled their
 * own arrangement of a different header, a preloader and a effects layer, and
 * the three pages disagreed about all of it.
 *
 * `.yr-page` is what makes the editorial type scale, the shell width and the
 * rule colours resolve. A `yr-` class outside this wrapper has nothing to
 * resolve against and simply does not paint, which is the guard rail described
 * at the top of app/home.css.
 */
export function Page({
  children,
  schema,
  active,
  scope,
}: {
  children: ReactNode;
  /** The page's JSON-LD graph. `object`, not `unknown`: JsonLd serialises it,
      and `unknown` does not satisfy that, so this file has not type-checked
      since the prop was written. */
  schema: object;
  /** Nav label to mark with aria-current. */
  active?: string;
  /** A token scope for the page body, currently only `yr-paper`. It lands on
      `<main>` rather than on `.yr-page` so the ground changes under the
      content while the nav and footer stay the one arrangement they are on
      every route. A page that wants a light band per section puts the class on
      those sections instead and leaves this alone. */
  scope?: string;
}) {
  return (
    <>
      <JsonLd data={schema} />

      {/*
        The scroll reveals ship as `opacity:0` in the exported HTML and are
        cleared after hydration, so with scripting off they are never cleared.
        The homepage has rendered this failsafe since it was built; the other 86
        routes had not, and measured against the exported HTML with JavaScript
        disabled a service page had 56 invisible content elements and /about/
        had 45. Crawlers read the DOM and are unaffected, but a reader without
        scripting got a page of headings and nothing under them.

        Inert whenever scripting works, so it costs a scripted visitor nothing.
      */}
      <noscript>
        <style dangerouslySetInnerHTML={{ __html: NO_SCRIPT_REVEAL_CSS }} />
      </noscript>

      <div className="yr-page">
        <SiteNav active={active} />
        {/* Film grain. Fixed, non-interactive, purely atmospheric. */}
        <div className="noise" aria-hidden="true" />
        <main id="main" className={scope}>
          {children}
        </main>
        <SiteFooter />
        <MobileCta />
      </div>
      <ContactModal />
    </>
  );
}

/**
 * Breadcrumb trail.
 *
 * Takes the same `Crumb[]` that `breadcrumbNode()` turns into BreadcrumbList
 * markup, so the structured data can never claim a path the page does not
 * display. That is the whole reason the array is passed in rather than derived
 * separately in two places.
 *
 * The current page is the last crumb and is not a link, carrying
 * `aria-current="page"` instead.
 */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-block">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-2">
              {i > 0 ? (
                <span aria-hidden="true" className="text-[.6rem] text-ink-faint">
                  /
                </span>
              ) : null}
              {last ? (
                <span aria-current="page" className="yr-label inline-block py-2 text-ink-muted">
                  {c.name}
                </span>
              ) : (
                <Link
                  href={c.href}
                  className="yr-label inline-block py-2 transition-colors duration-200 hover:text-accent-bright"
                >
                  {c.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Interior page hero.
 *
 * One H1 per page, always. It is set from `lines` so each authored break does
 * its own typographic work and reveals in its own mask; `Lines` supplies the
 * joined sentence as the accessible name so a screen reader hears one heading
 * rather than three fragments.
 *
 * The eyebrow is a <p>, not a heading. It reads like a kicker but it is not a
 * level in the document outline, and promoting it to one would put a heading
 * above the H1 on every page.
 */
export function PageHero({
  eyebrow,
  lines,
  lede,
  crumbs,
  children,
}: {
  eyebrow?: string;
  /** Plain strings, or `{ text, accent: true }` for a line set in the red. */
  lines: readonly DisplayLine[];
  lede: string;
  crumbs: Crumb[];
  /** Calls to action, rendered under the lede. */
  children?: ReactNode;
}) {
  return (
    <section
      aria-labelledby="page-title"
      className="yr-section yr-section--open !pt-[118px] md:!pt-[146px]"
    >
      <Shell>
        <Breadcrumbs crumbs={crumbs} />

        {/* The homepage's hero eyebrow, to the pixel: a red hairline dash and
            the line set in the mono face. It used to be a red dot and 0.8rem of
            letterspaced display type in the accent, which is a different mark
            for the same job and the loudest thing on the page after the H1. */}
        {/*
          ── Why this hero reveals from CSS and not from Motion ─────────────

          All four blocks below used the scroll-reveal wrappers, which write
          `opacity:0` into the server render and clear it after hydration. This
          is the first viewport of all 86 interior pages, and measured on a
          throttled mobile profile (Slow 4G, 4x CPU) against the exported site
          that cost:

            LCP 4.4s on /contact/, a page with no images on it at all
            LCP 4.4s on a service page
            LCP 5.7s on /work/

          against a 2.5s "good" threshold. The Largest Contentful Paint
          element on every one of those pages is the lede paragraph here, and
          it was waiting on a 137KB bundle to download, hydrate and fire an
          IntersectionObserver before it was allowed to be visible. First
          Contentful Paint was 0.9s, so the page had painted and was sitting
          there empty for three and a half seconds.

          It also meant the entire first screen was invisible with scripting
          off, which is the failure the note above `@keyframes yr-enter` in
          app/globals.css was written about.

          `Eager` and `Lines instant` both reveal with that CSS keyframe. The
          animation starts when the stylesheet parses, so the hero is painted
          and settled about half a second after first paint, needs no
          JavaScript, and cannot get stuck if the bundle never arrives. The
          stagger is preserved, so the designed arrival is unchanged.

          Everything below the fold keeps the Motion wrappers, because down
          there waiting for the reader to scroll is the entire point.
        */}
        {eyebrow ? (
          <Eager as="div" className="mb-item flex items-center gap-3.5">
            <span aria-hidden="true" className="h-px w-11 bg-accent" />
            <span className="font-mono text-[11px] font-medium uppercase leading-[1.6] tracking-[0.3em] text-ink/55">
              {eyebrow}
            </span>
          </Eager>
        ) : null}

        {/* No `strongFrom`: the default puts the weight on the last line, which
            is where every one of these headlines lands. */}
        <Lines as="h1" id="page-title" size="1" lines={lines} instant delay={0.08} />

        <Eager delay={0.28} className="mt-block">
          <p className="yr-lede max-w-[58ch]">{lede}</p>
        </Eager>

        {children ? (
          <Eager delay={0.4} className="mt-block flex flex-wrap gap-3">
            {children}
          </Eager>
        ) : null}
      </Shell>
    </section>
  );
}
