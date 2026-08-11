'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface UIState {
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  contactOpen: boolean;
  setContactOpen: (v: boolean) => void;
}

const UIContext = createContext<UIState | null>(null);

export function useUI(): UIState {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used inside <UIProvider>');
  return ctx;
}

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const anyOpen = menuOpen || contactOpen;

  // Alpine toggled `overflow-hidden` on the page wrapper; lock <html> instead so
  // the fullpage scroller can detect an open overlay (the original checked
  // document.body for a class Alpine never put there, so it never paused).
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('is-locked', anyOpen);
    return () => root.classList.remove('is-locked');
  }, [anyOpen]);

  // Replaces @keydown.escape.window
  useEffect(() => {
    if (!anyOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setMenuOpen(false);
      setContactOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [anyOpen]);

  const value = useMemo(
    () => ({ menuOpen, setMenuOpen, contactOpen, setContactOpen }),
    [menuOpen, contactOpen],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
