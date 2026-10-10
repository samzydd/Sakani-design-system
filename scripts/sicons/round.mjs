/**
 * Softens the sharp corners of an icon the way Figma's corner radius does.
 *
 * Only corners where two straight segments meet are rounded (curves already
 * are, and open line ends stay round-capped). A corner's radius is limited so
 * its tangent points sit no further than half of the shorter adjoining edge,
 * which keeps short details from collapsing. The Figma Sicons set follows the
 * same rule: radius 4, or 1 for the whole icon when its tightest corner would
 * use more than 30% of an edge (chevrons, checks, small arrows), where 4 would
 * blunt the point.
 *
 * Input and output are absolute path data in the form scripts/glass-icons
 * emits (M, L, C, Q, A, Z with no relative commands).
 */
export const RADIUS = 4;
export const RADIUS_TIGHT = 1;
/** Share of the shorter edge above which a corner counts as tight. */
export const TIGHT_RATIO = 0.3;

const f = (n) => String(+n.toFixed(3));
const ARITY = { M: 2, L: 2, C: 6, Q: 4, A: 7, Z: 0 };

/** One subpath: start point, segments [{ c, a: [...numbers], end: [x, y] }], closed flag. */
export function parseSubpaths(d) {
  const out = [];
  const re = /([MLCQAZ])([^MLCQAZ]*)/g;
  let m, cur = null, cx = 0, cy = 0;
  while ((m = re.exec(d))) {
    const c = m[1];
    const nums = (m[2].match(/-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/gi) || []).map(Number);
    if (c === 'M') { cur = { start: [nums[0], nums[1]], segs: [], closed: false }; out.push(cur); cx = nums[0]; cy = nums[1]; continue; }
    if (!cur) return null;
    if (c === 'Z') { cur.closed = true; cx = cur.start[0]; cy = cur.start[1]; continue; }
    if (!(c in ARITY) || nums.length !== ARITY[c]) return null;
    const end = [nums[nums.length - 2], nums[nums.length - 1]];
    cur.segs.push({ c, a: nums, end });
    cx = end[0]; cy = end[1];
  }
  return out;
}

const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);

/** Subpath as a flat vertex ring/line with the segment kinds between vertices. */
function toNodes(sp) {
  const pts = [sp.start], segs = [];
  for (const s of sp.segs) { pts.push(s.end); segs.push(s); }
  let closed = sp.closed;
  // A path that ends where it started is closed even without Z.
  if (!closed && pts.length > 2 && dist(pts[0], pts[pts.length - 1]) < 0.005) closed = true;
  // Z draws a closing line back to the start; make it an explicit segment.
  if (closed && dist(pts[0], pts[pts.length - 1]) >= 0.005) {
    const s0 = [pts[0][0], pts[0][1]];
    const seg = { c: 'L', a: s0, end: s0 };
    pts.push(s0); segs.push(seg);
  }
  return { pts, segs, closed };
}

function emit(start, segs, closed) {
  let d = `M${f(start[0])} ${f(start[1])}`;
  for (const s of segs) {
    if (s.c === 'L') d += `L${f(s.end[0])} ${f(s.end[1])}`;
    else if (s.c === 'A') d += `A${f(s.a[0])} ${f(s.a[1])} ${f(s.a[2])} ${s.a[3]} ${s.a[4]} ${f(s.end[0])} ${f(s.end[1])}`;
    else d += s.c + s.a.map(f).join(' ');
  }
  return d + (closed ? 'Z' : '');
}

/** Corners of one subpath: [{ at: vertex index, theta, lens: [in, out], dirs }]. */
function corners(pts, segs, closed, others = []) {
  const n = segs.length, list = [];
  const straight = (i) => segs[i] && segs[i].c === 'L';
  for (let v = closed ? 0 : 1; v < (closed ? n : n); v++) {
    const inI = (v - 1 + n) % n, outI = v % n;
    // vertex v sits between segment inI (arriving) and outI (leaving)
    if (!closed && v === 0) continue;
    if (!straight(inI) || !straight(outI)) continue;
    const P = pts[v], A = pts[(v - 1 + pts.length) % pts.length], B = pts[v + 1] || pts[0];
    const lin = dist(A, P), lout = dist(P, B);
    if (lin < 1e-6 || lout < 1e-6) continue;
    const u1 = [(P[0] - A[0]) / lin, (P[1] - A[1]) / lin], u2 = [(B[0] - P[0]) / lout, (B[1] - P[1]) / lout];
    const dot = -u1[0] * u2[0] - u1[1] * u2[1];
    const theta = Math.acos(Math.max(-1, Math.min(1, dot)));
    if (theta > Math.PI - 0.05 || theta < 0.1) continue;
    // Where another path starts, ends or turns on the same point (an arrow head on its shaft) the
    // joint belongs to several lines, and rounding one of them would leave the others poking out.
    if (others.some((o) => dist(o, P) < 0.05)) continue;
    list.push({ at: v, theta, lin, lout, u1, u2, P });
  }
  return list;
}

/** True when any corner of the icon can't take the full radius within half its shorter edge. */
/**
 * The icon's tightest corner: the tangent length a radius of r needs, as a share of the shorter
 * edge meeting at that corner (0.5 means the rounding reaches the middle of the edge).
 */
