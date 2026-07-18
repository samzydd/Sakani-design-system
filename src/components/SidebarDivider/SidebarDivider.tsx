/**
 * SidebarDivider
 *
 * Horizontal rule between sections. Matches Figma "Sidebar Divider":
 * border/subtle, full width, small vertical margin.
 */

import React from 'react';
import styles from './SidebarDivider.module.css';

export const SidebarDivider: React.FC = () => <div className={styles.divider} role="separator" />;

export default SidebarDivider;
