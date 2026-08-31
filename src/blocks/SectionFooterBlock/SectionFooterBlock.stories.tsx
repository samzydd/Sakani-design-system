import type { Meta, StoryObj } from '@storybook/react';
import { SectionFooterBlock } from './SectionFooterBlock';

const meta = {
  title: 'Blocks/Application/Section Footer',
  component: SectionFooterBlock,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
your project and edit it directly.

Matches Figma "Section Footer": a Divider over either a
copyright-line + link-row ("Default") or a single centered copyright
line ("Centered") -- reuses the shared Divider and Link components
directly, no new primitives.

\`variant\` stays an explicit prop (not derived) -- "Default"'s link row
vs. "Centered"'s single line is a real structural difference, not
something computable from \`links\` alone (a Default footer with an empty
link list would still want the two-column layout, not silently become
Centered).` } } },
  decorators: [(S) => <div style={{ width: 713 }}><S /></div>],
} satisfies Meta<typeof SectionFooterBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Centered: Story = {
  args: {
    variant: 'centered',
    text: 'Sakani v1.2 · © 2026 Sakani. Open source under the MIT license.',
  },
};

export const DarkMode: Story = {
  decorators: [(S) => <div className="dark" style={{ width: 713, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
