import type { Meta, StoryObj } from '@storybook/react';
import { PlaceholderLogo } from './PlaceholderLogo';

const meta = {
  title: 'Marketing/Placeholder Logo',
  component: PlaceholderLogo,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Matches Figma "Placeholder Logo" (Marketing primitives set, 3 sizes:
sm 22 / md 40 / lg 46) -- a bg/surface + border/subtle + radius/lg
square slot for a company/brand mark, same "empty-state avatar" role
Avatar's own Icon type fills for a person. Figma's own asset inside
this frame is this library's own Sakani mark (a real image asset --
a colored square with the wordmark baked in, not a plain stroke
glyph), used here as the default fill exactly as shown in the design
file. \`logo\` is still a consumer-supplied override slot exactly like
Avatar's own \`icon\` prop -- a real usage (a logo wall, a company
directory row, a "brands using this" grid) drops in an arbitrary
company's own mark instead, whether that's another lucide icon (still
cloned with the correct compensated size/strokeWidth) or a plain
image/ReactNode.

Container/icon px pairs per size are Figma's own literal presets, not
one shared ratio -- sm is 22/14, md is 40/16, lg is 46/18, none of
which share a common scale factor, so each is hardcoded rather than
derived from a formula.` } } },
} satisfies Meta<typeof PlaceholderLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = { args: { size: 'sm', label: 'Acme Inc.' } };
export const Medium: Story = { args: { size: 'md', label: 'Acme Inc.' } };
export const Large: Story = { args: { size: 'lg', label: 'Acme Inc.' } };

export const Row: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <PlaceholderLogo size="sm" label="Acme Inc." />
      <PlaceholderLogo size="md" label="Acme Inc." />
      <PlaceholderLogo size="lg" label="Acme Inc." />
    </div>
  ),
};

export const DarkMode: Story = {
  args: { size: 'md', label: 'Acme Inc.' },
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};
