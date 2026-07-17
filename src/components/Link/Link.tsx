/**
 * Link
 *
 * Inline anchor with hover/visited states and optional external icon.
 * Use for navigation and inline references — not for page-level CTAs (use Button).
 */

import React from 'react';
import styles from './Link.module.css';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Appends an external-link icon and sets target="_blank" rel="noopener noreferrer" */
  external?: boolean;
  children: React.ReactNode;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ external, children, className, href, ...rest }, ref) => (
    <a
      ref={ref}
      href={href}
      className={[styles.link, className ?? ''].filter(Boolean).join(' ')}
      /* Auto-set safe external attrs when external=true */
      target={external ? '_blank' : rest.target}
      rel={external ? 'noopener noreferrer' : rest.rel}
      {...rest}
    >
      {children}
      {/* External icon — aria-label explains the behaviour to screen readers */}
      {external && (
        <span className={styles.link__external} aria-label="(opens in new tab)">
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </span>
      )}
    </a>
  )
);

Link.displayName = 'Link';
export default Link;
