/**
 * RadialChart
 *
 * Recharts wrapper styled with Sakani chart tokens. Matches Figma's "Radial
 * chart" component set (8 variants):
 *
 *   multi          — one concentric ring per data row, full circle
 *   grid           — "multi" + a faint polar grid (spokes + rings) behind it
 *   text           — one thick ring + center value/caption
 *   shape          — one thin ring + center value/caption
 *   gauge-tick     — a dial built from individual radial tick marks
 *   stacked        — half-circle, 2 nested arcs, value/caption below
 *   stacked-3-layers — half-circle, 3 nested arcs, value/caption below
 *   stacked-label  — "multi" + a center value/caption overlay
 *
 * `gauge-tick` has no Recharts equivalent (it's ~40 independently-colored
 * tick marks, not a bar/arc shape), so it's a hand-rolled SVG -- same call
 * as HeatmapChart/FunnelChart. Every other variant is RadialBarChart with
 * different angle/radius/track configuration, so those stay thin wrappers.
 */

import React from 'react';
import { RadialBarChart, RadialBar, Cell, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import { useThemeTick } from '../../lib/useThemeTick';
import styles from './RadialChart.module.css';

export type ChartSize = 'sm' | 'md' | 'lg' | 'xl';
export type RadialChartVariant =
  | 'multi' | 'grid' | 'text' | 'shape' | 'gauge-tick' | 'stacked' | 'stacked-3-layers' | 'stacked-label';

export interface RadialDatum { label: string; value: number; max?: number; }

export interface RadialChartProps {
  data: RadialDatum[];
  variant?: RadialChartVariant;
  size?: ChartSize;
  centerValue?: string;
  centerCaption?: string;
  className?: string;
}

const dims: Record<ChartSize, number> = { sm: 180, md: 220, lg: 280, xl: 340 };
const cssVar = (name: string) =>
  typeof window !== 'undefined'
    ? getComputedStyle(document.documentElement).getPropertyValue(name).trim() || undefined
    : undefined;

const HALF_CIRCLE = new Set<RadialChartVariant>(['stacked', 'stacked-3-layers']);
const RAD = Math.PI / 180;

// Per-variant [innerRadius%, outerRadius%] of the chart's own max radius.
// "multi"/"grid"/"stacked-label" divide this band evenly across N rings
// automatically; "text"/"shape"/half-circle variants have a fixed single
// (or fixed-count) band instead, since reusing "multi"'s 30%-100% band for
// a single ring made it comically thick.
const RADIUS_BAND: Record<RadialChartVariant, [string, string]> = {
  multi: ['30%', '100%'],
  grid: ['30%', '100%'],
  'stacked-label': ['30%', '100%'],
  text: ['76%', '100%'],
  shape: ['86%', '100%'],
  stacked: ['45%', '88%'],
  'stacked-3-layers': ['45%', '88%'],
  'gauge-tick': ['0%', '0%'],
};

const GaugeTick: React.FC<{ value: number; max: number; color: string; track: string; centerValue?: string; centerCaption?: string }> = ({
  value, max, color, track, centerValue, centerCaption,
}) => {
  const TICKS = 40;
  const cx = 100;
  const cy = 100;
  const startDeg = 180; // gauge sweeps the top half, left to right
  const sweepDeg = 180;
  const filled = Math.round((Math.min(value, max) / max) * TICKS);
  return (
    <svg viewBox="0 0 200 120" className={styles.gaugeSvg}>
      {Array.from({ length: TICKS }).map((_, i) => {
        const deg = startDeg + (i / (TICKS - 1)) * sweepDeg;
        const outerR = 92;
        const innerR = 78;
        const x1 = cx + innerR * Math.cos(deg * RAD);
        const y1 = cy + innerR * Math.sin(deg * RAD);
        const x2 = cx + outerR * Math.cos(deg * RAD);
        const y2 = cy + outerR * Math.sin(deg * RAD);
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={i < filled ? color : track}
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        );
      })}
      {(centerValue || centerCaption) && (
        <g textAnchor="middle" fontFamily="var(--font-sans)">
          {centerValue && <text x={cx} y={cy - 8} fontSize={22} fontWeight={500} fill={cssVar('--color-fg-default') ?? '#141414'}>{centerValue}</text>}
          {centerCaption && <text x={cx} y={cy + 12} fontSize={12} fill={cssVar('--color-fg-muted') ?? '#78716a'}>{centerCaption}</text>}
        </g>
      )}
    </svg>
  );
};

