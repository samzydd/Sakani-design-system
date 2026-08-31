import type { Meta, StoryObj } from '@storybook/react';
import { CurrentPlanBlock } from './CurrentPlanBlock';

const meta = {
  title: 'Blocks/Billing/Current Plan',
  component: CurrentPlanBlock,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `A COMPOSITION EXAMPLE, not a configurable component. Copy this file
into your project and edit it directly: wire the action callbacks to
your real subscription-management API in place of the ones here.

Matches Figma "Current Plan" (5 states: Default, Trial, Past Due,
Canceling, Skeleton). Composed entirely from existing components --
Badge (status pill), Progress (lg, the usage bar), Alert (danger,
Past Due only), Button (primary/secondary), Skeleton.

The 5 Figma states collapse into one real \`status\` union ('active' |
'trial' | 'past-due' | 'canceling'), same "derive the whole layout
from one status" pattern EmailVerificationBlock's own status machine
uses -- badge label/color, whether the usage row or Alert banner
shows, the default message copy, and which action button(s) render
are all derived from it, not separate manual toggles:
- **active** — usage row + Progress bar, Upgrade/Cancel buttons
- **trial** — message line, single "Add payment method" button
- **past-due** — Alert banner (danger), single "Update payment method" button
- **canceling** — message line, single "Resume subscription" button

Skeleton is a separate explicit \`loading\` flag instead, same
reasoning BillingHistoryBlock's own loading flag gives: there's no
plan data yet at that point to derive a status from.` } } },
} satisfies Meta<typeof CurrentPlanBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    planName: 'Pro plan',
    price: '$29',
    status: 'active',
    usageLabel: 'Projects used',
    usageValue: '32 / 50',
    usagePercent: 64,
  },
};

export const Trial: Story = {
  args: {
    planName: 'Pro trial',
    price: '$29',
    priceSuffix: '/month after trial',
    status: 'trial',
  },
};

export const PastDue: Story = {
  args: {
    planName: 'Pro plan',
    price: '$29',
    status: 'past-due',
  },
};

export const Canceling: Story = {
  args: {
    planName: 'Pro plan',
    price: '$29',
    status: 'canceling',
  },
};

export const Loading: Story = {
  args: {
    planName: 'Pro plan',
    price: '$29',
    loading: true,
  },
};

export const DarkMode: Story = {
  args: Active.args,
  decorators: [(S) => <div className="dark"><S /></div>],
};
