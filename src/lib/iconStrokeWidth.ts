/**
 * Lucide icons are always drawn on a fixed 24-unit grid regardless of the
 * requested pixel `size` -- `strokeWidth` is defined in that same 24-unit
 * space, so rendering below 24px visually scales a stroke down
 * proportionally (e.g. strokeWidth={1.5} at size={16} renders as an
 * effective ~1px line), noticeably thinner than Figma's own same-size-
 * native icon exports, which have no such scaling.
 *
 * Scaling strokeWidth up by 24/size compensates so the rendered stroke
 * actually measures `targetPx`, matching Figma. Every icon in this design
 * system is exported at 1.5px, hence the default.
 */
export const iconStrokeWidth = (size: number, targetPx = 1.5) => targetPx * (24 / size);
