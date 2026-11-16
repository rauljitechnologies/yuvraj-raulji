/**
 * The two lead funnels, as schemas.
 *
 * ── Why validation is here and not on a server ─────────────────────────────
 *
 * next.config.mjs sets `output: 'export'`. The site is static files with no
 * Node process in front of them, so there is no route handler to validate in
 * and there cannot be one without changing how the site is hosted. Validation
 * therefore runs in the browser, and the Apps Script endpoint in
 * google-apps-script/Code.gs is the second line: it rejects a payload it
 * cannot use and `submitLead` reports that rejection honestly rather than
 * swallowing it. See the note at the top of lib/lead.ts for why that matters
 * so much on this particular site.
 *
 * Being explicit about the limit: client-side validation is a usability
 * feature, not a security boundary. It stops a person mistyping an email and
 * losing their message. It does not stop a determined bot, which is what the
 * honeypot and the endpoint's own checks are for.
 *
 * ── Why the two funnels are separate schemas ───────────────────────────────
 *
 * A recruiter and a client are answering different questions, and a single
 * form that serves both ends up asking a hiring manager for a budget range
 * and a business for an employment type. Keeping them apart is also what makes
 * the funnels countable: `generate_lead` carries which schema produced it, so
 * "how many real job approaches came in this month" is a question the
 * analytics can actually answer.
 *
 * Both map onto the one wire format `submitLead` sends, because there is one
 * spreadsheet behind them and one set of columns. The mapping is at the bottom
 * of this file and it is the only place that knows about both shapes.
 */

import { z } from 'zod';
import type { LeadFields } from './lead';

/* ═══════════════════════════════════════════════════════════════
   SHARED PIECES
   ═══════════════════════════════════════════════════════════════ */

/**
 * The email rule.
 *
 * Deliberately permissive. An address is rejected only when it cannot
 * possibly be one; anything that might be valid is accepted and the reply
 * either arrives or bounces. A regex that enforces a strict reading of the
 * spec rejects real addresses, and a rejected real address on a hiring form
 * costs an opportunity to save nothing.
 */
const email = z
  .string()
  .trim()
  .min(1, 'An email address is needed so I can reply.')
  /* `z.email()`, not the deprecated `z.string().email()`: this project is on
     Zod 4, where the string-method form still works but is on its way out. */
  .pipe(z.email('That does not look like an email address.'));

const name = z
  .string()
  .trim()
  .min(2, 'A name, so I know who I am replying to.')
  .max(120, 'That is longer than a name needs to be.');

const message = z
  .string()
  .trim()
  .min(20, 'A sentence or two about what you have in mind.')
  .max(5000, 'That is past the limit. Send the detail in the reply instead.');

/**
 * A URL field that forgives a missing scheme.
 *
 * People type `example.com`, not `https://example.com`, and rejecting that is
 * pedantry that costs the highest-value field on the project form. An empty
 * string stays empty, because every URL field on both forms is optional.
 */
