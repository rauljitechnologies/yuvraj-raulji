import type { Metadata } from 'next';
import { TechnologyPage } from '../../components/technology/technology-page';
import { OG_IMAGE, OG_IMAGE_URL, SITE_URL } from '../../lib/site';
import { TECHNOLOGIES_BY_SLUG } from '../../lib/technology';

/**
 * /ai-automation/
 *
 * New. Broader than commerce: workflow, agents, RAG and MCP, with the
 * measured automation figures attributed to deterministic workflow rather
 * than to a model.
 */
const tech = TECHNOLOGIES_BY_SLUG['ai-automation'];

export const metadata: Metadata = {
  title: tech.title,
  description: tech.description,
  keywords: [
    'AI automation',
    'AI agents',
    'LLMs',
    'RAG',
    'MCP',
    'workflow automation',
    'business automation',
  ],
  alternates: { canonical: `${SITE_URL}/ai-automation/` },
  openGraph: {
    title: tech.title,
    description: tech.description,
    url: `${SITE_URL}/ai-automation/`,
    siteName: 'Yuvraj Raulji',
    type: 'article',
    locale: 'en_US',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: tech.title,
    description: tech.description,
    images: [OG_IMAGE_URL],
  },
};

export default function AiAutomation() {
  return <TechnologyPage tech={tech} />;
}
