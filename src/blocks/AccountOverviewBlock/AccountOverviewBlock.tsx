/**
 * AccountOverviewBlock — Blocks / Application / Account Overview
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
 * your project and edit it directly. Everything here is assembled from
 * existing Sakani components -- no new primitives:
 *
 *   Balance (available balance + change) -> Divider -> SpendingBalance
 *   -> optionally another Divider + a savings-goal Progress bar
 *
 * Mirrors the two states in the Figma block:
 *   default  · balance + spending only
 *   detailed · adds a savings-goal section
 */

import React from 'react';
import { Balance } from '../../components/ApplicationComponents/Balance';
import { SpendingBalance } from '../../components/ApplicationComponents/SpendingBalance';
import { Divider } from '../../components/Divider';
import { Progress } from '../../components/Progress';
import styles from './AccountOverviewBlock.module.css';

export type AccountOverviewBlockState = 'default' | 'detailed';

export interface AccountOverviewBlockProps {
  state?: AccountOverviewBlockState;
  className?: string;
}

export const AccountOverviewBlock: React.FC<AccountOverviewBlockProps> = ({
  state = 'default',
  className,
}) => (
  <div className={[styles.block, className ?? ''].filter(Boolean).join(' ')}>
    <Balance
      value="$24,582.30"
      change={{ value: '+$1,240.50', label: 'this month', direction: 'up' }}
    />
    <Divider />
    <SpendingBalance spent={1240} limit={2000} />
    {state === 'detailed' && (
      <>
        <Divider />
        <div className={styles.savingsGoal}>
          <div className={styles.savingsGoal__labelRow}>
            <span className={styles.savingsGoal__label}>Savings goal</span>
            <span className={styles.savingsGoal__value}>45%</span>
          </div>
          <Progress value={45} size="md" label="Savings goal" />
        </div>
      </>
    )}
  </div>
);

export default AccountOverviewBlock;
