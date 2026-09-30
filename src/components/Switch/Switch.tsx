/**
 * Switch
 *
 * Toggle switch. Matches Figma "Switch" set (SW axis): Off | On | Disabled.
 * Track spec from Figma: 36x20, radius-full, bg/muted (off) / accent/default (on).
 */

import React from 'react';
import styles from './Switch.module.css';

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Optional label rendered to the right of the switch. */
  label?: string;
  /** Help text under the label, left-aligned with it (not with the track),
   *  e.g. the current state of a controlled switch. Same pattern as
   *  Checkbox's description. */
  description?: React.ReactNode;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, description, disabled, id, className, ...rest }, ref) => {
    const reactId = React.useId();
    const switchId = id ?? reactId;

    return (
      <label
        htmlFor={switchId}
        className={[
          styles.wrapper,
          description ? styles['wrapper--withDescription'] : '',
          disabled ? styles['wrapper--disabled'] : '',
          className ?? '',
        ].filter(Boolean).join(' ')}
      >
        <input
          ref={ref}
          id={switchId}
          type="checkbox"
          role="switch"
          disabled={disabled}
          className={styles.input}
          {...rest}
        />

        {/* Track + thumb */}
        <span className={styles.track} aria-hidden="true">
          <span className={styles.thumb} />
        </span>

        {description ? (
          <span className={styles.text}>
            {label && <span className={styles.label}>{label}</span>}
            <span className={styles.description}>{description}</span>
          </span>
        ) : (
          label && <span className={styles.label}>{label}</span>
        )}
      </label>
    );
  }
);

Switch.displayName = 'Switch';
export default Switch;
