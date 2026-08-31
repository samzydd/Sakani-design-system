/**
 * LocationDot
 *
 * Matches Figma "Location Dot" (Marketing primitives set, shared across
 * any marketing component that shows a location -- JobListing is the
 * first consumer). 2 Status previews collapse into one derived-from-data
 * color, not a manual style prop: `status` directly drives the dot's
 * fill --
 *   'active' -- success/solid (green) dot, e.g. a real office location
 *     ("Lagos, Nigeria").
 *   'remote' -- fg/muted (gray) dot, matching the label text's own
 *     color exactly, e.g. "Remote — Worldwide".
 *
 * Kept as its own exported component (unlike JobListing's earlier local
 * build of this exact markup) specifically so other marketing components
 * needing a location line can reuse it instead of re-implementing the
 * dot+label pattern -- the scalability concern that prompted breaking it
 * out here.
 */

import React from 'react';
import styles from './LocationDot.module.css';

export type LocationDotStatus = 'active' | 'remote';

export interface LocationDotProps {
  location: string;
  /** Figma Status axis. Defaults to "active". */
  status?: LocationDotStatus;
  className?: string;
}

export const LocationDot: React.FC<LocationDotProps> = ({
  location, status = 'active', className,
}) => (
  <span className={[styles.root, className ?? ''].filter(Boolean).join(' ')}>
    <span className={[styles.dot, status === 'active' ? styles.dotActive : styles.dotRemote].join(' ')} aria-hidden="true" />
    {location}
  </span>
);

export default LocationDot;
