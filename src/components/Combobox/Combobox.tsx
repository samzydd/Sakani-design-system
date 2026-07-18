/**
 * Combobox
 *
 * Searchable select with single or multi-select. Matches the Figma Combobox family:
 *   - Combobox field: Mode (Single|Multi) x Size (sm|md|lg) x State (Default|Filled|Focus|Open|Error|Disabled)
 *   - Combobox Panel: Results | Empty | Loading
 *   - Combobox Option: Mode (Single|Multi) x State (Default|Hover|Selected|Disabled)
 *
 * Figma spec:
 *   field: bg/surface, border/default 1px, radius-md (8), padding 10/12/10/14
 *          focus border/focus 1.5px · error danger/solid 1.5px · disabled bg/subtle
 *          heights sm 32 · md 40 · lg 48
 *   panel: bg/surface, border/default, radius-sm (6), padding 4, gap 2, shadow/lg
 *   option: radius 4, padding 8, gap 8, hover/selected bg/subtle, label body/sm
 *
 * This is a functional, accessible combobox: keyboard open/close, filter-as-you-type,
 * single or multi selection with chips.
 */

import React from 'react';
import styles from './Combobox.module.css';

export type ComboboxSize = 'sm' | 'md' | 'lg';
export type ComboboxMode = 'single' | 'multi';

export interface ComboboxOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  /** Shows the panel's loading state (Figma: Panel State=Loading). */
  loading?: boolean;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  mode?: ComboboxMode;
  size?: ComboboxSize;
  label?: string;
  description?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  /** Controlled selected value(s). */
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  className?: string;
}

export const Combobox: React.FC<ComboboxProps> = ({
  options, mode = 'single', size = 'md', label, description, error,
  placeholder = 'Select…', disabled, loading, value, onChange, className,
}) => {
  const reactId = React.useId();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [activeIndex, setActiveIndex] = React.useState(0);
  const rootRef = React.useRef<HTMLDivElement>(null);

  // Uncontrolled fallback
  const [internal, setInternal] = React.useState<string | string[]>(mode === 'multi' ? [] : '');
  const selected = value !== undefined ? value : internal;
  const selectedArr = Array.isArray(selected) ? selected : selected ? [selected] : [];

  const hasError = Boolean(error);

  // Close on outside click
  React.useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase())
  );

  const commit = (next: string | string[]) => {
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };

  const toggleOption = (opt: ComboboxOption) => {
    if (opt.disabled) return;
    if (mode === 'multi') {
      const set = new Set(selectedArr);
      set.has(opt.value) ? set.delete(opt.value) : set.add(opt.value);
      commit([...set]);
    } else {
      commit(opt.value);
      setOpen(false);
      setQuery('');
    }
  };

  const labelFor = (val: string) => options.find((o) => o.value === val)?.label ?? val;

  // Field display text (single mode)
  const singleDisplay = selectedArr.length ? labelFor(selectedArr[0]) : '';

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setActiveIndex((i) => Math.min(i + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); if (open && filtered[activeIndex]) toggleOption(filtered[activeIndex]); else setOpen(true); }
    else if (e.key === 'Escape') { setOpen(false); }
  };

  const state = disabled ? 'disabled' : hasError ? 'error' : open ? 'open' : 'default';

  return (
    <div className={[styles.field, className ?? ''].filter(Boolean).join(' ')} ref={rootRef}>
      {label && <label htmlFor={reactId} className={styles.field__label}>{label}</label>}

      {/* Control */}
      <div
        className={[
          styles.control,
          styles[`control--${size}`],
          styles[`control--${state}`],
        ].join(' ')}
        onClick={() => !disabled && setOpen((o) => !o)}
      >
        {/* Multi chips */}
        {mode === 'multi' && selectedArr.length > 0 && (
          <div className={styles.chips}>
            {selectedArr.map((v) => (
              <span key={v} className={styles.chip}>
                {labelFor(v)}
                <button
                  type="button"
                  className={styles.chip__remove}
                  onClick={(e) => { e.stopPropagation(); toggleOption(options.find((o) => o.value === v)!); }}
                  aria-label={`Remove ${labelFor(v)}`}
                >×</button>
              </span>
            ))}
          </div>
        )}

        <input
          id={reactId}
          className={styles.control__input}
          placeholder={mode === 'single' && singleDisplay ? singleDisplay : placeholder}
          value={query}
          disabled={disabled}
          aria-expanded={open}
          aria-invalid={hasError || undefined}
          role="combobox"
          aria-controls={`${reactId}-panel`}
          aria-autocomplete="list"
          aria-activedescendant={open && filtered[activeIndex] ? `${reactId}-opt-${activeIndex}` : undefined}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onKeyDown={onKeyDown}
          onFocus={() => !disabled && setOpen(true)}
        />

        <span className={[styles.control__chevron, open ? styles['control__chevron--open'] : ''].join(' ')} aria-hidden="true">
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
        </span>
      </div>

      {/* Panel */}
      {open && !disabled && (
        <div className={styles.panel} id={`${reactId}-panel`} role="listbox" aria-busy={loading || undefined}>
          {loading ? (
            <div className={styles.panel__loading}>
              <span className={styles.panel__spinner} aria-hidden="true" />
              Loading…
            </div>
          ) : filtered.length === 0 ? (
            <div className={styles.panel__empty}>No results found</div>
          ) : (
            filtered.map((opt, i) => {
              const isSelected = selectedArr.includes(opt.value);
              return (
                <div
                  key={opt.value}
                  id={`${reactId}-opt-${i}`}
                  role="option"
                  aria-selected={isSelected}
                  className={[
                    styles.option,
                    i === activeIndex ? styles['option--active'] : '',
                    isSelected ? styles['option--selected'] : '',
                    opt.disabled ? styles['option--disabled'] : '',
                  ].filter(Boolean).join(' ')}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => toggleOption(opt)}
                >
                  {opt.icon && <span className={styles.option__icon} aria-hidden="true">{opt.icon}</span>}
                  <span className={styles.option__label}>{opt.label}</span>
                  {isSelected && (
                    <span className={styles.option__check} aria-hidden="true">
                      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {(description || error) && (
        <span className={hasError ? styles.field__error : styles.field__description}>{error || description}</span>
      )}
    </div>
  );
};

export default Combobox;
