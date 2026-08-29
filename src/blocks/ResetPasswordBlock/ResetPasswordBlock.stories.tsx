import type { Meta, StoryObj } from '@storybook/react';
import { ResetPasswordBlock } from './ResetPasswordBlock';

const meta = {
  title: 'Blocks/Authentication/Reset Password',
  component: ResetPasswordBlock,
  tags: ['autodocs'],
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
