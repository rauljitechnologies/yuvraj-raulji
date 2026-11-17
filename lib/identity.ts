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
 * ── Why this changed, three times ─────────────────────────────────────────
 *
 * It read "eCommerce, AI & Technology Consultant", then "Senior Software
 * Engineer" when the brief made international remote employment the first
 * objective, then "Freelance eCommerce Developer & Technology Professional"
 * when the objective became client work and "Freelance" was put in front to
 * qualify the visitor.
 *
 * That last line is now owner-rejected. The engagement word is doing the
 * qualifying from `AVAILABILITY`, which every page carries, so the positioning
 * line is free to state the discipline and the seniority instead: the two
 * things a buyer weighs once they already know the work is available.
 *
 * "Developer" rather than "Engineer" because the second half of the line is
 * "Technology Consultant", and Engineer + Consultant reads as two jobs. The
 * employment record still says Engineer where the record says Engineer:
 * lib/career.ts is verbatim from the CV and is not adjusted to match a
 * positioning line.
 */
export const ROLE = 'Senior Software Developer & Technology Consultant';

/**
 * The occupation, for the places that need a job title rather than a
 * positioning line.
 *
 * `ROLE` above is what the page says and it names two things. `jobTitle` on
 * the Person node takes exactly one occupation, and tooling that reads it
 * expects an occupation rather than a service description, so it takes the
 * first half on its own.
 */
export const ROLE_TITLE = 'Senior Software Developer';

/**
 * The specialisms, in the order they are claimed.
 *
 * These are the segments after the role in the owner's headline, and they are
 * the pipe-separated half of `POSITIONING_LINE` below. They were six job
 * titles ("Senior Magento Developer", "Shopify Developer" and so on), which
 * restated the role five more times instead of saying what the role covers.
 *
 * They go in the Person node's `knowsAbout`, in the resume's summary block and
 * in the hero. Never in `jobTitle`, which takes one occupation.
 */
export const ROLES_ADDITIONAL = [
  'Full-Stack Development',
  'eCommerce & Headless Commerce',
  'Generative AI',
  'Magento 2',
  'Shopify',
  'SEO & CRO',
] as const;

/**
 * For a <title>, where the full positioning line is too long.
 *
 * A <title> is cut at roughly 60 characters in a result, and the name has to
 * fit in front of this. `ROLE` is 49 characters and `POSITIONING_LINE` is 151,
 * so neither can go there: the specialisms would be truncated away on all 87
 * pages, leaving the same visible stem on every one of them, which is the
 * duplicate-title signal the build already gates against.
 *
 * This was dead code, exported and used nowhere, while the page titles each
 * restated the positioning in their own words. They read it now.
 */
export const ROLE_LINE = 'Senior Software Developer';

/**
 * The full headline, as the owner states it.
 *
 * The role and every specialism in one line, for the places with room to carry
 * it whole: the hero, the resume, the Open Graph description, llms.txt and the
 * Person node's description. Not for a <title>. See `ROLE_LINE` above.
 *
 * It is built from `ROLE` and `ROLES_ADDITIONAL` rather than written out, so a
 * specialism cannot be added to one and missed in the other.
 */
export const POSITIONING_LINE = [ROLE, ...ROLES_ADDITIONAL].join(' | ');

/* ═══════════════════════════════════════════════════════════════
   THE HEADLINE AND THE INTRODUCTION
   ═══════════════════════════════════════════════════════════════ */

/**
 * The homepage H1, held as lines because each authored break does its own
 * typographic work and reveals in its own mask. `Lines` joins them for the
 * accessible name, so a screen reader hears one heading.
 *
 * The accent flag puts the second half in the red. It falls on "& Powerful
 * Digital Experiences" rather than on the commerce half because the commerce
 * half is the established record and this half is the wider claim the page is
 * making. Both halves are the brief's own words, in section 3.
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
  'With 9+ years of experience in eCommerce and software development, I collaborate with businesses worldwide on project work, remote development and long-term technology partnerships.';

/** The one-line description the Person node and the meta descriptions share. */
export const DESCRIPTION =
  'Yuvraj Raulji is a Senior Software Developer and Technology Consultant based in Vadodara, India, with 9+ years across Magento 2 and Adobe Commerce, Shopify, headless architecture, full-stack engineering and Generative AI. Available for project work and remote development worldwide.';

/* ═══════════════════════════════════════════════════════════════
   AVAILABILITY
   ═══════════════════════════════════════════════════════════════ */

/**
 * The availability statement, and the thing the whole site is now pointed at.
 *
 * Three engagement shapes in one sentence rather than three: a buyer with a
 * fixed project, a buyer who wants someone embedded for a while and a buyer
 * who wants a long arrangement all need to see their own shape named, or the
 * line reads as written for one of the other two.
 *
 * This carries the whole weight of saying the work is available, now that the
 * positioning line states the discipline instead of the engagement. It is on
 * every page, in the header chip and the hero, which is the reason the word
 * could come out of the headline without the offer going quiet with it.
 */
export const AVAILABILITY =
  'Available for Project Work, Remote Development and Long-Term Contracts.';

/**
 * The header chip, and the hero's availability label.
 *
 * It read "OPEN TO REMOTE OPPORTUNITIES", which is the language of someone
 * looking for a job. The objective is client work, so the line says what is
 * on offer rather than what is wanted. "Project work" rather than
 * "freelance": the same offer, in the register the rest of the site now uses.
 */
export const AVAILABILITY_SHORT = 'AVAILABLE FOR PROJECT WORK & REMOTE DEVELOPMENT WORLDWIDE';

/** The same, trimmed for the header bar where width is tight. */
export const AVAILABILITY_CHIP = 'AVAILABLE FOR PROJECT WORK & REMOTE DEVELOPMENT';

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
 * explicitly the opposite: client work and remote projects, not a
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
  'Project Work',
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
 * There are no exceptions left. `ROLE_OPTIONS` in lib/site.ts once carried
 * "CTO or technology lead" as a deliberate one, because that string described
 * the *visitor's* role rather than Yuvraj's. The enquiry form no longer asks
 * for a role at all, so the list and the exception went together.
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
