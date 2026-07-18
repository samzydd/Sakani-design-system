import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';

const meta = {
  title: 'Composite/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: { status: { control: 'select', options: ['success', 'error', 'info'] } },
  args: { status: 'success', title: 'Saved', description: 'Your changes have been saved.', onDismiss: () => {} },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = { args: { status: 'success', title: 'Saved', description: 'Your changes have been saved.' } };
export const Error: Story = { args: { status: 'error', title: 'Upload failed', description: 'Please try again.' } };
export const Info: Story = { args: { status: 'info', title: 'New update available', description: 'Refresh to get the latest.' } };

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Toast status="success" title="Saved" description="Your changes have been saved." onDismiss={() => {}} />
      <Toast status="error" title="Upload failed" description="Please try again." onDismiss={() => {}} />
      <Toast status="info" title="Update available" description="Refresh to get the latest." onDismiss={() => {}} />
    </div>
  ),
};
