import type { Meta, StoryObj } from '@storybook/react';
import { BlogFeatureText } from './BlogFeatureText';

const meta = {
  title: 'Marketing/Blog Feature Text',
  component: BlogFeatureText,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Matches Figma "Blog Feature Text" (Marketing primitives set): a
brand-colored accent rule + a pulled-out heading/md line of body copy.
Figma's own "Align" axis (Left/Top) is a real, independent layout
choice -- not derivable from the text itself -- so it stays an
explicit prop, unlike BlogBlockquote's derived style:
- **'left' (Figma "Left")** — a thin (2px) vertical rule, self-stretch to the text's own height, row layout.
- **'top' (Figma "Top")** — a short (60px) horizontal rule above the text, column layout.

The rule is NOT the shared Divider component: Divider is bound to the
neutral border token for structural separation, while this is a
decorative brand/default (accent-orange) accent mark with a different
semantic meaning -- same reasoning ProductCard gave for building its
own price row instead of reusing PriceDisplay.` } } },
} satisfies Meta<typeof BlogFeatureText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Left: Story = {
  args: {
    text: 'The best design systems are boring in the best way — nobody notices them because everything just works.',
    align: 'left',
  },
};

export const Top: Story = {
  args: {
    text: 'Consistency compounds. A design system pays for itself the second time you reuse a component, not the first.',
    align: 'top',
  },
};

export const DarkMode: Story = {
  args: {
    text: 'The best design systems are boring in the best way — nobody notices them because everything just works.',
    align: 'left',
  },
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};
