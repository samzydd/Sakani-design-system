/**
 * BlogBlockquote
 *
 * Matches Figma "Blog Blockquote" (Marketing primitives set, first of the
 * category): a left vertical Divider rail + quote text. Figma's 2 style
 * previews ("With Attribution" / "Simple") collapse into one derived axis
 * rather than a manual style prop, same reasoning used throughout this
 * library -- presence of `author` decides the treatment:
 *   With `author`  -- bg/surface + radius/lg card, small quote-mark glyphs
 *     above/below the text (Figma reuses the identical icon unrotated in
 *     both spots, not a mirrored open/close pair, so this does too),
 *     body/lg fg/default text, and an attribution row (Avatar + bold name
 *     + ", role" in fg/muted).
 *   Without `author` -- no card chrome, the quote text itself wrapped in
 *     literal straight quotes (Figma's own Simple content is literally
 *     `"..."`, not an icon substitute) in fg/muted, i.e. a lighter-weight
 *     pull-quote for when there's no one to credit.
 *
 * Composed from the shared Divider (vertical) and Avatar (image type)
 * components -- no new visual primitives beyond the quote-mark glyph
 * itself (lucide `Quote`, not in either component's existing icon set).
 */

import React from 'react';
import { Quote } from 'lucide-react';
import { Divider } from '../../Divider';
import { Avatar } from '../../Avatar';
import { iconStrokeWidth } from '../../../lib/iconStrokeWidth';
import styles from './BlogBlockquote.module.css';

export interface BlogBlockquoteAuthor {
  name: string;
  /** e.g. "Founder at Loopline" -- rendered after the name as ", {role}". */
  role: string;
  avatarSrc?: string;
  avatarAlt?: string;
}

export interface BlogBlockquoteProps {
  quote: string;
  /** Presence switches to the card + quote-mark-glyphs + attribution-row treatment. */
  author?: BlogBlockquoteAuthor;
  className?: string;
}

export const BlogBlockquote: React.FC<BlogBlockquoteProps> = ({
  quote, author, className,
}) => {
  const hasAuthor = Boolean(author);

  return (
    <div
      className={[styles.root, hasAuthor ? styles.rootAttributed : styles.rootSimple, className ?? ''].filter(Boolean).join(' ')}
    >
      <Divider orientation="vertical" className={styles.rail} />
      <div className={styles.body}>
        {hasAuthor && (
          <span className={styles.markRow} aria-hidden="true">
            <Quote size={12} strokeWidth={iconStrokeWidth(12)} className={styles.mark} fill="currentColor" />
          </span>
        )}

        <p className={hasAuthor ? styles.quoteAttributed : styles.quoteSimple}>
          {hasAuthor ? quote : `"${quote}"`}
        </p>

        {hasAuthor && (
          <span className={[styles.markRow, styles.markRowEnd].join(' ')} aria-hidden="true">
            <Quote size={12} strokeWidth={iconStrokeWidth(12)} className={styles.mark} fill="currentColor" />
          </span>
        )}

        {author && (
          <div className={styles.author}>
            <Avatar size="sm" src={author.avatarSrc} alt={author.avatarAlt ?? author.name} />
            <p className={styles.authorText}>
              <span className={styles.authorName}>{author.name}</span>
              <span className={styles.authorRole}>, {author.role}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogBlockquote;
