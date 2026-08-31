import type { Meta, StoryObj } from '@storybook/react';
import { TestimonialBlock } from './TestimonialBlock';
import amara from '../../assets/marketing/testimonial-amara-kalu.jpg';
import ravi from '../../assets/marketing/testimonial-ravi-menon.jpg';
import chidi from '../../assets/marketing/testimonial-chidi-duru.jpg';
import jade from '../../assets/marketing/testimonial-jade-silva.jpg';

const meta = {
  title: 'Blocks/Marketing/Testimonial',
  component: TestimonialBlock,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `A COMPOSITION EXAMPLE, not a configurable component. Copy this file
into your project and edit it directly.

Matches Figma "Testimonial" (node 1512:27929, 2 layouts: Single,
Grid). Which layout renders is derived from \`testimonials.length\`
(1 -> Single, 2+ -> Grid) rather than a manual \`layout\` prop -- same
"derive from data" pattern used throughout this library (e.g.
PricingTableBlock's own tier-count-driven layout switch).

Both layouts reuse the shared Avatar component (Single: size="md"/
32px, Grid: size="sm"/24px, an exact match for Figma's own two
sizes here) and lucide's \`Quote\` icon (Single layout only) -- Figma's
own quote glyph is lucide's "quote" icon exactly (confirmed by
comparing path data), so no local SVG was needed here, unlike the
social/brand icons elsewhere in this library that lucide doesn't
ship.

Figma's own asset reuses a handful of generic stock headshots across
this design file, and a couple of testimonial authors here end up
with a name/photo mismatch as a result -- e.g. "Jade Silva" and
"Chidi Duru" (a different, unrelated Chidi Duru than TeamCard's own
story) are paired with photos of a different gender than their name.
Kept as-is, matching every prior instance of this same Figma quirk
(TeamSectionBlock's Floyd Miles/Darlene Robertson) rather than
silently "fixed".` } }, layout: 'fullscreen' },
} satisfies Meta<typeof TestimonialBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    testimonials: [
      {
        quote: 'Sakani cut our design-to-dev handoff time in half. Every component already matches what ships — no more guessing at spacing or states.',
        authorName: 'Amara Kalu',
        authorRole: 'Head of Product, Fintra',
        authorAvatar: amara,
      },
    ],
  },
};

export const Grid: Story = {
  args: {
    testimonials: [
      {
        quote: 'The state coverage alone saved us weeks — every error and loading case was already thought through.',
        authorName: 'Ravi Menon',
        authorRole: 'Founder, Loopline',
        authorAvatar: ravi,
      },
      {
        quote: 'Figma and code finally stay in sync. No more components drifting apart after a sprint.',
        authorName: 'Chidi Duru',
        authorRole: 'Design Lead, Bexa',
        authorAvatar: chidi,
      },
      {
        quote: 'We shipped our MVP in three weeks using Sakani blocks instead of building from scratch.',
        authorName: 'Jade Silva',
        authorRole: 'Engineer, Northstack',
        authorAvatar: jade,
      },
    ],
  },
};

export const DarkMode: Story = {
  args: Grid.args,
  decorators: [(S) => <div className="dark"><S /></div>],
};
