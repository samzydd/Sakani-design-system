import type { Meta, StoryObj } from '@storybook/react';
import { Zap, ShieldCheck, Layers, Palette } from 'lucide-react';
import { FeatureGridBlock } from './FeatureGridBlock';

const meta = {
  title: 'Blocks/Marketing/Feature Grid',
  component: FeatureGridBlock,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
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
