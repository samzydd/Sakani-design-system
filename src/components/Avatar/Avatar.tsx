/**
 * Avatar
 *
 * User/entity avatar. Matches Figma "Avatar" set:
 *   AV size (sm|md|lg|xl) x Type (Initials|Icon|Image)
 *
 * Exact Figma spec:
 *   sizes: sm 24 · md 32 · lg 40 · xl 48 (all radius-full)
 *   fill: bg/subtle · initials text: fg/muted, scaling label style per size
 *   Type is inferred from props: `src` -> Image, `initials` -> Initials, else Icon
 */

import React from 'react';
import styles from './Avatar.module.css';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  /** Figma AV axis. Defaults to "md". */
  size?: AvatarSize;
  /** Image URL — renders Image type. */
  src?: string;
  /** Alt text for the image. */
  alt?: string;
  /** 1–2 letters — renders Initials type when no src. */
  initials?: string;
  /** Custom icon — renders Icon type when no src/initials. */
  icon?: React.ReactNode;
  className?: string;
}

/** Default user icon used for the Icon type when none supplied. */
const DefaultUserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const Avatar: React.FC<AvatarProps> = ({
  size = 'md', src, alt = '', initials, icon, className,
}) => {
  const cls = [styles.avatar, styles[`avatar--${size}`], className ?? '']
    .filter(Boolean).join(' ');

  // Image type
  if (src) {
    return (
      <span className={cls}>
        <img src={src} alt={alt} className={styles.avatar__image} />
      </span>
    );
  }

  // Initials type
  if (initials) {
    return (
      <span className={cls} role="img" aria-label={alt || initials}>
        <span className={styles.avatar__initials}>{initials.slice(0, 2).toUpperCase()}</span>
      </span>
    );
  }

  // Icon type (fallback)
  return (
    <span className={cls} role="img" aria-label={alt || 'avatar'}>
      <span className={styles.avatar__icon}>{icon ?? <DefaultUserIcon />}</span>
    </span>
  );
};

export default Avatar;
