import Link from 'next/link';
import { CTA_LABEL, NAV, NAV_FLAT } from '../../lib/brand';
import { AVAILABILITY_CHIP } from '../../lib/identity';
import { CONTACT } from '../../lib/site';
import { HEADER_CTA_CLASS } from '../header-cta';
import { Wordmark } from '../wordmark';
import { WhatsAppAction } from './whatsapp-action';

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
 * ── Why this is still a server component ───────────────────────────────────
 *
 * The bar it replaced was a client component for two behaviours: a scroll
 * listener that faded the ground in once the page had moved, and an
 * IntersectionObserver that inverted it over the paper sections. Both existed
 * to keep a transparent bar readable. This bar is never transparent: it
 * carries its own translucent ground and a hairline from the first paint, and
 * it is legible over paper and over black without knowing which is under it.
 * No state, no listeners, no bundle, on all 74 pages.
 *
 * The two dropdowns did not change that, which was the point. They open on
 * `:hover` and on `:focus-within`:
 *
 *   pointer    hovering the trigger opens the panel
 *   keyboard   tabbing into the trigger opens it, because the trigger is
 *              inside the group and `focus-within` matches; tabbing past the
 *              last item closes it
 *   touch      hover does not exist, so the trigger is a real link to a page
 *              that lists the same destinations. A tap navigates rather than
 *              trapping the reader under a menu they cannot dismiss.
 *
 * The panel is not `display:none` when closed; it is `invisible` with zero
 * opacity, so its links stay in the accessibility tree and in the tab order,
 * which is what makes `focus-within` able to reveal it in the first place.
 * `aria-expanded` is deliberately absent: there is no button and no script to
 * keep it honest, and a static `aria-expanded="false"` on an element that
 * visibly opens is worse than none.
 *
 * The mobile menu went the same way as the old scroll listeners. A full-screen
 * panel needs an open state, a focus trap, a scroll lock and an Escape
 * handler; the row of links under the bar needs none of that and is always
 * visible, which is strictly better than a menu a reader has to open to
 * discover the site has one. It renders NAV_FLAT, so the dropdown
 * destinations are reachable on a phone without a dropdown existing there.
 *
 * ── Geometry ───────────────────────────────────────────────────────────────
 *
 * `fixed`, at 68px and 78px from `md`, which is what every interior page's top
 * padding is written against. The availability strip adds 30px above it from
 * `md`, and the phone link row adds 34px below it under `md`; the interior
 * heroes clear 118px and 146px respectively, so both fit without touching
 * them.
 */

const LINK_BASE =
  'shrink-0 whitespace-nowrap border-b font-manrope font-medium uppercase leading-none tracking-[0.1em] transition-colors duration-200 hover:border-accent hover:text-ink';

function navLinkClass(active: boolean, extra = '') {
  return `${LINK_BASE} ${
    active ? 'border-accent text-ink' : 'border-transparent text-ink/60'
  } ${extra}`;
}

