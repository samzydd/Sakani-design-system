/**
 * SubFeature
 *
 * Matches Figma "Sub Feature" (Marketing primitives set, 2 independent
 * axes: Layout (Horizontal/Vertical) x Left border (True/False)). Both
 * stay real, explicit props (Figma's own axis names) -- genuine layout
 * choices with nothing in the icon/title/description data to derive
 * them from.
 *
 * `leftBorder` always wraps the ENTIRE icon+text group (not just the
 * text) in a row alongside a vertical rail, regardless of `layout` --
 * confirmed from Figma's own "Vertical, Left border=True" export, where
 * the rail sits to the left of the icon-above-text column, not just
 * beside the text. The rail is the shared Divider component
 * (orientation="vertical"), with the same height:auto override
 * BlogBlockquote's own rail needed: Divider's own height:100% can't
 * resolve against this row's content-sized (indefinite) height, so
 * without the override it falls back to a min-height floor instead of
 * stretching to match the icon+text group's actual height.
 *
 * The icon chip reuses the shared FeaturedIcon component directly
 * (size="sm", variant="light" -- an exact match for Figma's own 32px
 * bg/surface+border/subtle chip here), not rebuilt locally.
 */

import React from 'react';
import { FeaturedIcon } from '../FeaturedIcon';
import { Divider } from '../../Divider';
import styles from './SubFeature.module.css';

export type SubFeatureLayout = 'horizontal' | 'vertical';

export interface SubFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  /** Figma Layout axis. Defaults to "horizontal". */
  layout?: SubFeatureLayout;
  /** Figma "Left border" axis. Defaults to false. */
  leftBorder?: boolean;
  className?: string;
}

export const SubFeature: React.FC<SubFeatureProps> = ({
  icon, title, description, layout = 'horizontal', leftBorder = false, className,
}) => {
  const isVertical = layout === 'vertical';

  const content = (
    <div className={isVertical ? styles.contentVertical : styles.contentHorizontal}>
      <FeaturedIcon icon={icon} size="sm" variant="light" />
      <div className={isVertical ? styles.textVertical : styles.textHorizontal}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );

  if (!leftBorder) {
    return React.cloneElement(content, { className: [content.props.className, className ?? ''].filter(Boolean).join(' ') });
  }

  return (
    <div className={[styles.rootBordered, className ?? ''].filter(Boolean).join(' ')}>
      <Divider orientation="vertical" className={styles.rail} />
      {content}
    </div>
  );
};

export default SubFeature;
