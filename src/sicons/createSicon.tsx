/**
 * Sicons -- Sakani's icon set.
 *
 * The same 1,626 icons as the Figma "Icons" component set: Lucide's shapes
 * at a 1.5 stroke with softened corners (a 4px radius, 3.7px where an icon's
 * short corners can't take 4). The rounding is baked into the path data at
 * build time (scripts/sicons/round.mjs), with the same rule as the Figma set.
 *
 * Props follow lucide-react (size, color, strokeWidth, absoluteStrokeWidth) so
 * an existing Lucide icon is a drop-in swap. Colour is currentColor.
 */
import React from 'react';

/** The icon's rounded path data. */
export type SiconData = ReadonlyArray<string>;

export interface SiconProps extends Omit<React.SVGProps<SVGSVGElement>, 'ref' | 'children' | 'fill' | 'stroke'> {
  /** Rendered size: px, or any CSS length ('1em' follows the text). Default 24. */
  size?: number | string;
  /** Stroke colour. Default currentColor. */
  color?: string;
  /** Line weight in the icon's 24-unit space. Default 1.5. */
  strokeWidth?: number;
  /** Keep the line weight constant in pixels as `size` changes. */
  absoluteStrokeWidth?: boolean;
  /** Accessible name. Without it the icon is decorative (aria-hidden). */
  title?: string;
}

export function SiconSvg({
  data, size = 24, color = 'currentColor', strokeWidth = 1.5, absoluteStrokeWidth, title, ...rest
}: SiconProps & { data: SiconData }) {
  const sw = absoluteStrokeWidth && typeof size === 'number' ? (strokeWidth * 24) / size : strokeWidth;
  const a11y = title
    ? { role: 'img' as const, 'aria-label': title }
    : { 'aria-hidden': true as const, focusable: 'false' as const };
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw}
      strokeLinecap="round" strokeLinejoin="round" {...a11y} {...rest}
    >
      {title && <title>{title}</title>}
      {data.map((d, i) => <path key={i} d={d} />)}
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

/** Renders an icon component passed as a value, for lists and pickers. Prefer the named components: they tree-shake. */
export function Sicon({ icon: Icon, ...props }: SiconProps & { icon: SiconFC }) {
  return <Icon {...props} />;
}
