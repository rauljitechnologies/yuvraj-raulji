'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MORE_NAV, PRIMARY_NAV } from '../../lib/brand';
import { Wordmark } from '../wordmark';
import { ThemeToggle } from './theme-toggle';

/**
 * The site header. One component, rendered by every route.
 *
 * ══════════════════════════════════════════════════════════════════════════
 * GEOMETRY: 72px, at every width, and the number is a token
 * ══════════════════════════════════════════════════════════════════════════
 *
 * The bar it replaced was three stacked strips and measured 110px from `md`
 * up: a 30px availability strip with a 1px rule, a 78px bar, and the header's
 * own 1px bottom rule. Under `md` it was a 68px bar with a 34px horizontally
 * scrolling link row beneath it.
 *
 * It is one strip now, `h-header`, which reads `--header-h: 72px` from
 * app/globals.css. That token is the only statement of the bar's height on
 * the site, and three other things read it:
 *
 *   `scroll-padding-top` in app/globals.css, so an in-page anchor lands with
 *   its heading clear of the bar rather than underneath it. There were three
 *   different declarations of that offset before (112/96 in globals.css,
 *   calc(102px + ...) in home.css, which won because it loads second), and
 *   none of them matched the bar.
 *
 *   The hero's top padding, which was hardcoded `pt-[128px] sm:pt-[140px]`.
 *
 *   The article aside's sticky top, which was hardcoded `lg:top-[104px]`.
 *
 * ── Where the availability line went ─────────────────────────────────────
 *
 * Into the bar, as specified. It sits between the wordmark and the links from
 * `xl` up, where there is room for it, with the blinking dot it always had.
 * Below `xl` it is in the mobile menu and on /remote-collaboration/. It is
 * the one claim the site is pointed at, so it is not dropped; it no longer
 * costs 31px of every viewport to say it.
 *
 * ══════════════════════════════════════════════════════════════════════════
 * STICKY, AND THE BLUR AFTER SCROLL
 * ══════════════════════════════════════════════════════════════════════════
 *
 * `sticky` rather than `fixed`. Both pin the bar; `sticky` leaves it in flow,
 * which means the hero does not need to reserve space for it with a magic
 * top padding, and `scroll-padding-top` is the only offset in play.
 *
 * At the top of the page the bar is transparent, so the hero reads to the top
 * edge of the viewport. After 8px of scroll it takes a translucent ground, a
 * 14px backdrop blur and a hairline. That hairline is an INSET shadow, not a
 * `border-b`: a border would make the bar 73px against a 72px cap. 8px rather
 * than a viewport fraction
 * because the state is about "has the page moved at all", and anything larger
 * leaves the bar transparent over content it is sitting on top of.
 *
 * ── Why this is a client component now, and what that costs ──────────────
 *
 * It was a server component, which was worth keeping and is no longer
 * possible: the brief asks for a background that changes after scroll and a
 * hamburger below 1100px, and both need state. The cost is measured rather
 * than assumed: one scroll listener, passive, writing a boolean, plus the
 * menu's own state. No IntersectionObserver, no resize listener, no layout
 * read in the scroll handler — `window.scrollY` is free.
 *
 * The bar renders its full markup on the server either way, so the links are
 * in the exported HTML and work before hydration. Only the blur and the menu
 * wait for the bundle.
 *
 * ══════════════════════════════════════════════════════════════════════════
 * THE LINKS: five, plus one button, plus More
 * ══════════════════════════════════════════════════════════════════════════
 *
 * `PRIMARY_NAV` is Work, Services, About, Insights, Contact — five, from
 * lib/brand.ts. `MORE_NAV` is everything the bar used to carry on top of
 * those: Experience, Expertise, Resume, Certifications, Pricing, How we work,
 * Hire me. The red "Start a project" button is the sixth item and the only
 * filled thing in the bar.
 *
 * It was eight top-level items, two of them dropdowns with fourteen children
 * between them, a WhatsApp square and a "Let's Connect" button. Measured, the
 * row needed about 1,236px and every item was `shrink-0 whitespace-nowrap`,
 * so below roughly 1200px the children ran straight past the container.
 *
 * The arithmetic now, at the tightest desktop width (`nav`, 1100px):
 *
 *   wordmark                                    ~150px
 *   5 links at 14px + More, 24px gaps           ~470px
 *   "Start a project" button                    ~165px
 *   gaps between the three groups                ~48px
 *   gutters (px-8)                                64px
 *   ------------------------------------------------------
 *   total                                       ~897px   of 1100 available
 *
 * 203px of slack at the breakpoint where the desktop bar first appears, and
 * the gaps grow rather than the content at wider widths. Nothing can overflow
 * at 1024 (hamburger), 1100, 1280 or 1440.
 *
 * ══════════════════════════════════════════════════════════════════════════
 * BELOW 1100px: a real hamburger
 * ══════════════════════════════════════════════════════════════════════════
 *
 * `nav:` is a named breakpoint at 1100px in tailwind.config.ts rather than an
 * arbitrary value, so the bar and the menu button cannot be told different
 * numbers.
 *
 * The panel is `fixed`, covers from under the bar to the bottom of the
 * viewport, scrolls its own content, and carries every destination: the five
 * primary links, the More links, the availability line and the CTA. It is
 * `hidden` when closed, which is what keeps its links out of the tab order so
 * a keyboard user tabbing the bar does not fall into an invisible menu.
 *
 * What it replaced was the horizontally scrolling row of 22 links under the
 * bar: every nav destination including both dropdowns' children, in a 34px
 * strip, discoverable only by swiping sideways in a space a third of which
 * would have been scrollbar if the scrollbar had not been suppressed.
 *
 * The open state is local, and it reproduces the two behaviours
 * `UIProvider` (components/ui-context.tsx) already owns for the enquiry
 * modal: Escape closes, and `is-locked` on <html> stops the page behind
 * scrolling. Reading the provider instead would have been less code and
 * would make every route's header depend on the provider being mounted
 * above it, which app/not-found.tsx does not do. Same class, same key, so
 * the two cannot disagree about which overlay has the page.
 */

