import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta = {
  title: 'Core/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] } },
  args: { size: 'md' },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = { args: { initials: 'SO' } };
export const Image: Story = { args: { src: 'https://i.pravatar.cc/96?img=12', alt: 'User' } };
export const Icon: Story = {};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Avatar size="sm" initials="SO" />
      <Avatar size="md" initials="SO" />
      <Avatar size="lg" initials="SO" />
      <Avatar size="xl" initials="SO" />
    </div>
  ),
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Avatar size="lg" initials="SO" />
      <Avatar size="lg" icon={undefined} />
      <Avatar size="lg" src="https://i.pravatar.cc/96?img=5" alt="User" />
    </div>
  ),
};
