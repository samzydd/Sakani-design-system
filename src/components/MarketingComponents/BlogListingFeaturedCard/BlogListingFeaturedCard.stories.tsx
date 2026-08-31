import type { Meta, StoryObj } from '@storybook/react';
import { BlogListingFeaturedCard } from './BlogListingFeaturedCard';
import featuredImage from '../../../assets/marketing/blog-featured-space-station.jpg';

const meta = {
  title: 'Marketing/Blog Listing Featured Card',
  component: BlogListingFeaturedCard,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Matches Figma "Blog Listing Featured Card" (Marketing primitives set, 2
orientations: Horizontal, Vertical). \`orientation\` stays a real,
explicit prop (Figma's own axis) -- a genuine layout choice:
- **'horizontal'** — a fixed 400x320 image on the left, body fills the remaining width and is vertically centered against the image's height. Safe to build directly off the image's own fixed size (no circular sizing dependency) since the image doesn't need to match the body's dynamic height, unlike BlogListingCard's own square thumbnail, which does and had to be fixed for exactly that reason.
- **'vertical'** — the same fixed 400x320 image on top, body below at a matching fixed 400px width, column layout.

Category pill and author avatar/name/date follow BlogListingCard's own
precedent exactly (Badge accent/subtle; Avatar). "Read article" reuses
the shared Button (variant="secondary", size="sm" -- bg/subtle +
fg/default text is an exact match for Figma's own button here, not a
custom style like BlogListingCard's read-time chip needed).` } } },
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
