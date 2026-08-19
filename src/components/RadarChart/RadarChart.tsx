/**
 * RadarChart
 *
 * Recharts wrapper styled with Sakani chart tokens. Matches Figma's "Radar
 * charts" component set:
 *
 *   default             — solid filled area, polygon grid, no dots
 *   dots                — filled area + dot markers at each data point
 *   lines-only          — two series, stroke only (no fill), no dots
 *   circle-grid         — circular grid instead of polygon
 *   circle-grid-no-lines — circular grid, no radial spoke lines
 *   multiple            — two series overlaid, semi-transparent fills
 *   custom-label        — two series, vertex labels replaced by a
 *                          "value/value2" + category name block
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
const NO_STROKE = new Set<RadarChartVariant>(['default', 'dots', 'circle-grid', 'circle-grid-no-lines', 'multiple', 'custom-label']);

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
  // Every label in this chart (axis category ticks, custom-label's
  // value+category block) uses fg/subtle.
  const label = cssVar('--color-fg-subtle') ?? '#78716a';
  const isMultiple = variant === 'multiple';
  const isLinesOnly = variant === 'lines-only';
  // "custom-label"/"lines-only" also get the second series, same as
  // "multiple" -- neither shows a legend though (custom-label's own vertex
  // labels already identify each point; lines-only has no fill to need one).
  const showSecondSeries = isMultiple || variant === 'custom-label' || isLinesOnly;
  const showFill = !isLinesOnly;
  const showDots = variant === 'dots';

  // "custom-label" replaces the plain category tick with a two-line block:
  // bold "value/value2" on top, the category name muted underneath --
  // there's no separate axis label or grid in Figma's reference, just this.
  const renderVertexTick = (props: any) => {
    const { x, y, cx, cy, payload, textAnchor } = props;
    const row = data.find((d) => d.label === payload?.value) ?? data[payload?.index];
    if (!row) return <g />;
    // Recharts' own computed `textAnchor` (not a hardcoded "middle") is
    // what right-aligns the group at right-side vertices and left-aligns
    // it at left-side ones, matching Figma -- top/bottom vertices already
    // resolve to "middle".
    const dx = x - cx;
    const dy = y - cy;
    const gap = 4;
    const combined = row.value2 !== undefined ? `${row.value}/${row.value2}` : `${row.value}`;

    // Left/right vertices: the two lines straddle the vertex's own height
    // (value above, category below), so a small outward push along the
    // cx/cy -> x/y ray is enough to clear the grid line horizontally.
    // Top/bottom vertices need direction-aware stacking instead -- both
    // lines have to land on the *same* side of the vertex (both above for
    // the top vertex, both below for the bottom one), with whichever line
    // sits nearest the hexagon getting the actual 4px gap; the symmetric
    // straddle used for the sides would otherwise put one line on the
    // wrong side of the vertex, on top of the grid line.
    const isVertical = Math.abs(dy) > Math.abs(dx);
    let valueY: number;
    let labelY: number;
    if (isVertical && dy < 0) {
      // top vertex: category line (nearest) 4px above, value further above
      labelY = y - gap - 6;
      valueY = labelY - 16;
    } else if (isVertical) {
      // bottom vertex: value line (nearest) 4px below, category further below
      valueY = y + gap + 10;
      labelY = valueY + 18;
    } else {
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const ly = y + (dy / len) * gap;
      valueY = ly - 8;
      labelY = ly + 12;
    }
    const lx = isVertical ? x : x + (dx / Math.sqrt(dx * dx + dy * dy || 1)) * gap;

    return (
      <g>
        <text x={lx} y={valueY} textAnchor={textAnchor} fill={label} fontSize={15} fontWeight={600} fontFamily="var(--font-sans)">
          {combined}
        </text>
        <text x={lx} y={labelY} textAnchor={textAnchor} fill={label} fontSize={13} fontFamily="var(--font-sans)">
          {row.label}
        </text>
      </g>
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
          <PolarAngleAxis
            dataKey="label"
            axisLine={false}
            tick={variant === 'custom-label' ? renderVertexTick : { fill: label, fontSize: 12, fontFamily: 'var(--font-sans)' }}
          />
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
            fillOpacity={showFill ? (variant === 'default' ? 1 : showSecondSeries ? 0.45 : 0.5) : 0}
            strokeWidth={NO_STROKE.has(variant) ? 0 : 2}
            // Recharts' dot markers default to the parent Radar's own
            // stroke color -- with that set to "none" above, plain
            // `dot={true}` would render invisible dots. Giving them their
            // own explicit fill keeps them visible regardless.
            dot={showDots ? { r: 4, fill: chart2, stroke: 'none' } : false}
            isAnimationActive={false}
          />
          {showSecondSeries && (
            <Radar
              name={isMultiple ? (seriesLabels[1] ?? 'Value 2') : undefined}
              dataKey="value2"
              stroke={isLinesOnly ? chart1 : 'none'}
              fill={isLinesOnly ? 'none' : chart1}
              fillOpacity={isLinesOnly ? 0 : 0.8}
              strokeWidth={isLinesOnly ? 2 : 0}
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
