/**
 * Textarea
 *
 * Multi-line text input. Matches Figma "Textarea" parent component:
 *   State (Default|Focus|Error|Disabled|Filled), Title/Description toggles.
 *
 * Exact Figma spec:
 *   - Field: vertical, 6px gap
 *   - Label: label/md (14px/500, fg/default)
 *   - Box: bg/surface, border/default 1px, radius-md, padding 10/14, min-height 84px
 *   - Value/placeholder: body/sm (14px/500, fg/subtle placeholder / fg/default value)
 *   - Description: body/xs (13px, fg/muted)
 */

import React from 'react';
import styles from './Textarea.module.css';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  description?: string;
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
