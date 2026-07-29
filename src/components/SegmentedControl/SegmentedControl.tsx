/**
 * SegmentedControl
 *
 * iOS-style toggle group. Matches Figma "Segmented Control" (2-6 buttons).
 * Figma spec: track bg/subtle, radius-md, padding 4, gap 2;
 * active segment bg/surface, radius-sm, label/md fg/default; inactive fg/muted.
 */

import React from 'react';
import styles from './SegmentedControl.module.css';

export interface SegmentedOption {
  value: string;
  label: string;
}

export interface SegmentedControlProps {
  options: SegmentedOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Stretch the track to fill its container; segments then share the width equally. */
  fullWidth?: boolean;
  className?: string;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options, value, defaultValue, onChange, fullWidth,
  className,
}) => {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? options[0]?.value);
  const active = isControlled ? value : internal;

  const select = (v: string) => {
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };

  // ---- sliding thumb ----------------------------------------------------
  // The active state is a single element that translates between segments,
  // so switching reads as movement rather than one background swapping for
  // another. Position is measured from the DOM so it survives any width.
  const trackRef = React.useRef<HTMLDivElement>(null);
  const segRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});
  const [thumb, setThumb] = React.useState<{ left: number; width: number } | null>(null);
  const [ready, setReady] = React.useState(false);

  React.useLayoutEffect(() => {
    const measure = () => {
      const el = segRefs.current[active];
      const track = trackRef.current;
      if (!el || !track) return;
      setThumb({ left: el.offsetLeft, width: el.offsetWidth });
    };
    measure();
    // settle before enabling the transition, so the thumb doesn't fly in on mount
    const id = window.requestAnimationFrame(() => setReady(true));
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => { window.cancelAnimationFrame(id); ro.disconnect(); };
  }, [active, options]);

  return (
    <div
      ref={trackRef}
      role="tablist"
      className={[styles.track, fullWidth ? styles['track--fullWidth'] : '', className ?? '']
        .filter(Boolean).join(' ')}
    >
      {thumb && (
        <span
          aria-hidden="true"
          className={[styles.thumb, ready ? styles['thumb--animated'] : ''].filter(Boolean).join(' ')}
          style={{ transform: `translateX(${thumb.left}px)`, width: thumb.width }}
        />
      )}
      {options.map((opt) => {
        const isActive = opt.value === active;
        return (
          <button
            key={opt.value}
            ref={(el) => { segRefs.current[opt.value] = el; }}
            role="tab"
            type="button"
            aria-selected={isActive}
            className={[styles.segment, isActive ? styles['segment--active'] : ''].filter(Boolean).join(' ')}
            onClick={() => select(opt.value)}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

export default SegmentedControl;
