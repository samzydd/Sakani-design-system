import type { Meta, StoryObj } from '@storybook/react';
import { MessageBubble } from './MessageBubble';
import { Avatar } from '../Avatar';

const meta = {
  title: 'Chat/Message Bubble',
  component: MessageBubble,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `A chat message. Matches the Figma "Message Bubble" set:

type (Figma "Type" axis) -> received | sent | system
content (Figma "Content" axis) -> text | image | file

Received = bg/subtle with author + reactions; Sent = accent fill with
timestamp + read receipt; System = centered pill. The tail corner (4px)
marks the speaker side. Image/file content render inside the bubble.` } } },
  argTypes: {
    type: { control: 'inline-radio', options: ['received', 'sent', 'system'] },
    content: { control: 'inline-radio', options: ['text', 'image', 'file'] },
  },
  decorators: [(S) => (<div style={{ maxWidth: 520 }}><S /></div>)],
} satisfies Meta<typeof MessageBubble>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Received: Story = {
  args: { type: 'received', avatar: <Avatar initials="AC" />, authorName: 'Amara Chen', timestamp: '12:04', children: 'Can you review the latest flow when you get a chance?' },
};
export const Sent: Story = {
  args: { type: 'sent', timestamp: '12:06', read: true, children: 'Just pushed the update — should be live now.' },
};
export const FileTransfer: Story = {
  args: { type: 'sent', content: 'file', fileName: 'Sakani-specs.pdf', fileSize: '2.4 MB', timestamp: '12:07', read: true },
};
export const System: Story = { args: { type: 'system', children: 'Amara added Daniel to the conversation' } };
export const DarkMode: Story = {
  args: Received.args,
  decorators: [(S) => (<div className="dark" style={{ background: 'var(--color-bg-canvas)', padding: 24, maxWidth: 520 }}><S /></div>)],
};
