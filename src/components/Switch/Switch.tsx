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
  /** `stretch` adds a liquid motion: the thumb stretches while pressed and as it
   *  travels, then settles to a circle. `default` is the plain switch.
   *  Figma: Switch, Type axis. */
  variant?: 'default' | 'stretch';
}

/** How far the tail lags behind the leading edge at the stretch's peak, in px (16 -> 24). */
const STRETCH_LAG = 8;
const STRETCH_MS = 460;

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, description, disabled, id, className, onChange, variant = 'default', ...rest }, ref) => {
    const reactId = React.useId();
    const switchId = id ?? reactId;
    const thumbRef = React.useRef<HTMLSpanElement>(null);

    // Stretch variant only. On every toggle the thumb stretches like a drop of liquid: the leading
    // edge rides the CSS spring across while the tail lags behind, then catches
    // up. The lag is bounded by how far the thumb has travelled (it can never
    // be longer than that), so the stretch stays inside the track. Web
    // Animations rather than a class so rapid clicks restart cleanly; they layer
    // on top of the spring through `width` and the individual `translate`
    // property, not `transform`. Off with reduced motion.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      const thumb = thumbRef.current;
      if (variant !== 'stretch' || !thumb || typeof thumb.animate !== 'function') return;
      if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
      const toOn = e.target.checked;
      thumb.animate(
        [
          {
            width: `${16 + STRETCH_LAG}px`,
            // Moving right the left edge is the tail: pull it back by the lag.
            // Moving left the right edge is the tail, which widening already does.
            translate: toOn ? `${-STRETCH_LAG}px 0` : '0px 0',
            offset: 0.3,
          },
          { width: '16px', translate: '0px 0' },
        ],
        { duration: STRETCH_MS, easing: 'cubic-bezier(0.3, 0, 0.2, 1)' },
      );
    };

    return (
      <label
        htmlFor={switchId}
        className={[
          styles.wrapper,
          variant === 'stretch' ? styles['wrapper--stretch'] : '',
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
          onChange={handleChange}
          {...rest}
        />

        {/* Track + thumb */}
        <span className={styles.track} aria-hidden="true">
          <span ref={thumbRef} className={styles.thumb} />
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
