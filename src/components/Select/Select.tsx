/**
 * Select
 *
 * Single-select dropdown. Matches the Figma "Select" component:
 *   Size (sm|md|lg) x State (Default|Open|Disabled|Filled), Title/Description toggles.
 *
 * This is a custom listbox, not a native <select>. The native element renders
 * an operating-system dropdown that cannot be styled, so the open state never
 * matched the design. The panel here mirrors the Combobox panel exactly
 * (radius 6, padding 4, gap 2, bg/surface, border/default, shadow/lg).
 *
 * Spec:
 *   - Heights: sm 32 · md 40 · lg 48
 *   - Trigger: left 14px, right 12px padding; radius-md; border/subtle 1px
 *   - Focus/open: neutral border + soft shadow (no accent ring)
 *   - Keyboard: Enter/Space opens, arrows move, Home/End jump, Escape closes
 */

import React from 'react';
import styles from './Select.module.css';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  label?: string;
  description?: string;
  error?: string;
  size?: SelectSize;
  placeholder?: string;
  options: SelectOption[];
  /** Controlled value. */
  value?: string;
  /** Uncontrolled initial value. */
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  description,
  error,
  size = 'md',
  placeholder = 'Select an option',
  options,
  value,
  defaultValue,
  onChange,
  disabled,
  id,
  className,
}) => {
  const reactId = React.useId();
  const triggerId = `${id ?? reactId}-trigger`;
  const panelId = `${id ?? reactId}-panel`;
  const hasError = Boolean(error);

  const [internal, setInternal] = React.useState<string | undefined>(defaultValue);
  const selected = value !== undefined ? value : internal;
  const selectedOption = options.find((o) => o.value === selected);

  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const rootRef = React.useRef<HTMLDivElement>(null);

  // Dismiss on outside click.
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  // When opening, start from the selected option.
  React.useEffect(() => {
    if (!open) return;
    const i = options.findIndex((o) => o.value === selected);
    setActiveIndex(i >= 0 ? i : 0);
  }, [open, options, selected]);

  const commit = (opt: SelectOption) => {
    if (opt.disabled) return;
    if (value === undefined) setInternal(opt.value);
    onChange?.(opt.value);
    setOpen(false);
  };

  const step = (dir: 1 | -1) => {
    setActiveIndex((i) => {
      let next = i;
      for (let n = 0; n < options.length; n += 1) {
        next = (next + dir + options.length) % options.length;
        if (!options[next]?.disabled) return next;
      }
      return i;
    });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (!open && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown')) {
      e.preventDefault(); setOpen(true); return;
    }
    if (!open) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); step(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); step(-1); }
    else if (e.key === 'Home') { e.preventDefault(); setActiveIndex(0); }
    else if (e.key === 'End') { e.preventDefault(); setActiveIndex(options.length - 1); }
    else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const opt = options[activeIndex];
      if (opt) commit(opt);
    } else if (e.key === 'Escape') { e.preventDefault(); setOpen(false); }
  };

  return (
    <div className={[styles.field, className ?? ''].filter(Boolean).join(' ')} ref={rootRef}>
      {label && <label htmlFor={triggerId} className={styles.field__label}>{label}</label>}

      <div className={styles.anchor}>
        <div
          id={triggerId}
          role="combobox"
          tabIndex={disabled ? -1 : 0}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={panelId}
          aria-invalid={hasError || undefined}
          aria-disabled={disabled || undefined}
          aria-activedescendant={open ? `${panelId}-opt-${activeIndex}` : undefined}
          onClick={() => !disabled && setOpen((o) => !o)}
          onKeyDown={onKeyDown}
          className={[
            styles.select,
            styles[`select--${size}`],
            open ? styles['select--open'] : '',
            hasError ? styles['select--error'] : '',
            disabled ? styles['select--disabled'] : '',
          ].filter(Boolean).join(' ')}
        >
          <span
            className={[styles.select__value, selectedOption ? '' : styles['select__value--placeholder']]
              .filter(Boolean).join(' ')}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>

          <span
            className={[styles.select__chevron, open ? styles['select__chevron--open'] : '']
              .filter(Boolean).join(' ')}
            aria-hidden="true"
          >
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </div>

        {open && (
          <div id={panelId} role="listbox" className={styles.panel}>
            {options.map((o, i) => (
              <div
                key={o.value}
                id={`${panelId}-opt-${i}`}
                role="option"
                aria-selected={o.value === selected}
                aria-disabled={o.disabled || undefined}
                onMouseEnter={() => !o.disabled && setActiveIndex(i)}
                onClick={() => commit(o)}
                className={[
                  styles.option,
                  i === activeIndex ? styles['option--active'] : '',
                  o.value === selected ? styles['option--selected'] : '',
                  o.disabled ? styles['option--disabled'] : '',
                ].filter(Boolean).join(' ')}
              >
                <span className={styles.option__label}>{o.label}</span>
                {o.value === selected && (
                  <span className={styles.option__check} aria-hidden="true">
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {(description || error) && (
        <span className={hasError ? styles.field__error : styles.field__description}>
          {error || description}
        </span>
      )}
    </div>
  );
};

export default Select;
