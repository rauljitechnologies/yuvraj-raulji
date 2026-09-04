import Link from 'next/link';
import { CORE_IDEA, NAME } from '../../lib/brand';
import { PERSON_JOB_TITLE } from '../../lib/schema';
import { PILLAR_LINKS } from '../../lib/expertise';
import { AI_LINKS, PLATFORM_LINKS } from '../../lib/technology';
import { CONTACT, POST_COUNT } from '../../lib/site';
import { Cta } from '../homepage-sections/primitives';
import { Wordmark } from '../wordmark';

/**
 * The site footer. One component, rendered by every route.
 *
 * There used to be two. The homepage carried the canvas footer (the closing
 * call to action, the monogram, the availability pill, the social boxes, the
 * red sweep rule and the bottom bar) and every other route carried a plainer
 * editorial one, so the site ended two different ways depending on where the
 * reader happened to be. This is the canvas design, rolled out site-wide, and
 * `HomeFooter` is gone rather than left behind as a second thing to keep in
 * sync.
 *
 * ── What changed on the way over ───────────────────────────────────────────
 *
 * 1. Every link goes somewhere real. The canvas footer had a Services column
 *    of six labels that all pointed at /expertise/, and a Topics column that
 *    did the same. Six links to one page is not navigation, it is the same
 *    link written six ways, so Services is gone and Topics is generated from
 *    PILLAR_LINKS: seven indexed pages, each with its own anchor text. Losing
 *    every inbound chrome link to those pages was the thing to avoid here.
 *
 * 2. The homepage-only anchors are absolute. `#ai`, `#book` and `#top` resolve
 *    to nothing from /about/ or an article, and a footer that is on every page
 *    cannot carry links that only work on one. They are `/#ai` and `/#book`
 *    now, and back-to-top targets `#main`, which every page has because the
 *    skip link needs it.
 *
 * 3. One contact record. The canvas footer printed hello@yuvrajraulji.com from
 *    lib/homepage.ts while the rest of the site printed the address in
 *    lib/site.ts. Two addresses for one person is the kind of detail a reader
 *    reads as carelessness, and only one of them is a mailbox. lib/site.ts is
 *    the record now, here and everywhere.
 *
 * A server component. Nothing here needs an event handler, and a scripted
 * back-to-top button would cost a client bundle on every route to duplicate a
 * key the browser already provides.
 */

/** Everything the site actually publishes, in the order a reader would look. */
const EXPLORE = [
  { href: '/about/', label: 'About' },
  { href: '/work/', label: 'Work' },
  { href: '/expertise/', label: 'Expertise' },
  { href: '/experience/', label: 'Experience' },
  { href: '/insights/', label: `Insights (${POST_COUNT} articles)` },
  { href: '/#ai', label: 'AI' },
  /* /hire/ sits above Contact deliberately: it answers the question a reader
     has just before they get in touch, and it is the page that disqualifies a
     wrong-fit enquiry before it becomes a call. It ships in the footer rather
     than the header because the header already carries one call to action and
     a second would compete with it. */
  { href: '/hire/', label: 'Hire' },
  { href: '/contact/', label: 'Contact' },
] as const;

/**
 * What the thirty minutes is. Three beats, condensed from the consultation
 * section on the homepage rather than written fresh: this band ships on every
 * page, so anything it claims has to be something the site already stands
 * behind. The reply window is the one the FAQ answer gives.
 */
const SESSION = [
  { title: 'Bring the problem', note: 'Commerce, architecture or an AI decision.' },
  { title: 'We name the decision', note: 'The one the system has outgrown.' },
  { title: 'You leave with a step', note: 'The next practical one, not a proposal.' },
] as const;

const SOCIAL = [
  { short: 'IN', label: 'LinkedIn', href: CONTACT.linkedin },
  { short: 'IG', label: 'Instagram', href: CONTACT.instagram },
  { short: 'FB', label: 'Facebook', href: CONTACT.facebook },
] as const;

/*
 * `py-1.5` is for the touch target, not the rhythm. At this size the links
 * measure 20px tall, which is half of a usable tap target, and there are more
 * than a dozen of them stacked in the columns.
 */
const linkCls =
  'py-1.5 font-manrope text-[15px] leading-[1.3] text-ink/70 transition-colors duration-200 hover:text-accent-bright';

const headingCls =
  'mb-2 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.24em] text-ink/55';

