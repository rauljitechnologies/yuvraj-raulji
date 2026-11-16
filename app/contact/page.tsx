import type { Metadata } from 'next';
import { Page, PageHero } from '../../components/chrome/page';
import { ProjectForm } from '../../components/forms/project-form';
import { RecruiterForm } from '../../components/forms/recruiter-form';
import { Lines, Rise } from '../../components/homepage/motion';
import { Btn, InlineLink, Marker, Section, Shell } from '../../components/homepage/primitives';
import { contactSchema, type Crumb } from '../../lib/schema';
import { CONTACT, OG_IMAGE, SITE_URL } from '../../lib/site';
import '../home.css';

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Contact', href: '/contact/' },
];

const title = 'Contact Yuvraj Raulji | Senior Software Engineer';
const description =
  'Two ways through: send a remote role if you are hiring, or describe a project if you need it built. Replies within 24 hours on IST business days.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/contact/` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/contact/`,
    siteName: 'Yuvraj Raulji',
    type: 'website',
    locale: 'en_US',
    images: [OG_IMAGE],
  },
  twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE] },
};

/**
 * Contact.
 *
 * The route existed as an empty directory and a `contactSchema()` builder
 * nobody called: the site had a form on the homepage, a modal on the interior
 * pages and no page of its own to send anyone to, so the header's one action
 * pointed at `/#contact` and took a reader on /experience/ back to the
 * homepage to write a message. It has a destination now, and the header points
 * at it.
 *
 * ── Two funnels, not one form with a dropdown ──────────────────────────────
 *
 * The page carried one shared form with a "what is this about" select. That
 * worked while there was one audience. There are now two, and they are
 * answering different questions: a hiring manager has a role, an employment
 * type and a posting to link; a business has a platform, a budget band and a
 * timeline. A single form serving both asks the recruiter for a budget and the
 * business for an employment type, and a reader who is asked an irrelevant
 * question concludes the page was not written for them.
 *
 * So there are two, in lib/forms.ts, with separate Zod schemas and separate
 * field sets. They are kept apart visually as well: the hiring funnel sits on
 * the page ground and the project funnel on the paper band, so a reader who
 * scrolls in on either one can tell immediately which they are in.
 *
 * They converge on one thing only, and deliberately: `submitLead` in
 * lib/lead.ts, so there is still exactly one path a message can travel and one
 * place it can land. The `funnel` field added to that payload is what keeps
 * them countable afterwards, in the sheet and in `generate_lead`.
 *
 * The hiring funnel is first. The site's primary objective is a remote role,
 * and the order of two forms on a page is a statement about which one matters.
 */

/* The channels, as a list so the markup below is a loop and not four copies.
   `note` is what the reader needs to know before choosing one, which is the
   part a bare list of addresses leaves them to guess at. */
const CHANNELS = [
  {
    label: 'Email',
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    note: 'The best one for anything with detail in it. Replies within 24 hours on IST business days.',
  },
  {
    label: 'WhatsApp',
    value: 'Message directly',
    href: CONTACT.whatsapp,
    note: 'For a quick question, or to find a slot without three emails about calendars.',
  },
  {
    label: 'Phone',
    value: CONTACT.phoneDisplay,
    href: `tel:${CONTACT.phoneE164}`,
    note: 'IST business hours. If it rings out, the email above reaches me faster.',
  },
  {
    label: 'LinkedIn',
    value: 'in/yuvraj-raulji',
    href: CONTACT.linkedin,
    note: 'Where the professional record lives, and where most first messages arrive.',
  },
] as const;

/* Phrased as the question the reader still has, not as a page name. */
const NEXT_STEPS = [
  { href: '/hire/', label: 'What working together actually looks like' },
  { href: '/pricing/', label: 'How an engagement is structured and priced' },
  { href: '/services/', label: 'Which service the problem belongs to' },
  { href: '/work/', label: 'Whether I have built something like it' },
] as const;

