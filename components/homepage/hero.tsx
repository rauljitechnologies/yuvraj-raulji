import { HERO } from '../../lib/home';
import { getPhoto } from '../../lib/founder-photos';
import { ContactButton } from './contact-button';
import { Lines, Rise } from './motion';
import { Parallax } from './parallax';
import { Btn, Section, Shell } from './primitives';

/**
 * Hero.
 *
 * Source order is the mobile order the brief asked for: portrait, headline,
 * supporting copy, calls to action. Desktop puts the portrait to the right of
 * the text with `lg:order-2` and a two-column grid, so the visual arrangement
 * changes without the DOM order changing, and a screen reader gets the same
 * sequence on both.
 *
 * The portrait is the real photograph the repository ships (400×400). If a
 * larger frame-filling shot is dropped in as public/assets/founder/
 * hero-portrait.*, it is picked up automatically and used instead.
 */
export function Hero() {
  const photo = getPhoto('hero-portrait');

  return (
    <Section id="hero" open labelledBy="hero-title" className="!pt-[118px] md:!pt-[146px]">
      <Shell>
        <div className="grid items-center gap-x-12 gap-y-block lg:grid-cols-[minmax(0,1fr)_minmax(300px,.62fr)] lg:gap-x-16">
          {/* ── Portrait ── first in source, right-hand column on desktop ── */}
          {photo ? (
            <div className="order-1 lg:order-2">
              <Parallax distance={54} className="relative mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:mx-0 lg:max-w-[420px]">
                {/* Offset rule frame. Purely typographic furniture, so it is
                    hidden from assistive technology and sits behind the plate. */}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-4 -right-4 h-full w-full border border-accent/35"
                />
                <div className="yr-frame yr-frame--live relative aspect-square">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    /* Above the fold and the largest element in the viewport on
                       mobile, so it is the LCP candidate: eager, high priority,
                       never lazy. */
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    sizes="(max-width: 640px) 300px, (max-width: 1024px) 360px, 420px"
                  />
                </div>
              </Parallax>
            </div>
          ) : null}

          {/* ── Text ── */}
          <div className="order-2 lg:order-1">
            <Rise as="p" className="yr-label mb-item flex items-center gap-3">
              <span aria-hidden="true" className="yr-dot" />
              {HERO.name}
            </Rise>

            <Lines
              as="h1"
              id="hero-title"
              size="1"
              lines={HERO.headline}
              softFrom={2}
            />

            {/* Positioning strip. The separators are decorative, so they are
                hidden and the three words are read as a list. */}
            <Rise delay={0.24} className="mt-item flex flex-wrap items-center gap-x-4 gap-y-hair">
              {HERO.highlight.map((word, i) => (
                <span key={word} className="flex items-center gap-4">
                  {i > 0 ? (
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" />
                  ) : null}
                  <span className="font-display text-[.76rem] uppercase tracking-[.26em] text-accent-bright">
                    {word}
                  </span>
                </span>
              ))}
            </Rise>

            <Rise delay={0.3} className="mt-item">
              <p className="yr-lede max-w-[52ch]">{HERO.lede}</p>
            </Rise>

            <Rise delay={0.36} className="mt-tight">
              <p className="text-[.72rem] font-medium uppercase tracking-[.16em] text-ink-faint">
                {HERO.disciplines.join('  ·  ')}
              </p>
            </Rise>

            <Rise delay={0.42} className="mt-block flex flex-wrap gap-3">
              <Btn href={HERO.ctaPrimary.href}>{HERO.ctaPrimary.label}</Btn>
              <ContactButton variant="ghost">{HERO.ctaSecondary.label}</ContactButton>
            </Rise>

            <Rise delay={0.5} className="mt-block flex flex-wrap items-stretch gap-x-10 gap-y-tight border-t border-[var(--rule)] pt-item">
              {HERO.meta.map((m) => (
                <div key={m.label}>
                  <p className="font-display text-[1.05rem] uppercase tracking-[.02em] text-ink">
                    {m.value}
                  </p>
                  <p className="yr-label mt-hair">{m.label}</p>
                </div>
              ))}
            </Rise>
          </div>
        </div>

        {/* ── Scroll cue ── decorative; the nav already provides the same jumps ── */}
        <div aria-hidden="true" className="mt-head hidden items-center gap-4 lg:flex">
          <span className="yr-cue__line" />
          <span className="yr-label">Scroll</span>
        </div>
      </Shell>
    </Section>
  );
}
