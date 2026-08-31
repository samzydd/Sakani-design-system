/**
 * ProfileCard
 *
 * Matches Figma "Profile Card" (Marketing primitives set, 2 styles:
 * Compact, Detailed). Whether the Detailed layout renders is derived
 * from data, not a manual style prop -- same "derive from data" pattern
 * used throughout this library: a `bio` and/or `socialLinks` presence
 * means there's more to show than a bare name tag, so the card expands
 * into the centered, fuller layout; with neither, it stays the compact
 * horizontal row.
 *
 * Avatar reuses the shared Avatar component (size="xl", an exact match
 * for Figma's own 48px avatar here). The social icon buttons are NOT
 * the shared IconButton: none of its 5 variants produce Figma's own
 * bg/surface + shadow/xs + no-border look, same reasoning
 * MobileNavigationMenu's own toggle button and WishlistButton give for
 * building that exact shape locally instead. `socialLinks` takes an
 * arbitrary icon slot rather than a fixed X/GitHub enum, since a real
 * profile card needs to support whatever platforms a person actually
 * links (LinkedIn, a personal site, etc.), not just Figma's two
 * examples -- SocialIcons.tsx in this same folder provides real X and
 * GitHub marks for the story to demonstrate that slot with (traced from
 * SVGs downloaded from the Figma file -- lucide-react ships no brand
 * icons in the version this library uses -- but reimplemented as inline
 * `currentColor` components rather than kept as static image assets:
 * the raw downloads hardcode opaque black fills, which went invisible
 * against this card's own dark-mode social button until switched to
 * `currentColor`, since an `<img src>` reference can't be recolored
 * from outside by the parent's theme-aware CSS the way an inline SVG
 * can).
 */

import React from 'react';
import { Avatar } from '../../Avatar';
import styles from './ProfileCard.module.css';

export interface ProfileCardSocialLink {
  icon: React.ReactNode;
  /** Accessible name, e.g. "X (Twitter)". */
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface ProfileCardProps {
  name: string;
  role: string;
  avatarSrc?: string;
  avatarAlt?: string;
  /** Presence (with or without socialLinks) switches to the centered Detailed layout. */
  bio?: string;
  socialLinks?: ProfileCardSocialLink[];
  className?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name, role, avatarSrc, avatarAlt, bio, socialLinks = [], className,
}) => {
  const isDetailed = Boolean(bio) || socialLinks.length > 0;

  return (
    <div className={[styles.root, isDetailed ? styles.rootDetailed : styles.rootCompact, className ?? ''].filter(Boolean).join(' ')}>
      <Avatar size="xl" src={avatarSrc} alt={avatarAlt ?? name} />

      <div className={isDetailed ? styles.infoDetailed : styles.infoCompact}>
        <p className={styles.name}>{name}</p>
        <p className={styles.role}>{role}</p>
      </div>

      {isDetailed && bio && <p className={styles.bio}>{bio}</p>}

      {isDetailed && socialLinks.length > 0 && (
        <div className={styles.social}>
          {socialLinks.map((link, i) => (
            <a
              key={link.label ?? i}
              href={link.href}
              onClick={link.onClick}
              className={styles.socialBtn}
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
