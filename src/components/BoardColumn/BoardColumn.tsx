/**
 * BoardColumn
 *
 * One Kanban column. Matches the Figma "Board Column" set:
 *
 *   state (Figma "State" axis) -> default | empty | loading
 *
 * Header (status dot + title + count + add/menu actions) · a stack of
 * BoardCard children · an "Add task" footer. Empty shows a dashed drop zone;
 * Loading is handled by the caller passing skeleton children (or none).
 */

import React from 'react';
import { Plus, MoreHorizontal } from 'lucide-react';
import styles from './BoardColumn.module.css';

export type BoardColumnState = 'default' | 'empty' | 'loading';

export interface BoardColumnProps {
  state?: BoardColumnState;
  title: React.ReactNode;
  /** Count badge (e.g. a Badge instance or number). */
  count?: React.ReactNode;
  /** Status dot color — any CSS color or var(). Defaults to chart/1. */
  dotColor?: string;
  /** BoardCard instances (default/loading states). */
  children?: React.ReactNode;
  onAdd?: () => void;
  onMenu?: () => void;
  className?: string;
}

export const BoardColumn: React.FC<BoardColumnProps> = ({
  state = 'default',
  title,
  count,
  dotColor = 'var(--color-chart-1)',
  children,
  onAdd,
  onMenu,
  className,
}) => (
  <div className={[styles.col, className ?? ''].filter(Boolean).join(' ')}>
    <div className={styles.col__header}>
      <span className={styles.col__dot} style={{ background: dotColor }} aria-hidden="true" />
      <span className={styles.col__title}>{title}</span>
      {count != null && <span className={styles.col__count}>{count}</span>}
      <span className={styles.col__spacer} />
      <button type="button" className={styles.col__action} onClick={onAdd} aria-label="Add task">
        <Plus size={16} />
      </button>
      <button type="button" className={styles.col__action} onClick={onMenu} aria-label="Column options">
        <MoreHorizontal size={16} />
      </button>
    </div>

    <div className={styles.col__body}>
      {state === 'empty' ? (
        <div className={styles.col__drop}>Drop tasks here</div>
      ) : (
        children
      )}
    </div>

    <button type="button" className={styles.col__add} onClick={onAdd}>
      <Plus size={16} aria-hidden="true" />
      Add task
    </button>
  </div>
);

export default BoardColumn;
