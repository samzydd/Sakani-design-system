import type { Meta, StoryObj } from '@storybook/react';
import { LineChart } from './LineChart';

const data = [
  { label: 'Jan', revenue: 4200, cost: 2400 },
  { label: 'Feb', revenue: 3800, cost: 2210 },
  { label: 'Mar', revenue: 5100, cost: 2800 },
  { label: 'Apr', revenue: 4700, cost: 2600 },
  { label: 'May', revenue: 5900, cost: 3100 },
  { label: 'Jun', revenue: 6200, cost: 3300 },
];

const meta = {
  title: 'Charts/Line Chart',
  component: LineChart,
  tags: ['autodocs'],
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] } },
  args: { data, series: ['revenue'], size: 'md' },
  decorators: [(S) => <div style={{ width: 560 }}><S /></div>],
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {};
export const MultiSeries: Story = { args: { series: ['revenue', 'cost'], showLegend: true } };
export const DarkMode: Story = {
  args: { series: ['revenue', 'cost'], showLegend: true },
  decorators: [(S) => <div className="dark" style={{ width: 560, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
