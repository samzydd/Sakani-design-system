import type { Meta, StoryObj } from '@storybook/react';
import { Announcement } from './Announcement';

const meta = {
  title: 'Application/Announcement',
  component: Announcement,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Full-width announcement bar. Matches Figma "Announcement":
- **Style: Neutral** — sparkle icon, bold message, "Learn more" link, dismiss | Urgent — alert-triangle icon (info-colored), message, dismiss

Both styles push the dismiss IconButton to the far right via a growing
content group, matching Figma's two (functionally equivalent) structures.` } } },
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
