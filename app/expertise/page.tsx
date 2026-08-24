import type { Metadata } from 'next';
import { Page, PageHero } from '../../components/chrome/page';
import { Lines, Rise } from '../../components/homepage/motion';
import { Btn, InlineLink, Marker, Section, Shell, Tag } from '../../components/homepage/primitives';
import { ContactButton } from '../../components/homepage/contact-button';
import { EXPERTISE_HUB, PILLARS, pillarHref } from '../../lib/expertise';
import { expertiseHubSchema, type Crumb } from '../../lib/schema';
import { SITE_URL } from '../../lib/site';
import '../home.css';

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Expertise', href: '/expertise/' },
];

export const metadata: Metadata = {
  title: EXPERTISE_HUB.title,
  description: EXPERTISE_HUB.description,
  alternates: { canonical: `${SITE_URL}/expertise/` },
  openGraph: {
    title: EXPERTISE_HUB.title,
    description: EXPERTISE_HUB.description,
    url: `${SITE_URL}/expertise/`,
    siteName: 'Yuvraj Raulji',
    type: 'website',
    locale: 'en_US',
  },
  twitter: { card: 'summary', title: EXPERTISE_HUB.title, description: EXPERTISE_HUB.description },
};

/**
 * Expertise hub.
 *
 * Six rows, not a card grid. Each row carries the discipline, what it is, the
 * situation it is wrong for, and its stack, which is enough for a visitor to
 * self-select without opening anything. That is the point of a hub: it should
 * be usable on its own, not a menu that forces six clicks to find out what is
 * behind each label.
 *
 * The `wrong` line is on the hub as well as the pillar page on purpose. A
 * service index where every entry is a recommendation reads as a menu; one
 * where each entry names its own limit reads as a point of view, and it is the
 * fastest way to establish that this is not a vendor page.
 */
export default function ExpertiseHub() {
  return (
    <Page schema={expertiseHubSchema(crumbs)} active="Expertise">
      <PageHero
        eyebrow={EXPERTISE_HUB.eyebrow}
        lines={EXPERTISE_HUB.h1}
        lede={EXPERTISE_HUB.lede}
        crumbs={crumbs}
      >
        <ContactButton>Discuss a project</ContactButton>
        <Btn href="/work/" variant="ghost">
          See the work
        </Btn>
      </PageHero>

      <Section id="pillars" labelledBy="pillars-title">
        <Shell>
          <Marker num="01" label="Practice areas" />

          <div className="grid gap-x-16 gap-y-block lg:grid-cols-[1fr_1fr]">
            <Lines
              as="h2"
              id="pillars-title"
              lines={['Six areas.', 'Six honest limits.']}
              softFrom={1}
            />
            <Rise delay={0.18} className="self-end">
              <p className="yr-lede max-w-[54ch]">{EXPERTISE_HUB.body}</p>
            </Rise>
          </div>

          <ul className="mt-grid">
            {PILLARS.map((p, i) => (
              <li
                key={p.slug}
                className="border-t border-[var(--rule)] py-block last:border-b last:border-[var(--rule)]"
              >
                <Rise delay={Math.min(i, 3) * 0.06}>
                  <div className="grid gap-x-12 gap-y-item lg:grid-cols-[minmax(0,.95fr)_minmax(0,1.1fr)_minmax(0,1fr)]">
                    {/* ── Number, title, stack ── */}
                    <div>
                      <p aria-hidden="true" className="yr-marker__num text-[.68rem] font-semibold tracking-[.26em]">
                        {p.num}
                      </p>
                      <h3 className="yr-display yr-display--3 mt-tight max-w-[18ch]">
                        {/* The whole heading is the link, so the anchor text is
                            the discipline name and nothing else has to carry it. */}
                        <a
                          href={pillarHref(p.slug)}
                          className="transition-colors duration-200 hover:text-accent-bright"
                        >
                          {p.label}
                        </a>
                      </h3>
                      <p className="mt-item flex flex-wrap gap-x-1.5 gap-y-2">
                        {p.stack.slice(0, 3).map((s) => (
                          <Tag key={s}>{s}</Tag>
                        ))}
                      </p>
                    </div>

                    {/* ── What it is ── */}
                    <div>
                      <p className="yr-note max-w-[52ch]">{p.lede}</p>
                      <p className="mt-item">
                        <InlineLink href={pillarHref(p.slug)} lead>
                          {p.label} in full
                        </InlineLink>
                      </p>
                    </div>

                    {/* ── The limit ── */}
                    <div className="border-l border-accent/40 pl-5">
                      <p className="yr-label text-accent-bright">Wrong choice when</p>
                      <p className="yr-note mt-hair max-w-[52ch]">{p.wrong}</p>
                    </div>
                  </div>
                </Rise>
              </li>
            ))}
          </ul>
        </Shell>
      </Section>

      <Section id="next" labelledBy="next-title" tall>
        <Shell>
          <Lines
            as="h2"
            id="next-title"
            lines={['Not sure which', 'of the six this is?']}
            softFrom={1}
            className="max-w-[20ch]"
          />
          <Rise delay={0.2} className="mt-head">
            <p className="yr-lede max-w-[52ch]">
              That is usually the right starting position. Most engagements begin as one of these
              and turn out to be another, which is what the first conversation is for.
            </p>
          </Rise>
          <Rise delay={0.3} className="mt-block flex flex-wrap gap-3">
            <ContactButton>Discuss a project</ContactButton>
            <Btn href="/about/" variant="ghost">
              About Yuvraj Raulji
            </Btn>
          </Rise>
        </Shell>
      </Section>
    </Page>
  );
}
