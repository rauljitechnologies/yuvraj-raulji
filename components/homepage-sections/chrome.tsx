import { CONTACT } from '../../lib/homepage';
import { Cta, Monogram, StatusPill } from './primitives';
import { Wordmark } from '../wordmark';

/**
 * Header and footer for the redesigned homepage.
 *
 * These are homepage-scoped on purpose. The rest of the site still renders
 * components/chrome/nav.tsx and footer.tsx, which are drawn in the previous
 * design language. Rolling this chrome out site-wide is a separate change,
 * because it would restyle every route.
 *
 * Both are server components. The header needs no JavaScript: it is
 * `position: sticky`, and the section links are plain in-page anchors that the
 * browser handles natively (`scroll-behavior: smooth` is already set globally).
 */

/** Primary nav. Every target is a section that exists on this page. */
const NAV = [
  { href: '#about', label: 'About' },
  { href: '#expertise', label: 'Expertise' },
  { href: '#work', label: 'Work' },
  { href: '#ai', label: 'AI' },
  { href: '#insights', label: 'Insights' },
] as const;

export function HomeHeader() {
  return (
    <header className="sticky top-0 z-header border-b border-ink/10 bg-ground/70 backdrop-blur-[14px]">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-6 py-4 lg:px-12 lg:py-[18px]">
        <a
          href="#top"
          aria-label="Yuvraj Raulji, back to top"
          className="shrink-0 transition-opacity duration-200 hover:opacity-70"
        >
          <Wordmark />
        </a>

        {/*
          Hidden below lg rather than collapsed into a drawer: a toggle would
          make this a client component and ship JS for five links. The same five
          sections are reachable by scrolling, and the footer lists them all.
        */}
        <nav aria-label="Homepage sections" className="hidden items-center gap-[34px] lg:flex">
          {NAV.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="border-b border-transparent py-1.5 font-manrope text-[13px] font-medium uppercase leading-none tracking-[0.1em] text-ink/60 transition-colors duration-200 hover:border-accent hover:text-ink"
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="shrink-0 bg-accent px-5 py-3.5 font-manrope text-xs font-bold uppercase leading-none tracking-[0.14em] text-white transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent-bright motion-reduce:hover:translate-y-0 lg:px-[26px] lg:py-[15px]"
        >
          Let&rsquo;s talk
        </a>
      </div>
    </header>
  );
}

const FOOTER_COLUMNS = [
  {
    heading: 'Services',
    links: [
      { href: '/expertise/', label: 'eCommerce platforms' },
      { href: '/expertise/', label: 'Mobile apps' },
      { href: '/expertise/', label: 'Custom software' },
      { href: '#ai', label: 'AI systems' },
      { href: '/expertise/', label: 'Cloud & DevOps' },
      { href: '#book', label: 'Fractional CTO' },
    ],
  },
  {
    heading: 'Explore',
    links: [
      { href: '/about/', label: 'About' },
      { href: '/work/', label: 'Work' },
      { href: '/expertise/', label: 'Expertise' },
      { href: '#ai', label: 'AI' },
      { href: '/blog/', label: 'Insights' },
      { href: '#book', label: 'Hire / consult' },
    ],
  },
  {
    heading: 'Topics',
    links: [
      { href: '/expertise/', label: 'Magento 2 & Adobe Commerce' },
      { href: '/expertise/', label: 'Shopify & Shopify Plus' },
      { href: '/expertise/', label: 'Headless commerce' },
      { href: '#ai', label: 'AI commerce & automation' },
      { href: '/about/', label: 'Digital transformation' },
    ],
  },
] as const;

const SOCIAL = [
  { href: CONTACT.linkedin, short: 'In', label: 'LinkedIn' },
  { href: CONTACT.instagram, short: 'Ig', label: 'Instagram' },
  { href: CONTACT.facebook, short: 'Fb', label: 'Facebook' },
] as const;

export function HomeFooter() {
  return (
    <footer className="overflow-hidden border-t border-ink/10 bg-ground">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Closing call to action. */}
        <div className="grid items-center gap-14 border-b border-ink/10 py-20 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <span className="mb-5 block font-mono text-[10px] font-medium uppercase leading-none tracking-[0.24em] text-ink/35">
              Next step
            </span>
            <h2 className="m-0 font-manrope text-[clamp(30px,3.4vw,52px)] font-extralight leading-[1.06] tracking-[-0.035em]">
              Have a system that has outgrown{' '}
              <span className="font-bold">the decision behind it?</span>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-3.5">
            <Cta href={`mailto:${CONTACT.email}`} variant="accent">
              Start a conversation
            </Cta>
            <Cta href="#book" variant="outline">
              Book 30 minutes
            </Cta>
          </div>
        </div>

        {/* Sitemap columns. */}
        <div className="grid gap-x-10 gap-y-11 py-16 [grid-template-columns:repeat(auto-fit,minmax(190px,1fr))]">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <Monogram size={40} />
              <span className="flex flex-col leading-[1.1]">
                <span className="font-manrope text-[13px] font-bold uppercase leading-none tracking-[0.14em]">
                  Yuvraj Raulji
                </span>
                <span className="font-mono text-[10px] uppercase leading-[1.5] tracking-[0.14em] text-ink/40">
                  Technology consultant
                </span>
              </span>
            </div>
            <p className="mb-7 max-w-[330px] font-manrope text-[15px] font-light leading-[1.7] text-ink/45">
              End-to-end technology consulting: eCommerce, mobile apps, custom software and AI
              systems for companies and agencies building their next phase of growth.
            </p>
            <StatusPill>Available for Q3 projects</StatusPill>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading} className="flex flex-col gap-3">
              <span className="mb-2 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.24em] text-ink/35">
                {column.heading}
              </span>
              {column.links.map((link) => (
                <a
                  key={`${column.heading}-${link.label}`}
                  href={link.href}
                  className="font-manrope text-[15px] leading-[1.3] text-ink/70 transition-colors duration-200 hover:text-accent-bright"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}

          <div className="flex flex-col gap-3">
            <span className="mb-2 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.24em] text-ink/35">
              Contact
            </span>
            <a
              href={`mailto:${CONTACT.email}`}
              className="font-manrope text-[15px] leading-[1.3] text-ink/70 transition-colors duration-200 hover:text-accent-bright"
            >
              {CONTACT.email}
            </a>
            <a
              href={CONTACT.phoneHref}
              className="font-manrope text-[15px] leading-[1.3] text-ink/70 transition-colors duration-200 hover:text-accent-bright"
            >
              {CONTACT.phone}
            </a>
            <span className="font-manrope text-[15px] leading-[1.5] text-ink/45">
              {CONTACT.location}
              <br />
              {CONTACT.timezone}
            </span>
            <div className="mt-2 flex gap-2.5">
              {SOCIAL.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  rel="me noopener"
                  target="_blank"
                  className="border border-ink/20 px-3 py-2.5 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.14em] text-ink/70 transition-colors duration-200 hover:border-accent hover:text-ink"
                >
                  {social.short}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* The red rule that sweeps in once, from the left. */}
        <div className="relative h-0.5 overflow-hidden bg-ink/10">
          <div className="absolute inset-0 origin-left bg-accent animate-yr-sweep" />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-8 py-8 font-mono text-xs leading-[1.6] text-ink/40">
          <span>© {new Date().getFullYear()} Yuvraj Raulji. All rights reserved.</span>
          <div className="flex flex-wrap gap-6">
            <a href="/blog/" className="text-ink/55 transition-colors hover:text-ink">
              Insights
            </a>
            <a href="/work/" className="text-ink/55 transition-colors hover:text-ink">
              Work
            </a>
            <a href="#top" className="text-ink/55 transition-colors hover:text-ink">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
