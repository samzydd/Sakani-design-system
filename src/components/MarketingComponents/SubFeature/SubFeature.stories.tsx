import type { Meta, StoryObj } from '@storybook/react';
import { Zap } from 'lucide-react';
import { SubFeature } from './SubFeature';

const meta = {
  title: 'Marketing/Sub Feature',
  component: SubFeature,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Matches Figma "Sub Feature" (Marketing primitives set, 2 independent
axes: Layout (Horizontal/Vertical) x Left border (True/False)). Both
stay real, explicit props (Figma's own axis names) -- genuine layout
choices with nothing in the icon/title/description data to derive
them from.

\`leftBorder\` always wraps the ENTIRE icon+text group (not just the
text) in a row alongside a vertical rail, regardless of \`layout\` --
confirmed from Figma's own "Vertical, Left border=True" export, where
the rail sits to the left of the icon-above-text column, not just
beside the text. The rail is the shared Divider component
(orientation="vertical"), with the same height:auto override
BlogBlockquote's own rail needed: Divider's own height:100% can't
resolve against this row's content-sized (indefinite) height, so
without the override it falls back to a min-height floor instead of
stretching to match the icon+text group's actual height.

The icon chip reuses the shared FeaturedIcon component directly
(size="sm", variant="light" -- an exact match for Figma's own 32px
bg/surface+border/subtle chip here), not rebuilt locally.` } } },
} satisfies Meta<typeof SubFeature>;

export default meta;
type Story = StoryObj<typeof meta>;

const args = {
  icon: <Zap />,
  title: 'Custom theming',
  description: 'Override any token once and the whole system updates.',
};

export const HorizontalNoBorder: Story = { args: { ...args, layout: 'horizontal', leftBorder: false } };
export const HorizontalWithBorder: Story = { args: { ...args, layout: 'horizontal', leftBorder: true } };
export const VerticalNoBorder: Story = { args: { ...args, layout: 'vertical', leftBorder: false } };
export const VerticalWithBorder: Story = { args: { ...args, layout: 'vertical', leftBorder: true } };

export const DarkMode: Story = {
  args: { ...args, layout: 'horizontal', leftBorder: true },
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};
