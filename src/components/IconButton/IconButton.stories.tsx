import type { Meta, StoryObj } from '@storybook/react';
import { Plus, Trash2, Settings, Search } from 'lucide-react';
import { IconButton } from './IconButton';

const meta = {
  title: 'Core/Icon Button',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'outline', 'ghost', 'destructive'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: { icon: Plus, variant: 'primary', size: 'md', 'aria-label': 'Add' },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { icon: Settings, variant: 'secondary', 'aria-label': 'Settings' } };
export const Outline: Story = { args: { icon: Search, variant: 'outline', 'aria-label': 'Search' } };
export const Ghost: Story = { args: { icon: Settings, variant: 'ghost', 'aria-label': 'Settings' } };
export const Destructive: Story = { args: { icon: Trash2, variant: 'destructive', 'aria-label': 'Delete' } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <IconButton icon={Plus} variant="primary" aria-label="Add" />
      <IconButton icon={Settings} variant="secondary" aria-label="Settings" />
      <IconButton icon={Search} variant="outline" aria-label="Search" />
      <IconButton icon={Settings} variant="ghost" aria-label="Settings" />
      <IconButton icon={Trash2} variant="destructive" aria-label="Delete" />
    </div>
  ),
};
export const DarkMode: Story = {
  decorators: [(S) => <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <IconButton icon={Plus} variant="primary" aria-label="Add" />
      <IconButton icon={Search} variant="outline" aria-label="Search" />
      <IconButton icon={Settings} variant="ghost" aria-label="Settings" />
    </div>
  ),
};
