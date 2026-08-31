import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CartItem } from './CartItem';
import mug from '../../../assets/products/cart-mug.png';
import tableRunner from '../../../assets/products/cart-table-runner.png';

const meta = {
  title: 'E-commerce/Cart Item',
  component: CartItem,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Matches Figma "Cart Item" (E-commerce set): thumbnail + name/variant/
quantity stepper -> price + remove button, right-aligned.

Figma's "Default"/"Sale" style previews collapse into one derived axis --
same reasoning as StockMarket's positive/negative: \`compareAtPrice\` being
set switches to the struck-through original price + danger-solid sale
price; its absence renders the plain single price. Not a manual variant
prop since it's fully computable from the price data itself.

The quantity stepper reuses the shared QuantitySelector component
(also E-commerce set) directly -- it's the same standalone component
Figma's own "Quantity Selector" node describes, not a separate
approximation.

The remove button (Minus icon, not Trash -- taken directly from Figma)
reuses the shared IconButton (variant="outline", size="sm") -- Figma's
"Sale" style export drops the button's own bg/border/shadow classes, but
the screenshot shows both style previews with an identical bordered
square, so that reads as an authoring slip in the export, not an
intentional per-variant difference.` } } },
  decorators: [(S) => <div style={{ width: 472 }}><S /></div>],
} satisfies Meta<typeof CartItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [quantity, setQuantity] = React.useState(1);
    return (
      <CartItem
        image={mug}
        name="Ceramic Pour-Over Mug"
        variant="Color: Sand"
        price={28}
        quantity={quantity}
        onQuantityChange={setQuantity}
      />
    );
  },
};

export const Sale: Story = {
  render: () => {
    const [quantity, setQuantity] = React.useState(1);
    return (
      <CartItem
        image={tableRunner}
        name="Linen Table Runner"
        variant="Color: Natural"
        price={34}
        compareAtPrice={48}
        quantity={quantity}
        onQuantityChange={setQuantity}
      />
    );
  },
};

export const List: Story = {
  render: () => {
    const [qty1, setQty1] = React.useState(1);
    const [qty2, setQty2] = React.useState(1);
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <CartItem image={mug} name="Ceramic Pour-Over Mug" variant="Color: Sand" price={28} quantity={qty1} onQuantityChange={setQty1} />
        <CartItem image={tableRunner} name="Linen Table Runner" variant="Color: Natural" price={34} compareAtPrice={48} quantity={qty2} onQuantityChange={setQty2} />
      </div>
    );
  },
};

export const AtMinQuantity: Story = {
  args: {
    image: mug,
    name: 'Ceramic Pour-Over Mug',
    variant: 'Color: Sand',
    price: 28,
    quantity: 1,
  },
};

export const DarkMode: Story = {
  render: () => {
    const [quantity, setQuantity] = React.useState(1);
    return (
      <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
        <CartItem image={mug} name="Ceramic Pour-Over Mug" variant="Color: Sand" price={28} quantity={quantity} onQuantityChange={setQuantity} />
      </div>
    );
  },
};
