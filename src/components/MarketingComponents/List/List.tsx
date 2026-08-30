/**
 * List
 *
 * Matches Figma "List" (Marketing primitives set, 3 styles: Check,
 * Bullet, Arrow). `style` stays a real, explicit prop (Figma's own
 * axis) -- a genuine visual-language choice for the marker, not
 * derivable from the item text:
 *   'check'  -- lucide Check, 18px.
 *   'bullet' -- a plain filled 8px dot (not an icon at all in Figma's
 *     own asset -- no lucide glyph needed).
 *   'arrow'  -- lucide ArrowRight, 16px.
 * All three use the same fg/muted color for both marker and label --
 * confirmed identical across all three fetched previews, not just the
 * bullet's own color.
 *
 * `items` is a plain string array (each item is a single label, no
 * per-item icon override in Figma) rather than an array of objects --
 * simplest shape that matches what the design actually shows.
 */

import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { iconStrokeWidth } from '../../../lib/iconStrokeWidth';
import styles from './List.module.css';

export type ListStyle = 'check' | 'bullet' | 'arrow';

export interface ListProps {
  items: string[];
  /** Figma Style axis. Defaults to "check". */
  style?: ListStyle;
  className?: string;
}

export const List: React.FC<ListProps> = ({ items, style = 'check', className }) => (
  <ul className={[styles.root, className ?? ''].filter(Boolean).join(' ')}>
    {items.map((item, i) => (
      <li key={i} className={styles.item}>
        <span className={styles.marker} aria-hidden="true">
          {style === 'check' && <Check size={18} strokeWidth={iconStrokeWidth(18)} />}
          {style === 'arrow' && <ArrowRight size={16} strokeWidth={iconStrokeWidth(16)} />}
          {style === 'bullet' && <span className={styles.dot} />}
        </span>
        <span className={styles.label}>{item}</span>
      </li>
    ))}
  </ul>
);

export default List;
