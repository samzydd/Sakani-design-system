/**
 * SidebarItem
 *
 * Primary nav item. Matches Figma "Sidebar Item":
 *   State (Default|Hover|Active|Active Hover|Focus|Disabled) x Collapsed (No|Yes),
 *   with Badge + Submenu-chevron toggles and a swappable Lucide icon (default: house).
 *
 * Figma spec (read from the component, expanded AND collapsed):
 *   - radius-sm (6), padding 6/10 expanded / 8 collapsed, gap 10, label/md
 *   - LEFT ACCENT BAR: 3x20px brand/default rounded pill — present in BOTH expanded
 *     and collapsed layouts, shown when active
 *   - Default/Hover: icon+label fg/muted->fg/default, badge bg/muted + fg/muted text
 *   - Active/Active Hover: bg accent/subtle, icon+label fg/default,
 *       badge bg accent/default + fg/on-accent text, chevron accent-tinted
 *   - Disabled: fg/subtle
 *
 * Dark mode: all colors are semantic tokens, so the .dark class re-themes automatically.
 */

import React from 'react';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import styles from './SidebarItem.module.css';

export interface SidebarItemProps {
  icon?: LucideIcon;
  label: string;
  active?: boolean;
  disabled?: boolean;
  badge?: string;
  hasSubmenu?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
  href?: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon, label, active, disabled, badge, hasSubmenu, collapsed, onClick, href,
}) => {
  const cls = [
    styles.item,
    active ? styles['item--active'] : '',
    disabled ? styles['item--disabled'] : '',
    collapsed ? styles['item--collapsed'] : '',
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {/* Left accent bar — brand/default pill, present in both layouts, visible when active */}
      <span className={styles.item__bar} aria-hidden="true" />

      {Icon && <span className={styles.item__icon} aria-hidden="true"><Icon size={18} strokeWidth={1.5} /></span>}
      {!collapsed && <span className={styles.item__label}>{label}</span>}
      {!collapsed && badge && <span className={styles.item__badge}>{badge}</span>}
      {!collapsed && hasSubmenu && (
        <span className={styles.item__chevron} aria-hidden="true"><ChevronRight size={16} strokeWidth={1.5} /></span>
      )}
    </>
  );

  const common = { className: cls, title: collapsed ? label : undefined, 'aria-current': active ? ('page' as const) : undefined };
  if (href && !disabled) return <a href={href} {...common}>{content}</a>;
  return <button type="button" disabled={disabled} onClick={onClick} {...common}>{content}</button>;
};

export default SidebarItem;
