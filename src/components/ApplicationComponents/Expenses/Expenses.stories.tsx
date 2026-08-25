import type { Meta, StoryObj } from '@storybook/react';
import { ShoppingBag, Zap, Coffee, Grid3x3 } from 'lucide-react';
import { Expenses } from './Expenses';

const categories = [
  { icon: <ShoppingBag size={20} strokeWidth={1.5} />, label: 'Shopping', amount: 840.20 },
  { icon: <Zap size={20} strokeWidth={1.5} />, label: 'Utilities', amount: 620.10 },
  { icon: <Coffee size={20} strokeWidth={1.5} />, label: 'Food & drink', amount: 480.50 },
  { icon: <Grid3x3 size={20} strokeWidth={1.5} />, label: 'Entertainment', amount: 310.99 },
];

const meta = {
  title: 'Application/Expenses',
  component: Expenses,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'compact'] },
  },
  args: { categories },
  decorators: [(S) => <div style={{ width: 360 }}><S /></div>],
} satisfies Meta<typeof Expenses>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Compact: Story = { args: { variant: 'compact' } };
export const DarkMode: Story = {
  decorators: [(S) => <div className="dark" style={{ width: 360, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
