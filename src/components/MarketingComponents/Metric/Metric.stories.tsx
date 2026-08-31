import type { Meta, StoryObj } from '@storybook/react';
import { Metric } from './Metric';

const meta = {
  title: 'Marketing/Metric',
  component: Metric,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Matches Figma "Metric" (Marketing primitives set, 2 styles: Simple,
With Trend). Whether the trend chip renders is derived from \`trend\`
presence, not a manual style prop -- same "derive from data" pattern
used throughout this library. \`trend\` is a single signed number
(e.g. -0.2 for a decline), not a separate direction + magnitude pair:
the icon (lucide TrendingUp/TrendingDown) and color (success/danger
solid) both derive from its sign, and the rendered label is always
the unsigned magnitude + "%" -- Figma's own trend text has no +/-
prefix at all, direction is conveyed by the icon alone. Same
up/down -> success/danger-solid mapping Ticker already established
for this exact kind of trend indicator in this library (Figma's own
green here, #16a34a, isn't a token in this system -- closest existing
semantic is success/solid, same normalization Ticker's own doc
argues for).

\`value\` is a plain pre-formatted string ("10,000+", "99.9%'), not a
number: Figma's own two examples use completely different formats
(a "+"-suffixed count vs. a percentage) that don't share a single
numeric-formatting function, so the caller owns formatting entirely.` } } },
} satisfies Meta<typeof Metric>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: { value: '10,000+', label: 'Developers building with Sakani' },
};

export const WithTrend: Story = {
  args: { value: '99.9%', label: 'Platform uptime this quarter', trend: 0.2 },
};

export const WithDownTrend: Story = {
  args: { value: '2.4%', label: 'Monthly churn', trend: -0.6 },
};

export const DarkMode: Story = {
  args: { value: '99.9%', label: 'Platform uptime this quarter', trend: 0.2 },
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};
