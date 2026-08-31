import type { Meta, StoryObj } from '@storybook/react';
import { ShoppingCartBlock } from './ShoppingCartBlock';
import mug from '../../assets/products/card-mug.jpg';
import tableRunner from '../../assets/products/card-table-runner.jpg';

const items = [
  { image: mug, name: 'Ceramic Pour-Over Mug', variant: 'Color: Sand', price: 28, quantity: 1 },
  { image: tableRunner, name: 'Linen Table Runner', variant: 'Color: Natural', price: 34, compareAtPrice: 48, quantity: 1 },
];

const meta = {
  title: 'Blocks/E-commerce/Shopping Cart',
  component: ShoppingCartBlock,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
your project and edit it directly: wire "Checkout"/"Continue shopping"
to your real cart/checkout flow in place of the callbacks here.

Matches Figma "Shopping Cart" (node 1659:30038, 2 states: Default,
Empty). Whether the Empty layout renders is fully derived from
\`items.length === 0\`, not a manual style prop -- same "derive from
data" pattern used throughout this library. The header count and the
subtotal/total are likewise derived from the live item state (quantity
changes and removals recompute both), not static numbers, same
reasoning as CheckoutFlowBlock's own order summary.

Composed entirely from components already in this library: CartItem
(E-commerce, already covering the row's own thumb/name/variant/
quantity-stepper/price/sale-treatment/remove-button), Divider, and
Button -- no new visual primitives.` } } },
} satisfies Meta<typeof ShoppingCartBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { items } };
export const Empty: Story = { args: { items: [] } };

export const DarkMode: Story = {
  args: { items },
  decorators: [(S) => <div className="dark"><S /></div>],
};
