import type { Meta, StoryObj } from '@storybook/react';
import { BlogListingBlock } from './BlogListingBlock';
import heroImage from '../../assets/marketing/blog-image-balloons.jpg';
import mug from '../../assets/products/card-mug.jpg';
import tableRunner from '../../assets/products/card-table-runner.jpg';
import servingBoard from '../../assets/products/card-serving-board.jpg';
import amara from '../../assets/avatars/activity-amara-kalu.jpg';
import chidi from '../../assets/avatars/activity-chidi-duru.jpg';
import ravi from '../../assets/avatars/activity-ravi-menon.jpg';
import jade from '../../assets/avatars/activity-jade-silva.jpg';

const meta = {
  title: 'Blocks/Marketing/Blog Listing',
  component: BlogListingBlock,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
your project and edit it directly: wire "Read article"/card clicks to
your real routing in place of the callbacks here.

Matches Figma "Blog Listing". Composed entirely from
existing library components -- SectionHeading (Marketing, the "Blog"
eyebrow + title + subtitle), BlogListingFeaturedCard (Marketing,
orientation="horizontal"), and a grid of BlogListingCard (Marketing,
layout="default") -- no new visual primitives, this block is purely
heading + featured post + grid layout.

The grid is real CSS Grid (3 columns, matching Figma), not a fixed
3-card row -- it wraps onto additional rows once there are more posts
than fit one line, same reasoning ProductGridBlock gives for its own
grid, unlike Figma's own single-row 3-post export.` } }, layout: 'fullscreen' },
} satisfies Meta<typeof BlogListingBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    eyebrow: 'Blog',
    title: 'From the blog',
    subtitle: 'Notes on building, maintaining, and scaling a real design system.',
    featuredPost: {
      image: heroImage,
      title: 'The complete guide to building a design system that survives year two',
      excerpt: 'A practical breakdown of tokens, governance, and the maintenance work most teams underestimate.',
      author: { name: 'Amara Kalu', date: 'Aug 12, 2026', avatarSrc: amara },
    },
    posts: [
      {
        image: mug,
        category: 'Design',
        readTime: '11 mins read',
        title: 'Token-driven theming, explained',
        excerpt: 'Why every color should be a variable, not a hex code.',
        author: { name: 'Chidi Duru', date: 'Aug 5, 2026', avatarSrc: chidi },
      },
      {
        image: tableRunner,
        category: 'Process',
        readTime: '11 mins read',
        title: 'How we review component PRs',
        excerpt: 'The checklist we run before anything ships to the library.',
        author: { name: 'Ravi Menon', date: 'Jul 28, 2026', avatarSrc: ravi },
      },
      {
        image: servingBoard,
        category: 'Engineering',
        readTime: '11 mins read',
        title: 'Figma-to-code parity, in practice',
        excerpt: 'What it actually takes to keep design and code from drifting apart.',
        author: { name: 'Jade Silva', date: 'Jul 20, 2026', avatarSrc: jade },
      },
    ],
  },
};

export const DarkMode: Story = {
  args: Default.args,
  decorators: [(S) => <div className="dark"><S /></div>],
};
