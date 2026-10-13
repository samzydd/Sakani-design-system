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
  /** `stretch` adds a liquid motion: the thumb stretches as it travels, then
   *  settles to a circle. `default` is the plain switch.
   *  Figma: Switch, Type axis. */
  variant?: 'default' | 'stretch';
}

/* Stretch variant geometry (track 36px, thumb 16px, 2px inset). */
const THUMB = 16;
const LEFT_OFF = 2;
const LEFT_ON = 18;
const STRETCH_MS = 360;
const STEPS = 16;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
/** The tail waits a beat, then catches up. */
const TAIL_DELAY = 0.16;

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, description, disabled, id, className, onChange, variant = 'default', ...rest }, ref) => {
    const reactId = React.useId();
    const switchId = id ?? reactId;
    const thumbRef = React.useRef<HTMLSpanElement>(null);

    // Stretch variant only. One motion, no CSS transition and no overshoot: the
    // edge the thumb is travelling toward moves first (ease-out) and the other
    // edge follows a beat later, so it stretches then relaxes into a circle.
    // Both edges only ever move toward their destination, so the thumb stays
    // inside the track. It starts from where the thumb visibly is, so a click
    // mid-travel reverses smoothly instead of jumping. Web Animations on
    // `translate` + `width` (the state itself is set by CSS and applies at once);
    // off with reduced motion.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      const thumb = thumbRef.current;
      if (variant !== 'stretch' || !thumb || typeof thumb.animate !== 'function') return;
      if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
      const toOn = e.target.checked;
      // Visual start, in track coordinates (animated values, if one is in flight).
      const cs = getComputedStyle(thumb);
      const tx = parseFloat(cs.translate) || 0;
      const w = parseFloat(cs.width) || THUMB;
      const startLeft = (toOn ? LEFT_OFF : LEFT_ON) + tx;
      const startRight = startLeft + w;
      const endLeft = toOn ? LEFT_ON : LEFT_OFF;
      const endRight = endLeft + THUMB;
      thumb.getAnimations().forEach((a) => a.cancel());
      const frames: Keyframe[] = [];
      for (let i = 0; i <= STEPS; i++) {
        const t = i / STEPS;
        const lead = easeOutCubic(t);
        const tail = easeOutCubic(Math.min(1, Math.max(0, (t - TAIL_DELAY) / (1 - TAIL_DELAY))));
        const left = startLeft + (endLeft - startLeft) * (toOn ? tail : lead);
        const right = startRight + (endRight - startRight) * (toOn ? lead : tail);
        frames.push({ width: `${right - left}px`, translate: `${left - endLeft}px 0`, offset: t });
      }
      thumb.animate(frames, { duration: STRETCH_MS, easing: 'linear' });
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
