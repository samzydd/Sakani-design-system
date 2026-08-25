/**
 * AvatarUpload
 *
 * Profile photo picker. Matches Figma "Avatar Upload":
 *   Orientation: Vertical — big (64px) avatar with a camera badge overlapping
 *                its bottom-right corner, text or a "Change photo" link below.
 *              | Horizontal — avatar beside a text block and an Upload/Remove button.
 *
 * "Filled" vs "Empty" isn't a separate prop to keep in sync -- it's derived
 * from whether `src` is set, same as any other data-driven avatar.
 *
 * Functional: owns a hidden file input (same pattern as FileUpload), opened
 * by the badge, the "Change photo" link, or the "Upload" button. The picked
 * file is always handed back via `onFileSelect` for the real upload. Preview
 * is uncontrolled-by-default like a native input: pass no `src` and this
 * component shows the picked file itself (via a local object URL); pass
 * `src` and it's controlled -- the parent owns what's shown and is expected
 * to update `src` after its own upload completes.
 */

import React from 'react';
import { Camera } from 'lucide-react';
import { Avatar } from '../../Avatar';
import { Link } from '../../Link';
import { Button } from '../../Button';
import { iconStrokeWidth } from '../../../lib/iconStrokeWidth';
import styles from './AvatarUpload.module.css';

export type AvatarUploadOrientation = 'vertical' | 'horizontal';

export interface AvatarUploadProps {
  /** Current photo URL. Filled/empty state is derived from this. */
  src?: string;
  alt?: string;
  orientation?: AvatarUploadOrientation;
  /** Passed to the hidden file input's `accept`. */
  accept?: string;
  title?: string;
  hint?: string;
  /** Fires with the chosen file -- this component doesn't upload it itself. */
  onFileSelect?: (file: File) => void;
  /** Horizontal "Remove" button handler, for real removal (e.g. an API call).
   * Uncontrolled usage clears the local preview regardless of whether this is passed. */
  onRemove?: () => void;
  className?: string;
}

export const AvatarUpload: React.FC<AvatarUploadProps> = ({
  src, alt, orientation = 'vertical', accept = 'image/jpeg,image/png',
  title = 'Upload a photo', hint = 'JPG or PNG, max 5MB.',
  onFileSelect, onRemove, className,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const isControlled = src !== undefined;
  const [internalSrc, setInternalSrc] = React.useState<string | undefined>(undefined);
  const displaySrc = isControlled ? src : internalSrc;

  const isHorizontal = orientation === 'horizontal';
  const isFilled = Boolean(displaySrc);
  const openPicker = () => inputRef.current?.click();
  const handleRemove = () => {
    onRemove?.();
    if (!isControlled) setInternalSrc(undefined);
  };

  const textStack = (
    <div className={[styles.textStack, isHorizontal ? '' : styles['textStack--center']].filter(Boolean).join(' ')}>
      <p className={styles.title}>{title}</p>
      <p className={styles.hint}>{hint}</p>
    </div>
  );

  return (
    <div className={[styles.wrap, styles[`wrap--${orientation}`], className ?? ''].filter(Boolean).join(' ')}>
      <div className={styles.circleWrap}>
        <Avatar
          size={isHorizontal ? 'lg' : 'xl'}
          src={displaySrc}
          alt={alt}
          className={isHorizontal ? undefined : styles.bigAvatar}
        />
        {!isHorizontal && (
          <button type="button" className={styles.badge} onClick={openPicker} aria-label="Change photo">
            <Camera size={16} strokeWidth={iconStrokeWidth(16)} />
          </button>
        )}
      </div>

      {isHorizontal && (
        <div className={styles.horizontalContent}>
          {textStack}
          {isFilled ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handleRemove}
              style={{ color: 'var(--color-danger-fg)', borderColor: 'var(--color-danger-border)' }}
            >
              Remove
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={openPicker}>Upload</Button>
          )}
        </div>
      )}

      {!isHorizontal && (isFilled ? (
        <Link
          href="#"
          onClick={(e) => { e.preventDefault(); openPicker(); }}
          className={styles.link}
          style={{ color: 'var(--color-brand-fg)', fontSize: 16, lineHeight: '24px' }}
        >
          Change photo
        </Link>
      ) : textStack)}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className={styles.input}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            onFileSelect?.(file);
            if (!isControlled) setInternalSrc(URL.createObjectURL(file));
          }
          e.target.value = '';
        }}
      />
    </div>
  );
};

export default AvatarUpload;
