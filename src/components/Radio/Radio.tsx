/**
 * Radio
 *
 * Single radio button. Matches Figma "Radio" set:
 * Unchecked | Hover | Checked | Disabled, with Title/Description toggles.
 *
 * Hover is a CSS :hover state, not a prop.
 * Use multiple Radios sharing the same `name` to form a group.
 */

import React from 'react';
import styles from './Radio.module.css';

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, disabled, id, className, ...rest }, ref) => {
    const reactId = React.useId();
    const radioId = id ?? reactId;

    return (
      <label
        htmlFor={radioId}
        className={[
          styles.wrapper,
          disabled ? styles['wrapper--disabled'] : '',
          className ?? '',
        ].filter(Boolean).join(' ')}
      >
        <input
          ref={ref}
          id={radioId}
          type="radio"
          disabled={disabled}
          className={styles.input}
          {...rest}
        />

        {/* Custom circle with inner dot */}
        <span className={styles.circle} aria-hidden="true">
          <span className={styles.dot} />
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

Radio.displayName = 'Radio';
export default Radio;
