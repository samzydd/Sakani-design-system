import type { Meta, StoryObj } from '@storybook/react';
import { House, ChartLine, Settings } from 'lucide-react';
import { SidebarItem } from './SidebarItem';

const meta = {
  title: 'Composite/Sidebar/Item',
  component: SidebarItem,
  tags: ['autodocs'],
  args: { icon: House, label: 'Dashboard' },
  decorators: [(S) => <div style={{ width: 224, padding: 12, background: 'var(--color-bg-surface)' }}><S /></div>],
} satisfies Meta<typeof SidebarItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Active: Story = { args: { active: true } };
export const WithBadge: Story = { args: { badge: '12' } };
export const WithSubmenu: Story = { args: { hasSubmenu: true } };
export const Disabled: Story = { args: { disabled: true } };
export const Collapsed: Story = { args: { collapsed: true }, decorators: [(S) => <div style={{ width: 64, padding: 12, background: 'var(--color-bg-surface)' }}><S /></div>] };

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <SidebarItem icon={House} label="Default" />
      <SidebarItem icon={ChartLine} label="Active" active />
      <SidebarItem icon={Settings} label="With badge" badge="3" />
      <SidebarItem icon={Settings} label="Disabled" disabled />
    </div>
  ),
};

/** Dark mode — active accent bar + accent/subtle background re-theme via .dark. */
export const DarkMode: Story = {
  decorators: [(S) => (
    <div className="dark" style={{ width: 224, padding: 12, background: 'var(--color-bg-surface)' }}><S /></div>
  )],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <SidebarItem icon={House} label="Default" />
      <SidebarItem icon={ChartLine} label="Active" active />
      <SidebarItem icon={Settings} label="With badge" badge="3" />
    </div>
  ),
};
