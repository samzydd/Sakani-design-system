/**
 * SidebarGroupLabel
 *
 * Section heading. Matches Figma "Sidebar Group Label":
 * padding 8/10/4, overline text style, fg/subtle, uppercase.
 */

import React from 'react';
import styles from './SidebarGroupLabel.module.css';

export interface SidebarGroupLabelProps {
  children: React.ReactNode;
}

export const SidebarGroupLabel: React.FC<SidebarGroupLabelProps> = ({ children }) => (
  <div className={styles.groupLabel}>{children}</div>
);

export default SidebarGroupLabel;
