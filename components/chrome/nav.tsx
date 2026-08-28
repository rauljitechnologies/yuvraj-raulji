import Link from 'next/link';
import { CTA_LABEL, NAV } from '../../lib/brand';
import { HEADER_CTA_CLASS } from '../header-cta';
import { Wordmark } from '../wordmark';

/**
 * The site header. One component, rendered by every route.
 *
 * There used to be two, and they disagreed about everything that matters: the
 * homepage bar carried five in-page anchors (#about, #expertise, #work, #ai,
 * #insights) while every other route carried three page links, so the same
 * label meant "scroll down this page" on the homepage and "go to that page"
 * everywhere else. A reader who clicked About on the homepage never left it.
 * Every destination in NAV is a real route now, so a click is a navigation and
 * the browser lands at the top of the page it went to.
 *
 * ── Why this is a server component ─────────────────────────────────────────
 *
 * The bar it replaces was a client component for two behaviours. The first was
 * a scroll listener that faded the ground in once the page had moved; the
 * second was an IntersectionObserver that inverted the bar to black-on-white
 * over the paper sections. Both existed to keep a transparent bar readable.
 * This bar is never transparent: it carries its own translucent ground and a
 * hairline from the first paint, which is the homepage treatment, and it is
 * legible over paper and over black without knowing which one is under it. No
 * state, no listeners, no bundle, on every page.
 *
 * The mobile menu went the same way. A full-screen panel needs an open state,
 * a focus trap, a scroll lock and an Escape handler; the row of links under the
 * bar needs none of that and is always visible, which is strictly better than a
 * menu a reader has to open to discover the site has one.
 *
 * ── Geometry ───────────────────────────────────────────────────────────────
 *
 * `fixed`, at 68px and 78px from `md`, which is what every interior page's top
 * padding was already written against. The mobile link row adds 34px under it
 * below `md`, and the interior heroes clear 118px there, so it fits without
 * touching them. The homepage hero was padded for a bar that took its own space
 * in the flow, so that one number moves with this change.
 */

function NavLinks({ active, className = '' }: { active?: string; className?: string }) {
  return (
    <>
      {NAV.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          aria-current={active === label ? 'page' : undefined}
          className={`shrink-0 whitespace-nowrap border-b font-manrope font-medium uppercase leading-none tracking-[0.1em] transition-colors duration-200 hover:border-accent hover:text-ink ${
            active === label ? 'border-accent text-ink' : 'border-transparent text-ink/60'
          } ${className}`}
        >
          {label}
        </Link>
      ))}
    </>
  );
}

export function SiteNav({ active }: { active?: string }) {
  return (
    <>
      {/* Keyboard users land here first. The bar repeats on every page, so
          without this every page costs several tabs before the content. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1300] focus:bg-accent focus:px-4 focus:py-2 focus:font-display focus:text-[.72rem] focus:font-bold focus:uppercase focus:tracking-[.14em] focus:text-white"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-header border-b border-ink/10 bg-ground/85 backdrop-blur-[14px]">
        <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between gap-4 px-5 sm:gap-8 sm:px-6 md:h-[78px] md:px-8 lg:px-12">
          <Link
            href="/"
            aria-label="Yuvraj Raulji, home"
            className="flex shrink-0 items-center py-2 transition-opacity duration-200 hover:opacity-70"
          >
            <Wordmark />
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center md:flex md:gap-6 lg:gap-[34px]"
          >
            <NavLinks active={active} className="py-2.5 text-[12px] lg:text-[13px]" />
          </nav>

          {/*
            An anchor, not the enquiry modal. The homepage carries a real
            contact form in its last section, so this is a link to it from
            wherever the reader is, and the same element on every page. The
            modal is still there for the in-page calls to action that open it.
          */}
          <a href="/#contact" className={HEADER_CTA_CLASS}>
            {CTA_LABEL}
          </a>
        </div>

        {/*
          The phone row. `overflow-x-auto` is a safety valve rather than the
          expected state: the five labels fit inside 375px, and the scroll only
          engages on the narrowest devices or at a large text setting. The
          scrollbar itself is suppressed because the row is 34px tall and a
          visible one would take a third of it.
        */}
        <nav
          aria-label="Primary, condensed"
          className="flex gap-5 overflow-x-auto border-t border-ink/10 px-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:hidden"
        >
          <NavLinks active={active} className="py-3.5 text-[11px]" />
        </nav>
      </header>
    </>
  );
}
