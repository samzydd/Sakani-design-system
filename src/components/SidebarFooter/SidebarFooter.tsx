/**
 * SidebarFooter
 *
 * Bottom user/actions area. Matches Figma "Sidebar Footer":
 * Type (User | User + Menu | Actions) x Collapsed.
 * Figma spec: padding 10/6, gap 10, title label/sm-strong (fg/default), subtitle caption (fg/muted),
 * log-out icon (Lucide). The user avatar uses the system Avatar component.
 */

import React from 'react';
import { LogOut, EllipsisVertical } from 'lucide-react';
import { Avatar } from '../Avatar/Avatar';
import styles from './SidebarFooter.module.css';

export type SidebarFooterType = 'user' | 'user-menu' | 'actions';

export interface SidebarFooterProps {
  type?: SidebarFooterType;
  title?: string;
  subtitle?: string;
  /** Avatar image URL (passed to the system Avatar component). */
  avatarSrc?: string;
  /** Avatar initials fallback (passed to the system Avatar component). */
  avatarInitials?: string;
  collapsed?: boolean;
  onMenu?: () => void;
  onSignOut?: () => void;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({
  type = 'user', title, subtitle, avatarSrc, avatarInitials, collapsed, onMenu, onSignOut,
}) => {
  // The system Avatar — Image if src given, else Initials, else the default Icon avatar.
  const avatar = (
    <Avatar size="sm" src={avatarSrc} initials={avatarInitials} alt={title ?? 'User'} />
  );

  if (collapsed) {
    return (
      <div className={[styles.footer, styles['footer--collapsed']].join(' ')}>
        {avatar}
      </div>
    );
  }

  if (type === 'actions') {
    return (
      <div className={styles.footer}>
        <button type="button" className={styles.footer__action} onClick={onSignOut}>
          <LogOut size={16} strokeWidth={1.5} /> Sign out
        </button>
      </div>
    );
  }

  return (
    <div className={styles.footer}>
      {avatar}
      <span className={styles.footer__text}>
        {title && <span className={styles.footer__title}>{title}</span>}
        {subtitle && <span className={styles.footer__subtitle}>{subtitle}</span>}
      </span>
      {type === 'user-menu' && (
        <button type="button" className={styles.footer__menu} onClick={onMenu} aria-label="Open menu">
          <EllipsisVertical size={16} strokeWidth={1.5} />
        </button>
      )}
    </div>
  );
};

export default SidebarFooter;
