import { useEffect, useState } from 'react';

/**
 * The classes that redeclare the whole token set on a container.
 *
 * `dark` is this library's own convention. `force-light` is the mirror of it
 * that consumers define to pin a subtree light while the page around it is
 * dark (the docs site declares one; the class name is listed here so those
 * subtrees survive a portal). Naming them is the same trade-off Modal already
 * made by looking for `.dark` directly -- scoped theming is a class contract,
 * so something has to know the class names.
 */
const THEME_CLASSES = ['dark', 'force-light'];

/**
 * Returns the theme-scope class enclosing `anchor`, so a portaled surface can
 * re-apply it to itself.
 *
 * Floating surfaces (a Select's listbox, a Modal) portal to <body> so they
 * can position with `fixed` without being clipped by an ancestor's overflow.
 * That works for layout, but it moves them out from under any `.dark` or
 * `.force-light` container: the panel then inherits <html>'s tokens instead
 * of the ones in effect where the trigger actually lives. In the docs site,
 * whose preview panels render a light component inside a dark page, that
 * showed up as a dark dropdown opening over a white panel.
 *
 * Copying the class onto the portaled element keeps the body portal (and its
 * positioning) while restoring the tokens the trigger sees.
 *
 * Returns '' when no scope encloses the anchor, which is the common case and
 * correctly means "inherit from <html>".
 */
export function usePortalThemeClass(anchor: { current: HTMLElement | null }, active: boolean): string {
  const [themeClass, setThemeClass] = useState('');

  useEffect(() => {
    if (!active || typeof document === 'undefined') return;
    const el = anchor.current;
    if (!el) return;
    const scope = el.closest(THEME_CLASSES.map((c) => `.${c}`).join(', '));
    const match = scope
      ? THEME_CLASSES.find((c) => scope.classList.contains(c)) ?? ''
      : '';
    setThemeClass(match);
    // Re-read each time the surface opens: the enclosing scope can be toggled
    // between openings (that is exactly what the docs preview toggle does).
  }, [anchor, active]);

  return themeClass;
}
