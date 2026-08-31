import type { Meta, StoryObj } from '@storybook/react';
import { Zap } from 'lucide-react';
import { FeaturedIcon } from './FeaturedIcon';

const meta = {
  title: 'Marketing/Featured Icon',
  component: FeaturedIcon,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Matches Figma "Featured Icon" (Marketing primitives set): a rounded
icon chip used to headline a feature/benefit callout. 12 previews --
Size (sm/md/lg) x Style (Light/Outline/Solid/Subtle):

sm: 32px frame, 8px padding, 16px icon, radius/lg (12px)
md: 40px frame, 10px padding, 20px icon, radius/lg (12px)
lg: 56px frame, 16px padding, 24px icon, radius/xl (16px) -- lg gets
a slightly larger radius than sm/md, not just a linear scale-up,
confirmed via each size's own live spec rather than assumed.

- **light** — bg/surface, border/subtle, fg/default icon.
- **outline** — transparent background, border/subtle, fg/default icon -- visually identical to light except for the fill, so it blends with whatever the parent's own background is instead of always forcing white.
- **solid** — bg accent/default (near-black), border/subtle, fg/on-accent (white) icon.
- **subtle** — bg accent/subtle (light neutral), border/subtle, fg/default icon.

Figma's own axis is named "Style"; called \`variant\` here instead to
avoid colliding with the DOM/React \`style\` prop convention, same
naming choice already made by Badge (\`variant\`/\`emphasis\`).

Icon is a consumer-supplied ReactNode (any Lucide glyph) cloned with
the size's own compensated size/strokeWidth, the same
clone-for-consistent-stroke-weight pattern used by Avatar's icon slot
and Input's leading/trailing icons.` } } },
  args: { icon: <Zap /> },
} satisfies Meta<typeof FeaturedIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = { args: { size: 'lg', variant: 'light' } };
export const Outline: Story = { args: { size: 'lg', variant: 'outline' } };
export const Solid: Story = { args: { size: 'lg', variant: 'solid' } };
export const Subtle: Story = { args: { size: 'lg', variant: 'subtle' } };

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <FeaturedIcon {...args} size="sm" />
      <FeaturedIcon {...args} size="md" />
      <FeaturedIcon {...args} size="lg" />
    </div>
  ),
  args: { variant: 'subtle' },
};

export const DarkMode: Story = {
  args: { size: 'lg', variant: 'solid' },
  decorators: [() => (
    <div className="dark" style={{ display: 'flex', gap: 16, padding: 24, background: 'var(--color-bg-canvas)' }}>
      <FeaturedIcon icon={<Zap />} size="lg" variant="light" />
      <FeaturedIcon icon={<Zap />} size="lg" variant="outline" />
      <FeaturedIcon icon={<Zap />} size="lg" variant="solid" />
      <FeaturedIcon icon={<Zap />} size="lg" variant="subtle" />
    </div>
  )],
};
