/**
 * Balance
 *
 * Prominent balance display. Matches Figma "Balance" (4 style previews --
 * Default, Hidden, With Change, Progress -- collapsed here into composable
 * props rather than a single Figma-mirroring `variant` enum, since they're
 * genuinely independent pieces of the same widget, not mutually exclusive):
 *
 *   - label row: caption + a bare Eye/EyeOff icon (no button chrome, just a
 *     contrast bump on hover) that masks the value
 *   - big value (display/xl, 40px) -- masked as a random alphanumeric
 *     string the same length as the real value, not dots
 *   - optional change row: trend icon + colored delta (also masked when
 *     hidden, rather than the whole row disappearing) + caption
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
import { iconStrokeWidth } from '../../../lib/iconStrokeWidth';
import styles from './Balance.module.css';

const MASK_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const MASK_MAX_LENGTH = 8;
const GLITCH_FRAMES = 6;
const GLITCH_INTERVAL_MS = 90;

/** Same length as the real string (capped at 8), so the masked value keeps
 * roughly the same visual weight instead of running arbitrarily long. */
const randomMask = (length: number) => {
  const len = Math.min(length, MASK_MAX_LENGTH);
  return Array.from({ length: len }, () => MASK_CHARS[Math.floor(Math.random() * MASK_CHARS.length)]).join('');
};

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

  // Show -> hidden runs a brief scramble (a handful of random re-rolls in
  // quick succession) before settling, rather than snapping straight to the
  // final masked string. Only the reveal-to-mask direction glitches, per
  // the ask -- unhiding just shows the real value immediately.
  const [isGlitching, setIsGlitching] = React.useState(false);
  const [glitchTick, setGlitchTick] = React.useState(0);
  const wasHiddenRef = React.useRef(false);

  React.useEffect(() => {
    if (isHidden && !wasHiddenRef.current) {
      setIsGlitching(true);
      let frame = 0;
      const id = setInterval(() => {
        frame += 1;
        setGlitchTick((t) => t + 1);
        if (frame >= GLITCH_FRAMES) {
          clearInterval(id);
          setIsGlitching(false);
        }
      }, GLITCH_INTERVAL_MS);
      wasHiddenRef.current = true;
      return () => clearInterval(id);
    }
    wasHiddenRef.current = isHidden;
  }, [isHidden]);

  // Depends on glitchTick so each scramble frame re-rolls the mask; once the
  // interval above stops advancing it, the mask stays put like the plain
  // memoized version this replaced.
  const maskedValue = React.useMemo(() => randomMask(value.length), [value, glitchTick]);
  const maskedChange = React.useMemo(
    () => (change ? randomMask(change.value.length) : ''),
    [change?.value, glitchTick],
  );

  const content = (
    <div className={styles.content}>
      <div className={styles.labelRow}>
        <p className={styles.label}>{label}</p>
        <button
          type="button"
          className={styles.hideToggle}
          aria-label={isHidden ? 'Show balance' : 'Hide balance'}
          onClick={toggleHidden}
        >
          {isHidden
            ? <EyeOff size={16} strokeWidth={iconStrokeWidth(16)} />
            : <Eye size={16} strokeWidth={iconStrokeWidth(16)} />}
        </button>
      </div>
      <p
        className={[
          styles.value,
          isHidden ? styles['value--hidden'] : '',
          isGlitching ? styles['value--glitching'] : '',
        ].filter(Boolean).join(' ')}
      >
        {isHidden ? maskedValue : value}
      </p>
      {change && (
        <div className={styles.changeRow}>
          <TrendIcon
            size={24}
            strokeWidth={1.5}
            className={direction === 'up' ? styles.trendIcon__up : styles.trendIcon__down}
          />
          <span
            className={[
              direction === 'up' ? styles.changeValue__up : styles.changeValue__down,
              isGlitching ? styles['value--glitching'] : '',
            ].filter(Boolean).join(' ')}
          >
            {isHidden ? maskedChange : change.value}
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
