/**
 * ListItem
 *
 * Row for lists/menus. Matches Figma "List Item": State (Default|Hover|Selected),
 * Title/Description toggles. Figma spec: bg/surface, radius-sm, padding 10/12, gap 12,
 * title label/md fg/default, description body/xs fg/muted.
 * Supports leading (icon/avatar) and trailing (badge/action) slots.
 */

import React from 'react';
import styles from './ListItem.module.css';

export interface ListItemProps {
  title: string;
  description?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export const ListItem: React.FC<ListItemProps> = ({
  title, description, leading, trailing, selected, disabled, onClick, className,
}) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    aria-current={selected ? 'true' : undefined}
    className={[
      styles.item,
      selected ? styles['item--selected'] : '',
      disabled ? styles['item--disabled'] : '',
      className ?? '',
    ].filter(Boolean).join(' ')}
  >
    {leading && <span className={styles.item__leading}>{leading}</span>}

    <span className={styles.item__text}>
      <span className={styles.item__title}>{title}</span>
      {description && <span className={styles.item__description}>{description}</span>}
    </span>

    {trailing && <span className={styles.item__trailing}>{trailing}</span>}
  </button>
);

export default ListItem;
