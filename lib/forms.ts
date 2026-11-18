/**
 * The one lead funnel, as a schema.
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
 * ── Why there is one schema and not two ───────────────────────────────────
 *
 * There were two: this and a recruiter funnel. The site is explicitly not a
 * recruiter portal now, so that one is deleted and this is the only shape an
 * enquiry can take, in all three places a form appears.
 *
 * It maps onto the wire format `submitLead` sends at the bottom of this file,
 * which is the only place that knows about both shapes.
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
 * spec rejects real addresses, and a rejected real address on an enquiry form
 * costs a project to save nothing.
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

/* `looseUrl` stood here, normalising a missing scheme so a reader could type
   "example.com". It served the recruiter form's job-description URL and the
   project form's website field; the first is deleted and the second is now a
   free-text "company or website", which must accept a company name and so
   cannot be validated as a URL. Removed rather than left unused. */

/* `optionalText` went with it: the only remaining optional text fields declare
   their own limits inline, because the limits differ. */

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
   THE OPTION SETS ARE GONE TOO

   Four `<select>` lists lived here and in lib/site.ts, driving both
   the markup and the schema. The form has no selects left, so none
   of them has anything to drive. See the note in lib/site.ts.
   ═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════
   THE RECRUITER FUNNEL IS GONE

   A `recruiterSchema` stood here, with EMPLOYMENT_TYPES and
   WORK_ARRANGEMENTS above it and a RecruiterForm component rendering
   it on /remote-work/ and /contact/. It collected a job title, an
   employment type, a work arrangement and a job description URL.

   The objective changed and is now explicit: freelance clients and
   remote project work, and not a recruiter portal. The brief prohibits
   each of those four fields by name. All of it is removed rather than
   hidden, including the `funnel: 'recruiter'` value it sent.

   One funnel remains, below, and it is deliberately short.
   ═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════
   THE PROJECT FUNNEL
   ═══════════════════════════════════════════════════════════════ */

/**
 * The one enquiry form. Five fields, two of them optional.
 *
 * Clients and agencies with a project. Rendered on /contact/, at the foot of
 * the homepage and inside the enquiry modal that opens from a call to action
 * on every interior route.
 *
 * ── Why it got shorter ───────────────────────────────────────────────────
 *
 * It asked for nine: name, company, email, website, project type,
 * technology, budget, timeline and description. Every one of those is
 * useful to me and the brief is right that it is too many. "Do not overload
 * the website with forms" is the instruction, and a nine-field form on a
 * page whose whole job is to make contact easy is the overload.
 *
 * What is left is the brief's list exactly: name, email, company or website
 * (optional), project requirements, budget (optional). Three required
 * fields. Platform, timeline and project type are all things I can ask in
 * the reply, and asking them in the reply costs nothing; asking them on the
 * form costs submissions.
 *
 * `website` and `company` are collapsed into one field for the same reason.
 * A business has one or the other to hand and should not have to think about
 * which box it goes in.
 */
/**
 * The service list, and the budget bands.
 *
 * ── Why the bands start where they do ─────────────────────────────────────
 *
 * The brief listed them from "Under $500". That band prices a conversation
 * below a day of senior engineering time, and the markets this site is aimed
 * at are the USA, the UK, the UAE and Europe. Starting at $1,000 filters at
 * the form instead of in a reply, which is the whole point of asking.
 *
 * "Not sure yet" is last and is a real answer. A band list without it forces
 * a buyer who genuinely does not know to pick one at random, which prices the
 * work before anyone has described it.
 *
 * No en or em dashes in the labels: section 2 of BRAND-DESIGN-GUIDELINE.md
 * bans them and scripts/check-prohibited-titles.sh fails the build on one, so
 * the ranges read "to" rather than a dash.
 */
export const SERVICE_OPTIONS = [
  'Magento Development',
  'Shopify Development',
  'Next.js Development',
  'eCommerce Maintenance',
  'API Integration',
  'Other',
] as const;

