/**
 * Badge
 *
 * Compact label for status, category, or count.
 * Matches the Figma "Badge" component set exactly:
 *
 *   variant  (Figma "BD" axis)       -> neutral | accent | success | warning | danger | info
 *   emphasis (Figma "Emphasis" axis) -> subtle | solid
 *
 * 6 variants x 2 emphasis = 12 combinations, matching Figma 1:1.
 * No size axis (Figma has none) - padding is a fixed 2px/8px.
 * No borders (Figma badges are borderless).
 *
 * Icon slots: leftIcon / rightIcon (any ReactNode).
 */

import React from 'react';
import styles from './Badge.module.css';

export type BadgeVariant =
  | 'neutral'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export type BadgeEmphasis = 'subtle' | 'solid';

export interface BadgeProps {
  /** Color scheme. Maps to Figma BD axis. Defaults to "neutral". */
  variant?: BadgeVariant;
  /** Fill strength. Maps to Figma Emphasis axis. Defaults to "subtle". */
  emphasis?: BadgeEmphasis;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  emphasis = 'subtle',
  leftIcon,
  rightIcon,
  children,
  className,
}) => (
  <span
    className={[
      styles.badge,
      styles[`badge--${variant}-${emphasis}`],
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {leftIcon && <span className={styles.badge__icon} aria-hidden="true">{leftIcon}</span>}
    <span className={styles.badge__label}>{children}</span>
    {rightIcon && <span className={styles.badge__icon} aria-hidden="true">{rightIcon}</span>}
  </span>
);

export default Badge;
