import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { QuantitySelector } from './QuantitySelector';

const meta = {
  title: 'E-commerce/Quantity Selector',
  component: QuantitySelector,
  tags: ['autodocs'],
} satisfies Meta<typeof QuantitySelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [quantity, setQuantity] = React.useState(1);
    return <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />;
  },
};

export const Incremented: Story = {
  render: () => {
    const [quantity, setQuantity] = React.useState(3);
    return <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />;
  },
};

export const WithMax: Story = {
  render: () => {
    const [quantity, setQuantity] = React.useState(5);
    return <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} max={5} />;
  },
};

export const DarkMode: Story = {
  args: { quantity: 3 },
  decorators: [(S) => <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
