import type { Meta, StoryObj } from '@storybook/react';
import { AddCardFormBlock } from './AddCardFormBlock';

const meta = {
  title: 'Blocks/Billing/Add Card Form',
  component: AddCardFormBlock,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `A COMPOSITION EXAMPLE, not a configurable component. Copy this file
into your project and edit it directly: wire \`onSave\` to your real
payment-provider tokenization call (Stripe Elements, etc.) in place
of the simulated one here -- a real integration should never send a
raw PAN/CVC to your own backend at all.

Matches Figma "Add Card Form" (5 states: Form Default, Form Filled,
Form Validation Error, Form Server Error, Form Loading) -- the
second of the two Figma links for "Payment method", alongside
PaymentMethodBlock. Composed entirely from existing form components
-- Input (all 4 fields, with lucide User/CreditCard leading icons),
Alert (danger, Server Error only), Button (primary, full width, its
own built-in loading spinner).

Same shape as BillingAddressBlock's own status machine: Default/
Filled are just field content, not a manual prop; the remaining 3
states collapse into one real \`status\` union ('idle' | 'invalid' |
'server-error' | 'loading') -- submitting runs a light card-number
sanity check (inline error on that field only, via Input's own
\`error\` prop), simulates a save, and calls \`onSave\`.

Card number/expiry formatting (digit-grouping into "1234 1234 1234
1234" / "MM/YY") mirrors CheckoutFlowBlock's own formatCardNumber/
formatExpiry helpers -- reimplemented locally rather than imported,
since those are block-local, not exported from that block.` } } },
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
