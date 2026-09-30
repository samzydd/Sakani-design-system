/**
 * Slider
 *
 * Range slider. Figma "Slider" is a single component; this implements a
 * functional controlled/uncontrolled range input styled to the token system.
 *
 * The filled portion is driven by a CSS custom property (--pct) updated on input,
 * so the track fills up to the thumb using accent/default.
 *
 * Flinging the thumb into either end plays a very small elastic overshoot:
 * a native range thumb can't travel past its bounds, so the thumb gets a
 * short damped nudge (a few px outward and back) via data-bounce. Only fast
 * arrivals trigger it -- dragging slowly to the end, or stepping with the
 * keyboard, just stops.
 */

/** Arrival speed (fraction of the full range per second) that counts as a fling. */
const FLING_SPEED = 1.2;
const BOUNCE_MS = 460;

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
  ({ label, showValue, min = 0, max = 100, value, defaultValue, disabled, id, className, onChange, ...rest }, forwardedRef) => {
    const reactId = React.useId();
    const sliderId = id ?? reactId;

    // Track the value locally so we can render the fill % and the value label
    const initial = Number(value ?? defaultValue ?? min);
    const [internal, setInternal] = React.useState(initial);
    const current = value !== undefined ? Number(value) : internal;
    const pct = ((current - min) / (max - min)) * 100;

    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const setRef = (el: HTMLInputElement | null) => {
      inputRef.current = el;
      if (typeof forwardedRef === 'function') forwardedRef(el); else if (forwardedRef) forwardedRef.current = el;
    };
    const last = React.useRef<{ v: number; t: number } | null>(null);
    const bounceTimer = React.useRef<number | undefined>(undefined);
    React.useEffect(() => () => window.clearTimeout(bounceTimer.current), []);

    const bounce = (dir: 1 | -1) => {
      const el = inputRef.current;
      if (!el) return;
      el.removeAttribute('data-bounce');
      void el.offsetWidth; // restart the animation if one is already playing
      el.style.setProperty('--bounce-dir', String(dir));
      el.setAttribute('data-bounce', '');
      window.clearTimeout(bounceTimer.current);
      bounceTimer.current = window.setTimeout(() => el.removeAttribute('data-bounce'), BOUNCE_MS);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = Number(e.target.value);
      const now = performance.now();
      const prev = last.current;
      if (prev && (v === max || v === min) && prev.v !== v) {
        const speed = Math.abs(v - prev.v) / (max - min) / Math.max((now - prev.t) / 1000, 0.001);
        if (speed >= FLING_SPEED) bounce(v === max ? 1 : -1);
      }
      last.current = { v, t: now };
      if (value === undefined) setInternal(v);
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
          ref={setRef}
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
