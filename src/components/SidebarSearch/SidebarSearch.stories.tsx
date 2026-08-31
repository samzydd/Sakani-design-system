import type { Meta, StoryObj } from '@storybook/react';
import { SidebarSearch } from './SidebarSearch';

const meta = {
  title: 'Composite/Sidebar/Search',
  component: SidebarSearch,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Matches Figma "Sidebar Search": Type (Field | Command) x Collapsed.
Figma spec: 36px height, bg/subtle, border/subtle, radius-sm, padding 8/8/8/10,
search icon (Lucide), placeholder body/sm fg/subtle.
Command type shows a ⌘K hint on the trailing edge.` } } },
  args: { placeholder: 'Search…' },
  decorators: [(S) => <div style={{ width: 224, padding: 12, background: 'var(--color-bg-surface)' }}><S /></div>],
} satisfies Meta<typeof SidebarSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Field: Story = { args: { type: 'field' } };
export const Command: Story = { args: { type: 'command' } };
export const Collapsed: Story = { args: { collapsed: true }, decorators: [(S) => <div style={{ width: 64, padding: 12, background: 'var(--color-bg-surface)' }}><S /></div>] };

/** Dark mode — parts sit on a sidebar surface; .dark flips the token layer. */
export const DarkMode: Story = {
  decorators: [(S) => (
    <div className="dark" style={{ width: 248, padding: 12, background: 'var(--color-bg-surface)' }}>
      <S />
    </div>
  )],
};
