/**
 * Stepper / StepperStep
 *
 * Progress stepper. Matches Figma "Stepper" (Steps 2-6) + "Stepper Step"
 * (Completed | Current | Upcoming).
 *
 * The circle is Figma's own standalone "Progress Item Value" component
 * (node 1679:45850) embedded here, not a bespoke shape -- its 3 statuses
 * map 1:1 to completed/current/upcoming:
 *   Completed  — bg/inverse fill (32px), fg/on-inverse check
 *   Current    — bg/surface fill, accent/default 2px ring, fg/default number, bold label
 *   Upcoming   — bg/surface fill, border/subtle 2px ring, fg/muted number, muted label
 * (Verified directly against that node -- an earlier pass had drifted: 28px
 * instead of 32, accent/default instead of bg/inverse for Completed, and
 * bg/subtle + border/default 1.5px instead of bg/surface + border/subtle 2px
 * for Upcoming.)
 * Connectors between steps color accent up to the current step.
 */

import React from 'react';
import { Check } from 'lucide-react';
import { iconStrokeWidth } from '../../lib/iconStrokeWidth';
import styles from './Stepper.module.css';

export type StepState = 'completed' | 'current' | 'upcoming';

export interface Step {
  label: string;
  description?: string;
}

export interface StepperProps {
  steps: Step[];
  /** Index of the current (active) step, 0-based. */
  current: number;
  /** Orientation. Defaults to horizontal. */
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

/** Single step — exported so it can be used standalone (mirrors Figma "Stepper Step"). */
export const StepperStep: React.FC<{
  index: number;
  state: StepState;
  label: string;
  description?: string;
  orientation?: 'horizontal' | 'vertical';
}> = ({ index, state, label, description, orientation = 'horizontal' }) => (
  <div className={[styles.step, styles[`step--${orientation}`]].join(' ')}>
    <span className={[styles.circle, styles[`circle--${state}`]].join(' ')} aria-hidden="true">
      {state === 'completed' ? <Check size={14} strokeWidth={iconStrokeWidth(14)} /> : <span className={styles.circle__num}>{index + 1}</span>}
    </span>
    <span className={styles.step__text}>
      <span className={[styles.step__label, state === 'current' ? styles['step__label--current'] : '', state === 'upcoming' ? styles['step__label--upcoming'] : ''].filter(Boolean).join(' ')}>{label}</span>
      {description && <span className={styles.step__desc}>{description}</span>}
    </span>
  </div>
);

export const Stepper: React.FC<StepperProps> = ({ steps, current, orientation = 'horizontal', className }) => {
  const stateFor = (i: number): StepState => (i < current ? 'completed' : i === current ? 'current' : 'upcoming');

  return (
    <div className={[styles.stepper, styles[`stepper--${orientation}`], className ?? ''].filter(Boolean).join(' ')}>
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <StepperStep index={i} state={stateFor(i)} label={step.label} description={step.description} orientation={orientation} />
          {i < steps.length - 1 && (
            <span className={[styles.connector, styles[`connector--${orientation}`], i < current ? styles['connector--filled'] : ''].filter(Boolean).join(' ')} aria-hidden="true" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;
