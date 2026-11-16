import { CERTIFICATIONS } from './site';

/**
 * /certifications/ : the credential record.
 *
 * ── The asset gate ────────────────────────────────────────────────────────
 *
 * The brief says to use the original certificate image "if supplied". It was
 * not supplied, and there is no image file in the repository for it.
 *
 * So the page renders a typographic certificate panel instead: the issuer, the
 * credential, the date and the syllabus, set as type. That is a finished
 * design in its own right rather than a placeholder with a broken image icon
 * in it, which is the same decision lib/about.ts documents for the photography
 * slots. `CERT_IMAGE` resolves at build time exactly like the resume file
 * does, and the moment a real scan lands at the path below the page switches
 * to showing it.
 *
 * Drop the image at `public/assets/certifications/ibm-generative-ai.jpg` and
 * rebuild. No code changes.
 *
 * ── Why the syllabus is listed ────────────────────────────────────────────
 *
 * A certification name on its own is an unfalsifiable claim. The five topics
 * are what the credential actually covers, they are the terms a recruiter
 * searches, and listing them is what turns "certified in Generative AI" into
 * something a reader can judge.
 *
 * Copy in this file avoids em-dashes on purpose.
 */

/** Published path of the certificate scan, if one exists. */
export const CERT_IMAGE = '/assets/certifications/ibm-generative-ai.jpg';

/** The headline credential, pulled from the one record in lib/site.ts. */
export const PRIMARY_CERT = CERTIFICATIONS[0];

export const CERTS = {
  path: '/certifications/',
  label: 'Certifications',
  eyebrow: 'Verified credentials',
  h1: ['Certifications', { text: '& continuing study.', accent: true }],
  lede:
    'The credential record, newest first. The Generative AI certification completed in November 2026 is the most recent, and it is the one that changed what I build rather than only what I know.',

  title: 'Certifications | Yuvraj Raulji, Generative AI & Magento',
  description:
    'Generative AI certification with IBM and AcceleratorX, completed November 2026: LLM concepts, RAG, prompt engineering and AI workflow automation.',

  primaryKeyword: 'yuvraj raulji certifications',
  secondaryKeywords: [
    'ibm generative ai certification',
    'acceleratorx generative ai',
    'magento developer certifications',
  ],
  searchIntent: 'Informational. Verifying a credential claim made elsewhere on the site.',
  audience: 'Recruiters and hiring managers checking the record, and clients assessing depth.',
  purpose:
    'Carry the credential record accurately, name what the headline certification actually covers, and claim no verification that does not exist.',
  entities: [
    'Yuvraj Raulji',
    'IBM',
    'AcceleratorX',
    'Generative AI',
    'Large Language Models',
    'Retrieval-Augmented Generation',
    'Prompt Engineering',
  ],

  /**
   * The headline credential, in full.
   *
   * `completed` is the month the brief states. It is written out rather than
   * computed, because a certification date is a fact on a document and not
   * something to derive from a build timestamp.
   */
  feature: {
    issuer: 'IBM & AcceleratorX',
    name: 'Generative AI Certification',
    completed: 'Completed November 2026',
    body:
      'A structured programme across the applied end of generative AI: how large language models behave, how to ground them in your own data, how to write prompts that hold up in production, and how to put the result into a workflow that runs without a person in the loop.',
    /** The syllabus, which is what makes the credential legible. */
    topics: [
      {
        name: 'Generative AI',
        body: 'Model families, what each is good at, and where a generative approach is the wrong tool.',
      },
      {
        name: 'LLM concepts',
        body: 'Context windows, tokenisation, temperature and the failure modes that follow from each.',
      },
      {
        name: 'Retrieval-augmented generation',
        body: 'Grounding a model in a private corpus: chunking, embeddings, retrieval quality and citation.',
      },
      {
        name: 'Prompt engineering',
        body: 'Structuring instructions so output is consistent enough to depend on rather than merely impressive once.',
      },
      {
        name: 'AI workflow automation',
        body: 'Wiring models into real operational flows with n8n, including the human review step.',
      },
    ],
    /**
     * Where this shows up in the work. Stated carefully: the certification is
     * November 2026, so it cannot be credited for work that predates it.
     */
    applied:
      'The certification is recent, so the honest statement is that it formalised and extended work already underway rather than started it: catalogue content generation, support and sales assistants grounded in a product catalogue, and automation of the operational steps around a commerce platform.',
  },

  /** The full record, newest first, straight from lib/site.ts. */
  all: CERTIFICATIONS,

  /**
   * Said on the page, once.
   *
   * A certifications page with no note about verification invites the reader
   * to wonder. This answers it directly and it is also the honest position:
   * two of these have a public verification URL and the rest do not, and the
   * page shows a link only where one exists.
   */
  verificationNote:
    'Where a credential has a public verification page, the entry links to it. Where it does not, there is no link rather than a dead one. Originals are available on request.',

  faqs: [
    {
      q: 'What does the IBM and AcceleratorX Generative AI certification cover?',
      a: 'Five areas: generative AI and model selection, LLM concepts including context and tokenisation, retrieval-augmented generation for grounding a model in private data, prompt engineering for consistent production output, and AI workflow automation. It is applied rather than theoretical.',
    },
    {
      q: 'When was it completed?',
      a: 'November 2026.',
    },
    {
      q: 'Can I verify these credentials?',
      a: 'The Coursera entries carry public verification links and those are on this page. The others do not have a public verification page, so no link is shown for them; I can send the original documents on request.',
    },
  ],
} as const;
