/**
 * Glass icons
 *
 * Every Lucide icon in the Sakani icon set, rendered in a frosted-glass style:
 * a solid gradient copy of the shape sits behind, a frosted copy sits in front
 * and slightly offset, and the colour behind shows through the glass as a soft
 * haze. A crisp line drawing on the glass keeps the icon's details readable
 * (a plain filled silhouette turns a calendar into a square).
 *
 * The whole effect is drawn in SVG -- gradients, a mask and a Gaussian blur --
 * rather than with CSS backdrop-filter, so it renders identically in every
 * browser and costs nothing until the icon paints. Which parts of a shape get
 * filled is decided at build time (scripts/glass-icons): only closed shapes are
 * filled, because filling an open line (a checkmark, an arrow) paints a chord.
 *
 * Variants
 *   frosted (default) -- solid shape behind, frosted shape in front.
 *   tile             -- the icon on a rounded glass plate.
 */
import React from 'react';
import styles from './GlassIcon.module.css';

/** One element of an icon: [tag, attributes, closed (1 = safe to fill)]. */
export type GlassIconNode = ReadonlyArray<readonly [string, Readonly<Record<string, string | number>>, (0 | 1)?]>;

/** The ten tones, matching the modes of the "Glass icon" variable collection in Figma. */
export type GlassIconTone =
  | 'violet' | 'brand' | 'iridescent' | 'blue' | 'sky'
  | 'teal' | 'green' | 'orange' | 'red' | 'pink';

export type GlassIconVariant = 'frosted' | 'tile';

/**
 * Gradient stops per tone (from, mid, to: light to deep), 1:1 with the Figma
 * variables glass-icon/from, /mid and /to. `brand` follows the primary scale.
 */
export const GLASS_ICON_TONES: Record<GlassIconTone, readonly string[]> = {
  violet: ['#b4abff', '#9083f3', '#6c5ce7'],
  brand: ['var(--color-primary-300, #ffa170)', 'var(--color-primary-400, #ff7538)', 'var(--color-primary-500, #ff4700)'],
  iridescent: ['#ff6ad5', '#7cc9ff', '#ffe36e'],
  blue: ['#8cc8ff', '#5e9bef', '#2f6fe0'],
  sky: ['#9be3ff', '#55bfeb', '#0e9bd8'],
  teal: ['#8ff0e3', '#4ec2b5', '#0d9488'],
  green: ['#9cf0b8', '#59c981', '#16a34a'],
  orange: ['#ffc69a', '#f89455', '#f2620f'],
  red: ['#fdabab', '#ef647a', '#e11d48'],
  pink: ['#fbb6da', '#ee7bb2', '#e2408a'],
};

/**
 * Line-drawing colour (Figma glass-icon/detail) where it differs from the last
 * stop: the deepest stop would be too light, or isn't the family's ink colour.
 */
const DETAIL_FOR: Partial<Record<GlassIconTone, string>> = {
  brand: 'var(--color-primary-600, #e63d00)',
  iridescent: '#6b4fd8',
};

export interface GlassIconProps extends Omit<React.SVGProps<SVGSVGElement>, 'ref' | 'children' | 'fill' | 'stroke'> {
  /** Rendered size in px, or any CSS length. Default 48. */
  size?: number | string;
  /** Colour family. Default 'violet'. */
  tone?: GlassIconTone;
  /** Custom gradient (light to deep); overrides `tone`. Any CSS colours, two or more. */
  colors?: readonly string[];
  variant?: GlassIconVariant;
  /** The crisp line drawing on the glass. Default true; turn off for a pure silhouette. */
  detail?: boolean;
  /** Force the light- or dark-surface treatment instead of following a `.dark` ancestor. */
  surface?: 'auto' | 'light' | 'dark';
  /** Accessible name. Without it the icon is decorative (aria-hidden). */
  title?: string;
}

/** Draws the icon's shapes with the given paint. Used once per layer. */
type ShapeRenderer = (paint: {
  stroke: string;
  fill: string;
  strokeWidth: number;
  className?: string;
  /** false = never fill (the line drawing). */
  allowFill: boolean;
}) => React.ReactNode;

const SW = 2.5;          // silhouette stroke width, in the icon's 24-unit space
const DETAIL_SW = 1.35;  // the line drawing on the glass
const BACK = 'translate(2.1 -2.1)';
const FRONT = 'translate(-0.5 0.5)';
const BLEED = { x: -6, y: -6, width: 36, height: 36 } as const;

function useSafeId() {
  return 'gi' + React.useId().replace(/[^a-zA-Z0-9_-]/g, '');
}

