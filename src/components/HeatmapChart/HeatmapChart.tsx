/**
 * HeatmapChart
 *
 * Matches Figma's new "Other charts" set ("Heatmap chart" / "Heatmap chart
 * hover"). Recharts has no native heatmap chart type, so this is a plain CSS
 * grid of colored cells rather than a Recharts wrapper -- flagged here the
 * same way RadialChart flags its omitted gauge-tick variant.
 *
 * Cell color is a single-hue chart/1 scale, matching Figma's own look:
 * higher values get a more saturated fill. On hover, the hovered cell goes
 * fully solid and every other cell dims to 45% opacity (a flat dim, not its
 * own value-based shade) -- matching Figma's hover state exactly, and the
 * same "highlight one, dim the rest" pattern used by BarChart.
 */

import React from 'react';
import { useThemeTick } from '../../lib/useThemeTick';
import styles from './HeatmapChart.module.css';

export type ChartSize = 'sm' | 'md' | 'lg' | 'xl';

export interface HeatmapChartProps {
  /** Row-major matrix of values; every row must be the same length. */
  data: number[][];
  rowLabels?: string[];
  colLabels?: string[];
  /** Legend label for the tooltip's value row (Figma: "Revenue"). */
  valueLabel?: string;
  size?: ChartSize;
  className?: string;
}

const cssVar = (name: string) =>
  typeof window !== 'undefined'
    ? getComputedStyle(document.documentElement).getPropertyValue(name).trim() || undefined
    : undefined;

// Figma's palest cell is still visibly tinted, not near-white.
const MIN_OPACITY = 0.12;
const DIM_OPACITY = 0.45;

export const HeatmapChart: React.FC<HeatmapChartProps> = ({
  data, rowLabels, colLabels, valueLabel = 'Value', size = 'md', className,
}) => {
  useThemeTick();
  const [hover, setHover] = React.useState<{ row: number; col: number } | null>(null);
  const chart1 = cssVar('--color-chart-1') ?? '#ff4700';
  const max = Math.max(1, ...data.flat());
  const cols = data[0]?.length ?? 0;

  return (
    <div className={[styles.chart, styles[`chart--${size}`], className ?? ''].filter(Boolean).join(' ')}>
      <div className={styles.grid} style={{ gridTemplateColumns: `auto repeat(${cols}, 1fr)` }}>
        {data.map((row, r) => (
          <React.Fragment key={r}>
            <span className={styles.rowLabel}>{rowLabels?.[r] ?? ''}</span>
            {row.map((value, c) => {
              const isHovered = hover?.row === r && hover?.col === c;
              const dimmed = hover !== null && !isHovered;
              const opacity = isHovered ? 1 : MIN_OPACITY + (value / max) * (1 - MIN_OPACITY);
              return (
                <div
                  key={c}
                  className={styles.cell}
                  style={{ background: chart1, opacity: dimmed ? DIM_OPACITY : opacity }}
                  onMouseEnter={() => setHover({ row: r, col: c })}
                  onMouseLeave={() => setHover(null)}
                >
                  {isHovered && (
                    <div className={styles.tooltip}>
                      <span className={styles.tooltip__title}>
                        {[rowLabels?.[r], colLabels?.[c]].filter(Boolean).join(' · ') || `Row ${r + 1}, Col ${c + 1}`}
                      </span>
                      <div className={styles.tooltip__row}>
                        <span className={styles.tooltip__dot} />
                        <span className={styles.tooltip__label}>{valueLabel}</span>
                        <span className={styles.tooltip__value}>{value}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
        {colLabels && (
          <>
            <span />
            {colLabels.map((label, c) => <span key={c} className={styles.colLabel}>{label}</span>)}
          </>
        )}
      </div>
    </div>
  );
};

export default HeatmapChart;
