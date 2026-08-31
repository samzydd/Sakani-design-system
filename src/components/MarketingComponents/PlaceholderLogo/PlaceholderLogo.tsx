/**
 * PlaceholderLogo
 *
 * Matches Figma "Placeholder Logo" (Marketing primitives set, 3 sizes:
 * sm 22 / md 40 / lg 46) -- a bg/surface + border/subtle + radius/lg
 * square slot for a company/brand mark, same "empty-state avatar" role
 * Avatar's own Icon type fills for a person. Figma's own asset inside is
 * literally this library's own Sakani mark, but that's just this file's
 * own placeholder-of-a-placeholder in the design file -- a real consumer
 * (a logo wall, a company directory row, a "brands using this" grid)
 * needs to drop in an arbitrary company's mark, not permanently show
 * Sakani's -- so `logo` is a consumer-supplied slot exactly like
 * Avatar's own `icon` prop, defaulting to a generic building glyph
 * (lucide Building2) rather than any specific brand.
 *
 * Container/icon px pairs per size are Figma's own literal presets, not
 * one shared ratio -- sm is 22/14, md is 40/16, lg is 46/18, none of
 * which share a common scale factor, so each is hardcoded rather than
 * derived from a formula.
 */

import React from 'react';
import { Building2 } from 'lucide-react';
import { iconStrokeWidth } from '../../../lib/iconStrokeWidth';
import styles from './PlaceholderLogo.module.css';

export type PlaceholderLogoSize = 'sm' | 'md' | 'lg';

const ICON_PX: Record<PlaceholderLogoSize, number> = { sm: 14, md: 16, lg: 18 };

export interface PlaceholderLogoProps {
  /** Figma Size axis. Defaults to "md". */
  size?: PlaceholderLogoSize;
  /** Custom logo/icon slot. Defaults to a generic building glyph when omitted. */
  logo?: React.ReactNode;
  /** Accessible name, e.g. "Acme Inc." */
  label?: string;
  className?: string;
}

export const PlaceholderLogo: React.FC<PlaceholderLogoProps> = ({
  size = 'md', logo, label, className,
}) => {
  const iconPx = ICON_PX[size];
  const renderedLogo = React.isValidElement<{ size?: number; strokeWidth?: number }>(logo)
    ? React.cloneElement(logo, { size: iconPx, strokeWidth: iconStrokeWidth(iconPx) })
    : (logo ?? <Building2 size={iconPx} strokeWidth={iconStrokeWidth(iconPx)} aria-hidden="true" />);

  return (
    <span
      className={[styles.root, styles[`root--${size}`], className ?? ''].filter(Boolean).join(' ')}
      role="img"
      aria-label={label ?? 'Logo placeholder'}
    >
      {renderedLogo}
    </span>
  );
};

export default PlaceholderLogo;
