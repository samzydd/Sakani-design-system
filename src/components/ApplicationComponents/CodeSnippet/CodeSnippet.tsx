/**
 * CodeSnippet
 *
 * Code block. Matches Figma "Code Snippet":
 *   Default — plain card, mono text, no chrome
 *   With Header — filename row + copy button above the code
 *
 * The header isn't a separate variant to keep in sync -- it shows whenever
 * a `filename` is passed, same judgment already applied throughout this
 * Application set (AvatarUpload's filled/empty, Balance's change row).
 *
 * Highlighting: Figma's sample only ever colors two token classes --
 * keywords and string literals -- so this is a small regex tokenizer
 * rather than a real dependency (Prism/Shiki aren't in package.json, and
 * pulling one in for two token classes would be a lot of weight for what
 * this component actually needs). Anything else renders in fg/default.
 *
 * Editable (`editable` prop): a real `<textarea>` sits directly on top of
 * the same highlighted text, sized and padded identically -- the textarea's
 * own text is transparent (only its caret and selection paint), so typing,
 * selection, undo, and the cursor are all genuine native textarea behavior;
 * the highlighted layer underneath is what's actually visible. This is the
 * standard technique for a highlighted-but-editable text field short of a
 * real editor (CodeMirror/Monaco) -- contentEditable with re-highlighted
 * innerHTML on every keystroke fights the caret position constantly, which
 * this sidesteps entirely by never touching the real text node the caret
 * lives in.
 */

import React from 'react';
import { Copy, Check } from 'lucide-react';
import { IconButton } from '../../IconButton';
import styles from './CodeSnippet.module.css';

export interface CodeSnippetProps {
  code: string;
  /** Shows the filename header + copy button when set. */
  filename?: string;
  onCopy?: (code: string) => void;
  /** Lets people type directly into the block. Defaults to false (read-only). */
  editable?: boolean;
  /** Fires with the new text on every keystroke. Only relevant when editable. */
  onChange?: (code: string) => void;
  /** Shown (via the real textarea's native placeholder) when editable and empty. */
  placeholder?: string;
  className?: string;
}

const KEYWORDS = [
  'import', 'export', 'from', 'default', 'function', 'return', 'const', 'let', 'var',
  'if', 'else', 'for', 'while', 'class', 'extends', 'new', 'async', 'await', 'as', 'of', 'in',
];
const TOKEN_RE = new RegExp(
  `('(?:[^'\\\\]|\\\\.)*'|"(?:[^"\\\\]|\\\\.)*"|\`(?:[^\`\\\\]|\\\\.)*\`|\\b(?:${KEYWORDS.join('|')})\\b)`,
  'g',
);

/** Tokenizes the whole string at once -- newline characters just pass
 * through untouched as part of the plain-text segments between matches,
 * and render as real line breaks under the container's white-space:pre-wrap. */
const highlightCode = (text: string): React.ReactNode =>
  text.split(TOKEN_RE).map((part, i) => {
    if (!part) return null;
    const isString = /^['"`]/.test(part);
    const isKeyword = !isString && KEYWORDS.includes(part);
    if (isString) return <span key={i} className={styles.tokenString}>{part}</span>;
    if (isKeyword) return <span key={i} className={styles.tokenKeyword}>{part}</span>;
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });

export const CodeSnippet: React.FC<CodeSnippetProps> = ({
  code, filename, onCopy, editable = false, onChange, placeholder, className,
}) => {
  const [copied, setCopied] = React.useState(false);
  const [text, setText] = React.useState(code);

  // Resyncs if the caller hands in a new `code` (a fresh snippet loaded in,
  // or a real controlled loop via onChange) -- otherwise this is the
  // uncontrolled initial value, same as a native textarea's defaultValue.
  React.useEffect(() => setText(code), [code]);

  const handleCopy = () => {
    navigator.clipboard?.writeText(text);
    onCopy?.(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  const updateText = (next: string) => {
    setText(next);
    onChange?.(next);
  };

  // Tab inserts a soft tab instead of moving focus away -- without this an
  // "editable code field" would break on the single most common code-editing
  // keystroke.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Tab') return;
    e.preventDefault();
    const el = e.currentTarget;
    const { selectionStart, selectionEnd } = el;
    const next = `${text.slice(0, selectionStart)}  ${text.slice(selectionEnd)}`;
    updateText(next);
    requestAnimationFrame(() => {
      el.selectionStart = el.selectionEnd = selectionStart + 2;
    });
  };

  const body = editable ? (
    <div className={styles.editableBody}>
      <pre className={styles.body} aria-hidden="true">{highlightCode(text)}</pre>
      <textarea
        className={styles.textarea}
        value={text}
        placeholder={placeholder}
        spellCheck={false}
        onChange={(e) => updateText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  ) : (
    <pre className={styles.body}>{highlightCode(text)}</pre>
  );

  if (!filename) {
    return (
      <div className={[styles.snippet, className ?? ''].filter(Boolean).join(' ')}>
        {body}
      </div>
    );
  }

  return (
    <div className={[styles.snippet, className ?? ''].filter(Boolean).join(' ')}>
      <div className={styles.header}>
        <p className={styles.filename}>{filename}</p>
        <IconButton
          icon={copied ? Check : Copy}
          variant="ghost"
          size="sm"
          aria-label={copied ? 'Copied' : 'Copy code'}
          onClick={handleCopy}
        />
      </div>
      {body}
    </div>
  );
};

export default CodeSnippet;
