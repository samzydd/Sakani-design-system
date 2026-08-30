import type { Meta, StoryObj } from '@storybook/react';
import { Zap } from 'lucide-react';
import { FeaturedIcon } from './FeaturedIcon';

const meta = {
  title: 'Marketing/Featured Icon',
  component: FeaturedIcon,
  tags: ['autodocs'],
  args: { icon: <Zap /> },
} satisfies Meta<typeof FeaturedIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = { args: { size: 'lg', variant: 'light' } };
export const Outline: Story = { args: { size: 'lg', variant: 'outline' } };
export const Solid: Story = { args: { size: 'lg', variant: 'solid' } };
export const Subtle: Story = { args: { size: 'lg', variant: 'subtle' } };

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <FeaturedIcon {...args} size="sm" />
      <FeaturedIcon {...args} size="md" />
      <FeaturedIcon {...args} size="lg" />
    </div>
  ),
  args: { variant: 'subtle' },
};

export const DarkMode: Story = {
  args: { size: 'lg', variant: 'solid' },
  decorators: [() => (
    <div className="dark" style={{ display: 'flex', gap: 16, padding: 24, background: 'var(--color-bg-canvas)' }}>
      <FeaturedIcon icon={<Zap />} size="lg" variant="light" />
      <FeaturedIcon icon={<Zap />} size="lg" variant="outline" />
      <FeaturedIcon icon={<Zap />} size="lg" variant="solid" />
      <FeaturedIcon icon={<Zap />} size="lg" variant="subtle" />
    </div>
  )],
};
