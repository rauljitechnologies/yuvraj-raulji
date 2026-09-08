'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ALL_WRITING, WRITING_FILTERS } from '../../lib/brand';
import { POSTS } from '../../lib/posts';
import { Rise } from '../homepage/motion';

/**
 * The /insights/ archive, with its filters.
 *
 * This replaces components/insights/blog-listing.tsx, which was a sticky
 * filter bar, a five-slide carousel of the newest posts and then a grid of
 * whatever was left over. Three presentations of one list of eight articles,
 * two of which the reader had to operate. The carousel in particular put the
 * newest writing behind a control: five of the eight were reachable only by
 * pressing an arrow or a dot, which is a poor trade on a page whose entire job
 * is to get somebody into an article.
 *
 * It is now one grid, in the same card language as the Work page's case list,
 * because these two pages do the same thing: an index of the long-form proof,
 * filterable, every item in the initial HTML.
 *
 * ── Why this is a client component ─────────────────────────────────────────
 *
 * The same reasoning as components/brand/work-cases.tsx. Filtering runs in the
 * browser against an array already in the bundle; eight articles do not
 * justify eight routes, and a route per category would publish near-duplicate
 * pages listing overlapping subsets of the same posts. Every article is in the
 * server-rendered HTML whatever filter is selected, so a crawler that runs no
 * JavaScript still sees all eight.
 *
 * ── Accessibility ──────────────────────────────────────────────────────────
 *
 * A real toolbar of real buttons carrying `aria-pressed`, so the active filter
 * is announced and not only painted red, and a live region reporting the count
 * so a change is spoken rather than only drawn.
 */

const meta =
  'font-mono text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-ink-faint';

export function WritingList() {
  const [active, setActive] = useState('all');

  /* `?filter=` is read on mount rather than on the server: a static export has
     no request-time access to the query string, so this is the only place it
     can be honoured. An unknown value is ignored rather than showing an empty
     grid. */
  useEffect(() => {
    const f = new URLSearchParams(location.search).get('filter');
    if (f && WRITING_FILTERS.some((x) => x.id === f)) setActive(f);
  }, []);

  const shown = useMemo(
    () => (active === 'all' ? ALL_WRITING : ALL_WRITING.filter((w) => w.filter === active)),
    [active],
  );

  const activeLabel = WRITING_FILTERS.find((f) => f.id === active)?.label ?? 'All';

  return (
    <>
      <div
        role="toolbar"
        aria-label="Filter writing by subject"
        className="flex flex-wrap items-center gap-2 border-y border-ink/10 py-5"
      >
        {WRITING_FILTERS.map((f) => (
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

      <p aria-live="polite" className={`mt-5 ${meta}`}>
        {shown.length === ALL_WRITING.length
          ? `${ALL_WRITING.length} articles`
          : `${shown.length} of ${ALL_WRITING.length} under ${activeLabel}`}
      </p>

      <ul className="mt-10 grid list-none gap-4 sm:gap-6 lg:mt-12 lg:grid-cols-2">
        {shown.map((w, i) => {
          const post = POSTS[w.slug];
          return (
            <li key={w.slug} className="flex">
              <Rise
                delay={(i % 2) * 0.08}
                className="group flex w-full flex-col border border-ink/15 bg-surface transition-[transform,border-color] duration-300 hover:-translate-y-2 hover:border-accent/60 motion-reduce:hover:translate-y-0"
              >
                {/* Monochrome at rest, colour under the pointer. The same
                    treatment the case covers get, so a reader moving between
                    /work/ and /insights/ is not moving between two idioms. */}
                <div className="relative flex aspect-[16/10] items-end overflow-hidden border-b border-ink/10 bg-[#111] p-6">
                  <img
                    src={post.img}
                    alt=""
                    width={1600}
                    height={900}
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
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="relative font-mono text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-accent-bright">
                    {w.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 pb-7 sm:p-7 sm:pb-8">
                  {/* The cover carries `alt=""` because this heading is the
                      link and says the same thing; a described cover here
                      would make a screen reader read every card twice. */}
                  <h3 className="m-0 font-manrope text-[22px] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[25px]">
                    <Link
                      href={`/insights/${w.slug}/`}
                      className="transition-colors duration-200 hover:text-accent-bright"
                    >
                      {w.title}
                    </Link>
                  </h3>

                  <p className="mt-4 flex-1 font-manrope text-base font-light leading-[1.65] text-ink/55">
                    {w.summary}
                  </p>

                  <p className={`mt-6 border-t border-ink/10 pt-5 ${meta}`}>
                    {w.date} <span aria-hidden="true"> · </span> {w.readTime}
                  </p>
                </div>
              </Rise>
            </li>
          );
        })}
      </ul>
    </>
  );
}
