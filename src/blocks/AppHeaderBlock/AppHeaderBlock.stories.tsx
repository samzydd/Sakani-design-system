import type { Meta, StoryObj } from '@storybook/react';
import { UserPlus, Upload, Download } from 'lucide-react';
import { AppHeaderBlock } from './AppHeaderBlock';

const meta = {
  title: 'Blocks/Application/App Header',
  component: AppHeaderBlock,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
your project and edit it directly.

Page-level header: breadcrumb trail, title + optional description, and
right-aligned actions, sitting above a divider. Matches Figma "App Header"
(Breadcrumb + "Page Header" stacked with a 16px gap) -- both are reused
directly: Breadcrumb is the existing shared component unmodified, and
Button provides the action buttons.

Figma's own two style previews ("Single Action" / "Double Action") differ
only in how many buttons are passed and which one is filled -- the last
action renders as \`primary\`, any before it as \`secondary\`, matching both
examples (1 button: primary; 2 buttons: secondary, primary) without a
redundant per-action variant prop. An action can still override this via
its own \`variant\` for cases that don't fit the pattern.` } } },
  decorators: [(S) => <div style={{ width: 892 }}><S /></div>],
} satisfies Meta<typeof AppHeaderBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleAction: Story = {
  args: {
    breadcrumbs: [{ label: 'Settings', href: '#' }, { label: 'Team members' }],
    title: 'Team members',
    description: 'Manage who has access to this workspace and what they can do.',
    actions: [{ label: 'Invite member', icon: <UserPlus size={18} /> }],
  },
};

export const DoubleAction: Story = {
  args: {
    breadcrumbs: [{ label: 'Settings', href: '#' }, { label: 'Data management' }],
    title: 'Data management',
    description: "Manage how your organization's data is stored, transferred, and retained.",
    actions: [
      { label: 'Export Data', icon: <Upload size={18} /> },
      { label: 'Import Data', icon: <Download size={18} /> },
    ],
  },
};

export const NoActions: Story = {
  args: {
    breadcrumbs: [{ label: 'Settings', href: '#' }, { label: 'Profile' }],
    title: 'Profile',
    description: 'Update your personal information and preferences.',
  },
};

export const DarkMode: Story = {
  args: SingleAction.args,
  decorators: [(S) => <div className="dark" style={{ width: 892, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
