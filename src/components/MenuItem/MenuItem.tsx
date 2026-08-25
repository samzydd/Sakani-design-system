/**
 * MenuItem
 *
 * One row of a dropdown Menu. Matches the Figma "Menu Item" set:
 *
 *   state (Figma "State" axis) -> default | checked | disabled | destructive
 *   (Hover is a CSS :hover state, not a prop — mirrors bg/subtle in Figma.)
 *
 * Geometry mirrors Combobox Option exactly: 36px min-height, 8px padding,
 * 8px gap, radius 4. Leading icon + label + optional trailing shortcut.
 * Checked shows a trailing check icon (used for column-visibility toggles).
 */

import React from 'react';
import { Check } from 'lucide-react';
import { iconStrokeWidth } from '../../lib/iconStrokeWidth';
import styles from './MenuItem.module.css';

export type MenuItemState = 'default' | 'checked' | 'disabled' | 'destructive';

export interface MenuItemProps {
  /** Visual state. Maps to Figma State axis. */
  state?: MenuItemState;
  /** Leading icon (any 16px Lucide icon). */
  icon?: React.ReactNode;
  /** Keyboard shortcut hint, right-aligned (e.g. "⌘E"). */
  shortcut?: string;
  children: React.ReactNode;
  onSelect?: () => void;
  className?: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  state = 'default',
  icon,
  shortcut,
  children,
  onSelect,
  className,
}) => {
  const disabled = state === 'disabled';
  return (
    <div
      role="menuitem"
      aria-disabled={disabled || undefined}
      aria-checked={state === 'checked' || undefined}
      tabIndex={disabled ? -1 : 0}
      onClick={disabled ? undefined : onSelect}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect?.(); }
      }}
      className={[styles.item, styles[`item--${state}`], className ?? ''].filter(Boolean).join(' ')}
    >
      {icon && <span className={styles.item__icon} aria-hidden="true">{icon}</span>}
      <span className={styles.item__label}>{children}</span>
      {shortcut && <kbd className={styles.item__shortcut}>{shortcut}</kbd>}
      {state === 'checked' && <Check size={16} strokeWidth={iconStrokeWidth(16)} className={styles.item__check} aria-hidden="true" />}
    </div>
  );
};

export default MenuItem;
