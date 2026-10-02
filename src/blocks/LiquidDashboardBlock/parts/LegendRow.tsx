import { Badge } from '../../../components/Badge';
import styles from './LegendRow.module.css';

interface LegendRowProps {
  /** 1-5 — indexes into the shared --color-chart-N tokens, matching chart segment order. */
  colorIndex: number;
  label: string;
  value: string;
}

/** Colored swatch + label + value pill, for chart legends (Figma "Channel" rows). */
export function LegendRow({ colorIndex, label, value }: LegendRowProps) {
  return (
    <div className={styles.row}>
      <span className={styles.swatch} style={{ background: `var(--color-chart-${colorIndex})` }} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
      <Badge variant="neutral" emphasis="subtle">{value}</Badge>
    </div>
  );
}
