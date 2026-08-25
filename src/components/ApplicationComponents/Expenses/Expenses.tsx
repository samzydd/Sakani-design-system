/**
 * Expenses
 *
 * Spending-by-category list. Matches Figma "Expenses":
 *   Default — icon + label + amount, with an 8px bar underneath each row
 *             sized relative to the largest category in the list
 *   Compact — the same rows with the bars omitted
 *
 * Unlike most of this Application set, the variant here isn't derivable
 * from the data -- both styles use exactly the same rows, so it's a real
 * display-density toggle, not a data-driven state.
 *
 * The bar reuses the existing Progress component (size="lg" is Figma's
 * exact 8px track height, fill already binds to accent/default) rather
 * than a bespoke one -- accepting its bg/subtle track over Figma's literal
 * bg/canvas here, since the two are barely distinguishable off-whites and
 * Progress has no style-override escape hatch to fix that without either
 * fighting CSS cascade order or forking the component for one token.
 */

import React from 'react';
import { Progress } from '../../Progress';
import styles from './Expenses.module.css';

export interface ExpenseCategory {
  id?: string | number;
  icon: React.ReactNode;
  label: string;
  /** Raw amount -- formatted for display via `formatAmount`. */
  amount: number;
}

export type ExpensesVariant = 'default' | 'compact';

export interface ExpensesProps {
  categories: ExpenseCategory[];
  variant?: ExpensesVariant;
  /** Defaults to USD currency, 2 decimals (e.g. "$840.20"). */
  formatAmount?: (amount: number) => string;
  className?: string;
}

const defaultFormatAmount = (amount: number) =>
  amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export const Expenses: React.FC<ExpensesProps> = ({
  categories, variant = 'default', formatAmount = defaultFormatAmount, className,
}) => {
  const isCompact = variant === 'compact';
  const maxAmount = Math.max(1, ...categories.map((c) => c.amount));

  return (
    <div className={[styles.expenses, className ?? ''].filter(Boolean).join(' ')}>
      {categories.map((category, i) => (
        <div key={category.id ?? i} className={styles.row}>
          <div className={styles.top}>
            <div className={styles.left}>
              <span className={styles.icon} aria-hidden="true">{category.icon}</span>
              <p className={styles.label}>{category.label}</p>
            </div>
            <p className={styles.amount}>{formatAmount(category.amount)}</p>
          </div>
          {!isCompact && (
            <Progress
              value={(category.amount / maxAmount) * 100}
              size="lg"
              label={`${category.label} spending`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Expenses;
