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
 * Parses via a 1x1 canvas fillStyle instead of hand-rolling a hex/rgb/hsl
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

let sharedCanvas: HTMLCanvasElement | null = null;

/** Returns fg/on-inverse (#fafaf9) or fg/default (#141414), whichever
 * contrasts better against `backgroundColor`. Falls back to fg/on-inverse
 * if run outside a browser (canvas unavailable, e.g. SSR). */
export const getContrastColor = (backgroundColor: string): string => {
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

  const bgLuminance = relativeLuminance(r, g, b);
  // 0/0/0 and 250/250/249 (LIGHT) -- close enough to true black/white for this purpose.
  const contrastWithDark = contrastRatio(bgLuminance, relativeLuminance(20, 20, 20));
  const contrastWithLight = contrastRatio(bgLuminance, relativeLuminance(250, 250, 249));

  return contrastWithLight >= contrastWithDark ? LIGHT : DARK;
};
