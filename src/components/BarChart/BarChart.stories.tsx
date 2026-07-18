import type { Meta, StoryObj } from '@storybook/react';
import { BarChart } from './BarChart';

const data = [
  { label: 'Jan', value: 420 }, { label: 'Feb', value: 380 }, { label: 'Mar', value: 510 },
  { label: 'Apr', value: 470 }, { label: 'May', value: 590 }, { label: 'Jun', value: 620 },
];

const meta = {
  title: 'Charts/Bar Chart',
  component: BarChart,
  tags: ['autodocs'],
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] } },
  args: { data, size: 'md' },
  decorators: [(S) => <div style={{ width: 560 }}><S /></div>],
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Multicolor: Story = { args: { multicolor: true } };
export const Large: Story = { args: { size: 'lg' } };
export const DarkMode: Story = {
  decorators: [(S) => <div className="dark" style={{ width: 560, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
