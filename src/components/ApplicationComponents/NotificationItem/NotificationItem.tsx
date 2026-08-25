/**
 * NotificationItem
 *
 * Matches Figma "Notification Item" (3 style previews -- Unread, Read,
 * Dismissable -- collapsed into composable props, same judgment already
 * applied throughout this Application set):
 *
 *   Simple row (no `description`) -- icon-wrap, title, timestamp, and
 *   (when `read` is false) an accent/subtle background + unread dot.
 *   `read` toggles bold/muted title weight and the background/dot, same
 *   idea as Balance's controlled/uncontrolled hidden state -- but here it's
 *   plain read-driven styling, no internal state to manage.
 *
 *   Actionable card (`description` present) -- bordered/shadowed card,
 *   icon-wrap, title + description, a close X, and Dismiss/action buttons
 *   below. The X and the "Dismiss" button fire the same `onDismiss` --
 *   Figma gives two entry points to what's the same action.
 */

import React from 'react';
import { Bell, X } from 'lucide-react';
import { IconButton } from '../../IconButton';
import { Button } from '../../Button';
import { iconStrokeWidth } from '../../../lib/iconStrokeWidth';
import styles from './NotificationItem.module.css';

export interface NotificationItemProps {
  icon?: React.ReactNode;
  title: string;
  /** Simple row only. */
  timestamp?: string;
  /** Simple row only -- false (default) shows the unread background + dot. */
  read?: boolean;
  /** Presence switches to the actionable card style. */
  description?: string;
  /** Fires from both the header's X and the footer's Dismiss button. */
  onDismiss?: () => void;
  dismissLabel?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  icon, title, timestamp, read = false, description,
  onDismiss, dismissLabel = 'Dismiss', actionLabel, onAction, className,
}) => {
  const isActionable = description !== undefined;
  const isUnread = !read && !isActionable;
  const iconEl = icon ?? <Bell size={24} strokeWidth={iconStrokeWidth(24)} />;

  if (isActionable) {
    return (
      <div className={[styles.card, className ?? ''].filter(Boolean).join(' ')}>
        <div className={styles.cardTop}>
          <span className={styles.iconWrapCanvas} aria-hidden="true">{iconEl}</span>
          <div className={styles.content}>
            <p className={styles.titleBold}>{title}</p>
            <p className={styles.description}>{description}</p>
          </div>
          {onDismiss && (
            <IconButton icon={X} variant="ghost" size="sm" aria-label="Close" onClick={onDismiss} />
          )}
        </div>
        <div className={styles.actions}>
          {onDismiss && (
            <Button variant="ghost" size="sm" onClick={onDismiss}>{dismissLabel}</Button>
          )}
          {actionLabel && (
            <Button variant="secondary" size="sm" onClick={onAction} style={{ borderColor: 'transparent' }}>
              {actionLabel}
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={[styles.row, isUnread ? styles['row--unread'] : ''].filter(Boolean).join(' ')}>
      <span className={styles.iconWrapSurface} aria-hidden="true">{iconEl}</span>
      <div className={styles.content}>
        <p className={isUnread ? styles.titleBold : styles.titleMuted}>{title}</p>
        {timestamp && <p className={styles.timestamp}>{timestamp}</p>}
      </div>
      {isUnread && <span className={styles.dot} aria-hidden="true" />}
    </div>
  );
};

export default NotificationItem;
