import type { Metadata } from 'next';
import { TechnologyPage } from '../../components/technology/technology-page';
import { OG_EXPERTISE, SITE_URL } from '../../lib/site';
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
    images: [OG_EXPERTISE],
  },
  twitter: {
    card: 'summary_large_image',
    title: tech.title,
    description: tech.description,
    images: [OG_EXPERTISE.url],
  },
};

export default function AiAutomation() {
  return <TechnologyPage tech={tech} />;
}
