import { DISCIPLINES, EXPERTISE_INTRO, SECTIONS } from '../../lib/home';
import { Lines, Rise } from './motion';
import { Marker, Section, Shell, Tag } from './primitives';

const meta = SECTIONS.find((s) => s.id === 'expertise')!;

/**
 * Expertise.
 *
 * Eight disciplines, each carrying the situation in which it is the wrong
 * choice. That second half is the entire reason this section is not a service
 * menu: CONTENT-PRINCIPLES §4 is explicit that appearing to recommend every
 * technology for every business is what makes someone a vendor rather than a
 * strategist, and a buyer evaluating a platform decision reads the refusals
 * more carefully than the capabilities.
 *
 * Deliberately not numbered. These are a set, not a sequence, and a 01 to 08
 * rail would imply an order that does not exist. Numbering is used elsewhere on
 * this page only where the content really is ordered.
 *
 * Each row is a <div> inside a <ul>, not a link. These are not eight
 * destinations yet; when /services/* is built, the label becomes the link and
 * nothing else about the layout changes.
 */
export function Expertise() {
  return (
    <Section id="expertise" labelledBy="expertise-title">
      <Shell>
        <Marker num={meta.num} label={meta.label} />

        <div className="grid gap-x-16 gap-y-block lg:grid-cols-[1fr_1fr]">
          <Lines as="h2" id="expertise-title" lines={EXPERTISE_INTRO.headline} strongFrom={2} />
          <Rise delay={0.18} className="self-end">
            <p className="yr-lede max-w-[54ch]">{EXPERTISE_INTRO.body}</p>
          </Rise>
        </div>

        <ul className="mt-grid">
          {DISCIPLINES.map((d, i) => (
            <li
              key={d.id}
              className="border-t border-[var(--rule)] py-block last:border-b last:border-[var(--rule)]"
            >
              <Rise delay={Math.min(i, 3) * 0.06}>
                <div className="grid gap-x-10 gap-y-item lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.35fr)] xl:gap-x-12 xl:grid-cols-[minmax(0,.95fr)_minmax(0,1fr)_minmax(0,1.05fr)]">
                  {/* ── Discipline and stack ── */}
                  <div>
                    <h3 className="yr-display yr-display--3 max-w-[20ch]">{d.label}</h3>
                    <p className="mt-item flex flex-wrap gap-x-1.5 gap-y-2">
                      {d.stack.map((s) => (
                        <Tag key={s}>{s}</Tag>
                      ))}
                    </p>
                  </div>

                  {/* ── What it is ── */}
                  <div>
                    <p className="yr-note max-w-[52ch]">{d.what}</p>
                  </div>

                  {/* ── When it is the wrong call ── the half of the row that
                      makes this a point of view rather than a service list. */}
                  <div className="border-l border-accent/40 pl-5">
                    <p className="yr-label text-accent-bright">Wrong choice when</p>
                    <p className="yr-note mt-hair max-w-[52ch]">{d.wrong}</p>
                  </div>
                </div>
              </Rise>
            </li>
          ))}
        </ul>
      </Shell>
    </Section>
  );
}
