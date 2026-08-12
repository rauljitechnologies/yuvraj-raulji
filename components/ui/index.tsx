import Link from 'next/link';
import type { ElementType, ReactNode } from 'react';

/**
 * Layout + surface primitives. Server components (no motion, no state) so they
 * stay out of the client bundle — see components/ui/reveal.tsx for the animated
 * wrapper. Spacing, borders and focus rings live here and nowhere else.
 */

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-shell px-gutter ${className}`}>{children}</div>;
}

export function Section({
  id,
  children,
  className = '',
  surface = false,
  labelledBy,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Alternating band background to separate adjacent sections. */
  surface?: boolean;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative py-section ${surface ? 'bg-surface' : 'bg-bg'} ${className}`}
    >
      {children}
    </section>
  );
}

/** Small uppercase kicker. Decorative rule is aria-hidden so SRs read only the text. */
export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-3 text-label font-bold uppercase tracking-[.24em] text-ink-muted ${className}`}>
      <span aria-hidden="true" className="h-px w-8 bg-accent" />
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  lede,
  as: Tag = 'h2',
  className = '',
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  return (
    <div className={`max-w-[760px] ${className}`}>
      {eyebrow ? <Eyebrow className="mb-5">{eyebrow}</Eyebrow> : null}
      <Tag id={id} className="font-bebas text-h2 uppercase leading-[.98] tracking-[.02em] text-ink">
        {title}
      </Tag>
      {lede ? <p className="mt-5 text-body-lg leading-[1.7] text-ink-secondary">{lede}</p> : null}
    </div>
  );
}

export function Card({
  children,
  className = '',
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  /** Adds hover/focus affordance. Only for cards that actually do something. */
  interactive?: boolean;
}) {
  return (
    <div
      className={`relative rounded-md border border-line bg-surface p-6 transition-[border-color,transform,box-shadow] duration-200 ease-out ${
        interactive ? 'hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function Badge({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex h-[30px] items-center rounded-full border border-line-strong px-3 text-[.68rem] font-semibold uppercase tracking-[.12em] text-ink-secondary ${className}`}
    >
      {children}
    </span>
  );
}

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
};

/**
 * 52px tall — comfortably above the 44×44 touch minimum. Renders as Link for
 * internal hrefs, <a> for hash/external, <button> otherwise.
 */
export function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  ...rest
}: ButtonProps) {
  const base =
    'inline-flex h-[52px] min-w-[44px] items-center justify-center gap-2 rounded-sm px-7 text-[.76rem] font-bold uppercase tracking-[.10em] whitespace-nowrap transition-[background-color,border-color,transform,box-shadow] duration-200 ease-out active:scale-[.97] disabled:pointer-events-none disabled:opacity-50 touch-manipulation';
  const styles =
    variant === 'primary'
      ? 'bg-accent text-white border border-accent hover:bg-accent-bright hover:border-accent-bright hover:shadow-accent hover:-translate-y-[2px]'
      : 'bg-transparent text-ink border border-line-strong hover:border-accent/50 hover:-translate-y-[2px]';
  const cls = `${base} ${styles} ${className}`;

  if (href) {
    const external = href.startsWith('http') || href.startsWith('#');
    return external ? (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    ) : (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls} {...rest}>
      {children}
    </button>
  );
}
