/**
 * Textarea
 *
 * Multi-line text input. Matches Figma "Textarea" set:
 * State (Default|Focus|Error|Disabled|Filled), with Title/Description toggles.
 */

import React from 'react';
import styles from './Textarea.module.css';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Field label (Figma: Title). */
  label?: string;
  /** Help text (Figma: Description). */
  description?: string;
  /** Error message — sets error state + shows text. */
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, description, error, disabled, id, className, rows = 4, ...rest }, ref) => {
    const reactId = React.useId();
    const areaId = id ?? reactId;
    const hasError = Boolean(error);

    return (
      <div className={[styles.field, className ?? ''].filter(Boolean).join(' ')}>
        {label && <label htmlFor={areaId} className={styles.field__label}>{label}</label>}

        <textarea
          ref={ref}
          id={areaId}
          rows={rows}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          className={[
            styles.textarea,
            hasError ? styles['textarea--error'] : '',
            disabled ? styles['textarea--disabled'] : '',
          ].filter(Boolean).join(' ')}
          {...rest}
        />

        {(description || error) && (
          <span className={hasError ? styles.field__error : styles.field__description}>
            {error || description}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
export default Textarea;
