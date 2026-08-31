import type { Meta, StoryObj } from '@storybook/react';
import { LogoCloudBlock } from './LogoCloudBlock';

const meta = {
  title: 'Blocks/Marketing/Logo Cloud',
  component: LogoCloudBlock,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
your project and edit it directly -- swap the real brand marks in
brandLogos.tsx for your own actual customers' logos.

Matches Figma "Logo Cloud" (node 1507:27923, 2 styles: Monochrome,
Color). \`variant\` stays a real, explicit prop (Figma's own axis,
renamed from "style" to avoid colliding with the DOM/React \`style\`
prop, same naming choice already made by Badge/FeaturedIcon/
CtaBannerBlock) -- a genuine visual choice, not derivable from which
brands are shown:
- **'monochrome'** — every logo renders in one flat fg/subtle gray.
- **'color'** — each logo renders in its own authentic brand color.

\`brands\` picks which of the built-in real marks to show (and in what
order) -- Figma's own two states happen to use all 7 in the same
order, so that's the default, but a real logo wall very plausibly
wants fewer or a different order. See brandLogos.tsx for why these
are dedicated \`color\`-prop components (one flat fill each) rather
than a generic \`filter: grayscale()\` recolor trick: that can't
reliably hit one exact target gray across logos of very different
source luminance the way directly setting the fill can.` } }, layout: 'fullscreen' },
} satisfies Meta<typeof LogoCloudBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Monochrome: Story = { args: { variant: 'monochrome' } };
export const Color: Story = { args: { variant: 'color' } };

export const DarkMode: Story = {
  args: { variant: 'monochrome' },
  decorators: [(S) => <div className="dark"><S /></div>],
};
