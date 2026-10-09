/**
 * Decides whether a Lucide icon element is a closed shape (safe to fill).
 *
 * circle/ellipse/rect/polygon are closed; line/polyline are open. A <path> is
 * closed only if every one of its subpaths is closed, either explicitly (Z) or
 * by ending where it started -- Lucide often draws closed outlines that way
 * (the heart ends on its start point with no Z). Filling an open path would
 * paint a chord across it, which is the artefact this exists to avoid.
 *
 * The parser is command-aware because arc flags are often packed
 * ("a2 2 0 001.68-.92" = flags 0,0 then x=1.68): a plain number tokenizer
 * reads "001.68" as one number and loses track of every point after it.
 */
const ARITY = { m: 2, l: 2, h: 1, v: 1, c: 6, s: 4, q: 4, t: 2, a: 7, z: 0 };
const NUM = /^\s*,?\s*(-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?)/i;
const FLAG = /^\s*,?\s*([01])/;

export function subpaths(d) {
  let s = d;
  const num = () => { const m = NUM.exec(s); if (!m) throw new Error('num'); s = s.slice(m[0].length); return parseFloat(m[1]); };
  const flag = () => { const m = FLAG.exec(s); if (!m) throw new Error('flag'); s = s.slice(m[0].length); return +m[1]; };
  let cx = 0, cy = 0, sx = 0, sy = 0, cmd = null, cur = null;
  const subs = [];
  const end = (z) => { if (cur) { cur.closed = z || Math.hypot(cx - sx, cy - sy) < 0.005; subs.push(cur); cur = null; } };
  try {
    while (s.trim().length) {
      const m = /^\s*,?\s*([a-zA-Z])/.exec(s);
      if (m) { cmd = m[1]; s = s.slice(m[0].length); }
      else if (!cmd) throw new Error('no command');
      const lc = cmd.toLowerCase(), rel = cmd === lc;
      if (lc === 'z') { cx = sx; cy = sy; end(true); continue; }
      if (!(lc in ARITY)) throw new Error('cmd ' + cmd);
      let a;
      if (lc === 'a') a = [num(), num(), num(), flag(), flag(), num(), num()];
      else { a = []; for (let k = 0; k < ARITY[lc]; k++) a.push(num()); }
      if (lc === 'm') {
        end(false);
        cx = rel ? cx + a[0] : a[0]; cy = rel ? cy + a[1] : a[1];
        sx = cx; sy = cy; cur = { closed: false };
        cmd = rel ? 'l' : 'L';
        continue;
      }
      if (!cur) cur = { closed: false };
      if (lc === 'h') cx = rel ? cx + a[0] : a[0];
      else if (lc === 'v') cy = rel ? cy + a[0] : a[0];
      else { const k = a.length - 2; cx = rel ? cx + a[k] : a[k]; cy = rel ? cy + a[k + 1] : a[k + 1]; }
    }
  } catch { return null; }
  end(false);
  return subs;
}

export function isClosed([tag, attrs]) {
  if (tag === 'circle' || tag === 'ellipse' || tag === 'rect' || tag === 'polygon') return true;
  if (tag === 'line' || tag === 'polyline') return false;
  if (tag === 'path') { const s = subpaths(attrs.d); return !!s && s.length > 0 && s.every((p) => p.closed); }
  return false;
}

/**
 * Splits a path into one path per subpath, each tagged closed/open, so a path
 * that mixes a closed outline with an open stroke (Figma merges them, e.g. the
 * GitHub mark's head and tail) can still have its closed part filled.
 * Each piece is re-serialised with explicit commands and an absolute start, so
 * it stands on its own.
 */
function parseCommands(d) {
  let s = d;
  const num = () => { const m = NUM.exec(s); if (!m) throw new Error('num'); s = s.slice(m[0].length); return parseFloat(m[1]); };
  const flag = () => { const m = FLAG.exec(s); if (!m) throw new Error('flag'); s = s.slice(m[0].length); return +m[1]; };
  const out = [];
  let cmd = null;
  while (s.trim().length) {
    const m = /^\s*,?\s*([a-zA-Z])/.exec(s);
    let explicit = false;
    if (m) { cmd = m[1]; s = s.slice(m[0].length); explicit = true; }
    else if (!cmd) throw new Error('no command');
    const lc = cmd.toLowerCase();
    if (!(lc in ARITY)) throw new Error('cmd ' + cmd);
    if (lc === 'z') { out.push({ c: cmd, a: [], explicit }); continue; }
    const a = lc === 'a' ? [num(), num(), num(), flag(), flag(), num(), num()] : Array.from({ length: ARITY[lc] }, num);
    out.push({ c: cmd, a, explicit });
    if (lc === 'm') cmd = cmd === 'm' ? 'l' : 'L'; // implicit pairs after a moveto are linetos
  }
  return out;
}

export function splitPath(d) {
  let cmds;
  try { cmds = parseCommands(d); } catch { return [{ d, closed: false }]; }
  const fmt = (n) => String(+n.toFixed(4));
  const pieces = [];
  let cx = 0, cy = 0, sx = 0, sy = 0, cur = null;
  const finish = () => {
    if (!cur) return;
    if (!cur.closed) cur.closed = Math.hypot(cx - sx, cy - sy) < 0.005;
    pieces.push({ d: cur.parts.join(''), closed: cur.closed });
    cur = null;
  };
  for (const { c, a } of cmds) {
    const lc = c.toLowerCase(), rel = c === lc;
    if (lc === 'm') {
      finish();
      cx = rel ? cx + a[0] : a[0]; cy = rel ? cy + a[1] : a[1];
      sx = cx; sy = cy;
      cur = { parts: [`M${fmt(cx)} ${fmt(cy)}`], closed: false };
      continue;
    }
    if (!cur) cur = { parts: [`M${fmt(cx)} ${fmt(cy)}`], closed: false };
    if (lc === 'z') { cur.parts.push(c); cur.closed = true; cx = sx; cy = sy; continue; }
    cur.parts.push(c + a.map(fmt).join(' '));
    if (lc === 'h') cx = rel ? cx + a[0] : a[0];
    else if (lc === 'v') cy = rel ? cy + a[0] : a[0];
    else { const k = a.length - 2; cx = rel ? cx + a[k] : a[k]; cy = rel ? cy + a[k + 1] : a[k + 1]; }
  }
  finish();
  return pieces;
}
