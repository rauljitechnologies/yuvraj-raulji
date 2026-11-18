import type { Metadata } from 'next';
import Image from 'next/image';
import { Page, PageHero } from '../../components/chrome/page';
import { Lines, Rise } from '../../components/homepage/motion';
import { Btn, Marker, Section, Shell } from '../../components/homepage/primitives';
import { certImageAvailable } from '../../lib/cert-file';
import { CERT_IMAGE, CERTS } from '../../lib/certifications';
import { certificationsSchema, type Crumb } from '../../lib/schema';
import { OG_IMAGE, SITE_URL } from '../../lib/site';
import '../home.css';

/**
 * /certifications/
 *
 * The headline credential gets a panel of its own with its syllabus next to
 * it; the rest of the record is a list underneath. That split is the point of
 * the page: "certified in Generative AI" is unfalsifiable on its own, and the
 * five topics are what let a reader judge it.
 *
 * The certificate artwork is gated at build time by `certImageAvailable()`.
 * With no file, the panel is typographic, which is a finished design rather
 * than a placeholder. See the note at the top of lib/certifications.ts.
 */

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Certifications', href: CERTS.path },
];

export const metadata: Metadata = {
  title: CERTS.title,
  description: CERTS.description,
  keywords: [CERTS.primaryKeyword, ...CERTS.secondaryKeywords],
  alternates: { canonical: `${SITE_URL}${CERTS.path}` },
  openGraph: {
    title: CERTS.title,
    description: CERTS.description,
    url: `${SITE_URL}${CERTS.path}`,
    siteName: 'Yuvraj Raulji',
    type: 'website',
    locale: 'en_US',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: CERTS.title,
    description: CERTS.description,
    images: [OG_IMAGE],
  },
};

const LABEL =
  'm-0 font-mono text-[11px] font-medium uppercase leading-none tracking-[0.2em] text-ink/55';

const hasArtwork = certImageAvailable();

