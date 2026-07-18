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
  const rootRef = React.useRef<HTMLDivElement>(null);
  const lastFocus = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => { if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    // Restore focus to the trigger when the popover closes (keyboard UX).
  React.useEffect(() => {
    if (!open && lastFocus.current) { lastFocus.current.focus(); lastFocus.current = null; }
  }, [open]);

  return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')} ref={rootRef}>
      <span className={styles.trigger} onClick={() => { if (!open) lastFocus.current = document.activeElement as HTMLElement; setOpen((o) => !o); }}>{trigger}</span>

      {open && (
        <div className={[styles.panel, styles[`panel--${placement}`]].join(' ')} role="dialog">
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
