/**
 * Glass icons
 *
 * Every icon in the Sakani icon set as monochrome frosted glass, mirroring the
 * Figma "Glass Icons" component set layer for layer:
 *
 *   Accent           a disc tucked behind the shape's top-right corner; where
 *                    the glass covers it, it shows through blurred.
 *   Glass            the icon's main shape as one frosted solid: a top-to-bottom
 *                    gradient, a bright rim along its edge and a soft shadow.
 *   Detail           lines that sit off the glass, drawn solid.
 *   Detail on glass  lines that sit on the glass, drawn white and clipped to it.
 *
 * Which parts are glass and which are lines is decided at build time
 * (scripts/glass-icons/decompose.mjs) with the same rules the Figma build uses.
 * Everything is plain SVG drawn in the icon's 24-unit space, so the icon scales
 * cleanly to any size and renders the same in every browser. Colours come from
 * the --glass-icon-* tokens, so light and dark follow the theme.
 */
import React from 'react';
import styles from './GlassIcon.module.css';

/** [path data, flag]: for body parts the flag means "filled"; for details, "on the glass". */
type Part = readonly [string, 0 | 1];

/** Build-time data for one icon: [body, detail, accent disc [cx, cy, r], line-only icon]. */
export type GlassIconData = readonly [
  body: ReadonlyArray<Part>,
  detail: ReadonlyArray<Part>,
  accent: readonly [number, number, number],
  pure: 0 | 1,
];

export interface GlassIconProps extends Omit<React.SVGProps<SVGSVGElement>, 'ref' | 'children' | 'fill' | 'stroke'> {
  /** Rendered size: px, or any CSS length ('1em' follows the text size). Default 24. */
  size?: number | string;
  /** Force the light- or dark-surface treatment instead of following a `.dark` ancestor. */
  surface?: 'auto' | 'light' | 'dark';
  /** Accessible name. Without it the icon is decorative (aria-hidden). */
  title?: string;
}

/** Draws a set of paths with the given paint. */
type Drawer = (paint: { fill?: string; stroke?: string; strokeWidth: number }) => React.ReactNode;

const BODY_SW = 2.5;   // glass shape outline, in the icon's 24-unit space
const PURE_SW = 3;     // line-only icons are drawn a little heavier
const DETAIL_SW = 2;   // the lines
const AREA = { x: -4, y: -4, width: 32, height: 32 } as const;

function useSafeId() {
  return 'gi' + React.useId().replace(/[^a-zA-Z0-9_-]/g, '');
}

