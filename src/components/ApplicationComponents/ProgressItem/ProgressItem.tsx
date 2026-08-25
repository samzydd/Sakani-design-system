/**
 * ProgressItem
 *
 * One row of a numbered step list. Matches Figma "Progress Item":
 *   Content: Number | Icon (checkmark) -- derived from `completed` here
 *            rather than a raw content prop, since a real consumer thinks
 *            in terms of "is this step done?" not "which glyph renders"
 *   Orientation: Horizontal (row, connector runs right) | Vertical
 *            (column, connector runs down) -- a genuine independent layout
 *            axis, kept as an explicit prop like Expenses' variant
 *
 * The connector isn't a reuse of Divider -- Figma rounds only the trailing
 * end of the horizontal line (flat where it meets the circle) and the
 * vertical connector is a fixed 24px stub, neither of which Divider's
 * uniform full-bleed styling produces. Same call already made for
 * ActivityFeed's rail connector.
 *
 * `isLast` hides the connector, same idea as ActivityFeed's own isLast --
 * a real step list's final row has nothing to connect to.
 */

import React from 'react';
import { Check } from 'lucide-react';
import { iconStrokeWidth } from '../../../lib/iconStrokeWidth';
import styles from './ProgressItem.module.css';

export type ProgressItemOrientation = 'horizontal' | 'vertical';

export interface ProgressItemProps {
  step: number;
  title: string;
  description?: string;
  /** Shows a checkmark in the circle instead of `step`. */
  completed?: boolean;
  orientation?: ProgressItemOrientation;
  /** Hides the trailing connector -- the last row in a list. */
  isLast?: boolean;
  className?: string;
}

export const ProgressItem: React.FC<ProgressItemProps> = ({
  step, title, description, completed = false, orientation = 'horizontal', isLast = false, className,
}) => {
  const isVertical = orientation === 'vertical';

  const value = (
    <span className={styles.value} aria-hidden="true">
      {completed ? <Check size={14} strokeWidth={iconStrokeWidth(14)} /> : step}
    </span>
  );

  const text = (
    <div className={styles.text}>
      <p className={styles.title}>{title}</p>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );

  if (isVertical) {
    return (
      <div className={[styles.item, styles['item--vertical'], className ?? ''].filter(Boolean).join(' ')}>
        <div className={styles.rail}>
          {value}
          {!isLast && <div className={styles.connectorVertical} />}
        </div>
        {text}
      </div>
    );
  }

  return (
    <div className={[styles.item, styles['item--horizontal'], className ?? ''].filter(Boolean).join(' ')}>
      <div className={styles.topRow}>
        {value}
        {!isLast && <div className={styles.connectorHorizontal} />}
      </div>
      {text}
    </div>
  );
};

export default ProgressItem;
