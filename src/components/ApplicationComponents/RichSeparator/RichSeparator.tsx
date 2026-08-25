/**
 * RichSeparator
 *
 * Two divider lines flanking arbitrary centered content. Matches Figma
 * "Rich Separator" -- its 3 style previews (Text: an uppercase overline
 * label; Badge text: a brand icon + name; Icon: a bordered icon-wrap
 * circle) are really just 3 examples of "whatever sits in the middle",
 * not a fixed enum, so this takes `children` rather than a variant prop.
 * `label` is a convenience shorthand for the common Text case, styled as
 * that same overline automatically.
 *
 * The two lines reuse the existing Divider component (its plain default
 * horizontal line is a direct, unmodified match for Figma's line halves
 * here) rather than a bespoke one.
 */

import React from 'react';
import { Divider } from '../../Divider';
import styles from './RichSeparator.module.css';

export interface RichSeparatorProps {
  /** Full custom content between the two lines (e.g. a brand badge or icon-wrap). */
  children?: React.ReactNode;
  /** Shorthand for the common case -- plain uppercase overline text. Ignored if `children` is set. */
  label?: string;
  className?: string;
}

export const RichSeparator: React.FC<RichSeparatorProps> = ({ children, label, className }) => (
  <div className={[styles.separator, className ?? ''].filter(Boolean).join(' ')} role="separator">
    <Divider className={styles.line} />
    {children ?? (label && <span className={styles.overline}>{label}</span>)}
    <Divider className={styles.line} />
  </div>
);

export default RichSeparator;
