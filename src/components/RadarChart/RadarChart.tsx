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
 *   grid-custom         — boundary-only grid, same treatment as "default"
 *   grid-filled         — polygon grid, alternating filled concentric bands
 *   circle-grid-filled  — same, circular bands instead of polygon
 *   multiple            — two series overlaid, semi-transparent fills
 *   custom-label        — two series, vertex labels replaced by a
 *                          "value/value2" + category name block
 *
 * Not ported: the soft blurred glow behind one mockup ("Variant12") -- a
 * decorative embellishment on top of the same underlying shape rather than
 * a structurally different chart.
 *
 * grid-filled/circle-grid-filled's alternating bands aren't something
 * PolarGrid can do (it only strokes rings, never fills them).
 * grid-filled's bands are built as extra low-opacity `<Radar>` series at
 * fixed fractions of the data's max value, so they automatically share the
 * real series' exact polygon geometry with no separate coordinate math.
 * circle-grid-filled needs true circles, which `<Radar>` can't draw (it
 * only ever connects data points with straight lines) -- those are a
 * measured SVG overlay instead, replicating Recharts' own
 * cx/cy/outerRadius="70%" math (confirmed against its PolarUtils source)
 * via a ResizeObserver, with PolarGrid left enabled on top of it for the
 * spokes/ring outlines. Both give the "denser toward center" look for
 * free, via ordinary alpha compositing of same-color layers.
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
  | 'default' | 'dots' | 'lines-only' | 'circle-grid' | 'circle-grid-no-lines'
  | 'grid-custom' | 'grid-filled' | 'circle-grid-filled' | 'multiple' | 'custom-label';

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

const CIRCLE_GRID = new Set<RadarChartVariant>(['circle-grid', 'circle-grid-no-lines', 'circle-grid-filled']);
// "Boundary only" grid variants -- no inner concentric rings, no spokes.
const MINIMAL_GRID = new Set<RadarChartVariant>(['default', 'grid-custom']);
// "grid-filled"'s bands follow the polygon's own vertex directions, so
// they're built from stacked `<Radar>` series (see the module doc
// comment). "circle-grid-filled" wants smooth round bands instead, which
// `<Radar>` can't draw -- a CSS radial-gradient backdrop does that job
// directly, no synthetic series needed.
const FILLED_GRID = new Set<RadarChartVariant>(['grid-filled']);
const isCircleFilled = (v: RadarChartVariant) => v === 'circle-grid-filled';
// These variants' shape has no stroke around it in Figma -- just the fill.
const NO_STROKE = new Set<RadarChartVariant>([
  'default', 'dots', 'circle-grid', 'circle-grid-no-lines', 'multiple', 'custom-label',
  'grid-custom', 'grid-filled', 'circle-grid-filled',
]);
const RING_LEVELS = [1, 0.8, 0.6, 0.4, 0.2];

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
  const showDots = variant === 'dots' || variant === 'circle-grid';
  const isFilledGrid = FILLED_GRID.has(variant);
  const isMinimalGrid = MINIMAL_GRID.has(variant);
  const circleFilled = isCircleFilled(variant);

  // circle-grid-filled: measure the container so the filled-circle overlay
  // below can compute cx/cy/outerRadius pixel-for-pixel the same way
  // Recharts itself does (getMaxRadius in its PolarUtils: half of
  // min(width, height) minus the default 5px margin on each side, times
  // the 70% passed to outerRadius) -- height is already known statically
  // via `heights[size]`, only width needs a runtime measurement.
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);
  React.useEffect(() => {
    if (!circleFilled || !containerRef.current) return;
    const el = containerRef.current;
    const observer = new ResizeObserver(([entry]) => setContainerWidth(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, [circleFilled]);

  // grid-filled/circle-grid-filled: augment the shared dataset with N extra
  // fields, each a fixed fraction of the real data's max value, so a
  // background `<Radar>` per level can reuse the exact same geometry as
  // the real series (see the module doc comment for why).
  const chartData = React.useMemo(() => {
    if (!isFilledGrid) return data;
    const maxValue = Math.max(1, ...data.flatMap((d) => [d.value, d.value2 ?? 0]));
    return data.map((d) => {
      const rings: Record<string, number> = {};
      RING_LEVELS.forEach((lvl, i) => { rings[`ring${i}`] = lvl * maxValue; });
      return { ...d, ...rings };
    });
  }, [data, isFilledGrid]);

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

  const height = heights[size];
  const maxRadius = containerWidth > 0 ? Math.min(containerWidth, height) / 2 - 5 : 0;
  const outerR = maxRadius * 0.7;

  return (
    <div ref={containerRef} className={[styles.chart, className ?? ''].filter(Boolean).join(' ')}>
      {/* "circle-grid-filled": concentric filled circles, measured to align
          pixel-for-pixel with Recharts' own circle grid/spokes underneath
          (see the module doc comment). Rendered before ResponsiveContainer
          so the real chart content (including PolarGrid's spokes and ring
          outlines) paints on top of it. */}
      {circleFilled && containerWidth > 0 && (
        <svg className={styles.circleFillSvg} width={containerWidth} height={height}>
          {RING_LEVELS.map((lvl) => (
            <circle key={lvl} cx={containerWidth / 2} cy={height / 2} r={outerR * lvl} fill={chart2} fillOpacity={0.1} />
          ))}
        </svg>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <ReRadarChart data={chartData} outerRadius="70%">
          {/* grid-filled skips PolarGrid's stroked rings entirely -- the
              filled bands are the "grid" there, and stroke lines on top of
              them would just compete visually (Figma's reference has
              none). circle-grid-filled keeps PolarGrid enabled for its
              spokes/ring outlines, on top of the filled circles above. */}
          {!isFilledGrid && (
            <PolarGrid
              gridType={CIRCLE_GRID.has(variant) ? 'circle' : 'polygon'}
              radialLines={variant !== 'circle-grid-no-lines' && !isMinimalGrid}
              stroke={grid}
            />
          )}
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
          <PolarRadiusAxis tick={false} axisLine={false} tickCount={isMinimalGrid ? 2 : undefined} />
          <Tooltip content={<ChartTooltip />} />
          {isMultiple && <Legend wrapperStyle={{ fontSize: 12, fontFamily: 'var(--font-sans)' }} />}
          {isFilledGrid && RING_LEVELS.map((_, i) => (
            <Radar
              key={`ring${i}`}
              dataKey={`ring${i}`}
              stroke="none"
              fill={chart2}
              fillOpacity={0.1}
              isAnimationActive={false}
              legendType="none"
            />
          ))}
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
            fillOpacity={showFill ? (isMinimalGrid ? 1 : showSecondSeries ? 0.45 : 0.5) : 0}
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
