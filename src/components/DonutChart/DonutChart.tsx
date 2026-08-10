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
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const palette = [1, 2, 3, 4, 5].map((n) => cssVar(`--color-chart-${n}`) ?? '#ff4700');
  const hoverFill = cssVar('--color-chart-2') ?? '#2e90fa';
  const grid = cssVar('--color-border-subtle') ?? '#e5e4e7';
  const d = dims[size];
  // Figma's segments end in a rounded cap -- half the ring's own thickness
  // is the max Recharts allows before it stops adding visible rounding, so
  // that was the starting point, minus 4px to back it off from that max.
  const cornerRadius = (d.outer - d.inner) / 2 - 4;

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
            cornerRadius={cornerRadius}
            paddingAngle={2}
            stroke="none"
            onMouseEnter={(_, i) => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={i === activeIndex ? hoverFill : palette[i % palette.length]} />
            ))}
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
