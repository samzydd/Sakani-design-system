import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { WishlistButton } from './WishlistButton';

const meta = {
  title: 'E-commerce/Wishlist Button',
  component: WishlistButton,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Matches Figma "Wishlist Button" (E-commerce set): a 36px bg/surface
square, radius-md, shadow-xs, no border. Figma's Default/Saved style
preview is fully derived from a \`saved\` boolean rather than a manual
prop -- the icon itself is the only thing that changes (outline Heart
vs. filled Heart in brand/default orange, confirmed #FF4700 from the
asset), same toggle-button pattern as ColorSwatch's \`selected\`.

Bounces the heart (a scale pop, classic "like" micro-interaction) only
on the unsaved -> saved transition -- not on unsave, and not on mount if
\`saved\` starts true, since this is meant to reward the act of saving,
not just any state change. Triggered directly in the click handler
(this component knows a click while unsaved means it's about to become
saved) rather than by diffing \`saved\` across renders, since \`saved\` is
a controlled prop -- waiting for it to actually change would delay or
even skip the animation if the parent updates asynchronously.
\`prefers-reduced-motion\` disables it via the stylesheet.` } } },
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
