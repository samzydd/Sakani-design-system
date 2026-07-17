/**
 * Kbd
 *
 * Keyboard shortcut display. Renders a <kbd> element styled as a key cap.
 * Use inline inside prose or next to menu items to hint shortcuts.
 *
 * Examples: <Kbd>⌘K</Kbd>  <Kbd>Ctrl</Kbd> + <Kbd>S</Kbd>
 */

import React from 'react';
import styles from './Kbd.module.css';

export interface KbdProps {
  children: React.ReactNode;
  className?: string;
}

export const Kbd: React.FC<KbdProps> = ({ children, className }) => (
  <kbd className={[styles.kbd, className ?? ''].filter(Boolean).join(' ')}>
    {children}
  </kbd>
);

export default Kbd;
