import type { Meta, StoryObj } from '@storybook/react';
import { House, ChartLine, FolderKanban, Settings, Users, Box } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { SidebarHeader } from '../SidebarHeader/SidebarHeader';
import { SidebarSearch } from '../SidebarSearch/SidebarSearch';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { SidebarSubItem } from '../SidebarSubItem/SidebarSubItem';
import { SidebarGroupLabel } from '../SidebarGroupLabel/SidebarGroupLabel';
import { SidebarDivider } from '../SidebarDivider/SidebarDivider';
import { SidebarPromo } from '../SidebarPromo/SidebarPromo';
import { SidebarFooter } from '../SidebarFooter/SidebarFooter';

const meta = {
  title: 'Composite/Sidebar/Assembled',
  component: Sidebar,
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const FullSidebar = () => (
  <Sidebar>
    <SidebarHeader type="workspace" title="Sakani" subtitle="Workspace" logo={<Box size={18} strokeWidth={1.5} />} />
    <SidebarSearch type="command" />
    <SidebarGroupLabel>Platform</SidebarGroupLabel>
    <SidebarItem icon={House} label="Dashboard" active />
    <SidebarItem icon={ChartLine} label="Analytics" badge="New" />
    <SidebarItem icon={FolderKanban} label="Projects" hasSubmenu />
    <SidebarSubItem label="Active" active />
    <SidebarSubItem label="Archived" />
    <SidebarItem icon={Users} label="Team" />
    <SidebarDivider />
    <SidebarItem icon={Settings} label="Settings" />
    <SidebarPromo title="Upgrade to Pro" description="Unlock unlimited projects and advanced analytics." ctaLabel="Upgrade" onDismiss={() => {}} />
    <SidebarFooter type="user-menu" title="Sam Okpere" subtitle="sam@sakani.com" avatarInitials="SO" />
  </Sidebar>
);

const CollapsedSidebar = () => (
  <Sidebar collapsed>
    <SidebarHeader title="Sakani" collapsed logo={<Box size={18} strokeWidth={1.5} />} />
    <SidebarSearch collapsed />
    <SidebarItem icon={House} label="Dashboard" active collapsed />
    <SidebarItem icon={ChartLine} label="Analytics" collapsed />
    <SidebarItem icon={FolderKanban} label="Projects" collapsed />
    <SidebarItem icon={Users} label="Team" collapsed />
    <SidebarDivider />
    <SidebarItem icon={Settings} label="Settings" collapsed />
    <SidebarFooter collapsed avatarInitials="SO" />
  </Sidebar>
);

export const Expanded: Story = {
  render: () => <div style={{ height: 640, display: 'flex' }}><FullSidebar /></div>,
};

export const Collapsed: Story = {
  render: () => <div style={{ height: 640, display: 'flex' }}><CollapsedSidebar /></div>,
};

/** Dark mode — the .dark class flips the semantic token layer; no component changes needed. */
export const ExpandedDark: Story = {
  render: () => (
    <div className="dark" style={{ height: 640, display: 'flex', background: 'var(--color-bg-canvas)', padding: 24 }}>
      <FullSidebar />
    </div>
  ),
};

export const CollapsedDark: Story = {
  render: () => (
    <div className="dark" style={{ height: 640, display: 'flex', background: 'var(--color-bg-canvas)', padding: 24 }}>
      <CollapsedSidebar />
    </div>
  ),
};
