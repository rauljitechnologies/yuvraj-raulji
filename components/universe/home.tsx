'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { ContactModal } from '../contact-modal';
import { SiteFooter } from '../site-footer';
import { FounderIntro } from './founder-intro';
import { UniverseNav } from './nav';
import { UniverseProvider } from './provider';
import {
  ContactSection,
  InsightsSection,
  StatementSection,
} from './sections/closing';
import {
  CommerceSection,
  ExpertiseSection,
  IntelligenceSection,
} from './sections/capability';
import { HeroSection, PhilosophySection } from './sections/opening';
import {
  ExperienceSection,
  TechnologySection,
  WorkSection,
} from './sections/proof';

/**
 * three.js, drei and the post-processing chain are the heaviest thing on the
 * page by a wide margin. Loading them through `dynamic` puts the whole WebGL
 * layer in its own chunk, which is then requested only once the browser is
 * idle: the text, the navigation and the case studies are interactive long
 * before the world arrives, and a visitor who never scrolls past the hero on a
 * slow connection is not made to pay for it up front.
 */
const CanvasRoot = dynamic(() => import('./canvas-root').then((m) => m.CanvasRoot), {
  ssr: false,
});

/**
 * The homepage journey.
 *
 * Order matters and is shared with `SCENES` in lib/universe.ts: the camera path
 * is derived from these sections' measured positions, so adding a section here
 * without adding it there would leave the world one stop short.
 *
 * The enquiry modal and the footer are the existing components. The footer
 * carries the site's internal linking and the modal is wired to a live lead
 * endpoint; neither had a reason to be rebuilt for a visual redesign.
 */
export function UniverseHome() {
  const [worldReady, setWorldReady] = useState(false);

  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (h: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setWorldReady(true), { timeout: 1500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(() => setWorldReady(true), 300);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <UniverseProvider>
      <UniverseNav />
      {worldReady ? <CanvasRoot /> : null}
      <FounderIntro />

      <main id="top" className="u-main">
        <HeroSection />
        <PhilosophySection />
        <CommerceSection />
        <IntelligenceSection />
        <ExpertiseSection />
        <WorkSection />
        <TechnologySection />
        <ExperienceSection />
        <InsightsSection />
        <StatementSection />
        <ContactSection />
      </main>

      <SiteFooter />
      <ContactModal />
    </UniverseProvider>
  );
}
