/**
 * MessageBubble
 *
 * A chat message. Matches the Figma "Message Bubble" set:
 *
 *   type    (Figma "Type" axis)    -> received | sent | system
 *   content (Figma "Content" axis) -> text | image | file
 *
 * Received = bg/subtle with author + reactions; Sent = accent fill with
 * timestamp + read receipt; System = centered pill. The tail corner (4px)
 * marks the speaker side. Image/file content render inside the bubble.
 */

import React from 'react';
import { CheckCheck, File as FileIcon, Download } from 'lucide-react';
import { iconStrokeWidth } from '../../lib/iconStrokeWidth';
import styles from './MessageBubble.module.css';

export type MessageBubbleType = 'received' | 'sent' | 'system';
export type MessageBubbleContent = 'text' | 'image' | 'file';

export interface MessageBubbleProps {
  type?: MessageBubbleType;
  content?: MessageBubbleContent;
  /** Author avatar (received only). */
  avatar?: React.ReactNode;
  authorName?: React.ReactNode;
  timestamp?: React.ReactNode;
  /** Text body, image node, or file meta depending on content. */
  children?: React.ReactNode;
  /** Image source (content="image"). */
  image?: React.ReactNode;
  /** File meta (content="file"). */
  fileName?: string;
  fileSize?: string;
  /** Reaction node (received only). */
  reactions?: React.ReactNode;
  /** Show read receipt (sent only). */
  read?: boolean;
  className?: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  type = 'received',
  content = 'text',
  avatar,
  authorName,
  timestamp,
  children,
  image,
  fileName,
  fileSize,
  reactions,
  read,
  className,
}) => {
  if (type === 'system') {
    return (
      <div className={[styles.system, className ?? ''].filter(Boolean).join(' ')}>
        <span className={styles.system__pill}>{children}</span>
      </div>
    );
  }
  const sent = type === 'sent';
  return (
    <div className={[styles.row, sent ? styles['row--sent'] : styles['row--received'], className ?? '']
      .filter(Boolean).join(' ')}>
      {!sent && avatar && <span className={styles.row__avatar}>{avatar}</span>}
      <div className={styles.col}>
        {!sent && (authorName || timestamp) && (
          <div className={styles.meta}>
            {authorName && <span className={styles.meta__name}>{authorName}</span>}
            {timestamp && <span className={styles.meta__time}>{timestamp}</span>}
          </div>
        )}
        <div className={[styles.bubble, sent ? styles['bubble--sent'] : styles['bubble--received']].join(' ')}>
          {content === 'image' && <div className={styles.bubble__image}>{image}</div>}
          {content === 'file' && (
            <div className={styles.file}>
              <FileIcon size={18} strokeWidth={iconStrokeWidth(18)} className={styles.file__icon} aria-hidden="true" />
              <span className={styles.file__meta}>
                <span className={styles.file__name}>{fileName}</span>
                <span className={styles.file__size}>{fileSize}</span>
              </span>
              <Download size={16} strokeWidth={iconStrokeWidth(16)} className={styles.file__dl} aria-hidden="true" />
            </div>
          )}
          {children && <span className={styles.bubble__text}>{children}</span>}
        </div>
        <div className={styles.foot}>
          {!sent && reactions}
          {sent && (
            <>
              {timestamp && <span className={styles.foot__time}>{timestamp}</span>}
              {read && <CheckCheck size={13} strokeWidth={iconStrokeWidth(13)} className={styles.foot__receipt} aria-hidden="true" />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
