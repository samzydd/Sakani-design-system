/**
 * Input
 *
 * Text input with optional label, help text, and leading/trailing icons.
 * Matches Figma "Input" set: Size (sm|md|lg) x State (Default|Focus|Error|Disabled|Filled).
 *
 * States in code:
 *   - Default / Filled / Focus -> native input + CSS :focus
 *   - Error    -> `error` prop (red border + message)
 *   - Disabled -> native `disabled`
 *
 * Title/Description Figma toggles map to `label` / `description` props.
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
        {label && (
          <label htmlFor={inputId} className={styles.field__label}>{label}</label>
        )}

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
