import type { Meta, StoryObj } from '@storybook/react';
import { ConversationItem } from './ConversationItem';
import { Avatar } from '../Avatar';

const meta = {
  title: 'Chat/Conversation Item',
  component: ConversationItem,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `One row in a chat conversation list. Matches the Figma "Conversation Item" set:

state (Figma "State" axis) -> default | hover | active | unread | typing | muted

Avatar (+ presence dot) · name + timestamp · preview (or "typing...") ·
unread count. Active uses accent/subtle; Unread bolds the name and adds a
count; Typing replaces the preview; Muted hides presence and adds a bell-off.` } } },
  argTypes: { state: { control: 'select', options: ['default', 'hover', 'active', 'unread', 'typing', 'muted'] } },
  args: {
    avatar: <Avatar initials="AC" />,
    name: 'Amara Chen', timestamp: '12:04',
    preview: 'Sounds good — shipping today', state: 'default',
  },
  // Demo at the real rail width so truncation behaves as it does in the block.
  decorators: [(S) => (<div style={{ width: 240, padding: 8 }}><S /></div>)],
} satisfies Meta<typeof ConversationItem>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Active: Story = { args: { state: 'active' } };
export const Unread: Story = { args: { state: 'unread', unreadCount: 3, preview: 'Can you review the latest flow?' } };
export const Typing: Story = { args: { state: 'typing' } };
export const Muted: Story = { args: { state: 'muted' } };
/** Long names and previews truncate with an ellipsis inside the fixed rail. */
export const LongText: Story = {
  args: {
    name: 'Engineering leadership sync',
    preview: 'Reminder: the quarterly planning doc needs review before Friday',
    timestamp: '11:52',
  },
};

export const DarkMode: Story = {
  decorators: [(S) => (<div className="dark" style={{ background: 'var(--color-bg-canvas)', padding: 24 }}><S /></div>)],
};
