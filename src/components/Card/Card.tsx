/**
 * Card
 *
 * Container surface. Matches Figma "Card" set:
 *   Variant (Default|Hover|Two buttons|Three buttons), Title/Description/CTA toggles.
 *
 * Figma spec: bg/surface, border/default 1px, radius-xl (16), padding 20, gap 16.
 * In code, Hover is a CSS :hover state; the button-count variants are expressed
 * by passing `actions` (an array of nodes) rather than separate components.
 */

import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
  title?: string;
  description?: string;
  /** Footer action buttons (maps to Figma CTA / Two/Three buttons variants). */
  actions?: React.ReactNode;
  /** Enables the hover elevation (Figma: Hover). */
  interactive?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title, description, actions, interactive, children, className,
}) => (
  <div
    className={[
      styles.card,
      interactive ? styles['card--interactive'] : '',
      className ?? '',
    ].filter(Boolean).join(' ')}
  >
    {(title || description) && (
      <div className={styles.card__header}>
        {title && <h3 className={styles.card__title}>{title}</h3>}
        {description && <p className={styles.card__description}>{description}</p>}
      </div>
    )}

    {children && <div className={styles.card__body}>{children}</div>}

    {actions && <div className={styles.card__actions}>{actions}</div>}
  </div>
);

export default Card;
