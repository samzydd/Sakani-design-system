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
import { iconStrokeWidth } from '../../lib/iconStrokeWidth';
import styles from './Combobox.module.css';

export type ComboboxSize = 'sm' | 'md' | 'lg';
export type ComboboxMode = 'single' | 'multi';

export interface ComboboxOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
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
  /** Shows the panel's loading state (Figma: Panel State=Loading). */
  loading?: boolean;
  /** Controlled selected value(s). */
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  className?: string;
}

export const Combobox: React.FC<ComboboxProps> = ({
  options, mode = 'single', size = 'md', label, description, error,
  placeholder = 'Select...', disabled, loading, value, onChange, className,
}) => {
  const reactId = React.useId();
  const [open, setOpen] = React.useState(false);
  // Keeps the panel mounted a beat past open:false so its exit keyframe
  // animation can play before it leaves the DOM (see Select.tsx for why
  // this uses animation classes rather than a transition + extra state).
  const [panelMounted, setPanelMounted] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const filtered = options; // click-to-select: no text filtering

  React.useEffect(() => {
    if (open) setPanelMounted(true);
  }, [open]);

  // ---- flowing hover highlight -------------------------------------------
  // One element glides between options instead of each option's own
  // background fading in as another fades out -- the same technique
  // SegmentedControl's thumb uses, just vertical. onMouseEnter below already
  // drives activeIndex for keyboard purposes, so hovering and arrow-key
  // navigation share this one highlight for free.
  const optionRefs = React.useRef<Record<number, HTMLDivElement | null>>({});
  const panelRef = React.useRef<HTMLDivElement>(null);
  const [highlight, setHighlight] = React.useState<{ top: number; height: number } | null>(null);
  const [highlightReady, setHighlightReady] = React.useState(false);

  // Measures the active option's position. Runs on every activeIndex change
  // (each hover/arrow-key move) -- deliberately NOT what resets
  // highlightReady below, or every move would replay the "settle first"
  // step and never actually animate.
  React.useLayoutEffect(() => {
    const el = optionRefs.current[activeIndex];
    if (!el) { setHighlight(null); return; }
    setHighlight({ top: el.offsetTop, height: el.offsetHeight });
  }, [activeIndex, filtered.length]);

  // Resets on every fresh open (panelMounted flips false -> true) so the
  // highlight appears already in place at whichever option starts active,
  // rather than visibly gliding in from wherever it last was.
  React.useLayoutEffect(() => {
    if (!panelMounted) { setHighlightReady(false); return; }
    setHighlightReady(false);
    const id = window.requestAnimationFrame(() => setHighlightReady(true));
    return () => window.cancelAnimationFrame(id);
  }, [panelMounted]);

  React.useEffect(() => {
    if (!panelRef.current) return;
    const ro = new ResizeObserver(() => {
      const el = optionRefs.current[activeIndex];
      if (el) setHighlight({ top: el.offsetTop, height: el.offsetHeight });
    });
    ro.observe(panelRef.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panelMounted]);

  // Uncontrolled fallback
  const [internal, setInternal] = React.useState<string | string[]>(mode === 'multi' ? [] : '');
  const selected = value !== undefined ? value : internal;
  const selectedArr = Array.isArray(selected) ? selected : selected ? [selected] : [];

  // Rendered chips lag selectedArr by one exit animation: a deselected value
  // stays in place flagged `leaving` until its fade ends, whichever path
  // removed it (the chip's ×, the option list, or a controlled `value`).
  const [chips, setChips] = React.useState(() => selectedArr.map((v) => ({ value: v, leaving: false })));
  const selectedKey = selectedArr.join('\u0000');
  React.useLayoutEffect(() => {
    setChips((prev) => {
      const next = prev.map((c) => ({ value: c.value, leaving: !selectedArr.includes(c.value) }));
      for (const v of selectedArr) if (!next.some((c) => c.value === v)) next.push({ value: v, leaving: false });
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedKey]);
  const dropChip = (v: string) => setChips((prev) => prev.filter((c) => !(c.value === v && c.leaving)));

  const hasError = Boolean(error);

  // Close on outside click
  React.useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

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
      {label && <label htmlFor={`${reactId}-trigger`} className={styles.field__label}>{label}</label>}

      {/* Control */}
      <div
        id={`${reactId}-trigger`}
        role="combobox"
        tabIndex={disabled ? -1 : 0}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${reactId}-panel`}
        aria-invalid={hasError || undefined}
        aria-disabled={disabled || undefined}
        aria-activedescendant={open && filtered[activeIndex] ? `${reactId}-opt-${activeIndex}` : undefined}
        className={[
          styles.control,
          styles[`control--${size}`],
          styles[`control--${state}`],
        ].join(' ')}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={onKeyDown}
      >
        {/* Multi chips */}
        {mode === 'multi' && chips.length > 0 && (
          <div className={styles.chips}>
            {chips.map(({ value: v, leaving }) => (
              <span
                key={v}
                className={[styles.chip, leaving ? styles['chip--leaving'] : ''].filter(Boolean).join(' ')}
                aria-hidden={leaving || undefined}
                onAnimationEnd={leaving ? () => dropChip(v) : undefined}
              >
                {labelFor(v)}
                <button
                  type="button"
                  className={styles.chip__remove}
                  tabIndex={leaving ? -1 : undefined}
                  onClick={(e) => { e.stopPropagation(); toggleOption(options.find((o) => o.value === v)!); }}
                  aria-label={`Remove ${labelFor(v)}`}
                >×</button>
              </span>
            ))}
          </div>
        )}

        {!(mode === 'multi' && chips.length > 0) && (
          <span
            className={[
              styles.control__value,
              (mode === 'single' && singleDisplay) ? '' : styles['control__value--placeholder'],
            ].filter(Boolean).join(' ')}
          >
            {mode === 'single' && singleDisplay ? singleDisplay : placeholder}
          </span>
        )}

        <span className={[styles.control__chevron, open ? styles['control__chevron--open'] : ''].join(' ')} aria-hidden="true">
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth={iconStrokeWidth(16)} strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
        </span>
      </div>

      {/* Panel */}
      {panelMounted && !disabled && (
        <div
          ref={panelRef}
          className={[styles.panel, open ? styles['panel--entering'] : styles['panel--exiting']].filter(Boolean).join(' ')}
          id={`${reactId}-panel`}
          role="listbox"
          aria-multiselectable={mode === 'multi' || undefined}
          aria-busy={loading || undefined}
          onAnimationEnd={() => { if (!open) setPanelMounted(false); }}
        >
          {loading ? (
            <div className={styles.panel__loading}>
              <span className={styles.panel__spinner} aria-hidden="true" />
              Loading…
            </div>
          ) : filtered.length === 0 ? (
            <div className={styles.panel__empty}>No options available</div>
          ) : (
            <>
              {highlight && (
                <span
                  aria-hidden="true"
                  className={[styles.optionHighlight, highlightReady ? styles['optionHighlight--animated'] : ''].filter(Boolean).join(' ')}
                  style={{ transform: `translateY(${highlight.top}px)`, height: highlight.height }}
                />
              )}
              {filtered.map((opt, i) => {
              const isSelected = selectedArr.includes(opt.value);
              return (
                <div
                  key={opt.value}
                  ref={(el) => { optionRefs.current[i] = el; }}
                  id={`${reactId}-opt-${i}`}
                  role="option"
                  aria-selected={isSelected}
                  className={[
                    styles.option,
                    isSelected && mode === 'single' ? styles['option--selected'] : '',
                    opt.disabled ? styles['option--disabled'] : '',
                  ].filter(Boolean).join(' ')}
                  onMouseEnter={() => { if (!opt.disabled) setActiveIndex(i); }}
                  onClick={() => toggleOption(opt)}
                >
                  {/* Visual only -- a real <input> inside role="option" would
                      nest interactive content and double-fire the toggle;
                      aria-selected already carries the state. */}
                  {mode === 'multi' && (
                    <span
                      className={[styles.option__box, isSelected ? styles['option__box--checked'] : ''].filter(Boolean).join(' ')}
                      aria-hidden="true"
                    >
                      <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth={iconStrokeWidth(12)} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                  )}
                  {opt.icon && <span className={styles.option__icon} aria-hidden="true">{opt.icon}</span>}
                  <span className={styles.option__label}>{opt.label}</span>
                  {isSelected && mode === 'single' && (
                    <span className={styles.option__check} aria-hidden="true">
                      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                  )}
                </div>
              );
              })}
            </>
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
