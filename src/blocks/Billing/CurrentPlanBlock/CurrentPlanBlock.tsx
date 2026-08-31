/**
 * CurrentPlanBlock — Blocks / Billing / Current Plan
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file
 * into your project and edit it directly: wire the action callbacks to
 * your real subscription-management API in place of the ones here.
 *
 * Matches Figma "Current Plan" (5 states: Default, Trial, Past Due,
 * Canceling, Skeleton). Composed entirely from existing components --
 * Badge (status pill), Progress (lg, the usage bar), Alert (danger,
 * Past Due only), Button (primary/secondary), Skeleton.
 *
 * The 5 Figma states collapse into one real `status` union ('active' |
 * 'trial' | 'past-due' | 'canceling'), same "derive the whole layout
 * from one status" pattern EmailVerificationBlock's own status machine
 * uses -- badge label/color, whether the usage row or Alert banner
 * shows, the default message copy, and which action button(s) render
 * are all derived from it, not separate manual toggles:
 *   active    -- usage row + Progress bar, Upgrade/Cancel buttons
 *   trial     -- message line, single "Add payment method" button
 *   past-due  -- Alert banner (danger), single "Update payment
 *                method" button
 *   canceling -- message line, single "Resume subscription" button
 * Skeleton is a separate explicit `loading` flag instead, same
 * reasoning BillingHistoryBlock's own loading flag gives: there's no
 * plan data yet at that point to derive a status from.
 */

import React from 'react';
import { Badge, type BadgeVariant } from '../../../components/Badge';
import { Progress } from '../../../components/Progress';
import { Alert } from '../../../components/Alert';
import { Button } from '../../../components/Button';
import { Skeleton } from '../../../components/Skeleton';
import styles from './CurrentPlanBlock.module.css';

export type CurrentPlanStatus = 'active' | 'trial' | 'past-due' | 'canceling';

const STATUS_BADGE: Record<CurrentPlanStatus, { label: string; variant: BadgeVariant }> = {
  active: { label: 'Active', variant: 'success' },
  trial: { label: 'Trial', variant: 'accent' },
  'past-due': { label: 'Past due', variant: 'danger' },
  canceling: { label: 'Canceling', variant: 'warning' },
};

const DEFAULT_MESSAGE: Partial<Record<CurrentPlanStatus, string>> = {
  trial: '14 days left in your trial. Add a payment method to keep access when it ends.',
  canceling: "Your plan will end on March 15, 2027. You'll keep access until then.",
};

export interface CurrentPlanBlockProps {
  /** e.g. "Pro plan" or "Pro trial". */
  planName: string;
  /** e.g. "$29" */
  price: string;
  /** e.g. "/month" or "/month after trial". Defaults to "/month". */
  priceSuffix?: string;
  status?: CurrentPlanStatus;
  /** Usage row -- shown only in the "active" status, matching Figma. */
  usageLabel?: string;
  usageValue?: string;
  /** 0–100, drives the Progress bar. */
  usagePercent?: number;
  /** Overrides the default trial/canceling copy line. */
  message?: string;
  onUpgrade?: () => void;
  onCancel?: () => void;
  onAddPaymentMethod?: () => void;
  onUpdatePaymentMethod?: () => void;
  onResume?: () => void;
  /** Shows the Skeleton loading state in place of everything else --
   * there's no plan data yet at this point to derive a status from. */
  loading?: boolean;
  className?: string;
}

export const CurrentPlanBlock: React.FC<CurrentPlanBlockProps> = ({
  planName,
  price,
  priceSuffix = '/month',
  status = 'active',
  usageLabel = 'Projects used',
  usageValue,
  usagePercent = 0,
  message,
  onUpgrade,
  onCancel,
  onAddPaymentMethod,
  onUpdatePaymentMethod,
  onResume,
  loading = false,
  className,
}) => {
  if (loading) {
    return (
      <div className={[styles.card, className ?? ''].filter(Boolean).join(' ')}>
        <Skeleton variant="rect" width={140} height={26} />
        <Skeleton variant="rect" width={100} height={32} />
        <Skeleton variant="rect" width="100%" height={8} />
        <Skeleton variant="rect" width={160} height={44} />
      </div>
    );
  }

  const badge = STATUS_BADGE[status];
  const resolvedMessage = message ?? DEFAULT_MESSAGE[status];

  return (
    <div className={[styles.card, className ?? ''].filter(Boolean).join(' ')}>
      {status === 'past-due' && (
        <Alert
          color="danger"
          title="Payment failed"
          description="We couldn't process your last payment. Update your payment method to avoid losing access."
          className={styles.fullWidth}
        />
      )}

      <div className={styles.header}>
        <div className={styles.planInfo}>
          <div className={styles.nameRow}>
            <p className={styles.planName}>{planName}</p>
            <Badge variant={badge.variant} emphasis="subtle">{badge.label}</Badge>
          </div>
          <div className={styles.priceRow}>
            <p className={styles.price}>{price}</p>
            <p className={styles.priceSuffix}>{priceSuffix}</p>
          </div>
        </div>
      </div>

      {status === 'active' && (
        <div className={styles.usage}>
          <div className={styles.usageLabelRow}>
            <p className={styles.usageLabel}>{usageLabel}</p>
            {usageValue && <p className={styles.usageValue}>{usageValue}</p>}
          </div>
          <Progress value={usagePercent} size="lg" label={usageLabel} className={styles.progress} />
        </div>
      )}

      {resolvedMessage && <p className={styles.message}>{resolvedMessage}</p>}

      <div className={styles.actions}>
        {status === 'active' && (
          <>
            <Button variant="primary" size="lg" onClick={onUpgrade} className={styles.actionFlex}>Upgrade plan</Button>
            <Button variant="secondary" size="lg" onClick={onCancel} className={styles.actionFlex}>Cancel subscription</Button>
          </>
        )}
        {status === 'trial' && (
          <Button variant="primary" size="lg" onClick={onAddPaymentMethod} className={styles.fullWidth}>Add payment method</Button>
        )}
        {status === 'past-due' && (
          <Button variant="primary" size="lg" onClick={onUpdatePaymentMethod} className={styles.fullWidth}>Update payment method</Button>
        )}
        {status === 'canceling' && (
          <Button variant="secondary" size="lg" onClick={onResume} className={styles.fullWidth}>Resume subscription</Button>
        )}
      </div>
    </div>
  );
};

export default CurrentPlanBlock;
