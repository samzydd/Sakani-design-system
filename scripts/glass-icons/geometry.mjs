/**
 * Geometry for the glass-icon generator: turns Lucide elements into path data
 * and flattens paths into polylines, so the decomposer can measure them
 * (length, enclosed area, bounding box) without a browser.
 */
const ARITY = { m: 2, l: 2, h: 1, v: 1, c: 6, s: 4, q: 4, t: 2, a: 7, z: 0 };
const NUM = /^\s*,?\s*(-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?)/i;
const FLAG = /^\s*,?\s*([01])/;
const fmt = (n) => String(+n.toFixed(3));

/** Any Lucide element as path data. */
export function toPathD(tag, a) {
  const n = (k, d = 0) => (a[k] === undefined ? d : +a[k]);
  switch (tag) {
    case 'path': return a.d;
    case 'circle': {
      const cx = n('cx'), cy = n('cy'), r = n('r');
      return `M${fmt(cx - r)} ${fmt(cy)}a${fmt(r)} ${fmt(r)} 0 1 0 ${fmt(2 * r)} 0a${fmt(r)} ${fmt(r)} 0 1 0 ${fmt(-2 * r)} 0Z`;
    }
    case 'ellipse': {
      const cx = n('cx'), cy = n('cy'), rx = n('rx'), ry = n('ry');
      return `M${fmt(cx - rx)} ${fmt(cy)}a${fmt(rx)} ${fmt(ry)} 0 1 0 ${fmt(2 * rx)} 0a${fmt(rx)} ${fmt(ry)} 0 1 0 ${fmt(-2 * rx)} 0Z`;
    }
    case 'rect': {
      const x = n('x'), y = n('y'), w = n('width'), h = n('height');
      let rx = a.rx !== undefined ? +a.rx : a.ry !== undefined ? +a.ry : 0;
      let ry = a.ry !== undefined ? +a.ry : rx;
      rx = Math.min(rx, w / 2); ry = Math.min(ry, h / 2);
      if (!rx && !ry) return `M${fmt(x)} ${fmt(y)}h${fmt(w)}v${fmt(h)}h${fmt(-w)}Z`;
      return `M${fmt(x + rx)} ${fmt(y)}h${fmt(w - 2 * rx)}a${fmt(rx)} ${fmt(ry)} 0 0 1 ${fmt(rx)} ${fmt(ry)}` +
        `v${fmt(h - 2 * ry)}a${fmt(rx)} ${fmt(ry)} 0 0 1 ${fmt(-rx)} ${fmt(ry)}h${fmt(-(w - 2 * rx))}` +
        `a${fmt(rx)} ${fmt(ry)} 0 0 1 ${fmt(-rx)} ${fmt(-ry)}v${fmt(-(h - 2 * ry))}a${fmt(rx)} ${fmt(ry)} 0 0 1 ${fmt(rx)} ${fmt(-ry)}Z`;
    }
    case 'line': return `M${fmt(n('x1'))} ${fmt(n('y1'))}L${fmt(n('x2'))} ${fmt(n('y2'))}`;
    case 'polyline':
    case 'polygon': {
      const p = String(a.points).trim().split(/[\s,]+/).map(Number);
      let d = `M${fmt(p[0])} ${fmt(p[1])}`;
      for (let i = 2; i + 1 < p.length; i += 2) d += `L${fmt(p[i])} ${fmt(p[i + 1])}`;
      return tag === 'polygon' ? d + 'Z' : d;
    }
    default: return null;
  }
}

function arcPoints(x1, y1, rx, ry, phiDeg, fa, fs, x2, y2) {
  if (!rx || !ry) return [[x2, y2]];
  const phi = (phiDeg * Math.PI) / 180, cos = Math.cos(phi), sin = Math.sin(phi);
  const dx = (x1 - x2) / 2, dy = (y1 - y2) / 2;
  const xp = cos * dx + sin * dy, yp = -sin * dx + cos * dy;
  rx = Math.abs(rx); ry = Math.abs(ry);
  const lam = (xp * xp) / (rx * rx) + (yp * yp) / (ry * ry);
  if (lam > 1) { rx *= Math.sqrt(lam); ry *= Math.sqrt(lam); }
  const num = rx * rx * ry * ry - rx * rx * yp * yp - ry * ry * xp * xp;
  const den = rx * rx * yp * yp + ry * ry * xp * xp;
  let co = Math.sqrt(Math.max(0, num / den)); if (fa === fs) co = -co;
  const cxp = (co * rx * yp) / ry, cyp = (-co * ry * xp) / rx;
  const cx = cos * cxp - sin * cyp + (x1 + x2) / 2, cy = sin * cxp + cos * cyp + (y1 + y2) / 2;
  const ang = (ux, uy, vx, vy) => Math.atan2(ux * vy - uy * vx, ux * vx + uy * vy);
  const t1 = ang(1, 0, (xp - cxp) / rx, (yp - cyp) / ry);
  let dt = ang((xp - cxp) / rx, (yp - cyp) / ry, (-xp - cxp) / rx, (-yp - cyp) / ry);
  if (!fs && dt > 0) dt -= 2 * Math.PI; else if (fs && dt < 0) dt += 2 * Math.PI;
  const steps = Math.max(4, Math.ceil(Math.abs(dt) / (Math.PI / 16)));
  const pts = [];
  for (let i = 1; i <= steps; i++) {
    const t = t1 + (dt * i) / steps;
    pts.push([cx + rx * Math.cos(t) * cos - ry * Math.sin(t) * sin, cy + rx * Math.cos(t) * sin + ry * Math.sin(t) * cos]);
  }
  return pts;
}

/**
 * Flattens path data into subpaths: [{ points, closed (explicit Z or ends on
 * its start), d (the subpath on its own, absolute start) }].
 */
