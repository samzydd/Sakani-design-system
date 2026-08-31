import type { Meta, StoryObj } from '@storybook/react';
import { SpendingBalance } from './SpendingBalance';

const meta = {
  title: 'Application/Spending Balance',
  component: SpendingBalance,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Amount spent against a limit, with a bar and a remaining/over-limit
footer. Matches Figma "Spending Balance" -- its 2 style previews
(Default: spent < limit, black bar, "remaining"; Over Limit: spent >=
limit, orange bar, "over your limit") are entirely computable from the
real numbers, so there's no variant prop -- "over limit" is derived from
\`spent > limit\`, same judgment applied throughout this Application set.

The bar isn't a reuse of Progress -- Progress's fill color is hardcoded
to accent/default with no override prop, but this needs a genuinely
different fill color (chart/1 orange) once over limit, which Progress
has no escape hatch for short of relying on its private internal class
names. Small dedicated bar instead, same call already made for Balance's
progress ring and several connectors throughout this set.` } } },
  args: { limit: 2000 },
  decorators: [(S) => <div style={{ width: 320 }}><S /></div>],
} satisfies Meta<typeof SpendingBalance>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { spent: 1240 } };
export const OverLimit: Story = { args: { spent: 2180 } };
export const DarkMode: Story = {
  args: { spent: 2180 },
  decorators: [(S) => <div className="dark" style={{ width: 320, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
