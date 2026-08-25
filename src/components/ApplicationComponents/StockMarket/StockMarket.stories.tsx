import type { Meta, StoryObj } from '@storybook/react';
import { StockMarket } from './StockMarket';

/** Generic placeholder badge -- Figma's own reference uses real Apple/Tesla
 * marks, which this component deliberately doesn't ship or reproduce (see
 * StockMarket.tsx). `logo` is just a consumer-supplied slot in real usage. */
const LogoBadge = ({ letter, color }: { letter: string; color: string }) => (
  <span
    style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      width: '100%', height: '100%', borderRadius: '50%',
      background: color, color: '#fff', fontWeight: 600, fontSize: 14,
    }}
  >
    {letter}
  </span>
);

const chartData = [
  { label: 'Jan', value: 180 },
  { label: 'Feb', value: 205 },
  { label: 'Mar', value: 212 },
  { label: 'Apr', value: 192 },
  { label: 'May', value: 208 },
  { label: 'Jun', value: 175 },
];

const meta = {
  title: 'Application/Stock Market',
  component: StockMarket,
  tags: ['autodocs'],
  decorators: [(S) => <div style={{ width: 400 }}><S /></div>],
} satisfies Meta<typeof StockMarket>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Positive: Story = {
  args: {
    logo: <LogoBadge letter="A" color="#141414" />,
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 212.44,
    change: { amount: 3.76, percent: 1.8 },
  },
};

export const Negative: Story = {
  args: {
    logo: <LogoBadge letter="T" color="#E01B26" />,
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 184.20,
    change: { amount: -4.34, percent: -2.3 },
  },
};

export const Full: Story = {
  args: {
    logo: <LogoBadge letter="A" color="#141414" />,
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 212.44,
    change: { amount: 3.76, percent: 1.8 },
    chart: chartData,
  },
};

export const DarkMode: Story = {
  args: {
    logo: <LogoBadge letter="A" color="#141414" />,
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 212.44,
    change: { amount: 3.76, percent: 1.8 },
    chart: chartData,
  },
  decorators: [(S) => <div className="dark" style={{ width: 400, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
