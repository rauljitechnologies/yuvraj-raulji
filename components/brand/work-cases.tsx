'use client';

import { useMemo, useState } from 'react';
import { CASES, WORK_FILTERS, type WorkFilter } from '../../lib/brand';
import { Rise } from '../homepage/motion';

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
 * Cards, in the homepage's card language: a bordered panel that lifts on
 * hover and takes the accent on its edge, a cover that is monochrome at rest
 * and colour under the pointer, the number and the industry set in mono over
 * the image, and the record underneath as hairline rows.
 *
 * This replaces six alternating full-width blocks, which was the older
 * editorial layout: a block per screen, the record on one side and the picture
 * on the other, flipping sides every other case. It read well and it read
 * nothing like the homepage, where the same six builds are cards. Two columns
 * from `lg`, one below it, because a case whose record is four rows long is not
 * a thumbnail and does not want a third column.
 *
 * The alternation is gone with it, and so is the reason it existed: nothing
 * here needs to flip, because every card has the same internal order.
 *
 * ── Accessibility ──────────────────────────────────────────────────────────
 *
 * The filters are a real toolbar of real buttons carrying `aria-pressed`, so
 * the active state is announced rather than only painted red. The result count
 * is a live region, so a keyboard or screen-reader user is told what changed
 * instead of having to go and find out.
 */

const dt = 'font-mono text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-ink/35';
const dd = 'm-0 mt-2.5 font-manrope text-[15px] font-light leading-[1.6] text-ink/55';

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
        className="flex flex-wrap items-center gap-2 border-y border-ink/10 py-5"
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

      <p
        aria-live="polite"
        className="mt-5 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.24em] text-ink/35"
      >
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
        <div className="mt-10 border border-ink/10 bg-surface p-8 sm:p-10">
          <p className="m-0 max-w-[34ch] font-manrope text-[clamp(20px,2.2vw,28px)] font-light leading-[1.25] tracking-[-0.02em] text-ink/80">
            Nothing published here yet.{' '}
            <span className="text-ink/40">
              When an engagement in this discipline has a measured outcome, it appears on this page
              and not before.
            </span>
          </p>
        </div>
      ) : null}

      {/* ── Cases ───────────────────────────────────────────────── */}
      <ul className="mt-10 grid list-none gap-4 sm:gap-6 lg:mt-12 lg:grid-cols-2">
        {shown.map((c, i) => (
          <li key={c.id} id={c.id} className="flex">
            <Rise
              delay={(i % 2) * 0.08}
              className="group flex w-full flex-col border border-ink/15 bg-surface transition-[transform,border-color] duration-300 hover:-translate-y-2 hover:border-accent/60 motion-reduce:hover:translate-y-0"
            >
              {/* ── The cover ── monochrome at rest, colour under the pointer ── */}
              <div className="relative flex aspect-[16/10] items-end overflow-hidden border-b border-ink/10 bg-[#111] p-6">
                <img
                  src={c.img}
                  alt={c.alt}
                  width={c.imgW}
                  height={c.imgH}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="absolute inset-0 h-full w-full object-cover grayscale transition-[filter,transform] duration-500 group-hover:scale-[1.03] group-hover:grayscale-0 motion-reduce:group-hover:scale-100"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,.25)_0%,rgba(5,5,5,.82)_100%)]"
                />
                <span
                  aria-hidden="true"
                  className="absolute right-6 top-6 font-mono text-[11px] font-medium leading-none tracking-[0.2em] text-ink/60"
                >
                  {c.num}
                </span>
                <span className="relative font-mono text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-accent-bright">
                  {c.industry}
                </span>
              </div>

              {/* ── The record ── */}
              <div className="flex flex-1 flex-col p-6 pb-7 sm:p-7 sm:pb-8">
                <h3 className="m-0 font-manrope text-[26px] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[30px]">
                  {c.name}
                </h3>

                <p className="mt-4 font-manrope text-base font-light leading-[1.65] text-ink/50">
                  {c.challenge}
                </p>

                {/* `divide-y` rather than a border on each row: the last row used to
                    draw a hairline just above the card padding, which reads as a rule
                    with nothing under it. */}
                <dl className="mt-6 divide-y divide-ink/10 border-t border-ink/10">
                  <div className="py-5">
                    <dt className={dt}>Approach</dt>
                    <dd className={dd}>{c.approach}</dd>
                  </div>

                  <div className="py-5">
                    <dt className={dt}>Technology</dt>
                    <dd className="m-0 mt-3 flex flex-wrap gap-1.5">
                      {c.technology.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center border border-ink/15 px-2.5 py-1.5 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.16em] text-ink/60"
                        >
                          {t}
                        </span>
                      ))}
                    </dd>
                  </div>

                  {/* Five of the six carry no outcome line, because five of the
                      six have no published measured result. The row is absent
                      rather than empty. */}
                  {c.outcome ? (
                    <div className="py-5">
                      <dt className={dt}>Outcome</dt>
                      <dd className="m-0 mt-2.5 font-manrope text-[15px] font-semibold leading-[1.5] text-accent-bright">
                        {c.outcome}
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            </Rise>
          </li>
        ))}
      </ul>
    </>
  );
}
