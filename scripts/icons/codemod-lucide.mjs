/**
 * One-off migration: replaces lucide-react imports in src/ with the
 * generated Sakani (Tabler) icons, keeping each file's local names so no JSX
 * changes. `LucideIcon` becomes `IconComponent`.
 *
 *   node scripts/icons/codemod-lucide.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const map = JSON.parse(fs.readFileSync(path.join(here, 'lucide-to-tabler.json'), 'utf8'));
const pascal = (n) => n.split('-').map((p) => p[0].toUpperCase() + p.slice(1)).join('');
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const files = walk(path.join(root, 'src')).filter((f) => /\.(tsx?|mdx)$/.test(f) && !/src\/(glass-icons|sicons|icons)\//.test(f));

const IMPORT = /import\s+(type\s+)?\{([^}]*)\}\s*from\s*['"]lucide-react['"];?/g;
let changed = 0;
const unknown = new Set();
for (const file of files) {
  let src = fs.readFileSync(file, 'utf8');
  if (!/from\s*['"]lucide-react['"]/.test(src)) continue;
  let rel = path.relative(path.dirname(file), path.join(root, 'src/icons')).split(path.sep).join('/');
  if (!rel.startsWith('.')) rel = './' + rel;
  let usesType = false;
  src = src.replace(IMPORT, (_, typeOnly, list) => {
    const lines = [];
    for (let item of list.split(',')) {
      item = item.trim();
      if (!item) continue;
      const isType = !!typeOnly || item.startsWith('type ');
      item = item.replace(/^type\s+/, '');
      const [name, alias] = item.split(/\s+as\s+/).map((s) => s.trim());
      if (name === 'LucideIcon') { usesType = true; continue; }
      if (isType) { unknown.add('type ' + name); continue; }
      const tabler = map[name];
      if (!tabler) { unknown.add(name); continue; }
      lines.push(`import { Icon${pascal(tabler)} as ${alias || name} } from '${rel}/outline/${tabler}';`);
    }
    return lines.join('\n');
  });
  if (usesType) {
    src = src.replace(/\bLucideIcon\b/g, 'IconComponent');
    // add the type import after the last import line
    const typeLine = `import type { IconComponent } from '${rel}/types';`;
    const idx = src.lastIndexOf('\nimport ');
    const end = idx === -1 ? 0 : src.indexOf('\n', src.indexOf(';', idx)) + 1;
    src = src.slice(0, end) + typeLine + '\n' + src.slice(end);
  }
  // blank lines left behind by removed type-only imports
  src = src.replace(/\n{3,}/g, '\n\n');
  fs.writeFileSync(file, src);
  changed++;
}
console.log(`codemod: ${changed} files updated`);
if (unknown.size) { console.error('UNMAPPED:', [...unknown].join(', ')); process.exit(1); }
