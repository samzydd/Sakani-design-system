/**
 * Real values of --color-chart-1..6, used only when getComputedStyle can't
 * run — which in practice means server-side rendering, where the charts paint
 * once before useThemeTick's mount bump re-reads the live tokens.
 *
 * Indexed rather than a single value on purpose: every chart used to fall
 * back to chart-1 for all five slots, so a server-rendered multi-series chart
 * painted every line, slice and ring the same orange until hydration.
 *
 * Keep in sync with src/styles/tokens.css.
 */
export const CHART_PALETTE_FALLBACK = [
  '#ff4700', // chart-1  orange
  '#5b92dd', // chart-2  blue
  '#47a8a2', // chart-3  teal
  '#9179d6', // chart-4  purple
  '#dca84f', // chart-5  gold
  '#12b76a', // chart-6  green
];
