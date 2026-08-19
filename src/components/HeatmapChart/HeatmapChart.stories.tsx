import type { Meta, StoryObj } from '@storybook/react';
import { HeatmapChart } from './HeatmapChart';

const rowLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const colLabels = Array.from({ length: 12 }, (_, i) => `${i + 1}`);

const data = rowLabels.map((_, r) =>
  colLabels.map((_, c) => Math.round(Math.abs(Math.sin(r * 1.3 + c * 0.6)) * 90 + 10))
);

const meta = {
  title: 'Charts/Heatmap Chart',
  component: HeatmapChart,
  tags: ['autodocs'],
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] } },
  args: { data, rowLabels, colLabels, valueLabel: 'Revenue', size: 'md' },
  decorators: [(S) => <div style={{ width: 560 }}><S /></div>],
} satisfies Meta<typeof HeatmapChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Large: Story = { args: { size: 'lg' } };
export const DarkMode: Story = {
  decorators: [(S) => <div className="dark" style={{ width: 560, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
