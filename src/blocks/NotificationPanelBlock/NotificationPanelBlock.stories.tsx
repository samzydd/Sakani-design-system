import type { Meta, StoryObj } from '@storybook/react';
import { NotificationPanelBlock } from './NotificationPanelBlock';

const items = [
  { id: '1', title: 'New comment on your design', timestamp: '2 minutes ago', read: false },
  { id: '2', title: 'Chidi Duru mentioned you in Design Review', timestamp: '1 hour ago', read: false },
  { id: '3', title: 'Your export finished processing', timestamp: '3 hours ago', read: true },
  { id: '4', title: 'Weekly summary is ready', timestamp: 'Yesterday', read: true },
];

const meta = {
  title: 'Blocks/Application/Notification Panel',
  component: NotificationPanelBlock,
  tags: ['autodocs'],
  decorators: [(S) => <div style={{ width: 460 }}><S /></div>],
} satisfies Meta<typeof NotificationPanelBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { items },
};

export const Empty: Story = {
  args: { items: [] },
};

export const DarkMode: Story = {
  args: { items },
  decorators: [(S) => <div className="dark" style={{ width: 460, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
