/**
 * Pagination
 *
 * Page navigation. Matches Figma "Pagination": prev/next arrows + numbered page
 * buttons (32px, radius-sm, bg/surface, border/subtle), active page filled accent.
 * Collapses long ranges with ellipses.
 */

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Pagination.module.css';

export interface PaginationProps {
  /** Total number of pages. */
  total: number;
  /** Current page (1-based). */
  page: number;
  onPageChange: (page: number) => void;
  /** How many page numbers to show around the current page. */
  siblings?: number;
  className?: string;
}

/** Build the list of page tokens with ellipses, e.g. [1, '…', 4, 5, 6, '…', 20]. */
function buildRange(total: number, page: number, siblings: number): (number | 'ellipsis')[] {
  const range: (number | 'ellipsis')[] = [];
  const left = Math.max(2, page - siblings);
  const right = Math.min(total - 1, page + siblings);

  range.push(1);
  if (left > 2) range.push('ellipsis');
  for (let i = left; i <= right; i++) range.push(i);
  if (right < total - 1) range.push('ellipsis');
  if (total > 1) range.push(total);

  return range;
}

export const Pagination: React.FC<PaginationProps> = ({
  total, page, onPageChange, siblings = 1, className,
}) => {
  const pages = buildRange(total, page, siblings);

  return (
    <nav className={[styles.pagination, className ?? ''].filter(Boolean).join(' ')} aria-label="Pagination">
      <button
        type="button"
        className={styles.arrow}
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} strokeWidth={1.5} />
      </button>

      {pages.map((p, i) =>
        p === 'ellipsis' ? (
          <span key={`e${i}`} className={styles.ellipsis} aria-hidden="true">…</span>
        ) : (
          <button
            key={p}
            type="button"
            className={[styles.page, p === page ? styles['page--active'] : ''].filter(Boolean).join(' ')}
            aria-current={p === page ? 'page' : undefined}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        className={styles.arrow}
        disabled={page >= total}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        <ChevronRight size={16} strokeWidth={1.5} />
      </button>
    </nav>
  );
};

export default Pagination;
