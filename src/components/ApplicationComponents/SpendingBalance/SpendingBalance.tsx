/**
 * SpendingBalance
 *
 * Amount spent against a limit, with a bar and a remaining/over-limit
 * footer. Matches Figma "Spending Balance" -- its 2 style previews
 * (Default: spent < limit, black bar, "remaining"; Over Limit: spent >=
 * limit, orange bar, "over your limit") are entirely computable from the
 * real numbers, so there's no variant prop -- "over limit" is derived from
 * `spent > limit`, same judgment applied throughout this Application set.
 *
 * The bar isn't a reuse of Progress -- Progress's fill color is hardcoded
 * to accent/default with no override prop, but this needs a genuinely
 * different fill color (chart/1 orange) once over limit, which Progress
 * has no escape hatch for short of relying on its private internal class
 * names. Small dedicated bar instead, same call already made for Balance's
 * progress ring and several connectors throughout this set.
 */

import React from 'react';
import styles from './SpendingBalance.module.css';

export interface SpendingBalanceProps {
  label?: string;
  spent: number;
  limit: number;
  /** Defaults to USD currency, 2 decimals (e.g. "$1,240.00"). */
  formatAmount?: (amount: number) => string;
  className?: string;
}

const defaultFormatAmount = (amount: number) =>
  amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export const SpendingBalance: React.FC<SpendingBalanceProps> = ({
  label = 'Spent this month', spent, limit, formatAmount = defaultFormatAmount, className,
}) => {
  const isOverLimit = spent > limit;
  const progress = isOverLimit ? 100 : limit > 0 ? (spent / limit) * 100 : 0;
  const footer = isOverLimit
    ? `${formatAmount(spent - limit)} over your limit`
    : `${formatAmount(limit - spent)} remaining`;

  return (
    <div className={[styles.balance, className ?? ''].filter(Boolean).join(' ')}>
      <p className={styles.label}>{label}</p>
      <div className={styles.amountRow}>
        <p className={styles.amount}>{formatAmount(spent)}</p>
        <p className={styles.limit}>of {formatAmount(limit)} limit</p>
      </div>
      <div className={styles.track} role="progressbar" aria-label={label} aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
        <div
          className={[styles.fill, isOverLimit ? styles['fill--over'] : ''].filter(Boolean).join(' ')}
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className={styles.footer}>{footer}</p>
    </div>
  );
};

export default SpendingBalance;
