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
import ReactDOM from 'react-dom';
import { Paperclip, Smile, Send, File as FileIcon, X } from 'lucide-react';
import { IconButton } from '../IconButton';
import styles from './ChatComposer.module.css';

export type ChatComposerState = 'default' | 'typing' | 'uploading' | 'disabled';

export interface ChatComposerProps {
  state?: ChatComposerState;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onSend?: () => void;
  onAttachmentsChange?: (files: Array<{ name: string; type: string; dataUrl: string }>) => void;
  /** Upload metadata (state="uploading"). */
  uploadName?: string;
  /** Upload progress 0-100 (state="uploading"). */
  uploadProgress?: number;
  onCancelUpload?: () => void;
  className?: string;
}

export const ChatComposer: React.FC<ChatComposerProps> = ({
  state = 'default',
  value,
  placeholder = 'Message...',
  onChange,
  onSend,
  onAttachmentsChange,
  uploadName,
  uploadProgress = 0,
  onCancelUpload,
  className,
}) => {
  const disabled = state === 'disabled';
  // Uncontrolled fallback: without this, typing in an uncontrolled composer
  // never enables Send because `value` stays undefined.
  const [internal, setInternal] = React.useState('');
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  const [pickerPosition, setPickerPosition] = React.useState<{ top: number; right: number }>({ top: 0, right: 0 });
  const [attachedFiles, setAttachedFiles] = React.useState<Array<{ name: string; type: string; dataUrl: string }>>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const emojiButtonRef = React.useRef<HTMLButtonElement>(null);
  const emojiPickerRef = React.useRef<HTMLDivElement>(null);
  const text = value !== undefined ? value : internal;
  const canSend = !disabled && (text.trim().length > 0 || state === 'typing' || attachedFiles.length > 0);

  // Handle attachment button click
  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    // Process each selected file
    Array.from(files).forEach((file) => {
      // Only accept image and video files
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target?.result as string;
          setAttachedFiles((prev) => [...prev, {
            name: file.name,
            type: file.type,
            dataUrl,
          }]);
        };
        reader.readAsDataURL(file);
      }
    });

    // Reset file input
    event.target.value = '';
  };

  // Remove attached file
  const handleRemoveFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle emoji picker button click
  const handleEmojiButtonClick = () => {
    if (!showEmojiPicker && inputRef.current) {
      // Position emoji picker above the input field with 4px gap
      const inputRect = inputRef.current.getBoundingClientRect();
      // Emoji picker height is approximately 104px (padding + 2 rows of emojis)
      const estimatedPickerHeight = 104;
      setPickerPosition({
        top: inputRect.top - estimatedPickerHeight - 4, // 4px above input
        right: 20, // Same right margin as chat composer
      });
    }
    setShowEmojiPicker(!showEmojiPicker);
  };

  // Handle emoji selection from simple picker
  const handleEmojiSelect = (emoji: string) => {
    if (inputRef.current) {
      const start = inputRef.current.selectionStart || text.length;
      const newText = text.slice(0, start) + emoji + text.slice(start);
      setInternal(newText);
      onChange?.(newText);
      inputRef.current.focus();
      inputRef.current.setSelectionRange(start + emoji.length, start + emoji.length);
    }
    // Close picker after selection
    setShowEmojiPicker(false);
  };

  // Close emoji picker when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node) &&
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  // Notify parent of attachment changes
  React.useEffect(() => {
    onAttachmentsChange?.(attachedFiles);
  }, [attachedFiles, onAttachmentsChange]);

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
          <IconButton 
            icon={X} 
            variant="ghost" 
            size="md" 
            onClick={onCancelUpload} 
            aria-label="Cancel upload"
          />
        </div>
      )}
      
      {/* Attachment preview */}
      {attachedFiles.length > 0 && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          padding: '8px',
          backgroundColor: 'var(--color-bg-subtle)',
          borderRadius: '8px',
        }}>
          {attachedFiles.map((file, idx) => (
            <div
              key={idx}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '80px',
                height: '80px',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: 'var(--color-bg-muted)',
                border: '1px solid var(--color-border-default)',
              }}
            >
              {file.type.startsWith('image/') ? (
                <img
                  src={file.dataUrl}
                  alt={file.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ textAlign: 'center', padding: '8px' }}>
                  <FileIcon size={24} />
                  <div style={{ fontSize: '10px', marginTop: '4px', color: 'var(--color-fg-muted)' }}>
                    {file.name.split('.').pop()?.toUpperCase()}
                  </div>
                </div>
              )}
              <button
                type="button"
                onClick={() => handleRemoveFile(idx)}
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'var(--color-accent-default)',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  lineHeight: '1',
                }}
                aria-label="Remove file"
              >
                x
              </button>
            </div>
          ))}
        </div>
      )}
      
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
      
      <div className={styles.row}>
        <IconButton
          icon={Paperclip}
          variant="ghost"
          size="sm"
          onClick={handleAttachClick}
          disabled={disabled}
          aria-label="Attach file"
        />
        <input
          ref={inputRef}
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
        
        <IconButton
          ref={emojiButtonRef}
          icon={Smile}
          variant="ghost"
          size="sm"
          onClick={handleEmojiButtonClick}
          disabled={disabled}
          aria-label="Add emoji"
        />
        
        {showEmojiPicker && !disabled && ReactDOM.createPortal(
          <div
            ref={emojiPickerRef}
            style={{
              position: 'fixed',
              top: `${pickerPosition.top}px`,
              right: `${pickerPosition.right}px`,
              zIndex: 10000,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
              borderRadius: '8px',
              backgroundColor: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border-default)',
              padding: '12px',
              display: 'grid',
              gridTemplateColumns: 'repeat(8, 1fr)',
              gap: '4px',
              width: '280px',
            }}
          >
            {['😀', '😂', '❤️', '👍', '🎉', '✨', '😍', '🤔', '👏', '🚀', '🔥', '💯', '😢', '😱', '🤗', '😎'].map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleEmojiSelect(emoji)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '4px',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-bg-subtle)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {emoji}
              </button>
            ))}
          </div>,
          document.body
        )}
        
        <IconButton
          icon={Send}
          variant="primary"
          size="sm"
          className={styles.sendButton}
          onClick={onSend}
          disabled={!canSend}
          aria-label="Send message"
        />
      </div>
    </div>
  );
};

export default ChatComposer;
