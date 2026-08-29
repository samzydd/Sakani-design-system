/**
 * ForgotPasswordBlock — Blocks / Authentication / Forgot Password
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
 * your project and edit it directly: wire `onSubmit`/`onResend` to your
 * real API calls in place of the simulated ones here.
 *
 * Matches Figma "Forgot Password" (7 states, collapsed into one `status`
 * state machine, same pattern as EmailVerificationBlock):
 *   'idle'          -- Default/Filled: just `email` state, not a manual prop
 *   'invalid-email' -- Validation Error: reuses Input's own `error` prop
 *   'server-error'  -- Alert banner above the form
 *   'loading'       -- Input disabled (Input's own disabled style already
 *                       matches Figma's dimmed bg/subtle look), Button spinner
 *   'sent'          -- an entirely different layout (icon-wrap + centered
 *                       copy + secondary "Resend email" + "Back to log in"),
 *                       not a modifier on the form card
 *   'skeleton'
 *
 * The Send button stays disabled until the email field is non-empty, same
 * disabled-until-complete pattern as the OTP blocks' Verify button.
 *
 * The email field reuses the shared Input component directly (leading Mail
 * icon, `error` prop) -- unlike ResetPasswordBlock's password fields, there's
 * no interactive trailing control here that Input's decorative-only
 * trailingIcon slot couldn't support, so no bespoke field was needed.
 */

import React from 'react';
import { Mail, MailCheck } from 'lucide-react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';
import { Link } from '../../components/Link';
import { Skeleton } from '../../components/Skeleton';
import { iconStrokeWidth } from '../../lib/iconStrokeWidth';
import styles from './ForgotPasswordBlock.module.css';

export type ForgotPasswordStatus = 'idle' | 'invalid-email' | 'server-error' | 'loading' | 'sent' | 'skeleton';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ForgotPasswordBlockProps {
  initialStatus?: ForgotPasswordStatus;
  initialEmail?: string;
  onSubmit?: (email: string) => void;
  onResend?: () => void;
  onLogIn?: () => void;
  className?: string;
}

export const ForgotPasswordBlock: React.FC<ForgotPasswordBlockProps> = ({
  initialStatus = 'idle',
  initialEmail = '',
  onSubmit,
  onResend,
  onLogIn,
  className,
}) => {
  const [email, setEmail] = React.useState(
    initialEmail || (initialStatus === 'server-error' || initialStatus === 'loading' ? 'sam@sakani.com' : ''),
  );
  const [status, setStatus] = React.useState<ForgotPasswordStatus>(initialStatus);

  const handleSubmit = () => {
    if (!EMAIL_RE.test(email)) { setStatus('invalid-email'); return; }
    setStatus('loading');
    onSubmit?.(email);
    // Simulated request -- replace with your own API call.
    setTimeout(() => setStatus('sent'), 1500);
  };

  if (status === 'skeleton') {
    return (
      <div className={[styles.card, className ?? ''].filter(Boolean).join(' ')}>
        <div className={styles.skeletonHeader}>
          <Skeleton variant="rect" width={180} height={26} />
          <Skeleton variant="rect" width={280} height={14} />
        </div>
        <Skeleton variant="rect" width="100%" height={66} />
        <Skeleton variant="rect" width="100%" height={48} />
        <Skeleton variant="rect" width={220} height={14} />
      </div>
    );
  }

  if (status === 'sent') {
    return (
      <div className={[styles.card, className ?? ''].filter(Boolean).join(' ')}>
        <span className={styles.iconWrap} aria-hidden="true">
          <MailCheck size={24} strokeWidth={iconStrokeWidth(24)} />
        </span>
        <div className={styles.centeredHeader}>
          <h2 className={styles.title}>Check your email</h2>
          <p className={styles.description}>We&rsquo;ve sent a password reset link to {email}.</p>
        </div>
        <Button variant="secondary" className={styles.fullWidth} onClick={() => onResend?.()}>Resend email</Button>
        <Link href="#" onClick={(e) => { e.preventDefault(); onLogIn?.(); }}>Back to log in</Link>
      </div>
    );
  }

  const isServerError = status === 'server-error';
  const isLoading = status === 'loading';
  const errorMessage = status === 'invalid-email' ? 'Please enter a valid email address.' : undefined;

  return (
    <div className={[styles.card, className ?? ''].filter(Boolean).join(' ')}>
      <div className={styles.header}>
        <h2 className={styles.title}>Reset password</h2>
        <p className={styles.description}>Enter your email and we&rsquo;ll send you a link to reset your password.</p>
      </div>

      {isServerError && (
        <Alert color="danger" title="Something went wrong" description="We couldn't process your request. Please try again." />
      )}

      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        leadingIcon={<Mail />}
        value={email}
        disabled={isLoading}
        error={errorMessage}
        onChange={(e) => { setEmail(e.target.value); if (status !== 'idle') setStatus('idle'); }}
        className={styles.fullWidth}
      />

      <Button variant="primary" className={styles.fullWidth} loading={isLoading} disabled={!isLoading && email.trim() === ''} onClick={handleSubmit}>
        {isLoading ? 'Sending link…' : 'Send reset link'}
      </Button>

      <div className={styles.footer}>
        <p className={styles.footerText}>Remember your password?</p>
        <Link href="#" onClick={(e) => { e.preventDefault(); onLogIn?.(); }}>Log in</Link>
      </div>
    </div>
  );
};

export default ForgotPasswordBlock;
