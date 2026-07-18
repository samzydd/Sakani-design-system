import type { Meta, StoryObj } from '@storybook/react';
import { Box } from 'lucide-react';
import { SidebarHeader } from './SidebarHeader';

const meta = {
  title: 'Composite/Sidebar/Header',
  component: SidebarHeader,
  tags: ['autodocs'],
  args: { title: 'Sakani', subtitle: 'Workspace', logo: <Box size={18} strokeWidth={1.5} /> },
  decorators: [(S) => <div style={{ width: 224, padding: 12, background: 'var(--color-bg-surface)' }}><S /></div>],
} satisfies Meta<typeof SidebarHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Brand: Story = { args: { type: 'brand', subtitle: undefined } };
export const Workspace: Story = { args: { type: 'workspace' } };
export const BrandToggle: Story = { args: { type: 'brand-toggle', subtitle: undefined } };
export const Collapsed: Story = { args: { collapsed: true }, decorators: [(S) => <div style={{ width: 64, padding: 12, background: 'var(--color-bg-surface)' }}><S /></div>] };

/** Dark mode — parts sit on a sidebar surface; .dark flips the token layer. */
export const DarkMode: Story = {
  decorators: [(S) => (
    <div className="dark" style={{ width: 248, padding: 12, background: 'var(--color-bg-surface)' }}>
      <S />
    </div>
  )],
};
