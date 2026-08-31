import type { Meta, StoryObj } from '@storybook/react';
import { AddCardFormBlock } from './AddCardFormBlock';

const meta = {
  title: 'Blocks/Billing/Add Card Form',
  component: AddCardFormBlock,
  tags: ['autodocs'],
} satisfies Meta<typeof AddCardFormBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

const filledValue = {
  cardholderName: 'Sam Okpere',
  cardNumber: '4242 4242 4242 4242',
  expiry: '08/27',
  cvc: '123',
};

export const Default: Story = {
  args: {},
};

export const Filled: Story = {
  args: { initialValue: filledValue },
};

export const ValidationError: Story = {
  args: {
    initialValue: { ...filledValue, cardNumber: '' },
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
    initialStatus: 'loading',
  },
};

export const DarkMode: Story = {
  args: { initialValue: filledValue },
  decorators: [(S) => <div className="dark"><S /></div>],
};
