import type { Meta, StoryObj } from '@storybook/react';
import { SidebarFooter } from './SidebarFooter';

const meta = {
  title: 'Composite/Sidebar/Footer',
  component: SidebarFooter,
  tags: ['autodocs'],
  args: { title: 'Sam Okpere', subtitle: 'sam@sakani.com', avatarInitials: 'SO' },
  decorators: [(S) => <div style={{ width: 224, padding: 12, background: 'var(--color-bg-surface)' }}><S /></div>],
} satisfies Meta<typeof SidebarFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const User: Story = { args: { type: 'user' } };
export const UserMenu: Story = { args: { type: 'user-menu' } };
export const UserWithImage: Story = { args: { type: 'user-menu', avatarSrc: 'https://i.pravatar.cc/96?img=12' } };
export const Actions: Story = { args: { type: 'actions' } };
export const Collapsed: Story = { args: { collapsed: true }, decorators: [(S) => <div style={{ width: 64, padding: 12, background: 'var(--color-bg-surface)' }}><S /></div>] };
