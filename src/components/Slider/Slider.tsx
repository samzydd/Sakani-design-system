/**
 * Slider
 *
 * Range slider. Figma "Slider" is a single component; this implements a
 * functional controlled/uncontrolled range input styled to the token system.
 *
 * The filled portion is driven by a CSS custom property (--pct) updated on input,
 * so the track fills up to the thumb using accent/default.
 */

import React from 'react';
import styles from './Slider.module.css';

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  /** Show the current value to the right of the label. */
  showValue?: boolean;
  min?: number;
  max?: number;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ label, showValue, min = 0, max = 100, value, defaultValue, disabled, id, className, onChange, ...rest }, ref) => {
    const reactId = React.useId();
    const sliderId = id ?? reactId;

    // Track the value locally so we can render the fill % and the value label
    const initial = Number(value ?? defaultValue ?? min);
    const [internal, setInternal] = React.useState(initial);
    const current = value !== undefined ? Number(value) : internal;
    const pct = ((current - min) / (max - min)) * 100;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) setInternal(Number(e.target.value));
      onChange?.(e);
    };

    return (
      <div className={[styles.field, className ?? ''].filter(Boolean).join(' ')}>
        {(label || showValue) && (
          <div className={styles.header}>
            {label && <label htmlFor={sliderId} className={styles.label}>{label}</label>}
            {showValue && <span className={styles.value}>{current}</span>}
          </div>
        )}

        <input
          ref={ref}
          id={sliderId}
          type="range"
          min={min}
          max={max}
          value={value}
          defaultValue={value === undefined ? defaultValue : undefined}
          disabled={disabled}
          onChange={handleChange}
          className={styles.slider}
          style={{ ['--pct' as string]: `${pct}%` }}
          {...rest}
        />
      </div>
    );
  }
);

Slider.displayName = 'Slider';
export default Slider;
