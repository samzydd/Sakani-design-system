import type { Meta, StoryObj } from '@storybook/react';
import { BlogImage } from './BlogImage';
import hero from '../../../assets/marketing/blog-image-balloons.jpg';

const meta = {
  title: 'Marketing/Blog Image',
  component: BlogImage,
  tags: ['autodocs'],
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
