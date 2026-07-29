/**
 * KanbanBoardBlock — Blocks / Data & Content / Kanban Board
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file and edit
 * it: change the columns, swap the sample tasks, adjust the card content.
 * Assembled entirely from Sakani components.
 *
 * Mirrors the four states in the Figma block:
 *   default      · columns with counts, cards, and an add affordance
 *   loading      · card skeletons hold each column's shape
 *   empty-column · a column with no cards shows a dashed drop zone
 *   dragging     · a card lifts while a placeholder marks the drop target
 *
 * The column is defined locally (below) rather than as a library component —
 * it exists to serve this block, so it lives with the block.
 */

import React from 'react';
import { Search, Plus, MoreHorizontal, ChevronsUpDown, Calendar, MessageSquare, Flag } from 'lucide-react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { Checkbox } from '../../components/Checkbox';
import { Skeleton } from '../../components/Skeleton';
import { AvatarGroup } from '../../components/AvatarGroup';
import { BoardCard } from '../../components/BoardCard';
import { CardMetaItem } from '../../components/CardMetaItem';
import { FilterChip } from '../../components/FilterChip';
import styles from './KanbanBoardBlock.module.css';

export type KanbanBoardBlockState = 'default' | 'loading' | 'empty-column' | 'dragging';

/* ------------------------------------------------------------------ *
 * Sample data — replace with your own
 * ------------------------------------------------------------------ */
interface Task {
  title: string;
  description?: string;
  tags: Array<{ label: string; variant: 'accent' | 'neutral' | 'success' | 'warning' | 'danger' | 'info' }>;
  due: string;
  comments?: number;
  assignees: Array<{ initials: string }>;
  compact?: boolean;
}

const INITIAL_COLUMNS: Array<{ title: string; dot: string; tasks: Task[] }> = [
  {
    title: 'To-do', dot: 'var(--color-chart-1)',
    tasks: [
      { title: 'Design system update', description: 'Enhance component consistency and usability',
        tags: [{ label: 'Design', variant: 'accent' }, { label: 'Product', variant: 'neutral' }],
        due: 'Jan 25', comments: 4, assignees: [{ initials: 'AB' }, { initials: 'KO' }, { initials: 'MR' }, { initials: 'JD' }] },
      { title: 'Retention rate by 23%', description: 'Improve retention through campaigns',
        tags: [{ label: 'Marketing', variant: 'info' }],
        due: 'Jan 25', comments: 2, assignees: [{ initials: 'PT' }, { initials: 'ZA' }] },
      { title: 'KYC flow review', tags: [{ label: 'Product', variant: 'neutral' }],
        due: 'Jan 28', assignees: [{ initials: 'AO' }], compact: true },
    ],
  },
  {
    title: 'In progress', dot: 'var(--color-chart-2)',
    tasks: [
      { title: 'Icon library audit', description: 'Normalize stroke widths across 1,600 glyphs',
        tags: [{ label: 'Design', variant: 'accent' }],
        due: 'Jan 26', comments: 7, assignees: [{ initials: 'AC' }, { initials: 'DO' }] },
      { title: 'Search performance', tags: [{ label: 'Engineering', variant: 'info' }],
        due: 'Jan 30', assignees: [{ initials: 'MR' }], compact: true },
    ],
  },
  {
    title: 'In review', dot: 'var(--color-chart-4)',
    tasks: [
      { title: 'Onboarding checklist', description: 'Three-step setup with progress tracking',
        tags: [{ label: 'Growth', variant: 'success' }],
        due: 'Feb 2', comments: 3, assignees: [{ initials: 'KO' }, { initials: 'PT' }] },
    ],
  },
  {
    title: 'Done', dot: 'var(--color-success-solid)',
    tasks: [
      { title: 'Dark mode tokens', description: 'Semantic layer flips from a single source',
        tags: [{ label: 'Design', variant: 'accent' }],
        due: 'Jan 18', assignees: [{ initials: 'AB' }] },
    ],
  },
];

/* ------------------------------------------------------------------ *
 * Column — local to this block
 * ------------------------------------------------------------------ */
interface ColumnProps {
  title: string;
  dot: string;
  count: number | string;
  variant?: 'default' | 'empty' | 'loading';
  children?: React.ReactNode;
}

const Column: React.FC<ColumnProps> = ({ title, dot, count, variant = 'default', children }) => (
  <div className={styles.column}>
    <div className={styles.column__header}>
      <span className={styles.column__dot} style={{ background: dot }} aria-hidden="true" />
      <span className={styles.column__title}>{title}</span>
      <Badge variant="neutral" emphasis="subtle">{String(count)}</Badge>
      <span className={styles.spacer} />
      <button type="button" className={styles.column__action} aria-label={`Add task to ${title}`}>
        <Plus size={16} />
      </button>
      <button type="button" className={styles.column__action} aria-label={`${title} options`}>
        <MoreHorizontal size={16} />
      </button>
    </div>

    <div className={styles.column__body}>
      {variant === 'empty' ? (
        <div className={styles.dropZone}>Drop tasks here</div>
      ) : variant === 'loading' ? (
        Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className={styles.cardSkeleton}>
            <Skeleton variant="text" width={180} height={12} />
            <Skeleton variant="text" width="100%" height={10} />
            {i !== 2 && <Skeleton variant="text" width={120} height={10} />}
          </div>
        ))
      ) : (
        children
      )}
    </div>

    <button type="button" className={styles.column__add}>
      <Plus size={16} aria-hidden="true" />
      Add task
    </button>
  </div>
);