export default function Certifications() {
  const f = CERTS.feature;

  return (
    <Page schema={certificationsSchema(crumbs)}>
      <PageHero eyebrow={CERTS.eyebrow} lines={CERTS.h1} lede={CERTS.lede} crumbs={crumbs} />

      {/* ── The headline credential ────────────────────────────────── */}
      <Section id="generative-ai" labelledBy="generative-ai-title">
        <Shell>
          <Marker label="Most recent" />
          <div className="grid gap-x-12 gap-y-grid lg:grid-cols-[1fr_1.15fr]">
            {/* The certificate. Artwork when there is artwork, type when there
                is not, and the typographic version is drawn to be looked at
                rather than to apologise for a missing file. */}
            <Rise>
              {hasArtwork ? (
                <Image
                  src={CERT_IMAGE}
                  alt={`${f.name} issued by ${f.issuer} to Yuvraj Raulji, ${f.completed}`}
                  width={1200}
                  height={850}
                  sizes="(max-width: 1023px) 92vw, 42vw"
                  className="h-auto w-full border border-line"
                />
              ) : (
                <div className="flex flex-col justify-between border border-line bg-surface p-card">
                  <div>
                    <p className={LABEL}>{f.issuer}</p>
                    <p className="m-0 mt-item font-manrope text-[clamp(28px,3.4vw,46px)] font-extralight leading-[1.1] tracking-[-0.03em] text-ink">
                      {f.name}
                    </p>
                  </div>
                  <div className="mt-grid">
                    <span
                      aria-hidden="true"
                      className="block h-px w-full bg-accent/40 animate-yr-sweep origin-left"
                    />
                    <p className="m-0 mt-item font-mono text-[11px] font-medium uppercase leading-[1.5] tracking-[0.2em] text-accent-bright">
                      {f.completed}
                    </p>
                    <p className="m-0 mt-tight font-manrope text-[14px] font-light leading-[1.6] text-ink/45">
                      Original certificate available on request.
                    </p>
                  </div>
                </div>
              )}
            </Rise>

            <div>
              <Lines
                as="h2"
                id="generative-ai-title"
                lines={['Generative AI,', 'applied rather than admired.']}
              />
              <Rise delay={0.16}>
                <p className="m-0 mt-head max-w-[58ch] font-manrope text-[18px] font-light leading-[1.7] text-ink/65">
                  {f.body}
                </p>
              </Rise>

              <Rise delay={0.24} className="mt-grid">
                <h3 className={LABEL}>What it covers</h3>
                <dl className="m-0 mt-tight border-t border-line">
                  {f.topics.map((t) => (
                    <div key={t.name} className="border-b border-line py-5">
                      <dt className="m-0 font-manrope text-[17px] font-semibold leading-[1.3] tracking-[-0.01em] text-ink">
                        {t.name}
                      </dt>
                      <dd className="m-0 mt-2 max-w-[56ch] font-manrope text-[15px] font-light leading-[1.65] text-ink/55">
                        {t.body}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Rise>

              {/* The honest caveat about dates, stated rather than left for a
                  reader to work out from the timestamps. */}
              <Rise delay={0.32} className="mt-grid">
                <p className="m-0 max-w-[58ch] border-l-2 border-accent/40 pl-5 font-manrope text-[15px] font-light leading-[1.7] text-ink/50">
                  {f.applied}
                </p>
              </Rise>
            </div>
          </div>
        </Shell>
      </Section>

      {/* ── The full record ───────────────────────────────────────── */}
      <Section id="all" labelledBy="all-title">
        <Shell>
          <Marker label="The full record" />
          <div className="mb-grid grid gap-x-12 gap-y-item lg:grid-cols-[1fr_1.1fr]">
            <Lines as="h2" id="all-title" lines={['Everything', 'on the record.']} />
            <Rise delay={0.12}>
              <p className="m-0 max-w-[54ch] font-manrope text-[16px] font-light leading-[1.7] text-ink/55">
                {CERTS.verificationNote}
              </p>
            </Rise>
          </div>

          <ol className="m-0 list-none border-t border-line p-0">
            {CERTS.all.map((c, i) => (
              <Rise
                key={`${c.name}-${c.issuer}`}
                as="li"
                delay={Math.min(i, 6) * 0.04}
                className="grid items-baseline gap-x-8 gap-y-2 border-b border-line py-5 sm:grid-cols-[1fr_auto]"
              >
                <div>
                  <p className="m-0 font-manrope text-[clamp(17px,1.7vw,21px)] font-light leading-[1.35] text-ink">
                    {c.url ? (
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener"
                        className="underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-bright hover:decoration-accent"
                      >
                        {c.name}
                        <span className="sr-only"> (verification, opens in a new tab)</span>
                      </a>
                    ) : (
                      c.name
                    )}
                  </p>
                  <p className="m-0 mt-1.5 font-mono text-[11px] uppercase leading-[1.5] tracking-[0.16em] text-ink/45">
                    {c.issuer}
                  </p>
                </div>
                <p className="m-0 font-mono text-[11px] uppercase leading-none tracking-[0.16em] text-accent-bright sm:text-right">
                  {c.date || 'Date not recorded'}
                </p>
              </Rise>
            ))}
          </ol>
        </Shell>
      </Section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <Section id="questions" labelledBy="questions-title">
        <Shell>
          <Marker label="Questions" />
          <div className="mb-grid">
            <Lines as="h2" id="questions-title" lines={['Straight', 'answers.']} />
          </div>
          <dl className="m-0 border-t border-line">
            {CERTS.faqs.map((q, i) => (
              <Rise
                key={q.q}
                delay={Math.min(i, 3) * 0.05}
                className="grid gap-x-12 gap-y-tight border-b border-line py-item lg:grid-cols-[1fr_1.4fr]"
              >
                <dt className="m-0 font-manrope text-[clamp(18px,1.8vw,23px)] font-semibold leading-[1.25] tracking-[-0.02em]">
                  {q.q}
                </dt>
                <dd className="m-0 max-w-[62ch] font-manrope text-[16px] font-light leading-[1.7] text-ink/60">
                  {q.a}
                </dd>
              </Rise>
            ))}
          </dl>

          <Rise delay={0.2} className="mt-tail flex flex-wrap gap-3">
            <Btn href="/resume/" variant="primary">
              The full resume
            </Btn>
            <Btn href="/remote-collaboration/" variant="ghost">
              Remote opportunities
            </Btn>
          </Rise>
        </Shell>
      </Section>
    </Page>
  );
}
