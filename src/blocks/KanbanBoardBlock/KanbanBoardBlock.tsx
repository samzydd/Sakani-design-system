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
 *   dragging     · a card lifts and tilts while a card-shaped slot marks where it lands
 *
 * Drag and drop (default state) is pointer-based, see useKanbanDrag.ts: the
 * card follows the pointer and swings with its movement, a slot opens where it
 * will land, the other cards slide out of the way, and on release it glides
 * into place. Mouse, pen and touch.
 *
 * The column is defined locally (below) rather than as a library component —
 * it exists to serve this block, so it lives with the block.
 */

import React from 'react';
import { IconSearch as Search } from '../../icons/outline/search';
import { IconPlus as Plus } from '../../icons/outline/plus';
import { IconDots as MoreHorizontal } from '../../icons/outline/dots';
import { IconSelector as ChevronsUpDown } from '../../icons/outline/selector';
import { IconCalendar as Calendar } from '../../icons/outline/calendar';
import { IconMessage as MessageSquare } from '../../icons/outline/message';
import { IconFlag as Flag } from '../../icons/outline/flag';
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
import { useKanbanDrag, type KanbanPos } from './useKanbanDrag';

export type KanbanBoardBlockState = 'default' | 'loading' | 'empty-column' | 'dragging';

/* ------------------------------------------------------------------ *
 * Sample data — replace with your own
 * ------------------------------------------------------------------ */
