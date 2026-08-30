/**
 * BlogListingFeaturedCard
 *
 * Matches Figma "Blog Listing Featured Card" (Marketing primitives set, 2
 * orientations: Horizontal, Vertical). `orientation` stays a real,
 * explicit prop (Figma's own axis) -- a genuine layout choice:
 *   'horizontal' -- a fixed 400x320 image on the left, body fills the
 *     remaining width and is vertically centered against the image's
 *     height. Safe to build directly off the image's own fixed size (no
 *     circular sizing dependency) since the image doesn't need to match
 *     the body's dynamic height, unlike BlogListingCard's own square
 *     thumbnail, which does and had to be fixed for exactly that reason.
 *   'vertical'  -- the same fixed 400x320 image on top, body below at a
 *     matching fixed 400px width, column layout.
 *
 * Category pill and author avatar/name/date follow BlogListingCard's own
 * precedent exactly (Badge accent/subtle; Avatar). "Read article" reuses
 * the shared Button (variant="secondary", size="sm" -- bg/subtle +
 * fg/default text is an exact match for Figma's own button here, not a
 * custom style like BlogListingCard's read-time chip needed).
 */

import React from 'react';
import { Badge } from '../../Badge';
import { Avatar } from '../../Avatar';
import { Button } from '../../Button';
import styles from './BlogListingFeaturedCard.module.css';

export type BlogListingFeaturedCardOrientation = 'horizontal' | 'vertical';

export interface BlogListingFeaturedCardAuthor {
  name: string;
  /** e.g. "Aug 12, 2026" -- rendered after the name as " · {date}". */
  date: string;
  avatarSrc?: string;
  avatarAlt?: string;
  /** 1–2 letters, shown when no avatarSrc -- e.g. "AK", matching Figma's own initials Avatar here. */
  initials?: string;
}

export interface BlogListingFeaturedCardProps {
  image: string;
  imageAlt?: string;
  /** Defaults to "Featured", matching this card's own purpose. */
  badgeLabel?: string;
  title: string;
  excerpt: string;
  author: BlogListingFeaturedCardAuthor;
  ctaLabel?: string;
  onCtaClick?: () => void;
  /** Figma Orientation axis. Defaults to "horizontal". */
  orientation?: BlogListingFeaturedCardOrientation;
  className?: string;
}

export const BlogListingFeaturedCard: React.FC<BlogListingFeaturedCardProps> = ({
  image, imageAlt, badgeLabel = 'Featured', title, excerpt, author,
  ctaLabel = 'Read article', onCtaClick, orientation = 'horizontal', className,
}) => {
  const isVertical = orientation === 'vertical';

  return (
    <div className={[styles.card, isVertical ? styles.cardVertical : styles.cardHorizontal, className ?? ''].filter(Boolean).join(' ')}>
      <img src={image} alt={imageAlt ?? ''} className={styles.image} />

      <div className={isVertical ? styles.bodyVertical : styles.bodyHorizontal}>
        <Badge variant="accent" emphasis="subtle">{badgeLabel}</Badge>

        <p className={styles.title}>{title}</p>
        <p className={styles.excerpt}>{excerpt}</p>

        <div className={styles.footer}>
          <div className={styles.author}>
            <Avatar size="md" src={author.avatarSrc} alt={author.avatarAlt ?? author.name} initials={author.initials} />
            <p className={styles.authorText}>{author.name} · {author.date}</p>
          </div>
          <Button variant="secondary" size="sm" onClick={onCtaClick}>{ctaLabel}</Button>
        </div>
      </div>
    </div>
  );
};

export default BlogListingFeaturedCard;
