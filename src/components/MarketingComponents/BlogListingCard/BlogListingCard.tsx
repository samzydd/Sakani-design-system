/**
 * BlogListingCard
 *
 * Matches Figma "Blog Listing Card" (Marketing primitives set, 2 style
 * previews: Default, Horizontal). `layout` stays a real, explicit prop
 * (Figma's own axis) -- a genuine layout choice, not derivable from the
 * post data:
 *   'default'    -- image on top (240px, full card width), body below.
 *   'horizontal' -- a 1:1 square image on the left (self-stretch to
 *     match the body column's height), body to the right.
 *
 * The category pill reuses the shared Badge component (accent/subtle,
 * an exact match). The "N mins read" chip is NOT a Badge, though --
 * Figma's own instance there has no background at all despite being
 * named "Badge", just matching padding/typography for baseline
 * alignment with the category pill next to it -- Badge has no bare/
 * transparent variant, so this is built locally as plain text, same
 * reasoning BlogFeatureText gave for not reusing Divider for its accent
 * rule.
 *
 * Author line reuses the shared Avatar (image type) component. Card
 * width is flexible (`width:100%; max-width` capped to Figma's own
 * literal px) rather than fixed, same pattern already established by
 * ProductCard -- this is meant to drop into a listing grid of arbitrary
 * width, not just render at exactly 313/460px.
 */

import React from 'react';
import { Badge } from '../../Badge';
import { Avatar } from '../../Avatar';
import styles from './BlogListingCard.module.css';

export type BlogListingCardLayout = 'default' | 'horizontal';

export interface BlogListingCardAuthor {
  name: string;
  /** e.g. "Aug 12, 2026" -- rendered after the name as " · {date}". */
  date: string;
  avatarSrc?: string;
  avatarAlt?: string;
}

export interface BlogListingCardProps {
  image: string;
  imageAlt?: string;
  category: string;
  /** e.g. "11 mins read". */
  readTime: string;
  title: string;
  excerpt: string;
  author: BlogListingCardAuthor;
  /** Figma Style axis. Defaults to "default". */
  layout?: BlogListingCardLayout;
  className?: string;
}

export const BlogListingCard: React.FC<BlogListingCardProps> = ({
  image, imageAlt, category, readTime, title, excerpt, author,
  layout = 'default', className,
}) => {
  const isHorizontal = layout === 'horizontal';

  return (
    <div className={[styles.card, isHorizontal ? styles.cardHorizontal : styles.cardDefault, className ?? ''].filter(Boolean).join(' ')}>
      {isHorizontal ? (
        <span className={styles.imageWrapHorizontal}>
          <img src={image} alt={imageAlt ?? ''} className={styles.image} />
        </span>
      ) : (
        <img src={image} alt={imageAlt ?? ''} className={styles.imageDefault} />
      )}

      <div className={isHorizontal ? styles.bodyHorizontal : styles.bodyDefault}>
        <div className={styles.metaRow}>
          <Badge variant="accent" emphasis="subtle">{category}</Badge>
          <span className={styles.readTime}>{readTime}</span>
        </div>

        <p className={styles.title}>{title}</p>
        <p className={styles.excerpt}>{excerpt}</p>

        <div className={styles.author}>
          <Avatar size="sm" src={author.avatarSrc} alt={author.avatarAlt ?? author.name} />
          <p className={styles.authorText}>{author.name} · {author.date}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogListingCard;
