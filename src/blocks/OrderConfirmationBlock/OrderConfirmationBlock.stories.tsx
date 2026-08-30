import type { Meta, StoryObj } from '@storybook/react';
import { OrderConfirmationBlock } from './OrderConfirmationBlock';
import mug from '../../assets/products/card-mug.jpg';

const items = [
  { image: mug, name: 'Ceramic Pour-Over Mug', variant: 'Color: Sand', price: 28 },
];

const meta = {
  title: 'Blocks/E-commerce/Order Confirmation',
  component: OrderConfirmationBlock,
  tags: ['autodocs'],
  args: { orderNumber: 'SK-40218', items, total: 28 },
} satisfies Meta<typeof OrderConfirmationBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTracking: Story = {
  args: { estimatedDelivery: 'Aug 28–30' },
};

export const DarkMode: Story = {
  args: { estimatedDelivery: 'Aug 28–30' },
  decorators: [(S) => <div className="dark"><S /></div>],
};
