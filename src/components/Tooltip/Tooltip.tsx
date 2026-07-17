/**
 * Tooltip
 *
 * Hover/focus tooltip with optional title + subtitle and 8 pointer positions.
 * Matches Figma "Tooltip" set:
 *   Pointer (Top Left|Top Center|Top Right|Bottom Left|Bottom Center|Bottom Right|Center Left|Center Right)
 *   Title/Subtitle toggles.
 *
 * Exact Figma spec:
 *   bubble: bg/inverse, radius-md (8), padding 8/12, gap 2
 *   title: label/sm-strong, fg/on-inverse · subtitle: body/2xs, fg/on-inverse
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
}) => (
  <span className={[styles.wrapper, className ?? ''].filter(Boolean).join(' ')}>
    {children}

    {/* Bubble — shown on hover/focus of the wrapper via CSS */}
    <span
      role="tooltip"
      className={[styles.bubble, styles[`bubble--${pointer}`]].join(' ')}
    >
      <span className={styles.bubble__title}>{title}</span>
      {subtitle && <span className={styles.bubble__subtitle}>{subtitle}</span>}
    </span>
  </span>
);

export default Tooltip;
