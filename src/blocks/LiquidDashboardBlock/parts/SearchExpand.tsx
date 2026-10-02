import { useRef, useState } from 'react';
import { Search } from 'lucide-react';
import styles from './SearchExpand.module.css';

/** Ghost/sm icon button (32x32) that expands into a 240px text input on click,
 * collapsing back once it loses focus with nothing typed. */
export function SearchExpand() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={[styles.root, open ? styles['root--open'] : ''].filter(Boolean).join(' ')}
      onClick={() => inputRef.current?.focus()}
    >
      <Search size={16} strokeWidth={1.5} className={styles.icon} aria-hidden="true" />
      <input
        ref={inputRef}
        type="text"
        className={styles.input}
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={() => { if (!value) setOpen(false); }}
        aria-label="Search"
      />
    </div>
  );
}
