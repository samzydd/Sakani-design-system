/**
 * BillingHistoryBlock — Blocks / Billing / Billing History
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file
 * into your project and edit it directly: wire `onDownload` to your
 * real invoice PDF endpoint in place of the callback here.
 *
 * Matches Figma "Billing History" (3 states: Default, Empty, Skeleton).
 * Composed entirely from existing components -- Badge (status pill),
 * IconButton (ghost, sm, the download action), Skeleton -- plus a small
 * block-owned row (FileText icon + plan/date, amount, badge, download)
 * since no shared "invoice row" primitive exists in this library.
 *
 * Empty isn't a manual prop -- it's derived from `invoices.length === 0`,
 * same "derive from data" pattern used throughout this library. Skeleton
 * needs an explicit `loading` flag instead: unlike Empty, there's no
 * data yet to derive it from.
 *
 * The divider between rows (border-top on every row but the first) is
 * owned by this block, same reasoning/shape as CareersBlock's own
 * rowDivider treatment for its JobListing rows.
 */

import React from 'react';
import { FileText, Download } from 'lucide-react';
import { iconStrokeWidth } from '../../../lib/iconStrokeWidth';
import { Badge } from '../../../components/Badge';
import { IconButton } from '../../../components/IconButton';
import { Skeleton } from '../../../components/Skeleton';
import styles from './BillingHistoryBlock.module.css';

export type BillingHistoryStatus = 'paid' | 'failed';

export interface BillingHistoryInvoice {
  /** Unique key for the list -- defaults to index if omitted. */
  id?: string;
  /** e.g. "Pro plan — Monthly" */
  planLabel: string;
  /** e.g. "Aug 1, 2026" */
  date: string;
  /** e.g. "$29.00" */
  amount: string;
  status: BillingHistoryStatus;
  onDownload?: () => void;
}

export interface BillingHistoryBlockProps {
  invoices?: BillingHistoryInvoice[];
  /** Shows the Skeleton loading state in place of `invoices` -- unlike
   * Empty (derived from `invoices.length === 0`), there's no data yet
   * at this point to derive it from. */
  loading?: boolean;
  className?: string;
}

const statusBadge: Record<BillingHistoryStatus, { variant: 'success' | 'danger'; label: string }> = {
  paid: { variant: 'success', label: 'Paid' },
  failed: { variant: 'danger', label: 'Failed' },
};

export const BillingHistoryBlock: React.FC<BillingHistoryBlockProps> = ({
  invoices = [],
  loading = false,
  className,
}) => (
  <div className={[styles.card, className ?? ''].filter(Boolean).join(' ')}>
    {loading ? (
      <Skeleton variant="rect" width={140} height={26} />
    ) : (
      <h2 className={styles.title}>Billing history</h2>
    )}

    {loading ? (
      <div className={styles.list}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} variant="rect" width="100%" height={40} />
        ))}
      </div>
    ) : invoices.length === 0 ? (
      <div className={styles.empty}>
        <FileText size={24} strokeWidth={iconStrokeWidth(24)} className={styles.emptyIcon} aria-hidden="true" />
        <p className={styles.emptyTitle}>No invoices yet</p>
        <p className={styles.emptyDescription}>Your billing history will appear here once you're charged.</p>
      </div>
    ) : (
      <div className={styles.list}>
        {invoices.map((invoice, i) => {
          const badge = statusBadge[invoice.status];
          return (
            <div
              key={invoice.id ?? i}
              className={[styles.row, i > 0 ? styles.rowDivider : ''].filter(Boolean).join(' ')}
            >
              <div className={styles.left}>
                <FileText size={24} strokeWidth={iconStrokeWidth(24)} className={styles.rowIcon} aria-hidden="true" />
                <div className={styles.info}>
                  <p className={styles.planLabel}>{invoice.planLabel}</p>
                  <p className={styles.date}>{invoice.date}</p>
                </div>
              </div>

              <div className={styles.right}>
                <p className={styles.amount}>{invoice.amount}</p>
                <Badge variant={badge.variant} emphasis="subtle">{badge.label}</Badge>
                <IconButton
                  icon={Download}
                  variant="ghost"
                  size="sm"
                  aria-label={`Download invoice for ${invoice.date}`}
                  onClick={invoice.onDownload}
                />
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
);

export default BillingHistoryBlock;
