import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Crumb } from '../../lib/schema';
import { JsonLd } from '../json-ld';
import { ContactModal } from '../contact-modal';
import { Lines, Rise } from '../homepage/motion';
import { Shell } from '../homepage/primitives';
import { SiteFooter } from './footer';
import { SiteNav } from './nav';

/**
 * Interior page chrome.
 *
 * Every route other than the homepage renders through `Page`, so the nav, the
 * footer, the enquiry modal, the `.yr-page` token scope and the `#main` skip
 * target are defined once. Before this, /about/ and /blog/ each assembled their
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
}: {
  children: ReactNode;
  /** The page's JSON-LD graph. `object`, not `unknown`: JsonLd serialises it,
      and `unknown` does not satisfy that, so this file has not type-checked
      since the prop was written. */
  schema: object;
  /** Nav label to mark with aria-current. */
  active?: string;
}) {
  return (
    <>
      <JsonLd data={schema} />
      <div className="yr-page">
        <SiteNav active={active} />
        {/* Film grain. Fixed, non-interactive, purely atmospheric. */}
        <div className="noise" aria-hidden="true" />
        <main id="main">{children}</main>
        <SiteFooter />
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
  eyebrow: string;
  lines: readonly string[];
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

        <Rise as="p" className="mb-item flex items-center gap-3">
          <span aria-hidden="true" className="yr-dot" />
          <span className="font-display text-[.8rem] uppercase tracking-[.24em] text-accent-bright">
            {eyebrow}
          </span>
        </Rise>

        <Lines as="h1" id="page-title" size="1" lines={lines} softFrom={2} />

        <Rise delay={0.28} className="mt-block">
          <p className="yr-lede max-w-[58ch]">{lede}</p>
        </Rise>

        {children ? (
          <Rise delay={0.4} className="mt-block flex flex-wrap gap-3">
            {children}
          </Rise>
        ) : null}
      </Shell>
    </section>
  );
}
