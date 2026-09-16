import { useEffect, useState } from 'react';

/**
 * Resolves a chart's color tokens against the chart's OWN element, and
 * re-renders whenever any scope enclosing it changes theme.
 *
 * Recharts needs real color strings, not `var(--…)`, so these have to be read
 * with getComputedStyle. Two things that looked equivalent were not:
 *
 * 1. Reading from document.documentElement ignores any scope between <html>
 *    and the chart. Both `.dark` and `.force-light` redeclare the whole token
 *    set on a container -- that's the entire point of them: a docs preview
 *    panel showing a light component while the site around it is dark, or one
 *    dashboard demo toggled independently of the page. Read from <html>, such
 *    a chart painted the OUTER theme's colors on the INNER theme's
 *    background: dark grid lines on a white panel.
 *
 * 2. Watching only <html>'s class misses those same containers. Flipping a
 *    preview panel to dark changes a wrapper div's class, not <html>'s, and
 *    the chart is passed down as `children` — a stable element React reuses
 *    rather than re-rendering — so nothing re-read the tokens and the chart
 *    kept the previous theme's colors. Every ancestor is observed, not just
 *    the root.
 *
 * The mount tick matters on its own: under SSR there is no getComputedStyle,
 * so the server paints each chart's hardcoded fallbacks, and React treats
 * differing attributes on hydration as "won't be patched up". Bumping once on
 * mount is what replaces those fallbacks with real tokens — and it is also
 * the point at which the ref is finally attached.
 */
export function useChartTokens(element: { current: HTMLElement | null }) {
  const [, setTick] = useState(0);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    setTick((t) => t + 1);

    const bump = () => setTick((t) => t + 1);
    const observer = new MutationObserver(bump);

    // <html> plus the chart's ancestor chain: any of them can carry the class
    // that swaps the token set.
    const targets = new Set<HTMLElement>([document.documentElement]);
    for (let el = element.current; el; el = el.parentElement) targets.add(el);
    targets.forEach((t) => observer.observe(t, { attributes: true, attributeFilter: ['class'] }));

    return () => observer.disconnect();
  }, [element]);

  return (name: string): string | undefined => {
    if (typeof window === 'undefined') return undefined;
    const scope = element.current ?? document.documentElement;
    return getComputedStyle(scope).getPropertyValue(name).trim() || undefined;
  };
}
