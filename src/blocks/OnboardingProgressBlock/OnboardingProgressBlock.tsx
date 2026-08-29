/**
 * OnboardingProgressBlock — Blocks / Application / Progress
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
 * your project and edit it directly.
 *
 * Matches Figma "Progress": "Onboarding progress" heading -> a stack of
 * label/percentage rows over bars. Each row is the existing ProgressStat
 * component reused directly (label-row + Progress bar is exactly its own
 * shape already) -- no new primitives here.
 *
 * `variant` stays an explicit prop (not derived): "Default" wraps the rows
 * in a card with a heading, "Compact" is the bare stack with no card or
 * heading at all -- a real structural difference, same reasoning as
 * ActivityFeed's variant.
 */

import React from 'react';
import { ProgressStat } from '../../components/ApplicationComponents/ProgressStat';
import styles from './OnboardingProgressBlock.module.css';

export interface OnboardingProgressItem {
  label: string;
  /** 0-100. */
  progress: number;
}

export type OnboardingProgressVariant = 'default' | 'compact';

export interface OnboardingProgressBlockProps {
  title?: string;
  items: OnboardingProgressItem[];
  variant?: OnboardingProgressVariant;
  className?: string;
}

export const OnboardingProgressBlock: React.FC<OnboardingProgressBlockProps> = ({
  title = 'Onboarding progress',
  items,
  variant = 'default',
  className,
}) => {
  const isCompact = variant === 'compact';
  const rows = items.map((item) => (
    <ProgressStat key={item.label} label={item.label} value={`${item.progress}%`} progress={item.progress} />
  ));

  if (isCompact) return <div className={[styles.compact, className ?? ''].filter(Boolean).join(' ')}>{rows}</div>;

  return (
    <div className={[styles.card, className ?? ''].filter(Boolean).join(' ')}>
      <h2 className={styles.title}>{title}</h2>
      {rows}
    </div>
  );
};

export default OnboardingProgressBlock;