export function worstRatio(paths, r = RADIUS) {
  const sets = paths.map((d) => vertexSet(d));
  let worst = 0;
  for (let i = 0; i < paths.length; i++) {
    const sps = parseSubpaths(paths[i]);
    if (!sps) continue;
    const others = sets.flatMap((v, j) => (j === i ? [] : v));
    for (const sp of sps) {
      const { pts, segs, closed } = toNodes(sp);
      if (!segs.length) continue;
      const fixed = closed && dist(pts[0], pts[pts.length - 1]) < 0.005 ? pts.slice(0, -1) : pts;
      for (const c of corners(fixed, segs, closed, others)) {
        worst = Math.max(worst, r / Math.tan(c.theta / 2) / Math.min(c.lin, c.lout));
      }
    }
  }
  return worst;
}

export function tooTight(paths, r = RADIUS) {
  const sets = paths.map((d) => vertexSet(d));
  for (let i = 0; i < paths.length; i++) {
    const sps = parseSubpaths(paths[i]);
    if (!sps) continue;
    const others = sets.flatMap((v, j) => (j === i ? [] : v));
    for (const sp of sps) {
      const { pts, segs, closed } = toNodes(sp);
      if (!segs.length) continue;
      const fixed = closed && dist(pts[0], pts[pts.length - 1]) < 0.005 ? pts.slice(0, -1) : pts;
      for (const c of corners(fixed, segs, closed, others)) {
        if (r / Math.tan(c.theta / 2) > Math.min(c.lin, c.lout) / 2) return true;
      }
    }
  }
  return false;
}

/** Every vertex of one path's data. */
function vertexSet(d) {
  const sps = parseSubpaths(d);
  return sps ? sps.flatMap((sp) => [sp.start, ...sp.segs.map((g) => g.end)]) : [];
}

function roundSubpath(sp, r, others) {
  const { pts: raw, segs, closed } = toNodes(sp);
  if (!segs.length) return emit(sp.start, segs, sp.closed);
  // Drop the duplicate end point of a path that closes on itself.
  const sameEnd = dist(raw[0], raw[raw.length - 1]) < 0.005;
  const pts = closed && sameEnd ? raw.slice(0, -1) : raw;
  const list = corners(pts, segs, closed, others).map((c) => {
    const t = Math.min(r / Math.tan(c.theta / 2), Math.min(c.lin, c.lout) / 2);
    const rr = t * Math.tan(c.theta / 2);
    const cross = c.u1[0] * c.u2[1] - c.u1[1] * c.u2[0];
    return { ...c, t, rr, sweep: cross > 0 ? 1 : 0 };
  });
  if (!list.length) return emit(sp.start, segs, sp.closed);
  const at = new Map(list.map((c) => [c.at, c]));
  // Walk the vertices; each rounded corner trims its two edges and adds an arc.
  const n = segs.length;
  let d = '';
  const startPt = (i) => {
    const c = at.get(i);
    return c ? [c.P[0] + c.u2[0] * c.t, c.P[1] + c.u2[1] * c.t] : pts[i];
  };
  // Start where the first segment leaves vertex 0.
  const s0 = startPt(0);
  d += `M${f(s0[0])} ${f(s0[1])}`;
  for (let i = 0; i < n; i++) {
    const seg = segs[i];
    const nextV = (i + 1) % pts.length;
    const isLast = i === n - 1;
    if (isLast && closed && nextV === 0) {
      const c0 = at.get(0);
      if (seg.c === 'L') {
        if (c0) {
          const e = [c0.P[0] - c0.u1[0] * c0.t, c0.P[1] - c0.u1[1] * c0.t];
          d += `L${f(e[0])} ${f(e[1])}A${f(c0.rr)} ${f(c0.rr)} 0 0 ${c0.sweep} ${f(s0[0])} ${f(s0[1])}`;
        }
        else d += `L${f(pts[0][0])} ${f(pts[0][1])}`;
      } else {
        d += emit([0, 0], [seg], false).slice(emit([0, 0], [], false).length);
      }
      continue;
    }
    const c = at.get(nextV);
    if (seg.c === 'L') {
      if (c) {
        const e = [c.P[0] - c.u1[0] * c.t, c.P[1] - c.u1[1] * c.t];
        const nx = [c.P[0] + c.u2[0] * c.t, c.P[1] + c.u2[1] * c.t];
        d += `L${f(e[0])} ${f(e[1])}A${f(c.rr)} ${f(c.rr)} 0 0 ${c.sweep} ${f(nx[0])} ${f(nx[1])}`;
      } else d += `L${f(seg.end[0])} ${f(seg.end[1])}`;
    } else {
      d += emit([0, 0], [seg], false).slice(emit([0, 0], [], false).length);
    }
  }
  return d + (closed ? 'Z' : '');
}

/** Rounds every sharp corner of one path's data. Anything the parser doesn't understand is returned unchanged. */
export function roundPath(d, r = RADIUS, others = []) {
  const sps = parseSubpaths(d);
  if (!sps) return d;
  return sps.map((sp) => roundSubpath(sp, r, others)).join('');
}

/** Rounds a whole icon, picking the radius by the tight-corner rule. */
export function roundIcon(paths) {
  const r = worstRatio(paths) > TIGHT_RATIO ? RADIUS_TIGHT : RADIUS;
  const sets = paths.map((d) => vertexSet(d));
  return {
    paths: paths.map((d, i) => roundPath(d, r, sets.flatMap((v, j) => (j === i ? [] : v)))),
    radius: r,
  };
}
