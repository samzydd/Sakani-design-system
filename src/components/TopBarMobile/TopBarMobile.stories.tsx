import type { Meta, StoryObj } from '@storybook/react';
import { TopBarMobile } from './TopBarMobile';
import { Avatar } from '../Avatar';

const meta = {
  title: 'Navigation/Top Bar Mobile',
  component: TopBarMobile,
  tags: ['autodocs'],
  argTypes: { type: { control: 'select', options: ['title', 'title-centered', 'title-action', 'search'] } },
  decorators: [(S) => (<div style={{ width: 390, border: '1px solid var(--color-border-subtle)' }}><S /></div>)],
} satisfies Meta<typeof TopBarMobile>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Title: Story = { args: { type: 'title', title: 'Overview', trailing: <Avatar initials="SO" /> } };
export const Centered: Story = { args: { type: 'title-centered', title: 'Overview' } };
export const WithAction: Story = { args: { type: 'title-action', title: 'Tasks' } };
