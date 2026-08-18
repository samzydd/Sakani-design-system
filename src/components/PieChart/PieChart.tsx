/**
 * PieChart
 *
 * Recharts wrapper styled with Sakani chart tokens. Matches Figma "Pie chart"
 * component set: true pie (no hole) alongside donut variants, with an
 * optional center value/caption and an "active" mode that expands whichever
 * slice is hovered (Figma's "donut active" / "interactive" states) rather
 * than just recoloring it, since a pie/donut has no natural "hover fill"
 * the way a bar's flat rectangle does.
 *
 * Segments cycle through the 5 chart tokens so they re-theme in dark mode.
 */

import React from 'react';
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useThemeTick } from '../../lib/useThemeTick';
import styles from './PieChart.module.css';

export type ChartSize = 'sm' | 'md' | 'lg' | 'xl';
export type PieChartVariant = 'pie' | 'donut' | 'donut-with-text' | 'active';

export interface PieDatum { label: string; value: number; }

export interface PieChartProps {
  data: PieDatum[];
  variant?: PieChartVariant;
  size?: ChartSize;
  /** Big number shown in the center. Only rendered for "donut-with-text"
   * and "active" (both have a hole to put it in). */
  centerValue?: string;
  centerCaption?: string;
  /** Leader-line value labels outside each slice (Figma: "Pie chart - label"). */
  showLabels?: boolean;
  className?: string;
}

const dims: Record<ChartSize, { h: number; inner: number; outer: number }> = {
  sm: { h: 180, inner: 0, outer: 72 },
  md: { h: 220, inner: 0, outer: 90 },
  lg: { h: 280, inner: 0, outer: 116 },
  xl: { h: 340, inner: 0, outer: 142 },
};
const cssVar = (name: string) =>
  typeof window !== 'undefined'
    ? getComputedStyle(document.documentElement).getPropertyValue(name).trim() || undefined
    : undefined;

export const PieChart: React.FC<PieChartProps> = ({
  data, variant = 'donut', size = 'md', centerValue, centerCaption, showLabels, className,
}) => {
  useThemeTick();
  const [activeIndex, setActiveIndex] = React.useState<number | undefined>(undefined);
  const palette = [1, 2, 3, 4, 5].map((n) => cssVar(`--color-chart-${n}`) ?? '#ff4700');
  const d = dims[size];
  const hasHole = variant !== 'pie';
  const innerRadius = hasHole ? d.outer * 0.6 : 0;
  const showCenter = (variant === 'donut-with-text' || variant === 'active') && (centerValue || centerCaption);

  return (
    <div className={[styles.chart, className ?? ''].filter(Boolean).join(' ')} style={{ height: d.h }}>
      <ResponsiveContainer width="100%" height="100%">
        <RePieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            innerRadius={innerRadius}
            outerRadius={d.outer}
            paddingAngle={hasHole ? 2 : 1}
            stroke="none"
            // See DonutChart.tsx: Recharts 3.9.2 can commit Sector-based
            // shapes' entrance animation on an empty intermediate frame and
            // never repaint past it, rendering nothing. Disabled here too.
            isAnimationActive={false}
            label={showLabels ? ({ name, value }) => `${name}: ${value}` : undefined}
            labelLine={showLabels}
            onMouseEnter={(_, i) => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(undefined)}
          >
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={palette[i % palette.length]}
                // Recharts 3's Pie dropped activeIndex/activeShape from its
                // types (an actual "explode the hovered slice outward" effect
                // needs those), so "active" leans on the next best type-safe
                // signal instead: full opacity on the hovered slice, the rest
                // dimmed -- still a clear, deliberate highlight.
                fillOpacity={variant === 'active' && activeIndex !== undefined && activeIndex !== i ? 0.45 : 1}
              />
            ))}
          </Pie>
          <Tooltip
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
        </RePieChart>
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

export default PieChart;
