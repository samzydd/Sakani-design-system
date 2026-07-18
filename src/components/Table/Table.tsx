/**
 * Table
 *
 * Data table. Matches Figma "Table":
 *   - container: bg/surface, border/subtle 1px, radius-md
 *   - header row: bg/canvas, 44px, overline text (Geist), fg/muted, border/subtle divider
 *   - body rows: 44px, body/sm text (Geist), border/subtle dividers
 *   - selectable: custom checkbox — 18px, radius-sm, bg/surface, subtle border + shadow/sm
 *     drop shadow (NOT a heavy stroke), accent/default when checked
 *
 * Dark mode: all colors are semantic tokens, so .dark re-themes automatically.
 */

import React from 'react';
import styles from './Table.module.css';

export interface TableColumn<T> {
  key: keyof T & string;
  header: string;
  render?: (row: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  rows: T[];
  selectable?: boolean;
  selectedRows?: number[];
  onSelectionChange?: (indices: number[]) => void;
  rowKey?: (row: T, index: number) => string | number;
  className?: string;
}

/** Custom checkbox matching Figma: rounded box with shadow/sm, accent fill + check when on. */
const TableCheckbox: React.FC<{
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
  label: string;
}> = ({ checked, indeterminate, onChange, label }) => {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => { if (ref.current) ref.current.indeterminate = Boolean(indeterminate); }, [indeterminate]);
  return (
    <label className={styles.checkbox}>
      <input ref={ref} type="checkbox" checked={checked} onChange={onChange} className={styles.checkbox__input} aria-label={label} />
      <span className={styles.checkbox__box} aria-hidden="true">
        <svg className={styles.checkbox__check} width={12} height={12} viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span className={styles.checkbox__dash} />
      </span>
    </label>
  );
};

export function Table<T>({
  columns, rows, selectable, selectedRows, onSelectionChange, rowKey, className,
}: TableProps<T>) {
  const isControlled = selectedRows !== undefined;
  const [internal, setInternal] = React.useState<number[]>([]);
  const selected = isControlled ? selectedRows! : internal;

  const setSelected = (next: number[]) => {
    if (!isControlled) setInternal(next);
    onSelectionChange?.(next);
  };

  const allSelected = rows.length > 0 && selected.length === rows.length;
  const someSelected = selected.length > 0 && !allSelected;
  const toggleAll = () => setSelected(allSelected ? [] : rows.map((_, i) => i));
  const toggleRow = (i: number) =>
    setSelected(selected.includes(i) ? selected.filter((x) => x !== i) : [...selected, i]);

  return (
    <div className={[styles.wrap, className ?? ''].filter(Boolean).join(' ')}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            {selectable && (
              <th className={styles.checkCell}>
                <TableCheckbox checked={allSelected} indeterminate={someSelected} onChange={toggleAll} label="Select all rows" />
              </th>
            )}
            {columns.map((col) => (
              <th key={col.key} className={styles.headerCell} style={{ textAlign: col.align ?? 'left', width: col.width }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const isSel = selected.includes(i);
            return (
              <tr key={rowKey ? rowKey(row, i) : i} className={[styles.bodyRow, isSel ? styles['bodyRow--selected'] : ''].filter(Boolean).join(' ')}>
                {selectable && (
                  <td className={styles.checkCell}>
                    <TableCheckbox checked={isSel} onChange={() => toggleRow(i)} label={`Select row ${i + 1}`} />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className={styles.bodyCell} style={{ textAlign: col.align ?? 'left' }}>
                    {col.render ? col.render(row) : String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
