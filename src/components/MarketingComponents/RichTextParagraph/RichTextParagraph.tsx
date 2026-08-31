/**
 * RichTextParagraph
 *
 * Matches Figma "Rich Text Paragraph" (Marketing primitives set, 2
 * style previews: Default, With Link). Unlike every other Figma "style"
 * axis in this set, this one isn't a prop at all -- Figma's own static
 * mock renders identical plain muted text in both previews (a design
 * tool can't demonstrate a real inline hyperlink's visual state), so
 * the only actual difference is CONTENT: whether the prose happens to
 * contain a link. That's naturally expressed through composition --
 * `children` accepts arbitrary inline content, so a real caller just
 * drops the shared Link component in wherever the linked phrase belongs
 * (e.g. "...start with our <Link href=...>full audit checklist</Link>
 * before...") instead of this component needing a manual `hasLink`
 * boolean or a separate `linkText`/`linkHref` prop pair that couldn't
 * place the link mid-sentence anyway.
 *
 * body/lg: 18px/28px medium, fg/muted -- no fixed width, unlike Figma's
 * own 560px export: this is a portable text primitive meant to flow
 * inside whatever container places it, same reasoning already applied
 * to BlogFeatureText's own text.
 */

import React from 'react';
import styles from './RichTextParagraph.module.css';

export interface RichTextParagraphProps {
  children: React.ReactNode;
  className?: string;
}

export const RichTextParagraph: React.FC<RichTextParagraphProps> = ({ children, className }) => (
  <p className={[styles.paragraph, className ?? ''].filter(Boolean).join(' ')}>{children}</p>
);

export default RichTextParagraph;
