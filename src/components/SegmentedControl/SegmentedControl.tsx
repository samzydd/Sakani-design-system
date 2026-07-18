/**
 * SegmentedControl
 *
 * iOS-style toggle group. Matches Figma "Segmented Control" (2-6 buttons).
 * Figma spec: track bg/subtle, radius-md, padding 4, gap 2;
 * active segment bg/surface, radius-sm, label/md fg/default; inactive fg/muted.
 */

import React from 'react';
import styles from './SegmentedControl.module.css';

export interface SegmentedOption {
  value: string;
  label: string;
}

export interface SegmentedControlProps {
  options: SegmentedOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options, value, defaultValue, onChange, className,
}) => {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? options[0]?.value);
  const active = isControlled ? value : internal;

  const select = (v: string) => {
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };

  return (
    <div role="tablist" className={[styles.track, className ?? ''].filter(Boolean).join(' ')}>
      {options.map((opt) => {
        const isActive = opt.value === active;
        return (
          <button
            key={opt.value}
            role="tab"
            type="button"
            aria-selected={isActive}
            className={[styles.segment, isActive ? styles['segment--active'] : ''].filter(Boolean).join(' ')}
            onClick={() => select(opt.value)}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

export default SegmentedControl;
