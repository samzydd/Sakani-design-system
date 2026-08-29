/**
 * DataTableBlock — Blocks / Application / Data Table + Toolbar
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
 * your project and edit it directly: swap the sample data for your own, change
 * the columns, add or remove toolbar controls. Everything here is assembled
 * from Sakani components — no new primitives.
 *
 * Mirrors the six states in the Figma block:
 *   default  · records loaded, no filters or selection
 *   filtered · search + filter chips applied
 *   bulk     · rows selected; toolbar swaps for a bulk-actions bar
 *   loading  · skeleton rows hold the layout
 *   empty    · query returned nothing
 *   error    · request failed, recovery offered
 *
 * Layout: toolbar → Table → footer (count + Pagination).
 */

import React from 'react';
import { Search, Columns3, Plus, MoreHorizontal, Download, UserPlus, Trash } from 'lucide-react';
import { Input } from '@sakaniui/react';
import { Button } from '@sakaniui/react';
import { Badge } from '@sakaniui/react';
import { Avatar } from '@sakaniui/react';
import { Table, type TableColumn } from '@sakaniui/react';
import { Pagination } from '@sakaniui/react';
import { FilterChip } from '@sakaniui/react';
import { EmptyState } from '@sakaniui/react';
import { Skeleton } from '@sakaniui/react';
import styles from './DataTableBlock.module.css';

export type DataTableBlockState =
  | 'default' | 'filtered' | 'bulk' | 'loading' | 'empty' | 'error';

/* ------------------------------------------------------------------ *
 * Sample data — replace with your own
 * ------------------------------------------------------------------ */
interface Member {
  name: string;
  email: string;
  status: 'Active' | 'Pending' | 'Failed';
  role: string;
  amount: string;
  /** Presentational column — no underlying value. */
  actions?: never;
}

const MEMBERS: Member[] = [
  { name: 'Olivia Rhye',  email: 'olivia@sakani.com',  status: 'Active',  role: 'Admin',  amount: '$10.00' },
  { name: 'Daniel Osei',  email: 'daniel@sakani.com',  status: 'Pending', role: 'Viewer', amount: '$20.00' },
  { name: 'Amara Chen',   email: 'amara@sakani.com',   status: 'Active',  role: 'Member', amount: '$10.00' },
  { name: 'Priya Raman',  email: 'priya@sakani.com',   status: 'Failed',  role: 'Viewer', amount: '$0.00'  },
  { name: 'Marcus Reid',  email: 'marcus@sakani.com',  status: 'Active',  role: 'Admin',  amount: '$32.00' },
  { name: 'Zara Ali',     email: 'zara@sakani.com',    status: 'Active',  role: 'Member', amount: '$18.00' },
  { name: 'Tom Whitfield',email: 'tom@sakani.com',     status: 'Pending', role: 'Viewer', amount: '$12.00' },
  { name: 'Ada Obi',      email: 'ada@sakani.com',     status: 'Active',  role: 'Member', amount: '$24.00' },
];

const STATUS_VARIANT: Record<Member['status'], 'success' | 'warning' | 'danger'> = {
  Active: 'success', Pending: 'warning', Failed: 'danger',
};

/* ------------------------------------------------------------------ *
 * Columns — edit freely
 * ------------------------------------------------------------------ */
const columns: TableColumn<Member>[] = [
  {
    key: 'name', header: 'Name', width: '24%',
    render: (row) => (
      <span className={styles.cellUser}>
        <Avatar size="sm" initials={row.name.split(' ').map((p) => p[0]).join('')} />
        <span className={styles.cellUser__text}>
          <span className={styles.cellUser__name}>{row.name}</span>
          <span className={styles.cellUser__sub}>{row.role}</span>
        </span>
      </span>
    ),
  },
  { key: 'email',  header: 'Email',  width: '24%' },
  {
    key: 'status', header: 'Status', width: '14%',
    render: (row) => <Badge variant={STATUS_VARIANT[row.status]} emphasis="subtle">{row.status}</Badge>,
  },
  { key: 'role',   header: 'Role',   width: '14%' },
  { key: 'amount', header: 'Amount', width: '14%', align: 'right' },
  {
    key: 'actions', header: '', width: '10%', align: 'right',
    // Pair with Popover + Menu for the open dropdown.
    render: () => (
      <button type="button" className={styles.rowAction} aria-label="Row actions">
        <MoreHorizontal size={16} />
      </button>
    ),
  },
];

/* ------------------------------------------------------------------ *
 * The block
 * ------------------------------------------------------------------ */
