import type { Meta, StoryObj } from '@storybook/react';
import { Download } from 'lucide-react';
import { NotificationItem } from './NotificationItem';

const meta = {
  title: 'Application/Notification Item',
  component: NotificationItem,
  tags: ['autodocs'],
  args: { title: 'New comment on your design', timestamp: '2 minutes ago' },
  decorators: [(S) => <div style={{ width: 420 }}><S /></div>],
} satisfies Meta<typeof NotificationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unread: Story = {};
export const Read: Story = { args: { read: true } };
export const Dismissable: Story = {
  args: {
    title: 'Software update',
    description: 'The latest version is ready for installation.',
    icon: <Download size={24} strokeWidth={1.5} />,
    timestamp: undefined,
    actionLabel: 'Install',
    onAction: () => {},
    onDismiss: () => {},
  },
};
export const DarkMode: Story = {
  decorators: [(S) => <div className="dark" style={{ width: 420, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
