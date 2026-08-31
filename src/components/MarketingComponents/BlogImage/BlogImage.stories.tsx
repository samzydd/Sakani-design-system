import type { Meta, StoryObj } from '@storybook/react';
import { BlogImage } from './BlogImage';
import hero from '../../../assets/marketing/blog-image-balloons.jpg';

const meta = {
  title: 'Marketing/Blog Image',
  component: BlogImage,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Matches Figma "Blog Image" (Marketing primitives set, 4 previews: Style
(Default/With Caption) x Size (Large/Small)). Two independent axes:
Whether the caption row renders is derived from \`caption\` presence,
not a manual style prop -- same "derive from data" reasoning as
BlogBlockquote's \`author\`.
\`size\` stays a real, explicit prop (Figma's own axis name) -- it's a
genuine layout choice, not derivable from the image itself. Kept
literal to Figma's own fixed px dimensions rather than an inferred
aspect-ratio: Large is 560x315 (16:9), Small is 320x315 -- Figma
uses the SAME 315 height for both (confirmed identical across both
Small previews, Default and With Caption), making Small's own
~1:1 ratio a deliberate preset, not a proportionally-scaled-down
Large.` } } },
} satisfies Meta<typeof BlogImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { src: hero, alt: 'Hot air balloons over a misty mountain range at sunrise', size: 'large' },
};

export const WithCaption: Story = {
  args: {
    src: hero,
    alt: 'Hot air balloons over a misty mountain range at sunrise',
    size: 'large',
    caption: 'The Sakani token layer, visualized as a dependency graph.',
  },
};

export const Small: Story = {
  args: {
    src: hero,
    alt: 'Hot air balloons over a misty mountain range at sunrise',
    size: 'small',
    caption: 'The Sakani token layer, visualized as a dependency graph.',
  },
};

export const DarkMode: Story = {
  args: {
    src: hero,
    alt: 'Hot air balloons over a misty mountain range at sunrise',
    size: 'large',
    caption: 'The Sakani token layer, visualized as a dependency graph.',
  },
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};
