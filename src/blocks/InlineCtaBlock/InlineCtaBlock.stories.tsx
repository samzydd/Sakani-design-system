import type { Meta, StoryObj } from '@storybook/react';
import { InlineCtaBlock } from './InlineCtaBlock';

const meta = {
  title: 'Blocks/Application/Inline CTA',
  component: InlineCtaBlock,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
your project and edit it directly.

Matches Figma "Inline CTA": Featured Icon + title/description + action
Button, in a card. \`variant\` stays an explicit prop (not derived) --
"Default" and "Accent" aren't computable from any other value here, and
each one governs three things at once (card fill/border, title color,
button style), same reasoning as Modal's \`variant\`.

Figma's raw export swaps the icon's own fill to white on Accent, but that
reads as leftover from a dark-background instance elsewhere -- the
screenshot for this component actually shows the same dark icon on a
white Featured-Icon wrap in both variants, so that's what's built here.

Button reuse: Default's action = Button variant="primary"; Accent's =
variant="outline" (bg/surface + border/subtle is an exact match for
Figma's "Add payment method" button here). Both accept Figma's 14px
text but 2px-shorter vertical padding than Button's own "md" preset,
the same kind of small documented deviation used throughout this set.` } } },
  argTypes: {
    variant: { control: 'select', options: ['default', 'accent'] },
  },
  decorators: [(S) => <div style={{ width: 650 }}><S /></div>],
} satisfies Meta<typeof InlineCtaBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Unlock advanced analytics',
    description: 'Upgrade to Pro to see detailed usage trends and exports.',
    actionLabel: 'Upgrade',
  },
};

export const Accent: Story = {
  args: {
    variant: 'accent',
    title: 'Free trial ends in 3 days',
    description: 'Add a payment method to keep access to Pro features.',
    actionLabel: 'Add payment method',
  },
};

export const DarkMode: Story = {
  args: Accent.args,
  decorators: [(S) => <div className="dark" style={{ width: 650, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};
