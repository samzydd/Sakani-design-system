import type { Meta, StoryObj } from '@storybook/react';
import { BarChart } from './BarChart';

const data = [
  { label: 'Jan', value: 420 }, { label: 'Feb', value: 380 }, { label: 'Mar', value: 510 },
  { label: 'Apr', value: 470 }, { label: 'May', value: 590 }, { label: 'Jun', value: 620 },
];

const groupedData = [
  { label: 'Jan', value: 420, value2: 260 }, { label: 'Feb', value: 380, value2: 300 },
  { label: 'Mar', value: 510, value2: 340 }, { label: 'Apr', value: 470, value2: 310 },
  { label: 'May', value: 590, value2: 380 }, { label: 'Jun', value: 620, value2: 410 },
];

const negativeData = [
  { label: 'Jan', value: 240 }, { label: 'Feb', value: -120 }, { label: 'Mar', value: 310 },
  { label: 'Apr', value: -60 }, { label: 'May', value: 190 }, { label: 'Jun', value: -180 },
];

const meta = {
  title: 'Charts/Bar Chart',
  component: BarChart,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'active', 'multiple', 'stacked', 'negative', 'horizontal'] },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
  },
  args: { data, size: 'md' },
  decorators: [(S) => <div style={{ width: 560 }}><S /></div>],
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Active: Story = { args: { variant: 'active' } };
export const Multiple: Story = {
  args: { variant: 'multiple', data: groupedData, seriesLabels: ['Revenue', 'Costs'] },
};
export const StackedLegend: Story = {
  args: { variant: 'stacked', data: groupedData, seriesLabels: ['Revenue', 'Costs'] },
};
export const Negative: Story = { args: { variant: 'negative', data: negativeData } };
export const Horizontal: Story = { args: { variant: 'horizontal' } };
export const Large: Story = { args: { size: 'lg' } };
export const DarkMode: Story = {
  decorators: [(S) => <div className="dark" style={{ width: 560, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
