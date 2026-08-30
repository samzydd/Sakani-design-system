/**
 * StarRating
 *
 * Matches Figma "Star Rating" (E-commerce set): 5 stars followed by the
 * numeric rating and an optional review count, e.g. "4.9 (2,300 reviews)".
 *
 * Figma's "showLabel" toggle is a real independent prop -- the numeric
 * rating/review-count text can be hidden while the stars alone still
 * convey the rating (a compact list row, say). The stars themselves are
 * NOT a manual per-star fill prop: the full/half/empty count is fully
 * derived from `rating` (0-5), rounded to the nearest half star -- same
 * "derive from data" pattern used throughout this library (StockStatus's
 * badge color, PriceDisplay's sale treatment). Confirmed against Figma's
 * own example: a 4.9 rating renders as 5 full stars, not 4 full + a
 * sliver of a 5th, so this rounds to the nearest 0.5 first rather than
 * showing a half star for any remainder >=0.5.
 */

import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { iconStrokeWidth } from '../../../lib/iconStrokeWidth';
import styles from './StarRating.module.css';

export interface StarRatingProps {
  /** 0-5. Drives the filled/half/empty star count. */
  rating: number;
  reviewCount?: number;
  /** Shows the numeric rating + review count text next to the stars. Defaults to true. */
  showLabel?: boolean;
  formatReviewCount?: (count: number) => string;
  className?: string;
}

const defaultFormatReviewCount = (count: number) => count.toLocaleString('en-US');

export const StarRating: React.FC<StarRatingProps> = ({
  rating, reviewCount, showLabel = true, formatReviewCount = defaultFormatReviewCount, className,
}) => {
  const clamped = Math.max(0, Math.min(5, rating));
  const rounded = Math.round(clamped * 2) / 2;
  const full = Math.floor(rounded);
  const hasHalf = rounded - full === 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <div className={[styles.row, className ?? ''].filter(Boolean).join(' ')}>
      <div className={styles.stars} role="img" aria-label={`${clamped} out of 5 stars`}>
        {Array.from({ length: full }, (_, i) => (
          <Star key={`full-${i}`} size={24} strokeWidth={iconStrokeWidth(24)} className={styles.starFull} fill="currentColor" aria-hidden="true" />
        ))}
        {hasHalf && (
          <StarHalf size={24} strokeWidth={iconStrokeWidth(24)} className={styles.starFull} fill="currentColor" aria-hidden="true" />
        )}
        {Array.from({ length: empty }, (_, i) => (
          <Star key={`empty-${i}`} size={24} strokeWidth={iconStrokeWidth(24)} className={styles.starEmpty} aria-hidden="true" />
        ))}
      </div>
      {showLabel && (
        <div className={styles.label}>
          <span className={styles.value}>{clamped.toFixed(1)}</span>
          {reviewCount !== undefined && (
            <span className={styles.count}>({formatReviewCount(reviewCount)} reviews)</span>
          )}
        </div>
      )}
    </div>
  );
};

export default StarRating;
