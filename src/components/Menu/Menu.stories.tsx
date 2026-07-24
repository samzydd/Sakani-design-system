import type { Meta, StoryObj } from '@storybook/react';
import { Pencil, Copy, Trash, Columns3 } from 'lucide-react';
import { Menu, MenuDivider } from './Menu';
import { MenuItem } from '../MenuItem';

const meta = {
  title: 'Overlays/Menu',
  component: Menu,
  tags: ['autodocs'],
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
