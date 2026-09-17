/**
 * Popover
 *
 * Floating panel anchored to a trigger. Matches Figma "Popover" (Buttons 1-3),
 * with title/description toggles.
 *
 * Figma spec: bg/surface, border/subtle 1px, radius-md (8), padding 16, gap 10, shadow/lg.
 * Opens on trigger click; closes on outside click or Escape.
 */

import React from 'react';
import styles from './Popover.module.css';

export type PopoverPlacement = 'bottom' | 'top' | 'bottom-start' | 'bottom-end';

/** Keep in step with the panel animation duration in Popover.module.css. */
const PANEL_EXIT_MS = 180;

export interface PopoverProps {
  /** The clickable element that toggles the popover. */
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  /** Footer actions (1-3 buttons). */
  actions?: React.ReactNode;
  placement?: PopoverPlacement;
  children?: React.ReactNode;
  className?: string;
}

export const Popover: React.FC<PopoverProps> = ({
  trigger, title, description, actions, placement = 'bottom-start', children, className,
}) => {
  const [open, setOpen] = React.useState(false);
  // Kept mounted past `open` so the exit animation has something to play on.
  // Same arrangement Select and Combobox already use for their panels; this
  // one appeared and vanished instantly, which is what made it feel abrupt
  // next to them.
  const [mounted, setMounted] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const lastFocus = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  // onAnimationEnd alone isn't enough to unmount. It never fires if the
  // animation doesn't actually run -- a backgrounded tab, a user stylesheet
  // or extension that kills animations -- and the panel would then sit
  // mounted and invisible over the page, still focusable. This guarantees it
  // goes away; whichever happens first wins.
  React.useEffect(() => {
    if (open || !mounted) return;
    const timer = setTimeout(() => setMounted(false), PANEL_EXIT_MS + 60);
    return () => clearTimeout(timer);
  }, [open, mounted]);

  // Dismiss on outside click or Escape while open.
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => { if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Restore focus to the trigger when the popover closes (keyboard UX).
  React.useEffect(() => {
    if (!open && lastFocus.current) { lastFocus.current.focus(); lastFocus.current = null; }
  }, [open]);

  return (
    <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')} ref={rootRef}>
      <span className={styles.trigger} onClick={() => { if (!open) lastFocus.current = document.activeElement as HTMLElement; setOpen((o) => !o); }}>{trigger}</span>

      {mounted && (
        <div
          className={[
            styles.panel,
            styles[`panel--${placement}`],
            open ? styles['panel--entering'] : styles['panel--exiting'],
          ].filter(Boolean).join(' ')}
          role="dialog"
          /* animationend bubbles, so anything animating inside the panel
             would otherwise unmount it mid-life. */
          onAnimationEnd={(e) => { if (e.target === e.currentTarget && !open) setMounted(false); }}
        >
          {title && <div className={styles.panel__title}>{title}</div>}
          {description && <div className={styles.panel__description}>{description}</div>}
          {children && <div className={styles.panel__body}>{children}</div>}
          {actions && <div className={styles.panel__actions}>{actions}</div>}
        </div>
      )}
    </div>
  );
};

export default Popover;
