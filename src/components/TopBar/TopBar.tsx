/**
 * TopBar
 *
 * Application top bar — sits beside the Sidebar (1440 − 248 = 1192 default,
 * but stretches to fill). Matches the Figma "Top bar" set:
 *
 *   type    (Figma "Type" axis)    -> search | breadcrumb | tabs | minimal | chat
 *   density (Figma "Density" axis) -> md (64px) | sm (56px)
 *
 * Layout: sidebar toggle · type-specific left region · flex spacer ·
 * help · notifications (with unread dot) · divider · account (opens Menu).
 * Slots (left, actions, account) are composed by the caller.
 */

import React from 'react';
import { PanelLeft, CircleHelp, Bell, ChevronDown, type LucideIcon } from 'lucide-react';
import styles from './TopBar.module.css';

export type TopBarType = 'search' | 'breadcrumb' | 'tabs' | 'minimal' | 'chat';
export type TopBarDensity = 'md' | 'sm';

export interface TopBarProps {
  type?: TopBarType;
  density?: TopBarDensity;
  /** The left region: Input (search), Breadcrumb, Tabs, or a title node. */
  left?: React.ReactNode;
  /** Show the sidebar toggle. Defaults to true. */
  showToggle?: boolean;
  onToggle?: () => void;
  /** Icon for the sidebar toggle button. Defaults to PanelLeft. */
  toggleIcon?: LucideIcon;
  /** Show help + notification icons. Defaults to true. */
  showActions?: boolean;
  hasUnread?: boolean;
  /** Account cluster (Avatar + chevron) that opens a Menu. */
  account?: React.ReactNode;
  /** type="chat" — conversation avatar. */
  avatar?: React.ReactNode;
  /** type="chat" — conversation name. */
  title?: React.ReactNode;
  /** type="chat" — presence or status line under the name. */
  subtitle?: React.ReactNode;
  /** type="chat" — trailing action buttons (call, video, search…). */
  actions?: React.ReactNode;
  className?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  type = 'search',
  density = 'md',
  left,
  showToggle = true,
  onToggle,
  toggleIcon: ToggleIcon = PanelLeft,
  showActions = true,
  hasUnread = false,
  account,
  avatar,
  title,
  subtitle,
  actions,
  className,
}) => (
  <header className={[styles.bar, styles[`bar--${density}`], styles[`bar--${type}`], className ?? ''].filter(Boolean).join(' ')}>
    {type === 'chat' ? (
      <>
        {avatar && <span className={styles.bar__chatAvatar}>{avatar}</span>}
        <span className={styles.bar__chatMeta}>
          {title && <span className={styles.bar__chatTitle}>{title}</span>}
          {subtitle && <span className={styles.bar__chatSubtitle}>{subtitle}</span>}
        </span>
        <div className={styles.bar__spacer} />
        {actions && <div className={styles.bar__chatActions}>{actions}</div>}
      </>
    ) : (
    <>
    <div className={styles.bar__leftGroup}>
      {showToggle && (
        <button type="button" className={styles.bar__icon} onClick={onToggle} aria-label="Toggle sidebar">
          <ToggleIcon size={density === 'md' ? 20 : 18} />
        </button>
      )}
      <div className={[styles.bar__left, type === 'search' ? styles['bar__left--search'] : ''].filter(Boolean).join(' ')} data-type={type}>{left}</div>
    </div>
    <div className={styles.bar__spacer} />
    <div className={styles.bar__right}>
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
      {account && <div className={styles.bar__account}>{account}<ChevronDown size={16} className={styles.bar__accountChevron} /></div>}
    </div>
    </>
    )}
  </header>
);

export default TopBar;
