import type { Meta, StoryObj } from '@storybook/react';
import { PieChart } from './PieChart';

const data = [
  { label: 'Direct', value: 45 },
  { label: 'Referral', value: 25 },
  { label: 'Social', value: 18 },
  { label: 'Email', value: 12 },
];

const meta = {
  title: 'Charts/Pie Chart',
  component: PieChart,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['pie', 'donut', 'donut-with-text', 'active'] },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
  },
  args: { data, variant: 'donut', size: 'md' },
  decorators: [(S) => <div style={{ width: 360 }}><S /></div>],
} satisfies Meta<typeof PieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pie: Story = { args: { variant: 'pie' } };
export const Donut: Story = { args: { variant: 'donut' } };
export const DonutWithText: Story = {
  args: { variant: 'donut-with-text', centerValue: '2,230', centerCaption: 'Users' },
};
export const WithLabels: Story = { args: { variant: 'pie', showLabels: true } };
export const Active: Story = {
  args: { variant: 'active', centerValue: '2,230', centerCaption: 'Users' },
};
export const Large: Story = { args: { size: 'lg', variant: 'donut-with-text', centerValue: '2,230', centerCaption: 'Users' } };
export const DarkMode: Story = {
  args: { variant: 'donut' },
  decorators: [(S) => <div className="dark" style={{ width: 360, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
