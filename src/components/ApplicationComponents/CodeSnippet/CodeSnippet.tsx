/**
 * CodeSnippet
 *
 * Read-only code block. Matches Figma "Code Snippet":
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

const highlightLine = (line: string): React.ReactNode => {
  if (line.trim() === '') return ' ';
  const parts = line.split(TOKEN_RE);
  return parts.map((part, i) => {
    if (!part) return null;
    const isString = /^['"`]/.test(part);
    const isKeyword = !isString && KEYWORDS.includes(part);
    if (isString) return <span key={i} className={styles.tokenString}>{part}</span>;
    if (isKeyword) return <span key={i} className={styles.tokenKeyword}>{part}</span>;
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
};

export const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, filename, onCopy, className }) => {
  const [copied, setCopied] = React.useState(false);
  const lines = code.split('\n');

  const handleCopy = () => {
    navigator.clipboard?.writeText(code);
    onCopy?.(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  const body = (
    <div className={styles.body}>
      {lines.map((line, i) => (
        <p key={i} className={styles.line}>{highlightLine(line)}</p>
      ))}
    </div>
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
