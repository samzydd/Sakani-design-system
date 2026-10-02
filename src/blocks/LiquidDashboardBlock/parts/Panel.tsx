import type { ReactNode } from 'react';
import styles from './Panel.module.css';

interface PanelProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  /** Title + actions share one top-aligned row, description drops to its own
   * full-width line below (Figma "Page Header" Row: Text + Actions) — used
   * by list/table panels like Recent orders. Default: actions render as
   * their own row below the title+description block (chart panels). */
  actionsInline?: boolean;
  children?: ReactNode;
  className?: string;
}

/** Local composition of the Figma "Page Header" (title + description) atop a
 * bordered card — the design system ships the pieces (Badge, Button) but not
 * this specific card shell, so it's assembled here and reused across pages. */
export function Panel({ title, description, actions, actionsInline, children, className }: PanelProps) {
  return (
    <div className={[styles.panel, className ?? ''].filter(Boolean).join(' ')}>
      {actionsInline ? (
        <div className={styles.headerRow}>
          <div className={styles.headerBlock}>
            <h3 className={styles.title}>{title}</h3>
            {description && <p className={styles.description}>{description}</p>}
          </div>
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
      ) : (
        <>
          <div className={styles.headText}>
            <h3 className={styles.title}>{title}</h3>
            {description && <p className={styles.description}>{description}</p>}
          </div>
          {actions && <div className={styles.actions}>{actions}</div>}
        </>
      )}
      {children}
    </div>
  );
}
