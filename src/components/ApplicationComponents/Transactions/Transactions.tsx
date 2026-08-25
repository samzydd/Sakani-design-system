/**
 * Transactions
 *
 * Matches Figma "Transactions" -- both style previews collapse to one
 * derived axis, same judgment applied throughout this Application set:
 * the Empty state renders whenever `transactions` is empty, rather than a
 * separate manual prop that could disagree with the actual data.
 *
 * Each row's `icon` is a required, consumer-supplied slot (like StockMarket's
 * `logo`) -- category icons are arbitrary per integration, so there's no
 * sensible default mapping to bake in.
 *
 * The Empty state is a bespoke block rather than a reuse of the shared
 * EmptyState component: EmptyState wraps its icon in a 40px filled chip and
 * uses 12px description text, but Figma's Transactions-Empty shows a bare
 * unwrapped icon and 14px body text at tighter spacing -- a real shape
 * difference, not a token nuance.
 *
 * Amount color is derived from its own sign (>= 0 -> success, < 0 ->
 * danger), normalizing Figma's inconsistent hardcoded positive-green hex to
 * the same success/danger-solid tokens as every other signed value in this
 * set (StockMarket, SpendingBalance).
 */

import React from 'react';
import { Receipt } from 'lucide-react';
import { iconStrokeWidth } from '../../../lib/iconStrokeWidth';
import styles from './Transactions.module.css';

export interface Transaction {
  id?: string | number;
  name: string;
  category: string;
  /** Positive = income (success), negative = expense (danger). */
  amount: number;
  icon: React.ReactNode;
}

export interface TransactionsProps {
  transactions: Transaction[];
  formatAmount?: (amount: number) => string;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
}

const defaultFormatAmount = (amount: number) =>
  `${amount >= 0 ? '+' : '-'}${Math.abs(amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`;

export const Transactions: React.FC<TransactionsProps> = ({
  transactions,
  formatAmount = defaultFormatAmount,
  emptyTitle = 'No transactions yet',
  emptyDescription = 'Your activity will show up here.',
  className,
}) => {
  if (transactions.length === 0) {
    return (
      <div className={[styles.empty, className ?? ''].filter(Boolean).join(' ')}>
        <Receipt size={24} strokeWidth={iconStrokeWidth(24)} className={styles.emptyIcon} />
        <p className={styles.emptyTitle}>{emptyTitle}</p>
        <p className={styles.emptyDesc}>{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className={[styles.list, className ?? ''].filter(Boolean).join(' ')}>
      {transactions.map((tx, i) => {
        const isPositive = tx.amount >= 0;
        return (
          <div
            key={tx.id ?? `${tx.name}-${i}`}
            className={[styles.row, i === transactions.length - 1 ? styles.rowLast : ''].filter(Boolean).join(' ')}
          >
            <div className={styles.left}>
              <span className={styles.iconWrap} aria-hidden="true">{tx.icon}</span>
              <div className={styles.info}>
                <p className={styles.name}>{tx.name}</p>
                <p className={styles.category}>{tx.category}</p>
              </div>
            </div>
            <p className={[styles.amount, isPositive ? styles.amountUp : styles.amountDown].join(' ')}>
              {formatAmount(tx.amount)}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Transactions;
