/**
 * FeatureGridBlock — Blocks / Marketing / Feature Grid
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
 * your project and edit it directly.
 *
 * Matches Figma "Feature Grid" (node 1507:27888, 3 previews: Columns=2/
 * 3/4). Figma's own "Columns" axis is fully derived from `features.length`
 * in every one of its 3 examples (2 features -> 2 columns, 3 -> 3, 4 ->
 * 4) rather than an independent choice, so `columns` defaults to
 * `features.length` here too instead of needing to be set manually for
 * the common case -- it stays a real optional override, though, for
 * wrapping more features onto fewer columns (e.g. 6 features at
 * columns=3 makes two rows) since that genuinely can't be derived.
 *
 * Each feature's icon chip reuses the shared FeaturedIcon component
 * (size="md", variant="light" -- an exact match for Figma's own 40px
 * bg/surface+border/subtle chip here) -- no new visual primitives, this
 * block is purely an icon + title + description repeated in a grid.
 */

import React from 'react';
import { FeaturedIcon } from '../../components/MarketingComponents/FeaturedIcon';
import styles from './FeatureGridBlock.module.css';

export interface FeatureGridItem {
  id?: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface FeatureGridBlockProps {
  features: FeatureGridItem[];
  /** Number of columns. Defaults to `features.length` (Figma's own examples never wrap). */
  columns?: number;
  className?: string;
}

export const FeatureGridBlock: React.FC<FeatureGridBlockProps> = ({
  features, columns, className,
}) => (
  <div className={[styles.block, className ?? ''].filter(Boolean).join(' ')}>
    <div
      className={styles.grid}
      style={{ '--feature-grid-columns': columns ?? features.length } as React.CSSProperties}
    >
      {features.map((feature, i) => (
        <div key={feature.id ?? feature.title ?? i} className={styles.feature}>
          <FeaturedIcon icon={feature.icon} size="md" variant="light" />
          <p className={styles.title}>{feature.title}</p>
          <p className={styles.description}>{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export default FeatureGridBlock;
