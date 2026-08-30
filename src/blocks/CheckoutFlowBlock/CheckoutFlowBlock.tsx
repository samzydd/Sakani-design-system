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
import { CreditCard } from 'lucide-react';
import { CheckoutSteps } from '../../components/ECommerceComponents/CheckoutSteps';
import { CartItem } from '../../components/ECommerceComponents/CartItem';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Divider } from '../../components/Divider';
import { iconStrokeWidth } from '../../lib/iconStrokeWidth';
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

/** Strips everything but digits, caps at 4 (MM + 2-digit YY), and
 * auto-inserts the "/" once the month is complete -- the field's stored
 * value is always numeric-plus-slash, never free text. */
const formatExpiry = (raw: string) => {
  const digits = raw.replace(/\D/g, '').slice(0, 4);
  return digits.length <= 2 ? digits : `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

/** Strips everything but digits, caps at 19 (longest real PAN length), and
 * groups into 4s with a space -- same "numeric-plus-formatting-chars only"
 * approach as formatExpiry above. */
const formatCardNumber = (raw: string) => {
  const digits = raw.replace(/\D/g, '').slice(0, 19);
  return (digits.match(/.{1,4}/g) ?? []).join(' ');
};

type CardBrand = 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown' | null;

/** Identifies a card brand from its leading digits (IIN/BIN ranges) --
 * good enough to drive a UI badge, not a substitute for real PAN
 * validation (Luhn check, issuer lookup) which belongs server-side. */
const detectCardBrand = (rawValue: string): CardBrand => {
  const digits = rawValue.replace(/\D/g, '');
  if (!digits) return null;
  if (/^4/.test(digits)) return 'visa';
  if (/^(5[1-5]|222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)/.test(digits)) return 'mastercard';
  if (/^3[47]/.test(digits)) return 'amex';
  if (/^(6011|65|64[4-9])/.test(digits)) return 'discover';
  return 'unknown';
};

/** Small brand mark shown as the card number field's trailing icon --
 * Visa/Amex/Discover render as their familiar colored wordmark pill,
 * Mastercard as its two-circle mark (the one case where a wordmark
 * wouldn't actually read as the brand), and no/unrecognized input falls
 * back to a plain muted card icon matching every other field's icon. */
const CardBrandBadge: React.FC<{ brand: CardBrand }> = ({ brand }) => {
  if (!brand || brand === 'unknown') {
    return <CreditCard size={16} strokeWidth={iconStrokeWidth(16)} />;
  }
  if (brand === 'mastercard') {
    return (
      <svg width={16} height={16} viewBox="0 0 16 16" aria-label="Mastercard">
        <circle cx="6" cy="8" r="5.5" fill="#EB001B" />
        <circle cx="10" cy="8" r="5.5" fill="#F79E1B" />
        <path d="M8 3a5.5 5.5 0 010 10 5.5 5.5 0 010-10z" fill="#FF5F00" />
      </svg>
    );
  }
  const label = { visa: 'VISA', amex: 'AMEX', discover: 'DISC' }[brand];
  const bg = { visa: '#1A1F71', amex: '#006FCF', discover: '#FF6000' }[brand];
  return (
    <span className={styles.cardBadge} style={{ background: bg }} aria-label={label}>
      {label}
    </span>
  );
};

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
              <Input
                label="Card number"
                placeholder="1234 1234 1234 1234"
                inputMode="numeric"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                trailingIcon={<CardBrandBadge brand={detectCardBrand(cardNumber)} />}
                className={styles.fullWidth}
              />
              <Input
                label="Expiry date"
                placeholder="MM/YY"
                inputMode="numeric"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                className={styles.fullWidth}
              />
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
