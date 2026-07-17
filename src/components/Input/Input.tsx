/**
 * Input
 *
 * Text input with optional label (Title), help text (Description), and
 * leading/trailing icons. Built to match the Figma "Input" parent component set:
 *   Size (sm|md|lg) x State (Default|Focus|Error|Disabled|Filled)
 *
 * Exact Figma spec (read from the parent component):
 *   - Field: vertical stack, 6px gap (space-6)
 *   - Label:  label/md  -> 14px / 500 / fg/default
 *   - Field frame: bg/surface, border/subtle 1px, radius-md (8px)
 *       padding: sm 6/14 · md 10/14 · lg 12/14  (horizontal always 14px)
 *   - Placeholder / value: body/sm -> 14px / 500, fg/subtle / fg/default
 *   - Description: body/xs -> 13px / fg/muted
 *   - Icons: 16px, fg/muted stroke
 *   - Focus: border/focus 1.5px · Error: danger/solid 1.5px · Disabled: bg/subtle
 */

import React from 'react';
import styles from './Input.module.css';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Field label (Figma: Title). */
  label?: string;
  /** Help text under the field (Figma: Description). */
  description?: string;
  /** Error message — sets error visual state and displays the text. */
  error?: string;
  /** Figma Size axis. Defaults to "md". */
  size?: InputSize;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, description, error, size = 'md', leadingIcon, trailingIcon, disabled, id, className, ...rest }, ref) => {
    const reactId = React.useId();
    const inputId = id ?? reactId;
    const hasError = Boolean(error);

    return (
      <div className={[styles.field, className ?? ''].filter(Boolean).join(' ')}>
        {/* Label — Figma Title, label/md */}
        {label && (
          <label htmlFor={inputId} className={styles.field__label}>{label}</label>
        )}

        {/* Field frame — bg/surface, border/subtle, radius-md */}
        <div
          className={[
            styles.input,
            styles[`input--${size}`],
            hasError ? styles['input--error'] : '',
            disabled ? styles['input--disabled'] : '',
          ].filter(Boolean).join(' ')}
        >
          {leadingIcon && <span className={styles.input__icon} aria-hidden="true">{leadingIcon}</span>}
          <input
            ref={ref}
            id={inputId}
            className={styles.input__control}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={description || error ? `${inputId}-desc` : undefined}
            {...rest}
          />
          {trailingIcon && <span className={styles.input__icon} aria-hidden="true">{trailingIcon}</span>}
        </div>

        {/* Description (Figma) or error message */}
        {(description || error) && (
          <span id={`${inputId}-desc`} className={hasError ? styles.field__error : styles.field__description}>
            {error || description}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
