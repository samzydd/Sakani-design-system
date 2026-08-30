/**
 * Marquee
 *
 * Matches Figma "Marquee" (Marketing primitives set, 2 content previews:
 * Logos, Text). Figma's own mock is a static frame, but a marquee by
 * definition scrolls -- same reasoning Ticker already established in
 * this library -- so this renders a genuine infinite horizontal loop:
 * the item row is duplicated back-to-back and translated by exactly one
 * copy's width, measured live via ResizeObserver so the animation
 * duration scales with actual content width rather than a fixed guess
 * (identical technique to Ticker's own track).
 *
 * `content` is NOT a manual style prop: Logos vs. Text are just two
 * different sets of consumer-supplied `items` (ReactNode, not a fixed
 * shape) -- a brand icon or a text fragment are both just children to
 * this component, so it stays fully content-agnostic, same reasoning
 * LoginBlock gives for keeping its own social-icon slot consumer-
 * supplied rather than hardcoding brand marks into the library itself.
 * `gap` is exposed separately since Figma's own two previews use a
 * genuinely different value (32px logos, 12px text) that has nothing to
 * do with the content's own shape.
 *
 * Unlike Ticker (which pauses outright on hover), this slows to 20% of
 * its normal speed on hover rather than stopping -- a deliberate,
 * different interaction for this component, done in pure CSS: the
 * measured duration and a second "5x slower" hover duration are both
 * set as custom properties, and :hover swaps which one the animation
 * uses (making it 5x slower = the 80% speed reduction the duration/speed
 * relationship calls for, not simply "duration + 80%"). `prefers-
 * reduced-motion` disables the animation entirely, same as Ticker.
 */

import React from 'react';
import styles from './Marquee.module.css';

export interface MarqueeProps {
  items: React.ReactNode[];
  /** Scroll speed in pixels/second at rest (pre-hover). Defaults to 40. */
  speed?: number;
  /** Gap between items, in px. Figma uses 32 for Logos, 12 for Text -- no shared default assumption, so this must be passed explicitly. */
  gap: number;
  className?: string;
}

const MarqueeRow: React.FC<{ items: React.ReactNode[]; gap: number; ariaHidden?: boolean }> = ({
  items, gap, ariaHidden,
}) => (
  <div className={styles.row} style={{ gap, paddingRight: gap }} aria-hidden={ariaHidden}>
    {items.map((item, i) => (
      <div className={styles.item} key={i}>{item}</div>
    ))}
  </div>
);

export const Marquee: React.FC<MarqueeProps> = ({ items, speed = 40, gap, className }) => {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [duration, setDuration] = React.useState(20);

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const firstRow = track.firstElementChild as HTMLElement | null;
    if (!firstRow) return;

    const measure = () => {
      const width = firstRow.scrollWidth;
      if (width > 0) setDuration(width / speed);
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(firstRow);
    return () => observer.disconnect();
  }, [items, gap, speed]);

  return (
    <div className={[styles.marquee, className ?? ''].filter(Boolean).join(' ')}>
      <div
        ref={trackRef}
        className={styles.track}
        style={{
          '--marquee-duration': `${duration}s`,
          /* 20% speed = 5x the duration -- see file doc. */
          '--marquee-duration-hover': `${duration * 5}s`,
        } as React.CSSProperties}
      >
        <MarqueeRow items={items} gap={gap} />
        <MarqueeRow items={items} gap={gap} ariaHidden />
      </div>
      <div className={styles.fadeLeft} aria-hidden="true" />
      <div className={styles.fadeRight} aria-hidden="true" />
    </div>
  );
};

export default Marquee;
