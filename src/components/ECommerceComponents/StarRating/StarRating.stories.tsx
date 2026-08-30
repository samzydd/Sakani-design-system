import type { Meta, StoryObj } from '@storybook/react';
import { StarRating } from './StarRating';

const meta = {
  title: 'E-commerce/Star Rating',
  component: StarRating,
  tags: ['autodocs'],
  args: { rating: 4.9, reviewCount: 2300 },
} satisfies Meta<typeof StarRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithLabel: Story = {};
export const NoLabel: Story = { args: { showLabel: false } };
export const HalfStar: Story = { args: { rating: 3.5, reviewCount: 412 } };
export const LowRating: Story = { args: { rating: 1.2, reviewCount: 8 } };

export const DarkMode: Story = {
  decorators: [(S) => <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
