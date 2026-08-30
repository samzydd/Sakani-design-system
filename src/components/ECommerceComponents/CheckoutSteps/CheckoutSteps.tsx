/**
 * CheckoutSteps
 *
 * Matches Figma "Checkout Steps" (E-commerce set): a fixed-width horizontal
 * breadcrumb of 24px circles joined by fixed 32px connector lines --
 * Cart / Shipping / Payment / Confirmation by default.
 *
 * Figma's 3 style previews (Step 2/3/4) are really just `currentStep` at
 * different values -- every circle before it reads "completed", the one at
 * it reads "active", everything after reads "upcoming", so this takes a
 * single `currentStep` index instead of a manual per-style prop, same
 * derive-from-data pattern used throughout this library.
 *
 * Every circle -- completed, active, AND upcoming -- shows the same
 * checkmark glyph (confirmed from the actual icon assets: identical path,
 * only the stroke color differs: fg/on-inverse white on completed's solid
 * black fill, fg/default on active's accent-bordered white fill, fg/subtle
 * on upcoming's border-subtle white fill). That's a deliberately different
 * visual language than Stepper/MultistepModalBlock, which show numbers for
 * current/upcoming -- so this is a small dedicated element, not a reuse of
 * either.
 */

import React from 'react';
import { Check } from 'lucide-react';
import { iconStrokeWidth } from '../../../lib/iconStrokeWidth';
import styles from './CheckoutSteps.module.css';

export const DEFAULT_CHECKOUT_STEPS = ['Cart', 'Shipping', 'Payment', 'Confirmation'];

export interface CheckoutStepsProps {
  steps?: string[];
  /** 0-indexed. Steps before this are "completed", this one is "active",
   *  steps after are "upcoming". */
  currentStep: number;
  className?: string;
}

type StepState = 'completed' | 'active' | 'upcoming';

export const CheckoutSteps: React.FC<CheckoutStepsProps> = ({
  steps = DEFAULT_CHECKOUT_STEPS, currentStep, className,
}) => (
  <div className={[styles.steps, className ?? ''].filter(Boolean).join(' ')} role="list">
    {steps.map((label, i) => {
      const state: StepState = i < currentStep ? 'completed' : i === currentStep ? 'active' : 'upcoming';
      const isLast = i === steps.length - 1;
      return (
        <React.Fragment key={label}>
          <div className={styles.step} role="listitem" aria-current={state === 'active' ? 'step' : undefined}>
            <span
              className={[
                styles.circle,
                state === 'completed' ? styles.circleCompleted : '',
                state === 'active' ? styles.circleActive : '',
                state === 'upcoming' ? styles.circleUpcoming : '',
              ].filter(Boolean).join(' ')}
              aria-hidden="true"
            >
              <Check size={14} strokeWidth={iconStrokeWidth(14)} />
            </span>
            <span
              className={[
                styles.label,
                state === 'active' ? styles.labelActive : '',
                state === 'upcoming' ? styles.labelUpcoming : '',
              ].filter(Boolean).join(' ')}
            >
              {label}
            </span>
          </div>
          {!isLast && <span className={styles.connector} aria-hidden="true" />}
        </React.Fragment>
      );
    })}
  </div>
);

export default CheckoutSteps;
