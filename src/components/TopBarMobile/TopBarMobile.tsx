/**
 * TopBarMobile
 *
 * Mobile app bar (390×56). Matches the Figma "Top bar / Mobile" set:
 *
 *   type (Figma "Type" axis) -> title | title-centered | title-action | search
 *
 * Hamburger opens the sidebar as a drawer. The trailing slot holds an
 * avatar, a primary action, or (in search) a close control.
 */

import React from 'react';
import { Menu as MenuIcon, Plus, X } from 'lucide-react';
import styles from './TopBarMobile.module.css';

export type TopBarMobileType = 'title' | 'title-centered' | 'title-action' | 'search';

export interface TopBarMobileProps {
  type?: TopBarMobileType;
  title?: React.ReactNode;
  /** Trailing slot for the 'title' type (e.g. an Avatar). */
  trailing?: React.ReactNode;
  /** Search field node for the 'search' type (e.g. an Input). */
  search?: React.ReactNode;
  onMenu?: () => void;
  onAction?: () => void;
  onClose?: () => void;
  className?: string;
}

export const TopBarMobile: React.FC<TopBarMobileProps> = ({
  type = 'title',
  title,
  trailing,
  search,
  onMenu,
  onAction,
  onClose,
  className,
}) => (
  <header className={[styles.bar, className ?? ''].filter(Boolean).join(' ')}>
    <button type="button" className={styles.bar__icon} onClick={onMenu} aria-label="Open menu">
      <MenuIcon size={18} />
    </button>
    {type === 'search' ? (
      <div className={styles.bar__search}>{search}</div>
    ) : (
      <span className={[styles.bar__title, type === 'title-centered' ? styles['bar__title--center'] : ''].join(' ')}>
        {title}
      </span>
    )}
    {type === 'title-action' && (
      <button type="button" className={styles.bar__icon} onClick={onAction} aria-label="Add">
        <Plus size={18} />
      </button>
    )}
    {type === 'search' && (
      <button type="button" className={styles.bar__icon} onClick={onClose} aria-label="Close search">
        <X size={18} />
      </button>
    )}
    {(type === 'title' || type === 'title-centered') && trailing}
  </header>
);

export default TopBarMobile;
