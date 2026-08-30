import type { Meta, StoryObj } from '@storybook/react';
import { StockStatus } from './StockStatus';

const meta = {
  title: 'E-commerce/Stock Status',
  component: StockStatus,
  tags: ['autodocs'],
} satisfies Meta<typeof StockStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InStock: Story = { args: { quantity: 24 } };
export const LowStock: Story = { args: { quantity: 3 } };
export const OutOfStock: Story = { args: { quantity: 0 } };

export const AllStyles: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <StockStatus quantity={24} />
      <StockStatus quantity={3} />
      <StockStatus quantity={0} />
    </div>
  ),
};

export const DarkMode: Story = {
  args: { quantity: 3 },
  decorators: [(S) => <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
