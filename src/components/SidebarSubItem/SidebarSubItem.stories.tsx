import type { Meta, StoryObj } from '@storybook/react';
import { SidebarSubItem } from './SidebarSubItem';

const meta = {
  title: 'Composite/Sidebar/Sub Item',
  component: SidebarSubItem,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Nested nav item. Matches Figma "Sidebar Sub Item": State (Default|Hover|Active|Disabled).
Figma spec: radius-sm, padding 0/10, label/sm. Default/Hover fg/muted, Active fg/default.
Indented under a parent SidebarItem (no icon).` } } },
  args: { label: 'Sub item' },
  decorators: [(S) => <div style={{ width: 224, padding: 12, background: 'var(--color-bg-surface)' }}><S /></div>],
} satisfies Meta<typeof SidebarSubItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Active: Story = { args: { active: true } };
export const Disabled: Story = { args: { disabled: true } };

/** Dark mode — parts sit on a sidebar surface; .dark flips the token layer. */
export const DarkMode: Story = {
  decorators: [(S) => (
    <div className="dark" style={{ width: 248, padding: 12, background: 'var(--color-bg-surface)' }}>
      <S />
    </div>
  )],
};
