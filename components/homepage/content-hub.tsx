'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  CONTENT,
  CONTENT_FORMATS,
  CONTENT_ITEMS,
  CONTENT_TOPICS,
  FORMAT_LABEL,
  SECTIONS,
  type ContentFormat,
  type ContentTopic,
} from '../../lib/home';
import { ArrowIcon } from '../ui/icons';
import { Lines, Rise } from './motion';
import { Marker, Section, Shell, TextLink } from './primitives';

const meta = SECTIONS.find((s) => s.id === 'writing')!;

type TopicFilter = ContentTopic | 'all';
type FormatFilter = ContentFormat | 'all';

/**
 * Thinking out loud.
 *
 * Two filter axes, both derived from the data in lib/home.ts rather than
 * hardcoded here: a topic or a format with nothing behind it is never offered
 * as a filter, so the grid cannot be emptied by clicking something. The format
 * row hides itself entirely while only one format exists, which is the case
 * today; publish the first reel or note and the row appears on its own.
 *
 * Filtering happens on an already-rendered list. Every card is in the static
 * HTML, so the section is complete for a crawler and for anyone with
 * JavaScript disabled, and the filters are an enhancement on top.
 */
export function ContentHub() {
  const [topic, setTopic] = useState<TopicFilter>('all');
  const [format, setFormat] = useState<FormatFilter>('all');

  const items = useMemo(
    () =>
      CONTENT_ITEMS.filter(
        (i) => (topic === 'all' || i.topic === topic) && (format === 'all' || i.format === format),
      ),
    [topic, format],
  );

  const chip = (selected: boolean) =>
    `inline-flex h-9 items-center border px-4 text-[.64rem] font-bold uppercase tracking-[.16em] transition-colors duration-200 ${
      selected
        ? 'border-accent bg-accent text-white'
        : 'border-[var(--rule)] text-ink-muted hover:border-[var(--rule-strong)] hover:text-ink'
    }`;

  return (
    <Section id="writing" labelledBy="writing-title">
      <Shell>
        <Marker num={meta.num} label={meta.label} />

        <div className="grid gap-x-16 gap-y-block lg:grid-cols-[1fr_1fr]">
          <Lines as="h2" id="writing-title" lines={CONTENT.headline} softFrom={1} />
          <Rise delay={0.18} className="self-end">
            <p className="yr-lede max-w-[42ch]">{CONTENT.body}</p>
          </Rise>
        </div>

        {/* ── Filters ── */}
        <Rise delay={0.1} className="mt-head flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by topic">
            <span className="yr-label mr-2">Topic</span>
            <button type="button" onClick={() => setTopic('all')} aria-pressed={topic === 'all'} className={chip(topic === 'all')}>
              All
            </button>
            {CONTENT_TOPICS.map((t) => (
              <button key={t} type="button" onClick={() => setTopic(t)} aria-pressed={topic === t} className={chip(topic === t)}>
                {t}
              </button>
            ))}
          </div>

          {CONTENT_FORMATS.length > 1 ? (
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by format">
              <span className="yr-label mr-2">Format</span>
              <button type="button" onClick={() => setFormat('all')} aria-pressed={format === 'all'} className={chip(format === 'all')}>
                All
              </button>
              {CONTENT_FORMATS.map((f) => (
                <button key={f} type="button" onClick={() => setFormat(f)} aria-pressed={format === f} className={chip(format === f)}>
                  {FORMAT_LABEL[f]}
                </button>
              ))}
            </div>
          ) : null}
        </Rise>

        {/* Filter changes are announced, because otherwise the only feedback is
            a visual reflow a screen reader user never learns about. */}
        <p aria-live="polite" className="sr-only">
          {items.length} {items.length === 1 ? 'item' : 'items'} shown
        </p>

        <ul className="mt-grid grid gap-px bg-[var(--rule)] md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.slug} className="bg-bg">
              <article className="yr-card group h-full !border-0">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[.62rem] font-bold uppercase tracking-[.2em] text-accent-bright">
                    {item.topic}
                  </p>
                  <p className="yr-label">{FORMAT_LABEL[item.format].replace(/s$/, '')}</p>
                </div>

                <h3 className="mt-item font-display text-[1.08rem] leading-[1.24] tracking-[-.01em] text-ink transition-colors duration-300 group-hover:text-accent-bright">
                  <Link href={item.href} className="after:absolute after:inset-0 after:content-['']">
                    {item.title}
                  </Link>
                </h3>

                <p className="yr-note mt-tight flex-1 text-[.86rem]">{item.excerpt}</p>

                <div className="mt-item flex items-center justify-between gap-4 border-t border-[var(--rule)] pt-item">
                  <p className="yr-label">
                    <time dateTime={new Date(item.date).toISOString().slice(0, 10)}>{item.date}</time>
                    <span aria-hidden="true"> · </span>
                    {item.meta}
                  </p>
                  <ArrowIcon
                    size={16}
                    className="shrink-0 text-ink-faint transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-accent-bright"
                  />
                </div>
              </article>
            </li>
          ))}
        </ul>

        <Rise delay={0.1} className="mt-tail">
          <TextLink href={CONTENT.cta.href}>{CONTENT.cta.label}</TextLink>
        </Rise>
      </Shell>
    </Section>
  );
}
