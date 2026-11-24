'use client';

/**
 * Light / dark toggle. Three states, and no React state at all.
 *
 * ── The three states ──────────────────────────────────────────────────────
 *
 *   system  no `data-theme` attribute   -> `prefers-color-scheme` decides
 *   light   data-theme="light"          -> wins over a dark OS
 *   dark    data-theme="dark"           -> wins over a light OS
 *
 * `system` is a real state, not the absence of one. A reader who has never
 * touched this follows their OS; a reader who picks light on a dark-mode
 * machine gets light. Storing a boolean loses the difference between "wants
 * light" and "has not chosen", which is the bug that makes a toggle fight
 * the OS on every visit.
 *
 * The attribute contract is in app/globals.css: the ink tokens are declared
 * for `:root[data-theme='dark']` and again under
 * `@media (prefers-color-scheme: dark)` guarded by
 * `:root:not([data-theme='light'])`, so all three resolve and an explicit
 * choice wins in both directions.
 *
 * ── Why there is no useState and no useEffect ─────────────────────────────
 *
 * The obvious build of this holds the choice in state and syncs it from the
 * DOM in an effect. That needs an effect purely to learn something the DOM
 * already knows, it trips `react-hooks/set-state-in-effect`, and it renders
 * one frame of the wrong icon on every page load.
 *
 * So the DOM is the state. The handler reads the attribute, advances it and
 * writes it back; the ICON is chosen by CSS from that same attribute. All
 * three icons are in the markup and `app/globals.css` shows exactly one,
 * which means the correct icon is painted on the first frame, server-rendered
 * HTML is correct for every reader, and there is nothing to hydrate.
 *
 * The first paint is set by the inline script in app/layout.tsx, which has
 * to run before paint or the page flashes the wrong theme while React boots.
 * This component only writes.
 */

const KEY = 'yr-theme';

export function ThemeToggle() {
  function cycle() {
    const root = document.documentElement;
    const current = root.getAttribute('data-theme');
    /* system -> light -> dark -> system */
    const next = current === 'light' ? 'dark' : current === 'dark' ? null : 'light';

    if (next) root.setAttribute('data-theme', next);
    else root.removeAttribute('data-theme');

    try {
      if (next) localStorage.setItem(KEY, next);
      else localStorage.removeItem(KEY);
    } catch {
      /* Private mode, or site data blocked. The choice still applies to this
         page view; it just will not survive a reload. Not worth failing. */
    }
  }

  return (
    <button
      type="button"
      onClick={cycle}
      /* One static name, because the button does one thing. Announcing the
         current theme here would be a lie in server-rendered HTML, and the
         state is already conveyed by the page itself. */
      aria-label="Switch colour theme: system, light, dark"
      title="Switch colour theme"
      className="grid h-10 w-10 shrink-0 place-items-center rounded border border-line text-ink-muted transition-colors duration-200 hover:border-accent hover:text-accent-bright"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Exactly one of these is shown, by `.yr-theme-icon-*` in
            app/globals.css, keyed off <html data-theme>. */}
        <g className="yr-theme-icon-system">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor" stroke="none" />
        </g>
        <g className="yr-theme-icon-light">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
        </g>
        <g className="yr-theme-icon-dark">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </g>
      </svg>
    </button>
  );
}
