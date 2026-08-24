/**
 * ABOUT PAGE CONTENT MODEL.
 *
 * The About page is a story, not a CV. The CV already exists at /experience/
 * and is the right shape for that job; repeating it here in nicer type would
 * give the reader two documents and no narrative.
 *
 * Same two rules as lib/brand.ts govern every string: every fact traces to the
 * professional record in lib/site.ts, and no company name, corporate brand or
 * foundership language appears anywhere, including in image alt text.
 */

import { ERAS } from './brand';

export const ABOUT_HERO = {
  eyebrow: 'AI × Business × eCommerce',
  /**
   * The H1. Two lines, and the second is the argument: everybody has the same
   * technology available, so the technology is not the differentiator.
   */
  headline: ['Technology changes.', 'How we think about it', 'matters more.'] as const,
  opening:
    'I work at the intersection of technology and business, exploring how AI, digital commerce and intelligent systems can create better ways to operate, sell and grow.',
  /**
   * The second paragraph, which is where the record goes. Every figure is from
   * the employment history: twelve years measured from the first builds in
   * 2014, the platforms actually worked on, and the scale actually carried.
   */
  record:
    'Twelve years of that, starting with the first websites and online stores in 2014. Since then: Magento and Adobe Commerce, Shopify, WooCommerce and headless architecture, across B2B, B2C, D2C and marketplace models, on catalogues running to 500K+ SKUs and platforms serving 1M+ monthly users.',
} as const;

/**
 * The journey. Reuses the same seven eras the homepage renders, because the
 * story is one story and two versions of it would drift apart within a month.
 * The About page renders them at length; the homepage renders them tight.
 */
export const JOURNEY = {
  headline: ['The', 'journey.'] as const,
  body:
    'Web, then commerce, then Magento, then Shopify, then headless, then transformation, then AI. Read down the left-hand column and it looks like a technology list. It is not: each move was forced by a problem the previous way of working could not hold.',
  eras: ERAS,
} as const;

/* ═══════════════════════════════════════════════════════════════
   WHAT I BELIEVE

   Five beliefs. Each carries a `because`, which is the part that makes it a
   position rather than a poster: a belief with no reasoning under it is
   indistinguishable from the same belief held by someone who has never tested
   it.
   ═══════════════════════════════════════════════════════════════ */

export interface Belief {
  num: string;
  claim: string;
  because: string;
}

export const BELIEFS_INTRO = {
  headline: ['What', 'I believe.'] as const,
} as const;

export const BELIEFS: Belief[] = [
  {
    num: '01',
    claim: 'Technology should create leverage.',
    because:
      'If a system does not make a decision better, an experience stronger or an operation faster, it is an expense with a roadmap attached. Novelty is not a business case.',
  },
  {
    num: '02',
    claim: 'Business strategy comes before technology selection.',
    because:
      'Platform debates are almost always architecture debates in disguise, and architecture debates are almost always business-model debates in disguise. Start at the end you can actually answer.',
  },
  {
    num: '03',
    claim: 'Customer experience is a competitive advantage.',
    because:
      'Features get copied within a quarter. The accumulated quality of a journey (how fast, how clear, how little it asks) does not, because it is a hundred small decisions rather than one big one.',
  },
  {
    num: '04',
    claim: 'AI should solve real problems.',
    because:
      'Automating a process nobody has fixed gets you the same bad outcome faster, and at higher cost. Most AI briefs I see are process briefs that have not been recognised yet.',
  },
  {
    num: '05',
    claim: 'Continuous learning is not optional.',
    because:
      'The technology on my CV changed roughly every three years and there is no reason to expect the next three to be gentler. The only durable skill is being able to tell a shift from a fashion.',
  },
];

/* ═══════════════════════════════════════════════════════════════
   CURRENT FOCUS
   ═══════════════════════════════════════════════════════════════ */

export const FOCUS_INTRO = {
  headline: ["What I'm", 'focused on.'] as const,
  body:
    'Seven subjects, and they are one subject: what happens to a commerce operation when intelligent systems stop being a feature and start being infrastructure.',
} as const;

export const FOCUS: readonly string[] = [
  'AI agents',
  'LLMs',
  'AI search',
  'AI commerce',
  'Headless commerce',
  'Business automation',
  'Digital transformation',
];

/* ═══════════════════════════════════════════════════════════════
   HOW I THINK

   Five steps, in order, and the order is the whole content. Almost every
   failed technology project I have seen ran them backwards: it picked the
   technology first and then went looking for the business case.
   ═══════════════════════════════════════════════════════════════ */

export interface Step {
  num: string;
  verb: string;
  object: string;
  body: string;
}

export const PROCESS_INTRO = {
  headline: ['How', 'I think.'] as const,
  body:
    'Five steps, and the order is the entire content. Almost every technology project that fails ran them backwards: it chose the platform first, then went looking for the business case that justified it.',
} as const;

export const PROCESS: Step[] = [
  {
    num: '01',
    verb: 'Understand',
    object: 'the business',
    body:
      'What makes money, what costs money, and which of the two the current system is actually optimised for. This is usually where the real brief turns out to be different from the stated one.',
  },
  {
    num: '02',
    verb: 'Map',
    object: 'the system',
    body:
      'The process as it runs, not as it is documented. Where the manual work sits, where the data goes stale, and which step everyone quietly works around.',
  },
  {
    num: '03',
    verb: 'Choose',
    object: 'the technology',
    body:
      'Now, and not before. The right platform is the one whose complexity matches the problem: for a small single-store catalogue, that answer is frequently the cheaper one.',
  },
  {
    num: '04',
    verb: 'Build',
    object: 'intelligently',
    body:
      'Sequenced so trading continues throughout. In a replatforming the risk is never the build, it is the cutover: URLs, redirects, order history, integrations and the week either side.',
  },
  {
    num: '05',
    verb: 'Measure',
    object: 'the outcome',
    body:
      'Against the business number from step one, not against a lab score. A green Lighthouse result on a page that still loses the customer at checkout has measured the wrong thing.',
  },
];

/* ═══════════════════════════════════════════════════════════════
   BEYOND THE WORK

   The human section. Deliberately short, because the site is not a diary, and
   deliberately specific, because "passionate about technology" is not a fact
   about a person.

   No photograph is invented for this section. The photographic layout switches
   on when real files arrive in public/assets/founder/; until then it renders
   as type, which is finished in its own right. See that directory's README.
   ═══════════════════════════════════════════════════════════════ */

export const PERSONAL = {
  headline: ['Beyond', 'the work.'] as const,
  body:
    'Based in Vadodara, Gujarat. Most of what I know came from building something badly first, which is a slower curriculum than a course and a considerably more durable one.',
  facets: [
    {
      label: 'Reading',
      body: 'Primary documentation over summaries. Model cards, platform release notes and the occasional paper, because a second-hand account of a technical change is usually a confident version of a wrong one.',
    },
    {
      label: 'Building',
      body: 'Small things, to find out whether an idea survives contact with an API. Most do not, and that is the useful result.',
    },
    {
      label: 'Writing',
      body: 'Long-form, on the subjects above. Writing is how I find out whether I actually understand a position or merely agree with it.',
    },
  ] as const,
} as const;
