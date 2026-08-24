'use client';

import { useMemo, useState } from 'react';
import { CASES, WORK_FILTERS, type WorkFilter } from '../../lib/brand';
import { Rise } from '../homepage/motion';
import { Tag } from '../homepage/primitives';

/**
 * The Work page case list, with its filters.
 *
 * ── Why this is a client component ─────────────────────────────────────────
 *
 * Filtering happens in the browser against an array that is already in the
 * bundle. Six items do not justify six routes, and a route per facet would
 * publish seven near-duplicate pages listing overlapping subsets of the same
 * content, which is a thin-content problem dressed up as information
 * architecture. Every case is in the initial HTML regardless of the selected
 * filter, so a crawler that runs no JavaScript still sees all six.
 *
 * ── Layout ─────────────────────────────────────────────────────────────────
 *
 * Alternating full-width blocks, not a three-column grid. A grid forces six
 * projects into one aspect ratio and three lines each, which is exactly wrong
 * for six builds whose interesting differences are structural. The alternation
 * is a `lg:` order swap, so on a phone every block reads in the same order:
 * number, name, record, image.
 *
 * ── Accessibility ──────────────────────────────────────────────────────────
 *
 * The filters are a real toolbar of real buttons carrying `aria-pressed`, so
 * the active state is announced rather than only painted red. The result count
 * is a live region, so a keyboard or screen-reader user is told what changed
 * instead of having to go and find out.
 */
export function WorkCases() {
  const [active, setActive] = useState<WorkFilter>('all');

  const shown = useMemo(
    () => (active === 'all' ? CASES : CASES.filter((c) => c.facets.includes(active))),
    [active],
  );

  const activeLabel = WORK_FILTERS.find((f) => f.id === active)?.label ?? 'All';

  return (
    <>
      {/* ── Filters ─────────────────────────────────────────────── */}
      <div
        role="toolbar"
        aria-label="Filter work by discipline"
        className="flex flex-wrap gap-2 border-y border-line py-item"
      >
        {WORK_FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            className="yr-filter"
            aria-pressed={active === f.id}
            onClick={() => setActive(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p aria-live="polite" className="yr-label mt-item">
        {shown.length === 0
          ? `No case studies under ${activeLabel}`
          : `${shown.length} of ${CASES.length} shown`}
      </p>

      {/* ── Empty state ─────────────────────────────────────────────
          A filter that returns nothing says so, and says why. The AI facet
          is the one that lands here: there is no published AI engagement
          with a measured outcome yet, and reframing one of the other five
          to fill the gap is the single thing this site does not do. */}
      {shown.length === 0 ? (
        <div className="mt-grid border-t border-line pt-block">
          <p className="yr-pov max-w-[24ch]">
            Nothing published here yet.{' '}
            <span className="yr-pov__turn">
              When an engagement in this discipline has a measured outcome, it appears on this
              page and not before.
            </span>
          </p>
        </div>
      ) : null}

      {/* ── Cases ───────────────────────────────────────────────── */}
      <ul className="mt-grid">
        {shown.map((c, i) => {
          const flip = i % 2 === 1;
          return (
            <li
              key={c.id}
              id={c.id}
              className="border-t border-line py-[clamp(48px,6vw,96px)] last:border-b last:border-line"
              /* The anchor target has to clear the fixed navigation, which
                 :root:has(.yr-page) already handles with scroll-padding-top. */
            >
              <Rise className="grid gap-x-14 gap-y-block lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)]">
                {/* ── The record ── */}
                <div className={flip ? 'lg:order-2' : 'lg:order-1'}>
                  <p className="flex items-baseline gap-4">
                    <span aria-hidden="true" className="yr-num">
                      {c.num}
                    </span>
                    <span className="yr-label yr-label--accent">{c.industry}</span>
                  </p>

                  <h3 className="yr-display yr-display--2 mt-item">{c.name}</h3>

                  <dl className="mt-block border-t border-line">
                    <div className="grid gap-x-8 gap-y-hair border-b border-line py-item sm:grid-cols-[8.5rem_1fr]">
                      <dt className="yr-label">Challenge</dt>
                      <dd className="text-[.95rem] leading-[1.7] text-ink-secondary">
                        {c.challenge}
                      </dd>
                    </div>

                    <div className="grid gap-x-8 gap-y-hair border-b border-line py-item sm:grid-cols-[8.5rem_1fr]">
                      <dt className="yr-label">Approach</dt>
                      <dd className="text-[.95rem] leading-[1.7] text-ink-secondary">
                        {c.approach}
                      </dd>
                    </div>

                    <div className="grid gap-x-8 gap-y-hair border-b border-line py-item sm:grid-cols-[8.5rem_1fr]">
                      <dt className="yr-label">Technology</dt>
                      <dd className="flex flex-wrap gap-x-1.5 gap-y-2">
                        {c.technology.map((t) => (
                          <Tag key={t}>{t}</Tag>
                        ))}
                      </dd>
                    </div>

                    {c.outcome ? (
                      <div className="grid gap-x-8 gap-y-hair border-b border-line py-item sm:grid-cols-[8.5rem_1fr]">
                        <dt className="yr-label">Outcome</dt>
                        <dd className="text-[.95rem] font-semibold text-accent-bright">
                          {c.outcome}
                        </dd>
                      </div>
                    ) : null}
                  </dl>
                </div>

                {/* ── The image ── monochrome at rest, colour on hover ── */}
                <div className={flip ? 'lg:order-1' : 'lg:order-2'}>
                  <figure className="yr-frame yr-frame--hover relative block aspect-[16/10] w-full">
                    <img
                      src={c.img}
                      alt={c.alt}
                      width={c.imgW}
                      height={c.imgH}
                      loading={i < 2 ? 'eager' : 'lazy'}
                      decoding="async"
                      sizes="(max-width: 1024px) 92vw, 46vw"
                    />
                  </figure>
                </div>
              </Rise>
            </li>
          );
        })}
      </ul>
    </>
  );
}
