/**
 * ConversationItem
 *
 * One row in a chat conversation list. Matches the Figma "Conversation Item" set:
 *
 *   state (Figma "State" axis) -> default | hover | active | unread | typing | muted
 *
 * Avatar (+ presence dot) · name + timestamp · preview (or "typing…") ·
 * unread count. Active uses accent/subtle; Unread bolds the name and adds a
 * count; Typing replaces the preview; Muted hides presence and adds a bell-off.
 */

import React from 'react';
import { BellOff } from 'lucide-react';
import styles from './ConversationItem.module.css';

export type ConversationItemState = 'default' | 'hover' | 'active' | 'unread' | 'typing' | 'muted';

export interface ConversationItemProps {
  state?: ConversationItemState;
  /** Avatar node. */
  avatar: React.ReactNode;
  name: React.ReactNode;
  timestamp?: React.ReactNode;
  /** Last-message preview. Ignored when state is "typing". */
  preview?: React.ReactNode;
  /** Unread count (shown when state is "unread"). */
  unreadCount?: number;
  onClick?: () => void;
  className?: string;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({
  state = 'default',
  avatar,
  name,
  timestamp,
  preview,
  unreadCount,
  onClick,
  className,
}) => (
  <div
    role="button"
    tabIndex={0}
    onClick={onClick}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); }
    }}
    aria-current={state === 'active' || undefined}
    className={[styles.item, styles[`item--${state}`], className ?? ''].filter(Boolean).join(' ')}
  >
    <span className={styles.item__avatar}>
      {avatar}
      {state !== 'muted' && <span className={styles.item__presence} aria-hidden="true" />}
    </span>
    <span className={styles.item__body}>
      <span className={styles.item__row}>
        <span className={styles.item__name}>{name}</span>
        {state === 'muted' && <BellOff size={12} className={styles.item__mute} aria-hidden="true" />}
        {timestamp && <span className={styles.item__time}>{timestamp}</span>}
      </span>
      <span className={styles.item__row}>
        {state === 'typing'
          ? <span className={styles.item__typing}>typing…</span>
          : <span className={styles.item__preview}>{preview}</span>}
        {state === 'unread' && unreadCount != null && (
          <span className={styles.item__badge}>{unreadCount}</span>
        )}
      </span>
    </span>
  </div>
);

export default ConversationItem;
