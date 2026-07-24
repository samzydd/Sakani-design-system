/**
 * BoardCard
 *
 * Flexible board/list card. Matches the Figma "Board Card" set:
 *
 *   type  (Figma "Type" axis)  -> compact | default | cover
 *   state (Figma "State" axis) -> default | hover | selected | dragging | done
 *
 * Content type is NOT a variant — the leading slot, tags, and meta items are
 * composed by the caller, so the same card expresses tasks, deals, files,
 * bugs, or applicants. See the presets in the stories.
 *
 * Regions (top→bottom): cover (cover type) · header (leading + title +
 * trailing) · description (non-compact) · tags (non-compact) · footer
 * (meta items + avatars), separated by a hairline divider.
 */

import React from 'react';
import styles from './BoardCard.module.css';

export type BoardCardType = 'compact' | 'default' | 'cover';
export type BoardCardState = 'default' | 'hover' | 'selected' | 'dragging' | 'done';

export interface BoardCardProps {
  type?: BoardCardType;
  state?: BoardCardState;
  /** Cover media (cover type only). */
  cover?: React.ReactNode;
  /** Leading slot: Checkbox, Avatar, status dot, or icon. Identity of the card. */
  leading?: React.ReactNode;
  title: React.ReactNode;
  /** Trailing slot: priority icon, kebab menu trigger, or status. */
  trailing?: React.ReactNode;
  /** Shown for default/cover types. */
  description?: React.ReactNode;
  /** Badge instances. Shown for default/cover types. */
  tags?: React.ReactNode;
  /** CardMetaItem instances. */
  meta?: React.ReactNode;
  /** AvatarGroup / Avatar, right-aligned in the footer. */
  assignees?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const BoardCard: React.FC<BoardCardProps> = ({
  type = 'default',
  state = 'default',
  cover,
  leading,
  title,
  trailing,
  description,
  tags,
  meta,
  assignees,
  onClick,
  className,
}) => {
  const showBody = type !== 'compact';
  const hasFooter = meta || assignees;
  return (
    <div
      onClick={onClick}
      aria-selected={state === 'selected' || undefined}
      className={[styles.card, styles[`card--${type}`], styles[`card--${state}`], className ?? '']
        .filter(Boolean).join(' ')}
    >
      {type === 'cover' && <div className={styles.card__cover}>{cover}</div>}

      <div className={styles.card__header}>
        {leading && <span className={styles.card__leading}>{leading}</span>}
        <span className={styles.card__title}>{title}</span>
        {trailing && <span className={styles.card__trailing}>{trailing}</span>}
      </div>

      {showBody && description && <p className={styles.card__desc}>{description}</p>}
      {showBody && tags && <div className={styles.card__tags}>{tags}</div>}

      {hasFooter && (
        <>
          <div className={styles.card__divider} />
          <div className={styles.card__footer}>
            {meta && <div className={styles.card__meta}>{meta}</div>}
            {assignees && <div className={styles.card__assignees}>{assignees}</div>}
          </div>
        </>
      )}
    </div>
  );
};

export default BoardCard;
