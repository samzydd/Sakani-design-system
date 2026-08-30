import type { Meta, StoryObj } from '@storybook/react';
import { BlogListingFeaturedCard } from './BlogListingFeaturedCard';
import featuredImage from '../../../assets/marketing/blog-featured-space-station.jpg';

const meta = {
  title: 'Marketing/Blog Listing Featured Card',
  component: BlogListingFeaturedCard,
  tags: ['autodocs'],
} satisfies Meta<typeof BlogListingFeaturedCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const shared = {
  image: featuredImage,
  imageAlt: 'A ringed space station orbiting a bright star',
  title: 'The complete guide to building a design system that survives year two',
  excerpt: 'A practical breakdown of tokens, governance, and the maintenance work most teams underestimate.',
  author: { name: 'Amara Kalu', date: 'Aug 12, 2026', initials: 'AK' },
};

export const Horizontal: Story = { args: { ...shared, orientation: 'horizontal' } };

export const Vertical: Story = { args: { ...shared, orientation: 'vertical' } };

export const DarkMode: Story = {
  args: { ...shared, orientation: 'horizontal' },
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};
