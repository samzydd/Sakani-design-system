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
 *
 * Motion: moving between steps is choreographed, not a snap. Going forward the
 * connector fills from the step you leave toward the next one, and that circle
 * activates when the bar arrives (its ring ripples once, the previous circle's
 * check draws in). Going back plays it in reverse, the bar draining toward the
 * earlier step. Jumping several steps hands the fill from bar to bar. The first
 * render doesn't animate, and prefers-reduced-motion makes every change instant.
 */

import React, { useEffect, useRef, useState } from 'react';
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
  /** ms to wait before this step's state change plays (the stepper uses it to
   *  sequence a multi-step move). */
  delay?: number;
  /** True while this step has just changed state: plays the check-draw / arrival ripple. */
  fresh?: boolean;
}> = ({ index, state, label, description, orientation = 'horizontal', delay = 0, fresh }) => (
  <div className={[styles.step, styles[`step--${orientation}`]].join(' ')} style={{ ['--delay' as string]: `${delay}ms` }}>
    <span className={[styles.circle, styles[`circle--${state}`]].join(' ')} data-fresh={fresh || undefined} aria-hidden="true">
      {state === 'completed' ? <Check size={14} strokeWidth={iconStrokeWidth(14)} /> : <span className={styles.circle__num}>{index + 1}</span>}
    </span>
    <span className={styles.step__text}>
      <span className={[styles.step__label, state === 'current' ? styles['step__label--current'] : '', state === 'upcoming' ? styles['step__label--upcoming'] : ''].filter(Boolean).join(' ')}>{label}</span>
      {description && <span className={styles.step__desc}>{description}</span>}
    </span>
  </div>
);

/** Length of one connector's fill, in ms. A long jump is sped up so it stays under ~1s. */
const FILL_MS = 320;

export const Stepper: React.FC<StepperProps> = ({ steps, current, orientation = 'horizontal', className }) => {
  const stateFor = (i: number): StepState => (i < current ? 'completed' : i === current ? 'current' : 'upcoming');

  // Where we came from, so the change can be sequenced in the right direction. Read
  // during render (the old value), updated after the commit.
  const prev = useRef(current);
  // Transitions switch on right after the first paint, so the first render never animates
  // but the very first change does.
  const [ready, setReady] = useState(false);
  useEffect(() => { setReady(true); }, []);
  useEffect(() => { prev.current = current; }, [current]);

  const from = prev.current;
  const stateAt = (i: number, at: number): StepState => (i < at ? 'completed' : i === at ? 'current' : 'upcoming');
  // A step is "fresh" for the render in which its state changed (one-shot effects hang off it).
  const isFresh = (i: number) => ready && from !== current && stateAt(i, from) !== stateAt(i, current);
  const forward = current >= from;
  const distance = Math.max(1, Math.abs(current - from));
  const step = Math.min(FILL_MS, Math.floor(1000 / distance));
  // Circle j changes when the bar reaches it; connector i starts when the bar before it lands.
  const circleDelay = (j: number) =>
    forward ? (j >= from && j <= current ? (j - from) * step : 0)
            : (j >= current && j <= from ? (from - j) * step : 0);
  const connectorDelay = (i: number) =>
    forward ? (i >= from && i < current ? (i - from) * step : 0)
            : (i >= current && i < from ? (from - 1 - i) * step + 40 : 0);

  return (
    <div
      className={[styles.stepper, styles[`stepper--${orientation}`], ready ? styles['stepper--animated'] : '', className ?? ''].filter(Boolean).join(' ')}
      style={{ ['--fill-ms' as string]: `${step}ms` }}
    >
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <StepperStep index={i} state={stateFor(i)} label={step.label} description={step.description} orientation={orientation} delay={circleDelay(i)} fresh={isFresh(i)} />
          {i < steps.length - 1 && (
            <span
              className={[styles.connector, styles[`connector--${orientation}`], i < current ? styles['connector--filled'] : ''].filter(Boolean).join(' ')}
              style={{ ['--delay' as string]: `${connectorDelay(i)}ms` }}
              aria-hidden="true"
            >
              <span className={styles.connector__fill} />
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;
