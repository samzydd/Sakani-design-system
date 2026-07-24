/**
 * EmptyState
 *
 * Reusable empty/error content for tables, lists, and cards. Matches the
 * Figma "Empty State" set:
 *
 *   type (Figma "Type" axis) -> no-data | no-results | error
 *
 * Icon chip + title + description + optional action button. The error type
 * uses the danger token on its chip; the others use a neutral chip.
 */

import React from 'react';
import { Inbox, Search, CircleAlert } from 'lucide-react';
import styles from './EmptyState.module.css';

export type EmptyStateType = 'no-data' | 'no-results' | 'error';

export interface EmptyStateProps {
  type?: EmptyStateType;
  title?: string;
  description?: string;
  /** Optional action button label. Omit to hide the button. */
  actionLabel?: string;
  onAction?: () => void;
  /** Override the default icon for the type. */
  icon?: React.ReactNode;
  className?: string;
}

const DEFAULTS: Record<EmptyStateType, { icon: React.ReactNode; title: string; description: string }> = {
  'no-data':    { icon: <Inbox size={18} />,       title: 'No data yet',        description: 'Records will appear here once they are added.' },
  'no-results': { icon: <Search size={18} />,      title: 'No results found',   description: 'Try adjusting your search or removing filters.' },
  'error':      { icon: <CircleAlert size={18} />, title: "Couldn't load data", description: 'Something went wrong while fetching records.' },
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'no-data',
  title,
  description,
  actionLabel,
  onAction,
  icon,
  className,
}) => {
  const d = DEFAULTS[type];
  return (
    <div className={[styles.empty, className ?? ''].filter(Boolean).join(' ')} role="status">
      <span className={[styles.empty__chip, styles[`empty__chip--${type}`]].join(' ')} aria-hidden="true">
        {icon ?? d.icon}
      </span>
      <p className={styles.empty__title}>{title ?? d.title}</p>
      <p className={styles.empty__desc}>{description ?? d.description}</p>
      {actionLabel && (
        <button type="button" className={styles.empty__action} onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
