/**
 * MobileNavigationMenu
 *
 * Matches Figma "Mobile Navigation Menu" (Marketing primitives set, 2
 * states: Closed, Open). Unlike every other Figma "state" axis in this
 * library so far, Closed/Open here is REAL interactive UI state (a
 * user tapping the hamburger toggle), not a style choice or something
 * derivable from static data -- so this is a genuinely functional
 * expand/collapse component, not a two-look static component. Follows
 * the same optional-controlled/uncontrolled-by-default dual mode
 * already established by ProductGallery's `activeIndex`: most consumers
 * just want a self-contained toggle, but anything needing to sync it
 * externally (e.g. locking body scroll while open) can still control it.
 *
 * The header's toggle button is NOT the shared IconButton: none of its
 * 5 variants produce Figma's own bg/surface + shadow/xs + no-border
 * look (secondary is bg/subtle, outline has a visible border, etc.) --
 * built locally instead, same reasoning WishlistButton gives for not
 * reusing IconButton either. The icon itself swaps lucide Menu <-> X
 * based on the real `isOpen` state (derived, not a separate icon prop).
 *
 * Nav link rows are NOT the shared Button component either: Button
 * always centers its own content (`justify-content: center`), but
 * Figma's own nav links are left-aligned, plain-text, no background --
 * a distinct enough shape to build directly. The "Get started" CTA
 * and the horizontal rule above it DO reuse the shared Button
 * (variant="primary") and Divider components respectively -- exact
 * matches for Figma's own treatment there.
 */

import React from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../../Button';
import { Divider } from '../../Divider';
import { iconStrokeWidth } from '../../../lib/iconStrokeWidth';
import styles from './MobileNavigationMenu.module.css';

export interface MobileNavLink {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface MobileNavigationMenuProps {
  label: string;
  links: MobileNavLink[];
  ctaLabel?: string;
  onCtaClick?: () => void;
  /** Controlled open state. Omit to let the menu manage its own toggle. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export const MobileNavigationMenu: React.FC<MobileNavigationMenuProps> = ({
  label, links, ctaLabel = 'Get started', onCtaClick,
  open: openProp, defaultOpen = false, onOpenChange, className,
}) => {
  const isControlled = openProp !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isOpen = isControlled ? openProp : internalOpen;

  const toggle = () => {
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  return (
    <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')}>
      <div className={styles.header}>
        <p className={styles.label}>{label}</p>
        <button
          type="button"
          className={styles.toggle}
          onClick={toggle}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen
            ? <X size={16} strokeWidth={iconStrokeWidth(16)} />
            : <Menu size={16} strokeWidth={iconStrokeWidth(16)} />}
        </button>
      </div>

      {isOpen && (
        <>
          <nav className={styles.navLinks} aria-label={label}>
            {links.map((link) => (
              <a key={link.label} href={link.href} onClick={link.onClick} className={styles.navLink}>
                {link.label}
              </a>
            ))}
          </nav>
          <Divider className={styles.fullWidth} />
          <Button variant="primary" className={styles.fullWidth} onClick={onCtaClick}>{ctaLabel}</Button>
        </>
      )}
    </div>
  );
};

export default MobileNavigationMenu;
