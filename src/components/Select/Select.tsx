/**
 * Select
 *
 * Native select dropdown. Matches Figma "Select" parent component:
 *   Size (sm|md|lg) x State (Default|Open|Disabled|Filled), Title/Description toggles.
 *
 * Exact Figma spec:
 *   - Heights: sm 32 · md 40 · lg 48
 *   - Padding: left 14px, right 12px (tighter for chevron); vertical per size
 *   - Label: label/md · Placeholder/value: body/sm (fg/subtle / fg/default)
 *   - Chevron: 16px, fg/muted · radius-md · border/subtle 1px
 *   - "Open" is browser-native, so not a code prop.
 */

import React from 'react';
import styles from './Select.module.css';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  description?: string;
  error?: string;
  size?: SelectSize;
  placeholder?: string;
  options: SelectOption[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, description, error, size = 'md', placeholder, options, disabled, id, className, defaultValue, value, ...rest }, ref) => {
    const reactId = React.useId();
    const selectId = id ?? reactId;
    const hasError = Boolean(error);

    return (
      <div className={[styles.field, className ?? ''].filter(Boolean).join(' ')}>
        {label && <label htmlFor={selectId} className={styles.field__label}>{label}</label>}

        <div
          className={[
            styles.select,
            styles[`select--${size}`],
            hasError ? styles['select--error'] : '',
            disabled ? styles['select--disabled'] : '',
          ].filter(Boolean).join(' ')}
        >
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            className={styles.select__control}
            defaultValue={defaultValue ?? (placeholder ? '' : undefined)}
            value={value}
            {...rest}
          >
            {placeholder && <option value="" disabled>{placeholder}</option>}
            {options.map((o) => (
              <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>
            ))}
          </select>

          <span className={styles.select__chevron} aria-hidden="true">
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </div>

        {(description || error) && (
          <span className={hasError ? styles.field__error : styles.field__description}>
            {error || description}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;
