import type { Meta, StoryObj } from '@storybook/react';
import { RadialChart } from './RadialChart';

const multiData = [
  { label: 'Direct', value: 80 },
  { label: 'Referral', value: 65 },
  { label: 'Social', value: 50 },
  { label: 'Email', value: 35 },
  { label: 'Other', value: 20 },
];

const meta = {
  title: 'Charts/Radial Chart',
  component: RadialChart,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['multi', 'single', 'stacked'] },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
  },
  args: { data: multiData, variant: 'multi', size: 'md' },
  decorators: [(S) => <div style={{ width: 320 }}><S /></div>],
} satisfies Meta<typeof RadialChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Multi: Story = {};
export const Single: Story = {
  args: { data: [{ label: 'Users', value: 800, max: 1000 }], variant: 'single', centerValue: '800', centerCaption: 'Users' },
};
export const Stacked: Story = {
  args: {
    data: [
      { label: 'Costs', value: 65 },
      { label: 'Revenue', value: 40 },
    ],
    variant: 'stacked',
    centerValue: '3,130',
    centerCaption: 'Users',
  },
};
export const Large: Story = { args: { size: 'lg' } };
export const DarkMode: Story = {
  decorators: [(S) => <div className="dark" style={{ width: 320, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
