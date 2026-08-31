import type { Meta, StoryObj } from '@storybook/react';
import { StockStatus } from './StockStatus';

const meta = {
  title: 'E-commerce/Stock Status',
  component: StockStatus,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Matches Figma "Stock Status" (E-commerce set): a subtle-emphasis Badge
in success/warning/danger. A thin wrapper around the shared Badge
component -- the bg/fg pairs match Badge's own success/warning/danger
"subtle" variants exactly.

Figma's 3 style previews all collapse into one derived value: since the
"Low Stock" label itself shows a literal count ("Only 3 left"), the
component takes inventory \`quantity\` directly rather than a manual
status enum -- both the badge color AND the label text derive from
\`quantity\` vs. \`lowStockThreshold\` (default 5):
quantity <= 0 -> danger, "Out of stock"
0 < quantity <= lowStockThreshold -> warning, "Only {quantity} left"
quantity > lowStockThreshold -> success, "In stock"
No separate manual status/label props needed for the common case; an
optional \`label\` override still exists for anything unusual.` } } },
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
