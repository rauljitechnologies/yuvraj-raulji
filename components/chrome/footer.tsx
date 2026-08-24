import Link from 'next/link';
import { CORE_IDEA, NAME, NAV } from '../../lib/brand';
import { PILLAR_LINKS } from '../../lib/expertise';
import { CONTACT, POST_COUNT } from '../../lib/site';

/**
 * Site footer.
 *
 * A server component: nothing here needs an event handler, and a back-to-top
 * button would cost a client bundle on every page to duplicate a key the
 * browser already provides.
 *
 * Three columns and an identity block. What is deliberately not here: a
 * company name, a directorship, a foundership line, two radial gradient
 * washes, a 19rem outlined monogram, six coloured hover shadows and a pulsing
 * availability dot. Restraint is the brand; a personal page that glows is a
 * template.
 *
 * The Topics column is generated from PILLAR_LINKS rather than hand-written.
 * Those routes are outside the personal-brand set but they are real, indexed
 * pages, and dropping every inbound link to them from the site chrome would
 * orphan seven URLs to tidy up a column.
 *
 * Every link carries descriptive anchor text. "Read more" appears nowhere on
 * this site: the anchor is the only description of the target that most
 * crawlers and most keyboard users ever get.
 */

const linkCls =
  'inline-block text-[.82rem] leading-[1.5] text-ink-muted transition-colors duration-200 hover:text-ink';

function Column({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="yr-label">{heading}</h2>
      <ul className="mt-item space-y-3">{children}</ul>
    </div>
  );
}

const EXPLORE = [
  ...NAV.map((n) =>
    n.href === '/blog/' ? { label: `Thinking (${POST_COUNT} articles)`, href: n.href } : n,
  ),
];

const CONNECT = [
  { label: 'LinkedIn', href: CONTACT.linkedin },
  { label: 'Instagram', href: CONTACT.instagram },
  { label: 'Facebook', href: CONTACT.facebook },
];

export function SiteFooter() {
  return (
    <footer className="yr-scope border-t border-line bg-ground">
      <div className="yr-shell py-[clamp(56px,7vw,96px)]">
        <div className="grid gap-x-10 gap-y-grid sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* ── Identity ── the one-line thesis, on every page ── */}
          <div>
            <Link
              href="/"
              className="font-display text-[1.15rem] font-medium uppercase leading-none tracking-[.14em] text-ink transition-colors duration-200 hover:text-accent-bright"
            >
              {NAME}
            </Link>
            <p className="mt-item max-w-[32ch] text-[.86rem] leading-[1.7] text-ink-secondary">
              {CORE_IDEA} Writing and building at the intersection of AI, business and eCommerce,
              from Vadodara, India.
            </p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="yr-link mt-block inline-flex text-[.82rem]"
            >
              {CONTACT.email}
            </a>
          </div>

          <Column heading="Explore">
            {EXPLORE.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkCls}>
                  {l.label}
                </Link>
              </li>
            ))}
          </Column>

          <Column heading="Topics">
            {PILLAR_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkCls}>
                  {l.label}
                </Link>
              </li>
            ))}
          </Column>

          <Column heading="Connect">
            {CONNECT.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  {l.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
            <li>
              <a href={`tel:${CONTACT.phoneE164}`} className={linkCls}>
                {CONTACT.phoneDisplay}
              </a>
            </li>
          </Column>
        </div>

        <div className="mt-grid flex flex-col gap-3 border-t border-line pt-item sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[.74rem] text-ink-faint">
            &copy; {new Date().getFullYear()} {NAME}.
          </p>
          <p className="text-[.74rem] text-ink-faint">{CONTACT.location} &middot; IST (GMT+5:30)</p>
        </div>
      </div>
    </footer>
  );
}
