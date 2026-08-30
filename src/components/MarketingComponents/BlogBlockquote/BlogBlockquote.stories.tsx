import type { Meta, StoryObj } from '@storybook/react';
import { BlogBlockquote } from './BlogBlockquote';
import avatar from '../../../assets/avatars/activity-ravi-menon.jpg';

const meta = {
  title: 'Marketing/Blog Blockquote',
  component: BlogBlockquote,
  tags: ['autodocs'],
} satisfies Meta<typeof BlogBlockquote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithAttribution: Story = {
  args: {
    quote: 'We stopped debating spacing values in every design review the week we shipped the token layer.',
    author: { name: 'Ravi Menon', role: 'Founder at Loopline', avatarSrc: avatar },
  },
};

export const Simple: Story = {
  args: {
    quote: 'Boring, in the best way, is the whole point.',
  },
};

export const DarkMode: Story = {
  args: {
    quote: 'We stopped debating spacing values in every design review the week we shipped the token layer.',
    author: { name: 'Ravi Menon', role: 'Founder at Loopline', avatarSrc: avatar },
  },
  decorators: [(S) => <div className="dark"><S /></div>],
};
