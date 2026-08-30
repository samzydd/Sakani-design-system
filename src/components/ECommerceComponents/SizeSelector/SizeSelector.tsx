/**
 * SizeSelector
 *
 * Matches Figma "Size Selector" (E-commerce set): a 40px label circle.
 * Same two-independent-boolean-axis pattern as ColorSwatch (`selected`,
 * `available`), but a genuinely different visual language, not a shared
 * component with it -- selection here is a solid filled circle (bg/
 * accent-default + white text), not a ring-plus-checkmark over a color
 * fill, since there's no arbitrary consumer color to preserve visibility
 * of underneath a ring:
 *   Unselected  -- bg/surface, border/default, fg/default text
 *   Selected    -- bg/accent-default fill, no border, white text
 *   Unavailable -- bg/canvas, border/default, fg/subtle text, a diagonal
 *                  strike line (confirmed from the asset: a rotated
 *                  rectangle, not a CSS border) in border/default -- a
 *                  fixed, deliberately low-contrast color here (unlike
 *                  ColorSwatch's strike) since this always sits on a
 *                  neutral canvas background, never an arbitrary color.
 * `available={false}` renders a disabled, unclickable button regardless
 * of `selected`, same reasoning as ColorSwatch.
 */

import React from 'react';
import styles from './SizeSelector.module.css';

export interface SizeSelectorProps {
  /** Size label, e.g. "M", "XL", "38". */
  size: string;
  selected?: boolean;
  /** Defaults to true. False renders a disabled, unclickable button. */
  available?: boolean;
  onSelect?: () => void;
  className?: string;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  size, selected = false, available = true, onSelect, className,
}) => (
  <button
    type="button"
    className={[
      styles.button,
      !available ? styles.unavailable : selected ? styles.selected : styles.unselected,
      className ?? '',
    ].filter(Boolean).join(' ')}
    disabled={!available}
    aria-pressed={available ? selected : undefined}
    aria-label={available ? `Size ${size}` : `Size ${size} (out of stock)`}
    onClick={onSelect}
  >
    <span className={styles.label}>{size}</span>
    {!available && <span className={styles.strike} aria-hidden="true" />}
  </button>
);

export default SizeSelector;
