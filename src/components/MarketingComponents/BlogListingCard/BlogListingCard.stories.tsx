import type { Meta, StoryObj } from '@storybook/react';
import { BlogListingCard } from './BlogListingCard';
import blogImage from '../../../assets/marketing/blog-image-balloons.jpg';
import avatar from '../../../assets/avatars/activity-amara-kalu.jpg';

const meta = {
  title: 'Marketing/Blog Listing Card',
  component: BlogListingCard,
  tags: ['autodocs'],
} satisfies Meta<typeof BlogListingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const shared = {
  image: blogImage,
  imageAlt: 'Hot air balloons over a misty mountain range at sunrise',
  category: 'Engineering',
  readTime: '11 mins read',
  title: 'Why design systems fail in year two',
  excerpt: 'The maintenance gap nobody plans for, and how to close it before it opens.',
  author: { name: 'Amara Kalu', date: 'Aug 12, 2026', avatarSrc: avatar },
};

export const Default: Story = { args: { ...shared } };

export const Horizontal: Story = {
  args: {
    ...shared,
    category: 'Design',
    title: 'Token-driven theming, explained',
    layout: 'horizontal',
  },
};

export const DarkMode: Story = {
  args: { ...shared },
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};
