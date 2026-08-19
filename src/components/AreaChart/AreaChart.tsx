/**
 * AreaChart
 *
 * Recharts wrapper styled with Sakani chart tokens. Matches Figma "Area Chart"
 * (type: Default | Stacked | Step | Linear, each with an optional second
 * series). A thin library wrapper, same philosophy as BarChart/LineChart/
 * DonutChart — production charts use a charting library, not a hand-rolled
 * SVG port.
 *
 * Hover shows Recharts' own tooltip + cursor line, matching Figma's
 * "Indicator line" + "Chart Tooltip" atoms.
 */

import React from 'react';
import {
  AreaChart as ReAreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useThemeTick } from '../../lib/useThemeTick';
import { ChartTooltip } from '../../lib/ChartTooltip';
import styles from './AreaChart.module.css';

export type ChartSize = 'sm' | 'md' | 'lg' | 'xl';
export type AreaChartVariant = 'default' | 'stacked' | 'step' | 'linear';

export interface AreaChartDatum {
  label: string;
  value: number;
  /** Second series (Figma: "Revenue" alongside "Costs"). Renders a second
   * area, stacked on top of `value` when `variant="stacked"`. */
  value2?: number;
}

export interface AreaChartProps {
  data: AreaChartDatum[];
  variant?: AreaChartVariant;
  /** Legend label for `value` / `value2` in the tooltip. */
  seriesLabels?: [string, string?];
  size?: ChartSize;
  height?: number;
  className?: string;
}

const heights: Record<ChartSize, number> = { sm: 180, md: 240, lg: 320, xl: 420 };
const cssVar = (name: string) =>
  typeof window !== 'undefined'
    ? getComputedStyle(document.documentElement).getPropertyValue(name).trim() || undefined
    : undefined;

export const AreaChart: React.FC<AreaChartProps> = ({
  data, variant = 'default', seriesLabels = ['Value', 'Value 2'], size = 'md', height, className,
}) => {
  useThemeTick();
  const chart1 = cssVar('--color-chart-1') ?? '#ff4700';
  const chart2 = cssVar('--color-chart-2') ?? '#2e90fa';
  const grid = cssVar('--color-border-subtle') ?? '#e5e4e7';
  const axis = cssVar('--color-fg-muted') ?? '#6b6375';
  const hasSecondSeries = data.some((d) => d.value2 !== undefined);

  const curveType = variant === 'step' ? 'step' : variant === 'linear' ? 'linear' : 'monotone';
  const stackId = variant === 'stacked' ? 'stack' : undefined;

  return (
    <div className={[styles.chart, className ?? ''].filter(Boolean).join(' ')}>
      <ResponsiveContainer width="100%" height={height ?? heights[size]}>
        <ReAreaChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
          <defs>
            <linearGradient id="sakani-area-1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chart1} stopOpacity={0.35} />
              <stop offset="95%" stopColor={chart1} stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="sakani-area-2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chart2} stopOpacity={0.35} />
              <stop offset="95%" stopColor={chart2} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
          <XAxis dataKey="label" stroke={axis} fontSize={12} tickLine={false} axisLine={false} interval={0} />
          <Tooltip
            cursor={{ stroke: cssVar('--color-border-default') ?? '#d6d3ce', strokeWidth: 1 }}
            content={<ChartTooltip />}
            wrapperStyle={{ zIndex: 50 }}
          />
          {hasSecondSeries && (
            <Area
              type={curveType}
              dataKey="value2"
              name={seriesLabels[1] ?? 'Value 2'}
              stackId={stackId}
              stroke={chart2}
              strokeWidth={2}
              fill="url(#sakani-area-2)"
              dot={false}
              activeDot={{ r: 4, fill: chart2, stroke: cssVar('--color-bg-canvas'), strokeWidth: 1.5 }}
            />
          )}
          <Area
            type={curveType}
            dataKey="value"
            name={seriesLabels[0] ?? 'Value'}
            stackId={stackId}
            stroke={chart1}
            strokeWidth={2}
            fill="url(#sakani-area-1)"
            dot={false}
            activeDot={{ r: 4, fill: chart1, stroke: cssVar('--color-bg-canvas'), strokeWidth: 1.5 }}
          />
        </ReAreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChart;
