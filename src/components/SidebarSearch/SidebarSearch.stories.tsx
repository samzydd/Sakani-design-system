import type { Meta, StoryObj } from '@storybook/react';
import { SidebarSearch } from './SidebarSearch';

const meta = {
  title: 'Composite/Sidebar/Search',
  component: SidebarSearch,
  tags: ['autodocs'],
  args: { placeholder: 'Search…' },
  decorators: [(S) => <div style={{ width: 224, padding: 12, background: 'var(--color-bg-surface)' }}><S /></div>],
} satisfies Meta<typeof SidebarSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Field: Story = { args: { type: 'field' } };
export const Command: Story = { args: { type: 'command' } };
export const Collapsed: Story = { args: { collapsed: true }, decorators: [(S) => <div style={{ width: 64, padding: 12, background: 'var(--color-bg-surface)' }}><S /></div>] };
