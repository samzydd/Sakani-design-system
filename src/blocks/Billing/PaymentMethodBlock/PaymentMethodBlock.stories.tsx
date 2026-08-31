import type { Meta, StoryObj } from '@storybook/react';
import { PaymentMethodBlock } from './PaymentMethodBlock';

const meta = {
  title: 'Blocks/Billing/Payment Method',
  component: PaymentMethodBlock,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `A COMPOSITION EXAMPLE, not a configurable component. Copy this file
into your project and edit it directly: wire the action callbacks to
your real payment-provider (Stripe, etc.) update/add flows.

Matches Figma "Payment Method" (5 states: Default, Empty, Expiring
Soon, Expired, Skeleton). Composed from existing components -- Badge
(status pill), Button, Skeleton -- plus the real Visa/Mastercard
marks in cardBrandIcons.tsx (see that file's own doc comment).

Empty isn't a manual prop -- it's derived from \`card\` being absent,
same "derive from data" pattern used throughout this library. The
remaining 3 non-empty states (Default/Expiring Soon/Expired) collapse
into \`card.status\` ('active' | 'expiring-soon' | 'expired'): whether
a badge shows, its color/label, and whether the action button is
secondary (active) or primary (expiring-soon/expired, matching
Figma's own visual urgency escalation) are all derived from it.
Skeleton needs an explicit \`loading\` flag instead, same reasoning as
every other Billing block's own loading flag: there's no card data
yet at that point to derive a status from.` } } },
} satisfies Meta<typeof PaymentMethodBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    card: { brand: 'visa', last4: '4242', expiry: '08/27', status: 'active' },
  },
};

export const Empty: Story = {
  args: {},
};

export const ExpiringSoon: Story = {
  args: {
    card: { brand: 'mastercard', last4: '8891', expiry: '09/26', status: 'expiring-soon' },
  },
};

export const Expired: Story = {
  args: {
    card: { brand: 'visa', last4: '4242', expiry: '01/26', status: 'expired' },
  },
};

export const Loading: Story = {
  args: { loading: true },
};

export const DarkMode: Story = {
  args: Default.args,
  decorators: [(S) => <div className="dark"><S /></div>],
};
