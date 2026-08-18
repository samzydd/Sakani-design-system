/**
 * BarChart
 *
 * Recharts wrapper styled with Sakani chart tokens. Matches Figma's lowercase
 * "Bar chart" component set (Default, Active, Multiple, Stacked - Legend,
 * Negative, horizontal) — a thin library wrapper rather than a structural SVG
 * port, since production charts use a charting library. Replaces the earlier
 * Size×Bars variant model read from the older title-case "Bar Chart" component,
 * which this design has since superseded.
 *
 * NOT ported: "Label" / "custom label" (value-annotation variants) and "Mixed"
 * (bar+line combo) — flagged rather than faked, same as RadialChart's omitted
 * gauge-tick variant.
 *
 * Colors come from --color-chart-1..5 so they re-theme in dark mode automatically.
 */

import React from 'react';
import {
  BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, Rectangle,
} from 'recharts';
import { useThemeTick } from '../../lib/useThemeTick';
import styles from './BarChart.module.css';

export type ChartSize = 'sm' | 'md' | 'lg' | 'xl';
export type BarChartVariant = 'default' | 'active' | 'multiple' | 'stacked' | 'negative' | 'horizontal';

export interface BarChartDatum {
  label: string;
  value: number;
  /** Second series (Figma: "Multiple" / "Stacked - Legend"). */
  value2?: number;
}

export interface BarChartProps {
  data: BarChartDatum[];
  variant?: BarChartVariant;
  size?: ChartSize;
  /** Legend labels for `value` / `value2`, shown for "multiple" and "stacked". */
  seriesLabels?: [string, string?];
  className?: string;
}

const heights: Record<ChartSize, number> = { sm: 180, md: 240, lg: 320, xl: 420 };
// Figma's new Bar chart set uses a flat 6px radius on every bar, replacing
// the old size-dependent 8px/12px logic.
const CORNER_RADIUS = 6;

/** Reads a CSS custom property from :root so Recharts (which needs real color strings) can use it. */
const cssVar = (name: string) =>
  typeof window !== 'undefined'
    ? getComputedStyle(document.documentElement).getPropertyValue(name).trim() || undefined
    : undefined;

