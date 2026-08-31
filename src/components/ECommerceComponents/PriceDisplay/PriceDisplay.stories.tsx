import type { Meta, StoryObj } from '@storybook/react';
import { PriceDisplay } from './PriceDisplay';

const meta = {
  title: 'E-commerce/Price Display',
  component: PriceDisplay,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Matches Figma "Price Display" (E-commerce set). Figma's 3 style previews
collapse into one derived axis plus one real toggle, same reasoning as
CartItem's own sale price treatment:
\`compareAtPrice\` presence -> struck-through original (fg/subtle) +
danger-solid current price, instead of the plain single price.
\`showBadge\` -- a real independent prop, not derivable: Figma's own
"Crossed" preview shows the struck price with no badge and no
current price at all (a bare building-block state, not something a
real product page would show standalone), so rather than expose
that half-state this always shows the current price once
\`compareAtPrice\` is set, and \`showBadge\` is what actually decides
whether the "Save X%" pill appears -- the percentage itself is
still computed from the two prices, not passed in.

Figma renders the strike via a separate decorative line SVG absolutely
positioned over the text; plain CSS text-decoration: line-through is
visually equivalent and far simpler, same choice already made for
CartItem's own struck price.

The badge reuses the shared Badge component (variant="danger"
emphasis="solid") -- an exact match for Figma's own badge spec.` } } },
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
