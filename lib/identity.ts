/**
 * The professional identity. One source for every positioning string on the
 * site.
 *
 * ── Why this file exists ────────────────────────────────────────────────────
 *
 * The positioning was previously stated in five places that disagreed:
 * `ROLE` in lib/home.ts said "eCommerce Consultant & Digital Commerce
 * Architect", `PERSON_JOB_TITLE` in lib/schema.ts said "eCommerce, AI &
 * Technology Consultant", `POSITIONING` in lib/brand.ts said
 * "AI | BUSINESS | ECOMMERCE", the homepage <title> said a fourth thing and
 * the H1 said a fifth. The comments in lib/schema.ts already name the cost of
 * that: one Person node shares one `@id` across every page, and two different
 * bodies under one `@id` is the precise condition that stops a search engine
 * resolving an entity.
 *
 * So the strings live here, once, and the title, the H1, the Person node and
 * the Open Graph card all read them from here rather than restating them.
 *
 * ── The naming rule this file enforces ─────────────────────────────────────
 *
 * Section 3 of BRAND-DESIGN-GUIDELINE.md rules the word "Founder" off this
 * site entirely, and the brief extends that to Co-Founder, CTO, Chief
 * Technology Officer, Business Owner and Company Founder, in visible copy, in
 * metadata, in schema, in alt text and in hidden content alike.
 *
 * The positioning below is therefore stated in engineering terms, and
 * `PROHIBITED_TITLES` exists so the rule is testable rather than remembered:
 * scripts/check-prohibited-titles.sh greps the built output against it and
 * fails the build on a hit. A rule nothing checks is a rule that comes back.
 */

/* ═══════════════════════════════════════════════════════════════
   THE NAME AND THE ROLE
   ═══════════════════════════════════════════════════════════════ */

export const NAME = 'Yuvraj Raulji';

/**
 * The primary role, and the only job title the Person node carries.
 *
 * Senior Software Engineer rather than any of the consultant strings that
 * preceded it. The site's first audience is now a recruiter or an engineering
 * manager filling a remote seat, and "consultant" reads to that audience as
 * someone who is not available to hire as staff.
 */
export const ROLE = 'Senior Software Engineer';

/**
 * The secondary roles, in the order they are claimed.
 *
 * These are additional titles, never substitutes for ROLE: the Person node
 * carries exactly one `jobTitle`, and these go in `knowsAbout` and in visible
 * copy. First position is the architecture framing, because it is the one that
 * separates this record from a developer with the same stack list.
 */
export const ROLES_ADDITIONAL = [
  'Enterprise eCommerce Architect',
  'Senior Magento Developer',
  'Shopify Developer',
  'Full Stack Developer',
  'eCommerce Technical Lead',
  'Generative AI Professional',
] as const;

/** The role and the architecture framing, as one line, for a <title>. */
export const ROLE_LINE = `${ROLE} & Enterprise eCommerce Architect`;

/* ═══════════════════════════════════════════════════════════════
   THE HEADLINE AND THE INTRODUCTION
   ═══════════════════════════════════════════════════════════════ */

/**
 * The homepage H1, held as lines because each authored break does its own
 * typographic work and reveals in its own mask. `Lines` joins them for the
 * accessible name, so a screen reader hears one heading.
 *
 * The accent flag puts the second half in the red. It falls on
 * "AI-Powered Digital Experiences" rather than on the commerce half because
 * the commerce half is the established record and the AI half is the claim the
 * page is making.
 */
export const HEADLINE = [
  'Building Scalable eCommerce Platforms',
  { text: '& AI-Powered Digital Experiences.', accent: true },
] as const;

/** The same headline as one string, for a <title>, an OG card or a meta tag. */
export const HEADLINE_FLAT =
  'Building Scalable eCommerce Platforms & AI-Powered Digital Experiences.';

/**
 * The professional introduction, in the first person.
 *
 * Verbatim from the brief. Every figure in it traces to the record in
 * lib/career.ts; CONTENT-PRINCIPLES.md treats an unsupported number as
 * invention, so nothing here may be rounded up later without the record
 * moving first.
 */