/* ------------------------------------------------------------------ *
 * Card renderer
 * ------------------------------------------------------------------ */
const renderTask = (
  task: Task,
  key: React.Key,
  state?: 'default' | 'dragging',
  dragProps?: {
    draggable: boolean;
    onDragStart: (e: React.DragEvent) => void;
    onDragEnd: () => void;
  },
) => (
  <div
    key={key}
    {...(dragProps ?? {})}
    style={dragProps ? { cursor: 'grab' } : undefined}
  >
  <BoardCard
    type={task.compact ? 'compact' : 'default'}
    state={state === 'dragging' ? 'dragging' : 'default'}
    leading={<Checkbox />}
    title={task.title}
    trailing={<Flag size={14} color="var(--color-warning-fg)" />}
    description={task.description}
    tags={task.tags.map((t) => (
      <Badge key={t.label} variant={t.variant} emphasis="subtle">{t.label}</Badge>
    ))}
    meta={
      <>
        <CardMetaItem icon={<Calendar size={13} />}>{task.due}</CardMetaItem>
        {task.comments != null && (
          <CardMetaItem icon={<MessageSquare size={13} />}>{String(task.comments)}</CardMetaItem>
        )}
      </>
    }
    assignees={<AvatarGroup size="sm" max={3} avatars={task.assignees} />}
  />
  </div>
);

/* ------------------------------------------------------------------ *
 * The block
 * ------------------------------------------------------------------ */
export interface KanbanBoardBlockProps {
  state?: KanbanBoardBlockState;
  className?: string;
}

export const KanbanBoardBlock: React.FC<KanbanBoardBlockProps> = ({
  state = 'default',
  className,
}) => {
  // ---- drag and drop -----------------------------------------------------
  // Native HTML5 drag and drop, kept deliberately simple: enough to feel the
  // interaction and test the dragging visuals. Swap for a dedicated library
  // (dnd-kit, react-dnd) if you need keyboard support or touch.
  const [columns, setColumns] = React.useState(INITIAL_COLUMNS);
  const [dragging, setDragging] = React.useState<{ col: number; index: number } | null>(null);
  const [dragOverCol, setDragOverCol] = React.useState<number | null>(null);

  const onDrop = (targetCol: number) => {
    if (!dragging) return;
    setColumns((prev) => {
      const next = prev.map((c) => ({ ...c, tasks: [...c.tasks] }));
      const [moved] = next[dragging.col].tasks.splice(dragging.index, 1);
      if (moved) next[targetCol].tasks.push(moved);
      return next;
    });
    setDragging(null);
    setDragOverCol(null);
  };

  const source = state === 'default' ? columns : INITIAL_COLUMNS;

  return (
  <div className={[styles.block, className ?? ''].filter(Boolean).join(' ')}>
    {/* ---- Toolbar ---- */}
    <div className={styles.toolbar}>
      <div className={styles.toolbar__left}>
        <div className={styles.search}>
          <Input size="md" leadingIcon={<Search size={16} />} placeholder="Search tasks" />
        </div>
        <FilterChip type="default">Assignee</FilterChip>
        <FilterChip type="add">Add filter</FilterChip>
      </div>
      <span className={styles.spacer} />
      <div className={styles.toolbar__right}>
        <Button variant="secondary" size="md" leftIcon={<ChevronsUpDown size={16} />}>Sort</Button>
        <Button variant="primary" size="md" leftIcon={<Plus size={16} />}>New task</Button>
      </div>
    </div>

    {/* ---- Columns ---- */}
    <div className={styles.columns}>
      {source.map((col, colIndex) => {
        const isEmptyCol = state === 'empty-column' && colIndex === 2;
        const variant =
          state === 'loading' ? 'loading' : isEmptyCol ? 'empty' : 'default';

        return (
          <div
            key={col.title}
            onDragOver={(e) => { e.preventDefault(); setDragOverCol(colIndex); }}
            onDragLeave={() => setDragOverCol((c) => (c === colIndex ? null : c))}
            onDrop={() => onDrop(colIndex)}
            className={dragOverCol === colIndex ? styles.columnDropTarget : undefined}
          >
          <Column
            title={col.title}
            dot={col.dot}
            count={state === 'loading' ? '—' : isEmptyCol ? 0 : col.tasks.length}
            variant={variant}
          >
            {col.tasks.map((task, i) => {
              // In the dragging state the last card of column 2 lifts out,
              // leaving a dashed placeholder in its slot.
              const isDragged =
                state === 'dragging' && colIndex === 1 && i === col.tasks.length - 1;
              if (isDragged) {
                return (
                  <React.Fragment key={`${col.title}-${i}`}>
                    <div className={styles.dropPlaceholder} aria-hidden="true" />
                    <div className={styles.draggedCard}>{renderTask(task, `${col.title}-drag`, 'dragging')}</div>
                  </React.Fragment>
                );
              }
              const isBeingDragged = dragging?.col === colIndex && dragging?.index === i;
              return renderTask(
                task,
                `${col.title}-${i}`,
                isBeingDragged ? 'dragging' : 'default',
                state === 'default'
                  ? {
                      draggable: true,
                      onDragStart: (e: React.DragEvent) => {
                        e.dataTransfer.effectAllowed = 'move';
                        setDragging({ col: colIndex, index: i });
                      },
                      onDragEnd: () => { setDragging(null); setDragOverCol(null); },
                    }
                  : undefined,
              );
            })}
          </Column>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default KanbanBoardBlock;
