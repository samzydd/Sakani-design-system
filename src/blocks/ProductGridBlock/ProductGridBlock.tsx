/**
 * ProductGridBlock — Blocks / E-commerce / Product Grid
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
 * your project and edit it directly: wire "Add Item"/wishlist/sort to your
 * real cart/catalog state in place of the callbacks here.
 *
 * Matches Figma "Product Grid" (node 1658:29889, 2 states: Default, With
 * Filters). Composed entirely from existing library components --
 * SectionHeading (Marketing, the "Shop" eyebrow + title + subtitle --
 * this block used to build that shape inline before SectionHeading
 * existed as its own component; now reuses it instead of keeping a
 * second copy to drift out of sync), Button (the "Sort" control), and
 * ProductCard (E-commerce set, already covering the card's own image/
 * rating/price/sale-badge/out-of-stock/swatches/button treatment) -- no
 * new visual primitives, this block is purely heading + filter bar +
 * grid layout.
 *
 * Whether the filter bar (product count + Sort button) renders is a real
 * layout choice (Figma's "With Filters" style), not something derivable
 * from the product data -- `showFilterBar` stays an explicit prop. The
 * product COUNT itself, though, is derived from `products.length` rather
 * than a separate manual prop, same "derive from data" reasoning used
 * throughout this library.
 *
 * Figma's own two states actually disagree on the grid's gap (8px in
 * Default, 24px in With Filters) -- a real inconsistency between two
 * separately-authored example states, not an intentional feature (a
 * grid's spacing can't sensibly depend on whether a filter bar happens to
 * render above it). This block uses 8px everywhere, matching Default.
 *
 * Wishlist and color-swatch selection are real wired state, per card, not
 * decorative -- ProductCard's `wishlisted`/`colors[].selected` are
 * controlled props, so without this the heart and swatches would render
 * but visibly do nothing when clicked. Keyed by each product's id/name
 * rather than one shared piece of state, since selecting a color on one
 * card must never affect another card's own selection.
 */

import React from 'react';
import { Button } from '../../components/Button';
import { SectionHeading } from '../../components/MarketingComponents/SectionHeading';
import { ProductCard, type ProductCardProps } from '../../components/ECommerceComponents/ProductCard';
import styles from './ProductGridBlock.module.css';

export interface ProductGridItem extends ProductCardProps {
  /** Unique key for the grid -- defaults to `name` if omitted. */
  id?: string;
}

export interface ProductGridBlockProps {
  /** Small pill above the title, e.g. "Shop". Omit to hide it. */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  products: ProductGridItem[];
  /** Adds the "N products" count + Sort button row above the grid --
   * see the file doc for why this stays a real prop rather than being
   * derived. */
  showFilterBar?: boolean;
  sortLabel?: string;
  onSortClick?: () => void;
  /** Number of columns at full width. Defaults to 4, matching Figma. */
  columns?: number;
  className?: string;
}

export const ProductGridBlock: React.FC<ProductGridBlockProps> = ({
  eyebrow = 'Shop', title, subtitle, products, showFilterBar = false,
  sortLabel = 'Featured', onSortClick, columns = 4, className,
}) => {
  const [wishlisted, setWishlisted] = React.useState<Record<string, boolean>>({});
  const [selectedColors, setSelectedColors] = React.useState<Record<string, string>>({});

  return (
    <div className={[styles.block, className ?? ''].filter(Boolean).join(' ')}>
      <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} align="center" className={styles.heading} />

      {showFilterBar && (
        <div className={styles.filterBar}>
          <span className={styles.count}>{products.length} product{products.length === 1 ? '' : 's'}</span>
          <Button variant="secondary" size="sm" onClick={onSortClick}>Sort: {sortLabel}</Button>
        </div>
      )}

      <div className={styles.grid} style={{ '--product-grid-columns': columns } as React.CSSProperties}>
        {products.map(({ id, colors, ...product }, i) => {
          const key = id ?? product.name ?? String(i);
          const selectedColor = selectedColors[key] ?? colors?.find((c) => c.selected)?.label;
          return (
            <ProductCard
              key={key}
              {...product}
              className={styles.card}
              colors={colors?.map((c) => ({ ...c, selected: (c.id ?? c.label) === selectedColor }))}
              onColorSelect={(colorId) => setSelectedColors((current) => ({ ...current, [key]: colorId }))}
              wishlisted={wishlisted[key] ?? product.wishlisted ?? false}
              onWishlistToggle={(saved) => setWishlisted((current) => ({ ...current, [key]: saved }))}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductGridBlock;
