/**
 * LiquidGlass — Apple-style glass material (the "Liquid" Surface mode).
 *
 * Layers, bottom to top:
 *   1. Refraction + dispersion. The backdrop is bent through an SVG filter
 *      (backdrop-filter: url(#…)). A displacement map generated for the
 *      element's exact size and corner radius pushes pixels inward near the
 *      edge, so the rim behaves like a lens; the center stays undistorted.
 *      Three displacement passes at slightly different strengths, one per
 *      color channel, give the faint color fringe at the rim.
 *      Chromium only — Safari and Firefox ignore url() in backdrop-filter,
 *      so they get the frosted fallback (--liquid-fallback-blur) instead.
 *   2. Tint — regular (text-safe) or clear (icons/large labels only).
 *   3. Rim light — a gradient edge lit from --liquid-light-angle.
 *   4. Depth — inner shading and an outer shadow.
 *   5. Glare — a soft highlight that follows the pointer (off with
 *      prefers-reduced-motion).
 * With prefers-reduced-transparency it becomes a plain opaque surface.
 *
 * All strengths come from the --liquid-* tokens (tokens.css), read at
 * measure time, so light/dark and future tuning stay in CSS.
 *
 * It marks itself data-surface="liquid", so components inside (Sidebar,
 * buttons, cards…) drop their own fill and sit on this material.
 */

import React from 'react';
import styles from './LiquidGlass.module.css';

export type LiquidGlassVariant = 'regular' | 'clear';
/** How much of the backdrop shows through. 'auto' follows the variant
 *  (regular 66%, clear 28%); 'subtle' is Figma's glass/bg-subtle (5%), the
 *  fill of a full-bleed overlay; 'none' is the lens alone. */
export type LiquidGlassTint = 'auto' | 'regular' | 'clear' | 'subtle' | 'none';

interface Params { w: number; h: number; radius: number; bezel: number; refraction: number; dispersion: number; frost: number; saturate: number; shift: number; profile: number; lx: number; ly: number }

/** Chromium is the only engine that renders SVG filters in backdrop-filter. */
function canRefract(): boolean {
  if (typeof navigator === 'undefined') return false;
  const brands = (navigator as Navigator & { userAgentData?: { brands?: { brand: string }[] } }).userAgentData?.brands;
  return !!brands?.some((b) => /Chromium/i.test(b.brand));
}

const mapCache = new Map<string, string>();

/** Displacement map for a rounded rectangle: R/G = x/y sampling offset, normalised by
 *  `max` px (128 = none). Two terms, both weighted by the rim profile w(t):
 *   - refraction: the backdrop is sampled from `refraction` px further in, along
 *     the edge normal (a classic lens rim);
 *   - shift: the light's component along the edge normal, times `shift` px.
 *     Figma's Glass effect pulls content in from OUTSIDE the panel on the edges
 *     facing the light and from inside on the far ones. A CSS backdrop-filter
 *     only sees inside its own box, so a negative net displacement there just
 *     samples the edge pixel; keep refraction + shift positive on every edge
 *     (refraction >= |shift|) to stay inside. */
