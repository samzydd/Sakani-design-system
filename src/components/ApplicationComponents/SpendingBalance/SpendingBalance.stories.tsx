import type { Meta, StoryObj } from '@storybook/react';
import { SpendingBalance } from './SpendingBalance';

const meta = {
  title: 'Application/Spending Balance',
  component: SpendingBalance,
  tags: ['autodocs'],
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
