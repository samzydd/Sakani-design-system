/**
 * FeaturedIcon
 *
 * Matches Figma "Featured Icon" (Marketing primitives set): a rounded
 * icon chip used to headline a feature/benefit callout. 12 previews --
 * Size (sm/md/lg) x Style (Light/Outline/Solid/Subtle):
 *
 *   sm: 32px frame, 8px padding, 16px icon, radius/lg (12px)
 *   md: 40px frame, 10px padding, 20px icon, radius/lg (12px)
 *   lg: 56px frame, 16px padding, 24px icon, radius/xl (16px) -- lg gets
 *     a slightly larger radius than sm/md, not just a linear scale-up,
 *     confirmed via each size's own live spec rather than assumed.
 *
 *   light   -- bg/surface, border/subtle, fg/default icon.
 *   outline -- transparent background, border/subtle, fg/default icon --
 *     visually identical to light except for the fill, so it blends
 *     with whatever the parent's own background is instead of always
 *     forcing white.
 *   solid   -- bg accent/default (near-black), border/subtle, fg/on-accent
 *     (white) icon.
 *   subtle  -- bg accent/subtle (light neutral), border/subtle, fg/default
 *     icon.
 *
 * Figma's own axis is named "Style"; called `variant` here instead to
 * avoid colliding with the DOM/React `style` prop convention, same
 * naming choice already made by Badge (`variant`/`emphasis`).
 *
 * Icon is a consumer-supplied ReactNode (any Lucide glyph) cloned with
 * the size's own compensated size/strokeWidth, the same
 * clone-for-consistent-stroke-weight pattern used by Avatar's icon slot
 * and Input's leading/trailing icons.
 */

import React from 'react';
import { iconStrokeWidth } from '../../../lib/iconStrokeWidth';
import styles from './FeaturedIcon.module.css';

export type FeaturedIconSize = 'sm' | 'md' | 'lg';
export type FeaturedIconVariant = 'light' | 'outline' | 'solid' | 'subtle';

const ICON_PX: Record<FeaturedIconSize, number> = { sm: 16, md: 20, lg: 24 };

export interface FeaturedIconProps {
  icon: React.ReactNode;
  /** Figma Size axis. Defaults to "md". */
  size?: FeaturedIconSize;
  /** Figma Style axis (renamed to avoid colliding with the DOM `style` prop). Defaults to "light". */
  variant?: FeaturedIconVariant;
  className?: string;
}

export const FeaturedIcon: React.FC<FeaturedIconProps> = ({
  icon, size = 'md', variant = 'light', className,
}) => {
  const px = ICON_PX[size];
  const renderedIcon = React.isValidElement<{ size?: number; strokeWidth?: number }>(icon)
    ? React.cloneElement(icon, { size: px, strokeWidth: iconStrokeWidth(px) })
    : icon;

  return (
    <div
      className={[styles.chip, styles[`chip--${size}`], styles[`chip--${variant}`], className ?? ''].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      {renderedIcon}
    </div>
  );
};

export default FeaturedIcon;
