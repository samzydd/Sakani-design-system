/**
 * FilterChip
 *
 * Toolbar filter pill. Matches the Figma "Filter Chip" set:
 *
 *   type (Figma "Type" axis) -> default | active | add
 *
 * - default: label + chevron; opens a filter menu on click.
 * - active:  applied value (strong label) on accent/subtle + remove (×).
 * - add:     dashed outline + plus; appends a new filter.
 */

import React from 'react';
import { ChevronDown, X, Plus } from 'lucide-react';
import styles from './FilterChip.module.css';

export type FilterChipType = 'default' | 'active' | 'add';

export interface FilterChipProps {
  type?: FilterChipType;
  children: React.ReactNode;
  /** Fires when the chip body is clicked (open menu / add). */
  onClick?: () => void;
  /** Fires when the × is clicked on an active chip. */
  onRemove?: () => void;
  className?: string;
}

export const FilterChip: React.FC<FilterChipProps> = ({
  type = 'default',
  children,
  onClick,
  onRemove,
  className,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={[styles.chip, styles[`chip--${type}`], className ?? ''].filter(Boolean).join(' ')}
  >
    {type === 'add' && <Plus size={14} className={styles.chip__lead} aria-hidden="true" />}
    <span className={styles.chip__label}>{children}</span>
    {type === 'default' && <ChevronDown size={14} className={styles.chip__trail} aria-hidden="true" />}
    {type === 'active' && (
      <span
        role="button"
        aria-label="Remove filter"
        className={styles.chip__remove}
        onClick={(e) => { e.stopPropagation(); onRemove?.(); }}
      >
        <X size={14} aria-hidden="true" />
      </span>
    )}
  </button>
);

export default FilterChip;
