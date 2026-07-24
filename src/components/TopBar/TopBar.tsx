/**
 * TopBar
 *
 * Application top bar — sits beside the Sidebar (1440 − 248 = 1192 default,
 * but stretches to fill). Matches the Figma "Top bar" set:
 *
 *   type    (Figma "Type" axis)    -> search | breadcrumb | tabs | minimal
 *   density (Figma "Density" axis) -> md (64px) | sm (56px)
 *
 * Layout: sidebar toggle · type-specific left region · flex spacer ·
 * help · notifications (with unread dot) · divider · account (opens Menu).
 * Slots (left, actions, account) are composed by the caller.
 */

import React from 'react';
import { PanelLeft, CircleHelp, Bell } from 'lucide-react';
import styles from './TopBar.module.css';

export type TopBarType = 'search' | 'breadcrumb' | 'tabs' | 'minimal';
export type TopBarDensity = 'md' | 'sm';

export interface TopBarProps {
  type?: TopBarType;
  density?: TopBarDensity;
  /** The left region: Input (search), Breadcrumb, Tabs, or a title node. */
  left?: React.ReactNode;
  /** Show the sidebar toggle. Defaults to true. */
  showToggle?: boolean;
  onToggle?: () => void;
  /** Show help + notification icons. Defaults to true. */
  showActions?: boolean;
  hasUnread?: boolean;
  /** Account cluster (Avatar + chevron) that opens a Menu. */
  account?: React.ReactNode;
  className?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  type = 'search',
  density = 'md',
  left,
  showToggle = true,
  onToggle,
  showActions = true,
  hasUnread = false,
  account,
  className,
}) => (
  <header className={[styles.bar, styles[`bar--${density}`], className ?? ''].filter(Boolean).join(' ')}>
    {showToggle && (
      <button type="button" className={styles.bar__icon} onClick={onToggle} aria-label="Toggle sidebar">
        <PanelLeft size={density === 'md' ? 20 : 18} />
      </button>
    )}
    <div className={styles.bar__left} data-type={type}>{left}</div>
    <div className={styles.bar__spacer} />
    {showActions && (
      <>
        <button type="button" className={styles.bar__icon} aria-label="Help">
          <CircleHelp size={density === 'md' ? 20 : 18} />
        </button>
        <button type="button" className={styles.bar__icon} aria-label="Notifications">
          <span className={styles.bar__bell}>
            <Bell size={density === 'md' ? 20 : 18} />
            {hasUnread && <span className={styles.bar__dot} aria-hidden="true" />}
          </span>
        </button>
        <span className={styles.bar__divider} />
      </>
    )}
    {account && <div className={styles.bar__account}>{account}</div>}
  </header>
);

export default TopBar;
