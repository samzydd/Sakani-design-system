import type { Meta, StoryObj } from '@storybook/react';
import { DonutChart } from './DonutChart';

const data = [
  { label: 'Direct', value: 45 },
  { label: 'Referral', value: 25 },
  { label: 'Social', value: 18 },
  { label: 'Email', value: 12 },
];

const meta = {
  title: 'Charts/Donut Chart',
  component: DonutChart,
  tags: ['autodocs'],
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] } },
  args: { data, size: 'md', centerValue: '100%', centerCaption: 'Traffic' },
  decorators: [(S) => <div style={{ width: 360 }}><S /></div>],
} satisfies Meta<typeof DonutChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoCenterLabel: Story = { args: { centerValue: undefined, centerCaption: undefined } };
export const Large: Story = { args: { size: 'lg' } };
export const DarkMode: Story = {
  decorators: [(S) => <div className="dark" style={{ width: 360, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
