/**
 * Sidebar (container)
 *
 * The shell that sidebar parts compose into. Matches Figma "Sidebar":
 * 248px expanded / 64px collapsed, bg/surface, border/default right edge, padding 12, gap 2.
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
