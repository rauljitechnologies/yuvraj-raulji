import type { Metadata } from 'next';
import { Page, PageHero } from '../../components/chrome/page';
import { Lines, Rise } from '../../components/homepage/motion';
import { Btn, Marker, Section, Shell, Tag } from '../../components/homepage/primitives';
import { ContactButton } from '../../components/homepage/contact-button';
import { EXPERTISE_HUB, PILLARS, pillarHref } from '../../lib/expertise';
import { TECHNOLOGIES, techHref } from '../../lib/technology';
import { expertiseHubSchema, type Crumb } from '../../lib/schema';
import { OG_IMAGE, OG_IMAGE_URL, SITE_URL } from '../../lib/site';
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
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: EXPERTISE_HUB.title,
    description: EXPERTISE_HUB.description,
    images: [OG_IMAGE_URL],
  },
};

/**
 * Expertise hub.
 *
 * The index for the nine technology pages at the root of the site, plus the one
 * discipline that is not a technology.
 *
 * Every card names its own limit. A visitor should be able to rule a technology
 * out from this page without opening it, which is the point of a hub: it should
 * be usable on its own rather than a menu that forces a click per row to find
 * out what is behind each label.
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

      {/*
        The nine technology pages, in the homepage's card grid: cells over a 1px
        gap, a mono ordinal, the technology at display size with the accent rule
        under it, and the limit named inside the card.

        The limit is here rather than only on the page it belongs to, and that
        is deliberate. An index where every entry is a recommendation reads as a
        menu; one where each entry names the case against itself reads as a
        point of view, and it is the fastest way to establish that this is not a
        vendor page.

        The heading carries the link, so the anchor text is the technology name
        and nothing else has to carry it, and `after:absolute after:inset-0`
        stretches that one link over the whole card so the entire cell is a
        target without a second, competing anchor in the markup.
      */}
      <Section id="technology" labelledBy="technology-title">
        <Shell>
          <Marker label="By technology" />

          <div className="mb-10 flex flex-wrap items-end justify-between gap-8 sm:mb-14 lg:mb-[70px]">
            <Lines as="h2" id="technology-title" lines={['Nine technologies.', 'Nine honest limits.']} />
            <Rise delay={0.18}>
              <p className="m-0 max-w-[520px] font-manrope text-[17px] font-light leading-[1.7] text-ink/55">
                {EXPERTISE_HUB.body}
              </p>
            </Rise>
          </div>

          <ul className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-2">
            {TECHNOLOGIES.map((t, i) => (
              <li key={t.slug} className="flex">
                <Rise
                  delay={Math.min(i, 3) * 0.06}
                  className="group relative flex w-full flex-col bg-surface p-6 transition-colors duration-300 hover:bg-[var(--bg)] sm:p-8 lg:p-10"
                >
                  <div className="flex items-start justify-between">
                    <span
                      aria-hidden="true"
                      className="font-mono text-xs font-medium leading-none tracking-[0.2em] text-accent-bright"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span aria-hidden="true" className="font-mono text-xl leading-none text-ink/30">
                      ↗
                    </span>
                  </div>

                  <h3 className="mb-4 mt-7 font-manrope text-[clamp(22px,2.2vw,32px)] font-semibold leading-[1.08] tracking-[-0.03em]">
                    <a
                      href={techHref(t.slug)}
                      className="transition-colors duration-200 after:absolute after:inset-0 after:content-[''] group-hover:text-accent-bright"
                    >
                      {t.label}
                    </a>
                  </h3>

                  <div
                    aria-hidden="true"
                    className="h-0.5 w-16 origin-left bg-accent transition-transform duration-500 group-hover:scale-x-[1.6]"
                  />

                  <p className="mt-6 max-w-[52ch] font-manrope text-[16px] font-light leading-[1.7] text-ink/55">
                    {t.description}
                  </p>

                  {/* `mt-auto` so the limit sits on the floor of every card
                      whatever the description above it runs to, which is what
                      keeps a two-column grid of unequal text from looking
                      ragged along the bottom. */}
                  <div className="mt-auto border-l border-accent/40 pl-5 pt-8">
                    <p className="m-0 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-accent-bright">
                      Think twice when
                    </p>
                    <p className="m-0 mt-2.5 max-w-[52ch] font-manrope text-[15px] font-light leading-[1.65] text-ink/55">
                      {t.fit.thinkTwice[0]}.
                    </p>
                  </div>
                </Rise>
              </li>
            ))}
          </ul>
        </Shell>
      </Section>

      {/* ── The discipline ────────────────────────────────────────
          Every card above is a technology. This is the one entry that is not:
          the conversation that happens before a technology has been chosen, and
          the one a fair number of these engagements should start with. It sits
          apart from the grid because putting it inside would file a discipline
          as a tenth platform. */}
      {/*
        One section per pillar, and each one says which pillar it is.

        This block was written for a single entry and later wrapped in a map
        over three, which is how all three came to render `id="consulting"`,
        `aria-labelledby="consulting-title"` and the heading "When the platform
        is still an open question." Three consequences, all of them real: the
        page shipped duplicate element ids, which is invalid HTML; every
        section's `aria-labelledby` resolved to the *first* title, so a screen
        reader announced all three as the same region; and the outline read as
        one heading repeated three times, which told a crawler nothing about
        what the sections contained.

        The heading is the pillar's own `h1`, which is already authored and
        already distinct. The line it replaced was also only true of the first
        pillar: website management and eCommerce management are not questions
        about which platform to choose.
      */}
      {PILLARS.map((p) => (
        <Section key={p.slug} id={p.slug} labelledBy={`${p.slug}-title`}>
          <Shell>
            <Marker label={p.eyebrow} />
            <div className="mb-10 flex flex-wrap items-end justify-between gap-8 sm:mb-14">
              <Lines as="h2" id={`${p.slug}-title`} lines={p.h1} />
            </div>
            <div className="grid gap-x-16 gap-y-8 border-t border-line pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
              <Rise>
                <h3 className="m-0 font-manrope text-[clamp(22px,2.2vw,32px)] font-semibold leading-[1.08] tracking-[-0.03em]">
                  <a
                    href={pillarHref(p.slug)}
                    className="transition-colors duration-200 hover:text-accent-bright"
                  >
                    {p.label}
                  </a>
                </h3>
                <div
                  aria-hidden="true"
                  className="mt-4 h-0.5 w-16 bg-accent"
                />
                <div className="mt-8 flex flex-wrap gap-2">
                  {p.stack.slice(0, 4).map((sTag) => (
                    <Tag key={sTag}>{sTag}</Tag>
                  ))}
                </div>
              </Rise>
              <Rise delay={0.12}>
                <p className="m-0 max-w-[56ch] font-manrope text-[17px] font-light leading-[1.7] text-ink/55">
                  {p.lede}
                </p>
                <div className="mt-6 border-l border-accent/40 pl-5">
                  <p className="m-0 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-accent-bright">
                    Wrong choice when
                  </p>
                  <p className="m-0 mt-2.5 max-w-[52ch] font-manrope text-[15px] font-light leading-[1.65] text-ink/55">
                    {p.wrong}
                  </p>
                </div>
              </Rise>
            </div>
          </Shell>
        </Section>
      ))}

      {/* The question the index leaves a reader with, set as the homepage sets
          a statement: one line, large and light, with the turn at 600. */}
      <Section id="next" labelledBy="next-title" tall>
        <Shell>
          <Lines
            as="h2"
            id="next-title"
            lines={['Not sure which', 'of these it is?']}
            className="max-w-[20ch]"
          />
          <Rise delay={0.2} className="mt-10">
            <p className="m-0 max-w-[56ch] font-manrope text-[17px] font-light leading-[1.75] text-ink/55 sm:text-[19px]">
              That is usually the right starting position. Most engagements begin as one of these
              and turn out to be another, which is what the first conversation is for.
            </p>
          </Rise>
          <Rise delay={0.3} className="mt-10 flex flex-wrap gap-3 sm:mt-12">
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
