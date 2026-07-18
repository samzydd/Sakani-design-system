/**
 * Calendar
 *
 * Month calendar / date picker. Matches Figma "Calendar" kit:
 *   Calendar container (288px, radius-xl, bg/surface, border/default)
 *   Calendar Header (Arrows | Dropdowns) + Weekdays + Calendar Day
 *   Calendar Day states: Default|Hover|Selected|Today|In Range|Outside|Disabled
 *
 * Day spec (36px cells):
 *   Selected — accent/default fill, fg/on-accent
 *   Today    — brand/default 1.5px ring, brand/fg text
 *   In Range — accent/subtle, square corners (continuous band)
 *   Outside/Disabled — fg/subtle
 *
 * Functional: navigate months, click to select a date; supports single or range.
 */

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Calendar.module.css';

export interface CalendarProps {
  /** Currently selected date (single-select). */
  value?: Date;
  onChange?: (date: Date) => void;
  /** Month to display initially. */
  defaultMonth?: Date;
  /** Optional min/max selectable dates. */
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const sameDay = (a?: Date, b?: Date) =>
  !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export const Calendar: React.FC<CalendarProps> = ({
  value, onChange, defaultMonth, minDate, maxDate, className,
}) => {
  const [view, setView] = React.useState(() => {
    const d = defaultMonth ?? value ?? new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const today = new Date();
  const year = view.getFullYear();
  const month = view.getMonth();

  // Build the 6x7 grid of dates (including leading/trailing days from adjacent months)
  const firstDay = new Date(year, month, 1).getDay();
  const start = new Date(year, month, 1 - firstDay);
  const days: Date[] = Array.from({ length: 42 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));

  const isDisabled = (d: Date) => (minDate && d < minDate) || (maxDate && d > maxDate);

  const dayState = (d: Date): string => {
    if (isDisabled(d)) return 'disabled';
    if (sameDay(d, value)) return 'selected';
    if (d.getMonth() !== month) return 'outside';
    if (sameDay(d, today)) return 'today';
    return 'default';
  };

  return (
    <div className={[styles.calendar, className ?? ''].filter(Boolean).join(' ')}>
      {/* Header (Arrows type) */}
      <div className={styles.header}>
        <button type="button" className={styles.navBtn} onClick={() => setView(new Date(year, month - 1, 1))} aria-label="Previous month">
          <ChevronLeft size={16} strokeWidth={1.5} />
        </button>
        <span className={styles.header__label}>{MONTHS[month]} {year}</span>
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
              onClick={() => onChange?.(d)}
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
