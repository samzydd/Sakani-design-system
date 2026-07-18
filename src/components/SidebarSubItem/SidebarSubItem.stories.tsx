import type { Meta, StoryObj } from '@storybook/react';
import { SidebarSubItem } from './SidebarSubItem';

const meta = {
  title: 'Composite/Sidebar/Sub Item',
  component: SidebarSubItem,
  tags: ['autodocs'],
  args: { label: 'Sub item' },
  decorators: [(S) => <div style={{ width: 224, padding: 12, background: 'var(--color-bg-surface)' }}><S /></div>],
} satisfies Meta<typeof SidebarSubItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Active: Story = { args: { active: true } };
export const Disabled: Story = { args: { disabled: true } };
