/**
 * TwoFactorAuthBlock — Blocks / Authentication / Two-Factor Authentication
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
 * your project and edit it directly: wire `onVerify`/`onUseBackupCode` to
 * your real API calls in place of the simulated ones here.
 *
 * Matches Figma "2FA Verification" -- structurally identical to
 * EmailVerificationBlock (same 6-state machine, same OTP row behavior,
 * same disabled-until-complete Verify button, same reasoning for every
 * reuse-vs-build call: see that file's header for the full rationale,
 * deliberately not repeated here) with two content differences:
 *   - a "Trust this device for 30 days" Checkbox between the OTP row and
 *     the Button (reuses the shared Checkbox component directly)
 *   - footer reads "Lost your device? Use a backup code" instead of a
 *     resend prompt
 * The two are kept as separate self-contained block files rather than one
 * block with a `kind` prop, matching the Blocks convention (and the CLI's
 * assumption) that a block is one standalone, independently copy-paste-able
 * file -- sharing an internal sub-component between them isn't safe to
 * assume a copy-paste consumer would grab too.
 */

import React from 'react';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';
import { Link } from '../../components/Link';
import { Checkbox } from '../../components/Checkbox';
import { Skeleton } from '../../components/Skeleton';
import { iconStrokeWidth } from '../../lib/iconStrokeWidth';
import { Check } from 'lucide-react';
import styles from './TwoFactorAuthBlock.module.css';

const CODE_LENGTH = 6;

export type TwoFactorAuthStatus = 'idle' | 'incomplete' | 'server-error' | 'loading' | 'success' | 'skeleton';

export interface TwoFactorAuthBlockProps {
  /** Seeds the demo -- for a real app, status is driven entirely by your
   * own onVerify/onUseBackupCode handlers instead. */
  initialStatus?: TwoFactorAuthStatus;
  onVerify?: (code: string, trustDevice: boolean) => void;
  onUseBackupCode?: () => void;
  className?: string;
}

export const TwoFactorAuthBlock: React.FC<TwoFactorAuthBlockProps> = ({
  initialStatus = 'idle',
  onVerify,
  onUseBackupCode,
  className,
}) => {
  const seedFilled = initialStatus === 'server-error' || initialStatus === 'loading';
  const [code, setCode] = React.useState<string[]>(
    seedFilled ? ['4', '8', '2', '9', '1', '3'] : Array(CODE_LENGTH).fill(''),
  );
  const [status, setStatus] = React.useState<TwoFactorAuthStatus>(initialStatus);
  const [trustDevice, setTrustDevice] = React.useState(false);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const setDigit = (index: number, digit: string) => {
    setCode((current) => {
      const next = [...current];
      next[index] = digit;
      return next;
    });
  };

  const handleChange = (index: number, raw: string) => {
    if (status === 'loading') return;
    const digit = raw.replace(/\D/g, '').slice(-1);
    setDigit(index, digit);
    if (status === 'server-error' || status === 'incomplete') setStatus('idle');
    if (digit && index < CODE_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setDigit(index - 1, '');
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LENGTH).split('');
    if (digits.length === 0) return;
    e.preventDefault();
    setCode((current) => {
      const next = [...current];
      digits.forEach((d, i) => { next[i] = d; });
      return next;
    });
    inputRefs.current[Math.min(digits.length, CODE_LENGTH - 1)]?.focus();
  };

  const handleSubmit = () => {
    const joined = code.join('');
    if (joined.length < CODE_LENGTH) { setStatus('incomplete'); return; }
    setStatus('loading');
    onVerify?.(joined, trustDevice);
    // Simulated verification -- replace with your own API call.
    setTimeout(() => setStatus('success'), 1500);
  };

  if (status === 'skeleton') {
    return (
      <div className={[styles.card, className ?? ''].filter(Boolean).join(' ')}>
        <div className={styles.skeletonHeader}>
          <Skeleton variant="rect" width={260} height={26} />
          <Skeleton variant="rect" width={320} height={14} />
        </div>
        <div className={styles.otpRow}>
          {Array.from({ length: CODE_LENGTH }).map((_, i) => (
            <Skeleton key={i} variant="rect" width={52} height={52} />
          ))}
        </div>
        <Skeleton variant="rect" width={220} height={18} />
        <Skeleton variant="rect" width="100%" height={48} />
        <Skeleton variant="rect" width={220} height={14} />
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className={[styles.card, className ?? ''].filter(Boolean).join(' ')}>
        <span className={styles.successIconWrap} aria-hidden="true">
          <Check size={24} strokeWidth={iconStrokeWidth(24)} />
        </span>
        <div className={styles.successHeader}>
          <h2 className={styles.successTitle}>You&rsquo;re verified</h2>
          <p className={styles.successDescription}>Two-factor authentication confirmed for this session.</p>
        </div>
        <Button variant="primary" className={styles.fullWidth}>Continue</Button>
      </div>
    );
  }

  const isServerError = status === 'server-error';
  const isIncomplete = status === 'incomplete';
  const isLoading = status === 'loading';

  return (
    <div className={[styles.card, className ?? ''].filter(Boolean).join(' ')}>
      <div className={styles.header}>
        <h2 className={styles.title}>Two-factor authentication</h2>
        <p className={styles.description}>Enter the 6-digit code from your authenticator app.</p>
      </div>

      {isServerError && (
        <Alert color="danger" title="Verification failed" description="That code is incorrect or has expired." />
      )}

      <div className={styles.otpBlock}>
        <div className={styles.otpRow}>
          {code.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              autoComplete={i === 0 ? 'one-time-code' : 'off'}
              maxLength={1}
              value={digit}
              disabled={isLoading}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              className={[
                styles.otpBox,
                isServerError ? styles.otpBoxError : '',
                isLoading ? styles.otpBoxLoading : '',
              ].filter(Boolean).join(' ')}
              aria-label={`Digit ${i + 1} of ${CODE_LENGTH}`}
            />
          ))}
        </div>
        {isIncomplete && <p className={styles.hint}>Please enter the full 6-digit code.</p>}
      </div>

      <Checkbox
        label="Trust this device for 30 days"
        checked={trustDevice}
        disabled={isLoading}
        onChange={(e) => setTrustDevice(e.target.checked)}
        className={styles.checkboxRow}
      />

      <Button
        variant="primary"
        className={styles.fullWidth}
        loading={isLoading}
        disabled={!isLoading && code.some((d) => !d)}
        onClick={handleSubmit}
      >
        {isLoading ? 'Verifying…' : 'Verify'}
      </Button>

      <div className={styles.footer}>
        <p className={styles.footerText}>Lost your device?</p>
        <Link href="#" onClick={(e) => { e.preventDefault(); onUseBackupCode?.(); }}>Use a backup code</Link>
      </div>
    </div>
  );
};

export default TwoFactorAuthBlock;
