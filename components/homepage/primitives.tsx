import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowIcon } from '../ui/icons';

/**
 * Homepage layout primitives. Server components with no state and no motion,
 * so none of this reaches the client bundle. Anything that needs an event
 * handler lives in a sibling `use client` module instead.
 *
 * Presentation lives in app/home.css under the `.h-` prefix; these components
 * exist so a section never has to remember which classes compose a marker or a
 * button.
 */

export function Shell({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`yr-shell ${className}`}>{children}</div>;
}

export function Section({
  id,
  children,
  labelledBy,
  open = false,
  tall = false,
  className = '',
}: {
  id: string;
  children: ReactNode;
  labelledBy?: string;
  /** Drops the top hairline. The hero is the only section that uses it. */
  open?: boolean;
  /** Extra vertical air, for a section carrying a single idea. */
  tall?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`yr-section ${open ? 'yr-section--open' : ''} ${
        tall ? 'yr-section--tall' : ''
      } ${className}`}
    >
      {children}
    </section>
  );
}

/**
 * Running head. The number is decorative ordering, not content, so it is
 * hidden from assistive technology; the label is the part worth announcing,
 * and it is not a heading because the section's own <h2> is.
 */
/**
 * The section eyebrow.
 *
 * `num` is still accepted and is deliberately not drawn. The homepage dropped
 * its ordinals when its eyebrows were rewritten, so a numbered section on an
 * interior page read as the older design however well the rest of it matched;
 * the rule that ran out to the right margin went with them. The prop stays
 * because a dozen call sites pass it and the ordering it records is still true,
 * it is simply not something the page says out loud any more.
 */
export function Marker({ label }: { num?: string; label: string }) {
  return <p className="yr-marker">{label}</p>;
}

export function Lede({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`yr-lede ${className}`}>{children}</p>;
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="yr-tag">{children}</span>;
}

/**
 * CTA. Renders <Link> for internal routes and <a> for hash targets and
 * external destinations. External links carry rel="noopener" because they open
 * in a new tab; nothing here opens a new tab silently without saying so in the
 * accessible name.
 */
export function Btn({
  href,
  children,
  variant = 'primary',
  arrow = true,
  external = false,
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  arrow?: boolean;
  external?: boolean;
  className?: string;
}) {
  const cls = `yr-btn yr-btn--${variant} ${className}`;
  /* One flex child, not two. The arrow used to be a sibling of the label and
     stayed at the button's right edge when the label wrapped under 640px,
     leaving a centred two-line label with an arrow stranded beside it. Inside
     the span it flows with the text and follows the last word. */
  const inner = (
    <span className="yr-btn__label">
      {children}
      {arrow ? <ArrowIcon className="yr-btn__arrow" size={15} /> : null}
    </span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return href.startsWith('#') ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/**
 * Descriptive prose link.
 *
 * The internal-linking system runs on this, not on `TextLink`. Anchor text on
 * this site says where the link goes ("Magento 2 and Adobe Commerce consulting"
 * rather than "read more"), and anchors that long are unreadable set in
 * uppercase at 0.72rem, which is what `.yr-link` is.
 *
 * `lead` puts an arrow in front and is for a link standing on its own line;
 * without it the link sits inside a sentence and takes an ordinary underline.
 */
export function InlineLink({
  href,
  children,
  lead = false,
  external = false,
  className = '',
}: {
  href: string;
  children: ReactNode;
  lead?: boolean;
  external?: boolean;
  className?: string;
}) {
  const cls = `yr-inline ${lead ? 'yr-inline--lead' : ''} ${className}`;
  /* The lead variant underlines a child <span> rather than the anchor itself,
     so the arrow pseudo-element stays out of the underline. */
  const inner = lead ? <span>{children}</span> : children;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return href.startsWith('#') ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function TextLink({
  href,
  children,
  external = false,
  className = '',
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const cls = `yr-link ${className}`;
  const inner = (
    <>
      {children}
      <ArrowIcon className="yr-btn__arrow" size={14} />
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return href.startsWith('#') ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
