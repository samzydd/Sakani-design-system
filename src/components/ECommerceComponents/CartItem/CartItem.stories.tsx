import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CartItem } from './CartItem';
import mug from '../../../assets/products/cart-mug.png';
import tableRunner from '../../../assets/products/cart-table-runner.png';

const meta = {
  title: 'E-commerce/Cart Item',
  component: CartItem,
  tags: ['autodocs'],
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
