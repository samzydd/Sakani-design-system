/**
 * Spinner
 *
 * Animated loading indicator. Inherits currentColor so it works on any background.
 * Use inside buttons (loading state) or as a standalone page/section loader.
 *
 * Size axis → size prop (sm | md | lg)
 */

import React from 'react';
import styles from './Spinner.module.css';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps {
  size?: SpinnerSize;
  /** Accessible label for screen readers */
  label?: string;
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  label = 'Loading…',
  className,
}) => (
  <span
    role="status"
    aria-label={label}
    className={[styles.spinner, styles[`spinner--${size}`], className ?? ''].filter(Boolean).join(' ')}
  >
    {/* SVG circle with a dash-offset animation — no images, no GIFs */}
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      aria-hidden="true"
      className={styles.spinner__svg}
    >
      {/* Track */}
      <circle cx={12} cy={12} r={9} opacity={0.2} />
      {/* Arc */}
      <path d="M12 3a9 9 0 0 1 9 9" className={styles.spinner__arc} />
    </svg>
  </span>
);

export default Spinner;
