#!/usr/bin/env node
/**
 * Builds cli/templates/ from the source-of-truth block files in
 * ../src/blocks. Run this whenever a block changes, before publishing
 * @sakaniui/cli, so the CLI's bundled templates stay in sync with the
 * library.
 *
 * What it does per block folder:
 *   1. Reads the main <BlockName>.tsx and <BlockName>.module.css (skips
 *      .stories.tsx and index.ts -- those are internal to this repo).
 *   2. Rewrites internal-repo import paths so the file is valid once it
 *      lives in a consumer's own project instead of inside this monorepo:
 *        '../../components/...'        -> '@sakaniui/react'
 *        '../../lib/iconStrokeWidth'   -> '@sakaniui/react'
 *        '../../assets/avatars/x.jpg'  -> './assets/x.jpg' (file is copied
 *                                          alongside the template so the
 *                                          relative import still resolves)
 *   3. Writes everything to cli/templates/<kebab-case-name>/ and records an
 *      entry in cli/templates/manifest.json (name, componentName,
 *      description, file list) that the CLI reads at runtime.
 */

import { readdirSync, statSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOCKS_DIR = join(__dirname, '..', '..', 'src', 'blocks');
const TEMPLATES_DIR = join(__dirname, '..', 'templates');

const toKebabCase = (pascal) =>
  pascal
    // Split a run of capitals followed by a new capitalized word, e.g.
    // "CRMDashboard" -> "CRM-Dashboard" (must run before the general rule
    // below, or "CRMDashboard" would collapse to one word).
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();

/** Pulls a one-sentence description out of the block's top JSDoc comment.
 * Every block's doc comment is a series of blank-line-separated paragraphs;
 * this groups lines back into paragraphs (a wrapped sentence is useless
 * split mid-line) and prefers the "Matches Figma ..." paragraph every block
 * has, falling back to the first paragraph that isn't the title line or the
 * "A COMPOSITION EXAMPLE..." boilerplate every block also shares. */
const extractDescription = (source) => {
  const match = source.match(/\/\*\*([\s\S]*?)\*\//);
  if (!match) return '';
  const lines = match[1].split('\n').map((l) => l.replace(/^\s*\*\s?/, '').trim());

  const paragraphs = [];
  let current = [];
  for (const line of lines) {
    if (line === '') {
      if (current.length) paragraphs.push(current.join(' '));
      current = [];
    } else {
      current.push(line);
    }
  }
  if (current.length) paragraphs.push(current.join(' '));

  const candidates = paragraphs.filter(
    (p, i) => i > 0 && !p.startsWith('A COMPOSITION EXAMPLE'),
  );
  const chosen = candidates.find((p) => p.startsWith('Matches Figma')) ?? candidates[0] ?? '';

  // Cap at the first sentence (or ~140 chars if no early sentence break) --
  // a manifest entry is a one-liner, not the whole paragraph.
  const sentenceEnd = chosen.indexOf('. ');
  if (sentenceEnd > 0 && sentenceEnd < 160) return chosen.slice(0, sentenceEnd + 1);
  return chosen.length > 160 ? chosen.slice(0, 157) + '…' : chosen;
};

const rewriteImports = (source, assetsUsed) =>
  source
    .replace(/from '(\.\.\/)+components\/[^']*'/g, "from '@sakaniui/react'")
    .replace(/from '(\.\.\/)+lib\/iconStrokeWidth'/g, "from '@sakaniui/react'")
    .replace(/from '((?:\.\.\/)+assets\/avatars\/[^']+)'/g, (full, path) => {
      const file = basename(path);
      assetsUsed.push(file);
      return `from './assets/${file}'`;
    });

const blockFolders = readdirSync(BLOCKS_DIR).filter((name) =>
  statSync(join(BLOCKS_DIR, name)).isDirectory(),
);

const manifest = [];

for (const folder of blockFolders) {
  const folderPath = join(BLOCKS_DIR, folder);
  const tsxPath = join(folderPath, `${folder}.tsx`);
  const cssPath = join(folderPath, `${folder}.module.css`);
  if (!existsSync(tsxPath)) {
    console.warn(`skip ${folder}: no ${folder}.tsx found`);
    continue;
  }

  const kebabName = toKebabCase(folder);
  const outDir = join(TEMPLATES_DIR, kebabName);
  mkdirSync(outDir, { recursive: true });

  const rawTsx = readFileSync(tsxPath, 'utf8');
  const description = extractDescription(rawTsx);
  const assetsUsed = [];
  const rewrittenTsx = rewriteImports(rawTsx, assetsUsed);
  writeFileSync(join(outDir, `${folder}.tsx`), rewrittenTsx);

  const files = [`${folder}.tsx`];

  if (existsSync(cssPath)) {
    writeFileSync(join(outDir, `${folder}.module.css`), readFileSync(cssPath, 'utf8'));
    files.push(`${folder}.module.css`);
  }

  if (assetsUsed.length > 0) {
    const assetsOutDir = join(outDir, 'assets');
    mkdirSync(assetsOutDir, { recursive: true });
    const assetsSrcDir = join(BLOCKS_DIR, '..', 'assets', 'avatars');
    for (const file of [...new Set(assetsUsed)]) {
      writeFileSync(join(assetsOutDir, file), readFileSync(join(assetsSrcDir, file)));
      files.push(`assets/${file}`);
    }
  }

  manifest.push({ name: kebabName, componentName: folder, description, files });
  console.log(`+ ${kebabName} (${files.length} file${files.length === 1 ? '' : 's'})`);
}

manifest.sort((a, b) => a.name.localeCompare(b.name));
writeFileSync(join(TEMPLATES_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`\nWrote manifest.json with ${manifest.length} blocks.`);
