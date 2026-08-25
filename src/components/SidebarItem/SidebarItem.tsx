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
 *   - Active/Active Hover: bg/surface card + soft shadow (0 1px 1px rgba(16,15,12,.06),
 *       0 1px 1.5px rgba(16,15,12,.1)) — re-read from Figma 2026-08-06, replaces the
 *       older accent/subtle tinted background. icon+label fg/default,
 *       badge bg accent/default + fg/on-accent text, chevron accent-tinted
 *   - Disabled: fg/subtle
 *
 * Dark mode: all colors are semantic tokens, so the .dark class re-themes automatically.
 */

import React from 'react';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import { iconStrokeWidth } from '../../lib/iconStrokeWidth';
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
  /** Native title-attribute tooltip on collapse. Defaults to true; set
   * false when the caller already wraps this in its own Tooltip component
   * to avoid the two competing on hover. */
  nativeTooltip?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon, label, active, disabled, badge, hasSubmenu, collapsed, onClick, href, nativeTooltip = true,
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

      {Icon && <span className={styles.item__icon} aria-hidden="true"><Icon size={18} strokeWidth={iconStrokeWidth(18)} /></span>}
      <span className={[styles.item__label, collapsed ? styles['item__label--collapsed'] : ''].filter(Boolean).join(' ')}>{label}</span>
      {!collapsed && badge && <span className={styles.item__badge}>{badge}</span>}
      {!collapsed && hasSubmenu && (
        <span className={styles.item__chevron} aria-hidden="true"><ChevronRight size={16} strokeWidth={iconStrokeWidth(16)} /></span>
      )}
    </>
  );

  const common = {
    className: cls,
    title: collapsed && nativeTooltip ? label : undefined,
    // Collapsed items have no visible text — keep an accessible name for
    // screen readers even when the native title tooltip is suppressed in
    // favor of a caller-supplied Tooltip component.
    'aria-label': collapsed ? label : undefined,
    'aria-current': active ? ('page' as const) : undefined,
  };
  if (href && !disabled) return <a href={href} {...common}>{content}</a>;
  return <button type="button" disabled={disabled} onClick={onClick} {...common}>{content}</button>;
};

export default SidebarItem;
