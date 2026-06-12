import fs from 'fs';
import path from 'path';

export function pageHtml(name: string): string {
  return fs.readFileSync(path.join(process.cwd(), 'app', '_html', name), 'utf8');
}
