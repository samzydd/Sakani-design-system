import type { Meta, StoryObj } from '@storybook/react';
import { UserPlus, Upload, Download } from 'lucide-react';
import { AppHeader } from './AppHeader';

const meta = {
  title: 'Components/App Header',
  component: AppHeader,
  tags: ['autodocs'],
  decorators: [(S) => <div style={{ width: 892 }}><S /></div>],
} satisfies Meta<typeof AppHeader>;

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
