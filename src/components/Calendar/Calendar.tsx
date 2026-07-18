/**
 * Calendar
 *
 * Month calendar / date picker. Matches the Figma "Calendar" kit:
 *   Calendar container (288px, radius-xl, bg/surface, border/default)
 *   Calendar Header — Type: Arrows | Dropdowns (month + year selects)
 *   Calendar Weekdays + Calendar Day
 *   Calendar Day states: Default|Hover|Selected|Today|In Range|Outside|Disabled
 *
 * Modes:
 *   single — click to select one date (value/onChange)
 *   range  — first click sets the start, second completes it (range/onRangeChange);
 *            clicking before the start swaps the endpoints. Days between endpoints
 *            render the Figma "In Range" state (accent/subtle, square corners).
 *
 * A11y: every day button carries a full-date aria-label; selects are labelled.
 */

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Calendar.module.css';

export interface DateRange { from?: Date; to?: Date; }

export interface CalendarProps {
  /** Selection mode. Defaults to "single". */
  mode?: 'single' | 'range';
  /** Selected date (single mode). */
  value?: Date;
  onChange?: (date: Date) => void;
  /** Selected range (range mode). */
  range?: DateRange;
  onRangeChange?: (range: DateRange) => void;
  /** Header style (Figma: Calendar Header Type). Defaults to "arrows". */
  headerType?: 'arrows' | 'dropdowns';
  /** Month to display initially. */
  defaultMonth?: Date;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const sameDay = (a?: Date, b?: Date) =>
  !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const stripTime = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

export const Calendar: React.FC<CalendarProps> = ({
  mode = 'single', value, onChange, range, onRangeChange, headerType = 'arrows',
  defaultMonth, minDate, maxDate, className,
}) => {
  const [view, setView] = React.useState(() => {
    const d = defaultMonth ?? value ?? range?.from ?? new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  // Uncontrolled range fallback
  const [internalRange, setInternalRange] = React.useState<DateRange>({});
  const activeRange = range !== undefined ? range : internalRange;

  const today = new Date();
  const year = view.getFullYear();
  const month = view.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const start = new Date(year, month, 1 - firstDay);
  const days: Date[] = Array.from({ length: 42 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));

  const isDisabled = (d: Date) => (minDate && d < stripTime(minDate)) || (maxDate && d > maxDate);

  const commitRange = (next: DateRange) => {
    if (range === undefined) setInternalRange(next);
    onRangeChange?.(next);
  };

  const pick = (d: Date) => {
    if (mode === 'single') { onChange?.(d); return; }
    const { from, to } = activeRange;
    if (!from || (from && to)) commitRange({ from: d, to: undefined });
    else if (d < from) commitRange({ from: d, to: from });
    else commitRange({ from, to: d });
  };

  const dayState = (d: Date): string => {
    if (isDisabled(d)) return 'disabled';
    if (mode === 'single') {
      if (sameDay(d, value)) return 'selected';
    } else {
      const { from, to } = activeRange;
      if (sameDay(d, from) || sameDay(d, to)) return 'selected';
      if (from && to && d > from && d < to) return 'in-range';
    }
    if (d.getMonth() !== month) return 'outside';
    if (sameDay(d, today)) return 'today';
    return 'default';
  };

  // Year options for the Dropdowns header — bounded by min/max when provided
  const yearStart = minDate ? minDate.getFullYear() : year - 10;
  const yearEnd = maxDate ? maxDate.getFullYear() : year + 10;
  const years = Array.from({ length: yearEnd - yearStart + 1 }, (_, i) => yearStart + i);

  return (
    <div className={[styles.calendar, className ?? ''].filter(Boolean).join(' ')}>
      {/* Header — Arrows or Dropdowns (Figma: Calendar Header Type) */}
      <div className={styles.header}>
        <button type="button" className={styles.navBtn} onClick={() => setView(new Date(year, month - 1, 1))} aria-label="Previous month">
          <ChevronLeft size={16} strokeWidth={1.5} />
        </button>

        {headerType === 'dropdowns' ? (
          <span className={styles.dropdowns}>
            <select
              className={styles.dropdown}
              value={month}
              onChange={(e) => setView(new Date(year, Number(e.target.value), 1))}
              aria-label="Month"
            >
              {MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}
            </select>
            <select
              className={styles.dropdown}
              value={year}
              onChange={(e) => setView(new Date(Number(e.target.value), month, 1))}
              aria-label="Year"
            >
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </span>
        ) : (
          <span className={styles.header__label}>{MONTHS[month]} {year}</span>
        )}

        <button type="button" className={styles.navBtn} onClick={() => setView(new Date(year, month + 1, 1))} aria-label="Next month">
          <ChevronRight size={16} strokeWidth={1.5} />
        </button>
      </div>

      {/* Weekdays */}
      <div className={styles.weekdays}>
        {WEEKDAYS.map((w) => <span key={w} className={styles.weekday}>{w}</span>)}
      </div>

      {/* Day grid */}
      <div className={styles.grid}>
        {days.map((d, i) => {
          const state = dayState(d);
          return (
            <button
              key={i}
              type="button"
              className={[styles.day, styles[`day--${state}`]].filter(Boolean).join(' ')}
              disabled={state === 'disabled'}
              aria-current={state === 'today' ? 'date' : undefined}
              aria-selected={state === 'selected'}
              aria-label={d.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              onClick={() => pick(d)}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