/** One top-level item, with its panel when it has children. */
function NavItem({ item, active }: { item: (typeof NAV)[number]; active?: string }) {
  const isActive = active === item.label;

  if (!item.children) {
    return (
      <Link
        href={item.href}
        aria-current={isActive ? 'page' : undefined}
        className={navLinkClass(isActive, 'py-2.5 text-[12px] lg:text-[13px]')}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="group relative">
      <Link
        href={item.href}
        aria-current={isActive ? 'page' : undefined}
        className={navLinkClass(isActive, 'flex items-center gap-1.5 py-2.5 text-[12px] lg:text-[13px]')}
      >
        {item.label}
        {/* Decorative: the panel is the affordance, and a screen reader is
            already reading the panel's links. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 10 6"
          width="8"
          height="5"
          className="shrink-0 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
        >
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </Link>

      {/*
        `invisible` and `opacity-0` rather than `hidden`: the links must stay
        focusable for `focus-within` to be able to open the panel at all.
        `pointer-events-none` stops the invisible panel swallowing clicks meant
        for the page underneath.
      */}
      <div className="invisible absolute left-0 top-full z-header pt-3 opacity-0 transition-[opacity,visibility] duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <ul className="m-0 flex w-[262px] list-none flex-col gap-0 border border-line bg-elevated p-0 shadow-lifted">
          {item.children.map((c) => (
            <li key={`${item.label}-${c.href}-${c.label}`} className="border-b border-line last:border-b-0">
              <Link
                href={c.href}
                className="block px-5 py-3.5 font-manrope text-[13px] font-light leading-[1.4] text-ink/70 transition-colors duration-150 hover:bg-surface hover:text-accent-bright"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
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
        {/*
          The availability strip.

          It is the one claim the whole site is now pointed at, so it sits
          above the wordmark rather than inside the page, where it would only
          be seen by a reader who scrolled. Hidden under `md` because the bar
          and the condensed link row already take 102px there and a third
          stacked strip would push the hero off a phone; /remote-work/ carries
          the same line as its eyebrow, which is where a phone reader meets it.
        */}
        <div className="hidden border-b border-ink/10 md:block">
          <div className="mx-auto flex h-[30px] max-w-[1440px] items-center gap-2.5 px-8 lg:px-12">
            <span
              aria-hidden="true"
              className="h-[6px] w-[6px] shrink-0 rounded-full bg-accent animate-yr-blink"
            />
            <p className="m-0 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.22em] text-ink/55">
              {AVAILABILITY_CHIP}
            </p>
            <Link
              href="/contact/"
              className="ml-auto font-mono text-[10px] font-medium uppercase leading-none tracking-[0.18em] text-accent-bright underline decoration-accent/40 underline-offset-[5px] transition-colors hover:decoration-accent"
            >
              Start a project
            </Link>
          </div>
        </div>

        <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between gap-4 px-5 sm:gap-6 sm:px-6 md:h-[78px] md:px-8 lg:px-12">
          <Link
            href="/"
            aria-label="Yuvraj Raulji, home"
            className="flex shrink-0 items-center py-2 transition-opacity duration-200 hover:opacity-70"
          >
            <Wordmark />
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center md:flex md:gap-[18px] lg:gap-6 xl:gap-[30px]"
          >
            {NAV.map((item) => (
              <NavItem key={item.label} item={item} active={active} />
            ))}
          </nav>

          {/*
            A link to the contact page, not the enquiry modal. It used to point
            at `/#contact`, which is the homepage's form: a reader on
            /experience/ who wanted to write a message was sent back to the
            homepage to do it. The modal is still there for the in-page calls
            to action that open it.
          */}
          {/*
            Two actions: a message and a form. See the note in
            whatsapp-action.tsx for why WhatsApp is in the bar at all.

            `hidden sm:inline-flex` on the WhatsApp square because the bar was
            already measured to the edge: the note in components/wordmark.tsx
            records that the lockup plus this one call to action needed 340px
            after the wordmark was stepped down, and a 42px button with its gap
            puts that back over a 360px Android. Below `sm` the same action is
            the first item in the phone row underneath, where there is room for
            it and where it is the first thing in the scroller rather than
            something to be found.
          */}
          <div className="flex shrink-0 items-center gap-2.5">
            <WhatsAppAction className="hidden sm:inline-flex" />
            <Link href="/contact/" className={HEADER_CTA_CLASS}>
              {CTA_LABEL}
            </Link>
          </div>
        </div>

        {/*
          The phone row. `overflow-x-auto` is expected here rather than being a
          safety valve: NAV_FLAT is every destination including the two menus'
          children, which is more than fits, and a horizontal scroller is the
          honest way to present that without a menu needing state. The
          scrollbar itself is suppressed because the row is 34px tall and a
          visible one would take a third of it.
        */}
        <nav
          aria-label="Primary, condensed"
          className="flex gap-5 overflow-x-auto border-t border-ink/10 px-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:hidden"
        >
          {/*
            WhatsApp first, and only on the widths where the header bar cannot
            carry it. It is set in the accent and sits ahead of the navigation
            because this row is a scroller: anything past the third item is
            found only by a reader who already decided to look, and the point
            of this one is to be seen by a reader who has not.
          */}
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={`${LINK_BASE} shrink-0 border-accent/40 py-3.5 text-[11px] text-accent-bright sm:hidden`}
          >
            WhatsApp
            <span className="sr-only"> (opens in a new tab)</span>
          </a>

          {NAV_FLAT.map((item) => (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              aria-current={active === item.label ? 'page' : undefined}
              className={navLinkClass(active === item.label, 'py-3.5 text-[11px]')}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}
