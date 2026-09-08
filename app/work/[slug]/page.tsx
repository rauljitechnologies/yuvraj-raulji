import type { Metadata } from 'next';
import { CasePage } from '../../../components/work/case-page';
import { CASES } from '../../../lib/brand';
import { OG_IMAGE, OG_IMAGE_URL, SITE_URL } from '../../../lib/site';

/**
 * /work/{slug}/
 *
 * The six case studies, one route. `id` is the slug: the ids in lib/brand.ts
 * are already what the URL should be, and they are the same ids the technology
 * and service pages resolve their `cases` arrays against, so a build renamed in
 * one place is renamed everywhere.
 *
 * `dynamicParams = false` so a slug outside `generateStaticParams` is a build
 * error rather than an empty page. Under `output: 'export'` there is no
 * request-time fallback to catch it later.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.id }));
}

type Props = { params: Promise<{ slug: string }> };

/** Cut to `max` characters at the last word boundary, with an ellipsis only if
    anything was actually removed. */
function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[.,;:]$/, '')}...`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = CASES.find((c) => c.id === slug);
  if (!study) return {};

  const url = `${SITE_URL}/work/${slug}/`;
  /* The title names the build and the sector, never a client. The whole work
     section was renamed away from brand names in d00fd91 and the metadata is
     the easiest place for one to creep back in.

     "case study" is in the title because it is in the query. These pages are
     what a buyer opens before a call, and the phrase they arrive on is
     "<something> ecommerce case study", not the internal name of the build.
     The six titles ran 34-50 characters without it, so the term is added into
     space the SERP was already giving away rather than at the cost of the
     name. */
  const title = `${study.name} case study | Yuvraj Raulji`;
  /* Trimmed on a word boundary. `slice(0, 155)` alone cuts mid-word the first
     time a challenge runs past the limit; none does today, which is exactly
     why the bug would ship unnoticed. */
  const description = truncate(study.challenge, 155);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Yuvraj Raulji',
      type: 'article',
      locale: 'en_US',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}

export default async function WorkCase({ params }: Props) {
  const { slug } = await params;
  /* Non-null: `dynamicParams = false` means only the ids above ever render. */
  const study = CASES.find((c) => c.id === slug)!;
  return <CasePage study={study} />;
}
