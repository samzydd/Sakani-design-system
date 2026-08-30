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
} satisfies Meta<typeof ShoppingCartBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { items } };
export const Empty: Story = { args: { items: [] } };

export const DarkMode: Story = {
  args: { items },
  decorators: [(S) => <div className="dark"><S /></div>],
};