function buildMap(w: number, h: number, radius: number, bezel: number, refraction: number, shift: number, profile: number, lx: number, ly: number): string {
  const key = `${w}x${h}:${radius}:${bezel}:${refraction}:${shift}:${profile}:${lx.toFixed(3)}:${ly.toFixed(3)}`;
  const hit = mapCache.get(key);
  if (hit) return hit;
  const max = refraction + Math.abs(shift);
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  const img = ctx.createImageData(w, h);
  const d = img.data;
  const r = Math.min(radius, w / 2, h / 2);
  const cx = w / 2, cy = h / 2;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const px = x + 0.5, py = y + 0.5;
      const qx = Math.abs(px - cx) - (w / 2 - r);
      const qy = Math.abs(py - cy) - (h / 2 - r);
      const ox = Math.max(qx, 0), oy = Math.max(qy, 0);
      const outside = Math.hypot(ox, oy);
      const inside = -(outside + Math.min(Math.max(qx, qy), 0) - r); // distance to the edge, inward
      let ex = 0, ey = 0;
      if (inside < bezel && max > 0) {
        let nx = 0, ny = 0;
        if (qx > 0 && qy > 0 && outside > 0) { nx = ox / outside; ny = oy / outside; }
        else if (qx > qy) nx = 1; else ny = 1;
        nx *= Math.sign(px - cx) || 1;
        ny *= Math.sign(py - cy) || 1;
        // Rim weight. profile 0 = a circular glass edge (flat through most of the
        // bezel, very steep at the rim); profile p > 0 = a power curve (1 - u)^p.
        const u = Math.min(1, Math.max(inside, 0) / bezel);
        let wgt: number;
        if (profile > 0) wgt = Math.pow(1 - u, profile);
        else { const t = 1 - u; wgt = 1 - Math.sqrt(1 - t * t); }
        // The shift acts along the edge normal only, by the light's component on
        // it: (n . L) n. The edges facing the light sample outward, the far ones
        // inward, and content is never dragged sideways along an edge.
        const nl = nx * lx + ny * ly;
        ex = (-nx * refraction + nl * nx * shift) * wgt / max;
        ey = (-ny * refraction + nl * ny * shift) * wgt / max;
      }
      const i = (y * w + x) * 4;
      d[i] = 128 + ex * 127;
      d[i + 1] = 128 + ey * 127;
      d[i + 2] = 128;
      d[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const url = canvas.toDataURL();
  mapCache.set(key, url);
  return url;
}

/** Unit vector pointing from the element toward its light, from the CSS angle in
 *  --liquid-light-angle (a gradient angle: 135deg = the gradient runs to the
 *  bottom-right, so the light sits at the top-left). */
function lightVector(el: Element): { lx: number; ly: number } {
  const raw = getComputedStyle(el).getPropertyValue('--liquid-light-angle').trim();
  const deg = parseFloat(raw);
  const a = ((Number.isFinite(deg) ? deg : 135) * Math.PI) / 180;
  return { lx: -Math.sin(a), ly: Math.cos(a) };
}

const num = (el: Element, name: string, fallback: number) => {
  const v = parseFloat(getComputedStyle(el).getPropertyValue(name));
  return Number.isFinite(v) ? v : fallback;
};

export interface UseLiquidGlassOptions {
  enabled?: boolean;
  /** 'off' forces the frosted fallback (e.g. to preview Safari in Chrome). */
  refraction?: 'auto' | 'off';
}

/**
 * The material as a hook, for components that own their element (Modal's
 * card). Spread `props` onto the element and render `filter` inside it.
 */
export function useLiquidGlass(ref: React.RefObject<HTMLElement | null>, { enabled = true, refraction = 'auto' }: UseLiquidGlassOptions = {}) {
  const rawId = React.useId();
  const id = `liquid-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const [params, setParams] = React.useState<Params | null>(null);
  const refracting = enabled && refraction !== 'off' && canRefract();

  React.useEffect(() => {
    const el = ref.current;
    if (!el || !refracting) { setParams(null); return undefined; }
    // ResizeObserver reports once on observe and after every size change,
    // before paint -- no animation-frame wait needed (which background tabs
    // throttle). Same-size reports keep the previous params, so no re-render.
    const measure = () => {
      const w = Math.round(el.offsetWidth), h = Math.round(el.offsetHeight);
      if (!w || !h) return;
      const radius = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
      // The lens is at most 35% of the smallest side, and its strength scales
      // with it -- so a 56px pill bends its rim instead of warping throughout.
      const tokenBezel = num(el, '--liquid-bezel', 22);
      const bezel = Math.round(Math.min(tokenBezel, Math.min(w, h) * 0.35));
      const k = bezel / tokenBezel;
      const next: Params = {
        w, h, radius, bezel,
        refraction: num(el, '--liquid-refraction', 2) * k,
        dispersion: num(el, '--liquid-dispersion', 1) * k,
        frost: num(el, '--liquid-frost', 1.5),
        saturate: num(el, '--liquid-saturate', 1.5),
        shift: num(el, '--liquid-shift', 0) * k,
        profile: num(el, '--liquid-profile', 0),
        ...lightVector(el),
      };
      setParams((prev) => (prev && (Object.keys(next) as (keyof Params)[]).every((k) => prev[k] === next[k]) ? prev : next));
    };
    measure(); // now, not only on the observer's first report (which waits for a rendering update)
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, refracting]);

  const map = params ? buildMap(params.w, params.h, params.radius, params.bezel, params.refraction, params.shift, params.profile, params.lx, params.ly) : '';

  const onPointerMove = React.useCallback((e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, []);

  const on = refracting && !!params && !!map;
  const channel = (row: number) => {
    const m = Array(20).fill(0);
    m[row * 5 + row] = 1; m[18] = 1; // keep one channel + alpha
    return m.join(' ');
  };

  const filter = on && params ? (
    <svg className={styles.defs} width="0" height="0" aria-hidden="true" focusable="false">
      <filter id={id} x="0" y="0" width={params.w} height={params.h} filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feImage href={map} x="0" y="0" width={params.w} height={params.h} preserveAspectRatio="none" result="map" />
        {[0, 1, 2].map((c) => (
          <React.Fragment key={c}>
            <feDisplacementMap in="SourceGraphic" in2="map" scale={2 * (params.refraction + Math.abs(params.shift) + c * params.dispersion)} xChannelSelector="R" yChannelSelector="G" result={`d${c}`} />
            <feColorMatrix in={`d${c}`} type="matrix" values={channel(c)} result={`c${c}`} />
          </React.Fragment>
        ))}
        <feBlend in="c0" in2="c1" mode="screen" result="c01" />
        <feBlend in="c01" in2="c2" mode="screen" result="rgb" />
        <feGaussianBlur in="rgb" stdDeviation={params.frost} result="soft" />
        <feColorMatrix in="soft" type="saturate" values={String(params.saturate)} />
      </filter>
    </svg>
  ) : null;

  return {
    filter,
    refracting: on,
    props: {
      'data-surface': 'liquid',
      'data-refraction': on ? 'on' : 'off',
      style: on ? { backdropFilter: `url(#${id})` } : undefined,
      onPointerMove,
    } as const,
  };
}

