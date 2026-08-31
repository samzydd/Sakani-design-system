import type { Meta, StoryObj } from '@storybook/react';
import { RichTextHeading } from './RichTextHeading';

const meta = {
  title: 'Marketing/Rich Text Heading',
  component: RichTextHeading,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Matches Figma "Rich Text Heading" (Marketing primitives set, 2 levels:
H2, H3). \`level\` stays a real, explicit prop (Figma's own axis) --
unlike most "style" axes elsewhere in this set, a heading's semantic
level genuinely can't be derived from its text content, and it
directly decides which real HTML tag renders (\`<h2>\`/\`<h3>\`), not just
which visual size -- this is prose content, so the actual document
outline matters for accessibility, unlike Figma's own flat \`<p>\`
export (a design tool has no heading hierarchy to preserve).

- **h2** — heading/lg: 24px/32px medium, -0.24px tracking, fg/default.
- **h3** — heading/md: 20px/28px medium, fg/default (no tracking -- confirmed absent from Figma's own h3 export, unlike h2's).` } } },
} satisfies Meta<typeof RichTextHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H2: Story = {
  args: { level: 'h2', children: 'Why design systems fail in year two' },
};

export const H3: Story = {
  args: { level: 'h3', children: 'The maintenance gap nobody plans for' },
};

export const DarkMode: Story = {
  args: { level: 'h2', children: 'Why design systems fail in year two' },
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};
