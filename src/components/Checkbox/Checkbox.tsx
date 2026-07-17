/**
 * Checkbox
 *
 * Matches Figma "Checkbox" set: Unchecked | Checked | Indeterminate | Disabled,
 * with Title/Description toggles (label + description props).
 *
 * Box spec from Figma: 18px, radius 4 (radius-sm), accent/default fill when checked.
 */

import React from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  /** Renders the indeterminate (dash) state. */
  indeterminate?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, indeterminate, disabled, id, className, ...rest }, ref) => {
    const reactId = React.useId();
    const cbId = id ?? reactId;

    // Merge forwarded ref with a local ref so we can set the DOM `indeterminate` property
    const localRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => localRef.current as HTMLInputElement);
    React.useEffect(() => {
      if (localRef.current) localRef.current.indeterminate = Boolean(indeterminate);
    }, [indeterminate]);

    return (
      <label
        htmlFor={cbId}
        className={[
          styles.wrapper,
          disabled ? styles['wrapper--disabled'] : '',
          className ?? '',
        ].filter(Boolean).join(' ')}
      >
        {/* Visually-hidden native input drives state + accessibility */}
        <input
          ref={localRef}
          id={cbId}
          type="checkbox"
          disabled={disabled}
          className={styles.input}
          {...rest}
        />

        {/* Custom box */}
        <span className={styles.box} aria-hidden="true">
          {/* Check icon (shown when :checked via CSS) */}
          <svg className={styles.check} width={12} height={12} viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {/* Indeterminate dash */}
          <span className={styles.dash} />
        </span>

        {(label || description) && (
          <span className={styles.text}>
            {label && <span className={styles.text__label}>{label}</span>}
            {description && <span className={styles.text__description}>{description}</span>}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
export default Checkbox;
