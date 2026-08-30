/**
 * FirstPageHeading
 *
 * Matches Figma "First Page Heading" (Marketing primitives set, 16
 * previews: Align (Center/Left) x CTAs/Badge/Avatars (each True/False)).
 * Align stays a real, explicit prop (Figma's own axis) -- a genuine
 * layout choice. The other three axes are all derived from data
 * presence rather than manual booleans, same "derive from data" pattern
 * used throughout this library:
 *   Badge   -- shown when `badgeLabel` is provided.
 *   CTAs    -- Figma's own toggle controls BOTH buttons together (every
 *     True/False preview shows or hides the whole row, never just one
 *     button), so the row renders when either `primaryCta` or
 *     `secondaryCta` is given, not two independent conditions.
 *   Avatars -- shown when `avatars` has at least one entry; the
 *     "N happy users" caption is a separate optional field under that
 *     (Figma always shows both together, but there's no reason a
 *     consumer couldn't want the stack without the count).
 *
 * "Get started" reuses Button variant="primary" -- Figma's own static
 * export shows accent/HOVER as the background, but that's an
 * incidentally-captured hover-state screenshot, not a real distinct
 * default look (confirmed: accent/hover is literally Button's own
 * :hover token, and Figma's "Watch demo" button shows the same
 * hover-only drop-shadow at rest) -- same reasoning already applied
 * elsewhere in this session for not chasing a snapshot's accidental
 * interaction state. "Watch demo" reuses variant="secondary" with a
 * Play glyph in the leftIcon slot. Avatars reuse the shared AvatarGroup
 * component directly (Figma's own "Avatar Group" instance, already a
 * component in this library).
 */

import React from 'react';
import { Play } from 'lucide-react';
import { Badge } from '../../Badge';
import { Button } from '../../Button';
import { AvatarGroup, type AvatarGroupProps } from '../../AvatarGroup';
import { iconStrokeWidth } from '../../../lib/iconStrokeWidth';
import styles from './FirstPageHeading.module.css';

export type FirstPageHeadingAlign = 'center' | 'left';

export interface FirstPageHeadingCta {
  label: string;
  onClick?: () => void;
}

export interface FirstPageHeadingProps {
  title: string;
  description?: string;
  /** Presence renders the pill badge above the title. */
  badgeLabel?: string;
  primaryCta?: FirstPageHeadingCta;
  secondaryCta?: FirstPageHeadingCta;
  /** Presence (non-empty) renders the overlapping avatar stack. */
  avatars?: AvatarGroupProps['avatars'];
  /** Optional caption under the avatar stack, e.g. "21.3K happy users". */
  avatarsCaption?: string;
  /** Figma Align axis. Defaults to "center". */
  align?: FirstPageHeadingAlign;
  className?: string;
}

export const FirstPageHeading: React.FC<FirstPageHeadingProps> = ({
  title, description, badgeLabel, primaryCta, secondaryCta,
  avatars, avatarsCaption, align = 'center', className,
}) => {
  const hasCtas = Boolean(primaryCta || secondaryCta);
  const hasAvatars = Boolean(avatars && avatars.length > 0);

  return (
    <div className={[styles.root, align === 'left' ? styles.rootLeft : styles.rootCenter, className ?? ''].filter(Boolean).join(' ')}>
      {badgeLabel && <Badge variant="accent" emphasis="subtle">{badgeLabel}</Badge>}

      <p className={styles.title}>{title}</p>
      {description && <p className={styles.description}>{description}</p>}

      {hasCtas && (
        <div className={styles.ctaRow}>
          {primaryCta && <Button variant="primary" onClick={primaryCta.onClick}>{primaryCta.label}</Button>}
          {secondaryCta && (
            <Button
              variant="secondary"
              leftIcon={<Play size={16} strokeWidth={iconStrokeWidth(16)} fill="currentColor" />}
              onClick={secondaryCta.onClick}
            >
              {secondaryCta.label}
            </Button>
          )}
        </div>
      )}

      {hasAvatars && (
        <div className={styles.avatarBlock}>
          <AvatarGroup size="md" avatars={avatars!} />
          {avatarsCaption && <p className={styles.avatarsCaption}>{avatarsCaption}</p>}
        </div>
      )}
    </div>
  );
};

export default FirstPageHeading;
