/**
 * JobListing
 *
 * Matches Figma "Job Listing" (Marketing primitives set, 2 styles: Card,
 * Row). `layout` stays a real, explicit prop (Figma's own axis) -- a
 * genuine layout choice:
 *   'card' -- bg/surface + border/subtle + radius/lg card chrome, column
 *     layout, "Apply now" on its own row below the meta.
 *   'row'  -- no card chrome at all (Figma's own Row preview has none),
 *     horizontal layout with the title/description/meta column on the
 *     left (flex:1) and "Apply now" aligned to the bottom-right.
 *
 * Department pill reuses the shared Badge (accent/subtle); employment
 * type pill reuses Badge (neutral/subtle, its default). "Apply now"
 * reuses the shared Button (variant="secondary", size="sm" -- bg/subtle
 * + fg/default is an exact match here, same as
 * BlogListingFeaturedCard's own "Read article").
 *
 * The location line reuses the shared LocationDot component (also
 * Marketing primitives) rather than a local dot+label -- broken out into
 * its own component specifically so any marketing component needing a
 * location can reuse it instead of re-implementing the pattern.
 */

import React from 'react';
import { Badge } from '../../Badge';
import { Button } from '../../Button';
import { LocationDot, type LocationDotStatus } from '../LocationDot';
import styles from './JobListing.module.css';

export type JobListingLayout = 'card' | 'row';

export interface JobListingProps {
  title: string;
  description: string;
  department: string;
  employmentType: string;
  location: string;
  /** Drives LocationDot's color. Defaults to "remote", matching Figma's own Job Listing instances. */
  locationStatus?: LocationDotStatus;
  onApply?: () => void;
  applyLabel?: string;
  /** Figma Style axis. Defaults to "card". */
  layout?: JobListingLayout;
  className?: string;
}

export const JobListing: React.FC<JobListingProps> = ({
  title, description, department, employmentType, location, locationStatus = 'remote',
  onApply, applyLabel = 'Apply now', layout = 'card', className,
}) => {
  const isRow = layout === 'row';

  const meta = (
    <>
      <div className={styles.titleGroup}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.metaRow}>
        <Badge variant="accent" emphasis="subtle">{department}</Badge>
        <Badge variant="neutral" emphasis="subtle">{employmentType}</Badge>
        <LocationDot location={location} status={locationStatus} />
      </div>
    </>
  );

  if (isRow) {
    return (
      <div className={[styles.root, styles.rootRow, className ?? ''].filter(Boolean).join(' ')}>
        <div className={styles.rowLeft}>{meta}</div>
        <Button variant="secondary" size="sm" className={styles.applyBtn} onClick={onApply}>{applyLabel}</Button>
      </div>
    );
  }

  return (
    <div className={[styles.root, styles.rootCard, className ?? ''].filter(Boolean).join(' ')}>
      {meta}
      <Button variant="secondary" size="sm" onClick={onApply}>{applyLabel}</Button>
    </div>
  );
};

export default JobListing;
