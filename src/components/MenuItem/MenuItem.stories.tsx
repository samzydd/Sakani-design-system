import type { Meta, StoryObj } from '@storybook/react';
import { Pencil } from 'lucide-react';
import { MenuItem } from './MenuItem';

const meta = {
  title: 'Overlays/Menu Item',
  component: MenuItem,
  tags: ['autodocs'],
  argTypes: { state: { control: 'select', options: ['default', 'checked', 'disabled', 'destructive'] } },
  args: { children: 'Edit', state: 'default', icon: <Pencil size={16} />, shortcut: '⌘E' },
  decorators: [(S) => (<div style={{ width: 220 }}><S /></div>)],
} satisfies Meta<typeof MenuItem>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Checked: Story = { args: { state: 'checked', children: 'Show column' } };
export const Destructive: Story = { args: { state: 'destructive', children: 'Delete' } };
export const Disabled: Story = { args: { state: 'disabled' } };
export const DarkMode: Story = {
  decorators: [(S) => (<div className="dark" style={{ background: 'var(--color-bg-canvas)', padding: 24, width: 220 }}><S /></div>)],
};
