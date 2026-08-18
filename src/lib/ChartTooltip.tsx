/**
 * ChartTooltip
 *
 * Shared hover-card content for every Recharts `<Tooltip>` in the system.
 * Recharts' own default tooltip renders colored *text*, not the 8px
 * colored ellipse Figma's "Chart Tooltip" spec calls for next to each row
 * -- so every chart passes this in as `content` instead of relying on the
 * default renderer + `contentStyle`.
 */

import React from 'react';
import styles from './ChartTooltip.module.css';

export interface ChartTooltipPayloadEntry {
  name?: string;
  value?: number | string;
  color?: string;
  fill?: string;
  payload?: { fill?: string; [key: string]: unknown };
}

export interface ChartTooltipProps {
  active?: boolean;
  payload?: ChartTooltipPayloadEntry[];
  label?: string;
  /** Custom value formatter, e.g. for percentages. */
  formatter?: (value: ChartTooltipPayloadEntry['value'], name: ChartTooltipPayloadEntry['name']) => React.ReactNode;
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({ active, payload, label, formatter }) => {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className={styles.tooltip}>
      {label !== undefined && label !== '' && <span className={styles.title}>{label}</span>}
      {payload.map((entry, i) => (
        <div key={i} className={styles.row}>
          <span className={styles.dot} style={{ background: entry.color ?? entry.payload?.fill ?? entry.fill }} />
          <span className={styles.label}>{entry.name}</span>
          <span className={styles.value}>{formatter ? formatter(entry.value, entry.name) : entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default ChartTooltip;
