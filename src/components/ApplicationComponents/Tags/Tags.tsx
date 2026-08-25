/**
 * Tags
 *
 * Matches Figma "Tags" -- a wrapped row of pill tags. Its two style previews
 * (Default / Removable) collapse to one axis, derived rather than a manual
 * prop, same judgment applied throughout this Application set: passing
 * `onRemove` is what turns every tag removable, since Figma's own spec
 * toggles the whole list at once rather than per-tag.
 *
 * Each tag reuses the real Badge component directly (neutral/subtle is an
 * exact token match: bg/subtle, fg/muted, radius/full, 2px/8px padding) --
 * the remove "x" is Badge's own rightIcon slot, wrapped in a button so it's
 * independently clickable/focusable.
 */

import React from 'react';
import { X } from 'lucide-react';
import { Badge } from '../../Badge';
import { iconStrokeWidth } from '../../../lib/iconStrokeWidth';
import styles from './Tags.module.css';

export interface TagsProps {
  tags: string[];
  /** Presence makes every tag removable, showing an "x" that calls this with the removed tag. */
  onRemove?: (tag: string, index: number) => void;
  className?: string;
}

export const Tags: React.FC<TagsProps> = ({ tags, onRemove, className }) => (
  <div className={[styles.tags, className ?? ''].filter(Boolean).join(' ')}>
    {tags.map((tag, index) => (
      <Badge
        key={tag}
        rightIcon={
          onRemove && (
            <button
              type="button"
              className={styles.remove}
              onClick={() => onRemove(tag, index)}
              aria-label={`Remove ${tag}`}
            >
              <X size={12} strokeWidth={iconStrokeWidth(12)} />
            </button>
          )
        }
      >
        {tag}
      </Badge>
    ))}
  </div>
);

export default Tags;
