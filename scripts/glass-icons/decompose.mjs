/**
 * Splits a Lucide icon into the three parts of a glass icon:
 *
 *   body   -- the main shape(s), drawn as a frosted glass solid. These are the
 *             icon's big closed shapes, plus open outlines that are nearly
 *             closed (a trash can's body, a bulb), which read as solids.
 *   detail -- everything else (inner lines, small shapes, a bulb's base),
 *             drawn as crisp lines: white where they sit on the glass,
 *             solid where they sit off it.
 *   accent -- a solid disc behind the body's top-right corner, seen blurred
 *             through the glass. It is what makes the glass read as glass.
 *
 * Icons with no closed shape at all (arrows, a checkmark) become a chunky
 * glass stroke with no detail.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { toPathD, flatten, measure } from './geometry.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const lucideDir = path.join(root, 'node_modules/lucide-react/dist/esm/icons');
const extra = JSON.parse(fs.readFileSync(path.join(here, 'figma-extra.json'), 'utf8')).icons;
export const lucideVersion = JSON.parse(fs.readFileSync(path.join(root, 'node_modules/lucide-react/package.json'), 'utf8')).version;

/** Stroke widths in the icon's 24-unit space. */
export const BODY_SW = 2.5;
export const DETAIL_SW = 2;

/** The icon's elements, from lucide-react or (brand logos Lucide dropped) the Figma set. */
export async function loadIcon(name) {
  if (extra[name]) return { node: extra[name].map((d) => ['path', { d }]), source: `Sakani Figma icon set, icon "${name}"`, figma: true };
  const file = path.join(lucideDir, `${name}.mjs`);
  if (!fs.existsSync(file)) return null;
  // Renamed icons survive as alias modules that only re-export the new one.
  let target = file, via = null;
  for (let hop = 0; hop < 4; hop++) {
    const alias = /export \{ default \} from '\.\/([\w-]+)\.mjs'/.exec(fs.readFileSync(target, 'utf8'));
    if (!alias) break;
    via = alias[1];
    target = path.join(lucideDir, `${alias[1]}.mjs`);
  }
  const mod = await import(target);
  if (!mod.__iconNode) return null;
  return {
    node: mod.__iconNode,
    source: `lucide-react ${lucideVersion} (ISC), icon "${via ?? name}"${via ? ` (alias of "${name}")` : ''}`,
    via,
  };
}

const contains = (o, i, m = 0.5) => i[0] >= o[0] - m && i[1] >= o[1] - m && i[2] <= o[2] + m && i[3] <= o[3] + m;
const r3 = (n) => +n.toFixed(3);

export function decompose(node) {
  const subs = [];
  for (const [tag, attrs] of node) {
    const forcedFill = attrs.fill && attrs.fill !== 'none';
    const d = toPathD(tag, attrs);
    if (!d) continue;
    for (const s of flatten(d)) {
      const m = measure(s.points);
      // An open outline whose gap is small next to its length (a U, a bowl) reads as a solid.
      const nearlyClosed = !s.closed && m.len > 0 && m.chord / m.len < 0.67 && m.area >= 8 && m.area / (m.len * m.len) >= 0.05;
      subs.push({ d: s.d, points: s.points, closed: s.closed, fillable: s.closed || nearlyClosed || forcedFill, ...m });
    }
  }

  const candidates = subs.filter((s) => s.fillable && s.area >= 6).sort((a, b) => b.area - a.area);
  const maxA = candidates[0]?.area ?? 0;
  const body = [];
  for (const c of candidates) {
    if (c.area >= 0.3 * maxA && !body.some((b) => contains(b.box, c.box))) body.push(c);
  }
  const pure = body.length === 0;
  const parts = pure ? subs : body;
  const rest = pure ? [] : subs.filter((s) => !body.includes(s));
  // Lines that run along the glass edge (a trash can's lid, a calendar's rings) become part of
  // the glass; lines across it are drawn white on top; lines away from it stay solid.
  const edge = [], detail = [];
  for (const s of rest) {
    const where = placement(s.points, body);
    if (where === 'edge') edge.push(s); else detail.push([s.d, where === 'on' ? 1 : 0]);
  }

  const h = BODY_SW / 2;
  const box = [...parts, ...edge].reduce((b, s) => [Math.min(b[0], s.box[0] - h), Math.min(b[1], s.box[1] - h), Math.max(b[2], s.box[2] + h), Math.max(b[3], s.box[3] + h)],
    [Infinity, Infinity, -Infinity, -Infinity]);
  const r = Math.min(4.75, Math.max(3, 0.26 * Math.max(box[2] - box[0], box[3] - box[1])));
  return {
    // [d, filled]. Nearly-closed outlines get an explicit Z so every renderer closes them the same way.
    body: [
      ...parts.map((s) => [!pure && !s.closed ? s.d + 'Z' : s.d, pure ? 0 : 1]),
      ...edge.map((s) => [s.d, 0]),
    ],
    // [d, onGlass]: each line is drawn whole, never split at the glass edge.
    detail,
    accent: [r3(box[2] - 0.6 * r), r3(box[1] + 0.6 * r), r3(r)],
    pure,
  };
}

/** Points every ~0.4 units along a polyline, so a straight line counts by length, not by its two ends. */
function resample(points) {
  const out = [points[0]];
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1], [x1, y1] = points[i];
    const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0) / 0.4));
    for (let k = 1; k <= n; k++) out.push([x0 + ((x1 - x0) * k) / n, y0 + ((y1 - y0) * k) / n]);
  }
  return out;
}

function insidePoly([x, y], poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function distToPoly([x, y], poly) {
  let best = Infinity;
  for (let i = 0; i < poly.length; i++) {
    const [x0, y0] = poly[i], [x1, y1] = poly[(i + 1) % poly.length];
    const dx = x1 - x0, dy = y1 - y0, l2 = dx * dx + dy * dy;
    const t = l2 ? Math.max(0, Math.min(1, ((x - x0) * dx + (y - y0) * dy) / l2)) : 0;
    best = Math.min(best, Math.hypot(x - x0 - t * dx, y - y0 - t * dy));
  }
  return best;
}

/**
 * Where a line sits relative to the glass: 'edge' when most of it runs along the outline,
 * 'on' when most of it is on the glass, 'off' otherwise.
 */
function placement(points, body) {
  const pts = resample(points);
  const reach = BODY_SW / 2 + 0.25;
  let edge = 0, deep = 0;
  for (const p of pts) {
    const d = Math.min(...body.map((b) => distToPoly(p, b.points)));
    if (d <= reach) edge++;
    else if (body.some((b) => insidePoly(p, b.points))) deep++;
  }
  if (edge / pts.length >= 0.7) return 'edge';
  return (edge + deep) / pts.length >= 0.6 ? 'on' : 'off';
}

// CLI: node decompose.mjs name1 name2 ... -> JSON on stdout
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const out = {};
  for (const n of process.argv.slice(2)) { const ic = await loadIcon(n); out[n] = ic ? decompose(ic.node) : null; }
  console.log(JSON.stringify(out));
}
