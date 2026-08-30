/**
 * ColorSwatch
 *
 * Matches Figma "Color Swatch" (E-commerce set): a 24px filled circle in a
 * 32px hit target. Figma's 3 style previews collapse into two real,
 * independent boolean axes rather than a manual state prop -- a swatch can
 * be the currently-chosen variant (`selected`) and/or out of stock
 * (`available={false}`) as separate facts about the product data:
 *   Unselected  -- plain filled circle
 *   Selected    -- + an outer border/subtle ring (offset out from the
 *                  circle, not touching it) + a white checkmark on top
 *   Unavailable -- circle at 35% opacity + a white diagonal strike line
 *                  (confirmed from the actual asset: a rotated 30deg
 *                  rectangle, not a border or icon)
 * `available={false}` renders a disabled, unclickable button regardless of
 * `selected`, since an out-of-stock variant can't be the active choice.
 *
 * `color` is a consumer-supplied CSS color value -- this component ships
 * no fixed palette, same reasoning as StockMarket's `logo` slot.
 */

import React from 'react';
import { Check } from 'lucide-react';
import { iconStrokeWidth } from '../../../lib/iconStrokeWidth';
import styles from './ColorSwatch.module.css';

export interface ColorSwatchProps {
  /** CSS color value for the swatch fill. */
  color: string;
  /** Accessible name, e.g. "Navy". */
  label: string;
  selected?: boolean;
  /** Defaults to true. False renders a disabled, unclickable swatch. */
  available?: boolean;
  onSelect?: () => void;
  className?: string;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  color, label, selected = false, available = true, onSelect, className,
}) => (
  <button
    type="button"
    className={[styles.swatch, className ?? ''].filter(Boolean).join(' ')}
    style={{ '--swatch-color': color } as React.CSSProperties}
    disabled={!available}
    aria-pressed={available ? selected : undefined}
    aria-label={available ? label : `${label} (out of stock)`}
    onClick={onSelect}
  >
    {selected && available && <span className={styles.ring} aria-hidden="true" />}
    <span className={[styles.circle, !available ? styles.circleUnavailable : ''].filter(Boolean).join(' ')} aria-hidden="true" />
    {selected && available && (
      <Check size={14} strokeWidth={iconStrokeWidth(14)} className={styles.check} aria-hidden="true" />
    )}
    {!available && <span className={styles.strike} aria-hidden="true" />}
  </button>
);

export default ColorSwatch;
