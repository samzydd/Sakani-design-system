/**
 * Announcement
 *
 * Full-width announcement bar. Matches Figma "Announcement":
 *   Style: Neutral — sparkle icon, bold message, "Learn more" link, dismiss
 *        | Urgent — alert-triangle icon (info-colored), message, dismiss
 *
 * Both styles push the dismiss IconButton to the far right via a growing
 * content group, matching Figma's two (functionally equivalent) structures.
 */

import React from 'react';
import { Sparkles, TriangleAlert, X } from 'lucide-react';
import { Link } from '../../Link';
import { IconButton } from '../../IconButton';
import styles from './Announcement.module.css';

export type AnnouncementVariant = 'neutral' | 'urgent';

export interface AnnouncementProps {
  message: string;
  /** "Learn more"-style link, shown only for variant="neutral". */
  linkLabel?: string;
  linkHref?: string;
  onLinkClick?: () => void;
  /** Dismiss button only renders when this is provided. */
  onDismiss?: () => void;
  variant?: AnnouncementVariant;
  className?: string;
}

export const Announcement: React.FC<AnnouncementProps> = ({
  message, linkLabel, linkHref, onLinkClick, onDismiss, variant = 'neutral', className,
}) => {
  const isUrgent = variant === 'urgent';

  return (
    <div className={[styles.announcement, styles[`announcement--${variant}`], className ?? ''].filter(Boolean).join(' ')}>
      <div className={styles.content}>
        <span className={styles.icon} aria-hidden="true">
          {isUrgent ? (
            // Filled triangle with a lighter cutout stroke for the "!" mark
            // -- matches the banner's own bg so it reads as a punch-through
            // rather than a mismatched halo against the page canvas.
            <TriangleAlert
              size={24}
              strokeWidth={1.5}
              style={{ fill: 'var(--color-info-solid)', stroke: 'var(--color-info-bg)' }}
            />
          ) : (
            <Sparkles size={24} strokeWidth={1.5} fill="currentColor" stroke="currentColor" className={styles.icon__neutral} />
          )}
        </span>
        <p className={styles.message}>{message}</p>
        {!isUrgent && linkLabel && (
          // Inline style, not a CSS class -- Announcement's own module CSS
          // and Link's default color class have equal specificity, so a
          // class-based override would depend on unreliable import-order
          // cascade tiebreaking. Inline style always wins deterministically.
          <Link
            href={linkHref}
            onClick={onLinkClick}
            className={styles.link}
            style={{ color: 'var(--color-brand-fg)', fontSize: 16, lineHeight: '24px' }}
          >
            {linkLabel}
          </Link>
        )}
      </div>
      {onDismiss && (
        <IconButton icon={X} size="sm" variant="ghost" aria-label="Dismiss" onClick={onDismiss} />
      )}
    </div>
  );
};

export default Announcement;
