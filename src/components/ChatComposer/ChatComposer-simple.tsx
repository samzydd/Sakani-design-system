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
  uploadName?: string;
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
  uploadName,
  uploadProgress = 0,
  onCancelUpload,
  className,
}) => {
  const disabled = state === 'disabled';
  const [internal, setInternal] = React.useState('');
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const text = value !== undefined ? value : internal;
  const canSend = !disabled && text.trim().length > 0;

  const emojis = ['😀', '😂', '❤️', '👍', '🎉', '✨', '😍', '🤔', '👏', '🚀', '🔥', '💯', '😢', '😱', '🤗', '😎'];

  const handleEmojiSelect = (emoji: string) => {
    if (inputRef.current) {
      const start = inputRef.current.selectionStart || text.length;
      const newText = text.slice(0, start) + emoji + text.slice(start);
      setInternal(newText);
      onChange?.(newText);
      inputRef.current.focus();
      inputRef.current.setSelectionRange(start + emoji.length, start + emoji.length);
    }
    setShowEmojiPicker(false);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        console.log('Selected file:', file.name);
      }
    });
    event.target.value = '';
  };

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
      
      <input ref={fileInputRef} type="file" multiple accept="image/*,video/*" onChange={handleFileSelect} style={{ display: 'none' }} />

      <div className={styles.row}>
        <button type="button" className={styles.icon} onClick={() => fileInputRef.current?.click()} disabled={disabled} aria-label="Attach file">
          <Paperclip size={18} />
        </button>
        
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

        <button
          type="button"
          className={styles.icon}
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          disabled={disabled}
          aria-label="Add emoji"
        >
          <Smile size={18} />
        </button>

        {showEmojiPicker && !disabled && (
          <div style={{
            position: 'fixed',
            top: 'auto',
            bottom: '80px',
            right: '20px',
            backgroundColor: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border-default)',
            borderRadius: '8px',
            padding: '12px',
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gap: '4px',
            width: '280px',
            zIndex: 10000,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          }}>
            {emojis.map((emoji) => (
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
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

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
