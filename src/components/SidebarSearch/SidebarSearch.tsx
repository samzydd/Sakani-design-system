/**
 * SidebarSearch
 *
 * Matches Figma "Sidebar Search": Type (Field | Command) x Collapsed.
 * Figma spec: 36px height, bg/subtle, border/subtle, radius-sm, padding 8/8/8/10,
 * search icon (Lucide), placeholder body/sm fg/subtle.
 * Command type shows a ⌘K hint on the trailing edge.
 */

import React from 'react';
import { Search } from 'lucide-react';
import styles from './SidebarSearch.module.css';

export interface SidebarSearchProps {
  type?: 'field' | 'command';
  placeholder?: string;
  collapsed?: boolean;
  value?: string;
  onChange?: (v: string) => void;
  onClick?: () => void;
}

export const SidebarSearch: React.FC<SidebarSearchProps> = ({
  type = 'field', placeholder = 'Search…', collapsed, value, onChange, onClick,
}) => {
  if (collapsed) {
    return (
      <button type="button" className={styles.collapsed} onClick={onClick} aria-label="Search">
        <Search size={18} strokeWidth={1.5} />
      </button>
    );
  }

  // Command variant is a button (opens a command palette); Field is a live input.
  if (type === 'command') {
    return (
      <button type="button" className={styles.search} onClick={onClick}>
        <Search size={16} strokeWidth={1.5} className={styles.search__icon} />
        <span className={styles.search__placeholder}>{placeholder}</span>
        <kbd className={styles.search__kbd}>⌘K</kbd>
      </button>
    );
  }

  return (
    <div className={styles.search}>
      <Search size={16} strokeWidth={1.5} className={styles.search__icon} />
      <input
        className={styles.search__input}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
};

export default SidebarSearch;
