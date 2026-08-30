/**
 * BlogFeatureText
 *
 * Matches Figma "Blog Feature Text" (Marketing primitives set): a
 * brand-colored accent rule + a pulled-out heading/md line of body copy.
 * Figma's own "Align" axis (Left/Top) is a real, independent layout
 * choice -- not derivable from the text itself -- so it stays an
 * explicit prop, unlike BlogBlockquote's derived style:
 *   'left' (Figma "Left")  -- a thin (2px) vertical rule, self-stretch to
 *     the text's own height, row layout.
 *   'top' (Figma "Top")    -- a short (60px) horizontal rule above the
 *     text, column layout.
 *
 * The rule is NOT the shared Divider component: Divider is bound to the
 * neutral border token for structural separation, while this is a
 * decorative brand/default (accent-orange) accent mark with a different
 * semantic meaning -- same reasoning ProductCard gave for building its
 * own price row instead of reusing PriceDisplay.
 */

import React from 'react';
import styles from './BlogFeatureText.module.css';

export type BlogFeatureTextAlign = 'left' | 'top';

export interface BlogFeatureTextProps {
  text: string;
  /** Figma Align axis. Defaults to "left". */
  align?: BlogFeatureTextAlign;
  className?: string;
}

export const BlogFeatureText: React.FC<BlogFeatureTextProps> = ({
  text, align = 'left', className,
}) => (
  <div className={[styles.root, align === 'top' ? styles.rootTop : styles.rootLeft, className ?? ''].filter(Boolean).join(' ')}>
    <span className={align === 'top' ? styles.ruleTop : styles.ruleLeft} aria-hidden="true" />
    <p className={styles.text}>{text}</p>
  </div>
);

export default BlogFeatureText;
