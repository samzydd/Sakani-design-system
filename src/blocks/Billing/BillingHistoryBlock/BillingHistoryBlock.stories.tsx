import type { Meta, StoryObj } from '@storybook/react';
import { BillingHistoryBlock } from './BillingHistoryBlock';
import type { BillingHistoryInvoice } from './BillingHistoryBlock';

const meta = {
  title: 'Blocks/Billing/Billing History',
  component: BillingHistoryBlock,
  tags: ['autodocs'],
} satisfies Meta<typeof BillingHistoryBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

const invoices: BillingHistoryInvoice[] = [
  { planLabel: 'Pro plan — Monthly', date: 'Aug 1, 2026', amount: '$29.00', status: 'paid' },
  { planLabel: 'Pro plan — Monthly', date: 'Jul 1, 2026', amount: '$29.00', status: 'paid' },
  { planLabel: 'Pro plan — Monthly', date: 'Jun 1, 2026', amount: '$29.00', status: 'failed' },
  { planLabel: 'Pro plan — Monthly', date: 'May 1, 2026', amount: '$29.00', status: 'paid' },
];

export const Default: Story = {
  args: { invoices },
};

export const Empty: Story = {
  args: { invoices: [] },
};

export const Loading: Story = {
  args: { loading: true },
};

export const DarkMode: Story = {
  args: { invoices },
  decorators: [(S) => <div className="dark"><S /></div>],
};
