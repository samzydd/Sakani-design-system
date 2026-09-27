/**
 * Card
 *
 * Container surface. Matches Figma "Card" set:
 *   Variant (Default|Hover|Two buttons|Three buttons), Title/Description/CTA toggles.
 *
 * Figma spec: bg/surface, border/default 1px, radius-xl (16), padding 20, gap 16.
 * Title heading/xs (16/500/22), description body/xs (13/500/18), body text
 * body/sm (14/500/20, fg-muted -- not fg-default).
 *
 * In code, Hover is a CSS :hover state. The button-count variants are `actions`
 * (hugs left, matches Default's single button and Two buttons' pair) plus an
 * optional `leadingAction` -- passing it switches the row to space-between,
 * reproducing Three buttons' lone Ghost button opposite the Secondary+Primary
 * pair, rather than three buttons in a single left-hugging group.
 */

import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
  title?: string;
  description?: string;
  /** Footer action buttons (maps to Figma CTA / Two buttons variants). Hugs left. */
  actions?: React.ReactNode;
  /** A standalone action opposite `actions` (maps to Figma's Three buttons Ghost
   *  button) -- providing it switches the footer to space-between. */
  leadingAction?: React.ReactNode;
  /** Enables the hover elevation (Figma: Hover). */
  interactive?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title, description, actions, leadingAction, interactive, children, className,
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

    {(actions || leadingAction) && (
      leadingAction ? (
        <div className={[styles.card__actions, styles['card__actions--split']].join(' ')}>
          {leadingAction}
          <div className={styles.card__actionsGroup}>{actions}</div>
        </div>
      ) : (
        <div className={styles.card__actions}>{actions}</div>
      )
    )}
  </div>
);

export default Card;
