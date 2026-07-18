/**
 * Tooltip
 *
 * Hover/focus tooltip with a title, optional subtitle, a caret (tail), and
 * 8 pointer positions. Matches Figma "Tooltip" set exactly:
 *   Pointer (Top Left|Top Center|Top Right|Bottom Left|Bottom Center|Bottom Right|Center Left|Center Right)
 *   Title/Subtitle toggles.
 *
 * Figma spec:
 *   bubble: bg/inverse, radius-md (8), padding 8/12, gap 2
 *   title: label/sm-strong (13px/600, fg/on-inverse) · subtitle: body/2xs (12px, fg/on-inverse)
 *   caret: 12x6 for top/bottom, 6x12 for center sides, filled bg/inverse,
 *          offset toward the Left/Center/Right end matching the pointer name.
 *
 * Pure CSS hover/focus — wraps its trigger children.
 */

import React from 'react';
import styles from './Tooltip.module.css';

export type TooltipPointer =
  | 'top-left' | 'top-center' | 'top-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right'
  | 'center-left' | 'center-right';

export interface TooltipProps {
  /** Tooltip title (Figma: Title). */
  title: string;
  /** Optional supporting line (Figma: Subtitle). */
  subtitle?: string;
  /** Pointer position. Maps to Figma Pointer axis. Defaults to "top-center". */
  pointer?: TooltipPointer;
  /** The element the tooltip is attached to. */
  children: React.ReactNode;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  title, subtitle, pointer = 'top-center', children, className,
}) => {
  // WCAG 1.4.13 — hover/focus content must be dismissible without moving the pointer.
  const [dismissed, setDismissed] = React.useState(false);
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setDismissed(true); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);
  return (
  <span
    className={[styles.wrapper, className ?? ''].filter(Boolean).join(' ')}
    data-dismissed={dismissed || undefined}
    onMouseLeave={() => setDismissed(false)}
    onBlur={() => setDismissed(false)}
  >
    {children}

    <span role="tooltip" className={[styles.bubble, styles[`bubble--${pointer}`]].join(' ')}>
      <span className={styles.bubble__title}>{title}</span>
      {subtitle && <span className={styles.bubble__subtitle}>{subtitle}</span>}
      {/* Caret (tail) — a CSS triangle tinted to match the bubble */}
      <span className={[styles.caret, styles[`caret--${pointer}`]].join(' ')} aria-hidden="true" />
    </span>
  </span>
  );
};

export default Tooltip;
