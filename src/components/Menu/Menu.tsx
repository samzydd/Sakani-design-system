/**
 * Menu
 *
 * Dropdown menu container. Matches the Figma "Menu" component:
 * mirrors Combobox Panel exactly — radius 6, padding 4, gap 2,
 * bg/surface, border/default, shadow/lg.
 *
 * Composed from MenuItem children. Use MenuDivider to separate groups.
 * This is a presentational surface; positioning/anchoring is left to the
 * caller (pair with Popover for click-to-open behavior).
 */

import React from 'react';
import styles from './Menu.module.css';

export interface MenuProps {
  children: React.ReactNode;
  /** Accessible label for the menu. */
  'aria-label'?: string;
  /** Minimum width in px. Defaults to 208 (matches Figma). */
  minWidth?: number;
  className?: string;
}

export const Menu: React.FC<MenuProps> = ({ children, minWidth = 208, className, ...rest }) => (
  <div
    role="menu"
    aria-label={rest['aria-label']}
    style={{ minWidth }}
    className={[styles.menu, className ?? ''].filter(Boolean).join(' ')}
  >
    {children}
  </div>
);

export const MenuDivider: React.FC = () => <div className={styles.divider} role="separator" />;

export default Menu;
