/**
 * RadialChart
 *
 * Recharts wrapper styled with Sakani chart tokens. Matches Figma's "Radial
 * chart" component set (8 variants):
 *
 *   multi          — one concentric ring per data row, full circle
 *   grid           — "multi" + a faint polar grid (spokes + rings) behind it
 *   text           — one thick ring + center value/caption
 *   gauge-tick     — a dial built from individual radial tick marks
 *   stacked-label  — "multi" + a center value/caption overlay
 *   shape          — a single 240° gauge arc, data rows stacked angularly
 *                    (not concentric), remainder shown as a track
 *   stacked        — same 240° gauge arc, no track (rows fill it exactly)
 *   stacked-3-layers — same idea as a full 360° ring instead of a gauge arc
 *
 * `gauge-tick` (individual tick marks) and `shape`/`stacked`/
 * `stacked-3-layers` (angularly-stacked segments in one band) have no
 * RadialBarChart equivalent -- RadialBarChart only stacks rows as
 * concentric rings, never as angular segments sharing one ring -- so all
 * four are hand-rolled SVG using the exported `Sector` primitive, same
 * call as HeatmapChart/FunnelChart. "multi"/"grid"/"text"/"stacked-label"
 * are genuine concentric-ring cases, so those stay thin RadialBarChart
 * wrappers.
 */

import React from 'react';
import { RadialBarChart, RadialBar, Cell, Sector, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import { useThemeTick } from '../../lib/useThemeTick';
import styles from './RadialChart.module.css';

export type ChartSize = 'sm' | 'md' | 'lg' | 'xl';
export type RadialChartVariant =
  | 'multi' | 'grid' | 'text' | 'shape' | 'gauge-tick' | 'stacked' | 'stacked-3-layers' | 'stacked-label';

export interface RadialDatum { label: string; value: number; max?: number; }

export interface RadialChartProps {
  data: RadialDatum[];
  variant?: RadialChartVariant;
  size?: ChartSize;
  centerValue?: string;
  centerCaption?: string;
  className?: string;
}

const dims: Record<ChartSize, number> = { sm: 180, md: 220, lg: 280, xl: 340 };
const cssVar = (name: string) =>
  typeof window !== 'undefined'
    ? getComputedStyle(document.documentElement).getPropertyValue(name).trim() || undefined
    : undefined;

const RAD = Math.PI / 180;

// [innerRadius%, outerRadius%] of the chart's own max radius, for the
// RadialBarChart-backed ring variants only.
const RADIUS_BAND: Partial<Record<RadialChartVariant, [string, string]>> = {
  multi: ['30%', '100%'],
  grid: ['30%', '100%'],
  'stacked-label': ['30%', '100%'],
  text: ['76%', '100%'],
};

const GaugeTick: React.FC<{ value: number; max: number; color: string; track: string; centerValue?: string; centerCaption?: string }> = ({
  value, max, color, track, centerValue, centerCaption,
}) => {
  const TICKS = 40;
  const cx = 100;
  const cy = 100;
  const startDeg = 180; // gauge sweeps the top half, left to right
  const sweepDeg = 180;
  const filled = Math.round((Math.min(value, max) / max) * TICKS);
  return (
    <svg viewBox="0 0 200 120" className={styles.gaugeSvg}>
      {Array.from({ length: TICKS }).map((_, i) => {
        const deg = startDeg + (i / (TICKS - 1)) * sweepDeg;
        const outerR = 92;
        const innerR = 78;
        const x1 = cx + innerR * Math.cos(deg * RAD);
        const y1 = cy + innerR * Math.sin(deg * RAD);
        const x2 = cx + outerR * Math.cos(deg * RAD);
        const y2 = cy + outerR * Math.sin(deg * RAD);
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={i < filled ? color : track}
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        );
      })}
      {(centerValue || centerCaption) && (
        <g textAnchor="middle" fontFamily="var(--font-sans)">
          {centerValue && <text x={cx} y={cy - 8} fontSize={22} fontWeight={500} fill={cssVar('--color-fg-default') ?? '#141414'}>{centerValue}</text>}
          {centerCaption && <text x={cx} y={cy + 12} fontSize={12} fill={cssVar('--color-fg-muted') ?? '#78716a'}>{centerCaption}</text>}
        </g>
      )}
    </svg>
  );
};

const PolarGrid: React.FC<{ rings: number; spokes: number; color: string }> = ({ rings, spokes, color }) => (
  <svg viewBox="0 0 200 200" className={styles.gridSvg}>
    {Array.from({ length: rings }).map((_, i) => (
      <circle key={i} cx={100} cy={100} r={((i + 1) / rings) * 96} fill="none" stroke={color} strokeWidth={1} />
    ))}
    {Array.from({ length: spokes }).map((_, i) => {
      const deg = (i / spokes) * 360;
      const x = 100 + 96 * Math.cos(deg * RAD);
      const y = 100 + 96 * Math.sin(deg * RAD);
      return <line key={i} x1={100} y1={100} x2={x} y2={y} stroke={color} strokeWidth={1} />;
    })}
  </svg>
);

