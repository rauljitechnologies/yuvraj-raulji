'use client';

import { CREDIBILITY, HERO, PHILOSOPHY } from '../../../lib/universe';
import { FOUNDER_PORTRAIT } from '../founder-media';
import { useUI } from '../../ui-context';
import { useUniverse } from '../provider';
import { CTA, Eyebrow, Reveal, SceneSection, SplitHeading } from '../ui';

/**
 * Hero and philosophy.
 *
 * The hero holds the page's single H1. Its content is present in the markup
 * from the first byte and only *fades* once the founder intro hands over, so
 * the headline is indexable and readable even if the intro never runs, the
 * canvas never mounts, or JavaScript fails outright.
 */

/**
 * Hero composition, in two columns at desktop.
 *
 * Left is the argument: name, the single H1, the lede, and one row of actions.
 * Right is the person: the portrait, the three roles, and the working status.
 *
 * The right column used to be an empty reserved box, because the founder frame
 * that fills it is drawn in WebGL and dissolves when the intro ends. That left
 * the composition with a hole in it for the whole rest of the visit, which is
 * the state a visitor actually spends their time in. The portrait now lives
 * there permanently and in the same place the clip played, so the intro hands
 * over to a still of the same person rather than to nothing.
 */
export function HeroSection() {
  const { setContactOpen } = useUI();
  const { introDone, replayIntro, scrollTo } = useUniverse();

  return (
    <SceneSection id="hero" scene="hero" labelledBy="hero-title" className="u-hero">
      <div className="u-hero-grid">
        <Reveal className="u-hero-copy" stagger={0.09} enabled={introDone}>
          <div>
            <Eyebrow>{HERO.eyebrow}</Eyebrow>
          </div>

          {/* The one H1 on the page. */}
          <SplitHeading
            as="h1"
            id="hero-title"
            text={HERO.headline}
            accentFrom={5}
            className="u-hero-title"
            enabled={introDone}
          />

          <p className="u-lede">{HERO.lede}</p>

          {/*
            One row, not three. The two calls to action and the intro replay
            were previously stacked as three separate bands of buttons, which
            gave a visitor three competing next steps of equal weight. Replaying
            the intro is the quietest of the three, so it reads as a play link
            beside them rather than as a third button.
          */}
          <div className="u-actions">
            <CTA onClick={() => setContactOpen(true)}>
              {HERO.ctaPrimary} <span aria-hidden="true">→</span>
            </CTA>
            <CTA
              variant="ghost"
              href="#work"
              onClick={() => scrollTo('#work')}
              aria-label={`${HERO.ctaSecondary}, jump to selected work`}
            >
              {HERO.ctaSecondary} <span aria-hidden="true">↓</span>
            </CTA>
            <button type="button" onClick={replayIntro} className="u-hero-play">
              <span className="u-hero-play-mark" aria-hidden="true" />
              Meet Yuvraj
            </button>
          </div>
        </Reveal>

        <Reveal className="u-hero-card" stagger={0.08} y={26} enabled={introDone}>
          <figure className="u-hero-portrait">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={FOUNDER_PORTRAIT}
              alt="Yuvraj Raulji"
              width={400}
              height={400}
              // Above the fold and in the LCP candidate set, so it is never lazy.
              loading="eager"
              decoding="async"
            />
          </figure>

          <ul className="u-roles">
            {HERO.roles.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>

          <p className="u-hero-status">
            <span className="u-hero-dot" aria-hidden="true" />
            {HERO.availability}
            <span className="u-hero-base">{HERO.base}</span>
          </p>
        </Reveal>
      </div>

      <Reveal className="u-credibility" stagger={0.06} y={18} enabled={introDone}>
        {CREDIBILITY.map((c) => (
          <div key={c.label} className="u-cred">
            <span className="u-cred-value">{c.value}</span>
            <span className="u-cred-label">{c.label}</span>
          </div>
        ))}
      </Reveal>

      <div className="u-scroll-hint" aria-hidden="true">
        <span>Scroll</span>
        <span className="u-scroll-line" />
      </div>
    </SceneSection>
  );
}

export function PhilosophySection() {
  return (
    <SceneSection scene="philosophy" labelledBy="philosophy-title" className="u-centered">
      <Eyebrow>{PHILOSOPHY.eyebrow}</Eyebrow>
      <SplitHeading
        id="philosophy-title"
        text={PHILOSOPHY.headline}
        accentFrom={2}
        className="u-display--xl"
      />
      <Reveal className="u-prose" stagger={0.12}>
        <p className="u-lede">{PHILOSOPHY.body}</p>
        <p className="u-support">{PHILOSOPHY.support}</p>
      </Reveal>
    </SceneSection>
  );
}
