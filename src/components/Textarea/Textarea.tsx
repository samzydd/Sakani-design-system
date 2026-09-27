/**
 * Textarea
 *
 * Multi-line text input. Matches Figma "Textarea" parent component:
 *   State (Default|Focus|Error|Disabled|Filled), Title/Description toggles.
 *
 * Exact Figma spec:
 *   - Field: vertical, 6px gap
 *   - Label: label/md (14px/500, fg/default)
 *   - Box: bg/surface, border/default 1px, radius-md, padding 10/14, 84px tall
 *   - Value/placeholder: body/sm (14px/500, fg/subtle placeholder / fg/default value)
 *   - Description: body/xs (13px/500, fg/muted)
 *   - Focus: border/default + shadow/sm, matching Input's own focus-within
 *     (a deliberate departure from Figma's raw brand-colored focus stroke)
 *   - Error: danger/solid 1.5px, adding shadow/sm too if focused
 *   - Disabled: bg/subtle, border/subtle, 60% opacity
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
  // rows=3 is what lands on Figma's 84px box (3 x 20px lines + 10/10 padding);
  // the old default of 4 rendered 102px, so min-height never applied.
  ({ label, description, error, disabled, id, className, rows = 3, ...rest }, ref) => {
    const reactId = React.useId();
    const areaId = id ?? reactId;
    const hasError = Boolean(error);
    const descId = description || error ? `${areaId}-desc` : undefined;

    return (
      <div className={[styles.field, className ?? ''].filter(Boolean).join(' ')}>
        {label && <label htmlFor={areaId} className={styles.field__label}>{label}</label>}

        <textarea
          ref={ref}
          id={areaId}
          rows={rows}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={descId}
          className={[
            styles.textarea,
            hasError ? styles['textarea--error'] : '',
            disabled ? styles['textarea--disabled'] : '',
          ].filter(Boolean).join(' ')}
          {...rest}
        />

        {(description || error) && (
          <span id={descId} className={hasError ? styles.field__error : styles.field__description}>
            {error || description}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
export default Textarea;
