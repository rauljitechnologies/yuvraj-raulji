'use client';

import {
  COMMERCE,
  COMMERCE_NODES,
  EXPERTISE,
  INTELLIGENCE,
  ORBIT_ITEMS,
} from '../../../lib/universe';
import { setHover, useHover } from '../hover';
import { CTA, Eyebrow, Reveal, SceneSection, SplitHeading } from '../ui';

/**
 * Commerce, intelligence and expertise.
 *
 * Each list item here is bound to the object representing it in the scene by a
 * shared id: pointing at the DOM entry lights the 3D object, and pointing at
 * the 3D object opens the DOM entry. Two views of one state, which is what
 * makes the 3D layer feel like part of the page instead of a backdrop playing
 * behind it.
 */

export function CommerceSection() {
  const hovered = useHover();
  const activeNode = COMMERCE_NODES.find((n) => n.id === hovered) ?? null;

  return (
    <SceneSection id="commerce" scene="commerce" labelledBy="commerce-title" tall>
      <div className="u-split">
        <div className="u-split-copy">
          <Eyebrow>{COMMERCE.eyebrow}</Eyebrow>
          <SplitHeading id="commerce-title" text={COMMERCE.headline} accentFrom={2} />
          <Reveal className="u-prose">
            <p className="u-lede">{COMMERCE.body}</p>
          </Reveal>

          {/* The reveal panel. It holds its last selection rather than
              collapsing, so the layout does not jump every time the pointer
              crosses a gap between objects. */}
          <div className="u-detail" data-on={!!activeNode}>
            <p className="u-detail-label">{activeNode?.label ?? 'The stack'}</p>
            <p className="u-detail-note">
              {activeNode?.note ?? 'Point at any object to see where it sits in the architecture.'}
            </p>
          </div>
        </div>

        <Reveal as="ul" className="u-node-list" stagger={0.05} y={20}>
          {COMMERCE_NODES.map((n) => (
            <li key={n.id}>
              <button
                type="button"
                className={`u-node ${hovered === n.id ? 'is-active' : ''}`}
                onPointerEnter={() => setHover(n.id)}
                onPointerLeave={() => setHover(null)}
                onFocus={() => setHover(n.id)}
                onBlur={() => setHover(null)}
                aria-describedby="commerce-detail"
              >
                <span className="u-node-dot" aria-hidden="true" />
                <span className="u-node-label">{n.label}</span>
                <span className="u-node-note">{n.note}</span>
              </button>
            </li>
          ))}
        </Reveal>
      </div>
      <p id="commerce-detail" className="u-sr">
        Each item lights the matching object in the 3D scene.
      </p>
    </SceneSection>
  );
}

export function IntelligenceSection() {
  return (
    <SceneSection id="intelligence" scene="intelligence" labelledBy="intelligence-title" tall>
      <div className="u-centered">
        <Eyebrow>{INTELLIGENCE.eyebrow}</Eyebrow>
        <SplitHeading id="intelligence-title" text={INTELLIGENCE.headline} accentFrom={2} className="u-display--xl" />
        <Reveal className="u-prose">
          <p className="u-lede">{INTELLIGENCE.body}</p>
        </Reveal>

        {/* Mirrors the network compressing into its core in the scene behind. */}
        <Reveal as="ol" className="u-chain" stagger={0.14} y={16}>
          {INTELLIGENCE.chain.map((step, i) => (
            <li key={step}>
              <span className="u-chain-step">{step}</span>
              {i < INTELLIGENCE.chain.length - 1 ? (
                <span className="u-chain-arrow" aria-hidden="true">
                  →
                </span>
              ) : null}
            </li>
          ))}
        </Reveal>

        <Reveal className="u-duo" stagger={0.1}>
          {INTELLIGENCE.points.map((p) => (
            <article key={p.title} className="u-card">
              <h3>{p.title}</h3>
              <p>{p.note}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </SceneSection>
  );
}

export function ExpertiseSection() {
  const hovered = useHover();

  return (
    <SceneSection id="expertise" scene="expertise" labelledBy="expertise-title" tall>
      <div className="u-orbit-layout">
        <div className="u-orbit-copy">
          <Eyebrow>{EXPERTISE.eyebrow}</Eyebrow>
          <SplitHeading id="expertise-title" text={EXPERTISE.headline} accentFrom={2} />
          <Reveal className="u-prose">
            <p className="u-lede">{EXPERTISE.body}</p>
          </Reveal>
          {/* The centre of the orbit in the scene is this name. Stating it in
              the DOM keeps the composition legible without the canvas. */}
          <p className="u-orbit-centre" aria-hidden="true">
            Yuvraj Raulji
          </p>
        </div>

        <Reveal as="ol" className="u-orbit-list" stagger={0.06} y={22}>
          {ORBIT_ITEMS.map((item) => {
            const id = `orbit-${item.num}`;
            return (
              <li key={item.num}>
                <button
                  type="button"
                  className={`u-orbit-item ${hovered === id ? 'is-active' : ''}`}
                  onPointerEnter={() => setHover(id)}
                  onPointerLeave={() => setHover(null)}
                  onFocus={() => setHover(id)}
                  onBlur={() => setHover(null)}
                >
                  <span className="u-orbit-num">{item.num}</span>
                  <span className="u-orbit-label">{item.label}</span>
                  <span className="u-orbit-note">{item.note}</span>
                </button>
              </li>
            );
          })}
        </Reveal>
      </div>

      <Reveal className="u-inline-cta" y={18}>
        <CTA variant="ghost" href="/about/">
          Full background <span aria-hidden="true">→</span>
        </CTA>
      </Reveal>
    </SceneSection>
  );
}
