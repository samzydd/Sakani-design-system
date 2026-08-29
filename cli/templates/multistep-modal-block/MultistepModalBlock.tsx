/**
 * MultistepModalBlock — Blocks / Application / Multistep Modal
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
 * your project and edit it directly: swap the steps/content for your own flow.
 *
 * Matches Figma "Multistep" (node 1632:29532): a steps row (no connector
 * lines between circles, unlike the standalone Stepper component) -> title
 * + description -> Back / Continue-or-Submit footer. No divider before the
 * footer and no header/close-X row at all -- both toggled off via Modal's
 * `hideFooterDivider`/`hideHeader` props (added for this block), and the
 * Back/Continue footer spans the full card width via `footerJustify="between"`
 * (also added for this block; the base Modal's Cancel/Confirm stay clustered
 * at the right) -- so the shared Modal still owns the portal/backdrop/
 * focus-trap/dark-mode plumbing.
 *
 * The steps row is NOT a reuse of the shared Stepper component: Stepper
 * always draws a connector between circles and sizes them at 32px (matching
 * the standalone "Progress Item Value" atom, per an earlier fix); this
 * component's own circles are a deliberately smaller 28px with no connector
 * at all -- a genuinely different shape, so it's built locally here instead,
 * bound to the same tokens.
 */

import React from 'react';
import { Check } from 'lucide-react';
import { Modal } from '@sakaniui/react';
import { iconStrokeWidth } from '@sakaniui/react';
import styles from './MultistepModalBlock.module.css';

interface StepContent {
  label: string;
  title: string;
  description: string;
}

const STEPS: StepContent[] = [
  {
    label: 'Account details',
    title: 'Step 1 of 3: Account details',
    description: "Let's start with some basic details about your account.",
  },
  {
    label: 'Payment info',
    title: 'Step 2 of 3: Payment info',
    description: 'Fill in the details below, then continue to the next step. You can come back and edit anything before submitting.',
  },
  {
    label: 'Review',
    title: 'Step 3 of 3: Review',
    description: 'Fill in the details below, then continue to the next step. You can come back and edit anything before submitting.',
  },
];

type StepState = 'completed' | 'current' | 'upcoming';

const StepCircle: React.FC<{ state: StepState; index: number }> = ({ state, index }) => {
  if (state === 'completed') {
    return (
      <span className={[styles.circle, styles.circleCompleted].join(' ')} aria-hidden="true">
        <Check size={14} strokeWidth={iconStrokeWidth(14)} />
      </span>
    );
  }
  return (
    <span
      className={[styles.circle, state === 'current' ? styles.circleCurrent : styles.circleUpcoming].join(' ')}
      aria-hidden="true"
    >
      {index + 1}
    </span>
  );
};

export interface MultistepModalBlockProps {
  open: boolean;
  onClose: () => void;
  /** Which step to open on — for demoing a mid-flow state. Defaults to the first step. */
  initialStep?: number;
  className?: string;
}

export const MultistepModalBlock: React.FC<MultistepModalBlockProps> = ({
  open, onClose, initialStep = 0, className,
}) => {
  const [step, setStep] = React.useState(initialStep);
  const [submitting, setSubmitting] = React.useState(false);
  const isLast = step === STEPS.length - 1;

  // Reset to the requested starting step each time the modal re-opens.
  React.useEffect(() => {
    if (open) { setStep(initialStep); setSubmitting(false); }
  }, [open, initialStep]);

  const handleBack = () => {
    if (step === 0) { onClose(); return; }
    setStep((s) => s - 1);
  };

  const handleNext = () => {
    if (!isLast) { setStep((s) => s + 1); return; }
    setSubmitting(true);
    // Simulated submit -- replace with your own submit handler.
    setTimeout(() => { setSubmitting(false); onClose(); }, 1500);
  };

  const active = STEPS[step];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={active.title}
      hideHeader
      hideFooterDivider
      footerJustify="between"
      cancelLabel="Back"
      onCancel={handleBack}
      confirmLabel={isLast ? (submitting ? 'Submitting…' : 'Submit') : 'Continue'}
      confirmLoading={submitting}
      onConfirm={handleNext}
      closeOnEscape={!submitting}
      closeOnBackdropClick={!submitting}
      className={[styles.modalCard, className ?? ''].filter(Boolean).join(' ')}
    >
      <div className={styles.steps}>
        {STEPS.map((s, i) => {
          const state: StepState = i < step ? 'completed' : i === step ? 'current' : 'upcoming';
          return (
            <div key={s.label} className={styles.step}>
              <StepCircle state={state} index={i} />
              <span className={[styles.stepLabel, state === 'current' ? styles.stepLabelCurrent : '', state === 'upcoming' ? styles.stepLabelUpcoming : ''].filter(Boolean).join(' ')}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
      <div className={styles.body}>
        <h2 className={styles.title}>{active.title}</h2>
        <p className={styles.description}>{active.description}</p>
      </div>
    </Modal>
  );
};

export default MultistepModalBlock;
