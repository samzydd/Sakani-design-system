/**
 * ProfileSettingsBlock — Blocks / Application / Profile Settings
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
 * your project and edit it directly.
 *
 * Matches Figma "Profile Settings": "Profile" heading -> AvatarUpload
 * (horizontal, reused unmodified -- its own filled/empty states already
 * are Figma's "Remove" (danger outline) vs "Upload" (outline) buttons) ->
 * Full name / Email inputs -> full-width "Save changes" Button.
 *
 * Figma's "Filled"/"Empty" style isn't a manual prop here either -- every
 * piece already derives its own look from data (AvatarUpload from `src`,
 * each Input from its own value vs placeholder), same pattern used
 * throughout this Application set.
 */

import React from 'react';
import { AvatarUpload } from '../../components/ApplicationComponents/AvatarUpload';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import styles from './ProfileSettingsBlock.module.css';

export interface ProfileSettingsBlockProps {
  name?: string;
  email?: string;
  avatarSrc?: string;
  onSave?: (data: { name: string; email: string }) => void;
  className?: string;
}

export const ProfileSettingsBlock: React.FC<ProfileSettingsBlockProps> = ({
  name: initialName = '',
  email: initialEmail = '',
  avatarSrc: initialAvatarSrc,
  onSave,
  className,
}) => {
  const [name, setName] = React.useState(initialName);
  const [email, setEmail] = React.useState(initialEmail);
  const [avatarSrc, setAvatarSrc] = React.useState(initialAvatarSrc);

  return (
    <div className={[styles.block, className ?? ''].filter(Boolean).join(' ')}>
      <h2 className={styles.title}>Profile</h2>

      <AvatarUpload
        orientation="horizontal"
        src={avatarSrc}
        alt={name || 'Profile photo'}
        onFileSelect={(file) => setAvatarSrc(URL.createObjectURL(file))}
        onRemove={() => setAvatarSrc(undefined)}
      />

      <Input
        label="Full name"
        placeholder="Enter your full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button variant="primary" className={styles.save} onClick={() => onSave?.({ name, email })}>
        Save changes
      </Button>
    </div>
  );
};

export default ProfileSettingsBlock;
