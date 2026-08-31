import type { Meta, StoryObj } from '@storybook/react';
import { Pencil, Copy, Trash, Columns3 } from 'lucide-react';
import { Menu, MenuDivider } from './Menu';
import { MenuItem } from '../MenuItem';

const meta = {
  title: 'Overlays/Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Dropdown menu container. Matches the Figma "Menu" component:
mirrors Combobox Panel exactly — radius 6, padding 4, gap 2,
bg/surface, border/default, shadow/lg.

Composed from MenuItem children. Use MenuDivider to separate groups.
This is a presentational surface; positioning/anchoring is left to the
caller (pair with Popover for click-to-open behavior).` } } },
} satisfies Meta<typeof Menu>;
export default meta;
type Story = StoryObj<typeof meta>;

const Sample = () => (
  <Menu aria-label="Row actions">
    <MenuItem icon={<Pencil size={16} />} shortcut="⌘E">Edit</MenuItem>
    <MenuItem icon={<Copy size={16} />} shortcut="⌘D">Duplicate</MenuItem>
    <MenuItem icon={<Columns3 size={16} />} state="checked">Show column</MenuItem>
    <MenuDivider />
    <MenuItem icon={<Trash size={16} />} state="destructive">Delete</MenuItem>
  </Menu>
);

export const Default: Story = { render: () => <Sample /> };
export const DarkMode: Story = {
  render: () => <Sample />,
  decorators: [(S) => (<div className="dark" style={{ background: 'var(--color-bg-canvas)', padding: 24 }}><S /></div>)],
};
