/**
 * PaymentMethodBlock — Blocks / Billing / Payment Method
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file
 * into your project and edit it directly: wire the action callbacks to
 * your real payment-provider (Stripe, etc.) update/add flows.
 *
 * Matches Figma "Payment Method" (5 states: Default, Empty, Expiring
 * Soon, Expired, Skeleton). Composed from existing components -- Badge
 * (status pill), Button, Skeleton -- plus the real Visa/Mastercard
 * marks in cardBrandIcons.tsx (see that file's own doc comment).
 *
 * Empty isn't a manual prop -- it's derived from `card` being absent,
 * same "derive from data" pattern used throughout this library. The
 * remaining 3 non-empty states (Default/Expiring Soon/Expired) collapse
 * into `card.status` ('active' | 'expiring-soon' | 'expired'): whether
 * a badge shows, its color/label, and whether the action button is
 * secondary (active) or primary (expiring-soon/expired, matching
 * Figma's own visual urgency escalation) are all derived from it.
 * Skeleton needs an explicit `loading` flag instead, same reasoning as
 * every other Billing block's own loading flag: there's no card data
 * yet at that point to derive a status from.
 */

import React from 'react';
import { CreditCard } from 'lucide-react';
import { iconStrokeWidth } from '../../../lib/iconStrokeWidth';
import { Badge, type BadgeVariant } from '../../../components/Badge';
import { Button } from '../../../components/Button';
import { Skeleton } from '../../../components/Skeleton';
import { cardBrandIcons, type PaymentMethodBrand } from './cardBrandIcons';
import styles from './PaymentMethodBlock.module.css';

export type PaymentMethodStatus = 'active' | 'expiring-soon' | 'expired';

export interface PaymentMethodCard {
  brand: PaymentMethodBrand;
  /** Last 4 digits, e.g. "4242". */
  last4: string;
  /** e.g. "08/27" */
  expiry: string;
  status?: PaymentMethodStatus;
}

const STATUS_BADGE: Partial<Record<PaymentMethodStatus, { label: string; variant: BadgeVariant }>> = {
  'expiring-soon': { label: 'Expiring soon', variant: 'warning' },
  expired: { label: 'Expired', variant: 'danger' },
};

export interface PaymentMethodBlockProps {
  /** Omit to show the Empty state. */
  card?: PaymentMethodCard;
  onUpdateCard?: () => void;
  onAddPaymentMethod?: () => void;
  /** Shows the Skeleton loading state in place of everything else --
   * there's no card data yet at this point to derive a status from. */
  loading?: boolean;
  className?: string;
}

export const PaymentMethodBlock: React.FC<PaymentMethodBlockProps> = ({
  card,
  onUpdateCard,
  onAddPaymentMethod,
  loading = false,
  className,
}) => {
  if (loading) {
    return (
      <div className={[styles.card, className ?? ''].filter(Boolean).join(' ')}>
        <Skeleton variant="rect" width={160} height={26} />
        <Skeleton variant="rect" width="100%" height={56} />
        <Skeleton variant="rect" width={140} height={44} />
      </div>
    );
  }

  if (!card) {
    return (
      <div className={[styles.card, className ?? ''].filter(Boolean).join(' ')}>
        <h2 className={styles.title}>Payment method</h2>
        <div className={styles.empty}>
          <CreditCard size={24} strokeWidth={iconStrokeWidth(24)} className={styles.emptyIcon} aria-hidden="true" />
          <p className={styles.emptyLabel}>No payment method on file</p>
        </div>
        <Button variant="primary" size="lg" onClick={onAddPaymentMethod} className={styles.fullWidth}>
          Add payment method
        </Button>
      </div>
    );
  }

  const { brand, last4, expiry, status = 'active' } = card;
  const BrandIcon = cardBrandIcons[brand];
  const badge = STATUS_BADGE[status];
  const urgent = status !== 'active';

  return (
    <div className={[styles.card, className ?? ''].filter(Boolean).join(' ')}>
      <h2 className={styles.title}>Payment method</h2>

      <div className={styles.cardRow}>
        <div className={styles.left}>
          <div className={styles.brandWrap}>
            <BrandIcon />
          </div>
          <div className={styles.info}>
            <div className={styles.numRow}>
              <p className={styles.number}>•••• {last4}</p>
              {badge && <Badge variant={badge.variant} emphasis="subtle">{badge.label}</Badge>}
            </div>
            <p className={styles.expiry}>Expires {expiry}</p>
          </div>
        </div>
      </div>

      <Button
        variant={urgent ? 'primary' : 'secondary'}
        size="lg"
        onClick={onUpdateCard}
        className={styles.fullWidth}
      >
        Update card
      </Button>
    </div>
  );
};

export default PaymentMethodBlock;
