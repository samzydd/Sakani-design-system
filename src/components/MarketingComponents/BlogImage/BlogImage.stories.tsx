import type { Meta, StoryObj } from '@storybook/react';
import { BlogImage } from './BlogImage';
import hero from '../../../assets/products/card-serving-board.jpg';

const meta = {
  title: 'Marketing/Blog Image',
  component: BlogImage,
  tags: ['autodocs'],
} satisfies Meta<typeof BlogImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { src: hero, alt: 'Oak serving board on a kitchen counter', size: 'large' },
};

export const WithCaption: Story = {
  args: {
    src: hero,
    alt: 'Oak serving board on a kitchen counter',
    size: 'large',
    caption: 'The Sakani token layer, visualized as a dependency graph.',
  },
};

export const Small: Story = {
  args: {
    src: hero,
    alt: 'Oak serving board on a kitchen counter',
    size: 'small',
    caption: 'The Sakani token layer, visualized as a dependency graph.',
  },
};

export const DarkMode: Story = {
  args: {
    src: hero,
    alt: 'Oak serving board on a kitchen counter',
    size: 'large',
    caption: 'The Sakani token layer, visualized as a dependency graph.',
  },
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};
