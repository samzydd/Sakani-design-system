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
 *
 * The value itself rolls like an odometer on change: incrementing slides
 * the old number up and out while the new one slides up into place from
 * below; decrementing reverses both (old slides down and out, new enters
 * from above) -- direction always matches which way the number is
 * actually moving, not a fixed animation. `RollingValue` below is kept
 * internal/unexported since this is specifically a QuantitySelector
 * concern, not a general-purpose primitive yet. `prefers-reduced-motion`
 * disables it via the stylesheet (the new value still swaps instantly).
 */

import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { iconStrokeWidth } from '../../../lib/iconStrokeWidth';
import styles from './QuantitySelector.module.css';

const RollingValue: React.FC<{ value: number }> = ({ value }) => {
  const lastValue = React.useRef(value);
  const [outgoing, setOutgoing] = React.useState<{ value: number; direction: 'up' | 'down' } | null>(null);

  if (value !== lastValue.current) {
    setOutgoing({ value: lastValue.current, direction: value > lastValue.current ? 'up' : 'down' });
    lastValue.current = value;
  }

  // Fallback in case onAnimationEnd never fires (e.g. prefers-reduced-motion
  // disables the animation via the stylesheet, so no animation ever
  // completes) -- without this the outgoing number would stay stuck in the
  // DOM forever, relying only on paint order to look correct.
  React.useEffect(() => {
    if (!outgoing) return;
    const timeout = setTimeout(() => setOutgoing(null), 260);
    return () => clearTimeout(timeout);
  }, [outgoing]);

  return (
    <span className={styles.stepValue}>
      <span className={styles.roll}>
        {outgoing && (
          <span
            key={`out-${outgoing.value}`}
            className={[styles.rollNum, outgoing.direction === 'up' ? styles.rollOutUp : styles.rollOutDown].join(' ')}
            aria-hidden="true"
          >
            {outgoing.value}
          </span>
        )}
        <span
          key={`in-${value}`}
          className={[styles.rollNum, outgoing ? (outgoing.direction === 'up' ? styles.rollInUp : styles.rollInDown) : ''].filter(Boolean).join(' ')}
          onAnimationEnd={() => setOutgoing(null)}
        >
          {value}
        </span>
      </span>
    </span>
  );
};

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
      <RollingValue value={quantity} />
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
