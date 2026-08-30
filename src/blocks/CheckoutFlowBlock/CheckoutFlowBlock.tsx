/**
 * CheckoutFlowBlock — Blocks / E-commerce / Checkout Flow
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
 * your project and edit it directly: wire the form submissions to your
 * real shipping/payment APIs in place of the simulated flow here.
 *
 * Matches Figma "Checkout Flow" (2 states: Shipping, Payment) -- both are
 * really just this block's own `step` state at different values, not a
 * manual style prop, same "derive from data" pattern used throughout this
 * library. Composed entirely from components already in this library:
 * CheckoutSteps (E-commerce), Input, Button, Divider, and CartItem
 * (E-commerce, already wired to the real QuantitySelector) for the order
 * summary's line item.
 *
 * CheckoutSteps' own 4 fixed steps (Cart/Shipping/Payment/Confirmation)
 * cover more ground than this block owns -- Cart and Confirmation are
 * separate blocks in this same set -- so this block's `step` maps onto
 * CheckoutSteps' `currentStep` at index 1 (Shipping) or 2 (Payment) only.
 *
 * The order summary reflects real, live cart state (quantity changes on
 * the CartItem actually recompute the subtotal/total below it), not
 * static numbers -- same reasoning as every other block's demo state
 * being genuinely wired rather than decorative.
 */

import React from 'react';
import { CheckoutSteps } from '../../components/ECommerceComponents/CheckoutSteps';
import { CartItem } from '../../components/ECommerceComponents/CartItem';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Divider } from '../../components/Divider';
import styles from './CheckoutFlowBlock.module.css';

export interface CheckoutFlowItem {
  id?: string;
  image: string;
  imageAlt?: string;
  name: string;
  variant?: string;
  price: number;
  quantity: number;
}

export type CheckoutFlowStep = 'shipping' | 'payment';

export interface CheckoutFlowBlockProps {
  items: CheckoutFlowItem[];
  /** 0 (default) renders "Free" in the summary, matching Figma. */
  shippingCost?: number;
  initialStep?: CheckoutFlowStep;
  onComplete?: (order: {
    shipping: { fullName: string; address: string; city: string };
    payment: { cardNumber: string; expiry: string; cvc: string };
  }) => void;
  formatPrice?: (amount: number) => string;
  className?: string;
}

const defaultFormatPrice = (amount: number) =>
  amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export const CheckoutFlowBlock: React.FC<CheckoutFlowBlockProps> = ({
  items: initialItems, shippingCost = 0, initialStep = 'shipping',
  onComplete, formatPrice = defaultFormatPrice, className,
}) => {
  const [step, setStep] = React.useState<CheckoutFlowStep>(initialStep);
  const [items, setItems] = React.useState(initialItems);

  const [fullName, setFullName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [city, setCity] = React.useState('');

  const [cardNumber, setCardNumber] = React.useState('');
  const [expiry, setExpiry] = React.useState('');
  const [cvc, setCvc] = React.useState('');

  const setQuantity = (index: number, quantity: number) =>
    setItems((current) => current.map((item, i) => (i === index ? { ...item, quantity } : item)));

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shippingCost;

  const handleContinue = () => setStep('payment');
  const handlePlaceOrder = () => {
    onComplete?.({
      shipping: { fullName, address, city },
      payment: { cardNumber, expiry, cvc },
    });
  };

  return (
    <div className={[styles.block, className ?? ''].filter(Boolean).join(' ')}>
      <CheckoutSteps currentStep={step === 'shipping' ? 1 : 2} />

      <div className={styles.columns}>
        <div className={styles.formCard}>
          {step === 'shipping' ? (
            <>
              <h2 className={styles.title}>Shipping address</h2>
              <Input label="Full name" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} className={styles.fullWidth} />
              <Input label="Address" placeholder="Street address" value={address} onChange={(e) => setAddress(e.target.value)} className={styles.fullWidth} />
              <Input label="City" placeholder="Enter your city" value={city} onChange={(e) => setCity(e.target.value)} className={styles.fullWidth} />
              <Button variant="primary" className={styles.fullWidth} onClick={handleContinue} disabled={!fullName.trim() || !address.trim() || !city.trim()}>
                Continue to payment
              </Button>
            </>
          ) : (
            <>
              <h2 className={styles.title}>Payment details</h2>
              <Input label="Card number" placeholder="1234 1234 1234 1234" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className={styles.fullWidth} />
              <Input label="Expiry date" placeholder="MM / YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} className={styles.fullWidth} />
              <Input label="CVC" placeholder="123" value={cvc} onChange={(e) => setCvc(e.target.value)} className={styles.fullWidth} />
              <Button variant="primary" className={styles.fullWidth} onClick={handlePlaceOrder} disabled={!cardNumber.trim() || !expiry.trim() || !cvc.trim()}>
                Place order
              </Button>
            </>
          )}
        </div>

        <div className={styles.summaryCard}>
          <h2 className={styles.title}>Order summary</h2>
          {items.map((item, i) => (
            <CartItem
              key={item.id ?? item.name}
              image={item.image}
              imageAlt={item.imageAlt}
              name={item.name}
              variant={item.variant}
              price={item.price}
              quantity={item.quantity}
              onQuantityChange={(q) => setQuantity(i, q)}
              onRemove={() => setItems((current) => current.filter((_, idx) => idx !== i))}
            />
          ))}
          <Divider />
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
      </div>
    </div>
  );
};

export default CheckoutFlowBlock;
