import fs from 'fs';
import path from 'path';

import { RESUME_FILE } from './resume';

/**
 * Does the CV file actually exist in `public/`?
 *
 * ── Why this is its own module ─────────────────────────────────────────────
 *
 * It was a `const` inside lib/resume.ts, which broke the build. lib/schema.ts
 * imports `RESUME` for `resumeSchema()`, and lib/schema.ts is reached from
 * components/insights/article-aside.tsx, which is a client component. So `fs`
 * and `path` were pulled into the browser bundle, where neither exists, and
 * the build failed with a module-not-found on `fs` for both the browser and
 * the SSR pass.
 *
 * The fix is the boundary, not a shim: lib/resume.ts is now pure data that
 * anything may import, and the filesystem question lives here, where only
 * server components ask it. `resumeSchema()` takes the answer as an argument
 * rather than reaching for it, which also makes it testable without a disk.
 *
 * Do not import this file from a client component, or from any module a client
 * component can reach. That is the whole constraint.
 */
export function resumeAvailable(): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), 'public', RESUME_FILE.replace(/^\//, '')));
  } catch {
    /* A permissions error reads as absent. The page then renders its no-file
       state, which is correct and is never a broken link. */
    return false;
  }
}
