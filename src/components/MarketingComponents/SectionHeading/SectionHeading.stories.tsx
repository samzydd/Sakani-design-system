import type { Meta, StoryObj } from '@storybook/react';
import { SectionHeading } from './SectionHeading';

const meta = {
  title: 'Marketing/Section Heading',
  component: SectionHeading,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Matches Figma "Section Heading" (Marketing primitives set, 2
alignments: Center, Left). \`align\` stays a real, explicit prop
(Figma's own axis) -- a genuine layout choice, not derivable from the
heading's own content. Whether the eyebrow badge renders is derived
from \`eyebrow\` presence instead, same "derive from data" pattern used
throughout this library.

Eyebrow reuses the shared Badge component (accent/subtle, an exact
match). This is the same badge+title+subtitle shape ProductGridBlock
already built inline for its own heading before this component
existed -- ProductGridBlock now reuses this instead of its own local
copy, so there's one implementation instead of two drifting in
parallel (the exact reasoning CartItem's own QuantitySelector reuse
already established in this library).

The title renders a real heading tag (\`<h2>\` by default, overridable
via \`titleAs\`), not Figma's own flat \`<p>\` export -- same reasoning
RichTextHeading gives for not preserving a design tool's lack of
document structure: this introduces a real page section, so it needs
to actually BE a heading, not just look like one. \`titleAs\` exists
for the rarer case of nesting this under another heading where h2
would skip a level.` } } },
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

const args = {
  eyebrow: 'Features',
  title: 'Everything you need to ship faster',
  subtitle: 'A complete system of tokens, components, and blocks — designed for production from day one.',
};

export const Center: Story = {
  args: { ...args, align: 'center' },
  render: (a) => <div style={{ width: 560 }}><SectionHeading {...a} /></div>,
};

export const Left: Story = {
  args: { ...args, align: 'left' },
  render: (a) => <div style={{ width: 560 }}><SectionHeading {...a} /></div>,
};

export const DarkMode: Story = {
  args: { ...args, align: 'center' },
  render: (a) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)', width: 608 }}>
      <div style={{ width: 560 }}><SectionHeading {...a} /></div>
    </div>
  ),
};
