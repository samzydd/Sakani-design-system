/**
 * Skeleton
 *
 * Placeholder loading shape — shimmer animation on a muted background.
 * Use to represent content that is loading before data arrives.
 *
 * Variant → text (inline pill) | rect (block area) | circle (avatar)
 */

import React from 'react';
import styles from './Skeleton.module.css';

export type SkeletonVariant = 'text' | 'rect' | 'circle';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  /** Width — defaults to 100% for rect/text, size for circle */
  width?: string | number;
  /** Height — defaults to 1em for text, 100% for rect, size for circle */
  height?: string | number;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className,
}) => {
  const style: React.CSSProperties = {};

  if (width  !== undefined) style.width  = typeof width  === 'number' ? `${width}px`  : width;
  if (height !== undefined) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <span
      aria-hidden="true" /* decorative — content will replace it */
      className={[
        styles.skeleton,
        styles[`skeleton--${variant}`],
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    />
  );
};

export default Skeleton;
