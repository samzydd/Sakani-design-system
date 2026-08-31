/**
 * TestimonialBlock — Blocks / Marketing / Testimonial
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file
 * into your project and edit it directly.
 *
 * Matches Figma "Testimonial" (node 1512:27929, 2 layouts: Single,
 * Grid). Which layout renders is derived from `testimonials.length`
 * (1 -> Single, 2+ -> Grid) rather than a manual `layout` prop -- same
 * "derive from data" pattern used throughout this library (e.g.
 * PricingTableBlock's own tier-count-driven layout switch).
 *
 * Both layouts reuse the shared Avatar component (Single: size="md"/
 * 32px, Grid: size="sm"/24px, an exact match for Figma's own two
 * sizes here) and lucide's `Quote` icon (Single layout only) -- Figma's
 * own quote glyph is lucide's "quote" icon exactly (confirmed by
 * comparing path data), so no local SVG was needed here, unlike the
 * social/brand icons elsewhere in this library that lucide doesn't
 * ship.
 *
 * Figma's own asset reuses a handful of generic stock headshots across
 * this design file, and a couple of testimonial authors here end up
 * with a name/photo mismatch as a result -- e.g. "Jade Silva" and
 * "Chidi Duru" (a different, unrelated Chidi Duru than TeamCard's own
 * story) are paired with photos of a different gender than their name.
 * Kept as-is, matching every prior instance of this same Figma quirk
 * (TeamSectionBlock's Floyd Miles/Darlene Robertson) rather than
 * silently "fixed".
 */

import React from 'react';
import { Quote } from 'lucide-react';
import { Avatar } from '../../components/Avatar';
import styles from './TestimonialBlock.module.css';

export interface Testimonial {
  quote: string;
  authorName: string;
  authorRole: string;
  authorAvatar?: string;
}

export interface TestimonialBlockProps {
  testimonials: Testimonial[];
  className?: string;
}

const Author: React.FC<{ t: Testimonial; avatarSize: 'sm' | 'md' }> = ({ t, avatarSize }) => (
  <div className={styles.author}>
    <Avatar size={avatarSize} src={t.authorAvatar} alt={t.authorName} />
    <div className={styles.nameCol}>
      <p className={styles.name}>{t.authorName}</p>
      <p className={styles.role}>{t.authorRole}</p>
    </div>
  </div>
);

export const TestimonialBlock: React.FC<TestimonialBlockProps> = ({ testimonials, className }) => {
  const isSingle = testimonials.length <= 1;
  const t = testimonials[0];

  if (isSingle && t) {
    return (
      <div className={[styles.block, styles.blockSingle, className ?? ''].filter(Boolean).join(' ')}>
        <Quote size={24} className={styles.quoteIcon} aria-hidden="true" />
        <p className={styles.quoteSingle}>{t.quote}</p>
        <Author t={t} avatarSize="md" />
      </div>
    );
  }

  return (
    <div className={[styles.block, className ?? ''].filter(Boolean).join(' ')}>
      <div className={styles.grid}>
        {testimonials.map((item, i) => (
          <div key={item.authorName ?? i} className={styles.card}>
            <p className={styles.quoteGrid}>{item.quote}</p>
            <Author t={item} avatarSize="sm" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialBlock;