interface Task {
  id: string;
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
      { id: 'design-system', title: 'Design system update', description: 'Enhance component consistency and usability',
        tags: [{ label: 'Design', variant: 'accent' }, { label: 'Product', variant: 'neutral' }],
        due: 'Jan 25', comments: 4, assignees: [{ initials: 'AB' }, { initials: 'KO' }, { initials: 'MR' }, { initials: 'JD' }] },
      { id: 'retention', title: 'Retention rate by 23%', description: 'Improve retention through campaigns',
        tags: [{ label: 'Marketing', variant: 'info' }],
        due: 'Jan 25', comments: 2, assignees: [{ initials: 'PT' }, { initials: 'ZA' }] },
      { id: 'kyc', title: 'KYC flow review', tags: [{ label: 'Product', variant: 'neutral' }],
        due: 'Jan 28', assignees: [{ initials: 'AO' }], compact: true },
    ],
  },
  {
    title: 'In progress', dot: 'var(--color-chart-2)',
    tasks: [
      { id: 'icon-audit', title: 'Icon library audit', description: 'Normalize stroke widths across 1,600 glyphs',
        tags: [{ label: 'Design', variant: 'accent' }],
        due: 'Jan 26', comments: 7, assignees: [{ initials: 'AC' }, { initials: 'DO' }] },
      { id: 'search-perf', title: 'Search performance', tags: [{ label: 'Engineering', variant: 'info' }],
        due: 'Jan 30', assignees: [{ initials: 'MR' }], compact: true },
    ],
  },
  {
    title: 'In review', dot: 'var(--color-chart-4)',
    tasks: [
      { id: 'onboarding', title: 'Onboarding checklist', description: 'Three-step setup with progress tracking',
        tags: [{ label: 'Growth', variant: 'success' }],
        due: 'Feb 2', comments: 3, assignees: [{ initials: 'KO' }, { initials: 'PT' }] },
    ],
  },
  {
    title: 'Done', dot: 'var(--color-success-solid)',
    tasks: [
      { id: 'dark-mode', title: 'Dark mode tokens', description: 'Semantic layer flips from a single source',
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
  /** When the board is stretched taller than its real content (e.g. embedded
   * in a fixed-height demo frame), stretches every column to equal height
   * and caps off its real cards with a dashed placeholder slot down to the
   * bottom instead of leaving blank canvas. No-op at the board's natural
   * height. */
  fillPlaceholders?: boolean;
  /** A dragged card is over this column. */
  isTarget?: boolean;
  bodyRef?: React.Ref<HTMLDivElement>;
  children?: React.ReactNode;
}

const Column: React.FC<ColumnProps> = ({ title, dot, count, variant = 'default', fillPlaceholders, isTarget, bodyRef, children }) => (
  <div className={[styles.column, fillPlaceholders ? styles['column--fill'] : '', isTarget ? styles['column--target'] : ''].filter(Boolean).join(' ')}>
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

    <div ref={bodyRef} className={[styles.column__body, fillPlaceholders ? styles['column__body--fill'] : ''].filter(Boolean).join(' ')}>
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
        <>
          {children}
          {fillPlaceholders && <div className={styles.columnFiller} aria-hidden="true" />}
        </>
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
  wrapperProps?: React.HTMLAttributes<HTMLDivElement> & Record<`data-${string}`, string>,
) => (
  <div key={key} className={wrapperProps ? styles.draggable : undefined} {...(wrapperProps ?? {})}>
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
  /** When the board is stretched taller than its real content (e.g. embedded
   * in a fixed-height demo frame), stretches every column to equal height
   * and caps off its real cards with a dashed placeholder slot down to the
   * bottom instead of leaving blank canvas. No-op at the board's natural
   * height. */
  fillPlaceholders?: boolean;
}

export const KanbanBoardBlock: React.FC<KanbanBoardBlockProps> = ({
  state = 'default',
  className,
  fillPlaceholders,
}) => {
  // ---- drag and drop -----------------------------------------------------
  const [columns, setColumns] = React.useState(INITIAL_COLUMNS);
  const drag = useKanbanDrag({
    enabled: state === 'default',
    onMove: (from: KanbanPos, to: KanbanPos) =>
      setColumns((prev) => {
        const next = prev.map((c) => ({ ...c, tasks: [...c.tasks] }));
        const [moved] = next[from.col].tasks.splice(from.index, 1);
        if (moved) next[to.col].tasks.splice(to.index, 0, moved);
        return next;
      }),
  });
  const draggedTask = drag.active ? columns[drag.active.from.col]?.tasks[drag.active.from.index] : undefined;

  const source = state === 'default' ? columns : INITIAL_COLUMNS;

  return (
  <div ref={drag.blockRef} className={[styles.block, className ?? ''].filter(Boolean).join(' ')}>
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
    <div ref={drag.boardRef} className={[styles.columns, fillPlaceholders ? styles['columns--fill'] : ''].filter(Boolean).join(' ')}>
      {source.map((col, colIndex) => {
        const isEmptyCol = state === 'empty-column' && colIndex === 2;
        const variant =
          state === 'loading' ? 'loading' : isEmptyCol ? 'empty' : 'default';

        return (
          <Column
            key={col.title}
            isTarget={!!drag.active && drag.target?.col === colIndex && drag.target.col !== drag.active.from.col}
            bodyRef={drag.columnRef(colIndex)}
            title={col.title}
            dot={col.dot}
            count={state === 'loading' ? '—' : isEmptyCol ? 0 : col.tasks.length}
            variant={variant}
            fillPlaceholders={fillPlaceholders}
          >
            {(() => {
              // While dragging: the card leaves its column and a slot opens at the target.
              const a = drag.active;
              const items = col.tasks
                .map((task, i) => ({ task, i }))
                .filter(({ i }) => !(a && a.from.col === colIndex && a.from.index === i));
              const nodes: React.ReactNode[] = items.map(({ task, i }) => {
                // The static dragging state: column 2's last card lifts out over its slot.
                const isDragged = state === 'dragging' && colIndex === 1 && i === col.tasks.length - 1;
                if (isDragged) {
                  return (
                    <React.Fragment key={task.id}>
                      <div className={styles.slot} style={{ height: 96 }} aria-hidden="true" />
                      <div className={styles.draggedCard}>{renderTask(task, `${task.id}-drag`, 'dragging')}</div>
                    </React.Fragment>
                  );
                }
                return renderTask(task, task.id, 'default', drag.cardProps({ col: colIndex, index: i }, task.id));
              });
              if (a && drag.target?.col === colIndex) {
                nodes.splice(drag.target.index, 0, (
                  <div
                    key="slot"
                    data-kanban-slot=""
                    data-flip-id={`slot-${colIndex}`}
                    className={styles.slot}
                    style={{ height: a.height }}
                    aria-hidden="true"
                  />
                ));
              }
              return nodes;
            })()}
          </Column>
        );
      })}
      </div>

    {/* The card in flight: follows the pointer above the board. */}
    {drag.active && draggedTask && (
      <div ref={drag.overlayRef} className={styles.overlay} style={{ width: drag.active.width }} aria-hidden="true">
        {renderTask(draggedTask, 'overlay')}
      </div>
    )}
    </div>
  );
};

export default KanbanBoardBlock;
