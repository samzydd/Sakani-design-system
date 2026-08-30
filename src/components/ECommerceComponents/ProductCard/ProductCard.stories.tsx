import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from './ProductCard';
import mug from '../../../assets/products/card-mug.jpg';
import tableRunner from '../../../assets/products/card-table-runner.jpg';
import servingBoard from '../../../assets/products/card-serving-board.jpg';

const meta = {
  title: 'E-commerce/Product Card',
  component: ProductCard,
  tags: ['autodocs'],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mugColors = [
  { label: 'Navy', color: '#1B284D' },
  { label: 'Bone', color: '#F5F4F2' },
  { label: 'Periwinkle', color: '#8E9FE8' },
  { label: 'Magenta', color: '#C6197A' },
];

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = React.useState('Bone');
    const [wishlisted, setWishlisted] = React.useState(false);
    return (
      <ProductCard
        image={mug}
        name="Ceramic Pour-Over Mug"
        description="Handcrafted from natural stoneware clay, this minimal pour-over mug features a built-in ceramic dripper for slow, single-cup brewing. Dishwasher safe and made to last."
        price={28}
        rating={5}
        colors={mugColors.map((c) => ({ ...c, selected: selected === c.label }))}
        onColorSelect={setSelected}
        wishlisted={wishlisted}
        onWishlistToggle={setWishlisted}
      />
    );
  },
};

export const Sale: Story = {
  render: () => {
    const [selected, setSelected] = React.useState('Bone');
    return (
      <ProductCard
        image={tableRunner}
        name="Linen Table Runner"
        description="Woven from 100% European flax linen, this table runner adds effortless texture to any setting. Pre-washed for a soft, lived-in drape. Machine washable and naturally durable."
        price={34}
        compareAtPrice={48}
        rating={5}
        colors={mugColors.map((c) => ({ ...c, selected: selected === c.label }))}
        onColorSelect={setSelected}
      />
    );
  },
};

export const OutOfStock: Story = {
  args: {
    image: servingBoard,
    name: 'Oak Serving Board',
    description: 'A brief description of an oak serving board for an e-commerce store',
    price: 56,
    rating: 5,
    inStock: false,
    colors: [
      { label: 'Natural', color: '#DDD0BC' },
      { label: 'Amber', selected: true, color: '#D2691E' },
      { label: 'Lilac', color: '#D9CBE8' },
      { label: 'Rose', color: '#E5A0B8' },
    ],
  },
};

export const Grid: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <ProductCard image={mug} name="Ceramic Pour-Over Mug" price={28} rating={5} colors={mugColors} />
      <ProductCard image={tableRunner} name="Linen Table Runner" price={34} compareAtPrice={48} rating={5} colors={mugColors} />
      <ProductCard image={servingBoard} name="Oak Serving Board" price={56} rating={5} inStock={false} colors={mugColors} />
    </div>
  ),
};

export const DarkMode: Story = {
  args: {
    image: tableRunner,
    name: 'Linen Table Runner',
    description: 'Woven from 100% European flax linen, this table runner adds effortless texture to any setting.',
    price: 34,
    compareAtPrice: 48,
    rating: 5,
    colors: mugColors,
  },
  decorators: [(S) => <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
