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

/** Build the list of page tokens with ellipses, e.g. [1, '...', 4, 5, '...', 20].
 *
 * The visible window trails the current page forward -- {page, page+1, ...,
 * page+siblings} -- rather than sitting centered on it. So landing on page 2
 * reveals 3 (not 1 and 3): the set becomes {1, 2, 3, total}. Landing on 3
 * then drops 2 and reveals 4: {1, 3, 4, total}. 1 and total are always
 * present as fixed anchors; everything else only exists once it's adjacent
 * to (at or after) the current page. */
function buildRange(total: number, page: number, siblings: number): (number | 'ellipsis')[] {
  const windowStart = page;
  const windowEnd = Math.min(page + siblings, total);

  const pages = new Set<number>([1, total]);
  for (let i = windowStart; i <= windowEnd; i++) pages.add(i);

  const sorted = Array.from(pages).sort((a, b) => a - b);
  const range: (number | 'ellipsis')[] = [];
  sorted.forEach((n, i) => {
    if (i > 0 && n - sorted[i - 1] > 1) range.push('ellipsis');
    range.push(n);
  });

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
