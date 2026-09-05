'use client';

import type { ReactNode } from 'react';
import { ArrowIcon } from '../ui/icons';
import { useUI } from '../ui-context';

/**
 * Opens the existing enquiry modal (components/contact-modal.tsx), which is
 * already wired to the live lead endpoint. The homepage never rebuilds that
 * form; it only triggers it.
 */
export function ContactButton({
  children,
  variant = 'primary',
  className = '',
}: {
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  className?: string;
}) {
  const { setContactOpen } = useUI();

  return (
    <button
      type="button"
      onClick={() => setContactOpen(true)}
      className={`yr-btn yr-btn--${variant} ${className}`}
    >
      {/* The arrow sits inside the label, not beside it. As a sibling flex item
          it stayed pinned to the button's right edge when the label wrapped on
          a phone, so "Discuss your Magento architecture" rendered as two
          centred lines with a detached arrow floating off to the right. Inline,
          it follows the last word wherever that lands. */}
      <span className="yr-btn__label">
        {children}
        <ArrowIcon className="yr-btn__arrow" size={15} />
      </span>
    </button>
  );
}
