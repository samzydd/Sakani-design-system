import type { Meta, StoryObj } from '@storybook/react';
import { Metric } from './Metric';

const meta = {
  title: 'Marketing/Metric',
  component: Metric,
  tags: ['autodocs'],
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
