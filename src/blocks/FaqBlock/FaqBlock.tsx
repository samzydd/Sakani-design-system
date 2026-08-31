/**
 * FaqBlock — Blocks / Marketing / FAQ
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file
 * into your project and edit it directly.
 *
 * Matches Figma "FAQ" (node 1513:27978, 2 layouts: Single, Two-Column).
 * Composed entirely from existing components -- SectionHeading (eyebrow
 * "FAQ", no subtitle in either Figma layout) + the shared Accordion/
 * AccordionItem (already a real, interactive open/close implementation,
 * unlike Figma's own static Open/Closed state toggle).
 *
 * `columns` stays a real, explicit prop (1 default, matching "Single"; 2
 * matches "Two-Column") -- both Figma layouts use the exact same 6
 * questions, split 3/3 across columns only when columns=2, so column
 * count genuinely isn't derivable from `items` the way e.g.
 * FeatureGridBlock's own column count is from its feature list length.
 * When `items.length` isn't evenly divisible by 2, the first (odd) half
 * gets the extra item, matching how Figma's own 6-item split works.
 */

import React from 'react';
import { SectionHeading } from '../../components/MarketingComponents/SectionHeading';
import { Accordion, AccordionItem } from '../../components/Accordion';
import styles from './FaqBlock.module.css';

export interface FaqItem {
  question: string;
  answer: string;
  /** Uncontrolled initial open state for this item. */
  defaultOpen?: boolean;
}

export interface FaqBlockProps {
  eyebrow?: string;
  title: string;
  items: FaqItem[];
  /** Figma Layout axis: 1 = Single, 2 = Two-Column. Defaults to 1. */
  columns?: 1 | 2;
  className?: string;
}

const renderItems = (items: FaqItem[]) => (
  <Accordion>
    {items.map((item, i) => (
      <AccordionItem key={item.question ?? i} title={item.question} defaultOpen={item.defaultOpen}>
        {item.answer}
      </AccordionItem>
    ))}
  </Accordion>
);

export const FaqBlock: React.FC<FaqBlockProps> = ({
  eyebrow = 'FAQ', title, items, columns = 1, className,
}) => {
  const rootClassName = [styles.block, className ?? ''].filter(Boolean).join(' ');

  if (columns === 1) {
    return (
      <div className={rootClassName}>
        <SectionHeading eyebrow={eyebrow} title={title} align="center" className={styles.heading} />
        <div className={styles.listSingle}>{renderItems(items)}</div>
      </div>
    );
  }

  const splitAt = Math.ceil(items.length / 2);
  const left = items.slice(0, splitAt);
  const right = items.slice(splitAt);

  return (
    <div className={rootClassName}>
      <SectionHeading eyebrow={eyebrow} title={title} align="center" className={styles.heading} />
      <div className={styles.columns}>
        <div className={styles.column}>{renderItems(left)}</div>
        <div className={styles.column}>{renderItems(right)}</div>
      </div>
    </div>
  );
};

export default FaqBlock;
