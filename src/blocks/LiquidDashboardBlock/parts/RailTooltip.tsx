import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePortalThemeClass } from '../../../lib/usePortalThemeClass';
import styles from './RailTooltip.module.css';

/**
 * The collapsed rail's tooltip: the library Tooltip, but portaled to <body> and
 * positioned with `fixed`. The rail scrolls (so it clips anything that sticks out
 * of it) and the main panel is painted after it (so it would cover a tooltip that
 * did escape); a portal avoids both. Shows on hover and keyboard focus, closes on
 * leave, blur and Esc.
 */
export const RailTooltip: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const anchorRef = useRef<HTMLSpanElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const theme = usePortalThemeClass(anchorRef, !!pos);

  const show = useCallback(() => {
    const r = anchorRef.current?.getBoundingClientRect();
    if (r) setPos({ top: r.top + r.height / 2, left: r.right + 10 });
  }, []);
  const hide = useCallback(() => setPos(null), []);

  useEffect(() => {
    if (!pos) return undefined;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') hide(); };
    document.addEventListener('keydown', onKey);
    window.addEventListener('scroll', hide, true);
    window.addEventListener('resize', hide);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', hide, true);
      window.removeEventListener('resize', hide);
    };
  }, [pos, hide]);

  return (
    <span ref={anchorRef} className={styles.anchor} onPointerEnter={show} onPointerLeave={hide} onFocus={show} onBlur={hide}>
      {children}
      {pos && typeof document !== 'undefined' && createPortal(
        <span role="tooltip" className={[styles.bubble, theme].filter(Boolean).join(' ')} style={{ top: pos.top, left: pos.left }}>
          <span className={styles.caret} aria-hidden="true" />
          {title}
        </span>,
        document.body,
      )}
    </span>
  );
};