export const INTRO =
  "I'm Yuvraj Raulji, a technology professional with 9+ years of experience in enterprise eCommerce development, Magento, Shopify, modern full-stack engineering and Generative AI.";

/**
 * The longer introduction, for the homepage hero where there is room for the
 * role and the scale as well as the subject.
 */
export const INTRO_LONG =
  "I'm Yuvraj Raulji, a Senior Software Engineer and Enterprise eCommerce Architect with 9+ years of experience building scalable digital commerce platforms, modern web applications and integrated business solutions.";

/** The one-line description the Person node and the meta descriptions share. */
export const DESCRIPTION =
  'Yuvraj Raulji is a Senior Software Engineer and Enterprise eCommerce Architect based in Vadodara, India, with 9+ years across Magento 2 and Adobe Commerce, Shopify, headless architecture, full-stack engineering and Generative AI.';

/* ═══════════════════════════════════════════════════════════════
   AVAILABILITY
   ═══════════════════════════════════════════════════════════════ */

/**
 * The availability statement, and the thing the whole site is now pointed at.
 *
 * Two audiences, deliberately named in one sentence rather than split into
 * two: a recruiter and a client both need to know the other is welcome, or the
 * page reads as written for someone else.
 */
export const AVAILABILITY =
  'Open to Full-Time Remote Roles, Contract Opportunities & Freelance Projects.';

/** The header chip. Short, uppercase, and the only place the word OPEN is set in the red. */
export const AVAILABILITY_SHORT = 'OPEN TO REMOTE OPPORTUNITIES';

export const LOCATION = 'Vadodara, Gujarat, India';
export const TIMEZONE = 'IST (UTC+5:30)';

/** Markets whose working hours overlap usefully with IST, in the order claimed. */
export const MARKETS = ['India', 'USA', 'UK', 'Europe', 'UAE'] as const;

export const WORK_PREFERENCES = [
  'Full-Time Remote',
  'Contract',
  'International Teams',
] as const;

/**
 * The seats this record is a fit for, as a recruiter would title them.
 *
 * Phrased as job titles rather than as skills on purpose: this array is what
 * /remote-work/ is built from, and it has to match the language of the posting
 * a recruiter is trying to fill.
 */
export const TARGET_ROLES = [
  'Senior Magento Developer',
  'Senior Shopify Developer',
  'Senior Full Stack Developer',
  'Senior Software Engineer',
  'eCommerce Technical Lead',
  'Enterprise Commerce Architect',
  'AI-enabled Full Stack Developer',
] as const;

/* ═══════════════════════════════════════════════════════════════
   TECHNICAL SPECIALTIES
   ═══════════════════════════════════════════════════════════════ */

/**
 * The hero's specialty row. Eight, because that is what fits on two lines at
 * the narrowest breakpoint without wrapping to three.
 *
 * The full capability set is lib/expertise.ts and the /expertise/ page. This
 * is the short list, and it is ordered by what a search actually asks for.
 */
export const SPECIALTIES = [
  'Magento 2',
  'Adobe Commerce',
  'Shopify',
  'Next.js',
  'React.js',
  'Node.js',
  'GraphQL',
  'Generative AI',
] as const;

/* ═══════════════════════════════════════════════════════════════
   THE NAMING RULE, AS DATA
   ═══════════════════════════════════════════════════════════════ */

/**
 * Titles that must not appear anywhere the site publishes.
 *
 * Checked against the built output rather than against the source, because the
 * failure mode is a string arriving in rendered HTML through a template, a
 * schema field or an alt attribute, and a source grep misses all three.
 *
 * "CTO or technology lead" in `ROLE_OPTIONS` (lib/site.ts) is a deliberate
 * exception and the checker knows about it: that string describes the role of
 * the *visitor* filling in the enquiry form, not Yuvraj's, and removing it
 * would stop a technology lead identifying themselves.
 */
export const PROHIBITED_TITLES = [
  'Founder',
  'Co-Founder',
  'Cofounder',
  'CTO',
  'Chief Technology Officer',
  'Business Owner',
  'Company Founder',
] as const;
