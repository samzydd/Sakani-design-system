/**
 * ProductGallery
 *
 * Matches Figma "Product Gallery" (E-commerce set): a main image plus
 * selectable thumbnails, click a thumb to make it the main image.
 *
 * Figma's "Default"/"Vertical Thumbs" style names describe the THUMBS'
 * own axis, not the gallery's overall flow, which reads confusingly next
 * to each other -- renamed here to `thumbsPosition: 'bottom' | 'left'`:
 *   'bottom' (Figma "Default") -- main image on top (400x400), thumb row
 *     below it (80x80 each).
 *   'left' (Figma "Vertical Thumbs") -- thumb column on the left (64x64
 *     each), main image filling the remaining width (fixed 320 height).
 * A real, independent layout choice, not something derivable from the
 * image data, so it stays an explicit prop.
 *
 * The active thumbnail is a real derived concern (index === activeIndex),
 * not a manual prop per thumb. `activeIndex` follows the same optional-
 * controlled/uncontrolled-by-default dual mode already established by
 * AvatarUpload's `src` -- most consumers just want a self-contained
 * gallery, but anything needing to sync selection externally (e.g. a
 * matching color swatch) can still control it.
 *
 * Figma's corner radii here (10px main/thumbs in "bottom", 8px/16px in
 * "left") are unbound literal values in the file itself (no token
 * variable in the raw export, unlike virtually everything else in this
 * library), so they're kept as literal px rather than snapped to the
 * nearest radius token.
 */

import React from 'react';
import styles from './ProductGallery.module.css';

export interface ProductGalleryImage {
  src: string;
  alt?: string;
}

export type ProductGalleryThumbsPosition = 'bottom' | 'left';

export interface ProductGalleryProps {
  images: ProductGalleryImage[];
  thumbsPosition?: ProductGalleryThumbsPosition;
  /** Controlled active image index. Omit to let the gallery manage its own selection. */
  activeIndex?: number;
  defaultActiveIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  className?: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images, thumbsPosition = 'bottom', activeIndex: activeIndexProp,
  defaultActiveIndex = 0, onActiveIndexChange, className,
}) => {
  const isControlled = activeIndexProp !== undefined;
  const [internalIndex, setInternalIndex] = React.useState(defaultActiveIndex);
  const activeIndex = isControlled ? activeIndexProp : internalIndex;

  const selectIndex = (index: number) => {
    if (!isControlled) setInternalIndex(index);
    onActiveIndexChange?.(index);
  };

  const active = images[activeIndex] ?? images[0];
  const isLeft = thumbsPosition === 'left';

  const thumbs = (
    <div className={[styles.thumbs, isLeft ? styles.thumbsLeft : styles.thumbsBottom].filter(Boolean).join(' ')} role="tablist" aria-label="Product images">
      {images.map((image, i) => (
        <button
          key={image.src + i}
          type="button"
          role="tab"
          aria-selected={i === activeIndex}
          aria-label={image.alt ?? `Image ${i + 1}`}
          className={[
            styles.thumb,
            isLeft ? styles.thumbLeft : styles.thumbBottom,
            i === activeIndex ? styles.thumbActive : '',
          ].filter(Boolean).join(' ')}
          onClick={() => selectIndex(i)}
        >
          <img src={image.src} alt="" className={styles.thumbImage} />
        </button>
      ))}
    </div>
  );

  return (
    <div className={[styles.gallery, isLeft ? styles.galleryLeft : styles.galleryBottom, className ?? ''].filter(Boolean).join(' ')}>
      {!isLeft && active && (
        <div className={styles.mainBottom}>
          <img src={active.src} alt={active.alt ?? ''} className={styles.mainImage} />
        </div>
      )}
      {thumbs}
      {isLeft && active && (
        <div className={styles.mainLeft}>
          <img src={active.src} alt={active.alt ?? ''} className={styles.mainImage} />
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
