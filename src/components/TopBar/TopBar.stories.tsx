import type { Meta, StoryObj } from '@storybook/react';
import { TopBar } from './TopBar';
import { Input } from '../Input';
import { Avatar } from '../Avatar';

const meta = {
  title: 'Navigation/Top Bar',
  component: TopBar,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Application top bar — sits beside the Sidebar (1440 − 248 = 1192 default,
but stretches to fill). Matches the Figma "Top bar" set:

type (Figma "Type" axis) -> search | breadcrumb | tabs | minimal | chat
density (Figma "Density" axis) -> md (64px) | sm (56px)

Layout: sidebar toggle · type-specific left region · flex spacer ·
help · notifications (with unread dot) · divider · account (opens Menu).
Slots (left, actions, account) are composed by the caller.` } }, layout: 'fullscreen' },
  argTypes: {
    type: { control: 'select', options: ['search', 'breadcrumb', 'tabs', 'minimal'] },
    density: { control: 'inline-radio', options: ['md', 'sm'] },
  },
} satisfies Meta<typeof TopBar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Search: Story = {
  args: {
    type: 'search', density: 'md', hasUnread: true,
    left: <div style={{ width: 320 }}><Input unstyled placeholder="Search anything" /></div>,
    account: <Avatar initials="SO" />,
  },
};
export const Compact: Story = { args: { ...Search.args, density: 'sm' } };
export const DarkMode: Story = {
  args: Search.args,
  decorators: [(S) => (<div className="dark" style={{ background: 'var(--color-bg-canvas)' }}><S /></div>)],
};
