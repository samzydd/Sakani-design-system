import type { Meta, StoryObj } from '@storybook/react';
import { ConversationItem } from './ConversationItem';
import { Avatar } from '../Avatar';

const meta = {
  title: 'Chat/Conversation Item',
  component: ConversationItem,
  tags: ['autodocs'],
  argTypes: { state: { control: 'select', options: ['default', 'hover', 'active', 'unread', 'typing', 'muted'] } },
  args: {
    avatar: <Avatar initials="AC" />,
    name: 'Amara Chen', timestamp: '12:04',
    preview: 'Sounds good — shipping today', state: 'default',
  },
} satisfies Meta<typeof ConversationItem>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Active: Story = { args: { state: 'active' } };
export const Unread: Story = { args: { state: 'unread', unreadCount: 3, preview: 'Can you review the latest flow?' } };
export const Typing: Story = { args: { state: 'typing' } };
export const Muted: Story = { args: { state: 'muted' } };
export const DarkMode: Story = {
  decorators: [(S) => (<div className="dark" style={{ background: 'var(--color-bg-canvas)', padding: 24 }}><S /></div>)],
};
