import type { Meta, StoryObj } from '@storybook/react';
import { CheckoutFlowBlock } from './CheckoutFlowBlock';
import mug from '../../assets/products/card-mug.jpg';

const items = [
  { image: mug, name: 'Ceramic Pour-Over Mug', variant: 'Color: Sand', price: 28, quantity: 1 },
];

const meta = {
  title: 'Blocks/E-commerce/Checkout Flow',
  component: CheckoutFlowBlock,
  tags: ['autodocs'],
  args: { items },
} satisfies Meta<typeof CheckoutFlowBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Shipping: Story = {};
export const Payment: Story = { args: { initialStep: 'payment' } };

export const DarkMode: Story = {
  decorators: [(S) => <div className="dark"><S /></div>],
};
