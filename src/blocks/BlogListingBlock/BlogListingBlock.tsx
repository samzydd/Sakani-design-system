/**
 * BlogListingBlock — Blocks / Marketing / Blog Listing
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
 * your project and edit it directly: wire "Read article"/card clicks to
 * your real routing in place of the callbacks here.
 *
 * Matches Figma "Blog Listing" (node 1556:2). Composed entirely from
 * existing library components -- SectionHeading (Marketing, the "Blog"
 * eyebrow + title + subtitle), BlogListingFeaturedCard (Marketing,
 * orientation="horizontal"), and a grid of BlogListingCard (Marketing,
 * layout="default") -- no new visual primitives, this block is purely
 * heading + featured post + grid layout.
 *
 * The grid is real CSS Grid (3 columns, matching Figma), not a fixed
 * 3-card row -- it wraps onto additional rows once there are more posts
 * than fit one line, same reasoning ProductGridBlock gives for its own
 * grid, unlike Figma's own single-row 3-post export.
 */

import React from 'react';
import { SectionHeading } from '../../components/MarketingComponents/SectionHeading';
import { BlogListingFeaturedCard, type BlogListingFeaturedCardAuthor } from '../../components/MarketingComponents/BlogListingFeaturedCard';
import { BlogListingCard, type BlogListingCardAuthor } from '../../components/MarketingComponents/BlogListingCard';
import styles from './BlogListingBlock.module.css';

export interface BlogListingFeaturedPost {
  image: string;
  imageAlt?: string;
  title: string;
  excerpt: string;
  author: BlogListingFeaturedCardAuthor;
  ctaLabel?: string;
  onCtaClick?: () => void;
}

export interface BlogListingPost {
  id?: string;
  image: string;
  imageAlt?: string;
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  author: BlogListingCardAuthor;
}

export interface BlogListingBlockProps {
  /** Small pill above the title, e.g. "Blog". Omit to hide it. */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  featuredPost: BlogListingFeaturedPost;
  posts: BlogListingPost[];
  className?: string;
}

export const BlogListingBlock: React.FC<BlogListingBlockProps> = ({
  eyebrow = 'Blog', title, subtitle, featuredPost, posts, className,
}) => (
  <div className={[styles.block, className ?? ''].filter(Boolean).join(' ')}>
    <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} align="left" className={styles.heading} />

    <BlogListingFeaturedCard
      image={featuredPost.image}
      imageAlt={featuredPost.imageAlt}
      title={featuredPost.title}
      excerpt={featuredPost.excerpt}
      author={featuredPost.author}
      ctaLabel={featuredPost.ctaLabel}
      onCtaClick={featuredPost.onCtaClick}
      orientation="horizontal"
      className={styles.fullWidth}
    />

    <div className={styles.grid}>
      {posts.map((post, i) => (
        <BlogListingCard
          key={post.id ?? post.title ?? i}
          image={post.image}
          imageAlt={post.imageAlt}
          category={post.category}
          readTime={post.readTime}
          title={post.title}
          excerpt={post.excerpt}
          author={post.author}
          layout="default"
          className={styles.card}
        />
      ))}
    </div>
  </div>
);

export default BlogListingBlock;
