/**
 * Ticker
 *
 * Matches Figma "Ticker" -- a row of symbol/change pairs with fade-out edges.
 * Figma's own mock is a static frame, but a "ticker" by definition scrolls,
 * so this renders it as a genuine infinite marquee: the item list is
 * duplicated back-to-back and translated by exactly one copy's width in a
 * seamless loop, measured live via ResizeObserver so the animation duration
 * scales with content instead of a fixed guess. Paused on hover, and
 * disabled entirely under `prefers-reduced-motion`.
 *
 * Trend icon/color is derived from `changePercent`'s sign (`isPositive`),
 * same pattern as StockMarket -- Figma's own row is inconsistent here (one
 * item's "down" icon is drawn with stray fill colors instead of the other
 * two's clean stroke), which reads as an authoring slip rather than an
 * intentional third state, so it's normalized to the same
 * success/danger-solid mapping as every other trend indicator in this set.
 */

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { iconStrokeWidth } from '../../../lib/iconStrokeWidth';
import styles from './Ticker.module.css';

export interface TickerItem {
  symbol: string;
  changePercent: number;
}

export interface TickerProps {
  items: TickerItem[];
  /** Scroll speed in pixels/second. Defaults to 40. */
  speed?: number;
  formatChange?: (changePercent: number) => string;
  className?: string;
}

const defaultFormatChange = (changePercent: number) =>
  `${changePercent >= 0 ? '+' : ''}${changePercent}%`;

const TickerRow: React.FC<{ items: TickerItem[]; formatChange: (n: number) => string; ariaHidden?: boolean }> = ({
  items, formatChange, ariaHidden,
}) => (
  <div className={styles.row} aria-hidden={ariaHidden}>
    {items.map((item, i) => {
      const isPositive = item.changePercent >= 0;
      const TrendIcon = isPositive ? TrendingUp : TrendingDown;
      const trendClass = isPositive ? styles.trendUp : styles.trendDown;
      return (
        <div className={styles.item} key={`${item.symbol}-${i}`}>
          <span className={styles.symbol}>{item.symbol}</span>
          <TrendIcon size={14} strokeWidth={iconStrokeWidth(14)} className={trendClass} />
          <span className={[styles.change, trendClass].join(' ')}>{formatChange(item.changePercent)}</span>
        </div>
      );
    })}
  </div>
);

export const Ticker: React.FC<TickerProps> = ({ items, speed = 40, formatChange = defaultFormatChange, className }) => {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [duration, setDuration] = React.useState(20);

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const firstRow = track.firstElementChild as HTMLElement | null;
    if (!firstRow) return;

    const measure = () => {
      const width = firstRow.scrollWidth;
      if (width > 0) setDuration(width / speed);
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(firstRow);
    return () => observer.disconnect();
  }, [items, speed]);

  return (
    <div className={[styles.ticker, className ?? ''].filter(Boolean).join(' ')}>
      <div
        ref={trackRef}
        className={styles.track}
        style={{ '--ticker-duration': `${duration}s` } as React.CSSProperties}
      >
        <TickerRow items={items} formatChange={formatChange} />
        <TickerRow items={items} formatChange={formatChange} ariaHidden />
      </div>
      <div className={styles.fadeLeft} aria-hidden="true" />
      <div className={styles.fadeRight} aria-hidden="true" />
    </div>
  );
};

export default Ticker;
