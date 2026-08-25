import type { Meta, StoryObj } from '@storybook/react';
import { Announcement } from './Announcement';

const meta = {
  title: 'Application/Announcement',
  component: Announcement,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['neutral', 'urgent'] },
  },
  args: {
    message: 'New: dark mode is now available.',
    linkLabel: 'Learn more',
    linkHref: '#',
  },
  decorators: [(S) => <div style={{ width: 600 }}><S /></div>],
} satisfies Meta<typeof Announcement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {
  args: { onDismiss: () => {} },
};
export const Urgent: Story = {
  args: {
    variant: 'urgent',
    message: 'Scheduled maintenance tonight at 10:00 PM UTC. Expect brief downtime.',
    onDismiss: () => {},
  },
};
export const NoDismiss: Story = {};
export const DarkMode: Story = {
  decorators: [(S) => <div className="dark" style={{ width: 600, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
  args: { onDismiss: () => {} },
};
