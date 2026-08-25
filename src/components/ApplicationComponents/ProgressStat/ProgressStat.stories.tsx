import type { Meta, StoryObj } from '@storybook/react';
import { ProgressStat } from './ProgressStat';

const meta = {
  title: 'Application/Progress Stat',
  component: ProgressStat,
  tags: ['autodocs'],
  decorators: [(S) => <div style={{ width: 320 }}><S /></div>],
} satisfies Meta<typeof ProgressStat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Percentage: Story = {
  args: { label: 'Profile completion', value: '80%', progress: 80 },
};
export const Value: Story = {
  args: { label: 'Storage used', value: '24 GB / 30 GB', progress: (24 / 30) * 100 },
};
export const DarkMode: Story = {
  args: { label: 'Profile completion', value: '80%', progress: 80 },
  decorators: [(S) => <div className="dark" style={{ width: 320, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