/** The shared renderer behind every glass icon. */
export function GlassIconSvg({
  shapes, size = 48, tone = 'violet', colors, variant = 'frosted', detail = true,
  surface = 'auto', title, className, style, ...rest
}: GlassIconProps & { shapes: ShapeRenderer }) {
  const id = useSafeId();
  const stops = colors && colors.length >= 2 ? colors : GLASS_ICON_TONES[tone];
  const from = stops[0];
  const to = stops[stops.length - 1];
  const detailColor = colors ? to : (DETAIL_FOR[tone] ?? to);
  const gradId = `${id}g`;

  const cssVars = {
    '--gi-from': from,
    '--gi-to': detailColor,
    ...style,
  } as React.CSSProperties;

  const rootClass = [
    styles.root,
    surface === 'dark' ? styles.onDark : '',
    surface === 'light' ? styles.onLight : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  const gradient = (
    <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
      {stops.map((c, i) => (
        <stop key={i} offset={i / (stops.length - 1)} style={{ stopColor: c }} />
      ))}
    </linearGradient>
  );

  const a11y = title
    ? { role: 'img' as const, 'aria-label': title }
    : { 'aria-hidden': true as const, focusable: 'false' as const };

  if (variant === 'tile') {
    const glyph = 'translate(12 12) scale(0.7) translate(-12 -12)';
    return (
      <svg
        width={size} height={size} viewBox="-4 -4 32 32" className={rootClass} style={cssVars} {...a11y} {...rest}
      >
        {title && <title>{title}</title>}
        <defs>
          {gradient}
          <radialGradient id={`${id}s`} cx="0.25" cy="0.15" r="0.9">
            <stop offset="0" className={styles.shineStop} />
            <stop offset="1" className={styles.shineEnd} />
          </radialGradient>
          <linearGradient id={`${id}r`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" className={styles.rimStart} />
            <stop offset="1" style={{ stopColor: to }} stopOpacity={0.35} />
          </linearGradient>
          <filter id={`${id}b`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.2" />
          </filter>
          <clipPath id={`${id}c`}>
            <rect x="-3" y="-3" width="30" height="30" rx="8.5" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${id}c)`}>
          <rect x="-3" y="-3" width="30" height="30" className={styles.plate} />
          {/* The glyph's own colour glowing through the plate. */}
          <g transform={glyph} filter={`url(#${id}b)`} opacity={0.55}>
            {shapes({ stroke: `url(#${gradId})`, fill: `url(#${gradId})`, strokeWidth: SW + 1, allowFill: true })}
          </g>
          <rect x="-3" y="-3" width="30" height="30" fill={`url(#${id}s)`} />
        </g>
        <rect x="-2.7" y="-2.7" width="29.4" height="29.4" rx="8.2" fill="none" stroke={`url(#${id}r)`} strokeWidth={0.6} />
        <g transform={glyph}>
          {shapes({ stroke: `url(#${gradId})`, fill: `url(#${gradId})`, strokeWidth: 2.2, allowFill: false })}
        </g>
      </svg>
    );
  }

  return (
    <svg
      width={size} height={size} viewBox="-2 -2 28 28" className={rootClass} style={cssVars} {...a11y} {...rest}
    >
      {title && <title>{title}</title>}
      <defs>
        {gradient}
        <radialGradient id={`${id}s`} cx="0.3" cy="0.25" r="0.75">
          <stop offset="0" className={styles.shineStop} />
          <stop offset="1" className={styles.shineEnd} />
        </radialGradient>
        <linearGradient id={`${id}r`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" className={styles.rimStart} />
          <stop offset="1" style={{ stopColor: to }} stopOpacity={0.35} />
        </linearGradient>
        <filter id={`${id}b`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.3" />
        </filter>
        {/* Where the glass is: the front silhouette. */}
        <mask id={`${id}m`} maskUnits="userSpaceOnUse" {...BLEED}>
          <g transform={FRONT}>{shapes({ stroke: '#fff', fill: '#fff', strokeWidth: SW, allowFill: true })}</g>
        </mask>
        {/* The glass edge: a thin band just outside the front silhouette. */}
        <mask id={`${id}e`} maskUnits="userSpaceOnUse" {...BLEED}>
          <g transform={FRONT}>
            {shapes({ stroke: '#fff', fill: '#fff', strokeWidth: SW + 0.6, allowFill: true })}
            {shapes({ stroke: '#000', fill: '#000', strokeWidth: SW, allowFill: true })}
          </g>
        </mask>
      </defs>

      {/* 1. The solid shape behind. */}
      <g transform={BACK} id={`${id}k`}>
        {shapes({ stroke: `url(#${gradId})`, fill: `url(#${gradId})`, strokeWidth: SW, allowFill: true })}
      </g>

      {/* 2. The frosted glass in front: a milky base, the shape behind seen
             through it blurred, and a soft highlight. */}
      <g mask={`url(#${id}m)`}>
        <rect {...BLEED} className={styles.frost} />
        <g filter={`url(#${id}b)`} className={styles.haze}>
          <use href={`#${id}k`} />
        </g>
        <rect {...BLEED} fill={`url(#${id}s)`} />
      </g>

      {/* 3. The glass edge. */}
      <rect {...BLEED} fill={`url(#${id}r)`} mask={`url(#${id}e)`} />

      {/* 4. The line drawing on the glass. */}
      {detail && (
        <g transform={FRONT}>
          {shapes({ stroke: 'currentColor', fill: 'none', strokeWidth: DETAIL_SW, className: styles.detail, allowFill: false })}
        </g>
      )}
    </svg>
  );
}

/** Renders a node list (the build-time data for one icon). */
function nodeShapes(node: GlassIconNode): ShapeRenderer {
  return ({ stroke, fill, strokeWidth, className, allowFill }) =>
    node.map(([tag, attrs, closed], i) =>
      React.createElement(tag, {
        key: i,
        ...attrs,
        stroke,
        fill: allowFill && closed ? fill : 'none',
        strokeWidth,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        className,
      }),
    );
}

export type GlassIconComponent = React.FC<GlassIconProps> & { iconName: string };

/** Builds a glass icon component from an icon's build-time node data. */
export function createGlassIcon(iconName: string, node: GlassIconNode): GlassIconComponent {
  const shapes = nodeShapes(node);
  const Component = ((props: GlassIconProps) => <GlassIconSvg {...props} shapes={shapes} />) as GlassIconComponent;
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
 * components: they know which parts are closed shapes and fill them, while
 * this falls back to outlines (a component gives no way to tell a closed
 * shape from an open line).
 */
export function GlassIcon({ icon: Icon, ...props }: GlassIconProps & { icon: LucideLike }) {
  const shapes: ShapeRenderer = ({ stroke, strokeWidth, className }) => (
    <Icon size={24} color={stroke} strokeWidth={strokeWidth} className={className} />
  );
  return <GlassIconSvg {...props} shapes={shapes} />;
}