export default function ContactPage() {
  return (
    <Page schema={contactSchema(crumbs)} active="Contact">
      <PageHero
        eyebrow="Contact"
        lines={['Describe the problem,', 'not the project.']}
        lede="A replatforming you have been putting off, a checkout that loses people you already paid for, a catalogue that has outgrown its architecture, or an AI idea that needs someone to tell you which half of it is real. A few lines is enough to start."
        crumbs={crumbs}
      />

      {/* ── The channels ─────────────────────────────────────────── */}
      <Section id="channels" labelledBy="channels-title">
        <Shell>
          <Marker label="Direct" />
          <div className="mb-10 sm:mb-14">
            <h2
              id="channels-title"
              className="yr-display yr-display--2 m-0 max-w-[22ch]"
            >
              <span className="yr-display__soft block">Four ways through.</span>
              <span className="yr-display__strong block">All of them reach me.</span>
            </h2>
          </div>

          <ul className="m-0 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-2">
            {CHANNELS.map((c, i) => (
              <li key={c.label} className="bg-[var(--bg)]">
                <Rise delay={Math.min(i, 3) * 0.06} className="group flex h-full flex-col p-6 sm:p-8 lg:p-10">
                  <span className="font-mono text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-ink/55">
                    {c.label}
                  </span>
                  <p className="m-0 mt-5 font-manrope text-[clamp(20px,2vw,28px)] font-semibold leading-[1.15] tracking-[-0.025em]">
                    <a
                      href={c.href}
                      {...(c.href.startsWith('http')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="break-words transition-colors duration-200 group-hover:text-accent-bright"
                    >
                      {c.value}
                    </a>
                  </p>
                  <p className="m-0 mt-4 max-w-[46ch] font-manrope text-[16px] font-light leading-[1.7] text-ink/55">
                    {c.note}
                  </p>
                </Rise>
              </li>
            ))}
          </ul>

          <Rise delay={0.3} className="mt-10 flex flex-wrap items-center gap-3 border-t border-line pt-8">
            <span aria-hidden="true" className="h-[7px] w-[7px] shrink-0 rounded-full bg-accent animate-yr-blink" />
            <span className="font-mono text-[10px] font-medium uppercase leading-none tracking-[0.18em] text-ink/60">
              {CONTACT.location} · IST · GMT+5:30
            </span>
          </Rise>
        </Shell>
      </Section>

      {/* ── Funnel A: hiring ──────────────────────────────────────
          On the page ground, first, and with the heading naming the audience
          rather than the action: a recruiter scanning for the right form finds
          it by who it is for, not by the verb on its button. */}
      <Section id="hiring" labelledBy="hiring-title">
        <Shell>
          <Marker label="For recruiters and hiring managers" />
          <div className="mb-grid grid gap-x-12 gap-y-item lg:grid-cols-[1fr_1.1fr]">
            <Lines as="h2" id="hiring-title" lines={['Hiring for', { text: 'a remote team?', accent: true }]} />
            <Rise delay={0.12}>
              <p className="m-0 max-w-[54ch] font-manrope text-[18px] font-light leading-[1.7] text-ink/65">
                Open to full-time remote roles, contract and international teams. Send the role and
                you get a straight yes or no within 24 hours, including when the answer is no.
              </p>
              <div className="mt-item">
                <Btn href="/remote-work/" variant="ghost">
                  The working arrangement, time zone and target roles
                </Btn>
              </div>
            </Rise>
          </div>

          <Rise className="grid gap-px border border-line bg-line lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className="flex min-w-0 flex-col gap-item bg-[var(--bg)] p-card">
              <p className="m-0 max-w-[40ch] font-manrope text-[17px] font-light leading-[1.7] text-ink/60">
                Three fields are required. The rest are optional and they are what let me answer
                properly rather than ask you four questions back.
              </p>
              <p className="m-0 max-w-[40ch] font-manrope text-[15px] font-light leading-[1.7] text-ink/45">
                A link to the job description is the most useful thing you can give me: it answers
                the stack, the seniority and the location before I read a word.
              </p>
            </div>
            <div className="min-w-0 bg-[var(--bg)] p-card">
              <RecruiterForm tone="dark" id="recruiter-form" />
            </div>
          </Rise>
        </Shell>
      </Section>

      {/* ── Funnel B: project work, on the paper band ─────────────
          The ground change is the separator. Two forms of the same colour
          stacked on one page read as one long form with a heading in the
          middle, which is how a reader ends up filling in the wrong one. */}
      <Section id="project" labelledBy="project-title" className="yr-paper">
        <Shell>
          <Marker label="For clients and agencies" />
          <div className="mb-grid">
            <h2 id="project-title" className="yr-display yr-display--2 m-0 max-w-[20ch]">
              <span className="yr-display__soft block">Tell me what is</span>
              <span className="yr-display__strong block">in front of you.</span>
            </h2>
          </div>

          <Rise className="grid gap-px border border-line bg-line lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className="flex min-w-0 flex-col gap-item bg-[var(--bg)] p-card">
              <p className="m-0 max-w-[42ch] font-manrope text-[19px] font-light leading-[1.7] text-ground/65">
                The constraint, the system it sits in, and what you have already tried. That is
                enough for a useful first reply; the rest is what the conversation is for.
              </p>
              <p className="m-0 max-w-[42ch] font-manrope text-[16px] font-light leading-[1.7] text-ground/55">
                Nothing here is sold on. Messages go to one inbox, they are read by me, and an
                enquiry that turns out to be a bad fit gets told so rather than quoted for.
              </p>
              <p className="m-0 max-w-[42ch] font-manrope text-[15px] font-light leading-[1.7] text-ground/45">
                No price is quoted from a form. The pricing page explains the five engagement
                models and why there is no rate card.
              </p>
            </div>
            <div className="min-w-0 bg-[var(--bg)] p-card">
              <ProjectForm tone="paper" id="project-form" />
            </div>
          </Rise>

          {/*
            Three ways out, for the reader who is not ready to write yet.

            This page had no links in its body at all: it took the header and
            footer like every page and gave nothing back, so a visitor who
            arrived, read the channels and decided they wanted to know more
            first had the browser back button and nothing else. It was also
            the only page on the site with no contextual links in either
            direction, which is a poor signal for the one page the whole site
            is pointing at.

            Named by what the reader is deciding, not by page title, because
            somebody who has not written yet is usually missing one of these
            three things.
          */}
          <Rise
            delay={0.15}
            className="mt-12 border-t border-line pt-8 sm:mt-16"
          >
            <p className="m-0 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-ink/55">
              Not ready to write yet
            </p>
            <ul className="m-0 mt-5 flex list-none flex-col gap-3 p-0 sm:flex-row sm:flex-wrap sm:gap-x-10">
              {NEXT_STEPS.map((n) => (
                <li key={n.href} className="m-0">
                  <InlineLink href={n.href}>{n.label}</InlineLink>
                </li>
              ))}
            </ul>
          </Rise>
        </Shell>
      </Section>
    </Page>
  );
}
