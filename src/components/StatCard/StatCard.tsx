/**
 * StatCard
 *
 * Dashboard metric card. Matches Figma "Stat Card":
 *   Style (Minimal | Icon | Featured) x Trend (Up | Down | Flat),
 *   with Icon / Menu / Trend / Sparkline toggles.
 *
 * Figma spec: bg/surface, border/subtle 1px, radius-xl (16), padding 12, gap 8.
 *   title label/sm fg/muted · value display/lg fg/default · delta trend-colored.
 */

import React from 'react';
import { TrendingUp, TrendingDown, Minus, MoreHorizontal, type LucideIcon } from 'lucide-react';
import styles from './StatCard.module.css';

export type StatCardStyle = 'minimal' | 'icon' | 'featured';
export type StatCardTrend = 'up' | 'down' | 'flat';

export interface StatCardProps {
  title: string;
  value: string;
  /** Supporting line under the delta (Figma: description). */
  description?: string;
  /** Data points for the inline sparkline (Figma: Sparkline toggle). */
  sparkline?: number[];
  /** e.g. "+12.5%" — colored by trend. */
  delta?: string;
  trend?: StatCardTrend;
  variant?: StatCardStyle;
  /** Leading icon (shown for Icon/Featured styles). */
  icon?: LucideIcon;
  /** Show a trailing menu button. */
  showMenu?: boolean;
  onMenu?: () => void;
  className?: string;
}

const trendIcon = { up: TrendingUp, down: TrendingDown, flat: Minus };

/** Tiny inline sparkline — normalized to a 100x32 viewBox, stroke follows the trend color. */
const Sparkline: React.FC<{ data: number[] }> = ({ data }) => {
  if (data.length < 2) return null;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${30 - ((v - min) / range) * 26}`)
    .join(' ');
  return (
    <svg className={sparkStyles} viewBox="0 0 100 32" preserveAspectRatio="none" aria-hidden="true">
      <polyline points={pts} fill="none" strokeWidth={2} vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
};
const sparkStyles = styles.card__sparkline;

export const StatCard: React.FC<StatCardProps> = ({
  title, value, description, sparkline, delta, trend = 'up', variant = 'minimal', icon: Icon, showMenu, onMenu, className,
}) => {
  const TrendIcon = trendIcon[trend];
  const showIcon = (variant === 'icon' || variant === 'featured') && Icon;

  return (
    <div className={[styles.card, styles[`card--${variant}`], styles[`card--trend-${trend}`], className ?? ''].filter(Boolean).join(' ')}>
      <div className={styles.card__head}>
        {showIcon && (
          <span className={styles.card__icon} aria-hidden="true"><Icon size={18} strokeWidth={1.5} /></span>
        )}
        <span className={styles.card__title}>{title}</span>
        {showMenu && (
          <button type="button" className={styles.card__menu} onClick={onMenu} aria-label="More options">
            <MoreHorizontal size={16} strokeWidth={1.5} />
          </button>
        )}
      </div>

      <div className={styles.card__value}>{value}</div>

      {sparkline && <Sparkline data={sparkline} />}

      {delta && (
        <div className={[styles.card__delta, styles[`card__delta--${trend}`]].join(' ')}>
          <TrendIcon size={14} strokeWidth={2} aria-hidden="true" />
          <span>{delta}</span>
        </div>
      )}

      {description && <p className={styles.card__description}>{description}</p>}
    </div>
  );
};

export default StatCard;
