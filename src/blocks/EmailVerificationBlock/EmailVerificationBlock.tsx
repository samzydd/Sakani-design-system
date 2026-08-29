/**
 * EmailVerificationBlock — Blocks / Authentication / Email Verification
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
 * your project and edit it directly: wire `onVerify`/`onResend` to your
 * real API calls in place of the simulated ones here.
 *
 * Matches Figma "Email Verification" (7 states): card -> header -> 6-digit
 * OTP row -> primary Button -> "Didn't receive a code? Resend" footer.
 *
 * Default/Filled aren't a manual prop -- Figma's own two previews are the
 * exact same empty/filled OTP row, which is just `code` state, same
 * "derive from data" pattern used throughout this library. The remaining
 * states collapse into one `status` state machine ('idle' | 'incomplete' |
 * 'server-error' | 'loading' | 'success' | 'skeleton'):
 *   incomplete   -- Validation Error: submitted with <6 digits, inline hint
 *                   text under the row (Figma shows this in fg/muted, not
 *                   danger-colored -- an incomplete code isn't treated as
 *                   a hard error visually, so that's followed literally)
 *   server-error -- Alert banner (danger) + every box gets a danger border
 *   loading      -- boxes disabled/dimmed, Button shows its own spinner
 *   success      -- an entirely different layout (icon-wrap + centered
 *                   copy + Continue button), not a modifier on the OTP card
 *
 * The OTP row is NOT a reuse of the shared Input component -- Input carries
 * label/description/leading-icon plumbing this single centered digit box
 * doesn't need, and needs auto-advance-on-type / backspace-to-previous /
 * paste-splits-across-boxes behavior Input has no hook for. Built as a
 * small dedicated element instead, bound to the same tokens (exact border/
 * radius/bg match), same reasoning as FileUploadPanelBlock's dropzone.
 *
 * Alert has no built-in dismiss control, so the small "x" Figma shows on
 * the Server Error banner isn't reproduced here -- a real dismiss would
 * need extending the shared Alert component, out of scope for this block.
 */

import React from 'react';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';
import { Link } from '../../components/Link';
import { Skeleton } from '../../components/Skeleton';
import { iconStrokeWidth } from '../../lib/iconStrokeWidth';
import { Check } from 'lucide-react';
import styles from './EmailVerificationBlock.module.css';

const CODE_LENGTH = 6;

export type EmailVerificationStatus = 'idle' | 'incomplete' | 'server-error' | 'loading' | 'success' | 'skeleton';

export interface EmailVerificationBlockProps {
  email?: string;
  /** Seeds the demo -- for a real app, status is driven entirely by your
   * own onVerify/onResend handlers instead. */
  initialStatus?: EmailVerificationStatus;
  onVerify?: (code: string) => void;
  onResend?: () => void;
  className?: string;
}

export const EmailVerificationBlock: React.FC<EmailVerificationBlockProps> = ({
  email = 'sam@sakani.com',
  initialStatus = 'idle',
  onVerify,
  onResend,
  className,
}) => {
  const seedFilled = initialStatus === 'server-error' || initialStatus === 'loading';
  const [code, setCode] = React.useState<string[]>(
    seedFilled ? ['4', '8', '2', '9', '1', '3'] : Array(CODE_LENGTH).fill(''),
  );
  const [status, setStatus] = React.useState<EmailVerificationStatus>(initialStatus);
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
    onVerify?.(joined);
    // Simulated verification -- replace with your own API call.
    setTimeout(() => setStatus('success'), 1500);
  };

  const handleResend = () => {
    onResend?.();
  };

  if (status === 'skeleton') {
    return (
      <div className={[styles.card, className ?? ''].filter(Boolean).join(' ')}>
        <div className={styles.skeletonHeader}>
          <Skeleton variant="rect" width={180} height={26} />
          <Skeleton variant="rect" width={280} height={14} />
        </div>
        <div className={styles.otpRow}>
          {Array.from({ length: CODE_LENGTH }).map((_, i) => (
            <Skeleton key={i} variant="rect" width={52} height={52} />
          ))}
        </div>
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
          <h2 className={styles.successTitle}>Email verified</h2>
          <p className={styles.successDescription}>Your email address has been successfully verified.</p>
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
        <h2 className={styles.title}>Verify your email</h2>
        <p className={styles.description}>We sent a 6-digit code to {email}.</p>
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

      <Button variant="primary" className={styles.fullWidth} loading={isLoading} onClick={handleSubmit}>
        {isLoading ? 'Verifying…' : 'Verify email'}
      </Button>

      <div className={styles.footer}>
        <p className={styles.footerText}>Didn&rsquo;t receive a code?</p>
        <Link href="#" onClick={(e) => { e.preventDefault(); handleResend(); }}>Resend</Link>
      </div>
    </div>
  );
};

export default EmailVerificationBlock;
