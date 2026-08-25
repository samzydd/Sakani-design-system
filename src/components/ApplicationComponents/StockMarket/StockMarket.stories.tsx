import type { Meta, StoryObj } from '@storybook/react';
import { StockMarket } from './StockMarket';

/** Real marks as used in the Figma reference (extracted directly from that
 * file) -- `logo` is a fully consumer-supplied slot in the component itself
 * (see StockMarket.tsx), these are just story fixtures. Paths use
 * `currentColor` so they pick up `--color-fg-default` and invert correctly
 * in dark mode, same as every other icon-slot in this set. */
const AppleLogo = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', color: 'var(--color-fg-default)' }}>
    <path d="M16.2027 9.19467C14.9387 9.19467 12.9827 7.75733 10.9227 7.808C8.20267 7.844 5.70933 9.38533 4.308 11.8267C1.48533 16.7267 3.58 23.964 6.33333 27.9467C7.684 29.8853 9.27733 32.0667 11.3893 31.9987C13.416 31.912 14.176 30.6827 16.636 30.6827C19.0773 30.6827 19.7693 31.9987 21.916 31.9467C24.0987 31.912 25.484 29.9733 26.8173 28.016C28.3587 25.7653 28.9987 23.5827 29.0333 23.4627C28.9813 23.4453 24.7907 21.8347 24.74 16.9867C24.7053 12.9333 28.0467 10.9947 28.2027 10.908C26.2973 8.12133 23.372 7.80933 22.3493 7.74C19.6827 7.532 17.4493 9.19467 16.2027 9.19467ZM20.7067 5.10667C21.8307 3.75733 22.5733 1.87067 22.3667 0C20.7573 0.0693333 18.8173 1.07333 17.6573 2.424C16.6173 3.61867 15.7187 5.54133 15.96 7.376C17.744 7.51467 19.58 6.45867 20.7053 5.108" fill="currentColor" />
  </svg>
);
const TeslaLogo = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', color: 'var(--color-fg-default)' }}>
    <path d="M20.2028 3.72546C20.8077 3.77595 21.6745 3.87091 22.7145 4.04577C24.6553 4.37209 27.1894 4.97657 29.7507 6.0946C29.1183 6.85645 28.3049 7.45879 27.5856 7.89245C27.2153 8.11572 26.8758 8.28776 26.612 8.41394C26.5341 8.1436 26.4221 7.89238 26.2624 7.66491C25.9756 7.25653 25.5694 6.96652 25.0554 6.76159C24.0627 6.36598 22.5702 6.25378 20.4567 6.25378H20.0378L19.9645 6.66687L15.9929 29.078L12.0007 6.6532L11.9265 6.24011L11.5065 6.24109C9.40573 6.24737 7.91969 6.36225 6.93036 6.75964C6.41794 6.9655 6.0133 7.2566 5.72723 7.66491C5.56728 7.89325 5.45456 8.14538 5.37665 8.41687C5.11289 8.29159 4.77337 8.11999 4.40301 7.89734C3.68329 7.46464 2.86851 6.86208 2.23602 6.09558C4.79829 4.9767 7.33351 4.37223 9.27508 4.04577C10.3153 3.87088 11.1819 3.77596 11.7868 3.72546C12.0886 3.70027 12.325 3.68655 12.485 3.67859L15.3425 7.1864L14.9274 7.69519H17.0475L16.6345 7.18835L19.5046 3.67859C19.6645 3.68654 19.901 3.70027 20.2028 3.72546Z" fill="currentColor" stroke="currentColor" />
    <path d="M15.995 2.00748C20.5323 1.96961 25.7232 2.71438 31.0397 5.03707C31.7562 3.74949 31.9321 3.18144 31.9321 3.18144C26.1254 0.871385 20.6831 0.0887416 15.995 0.0634951C11.3194 0.0887416 5.87714 0.871385 0.0578162 3.18144C0.0578162 3.18144 0.32176 3.87572 0.950196 5.03707C6.26677 2.70176 11.4577 1.96961 15.995 2.00748Z" fill="currentColor" />
  </svg>
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
    logo: <AppleLogo />,
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 212.44,
    change: { amount: 3.76, percent: 1.8 },
  },
};

export const Negative: Story = {
  args: {
    logo: <TeslaLogo />,
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 184.20,
    change: { amount: -4.34, percent: -2.3 },
  },
};

export const Full: Story = {
  args: {
    logo: <AppleLogo />,
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 212.44,
    change: { amount: 3.76, percent: 1.8 },
    chart: chartData,
  },
};

export const DarkMode: Story = {
  args: {
    logo: <AppleLogo />,
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 212.44,
    change: { amount: 3.76, percent: 1.8 },
    chart: chartData,
  },
  decorators: [(S) => <div className="dark" style={{ width: 400, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
