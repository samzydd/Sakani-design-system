/**
 * PriceDisplay
 *
 * Matches Figma "Price Display" (E-commerce set). Figma's 3 style previews
 * collapse into one derived axis plus one real toggle, same reasoning as
 * CartItem's own sale price treatment:
 *   `compareAtPrice` presence -> struck-through original (fg/subtle) +
 *     danger-solid current price, instead of the plain single price.
 *   `showBadge` -- a real independent prop, not derivable: Figma's own
 *     "Crossed" preview shows the struck price with no badge and no
 *     current price at all (a bare building-block state, not something a
 *     real product page would show standalone), so rather than expose
 *     that half-state this always shows the current price once
 *     `compareAtPrice` is set, and `showBadge` is what actually decides
 *     whether the "Save X%" pill appears -- the percentage itself is
 *     still computed from the two prices, not passed in.
 *
 * Figma renders the strike via a separate decorative line SVG absolutely
 * positioned over the text; plain CSS text-decoration: line-through is
 * visually equivalent and far simpler, same choice already made for
 * CartItem's own struck price.
 *
 * The badge reuses the shared Badge component (variant="danger"
 * emphasis="solid") -- an exact match for Figma's own badge spec.
 */

import React from 'react';
import { Badge } from '../../Badge';
import styles from './PriceDisplay.module.css';

export interface PriceDisplayProps {
  price: number;
  /** Presence switches to the struck-through-original + danger-solid current price. */
  compareAtPrice?: number;
  /** Shows a "Save X%" badge, computed from price vs. compareAtPrice. No-op without compareAtPrice. */
  showBadge?: boolean;
  formatPrice?: (amount: number) => string;
  className?: string;
}

const defaultFormatPrice = (amount: number) =>
  amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price, compareAtPrice, showBadge = false, formatPrice = defaultFormatPrice, className,
}) => {
  const isSale = compareAtPrice !== undefined;
  // Ceil, not round: Figma's own example ($48 -> $34, a true 29.17% cut)
  // reads "Save 30%" -- rounding a savings badge up is the standard retail
  // convention anyway (never understate the deal), confirmed by that exact number.
  const savePercent = isSale ? Math.ceil((1 - price / compareAtPrice) * 100) : 0;

  return (
    <div className={[styles.row, className ?? ''].filter(Boolean).join(' ')}>
      {isSale && <span className={styles.original}>{formatPrice(compareAtPrice)}</span>}
      <span className={[styles.price, isSale ? styles.priceSale : ''].filter(Boolean).join(' ')}>
        {formatPrice(price)}
      </span>
      {isSale && showBadge && (
        <Badge variant="danger" emphasis="solid">Save {savePercent}%</Badge>
      )}
    </div>
  );
};

export default PriceDisplay;
