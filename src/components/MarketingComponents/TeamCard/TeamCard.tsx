/**
 * TeamCard
 *
 * Matches Figma "Team Card" (Marketing primitives set, 2 styles: Card,
 * Card details). Whether the bio paragraph renders is derived from
 * `bio` presence, not a manual style prop -- same "derive from data"
 * pattern used throughout this library, same reasoning ProfileCard
 * gives for its own Compact/Detailed split.
 *
 * The location line overlaid on the photo reuses the shared LocationDot
 * component directly -- but overridden to fg/on-inverse (white) text
 * via className, since LocationDot's own default text color (fg/muted)
 * is meant for a plain surface background, not a photo it needs to sit
 * legibly on top of.
 *
 * The 3 social icon chips reuse the shared FeaturedIcon component
 * (size="sm", variant="subtle" -- an exact match for Figma's own
 * accent/subtle-tinted 32px chip here, a different FeaturedIcon
 * treatment than SubFeature's own "light" variant). `socialLinks` takes
 * an arbitrary icon slot rather than a fixed 3-platform enum, same
 * reasoning ProfileCard gives for its own socialLinks -- see
 * TeamSocialIcons.tsx in this folder for real Instagram/Facebook/
 * LinkedIn glyphs to demonstrate that slot with.
 */

import React from 'react';
import { LocationDot, type LocationDotStatus } from '../LocationDot';
import { FeaturedIcon } from '../FeaturedIcon';
import styles from './TeamCard.module.css';

export interface TeamCardSocialLink {
  icon: React.ReactNode;
  /** Accessible name, e.g. "Instagram". */
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface TeamCardProps {
  image: string;
  imageAlt?: string;
  name: string;
  role: string;
  location: string;
  locationStatus?: LocationDotStatus;
  /** Presence switches to the "Card details" style (adds this paragraph below the meta row). */
  bio?: string;
  socialLinks?: TeamCardSocialLink[];
  className?: string;
}

export const TeamCard: React.FC<TeamCardProps> = ({
  image, imageAlt, name, role, location, locationStatus = 'active',
  bio, socialLinks = [], className,
}) => (
  <div className={[styles.card, className ?? ''].filter(Boolean).join(' ')}>
    <div className={styles.imageWrap}>
      <img src={image} alt={imageAlt ?? name} className={styles.image} />
      <LocationDot location={location} status={locationStatus} className={styles.locationDot} />
    </div>

    <div className={styles.info}>
      <div className={styles.metaRow}>
        <div className={styles.identity}>
          <p className={styles.name}>{name}</p>
          <p className={styles.role}>{role}</p>
        </div>

        {socialLinks.length > 0 && (
          <div className={styles.social}>
            {socialLinks.map((link, i) => (
              <a key={link.label ?? i} href={link.href} onClick={link.onClick} aria-label={link.label}>
                <FeaturedIcon icon={link.icon} size="sm" variant="subtle" />
              </a>
            ))}
          </div>
        )}
      </div>

      {bio && <p className={styles.bio}>{bio}</p>}
    </div>
  </div>
);

export default TeamCard;