// "shape"/"stacked"/"stacked-3-layers": data rows stacked *angularly* in
// one ring band (not concentric rings), sweeping either a 240° gauge arc
// (shape/stacked) or the full 360° circle (stacked-3-layers). A gray track
// sector fills whatever's left over when the rows don't add up to `max`.
const ArcGauge: React.FC<{
  data: RadialDatum[]; palette: string[]; track: string; full: boolean;
  centerValue?: string; centerCaption?: string;
}> = ({ data, palette, track, full, centerValue, centerCaption }) => {
  const cx = 100;
  const cy = 100;
  const outerR = 88;
  const innerR = full ? 74 : 64;
  const startDeg = full ? 90 : 210;
  const endDeg = full ? -270 : -30;
  const sweepDeg = startDeg - endDeg;
  const max = data[0]?.max ?? data.reduce((sum, d) => sum + d.value, 0);
  let cursor = startDeg;
  const segments = data.map((d, i) => {
    const segSweep = max > 0 ? (d.value / max) * sweepDeg : 0;
    const segStart = cursor;
    const segEnd = cursor - segSweep;
    cursor = segEnd;
    return { segStart, segEnd, fill: palette[i % palette.length] };
  });
  return (
    <svg viewBox={full ? '0 0 200 200' : '0 0 200 150'} className={styles.gaugeSvg}>
      {segments.map((s, i) => (
        <Sector key={i} cx={cx} cy={cy} innerRadius={innerR} outerRadius={outerR} startAngle={s.segStart} endAngle={s.segEnd} fill={s.fill} cornerRadius={4} />
      ))}
      {cursor > endDeg + 0.5 && (
        <Sector cx={cx} cy={cy} innerRadius={innerR} outerRadius={outerR} startAngle={cursor} endAngle={endDeg} fill={track} cornerRadius={4} />
      )}
      {(centerValue || centerCaption) && (
        <g textAnchor="middle" fontFamily="var(--font-sans)">
          {centerValue && <text x={cx} y={full ? cy - 6 : cy - 22} fontSize={26} fontWeight={500} fill={cssVar('--color-fg-default') ?? '#141414'}>{centerValue}</text>}
          {centerCaption && <text x={cx} y={full ? cy + 16 : cy} fontSize={13} fill={cssVar('--color-fg-muted') ?? '#78716a'}>{centerCaption}</text>}
        </g>
      )}
    </svg>
  );
};

export const RadialChart: React.FC<RadialChartProps> = ({
  data, variant = 'multi', size = 'md', centerValue, centerCaption, className,
}) => {
  useThemeTick();
  const palette = [1, 2, 3, 4, 5].map((n) => cssVar(`--color-chart-${n}`) ?? '#ff4700');
  const track = cssVar('--color-bg-subtle') ?? '#f5f4f2';
  const gridColor = cssVar('--color-border-subtle') ?? '#e5e4e7';
  const h = dims[size];

  if (variant === 'gauge-tick') {
    const d = data[0];
    return (
      <div className={[styles.chart, className ?? ''].filter(Boolean).join(' ')} style={{ height: h }}>
        <GaugeTick
          value={d?.value ?? 0}
          max={d?.max ?? 100}
          color={palette[0]}
          track={track}
          centerValue={centerValue}
          centerCaption={centerCaption}
        />
      </div>
    );
  }

  if (variant === 'shape' || variant === 'stacked' || variant === 'stacked-3-layers') {
    return (
      <div className={[styles.chart, className ?? ''].filter(Boolean).join(' ')} style={{ height: h }}>
        <ArcGauge
          data={data}
          palette={palette}
          track={track}
          full={variant === 'stacked-3-layers'}
          centerValue={centerValue}
          centerCaption={centerCaption}
        />
      </div>
    );
  }

  const [innerR, outerR] = RADIUS_BAND[variant] ?? ['30%', '100%'];
  const showCenter = variant === 'stacked-label' && (centerValue || centerCaption);

  return (
    <div className={[styles.chart, className ?? ''].filter(Boolean).join(' ')} style={{ height: h }}>
      {variant === 'grid' && <PolarGrid rings={4} spokes={12} color={gridColor} />}
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          data={data}
          innerRadius={innerR}
          outerRadius={outerR}
          startAngle={90}
          endAngle={-270}
          barCategoryGap="12%"
        >
          <PolarAngleAxis type="number" domain={[0, data[0]?.max ?? 100]} tick={false} axisLine={false} />
          {/* See DonutChart.tsx: Recharts 3.9.2 can commit Sector-based
              shapes' (Pie, RadialBar) entrance animation on an empty
              intermediate frame and never repaint past it -- confirmed here
              too (background track rendered, the actual value arcs didn't,
              until this was added). */}
          <RadialBar
            dataKey="value"
            // "grid" relies on the polar grid itself as the backdrop --  a
            // solid track disc would paint over the grid lines completely
            // (they share the same 30%-100% band), so it's disabled there.
            background={variant === 'grid' ? false : { fill: track }}
            cornerRadius={8}
            isAnimationActive={false}
          >
            {data.map((_, i) => <Cell key={i} fill={palette[i % palette.length]} />)}
          </RadialBar>
        </RadialBarChart>
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

export default RadialChart;
