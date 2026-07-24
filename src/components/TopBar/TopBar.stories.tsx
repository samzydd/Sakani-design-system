import type { Meta, StoryObj } from '@storybook/react';
import { TopBar } from './TopBar';
import { Input } from '../Input';
import { Avatar } from '../Avatar';

const meta = {
  title: 'Navigation/Top Bar',
  component: TopBar,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['search', 'breadcrumb', 'tabs', 'minimal'] },
    density: { control: 'inline-radio', options: ['md', 'sm'] },
  },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof TopBar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Search: Story = {
  args: {
    type: 'search', density: 'md', hasUnread: true,
    left: <div style={{ width: 320 }}><Input placeholder="Search anything" /></div>,
    account: <Avatar initials="SO" />,
  },
};
export const Compact: Story = { args: { ...Search.args, density: 'sm' } };
export const DarkMode: Story = {
  args: Search.args,
  decorators: [(S) => (<div className="dark" style={{ background: 'var(--color-bg-canvas)' }}><S /></div>)],
};
