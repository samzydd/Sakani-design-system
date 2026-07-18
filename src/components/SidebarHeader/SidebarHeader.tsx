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
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  type = 'brand', title, subtitle, logo, collapsed, onToggle,
}) => (
  <div className={[styles.header, collapsed ? styles['header--collapsed'] : ''].filter(Boolean).join(' ')}>
    {logo && <span className={styles.header__logo} aria-hidden="true">{logo}</span>}
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
        <PanelLeftClose size={18} strokeWidth={1.5} />
      </button>
    )}
  </div>
);

export default SidebarHeader;
