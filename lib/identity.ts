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
 * The primary positioning line.
 *
 * ── Why this changed, twice ───────────────────────────────────────────────
 *
 * It read "eCommerce, AI & Technology Consultant", then "Senior Software
 * Engineer" when the brief made international remote employment the first
 * objective. The objective has changed again and is now explicit: freelance
 * clients and remote project work, and *not* a recruiter portal.
 *
 * "Senior Software Engineer" is the wrong line for that audience. A business
 * looking for someone to build their storefront reads it as a person who has
 * a job, not a person they can engage. "Freelance" is the word that qualifies
 * the visitor, so it leads.
 *
 * The engineering seniority is not lost: it is `ROLE_TITLE` below and the
 * first entry in `ROLES_ADDITIONAL`, so it still carries the credibility
 * without claiming availability for employment.
 */
export const ROLE = 'Freelance eCommerce Developer & Technology Professional';

/**
 * The engineering title, for the places that need a job title rather than a
 * positioning line.
 *
 * `ROLE` above is the commercial positioning and it is what the page says.
 * This is what the Person node's `jobTitle` carries, because "Freelance
 * eCommerce Developer & Technology Professional" is a service description and
 * `jobTitle` is read by tooling that expects an occupation.
 */
export const ROLE_TITLE = 'Senior Software Engineer';

/**
 * The secondary roles, in the order they are claimed.
 *
 * These are additional titles, never substitutes for ROLE: the Person node
 * carries exactly one `jobTitle`, and these go in `knowsAbout` and in visible
 * copy. First position is the architecture framing, because it is the one that
 * separates this record from a developer with the same stack list.
 */
export const ROLES_ADDITIONAL = [
  'Senior Software Engineer',
  'Enterprise eCommerce Architect',
  'Senior Magento Developer',
  'Shopify Developer',
  'Full Stack Developer',
  'Generative AI Professional',
] as const;

/** For a <title>, where the full positioning line is too long. */
export const ROLE_LINE = 'Freelance eCommerce Developer';

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
  { text: '& Powerful Digital Experiences.', accent: true },
] as const;

/** The same headline as one string, for a <title>, an OG card or a meta tag. */
export const HEADLINE_FLAT =
  'Building Scalable eCommerce Platforms & Powerful Digital Experiences.';

/**
 * The professional introduction, in the first person.
 *
 * Verbatim from the brief. Every figure in it traces to the record in
 * lib/career.ts; CONTENT-PRINCIPLES.md treats an unsupported number as
 * invention, so nothing here may be rounded up later without the record
 * moving first.
 */
export const INTRO =
  "Hi, I'm Yuvraj Raulji. I help businesses build, improve and scale eCommerce platforms and modern digital solutions using Magento, Shopify, Next.js, React and AI-powered technologies.";

/**
 * The longer introduction, for the homepage hero where there is room for the
 * role and the scale as well as the subject.
 */
export const INTRO_LONG =
  'With 9+ years of experience in eCommerce and software development, I collaborate with businesses worldwide on freelance projects, remote development work and long-term technology partnerships.';

/** The one-line description the Person node and the meta descriptions share. */
export const DESCRIPTION =
  'Yuvraj Raulji is a freelance eCommerce developer and technology professional based in Vadodara, India, with 9+ years across Magento 2 and Adobe Commerce, Shopify, headless architecture, full-stack engineering and Generative AI. Available for freelance projects and remote development worldwide.';

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
  'Available for Freelance Projects, Remote Development Work and Long-Term Contracts.';

/**
 * The header chip, and the hero's availability label.
 *
 * It read "OPEN TO REMOTE OPPORTUNITIES", which is the language of someone
 * looking for a job. The objective is client work, so the line now says what
 * is on offer rather than what is wanted.
 */
export const AVAILABILITY_SHORT = 'AVAILABLE FOR FREELANCE & REMOTE PROJECTS WORLDWIDE';

/** The same, trimmed for the header bar where width is tight. */
export const AVAILABILITY_CHIP = 'AVAILABLE FOR FREELANCE & REMOTE PROJECTS';

export const LOCATION = 'Vadodara, Gujarat, India';
export const TIMEZONE = 'IST (UTC+5:30)';

/** Markets whose working hours overlap usefully with IST, in the order claimed. */
export const MARKETS = ['India', 'USA', 'UK', 'Europe', 'UAE'] as const;

/**
 * How a client can engage, from §11 of the brief.
 *
 * ── What this replaced ────────────────────────────────────────────────────
 *
 * `TARGET_ROLES` stood here: seven job titles, as a recruiter would name them,
 * with `WORK_PREFERENCES` ("Full-Time Remote", "Contract") beside it. Both
 * described a person looking for employment, and the current objective is
 * explicitly the opposite: freelance clients and remote project work, not a
 * recruiter portal.
 *
 * These are the shapes an engagement takes instead. They answer the question
 * a prospective client actually has, which is "how would I buy this", not
 * "what seat would you take".
 *
 * `seeks` was removed from the Person node at the same time. It is the
 * schema.org property for a demand, and publishing a demand for employment
 * contradicts a site offering services.
 */
export const ENGAGEMENT_MODELS = [
  'Freelance Projects',
  'Fixed-Scope Development',
  'Hourly Development',
  'Monthly Retainer',
  'Contract Development',
  'Long-Term Remote Collaboration',
  'Ongoing Maintenance & Support',
] as const;

/**
 * Who the work is for. Named because /remote-work/ claims breadth and a claim
 * of breadth with nothing under it is the kind of sentence
 * CONTENT-PRINCIPLES.md exists to stop.
 */
export const CLIENT_TYPES = [
  'eCommerce brands and retailers',
  'B2B and wholesale businesses',
  'Digital agencies and studios',
  'Startups and founders',
  'Manufacturers and distributors',
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
