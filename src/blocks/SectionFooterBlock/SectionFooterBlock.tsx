/**
 * SectionFooterBlock — Blocks / Application / Section Footer
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
 * your project and edit it directly.
 *
 * Matches Figma "Section Footer": a Divider over either a
 * copyright-line + link-row ("Default") or a single centered copyright
 * line ("Centered") -- reuses the shared Divider and Link components
 * directly, no new primitives.
 *
 * `variant` stays an explicit prop (not derived) -- "Default"'s link row
 * vs. "Centered"'s single line is a real structural difference, not
 * something computable from `links` alone (a Default footer with an empty
 * link list would still want the two-column layout, not silently become
 * Centered).
 */

import React from 'react';
import { Divider } from '../../components/Divider';
import { Link } from '../../components/Link';
import styles from './SectionFooterBlock.module.css';

export interface SectionFooterLink {
  label: string;
  href: string;
}

export type SectionFooterVariant = 'default' | 'centered';

export interface SectionFooterBlockProps {
  text?: string;
  links?: SectionFooterLink[];
  variant?: SectionFooterVariant;
  className?: string;
}

const DEFAULT_LINKS: SectionFooterLink[] = [
  { label: 'Docs', href: '#' },
  { label: 'Status', href: '#' },
  { label: 'Support', href: '#' },
];

export const SectionFooterBlock: React.FC<SectionFooterBlockProps> = ({
  text = 'Sakani v1.6 · © 2026 Sakani',
  links = DEFAULT_LINKS,
  variant = 'default',
  className,
}) => {
  const isCentered = variant === 'centered';

  return (
    <div className={[styles.footer, isCentered ? styles.footerCentered : '', className ?? ''].filter(Boolean).join(' ')}>
      <Divider className={styles.divider} />
      {isCentered ? (
        <p className={styles.text}>{text}</p>
      ) : (
        <div className={styles.row}>
          <p className={styles.text}>{text}</p>
          <div className={styles.links}>
            {links.map((link) => (
              <Link key={link.label} href={link.href} className={styles.link}>{link.label}</Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionFooterBlock;
