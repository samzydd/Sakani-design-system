/**
 * ChatComposer
 *
 * Message input for the chat thread. Matches the Figma "Chat Composer" set:
 *
 *   state (Figma "State" axis) -> default | typing | uploading | disabled
 *
 * Attach + input + emoji + send. Typing shows a focus ring and an enabled
 * send; Uploading stacks an attachment row (with Progress) above the input;
 * Disabled covers read-only conversations.
 */

import React from 'react';
import { Paperclip, Smile, Send, File as FileIcon, X } from 'lucide-react';
import styles from './ChatComposer.module.css';

export type ChatComposerState = 'default' | 'typing' | 'uploading' | 'disabled';

export interface ChatComposerProps {
  state?: ChatComposerState;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onSend?: () => void;
  onAttach?: () => void;
  /** Upload metadata (state="uploading"). */
  uploadName?: string;
  /** Upload progress 0–100 (state="uploading"). */
  uploadProgress?: number;
  onCancelUpload?: () => void;
  className?: string;
}

export const ChatComposer: React.FC<ChatComposerProps> = ({
  state = 'default',
  value,
  placeholder = 'Message…',
  onChange,
  onSend,
  onAttach,
  uploadName,
  uploadProgress = 0,
  onCancelUpload,
  className,
}) => {
  const disabled = state === 'disabled';
  // Uncontrolled fallback: without this, typing in an uncontrolled composer
  // never enables Send because `value` stays undefined.
  const [internal, setInternal] = React.useState('');
  const text = value !== undefined ? value : internal;
  const canSend = !disabled && (text.trim().length > 0 || state === 'typing');
  return (
    <div className={[styles.composer, styles[`composer--${state}`], className ?? ''].filter(Boolean).join(' ')}>
      {state === 'uploading' && (
        <div className={styles.upload}>
          <FileIcon size={16} className={styles.upload__icon} aria-hidden="true" />
          <div className={styles.upload__body}>
            <span className={styles.upload__name}>{uploadName}</span>
            <div className={styles.upload__track}>
              <div className={styles.upload__fill} style={{ width: `${uploadProgress}%` }} />
            </div>
          </div>
          <button type="button" className={styles.icon} onClick={onCancelUpload} aria-label="Cancel upload">
            <X size={16} />
          </button>
        </div>
      )}
      <div className={styles.row}>
        <button type="button" className={styles.icon} onClick={onAttach} disabled={disabled} aria-label="Attach file">
          <Paperclip size={18} />
        </button>
        <input
          type="text"
          className={styles.input}
          value={text}
          placeholder={disabled ? "You can't reply to this conversation" : placeholder}
          disabled={disabled}
          onChange={(e) => {
            if (value === undefined) setInternal(e.target.value);
            onChange?.(e.target.value);
          }}
          onKeyDown={(e) => { if (e.key === 'Enter' && canSend) { e.preventDefault(); onSend?.(); } }}
        />
        <button type="button" className={styles.icon} disabled={disabled} aria-label="Add emoji">
          <Smile size={18} />
        </button>
        <button
          type="button"
          className={[styles.icon, styles.send].join(' ')}
          onClick={onSend}
          disabled={!canSend}
          aria-label="Send message"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default ChatComposer;
