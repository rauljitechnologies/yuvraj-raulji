import { NOW, NOW_CARDS, SECTIONS } from '../../lib/home';
import { getPhotos, type PhotoSlot } from '../../lib/founder-photos';
import { Lines, Rise } from './motion';
import { Marker, Section, Shell } from './primitives';

const meta = SECTIONS.find((s) => s.id === 'now')!;

const SLOTS = NOW_CARDS.map((c) => c.photo) as PhotoSlot[];

/**
 * What I am working on.
 *
 * The photographic version of this section needs four real photographs of
 * Yuvraj. They are resolved at build time (lib/founder-photos.ts) and no stand-
 * in is ever substituted, so until the files exist each card renders as a
 * typographic panel that is finished in its own right rather than as an empty
 * image box. Drop the files in and the media frames appear at the next build
 * with no change here.
 *
 * The layout is a masonry-free two-column grid on purpose: cards vary in height
 * with and without a photograph, and a grid that stays aligned under both is
 * worth more than one that packs tightly under one of them.
 */
export function Now() {
  const photos = getPhotos(SLOTS);
  const anyPhoto = Object.values(photos).some(Boolean);

  return (
    <Section id="now" labelledBy="now-title">
      <Shell>
        <Marker num={meta.num} label={meta.label} />

        <div className="grid gap-x-16 gap-y-block lg:grid-cols-[1fr_1fr]">
          <Lines as="h2" id="now-title" lines={NOW.headline} softFrom={1} />
          <Rise delay={0.18} className="self-end">
            <p className="yr-lede max-w-[42ch]">{NOW.body}</p>
          </Rise>
        </div>

        <ul className="mt-grid grid gap-px bg-[var(--rule)] md:grid-cols-2">
          {NOW_CARDS.map((card, i) => {
            const photo = photos[card.photo as PhotoSlot];
            return (
              <li key={card.status} className="bg-bg">
                <Rise delay={(i % 2) * 0.08} className="h-full">
                  <article className="yr-card h-full !border-0">
                    {photo ? (
                      <div className="yr-frame mb-item aspect-[3/2]">
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          width={photo.width}
                          height={photo.height}
                          loading="lazy"
                          decoding="async"
                          sizes="(max-width: 768px) 92vw, 46vw"
                        />
                      </div>
                    ) : null}

                    <p className="flex items-center gap-3 text-[.64rem] font-bold uppercase tracking-[.24em] text-accent-bright">
                      <span aria-hidden="true" className="yr-dot" />
                      {card.status}
                    </p>

                    <h3
                      className={`yr-display yr-display--3 mt-item ${anyPhoto ? '' : 'text-[clamp(1.5rem,2.8vw,2.4rem)]'}`}
                    >
                      {card.subject}
                    </h3>

                    <p className="yr-note mt-tight max-w-[40ch]">{card.note}</p>
                  </article>
                </Rise>
              </li>
            );
          })}
        </ul>
      </Shell>
    </Section>
  );
}
