import type { Meta, StoryObj } from '@storybook/react';
import { AccountOverviewBlock } from './AccountOverviewBlock';

const meta = {
  title: 'Blocks/Application/Account Overview',
  component: AccountOverviewBlock,
  tags: ['autodocs'],
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
