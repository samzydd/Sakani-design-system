/**
 * Modal
 *
 * Confirmation dialog. Matches Figma "Modal":
 *   Default — title + description + Cancel/Confirm
 *   Destructive — danger icon-wrap next to the title, Delete-styled confirm
 *
 * "Destructive" is a real prop, not derived from `icon` presence -- unlike
 * most of this Application set it governs three things at once (icon-wrap,
 * icon-wrap color, confirm button color), so collapsing it into "pass an
 * icon and we'll guess" would conflate a non-destructive modal that happens
 * to want a custom icon with one that's actually destructive.
 *
 * Functional, not just the static card: portals to document.body (so it
 * escapes any parent stacking/overflow context), dims a backdrop, closes on
 * Escape or backdrop click (each can be disabled independently), locks body
 * scroll while open, and does a lightweight focus trap + focus-return on
 * close -- same portal technique already used by Select, same
 * focus-return-on-close idea already used by Popover.
 */

import React from 'react';
import { createPortal } from 'react-dom';
import { X, TriangleAlert } from 'lucide-react';
import { IconButton } from '../../IconButton';
import { Button } from '../../Button';
import { Divider } from '../../Divider';
import { iconStrokeWidth } from '../../../lib/iconStrokeWidth';
import styles from './Modal.module.css';

export type ModalVariant = 'default' | 'destructive';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  variant?: ModalVariant;
  /** Overrides the default TriangleAlert icon (variant="destructive" only). */
  icon?: React.ReactNode;
  cancelLabel?: string;
  confirmLabel?: string;
  /** Defaults to `onClose`. */
  onCancel?: () => void;
  onConfirm?: () => void;
  confirmLoading?: boolean;
  closeOnEscape?: boolean;
  closeOnBackdropClick?: boolean;
  /** Custom body content (e.g. a form) rendered below `description`, above
   *  the footer's Divider. Lets consumers like FormModalBlock reuse this
   *  component's portal/focus-trap/dark-mode plumbing instead of
   *  duplicating it just to swap in different body content. */
  children?: React.ReactNode;
  /** Hides the title+close-X header row entirely, so `children` owns the
   *  whole top of the card (e.g. MultistepModalBlock's own steps-row +
   *  title + description, which Figma draws with no header bar or close
   *  control at all). `title` is still required and used as the dialog's
   *  aria-label in this mode, since there's no #modal-title element to
   *  point aria-labelledby at. */
  hideHeader?: boolean;
  /** Hides the Divider between the body and the footer buttons (Figma's
   *  Multistep Modal has no such rule). */
  hideFooterDivider?: boolean;
  /** Footer button alignment. 'end' (default) clusters Cancel/Confirm at
   *  the right, matching the base Modal's Figma spec. 'between' spreads
   *  them across the full width (Figma: Multistep Modal's Back / Continue
   *  footer), so the footer <div> fills the card instead of just wrapping
   *  its two buttons. */
  footerJustify?: 'end' | 'between';
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  open, onClose, title, description, variant = 'default', icon,
  cancelLabel = 'Cancel', confirmLabel, onCancel, onConfirm, confirmLoading,
  closeOnEscape = true, closeOnBackdropClick = true, children,
  hideHeader = false, hideFooterDivider = false, footerJustify = 'end', className,
}) => {
  const isDestructive = variant === 'destructive';
  const cardRef = React.useRef<HTMLDivElement>(null);
  const lastFocus = React.useRef<HTMLElement | null>(null);

  // Portaling to document.body escapes any ancestor .dark container -- this
  // system's dark mode is a scoped class, not a global html/body attribute,
  // so without this a modal opened from inside a dark-themed section would
  // render light. An inert marker rendered inline (not portaled) reads its
  // real ancestry via closest() before the content teleports away from it.
  const markerRef = React.useRef<HTMLSpanElement>(null);
  const [isDark, setIsDark] = React.useState(false);
  React.useEffect(() => {
    if (open) setIsDark(!!markerRef.current?.closest('.dark'));
  }, [open]);

  // Escape to close, and a lightweight Tab trap -- cycles focus within the
  // card instead of letting it escape to the page behind the backdrop.
  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab' || !cardRef.current) return;
      const focusable = cardRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, closeOnEscape, onClose]);

  // Body scroll lock, initial focus, and focus-return on close.
  React.useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    cardRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      lastFocus.current?.focus();
    };
  }, [open]);

  const handleCancel = () => (onCancel ?? onClose)();

  return (
    <>
      {/* Always rendered (even closed) so its ancestry is readable the
          instant `open` flips true -- see the isDark effect above. */}
      <span ref={markerRef} style={{ display: 'none' }} aria-hidden="true" />
      {open && createPortal(
        <div
          className={[styles.backdrop, isDark ? 'dark' : ''].filter(Boolean).join(' ')}
          onMouseDown={(e) => { if (closeOnBackdropClick && e.target === e.currentTarget) onClose(); }}
        >
          <div
            ref={cardRef}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={hideHeader ? undefined : 'modal-title'}
            aria-label={hideHeader ? title : undefined}
            tabIndex={-1}
            className={[styles.card, className ?? ''].filter(Boolean).join(' ')}
          >
            {!hideHeader && (
              <div className={styles.header}>
                <div className={styles.titleGroup}>
                  {isDestructive && (
                    <span className={styles.iconWrap} aria-hidden="true">
                      {icon ?? <TriangleAlert size={24} strokeWidth={iconStrokeWidth(24)} className={styles.icon} />}
                    </span>
                  )}
                  <p id="modal-title" className={styles.title}>{title}</p>
                </div>
                <IconButton icon={X} variant="ghost" size="lg" aria-label="Close" onClick={onClose} />
              </div>
            )}

            {description && <p className={styles.description}>{description}</p>}

            {children}

            {!hideFooterDivider && <Divider />}

            <div className={[styles.footer, footerJustify === 'between' ? styles['footer--between'] : ''].filter(Boolean).join(' ')}>
              {/* Button's secondary variant always draws a border/default
                  outline; Figma's Cancel here has none, just the bg/subtle
                  fill, so it's stripped via inline style rather than
                  reaching for a different variant that wouldn't have the
                  right fill either. */}
              <Button variant="secondary" onClick={handleCancel} style={{ borderColor: 'transparent' }}>
                {cancelLabel}
              </Button>
              <Button
                variant={isDestructive ? 'destructive' : 'primary'}
                onClick={onConfirm}
                loading={confirmLoading}
              >
                {confirmLabel ?? (isDestructive ? 'Delete' : 'Confirm')}
              </Button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
};

export default Modal;
