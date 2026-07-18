/**
 * LineChart
 *
 * Recharts wrapper styled with Sakani chart tokens. Matches Figma "Line Chart"
 * (Size sm|md|lg|xl). Supports one or more series; each series uses the next
 * chart token color so it re-themes in dark mode.
 */

import React from 'react';
import {
  LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import styles from './LineChart.module.css';

export type ChartSize = 'sm' | 'md' | 'lg' | 'xl';

export interface LineChartProps {
  /** Rows keyed by label plus one field per series. */
  data: Array<Record<string, string | number>>;
  /** Series field names to plot. */
  series: string[];
  /** Field used for the x-axis (defaults to "label"). */
  xKey?: string;
  size?: ChartSize;
  showLegend?: boolean;
  className?: string;
}

const heights: Record<ChartSize, number> = { sm: 180, md: 240, lg: 320, xl: 420 };
const cssVar = (name: string) =>
  typeof window !== 'undefined'
    ? getComputedStyle(document.documentElement).getPropertyValue(name).trim() || undefined
    : undefined;

export const LineChart: React.FC<LineChartProps> = ({
  data, series, xKey = 'label', size = 'md', showLegend, className,
}) => {
  const palette = [1, 2, 3, 4, 5].map((n) => cssVar(`--color-chart-${n}`) ?? '#ff4700');
  const grid = cssVar('--color-border-subtle') ?? '#e5e4e7';
  const axis = cssVar('--color-fg-muted') ?? '#6b6375';

  return (
    <div className={[styles.chart, className ?? ''].filter(Boolean).join(' ')}>
      <ResponsiveContainer width="100%" height={heights[size]}>
        <ReLineChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: -12 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
          <XAxis dataKey={xKey} stroke={axis} fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke={axis} fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: cssVar('--color-bg-surface'),
              border: `1px solid ${grid}`,
              borderRadius: 8, fontSize: 12, fontFamily: 'var(--font-sans)',
            }}
          />
          {showLegend && <Legend wrapperStyle={{ fontSize: 12, fontFamily: 'var(--font-sans)' }} />}
          {series.map((key, i) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={palette[i % palette.length]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
