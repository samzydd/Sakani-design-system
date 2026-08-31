/**
 * Marquee
 *
 * Matches Figma "Marquee" (Marketing primitives set, 2 content previews:
 * Logos, Text). Figma's own mock is a static frame, but a marquee by
 * definition scrolls -- same reasoning Ticker already established in
 * this library -- so this renders a genuine infinite horizontal loop:
 * the item row is duplicated back-to-back, and the visible copy is
 * translated by exactly one copy's own measured width (via
 * ResizeObserver) before wrapping back to 0 for a seamless loop.
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
 * Unlike Ticker (which pauses outright on hover via a CSS animation-
 * play-state toggle), this slows to 20% of its normal speed on hover
 * rather than stopping -- and that ruled out a CSS @keyframes animation
 * entirely: swapping `animation-duration` on a *running* CSS animation
 * doesn't preserve its visual position, because progress is computed as
 * elapsed-time / duration -- jump the duration up 5x mid-flight and the
 * same elapsed time suddenly reads as a much earlier point in the loop,
 * which looked like the marquee "restarting from the beginning" on
 * hover (confirmed bug, not a one-off glitch). Fixed by driving the
 * scroll with a manual tick loop instead: a plain mutable position (in
 * a ref, not React state, so a hover doesn't even trigger a re-render)
 * accumulates by `speed * deltaTime` every tick and is applied straight
 * to `transform: translateX`, wrapping modulo the row's own width for
 * the loop. Changing `speed` between ticks (hover in/out, read from a
 * ref) just changes the per-tick increment going forward -- the
 * position itself is never recomputed from scratch, so there is no
 * jump, only a smooth change in rate exactly where the scroll already
 * was. `prefers-reduced-motion` skips starting the loop at all, same
 * intent as Ticker's own CSS media-query disable.
 *
 * The loop uses setTimeout, not requestAnimationFrame: real elapsed
 * time (via performance.now()) still drives the per-tick distance, so
 * motion is smooth regardless of the exact fire interval -- rAF is
 * throttled or fully suspended in some embedded/backgrounded contexts
 * in ways setTimeout isn't, and there's no vsync-sync benefit worth
 * trading away for a slow, decorative horizontal scroll.
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
  const rowWidthRef = React.useRef(0);
  const positionRef = React.useRef(0);
  const isHoveredRef = React.useRef(false);

  // Row width feeds the wrap-around modulo below -- kept live via
  // ResizeObserver (content/gap/font changes, container resize) rather
  // than measured once, same reasoning as Ticker's own track.
  React.useEffect(() => {
    const track = trackRef.current;
    const firstRow = track?.firstElementChild as HTMLElement | null;
    if (!firstRow) return;

    const measure = () => { rowWidthRef.current = firstRow.scrollWidth; };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(firstRow);
    return () => observer.disconnect();
  }, [items, gap]);

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    let lastTime = performance.now();

    const tick = () => {
      const time = performance.now();
      const deltaSeconds = (time - lastTime) / 1000;
      lastTime = time;

      const currentSpeed = isHoveredRef.current ? speed * 0.2 : speed;
      const rowWidth = rowWidthRef.current;
      if (rowWidth > 0) {
        positionRef.current = (positionRef.current + currentSpeed * deltaSeconds) % rowWidth;
        track.style.transform = `translateX(-${positionRef.current}px)`;
      }
      timeoutId = setTimeout(tick, 16);
    };
    timeoutId = setTimeout(tick, 16);

    return () => clearTimeout(timeoutId);
  }, [speed]);

  return (
    <div
      className={[styles.marquee, className ?? ''].filter(Boolean).join(' ')}
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
    >
      <div ref={trackRef} className={styles.track}>
        <MarqueeRow items={items} gap={gap} />
        <MarqueeRow items={items} gap={gap} ariaHidden />
      </div>
      <div className={styles.fadeLeft} aria-hidden="true" />
      <div className={styles.fadeRight} aria-hidden="true" />
    </div>
  );
};

export default Marquee;
