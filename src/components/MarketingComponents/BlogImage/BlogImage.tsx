/**
 * BlogImage
 *
 * Matches Figma "Blog Image" (Marketing primitives set, 4 previews: Style
 * (Default/With Caption) x Size (Large/Small)). Two independent axes:
 *   Whether the caption row renders is derived from `caption` presence,
 *     not a manual style prop -- same "derive from data" reasoning as
 *     BlogBlockquote's `author`.
 *   `size` stays a real, explicit prop (Figma's own axis name) -- it's a
 *     genuine layout choice, not derivable from the image itself. Kept
 *     literal to Figma's own fixed px dimensions rather than an inferred
 *     aspect-ratio: Large is 560x315 (16:9), Small is 320x315 -- Figma
 *     uses the SAME 315 height for both (confirmed identical across both
 *     Small previews, Default and With Caption), making Small's own
 *     ~1:1 ratio a deliberate preset, not a proportionally-scaled-down
 *     Large.
 */

import React from 'react';
import styles from './BlogImage.module.css';

export type BlogImageSize = 'large' | 'small';

export interface BlogImageProps {
  src: string;
  alt?: string;
  /** Figma Size axis. Defaults to "large". */
  size?: BlogImageSize;
  /** Presence renders the centered caption row below the image. */
  caption?: string;
  className?: string;
}

export const BlogImage: React.FC<BlogImageProps> = ({
  src, alt = '', size = 'large', caption, className,
}) => (
  <figure className={[styles.root, styles[`root--${size}`], className ?? ''].filter(Boolean).join(' ')}>
    <span className={styles.imageWrap}>
      <img src={src} alt={alt} className={styles.image} />
    </span>
    {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
  </figure>
);

export default BlogImage;