const looseUrl = z
  .string()
  .trim()
  .transform((v) => (v === '' ? '' : /^https?:\/\//i.test(v) ? v : `https://${v}`))
  .refine((v) => v === '' || z.url().safeParse(v).success, 'That does not look like a web address.');

const optionalText = z.string().trim().max(200).optional().or(z.literal(''));

/**
 * The honeypot.
 *
 * A person never sees this field, so a value in it means a bot filled every
 * input it found.
 *
 * It accepts ANY string, including a filled one, and that is the whole point.
 * The first version of this was `z.string().max(0)`, which rejected a filled
 * honeypot at validation and showed the submitter a field error. That defeats
 * the mechanism: `submitLead` in lib/lead.ts is the thing that handles a bot,
 * and it handles it by reporting success, sending nothing and recording
 * nothing. Failing validation instead tells the bot its submission was
 * refused, which only teaches it to retry with the field left blank.
 *
 * So the schema lets it through and `submitLead` swallows it. Verified: a
 * payload with `hp` set parses successfully and never reaches the endpoint.
 */
const honeypot = z.string().optional().or(z.literal(''));

/* ═══════════════════════════════════════════════════════════════
   THE OPTION SETS

   Rendered as <select> options and validated against. They are plain
   string arrays rather than enums so the same constant drives the
   markup and the schema, and a new option cannot be added to one
   without the other.
   ═══════════════════════════════════════════════════════════════ */

export const EMPLOYMENT_TYPES = [
  'Full-time',
  'Contract',
  'Contract to hire',
  'Part-time',
  'Freelance project',
] as const;

export const WORK_ARRANGEMENTS = [
  'Fully remote',
  'Remote, occasional travel',
  'Hybrid',
  'On-site',
] as const;

export const PROJECT_TYPES = [
  'New build',
  'Replatforming or migration',
  'Performance or checkout optimisation',
  'API or ERP integration',
  'Headless storefront',
  'AI feature or automation',
  'Ongoing development and support',
  'Technical audit or second opinion',
] as const;

export const PROJECT_TECHNOLOGIES = [
  'Magento 2 or Adobe Commerce',
  'Shopify or Shopify Plus',
  'WooCommerce',
  'WordPress',
  'Next.js or React',
  'Node.js',
  'Headless or custom build',
  'Not sure yet',
] as const;

/**
 * Budget bands, and the one that is not a number.
 *
 * "Not decided yet" is first on purpose. A required budget field with no
 * honest option for a buyer who genuinely does not know yet pushes them into
 * picking a band at random, which is worse than no answer: it prices the
 * conversation before it starts. The field is optional either way.
 */
export const BUDGET_RANGES = [
  'Not decided yet',
  'Under $5,000',
  '$5,000 to $15,000',
  '$15,000 to $40,000',
  '$40,000 to $100,000',
  'Over $100,000',
  'Monthly retainer',
] as const;

export const TIMELINES = [
  'Now',
  'Within 1 month',
  'Within 3 months',
  'Within 6 months',
  'Later this year',
  'Just exploring',
] as const;

/* ═══════════════════════════════════════════════════════════════
   A. THE HIRING FUNNEL
   ═══════════════════════════════════════════════════════════════ */

/**
 * Recruiters and hiring managers. Rendered on /remote-work/ and on /contact/.
 *
 * Only three fields are required, which is the same discipline the existing
 * forms are written under: every additional required field is a submission
 * that does not happen. `jobUrl` is the highest-value optional one, because a
 * link to the posting answers the stack, the seniority and the location
 * before the message is read.
 */
export const recruiterSchema = z.object({
  name,
  company: z
    .string()
    .trim()
    .min(1, 'Which company is hiring?')
    .max(160),
  email,
  jobTitle: optionalText,
  employmentType: z.enum(EMPLOYMENT_TYPES).optional().or(z.literal('')),
  workArrangement: z.enum(WORK_ARRANGEMENTS).optional().or(z.literal('')),
  jobUrl: looseUrl.optional().or(z.literal('')),
  message,
  hp: honeypot,
});

export type RecruiterInput = z.input<typeof recruiterSchema>;
export type RecruiterData = z.output<typeof recruiterSchema>;

export const RECRUITER_EMPTY: RecruiterInput = {
  name: '',
  company: '',
  email: '',
  jobTitle: '',
  employmentType: '',
  workArrangement: '',
  jobUrl: '',
  message: '',
  hp: '',
};

/* ═══════════════════════════════════════════════════════════════
   B. THE PROJECT FUNNEL
   ═══════════════════════════════════════════════════════════════ */

/**
 * Clients and agencies with a project. Rendered on /contact/.
 *
 * `website` is optional for the reason stated in lib/site.ts: the site takes
 * enquiries from agencies acting for a client and from businesses that have
 * not launched, and requiring a store URL turns both away. It is still the
 * single most useful field on the form when it is given, because it tells you
 * the platform, the scale and usually the problem before you read a word.
 */
export const projectSchema = z.object({
  name,
  company: optionalText,
  email,
  website: looseUrl.optional().or(z.literal('')),
  projectType: z.enum(PROJECT_TYPES).optional().or(z.literal('')),
  technology: z.enum(PROJECT_TECHNOLOGIES).optional().or(z.literal('')),
  budget: z.enum(BUDGET_RANGES).optional().or(z.literal('')),
  timeline: z.enum(TIMELINES).optional().or(z.literal('')),
  message,
  hp: honeypot,
});

export type ProjectInput = z.input<typeof projectSchema>;
export type ProjectData = z.output<typeof projectSchema>;

export const PROJECT_EMPTY: ProjectInput = {
  name: '',
  company: '',
  email: '',
  website: '',
  projectType: '',
  technology: '',
  budget: '',
  timeline: '',
  message: '',
  hp: '',
};

/* ═══════════════════════════════════════════════════════════════
   THE WIRE FORMAT

   One spreadsheet, one set of columns, two forms. These are the only
   two functions that know about both the form shape and the payload
   `submitLead` sends, which is what keeps the mapping in one place
   instead of inside two submit handlers.
   ═══════════════════════════════════════════════════════════════ */

/**
 * `service` is what the sheet and the lead scoring key off, so it carries
 * which funnel the enquiry came through. It is prefixed rather than left as a
 * bare topic because the two funnels share one sheet and "Full-time" on its
 * own does not say whether it was a job or a project.
 */
export function recruiterToLead(d: RecruiterData): LeadFields {
  const detail = [d.jobTitle, d.employmentType, d.workArrangement].filter(Boolean).join(' | ');
  return {
    name: d.name,
    email: d.email,
    company: d.company,
    role: 'Recruiter or hiring manager',
    service: `Job opportunity${detail ? `: ${detail}` : ''}`,
    /* The posting link goes in `website`, which is the column the scoring
       already treats as the highest-value field. For this funnel the job
       description is exactly that. */
    website: d.jobUrl,
    message: d.message,
    hp: d.hp,
  };
}

export function projectToLead(d: ProjectData): LeadFields {
  return {
    name: d.name,
    email: d.email,
    company: d.company,
    website: d.website,
    platform: d.technology,
    timeline: d.timeline,
    service: `Project enquiry${d.projectType ? `: ${d.projectType}` : ''}${
      d.budget ? ` | ${d.budget}` : ''
    }`,
    message: d.message,
    hp: d.hp,
  };
}

/**
 * Flattens a Zod error into one message per field, which is the shape a form
 * renders from. Only the first issue per field is kept: showing a reader two
 * complaints about one input at once is noise.
 */
export function fieldErrors(err: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = String(issue.path[0] ?? '');
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
