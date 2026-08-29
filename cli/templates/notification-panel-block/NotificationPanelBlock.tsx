/**
 * NotificationPanelBlock — Blocks / Application / Notification Panel
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
 * your project and edit it directly.
 *
 * Matches Figma "Notifications Panel": "Notifications" heading + "Mark all
 * as read" Link -> list of NotificationItem rows, or an empty state.
 * Default/Empty isn't a manual prop -- the empty state renders once
 * `items` is empty, same "derive from data" pattern used throughout this
 * set. "Mark all as read" only shows when there's at least one unread item.
 *
 * The list reuses the existing NotificationItem component directly (its
 * plain-row style, `read` toggling the unread background/dot/bold title) --
 * an exact match for every row in this Figma panel, no new row needed.
 */

import React from 'react';
import { Bell } from 'lucide-react';
import { NotificationItem } from '@sakaniui/react';
import { Link } from '@sakaniui/react';
import { iconStrokeWidth } from '@sakaniui/react';
import styles from './NotificationPanelBlock.module.css';

export interface NotificationPanelItem {
  id: string;
  icon?: React.ReactNode;
  title: string;
  timestamp: string;
  read?: boolean;
}

export interface NotificationPanelBlockProps {
  items: NotificationPanelItem[];
  onMarkAllRead?: () => void;
  className?: string;
}

export const NotificationPanelBlock: React.FC<NotificationPanelBlockProps> = ({
  items, onMarkAllRead, className,
}) => {
  const isEmpty = items.length === 0;
  const hasUnread = items.some((item) => !item.read);

  return (
    <div className={[styles.panel, isEmpty ? styles.panelEmpty : '', className ?? ''].filter(Boolean).join(' ')}>
      <div className={styles.header}>
        <h2 className={styles.title}>Notifications</h2>
        {!isEmpty && hasUnread && (
          <Link href="#" onClick={(e) => { e.preventDefault(); onMarkAllRead?.(); }} className={styles.markAllRead}>
            Mark all as read
          </Link>
        )}
      </div>

      {isEmpty ? (
        <div className={styles.empty}>
          <span className={styles.emptyIconWrap} aria-hidden="true">
            <Bell size={16} strokeWidth={iconStrokeWidth(16)} />
          </span>
          <p className={styles.emptyTitle}>You&rsquo;re all caught up</p>
          <p className={styles.emptyDescription}>No new notifications right now.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {items.map((item) => (
            <NotificationItem
              key={item.id}
              icon={item.icon}
              title={item.title}
              timestamp={item.timestamp}
              read={item.read}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationPanelBlock;