export interface LiquidGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  /** regular: text-safe tint (panels, sidebars, modals). clear: icons and large labels only. */
  variant?: LiquidGlassVariant;
  /** How much of the backdrop shows through. Default 'auto' (follows `variant`). */
  tint?: LiquidGlassTint;
  /** Corner radius in px. Default 20. */
  radius?: number;
  /** 'off' forces the frosted fallback. */
  refraction?: 'auto' | 'off';
  /** Squish slightly when pressed (buttons, toolbar pills). */
  interactive?: boolean;
}

export const LiquidGlass = React.forwardRef<HTMLDivElement, LiquidGlassProps>(
  ({ variant = 'regular', tint = 'auto', radius = 20, refraction = 'auto', interactive, className, style, children, onPointerMove, ...rest }, forwarded) => {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const setRef = (el: HTMLDivElement | null) => {
      ref.current = el;
      if (typeof forwarded === 'function') forwarded(el); else if (forwarded) forwarded.current = el;
    };
    const glass = useLiquidGlass(ref, { refraction });
    return (
      <div
        ref={setRef}
        {...rest}
        {...glass.props}
        className={[styles.liquid, styles[variant], tint !== 'auto' ? styles[`tint-${tint}`] : '', interactive ? styles.interactive : '', className ?? ''].filter(Boolean).join(' ')}
        style={{ borderRadius: radius, ...glass.props.style, ...style }}
        onPointerMove={(e) => { glass.props.onPointerMove(e); onPointerMove?.(e); }}
      >
        {glass.filter}
        {children}
      </div>
    );
  },
);
LiquidGlass.displayName = 'LiquidGlass';

/** Class names for components that apply the material via the hook. */
export const liquidGlassClass = (variant: LiquidGlassVariant = 'regular', tint: LiquidGlassTint = 'auto') =>
  [styles.liquid, styles[variant], tint !== 'auto' ? styles[`tint-${tint}`] : ''].filter(Boolean).join(' ');

export default LiquidGlass;
