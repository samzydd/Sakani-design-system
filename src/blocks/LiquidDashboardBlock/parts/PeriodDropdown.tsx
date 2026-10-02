import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../../../components/Button';
import { Menu } from '../../../components/Menu';
import { MenuItem } from '../../../components/MenuItem';
import styles from './PeriodDropdown.module.css';

const DEFAULT_OPTIONS = ['1 month', '2 months', '3 months', '6 months'];

interface PeriodDropdownProps {
  defaultValue?: string;
  options?: string[];
  /** Formats the trigger/menu-item label from a raw option value. Defaults to "Last {value}". */
  formatLabel?: (value: string) => string;
  onChange?: (value: string) => void;
  /** Trigger button style — ghost (default, used inside chart panels) or
   * outline (Figma's page-header filter button, e.g. Sales' "Last 30 days"). */
  variant?: 'ghost' | 'outline';
}

/** Chart-range picker — ghost/sm button that opens a Menu. Defaults to the
 * "Last N months" set, but accepts custom options/label formatting (e.g.
 * "This month" style pickers). */
export function PeriodDropdown({
  defaultValue = '6 months', options = DEFAULT_OPTIONS, formatLabel = (v) => `Last ${v}`, onChange, variant = 'ghost',
}: PeriodDropdownProps) {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const select = (option: string) => {
    setValue(option);
    setOpen(false);
    onChange?.(option);
  };

  return (
    <div className={styles.root} ref={rootRef}>
      <Button
        variant={variant}
        size="sm"
        className={styles.trigger}
        rightIcon={open ? <ChevronUp size={16} strokeWidth={1.5} /> : <ChevronDown size={16} strokeWidth={1.5} />}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {formatLabel(value)}
      </Button>
      {open && (
        <div className={styles.menu}>
          <Menu aria-label="Select time range">
            {options.map((option) => (
              <MenuItem
                key={option}
                state={option === value ? 'checked' : 'default'}
                onSelect={() => select(option)}
              >
                {formatLabel(option)}
              </MenuItem>
            ))}
          </Menu>
        </div>
      )}
    </div>
  );
}
