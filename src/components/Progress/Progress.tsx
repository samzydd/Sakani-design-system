/**
 * Progress
 *
 * Linear progress bar. Two modes:
 *   - Determinate: pass value (0–100) to show completion percentage
 *   - Indeterminate: omit value for an animated scanning bar (e.g. page loading)
 *
 * Size axis → size prop (sm | md | lg) controls track height
 */

import React from 'react';
import styles from './Progress.module.css';

export type ProgressSize = 'sm' | 'md' | 'lg';

export interface ProgressProps {
  /** 0–100. Omit for indeterminate mode. */
  value?: number;
  size?: ProgressSize;
  /** Accessible label */
  label?: string;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  size = 'md',
  label = 'Progress',
  className,
}) => {
  const isIndeterminate = value === undefined;
  const clampedValue    = Math.min(100, Math.max(0, value ?? 0));

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={isIndeterminate ? undefined : clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      className={[
        styles.progress,
        styles[`progress--${size}`],
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Fill bar — width driven by CSS custom property for smooth transitions */}
      <div
        className={[
          styles.progress__fill,
          isIndeterminate ? styles['progress__fill--indeterminate'] : '',
        ]
          .filter(Boolean)
          .join(' ')}
        style={isIndeterminate ? undefined : { width: `${clampedValue}%` }}
      />
    </div>
  );
};

export default Progress;
