/**
 * Breadcrumb
 *
 * Navigation trail. Matches Figma "Breadcrumb" set (1–6 crumbs).
 *
 * Figma spec: horizontal, gap 6, crumbs fg/muted, current crumb fg/default,
 * chevron separators between items. Takes an array of items; the last is
 * treated as the current page (not a link).
 */

import React from 'react';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Separator = () => (
  <span className={styles.separator} aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
      strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  </span>
);

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => (
  <nav aria-label="Breadcrumb" className={[styles.breadcrumb, className ?? ''].filter(Boolean).join(' ')}>
    <ol className={styles.list}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <li key={i} className={styles.item}>
            {isLast || !item.href ? (
              <span
                className={isLast ? styles.current : styles.crumb}
                aria-current={isLast ? 'page' : undefined}
              >
                {item.label}
              </span>
            ) : (
              <a href={item.href} className={styles.crumb}>{item.label}</a>
            )}
            {!isLast && <Separator />}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Breadcrumb;
