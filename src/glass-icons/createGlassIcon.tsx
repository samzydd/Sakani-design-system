/**
 * Glass icons
 *
 * Every Tabler icon as monochrome frosted glass, mirroring the Figma "Glass
 * Icons / <Category>" component sets layer for layer:
 *
 *   Accent           a soft disc tucked inside the glass's top-right corner,
 *                    seen blurred through it. Only on icons with enough glass
 *                    to hold it; line icons (arrows, logos) have none.
 *   Glass            the icon's exact Tabler silhouette -- its own lines plus
 *                    every area they enclose -- as one frosted solid: a
 *                    top-to-bottom gradient, a bright rim and a soft shadow.
 *   Detail on glass  the icon's inner lines, drawn white on the glass.
 *
 * The enclosed areas are worked out at build time
 * (scripts/glass-icons/silhouette.mjs, the same rule the Figma build uses); the
 * lines are the Tabler path data itself, so the outer edge is always the source
 * icon's line. Everything is plain SVG in the icon's 24-unit space, so it
 * scales cleanly. Colours come from the --glass-icon-* tokens, so light and
 * dark follow the theme.
 */
import React from 'react';
import styles from './GlassIcon.module.css';

/**
 * Build-time data for one icon: [stroke path data, enclosed-area path data,
 * accent disc [cx, cy, r] or 0 for none].
 */
export type GlassIconData = readonly [
  strokes: ReadonlyArray<string>,
  fills: ReadonlyArray<string>,
  accent: readonly [number, number, number] | 0,
];

export interface GlassIconProps extends Omit<React.SVGProps<SVGSVGElement>, 'ref' | 'children' | 'fill' | 'stroke'> {
  /** Rendered size: px, or any CSS length ('1em' follows the text size). Default 24. */
  size?: number | string;
  /** Force the light- or dark-surface treatment instead of following a `.dark` ancestor. */
  surface?: 'auto' | 'light' | 'dark';
  /** Accessible name. Without it the icon is decorative (aria-hidden). */
  title?: string;
}

/** Draws the glass shape with the given paint. */
type Drawer = (paint: string) => React.ReactNode;

const LINE_SW = 2;       // glass line width, the Tabler source width
const DETAIL_SW = 1.25;  // the white inner lines
const DETAIL_INSET = 1;  // inner lines stop this far inside the glass edge
const AREA = { x: -4, y: -4, width: 32, height: 32 } as const;

function useSafeId() {
  return 'gi' + React.useId().replace(/[^a-zA-Z0-9_-]/g, '');
}

/** The shared renderer behind every glass icon. */
export function GlassIconSvg({
  body, detail, accent, size = 24, surface = 'auto', title, className, ...rest
}: GlassIconProps & {
  body: Drawer;
  detail?: React.ReactNode;
  accent?: readonly [number, number, number] | 0;
}) {
  const id = useSafeId();
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
        <mask id={`${id}m`} maskUnits="userSpaceOnUse" {...AREA}>{body('#fff')}</mask>
        <mask id={`${id}o`} maskUnits="userSpaceOnUse" {...AREA}>
          <rect {...AREA} fill="#fff" />
          {body('#000')}
        </mask>
        {detail && (
          <>
            {/* The glass shrunk by DETAIL_INSET: inner lines show, the outline itself doesn't. */}
            <filter id={`${id}i`} filterUnits="userSpaceOnUse" {...AREA}>
              <feMorphology operator="erode" radius={DETAIL_INSET} />
            </filter>
            <mask id={`${id}d`} maskUnits="userSpaceOnUse" {...AREA}>
              <g filter={`url(#${id}i)`}>{body('#fff')}</g>
            </mask>
          </>
        )}
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

      {/* Outside the glass: its soft shadow and any uncovered sliver of the disc. */}
      <g mask={`url(#${id}o)`}>
        <g filter={`url(#${id}s)`} transform="translate(0 1)" opacity={0.12}>{body('#000')}</g>
        {accent ? <circle cx={accent[0]} cy={accent[1]} r={accent[2]} className={styles.accent} /> : null}
      </g>

      {/* The glass: the disc seen through it blurred, then the frosted fill. */}
      <g mask={`url(#${id}m)`}>
        {accent ? <circle cx={accent[0]} cy={accent[1]} r={accent[2]} className={styles.accent} filter={`url(#${id}b)`} /> : null}
        <rect {...AREA} fill={`url(#${id}g)`} />
      </g>
      <g filter={`url(#${id}e)`}>{body(`url(#${id}r)`)}</g>

      {detail && <g className={styles.detail} fill="none" mask={`url(#${id}d)`}>{detail}</g>}
    </svg>
  );
}

const strokePath = (d: string, i: number, stroke: string, width: number) => (
  <path key={i} d={d} fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />
);

export type GlassIconComponent = React.FC<GlassIconProps> & { iconName: string };

/** Builds a glass icon component from an icon's build-time data. */
export function createGlassIcon(iconName: string, [strokes, fills, accent]: GlassIconData): GlassIconComponent {
  const body: Drawer = (paint) => [
    ...fills.map((d, i) => <path key={`f${i}`} d={d} fill={paint} />),
    ...strokes.map((d, i) => strokePath(d, i, paint, LINE_SW)),
  ];
  const detail = strokes.map((d, i) => (
    <path key={i} d={d} strokeWidth={DETAIL_SW} strokeLinecap="round" strokeLinejoin="round" />
  ));
  const Component = ((props: GlassIconProps) => (
    <GlassIconSvg {...props} body={body} detail={detail} accent={accent} />
  )) as GlassIconComponent;
  Component.displayName = 'Glass' + iconName.split('-').map((p) => p[0].toUpperCase() + p.slice(1)).join('');
  Component.iconName = iconName;
  return Component;
}

/** Any stroke icon component that takes size/strokeWidth/color (Sakani, Tabler or Lucide icons). */
type StrokeIcon = React.ComponentType<{
  size?: number | string; strokeWidth?: number | string; color?: string; className?: string;
}>;

/**
 * Glass treatment for any stroke icon component. Prefer the generated `Glass*`
 * components: they fill the shape's enclosed areas and draw its inner lines,
 * while this draws the whole icon as one glass stroke (a component gives no way
 * to tell the parts apart).
 */
export function GlassIcon({ icon: Icon, ...props }: GlassIconProps & { icon: StrokeIcon }) {
  const body: Drawer = (paint) => <Icon size={24} color={paint} strokeWidth={2.5} />;
  return <GlassIconSvg {...props} body={body} />;
}
