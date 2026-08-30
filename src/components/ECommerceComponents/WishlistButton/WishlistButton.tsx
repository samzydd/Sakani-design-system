/**
 * WishlistButton
 *
 * Matches Figma "Wishlist Button" (E-commerce set): a 36px bg/surface
 * square, radius-md, shadow-xs, no border. Figma's Default/Saved style
 * preview is fully derived from a `saved` boolean rather than a manual
 * prop -- the icon itself is the only thing that changes (outline Heart
 * vs. filled Heart in brand/default orange, confirmed #FF4700 from the
 * asset), same toggle-button pattern as ColorSwatch's `selected`.
 *
 * Bounces the heart (a scale pop, classic "like" micro-interaction) only
 * on the unsaved -> saved transition -- not on unsave, and not on mount if
 * `saved` starts true, since this is meant to reward the act of saving,
 * not just any state change. Triggered directly in the click handler
 * (this component knows a click while unsaved means it's about to become
 * saved) rather than by diffing `saved` across renders, since `saved` is
 * a controlled prop -- waiting for it to actually change would delay or
 * even skip the animation if the parent updates asynchronously.
 * `prefers-reduced-motion` disables it via the stylesheet.
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
}) => {
  const [bounce, setBounce] = React.useState(false);

  const handleClick = () => {
    if (!saved) setBounce(true);
    onToggle?.(!saved);
  };

  return (
    <button
      type="button"
      className={[styles.button, className ?? ''].filter(Boolean).join(' ')}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${label} from wishlist` : `Add ${label} to wishlist`}
      onClick={handleClick}
    >
      <Heart
        size={16}
        strokeWidth={iconStrokeWidth(16)}
        className={[saved ? styles.iconSaved : styles.icon, bounce ? styles.bounce : ''].filter(Boolean).join(' ')}
        fill={saved ? 'currentColor' : 'none'}
        onAnimationEnd={() => setBounce(false)}
      />
    </button>
  );
};

export default WishlistButton;