function Column({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <h2 className={headingCls}>{heading}</h2>
      {children}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="overflow-hidden border-t border-ink/10 bg-ground font-manrope text-ink">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-6 md:px-8 lg:px-12">
        {/*
          The closing call to action.

          This band ends every page on the site, so it is the last thing a
          reader sees on all of them, and it used to be an eyebrow, a sentence
          and two buttons on empty black. What was missing was not decoration:
          it was an answer to the question the buttons ask. A reader who is
          deciding whether to write does not need a nicer button, they need to
          know what the thirty minutes is, what to bring, and how long a reply
          takes.

          So the left column argues and acts, and the right column answers, as
          three cells over a 1px gap. That is the same device the consultation
          and stat grids use, so this reads as part of the site rather than as
          a footer that invented its own vocabulary. The copy is the
          consultation section's, condensed; nothing here promises anything the
          page above it does not already say.

          Behind it: the hero's blueprint grid, at the same 88px pitch and
          masked to fade out well before any edge, and one low red wash in the
          corner the eye enters from. The two brackets of the page carry the
          same texture, which is what makes this a band and not a gap.
        */}
        <div className="relative overflow-hidden border-b border-ink/10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:88px_88px] [mask-image:radial-gradient(75%_70%_at_18%_0%,#000,transparent)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-32 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgb(var(--accent-rgb)/0.14),transparent_70%)]"
          />

          <div className="relative grid gap-12 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-16 lg:py-[104px]">
            <div>
              <div className="mb-6 flex items-center gap-3.5 sm:mb-8">
                <span aria-hidden="true" className="h-px w-11 bg-accent" />
                <span className="font-mono text-[10px] font-medium uppercase leading-none tracking-[0.24em] text-ink/50">
                  Next step
                </span>
              </div>

              {/* Two authored lines. Left to wrap on its own at 52px the
                  question broke as "\u2026behind / it?", and a two-character
                  last line is the one break a headline must not have. The
                  ceiling is the size at which the longer of the two lines still
                  fits this column, measured rather than guessed. */}
              <p className="m-0 font-manrope text-[clamp(28px,3vw,44px)] font-light leading-[1.1] tracking-[-0.035em] text-ink/80">
                Have a system that has outgrown
                <span className="block font-semibold text-ink">the decision behind it?</span>
              </p>

              <p className="mt-6 max-w-[46ch] font-manrope text-[16px] font-light leading-[1.7] text-ink/50 sm:mt-7 sm:text-[17px]">
                Thirty minutes on your constraint, not on my slides. Bring the problem and we will
                name the decision behind it, and the next practical step.
              </p>

              <div className="mt-9 flex flex-col gap-3.5 sm:mt-11 sm:flex-row sm:flex-wrap">
                <Cta href={`mailto:${CONTACT.email}`} variant="accent">
                  Start a conversation
                </Cta>
                <Cta href="/#book" variant="outline">
                  Book 30 minutes
                </Cta>
              </div>
            </div>

            {/*
              What the thirty minutes is, as three cells over a 1px gap.
              `bg-ink/10` is the gap colour and each cell paints the ground back
              over it, which is how every other hairline grid on the site is
              drawn: one border rule instead of twelve that have to agree.
            */}
            <div className="grid gap-px self-center border border-ink/10 bg-ink/10">
              <ul className="grid gap-px bg-ink/10">
                {SESSION.map((step) => (
                  <li
                    key={step.title}
                    className="flex items-baseline gap-5 bg-ground px-6 py-6 sm:px-7 sm:py-7"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span>
                      <span className="block font-manrope text-[17px] font-semibold leading-[1.25] tracking-[-0.01em] text-ink">
                        {step.title}
                      </span>
                      <span className="mt-1.5 block font-manrope text-[14px] font-light leading-[1.55] text-ink/50">
                        {step.note}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              {/* Not a fourth step, so not a fourth item: it is what the
                  reader gets after acting, and it sits in the panel as its own
                  row rather than inside the list. */}
              <p className="flex items-center gap-2.5 bg-ground px-6 py-4 sm:px-7">
                <span
                  aria-hidden="true"
                  className="h-[7px] w-[7px] shrink-0 rounded-full bg-accent animate-yr-blink"
                />
                <span className="font-mono text-[10px] font-medium uppercase leading-none tracking-[0.18em] text-ink/60">
                  Replies within 24 hours, IST business days
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Sitemap columns. */}
        {/*
          `min(190px,100%)` rather than a bare 190px: on a 375px screen the
          gutters leave less than 190px of track, and auto-fit will hold a
          column at its stated minimum even when that overflows the grid.
        */}
        <div className="relative">
          {/*
            The oversized outlined wordmark from the design canvas, which never
            made it into the build. Drawn as an outline at 8% ink so it reads as
            texture rather than as a second logo, hidden below `lg` where it
            would crowd the stacked columns, and `aria-hidden` because the mark
            beside the columns already carries the name. It is the same device
            the share cards use, so the two ends of a shared link agree.
          */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-6 right-0 hidden select-none font-display text-[190px] font-bold leading-none tracking-[-0.05em] text-transparent lg:block"
            style={{ WebkitTextStroke: '1px rgb(var(--text-rgb) / 0.08)' }}
          >
            YR
          </span>

        <div className="relative grid gap-x-10 gap-y-10 py-12 sm:gap-y-11 sm:py-16 [grid-template-columns:repeat(auto-fit,minmax(min(190px,100%),1fr))]">
          <div>
            {/*
              The wordmark, not the drawn monogram.

              Both headers render `Wordmark` and the footer rendered `Monogram`,
              so the mark changed halfway down every page. Yuvraj asked for the
              mark to be type rather than a drawing on 26 Aug 2026 and the
              headers were changed then; the footer was missed.
            */}
            <Link href="/" className="mb-5 inline-flex" aria-label={`${NAME}, home`}>
              <Wordmark />
            </Link>

            {/*
              The positioning line, in full.

              This read "Technology consultant", which is not the positioning
              and not what any other surface says. All 55 Person nodes, the
              title, the H1 and the share cards state the whole line, so the
              footer was the most-repeated contradiction of it on the site: one
              per page, on every page. It is read from the same constant the
              schema uses, so the two cannot drift again.
            */}
            <p className="mb-6 font-mono text-[10px] uppercase leading-[1.6] tracking-[0.16em] text-ink/55">
              {PERSON_JOB_TITLE}
            </p>

            <p className="mb-7 max-w-[330px] font-manrope text-[15px] font-light leading-[1.7] text-ink/50">
              {CORE_IDEA} Writing and building at the intersection of AI, business and eCommerce,
              from Vadodara, India.
            </p>

            {/*
              The availability pill is gone. It said "Available for Q3 projects",
              which dates itself: it was written in August and was three weeks
              from being false, on every page, with nothing in the build to catch
              it. Availability is also not something the record can support, and
              CONTENT-PRINCIPLES.md does not allow a claim the site cannot stand
              behind. The band above already tells a reader what they need, which
              is that a reply arrives within 24 hours.
            */}
          </div>

          <Column heading="Explore">
            {EXPLORE.map((link) => (
              <Link key={link.href} href={link.href} className={linkCls}>
                {link.label}
              </Link>
            ))}
          </Column>

          <Column heading="Platforms">
            {PLATFORM_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={linkCls}>
                {link.label}
              </Link>
            ))}
          </Column>

          {/* The AI pages and the one discipline that is not a technology.
              Split across two columns rather than stacked into one so neither
              runs to ten rows, and grouped the way a reader would group them
              rather than in registry order. */}
          <Column heading="AI & strategy">
            {AI_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={linkCls}>
                {link.label}
              </Link>
            ))}
            {PILLAR_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={linkCls}>
                {link.label}
              </Link>
            ))}
          </Column>

          <Column heading="Contact">
            <a href={`mailto:${CONTACT.email}`} className={`break-words ${linkCls}`}>
              {CONTACT.email}
            </a>
            <a href={`tel:${CONTACT.phoneE164}`} className={linkCls}>
              {CONTACT.phoneDisplay}
            </a>
            <span className="mt-1.5 font-manrope text-[15px] leading-[1.5] text-ink/50">
              {CONTACT.location}
              <br />
              IST · GMT+5:30
            </span>
            <div className="mt-2 flex gap-2.5">
              {SOCIAL.map((social) => (
                <a
                  key={social.short}
                  href={social.href}
                  aria-label={social.label}
                  rel="me noopener noreferrer"
                  target="_blank"
                  className="border border-ink/20 px-3 py-2.5 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.14em] text-ink/70 transition-colors duration-200 hover:border-accent hover:text-ink"
                >
                  {social.short}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
            </div>
          </Column>
        </div>

        </div>

        {/* The red rule that sweeps in once, from the left. */}
        <div className="relative h-0.5 overflow-hidden bg-ink/10">
          <div className="absolute inset-0 origin-left bg-accent animate-yr-sweep" />
        </div>

        {/*
          Insights and Work used to sit here as links, three rows below the same
          two links in the Explore column. A duplicate link in the same footer
          adds no route a reader did not already have and splits the anchor text
          for the page it points at, so the bar now carries the entity line
          instead: the one thing worth repeating on every page.
        */}
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-7 font-mono text-xs leading-[1.6] text-ink/55 sm:py-8">
          <span>© {new Date().getFullYear()} {NAME}. All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="text-ink/45">{PERSON_JOB_TITLE}</span>
            <a href="#main" className="py-1.5 text-ink/55 transition-colors hover:text-ink">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
