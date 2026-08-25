import type { Meta, StoryObj } from '@storybook/react';
import { ShoppingBag, Coffee, Banknote, Table, Zap } from 'lucide-react';
import { Transactions } from './Transactions';
import { iconStrokeWidth } from '../../../lib/iconStrokeWidth';

const icon = (Icon: typeof ShoppingBag) => <Icon size={20} strokeWidth={iconStrokeWidth(20)} />;

const transactions = [
  { name: 'Amazon', category: 'Shopping', amount: -84.2, icon: icon(ShoppingBag) },
  { name: 'Blue Bottle Coffee', category: 'Food & drink', amount: -6.5, icon: icon(Coffee) },
  { name: 'Payroll deposit', category: 'Income', amount: 3200, icon: icon(Banknote) },
  { name: 'Netflix', category: 'Entertainment', amount: -15.99, icon: icon(Table) },
  { name: 'City Power & Light', category: 'Utilities', amount: -62.1, icon: icon(Zap) },
];

const meta = {
  title: 'Application/Transactions',
  component: Transactions,
  tags: ['autodocs'],
  decorators: [(S) => <div style={{ width: 400 }}><S /></div>],
} satisfies Meta<typeof Transactions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { transactions },
};

export const Empty: Story = {
  args: { transactions: [] },
};

export const DarkMode: Story = {
  args: { transactions },
  decorators: [(S) => <div className="dark" style={{ width: 400, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
