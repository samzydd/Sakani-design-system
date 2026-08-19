import type { Meta, StoryObj } from '@storybook/react';
import { PieChart } from './PieChart';

const data = [
  { label: 'Direct', value: 45 },
  { label: 'Referral', value: 25 },
  { label: 'Social', value: 18 },
  { label: 'Email', value: 12 },
  { label: 'Other', value: 8 },
];

const meta = {
  title: 'Charts/Pie Chart',
  component: PieChart,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['pie', 'pie-no-separator', 'label', 'custom-label', 'label-list', 'donut', 'donut-active', 'donut-with-text', 'stacked', 'interactive'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
  },
  args: { data, variant: 'donut', size: 'md' },
  decorators: [(S) => <div style={{ width: 360 }}><S /></div>],
} satisfies Meta<typeof PieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pie: Story = { args: { variant: 'pie' } };
export const PieNoSeparator: Story = { args: { variant: 'pie-no-separator' } };
export const Label: Story = { args: { variant: 'label' } };
export const CustomLabel: Story = { args: { variant: 'custom-label' } };
export const LabelList: Story = { args: { variant: 'label-list' } };
export const Donut: Story = { args: { variant: 'donut' } };
export const DonutActive: Story = { args: { variant: 'donut-active' } };
export const DonutWithText: Story = {
  args: { variant: 'donut-with-text', centerValue: '2,230', centerCaption: 'Users' },
};
export const Stacked: Story = { args: { variant: 'stacked' } };
export const Interactive: Story = { args: { variant: 'interactive' } };
export const Large: Story = { args: { size: 'lg', variant: 'donut-with-text', centerValue: '2,230', centerCaption: 'Users' } };
export const DarkMode: Story = {
  args: { variant: 'donut' },
  decorators: [(S) => <div className="dark" style={{ width: 360, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
