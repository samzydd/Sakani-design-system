import type { Meta, StoryObj } from '@storybook/react';
import { EmailVerificationBlock } from './EmailVerificationBlock';

const meta = {
  title: 'Blocks/Authentication/Email Verification',
  component: EmailVerificationBlock,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
your project and edit it directly: wire \`onVerify\`/\`onResend\` to your
real API calls in place of the simulated ones here.

Matches Figma "Email Verification" (7 states): card -> header -> 6-digit
OTP row -> primary Button -> "Didn't receive a code? Resend" footer.
The Verify button stays disabled until all 6 digits are filled (derived
from \`code\`, not a separate flag) -- so mid-entry it reads as
unavailable, and only turns active once the code is complete.

Default/Filled aren't a manual prop -- Figma's own two previews are the
exact same empty/filled OTP row, which is just \`code\` state, same
"derive from data" pattern used throughout this library. The remaining
states collapse into one \`status\` state machine ('idle' | 'incomplete' |
'server-error' | 'loading' | 'success' | 'skeleton'):
- **incomplete** — Validation Error: submitted with <6 digits, inline hint text under the row (Figma shows this in fg/muted, not danger-colored -- an incomplete code isn't treated as a hard error visually, so that's followed literally)
- **server-error** — Alert banner (danger) + every box gets a danger border
- **loading** — boxes disabled/dimmed, Button shows its own spinner
- **success** — an entirely different layout (icon-wrap + centered copy + Continue button), not a modifier on the OTP card

The OTP row is NOT a reuse of the shared Input component -- Input carries
label/description/leading-icon plumbing this single centered digit box
doesn't need, and needs auto-advance-on-type / backspace-to-previous /
paste-splits-across-boxes behavior Input has no hook for. Built as a
small dedicated element instead, bound to the same tokens (exact border/
radius/bg match), same reasoning as FileUploadPanelBlock's dropzone.

Alert has no built-in dismiss control, so the small "x" Figma shows on
the Server Error banner isn't reproduced here -- a real dismiss would
need extending the shared Alert component, out of scope for this block.` } } },
  decorators: [(S) => <div style={{ width: 400 }}><S /></div>],
} satisfies Meta<typeof EmailVerificationBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Incomplete: Story = { args: { initialStatus: 'incomplete' } };
export const ServerError: Story = { args: { initialStatus: 'server-error' } };
export const Loading: Story = { args: { initialStatus: 'loading' } };
export const Success: Story = { args: { initialStatus: 'success' } };
export const Skeleton: Story = { args: { initialStatus: 'skeleton' } };

export const DarkMode: Story = {
  args: { initialStatus: 'server-error' },
  decorators: [(S) => <div className="dark" style={{ width: 400, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
