import type { Meta, StoryObj } from '@storybook/react';
import { PriceDisplay } from './PriceDisplay';

const meta = {
  title: 'E-commerce/Price Display',
  component: PriceDisplay,
  tags: ['autodocs'],
} satisfies Meta<typeof PriceDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { price: 28 } };
export const Sale: Story = { args: { price: 34, compareAtPrice: 48 } };
export const SaleWithBadge: Story = { args: { price: 34, compareAtPrice: 48, showBadge: true } };

export const AllStyles: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <PriceDisplay price={28} />
      <PriceDisplay price={34} compareAtPrice={48} />
      <PriceDisplay price={34} compareAtPrice={48} showBadge />
    </div>
  ),
};

export const DarkMode: Story = {
  args: { price: 34, compareAtPrice: 48, showBadge: true },
  decorators: [(S) => <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
