import type { Meta, StoryObj } from '@storybook/react';
import { Pencil } from 'lucide-react';
import { MenuItem } from './MenuItem';

const meta = {
  title: 'Overlays/Menu Item',
  component: MenuItem,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `One row of a dropdown Menu. Matches the Figma "Menu Item" set:

state (Figma "State" axis) -> default | checked | disabled | destructive
(Hover is a CSS :hover state, not a prop — mirrors bg/subtle in Figma.)

Geometry mirrors Combobox Option exactly: 36px min-height, 8px padding,
8px gap, radius 4. Leading icon + label + optional trailing shortcut.
Checked shows a trailing check icon (used for column-visibility toggles).` } } },
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
