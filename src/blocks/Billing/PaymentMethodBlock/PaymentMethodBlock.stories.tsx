import type { Meta, StoryObj } from '@storybook/react';
import { PaymentMethodBlock } from './PaymentMethodBlock';

const meta = {
  title: 'Blocks/Billing/Payment Method',
  component: PaymentMethodBlock,
  tags: ['autodocs'],
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
