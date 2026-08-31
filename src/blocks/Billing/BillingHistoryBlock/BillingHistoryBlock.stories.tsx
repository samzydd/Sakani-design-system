import type { Meta, StoryObj } from '@storybook/react';
import { BillingHistoryBlock } from './BillingHistoryBlock';
import type { BillingHistoryInvoice } from './BillingHistoryBlock';

const meta = {
  title: 'Blocks/Billing/Billing History',
  component: BillingHistoryBlock,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `A COMPOSITION EXAMPLE, not a configurable component. Copy this file
into your project and edit it directly: wire \`onDownload\` to your
real invoice PDF endpoint in place of the callback here.

Matches Figma "Billing History" (3 states: Default, Empty, Skeleton).
Composed entirely from existing components -- Badge (status pill),
IconButton (ghost, sm, the download action), Skeleton -- plus a small
block-owned row (FileText icon + plan/date, amount, badge, download)
since no shared "invoice row" primitive exists in this library.

Empty isn't a manual prop -- it's derived from \`invoices.length === 0\`,
same "derive from data" pattern used throughout this library. Skeleton
needs an explicit \`loading\` flag instead: unlike Empty, there's no
data yet to derive it from.

The divider between rows (border-top on every row but the first) is
owned by this block, same reasoning/shape as CareersBlock's own
rowDivider treatment for its JobListing rows.` } } },
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
