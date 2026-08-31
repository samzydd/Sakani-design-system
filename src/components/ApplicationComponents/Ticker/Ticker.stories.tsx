import type { Meta, StoryObj } from '@storybook/react';
import { Ticker } from './Ticker';

const items = [
  { symbol: 'AAPL', changePercent: 1.8 },
  { symbol: 'TSLA', changePercent: -2.3 },
  { symbol: 'MSFT', changePercent: 0.6 },
  { symbol: 'GOOGL', changePercent: -0.4 },
  { symbol: 'NVDA', changePercent: 3.1 },
  { symbol: 'AMZN', changePercent: 0.9 },
  { symbol: 'META', changePercent: -1.2 },
];

const meta = {
  title: 'Application/Ticker',
  component: Ticker,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Matches Figma "Ticker" -- a row of symbol/change pairs with fade-out edges.
Figma's own mock is a static frame, but a "ticker" by definition scrolls,
so this renders it as a genuine infinite marquee: the item list is
duplicated back-to-back and translated by exactly one copy's width in a
seamless loop, measured live via ResizeObserver so the animation duration
scales with content instead of a fixed guess. Paused on hover, and
disabled entirely under \`prefers-reduced-motion\`.

Trend icon/color is derived from \`changePercent\`'s sign (\`isPositive\`),
same pattern as StockMarket -- Figma's own row is inconsistent here (one
item's "down" icon is drawn with stray fill colors instead of the other
two's clean stroke), which reads as an authoring slip rather than an
intentional third state, so it's normalized to the same
success/danger-solid mapping as every other trend indicator in this set.` } } },
  decorators: [(S) => <div style={{ width: 400 }}><S /></div>],
} satisfies Meta<typeof Ticker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { items },
};

export const FewItems: Story = {
  args: { items: items.slice(0, 2) },
};

export const DarkMode: Story = {
  args: { items },
  decorators: [(S) => <div className="dark" style={{ width: 400, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
