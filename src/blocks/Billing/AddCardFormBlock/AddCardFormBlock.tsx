/**
 * AddCardFormBlock — Blocks / Billing / Add Card Form
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file
 * into your project and edit it directly: wire `onSave` to your real
 * payment-provider tokenization call (Stripe Elements, etc.) in place
 * of the simulated one here -- a real integration should never send a
 * raw PAN/CVC to your own backend at all.
 *
 * Matches Figma "Add Card Form" (5 states: Form Default, Form Filled,
 * Form Validation Error, Form Server Error, Form Loading) -- the
 * second of the two Figma links for "Payment method", alongside
 * PaymentMethodBlock. Composed entirely from existing form components
 * -- Input (all 4 fields, with lucide User/CreditCard leading icons),
 * Alert (danger, Server Error only), Button (primary, full width, its
 * own built-in loading spinner).
 *
 * Same shape as BillingAddressBlock's own status machine: Default/
 * Filled are just field content, not a manual prop; the remaining 3
 * states collapse into one real `status` union ('idle' | 'invalid' |
 * 'server-error' | 'loading') -- submitting runs a light card-number
 * sanity check (inline error on that field only, via Input's own
 * `error` prop), simulates a save, and calls `onSave`.
 *
 * Card number/expiry formatting (digit-grouping into "1234 1234 1234
 * 1234" / "MM/YY") mirrors CheckoutFlowBlock's own formatCardNumber/
 * formatExpiry helpers -- reimplemented locally rather than imported,
 * since those are block-local, not exported from that block.
 */

import React from 'react';
import { User, CreditCard } from 'lucide-react';
import { Input } from '../../../components/Input';
import { Alert } from '../../../components/Alert';
import { Button } from '../../../components/Button';
import styles from './AddCardFormBlock.module.css';

export interface AddCardFormValue {
  cardholderName: string;
  /** Digits only in the value passed to `onSave` -- displayed grouped. */
  cardNumber: string;
  /** "MM/YY" */
  expiry: string;
  cvc: string;
}

export type AddCardFormStatus = 'idle' | 'invalid' | 'server-error' | 'loading';

const EMPTY_VALUE: AddCardFormValue = { cardholderName: '', cardNumber: '', expiry: '', cvc: '' };

/** Strips everything but digits, caps at 4, and inserts the "/" after
 * the 2nd -- same approach as CheckoutFlowBlock's own formatExpiry. */
const formatExpiry = (raw: string) => {
  const digits = raw.replace(/\D/g, '').slice(0, 4);
  return digits.length <= 2 ? digits : `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

/** Strips everything but digits, caps at 16 (the globally standard PAN
 * length this field targets), and groups into 4s with a space -- same
 * approach as CheckoutFlowBlock's own formatCardNumber. */
const formatCardNumber = (raw: string) => {
  const digits = raw.replace(/\D/g, '').slice(0, 16);
  return (digits.match(/.{1,4}/g) ?? []).join(' ');
};

/** Light sanity check, not a Luhn check or real PAN validation -- just
 * enough to demonstrate the Validation Error state on submit. */
const isValidCardNumber = (cardNumber: string) => cardNumber.replace(/\D/g, '').length === 16;

export interface AddCardFormBlockProps {
  initialValue?: Partial<AddCardFormValue>;
  /** Seeds the demo -- for a real app, status is driven entirely by
   * your own onSave handler instead. */
  initialStatus?: AddCardFormStatus;
  onSave?: (value: AddCardFormValue) => void;
  className?: string;
}

export const AddCardFormBlock: React.FC<AddCardFormBlockProps> = ({
  initialValue,
  initialStatus = 'idle',
  onSave,
  className,
}) => {
  const [value, setValue] = React.useState<AddCardFormValue>({ ...EMPTY_VALUE, ...initialValue });
  const [status, setStatus] = React.useState<AddCardFormStatus>(initialStatus);

  const set = <K extends keyof AddCardFormValue>(key: K, v: AddCardFormValue[K]) => {
    setValue((current) => ({ ...current, [key]: v }));
    if (status === 'invalid' || status === 'server-error') setStatus('idle');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;

    if (!isValidCardNumber(value.cardNumber)) {
      setStatus('invalid');
      return;
    }

    setStatus('loading');
    window.setTimeout(() => {
      setStatus('idle');
      onSave?.(value);
    }, 900);
  };

  const disabled = status === 'loading';

  return (
    <form className={[styles.card, className ?? ''].filter(Boolean).join(' ')} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Add payment method</h2>

      {status === 'server-error' && (
        <Alert
          color="danger"
          title="Card declined"
          description="Your card was declined. Try a different payment method or contact your bank."
        />
      )}

      <div className={styles.form}>
        <Input
          label="Cardholder name"
          placeholder="Name on card"
          leadingIcon={<User />}
          value={value.cardholderName}
          onChange={(e) => set('cardholderName', e.target.value)}
          disabled={disabled}
        />
        <Input
          label="Card number"
          placeholder="1234 1234 1234 1234"
          leadingIcon={<CreditCard />}
          inputMode="numeric"
          value={value.cardNumber}
          onChange={(e) => set('cardNumber', formatCardNumber(e.target.value))}
          disabled={disabled}
          error={status === 'invalid' ? 'Enter a valid 16-digit card number.' : undefined}
        />
        <div className={styles.row}>
          <Input
            label="Expiry"
            placeholder="MM/YY"
            inputMode="numeric"
            value={value.expiry}
            onChange={(e) => set('expiry', formatExpiry(e.target.value))}
            disabled={disabled}
            className={styles.rowField}
          />
          <Input
            label="CVC"
            placeholder="123"
            inputMode="numeric"
            value={value.cvc}
            onChange={(e) => set('cvc', e.target.value.replace(/\D/g, '').slice(0, 4))}
            disabled={disabled}
            className={styles.rowField}
          />
        </div>
      </div>

      <Button type="submit" variant="primary" size="lg" loading={status === 'loading'} className={styles.submit}>
        {status === 'loading' ? 'Saving card…' : 'Save card'}
      </Button>
    </form>
  );
};

export default AddCardFormBlock;
