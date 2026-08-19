import type { Meta, StoryObj } from '@storybook/react';
import { LineChart } from './LineChart';

const data = [
  { label: 'Jan', revenue: 4200, cost: 2400, item: 'Item 1' },
  { label: 'Feb', revenue: 3800, cost: 2210, item: 'Item 2' },
  { label: 'Mar', revenue: 5100, cost: 2800, item: 'Item 3' },
  { label: 'Apr', revenue: 4700, cost: 2600, item: 'Item 4' },
  { label: 'May', revenue: 5900, cost: 3100, item: 'Item 5' },
  { label: 'Jun', revenue: 6200, cost: 3300, item: 'Item 6' },
];

const meta = {
  title: 'Charts/Line Chart',
  component: LineChart,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'linear', 'step', 'multiple', 'dots', 'custom-dots', 'dots-colors', 'label', 'custom-label'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
  },
  args: { data, series: ['revenue'], variant: 'default', size: 'md' },
  decorators: [(S) => <div style={{ width: 560 }}><S /></div>],
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Linear: Story = { args: { variant: 'linear' } };
export const Step: Story = { args: { variant: 'step' } };
export const Multiple: Story = { args: { variant: 'multiple', series: ['revenue', 'cost'], showLegend: true } };
export const Dots: Story = { args: { variant: 'dots' } };
export const CustomDots: Story = { args: { variant: 'custom-dots' } };
export const DotsColors: Story = { args: { variant: 'dots-colors' } };
export const Label: Story = { args: { variant: 'label' } };
export const CustomLabel: Story = { args: { variant: 'custom-label', labelKey: 'item' } };
export const MultiSeries: Story = { args: { series: ['revenue', 'cost'], showLegend: true } };
export const DarkMode: Story = {
  args: { series: ['revenue', 'cost'], showLegend: true },
  decorators: [(S) => <div className="dark" style={{ width: 560, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
