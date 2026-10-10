/**
 * Glass icon geometry from a Tabler icon's strokes.
 *
 * The glass is the icon's exact silhouette: its own strokes, plus every area
 * those strokes fully enclose. Nothing is closed or invented, so the outer edge
 * is always the source icon's line. Lines inside the silhouette are drawn on the
 * glass in white at render time (strokes masked by the silhouette shrunk by one
 * line width), so every line of the source stays visible.
 *
 * Only the enclosed areas ("fills") are computed here, with Clipper: union the
 * stroked lines, take the holes of the union. Their edges sit under the ink, so
 * they are simplified hard and stay small.
 */
import ClipperLib from 'clipper-lib';
import { toPathD, flatten } from './geometry.mjs';

export const STROKE = 2;      // glass line width, the Tabler source width
const SCALE = 1000;

const toPath = (pts) => pts.map(([x, y]) => ({ X: Math.round(x * SCALE), Y: Math.round(y * SCALE) }));
const fmt = (n) => String(+n.toFixed(2));

/** Douglas-Peucker on a closed ring. */
function simplify(ring, tol) {
  if (ring.length < 4) return ring;
  const dp = (pts) => {
    if (pts.length < 3) return pts;
    const [a, b] = [pts[0], pts[pts.length - 1]];
    const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1e-9;
    let idx = 0, best = 0;
    for (let i = 1; i < pts.length - 1; i++) {
      const d = Math.abs(dy * pts[i][0] - dx * pts[i][1] + b[0] * a[1] - b[1] * a[0]) / l;
      if (d > best) { best = d; idx = i; }
    }
    if (best <= tol) return [a, b];
    return [...dp(pts.slice(0, idx + 1)).slice(0, -1), ...dp(pts.slice(idx))];
  };
  // split at the farthest point from the first so both halves are open polylines
  let far = 0, fd = 0;
  ring.forEach((p, i) => { const d = Math.hypot(p[0] - ring[0][0], p[1] - ring[0][1]); if (d > fd) { fd = d; far = i; } });
  return [...dp(ring.slice(0, far + 1)).slice(0, -1), ...dp([...ring.slice(far), ring[0]]).slice(0, -1)];
}

/** Path data for each element of a Tabler icon node. */
export const strokesOf = (node) => node.map(([tag, attrs]) => toPathD(tag, attrs)).filter(Boolean);

/**
 * @returns {{ strokes: string[], fills: string[], accent: [number, number, number] }}
 */
export function silhouette(node) {
  const strokes = strokesOf(node);
  const co = new ClipperLib.ClipperOffset(2, 0.02 * SCALE);
  for (const d of strokes) {
    for (const s of flatten(d)) {
      co.AddPath(toPath(s.points), ClipperLib.JoinType.jtRound, s.closed ? ClipperLib.EndType.etClosedLine : ClipperLib.EndType.etOpenRound);
    }
  }
  const ink = new ClipperLib.Paths();
  co.Execute(ink, (STROKE / 2) * SCALE);
  const c = new ClipperLib.Clipper();
  c.AddPaths(ink, ClipperLib.PolyType.ptSubject, true);
  const tree = new ClipperLib.PolyTree();
  c.Execute(ClipperLib.ClipType.ctUnion, tree, ClipperLib.PolyFillType.pftNonZero, ClipperLib.PolyFillType.pftNonZero);

  const fills = [], outer = [];
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  const walk = (n) => {
    for (const ch of n.Childs()) {
      const ring = ch.Contour().map((p) => [p.X / SCALE, p.Y / SCALE]);
      if (!ch.IsHole() && n === tree) outer.push(ring);
      if (ch.IsHole()) {
        // grow the hole a little so it overlaps the ink (no hairline seams), then simplify
        const grown = new ClipperLib.Paths();
        const g = new ClipperLib.ClipperOffset(2, 0.05 * SCALE);
        g.AddPath(toPath(ring), ClipperLib.JoinType.jtMiter, ClipperLib.EndType.etClosedPolygon);
        g.Execute(grown, 0.45 * SCALE);
        for (const gp of grown) {
          const pts = simplify(gp.map((p) => [p.X / SCALE, p.Y / SCALE]), 0.3);
          if (pts.length >= 3) fills.push('M' + pts.map(([x, y]) => `${fmt(x)} ${fmt(y)}`).join('L') + 'Z');
        }
      } else {
        for (const [x, y] of ring) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
      }
      walk(ch);
    }
  };
  walk(tree);
  const { disc, cover } = accentFor(outer, [x0, y0, x1, y1]);
  return { strokes, fills, accent: cover >= ACCENT_MIN_COVER ? disc : null, disc, cover };
}

function inside([x, y], q) {
  let r = false;
  for (let i = 0, j = q.length - 1; i < q.length; j = i++) {
    const [xi, yi] = q[i], [xj, yj] = q[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) r = !r;
  }
  return r;
}

/**
 * The accent disc tucks inside the glass's top-right corner, where the glass
 * blurs it into a soft glow. It is kept only when the glass covers most of it;
 * on line icons (arrows, logos) it would just sit on whatever is underneath.
 * Same rule as the Figma "Glass Icons" build.
 */
export const ACCENT_MIN_COVER = 0.6;
function accentFor(outer, [x0, y0, x1, y1]) {
  const r = Math.min(4, Math.max(2.5, 0.22 * Math.max(x1 - x0, y1 - y0)));
  const cx = x1 - r - 0.5, cy = y0 + r + 0.5;
  let tot = 0, cov = 0;
  for (let yy = -r; yy <= r + 1e-9; yy += r / 6) {
    for (let xx = -r; xx <= r + 1e-9; xx += r / 6) {
      if (xx * xx + yy * yy > r * r) continue;
      tot++;
      if (outer.some((q) => inside([cx + xx, cy + yy], q))) cov++;
    }
  }
  const r3 = (n) => +n.toFixed(3);
  const disc = [r3(cx), r3(cy), r3(r)];
  return { disc, cover: tot ? cov / tot : 0 };
}
