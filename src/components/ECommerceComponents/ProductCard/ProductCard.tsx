/**
 * ProductCard
 *
 * Matches Figma "Product Card" (E-commerce set): image (wishlist button +
 * sale badge overlay) -> rating -> name/price -> description -> color
 * swatches -> "Add Item" button.
 *
 * Figma's 3 style previews collapse into two real, independent axes rather
 * than a manual style prop, same reasoning as CartItem/PriceDisplay:
 *   `compareAtPrice` presence -> sale badge ("-X%", same ceil-rounding as
 *     PriceDisplay) + a struck-through original price next to the current
 *     one. NOT a reuse of the PriceDisplay component itself, though --
 *     Figma's card price row is plain 16px fg/default black for the
 *     current price (no danger-red, no 20px heading size), a genuinely
 *     different, more subdued treatment than PriceDisplay's own sale
 *     styling, so it's built locally here to match.
 *   `inStock={false}` -> dimmed image, "Out of stock" label, wishlist
 *     button hidden (Figma's own Out-of-Stock preview drops it), and the
 *     Add Item button disabled -- Figma's static mockup doesn't show a
 *     disabled button since it can't demonstrate interaction, but shipping
 *     an enabled "buy" button for something explicitly out of stock would
 *     be a real usability bug, so this adds it.
 *
 * Star rating is a small dedicated element (round-to-nearest-star fill,
 * Lucide `Star` bound to warning/400 -- Figma's own gold #F9B427 sits
 * between warning/400 (#FDB022) and warning/500 (#F79009); 400 is the
 * closer match) -- no standalone Rating component exists yet, and this is
 * scoped to what Product Card itself asked for.
 *
 * Color swatches reuse the shared ColorSwatch component directly. Wishlist
 * button reuses the shared WishlistButton component (also E-commerce set)
 * directly -- exact match for the card's own save/unsave affordance.
 */

import React from 'react';
import { Star } from 'lucide-react';
import { Button } from '../../Button';
import { Badge } from '../../Badge';
import { ColorSwatch, type ColorSwatchProps } from '../ColorSwatch';
import { WishlistButton } from '../WishlistButton';
import { iconStrokeWidth } from '../../../lib/iconStrokeWidth';
import styles from './ProductCard.module.css';

export interface ProductCardColor extends Omit<ColorSwatchProps, 'onSelect'> {
  /** Unique key for selection -- defaults to `label` if omitted. */
  id?: string;
}

export interface ProductCardProps {
  image: string;
  imageAlt?: string;
  name: string;
  description?: string;
  price: number;
  /** Presence switches to the sale badge + struck-original/danger-current price. */
  compareAtPrice?: number;
  rating?: number;
  reviewCount?: number;
  colors?: ProductCardColor[];
  onColorSelect?: (id: string) => void;
  inStock?: boolean;
  wishlisted?: boolean;
  onWishlistToggle?: (wishlisted: boolean) => void;
  onAddItem?: () => void;
  addItemLabel?: string;
  formatPrice?: (amount: number) => string;
  className?: string;
}

const defaultFormatPrice = (amount: number) =>
  amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export const ProductCard: React.FC<ProductCardProps> = ({
  image, imageAlt, name, description, price, compareAtPrice,
  rating, reviewCount, colors = [], onColorSelect, inStock = true,
  wishlisted = false, onWishlistToggle, onAddItem, addItemLabel = 'Add Item',
  formatPrice = defaultFormatPrice, className,
}) => {
  const isSale = compareAtPrice !== undefined;
  const discountPercent = isSale ? Math.ceil((1 - price / compareAtPrice) * 100) : 0;
  const filledStars = rating !== undefined ? Math.round(rating) : 0;

  return (
    <div className={[styles.card, className ?? ''].filter(Boolean).join(' ')}>
      <div className={styles.imageWrap}>
        <img src={image} alt={imageAlt ?? name} className={[styles.image, !inStock ? styles.imageDimmed : ''].filter(Boolean).join(' ')} />

        {isSale && inStock && (
          <Badge variant="danger" emphasis="solid" className={styles.saleBadge}>-{discountPercent}%</Badge>
        )}

        {inStock && (
          <WishlistButton
            saved={wishlisted}
            label={name}
            className={styles.wishlistBtn}
            onToggle={onWishlistToggle}
          />
        )}

        {!inStock && <span className={styles.outOfStockLabel}>Out of stock</span>}
      </div>

      <div className={styles.body}>
        {rating !== undefined && (
          <div className={styles.rating} role="img" aria-label={`Rated ${rating} out of 5${reviewCount ? ` (${reviewCount} reviews)` : ''}`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                strokeWidth={iconStrokeWidth(16)}
                className={i < filledStars ? styles.starFilled : styles.starEmpty}
                fill={i < filledStars ? 'currentColor' : 'none'}
              />
            ))}
          </div>
        )}

        <div className={styles.titleRow}>
          <p className={styles.name}>{name}</p>
          <div className={styles.priceRow}>
            {isSale && <span className={styles.priceOriginal}>{formatPrice(compareAtPrice)}</span>}
            <span className={styles.price}>{formatPrice(price)}</span>
          </div>
        </div>

        {description && <p className={styles.description}>{description}</p>}

        {colors.length > 0 && (
          <div className={styles.swatches} role="group" aria-label="Color">
            {colors.map((c) => (
              <ColorSwatch key={c.id ?? c.label} {...c} onSelect={() => onColorSelect?.(c.id ?? c.label)} />
            ))}
          </div>
        )}

        <Button variant="primary" size="md" disabled={!inStock} className={styles.addButton} onClick={onAddItem}>
          {inStock ? addItemLabel : 'Out of stock'}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
