import type { Metadata } from 'next';
import { Page } from '../components/chrome/page';
import { Btn, Lede, Marker, Section, Shell } from '../components/homepage/primitives';
import { Lines } from '../components/homepage/motion';
import './home.css';

/**
 * The page a reader lands on when a URL does not exist.
 *
 * ── What was here before ────────────────────────────────────────────────────
 *
 * The framework default: the title "404: This page could not be found.", a
 * number and a sentence in inline styles, on a white page with no header, no
 * footer, no branding and no links. A reader arriving from a stale bookmark, a
 * broken citation or a mistyped path hit a dead end with no way back into the
 * site, which is the most expensive place to lose someone because they were
 * already interested enough to follow a link.
 *
 * ── Why it is built out of `Page` ───────────────────────────────────────────
 *
 * So it cannot drift. The header, the footer and the ground are the ones every
 * other route renders, from the same components, which means this page gets the
 * navigation, the platform list and the contact details for free and keeps them
 * without anyone remembering to.
 *
 * ── The four exits ──────────────────────────────────────────────────────────
 *
 * Not a search box, and not a link to the homepage alone. A reader who followed
 * a dead link wanted something specific, and the four destinations below are the
 * four things this site is: what I work on, what I have built, what I have
 * written, and how to start a conversation. The footer under them carries the
 * full platform list for anyone who wanted a particular technology.
 *
 * ── Status code ─────────────────────────────────────────────────────────────
 *
 * Under `output: 'export'` this renders to `404.html`, which the host serves
 * with a real 404. That matters: a styled page served as 200 is a soft 404 and
 * is worse for search than the default page was. robots.txt already disallows
 * /404/ and /_not-found/ so the route itself is never indexed.
 */

export const metadata: Metadata = {
  title: 'Page not found | Yuvraj Raulji',
  description:
    'That page does not exist. The commerce, AI and technology pages, the work and the writing are all one click from here.',
  /* This override is load-bearing, not belt and braces. The root layout sets a
     site-wide default of `index, follow`, and the framework emits its own
     `noindex` for this route, so leaving this out ships a page carrying two
     robots tags that contradict each other. Stating it here makes both tags
     agree. No canonical: a page that must never be indexed should not nominate
     a preferred version of itself, and robots.txt disallows /404/ as well. */
  robots: { index: false, follow: true },
};

const EXITS = [
  { href: '/expertise/', label: 'Expertise', note: 'Commerce platforms, AI and the limits of each' },
  { href: '/work/', label: 'Work', note: 'Six builds, and the decision inside each one' },
  { href: '/insights/', label: 'Insights', note: 'Writing on commerce technology and architecture' },
  { href: '/hire/', label: 'Hire', note: 'Three engagement shapes, and what this is not' },
] as const;

export default function NotFound() {
  return (
    <Page schema={{}}>
      <Section id="not-found" labelledBy="page-title" open className="!pt-[118px] md:!pt-[146px]">
        <Shell>
          <Marker label="404" />

          <Lines
            as="h1"
            id="page-title"
            size="1"
            lines={['That page does not exist.', { text: 'These do.', accent: true }]}
          />

          <Lede className="mt-item max-w-[52ch]">
            The address may have changed, or it may never have been one. Nothing is lost: the four
            places below cover everything on this site, and the footer carries every platform page.
          </Lede>

          {/* A list, because that is what it is: four destinations of equal
              weight, not a hero with a primary action. */}
          <ul className="m-0 mt-10 grid list-none gap-px border border-line bg-line p-0 sm:mt-14 sm:grid-cols-2">
            {EXITS.map((x) => (
              <li key={x.href} className="bg-ground p-6 sm:p-8">
                <Btn href={x.href} variant="ghost" arrow>
                  {x.label}
                </Btn>
                <p className="m-0 mt-2 max-w-[34ch] font-manrope text-[15px] font-light leading-[1.6] text-ink/55">
                  {x.note}
                </p>
              </li>
            ))}
          </ul>
        </Shell>
      </Section>
    </Page>
  );
}
