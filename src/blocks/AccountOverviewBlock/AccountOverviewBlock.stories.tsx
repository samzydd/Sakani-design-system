import type { Meta, StoryObj } from '@storybook/react';
import { AccountOverviewBlock } from './AccountOverviewBlock';

const meta = {
  title: 'Blocks/Application/Account Overview',
  component: AccountOverviewBlock,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
your project and edit it directly. Everything here is assembled from
existing Sakani components -- no new primitives:

Balance (available balance + change) -> Divider -> SpendingBalance
-> optionally another Divider + a savings-goal Progress bar

Mirrors the two states in the Figma block:
- **default** — balance + spending only
- **detailed** — adds a savings-goal section` } } },
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'detailed'],
    },
  },
} satisfies Meta<typeof AccountOverviewBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Balance and spending only. */
export const Default: Story = { args: { state: 'default' } };
/** Adds a savings-goal section below the spending balance. */
export const Detailed: Story = { args: { state: 'detailed' } };

export const DarkMode: Story = {
  args: { state: 'detailed' },
  decorators: [(S) => <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
