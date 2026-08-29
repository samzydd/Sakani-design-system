/**
 * AppHeaderBlock — Blocks / Application / App Header
 *
 * A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
 * your project and edit it directly.
 *
 * Page-level header: breadcrumb trail, title + optional description, and
 * right-aligned actions, sitting above a divider. Matches Figma "App Header"
 * (Breadcrumb + "Page Header" stacked with a 16px gap) -- both are reused
 * directly: Breadcrumb is the existing shared component unmodified, and
 * Button provides the action buttons.
 *
 * Figma's own two style previews ("Single Action" / "Double Action") differ
 * only in how many buttons are passed and which one is filled -- the last
 * action renders as `primary`, any before it as `secondary`, matching both
 * examples (1 button: primary; 2 buttons: secondary, primary) without a
 * redundant per-action variant prop. An action can still override this via
 * its own `variant` for cases that don't fit the pattern.
 */

import React from 'react';
import { Breadcrumb, type BreadcrumbItem } from '@sakaniui/react';
import { Button, type ButtonVariant } from '@sakaniui/react';
import styles from './AppHeaderBlock.module.css';

export interface AppHeaderBlockAction {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  /** Overrides the position-derived default (last action = primary, rest = secondary). */
  variant?: ButtonVariant;
}

export interface AppHeaderBlockProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  description?: string;
  actions?: AppHeaderBlockAction[];
  className?: string;
}

export const AppHeaderBlock: React.FC<AppHeaderBlockProps> = ({
  breadcrumbs, title, description, actions = [], className,
}) => (
  <div className={[styles.header, className ?? ''].filter(Boolean).join(' ')}>
    <Breadcrumb items={breadcrumbs} />
    <div className={styles.body}>
      <div className={styles.row}>
        <div className={styles.text}>
          <h1 className={styles.title}>{title}</h1>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        {actions.length > 0 && (
          <div className={styles.actions}>
            {actions.map((action, i) => (
              <Button
                key={action.label}
                variant={action.variant ?? (i === actions.length - 1 ? 'primary' : 'secondary')}
                size="md"
                leftIcon={action.icon}
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
      <div className={styles.divider} />
    </div>
  </div>
);

export default AppHeaderBlock;
