import type { Meta, StoryObj } from '@storybook/react';
import { BillingAddressBlock } from './BillingAddressBlock';

const meta = {
  title: 'Blocks/Billing/Billing Address',
  component: BillingAddressBlock,
  tags: ['autodocs'],
} satisfies Meta<typeof BillingAddressBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

const filledValue = {
  country: 'NG',
  addressLine1: '12 Admiralty Way',
  city: 'Lagos',
  state: 'Lagos',
  postalCode: '101233',
};

export const Default: Story = {
  args: {},
};

export const Filled: Story = {
  args: { initialValue: filledValue },
};

export const ValidationError: Story = {
  args: {
    initialValue: { ...filledValue, postalCode: 'AB' },
    initialStatus: 'invalid',
  },
};

export const ServerError: Story = {
  args: {
    initialValue: filledValue,
    initialStatus: 'server-error',
  },
};

export const Loading: Story = {
  args: {
    initialValue: filledValue,
    initialStatus: 'loading',
  },
};

export const DarkMode: Story = {
  args: { initialValue: filledValue },
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};
