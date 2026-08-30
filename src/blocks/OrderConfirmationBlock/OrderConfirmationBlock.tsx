/**
 * OrderConfirmationBlock — Blocks / E-commerce / Order Confirmation
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
 * your project and edit it directly: wire the "Continue shopping"/"Track
 * order" actions to your real navigation in place of the no-op callbacks
 * here.
 *
 * Matches Figma "Order Confirmation" (2 states: Default, With Tracking) --
 * same "derive from data" pattern used throughout this library (CartItem's
 * sale price, CheckoutFlowBlock's card brand badge): whether the tracking
 * row + "Track order" button render is fully driven by whether
 * `estimatedDelivery` was passed, not a manual style prop -- there's no
 * other axis distinguishing the two Figma states.
 *
 * Composed entirely from components already in this library: Divider and
 * Button. The order's line items are rendered as a lightweight read-only
 * row here rather than reusing CartItem (E-commerce) -- CartItem always
 * ships its own quantity stepper and remove button, neither of which
 * belongs on a confirmation screen the user can no longer edit.
 */

import React from 'react';
import { CircleCheck, Truck } from 'lucide-react';
import { Divider } from '../../components/Divider';
import { Button } from '../../components/Button';
import { iconStrokeWidth } from '../../lib/iconStrokeWidth';
import styles from './OrderConfirmationBlock.module.css';

export interface OrderConfirmationItem {
  id?: string;
  image: string;
  imageAlt?: string;
  name: string;
  variant?: string;
  price: number;
}

export interface OrderConfirmationBlockProps {
  orderNumber: string;
  items: OrderConfirmationItem[];
  total: number;
  /** Presence renders the "With Tracking" style: an estimated-delivery row
   * plus a "Track order" button above "Continue shopping". Absence renders
   * the plain Default style -- see the file doc for why this isn't a
   * separate style prop. */
  estimatedDelivery?: string;
  onTrackOrder?: () => void;
  onContinueShopping?: () => void;
  formatPrice?: (amount: number) => string;
  className?: string;
}

const defaultFormatPrice = (amount: number) =>
  amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export const OrderConfirmationBlock: React.FC<OrderConfirmationBlockProps> = ({
  orderNumber, items, total, estimatedDelivery, onTrackOrder, onContinueShopping,
  formatPrice = defaultFormatPrice, className,
}) => {
  const hasTracking = Boolean(estimatedDelivery);

  return (
    <div className={[styles.block, className ?? ''].filter(Boolean).join(' ')}>
      <span className={styles.iconWrap} aria-hidden="true">
        <CircleCheck size={28} strokeWidth={iconStrokeWidth(28)} />
      </span>

      <h2 className={styles.title}>Order confirmed</h2>
      <p className={styles.subtitle}>Thanks for your order. We&rsquo;ve sent a confirmation to your email.</p>
      <p className={styles.orderNumber}>Order #{orderNumber}</p>

      <Divider className={styles.fullWidth} />

      {items.map((item) => (
        <div key={item.id ?? item.name} className={styles.itemRow}>
          <img src={item.image} alt={item.imageAlt ?? ''} className={styles.itemThumb} />
          <div className={styles.itemInfo}>
            <p className={styles.itemName}>{item.name}</p>
            {item.variant && <p className={styles.itemVariant}>{item.variant}</p>}
          </div>
          <p className={styles.itemPrice}>{formatPrice(item.price)}</p>
        </div>
      ))}

      <Divider className={styles.fullWidth} />

      <div className={styles.summaryRow}>
        <span className={styles.summaryLabel}>Total paid</span>
        <span className={styles.summaryValue}>{formatPrice(total)}</span>
      </div>

      {hasTracking && (
        <div className={styles.trackingRow}>
          <Truck size={24} strokeWidth={iconStrokeWidth(24)} aria-hidden="true" />
          <span>Estimated delivery: {estimatedDelivery}</span>
        </div>
      )}

      {hasTracking ? (
        <div className={styles.buttonGroup}>
          <Button variant="secondary" className={styles.fullWidth} onClick={onTrackOrder}>
            Track order
          </Button>
          <Button variant="primary" className={styles.fullWidth} onClick={onContinueShopping}>
            Continue shopping
          </Button>
        </div>
      ) : (
        <Button variant="primary" className={styles.fullWidth} onClick={onContinueShopping}>
          Continue shopping
        </Button>
      )}
    </div>
  );
};

export default OrderConfirmationBlock;
