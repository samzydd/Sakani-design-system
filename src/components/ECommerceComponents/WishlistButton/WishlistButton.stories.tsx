import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { WishlistButton } from './WishlistButton';

const meta = {
  title: 'E-commerce/Wishlist Button',
  component: WishlistButton,
  tags: ['autodocs'],
} satisfies Meta<typeof WishlistButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [saved, setSaved] = React.useState(false);
    return <WishlistButton saved={saved} onToggle={setSaved} label="Ceramic Pour-Over Mug" />;
  },
};

export const Saved: Story = {
  render: () => {
    const [saved, setSaved] = React.useState(true);
    return <WishlistButton saved={saved} onToggle={setSaved} label="Ceramic Pour-Over Mug" />;
  },
};

export const DarkMode: Story = {
  args: { saved: true, label: 'Ceramic Pour-Over Mug' },
  decorators: [(S) => <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
