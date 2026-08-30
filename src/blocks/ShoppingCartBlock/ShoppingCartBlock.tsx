/**
 * ShoppingCartBlock — Blocks / E-commerce / Shopping Cart
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
 * your project and edit it directly: wire "Checkout"/"Continue shopping"
 * to your real cart/checkout flow in place of the callbacks here.
 *
 * Matches Figma "Shopping Cart" (node 1659:30038, 2 states: Default,
 * Empty). Whether the Empty layout renders is fully derived from
 * `items.length === 0`, not a manual style prop -- same "derive from
 * data" pattern used throughout this library. The header count and the
 * subtotal/total are likewise derived from the live item state (quantity
 * changes and removals recompute both), not static numbers, same
 * reasoning as CheckoutFlowBlock's own order summary.
 *
 * Composed entirely from components already in this library: CartItem
 * (E-commerce, already covering the row's own thumb/name/variant/
 * quantity-stepper/price/sale-treatment/remove-button), Divider, and
 * Button -- no new visual primitives.
 */

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { CartItem } from '../../components/ECommerceComponents/CartItem';
import { Divider } from '../../components/Divider';
import { Button } from '../../components/Button';
import { iconStrokeWidth } from '../../lib/iconStrokeWidth';
import styles from './ShoppingCartBlock.module.css';

export interface ShoppingCartItemData {
  id?: string;
  image: string;
  imageAlt?: string;
  name: string;
  variant?: string;
  price: number;
  /** Presence switches that row to CartItem's own struck-original + danger-current sale treatment. */
  compareAtPrice?: number;
  quantity: number;
}

export interface ShoppingCartBlockProps {
  items: ShoppingCartItemData[];
  /** 0 (default) renders "Free" in the summary, matching Figma. */
  shippingCost?: number;
  onCheckout?: (items: ShoppingCartItemData[]) => void;
  onContinueShopping?: () => void;
  formatPrice?: (amount: number) => string;
  className?: string;
}

const defaultFormatPrice = (amount: number) =>
  amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export const ShoppingCartBlock: React.FC<ShoppingCartBlockProps> = ({
  items: initialItems, shippingCost = 0, onCheckout, onContinueShopping,
  formatPrice = defaultFormatPrice, className,
}) => {
  const [items, setItems] = React.useState(initialItems);

  const setQuantity = (index: number, quantity: number) =>
    setItems((current) => current.map((item, i) => (i === index ? { ...item, quantity } : item)));
  const removeItem = (index: number) =>
    setItems((current) => current.filter((_, i) => i !== index));

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shippingCost;

  if (items.length === 0) {
    return (
      <div className={[styles.emptyBlock, className ?? ''].filter(Boolean).join(' ')}>
        <span className={styles.emptyIconWrap} aria-hidden="true">
          <ShoppingBag size={24} strokeWidth={iconStrokeWidth(24)} />
        </span>
        <p className={styles.emptyTitle}>Your cart is empty</p>
        <p className={styles.emptySubtitle}>Items you add will show up here.</p>
        <Button variant="primary" onClick={onContinueShopping}>Continue shopping</Button>
      </div>
    );
  }

  return (
    <div className={[styles.block, className ?? ''].filter(Boolean).join(' ')}>
      <h2 className={styles.title}>Your cart ({itemCount})</h2>

      <div className={styles.items}>
        {items.map((item, i) => (
          <CartItem
            key={item.id ?? item.name}
            image={item.image}
            imageAlt={item.imageAlt}
            name={item.name}
            variant={item.variant}
            price={item.price}
            compareAtPrice={item.compareAtPrice}
            quantity={item.quantity}
            onQuantityChange={(q) => setQuantity(i, q)}
            onRemove={() => removeItem(i)}
            formatPrice={formatPrice}
          />
        ))}
      </div>

      <Divider className={styles.fullWidth} />

      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Subtotal</span>
          <span className={styles.summaryValue}>{formatPrice(subtotal)}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Shipping</span>
          <span className={styles.summaryValue}>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryTotalLabel}>Total</span>
          <span className={styles.summaryTotalValue}>{formatPrice(total)}</span>
        </div>
      </div>

      <Button variant="primary" className={styles.fullWidth} onClick={() => onCheckout?.(items)}>
        Checkout
      </Button>
    </div>
  );
};

export default ShoppingCartBlock;
