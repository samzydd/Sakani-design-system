/**
 * CardMetaItem
 *
 * Icon + value pair used in the BoardCard footer (due date, comments,
 * attachments, links, subtask progress). Matches the Figma "Card Meta Item"
 * component, whose `icon` (instance-swap) and `label` (text) map to these props.
 */

import React from 'react';
import styles from './CardMetaItem.module.css';

export interface CardMetaItemProps {
  /** Any 13px Lucide icon. */
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const CardMetaItem: React.FC<CardMetaItemProps> = ({ icon, children, className }) => (
  <span className={[styles.meta, className ?? ''].filter(Boolean).join(' ')}>
    <span className={styles.meta__icon} aria-hidden="true">{icon}</span>
    <span className={styles.meta__label}>{children}</span>
  </span>
);

export default CardMetaItem;