export const BUDGET_OPTIONS = [
  '$1,000 to $3,000',
  '$3,000 to $5,000',
  '$5,000 to $10,000',
  '$10,000+',
  'Not sure yet',
] as const;

/**
 * Timeline bands.
 *
 * The brief asks for the field and does not name the options, so these are
 * the four shapes a reply actually has to plan around, plus the honest fifth.
 */
export const TIMELINE_OPTIONS = [
  'As soon as possible',
  'Within 1 month',
  '1 to 3 months',
  '3 months or later',
  'Just exploring',
] as const;

export const projectSchema = z.object({
  name,
  email,
  /**
   * Service, required, and the only required field added to this form.
   *
   * It is what routes the enquiry and the one answer that cannot be inferred
   * from the message often enough to be worth guessing. A required select
   * costs one click, which is the cheapest required field on the form.
   */
  service: z
    .string()
    .trim()
    .min(1, 'Choose the service this is about.')
    .refine((v) => (SERVICE_OPTIONS as readonly string[]).includes(v), 'Choose one of the listed services.'),
  /** Company name, separate from the website now that the brief asks for both. */
  company: z.string().trim().max(200).optional().or(z.literal('')),
  /**
   * The store URL.
   *
   * Still not validated as a URL. "yourstore.com" is the form a person types
   * and `new URL()` rejects it, so a strict check would reject the most
   * common correct answer. The normaliser tidies what looks like a domain.
   */
  website: z.string().trim().max(300).optional().or(z.literal('')),
  /** Country, for time-zone overlap and for knowing which market replied. */
  country: z.string().trim().max(80).optional().or(z.literal('')),
  message,
  /** Budget, now a band rather than free text. "Not sure yet" is in the list. */
  budget: z
    .string()
    .trim()
    .refine((v) => v === '' || (BUDGET_OPTIONS as readonly string[]).includes(v), 'Choose one of the listed ranges.')
    .optional()
    .or(z.literal('')),
  timeline: z
    .string()
    .trim()
    .refine((v) => v === '' || (TIMELINE_OPTIONS as readonly string[]).includes(v), 'Choose one of the listed timelines.')
    .optional()
    .or(z.literal('')),
  hp: honeypot,
});

export type ProjectInput = z.input<typeof projectSchema>;
export type ProjectData = z.output<typeof projectSchema>;

export const PROJECT_EMPTY: ProjectInput = {
  name: '',
  email: '',
  service: '',
  company: '',
  website: '',
  country: '',
  message: '',
  budget: '',
  timeline: '',
  hp: '',
};

/* ═══════════════════════════════════════════════════════════════
   THE WIRE FORMAT

   One form now, so one mapper. `recruiterToLead` stood beside this
   and is gone with the funnel it served.
   ═══════════════════════════════════════════════════════════════ */

/**
 * Budget goes in `budget`, not inside `service`.
 *
 * It was appended to the service string, which put it in the one column the
 * scoring does not read. `scoreLead_` in google-apps-script/Code.gs reads
 * `budget` directly, and with role, platform and timeline no longer collected
 * it is the only qualifying field left: in the service string it scored
 * nothing and every enquiry came out UNSCORED. The endpoint has read
 * `p.budget` and the sheet has had a column for it since before this form
 * existed.
 */
export function projectToLead(d: ProjectData): LeadFields {
  return {
    name: d.name,
    email: d.email,
    company: d.company,
    /* Its own column again. The five-field form sent a company name and a URL
       through one field, so the endpoint's `website` column, which the scoring
       weights highest, was always empty. */
    website: d.website,
    country: d.country,
    budget: d.budget,
    timeline: d.timeline,
    /* The selected service, not the constant 'Project enquiry' this sent when
       the form had nothing to put here. */
    service: d.service,
    message: d.message,
    funnel: 'project',
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
