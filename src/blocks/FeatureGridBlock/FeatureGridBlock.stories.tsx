import type { Meta, StoryObj } from '@storybook/react';
import { Zap, ShieldCheck, Layers, Palette } from 'lucide-react';
import { FeatureGridBlock } from './FeatureGridBlock';

const meta = {
  title: 'Blocks/Marketing/Feature Grid',
  component: FeatureGridBlock,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
your project and edit it directly.

Matches Figma "Feature Grid" (node 1507:27888, 3 previews: Columns=2/
3/4). Figma's own "Columns" axis is fully derived from \`features.length\`
in every one of its 3 examples (2 features -> 2 columns, 3 -> 3, 4 ->
4) rather than an independent choice, so \`columns\` defaults to
\`features.length\` here too instead of needing to be set manually for
the common case -- it stays a real optional override, though, for
wrapping more features onto fewer columns (e.g. 6 features at
columns=3 makes two rows) since that genuinely can't be derived.

Each feature's icon chip reuses the shared FeaturedIcon component
(size="md", variant="light" -- an exact match for Figma's own 40px
bg/surface+border/subtle chip here) -- no new visual primitives, this
block is purely an icon + title + description repeated in a grid.` } }, layout: 'fullscreen' },
} satisfies Meta<typeof FeatureGridBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

const allFeatures = [
  { icon: <Zap />, title: 'Built for speed', description: 'Every component is optimized out of the box, so your interface stays fast without extra work.' },
  { icon: <ShieldCheck />, title: 'Accessible by default', description: 'Keyboard navigation, focus states, and semantic markup are built in, not bolted on.' },
  { icon: <Layers />, title: 'Composable by design', description: 'Every block is assembled from the same primitives your app already uses.' },
  { icon: <Palette />, title: 'Token-driven theming', description: 'Swap a variable, not a stylesheet — light and dark modes ship for free.' },
];

export const TwoColumns: Story = { args: { features: allFeatures.slice(0, 2) } };
export const ThreeColumns: Story = { args: { features: allFeatures.slice(0, 3) } };
export const FourColumns: Story = { args: { features: allFeatures } };

export const DarkMode: Story = {
  args: { features: allFeatures },
  decorators: [(S) => <div className="dark"><S /></div>],
};
