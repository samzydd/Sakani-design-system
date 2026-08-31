import type { Meta, StoryObj } from '@storybook/react';
import { FileText, ChevronRight } from 'lucide-react';
import { ListItem } from './ListItem';
import { Badge } from '../Badge/Badge';

const meta = {
  title: 'Composite/List Item',
  component: ListItem,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Row for lists/menus. Matches Figma "List Item": State (Default|Hover|Selected),
Title/Description toggles. Figma spec: bg/surface, radius-sm, padding 10/12, gap 12,
title label/md fg/default, description body/xs fg/muted.
Supports leading (icon/avatar) and trailing (badge/action) slots.` } } },
  args: { title: 'List item title', description: 'Supporting description text' },
  decorators: [(S) => <div style={{ width: 360 }}><S /></div>],
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const TitleOnly: Story = { args: { description: undefined } };
export const Selected: Story = { args: { selected: true } };
export const WithLeadingIcon: Story = { args: { leading: <FileText size={18} strokeWidth={1.5} /> } };
export const WithTrailing: Story = { args: { leading: <FileText size={18} strokeWidth={1.5} />, trailing: <ChevronRight size={16} strokeWidth={1.5} /> } };
export const WithBadge: Story = { args: { trailing: <Badge variant="success" emphasis="subtle">New</Badge> } };

export const List: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <ListItem title="Documents" description="12 files" leading={<FileText size={18} strokeWidth={1.5} />} trailing={<ChevronRight size={16} strokeWidth={1.5} />} />
      <ListItem title="Images" description="48 files" leading={<FileText size={18} strokeWidth={1.5} />} trailing={<ChevronRight size={16} strokeWidth={1.5} />} selected />
      <ListItem title="Archive" description="3 files" leading={<FileText size={18} strokeWidth={1.5} />} trailing={<ChevronRight size={16} strokeWidth={1.5} />} />
    </div>
  ),
};

/** Dark mode — the .dark class flips the semantic token layer; no component changes needed. */
export const DarkMode: Story = {
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};
