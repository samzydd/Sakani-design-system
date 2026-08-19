/**
 * DonutChart
 *
 * Recharts wrapper styled with Sakani chart tokens. Matches Figma "Donut Chart"
 * (Size sm|md|lg|xl, with center value + caption). Segments cycle through the 5
 * chart tokens so they re-theme in dark mode.
 */

import React from 'react';
import { PieChart, Pie, Cell, Sector, ResponsiveContainer, Tooltip } from 'recharts';
import { useThemeTick } from '../../lib/useThemeTick';
import { ChartTooltip } from '../../lib/ChartTooltip';
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
  /** Pixel height override, takes precedence over `size`'s preset. */
  height?: number;
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
  data, size = 'md', centerValue, centerCaption, height, className,
}) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  useThemeTick();
  const palette = [1, 2, 3, 4, 5].map((n) => cssVar(`--color-chart-${n}`) ?? '#ff4700');
  const d = { ...dims[size], h: height ?? dims[size].h };
  // Figma's segments end in a rounded cap -- half the ring's own thickness
  // is the max Recharts allows before it stops adding visible rounding, so
  // that was the starting point, backed off 4px then another 3px (7 total)
  // per subsequent adjustment requests.
  const cornerRadius = (d.outer - d.inner) / 2 - 7;

  // Same hover rule as every other multi-segment chart in this system
  // (PieChart's donut-active/interactive, BarChart's dimming): the hovered
  // segment keeps its own color and grows in place -- outer radius only, cx/
  // cy untouched, so it stays flush with its neighbors instead of pulling
  // away and leaving negative space -- while every other segment dims to
  // 45% opacity. No recolor to an unrelated hover color.
  const renderSector = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, index } = props;
    const isActive = index === activeIndex;
    const growth = isActive ? 16 : 0;
    const fillOpacity = activeIndex !== null && !isActive ? 0.45 : 1;
    return (
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + growth}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        fillOpacity={fillOpacity}
      />
    );
  };

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
            // On mount, Recharts 3.9.2 sometimes commits the entrance
            // animation's *empty* intermediate frame for Sector-based shapes
            // (Pie, RadialBar) and never repaints past it -- the shape's <g>
            // renders with no <path> child at all, so nothing shows even
            // though every prop above is correct. Bar/Area/Line don't hit
            // this (rects and line paths animate differently). Disabling the
            // animation skips the broken transition entirely.
            isAnimationActive={false}
            shape={renderSector}
            onMouseEnter={(_, i) => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={palette[i % palette.length]} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltip />} wrapperStyle={{ zIndex: 50 }} />
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
