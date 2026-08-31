import type { Meta, StoryObj } from '@storybook/react';
import { StarRating } from './StarRating';

const meta = {
  title: 'E-commerce/Star Rating',
  component: StarRating,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Matches Figma "Star Rating" (shared across E-commerce and Marketing
usage -- ProductDetailBlock already consumes this directly): 5 stars
plus an optional numeric rating + review count, e.g.
"4.9 (2,300 reviews)".

Figma's "showLabel" toggle is a real independent prop -- the numeric
rating/review-count text can be hidden while the stars alone still
convey the rating (a compact list row, say). \`orientation\` is also a
real, explicit prop (Figma's own axis): stars-before-label
('horizontal', the default), label-before-stars
('horizontal-reverse'), or stars-above-label, centered ('vertical') --
a genuine layout choice with no data to derive it from, only
meaningful while \`showLabel\` is true. The stars themselves are NOT a
manual per-star fill prop: the full/half/empty count is fully derived
from \`rating\` (0-5), rounded to the nearest half star -- same "derive
from data" pattern used throughout this library (StockStatus's badge
color, PriceDisplay's sale treatment). Confirmed against Figma's own
example: a 4.9 rating renders as 5 full stars, not 4 full + a sliver
of a 5th, so this rounds to the nearest 0.5 first rather than showing
a half star for any remainder >=0.5.` } } },
  args: { rating: 4.9, reviewCount: 2300 },
} satisfies Meta<typeof StarRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithLabel: Story = {};
export const NoLabel: Story = { args: { showLabel: false } };
export const HalfStar: Story = { args: { rating: 3.5, reviewCount: 412 } };
export const LowRating: Story = { args: { rating: 1.2, reviewCount: 8 } };
export const HorizontalReverse: Story = { args: { orientation: 'horizontal-reverse' } };
export const Vertical: Story = { args: { orientation: 'vertical' } };

export const DarkMode: Story = {
  decorators: [(S) => <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
