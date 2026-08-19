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
  // Figma: single-series "Default" uses chart/5, and "Stacked Default"
  // (two series) keeps that same chart/5 for `value` and adds chart/2 for
  // `value2` -- not chart/1/chart/2 as the token numbering might suggest.
  const valueColor = cssVar('--color-chart-5') ?? '#dca84f';
  const value2Color = cssVar('--color-chart-2') ?? '#5b92dd';
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
              <stop offset="5%" stopColor={valueColor} stopOpacity={0.35} />
              <stop offset="95%" stopColor={valueColor} stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="sakani-area-2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={value2Color} stopOpacity={0.35} />
              <stop offset="95%" stopColor={value2Color} stopOpacity={0.02} />
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
              stroke={value2Color}
              strokeWidth={2}
              fill="url(#sakani-area-2)"
              dot={false}
              activeDot={{ r: 4, fill: value2Color, stroke: cssVar('--color-bg-canvas'), strokeWidth: 1.5 }}
            />
          )}
          <Area
            type={curveType}
            dataKey="value"
            name={seriesLabels[0] ?? 'Value'}
            stackId={stackId}
            stroke={valueColor}
            strokeWidth={2}
            fill="url(#sakani-area-1)"
            dot={false}
            activeDot={{ r: 4, fill: valueColor, stroke: cssVar('--color-bg-canvas'), strokeWidth: 1.5 }}
          />
        </ReAreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChart;
