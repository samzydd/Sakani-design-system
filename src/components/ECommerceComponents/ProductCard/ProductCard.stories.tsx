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
  parameters: { docs: { description: { component: `Matches Figma "Product Card" (E-commerce set): image (wishlist button +
sale badge overlay) -> rating -> name/price -> description -> color
swatches -> "Add Item" button.

Figma's 3 style previews collapse into two real, independent axes rather
than a manual style prop, same reasoning as CartItem/PriceDisplay:
\`compareAtPrice\` presence -> sale badge ("-X%", same ceil-rounding as
PriceDisplay) + a struck-through original price next to the current
one. NOT a reuse of the PriceDisplay component itself, though --
Figma's card price row is plain 16px fg/default black for the
current price (no danger-red, no 20px heading size), a genuinely
different, more subdued treatment than PriceDisplay's own sale
styling, so it's built locally here to match.
\`inStock={false}\` -> dimmed image, "Out of stock" label, wishlist
button hidden (Figma's own Out-of-Stock preview drops it), and the
Add Item button disabled -- Figma's static mockup doesn't show a
disabled button since it can't demonstrate interaction, but shipping
an enabled "buy" button for something explicitly out of stock would
be a real usability bug, so this adds it.

Star rating is a small dedicated element (round-to-nearest-star fill,
Lucide \`Star\` bound to warning/400 -- Figma's own gold #F9B427 sits
between warning/400 (#FDB022) and warning/500 (#F79009); 400 is the
closer match) -- no standalone Rating component exists yet, and this is
scoped to what Product Card itself asked for.

Color swatches reuse the shared ColorSwatch component directly. Wishlist
button reuses the shared WishlistButton component (also E-commerce set)
directly -- exact match for the card's own save/unsave affordance.` } } },
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
    const [wishlisted, setWishlisted] = React.useState(false);
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
        wishlisted={wishlisted}
        onWishlistToggle={setWishlisted}
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
  render: () => {
    // Out of stock doesn't render a wishlist button at all, so no state
    // needed for the serving board card.
    const [mugWishlisted, setMugWishlisted] = React.useState(false);
    const [runnerWishlisted, setRunnerWishlisted] = React.useState(false);
    return (
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <ProductCard image={mug} name="Ceramic Pour-Over Mug" price={28} rating={5} colors={mugColors} wishlisted={mugWishlisted} onWishlistToggle={setMugWishlisted} />
        <ProductCard image={tableRunner} name="Linen Table Runner" price={34} compareAtPrice={48} rating={5} colors={mugColors} wishlisted={runnerWishlisted} onWishlistToggle={setRunnerWishlisted} />
        <ProductCard image={servingBoard} name="Oak Serving Board" price={56} rating={5} inStock={false} colors={mugColors} />
      </div>
    );
  },
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
