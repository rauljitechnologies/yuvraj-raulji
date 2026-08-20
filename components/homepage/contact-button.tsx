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
      {children}
      <ArrowIcon className="yr-btn__arrow" size={15} />
    </button>
  );
}
