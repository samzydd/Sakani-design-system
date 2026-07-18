/**
 * Alert
 *
 * Inline status message. Matches Figma "Alert" set:
 *   Color (Info|Success|Warning|Danger|Neutral), Title/Description toggles.
 *
 * Figma spec: radius-md (8), padding 14/16, gap 12, per-color bg + border + icon tokens.
 * Each color has a leading status icon tinted with its {color}/fg token.
 */

import React from 'react';
import styles from './Alert.module.css';

export type AlertColor = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

export interface AlertProps {
  /** Figma Color axis. Defaults to "info". */
  color?: AlertColor;
  title?: string;
  description?: string;
  /** Override the default status icon. */
  icon?: React.ReactNode;
  className?: string;
}

/* Default status icons per color (Lucide-style paths). */
const icons: Record<AlertColor, React.ReactNode> = {
  info: <><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></>,
  success: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>,
  warning: <><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></>,
  danger: <><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></>,
  neutral: <><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></>,
};

export const Alert: React.FC<AlertProps> = ({
  color = 'info', title, description, icon, className,
}) => (
  <div
    role="alert"
    className={[styles.alert, styles[`alert--${color}`], className ?? ''].filter(Boolean).join(' ')}
  >
    <span className={styles.alert__icon} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
        strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
        {icon ?? icons[color]}
      </svg>
    </span>

    <div className={styles.alert__content}>
      {title && <div className={styles.alert__title}>{title}</div>}
      {description && <div className={styles.alert__description}>{description}</div>}
    </div>
  </div>
);

export default Alert;
