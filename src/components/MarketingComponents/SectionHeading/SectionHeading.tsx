/**
 * SectionHeading
 *
 * Matches Figma "Section Heading" (Marketing primitives set, 2
 * alignments: Center, Left). `align` stays a real, explicit prop
 * (Figma's own axis) -- a genuine layout choice, not derivable from the
 * heading's own content. Whether the eyebrow badge renders is derived
 * from `eyebrow` presence instead, same "derive from data" pattern used
 * throughout this library.
 *
 * Eyebrow reuses the shared Badge component (accent/subtle, an exact
 * match). This is the same badge+title+subtitle shape ProductGridBlock
 * already built inline for its own heading before this component
 * existed -- ProductGridBlock now reuses this instead of its own local
 * copy, so there's one implementation instead of two drifting in
 * parallel (the exact reasoning CartItem's own QuantitySelector reuse
 * already established in this library).
 *
 * The title renders a real heading tag (`<h2>` by default, overridable
 * via `titleAs`), not Figma's own flat `<p>` export -- same reasoning
 * RichTextHeading gives for not preserving a design tool's lack of
 * document structure: this introduces a real page section, so it needs
 * to actually BE a heading, not just look like one. `titleAs` exists
 * for the rarer case of nesting this under another heading where h2
 * would skip a level.
 */

import React from 'react';
import { Badge } from '../../Badge';
import styles from './SectionHeading.module.css';

export type SectionHeadingAlign = 'center' | 'left';

export interface SectionHeadingProps {
  /** Small pill above the title, e.g. "Features". Omit to hide it. */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Figma Align axis. Defaults to "center". */
  align?: SectionHeadingAlign;
  /** Heading tag for `title`. Defaults to "h2". */
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow, title, subtitle, align = 'center', titleAs: TitleTag = 'h2', className,
}) => (
  <div className={[styles.root, align === 'left' ? styles.rootLeft : styles.rootCenter, className ?? ''].filter(Boolean).join(' ')}>
    {eyebrow && <Badge variant="accent" emphasis="subtle">{eyebrow}</Badge>}
    <TitleTag className={styles.title}>{title}</TitleTag>
    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
  </div>
);

export default SectionHeading;
