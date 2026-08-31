import type { Meta, StoryObj } from '@storybook/react';
import { CurrentPlanBlock } from './CurrentPlanBlock';

const meta = {
  title: 'Blocks/Billing/Current Plan',
  component: CurrentPlanBlock,
  tags: ['autodocs'],
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
