/**
 * AvatarGroup
 *
 * Overlapping stack of avatars with an optional "+N" overflow chip.
 * Figma "Avatar Group" is a single composed component; this renders a
 * flexible group from Avatar children with a ring gap so they read as a stack.
 */

import React from 'react';
import { Avatar, type AvatarSize } from '../Avatar/Avatar';
import styles from './AvatarGroup.module.css';

export interface AvatarGroupProps {
  /** Size applied to every avatar in the group. */
  size?: AvatarSize;
  /** Max avatars to show before collapsing into a +N chip. */
  max?: number;
  /** Avatar definitions. */
  avatars: Array<{ src?: string; initials?: string; alt?: string }>;
  className?: string;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  size = 'md', max = 4, avatars, className,
}) => {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - visible.length;

  return (
    <div className={[styles.group, styles[`group--${size}`], className ?? ''].filter(Boolean).join(' ')}>
      {visible.map((a, i) => (
        <span key={i} className={styles.group__item}>
          <Avatar size={size} src={a.src} initials={a.initials} alt={a.alt} />
        </span>
      ))}

      {/* Overflow chip — same dimensions as an avatar */}
      {overflow > 0 && (
        <span className={styles.group__item}>
          <span className={[styles.overflow, styles[`overflow--${size}`]].join(' ')}>
            +{overflow}
          </span>
        </span>
      )}
    </div>
  );
};

export default AvatarGroup;
