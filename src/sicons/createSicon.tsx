/**
 * Sicons -- Sakani's icon set.
 *
 * The same 1,626 icons as the Figma "Icons" component set: Lucide's shapes
 * with softened corners, in two styles that mirror the Figma `style` property.
 *
 *   line  (default)  1.5 stroke, round caps and joins.
 *   solid            the icon's main shape filled, inner details cut out of it;
 *                    line-only icons (arrows, check, plus) are drawn a touch heavier.
 *
 * Props follow lucide-react (size, color, strokeWidth, absoluteStrokeWidth) so
 * an existing Lucide icon is a drop-in swap. Colour is currentColor.
 *
 * Each icon module is [paths, roles]: the path data once, plus one role letter
 * per path -- b body, e edge line, n detail on the body, f detail off it,
 * p line-only icon. The roles are decided at build time
 * (scripts/glass-icons/decompose.mjs) with the same rules as the Figma set.
 */
import React from 'react';

export type SiconVariant = 'line' | 'solid';

/** [paths, roles]: one role letter per path. */
export type SiconData = readonly [paths: ReadonlyArray<string>, roles: string];

export interface SiconProps extends Omit<React.SVGProps<SVGSVGElement>, 'ref' | 'children' | 'fill' | 'stroke'> {
  /** Rendered size: px, or any CSS length ('1em' follows the text). Default 24. */
  size?: number | string;
  /** Stroke colour. Default currentColor. */
  color?: string;
  /** Line weight in the icon's 24-unit space. Default 1.5. */
  strokeWidth?: number;
  /** Keep the line weight constant in pixels as `size` changes. */
  absoluteStrokeWidth?: boolean;
  /** `line` (default) or `solid`. */
  variant?: SiconVariant;
  /** Accessible name. Without it the icon is decorative (aria-hidden). */
  title?: string;
}

const common = { strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
const closed = (d: string) => (d.endsWith('Z') ? d : d + 'Z');

export function SiconSvg({
  data, size = 24, color = 'currentColor', strokeWidth = 1.5, absoluteStrokeWidth, variant = 'line', title, ...rest
}: SiconProps & { data: SiconData }) {
  const id = 'si' + React.useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const [paths, roles] = data;
  const sw = absoluteStrokeWidth && typeof size === 'number' ? (strokeWidth * 24) / size : strokeWidth;
  const a11y = title
    ? { role: 'img' as const, 'aria-label': title }
    : { 'aria-hidden': true as const, focusable: 'false' as const };

  let body: React.ReactNode;
  if (variant === 'solid') {
    const pure = roles.length > 0 && roles.split('').every((r) => r === 'p');
    const pick = (letters: string) => paths.map((d, i) => [d, roles[i]] as const).filter(([, r]) => letters.includes(r));
    const cut = pick('n');
    const hasCut = cut.length > 0;
    body = (
      <>
        {hasCut && (
          <mask id={id} maskUnits="userSpaceOnUse" x="-4" y="-4" width="32" height="32">
            <rect x="-4" y="-4" width="32" height="32" fill="#fff" />
            {cut.map(([d], i) => <path key={i} d={d} stroke="#000" strokeWidth={sw} fill="none" {...common} />)}
          </mask>
        )}
        <g mask={hasCut ? `url(#${id})` : undefined} fill="none" stroke={color} strokeWidth={pure ? sw + 0.5 : sw} {...common}>
          {pick('bep').map(([d, r], i) => (
            <path key={i} d={r === 'b' ? closed(d) : d} fill={r === 'b' ? color : 'none'} />
          ))}
        </g>
        <g fill="none" stroke={color} strokeWidth={sw} {...common}>
          {pick('f').map(([d], i) => <path key={i} d={d} />)}
        </g>
      </>
    );
  } else {
    body = (
      <g fill="none" stroke={color} strokeWidth={sw} {...common}>
        {paths.map((d, i) => <path key={i} d={d} />)}
      </g>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...a11y} {...rest}>
      {title && <title>{title}</title>}
      {body}
    </svg>
  );
}

export type SiconFC = React.FC<SiconProps> & { iconName: string };

/** Builds an icon component from its build-time data. */
export function createSicon(iconName: string, data: SiconData): SiconFC {
  const Component = ((props: SiconProps) => <SiconSvg {...props} data={data} />) as SiconFC;
  Component.displayName = 'Sicon' + iconName.split('-').map((p) => p[0].toUpperCase() + p.slice(1)).join('');
  Component.iconName = iconName;
  return Component;
}

/** Any icon by name, for lists and pickers. Prefer the named components: they tree-shake. */
export function Sicon({ icon, ...props }: SiconProps & { icon: SiconFC }) {
  const Icon = icon;
  return <Icon {...props} />;
}
