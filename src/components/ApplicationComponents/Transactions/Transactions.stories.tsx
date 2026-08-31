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
  parameters: { docs: { description: { component: `Matches Figma "Transactions" -- both style previews collapse to one
derived axis, same judgment applied throughout this Application set:
the Empty state renders whenever \`transactions\` is empty, rather than a
separate manual prop that could disagree with the actual data.

Each row's \`icon\` is a required, consumer-supplied slot (like StockMarket's
\`logo\`) -- category icons are arbitrary per integration, so there's no
sensible default mapping to bake in.

The Empty state is a bespoke block rather than a reuse of the shared
EmptyState component: EmptyState wraps its icon in a 40px filled chip and
uses 12px description text, but Figma's Transactions-Empty shows a bare
unwrapped icon and 14px body text at tighter spacing -- a real shape
difference, not a token nuance.

Amount color is derived from its own sign (>= 0 -> success, < 0 ->
danger), normalizing Figma's inconsistent hardcoded positive-green hex to
the same success/danger-solid tokens as every other signed value in this
set (StockMarket, SpendingBalance).` } } },
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
