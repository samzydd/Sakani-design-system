/**
 * DonutChart
 *
 * Recharts wrapper styled with Sakani chart tokens. Matches Figma "Donut Chart"
 * (Size sm|md|lg|xl, with center value + caption). Segments cycle through the 5
 * chart tokens so they re-theme in dark mode.
 */

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import styles from './DonutChart.module.css';

export type ChartSize = 'sm' | 'md' | 'lg' | 'xl';

export interface DonutDatum { label: string; value: number; }

export interface DonutChartProps {
  data: DonutDatum[];
  size?: ChartSize;
  /** Big number shown in the center (Figma: value). */
  centerValue?: string;
  /** Small caption under the center value (Figma: caption). */
  centerCaption?: string;
  className?: string;
}

const dims: Record<ChartSize, { h: number; inner: number; outer: number }> = {
  sm: { h: 180, inner: 50, outer: 72 },
  md: { h: 220, inner: 62, outer: 90 },
  lg: { h: 280, inner: 80, outer: 116 },
  xl: { h: 340, inner: 98, outer: 142 },
};
const cssVar = (name: string) =>
  typeof window !== 'undefined'
    ? getComputedStyle(document.documentElement).getPropertyValue(name).trim() || undefined
    : undefined;

export const DonutChart: React.FC<DonutChartProps> = ({
  data, size = 'md', centerValue, centerCaption, className,
}) => {
  const palette = [1, 2, 3, 4, 5].map((n) => cssVar(`--color-chart-${n}`) ?? '#ff4700');
  const grid = cssVar('--color-border-subtle') ?? '#e5e4e7';
  const d = dims[size];

  return (
    <div className={[styles.chart, className ?? ''].filter(Boolean).join(' ')} style={{ height: d.h }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            innerRadius={d.inner}
            outerRadius={d.outer}
            paddingAngle={2}
            stroke="none"
          >
            {data.map((_, i) => <Cell key={i} fill={palette[i % palette.length]} />)}
          </Pie>
          <Tooltip
            contentStyle={{
              background: cssVar('--color-bg-surface'),
              border: `1px solid ${grid}`,
              borderRadius: 8, fontSize: 12, fontFamily: 'var(--font-sans)',
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Center label overlay */}
      {(centerValue || centerCaption) && (
        <div className={styles.center}>
          {centerValue && <span className={styles.center__value}>{centerValue}</span>}
          {centerCaption && <span className={styles.center__caption}>{centerCaption}</span>}
        </div>
      )}
    </div>
  );
};

export default DonutChart;
