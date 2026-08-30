/**
 * ProductDetailBlock — Blocks / E-commerce / Product Detail
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
 * your project and edit it directly: wire "Add to cart" to your real cart
 * state/API in place of the callback here.
 *
 * Matches Figma "Product Detail" (node 1659:2). Composed entirely from
 * components already in this library: ProductGallery, WishlistButton,
 * StarRating, StockStatus, PriceDisplay, ColorSwatch, SizeSelector,
 * QuantitySelector, Button, and Divider -- this block is purely layout +
 * wiring, no new visual primitives of its own (StarRating was the one
 * piece genuinely missing from the library, since Figma's Star Rating had
 * no matching component yet -- built alongside this block, not invented
 * ad hoc inside it, so it's reusable everywhere else a rating shows up).
 *
 * Color/size selection and quantity are genuinely live, wired state (not
 * decorative) -- picking a color updates the "Color: {label}" text above
 * the swatches, same for size, matching Figma's own labeled-row behavior
 * where the label reflects whatever's currently selected.
 */

import React from 'react';
import { ProductGallery, type ProductGalleryImage } from '../../components/ECommerceComponents/ProductGallery';
import { WishlistButton } from '../../components/ECommerceComponents/WishlistButton';
import { StarRating } from '../../components/ECommerceComponents/StarRating';
import { StockStatus } from '../../components/ECommerceComponents/StockStatus';
import { PriceDisplay } from '../../components/ECommerceComponents/PriceDisplay';
import { ColorSwatch } from '../../components/ECommerceComponents/ColorSwatch';
import { SizeSelector } from '../../components/ECommerceComponents/SizeSelector';
import { QuantitySelector } from '../../components/ECommerceComponents/QuantitySelector';
import { Button } from '../../components/Button';
import { Divider } from '../../components/Divider';
import styles from './ProductDetailBlock.module.css';

export interface ProductDetailColorOption {
  label: string;
  color: string;
  available?: boolean;
}

export interface ProductDetailSizeOption {
  size: string;
  available?: boolean;
}

export interface ProductDetailBlockProps {
  name: string;
  images: ProductGalleryImage[];
  rating: number;
  reviewCount?: number;
  /** Drives StockStatus's derived badge color + label -- see that component. */
  stockQuantity: number;
  price: number;
  compareAtPrice?: number;
  description: string;
  colors?: ProductDetailColorOption[];
  sizes?: ProductDetailSizeOption[];
  /** Defaults to the first available option in each list. */
  defaultColor?: string;
  defaultSize?: string;
  minQuantity?: number;
  maxQuantity?: number;
  defaultSaved?: boolean;
  onAddToCart?: (selection: { color?: string; size?: string; quantity: number }) => void;
  formatPrice?: (amount: number) => string;
  className?: string;
}

const defaultFormatPrice = (amount: number) =>
  amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export const ProductDetailBlock: React.FC<ProductDetailBlockProps> = ({
  name, images, rating, reviewCount, stockQuantity, price, compareAtPrice, description,
  colors = [], sizes = [], defaultColor, defaultSize, minQuantity = 1, maxQuantity,
  defaultSaved = false, onAddToCart, formatPrice = defaultFormatPrice, className,
}) => {
  const [selectedColor, setSelectedColor] = React.useState(
    defaultColor ?? colors.find((c) => c.available !== false)?.label
  );
  const [selectedSize, setSelectedSize] = React.useState(
    defaultSize ?? sizes.find((s) => s.available !== false)?.size
  );
  const [quantity, setQuantity] = React.useState(minQuantity);
  const [saved, setSaved] = React.useState(defaultSaved);

  return (
    <div className={[styles.block, className ?? ''].filter(Boolean).join(' ')}>
      <ProductGallery images={images} className={styles.gallery} />

      <div className={styles.info}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>{name}</h2>
          <WishlistButton saved={saved} onToggle={setSaved} label={name} />
        </div>

        <div className={styles.ratingRow}>
          <StarRating rating={rating} reviewCount={reviewCount} />
          <StockStatus quantity={stockQuantity} />
        </div>

        <PriceDisplay price={price} compareAtPrice={compareAtPrice} showBadge formatPrice={formatPrice} />

        <p className={styles.description}>{description}</p>

        <Divider className={styles.fullWidth} />

        {colors.length > 0 && (
          <div className={styles.labeledRow}>
            <span className={styles.rowLabel}>Color{selectedColor ? `: ${selectedColor}` : ''}</span>
            <div className={styles.options}>
              {colors.map((c) => (
                <ColorSwatch
                  key={c.label}
                  color={c.color}
                  label={c.label}
                  available={c.available}
                  selected={selectedColor === c.label}
                  onSelect={() => setSelectedColor(c.label)}
                />
              ))}
            </div>
          </div>
        )}

        {sizes.length > 0 && (
          <div className={styles.labeledRow}>
            <span className={styles.rowLabel}>Size{selectedSize ? `: ${selectedSize}` : ''}</span>
            <div className={styles.options}>
              {sizes.map((s) => (
                <SizeSelector
                  key={s.size}
                  size={s.size}
                  available={s.available}
                  selected={selectedSize === s.size}
                  onSelect={() => setSelectedSize(s.size)}
                />
              ))}
            </div>
          </div>
        )}

        <div className={styles.actionRow}>
          <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} min={minQuantity} max={maxQuantity} label={`Quantity for ${name}`} />
          <Button
            variant="primary"
            onClick={() => onAddToCart?.({ color: selectedColor, size: selectedSize, quantity })}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailBlock;
