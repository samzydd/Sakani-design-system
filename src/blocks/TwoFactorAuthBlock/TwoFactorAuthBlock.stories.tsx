import type { Meta, StoryObj } from '@storybook/react';
import { TwoFactorAuthBlock } from './TwoFactorAuthBlock';

const meta = {
  title: 'Blocks/Authentication/Two-Factor Authentication',
  component: TwoFactorAuthBlock,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
your project and edit it directly: wire \`onVerify\`/\`onUseBackupCode\` to
your real API calls in place of the simulated ones here.

Matches Figma "2FA Verification" -- structurally identical to
EmailVerificationBlock (same 6-state machine, same OTP row behavior,
same disabled-until-complete Verify button, same reasoning for every
reuse-vs-build call: see that file's header for the full rationale,
deliberately not repeated here) with two content differences:
- a "Trust this device for 30 days" Checkbox between the OTP row and
the Button (reuses the shared Checkbox component directly)
- footer reads "Lost your device? Use a backup code" instead of a
resend prompt
The two are kept as separate self-contained block files rather than one
block with a \`kind\` prop, matching the Blocks convention (and the CLI's
assumption) that a block is one standalone, independently copy-paste-able
file -- sharing an internal sub-component between them isn't safe to
assume a copy-paste consumer would grab too.` } } },
  decorators: [(S) => <div style={{ width: 400 }}><S /></div>],
} satisfies Meta<typeof TwoFactorAuthBlock>;

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
