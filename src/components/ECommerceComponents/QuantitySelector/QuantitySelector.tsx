/**
 * QuantitySelector
 *
 * Matches Figma "Quantity Selector" (E-commerce set): a 3-cell stepper --
 * decrement / value / increment, separated by 1px dividers, only the
 * outer frame rounded/bordered. Figma's "Default"/"Incremented" style
 * preview is just this component at two different quantities, not a real
 * variant -- both the value shown and the decrement button's disabled
 * (45%-opacity) state are fully derived from `quantity` vs. `min`.
 *
 * This is the standalone version of the stepper CartItem already built
 * inline -- CartItem now reuses this component instead of its own copy,
 * so there's one implementation instead of two drifting in parallel.
 */

import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { iconStrokeWidth } from '../../../lib/iconStrokeWidth';
import styles from './QuantitySelector.module.css';

export interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange?: (quantity: number) => void;
  min?: number;
  max?: number;
  /** Accessible group label, e.g. "Quantity for Ceramic Pour-Over Mug". */
  label?: string;
  className?: string;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity, onQuantityChange, min = 1, max, label = 'Quantity', className,
}) => {
  const canDecrement = quantity > min;
  const canIncrement = max === undefined || quantity < max;

  return (
    <div className={[styles.stepper, className ?? ''].filter(Boolean).join(' ')} role="group" aria-label={label}>
      <button
        type="button"
        className={styles.stepBtn}
        disabled={!canDecrement}
        onClick={() => onQuantityChange?.(Math.max(min, quantity - 1))}
        aria-label="Decrease quantity"
      >
        <Minus size={14} strokeWidth={iconStrokeWidth(14)} />
      </button>
      <span className={styles.stepDivider} aria-hidden="true" />
      <span className={styles.stepValue}>{quantity}</span>
      <span className={styles.stepDivider} aria-hidden="true" />
      <button
        type="button"
        className={styles.stepBtn}
        disabled={!canIncrement}
        onClick={() => onQuantityChange?.(max === undefined ? quantity + 1 : Math.min(max, quantity + 1))}
        aria-label="Increase quantity"
      >
        <Plus size={14} strokeWidth={iconStrokeWidth(14)} />
      </button>
    </div>
  );
};

export default QuantitySelector;
