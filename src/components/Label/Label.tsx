/**
 * Label
 *
 * Form field label with optional required asterisk.
 * Wraps a native <label> so htmlFor wiring works correctly.
 */

import React from 'react';
import styles from './Label.module.css';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Renders a red asterisk after the label text */
  required?: boolean;
  children: React.ReactNode;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ required, children, className, ...rest }, ref) => (
    <label
      ref={ref}
      className={[styles.label, className ?? ''].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
      {/* Required asterisk — hidden from screen readers, shown visually */}
      {required && (
        <span className={styles.label__required} aria-hidden="true"> *</span>
      )}
    </label>
  )
);

Label.displayName = 'Label';
export default Label;
