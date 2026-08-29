/**
 * InlineCtaBlock — Blocks / Application / Inline CTA
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
 * your project and edit it directly.
 *
 * Matches Figma "Inline CTA": Featured Icon + title/description + action
 * Button, in a card. `variant` stays an explicit prop (not derived) --
 * "Default" and "Accent" aren't computable from any other value here, and
 * each one governs three things at once (card fill/border, title color,
 * button style), same reasoning as Modal's `variant`.
 *
 * Figma's raw export swaps the icon's own fill to white on Accent, but that
 * reads as leftover from a dark-background instance elsewhere -- the
 * screenshot for this component actually shows the same dark icon on a
 * white Featured-Icon wrap in both variants, so that's what's built here.
 *
 * Button reuse: Default's action = Button variant="primary"; Accent's =
 * variant="outline" (bg/surface + border/subtle is an exact match for
 * Figma's "Add payment method" button here). Both accept Figma's 14px
 * text but 2px-shorter vertical padding than Button's own "md" preset,
 * the same kind of small documented deviation used throughout this set.
 */

import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@sakaniui/react';
import { iconStrokeWidth } from '@sakaniui/react';
import styles from './InlineCtaBlock.module.css';

export type InlineCtaVariant = 'default' | 'accent';

export interface InlineCtaBlockProps {
  variant?: InlineCtaVariant;
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel: string;
  onAction?: () => void;
  className?: string;
}

export const InlineCtaBlock: React.FC<InlineCtaBlockProps> = ({
  variant = 'default',
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  const isAccent = variant === 'accent';

  return (
    <div className={[styles.cta, isAccent ? styles.ctaAccent : styles.ctaDefault, className ?? ''].filter(Boolean).join(' ')}>
      <span className={styles.iconWrap} aria-hidden="true">
        {icon ?? <Sparkles size={20} strokeWidth={iconStrokeWidth(20)} />}
      </span>
      <div className={styles.text}>
        <p className={[styles.title, isAccent ? styles.titleAccent : ''].filter(Boolean).join(' ')}>{title}</p>
        <p className={styles.description}>{description}</p>
      </div>
      <Button variant={isAccent ? 'outline' : 'primary'} size="md" onClick={onAction} className={styles.action}>
        {actionLabel}
      </Button>
    </div>
  );
};

export default InlineCtaBlock;