export const BarChart: React.FC<BarChartProps> = ({
  data, variant = 'default', size = 'md', seriesLabels = ['Value', 'Value 2'], className,
}) => {
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  useThemeTick();
  const chartDefault = cssVar('--color-chart-2') ?? '#2e90fa';
  const chartHover = cssVar('--color-chart-1') ?? '#ff4700';
  const chartSecondary = cssVar('--color-chart-5') ?? '#78716a';
  const chartNegative = cssVar('--color-chart-4') ?? '#e5484d';
  const grid = cssVar('--color-border-subtle') ?? '#e5e4e7';
  const axis = cssVar('--color-fg-muted') ?? '#6b6375';
  const isGrouped = variant === 'multiple' || variant === 'stacked';
  const hasSecondSeries = isGrouped && data.some((d) => d.value2 !== undefined);
  // "Active": the most recent category is always highlighted, independent of hover.
  const activeIdx = variant === 'active' ? data.length - 1 : null;

  const canvasBg = cssVar('--color-bg-canvas') ?? '#fafaf9';

  const tooltip = (
    <Tooltip
      cursor={false}
      contentStyle={{
        background: cssVar('--color-bg-canvas'),
        border: 'none',
        borderRadius: 8,
        padding: '12px',
        boxShadow: cssVar('--shadow-lg'),
        fontSize: 13,
        fontFamily: 'var(--font-sans)',
      }}
    />
  );

  // Hovering never recolors a bar -- only "active" (the persistent marker
  // bar, unrelated to hover) and "negative" (sign-based) change fill.
  // Hover itself is communicated purely by dimming every OTHER bar to 45%.
  const singleSeriesFill = (i: number) => {
    if (variant === 'active' && i === activeIdx) return chartHover;
    if (variant === 'negative' && data[i].value < 0) return chartNegative;
    return chartDefault;
  };
  const singleSeriesOpacity = (i: number) =>
    hoverIndex !== null && i !== hoverIndex && i !== activeIdx ? 0.45 : 1;

  // Figma's hover state adds a small ring-stroked dot at the tip of the
  // hovered bar (the same marker AreaChart/LineChart use at their active
  // point) -- Recharts' `activeBar` renders only the currently-hovered bar,
  // so this reuses the default Rectangle shape and layers the dot on top,
  // keeping the bar's own resting fill instead of Recharts' default
  // active-bar recolor.
  const makeActiveBar = (dataKey: 'value' | 'value2') => (props: any) => {
    const { x, y, width, height, fill, radius } = props;
    const raw = Number(data[props.index]?.[dataKey] ?? 0);
    const isHorizontal = variant === 'horizontal';
    const cx = isHorizontal ? x + width : x + width / 2;
    const cy = isHorizontal ? y + height / 2 : raw < 0 ? y + height : y;
    return (
      <g>
        <Rectangle x={x} y={y} width={width} height={height} fill={fill} radius={radius} />
        <circle cx={cx} cy={cy} r={4} fill={fill} stroke={canvasBg} strokeWidth={1.5} />
      </g>
    );
  };

  return (
    <div className={[styles.chart, className ?? ''].filter(Boolean).join(' ')}>
      <ResponsiveContainer width="100%" height={heights[size]}>
        <ReBarChart
          data={data}
          layout={variant === 'horizontal' ? 'vertical' : 'horizontal'}
          margin={{ top: 8, right: 8, bottom: 8, left: variant === 'horizontal' ? 8 : 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={grid}
            horizontal={variant === 'horizontal'}
            vertical={variant === 'horizontal'}
          />
          {variant === 'horizontal' ? (
            <>
              <XAxis type="number" stroke={axis} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="label" stroke={axis} fontSize={12} tickLine={false} axisLine={false} width={64} />
            </>
          ) : (
            <XAxis dataKey="label" stroke={axis} fontSize={12} tickLine={false} axisLine={false} interval={0} />
          )}
          {tooltip}
          {isGrouped && (
            <Legend wrapperStyle={{ fontSize: 12, fontFamily: 'var(--font-sans)' }} />
          )}

          {isGrouped ? (
            <>
              <Bar
                dataKey="value"
                name={seriesLabels[0] ?? 'Value'}
                fill={chartDefault}
                stackId={variant === 'stacked' ? 'stack' : undefined}
                radius={variant === 'stacked' ? [0, 0, CORNER_RADIUS, CORNER_RADIUS] : [CORNER_RADIUS, CORNER_RADIUS, CORNER_RADIUS, CORNER_RADIUS]}
                // See DonutChart.tsx: Recharts 3.9.2 can commit a shape's
                // entrance animation on an empty intermediate frame and never
                // repaint past it. Confirmed here too for grouped/stacked
                // Bars (plain single-series Bar wasn't affected).
                isAnimationActive={false}
                activeBar={makeActiveBar('value')}
                onMouseEnter={(_, i) => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={chartDefault} fillOpacity={hoverIndex !== null && i !== hoverIndex ? 0.45 : 1} />
                ))}
              </Bar>
              {hasSecondSeries && (
                <Bar
                  dataKey="value2"
                  name={seriesLabels[1] ?? 'Value 2'}
                  fill={chartSecondary}
                  stackId={variant === 'stacked' ? 'stack' : undefined}
                  radius={variant === 'stacked' ? [CORNER_RADIUS, CORNER_RADIUS, 0, 0] : [CORNER_RADIUS, CORNER_RADIUS, CORNER_RADIUS, CORNER_RADIUS]}
                  isAnimationActive={false}
                  activeBar={makeActiveBar('value2')}
                  onMouseEnter={(_, i) => setHoverIndex(i)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  {data.map((_, i) => (
                    <Cell key={i} fill={chartSecondary} fillOpacity={hoverIndex !== null && i !== hoverIndex ? 0.45 : 1} />
                  ))}
                </Bar>
              )}
            </>
          ) : (
            <Bar
              dataKey="value"
              radius={[CORNER_RADIUS, CORNER_RADIUS, CORNER_RADIUS, CORNER_RADIUS]}
              isAnimationActive={false}
              activeBar={makeActiveBar('value')}
              onMouseEnter={(_, i) => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={singleSeriesFill(i)} fillOpacity={singleSeriesOpacity(i)} />
              ))}
            </Bar>
          )}
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
