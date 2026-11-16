import { CAREER, CAREER_START_YEAR } from './career';
import { AVAILABILITY, DESCRIPTION, LOCATION, ROLE, ROLES_ADDITIONAL, TIMEZONE } from './identity';
import { CERTIFICATIONS, CONTACT, EDUCATION, TECH_PROFICIENCIES } from './site';

/**
 * /resume/ : the record as a document, and the file behind it.
 *
 * ── The asset gate, and why the page does not promise a file it lacks ──────
 *
 * The brief asks for a "Download Resume" button backed by the real three-page
 * CV. That PDF is not in the repository. A button wired to a 404 is worse than
 * no button: a recruiter clicks it, nothing happens, and the conclusion is
 * that the site is broken rather than that a file is missing.
 *
 * So `RESUME.available` is resolved at build time by looking for the file, the
 * same way lib/articles.ts resolves an article body, and the page renders one
 * of two states from it:
 *
 *   file present  the primary call to action is a download, and the on-page
 *                 record sits underneath it as the crawlable version
 *   file absent   the download is replaced by the email and LinkedIn routes,
 *                 and the on-page record becomes the primary thing. Nothing
 *                 says "download" anywhere.
 *
 * Drop the PDF at `public/assets/yuvraj-raulji-cv.pdf`, rebuild, and the
 * download appears across every page that links to it. No code changes.
 *
 * This is deliberately a build-time check rather than a runtime one: the site
 * is `output: 'export'`, so there is no server to ask, and the answer cannot
 * change between builds anyway.
 *
 * The check itself lives in lib/resume-file.ts, not here. This module is
 * imported by lib/schema.ts, which a client component can reach, so it must
 * stay free of `fs`. See the note in that file.
 *
 * ── Why the full record is also on the page ────────────────────────────────
 *
 * A PDF is not indexable in any useful way and is not readable by an answer
 * engine summarising a candidate. The page carries the same record as HTML,
 * which is the version that gets found. The file is for the applicant tracking
 * system the recruiter has to paste it into.
 *
 * Copy in this file avoids em-dashes on purpose.
 */

/** Published path of the CV. One string; the gate and every link read it. */
export const RESUME_FILE = '/assets/yuvraj-raulji-cv.pdf';

export const RESUME = {
  path: '/resume/',
  label: 'Resume',
  /** The href every "download" link uses. Only meaningful when available. */
  href: RESUME_FILE,
  /** Suggested filename for the download attribute. */
  filename: 'Yuvraj-Raulji-Senior-Software-Engineer.pdf',

  eyebrow: 'The record, as a document',
  h1: ['Resume.'],
  lede: `${ROLE} and Enterprise eCommerce Architect, ${CAREER.length} roles since ${CAREER_START_YEAR}, based in ${LOCATION}. The full record is on this page, and the same record is in the file.`,

  title: 'Resume | Yuvraj Raulji, Senior Software Engineer',
  description:
    'The full record: 9+ years across Magento 2, Adobe Commerce, Shopify, Next.js and Generative AI. Career history, technical skills, education and certifications.',

  primaryKeyword: 'yuvraj raulji resume',
  secondaryKeywords: [
    'yuvraj raulji cv',
    'senior software engineer resume magento',
    'ecommerce architect cv',
  ],
  searchIntent: 'Navigational. Someone who has decided to look at the record in full.',
  audience: 'Recruiters, hiring managers and anyone doing candidate due diligence.',
  purpose:
    'Carry the complete employment record as indexable HTML, and hand over the file where one exists.',
  entities: ['Yuvraj Raulji', 'Senior Software Engineer', 'Resume', 'Curriculum Vitae'],

  /** The header block of the document, which is also the Person summary. */
  summary: DESCRIPTION,

  /** Contact block, as a CV header carries it. */
  contact: [
    { label: 'Location', value: LOCATION },
    { label: 'Time zone', value: TIMEZONE },
    { label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { label: 'Phone', value: CONTACT.phoneDisplay, href: `tel:${CONTACT.phoneE164}` },
    { label: 'LinkedIn', value: 'linkedin.com/in/yuvraj-raulji', href: CONTACT.linkedin },
    { label: 'Website', value: 'yuvrajraulji.com', href: '/' },
  ] as const,

  /** The titles claimed, under the one primary role. */
  titles: ROLES_ADDITIONAL,

  availability: AVAILABILITY,

  /** Re-exported so the page needs one import. */
  career: CAREER,
  skills: TECH_PROFICIENCIES,
  education: EDUCATION,
  certifications: CERTIFICATIONS,
} as const;
