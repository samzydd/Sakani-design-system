/**
 * Pagination
 *
 * Page navigation. Matches Figma "Pagination": prev/next arrows + numbered page
 * buttons (32px, radius-sm, bg/surface, border/subtle), active page filled accent.
 * Collapses long ranges with ellipses around a window centred on the current
 * page (see buildRange).
 */

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { iconStrokeWidth } from '../../lib/iconStrokeWidth';
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

type Token = number | 'start-ellipsis' | 'end-ellipsis';

const span = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i);

/** Build the page tokens: first and last page always, the current page with
 * `siblings` pages on EACH side, ellipses for the gaps.
 *
 *   10 pages, siblings 1:
 *     page 1  → 1 2 3 4 5 … 10
 *     page 5  → 1 … 4 5 6 … 10
 *     page 10 → 1 … 6 7 8 9 10
 *
 * The number of slots is constant (siblings * 2 + 5, i.e. 7 by default), so
 * the control keeps the same width as you page through it instead of
 * shifting under the pointer. An ellipsis only ever stands for two or more
 * pages -- a single hidden page is shown as its number instead. With few
 * enough pages to fit the slots, every page is shown. */
function buildRange(total: number, page: number, siblings: number): Token[] {
  const slots = siblings * 2 + 5;
  if (total <= slots) return span(1, total);

  const left = Math.max(page - siblings, 1);
  const right = Math.min(page + siblings, total);
  const showStartEllipsis = left > 3;
  const showEndEllipsis = right < total - 2;

  // Near the start: pad the leading run so the slot count stays fixed.
  if (!showStartEllipsis) return [...span(1, slots - 2), 'end-ellipsis', total];
  // Near the end: same, mirrored.
  if (!showEndEllipsis) return [1, 'start-ellipsis', ...span(total - (slots - 3), total)];
  return [1, 'start-ellipsis', ...span(left, right), 'end-ellipsis', total];
}

export const Pagination: React.FC<PaginationProps> = ({
  total, page: rawPage, onPageChange, siblings = 1, className,
}) => {
  if (total < 1) return null;
  // Keep a stray out-of-range `page` from rendering nothing as current.
  const page = Math.min(Math.max(rawPage, 1), total);
  const pages = buildRange(total, page, Math.max(0, siblings));

  return (
    <nav className={[styles.pagination, className ?? ''].filter(Boolean).join(' ')} aria-label="Pagination">
      <button
        type="button"
        className={styles.arrow}
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} strokeWidth={iconStrokeWidth(16)} />
      </button>

      {pages.map((p) =>
        typeof p !== 'number' ? (
          <span key={p} className={styles.ellipsis} aria-hidden="true">…</span>
        ) : (
          <button
            key={p}
            type="button"
            className={[styles.page, p === page ? styles['page--active'] : ''].filter(Boolean).join(' ')}
            aria-current={p === page ? 'page' : undefined}
            aria-label={`Page ${p}`}
            onClick={() => p !== page && onPageChange(p)}
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
        <ChevronRight size={16} strokeWidth={iconStrokeWidth(16)} />
      </button>
    </nav>
  );
};

export default Pagination;
