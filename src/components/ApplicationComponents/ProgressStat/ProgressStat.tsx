/**
 * ProgressStat
 *
 * Label + value row above a progress bar. Matches Figma "Progress Stat" --
 * its two style previews ("Percentage": "Profile completion" / "80%",
 * "Value": "Storage used" / "24 GB / 30 GB") turn out to be the exact same
 * structure with different sample data, not a real variant, so there's no
 * variant prop at all here: `value` is just whatever formatted string the
 * caller wants shown, and `progress` (0-100) drives the bar independently.
 *
 * The bar reuses the existing Progress component (size="lg" matches
 * Figma's 8px track height, fill already binds to accent/default) rather
 * than a bespoke one, same reuse already made for Expenses -- accepting
 * its bg/subtle track over Figma's literal bg/canvas here for the same
 * reason: barely distinguishable off-whites, and Progress has no
 * style-override prop to fix it without gambling on CSS cascade order.
 */

import React from 'react';
import { Progress } from '../../Progress';
import styles from './ProgressStat.module.css';

export interface ProgressStatProps {
  label: string;
  /** Formatted value shown on the right, e.g. "80%" or "24 GB / 30 GB". */
  value: string;
  /** 0-100, drives the bar fill. */
  progress: number;
  className?: string;
}

export const ProgressStat: React.FC<ProgressStatProps> = ({ label, value, progress, className }) => (
  <div className={[styles.stat, className ?? ''].filter(Boolean).join(' ')}>
    <div className={styles.labelRow}>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
    </div>
    <Progress value={progress} size="lg" label={label} />
  </div>
);

export default ProgressStat;
