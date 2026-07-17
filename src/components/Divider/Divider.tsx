/**
 * Divider
 *
 * Visual separator. Horizontal (default) or vertical.
 * Optional label sits centred in the line — common for "or" dividers in auth forms.
 */

import React from 'react';
import styles from './Divider.module.css';

export interface DividerProps {
  /** Horizontal (default) or vertical orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Optional text label centred on the line */
  label?: string;
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  label,
  className,
}) => (
  <div
    role="separator"
    aria-orientation={orientation}
    className={[
      styles.divider,
      styles[`divider--${orientation}`],
      label ? styles['divider--labeled'] : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {/* Optional centred label */}
    {label && orientation === 'horizontal' && (
      <span className={styles.divider__label}>{label}</span>
    )}
  </div>
);

export default Divider;
