import type { Meta, StoryObj } from '@storybook/react';
import { ForgotPasswordBlock } from './ForgotPasswordBlock';

const meta = {
  title: 'Blocks/Authentication/Forgot Password',
  component: ForgotPasswordBlock,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
your project and edit it directly: wire \`onSubmit\`/\`onResend\` to your
real API calls in place of the simulated ones here.

Matches Figma "Forgot Password" (7 states, collapsed into one \`status\`
state machine, same pattern as EmailVerificationBlock):
- **'idle'** — Default/Filled: just \`email\` state, not a manual prop
- **'invalid-email'** — Validation Error: reuses Input's own \`error\` prop
- **'server-error'** — Alert banner above the form
- **'loading'** — Input disabled (Input's own disabled style already matches Figma's dimmed bg/subtle look), Button spinner
- **'sent'** — an entirely different layout (icon-wrap + centered copy + secondary "Resend email" + "Back to log in"), not a modifier on the form card
- **'skeleton'**

The Send button stays disabled until the email field is non-empty, same
disabled-until-complete pattern as the OTP blocks' Verify button.

The email field reuses the shared Input component directly (leading Mail
icon, \`error\` prop) -- unlike ResetPasswordBlock's password fields, there's
no interactive trailing control here that Input's decorative-only
trailingIcon slot couldn't support, so no bespoke field was needed.` } } },
  decorators: [(S) => <div style={{ width: 400 }}><S /></div>],
} satisfies Meta<typeof ForgotPasswordBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const InvalidEmail: Story = { args: { initialStatus: 'invalid-email', initialEmail: 'sam@sakani' } };
export const ServerError: Story = { args: { initialStatus: 'server-error' } };
export const Loading: Story = { args: { initialStatus: 'loading' } };
export const Sent: Story = { args: { initialStatus: 'sent', initialEmail: 'sam@sakani.com' } };
export const Skeleton: Story = { args: { initialStatus: 'skeleton' } };

export const DarkMode: Story = {
  args: { initialStatus: 'server-error' },
  decorators: [(S) => <div className="dark" style={{ width: 400, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
