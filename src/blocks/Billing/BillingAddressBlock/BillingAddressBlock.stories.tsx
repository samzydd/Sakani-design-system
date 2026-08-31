import type { Meta, StoryObj } from '@storybook/react';
import { BillingAddressBlock } from './BillingAddressBlock';

const meta = {
  title: 'Blocks/Billing/Billing Address',
  component: BillingAddressBlock,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `A COMPOSITION EXAMPLE, not a configurable component. Copy this file
into your project and edit it directly: wire \`onSave\` to your real API
call in place of the simulated one here.

Matches Figma "Billing Address" (5 states: Default, Filled, Validation
Error, Server Error, Loading). Composed entirely from existing form
components -- Select (Country), Input (the other 5 fields), Alert
(danger, Server Error only), Button (primary, full width).

Default/Filled aren't a manual prop -- Figma's own two previews are the
same form with/without values, which is just field state, same
"derive from data" pattern EmailVerificationBlock's own Default/Filled
uses for its OTP row. The remaining 3 states collapse into one real
\`status\` state machine ('idle' | 'invalid' | 'server-error' |
'loading'), same shape as EmailVerificationBlock's own status union:
- **invalid** — Validation Error: postal code fails a light sanity check on submit, inline error text under that field only (Select/Input's own built-in \`error\` prop -- no extra markup needed for this state)
- **server-error** — Alert banner (danger) above the form; fields keep their values so the user doesn't have to retype
- **loading** — every field disabled (Select/Input's own disabled visual already matches Figma's dimmed bg/subtle look exactly), Button shows its own built-in loading spinner + "Saving…" label

Submitting with a real postal code clears any prior error and calls
\`onSave\` after a short simulated delay -- there's no distinct
"success" visual in Figma's own 5 states, so this simply returns to
idle with the saved values still filled in, same as a real save would
leave the form.` } } },
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
