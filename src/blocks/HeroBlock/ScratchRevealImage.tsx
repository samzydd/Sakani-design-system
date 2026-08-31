/**
 * ScratchRevealImage
 *
 * A "scratch card" effect: `backSrc` sits underneath a canvas painted
 * with `frontSrc`; dragging/swiping over it (mouse or touch, unified
 * via Pointer Events) erases the canvas along the pointer's path using
 * `globalCompositeOperation: 'destination-out'`, revealing the real
 * image beneath wherever it's been "scratched." Colocated with
 * HeroBlock rather than exported as a shared primitive, since it's a
 * one-off interaction for this block's own image slot, not a general
 * design-system component.
 *
 * Erasing is done as filled circles interpolated along the segment
 * between the last and current pointer position (not just at each
 * move event's own point) -- a fast swipe can jump several pixels
 * between two consecutive pointermove events, and erasing only at
 * those two endpoints would leave visible gaps in the "scratched"
 * trail instead of a continuous line.
 *
 * The canvas is resized (and its scratch progress reset) whenever the
 * container's own size changes, via ResizeObserver -- same technique
 * used elsewhere in this library for live-measured layout. Resetting
 * progress on resize is a deliberate simplification: preserving
 * scratched pixels across a resize would mean re-mapping every erased
 * coordinate to the new dimensions, which is real complexity this
 * interaction doesn't need for a hero image that isn't expected to
 * resize while someone's mid-scratch.
 */

import React from 'react';
import styles from './ScratchRevealImage.module.css';

export interface ScratchRevealImageProps {
  frontSrc: string;
  backSrc: string;
  alt?: string;
  /** Radius, in px, of the eraser brush. Defaults to 36. */
  brushSize?: number;
  className?: string;
}

export const ScratchRevealImage: React.FC<ScratchRevealImageProps> = ({
  frontSrc, backSrc, alt, brushSize = 36, className,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const isDrawingRef = React.useRef(false);
  const lastPointRef = React.useRef<{ x: number; y: number } | null>(null);

  const erase = React.useCallback((x: number, y: number) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();
  }, [brushSize]);

  const eraseLine = React.useCallback((from: { x: number; y: number }, to: { x: number; y: number }) => {
    const distance = Math.hypot(to.x - from.x, to.y - from.y);
    const steps = Math.max(1, Math.ceil(distance / (brushSize / 2)));
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      erase(from.x + (to.x - from.x) * t, from.y + (to.y - from.y) * t);
    }
  }, [brushSize, erase]);

  // Paints the front image onto the canvas at its current rendered
  // size -- re-run whenever the container resizes (see file doc for
  // why that also resets scratch progress).
  React.useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let cancelled = false;
    const paint = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      canvas.width = rect.width;
      canvas.height = rect.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      img.src = frontSrc;
    };
    paint();

    const observer = new ResizeObserver(paint);
    observer.observe(container);
    return () => { cancelled = true; observer.disconnect(); };
  }, [frontSrc]);

  const pointFromEvent = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    isDrawingRef.current = true;
    const point = pointFromEvent(e);
    lastPointRef.current = point;
    erase(point.x, point.y);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const point = pointFromEvent(e);
    if (lastPointRef.current) eraseLine(lastPointRef.current, point);
    lastPointRef.current = point;
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
  };

  return (
    <div ref={containerRef} className={[styles.root, className ?? ''].filter(Boolean).join(' ')} role="img" aria-label={alt ?? ''}>
      <img src={backSrc} alt="" className={styles.back} />
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDrawing}
        onPointerLeave={stopDrawing}
        onPointerCancel={stopDrawing}
        aria-hidden="true"
      />
    </div>
  );
};

export default ScratchRevealImage;
