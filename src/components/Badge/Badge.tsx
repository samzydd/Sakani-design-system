/**
 * Badge
 *
 * Compact label for status, category, or count.
 * Maps to Figma "Badge" component set (↪Bagde page).
 *
 * Variant axis → variant prop (default | success | warning | danger | info)
 * Size axis    → size prop (sm | md)
 * Icon slots   → leftIcon / rightIcon (any ReactNode)
 */

import React from 'react';
import styles from './Badge.module.css';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  leftIcon,
  rightIcon,
  children,
  className,
}) => (
  <span
    className={[
      styles.badge,
      styles[`badge--${variant}`],
      styles[`badge--${size}`],
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {/* Left icon slot */}
    {leftIcon && <span className={styles.badge__icon} aria-hidden="true">{leftIcon}</span>}

    {/* Label */}
    <span className={styles.badge__label}>{children}</span>

    {/* Right icon slot */}
    {rightIcon && <span className={styles.badge__icon} aria-hidden="true">{rightIcon}</span>}
  </span>
);

export default Badge;
