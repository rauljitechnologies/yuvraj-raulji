'use client';

import Link from 'next/link';
import { POSTS } from '../../../lib/posts';
import { CONTACT } from '../../../lib/site';
import { CONTACT_SECTION, INSIGHTS, INSIGHT_SLUGS, STATEMENT } from '../../../lib/universe';
import { useUI } from '../../ui-context';
import { setHover, useHover } from '../hover';
import { CTA, Eyebrow, Reveal, SceneSection, SplitHeading } from '../ui';

/**
 * Insights, the founder statement, and the closing contact moment.
 *
 * The statement section is deliberately the emptiest thing on the page: no
 * module is mounted behind it and the ambient field is dimmed, so two lines of
 * type carry it alone. Contact is the opposite: everything in the world
 * collapses into one point while the invitation resolves on top of it.
 */

export function InsightsSection() {
  const hovered = useHover();
  const posts = INSIGHT_SLUGS.map((slug) => ({ slug, post: POSTS[slug] })).filter((x) => x.post);

  return (
    <SceneSection id="insights" scene="insights" labelledBy="insights-title" tall>
      <div className="u-insights-head">
        <Eyebrow>{INSIGHTS.eyebrow}</Eyebrow>
        <SplitHeading id="insights-title" text={INSIGHTS.headline} accentFrom={2} />
        <Reveal className="u-prose">
          <p className="u-lede">{INSIGHTS.body}</p>
        </Reveal>
      </div>

      <Reveal as="ul" className="u-insight-list" stagger={0.07} y={24}>
        {posts.map(({ slug, post }) => {
          const id = `insight-${slug}`;
          return (
            <li key={slug}>
              <Link
                href={`/blog/${slug}/`}
                className={`u-insight-card ${hovered === id ? 'is-active' : ''}`}
                onPointerEnter={() => setHover(id)}
                onPointerLeave={() => setHover(null)}
                onFocus={() => setHover(id)}
                onBlur={() => setHover(null)}
              >
                <span className="u-insight-cat">{post.cat}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <span className="u-insight-meta">
                  {post.date} <span aria-hidden="true">·</span> {post.readTime}
                </span>
              </Link>
            </li>
          );
        })}
      </Reveal>

      <Reveal className="u-inline-cta" y={18}>
        <CTA variant="ghost" href="/blog/">
          All insights <span aria-hidden="true">→</span>
        </CTA>
      </Reveal>
    </SceneSection>
  );
}

export function StatementSection() {
  return (
    <SceneSection scene="statement" labelledBy="statement-title" className="u-statement">
      <blockquote>
        <SplitHeading id="statement-title" text={STATEMENT.lines[0]} className="u-display--xl" />
        <SplitHeading text={STATEMENT.lines[1]} accentFrom={0} className="u-display--xl" as="h3" />
        <Reveal className="u-signature" y={14}>
          <cite>
            <span aria-hidden="true">— </span>
            {STATEMENT.signature}
          </cite>
        </Reveal>
      </blockquote>
    </SceneSection>
  );
}

export function ContactSection() {
  const { setContactOpen } = useUI();

  return (
    <SceneSection id="contact" scene="contact" labelledBy="contact-title" className="u-contact" tall>
      <div className="u-centered">
        <Eyebrow>{CONTACT_SECTION.eyebrow}</Eyebrow>
        <SplitHeading
          id="contact-title"
          text={CONTACT_SECTION.headline}
          accentFrom={1}
          className="u-display--xl"
        />
        <Reveal className="u-prose">
          <p className="u-lede">{CONTACT_SECTION.body}</p>
        </Reveal>

        <Reveal className="u-actions u-actions--centred" stagger={0.1}>
          <CTA onClick={() => setContactOpen(true)}>
            {CONTACT_SECTION.primary} <span aria-hidden="true">→</span>
          </CTA>
          <CTA variant="ghost" href={CONTACT.linkedin} external>
            {CONTACT_SECTION.secondary} <span aria-hidden="true">→</span>
          </CTA>
        </Reveal>

        <Reveal className="u-contact-direct" y={16}>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <span aria-hidden="true" className="u-dot" />
          <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phoneDisplay}</a>
          <span aria-hidden="true" className="u-dot" />
          <span>{CONTACT.location}</span>
        </Reveal>
      </div>
    </SceneSection>
  );
}
