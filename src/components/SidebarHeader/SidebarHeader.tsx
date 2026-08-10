/**
 * SidebarHeader
 *
 * Matches Figma "Sidebar Header": Type (Brand | Workspace | Brand + Toggle) x Collapsed.
 * Figma spec: padding 6/4, gap 10, title label/md-strong (fg/default), subtitle caption (fg/muted).
 */

import React from 'react';
import { PanelLeftClose, type LucideIcon } from 'lucide-react';
import styles from './SidebarHeader.module.css';

export type SidebarHeaderType = 'brand' | 'workspace' | 'brand-toggle';

export interface SidebarHeaderProps {
  type?: SidebarHeaderType;
  title: string;
  subtitle?: string;
  /** Logo/brand mark (Lucide icon or any node). */
  logo?: React.ReactNode;
  collapsed?: boolean;
  onToggle?: () => void;
  /** Icon for the toggle button. Defaults to PanelLeftClose. */
  toggleIcon?: LucideIcon;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  type = 'brand', title, subtitle, logo, collapsed, onToggle, toggleIcon: ToggleIcon = PanelLeftClose,
}) => (
  <div className={[styles.header, collapsed ? styles['header--collapsed'] : ''].filter(Boolean).join(' ')}>
    {logo && (
      collapsed && type === 'brand-toggle' && onToggle ? (
        <button type="button" className={styles.header__logoWrap} onClick={onToggle} aria-label="Expand sidebar">
          <span className={styles.header__logo}>{logo}</span>
          <span className={styles.header__logoToggle} aria-hidden="true">
            <ToggleIcon size={16} strokeWidth={1.5} />
          </span>
        </button>
      ) : (
        <span className={styles.header__logoWrap} aria-hidden="true">
          <span className={styles.header__logo}>{logo}</span>
        </span>
      )
    )}
    {!collapsed && (
      <span className={styles.header__text}>
        <span className={styles.header__title}>{title}</span>
        {(type === 'workspace' || subtitle) && subtitle && (
          <span className={styles.header__subtitle}>{subtitle}</span>
        )}
      </span>
    )}
    {!collapsed && type === 'brand-toggle' && (
      <button type="button" className={styles.header__toggle} onClick={onToggle} aria-label="Collapse sidebar">
        <ToggleIcon size={18} strokeWidth={1.5} />
      </button>
    )}
  </div>
);

export default SidebarHeader;