export function flatten(d) {
  let s = d;
  const num = () => { const m = NUM.exec(s); if (!m) throw new Error('num'); s = s.slice(m[0].length); return parseFloat(m[1]); };
  const flag = () => { const m = FLAG.exec(s); if (!m) throw new Error('flag'); s = s.slice(m[0].length); return +m[1]; };
  const subs = [];
  let cx = 0, cy = 0, sx = 0, sy = 0, cmd = null, cur = null, lcx = null, lcy = null, lq = null;
  const finish = () => {
    if (!cur) return;
    if (!cur.closed) cur.closed = Math.hypot(cx - sx, cy - sy) < 0.005;
    cur.d = cur.parts.join('');
    delete cur.parts;
    subs.push(cur); cur = null;
  };
  const start = () => { cur = { points: [[cx, cy]], parts: [`M${fmt(cx)} ${fmt(cy)}`], closed: false }; };
  const cubic = (x1, y1, x2, y2, x, y) => {
    const x0 = cx, y0 = cy;
    for (let i = 1; i <= 12; i++) {
      const t = i / 12, u = 1 - t;
      cur.points.push([u * u * u * x0 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x,
        u * u * u * y0 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y]);
    }
  };
  const quad = (x1, y1, x, y) => {
    const x0 = cx, y0 = cy;
    for (let i = 1; i <= 10; i++) {
      const t = i / 10, u = 1 - t;
      cur.points.push([u * u * x0 + 2 * u * t * x1 + t * t * x, u * u * y0 + 2 * u * t * y1 + t * t * y]);
    }
  };
  while (s.trim().length) {
    const m = /^\s*,?\s*([a-zA-Z])/.exec(s);
    if (m) { cmd = m[1]; s = s.slice(m[0].length); }
    else if (!cmd) throw new Error('no command');
    const lc = cmd.toLowerCase(), rel = cmd === lc;
    if (lc === 'z') { if (cur) { cur.parts.push('Z'); cur.closed = true; } cx = sx; cy = sy; finish(); lcx = lq = null; continue; }
    if (!(lc in ARITY)) throw new Error('cmd ' + cmd);
    const a = lc === 'a' ? [num(), num(), num(), flag(), flag(), num(), num()] : Array.from({ length: ARITY[lc] }, num);
    const X = (v) => (rel ? cx + v : v), Y = (v) => (rel ? cy + v : v);
    if (lc === 'm') {
      finish(); cx = X(a[0]); cy = Y(a[1]); sx = cx; sy = cy; start();
      cmd = rel ? 'l' : 'L'; lcx = lq = null; continue;
    }
    if (!cur) start();
    let nx = cx, ny = cy, part;
    if (lc === 'l') { nx = X(a[0]); ny = Y(a[1]); cur.points.push([nx, ny]); part = `L${fmt(nx)} ${fmt(ny)}`; lcx = lq = null; }
    else if (lc === 'h') { nx = X(a[0]); cur.points.push([nx, ny]); part = `L${fmt(nx)} ${fmt(ny)}`; lcx = lq = null; }
    else if (lc === 'v') { ny = Y(a[0]); cur.points.push([nx, ny]); part = `L${fmt(nx)} ${fmt(ny)}`; lcx = lq = null; }
    else if (lc === 'c' || lc === 's') {
      let x1, y1, x2, y2;
      if (lc === 'c') { x1 = X(a[0]); y1 = Y(a[1]); x2 = X(a[2]); y2 = Y(a[3]); nx = X(a[4]); ny = Y(a[5]); }
      else { x1 = lcx ? 2 * cx - lcx[0] : cx; y1 = lcx ? 2 * cy - lcx[1] : cy; x2 = X(a[0]); y2 = Y(a[1]); nx = X(a[2]); ny = Y(a[3]); }
      cubic(x1, y1, x2, y2, nx, ny);
      part = `C${[x1, y1, x2, y2, nx, ny].map(fmt).join(' ')}`; lcx = [x2, y2]; lq = null;
    } else if (lc === 'q' || lc === 't') {
      let x1, y1;
      if (lc === 'q') { x1 = X(a[0]); y1 = Y(a[1]); nx = X(a[2]); ny = Y(a[3]); }
      else { x1 = lq ? 2 * cx - lq[0] : cx; y1 = lq ? 2 * cy - lq[1] : cy; nx = X(a[0]); ny = Y(a[1]); }
      quad(x1, y1, nx, ny);
      part = `Q${[x1, y1, nx, ny].map(fmt).join(' ')}`; lq = [x1, y1]; lcx = null;
    } else if (lc === 'a') {
      nx = X(a[5]); ny = Y(a[6]);
      cur.points.push(...arcPoints(cx, cy, a[0], a[1], a[2], a[3], a[4], nx, ny));
      part = `A${[a[0], a[1], a[2]].map(fmt).join(' ')} ${a[3]} ${a[4]} ${fmt(nx)} ${fmt(ny)}`; lcx = lq = null;
    }
    cur.parts.push(part);
    cx = nx; cy = ny;
  }
  finish();
  return subs;
}

export function measure(points) {
  let len = 0, area = 0, minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (let i = 0; i < points.length; i++) {
    const [x, y] = points[i];
    if (i) len += Math.hypot(x - points[i - 1][0], y - points[i - 1][1]);
    const [nx, ny] = points[(i + 1) % points.length];
    area += x * ny - nx * y;
    minX = Math.min(minX, x); minY = Math.min(minY, y); maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
  }
  const [fx, fy] = points[0], [lx, ly] = points[points.length - 1];
  return { len, area: Math.abs(area) / 2, chord: Math.hypot(lx - fx, ly - fy), box: [minX, minY, maxX, maxY] };
}
