import type { Meta, StoryObj } from '@storybook/react';
import { ProductDetailBlock } from './ProductDetailBlock';
import mug from '../../assets/products/card-mug.jpg';

const images = [
  { src: mug, alt: 'Ceramic Pour-Over Mug' },
  { src: mug, alt: 'Ceramic Pour-Over Mug, angle 2' },
  { src: mug, alt: 'Ceramic Pour-Over Mug, angle 3' },
  { src: mug, alt: 'Ceramic Pour-Over Mug, angle 4' },
];

const colors = [
  { label: 'Navy', color: '#1B284D' },
  { label: 'Brown', color: '#6F4E37' },
  { label: 'Grey', color: '#9CA3AF' },
];

const sizes = [
  { size: 'S' },
  { size: 'M' },
  { size: 'L' },
];

const meta = {
  title: 'Blocks/E-commerce/Product Detail',
  component: ProductDetailBlock,
  tags: ['autodocs'],
  args: {
    name: 'Ceramic Pour-Over Mug',
    images,
    rating: 4.9,
    reviewCount: 2300,
    stockQuantity: 24,
    price: 28,
    description: "A hand-thrown ceramic mug designed for slow mornings. Wide mouth for easy pouring, comfortable handle, dishwasher safe.",
    colors,
    sizes,
    defaultColor: 'Navy',
    defaultSize: 'M',
  },
} satisfies Meta<typeof ProductDetailBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OnSale: Story = {
  args: { price: 22, compareAtPrice: 28 },
};

export const LowStock: Story = {
  args: { stockQuantity: 3 },
};

export const DarkMode: Story = {
  decorators: [(S) => <div className="dark"><S /></div>],
};
