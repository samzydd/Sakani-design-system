import type { Meta, StoryObj } from '@storybook/react';
import { Balance } from './Balance';

const meta = {
  title: 'Application/Balance',
  component: Balance,
  tags: ['autodocs'],
  args: { value: '$24,582.30' },
  decorators: [(S) => <div style={{ width: 280 }}><S /></div>],
} satisfies Meta<typeof Balance>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Hidden: Story = { args: { hidden: true } };
export const WithChange: Story = {
  args: { change: { value: '+$1,240.50' } },
};
export const WithChangeDown: Story = {
  args: { change: { value: '-$320.10', direction: 'down' } },
};
export const Progress: Story = {
  args: { change: { value: '+$1,240.50' }, progress: 65 },
  decorators: [(S) => <div style={{ width: 420 }}><S /></div>],
};
export const DarkMode: Story = {
  args: { change: { value: '+$1,240.50' } },
  decorators: [(S) => <div className="dark" style={{ width: 280, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
