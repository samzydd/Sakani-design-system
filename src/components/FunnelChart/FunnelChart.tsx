/**
 * FunnelChart
 *
 * Matches Figma's new "Other charts" set ("Funnel chart" / "Funnel chart
 * hover") exactly: stages run left to right (not top to bottom), narrowing
 * via smooth curved transitions rather than straight diagonal edges.
 * Recharts' native `<Funnel>` only renders a vertical, straight-edged
 * funnel, so this is a hand-rolled SVG -- the same "no native fit" call as
 * HeatmapChart, flagged the same way.
 *
 * Each stage is shaded chart/1 at increasing saturation (first stage
 * palest, last stage full color). Hover: the hovered stage goes full
 * opacity, every other stage dims to 45%, matching Figma's hover state.
 */

import React from 'react';
import { useThemeTick } from '../../lib/useThemeTick';
import styles from './FunnelChart.module.css';

export type ChartSize = 'sm' | 'md' | 'lg' | 'xl';

export interface FunnelDatum { label: string; value: number; }

export interface FunnelChartProps {
  data: FunnelDatum[];
  size?: ChartSize;
  className?: string;
}

const heights: Record<ChartSize, number> = { sm: 180, md: 240, lg: 320, xl: 420 };
const VIEW_W = 560;

const cssVar = (name: string) =>
  typeof window !== 'undefined'
    ? getComputedStyle(document.documentElement).getPropertyValue(name).trim() || undefined
    : undefined;

// Figma: first (largest) stage is palest, last (smallest) stage is full
// chart/1 saturation -- a "narrowing = concentrating" visual metaphor.
const STAGE_MIN_OPACITY = 0.3;
// How far the final stage tapers past its own left edge, for the pointed
// tip Figma's last segment has (rather than ending on a flat edge).
const TIP_TAPER = 0.55;

export const FunnelChart: React.FC<FunnelChartProps> = ({ data, size = 'md', className }) => {
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  useThemeTick();
  const chart1 = cssVar('--color-chart-1') ?? '#ff4700';
  const canvasBg = cssVar('--color-bg-canvas') ?? '#fafaf9';
  const total = data[0]?.value || 1;
  const h = heights[size];
  const plotH = h * 0.66;
  const centerY = plotH / 2 + 8;
  const segW = VIEW_W / data.length;
  const maxVal = data[0]?.value || 1;

  const heightFor = (v: number) => (v / maxVal) * plotH;
  // One boundary height per stage edge (N+1 for N stages): boundaries[i] is
  // shared between stage i-1's right edge and stage i's left edge, so the
  // funnel narrows continuously with no flat plateaus.
  const boundaries = data.map((d) => heightFor(d.value));
  boundaries.push(heightFor(data[data.length - 1]?.value ?? 0) * TIP_TAPER);

  const stageOpacity = (i: number) =>
    data.length <= 1 ? 1 : STAGE_MIN_OPACITY + (i / (data.length - 1)) * (1 - STAGE_MIN_OPACITY);

  const hovered = hoverIndex !== null ? data[hoverIndex] : null;
  const hoveredTopY = hoverIndex !== null ? centerY - boundaries[hoverIndex] / 2 : 0;
  const hoveredMidX = hoverIndex !== null ? hoverIndex * segW + segW / 2 : 0;

  return (
    <div className={[styles.chart, className ?? ''].filter(Boolean).join(' ')} style={{ height: h }}>
      <svg viewBox={`0 0 ${VIEW_W} ${h}`} width="100%" height={h} className={styles.svg}>
        {data.map((d, i) => {
          const xLeft = i * segW;
          const xRight = (i + 1) * segW;
          const midX = (xLeft + xRight) / 2;
          const hLeft = boundaries[i] / 2;
          const hRight = boundaries[i + 1] / 2;
          const topLeftY = centerY - hLeft;
          const topRightY = centerY - hRight;
          const bottomLeftY = centerY + hLeft;
          const bottomRightY = centerY + hRight;
          const path = [
            `M ${xLeft} ${topLeftY}`,
            `C ${midX} ${topLeftY} ${midX} ${topRightY} ${xRight} ${topRightY}`,
            `L ${xRight} ${bottomRightY}`,
            `C ${midX} ${bottomRightY} ${midX} ${bottomLeftY} ${xLeft} ${bottomLeftY}`,
            'Z',
          ].join(' ');
          const opacity = hoverIndex !== null ? (i === hoverIndex ? 1 : 0.45) : stageOpacity(i);
          const pct = Math.round((d.value / total) * 100);
          return (
            <g
              key={i}
              className={styles.segment}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <path d={path} fill={chart1} fillOpacity={opacity} />
              <text x={midX} y={centerY} textAnchor="middle" dominantBaseline="middle" className={styles.pctLabel}>
                {pct}%
              </text>
            </g>
          );
        })}
      </svg>

      <div className={styles.labels} style={{ gridTemplateColumns: `repeat(${data.length}, 1fr)` }}>
        {data.map((d, i) => (
          <span key={i} className={styles.labelItem}>{d.label}</span>
        ))}
      </div>

      {hovered && (
        <div
          className={styles.tooltip}
          style={{
            left: `${(hoveredMidX / VIEW_W) * 100}%`,
            top: `${(hoveredTopY / h) * 100}%`,
            background: canvasBg,
          }}
        >
          <span className={styles.tooltip__title}>{hovered.label}</span>
          <div className={styles.tooltip__row}>
            <span className={styles.tooltip__dot} style={{ background: chart1 }} />
            <span className={styles.tooltip__label}>Share</span>
            <span className={styles.tooltip__value}>{Math.round((hovered.value / total) * 100)}%</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FunnelChart;