/* One link style. 14px, which is the type floor, and sentence case rather
   than the old uppercase 12px at 0.1em tracking: uppercase is what made eight
   labels need 620px of the bar. */
const LINK =
  'relative shrink-0 whitespace-nowrap py-2 font-body text-small font-medium transition-colors duration-200';

function linkClass(active: boolean) {
  return `${LINK} ${active ? 'text-ink' : 'text-ink-secondary hover:text-ink'}`;
}

/** The red hairline under the current page's link. */
function ActiveRule({ on }: { on: boolean }) {
  return on ? (
    <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-px bg-accent" />
  ) : null;
}

export function SiteNav({ active }: { active?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  /* The ground-after-scroll state. One passive listener writing one boolean,
     and it only writes when the value actually changes, so a long scroll is
     one state update rather than one per frame. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Escape closes the menu, and the document is locked while it is open, so
     the page behind cannot be scrolled by a touch that misses a link. Both
     are the same behaviour the enquiry modal has; see the note above about
     why this is local state rather than UIProvider's — the provider is a
     client context and this bar renders inside it on every route, but reading
     it here would make every route's header depend on the provider existing,
     which /404 does not have. */
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.classList.add('is-locked');
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      root.classList.remove('is-locked');
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      {/* Keyboard users land here first. The bar repeats on every page, so
          without this every page costs several tabs before the content. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-toast focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:font-body focus:text-small focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={`sticky top-0 z-header transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          scrolled
            ? 'bg-ground/80 shadow-header-rule backdrop-blur-[14px]'
            : 'bg-transparent shadow-none'
        }`}
      >
        <div
          className={`mx-auto flex w-full max-w-shell items-center gap-3 px-gutter transition-[height] duration-300 lg:gap-6 ${
            scrolled ? 'h-header-sm' : 'h-header'
          }`}
        >
          <Link
            href="/"
            aria-label="Yuvraj Raulji, home"
            className="flex shrink-0 items-center transition-opacity duration-200 hover:opacity-70"
          >
            <Wordmark />
          </Link>

          {/*
            The availability line stood here, `xl` and up, between the
            wordmark and the links. It is in the footer now, next to the
            response-time line: a 46-character uppercase mono sentence in the
            header competed with the five nav links and the button for the one
            row they share, and it read as a third strip in a bar that exists
            to be one. The claim itself is unchanged and still on every page.
          */}
          <nav aria-label="Primary" className="ml-auto hidden items-center gap-3 nav:flex lg:gap-6">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active === item.label ? 'page' : undefined}
                className={linkClass(active === item.label)}
              >
                {item.label}
                <ActiveRule on={active === item.label} />
              </Link>
            ))}

            {/*
              More.

              Opens on `:hover` and on `:focus-within`, with no script and no
              state, which is the same mechanism the old Services and
              Resources menus used and the one thing about them worth keeping:

                pointer    hovering the trigger opens the panel
                keyboard   tabbing into the trigger opens it, because the
                           trigger is inside the group and `focus-within`
                           matches; tabbing past the last item closes it
                touch      hover does not exist below `nav`, and below `nav`
                           this whole row is replaced by the hamburger, so
                           there is no touch case to trap a reader in

              `invisible opacity-0` rather than `hidden`, because the links
              have to stay focusable for `focus-within` to be able to reveal
              the panel at all. `pointer-events-none` stops the invisible
              panel swallowing clicks meant for the page underneath.

              No `aria-expanded`: there is no button and no script to keep it
              honest, and a static `aria-expanded="false"` on an element that
              visibly opens is worse than none.
            */}
            <div className="group relative">
              <button
                type="button"
                /* A real button, so it is focusable and announces itself. It
                   has no click handler on purpose: the panel is opened by
                   hover and focus, and a handler would give a pointer user a
                   toggle that fights the hover. */
                className={`${LINK} flex items-center gap-2 text-ink-secondary group-hover:text-ink group-focus-within:text-ink`}
              >
                More
                <svg
                  aria-hidden="true"
                  viewBox="0 0 10 6"
                  width="9"
                  height="6"
                  className="shrink-0 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                >
                  <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>

              <div className="pointer-events-none invisible absolute right-0 top-full z-header pt-3 opacity-0 transition-[opacity,visibility] duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100">
                <ul className="m-0 flex w-[240px] list-none flex-col rounded border border-line bg-elevated p-0 shadow-lifted">
                  {MORE_NAV.map((item) => (
                    <li key={item.href} className="border-b border-line last:border-b-0">
                      <Link
                        href={item.href}
                        className="block px-4 py-3 font-body text-small text-ink-secondary transition-colors duration-150 hover:text-accent-bright"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/*
              The one primary action in the bar, and it is a link to /contact/
              rather than the enquiry modal: a reader on /experience/ who
              wanted to write a message used to be sent back to the homepage
              form to do it. The modal is still there for the in-page calls to
              action that open it.

              WhatsApp is no longer in the bar. It is the floating button
              now (components/chrome/whatsapp-float.tsx), which is where the
              brief puts it and where it is reachable from any scroll position
              rather than only from the top of the page.
            */}
            <ThemeToggle />

            {/*
              TWO LABELS, one element.

              The brief puts the hamburger below 768px only, which means the
              five links, the toggle and this button all have to fit a 768px
              row. Measured, they did not: the bar needed 907px, so every
              interior page reported a 139px horizontal overflow at 768 (the
              homepage hid it behind `overflow-x: clip` on its wrapper, which
              is why only the interior pages showed it).

              The fix is the label, not the breakpoint. "Book a 30-min call"
              is 18 characters and the longest single element in the bar;
              "Book a call" says the same thing in 11 and buys back ~70px,
              which with the tighter gaps brings the row to ~714px at 768.
              The full label returns at `lg`, where there is room for it.

              `sr-only` is not used for the hidden half: both spans are real
              text and only one is displayed, so the accessible name is
              whichever one is shown rather than both read in sequence.
            */}
            <Link
              href="/contact/"
              data-event="contact_cta_click"
              className="inline-flex min-h-[44px] shrink-0 items-center rounded bg-accent px-3 font-body text-small font-semibold text-white transition-colors duration-200 hover:bg-accent-deep lg:px-6"
            >
              <span className="lg:hidden">Book a call</span>
              <span className="hidden lg:inline">Book a 30-min call</span>
            </Link>
          </nav>

          {/*
              One right-hand cluster below `nav`: the theme toggle and the
              hamburger, in that order.

              Grouped in a single `ml-auto` flex rather than given one each.
              Two siblings both carrying `ml-auto` do not sit together — the
              first is pushed right, then the second is pushed right of that,
              and the gap between them becomes the parent's `gap-6`. One
              wrapper with `gap-2` keeps them as the pair they read as.

              The toggle is outside the panel deliberately: a reader changing
              theme should not have to open the menu to do it.
          */}
          <div className="ml-auto flex items-center gap-2 nav:hidden">
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded text-ink transition-colors duration-200 hover:text-accent-bright nav:hidden"
            >
              <span aria-hidden="true" className="relative block h-[14px] w-[22px]">
                {/* Three bars that become a cross. Transform only, so it is
                    cheap and it respects prefers-reduced-motion through the
                    global transition-duration collapse in app/globals.css. */}
                <span
                  className={`absolute left-0 block h-[2px] w-full bg-current transition-transform duration-200 ${
                    open ? 'top-[6px] rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-[6px] block h-[2px] w-full bg-current transition-opacity duration-200 ${
                    open ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[2px] w-full bg-current transition-transform duration-200 ${
                    open ? 'top-[6px] -rotate-45' : 'top-[12px]'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/*
        The mobile panel.

        `hidden` when closed, not `invisible`: there is a real toggle button
        with `aria-expanded` driving it, so the links must leave the tab order
        when the menu is shut. That is the opposite of the More panel above,
        which has no button and therefore needs `focus-within` to be able to
        match.

        Positioned from under the bar to the bottom of the viewport with its
        own scroll, so a long list on a short phone is reachable without the
        page behind it moving.
      */}
      <div
        id="mobile-nav"
        className={`fixed inset-x-0 bottom-0 top-header z-sticky overflow-y-auto border-t border-line bg-ground nav:hidden ${
          open ? 'block' : 'hidden'
        }`}
      >
        <nav aria-label="Primary, mobile" className="mx-auto w-full max-w-shell px-gutter py-8">
          <ul className="m-0 flex list-none flex-col gap-0 p-0">
            {PRIMARY_NAV.map((item) => (
              <li key={item.label} className="border-b border-line">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.label ? 'page' : undefined}
                  className={`block py-4 font-heading text-h3 font-medium ${
                    active === item.label ? 'text-accent-bright' : 'text-ink'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="m-0 mt-8 font-mono text-eyebrow font-medium uppercase text-ink-muted">
            More
          </p>
          <ul className="m-0 mt-4 grid list-none grid-cols-2 gap-x-6 gap-y-3 p-0">
            {MORE_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-1 font-body text-small text-ink-secondary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/contact/"
            onClick={() => setOpen(false)}
            data-event="contact_cta_click"
            className="mt-8 flex min-h-[48px] items-center justify-center rounded bg-accent px-6 font-body text-small font-semibold text-white"
          >
            Book a 30-min call
          </Link>

        </nav>
      </div>
    </>
  );
}
