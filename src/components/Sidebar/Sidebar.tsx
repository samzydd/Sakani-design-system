/**
 * Sidebar (container)
 *
 * The shell that sidebar parts compose into. Matches Figma "Sidebar":
 * 248px expanded / 64px collapsed, no fill and no border (re-read from Figma
 * 2026-08-06 — was incorrectly bg/surface + border/default right edge before), padding 12, gap 2.
 *
 * Compose with the standalone parts: SidebarHeader, SidebarSearch, SidebarItem,
 * SidebarSubItem, SidebarGroupLabel, SidebarDivider, SidebarPromo, SidebarFooter.
 */

import React from 'react';
import styles from './Sidebar.module.css';

export interface SidebarProps {
  collapsed?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed = false, children, className }) => (
  <nav
    className={[styles.sidebar, collapsed ? styles['sidebar--collapsed'] : '', className ?? ''].filter(Boolean).join(' ')}
    data-collapsed={collapsed}
  >
    {children}
  </nav>
);

export default Sidebar;
