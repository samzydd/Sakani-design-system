/**
 * CareersBlock — Blocks / Marketing / Careers
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
 * your project and edit it directly: wire "Apply now" to your real ATS/
 * application flow in place of the callback here.
 *
 * Matches Figma "Careers" (node 1555:2). Composed entirely from existing
 * library components -- SectionHeading (Marketing, the "Careers" eyebrow
 * + title + subtitle) and JobListing (Marketing, layout="row", already
 * covering the row's own title/description/meta-badges/LocationDot/
 * Apply-button treatment) -- no new visual primitives, this block is
 * purely heading + a bordered list of rows.
 *
 * The border between rows, the row's own 24px padding, and overriding
 * JobListing's own max-width:480px (a standalone-usage default, far
 * narrower than this block's actual row width) are all owned by this
 * block -- JobListing's "row" layout intentionally has no chrome at all
 * by design, meant to be dropped into whatever list context needs it.
 * The divider border applies to every row except the first, matching
 * Figma's own list export.
 */

import React from 'react';
import { SectionHeading } from '../../components/MarketingComponents/SectionHeading';
import { JobListing, type JobListingProps } from '../../components/MarketingComponents/JobListing';
import styles from './CareersBlock.module.css';

export interface CareersJob extends Omit<JobListingProps, 'layout' | 'className'> {
  /** Unique key for the list -- defaults to `title` if omitted. */
  id?: string;
}

export interface CareersBlockProps {
  /** Small pill above the title, e.g. "Careers". Omit to hide it. */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  jobs: CareersJob[];
  className?: string;
}

export const CareersBlock: React.FC<CareersBlockProps> = ({
  eyebrow = 'Careers', title, subtitle, jobs, className,
}) => (
  <div className={[styles.block, className ?? ''].filter(Boolean).join(' ')}>
    <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} align="left" className={styles.heading} />

    <div className={styles.list}>
      {jobs.map(({ id, ...job }, i) => (
        <JobListing
          key={id ?? job.title ?? i}
          {...job}
          layout="row"
          className={[styles.row, i > 0 ? styles.rowDivider : ''].filter(Boolean).join(' ')}
        />
      ))}
    </div>
  </div>
);

export default CareersBlock;
