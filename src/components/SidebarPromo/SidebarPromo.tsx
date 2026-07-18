/**
 * SidebarPromo
 *
 * Upsell / announcement card. Matches Figma "Sidebar Promo": Type (Upgrade | Announcement).
 *
 * Figma spec (read from the component):
 *   - card: brand/subtle bg + brand/subtle border, radius-md (8), padding 14, gap 8
 *   - head row: leading icon (brand/fg), title label/sm-strong (brand/fg), dismiss x (fg/subtle)
 *   - description: body/2xs (fg/muted)
 *   - CTA: FULL-WIDTH button, accent/default fill, fg/on-accent label, radius-sm
 */

import React from 'react';
import { Sparkles, X, type LucideIcon } from 'lucide-react';
import styles from './SidebarPromo.module.css';

export interface SidebarPromoProps {
  type?: 'upgrade' | 'announcement';
  title: string;
  description?: string;
  /** Full-width CTA button label. */
  ctaLabel?: string;
  onCta?: () => void;
  onDismiss?: () => void;
  icon?: LucideIcon;
}

export const SidebarPromo: React.FC<SidebarPromoProps> = ({
  type = 'upgrade', title, description, ctaLabel, onCta, onDismiss, icon: Icon = Sparkles,
}) => (
  <div className={[styles.promo, styles[`promo--${type}`]].join(' ')}>
    <div className={styles.promo__head}>
      <span className={styles.promo__icon} aria-hidden="true"><Icon size={16} strokeWidth={1.5} /></span>
      <span className={styles.promo__title}>{title}</span>
      {onDismiss && (
        <button type="button" className={styles.promo__dismiss} onClick={onDismiss} aria-label="Dismiss">
          <X size={14} strokeWidth={1.5} />
        </button>
      )}
    </div>

    {description && <p className={styles.promo__desc}>{description}</p>}

    {ctaLabel && (
      <button type="button" className={styles.promo__cta} onClick={onCta}>{ctaLabel}</button>
    )}
  </div>
);

export default SidebarPromo;
