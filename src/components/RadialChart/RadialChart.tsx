/**
 * RadialChart
 *
 * Recharts wrapper styled with Sakani chart tokens. Matches Figma "Radial
 * chart" component set for three of its variants:
 *   - "multi"    — one concentric ring per data row (Figma default), each
 *                  ring the next chart token color.
 *   - "single"   — one ring + a center value/caption (Figma "text"/"shape").
 *   - "stacked"  — 2-3 nested half-circle arcs + a center value/caption
 *                  (Figma "stacked"/"stacked - 3 layers").
 *
 * NOT ported: Figma's "gauge tick" variant (a half-circle dial built from
 * ~40 individual radial tick marks). That's a fundamentally different,
 * fully-custom SVG pattern rather than something RadialBarChart renders
 * natively -- flagged rather than faked with a lookalike.
 */

import React from 'react';
import { RadialBarChart, RadialBar, Cell, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import { useThemeTick } from '../../lib/useThemeTick';
import styles from './RadialChart.module.css';

export type ChartSize = 'sm' | 'md' | 'lg' | 'xl';
export type RadialChartVariant = 'multi' | 'single' | 'stacked';

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

export const RadialChart: React.FC<RadialChartProps> = ({
  data, variant = 'multi', size = 'md', centerValue, centerCaption, className,
}) => {
  useThemeTick();
  const palette = [1, 2, 3, 4, 5].map((n) => cssVar(`--color-chart-${n}`) ?? '#ff4700');
  const track = cssVar('--color-bg-subtle') ?? '#f5f4f2';
  const h = dims[size];
  const isStacked = variant === 'stacked';
  const showCenter = variant !== 'multi' && (centerValue || centerCaption);

  return (
    <div className={[styles.chart, className ?? ''].filter(Boolean).join(' ')} style={{ height: h }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          data={data}
          innerRadius="30%"
          outerRadius="100%"
          startAngle={isStacked ? 180 : 90}
          endAngle={isStacked ? 0 : -270}
          barCategoryGap={isStacked ? '20%' : '12%'}
        >
          <PolarAngleAxis type="number" domain={[0, data[0]?.max ?? 100]} tick={false} axisLine={false} />
          {/* See DonutChart.tsx: Recharts 3.9.2 can commit Sector-based
              shapes' (Pie, RadialBar) entrance animation on an empty
              intermediate frame and never repaint past it -- confirmed here
              too (background track rendered, the actual value arcs didn't,
              until this was added). */}
          <RadialBar dataKey="value" background={{ fill: track }} cornerRadius={8} isAnimationActive={false}>
            {data.map((_, i) => <Cell key={i} fill={palette[i % palette.length]} />)}
          </RadialBar>
        </RadialBarChart>
      </ResponsiveContainer>

      {showCenter && (
        <div className={styles.center}>
          {centerValue && <span className={styles.center__value}>{centerValue}</span>}
          {centerCaption && <span className={styles.center__caption}>{centerCaption}</span>}
        </div>
      )}
    </div>
  );
};

export default RadialChart;
