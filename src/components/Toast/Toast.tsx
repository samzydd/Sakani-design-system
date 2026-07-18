/**
 * Toast
 *
 * Transient notification. Matches Figma "Toast" set:
 *   Status (Success|Error|Info), Title/Description toggles.
 *
 * Figma spec: bg/surface, border/subtle 1px, radius-md, padding 14/12/14/14, gap 12,
 * shadow/lg. A leading status icon is tinted per status; optional dismiss button.
 * This is the presentational Toast; queueing/positioning is left to the app.
 */

import React from 'react';
import styles from './Toast.module.css';

export type ToastStatus = 'success' | 'error' | 'info';

export interface ToastProps {
  /** Figma Status axis. Defaults to "info". */
  status?: ToastStatus;
  title?: string;
  description?: string;
  /** Called when the dismiss (x) button is clicked. Hides the button if omitted. */
  onDismiss?: () => void;
  className?: string;
}

const icons: Record<ToastStatus, React.ReactNode> = {
  success: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>,
  error: <><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></>,
  info: <><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></>,
};

export const Toast: React.FC<ToastProps> = ({
  status = 'info', title, description, onDismiss, className,
}) => (
  <div
    role="status"
    className={[styles.toast, styles[`toast--${status}`], className ?? ''].filter(Boolean).join(' ')}
  >
    <span className={styles.toast__icon} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
        strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
        {icons[status]}
      </svg>
    </span>

    <div className={styles.toast__content}>
      {title && <div className={styles.toast__title}>{title}</div>}
      {description && <div className={styles.toast__description}>{description}</div>}
    </div>

    {onDismiss && (
      <button type="button" className={styles.toast__dismiss} onClick={onDismiss} aria-label="Dismiss">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
          strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    )}
  </div>
);

export default Toast;
