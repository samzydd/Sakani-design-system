import type { Meta, StoryObj } from '@storybook/react';
import { BlogBlockquote } from './BlogBlockquote';
import avatar from '../../../assets/avatars/activity-ravi-menon.jpg';

const meta = {
  title: 'Marketing/Blog Blockquote',
  component: BlogBlockquote,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Matches Figma "Blog Blockquote" (Marketing primitives set, first of the
category): a left vertical Divider rail + quote text. Figma's 2 style
previews ("With Attribution" / "Simple") collapse into one derived axis
rather than a manual style prop, same reasoning used throughout this
library -- presence of \`author\` decides the treatment:
- **With \`author\`** — bg/surface + radius/lg card, small quote-mark glyphs above/below the text (Figma reuses the identical icon unrotated in both spots, not a mirrored open/close pair, so this does too), body/lg fg/default text, and an attribution row (Avatar + bold name + ", role" in fg/muted).
- **Without \`author\`** — no card chrome, the quote text itself wrapped in literal straight quotes (Figma's own Simple content is literally \`"..."\`, not an icon substitute) in fg/muted, i.e. a lighter-weight pull-quote for when there's no one to credit.

Composed from the shared Divider (vertical) and Avatar (image type)
components -- no new visual primitives beyond the quote-mark glyph
itself (lucide \`Quote\`, not in either component's existing icon set).` } } },
} satisfies Meta<typeof BlogBlockquote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithAttribution: Story = {
  args: {
    quote: 'We stopped debating spacing values in every design review the week we shipped the token layer.',
    author: { name: 'Ravi Menon', role: 'Founder at Loopline', avatarSrc: avatar },
  },
};

export const Simple: Story = {
  args: {
    quote: 'Boring, in the best way, is the whole point.',
  },
};

export const DarkMode: Story = {
  args: {
    quote: 'We stopped debating spacing values in every design review the week we shipped the token layer.',
    author: { name: 'Ravi Menon', role: 'Founder at Loopline', avatarSrc: avatar },
  },
  decorators: [(S) => <div className="dark"><S /></div>],
};
