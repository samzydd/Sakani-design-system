/**
 * RadarChart
 *
 * Recharts wrapper styled with Sakani chart tokens. Matches Figma's "Radar
 * charts" component set:
 *
 *   default             — solid filled area, polygon grid, no dots
 *   dots                — filled area + dot markers at each data point
 *   lines-only          — stroke only (no fill), dots
 *   circle-grid         — circular grid instead of polygon
 *   circle-grid-no-lines — circular grid, no radial spoke lines
 *   multiple            — two series overlaid, semi-transparent fills
 *   custom-label        — filled area + the raw value shown at each vertex
 *
 * Not ported: Figma's alternating-filled-ring grid and the soft blurred
 * glow behind one mockup ("Variant12") -- both are decorative embellishments
 * on top of the same underlying shape rather than a structurally different
 * chart, so (consistent with e.g. RadialChart's un-ported gauge micro-styling)
 * they're left as a polish item rather than a hand-rolled SVG port. Recharts'
 * native RadarChart/PolarGrid/Radar map directly onto everything else here,
 * so this stays a thin wrapper.
 */

import React from 'react';
import {
  RadarChart as ReRadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip, Legend,
} from 'recharts';
import { useThemeTick } from '../../lib/useThemeTick';
import { ChartTooltip } from '../../lib/ChartTooltip';
import styles from './RadarChart.module.css';

export type ChartSize = 'sm' | 'md' | 'lg' | 'xl';
export type RadarChartVariant =
  | 'default' | 'dots' | 'lines-only' | 'circle-grid' | 'circle-grid-no-lines' | 'multiple' | 'custom-label';

export interface RadarDatum {
  label: string;
  value: number;
  /** Second series (variant="multiple"). */
  value2?: number;
}

export interface RadarChartProps {
  data: RadarDatum[];
  variant?: RadarChartVariant;
  size?: ChartSize;
  /** Legend labels for `value` / `value2`, shown for "multiple". */
  seriesLabels?: [string, string?];
  className?: string;
}

const heights: Record<ChartSize, number> = { sm: 200, md: 260, lg: 340, xl: 420 };
const cssVar = (name: string) =>
  typeof window !== 'undefined'
    ? getComputedStyle(document.documentElement).getPropertyValue(name).trim() || undefined
    : undefined;

const CIRCLE_GRID = new Set<RadarChartVariant>(['circle-grid', 'circle-grid-no-lines']);
// These variants' shape has no stroke around it in Figma -- just the fill.
const NO_STROKE = new Set<RadarChartVariant>(['default', 'dots', 'circle-grid', 'circle-grid-no-lines', 'multiple']);

export const RadarChart: React.FC<RadarChartProps> = ({
  data, variant = 'default', size = 'md', seriesLabels = ['Value', 'Value 2'], className,
}) => {
  useThemeTick();
  const chart1 = cssVar('--color-chart-1') ?? '#ff4700';
  const chart2 = cssVar('--color-chart-2') ?? '#5b92dd';
  // Figma's Radar chart set uses border/default for its grid strokes
  // (confirmed via its variable defs), not border/subtle like most of the
  // other charts here.
  const grid = cssVar('--color-border-default') ?? '#dbdad7';
  const axis = cssVar('--color-fg-muted') ?? '#6b6375';
  const fgDefault = cssVar('--color-fg-default') ?? '#141414';
  const isMultiple = variant === 'multiple';
  const showFill = variant !== 'lines-only';
  const showDots = variant === 'dots' || variant === 'lines-only';

  // Radar's `label` prop is routed through a Cartesian LabelList context,
  // not the {cx, cy, index, ...} shape Pie's label gets -- it only ever
  // hands back {x, y, value} for a degenerate zero-size box at the vertex,
  // with no chart center to compute an outward radial offset from. A fixed
  // upward nudge is what "position: top" would do anyway, and reads fine
  // regardless of which side of the shape the vertex is on.
  const renderVertexLabel = (props: any) => {
    const { x, y, value } = props;
    return (
      <text x={x} y={y - 10} textAnchor="middle" fill={fgDefault} fontSize={12} fontWeight={500} fontFamily="var(--font-sans)">
        {value}
      </text>
    );
  };

  return (
    <div className={[styles.chart, className ?? ''].filter(Boolean).join(' ')}>
      <ResponsiveContainer width="100%" height={heights[size]}>
        <ReRadarChart data={data} outerRadius="70%">
          <PolarGrid
            gridType={CIRCLE_GRID.has(variant) ? 'circle' : 'polygon'}
            radialLines={variant !== 'circle-grid-no-lines' && variant !== 'default'}
            stroke={grid}
          />
          {/* `stroke` on PolarAngleAxis colors its own outer boundary
              polygon (axisLine), not just the tick text -- left at its
              default it drew a second, fg-muted-colored hexagon directly
              on top of PolarGrid's correct border/default one, reading as
              one much darker/heavier border. PolarGrid already draws the
              real boundary, so this one is switched off entirely. */}
          <PolarAngleAxis dataKey="label" axisLine={false} tick={{ fill: axis, fontSize: 12, fontFamily: 'var(--font-sans)' }} />
          {/* "default" shows only the outer boundary -- no inner concentric
              rings, no radial spokes. tickCount=2 on a [0, max] domain
              collapses PolarGrid's auto-generated rings down to just the
              zero-radius point and the outer one. */}
          <PolarRadiusAxis tick={false} axisLine={false} tickCount={variant === 'default' ? 2 : undefined} />
          <Tooltip content={<ChartTooltip />} />
          {isMultiple && <Legend wrapperStyle={{ fontSize: 12, fontFamily: 'var(--font-sans)' }} />}
          {/* "default"/"dots"/"circle-grid"(-no-lines): Figma's shape has
              no stroke at all around it, just the fill -- "default" is
              also fully opaque (every other variant here keeps the
              semi-transparent fill + stroke, since they need to show
              overlapping series or the grid through it).
              Rendered before value2 (Recharts paints children in JSX
              order, later on top) so the red series sits above blue. */}
          <Radar
            name={isMultiple ? (seriesLabels[0] ?? 'Value') : undefined}
            dataKey="value"
            stroke={NO_STROKE.has(variant) ? 'none' : chart2}
            fill={showFill ? chart2 : 'none'}
            fillOpacity={showFill ? (variant === 'default' ? 1 : isMultiple ? 0.45 : 0.5) : 0}
            strokeWidth={NO_STROKE.has(variant) ? 0 : 2}
            // Recharts' dot markers default to the parent Radar's own
            // stroke color -- with that set to "none" above, plain
            // `dot={true}` would render invisible dots. Giving them their
            // own explicit fill keeps them visible regardless.
            dot={showDots ? { r: 4, fill: chart2, stroke: 'none' } : false}
            isAnimationActive={false}
            label={variant === 'custom-label' ? renderVertexLabel : undefined}
          />
          {isMultiple && (
            <Radar
              name={seriesLabels[1] ?? 'Value 2'}
              dataKey="value2"
              stroke="none"
              fill={chart1}
              fillOpacity={0.8}
              strokeWidth={0}
              dot={showDots ? { r: 4, fill: chart1, stroke: 'none' } : false}
              isAnimationActive={false}
            />
          )}
        </ReRadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChart;
