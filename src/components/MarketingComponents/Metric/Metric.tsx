/**
 * Metric
 *
 * Matches Figma "Metric" (Marketing primitives set, 2 styles: Simple,
 * With Trend). Whether the trend chip renders is derived from `trend`
 * presence, not a manual style prop -- same "derive from data" pattern
 * used throughout this library. `trend` is a single signed number
 * (e.g. -0.2 for a decline), not a separate direction + magnitude pair:
 * the icon (lucide TrendingUp/TrendingDown) and color (success/danger
 * solid) both derive from its sign, and the rendered label is always
 * the unsigned magnitude + "%" -- Figma's own trend text has no +/-
 * prefix at all, direction is conveyed by the icon alone. Same
 * up/down -> success/danger-solid mapping Ticker already established
 * for this exact kind of trend indicator in this library (Figma's own
 * green here, #16a34a, isn't a token in this system -- closest existing
 * semantic is success/solid, same normalization Ticker's own doc
 * argues for).
 *
 * `value` is a plain pre-formatted string ("10,000+", "99.9%'), not a
 * number: Figma's own two examples use completely different formats
 * (a "+"-suffixed count vs. a percentage) that don't share a single
 * numeric-formatting function, so the caller owns formatting entirely.
 */

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { iconStrokeWidth } from '../../../lib/iconStrokeWidth';
import styles from './Metric.module.css';

export interface MetricProps {
  value: string;
  label: string;
  /** Signed percentage (e.g. -0.2 for a decline). Presence renders the trend chip. */
  trend?: number;
  className?: string;
}

export const Metric: React.FC<MetricProps> = ({ value, label, trend, className }) => {
  const hasTrend = trend !== undefined;
  const isUp = hasTrend && trend >= 0;
  const TrendIcon = isUp ? TrendingUp : TrendingDown;

  return (
    <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')}>
      <div className={styles.numRow}>
        <p className={styles.value}>{value}</p>
        {hasTrend && (
          <span className={[styles.trend, isUp ? styles.trendUp : styles.trendDown].join(' ')}>
            <TrendIcon size={24} strokeWidth={iconStrokeWidth(24)} />
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className={styles.label}>{label}</p>
    </div>
  );
};

export default Metric;
