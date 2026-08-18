/**
 * FunnelChart
 *
 * Recharts wrapper styled with Sakani chart tokens. Matches Figma's new
 * "Other charts" set ("Funnel chart" / "Funnel chart hover") — stages narrow
 * left to right, each shaded chart/1 at increasing saturation (first stage
 * palest, last stage full color), with the stage's share shown as a white
 * label inside it.
 *
 * Hover: the hovered stage goes full opacity, every other stage dims to
 * 45%, matching Figma's hover state exactly. Recharts' Funnel is a native
 * fit here (unlike Heatmap), so this stays a thin wrapper.
 */

import React from 'react';
import {
  FunnelChart as ReFunnelChart, Funnel, LabelList, Cell, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useThemeTick } from '../../lib/useThemeTick';
import styles from './FunnelChart.module.css';

export type ChartSize = 'sm' | 'md' | 'lg' | 'xl';

export interface FunnelDatum { label: string; value: number; }

export interface FunnelChartProps {
  data: FunnelDatum[];
  size?: ChartSize;
  className?: string;
}

const heights: Record<ChartSize, number> = { sm: 180, md: 240, lg: 320, xl: 420 };
const cssVar = (name: string) =>
  typeof window !== 'undefined'
    ? getComputedStyle(document.documentElement).getPropertyValue(name).trim() || undefined
    : undefined;

// Figma: first (largest) stage is palest, last (smallest) stage is full
// chart/1 saturation -- a "narrowing = concentrating" visual metaphor.
const STAGE_MIN_OPACITY = 0.3;

export const FunnelChart: React.FC<FunnelChartProps> = ({ data, size = 'md', className }) => {
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  useThemeTick();
  const chart1 = cssVar('--color-chart-1') ?? '#ff4700';
  const total = data[0]?.value || 1;

  const stageOpacity = (i: number) =>
    data.length <= 1 ? 1 : STAGE_MIN_OPACITY + (i / (data.length - 1)) * (1 - STAGE_MIN_OPACITY);

  return (
    <div className={[styles.chart, className ?? ''].filter(Boolean).join(' ')}>
      <ResponsiveContainer width="100%" height={heights[size]}>
        <ReFunnelChart>
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
            formatter={(value) => `${Math.round((Number(value) / total) * 100)}%`}
          />
          <Funnel
            dataKey="value"
            nameKey="label"
            data={data}
            isAnimationActive={false}
            onMouseEnter={(_, i) => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <LabelList
              dataKey="value"
              position="center"
              fill="#fff"
              fontSize={14}
              fontFamily="var(--font-sans)"
              // The label text sits directly on top of each trapezoid and,
              // being an SVG <text> node, is hit-tested by default -- it was
              // swallowing hover before the trapezoid underneath ever saw it.
              style={{ pointerEvents: 'none' }}
              formatter={(value) => `${Math.round((Number(value) / total) * 100)}%`}
            />
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={chart1}
                fillOpacity={hoverIndex !== null ? (i === hoverIndex ? 1 : 0.45) : stageOpacity(i)}
              />
            ))}
          </Funnel>
        </ReFunnelChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FunnelChart;
