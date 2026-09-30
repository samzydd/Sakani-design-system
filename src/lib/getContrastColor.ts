/**
 * Given any valid CSS color string, returns whichever of this system's own
 * fixed light/dark icon colors (fg/on-inverse #FAFAF9 vs fg/default
 * #141414) has the higher WCAG contrast ratio against it.
 *
 * Used for icon/text glyphs drawn on top of a consumer-supplied background
 * color (e.g. ColorSwatch's checkmark) -- a flat "always white" choice
 * fails contrast on light swatch colors (confirmed: a white check on
 * #E0D8D1 is not accessible), and a flat luminance>0.5 threshold is less
 * accurate than actually comparing both candidates' real contrast ratios,
 * so this does the full WCAG comparison instead.
 *
 * Hex and rgb() are parsed directly (identically on server and client);
 * anything else parses via a 1x1 canvas fillStyle instead of hand-rolling a hex/rgb/hsl
 * parser -- the canvas 2D context's color parser already accepts every
 * valid CSS color syntax (hex, rgb(), hsl(), named colors, ...) and
 * normalizes it to concrete RGB, so this works for any `color` a consumer
 * might pass without this library needing its own parser.
 */

const LIGHT = '#fafaf9';
const DARK = '#141414';

/** WCAG relative luminance: https://www.w3.org/TR/WCAG21/#dfn-relative-luminance */
const relativeLuminance = (r: number, g: number, b: number) => {
  const channel = (c: number) => {
    const normalized = c / 255;
    return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};

const contrastRatio = (l1: number, l2: number) => {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
};

/** Deterministic parse for the syntaxes swatches actually use (#rgb,
 * #rrggbb, #rrggbbaa, rgb()/rgba()). Doesn't touch the DOM, so the server
 * render and the browser reach the same answer -- the canvas path alone
 * returned LIGHT during SSR and DARK after hydration, and React doesn't
 * patch mismatched attributes, so a light swatch (Bone #F5F4F2) kept an
 * invisible near-white check on server-rendered pages. */
const parseSimple = (color: string): [number, number, number] | null => {
  const c = color.trim().toLowerCase();
  const hex = /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/.exec(c);
  if (hex) {
    let h = hex[1];
    if (h.length <= 4) h = h.split('').map((x) => x + x).join('');
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as [number, number, number];
  }
  const rgb = /^rgba?\(\s*(\d+(?:\.\d+)?)[\s,]+(\d+(?:\.\d+)?)[\s,]+(\d+(?:\.\d+)?)/.exec(c);
  if (rgb) return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
  return null;
};

const pick = (r: number, g: number, b: number) => {
  const bgLuminance = relativeLuminance(r, g, b);
  // 0/0/0 and 250/250/249 (LIGHT) -- close enough to true black/white for this purpose.
  const contrastWithDark = contrastRatio(bgLuminance, relativeLuminance(20, 20, 20));
  const contrastWithLight = contrastRatio(bgLuminance, relativeLuminance(250, 250, 249));
  return contrastWithLight >= contrastWithDark ? LIGHT : DARK;
};

let sharedCanvas: HTMLCanvasElement | null = null;

/** Returns fg/on-inverse (#fafaf9) or fg/default (#141414), whichever
 * contrasts better against `backgroundColor`. Falls back to fg/on-inverse
 * if run outside a browser (canvas unavailable, e.g. SSR). */
export const getContrastColor = (backgroundColor: string): string => {
  const simple = parseSimple(backgroundColor);
  if (simple) return pick(...simple);
  if (typeof document === 'undefined') return LIGHT;

  sharedCanvas ??= document.createElement('canvas');
  sharedCanvas.width = 1;
  sharedCanvas.height = 1;
  const ctx = sharedCanvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return LIGHT;

  ctx.clearRect(0, 0, 1, 1);
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return pick(r, g, b);
};
