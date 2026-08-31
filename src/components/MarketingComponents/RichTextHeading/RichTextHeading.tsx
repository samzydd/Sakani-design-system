/**
 * RichTextHeading
 *
 * Matches Figma "Rich Text Heading" (Marketing primitives set, 2 levels:
 * H2, H3). `level` stays a real, explicit prop (Figma's own axis) --
 * unlike most "style" axes elsewhere in this set, a heading's semantic
 * level genuinely can't be derived from its text content, and it
 * directly decides which real HTML tag renders (`<h2>`/`<h3>`), not just
 * which visual size -- this is prose content, so the actual document
 * outline matters for accessibility, unlike Figma's own flat `<p>`
 * export (a design tool has no heading hierarchy to preserve).
 *
 *   h2 -- heading/lg: 24px/32px medium, -0.24px tracking, fg/default.
 *   h3 -- heading/md: 20px/28px medium, fg/default (no tracking --
 *     confirmed absent from Figma's own h3 export, unlike h2's).
 */

import React from 'react';
import styles from './RichTextHeading.module.css';

export type RichTextHeadingLevel = 'h2' | 'h3';

export interface RichTextHeadingProps {
  children: React.ReactNode;
  /** Figma Level axis. Defaults to "h2". */
  level?: RichTextHeadingLevel;
  className?: string;
}

export const RichTextHeading: React.FC<RichTextHeadingProps> = ({
  children, level = 'h2', className,
}) => {
  const Tag = level;
  return (
    <Tag className={[styles.heading, styles[level], className ?? ''].filter(Boolean).join(' ')}>
      {children}
    </Tag>
  );
};

export default RichTextHeading;
