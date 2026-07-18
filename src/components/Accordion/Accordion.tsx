/**
 * Accordion / AccordionItem
 *
 * Collapsible content sections. Matches Figma "Accordion Item" set (Closed|Open)
 * plus the "Accordion" wrapper component.
 *
 * Figma spec: item padding 14/16, gap 8, border/subtle bottom divider, title label/md.
 * Interaction is real here (Figma can only show static Open/Closed): clicking the
 * header toggles the panel. Supports single or multiple open items.
 */

import React from 'react';
import styles from './Accordion.module.css';

export interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  /** Controlled open state (optional). */
  open?: boolean;
  /** Uncontrolled initial open state. */
  defaultOpen?: boolean;
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title, children, open, defaultOpen = false, className,
}) => {
  const isControlled = open !== undefined;
  const [internal, setInternal] = React.useState(defaultOpen);
  const isOpen = isControlled ? open : internal;

  return (
    <div className={[styles.item, className ?? ''].filter(Boolean).join(' ')}>
      <button
        type="button"
        className={styles.item__header}
        aria-expanded={isOpen}
        onClick={() => !isControlled && setInternal((v) => !v)}
      >
        <span className={styles.item__title}>{title}</span>
        {/* Chevron rotates when open */}
        <span className={[styles.item__chevron, isOpen ? styles['item__chevron--open'] : ''].join(' ')} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
            strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </button>

      {/* Panel — height animated via grid-template-rows trick */}
      <div className={[styles.item__panelWrap, isOpen ? styles['item__panelWrap--open'] : ''].join(' ')}>
        <div className={styles.item__panel}>
          <div className={styles.item__panelInner}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

/** Accordion wrapper — groups items with a shared top/bottom border. */
export const Accordion: React.FC<AccordionProps> = ({ children, className }) => (
  <div className={[styles.accordion, className ?? ''].filter(Boolean).join(' ')}>
    {children}
  </div>
);

export default Accordion;
