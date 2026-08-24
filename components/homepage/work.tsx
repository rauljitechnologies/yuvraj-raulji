import { SECTIONS, WORK, WORK_ITEMS } from '../../lib/home';
import { ArrowIcon } from '../ui/icons';
import { Lines, Rise } from './motion';
import { Marker, Section, Shell, TextLink } from './primitives';

const meta = SECTIONS.find((s) => s.id === 'work')!;

/**
 * Selected work.
 *
 * Six engagements, each linking to the full case study on the Raulji
 * Technologies site. The whole tile is the link, so the target is the size of
 * the card rather than a small "read more"; the cover image is decorative
 * inside that link and carries an empty alt, because the accessible name is
 * already the project name and category.
 *
 * The outcome row appears only for entries where the record states a measured
 * result. Five of these six have no documented figure and therefore show none:
 * an empty row is the honest layout, and CONTENT-PRINCIPLES.md is explicit that
 * a plausible-sounding number is worse than no number.
 */
export function Work() {
  return (
    <Section id="work" labelledBy="work-title">
      <Shell>
        <Marker num={meta.num} label={meta.label} />

        <div className="grid gap-x-16 gap-y-block lg:grid-cols-[1fr_1fr]">
          <Lines as="h2" id="work-title" lines={WORK.headline} softFrom={1} />
          <Rise delay={0.18} className="self-end">
            <p className="yr-lede max-w-[54ch]">{WORK.body}</p>
          </Rise>
        </div>

        <ul className="mt-grid grid gap-x-8 gap-y-grid md:grid-cols-2">
          {WORK_ITEMS.map((item, i) => (
            <li key={item.id}>
              <Rise delay={(i % 2) * 0.08}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block focus-visible:outline-none"
                >
                  <div className="yr-frame aspect-[16/11]">
                    <img
                      src={item.img}
                      alt={item.alt}
                      width={item.imgW}
                      height={item.imgH}
                      /* Everything in this section is well below the fold. */
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 768px) 92vw, (max-width: 1440px) 46vw, 660px"
                      className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="mt-item flex items-start justify-between gap-6">
                    <div>
                      <p className="text-[.64rem] font-bold uppercase tracking-[.2em] text-accent-bright">
                        {item.category}
                      </p>
                      <h3 className="yr-display yr-display--3 mt-tight transition-colors duration-300 group-hover:text-accent-bright">
                        {item.name}
                      </h3>
                    </div>
                    <ArrowIcon
                      size={20}
                      className="mt-1 shrink-0 text-ink-faint transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-accent-bright"
                    />
                  </div>

                  <p className="yr-note mt-item max-w-[56ch]">{item.summary}</p>

                  <dl className="mt-item flex flex-wrap items-baseline gap-x-8 gap-y-tight border-t border-[var(--rule)] pt-item">
                    <div className="flex items-baseline gap-3">
                      <dt className="yr-label">Stack</dt>
                      <dd className="text-[.78rem] text-ink-secondary">{item.stack.join(' · ')}</dd>
                    </div>
                    {item.outcome ? (
                      <div className="flex items-baseline gap-3">
                        <dt className="yr-label">Outcome</dt>
                        <dd className="text-[.78rem] font-semibold text-ink">{item.outcome}</dd>
                      </div>
                    ) : null}
                  </dl>

                  <span className="sr-only">
                    Read the {item.name} case study (opens in a new tab)
                  </span>
                </a>
              </Rise>
            </li>
          ))}
        </ul>

        <Rise delay={0.1} className="mt-tail">
          <TextLink href="https://www.rauljitechnologies.com/case-study/" external>
            All case studies
          </TextLink>
        </Rise>
      </Shell>
    </Section>
  );
}
