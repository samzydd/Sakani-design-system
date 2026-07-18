/**
 * IconButton
 *
 * Icon-only button. Matches Figma "Icon Button":
 *   variant (IB axis): primary | secondary | outline | ghost | destructive
 *   size: sm (32) | md (40) | lg (48) — square, radius-sm
 *   State handled via CSS (:hover, :disabled).
 *
 * Mirrors Button's variant color logic, but square with a centered Lucide icon.
 */

import React from 'react';
import { type LucideIcon } from 'lucide-react';
import styles from './IconButton.module.css';

export type IconButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Lucide icon component. */
  icon: LucideIcon;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  /** Required for accessibility — describes the action. */
  'aria-label': string;
}

const iconSizes: Record<IconButtonSize, number> = { sm: 16, md: 18, lg: 20 };

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon: Icon, variant = 'primary', size = 'md', disabled, className, ...rest }, ref) => (
    <button
      ref={ref}
      disabled={disabled}
      className={[
        styles.button,
        styles[`button--${variant}`],
        styles[`button--${size}`],
        className ?? '',
      ].filter(Boolean).join(' ')}
      {...rest}
    >
      <Icon size={iconSizes[size]} strokeWidth={1.5} aria-hidden="true" />
    </button>
  )
);

IconButton.displayName = 'IconButton';
export default IconButton;
