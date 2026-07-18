/**
 * Tabs
 *
 * Horizontal tab navigation. Matches Figma "Tabs" set (2–6 tabs).
 *
 * Figma spec: horizontal row, label/md text (active fg/default, inactive fg/muted),
 * a 2px brand/default underline under the active tab, bottom border on the track.
 * Interaction is real: clicking a tab selects it (controlled or uncontrolled).
 */

import React from 'react';
import styles from './Tabs.module.css';

export interface TabItem {
  /** Unique key/value for the tab. */
  value: string;
  /** Visible label. */
  label: string;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  /** Controlled active value. */
  value?: string;
  /** Uncontrolled initial value. */
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items, value, defaultValue, onChange, className,
}) => {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? items[0]?.value);
  const active = isControlled ? value : internal;

  const select = (v: string) => {
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };

  return (
    <div role="tablist" className={[styles.tabs, className ?? ''].filter(Boolean).join(' ')}>
      {items.map((item) => {
        const isActive = item.value === active;
        return (
          <button
            key={item.value}
            role="tab"
            type="button"
            aria-selected={isActive}
            disabled={item.disabled}
            className={[
              styles.tab,
              isActive ? styles['tab--active'] : '',
              item.disabled ? styles['tab--disabled'] : '',
            ].filter(Boolean).join(' ')}
            onClick={() => select(item.value)}
          >
            {item.label}
            {/* Active underline (brand/default, 2px) */}
            {isActive && <span className={styles.tab__indicator} aria-hidden="true" />}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
