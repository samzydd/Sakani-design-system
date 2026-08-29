import type { Meta, StoryObj } from '@storybook/react';
import { ForgotPasswordBlock } from './ForgotPasswordBlock';

const meta = {
  title: 'Blocks/Authentication/Forgot Password',
  component: ForgotPasswordBlock,
  tags: ['autodocs'],
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
