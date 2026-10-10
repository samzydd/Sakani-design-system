/**
 * Sakani icons: Tabler Icons (tabler.io/icons, MIT), the same set as the
 * Figma "↳ Icons (Tabler)" page.
 *
 * Props follow lucide-react (size, color, strokeWidth, absoluteStrokeWidth),
 * so an existing Lucide icon is a drop-in swap. The default stroke is 1.5,
 * the Figma icon stroke (border-width/150). Colour is currentColor.
 */
import React from 'react';

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'ref' | 'children'> {
  /** Rendered size: px, or any CSS length ('1em' follows the text). Default 24. */
  size?: number | string;
  /** Icon colour. Default currentColor. */
  color?: string;
  /** Line weight in the icon's 24-unit grid. Default 1.5. Ignored by filled icons. */
  strokeWidth?: number | string;
  /** Keep the line weight constant in pixels as `size` changes. */
  absoluteStrokeWidth?: boolean;
  /** Accessible name. Without it the icon is decorative (aria-hidden). */
  title?: string;
}

export type SakaniIcon = React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>> & {
  iconName: string;
};

/** Builds an icon component from its path data. */
export function createIcon(iconName: string, paths: ReadonlyArray<string>, filled = false): SakaniIcon {
  const Icon = React.forwardRef<SVGSVGElement, IconProps>(function Icon(
    { size = 24, color = 'currentColor', strokeWidth = 1.5, absoluteStrokeWidth, title, className, ...rest },
    ref,
  ) {
    const sw = absoluteStrokeWidth && typeof size === 'number' ? (Number(strokeWidth) * 24) / size : strokeWidth;
    const a11y = title
      ? { role: 'img' as const, 'aria-label': title }
      : { 'aria-hidden': true as const, focusable: 'false' as const };
    const paint = filled
      ? { fill: color, stroke: 'none' }
      : { fill: 'none', stroke: color, strokeWidth: sw, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={['sakani-icon', `sakani-icon-${iconName}`, className].filter(Boolean).join(' ')}
        {...paint}
        {...a11y}
        {...rest}
      >
        {title && <title>{title}</title>}
        {paths.map((d, i) => <path key={i} d={d} />)}
      </svg>
    );
  }) as SakaniIcon;
  Icon.displayName = 'Icon' + iconName.split('-').map((p) => p[0].toUpperCase() + p.slice(1)).join('') + (filled ? 'Filled' : '');
  Icon.iconName = iconName;
  return Icon;
}
