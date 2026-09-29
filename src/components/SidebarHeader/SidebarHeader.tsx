/**
 * SidebarHeader
 *
 * Matches Figma "Sidebar Header": Type (Brand | Workspace | Brand + Toggle) x Collapsed.
 * Figma spec: padding 6/4, gap 10, title label/md-strong (fg/default), subtitle caption (fg/muted).
 *
 * Workspace type (re-read 2026-09-29 from the main component): a switcher —
 * bg/subtle fill, radius-sm (6), padding 8, 10/14 subtitle, and a trailing
 * chevrons-up-down (fg/muted, 16) that the code version was missing.
 */

import React from 'react';
import { PanelLeftClose, ChevronsUpDown, type LucideIcon } from 'lucide-react';
import { iconStrokeWidth } from '../../lib/iconStrokeWidth';
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
  <div className={[styles.header, type === 'workspace' ? styles['header--workspace'] : '', collapsed ? styles['header--collapsed'] : ''].filter(Boolean).join(' ')}>
    {logo && (
      collapsed && type === 'brand-toggle' && onToggle ? (
        <button type="button" className={styles.header__logoWrap} onClick={onToggle} aria-label="Expand sidebar">
          <span className={styles.header__logo}>
            <span className={styles.header__logoContent}>{logo}</span>
            <span className={styles.header__logoIcon} aria-hidden="true">
              <ToggleIcon size={16} strokeWidth={iconStrokeWidth(16)} />
            </span>
          </span>
        </button>
      ) : (
        <span className={styles.header__logoWrap} aria-hidden="true">
          <span className={styles.header__logo}>{logo}</span>
        </span>
      )
    )}
    <span className={[styles.header__text, collapsed ? styles['header__text--collapsed'] : ''].filter(Boolean).join(' ')}>
      <span className={styles.header__title}>{title}</span>
      {(type === 'workspace' || subtitle) && subtitle && (
        <span className={styles.header__subtitle}>{subtitle}</span>
      )}
    </span>
    {!collapsed && type === 'workspace' && (
      <span className={styles.header__switch} aria-hidden="true">
        <ChevronsUpDown size={16} strokeWidth={iconStrokeWidth(16)} />
      </span>
    )}
    {!collapsed && type === 'brand-toggle' && (
      <button type="button" className={styles.header__toggle} onClick={onToggle} aria-label="Collapse sidebar">
        <ToggleIcon size={18} strokeWidth={iconStrokeWidth(18)} />
      </button>
    )}
  </div>
);

export default SidebarHeader;
