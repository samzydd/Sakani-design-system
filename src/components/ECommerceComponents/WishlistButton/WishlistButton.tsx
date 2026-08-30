/**
 * WishlistButton
 *
 * Matches Figma "Wishlist Button" (E-commerce set): a 36px bg/surface
 * square, radius-md, shadow-xs, no border. Figma's Default/Saved style
 * preview is fully derived from a `saved` boolean rather than a manual
 * prop -- the icon itself is the only thing that changes (outline Heart
 * vs. filled Heart in brand/default orange, confirmed #FF4700 from the
 * asset), same toggle-button pattern as ColorSwatch's `selected`.
 */

import React from 'react';
import { Heart } from 'lucide-react';
import { iconStrokeWidth } from '../../../lib/iconStrokeWidth';
import styles from './WishlistButton.module.css';

export interface WishlistButtonProps {
  saved?: boolean;
  onToggle?: (saved: boolean) => void;
  /** Accessible name for the item being saved, e.g. "Ceramic Pour-Over Mug". */
  label?: string;
  className?: string;
}

export const WishlistButton: React.FC<WishlistButtonProps> = ({
  saved = false, onToggle, label = 'item', className,
}) => (
  <button
    type="button"
    className={[styles.button, className ?? ''].filter(Boolean).join(' ')}
    aria-pressed={saved}
    aria-label={saved ? `Remove ${label} from wishlist` : `Add ${label} to wishlist`}
    onClick={() => onToggle?.(!saved)}
  >
    <Heart
      size={16}
      strokeWidth={iconStrokeWidth(16)}
      className={saved ? styles.iconSaved : styles.icon}
      fill={saved ? 'currentColor' : 'none'}
    />
  </button>
);

export default WishlistButton;
