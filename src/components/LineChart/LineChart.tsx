/**
 * LineChart
 *
 * Recharts wrapper styled with Sakani chart tokens. Matches Figma's "Line
 * chart" component set:
 *
 *   default      — smooth (monotone) curve, single series, no dots
 *   linear       — straight-line segments instead of a smooth curve
 *   step         — step/staircase line
 *   multiple     — two series overlaid (pass 2 entries in `series`)
 *   dots         — smooth curve, dot markers always visible (not just on hover)
 *   custom-dots  — smooth curve, ringed/halo dot markers
 *   dots-colors  — smooth curve, each dot cycles through the full chart
 *                  palette instead of matching its own series' color
 *   label        — dots + the raw value shown above each point
 *   custom-label — dots + a custom label per point (see `labelKey`)
 *
 * A thin wrapper throughout -- every variant is a Recharts `type`/`dot`/
 * `label` prop combination, no hand-rolled SVG needed.
 */

import React from 'react';
import {
  LineChart as ReLineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { useThemeTick } from '../../lib/useThemeTick';
import { ChartTooltip } from '../../lib/ChartTooltip';
import styles from './LineChart.module.css';

export type ChartSize = 'sm' | 'md' | 'lg' | 'xl';
export type LineChartVariant =
  | 'default' | 'linear' | 'step' | 'multiple' | 'dots' | 'custom-dots' | 'dots-colors' | 'label' | 'custom-label';

export interface LineChartProps {
  /** Rows keyed by label plus one field per series. */
  data: Array<Record<string, string | number>>;
  /** Series field names to plot. */
  series: string[];
  /** Field used for the x-axis (defaults to "label"). */
  xKey?: string;
  variant?: LineChartVariant;
  /** Field holding each point's custom label text (variant="custom-label"). */
  labelKey?: string;
  size?: ChartSize;
  /** Pixel height override, takes precedence over `size`'s preset. Recharts'
   * ResponsiveContainer renders its SVG at whatever literal number this prop
   * resolves to and does not re-measure it from CSS, so shrinking a chart to
   * fit a constrained layout must go through this prop, not a CSS override
   * on an ancestor. */
  height?: number;
  showLegend?: boolean;
  className?: string;
}

const heights: Record<ChartSize, number> = { sm: 180, md: 240, lg: 320, xl: 420 };
const cssVar = (name: string) =>
  typeof window !== 'undefined'
    ? getComputedStyle(document.documentElement).getPropertyValue(name).trim() || undefined
    : undefined;

const ALWAYS_DOTS = new Set<LineChartVariant>(['dots', 'custom-dots', 'dots-colors', 'label', 'custom-label']);

export const LineChart: React.FC<LineChartProps> = ({
  data, series, xKey = 'label', variant = 'default', labelKey, size = 'md', height, showLegend, className,
}) => {
  useThemeTick();
  const palette = [1, 2, 3, 4, 5].map((n) => cssVar(`--color-chart-${n}`) ?? '#ff4700');
  const grid = cssVar('--color-border-subtle') ?? '#e5e4e7';
  const axis = cssVar('--color-fg-muted') ?? '#6b6375';
  const canvasBg = cssVar('--color-bg-canvas') ?? '#fafaf9';
  const fgDefault = cssVar('--color-fg-default') ?? '#141414';
  const curveType = variant === 'linear' ? 'linear' : variant === 'step' ? 'step' : 'monotone';
  const showDots = ALWAYS_DOTS.has(variant);

  // "custom-dots": a ringed/halo marker instead of a plain filled circle.
  const renderRingDot = (color: string) => (props: any) => {
    const { cx, cy } = props;
    return (
      <g>
        <circle cx={cx} cy={cy} r={6} fill="none" stroke={color} strokeWidth={1.5} />
        <circle cx={cx} cy={cy} r={2.5} fill={color} />
      </g>
    );
  };

  // "dots-colors": each point's dot cycles through the full chart palette,
  // independent of its own series' line color.
  const renderPaletteDot = (props: any) => {
    const { cx, cy, index } = props;
    const color = palette[(index ?? 0) % palette.length];
    return <circle cx={cx} cy={cy} r={4} fill={color} stroke={canvasBg} strokeWidth={1.5} />;
  };

  // "label"/"custom-label": Line's `label` prop is routed through a
  // Cartesian LabelList context. Unlike Radar's equivalent, the actual
  // props handed to a custom render function here don't include `payload`
  // (confirmed via a live console check, despite the source computing it) --
  // `index` is present instead, so the custom label text is read off the
  // closure-captured `data` array directly.
  const renderPointLabel = (props: any) => {
    const { x, y, value, index } = props;
    const text = variant === 'custom-label' && labelKey ? data[index]?.[labelKey] : value;
    if (text === undefined) return <g />;
    return (
      <text x={x} y={y - 12} textAnchor="middle" fill={fgDefault} fontSize={12} fontWeight={500} fontFamily="var(--font-sans)">
        {text}
      </text>
    );
  };

  return (
    <div className={[styles.chart, className ?? ''].filter(Boolean).join(' ')}>
      <ResponsiveContainer width="100%" height={height ?? heights[size]}>
        <ReLineChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 12 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
          <XAxis dataKey={xKey} stroke={axis} fontSize={12} tickLine={false} axisLine={false} interval={0} />
          <Tooltip
            cursor={{ stroke: cssVar('--color-border-default') ?? '#d6d3ce', strokeWidth: 1 }}
            content={<ChartTooltip />}
            wrapperStyle={{ marginTop: -8, marginLeft: -8, zIndex: 50 }}
          />
          {showLegend && <Legend wrapperStyle={{ fontSize: 12, fontFamily: 'var(--font-sans)' }} />}
          {series.map((key, i) => {
            const color = palette[i % palette.length];
            const dot = !showDots ? false
              : variant === 'custom-dots' ? renderRingDot(color)
              : variant === 'dots-colors' ? renderPaletteDot
              : { r: 4, fill: color, stroke: canvasBg, strokeWidth: 1.5 };
            return (
              <Line
                key={key}
                type={curveType}
                dataKey={key}
                stroke={color}
                strokeWidth={2}
                dot={dot}
                activeDot={{ r: 4, fill: color, stroke: canvasBg, strokeWidth: 1.5 }}
                label={variant === 'label' || variant === 'custom-label' ? renderPointLabel : undefined}
              />
            );
          })}
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
