import type { Meta, StoryObj } from '@storybook/react';
import { ProductGridBlock } from './ProductGridBlock';
import mug from '../../assets/products/card-mug.jpg';
import tableRunner from '../../assets/products/card-table-runner.jpg';
import servingBoard from '../../assets/products/card-serving-board.jpg';

const mugColors = [
  { label: 'Navy', color: '#1B284D' },
  { label: 'Bone', color: '#F5F4F2', selected: true },
  { label: 'Periwinkle', color: '#8E9FE8' },
  { label: 'Magenta', color: '#C6197A' },
];

const boardColors = [
  { label: 'Natural', color: '#DDD0BC' },
  { label: 'Amber', color: '#D2691E', selected: true },
  { label: 'Lilac', color: '#D9CBE8' },
  { label: 'Rose', color: '#E5A0B8' },
];

const products = [
  {
    id: 'mug',
    image: mug,
    name: 'Ceramic Pour-Over Mug',
    description: 'Handcrafted from natural stoneware clay, this minimal pour-over mug features a built-in ceramic dripper for slow, single-cup brewing. Dishwasher safe and made to last.',
    price: 28,
    rating: 5,
    colors: mugColors,
  },
  {
    id: 'runner',
    image: tableRunner,
    name: 'Linen Table Runner',
    description: 'Woven from 100% European flax linen, this table runner adds effortless texture to any setting. Pre-washed for a soft, lived-in drape. Machine washable and naturally durable.',
    price: 34,
    compareAtPrice: 48,
    rating: 5,
    colors: mugColors,
  },
  {
    id: 'board',
    image: servingBoard,
    name: 'Oak Serving Board',
    description: 'A brief description of an oak serving board for an e-commerce store',
    price: 56,
    rating: 5,
    inStock: false,
    colors: boardColors,
  },
  {
    id: 'mug-2',
    image: mug,
    name: 'Ceramic Pour-Over Mug',
    description: 'Handcrafted from natural stoneware clay, this minimal pour-over mug features a built-in ceramic dripper for slow, single-cup brewing. Dishwasher safe and made to last.',
    price: 28,
    rating: 5,
    colors: mugColors,
  },
];

const meta = {
  title: 'Blocks/E-commerce/Product Grid',
  component: ProductGridBlock,
  tags: ['autodocs'],
  args: {
    title: 'New arrivals',
    subtitle: 'Thoughtfully made home goods, restocked every week.',
    products,
  },
} satisfies Meta<typeof ProductGridBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithFilters: Story = {
  args: { showFilterBar: true },
};

export const DarkMode: Story = {
  args: { showFilterBar: true },
  decorators: [(S) => <div className="dark"><S /></div>],
};
