import type { Meta, StoryObj } from '@storybook/react';
import { BlogListingCard } from './BlogListingCard';
import blogImage from '../../../assets/marketing/blog-image-balloons.jpg';
import avatar from '../../../assets/avatars/activity-amara-kalu.jpg';

const meta = {
  title: 'Marketing/Blog Listing Card',
  component: BlogListingCard,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Matches Figma "Blog Listing Card" (Marketing primitives set, 2 style
previews: Default, Horizontal). \`layout\` stays a real, explicit prop
(Figma's own axis) -- a genuine layout choice, not derivable from the
post data:
- **'default'** — image on top (240px, full card width), body below.
- **'horizontal'** — a 1:1 square image on the left (self-stretch to match the body column's height), body to the right.

The category pill reuses the shared Badge component (accent/subtle,
an exact match). The "N mins read" chip is NOT a Badge, though --
Figma's own instance there has no background at all despite being
named "Badge", just matching padding/typography for baseline
alignment with the category pill next to it -- Badge has no bare/
transparent variant, so this is built locally as plain text, same
reasoning BlogFeatureText gave for not reusing Divider for its accent
rule.

Author line reuses the shared Avatar (image type) component. Card
width is flexible (\`width:100%; max-width\` capped to Figma's own
literal px) rather than fixed, same pattern already established by
ProductCard -- this is meant to drop into a listing grid of arbitrary
width, not just render at exactly 313/460px.` } } },
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
