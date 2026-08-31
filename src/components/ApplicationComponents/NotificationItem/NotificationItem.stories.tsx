import type { Meta, StoryObj } from '@storybook/react';
import { Download } from 'lucide-react';
import { NotificationItem } from './NotificationItem';

const meta = {
  title: 'Application/Notification Item',
  component: NotificationItem,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Matches Figma "Notification Item" (3 style previews -- Unread, Read,
Dismissable -- collapsed into composable props, same judgment already
applied throughout this Application set):

Simple row (no \`description\`) -- icon-wrap, title, timestamp, and
(when \`read\` is false) an accent/subtle background + unread dot.
\`read\` toggles bold/muted title weight and the background/dot, same
idea as Balance's controlled/uncontrolled hidden state -- but here it's
plain read-driven styling, no internal state to manage.

- **Actionable card (\`description\` present)** — bordered/shadowed card, icon-wrap, title + description, a close X, and Dismiss/action buttons
- **below. The X and the "Dismiss" button fire the same \`onDismiss\`** — Figma gives two entry points to what's the same action.` } } },
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
