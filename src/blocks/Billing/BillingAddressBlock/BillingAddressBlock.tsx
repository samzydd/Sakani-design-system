/**
 * BillingAddressBlock — Blocks / Billing / Billing Address
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file
 * into your project and edit it directly: wire `onSave` to your real API
 * call in place of the simulated one here.
 *
 * Matches Figma "Billing Address" (5 states: Default, Filled, Validation
 * Error, Server Error, Loading). Composed entirely from existing form
 * components -- Select (Country), Input (the other 5 fields), Alert
 * (danger, Server Error only), Button (primary, full width).
 *
 * Default/Filled aren't a manual prop -- Figma's own two previews are the
 * same form with/without values, which is just field state, same
 * "derive from data" pattern EmailVerificationBlock's own Default/Filled
 * uses for its OTP row. The remaining 3 states collapse into one real
 * `status` state machine ('idle' | 'invalid' | 'server-error' |
 * 'loading'), same shape as EmailVerificationBlock's own status union:
 *   invalid      -- Validation Error: postal code fails a light sanity
 *                   check on submit, inline error text under that field
 *                   only (Select/Input's own built-in `error` prop --
 *                   no extra markup needed for this state)
 *   server-error -- Alert banner (danger) above the form; fields keep
 *                   their values so the user doesn't have to retype
 *   loading      -- every field disabled (Select/Input's own disabled
 *                   visual already matches Figma's dimmed bg/subtle
 *                   look exactly), Button shows its own built-in
 *                   loading spinner + "Saving…" label
 *
 * Submitting with a real postal code clears any prior error and calls
 * `onSave` after a short simulated delay -- there's no distinct
 * "success" visual in Figma's own 5 states, so this simply returns to
 * idle with the saved values still filled in, same as a real save would
 * leave the form.
 */

import React from 'react';
import { Select, type SelectOption } from '../../../components/Select';
import { Input } from '../../../components/Input';
import { Alert } from '../../../components/Alert';
import { Button } from '../../../components/Button';
import styles from './BillingAddressBlock.module.css';

export interface BillingAddressValue {
  country: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
}

export type BillingAddressStatus = 'idle' | 'invalid' | 'server-error' | 'loading';

/** Flag emoji prefixed straight onto the label -- Select's own option
 * shape is plain text, so this is the flag Figma shows to the left of
 * the country name without extending Select with an icon slot just for
 * this one field. Renders in both the trigger and the dropdown list
 * since both just print `option.label` as-is. */
const DEFAULT_COUNTRIES: SelectOption[] = [
  { label: '🇳🇬 Nigeria', value: 'NG' },
  { label: '🇺🇸 United States', value: 'US' },
  { label: '🇬🇧 United Kingdom', value: 'GB' },
  { label: '🇰🇪 Kenya', value: 'KE' },
  { label: '🇿🇦 South Africa', value: 'ZA' },
];

const EMPTY_VALUE: BillingAddressValue = {
  country: '', addressLine1: '', addressLine2: '', city: '', state: '', postalCode: '',
};

/** Light sanity check, not real postal-code validation -- just enough to
 * demonstrate the Validation Error state on submit. */
const isValidPostalCode = (postalCode: string) => /^[A-Za-z0-9][A-Za-z0-9 -]{2,9}$/.test(postalCode.trim());

export interface BillingAddressBlockProps {
  /** Seeds the fields -- presence/absence is what distinguishes Figma's
   * own Default vs. Filled previews. */
  initialValue?: Partial<BillingAddressValue>;
  countries?: SelectOption[];
  /** Seeds the demo -- for a real app, status is driven entirely by your
   * own onSave handler instead. */
  initialStatus?: BillingAddressStatus;
  onSave?: (value: BillingAddressValue) => void;
  className?: string;
}

export const BillingAddressBlock: React.FC<BillingAddressBlockProps> = ({
  initialValue,
  countries = DEFAULT_COUNTRIES,
  initialStatus = 'idle',
  onSave,
  className,
}) => {
  const [value, setValue] = React.useState<BillingAddressValue>({ ...EMPTY_VALUE, ...initialValue });
  const [status, setStatus] = React.useState<BillingAddressStatus>(initialStatus);

  const set = <K extends keyof BillingAddressValue>(key: K, v: BillingAddressValue[K]) => {
    setValue((current) => ({ ...current, [key]: v }));
    if (status === 'invalid' || status === 'server-error') setStatus('idle');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;

    if (!isValidPostalCode(value.postalCode)) {
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
      <h2 className={styles.title}>Billing address</h2>

      {status === 'server-error' && (
        <Alert
          color="danger"
          title="Address verification failed"
          description="We couldn't verify this address. Please check the details and try again."
        />
      )}

      <div className={styles.form}>
        <Select
          label="Country"
          placeholder="Select a country"
          options={countries}
          value={value.country}
          onChange={(v) => set('country', v)}
          disabled={disabled}
        />
        <Input
          label="Address line 1"
          placeholder="Street address"
          value={value.addressLine1}
          onChange={(e) => set('addressLine1', e.target.value)}
          disabled={disabled}
        />
        <Input
          label="Address line 2 (optional)"
          placeholder="Apartment, suite, etc."
          value={value.addressLine2}
          onChange={(e) => set('addressLine2', e.target.value)}
          disabled={disabled}
        />
        <div className={styles.row}>
          <Input
            label="City"
            placeholder="City"
            value={value.city}
            onChange={(e) => set('city', e.target.value)}
            disabled={disabled}
            className={styles.rowField}
          />
          <Input
            label="State"
            placeholder="State"
            value={value.state}
            onChange={(e) => set('state', e.target.value)}
            disabled={disabled}
            className={styles.rowField}
          />
        </div>
        <Input
          label="Postal code"
          placeholder="Postal code"
          value={value.postalCode}
          onChange={(e) => set('postalCode', e.target.value)}
          disabled={disabled}
          error={status === 'invalid' ? 'Enter a valid postal code.' : undefined}
        />
      </div>

      <Button type="submit" variant="primary" size="lg" loading={status === 'loading'} className={styles.submit}>
        {status === 'loading' ? 'Saving…' : 'Save address'}
      </Button>
    </form>
  );
};

export default BillingAddressBlock;
