/**
 * ActivityFeed
 *
 * Timeline of recent activity. Matches Figma "Activity Feed":
 *   Style: Default — icon-in-circle rail with a connector stub between dots,
 *          content wraps onto multiple lines if long.
 *        | Compact — avatar-led single-line row, timestamp right-aligned.
 *
 * Figma's latest update highlights more than just the actor: the specific
 * object being acted on (a doc name, a file, a quoted task title) is also
 * colored fg/default within an otherwise fg/muted sentence, while the verb
 * connecting them ("commented on", "uploaded", "marked") stays muted. Since
 * which words get highlighted is per-item and doesn't follow a rule (compare
 * "uploaded 3 [files to Assets]" vs. "edited the [Pricing Table]"), that
 * can't be derived from a plain string -- `description` accepts ReactNode
 * instead, and the exported `ActivityFeedHighlight` wraps whichever span the
 * caller wants colored.
 */

import React from 'react';
import { Avatar } from '../../Avatar';
import { iconStrokeWidth } from '../../../lib/iconStrokeWidth';
import styles from './ActivityFeed.module.css';

/** Colors its children fg/default within an otherwise-muted description. */
export const ActivityFeedHighlight: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className={styles.highlight}>{children}</span>
);

const RAIL_ICON_SIZE = 16;
/** Forces every consumer-supplied rail icon to the same 16px/1.5px-stroke
 * spec regardless of what size/strokeWidth it was authored with -- callers
 * shouldn't have to know about Lucide's scaling quirk themselves. */
const renderRailIcon = (icon: React.ReactNode) =>
  React.isValidElement<{ size?: number; strokeWidth?: number }>(icon)
    ? React.cloneElement(icon, { size: RAIL_ICON_SIZE, strokeWidth: iconStrokeWidth(RAIL_ICON_SIZE) })
    : icon;

export type ActivityFeedVariant = 'default' | 'compact';

export interface ActivityFeedItem {
  id?: string | number;
  /** Who performed the action — rendered in fg/default, the rest in fg/muted. */
  actor: string;
  /** Rest of the sentence, e.g. "commented on Design Review". Wrap the
   * object/target span in `ActivityFeedHighlight` to color it fg/default. */
  description: React.ReactNode;
  timestamp: string;
  /** Rail dot icon (variant="default"). Rendered at 16px, colored fg/muted. */
  icon?: React.ReactNode;
  /** Avatar image (variant="compact"). */
  avatarSrc?: string;
  avatarAlt?: string;
}

export interface ActivityFeedProps {
  items: ActivityFeedItem[];
  variant?: ActivityFeedVariant;
  className?: string;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  items, variant = 'default', className,
}) => {
  const isCompact = variant === 'compact';
  return (
    <div className={[styles.feed, isCompact ? styles['feed--compact'] : '', className ?? ''].filter(Boolean).join(' ')}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const key = item.id ?? i;

        if (isCompact) {
          return (
            <div key={key} className={styles['row--compact']}>
              <div className={styles.compactLeft}>
                <Avatar size="sm" src={item.avatarSrc} alt={item.avatarAlt ?? item.actor} />
                <p className={styles.text}>
                  <span className={styles.actor}>{item.actor}</span> {item.description}
                </p>
              </div>
              <span className={styles.timestamp}>{item.timestamp}</span>
            </div>
          );
        }

        return (
          <div key={key} className={styles['row--default']}>
            <div className={styles.rail}>
              <div className={styles.dot}>{renderRailIcon(item.icon)}</div>
              {!isLast && <div className={styles.connector} />}
            </div>
            <div className={[styles.content, isLast ? '' : styles['content--spaced']].filter(Boolean).join(' ')}>
              <p className={styles.text}>
                <span className={styles.actor}>{item.actor}</span> {item.description}
              </p>
              <span className={styles.timestamp}>{item.timestamp}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActivityFeed;
