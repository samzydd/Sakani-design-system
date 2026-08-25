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
 *   Image type only: 1px border/subtle ring (added across every size).
 */

import React from 'react';
import { iconStrokeWidth } from '../../lib/iconStrokeWidth';
import styles from './Avatar.module.css';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

// Matches .avatar__icon svg's per-size CSS in Avatar.module.css.
const ICON_PX: Record<AvatarSize, number> = { sm: 14, md: 18, lg: 22, xl: 26 };

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

/** Default user icon used for the Icon type when none supplied. Its
 * viewBox is a fixed 24 units but CSS renders it at 14-26px depending on
 * `size` -- strokeWidth has to be scaled up to compensate or the line
 * renders visibly thinner than Figma's own same-size-native icon exports. */
const DefaultUserIcon = ({ px }: { px: number }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={iconStrokeWidth(px)}
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
      <span className={[cls, styles['avatar--bordered']].join(' ')}>
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

  // Icon type (fallback) -- a custom `icon` is cloned with the same
  // compensation as DefaultUserIcon so any consumer-supplied glyph renders
  // at a true 1.5px stroke too, without them having to know why.
  const iconPx = ICON_PX[size];
  const renderedIcon = React.isValidElement<{ size?: number; strokeWidth?: number }>(icon)
    ? React.cloneElement(icon, { size: iconPx, strokeWidth: iconStrokeWidth(iconPx) })
    : (icon ?? <DefaultUserIcon px={iconPx} />);

  return (
    <span className={cls} role="img" aria-label={alt || 'avatar'}>
      <span className={styles.avatar__icon}>{renderedIcon}</span>
    </span>
  );
};

export default Avatar;
