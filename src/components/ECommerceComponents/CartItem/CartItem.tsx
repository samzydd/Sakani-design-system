/**
 * CartItem
 *
 * Matches Figma "Cart Item" (E-commerce set): thumbnail + name/variant/
 * quantity stepper -> price + remove button, right-aligned.
 *
 * Figma's "Default"/"Sale" style previews collapse into one derived axis --
 * same reasoning as StockMarket's positive/negative: `compareAtPrice` being
 * set switches to the struck-through original price + danger-solid sale
 * price; its absence renders the plain single price. Not a manual variant
 * prop since it's fully computable from the price data itself.
 *
 * The quantity stepper is a small dedicated element, not an IconButton
 * pair: its two buttons are flush against shared 1px dividers with no
 * radius or background of their own (only the outer 3-cell frame is
 * rounded/bordered) -- a genuinely different shape than IconButton's own
 * always-square, always-bordered button. Decrement disables (45% opacity)
 * once `quantity` reaches `minQuantity`, derived rather than a manual prop.
 *
 * The remove button (Minus icon, not Trash -- taken directly from Figma)
 * reuses the shared IconButton (variant="outline", size="sm") -- Figma's
 * "Sale" style export drops the button's own bg/border/shadow classes, but
 * the screenshot shows both style previews with an identical bordered
 * square, so that reads as an authoring slip in the export, not an
 * intentional per-variant difference.
 */

import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { IconButton } from '../../IconButton';
import { iconStrokeWidth } from '../../../lib/iconStrokeWidth';
import styles from './CartItem.module.css';

export interface CartItemProps {
  image: string;
  imageAlt?: string;
  name: string;
  /** e.g. "Color: Sand". */
  variant?: string;
  price: number;
  /** Presence switches to the Sale price treatment (struck-through original + danger price). */
  compareAtPrice?: number;
  quantity: number;
  onQuantityChange?: (quantity: number) => void;
  minQuantity?: number;
  maxQuantity?: number;
  onRemove?: () => void;
  removeLabel?: string;
  formatPrice?: (amount: number) => string;
  className?: string;
}

const defaultFormatPrice = (amount: number) =>
  amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export const CartItem: React.FC<CartItemProps> = ({
  image, imageAlt, name, variant, price, compareAtPrice, quantity,
  onQuantityChange, minQuantity = 1, maxQuantity, onRemove,
  removeLabel = 'Remove item', formatPrice = defaultFormatPrice, className,
}) => {
  const isSale = compareAtPrice !== undefined;
  const canDecrement = quantity > minQuantity;
  const canIncrement = maxQuantity === undefined || quantity < maxQuantity;

  return (
    <div className={[styles.item, className ?? ''].filter(Boolean).join(' ')}>
      <img src={image} alt={imageAlt ?? name} className={styles.thumb} />

      <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        {variant && <p className={styles.variant}>{variant}</p>}

        <div className={styles.stepper} role="group" aria-label={`Quantity for ${name}`}>
          <button
            type="button"
            className={styles.stepBtn}
            disabled={!canDecrement}
            onClick={() => onQuantityChange?.(Math.max(minQuantity, quantity - 1))}
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
            onClick={() => onQuantityChange?.(maxQuantity === undefined ? quantity + 1 : Math.min(maxQuantity, quantity + 1))}
            aria-label="Increase quantity"
          >
            <Plus size={14} strokeWidth={iconStrokeWidth(14)} />
          </button>
        </div>
      </div>

      <div className={styles.right}>
        {isSale ? (
          <div className={styles.priceRow}>
            <span className={styles.priceOriginal}>{formatPrice(compareAtPrice)}</span>
            <span className={styles.priceSale}>{formatPrice(price)}</span>
          </div>
        ) : (
          <p className={styles.price}>{formatPrice(price)}</p>
        )}
        <IconButton icon={Minus} variant="outline" size="sm" aria-label={removeLabel} onClick={onRemove} />
      </div>
    </div>
  );
};

export default CartItem;
