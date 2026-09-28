/**
 * Breadcrumb
 *
 * Navigation trail. Matches Figma "Breadcrumb" set (1–6 crumbs) x Type:
 *   Text   — plain inline links, gap 6, chevron 16px. crumbs fg/muted,
 *            current crumb fg/default + medium, underline on link hover.
 *   Button — added 2026-08-27 (node 436:120). Every crumb (including the
 *            current one) renders as a small Ghost-style chip: fg/default
 *            text always (no muted/default split — the differentiation is
 *            the chip shape + hover, not text color), radius-md, shadow-xs,
 *            2px/6px padding, gap 4, chevron 14px. Only linked crumbs get
 *            the bg/subtle hover; the current crumb stays static.
 *
 * Takes an array of items; the last is treated as the current page (not a link).
 */

import React from 'react';
import { iconStrokeWidth } from '../../lib/iconStrokeWidth';
import styles from './Breadcrumb.module.css';
import { useHoverHighlight } from '../../lib/useHoverHighlight';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export type BreadcrumbVariant = 'text' | 'button';

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: BreadcrumbVariant;
  className?: string;
}

const Separator = ({ size }: { size: number }) => (
  <span className={styles.separator} aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={iconStrokeWidth(size)}
      strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  </span>
);

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, variant = 'text', className }) => {
  const isButton = variant === 'button';
  // Only the button variant has a hover fill for the highlight to carry.
  const hover = useHoverHighlight<HTMLOListElement>();
  return (
    <nav aria-label="Breadcrumb" className={[styles.breadcrumb, className ?? ''].filter(Boolean).join(' ')}>
      <ol
        ref={hover.ref}
        {...(isButton ? hover.groupProps : {})}
        className={[styles.list, isButton ? styles['list--button'] : ''].filter(Boolean).join(' ')}
      >
        {/* display: contents keeps this <li> box-less, so the highlight is
            positioned against the <ol> while the list stays valid markup. */}
        {isButton && <li aria-hidden="true" style={{ display: 'contents' }}>{hover.highlight}</li>}
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          const crumbClass = isButton ? styles.chip : (isLast ? styles.current : styles.crumb);
          return (
            <li key={i} className={styles.item}>
              {isLast || !item.href ? (
                <span className={crumbClass} data-hover-item={isButton ? 'off' : undefined} aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              ) : (
                <a href={item.href} data-hover-item="" className={crumbClass}>{item.label}</a>
              )}
              {!isLast && <Separator size={isButton ? 14 : 16} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
