/**
 * BarChart
 *
 * Recharts wrapper styled with Sakani chart tokens. Matches Figma "Bar Chart"
 * (Size sm|md|lg|xl, Bars 6-12) — as agreed, a thin library wrapper rather than a
 * structural SVG port, since production charts use a charting library.
 *
 * Colors come from --color-chart-1..5 so they re-theme in dark mode automatically.
 */

import React from 'react';
import {
  BarChart as ReBarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import styles from './BarChart.module.css';

export type ChartSize = 'sm' | 'md' | 'lg' | 'xl';

export interface BarChartDatum { label: string; value: number; }

export interface BarChartProps {
  data: BarChartDatum[];
  size?: ChartSize;
  /** Use a single accent color, or cycle through the 5 chart tokens. */
  multicolor?: boolean;
  className?: string;
}

const heights: Record<ChartSize, number> = { sm: 180, md: 240, lg: 320, xl: 420 };

/** Reads a CSS custom property from :root so Recharts (which needs real color strings) can use it. */
const cssVar = (name: string) =>
  typeof window !== 'undefined'
    ? getComputedStyle(document.documentElement).getPropertyValue(name).trim() || undefined
    : undefined;

export const BarChart: React.FC<BarChartProps> = ({ data, size = 'md', multicolor, className }) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const palette = [1, 2, 3, 4, 5].map((n) => cssVar(`--color-chart-${n}`) ?? '#ff4700');
  const hoverFill = cssVar('--color-chart-2') ?? '#2e90fa';
  const grid = cssVar('--color-border-subtle') ?? '#e5e4e7';
  const axis = cssVar('--color-fg-muted') ?? '#6b6375';
  // Figma: radius/md (8px) at sm/md/lg, radius/lg (12px) at xl.
  const cornerRadius = size === 'xl' ? 12 : 8;

  return (
    <div className={[styles.chart, className ?? ''].filter(Boolean).join(' ')}>
      <ResponsiveContainer width="100%" height={heights[size]}>
        <ReBarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
          <XAxis dataKey="label" stroke={axis} fontSize={12} tickLine={false} axisLine={false} interval={0} />
          <Tooltip
            cursor={{ fill: cssVar('--color-bg-subtle') ?? '#f4f3ec' }}
            contentStyle={{
              background: cssVar('--color-bg-surface'),
              border: `1px solid ${grid}`,
              borderRadius: 8,
              fontSize: 12,
              fontFamily: 'var(--font-sans)',
            }}
          />
          {/* Figma's className is the plain `rounded-[...]` utility, not
              `rounded-t-[...]` -- all four corners round, not just the top
              two (a bar-chart convention I wrongly defaulted to before). */}
          <Bar
            dataKey="value"
            radius={[cornerRadius, cornerRadius, cornerRadius, cornerRadius]}
            fill={palette[0]}
            onMouseEnter={(_, i) => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={i === activeIndex ? hoverFill : multicolor ? palette[i % palette.length] : palette[0]} />
            ))}
          </Bar>
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
