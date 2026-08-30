/**
 * StockStatus
 *
 * Matches Figma "Stock Status" (E-commerce set): a subtle-emphasis Badge
 * in success/warning/danger. A thin wrapper around the shared Badge
 * component -- the bg/fg pairs match Badge's own success/warning/danger
 * "subtle" variants exactly.
 *
 * Figma's 3 style previews all collapse into one derived value: since the
 * "Low Stock" label itself shows a literal count ("Only 3 left"), the
 * component takes inventory `quantity` directly rather than a manual
 * status enum -- both the badge color AND the label text derive from
 * `quantity` vs. `lowStockThreshold` (default 5):
 *   quantity <= 0                        -> danger,  "Out of stock"
 *   0 < quantity <= lowStockThreshold    -> warning, "Only {quantity} left"
 *   quantity > lowStockThreshold         -> success, "In stock"
 * No separate manual status/label props needed for the common case; an
 * optional `label` override still exists for anything unusual.
 */

import React from 'react';
import { Badge } from '../../Badge';

export interface StockStatusProps {
  quantity: number;
  /** At or below this (and above 0), shows "Only N left" in warning. Defaults to 5. */
  lowStockThreshold?: number;
  /** Overrides the derived label text; the derived color still applies. */
  label?: string;
  className?: string;
}

export const StockStatus: React.FC<StockStatusProps> = ({
  quantity, lowStockThreshold = 5, label, className,
}) => {
  const isOutOfStock = quantity <= 0;
  const isLowStock = !isOutOfStock && quantity <= lowStockThreshold;

  const variant = isOutOfStock ? 'danger' : isLowStock ? 'warning' : 'success';
  const defaultLabel = isOutOfStock ? 'Out of stock' : isLowStock ? `Only ${quantity} left` : 'In stock';

  return (
    <Badge variant={variant} emphasis="subtle" className={className}>
      {label ?? defaultLabel}
    </Badge>
  );
};

export default StockStatus;