/** The shared renderer behind every glass icon. */
export function GlassIconSvg({
  body, onGlass, offGlass, accent, pure, size = 24, surface = 'auto', title, className, ...rest
}: GlassIconProps & {
  body: Drawer;
  onGlass?: Drawer | null;
  offGlass?: Drawer | null;
  accent: readonly [number, number, number];
  pure?: boolean;
}) {
  const id = useSafeId();
  const sw = pure ? PURE_SW : BODY_SW;
  const [cx, cy, r] = accent;
  const rootClass = [
    styles.root,
    surface === 'dark' ? styles.onDark : '',
    surface === 'light' ? styles.onLight : '',
    className ?? '',
  ].filter(Boolean).join(' ');
  const a11y = title
    ? { role: 'img' as const, 'aria-label': title }
    : { 'aria-hidden': true as const, focusable: 'false' as const };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={rootClass} {...a11y} {...rest}>
      {title && <title>{title}</title>}
      <defs>
        <linearGradient id={`${id}g`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="24">
          <stop offset="0" className={styles.glassTop} />
          <stop offset="1" className={styles.glassBottom} />
        </linearGradient>
        <linearGradient id={`${id}r`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="24" y2="24">
          <stop offset="0" className={styles.rimStart} />
          <stop offset="0.55" stopColor="#fff" stopOpacity={0.08} />
          <stop offset="1" stopColor="#fff" stopOpacity={0.35} />
        </linearGradient>
        {/* Where the glass is, and where it isn't. */}
        <mask id={`${id}m`} maskUnits="userSpaceOnUse" {...AREA}>
          {body({ fill: '#fff', stroke: '#fff', strokeWidth: sw })}
        </mask>
        <mask id={`${id}o`} maskUnits="userSpaceOnUse" {...AREA}>
          <rect {...AREA} fill="#fff" />
          {body({ fill: '#000', stroke: '#000', strokeWidth: sw })}
        </mask>
        <filter id={`${id}b`} filterUnits="userSpaceOnUse" {...AREA}>
          <feGaussianBlur stdDeviation="2" />
        </filter>
        <filter id={`${id}s`} filterUnits="userSpaceOnUse" {...AREA}>
          <feGaussianBlur stdDeviation="1" />
        </filter>
        {/* The rim: a thin band just inside the glass outline. */}
        <filter id={`${id}e`} filterUnits="userSpaceOnUse" {...AREA}>
          <feMorphology in="SourceAlpha" operator="erode" radius="0.5" result="inner" />
          <feComposite in="SourceAlpha" in2="inner" operator="out" result="ring" />
          <feComposite in="SourceGraphic" in2="ring" operator="in" />
        </filter>
      </defs>

      {/* Outside the glass: its soft shadow and the uncovered part of the disc. */}
      <g mask={`url(#${id}o)`}>
        <g filter={`url(#${id}s)`} transform="translate(0 1)" opacity={0.12}>
          {body({ fill: '#000', stroke: '#000', strokeWidth: sw })}
        </g>
        <circle cx={cx} cy={cy} r={r} className={styles.accent} />
      </g>

      {/* The glass: the disc seen through it blurred, then the frosted fill. */}
      <g mask={`url(#${id}m)`}>
        <circle cx={cx} cy={cy} r={r} className={styles.accent} filter={`url(#${id}b)`} />
        <rect {...AREA} fill={`url(#${id}g)`} />
      </g>
      <g filter={`url(#${id}e)`}>{body({ fill: `url(#${id}r)`, stroke: `url(#${id}r)`, strokeWidth: sw })}</g>

      {offGlass && <g className={styles.detailOff} fill="none">{offGlass({ strokeWidth: DETAIL_SW })}</g>}
      {onGlass && <g className={styles.detail} fill="none" mask={`url(#${id}m)`}>{onGlass({ strokeWidth: DETAIL_SW })}</g>}
    </svg>
  );
}

/** Draws build-time parts; `filled` decides per part whether the fill paint applies. */
function partsDrawer(parts: ReadonlyArray<Part>, filled: boolean): Drawer {
  return ({ fill, stroke, strokeWidth }) =>
    parts.map(([d, f], i) => (
      <path
        key={i}
        d={d}
        fill={filled && f ? fill : 'none'}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ));
}

export type GlassIconComponent = React.FC<GlassIconProps> & { iconName: string };

/** Builds a glass icon component from an icon's build-time data. */
export function createGlassIcon(iconName: string, [body, detail, accent, pure]: GlassIconData): GlassIconComponent {
  const on = detail.filter((p) => p[1]);
  const off = detail.filter((p) => !p[1]);
  const drawBody = partsDrawer(body, true);
  const drawOn = on.length ? partsDrawer(on, false) : null;
  const drawOff = off.length ? partsDrawer(off, false) : null;
  const Component = ((props: GlassIconProps) => (
    <GlassIconSvg {...props} body={drawBody} onGlass={drawOn} offGlass={drawOff} accent={accent} pure={!!pure} />
  )) as GlassIconComponent;
  Component.displayName = 'Glass' + iconName.split('-').map((p) => p[0].toUpperCase() + p.slice(1)).join('');
  Component.iconName = iconName;
  return Component;
}

/** Any Lucide-style icon component (size/strokeWidth/color props). */
type LucideLike = React.ComponentType<{
  size?: number | string; strokeWidth?: number; color?: string; className?: string;
  fill?: string; absoluteStrokeWidth?: boolean;
}>;

/**
 * Glass treatment for any Lucide icon component, including ones added to
 * Lucide after this package was built. Prefer the generated `Glass*`
 * components: they know which parts are solid shapes and which are lines,
 * while this draws the whole icon as a glass stroke (a component gives no way
 * to tell the parts apart).
 */
export function GlassIcon({ icon: Icon, ...props }: GlassIconProps & { icon: LucideLike }) {
  const body: Drawer = ({ stroke, strokeWidth }) => <Icon size={24} color={stroke} strokeWidth={strokeWidth} />;
  return <GlassIconSvg {...props} body={body} accent={[17.4, 6.6, 4.5]} pure />;
}
