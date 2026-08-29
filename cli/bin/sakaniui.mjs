#!/usr/bin/env node
/**
 * @sakaniui/cli -- grabs a Sakani Block's source files and drops them into
 * your own project, the same way you'd copy them by hand from GitHub.
 *
 * This is NOT how you install components (Button, Input, Sidebar, ...) --
 * those come from `npm install @sakaniui/react` and stay a real managed
 * dependency, so token updates and re-theming keep working everywhere.
 * Blocks are different on purpose: they're starting points meant to be
 * copied and edited, so this CLI just automates that copy instead of you
 * doing it by hand from GitHub.
 *
 * Templates are bundled inside this package (cli/templates/, built by
 * scripts/generate-templates.mjs from ../src/blocks) -- no network call,
 * no GitHub rate limits, works offline once installed.
 *
 * Usage:
 *   npx @sakaniui/cli list
 *   npx @sakaniui/cli add <block-name> [--dir <path>]
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, cpSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = join(__dirname, '..', 'templates');
const manifest = JSON.parse(readFileSync(join(TEMPLATES_DIR, 'manifest.json'), 'utf8'));

const args = process.argv.slice(2);
const command = args[0];

const printUsage = () => {
  console.log(`
@sakaniui/cli -- copy Sakani Block source into your project

Usage:
  npx @sakaniui/cli list                    List every available block
  npx @sakaniui/cli add <block-name>        Copy a block into ./src/blocks/<Name>
  npx @sakaniui/cli add <block-name> --dir <path>   Copy into a custom folder

Requires @sakaniui/react to already be installed in your project --
blocks import their pieces (Button, Input, ...) from it.
`);
};

const printList = () => {
  console.log('\nAvailable blocks:\n');
  const nameWidth = Math.max(...manifest.map((b) => b.name.length));
  for (const block of manifest) {
    console.log(`  ${block.name.padEnd(nameWidth)}  ${block.description}`);
  }
  console.log(`\nRun "npx @sakaniui/cli add <block-name>" to copy one into your project.\n`);
};

const checkReactPackageInstalled = (cwd) => {
  const pkgPath = join(cwd, 'package.json');
  if (!existsSync(pkgPath)) return null;
  try {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
    const allDeps = { ...pkg.dependencies, ...pkg.devDependencies, ...pkg.peerDependencies };
    return '@sakaniui/react' in allDeps;
  } catch {
    return null;
  }
};

const addBlock = (name, targetDirFlag) => {
  const block = manifest.find((b) => b.name === name);
  if (!block) {
    console.error(`\n✖ No block named "${name}".\n`);
    printList();
    process.exitCode = 1;
    return;
  }

  const cwd = process.cwd();
  const destDir = targetDirFlag
    ? join(cwd, targetDirFlag)
    : join(cwd, 'src', 'blocks', block.componentName);

  if (existsSync(destDir)) {
    console.error(`\n✖ ${destDir} already exists -- remove it or pass --dir <path> to choose a different folder.\n`);
    process.exitCode = 1;
    return;
  }

  mkdirSync(destDir, { recursive: true });
  cpSync(join(TEMPLATES_DIR, block.name), destDir, { recursive: true });

  const hasReactPkg = checkReactPackageInstalled(cwd);

  console.log(`\n✔ Added ${block.componentName} -> ${destDir}\n`);
  console.log('Files:');
  for (const file of block.files) console.log(`  ${destDir}/${file}`);

  if (hasReactPkg === false) {
    console.log(
      `\n⚠ @sakaniui/react isn't in this project's package.json yet -- this block imports its\n` +
      `  pieces (Button, Input, ...) from it, so run:\n\n` +
      `    npm install @sakaniui/react\n`,
    );
  }
  console.log('This file is yours now -- edit it freely.\n');
};

if (command === 'list') {
  printList();
} else if (command === 'add') {
  const name = args[1];
  const dirFlagIndex = args.indexOf('--dir');
  const dirFlag = dirFlagIndex !== -1 ? args[dirFlagIndex + 1] : undefined;
  if (!name) {
    console.error('\n✖ Usage: npx @sakaniui/cli add <block-name>\n');
    printList();
    process.exitCode = 1;
  } else {
    addBlock(name, dirFlag);
  }
} else {
  printUsage();
}
