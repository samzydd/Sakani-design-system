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
import styles from './InlineHint.module.css';

export type InlineHintVariant = 'neutral' | 'warning';

export interface InlineHintProps {
  message: string;
  variant?: InlineHintVariant;
  className?: string;
}

const ICON_SIZE = 14;
// Lucide icons are always drawn on a fixed 24-unit grid regardless of the
// requested pixel size -- strokeWidth is defined in that same 24-unit
// space, so rendering at 14px visually scales a "1.5" stroke down to
// ~0.875px (14/24 of it), noticeably thinner than Figma's own 14x14-native
// icon export, which has no such scaling and renders a true 1.5px line.
// Scaling strokeWidth up by 24/size compensates so the rendered stroke
// actually measures 1.5px, matching Figma exactly.
const ICON_STROKE_WIDTH = 1.5 * (24 / ICON_SIZE);

export const InlineHint: React.FC<InlineHintProps> = ({ message, variant = 'neutral', className }) => {
  const isWarning = variant === 'warning';
  const Icon = isWarning ? TriangleAlert : Info;

  return (
    <div className={[styles.hint, styles[`hint--${variant}`], className ?? ''].filter(Boolean).join(' ')}>
      <span className={styles.bar} aria-hidden="true" />
      <Icon size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} className={styles.icon} />
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default InlineHint;