const PolarGrid: React.FC<{ rings: number; spokes: number; color: string }> = ({ rings, spokes, color }) => (
  <svg viewBox="0 0 200 200" className={styles.gridSvg}>
    {Array.from({ length: rings }).map((_, i) => (
      <circle key={i} cx={100} cy={100} r={((i + 1) / rings) * 96} fill="none" stroke={color} strokeWidth={1} />
    ))}
    {Array.from({ length: spokes }).map((_, i) => {
      const deg = (i / spokes) * 360;
      const x = 100 + 96 * Math.cos(deg * RAD);
      const y = 100 + 96 * Math.sin(deg * RAD);
      return <line key={i} x1={100} y1={100} x2={x} y2={y} stroke={color} strokeWidth={1} />;
    })}
  </svg>
);

export const RadialChart: React.FC<RadialChartProps> = ({
  data, variant = 'multi', size = 'md', centerValue, centerCaption, className,
}) => {
  useThemeTick();
  const palette = [1, 2, 3, 4, 5].map((n) => cssVar(`--color-chart-${n}`) ?? '#ff4700');
  const track = cssVar('--color-bg-subtle') ?? '#f5f4f2';
  const gridColor = cssVar('--color-border-subtle') ?? '#e5e4e7';
  const h = dims[size];
  const isHalfCircle = HALF_CIRCLE.has(variant);
  const showCenter = variant !== 'multi' && variant !== 'grid' && (centerValue || centerCaption);
  const [innerR, outerR] = RADIUS_BAND[variant];

  if (variant === 'gauge-tick') {
    const d = data[0];
    return (
      <div className={[styles.chart, className ?? ''].filter(Boolean).join(' ')} style={{ height: h }}>
        <GaugeTick
          value={d?.value ?? 0}
          max={d?.max ?? 100}
          color={palette[0]}
          track={track}
          centerValue={centerValue}
          centerCaption={centerCaption}
        />
      </div>
    );
  }

  return (
    <div className={[styles.chart, className ?? ''].filter(Boolean).join(' ')} style={{ height: h }}>
      {variant === 'grid' && <PolarGrid rings={4} spokes={12} color={gridColor} />}
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          data={data}
          innerRadius={innerR}
          outerRadius={outerR}
          startAngle={isHalfCircle ? 180 : 90}
          endAngle={isHalfCircle ? 0 : -270}
          barCategoryGap={isHalfCircle ? '20%' : '12%'}
        >
          <PolarAngleAxis type="number" domain={[0, data[0]?.max ?? 100]} tick={false} axisLine={false} />
          {/* See DonutChart.tsx: Recharts 3.9.2 can commit Sector-based
              shapes' (Pie, RadialBar) entrance animation on an empty
              intermediate frame and never repaint past it -- confirmed here
              too (background track rendered, the actual value arcs didn't,
              until this was added). */}
          <RadialBar
            dataKey="value"
            // "grid" relies on the polar grid itself as the backdrop --  a
            // solid track disc would paint over the grid lines completely
            // (they share the same 30%-100% band), so it's disabled there.
            background={variant === 'grid' ? false : { fill: track }}
            cornerRadius={8}
            isAnimationActive={false}
          >
            {data.map((_, i) => <Cell key={i} fill={palette[i % palette.length]} />)}
          </RadialBar>
        </RadialBarChart>
      </ResponsiveContainer>

      {showCenter && (
        <div className={[styles.center, isHalfCircle ? styles['center--below'] : ''].filter(Boolean).join(' ')}>
          {centerValue && <span className={styles.center__value}>{centerValue}</span>}
          {centerCaption && <span className={styles.center__caption}>{centerCaption}</span>}
        </div>
      )}
    </div>
  );
};

export default RadialChart;
