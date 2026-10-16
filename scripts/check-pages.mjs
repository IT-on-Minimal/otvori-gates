import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { extname, join } from 'node:path';

const root = join(process.cwd(), 'dist/client');
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const siteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN || '';
const htmlFiles = [];
const problems = [];

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (entry.name.endsWith('.html')) htmlFiles.push(path);
  }
}

walk(root);
if (!existsSync(join(root, 'robots.txt')) || !existsSync(join(root, 'sitemap.xml'))) {
  problems.push('Missing robots.txt or sitemap.xml');
}
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  for (const [, raw] of html.matchAll(/(?:href|src|poster)="([^"]+)"/g)) {
    if (!raw.startsWith('/') || raw.startsWith('//')) continue;
    if (basePath && !raw.startsWith(basePath + '/')) {
      problems.push(`${file}: URL outside ${basePath}: ${raw}`);
      continue;
    }
    const pathname = decodeURIComponent(raw.split(/[?#]/, 1)[0].slice(basePath.length));
    const target = join(root, pathname);
    if (!existsSync(target) && !existsSync(join(target, 'index.html')) &&
        !(extname(target) === '' && existsSync(target + '.html'))) {
      problems.push(`${file}: missing ${raw}`);
    }
  }
  if (siteOrigin && html.includes('otvori-new-2026.moonstrike2020.chatgpt.site')) {
    problems.push(`${file}: old site origin remains`);
  }
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Checked ${htmlFiles.length} HTML files and their local links and assets.`);
}
