import type { Meta, StoryObj } from '@storybook/react';
import { ResetPasswordBlock } from './ResetPasswordBlock';

const meta = {
  title: 'Blocks/Authentication/Reset Password',
  component: ResetPasswordBlock,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
your project and edit it directly: wire \`onSubmit\` to your real API call
in place of the simulated one here, and swap in a real password-strength
check for the demo's "just don't match" validation.

Matches Figma "Reset Password" (7 states, collapsed into one \`status\`
state machine, same pattern as the other Authentication blocks):
- **'idle'** — Default/Filled: just field state, not a manual prop
- **'mismatch'** — Validation Error: only the Confirm field gets the error (New password stays valid-looking, matching Figma exactly)
- **'loading'** — both fields disabled, Button spinner
- **'expired'** — an entirely different layout (shield icon-wrap + centered copy + "Request new link" + "Back to log in"), not a modifier on the form -- this is reachable via \`initialStatus\` for a token-expired deep link, not something the form itself transitions into
- **'success'** — another different layout (check icon-wrap + centered copy + single "Continue to log in" button)
- **'skeleton'**

The Update button stays disabled until both fields are non-empty, same
disabled-until-complete pattern as the other Authentication blocks.

Neither password field reuses the shared Input component: Figma's
trailing eye icon toggles show/hide, a real interactive control, but
Input's trailingIcon slot renders inside an aria-hidden, non-focusable
span (fine for the decorative icons every other block uses it for, wrong
for a control someone needs to actually click/tab to) -- so these are
hand-built instead, bound to the exact same tokens as Input's own field
frame (border/subtle, radius-md, bg/surface, disabled bg/subtle).` } } },
  decorators: [(S) => <div style={{ width: 400 }}><S /></div>],
} satisfies Meta<typeof ResetPasswordBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Mismatch: Story = { args: { initialStatus: 'mismatch' } };
export const Loading: Story = { args: { initialStatus: 'loading' } };
export const Expired: Story = { args: { initialStatus: 'expired' } };
export const Success: Story = { args: { initialStatus: 'success' } };
export const Skeleton: Story = { args: { initialStatus: 'skeleton' } };

export const DarkMode: Story = {
  args: { initialStatus: 'mismatch' },
  decorators: [(S) => <div className="dark" style={{ width: 400, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
