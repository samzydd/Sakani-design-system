import type { Meta, StoryObj } from '@storybook/react';
import { EmailVerificationBlock } from './EmailVerificationBlock';

const meta = {
  title: 'Blocks/Authentication/Email Verification',
  component: EmailVerificationBlock,
  tags: ['autodocs'],
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
