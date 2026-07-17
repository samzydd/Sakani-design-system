/**
 * Button
 *
 * The primary action primitive for the Sakani Design System.
 * Maps 1:1 with the Figma "Button" component set (45 variants).
 *
 * Variant axis  → variant prop   (Primary | Secondary | Outline | Ghost | Destructive)
 * Size axis     → size prop      (sm | md | lg)
 * State axis    → handled via CSS pseudo-classes (:hover, :focus-visible, :disabled)
 *                 NOT props — states are visual only in Figma, semantic in code.
 *
 * Icon slots    → leftIcon / rightIcon (any ReactNode, typically a Lucide icon)
 *
 * All colors, spacing, radius and border-width values come from CSS custom properties
 * defined in tokens.css — never hardcoded.
 */

import React from 'react';
import styles from './Button.module.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'destructive';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style of the button. Defaults to "primary". */
  variant?: ButtonVariant;

  /** Size of the button. Defaults to "md". */
  size?: ButtonSize;

  /** Icon rendered to the left of the label. */
  leftIcon?: React.ReactNode;

  /** Icon rendered to the right of the label. */
  rightIcon?: React.ReactNode;

  /** Render the button in a loading state (disables interaction). */
  loading?: boolean;

  /** Button label. Pass as children or use the children prop directly. */
  children: React.ReactNode;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      leftIcon,
      rightIcon,
      loading = false,
      disabled,
      children,
      className,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        /*
         * CSS class composition:
         *   .button          — base reset + shared layout (flex, inline-flex, gap, cursor)
         *   .button--{variant} — color scheme from semantic tokens
         *   .button--{size}    — padding + font-size from spacing/typography tokens
         */
        className={[
          styles.button,
          styles[`button--${variant}`],
          styles[`button--${size}`],
          loading ? styles['button--loading'] : '',
          className ?? '',
        ]
          .filter(Boolean)
          .join(' ')}
        disabled={isDisabled}
        aria-busy={loading}
        {...rest}
      >
        {/* Left icon slot — renders any ReactNode (typically a 16px Lucide icon) */}
        {leftIcon && (
          <span className={styles.button__icon} aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {/* Label — wrapped in a span so flex gap applies correctly with icons */}
        <span className={styles.button__label}>{children}</span>

        {/* Right icon slot */}
        {rightIcon && (
          <span className={styles.button__icon} aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
