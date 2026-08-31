import type { Meta, StoryObj } from '@storybook/react';
import { FirstPageHeading } from './FirstPageHeading';
import avatar1 from '../../../assets/avatars/activity-amara-kalu.jpg';
import avatar2 from '../../../assets/avatars/activity-chidi-duru.jpg';
import avatar3 from '../../../assets/avatars/activity-jade-silva.jpg';

const meta = {
  title: 'Marketing/First Page Heading',
  component: FirstPageHeading,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Matches Figma "First Page Heading" (Marketing primitives set, 16
previews: Align (Center/Left) x CTAs/Badge/Avatars (each True/False)).
Align stays a real, explicit prop (Figma's own axis) -- a genuine
layout choice. The other three axes are all derived from data
presence rather than manual booleans, same "derive from data" pattern
used throughout this library:
- **Badge** — shown when \`badgeLabel\` is provided.
- **CTAs** — Figma's own toggle controls BOTH buttons together (every True/False preview shows or hides the whole row, never just one button), so the row renders when either \`primaryCta\` or \`secondaryCta\` is given, not two independent conditions.
- **Avatars** — shown when \`avatars\` has at least one entry; the "N happy users" caption is a separate optional field under that (Figma always shows both together, but there's no reason a consumer couldn't want the stack without the count).

"Get started" reuses Button variant="primary" -- Figma's own static
export shows accent/HOVER as the background, but that's an
incidentally-captured hover-state screenshot, not a real distinct
default look (confirmed: accent/hover is literally Button's own
:hover token, and Figma's "Watch demo" button shows the same
hover-only drop-shadow at rest) -- same reasoning already applied
elsewhere in this session for not chasing a snapshot's accidental
interaction state. "Watch demo" reuses variant="secondary" with a
Play glyph in the leftIcon slot. Avatars reuse the shared AvatarGroup
component directly (Figma's own "Avatar Group" instance, already a
component in this library).` } } },
} satisfies Meta<typeof FirstPageHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

const avatars = [
  { src: avatar1, alt: 'Amara Kalu' },
  { src: avatar2, alt: 'Chidi Duru' },
  { src: avatar3, alt: 'Jade Silva' },
];

const shared = {
  badgeLabel: 'Features',
  title: 'Documentation',
  description: 'Everything you need to install, customize, and ship with Sakani.',
  primaryCta: { label: 'Get started' },
  secondaryCta: { label: 'Watch demo' },
  avatars,
  avatarsCaption: '21.3K happy users',
};

export const Center: Story = { args: { ...shared, align: 'center' } };
export const Left: Story = { args: { ...shared, align: 'left' } };

export const MinimalCenter: Story = {
  args: {
    title: 'Documentation',
    description: 'Everything you need to install, customize, and ship with Sakani.',
    align: 'center',
  },
};

export const DarkMode: Story = {
  args: { ...shared, align: 'center' },
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};
