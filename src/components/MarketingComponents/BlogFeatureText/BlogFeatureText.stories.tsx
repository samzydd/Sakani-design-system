import type { Meta, StoryObj } from '@storybook/react';
import { BlogFeatureText } from './BlogFeatureText';

const meta = {
  title: 'Marketing/Blog Feature Text',
  component: BlogFeatureText,
  tags: ['autodocs'],
} satisfies Meta<typeof BlogFeatureText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Left: Story = {
  args: {
    text: 'The best design systems are boring in the best way — nobody notices them because everything just works.',
    align: 'left',
  },
};

export const Top: Story = {
  args: {
    text: 'Consistency compounds. A design system pays for itself the second time you reuse a component, not the first.',
    align: 'top',
  },
};

export const DarkMode: Story = {
  args: {
    text: 'The best design systems are boring in the best way — nobody notices them because everything just works.',
    align: 'left',
  },
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};
