import { useEffect, useState } from 'react';

/**
 * Chart components read color tokens once per render via getComputedStyle
 * (Recharts needs real color strings, not CSS vars). That read is frozen at
 * render time, so toggling the app's .dark class on <html> after a chart has
 * already mounted leaves it showing stale (light-mode) colors until it
 * happens to re-render for an unrelated reason. This watches <html>'s class
 * attribute and bumps a counter on change, so a chart calling this hook
 * re-renders — and re-reads its colors — right when the theme flips.
 */
export function useThemeTick(): number {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const observer = new MutationObserver(() => setTick((t) => t + 1));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return tick;
}
