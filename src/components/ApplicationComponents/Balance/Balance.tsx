/**
 * Balance
 *
 * Prominent balance display. Matches Figma "Balance" (4 style previews --
 * Default, Hidden, With Change, Progress -- collapsed here into composable
 * props rather than a single Figma-mirroring `variant` enum, since they're
 * genuinely independent pieces of the same widget, not mutually exclusive):
 *
 *   - label row: caption + an Eye/EyeOff toggle that masks the value
 *   - big value (display/xl, 40px)
 *   - optional change row: trend icon + colored delta + caption
 *   - optional progress ring: shown beside the content when `progress` is set
 *
 * The ring isn't a reuse of RadialChart -- its smallest preset is 180px vs.
 * the ~96px needed here, and its variants are either concentric rings or a
 * 240° gauge, not this near-full ring-with-neutral-track. Recharts'
 * RadialBar `background` prop is built for exactly that pattern, so this is
 * a small dedicated chart, same call already made for the AvatarUpload
 * camera badge and ActivityFeed's rail connector.
 */

import React from 'react';
import { Eye, EyeOff, TrendingUp, TrendingDown } from 'lucide-react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { useThemeTick } from '../../../lib/useThemeTick';
import { IconButton } from '../../IconButton';
import styles from './Balance.module.css';

export interface BalanceChangeInfo {
  /** e.g. "+$1,240.50" -- sign/formatting is the caller's responsibility. */
  value: string;
  /** Defaults to "this month". */
  label?: string;
  direction?: 'up' | 'down';
}

export interface BalanceProps {
  label?: string;
  value: string;
  change?: BalanceChangeInfo;
  /** 0-100. Renders the small progress ring beside the content when set. */
  progress?: number;
  /** Controlled masked state. Omit to let the component manage it itself. */
  hidden?: boolean;
  onToggleHidden?: (hidden: boolean) => void;
  className?: string;
}

const cssVar = (name: string) =>
  typeof window !== 'undefined'
    ? getComputedStyle(document.documentElement).getPropertyValue(name).trim() || undefined
    : undefined;

const ProgressRing: React.FC<{ progress: number }> = ({ progress }) => {
  useThemeTick();
  const fill = cssVar('--color-chart-1') ?? '#ff4700';
  const track = cssVar('--color-bg-subtle') ?? '#f5f4f2';
  const data = [{ value: Math.max(0, Math.min(100, progress)) }];

  return (
    <div className={styles.ringCard}>
      <ResponsiveContainer width={64} height={64}>
        <RadialBarChart
          data={data}
          startAngle={90}
          endAngle={-270}
          innerRadius="72%"
          outerRadius="100%"
          barSize={10}
        >
          {/* RadialBarChart otherwise scales its domain from the data's own
              max -- a single row with value=65 would render as a full
              circle (100%) instead of 65% without this. */}
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} axisLine={false} />
          <RadialBar
            dataKey="value"
            cornerRadius={5}
            fill={fill}
            background={{ fill: track }}
            // See DonutChart.tsx -- Recharts 3.9.2 can commit a Sector-based
            // shape's entrance animation on an empty intermediate frame and
            // never repaint past it.
            isAnimationActive={false}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const Balance: React.FC<BalanceProps> = ({
  label = 'Available balance', value, change, progress,
  hidden, onToggleHidden, className,
}) => {
  const isControlled = hidden !== undefined;
  const [internalHidden, setInternalHidden] = React.useState(false);
  const isHidden = isControlled ? hidden : internalHidden;
  const hasProgress = progress !== undefined;
  const direction = change?.direction ?? 'up';
  const TrendIcon = direction === 'up' ? TrendingUp : TrendingDown;

  const toggleHidden = () => {
    const next = !isHidden;
    onToggleHidden?.(next);
    if (!isControlled) setInternalHidden(next);
  };

  const content = (
    <div className={styles.content}>
      <div className={styles.labelRow}>
        <p className={styles.label}>{label}</p>
        <IconButton
          icon={isHidden ? EyeOff : Eye}
          variant="ghost"
          size="sm"
          aria-label={isHidden ? 'Show balance' : 'Hide balance'}
          onClick={toggleHidden}
        />
      </div>
      <p className={[styles.value, isHidden ? styles['value--hidden'] : ''].filter(Boolean).join(' ')}>
        {isHidden ? '••••••' : value}
      </p>
      {change && !isHidden && (
        <div className={styles.changeRow}>
          <TrendIcon
            size={24}
            strokeWidth={1.5}
            className={direction === 'up' ? styles.trendIcon__up : styles.trendIcon__down}
          />
          <span className={direction === 'up' ? styles.changeValue__up : styles.changeValue__down}>
            {change.value}
          </span>
          <span className={styles.changeLabel}>{change.label ?? 'this month'}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className={[styles.balance, hasProgress ? styles['balance--progress'] : '', className ?? ''].filter(Boolean).join(' ')}>
      {hasProgress && <ProgressRing progress={progress} />}
      {content}
    </div>
  );
};

export default Balance;
