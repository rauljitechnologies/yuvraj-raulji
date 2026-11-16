import fs from 'fs';
import path from 'path';

import { CERT_IMAGE } from './certifications';

/**
 * Does the certificate scan exist in `public/`?
 *
 * Its own module for the same reason lib/resume-file.ts is: lib/schema.ts
 * imports the certification data and is reachable from a client component, so
 * the data module must stay free of `fs`. Server components only.
 */
export function certImageAvailable(): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), 'public', CERT_IMAGE.replace(/^\//, '')));
  } catch {
    return false;
  }
}
