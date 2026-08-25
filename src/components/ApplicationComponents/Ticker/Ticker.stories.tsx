import type { Meta, StoryObj } from '@storybook/react';
import { Ticker } from './Ticker';

const items = [
  { symbol: 'AAPL', changePercent: 1.8 },
  { symbol: 'TSLA', changePercent: -2.3 },
  { symbol: 'MSFT', changePercent: 0.6 },
  { symbol: 'GOOGL', changePercent: -0.4 },
  { symbol: 'NVDA', changePercent: 3.1 },
  { symbol: 'AMZN', changePercent: 0.9 },
  { symbol: 'META', changePercent: -1.2 },
];

const meta = {
  title: 'Application/Ticker',
  component: Ticker,
  tags: ['autodocs'],
  decorators: [(S) => <div style={{ width: 400 }}><S /></div>],
} satisfies Meta<typeof Ticker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { items },
};

export const FewItems: Story = {
  args: { items: items.slice(0, 2) },
};

export const DarkMode: Story = {
  args: { items },
  decorators: [(S) => <div className="dark" style={{ width: 400, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
