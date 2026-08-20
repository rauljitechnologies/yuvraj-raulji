'use client';

import {
  CURRENT_POSITIONS,
  EXPERIENCE_SECTION,
  MILESTONES,
  TECHNOLOGY,
  WORK,
  WORK_ITEMS,
} from '../../../lib/universe';
import { setHover, useHover } from '../hover';
import { Eyebrow, Reveal, SceneSection, SplitHeading } from '../ui';

/**
 * Work, technology and experience: the sections that have to carry proof.
 *
 * What is deliberately absent: invented outcomes. The case entries state
 * industry, platform and scope, because that is what the record supports. No
 * revenue figures, uplift percentages or client testimonials have been written
 * for projects that do not document them. The two performance figures that do
 * appear (in the experience timeline) are the ones already recorded against
 * those roles.
 */

export function WorkSection() {
  const hovered = useHover();

  return (
    <SceneSection id="work" scene="work" labelledBy="work-title" tall>
      <div className="u-work-head">
        <Eyebrow>{WORK.eyebrow}</Eyebrow>
        <SplitHeading id="work-title" text={WORK.headline} accentFrom={2} />
        <Reveal className="u-prose">
          <p className="u-lede">{WORK.body}</p>
        </Reveal>
      </div>

      <Reveal as="ul" className="u-work-list" stagger={0.07} y={26}>
        {WORK_ITEMS.map((item) => (
          <li key={item.id}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`u-work-card ${hovered === item.id ? 'is-active' : ''}`}
              onPointerEnter={() => setHover(item.id)}
              onPointerLeave={() => setHover(null)}
              onFocus={() => setHover(item.id)}
              onBlur={() => setHover(null)}
            >
              <h3 className="u-work-title">{item.title}</h3>

              <dl className="u-work-meta">
                <div>
                  <dt>Industry</dt>
                  <dd>{item.industry}</dd>
                </div>
                <div>
                  <dt>Technology</dt>
                  <dd>{item.tech}</dd>
                </div>
                {item.role ? (
                  <div>
                    <dt>Role</dt>
                    <dd>{item.role}</dd>
                  </div>
                ) : null}
              </dl>

              <p className="u-work-scope">{item.scope}</p>
              <span className="u-work-link">
                Explore case study <span aria-hidden="true">→</span>
              </span>
            </a>
          </li>
        ))}
      </Reveal>
    </SceneSection>
  );
}

export function TechnologySection() {
  return (
    <SceneSection id="technology" scene="technology" labelledBy="technology-title" tall>
      <div className="u-tech-head">
        <Eyebrow>{TECHNOLOGY.eyebrow}</Eyebrow>
        <SplitHeading id="technology-title" text={TECHNOLOGY.headline} accentFrom={2} />
        <Reveal className="u-prose">
          <p className="u-lede">{TECHNOLOGY.body}</p>
        </Reveal>
      </div>

      <Reveal as="ul" className="u-tech-grid" stagger={0.06} y={20}>
        {TECHNOLOGY.groups.map((g) => (
          <li key={g.title} className="u-tech-group">
            <h3>{g.title}</h3>
            <ul>
              {g.items.map((t) => (
                <li key={t}>
                  <span aria-hidden="true" className="u-tech-dot" />
                  {t}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </Reveal>
    </SceneSection>
  );
}

export function ExperienceSection() {
  const hovered = useHover();

  return (
    <SceneSection id="experience" scene="experience" labelledBy="experience-title" tall>
      <div className="u-exp-head">
        <Eyebrow>{EXPERIENCE_SECTION.eyebrow}</Eyebrow>
        <SplitHeading id="experience-title" text={EXPERIENCE_SECTION.headline} accentFrom={2} />
        <Reveal className="u-prose">
          <p className="u-lede">{EXPERIENCE_SECTION.body}</p>
        </Reveal>
      </div>

      <Reveal as="ol" className="u-timeline" stagger={0.08} y={26}>
        {MILESTONES.map((m, i) => {
          const id = `milestone-${i}`;
          return (
            <li
              key={id}
              className={`u-milestone ${hovered === id ? 'is-active' : ''}`}
              onPointerEnter={() => setHover(id)}
              onPointerLeave={() => setHover(null)}
            >
              <span className="u-milestone-period">{m.period}</span>
              <div className="u-milestone-body">
                <h3>
                  {m.title}
                  <span className="u-milestone-org">{m.org}</span>
                </h3>
                <p className="u-milestone-loc">{m.location}</p>
                <p className="u-milestone-summary">{m.summary}</p>
                {m.points.length ? (
                  <ul className="u-milestone-points">
                    {m.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          );
        })}
      </Reveal>

      <Reveal className="u-positions" y={18}>
        <p className="u-positions-label">Also holds</p>
        <ul>
          {CURRENT_POSITIONS.map((p) => (
            <li key={p.org}>
              <strong>{p.title}</strong>
              <span>{p.org}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </SceneSection>
  );
}
