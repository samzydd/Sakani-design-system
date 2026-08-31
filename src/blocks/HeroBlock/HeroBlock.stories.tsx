import type { Meta, StoryObj } from '@storybook/react';
import { HeroBlock } from './HeroBlock';
import heroImage from '../../assets/marketing/blog-image-balloons.jpg';

const meta = {
  title: 'Blocks/Marketing/Hero',
  component: HeroBlock,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof HeroBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Centered: Story = {
  args: {
    eyebrow: 'Now open source',
    title: 'Design faster. Ship sooner.',
    description: 'Sakani is an open-source, production-ready design system with full Figma-to-React parity — built to take you from idea to shipped interface.',
    primaryAction: { label: 'Get started' },
    secondaryAction: { label: 'View on GitHub' },
    secondaryActionIcon: true,
    image: heroImage,
    caption: 'Free and open source · MIT licensed',
    layout: 'centered',
  },
};

export const Split: Story = {
  args: {
    eyebrow: 'v1.2 now available',
    title: 'Your product, styled to production standard.',
    description: '60+ components, full state coverage, real Figma-to-code parity. Everything you need to build without starting from a blank canvas.',
    primaryAction: { label: 'Get started' },
    secondaryAction: { label: 'View on GitHub' },
    secondaryActionIcon: true,
    image: heroImage,
    layout: 'split',
  },
};

export const DarkMode: Story = {
  args: Centered.args,
  decorators: [(S) => <div className="dark"><S /></div>],
};
