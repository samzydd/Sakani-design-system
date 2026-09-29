/**
 * Pagination
 *
 * Page navigation. Matches Figma "Pagination": prev/next arrows + numbered page
 * buttons (32px, radius-sm, bg/surface, border/subtle), active page filled accent.
 * Collapses long ranges with ellipses; the numbers between them come in fixed
 * blocks the highlight moves across (see buildRange).
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
  /** Sets how many page numbers show between the ellipses: blocks of
   * siblings * 2 + 1 (3 by default). Total slots are siblings * 2 + 5. */
  siblings?: number;
  className?: string;
}

type Token = number | 'start-ellipsis' | 'end-ellipsis';

const span = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i);

/** Build the page tokens: first and last page always, ellipses for the gaps,
 * and the numbers in between shown in FIXED BLOCKS that the highlight moves
 * across -- the numbers don't re-centre on every click.
 *
 *   50 pages, siblings 1 (7 slots, middle blocks of 3):
 *     pages 1–5   → 1 2 3 4 5 … 50          (highlight moves, numbers still)
 *     pages 6–8   → 1 … 6 7 8 … 50          (same block for all three)
 *     pages 9–11  → 1 … 9 10 11 … 50
 *     …
 *     pages 46–50 → 1 … 46 47 48 49 50
 *
 * So the numbers change only when you step past the edge of the block on
 * screen -- the same single turnover as going from 5 to 6 -- instead of
 * sliding under a fixed highlight each time. The slot count is constant
 * (siblings * 2 + 5), so the control never changes width. An ellipsis always
 * stands for two or more pages. With few enough pages to fit, all are shown. */
function buildRange(total: number, page: number, siblings: number): Token[] {
  const slots = siblings * 2 + 5;
  if (total <= slots) return span(1, total);

  const edgeRun = slots - 2;          // 1..edgeRun at the start, mirrored at the end
  const block = siblings * 2 + 1;     // middle block size

  if (page <= edgeRun) return [...span(1, edgeRun), 'end-ellipsis', total];

  // Middle: consecutive blocks of `block` pages, starting right after the
  // leading run. A block is used as long as the ellipsis after it still
  // hides two or more pages; the first one that can't hand over to the
  // trailing run. (Blocks are never pulled back to fit, which would shift
  // the numbers by one -- the very jump this layout avoids.)
  const start = edgeRun + 1 + Math.floor((page - edgeRun - 1) / block) * block;
  const end = start + block - 1;
  if (end <= total - 3) return [1, 'start-ellipsis', ...span(start, end), 'end-ellipsis', total];

  return [1, 'start-ellipsis', ...span(total - edgeRun + 1, total)];
}

export const Pagination: React.FC<PaginationProps> = ({
  total, page: rawPage, onPageChange, siblings = 1, className,
}) => {
  // Numbers on screen last render. If the new page is one of them, keep them
  // as they are and just move the highlight -- so neither stepping with the
  // arrows (in either direction) nor clicking a visible number ever redraws
  // the row. Only stepping off the edge, jumping to an anchor behind an
  // ellipsis, or an outside change of `page` builds a fresh range.
  const shown = React.useRef<{ total: number; siblings: number; tokens: Token[] } | null>(null);
  if (total < 1) return null;
  // Keep a stray out-of-range `page` from rendering nothing as current.
  const page = Math.min(Math.max(rawPage, 1), total);
  const sib = Math.max(0, siblings);

  let pages = buildRange(total, page, sib);
  const prev = shown.current;
  if (prev && prev.total === total && prev.siblings === sib) {
    const t = prev.tokens;
    const visible = t.includes(page);
    // 1 / total sitting alone behind an ellipsis are anchors, not part of the
    // run on screen: going there should bring its own run into view.
    const loneAnchor =
      (page === 1 && t[1] === 'start-ellipsis') || (page === total && t[t.length - 2] === 'end-ellipsis');
    if (visible && !loneAnchor) pages = t;
  }
  shown.current = { total, siblings: sib, tokens: pages };

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
