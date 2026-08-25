/**
 * StockMarket
 *
 * Matches Figma "Stock Market" -- its 3 style previews collapse to 2 real
 * axes, both derived rather than manual props (same judgment applied
 * throughout this Application set):
 *   Positive vs. Negative -- entirely computable from `change.amount`,
 *     which also drives the trend icon/color.
 *   Compact row vs. Full card -- the Full card is a genuinely different
 *     structure (header + larger ticker + a bar chart), not derivable from
 *     the row's own data, so its presence is driven by whether `chart`
 *     data was passed, same idea as NotificationItem's card-vs-row split.
 *
 * `logo` is a required, fully consumer-supplied slot -- the component itself
 * ships no brand marks. The stories use the real Apple/Tesla glyphs (pulled
 * directly from the Figma file) purely as fixtures to demonstrate the slot.
 *
 * The chart reuses the real BarChart component (its default variant's blue
 * fill already matches Figma's chart/2 bars exactly) rather than a bespoke
 * one -- accepting that BarChart's default variant has no horizontal grid
 * lines, where this Figma reference shows faint ones, since forcing
 * variant="multiple" just to get gridlines on a single series would be a
 * worse mismatch than the missing lines themselves.
 */

import React from 'react';
import { TrendingUp, TrendingDown, ChartColumn, ChevronDown } from 'lucide-react';
import { Button } from '../../Button';
import { BarChart, type BarChartDatum } from '../../BarChart';
import { iconStrokeWidth } from '../../../lib/iconStrokeWidth';
import styles from './StockMarket.module.css';

export interface StockMarketChange {
  amount: number;
  percent: number;
}

export interface StockMarketProps {
  logo: React.ReactNode;
  symbol: string;
  name: string;
  price: number;
  change: StockMarketChange;
  /** Defaults to USD currency, 2 decimals. */
  formatAmount?: (amount: number) => string;
  /** Presence switches to the expanded Full card with a bar chart. */
  chart?: BarChartDatum[];
  periodLabel?: string;
  onPeriodClick?: () => void;
  className?: string;
}

const defaultFormatAmount = (amount: number) =>
  Math.abs(amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export const StockMarket: React.FC<StockMarketProps> = ({
  logo, symbol, name, price, change, formatAmount = defaultFormatAmount,
  chart, periodLabel = 'Last 6 months', onPeriodClick, className,
}) => {
  const isPositive = change.amount >= 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  const sign = isPositive ? '+' : '-';
  const changeText = `${sign}${formatAmount(change.amount)} (${sign}${Math.abs(change.percent)}%)`;
  const trendClass = isPositive ? styles.trendUp : styles.trendDown;

  if (chart) {
    return (
      <div className={[styles.card, className ?? ''].filter(Boolean).join(' ')}>
        <div className={styles.header}>
          <ChartColumn size={16} strokeWidth={iconStrokeWidth(16)} className={styles.headerIcon} />
          <span className={styles.headerLabel}>Stock market</span>
        </div>
        <div className={styles.tickerRow}>
          <span className={styles.logoLg} aria-hidden="true">{logo}</span>
          <div className={styles.text}>
            <p className={styles.symbol}>{symbol}</p>
            <p className={styles.name}>{name}</p>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.priceRow}>
            <div className={styles.priceGroup}>
              <p className={styles.priceLg}>{formatAmount(price)}</p>
              <div className={styles.changeRowLg}>
                <TrendIcon size={24} strokeWidth={iconStrokeWidth(24)} className={trendClass} />
                <span className={[styles.changeTextLg, trendClass].join(' ')}>{changeText}</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              rightIcon={<ChevronDown size={16} strokeWidth={iconStrokeWidth(16)} />}
              onClick={onPeriodClick}
            >
              {periodLabel}
            </Button>
          </div>
          <BarChart data={chart} className={styles.chart} />
        </div>
      </div>
    );
  }

  return (
    <div className={[styles.row, className ?? ''].filter(Boolean).join(' ')}>
      <div className={styles.left}>
        <span className={styles.logo} aria-hidden="true">{logo}</span>
        <div className={styles.text}>
          <p className={styles.symbol}>{symbol}</p>
          <p className={styles.name}>{name}</p>
        </div>
      </div>
      <div className={styles.right}>
        <p className={styles.price}>{formatAmount(price)}</p>
        <div className={styles.changeRow}>
          <TrendIcon size={20} strokeWidth={iconStrokeWidth(20)} className={trendClass} />
          <span className={[styles.changeText, trendClass].join(' ')}>{changeText}</span>
        </div>
      </div>
    </div>
  );
};

export default StockMarket;
