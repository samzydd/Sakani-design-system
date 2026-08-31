import type { Meta, StoryObj } from '@storybook/react';
import { HeroBlock } from './HeroBlock';
import patternRefraction from '../../assets/marketing/hero-pattern-refraction.jpg';
import heroImage from '../../assets/marketing/blog-image-balloons.jpg';

const meta = {
  title: 'Blocks/Marketing/Hero',
  component: HeroBlock,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
your project and edit it directly: wire the two actions to your real
signup/repo links in place of the callbacks here.

Matches Figma "Hero" (node 1505:27910, 2 layouts: Centered, Split).
\`layout\` stays a real, explicit prop (Figma's own axis) -- a genuine
layout choice, not derivable from the copy or image:
- **'centered'** — everything stacked and center-aligned, larger display type (40px title), full-width image below the CTAs, and a caption line under the image.
- **'split'** — content column (badge/title/description/CTAs) beside a fixed-size image, left-aligned, smaller title (28px, the same heading/lg size SectionHeading uses) -- no caption line in this layout (Figma's own Split export has none).

Both buttons reuse the shared Button component at size="lg" with an
18px-vs-16px icon quirk already worked out for CtaBannerBlock's own
GitHub button (Button doesn't clone-resize icons, and Button's own
lg-size icon convention is actually 16px despite its doc comment
claiming 18px) -- same local GitHub icon, default size 16, reused
here rather than a shared export since blocks are copy-paste
composition examples.

\`image\` is a required prop, not a bundled default: Figma's own hero
mockup uses a named "Pattern Refraction" effect (an iridescent,
diagonally-banded foil/glass texture) as its generic "image goes
here" placeholder, and this file's own Storybook demo supplies the
real downloaded graphic for that -- but it is NOT imported inside
this component file. A real Vite constraint forced that split:
imported assets get base64-inlined directly into the built JS in
\`vite build --lib\` mode regardless of file size or the assetFileNames
config (there's no HTML entry point in library output to resolve a
hashed relative asset URL against, unlike a normal app build) --
confirmed by measurement: bundling that one ~340KB image here
ballooned blocks.cjs from ~350KB to over 1.2MB. Keeping large demo
imagery confined to *.stories.tsx (excluded entirely from the
published build) is the same convention every other block with
photos already follows in this library.

\`revealImage\` is an optional add-on: when set alongside \`image\`, the
image area becomes a scratch-reveal -- dragging/swiping over it
erases \`image\` to expose \`revealImage\` underneath, via a canvas
(ScratchRevealImage.tsx, colocated in this folder) using
destination-out compositing along the pointer's path. Omitting it
keeps the image a plain static \`<img>\`, matching Figma exactly.` } }, layout: 'fullscreen' },
} satisfies Meta<typeof HeroBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Centered: Story = {
  args: {
    eyebrow: 'Now open source',
    title: 'Design faster. Ship sooner.',
    description: 'Sakani is an open-source, production-ready design system with full Figma-to-React parity — built to take you from idea to shipped interface.',
    primaryAction: { label: 'Get started' },
    secondaryAction: { label: 'View on GitHub' },
    secondaryActionIcon: true,
    image: patternRefraction,
    caption: 'Free and open source · MIT licensed',
    layout: 'centered',
  },
};

export const Split: Story = {
  args: {
    eyebrow: 'v1.2 now available',
    title: 'Your product, styled to production standard.',
    description: '60+ components, full state coverage, real Figma-to-code parity. Everything you need to build without starting from a blank canvas.',
    primaryAction: { label: 'Get started' },
    secondaryAction: { label: 'View on GitHub' },
    secondaryActionIcon: true,
    image: patternRefraction,
    layout: 'split',
  },
};

/** `image` accepts any real photo in place of the Pattern Refraction placeholder. */
export const WithRealImage: Story = {
  args: { ...Centered.args, image: heroImage },
};

/** Swipe/drag over the image to erase the placeholder and reveal the real photo underneath. */
export const ScratchReveal: Story = {
  args: { ...Centered.args, image: patternRefraction, revealImage: heroImage },
};

export const DarkMode: Story = {
  args: Centered.args,
  decorators: [(S) => <div className="dark"><S /></div>],
};
