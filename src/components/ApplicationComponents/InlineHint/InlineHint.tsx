/**
 * InlineHint
 *
 * Small inline helper text with a colored accent bar. Matches Figma
 * "Inline Hint": Neutral (info-solid bar + Info icon, fg/muted text) and
 * Warning (warning-solid bar + TriangleAlert icon, fg/default text -- the
 * darker text is the deliberate emphasis bump for the more serious tone).
 *
 * The accent bar isn't a reuse of Divider -- Divider is bound to the
 * neutral border token, not the per-variant status colors this needs, so
 * reusing it would mean overriding its one styled property anyway. Same
 * call already made for ActivityFeed's rail connector.
 */

import React from 'react';
import { Info, TriangleAlert } from 'lucide-react';
import { iconStrokeWidth } from '../../../lib/iconStrokeWidth';
import styles from './InlineHint.module.css';

export type InlineHintVariant = 'neutral' | 'warning';

export interface InlineHintProps {
  message: string;
  variant?: InlineHintVariant;
  className?: string;
}

const ICON_SIZE = 14;

export const InlineHint: React.FC<InlineHintProps> = ({ message, variant = 'neutral', className }) => {
  const isWarning = variant === 'warning';
  const Icon = isWarning ? TriangleAlert : Info;

  return (
    <div className={[styles.hint, styles[`hint--${variant}`], className ?? ''].filter(Boolean).join(' ')}>
      <span className={styles.bar} aria-hidden="true" />
      <Icon size={ICON_SIZE} strokeWidth={iconStrokeWidth(ICON_SIZE)} className={styles.icon} />
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default InlineHint;
