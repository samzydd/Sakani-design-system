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
 *
 * The links/divider/CTA block is always mounted (never conditionally
 * removed from the tree) specifically so open <-> close can animate:
 * unmounting on close would cut off any closing transition instantly,
 * and remounting on open would replay from nothing rather than expand
 * smoothly. Its height is animated via `max-height` (unlike plain
 * `height`, which can't transition to/from `auto`), between two
 * concrete pixel lengths: `0` and a live-measured `contentHeight`
 * (tracked off `.collapseInner`'s own scrollHeight via ResizeObserver --
 * it's always rendered, just visually clipped when collapsed, so its
 * natural height is measurable even while closed).
 *
 * Two earlier attempts at this didn't hold up once actually verified in
 * the browser: `grid-template-rows: 0fr <-> 1fr` (the usual trick for
 * this, since `height` itself can't animate to/from `auto`) interpolated
 * fine when collapsing but snapped instantly to full height when
 * expanding -- confirmed reproducible at multiple delays, not a flake.
 * Swapping that same grid-template-rows property to animate between
 * concrete pixel row-track values (`0px`/`{contentHeight}px`) instead of
 * the fr keywords reproduced the identical one-directional snap, which
 * narrowed the problem down to animating a CSS Grid row track
 * specifically, not the fr unit. Moving off `display: grid` entirely and
 * animating plain `max-height` on a block element sidesteps grid
 * track-sizing animation altogether and was confirmed, via direct
 * height sampling mid-transition, to animate correctly in both
 * directions.
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

  const innerRef = React.useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = React.useState(0);

  React.useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    const measure = () => setContentHeight(inner.scrollHeight);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(inner);
    return () => observer.disconnect();
  }, [links, ctaLabel]);

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

      <div
        className={[styles.collapse, isOpen ? styles.collapseOpen : ''].filter(Boolean).join(' ')}
        style={{ maxHeight: isOpen ? `${contentHeight}px` : '0px' }}
        aria-hidden={!isOpen}
      >
        <div ref={innerRef} className={styles.collapseInner}>
          <nav className={styles.navLinks} aria-label={label}>
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={link.onClick}
                className={styles.navLink}
                tabIndex={isOpen ? undefined : -1}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <Divider className={styles.fullWidth} />
          <Button
            variant="primary"
            className={styles.fullWidth}
            onClick={onCtaClick}
            tabIndex={isOpen ? undefined : -1}
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigationMenu;