export interface DataTableBlockProps {
  state?: DataTableBlockState;
  className?: string;
}

export const DataTableBlock: React.FC<DataTableBlockProps> = ({
  state = 'default',
  className,
}) => {
  const [page, setPage] = React.useState(1);
  const [selected, setSelected] = React.useState<number[]>(state === 'bulk' ? [0, 1, 2] : []);
  const [orderedRows, setOrderedRows] = React.useState<Member[]>(MEMBERS);

  // Keep the demo selection in sync when the `state` prop changes (e.g. the
  // Storybook control). In your own copy you'd drive this from real state.
  React.useEffect(() => {
    setSelected(state === 'bulk' ? [0, 1, 2] : []);
  }, [state]);

  const rows =
    state === 'filtered' ? MEMBERS.filter((m) => m.role === 'Admin' && m.status === 'Active')
    : state === 'empty' || state === 'error' ? []
    : MEMBERS;

  const showBulkBar = selected.length > 0;

  return (
    <div className={[styles.block, className ?? ''].filter(Boolean).join(' ')}>
      {/* ---- Toolbar (or bulk-actions bar when rows are selected) ---- */}
      {showBulkBar ? (
        <div className={styles.bulkBar}>
          <span className={styles.bulkBar__count}>{selected.length} selected</span>
          <span className={styles.spacer} />
          <Button variant="secondary" size="sm" leftIcon={<Download size={16} />}>Export</Button>
          <Button variant="secondary" size="sm" leftIcon={<UserPlus size={16} />}>Assign</Button>
          <Button variant="destructive" size="sm" leftIcon={<Trash size={16} />}>Delete</Button>
        </div>
      ) : (
        <div className={styles.toolbar}>
          <div className={styles.toolbar__left}>
            <div className={styles.search}>
              <Input
                size="md"
                leadingIcon={<Search size={16} />}
                placeholder={state === 'filtered' ? 'admin' : 'Search members…'}
                defaultValue={state === 'filtered' ? 'admin' : undefined}
              />
            </div>
            {state === 'filtered' || state === 'empty' ? (
              <>
                <FilterChip type="active" onRemove={() => {}}>Status: Active</FilterChip>
                <FilterChip type="active" onRemove={() => {}}>Role: Admin</FilterChip>
                <FilterChip type="add">Add filter</FilterChip>
              </>
            ) : (
              <>
                <FilterChip type="default">Status</FilterChip>
                <FilterChip type="add">Add filter</FilterChip>
              </>
            )}
          </div>
          <div className={styles.toolbar__right}>
            <Button variant="secondary" size="sm" leftIcon={<Columns3 size={16} />}>Columns</Button>
            <Button variant="primary" size="sm" leftIcon={<Plus size={16} />}>Add member</Button>
          </div>
        </div>
      )}

      {/* ---- Body ---- */}
      {state === 'loading' ? (
        <div className={styles.panel}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={styles.skeletonRow}>
              <Skeleton variant="rect" width={16} height={16} />
              <Skeleton variant="text" width={150} height={12} />
              <Skeleton variant="text" width={190} height={12} />
              <Skeleton variant="text" width={90} height={12} />
              <Skeleton variant="text" width={120} height={12} />
              <Skeleton variant="text" width={70} height={12} />
            </div>
          ))}
        </div>
      ) : state === 'empty' ? (
        <div className={styles.panel}><EmptyState type="no-results" /></div>
      ) : state === 'error' ? (
        <div className={styles.panel}>
          <EmptyState type="error" actionLabel="Try again" onAction={() => {}} />
        </div>
      ) : (
        <Table<Member>
          columns={columns}
          rows={state === 'filtered' ? rows : orderedRows}
          selectable
          selectedRows={selected}
          onSelectionChange={setSelected}
          rowKey={(row) => row.email}
          reorderable={state === 'default'}
          onReorder={setOrderedRows}
        />
      )}

      {/* ---- Footer ---- */}
      <div className={styles.footer}>
        <span className={styles.footer__count}>
          {state === 'loading' ? 'Loading members…'
            : state === 'error' ? '—'
            : rows.length === 0 ? `Showing 0 of ${MEMBERS.length} members`
            : showBulkBar ? `${selected.length} of ${MEMBERS.length} members selected`
            : `Showing 1–${rows.length} of ${MEMBERS.length} members`}
        </span>
        <Pagination total={state === 'filtered' ? 1 : 5} page={page} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default DataTableBlock;
